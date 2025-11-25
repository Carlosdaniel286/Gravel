<script lang="ts">
	let { children } = $props();
    import Sidebar from '../../../components/Sidebar.svelte';
    import Header from '../../../components/Header.svelte';
    import RootOverlay from '../../../components/RootOverlay.svelte';
    import { setOverlayContext } from '$lib/context/overlayContext.svelte';
    import { setRegisterContext } from '$lib/context/acessRequestFormContext.svelte';
    setOverlayContext()
    setRegisterContext()
 </script>
  <main class=" flex flex-col  h-screen w-screen">
  <Header />
  <div class=" h-full flex">
  <Sidebar />
  <RootOverlay/>
  {@render children?.()}
  </div>
</main>

 