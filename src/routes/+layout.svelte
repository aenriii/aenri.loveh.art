<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>aenri.loveh.art</title>
	<meta name="description" content="personal site for aenri lovehart. do no harm, love any and all &lt;3" />
</svelte:head>

{@render children()}
