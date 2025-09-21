
// src/lib/useMask.svelte.ts
import IMask from 'imask';

interface MaskOptions {
    mask?: string[] | string | RegExp;
    value?: string 
}
 export function maskAction(el: HTMLInputElement, options: MaskOptions) {
    const maskInstance = IMask(el, {
        mask: options.mask as any,
        lazy: true,
    });
       return {
           update(newOptions: MaskOptions) {
            if (maskInstance) {
                maskInstance.value = newOptions.value ?? '';
                maskInstance.updateValue(); // sincroniza o valor do elemento HTML
            }
        },
        destroy() {
            maskInstance.destroy();
        }
    };
}