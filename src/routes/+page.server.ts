
import { getPosts } from '$lib/index';

export async function load() {
  const posts = await getPosts();
  return { posts };
}