<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		title: string;
		date: string;
		description?: string;
		children?: import('svelte').Snippet;
	}

	let { title, date, description, children }: Props = $props();

	const formatted = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<svelte:head>
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
</svelte:head>

<div
	class="min-h-screen bg-night font-sans text-mist antialiased selection:bg-lavender/20 selection:text-lavender"
>
	<div
		class="pointer-events-none fixed inset-0"
		style="background: radial-gradient(ellipse 90% 45% at 50% -5%, oklch(20% 0.1 285 / 0.6) 0%, transparent 65%);"
		aria-hidden="true"
	></div>

	<div class="relative mx-auto max-w-2xl px-5 py-16">
		<a href="/blog" class="mb-10 inline-flex items-center gap-2 text-sm text-dusk hover:text-mist">
			&larr; all posts
		</a>

		<article>
			<header class="mb-10">
				<h1 class="font-display text-3xl font-bold text-mist">{title}</h1>
				<time class="mt-2 block text-sm text-dusk">{formatted}</time>
				{#if description}
					<p class="mt-4 text-dusk">{description}</p>
				{/if}
			</header>

			<div class="prose">
				{@render children?.()}
			</div>
		</article>
	</div>

	<Footer />
</div>

<style>
	.prose :global(h2) {
		font-family: var(--font-display);
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-mist);
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}
	.prose :global(h3) {
		font-family: var(--font-display);
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--color-mist);
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}
	.prose :global(p) {
		color: var(--color-mist);
		line-height: 1.75;
		margin-bottom: 1rem;
	}
	.prose :global(a) {
		color: var(--color-lavender);
		text-decoration: underline;
	}
	.prose :global(code) {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: 0.25rem;
		padding: 0.1em 0.4em;
		font-size: 0.875em;
	}
	.prose :global(pre) {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		margin-bottom: 1rem;
	}
	.prose :global(pre code) {
		background: none;
		border: none;
		padding: 0;
	}
	.prose :global(ul),
	.prose :global(ol) {
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		color: var(--color-mist);
	}
	.prose :global(li) {
		margin-bottom: 0.25rem;
		line-height: 1.75;
	}
	.prose :global(blockquote) {
		border-left: 3px solid var(--color-lavender);
		padding-left: 1rem;
		color: var(--color-dusk);
		font-style: italic;
		margin-bottom: 1rem;
	}
	.prose :global(hr) {
		border-color: var(--color-border);
		margin: 2rem 0;
	}
</style>
