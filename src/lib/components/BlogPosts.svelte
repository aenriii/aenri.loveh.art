<script lang="ts">
	import type { PostMetadata } from "$lib";

	/* eslint-disable-next-line */ // everbodgy hates eslint  2026
	export let posts: PostMetadata[];
    
</script>

<div class="space-y-5">

	<div class="grid">
	    
	
		<div class="card-concept space-y-3 rounded-2xl border border-border bg-surface p-5" style="grid-area: 1 / 1">
    		<a href="/blog" class="flex flex-col items-baseline gap-2">
    			<span class="font-display text-lg font-semibold text-mist">recent blog posts</span>
    		</a>
    		
    		{#each posts.slice(0, 2) as post (post.slug)}
    			<div class="card-concept space-y-3 rounded-2xl border border-border bg-surface p-5">
    				<a href={`/blog/${post.slug}`} class="flex flex-col items-baseline gap-2">
    					<span class="font-display text-md font-semibold text-mist">{post.title}</span>
    					<span class="text-xs italic text-dusk">{new Date(post.date).toLocaleDateString()}</span>
    				</a>
    				<p class="text-sm leading-relaxed text-dusk">{post.description}</p>
    			</div>
    		{/each}
            <a href="/blog" class="flex flex-col items-baseline gap-2">
    			<span class="font-display text-xs italic text-dusk">see more posts &rarr;</span>
    		</a>
		</div>
	</div>
</div>
