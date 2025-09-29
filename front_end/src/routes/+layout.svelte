<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
    import "../app.css";
	let { children } = $props();
   import { setUIContext } from "$lib/context/uiContext";

  setUIContext({
    size: 27,
    color: "#4B5563"
  
  });

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
