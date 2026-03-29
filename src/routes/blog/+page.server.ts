import { getPosts } from "$lib";

export async function load() {
  const posts = await getPosts();

	return { posts };
}
