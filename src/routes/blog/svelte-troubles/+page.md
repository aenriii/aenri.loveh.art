---
layout: blog
title: fighting svelte's router and coming out of it as a sveltekit contributor 
date: 2026-03-31
description: aenri is running in circles trying to fight this web framework and then suddenly realizes the solution is only ~30 lines of code away!
---

## act i - svelte is an annoying, flawed system, but i love it so much.


this post focuses on my gripes with svelte, which i encountered while working
on [openrx.info](https://openrx.info). i encountered an annoyance concerning 
svelte's router, issues when trying to make my own localization stubs, and a 
bug in sveltekit's prerendering code, which i made a github issue for, and
quickly fixed. this follows my journey along workarounds, compromises, and
my attempt at becoming a sveltekit contributor.

### starting from the start; what am i looking for?

i went into this charade with one goal: make my fucky routing work with svelte
properly. using svelte syntax, the links i want look like 
`/[[lang]]/foo/bar/baz[[format]]`. lets deconstruct exactly what that means.

- `[[lang]]` means that there is an optional path parameter defining what 
language the website is shown in. the default is `en`, or english, so `/about`
and `/en/about` are the same, but `/es/about` is different. implementing this
is rather simple, nothing too much to look at.
- `foo/bar/baz`, simple path to a page, generally self explanatory. that looks
like `/about` or `/hrt/this/that`.
- `[[format]]` is another optional path parameter defining what format to
send the site data in. this one technically has four options, `['', '.md',
'.csv', '.json']`, but sveltes router makes this more complex than it needs to
be.

## problem 1 - svelte's router.

when your web browser makes a request to a page, it will typically send out a
request that asks for a web page response, or `text/html`. svelte's router
knows and understands this quite well. when that request hits the server, it
undergoes whats called "content negotiation," where the server looks at the
request and figures out what response it could give that works best for the
request at hand. 

caveat to that, is that when you're sending requests to a svelte page thats
available in multiple formats your browser is still almost always requesting
that same `text/html` document. in my use case, with having a `+server.ts` and
a `+page.server.ts` right beside each other in that `foo[[format]]` directory,
when svelte looks at whats available, it sees "we have a `text/html` ready, and
we have a server file that could send Literally Anything," and it obviously
negotiates down to just your webpage.

in normal scenarios, this would not be an issue at all, but i'm intentionally
making my site more accessible to models and agents in hopes of giving them a
good, reliable source of information instead of hallucinating dosages out of
nowhere. this becomes an issue because while i can tell them "hey, request that
page + .md to get a markdown file you can read easier!" all i want, their web
fetch tools typically fetch with the `Accept` header asking for a `text/html`
response, just like your browser. 

this means i need to give them all specific instructions to use curl when
requesting stuff like that. it's quite annoying, and has the capacity to be
ignored by models and scrapers, *and* it means to test those endpoints i have
to pull my terminal out and `curl` my own localhost instead of just using
firefox (which, admittedly, does have better json styling), but overall it
could be significantly worse, and its mostly just an annoyance.

## problem 2 - relative files cant be included in the build

for some reason when i started my project it seems i was completely 
disconnected from "hmm what will build" and instead focused on "what works on a
dev server?" to decide how to implement things. when trying to build, my issue
became immediately obvious- i was using (vaguely) relative imports in order to
get my .json and .md files for localization, and its impossible to include
arbitrary folders as unserved assets in a svelte project.

it makes complete sense why they'd do that, but at the same time it meant i had
to completely refactor the way i imported my `.json` and `.md` files for my
localization. i had to swap from my beautiful "dynamic" way of doing things
to instead use `import.meta.glob`, and have all of my localization files built
into my svelte app, instead of being able to hotswap them (or update them)
without a rebuild. 

it does suck & i'll probably have to implement better i18n stubs later on as 
the site gets bigger and more people offer to contribute. luckily, i think i
can get away with setting up a docker container with this repository that 
updates / builds every time i push, and then i can just pull that from the
registry and `docker compose up --build -d` without much stress. maybe i'll
integrate version checking into the site, and it can add a little marker 
somewhere to tell the person hosting that instance to update to the new version.

## problem 3 - svelte's prerendering silently fails in unique situations

i seem to have discovered a unique bug in sveltekit's prerendering pipeline. i
wouldnt believe that im the only person who has ever experienced this issue,
but i seem to be the only person who sees it as a genuine problem. for some
reason, nearly *zero* of my pages are rendering, even with a root
`+layout.server.ts` exporting `const prerender = true`. 

i couldn't find a solution easily on the web, at least not one that worked for
my use-case, so i have to do some investigating on what the actual issue is.
lets first do a deep dive into what *should* happen and what *does* happen

### what should happen?

svelte (from what i understand based off of docs) looks at prerendering with
parameters/slugs with a framework that makes sense- you define what the
possible slugs are, export that from `+server.ts` or `+page.server.ts`, and
svelte runs through that and runs through its internal router to find what
happens when you make a request with that parameter, then renders that out into
a basic html file. simple(-ish), right? wrong. something is *deeply* wrong with
whatever its trying to do in my project.

i have my `entries` defined in `[[lang]]/[[format]]/+page.server.ts`, this is
because if you define `lang` in `entries` in `[[lang]]/+layout.server.ts`, it
fails as svelte detects that as some form of conflict. that's ok, i guess. not
the end of the world, just inconvenient. means i need to define `lang` more 
places. this is what `entries` looks like in that `+page.server.ts` file:

```ts
export const entries: EntryGenerator = () => {
  return [
    { lang: 'en', format: '' },
    { lang: '', format: '' }
  ];
};
```

i'm making an assumption, for the sake of simplicity, that all svelte routing
within the confines of prerendering assumes content negotiation ends in 
`Accept` being `text/html`, so im not gonna bother prerendering the formats
for markdown or the tables, plus the tables should be dynamic anyways. this
leads to me only attempting to prerender the default webpage, with both the
blank and `en` language. 

one `bun run build` later, and we have no errors! this means that somewhere in
svelte's code, it has signaled that the prerender is successful. so we should
be in the clear, right?

### nope! what does happen?

for svelte prerendering, when pages are built they are put in `.svelte-kit/
output/prerendered`. this is where a server adapter (say, `svelte-adapter-bun`)
can expect to find the routes that it was told have been prerendered. issue?
there are no files in that directory, but svelte told the server adapter that
the routes were prerendered anyways. so when you `bun run preview` to run the
built server, it *fails* and 404s every url, instead of even trying to render
it. 

### theory 1 - svelte prerenderer ignores parameters that are falsey

in my `entries`, we have `lang: ''` and `format: ''`, but `''` is falsey. do we
think svelte's prerenderer would check if a parameter exists by simply checking
its falsey-ness despite knowing that optional parameters exist? after a quick
analysis of the sveltekit prerendering code, we can cast our eyes on
`packages/kit/test/prerendering/basics/test/tests.spec.js`. what a beautiful
file name, oh boy do i love monorepos. 

`tests.spec.js L273-276`
```js
test('prerenders paths with optional parameters with empty values', () => {
	const content = read('optional-params.html');
	expect(content).includes('Path with Value');
});
```

ok, so they have this test implemented! lets pull `sveltejs/kit`, checkout the
tag that i have installed with openrx, and run the test! for this, we need to
use `pnpm` for some reason, so i went ahead and installed that using bun

**10 minutes later**: ok apparently i need to *also* install playwright

**5 minutes later**: *and* two aur packages, `icu74` and `flite1`

**15 minutes later**: ok, finally got those packages built and sveltekit tests
running; the prerender optional params with empty values test did pass! so
there must be something else we're missing?

### theory 2 - svelte denies prerendering paths where cookies are checked

while analyzing my code for possible issues, i noticed something i overlooked
previously- in my root `+layout.server.ts` file, i check for a `lite` cookie,
to see if we need to load the lite css file.

```ts
export async function load({ cookies, params }) {
  const lite = cookies.get('lite') === 'true';
  return { lite, lang: params.lang ?? 'en' };
}
```

maybe svelte is detecting this, and refusing to preload? only one way to figure
it out...

nope! it still 404s, and still only pregenerates both `/` and `/en/` of a
single page, that being the `/hrt` page, which doesnt have a `[[format]]`
param. this definitely could be a contributing issue though, so i'll just make
it to where `openrx.info` is implicitly non-lite, and then host a 
`lite.openrx.info`. that also prevents people from having to open & navigate
the large site to enable lite mode, which is good. 

ok so. more analysis reveals that when i ran a script to generate the routes
based on what i got from diyhrt.info (with permission! love the ppl behind
that), i ended up adding that lite cookie check to every page, even though i
only needed it on the root layout. removing that and... nope!

what could possibly be the issue?

### theory 3 - svelte prerendering does not support `baz/foo[[bar]]` parameters

this theory proposes that svelte has an issue within its build process or
prerenderer, where path parameters that are postfixed to a path (static+dynamic
specifically) do not properly process either at build-time or when its time to
prerender. for this, i will make a minimal reproduction of this pathfinding.
just a simple `bunx sv create`, using adapter-auto for the sake of this test.

here are some snippets of the code used, to give a grasp on how i tested this.

`params/foo.ts`
```ts
export function match(param: string) {
  return ['foo', 'bar', 'baz', ''].includes(param)
}
```

`params/baz.ts`
```ts
export function match(param: string) {
  return ['alpha', 'bravo', 'charlie', ''].includes(param)
}
```

`$ tree src/routes`
```
src/routes
├── [[baz=baz]]
│   └── othertest[[foo=foo]]
│       ├── +page.server.ts
│       └── +page.svelte
├── +layout.svelte
├── otherfoo
│   ├── +page.server.ts
│   └── +page.svelte
├── +page.svelte
└── test[[foo=foo]]
    ├── +page.server.ts
    └── +page.svelte
```

`tests/prerender-fail.test.ts`
```ts
test('prerender generated test[[foo]]', async () => {
  for (const foo of foos) {
    expect(await Bun.file(join(svelteRoot, `test${foo}.html`)).exists()).toBe(true);
  }
});

test('prerender generated [[baz]]/othertest[[foo]]', async () => {
  for (const baz of bazes) {
    for (const foo of foos) {
      expect(await Bun.file(join(svelteRoot, `${baz}/othertest${foo}.html`)).exists()).toBe(true);
    }
  }
});
```

and now for the results youve all been waiting for-

```
bun test v1.3.4 (5eb2145b)

tests/prerender-fail.test.ts:
✓ prerender generated test[[foo]] [5.00ms]
✓ prerender generated [[baz]]/othertest[[foo]] [1.00ms]

 2 pass
 0 fail
 20 expect() calls
Ran 2 tests across 1 file. [21.00ms]
```

wait. what? then what could the issue be? what variable have we not tested yet?

lets run one final sanity check with this theory before throwing it in the bin.
lets set foos to all be period-delimited

```ts
const foos = ['.foo', '.bar', '.baz', ''];
```

now what do we see?

```
bun test v1.3.4 (5eb2145b)

tests/prerender-fail.test.ts:
✓ prerender generated test[[foo]]
✓ prerender generated [[baz]]/othertest[[foo]] [1.00ms]

 2 pass
 0 fail
 20 expect() calls
Ran 2 tests across 1 file. [14.00ms]
```
another perfect score-? then what are we missing?

ok. another idea for a sanity check. what if i was wrong about the way that
the internal svelte router works for prerenders. what if it fails because i
have entries set in both `+server.ts` and `+page.server.ts`, with some places
having different entries and some places having the same one.

that and the root route directory being an optional parameter are the only
possible differences i can come up with, so lets account for them.

we're now running a much more comprehensive test. we have two independent
groups, and a control group. both independent groups have both a `+server.ts`
and a `+page.server.ts` file, this is intentional to see if them conflicting is
a silent error in svelte. to align closer with my situation, each `+server.ts`
file only returns `text/markdown`. this does not invalidate the test, because
if it fails at any point, that just means that svelte wrongly silently fails 
http requests in prerendering if the http status code is 200 even if the
`content-type` is not `text/html`, and thus not saved as prerendered. in
addition with regards to aligning with my situation, only the `+page.server.ts`
file will have `export const prerender = true`

**control group**: `/test[[foo=foo]]`, simple enough. we know it'll work,
simple control group.

**independent group 1**: `/root-page-param/[[baz=baz]]/server-ts-different[[foo]]`,
in this group we have `+server.ts` with foo entries containing `['.foo', '.bar']`,
and `+page.server.ts` with foo entries containing `['.baz', '']`.

**independent group 2**: `/root-page-param/[[baz=baz]]/server-ts-same[[foo]]`,
in this group we have both `+server.ts` and `+page.server.ts` both with foo
entries `['.foo', '.bar', '.baz', '']`.

now, as for the results-

```
bun test v1.3.4 (5eb2145b)

tests/prerender-fail.test.ts:
✓ prerender generated test[[foo]] [1.00ms]
✗ prerender generated root-page-param/[[baz]]/server-ts-different[[foo]]
✗ prerender generated root-page-param/[[baz]]/server-ts-same[[foo]] [1.00ms]

 1 pass
 2 fail
 4 expect() calls
Ran 3 tests across 1 file. [16.00ms]
```

IT FAILED! WE REPRODUCED IT! but wait, does this even have anything to do with
parameters at all?

### theory 4 - svelte silently refuses to prerender properly configured svelte pages if there is an additional `+server.ts` file

so, new minimal reproduction. same concept as before, but much simpler. we're
duplicating and modifying our control group. we're keeping our control group,
cutting out our previous failed tests, and looking at this from another
direction- plain `server-ts[[foo]]` and `server-ts-2` routes. one with a param,
one without, both with `+page.server.ts` enabling prerendering, `+page.svelte`
with a basic page, and both with plain `+server.ts` files with the following
content:

```ts
export async function GET() {
  return new Response("hello world", {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
```

running our tests again and-

```
bun test v1.3.4 (5eb2145b)

tests/prerender-fail.test.ts:
✓ prerender generated test[[foo]] [1.00ms]
✗ prerender generated server-ts[[foo]]
✗ prerender generated server-ts-2
```

WE REPRODUCED IT!! ITS PROVEN!!!

but wait. what do we do now then? is this intended behavior, or a bug report
that wont get us to where we want to be?

at the very least, this is a *minor* bug, even if the refusal to prerender is
intentional, it fails silently, even when there is code in the prerenderer to
tell the user that some routes were designated for prerendering but not 
prerendered. lets test it on the live main branch of sveltekit, just to be sure.

and, both good and bad news, it's still a bug!

```
bun test v1.3.4 (5eb2145b)

tests/prerender-fail.test.ts:
✓ prerender generated test[[foo]] [1.00ms]
✗ prerender generated server-ts[[foo]]
✗ prerender generated server-ts-2

 1 pass
 2 fail
 4 expect() calls
Ran 3 tests across 1 file. [14.00ms]
```

so, off to submitting it? but then, what do we do in the meantime? we *could*
refactor the *whole* project to have `foo/bar/+page.svelte` and 
`foo/bar[[baz]]/+server.ts`, lets see if that works really quick-

```
✓ independent group: prerender apple/+page.svelte with apple[foo]/+server.ts side-by-side > prerender generated sbs/apple
```

ok that works, that's probably why we havent seen anyone reporting this issue;
they just assume its intended behavior and move on. or maybe it is true that
no one has really ever done something as stupid as how im doing things. what
wonders the world of self-taught development brings to the table.

anyways, the bug report was filed as a github issue, and can be found
[here!](https://github.com/sveltejs/kit/issues/15620) its my first ever bug
report on an actual large repository / project, so i'm really happy. 

## act ii - its really as shrimple as that!

i decided to meander around sveltekit's codebase, and ended up discovering
exactly what's causing this issue from the start, and fixing it. this is my
journey through that, and making my first contribution to sveltekit!

### step-by-step: prerendering

to understand what it is i actually did, you have to first understand what even
"prerendering" means to svelte. of course, thats actually pretty easy. 
prerendering is literally just svelte's way of describing its convoluted way to
do static site generation in combination with SSR/CSR. it works pretty well 
when done right, and is the same process that's used for their built-in static
site adapter.

we're going to start from the middle here, because prerendering is a 
post-compile operation. when you get here, your svelte site has been compiled
into javascript with an internal server. when you mark a page as prerenderable,
that page goes through this simple two-phase process:

1. **index all pages using `entries` and figure out what to actually render**

this process starts in `analyse.js`, it performs static analysis on every route
in your app. it loads the compiled page nodes and endpoint modules and reads 
their exported options (`prerender`, `entries`, etc.) and stores them in a
`metadata.routes` map. this is an *eager* process; by the time its done, every
concrete url that can be visited is resolved.

2. **enqueue pages to be prerendered cyclically until everything's ready**

now we're stepping into `prerender.js`, our first friend is the `enqueue()`
function, its sole purpose is to filter out pages who have already been
prerendered, and queue a `visit()` job on the ones who have not. its awfully
simple, really, genuinely no trickery here. it uses a set of page ids to make
sure it doesnt render them multiple times, too.

next up is that `visit()` function. this is where the dirty work happens. this
function makes a request to sveltekit's internal server, saves the html to your
`.svelte-kit/output/prerendered/` folder, skims it for any links to other 
pages, and then enqueues those too. 

isn't that simple? it just crawls your website and renders out what its
supposed to, how nice of it!

### the fatal flaw in the prerendering process

one thing i refrained from mentioning is a flaw in the `visit()` function,
which links to a flaw in some of the data passed around the postcompile process
as a whole.

you know earlier how i talked about content negotiation, how it gets you that
html website we all know and love, and how svelte relies on `Accept` headers to
route you around? i made an assumption up there that svelte's prerendering
process would implicitly send `Accept: text/html` to every page. i was wrong,
and that's where our issue begins!

see, most of openrx.info has exclusively routes with coexisting `+server.ts`
and `+page.server.ts` files. you may have caught on by now, that if sveltekit
doesnt attach an `Accept` header to every page-based request, it'll get routed
to the `+server.ts` file no matter what. so, when i was setting those pages to
prerender, and building it, all of those requests were going to the `+server.ts`
endpoints! it looked like svelte was just not outputting anything, but it *was*,
and it thought it was right too! 

svelte was accidentally prerendering the api calls instead of the actual pages,
but it was telling the adapter the page was ready, because thats the actual
route it was supposed to prerender! this meant that when your site was built 
with those prerendered chunks, *everything* that had the server file 
prerendered accidentally would `404`. this made it look like a silent fail to
me, entirely, and while that was a flawed assessment id expect most people to
make that assumption as well.

### The Big Fix:tm:

the fix to this bug consisted of just three parts, which were very simple to
implement on their own. our first contestant came in the form of `analyse.js`.

in `analyse.js`, around lines 130-150, you see that it processes the prerender
flag in files. that check is done with `page?.prerender ?? endpoint?.prerender`.
that check is insufficient, and doesnt provide enough context to the `visit()`
function for it to make an informed decision on what to actually prerender. so,
our first order of business was to pass along that information from the 
`analyse` function into the page metadata pool. we added `page.prerender` and
`api.prerender` to the metadata, each mirroring their respective values of
`true | false | 'auto' | undefined`. this was only step one, though.

our next contenders were modifications to the `enqueue()` and `visit()` 
functions within the confines of our beautiful friend the `prerender.js` file.
firstly, we gave both functions an additional parameter; `expect_html`, which
was enough to inform the enqueue function to create a special id in the `seen`
set in order to allow the non-html response to have the normal request. we used
a simple `\x00page` postfix to the preexisting id based on that parameter.
then, enqueue passed `expect_html` to visit, which used that parameter to 
determine what headers it should use. expecting html, of course, meant that we
used that `Accept: text/html` header in order for svelte to properly route us
to the webpage which we *actually* wanted to save.

the third and final change was made to the initial prerendering queue's setup.
a naive fix would've just used the top-level metadata `prerender` flag, or
check if a path *with* that flag had any endpoints or pages and render them all,
but we are intelligent and *definitely* didnt fill the initial fix with a ton
of regressions. we definitely didnt have to go back and add those changes to
`analyse.js` when we figured out what we did.

that aside, we ran checks on if both the page and the endpoint had their
prerender flag set. if they did, we sent the page or endpoint individually to
the queue. this effectively removed the code backing for svelte's tendency to
get mad when you added `prerender = true` to multiple serveable files in a
single directory, but i didnt remove that check because i didnt want to offer a
breaking change or make a change that was too out of scope.

### proving it works

we implemented two regression tests; one to prove that this setup worked at all,
and one to double-check that a regression i had theorized may pop up did not
happen. 

the first test was quite simple, just a `+page.svelte` in the same directory as
a `+server.js`. the test simply checked that the svelte page had been rendered
as it was supposed to.

the second test came about because of my worry in how a flaw could create a 
regression- you know how `visit()` also enqueues links it finds in your pages
to the prerender queue? we actually have no idea how to reverse-url search the
metadata store to find the page metadata object that would tell us whether your
route is a page or an api endpoint, so we made a risky-ish decision and decided
to default to `expect_html=true`. 

i mean, it makes sense, most if not all pages you'll link to on a page *are*
other pages, and if one of them is somehow both an api endpoint *and* set to be
prerendered, it probably doesnt need to handle content negotiation very hard
considering you cant customize what headers are sent to your page when its 
tested. you have to use parameters and `entries` for that, sadly. 

the test placed a link to a json-returning endpoint into a standard svelte page,
and tested to make sure that it placed a json file in the prerendered area, and
did not try to output any sort of html mess with it. luckily the common sense
of "hmm, this isnt html" won over the save function, and everything worked out
pretty smoothly.

# act iii / conclusion: what we learned.

first of all, contributing to large projects *will* make you feel really cool,
but its also not that hard. if you can find your own pain point that doesnt
seem like intended behavior, make an issue. if you can figure out what's
happening, fork it, fix it, and open a pull request. you got this, i'm sure.

as for [my pull request](https://github.com/sveltejs/kit/pull/15621), its
sitting in limbo as i type this. *supposedly* thats because i submitted it at
noon after not sleeping all night, and svelte devs are very busy.

i did really enjoy learning my way around the svelte codebase, to the degree
that i did, and i honestly kinda hope i hit some other niche bug in the future
that i can pick and prod at. maybe i will, maybe i wont. nobody knows!

anyways, its probably time for me to "start" my day (&lt;- hasnt slept), get
some food and a shower. openrx.info is not dead, i promise! this blog post is
living breathing proof that i *am* working on it, even if im a bit stupid.

love any and all, do no harm, as always &lt;3