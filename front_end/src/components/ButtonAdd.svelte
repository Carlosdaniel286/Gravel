<script lang="ts">
import { cn } from "$lib/utils";
import { CirclePlus } from "@lucide/svelte";
    import Label from "./Label.svelte";
 interface ButtonFormProps{
  class?:string
  text?:string
  onClick?:()=>void
  label?:string
  style?:string
 }  
 const {class:className,text,onClick,label,style}:ButtonFormProps=$props()
</script>
  <div class={cn('flex flex-col gap-2',className)}>
   {#if label}
     <Label
      for="button"
      label={label}
   />
   {/if}
   <button id="button" onclick={onClick} type="button" class={cn(
    "bg-gray-900 rounded-lg text-white cursor-pointer uppercase", 
    'font-medium hover:bg-gray-800',
    'flex justify-center items-center gap-2 px-2',
     `w-full h-full`,style
     )} 
     
     >
    {text}
    <CirclePlus/>
 </button>
 </div>