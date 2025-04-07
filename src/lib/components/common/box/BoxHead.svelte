<script lang="ts">
    export let special: boolean = false;
</script>

<div class="head" class:special>
    <slot />
</div>

<style lang="scss">
    .head {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        border-bottom: 2px white solid;
        font-size: larger;
        font-weight: bold;
        &.special {
            border-top: 2px white solid;
        }
    }
</style>
