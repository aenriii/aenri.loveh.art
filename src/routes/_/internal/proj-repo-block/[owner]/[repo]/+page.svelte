<script lang="ts">
    let {
        data,
    }: {
        data: {
            owner: string;
            repo: string;
            repoDetails: {
                description: string;
                stars: number;
                languages: [string, number][];
            };
        };
    } = $props();
    let { owner, repo, repoDetails } = data;
</script>

<div id="root">
    <div class="card">
        <div class="card-header">
            <div class="header-id">
                <a href={`https://github.com/${owner}/${repo}`}>
                    <strong class="header-repo-owner">{owner}</strong>
                    /
                    <strong class="header-repo-name">{repo}</strong>
                </a>
            </div>
            <div class="header-lang">
                <div class="dot"></div>
                {repoDetails.languages.sort((a, b) => b[1] - a[1])[0][0]}
            </div>
        </div>
        <p>
            {repoDetails.description}
        </p>
    </div>
</div>

<style lang="scss">
    #root {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        height: 100vh;
        width: 100vw;
        border: 3px solid #fff;
        padding: 5px;
        .card {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;
            padding: 10px;
            .card-header {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
                .header-id {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    font-size: small;
                    gap: 3px;
                    .header-repo-name {
                        font-size: 1.1rem;
                    }
                }
                .header-lang {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    font-size: 0.9rem;
                    .dot {
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background-color: #fff;
                        margin-right: 5px;
                    }
                }
            }
            p {
                padding: 10px;
                font-size: 0.9rem;
                line-height: 1.5;
                color: #fff;
            }
        }
    }
</style>
