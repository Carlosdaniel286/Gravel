<script lang="ts">
    import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface OverlayProps {
    show?:boolean; 
    children?: Snippet;
    onOverlay?:()=>void;
    class?:string
    background?:string
    z?:number
  }

  let { show=$bindable(false), children,onOverlay,class:style,background="auto",z }: OverlayProps = $props();

  let overlayEl = $state<null | HTMLDivElement>(null);
  let height = $state(0)
 
  
  
  $effect(() => {
    
    if (overlayEl) {
      overlayEl.addEventListener("click", (event) => {
        if (event.target === event.currentTarget) {
          onOverlay?.()
        }
      });
    }
  });
</script>
 <svelte:window bind:innerHeight={height}  />
 
 {#if show}
  
  <div
    bind:this={overlayEl}
    class={cn("flex fixed  inset-0 bg-black/40 h-screen w-screen items-center-safe justify-center")}
    style=" background:{background};z-index:{z}"

    >
    <div  class={cn("overflow-x-auto",style)}>
      {@render children?.()}
   </div>
</div>

{/if}
