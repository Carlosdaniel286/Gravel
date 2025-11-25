
// src/lib/useMask.svelte.ts
import IMask from 'imask';
import type { Action } from 'svelte/action';
interface MaskOptions {
    mask?: string | string[] | RegExp;
    value?: string;
}


export  const maskAction: Action<HTMLDivElement,MaskOptions> = (node, options: MaskOptions) => {
      let maskInstance =  IMask(node, {
        mask: options.mask as any,
        lazy: true,
    });
    
    
    $effect(()=>{
         if (maskInstance.mask !== options.mask) {
                maskInstance.destroy();
                maskInstance = IMask(node, {
                    mask: maskInstance.mask as any,
                    lazy: true,
                });
            }

            

    })
    
    

  }

