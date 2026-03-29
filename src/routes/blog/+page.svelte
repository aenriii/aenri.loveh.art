<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	interface Post {
		slug: string;
		title: string;
		date: string;
		description?: string;
	}

	interface Props {
		data: { posts: Post[] };
	}

	let { data }: Props = $props();
</script>

<svelte:head>
	<title>blog — aenri</title>
	<meta name="description" content="thoughts, notes, nd things i find interesting" />
</svelte:head>

<div
	class="min-h-screen bg-night font-sans text-mist antialiased selection:bg-lavender/20 selection:text-lavender"
>
	<div
		class="pointer-events-none fixed inset-0"
		style="background: radial-gradient(ellipse 90% 45% at 50% -5%, oklch(20% 0.1 285 / 0.6) 0%, transparent 65%);"
		aria-hidden="true"
	></div>

	<main class="relative mx-auto max-w-2xl px-5 py-16">
		<a href="/" class="mb-10 inline-flex items-center gap-2 text-sm text-dusk hover:text-mist">
			<span aria-hidden="true">&larr;</span> home
		</a>

		<h1 class="font-display mb-10 text-3xl font-bold">blog</h1>

		{#if data.posts.length === 0}
			<p class="text-dusk">nothing here yet!</p>
		{:else}
			<ul class="space-y-8">
				{#each data.posts as post (post.slug)}
					<li>
						<a href="/blog/{post.slug}" class="group block">
							<time class="text-xs text-dusk" datetime={post.date}>
								{new Date(post.date).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							</time>
							<h2
								class="font-display mt-1 text-xl font-semibold text-mist group-hover:text-lavender"
							>
								{post.title}
							</h2>
							{#if post.description}
								<p class="mt-1 text-sm text-dusk">{post.description}</p>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</main>

	<Footer />
</div>
