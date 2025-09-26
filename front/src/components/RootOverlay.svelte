<script lang='ts'>
    import { getOverlayContext } from "$lib/context/overlayContext.svelte";
    import AccessRequestForm from "./AccessRequestForm.svelte";
    import AccessVehicleForm from "./AccessVehicleForm.svelte";
    import Carousel from "./Carousel.svelte";
    import Overlay from "./Overlay.svelte";
    const show =getOverlayContext()
    import type { ApiProps } from "./Carousel.svelte";
    
   let api:null|ApiProps = $state(null)

   
</script>

 {#snippet accessRequestForm()}
   
  <AccessRequestForm
    onConfirm={(()=>{
      api?.apiNext()
    })}
   />
 {/snippet}

 {#snippet accessVehicleForm()}
   <AccessVehicleForm
    onCancel={(()=>api?.apiPrevious())}
   />
 {/snippet}
 
 
<Overlay
 class='grid w-full lg:h-full lg:bg-white lg:flex  lg:items-center-safe lg:justify-center-safe   3xl:h-auto 3xl:block  3xl:w-auto 3xl:bg-transparent'
 show={show.isOpen}
 
 onOverlay={(()=>{
    show.close()
 })}
>

 <Carousel children={[accessRequestForm,accessVehicleForm]} 
 
  onMove={((item)=>{
    api=item
  })}
 
 />
</Overlay>