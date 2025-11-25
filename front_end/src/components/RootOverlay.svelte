<script lang='ts'>
	  import { getOverlayContext } from "$lib/context/overlayContext.svelte";
    import AccessRequestForm from "./AccessRequestForm.svelte";
    import AccessVehicleForm from "./AccessVehicleForm.svelte";
    import Carousel from "./Carousel.svelte";
    import Overlay from "./Overlay.svelte";
    const overlay =getOverlayContext()
    import type { ApiProps } from "./Carousel.svelte";
    import {getRegisterContext } from "$lib/context/acessRequestFormContext.svelte";
    import AccessRegisterFormSummary from "./AccessRegisterFormSummary.svelte";
    import FormSidebar from "./FormSidebar.svelte";
    import TextArea from "./TextArea.svelte";
    import FilterRegister from "./FilterRegister.svelte";
    let api:ApiProps | undefined = $state(undefined)
    let steps = $state(1)
    const registerManager = getRegisterContext()
  
  
</script>

 {#snippet accessRequestForm()}
   
   <AccessRequestForm
    onNext={(()=>{
      api?.apiNext()
      steps++
    })}
    bind:register={registerManager.register}
    onConfirm={(()=>{
      registerManager.addPerson()
    })}
   onCancel={(()=>{
     overlay.overlayManager('form',false)
    })}
   />
   
 {/snippet}

 {#snippet accessVehicleForm()}
   <AccessVehicleForm
     bind:cnh={registerManager.register.cnh}
     bind:cnhValidity={registerManager.register.cnhValidity}
     bind:registerVehicle={registerManager.vehicle}
   
    onPrevious={(()=>{api?.apiPrevious(), steps--})}
    onConfirm={(()=>{
      registerManager.addVehicle()
      api?.apiNext()
      steps++
    })}
   />
 {/snippet}
 
 {#snippet accessRegisterFormSummary()}
   <AccessRegisterFormSummary
    api={api}
    onPrevious={(()=>{
      steps--
    })}
   />
 {/snippet}
 
 
<Overlay
 class='grid w-full md:px-0  lg:flex lg:items-center-safe lg:justify-center-safe   3xl:h-auto 3xl:block  3xl:w-auto 3xl:bg-transparent'
 show={overlay.overlayStore('form')}
 z={50}
 background='white'
 onOverlay={(()=>{
   // show.close()
 })}
>


<FormSidebar step={steps} >
 <Carousel props={[accessRequestForm,accessVehicleForm,accessRegisterFormSummary]} 
 onMove={((item)=>{
    api=item
  })}
 
 />
 </FormSidebar>
</Overlay>

<Overlay
  class='px-2'
  show={overlay.overlayStore('textArea')}
>
  <TextArea
   class='md:w-[850px] md:h-[70vh]  w-screen'
   heightAuto={false}
   bind:observation={registerManager.register.observation}
   onconfirm={()=>{
    overlay.overlayManager('textArea',false)
   }}
   oncancel={(()=>{
    overlay.overlayManager('textArea',false)
   })}
  />
</Overlay>

 <Overlay
  show={overlay.overlayStore('filterRegister')}
  onOverlay={(()=>overlay.overlayManager('filterRegister',false))}
 >
 <FilterRegister
   oncancel={(()=>overlay.overlayManager('filterRegister',false))}
 />
 </Overlay>