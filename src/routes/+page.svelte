<script lang="ts">
    // import { getMostRecentPosts } from "$lib/apis/twitter";
    import HomePage from "$lib/components/home/HomePage.svelte";
    import ProjectsPage from "$lib/components/projects/ProjectsPage.svelte";
    import HostTabs from "$lib/components/HostTabs.svelte";
    // let postsP = getMostRecentPosts();
</script>

<div id="host">
    <HostTabs />
    <div id="navbar">
        <div id="tabulator">
            <label class="tab for-tab-home" for="tab-home">home</label>
            <span class="tab">/</span>
            <label class="tab for-tab-projects" for="tab-projects"
                >projects</label
            >
            <span class="tab">/</span>
            <label class="tab for-tab-blog" for="tab-blog">blog</label>
        </div>
        <div id="langs">
            <span class="lang dark">lang: </span>
            <label class="lang for-lang-en" for="lang-en">en</label>
        </div>
    </div>
    <div class="pages" aria-label="Tabs">
        <HomePage />
        <ProjectsPage />
    </div>
</div>

<style lang="scss">
    div#host {
        min-height: var(--host-height);
        min-width: var(--host-width);

        border: 3px white solid;
        padding: var(--host-padding);
        transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

        display: flex;
        flex-direction: column;
    }

    #navbar {
        label:hover {
            cursor: pointer;
        }
        display: flex;
        justify-content: space-between;
    }
    .dark {
        color: var(--subtext-variant);
    }
    .pages {
        min-height: 100%;
        min-width: 100%;
        flex-grow: 1;
        display: flex;
    }
</style>
