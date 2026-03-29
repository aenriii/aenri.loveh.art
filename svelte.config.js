import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				blog: path.resolve(__dirname, 'src/lib/layouts/BlogPost.svelte')
			}
		})
	],

	kit: {
    adapter: adapter(),
    alias: {
      '$blog': './src/routes/blog'
    }
	}
};

export default config;
