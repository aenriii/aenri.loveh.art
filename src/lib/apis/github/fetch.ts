export async function fetchRepo(
  owner: string,
  repo: string,
): Promise<{
  description: string;
  stars: number;
  languages: [string, number][];
}> {
  const token = import.meta.env.VITE_GH_TOKEN;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await response.json();

  const stars = data.stargazers_count;
  const description = data.description;

  const lang_req = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/languages`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const languages = await lang_req.json();

  return {
    description,
    stars,
    languages: Object.entries(languages),
  };
}
