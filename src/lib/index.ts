// place files you want to import through the `$lib` alias in this folder.

export interface PostMetadata {
  slug?: string;
  title: string;
  date: string;
  description?: string;
  hidden?: boolean;
}

export interface PostModule {
  metadata: PostMetadata;
}

const cache = {
  posts: [] as PostMetadata[],
  lastUpdated: 0,
}

const TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function getPosts(): Promise<PostMetadata[]> {
  const now = Date.now();

  if (now - cache.lastUpdated < TTL && cache.posts.length > 0) {
    return cache.posts;
  }

  const modules = import.meta.glob<PostModule>('$blog/*/*.md', { eager: true });
  
  
  const posts = Object.entries(modules)
    .filter(([_, mod]) => !mod.metadata.hidden)
    .map(([path, mod]) => ({
      slug: path.replace('/src/routes/blog/', '').replace('/+page.md', ''),
      ...mod.metadata
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  
  if (!import.meta.env.VITE_WRITER_MODE) {
    console.debug('updating cache')
    cache.posts = posts;
    cache.lastUpdated = now;
  } else {
    console.warn('writer mode enabled, not updating cache')
  }
  return posts
  
}