import { fetchRepo } from "$lib/apis/github/fetch";

export const ssr = true;

export async function load({ params }) {
  console.log(`Loading project details for ${params.owner}/${params.repo}`);
  let repoDetails = await fetchRepo(params.owner, params.repo);
  console.log(
    `${JSON.stringify({
      repoDetails,
      owner: params.owner,
      repo: params.repo,
    })}`,
  );
  return {
    repoDetails,
    owner: params.owner,
    repo: params.repo,
  };
}
