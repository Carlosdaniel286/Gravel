<script lang="ts">
  import type { Snippet } from "svelte";

  interface OverlayProps {
    show?:boolean; 
    children?: Snippet;
    onOverlay?:()=>void;
  }

  let { show=$bindable(false), children,onOverlay }: OverlayProps = $props();

  let overlayEl = $state<null | HTMLDivElement>(null);

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

{#if show}
  <div
    bind:this={overlayEl}
    class="fixed inset-0 overflow-auto flex items-center justify-center bg-black/40"
  >
    {@render children?.()}
  </div>
{/if}
