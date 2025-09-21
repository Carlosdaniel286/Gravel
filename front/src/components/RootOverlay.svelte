<script lang='ts'>
    import { getOverlayContext } from "$lib/context/overlayContext.svelte";
    import AccessRequestForm from "./AccessRequestForm.svelte";
    import Overlay from "./Overlay.svelte";
    const show =getOverlayContext()
   
    
</script>
<Overlay
 show={true}
 onOverlay={(()=>{
    show.close()
 })}
>
 <AccessRequestForm/>

</Overlay>