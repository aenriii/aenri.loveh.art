<script lang="ts">
    export let width: string | null = null;
    export let className: string | null = null;
    let theWidth = width?.split(" m:")[0];
    let mobileWidth = width?.split(" m:").at(1);
    let style = ``;
    if (theWidth) {
        style += `--w: ${theWidth};`;
    }
    if (mobileWidth) {
        style += `--mw: ${mobileWidth}`;
    }
</script>

{#if !!className}
    <div class={className}>
        <div class="box" {style}>
            <slot></slot>
        </div>
    </div>
{:else}
    <div class="box" {style}>
        <slot></slot>
    </div>
{/if}

<style lang="scss">
    .box {
        display: flex;
        flex-direction: column;
        border: 2px white solid;
        width: var(--w, 100%);
    }
    @media screen and (max-width: 544px) {
        .box {
            width: var(--mw, var(--w));
        }
    }
</style>
