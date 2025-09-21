<script lang="ts">
import { maskAction } from "$lib/hooks/useMask.svelte";
    import { cn } from "$lib/utils";
    import Label from "./Label.svelte";
 
interface InputProps{
  mask?:string | RegExp | string[] 
  class?:string
  label?:string
  placeholder?:string
  value?:string
  height?:string|number
 }
  
 const {mask,class:className,label,placeholder,value=$bindable(),height}:InputProps=$props()
 </script>

  <fieldset class={cn("flex flex-col gap-2",className)}>
    <Label 
     for="name"
     label={label}
    />
        <input 
            use:maskAction={{mask,value}}
            class={cn("input uppercase cursor-text placeholder:text-gray-800 h-full",`h-[${height}px]` )}
            id="name" 
            placeholder={placeholder}
            type="text" 
            />
  </fieldset>