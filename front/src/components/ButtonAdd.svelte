<script lang="ts">
import { cn } from "$lib/utils";
import { CirclePlus } from "@lucide/svelte";
    import Label from "./Label.svelte";
 interface ButtonFormProps{
  class?:string
  text?:string
  onClick?:()=>void
  heigth?:string|number
 }  
 const {class:className,text,onClick,heigth}:ButtonFormProps=$props()
</script>
  <div class={cn('flex flex-col gap-2',className)}>
    <Label
    for="button"
    label="Mais informações (opcional)"
 />
  <button id="button" onclick={onClick} type="button" class={cn(
    "bg-gray-900 rounded-lg text-white cursor-pointer uppercase", 
    'font-medium hover:bg-gray-800',
    'flex justify-center items-center gap-2 px-1.5',
     `h-[${heigth}px] w-full`
     )} >
    {text}
    <CirclePlus/>
 </button>
 </div>