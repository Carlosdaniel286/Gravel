<script lang="ts">
  import { cn } from "$lib/utils";
  import { ArrowBigRight, ArrowRight,ArrowLeft}  from '@lucide/svelte'

  type ButtonVariant = "confirm" | "cancel" | "next" | "previous";
  interface ButtonFormProps {
    class?: string;
    text?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: ButtonVariant;
  }

  const { class: className, text, onClick, type = "button", variant = "confirm" }: ButtonFormProps = $props();
  
 const style = $derived.by(()=>{
    switch(variant){
      case 'confirm':
        return 'bg-black text-white hover:bg-gray-800'
      case 'cancel':
        return 'bg-white text-black border border-gray-300 hover:bg-gray-100'
       default :
        return 'bg-black text-white hover:bg-gray-800'
    }
 })


</script>

<button
  onclick={onClick}
  type={type}
  class={cn(
    "rounded-lg cursor-pointer uppercase flex justify-center items-center gap-2 min-w-[100px] px-2 py-2 font-medium ",
     style,
     className
  )}
>
   
  {#if variant=='next' }
    <ArrowRight
     size={35}
     stroke-width={10}
    />
   {:else if variant=='previous'}
    <ArrowLeft size={35} stroke-width={10} />
   {:else if variant=='confirm' || variant=='cancel'}
     {text}
  {/if}

  
</button>

 