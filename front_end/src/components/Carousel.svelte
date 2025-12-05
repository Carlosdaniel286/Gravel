<script lang="ts">
  import { animate } from "motion";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { onMount, type Snippet } from "svelte";
    import { cn } from "$lib/utils";
    

  export type ApiProps = {
    apiNext(): void;
    apiPrevious(): void;
  };

  interface CarouselProps {
    onMove?: (api: ApiProps) => void;
    props?: Snippet[];
    children?: Snippet;
    flow?:"x"|'y'
    mode?:'infinit'|'normal'
    class?:string
    maxHeight?:number
  }

  const { onMove, props = [], mode='normal', children,flow,class:style,maxHeight }: CarouselProps = $props();
  let activeIndex = $state(0);
  let itemRefs: HTMLDivElement | undefined = $state();
  let scrollRefs: HTMLElement | undefined = $state();
  let compontes:number[]| null = $state(null)
  
   
  // Expõe API de navegação
  $effect(() => {
    if (onMove) onMove({ apiNext, apiPrevious });
  });

  $effect(() => {
    $inspect(compontes)
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

  function handleScroll() {
    if(!scrollRefs) return false
    
    const final =
      scrollRefs.scrollWidth - scrollRefs.scrollLeft - scrollRefs.clientWidth < 1;
   if (final) {
    if(mode=='infinit'){
      compontes?.push(0)
    }
    if(!compontes) return
     compontes.push(0)
  
  if (compontes.length > 2) {
    compontes = []
    scrollRefs.scrollLeft = 0
     compontes.push(0)
  }
}

  }
 

</script>

 {#if props && !flow }
  <div class={cn("flex flex-col overflow-x-auto max-h-screen  gap-4 w-full",style)}>
  <div bind:this={itemRefs} class="w-full ">
    {#each props as item}
      {@render item()}
      
    {/each}
  </div>
</div>
{/if}

{#if children && flow == 'x'}
  <div  bind:this={scrollRefs} onscroll={handleScroll} class={cn("carousel  flex  scroll-snap-type: x mandatory gap-2 overflow-y-hidden overflow-x-auto ",style)}>
   {@render children()}
   
   {#each compontes }
     {@render children()} 
    {/each}
    </div>
{/if}

{#if children && flow == 'y'}
  <div  style="max-height:{maxHeight}px; "  class={cn("grid grid-cols-1 gap-1.5   overflow-y-auto overflow-x-hidden ",style)}>
   {@render children()}
   </div> 
{/if}

{#if children && props.length === 0 && !flow }
   <div
      in:fly={{ y: -40, duration: 700, easing: cubicInOut }}
      out:fly={{ y: 40, duration: 500, easing: cubicInOut }}
      class={cn("w-full flex justify-center items-center",style)}
    >
      {@render children()}
    </div>
  
{/if}



<style>
  /* faixa deslizando infinitamente */
 

  /* Scrollbar invisível */
  .carousel::-webkit-scrollbar {
    display: none;
  }
  .carousel {
    scrollbar-width: none;
  }
  .carousel::-webkit-scrollbar-button {
    display: none;
  }
</style>
