// context/overlayContext.svelte.ts
import { getContext, setContext } from "svelte";

const OVERLAY_KEY = Symbol("overlay");

 type OverlayManager = "form"|'textArea'
 




export class OverlayController {
  
  
 private overlays = $state({
    form:false,
    textArea:false
  })

  constructor() {}
 
  overlayManager(overlay:OverlayManager,value:boolean) {
    return this.overlays[overlay]=value
  }
   
   overlayStore(overlay:OverlayManager){
     return this.overlays[overlay]
  }

}

// Função para setar o context
export function setOverlayContext() {
  const controller = new OverlayController();
  setContext(OVERLAY_KEY, controller);
  return controller;
}

// Função para pegar o context
export function getOverlayContext(): OverlayController {
  const controller = getContext<OverlayController>(OVERLAY_KEY);
  if (!controller) throw new Error("Overlay context not found!");
  return controller;
}
