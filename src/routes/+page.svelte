<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Partners from '$lib/components/Partners.svelte';
	import BlogPosts from '$lib/components/BlogPosts.svelte';
	import type { PostMetadata } from '$lib';
	/* eslint-disable-next-line */ // everybody hates eslint 2026
	let { data }: { data: { posts: PostMetadata[] } } = $props();
</script>

<svelte:head>
	<title>hi, im aenri!</title>
	<meta
		name="description"
		content=""
	/>
</svelte:head>

<div
	class="min-h-screen bg-night font-sans text-mist antialiased selection:bg-lavender/20 selection:text-lavender"
>
	<div
		class="pointer-events-none fixed inset-0"
		style="background: radial-gradient(ellipse 90% 45% at 50% -5%, oklch(20% 0.1 285 / 0.6) 0%, transparent 65%);"
		aria-hidden="true"
	></div>

	<div class="relative">
		<Header />

		<main class="mx-auto max-w-5xl space-y-10 px-5 pb-20">
			<section class="grid grid-cols-1 gap-5 lg:grid-cols-3">
				<div class="lg:col-span-2 space-y-4">
					<About />
					<Projects />
				</div>
				<div class="space-y-4">
					<!-- <NowPlaying /> -->
					<Contact />
					<Partners />
					<BlogPosts posts={data.posts} />
				</div>
			</section>

			
		</main>

		<Footer />
	</div>
</div>
