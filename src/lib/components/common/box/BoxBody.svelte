<script lang="ts">
    export let nogap: boolean = false;
    export let align: string | null = null;
</script>

<div class="body" class:nogap style={align ? `--align: ${align};` : ''}>
    <slot />
</div>

<style lang="scss">
    .body {
        display: flex;
        flex-direction: row;
        font-size: 1rem;
        flex-wrap: wrap;
        text-align: var(--align, center);
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        gap: 0.75rem;
        &.nogap {
            gap: unset;
        }
    }
</style>
