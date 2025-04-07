<!-- tabs -->
<input
    type="radio"
    name="tabs"
    value="home"
    id="tab-home"
    checked
/>
<input
    type="radio"
    name="tabs"
    value="projects"
    id="tab-projects"
/>
<input
    type="radio"
    name="tabs"
    value="blog"
    id="tab-blog"
/>

<!-- languages -->
<input
    type="radio"
    name="langs"
    value="en"
    id="lang-en"
    checked
/>

<style lang="scss">
    input {
        display: none;
    }

    :global(#tab-home:checked ~ div .for-tab-projects),
    :global(#tab-home:checked ~ div .for-tab-blog),
    :global(#tab-projects:checked ~ div .for-tab-home),
    :global(#tab-projects:checked ~ div .for-tab-blog),
    :global(#tab-blog:checked ~ div .for-tab-projects),
    :global(#tab-blog:checked ~ div .for-tab-home) {
        color: var(--subtext-variant);
        &:hover {
            color: var(--subtext);
        }
    }

    :global(#tab-home:checked ~ div > #projects-page),
    :global(#tab-home:checked ~ div > #blog-page),
    :global(#tab-projects:checked ~ div > #home-page),
    :global(#tab-projects:checked ~ div > #blog-page),
    :global(#tab-blog:checked ~ div > #projects-page),
    :global(#tab-blog:checked ~ div > #home-page) {
        display: none;
    }

    :global(#lang-en:checked ~ div .for-lang-en) {
        text-decoration: underline;
    }
    :global(#lang-en:checked ~ * .lang-en) {
        display: initial
    }
</style>
