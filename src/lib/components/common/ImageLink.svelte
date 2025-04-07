<script lang="ts">
    export let label: string;
    export let href: string;
    export let src: string;
</script>

<a href={href}>
    <img src={src} alt={label}>
</a>

<style lang="scss">
    img {
        width: 2rem;
    }
</style>
