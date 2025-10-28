<script lang="ts">
  import { animate } from "motion";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { onMount,  type Snippet } from "svelte";

  export type ApiProps = {
    apiNext(): void;
    apiPrevious(): void;
  };

  interface CarouselProps {
    onMove?: (api: ApiProps) => void;
    props?: Snippet[];
    children?: Snippet;
  }

  const { onMove, props = [], children }: CarouselProps = $props();
  let activeIndex = $state(0);
  let itemRefs: HTMLDivElement | undefined = $state();

  // Expõe API de navegação
  $effect(() => {
    if (onMove) onMove({ apiNext, apiPrevious });
  });

  // Inicializa visibilidade dos elementos
  onMount(() => {
    if (itemRefs) {
      const childrenArr = Array.from(itemRefs.children) as HTMLElement[];
      childrenArr.forEach((el, i) => {
        el.hidden = i !== activeIndex;
      });
    }
  });

  async function apiNext() {
    if (!itemRefs) return;
    
    const childrenArr = Array.from(itemRefs.children) as HTMLElement[];
    const currentElement = childrenArr[activeIndex];
    const nextIndex = (activeIndex + 1) % childrenArr.length;
    const nextElement = childrenArr[nextIndex];
   // Anima saída do atual e entrada do próximo
    await animate(currentElement, { opacity: [1,0], y: [0,-600] }, { duration: 0.7 });
    animate(nextElement, { opacity: [0,1], y: [600,0] }, { duration: 0.7 });
    setTimeout(()=>{ currentElement.hidden = true,nextElement.hidden = false},100) 
      
       
     activeIndex = nextIndex;
  }

  async function apiPrevious() {
  if (!itemRefs) return;

  const childrenArr = Array.from(itemRefs.children) as HTMLElement[];
  const currentElement = childrenArr[activeIndex];
  const prevIndex = (activeIndex - 1 + childrenArr.length) % childrenArr.length;
  const prevElement = childrenArr[prevIndex];
  
  await animate(currentElement, { opacity: [1, 0], y: [0, 600] }, { duration: 0.7 }),
        animate(prevElement, { opacity: [0, 1], y: [-600, 0] }, { duration: 0.7 })
  
  prevElement.hidden = false
  currentElement.hidden = true;

  activeIndex = prevIndex;
}

</script>

<div class="flex flex-col overflow-x-auto max-h-screen  gap-4 w-full">
  <div bind:this={itemRefs} class="w-full ">
    {#each props as item}
      {@render item()}
    {/each}
  </div>
</div>

{#if children && props.length === 0}
  {#key 0}
    <div
      in:fly={{ y: -40, duration: 700, easing: cubicInOut }}
      out:fly={{ y: 40, duration: 500, easing: cubicInOut }}
      class="w-full flex justify-center items-center"
    >
      {@render children()}
    </div>
  {/key}
{/if}
