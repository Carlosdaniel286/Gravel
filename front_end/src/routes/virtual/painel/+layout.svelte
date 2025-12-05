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
 
<main class="flex overflow-hidden bg-gray-200 h-screen">
  <Sidebar class=" overflow-hidden" />

  <!-- ESSA DIV PRECISA DE flex-1 -->
  <div class="flex flex-col flex-1 min-w-0">
    <Header />

    <RootOverlay />

    <div class="flex flex-1 min-h-0 min-w-0">
      {@render children?.()}
    </div>
  </div>
</main>


 