<script lang='ts'>
    import { getOverlayContext } from "$lib/context/overlayContext.svelte";
    import AccessRequestForm from "./AccessRequestForm.svelte";
    import AccessVehicleForm from "./AccessVehicleForm.svelte";
    import Carousel from "./Carousel.svelte";
    import Overlay from "./Overlay.svelte";
    const show =getOverlayContext()
    import type { ApiProps } from "./Carousel.svelte";
    import {getRegisterContext } from "$lib/context/acessRequestFormContext.svelte";
    import AccessRegisterFormSummary from "./AccessRegisterFormSummary.svelte";
    let api:ApiProps | undefined = $state(undefined)
    const registerManager = getRegisterContext()
  
  
</script>

 {#snippet accessRequestForm()}
   
  <AccessRequestForm
    api={api}
    bind:register={registerManager.register}
    onConfirm={(()=>{
      registerManager.addPerson()
    })}
   onCancel={(()=>{
     show.close()
    })}
   />
 {/snippet}

 {#snippet accessVehicleForm()}
   <AccessVehicleForm
     bind:cnh={registerManager.register.cnh}
     bind:cnhValidity={registerManager.register.cnhValidity}
     bind:registerVehicle={registerManager.vehicle}
   
    onPrevious={(()=>api?.apiPrevious())}
    onConfirm={(()=>{
      console.log(registerManager.register)
      api?.apiNext()
    })}
   />
 {/snippet}
 
 {#snippet accessRegisterFormSummary()}
   <AccessRegisterFormSummary
   
   />
 {/snippet}
 
 
<Overlay
 class='grid w-full overflow-hidden   lg:flex  lg:items-center-safe lg:justify-center-safe   3xl:h-auto 3xl:block  3xl:w-auto 3xl:bg-transparent'
 show={show.isOpen}
 background='white'
 onOverlay={(()=>{
    show.close()
 })}
>

 <Carousel children={[accessRequestForm,accessVehicleForm,accessRegisterFormSummary]} 
 onMove={((item)=>{
    api=item
  })}
 
 />
</Overlay>