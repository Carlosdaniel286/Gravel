<script lang="ts">
    import { cn } from "$lib/utils";
  import type { Snippet } from "svelte";

  interface OverlayProps {
    show?:boolean; 
    children?: Snippet;
    onOverlay?:()=>void;
    class?:string
  }

  let { show=$bindable(false), children,onOverlay,class:style }: OverlayProps = $props();

  let overlayEl = $state<null | HTMLDivElement>(null);
  let height = $state(0)
  let heightRef = $state(0)
 let sidebarEl: HTMLDivElement | null  =$state(null)
  
  
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
    class={cn("flex fixed inset-0 bg-black/40 h-screen w-screen items-center-safe justify-center",
   )}
    style="overflow-x:auto;"

    >
    <div  class={cn(style)}>
      {@render children?.()}
   </div>
</div>

{/if}
