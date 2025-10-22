<script lang="ts">
    import type { Snippet} from 'svelte';
    import { cubicInOut} from 'svelte/easing';
    import { fly } from 'svelte/transition';
    
  export type ApiProps = {
   apiNext(): void;
   apiPrevious(): void;
   
  }
  interface CarouselProps{
    onMove?:(api:ApiProps)=>void
   props?:Snippet[] 
  animation?:boolean
  children?: Snippet;
  }
  let move = $state({
    in:-1000,
    out:1000
  })
  
  const {onMove,props=[],animation=true,children}:CarouselProps = $props()
  let activeIndex = $state(0); 
  
function apiNext() {
  activeIndex = (activeIndex + 1) % props.length;
  move = { in: -1000, out: 1000 };
}

function apiPrevious() {
  activeIndex = (activeIndex - 1 + props.length) % props.length;
  move = { in: 1000, out: -1000 };
}

  
  $effect(()=>{
    if(onMove){
      onMove({apiNext,apiPrevious})
    }
  })
  
  

</script>
  {#if animation}
  {#key activeIndex}
  <div
     class="w-full h-full overflow-x-hidden overflow-y-auto flex justify-center items-center "
     in:fly={{x:move.in, duration: 1000,delay:400,easing:cubicInOut}}
     out:fly={{x:move.out, duration: 1000,easing:cubicInOut }}>
       {@render props[activeIndex]()}
  </div>
  {/key}
  {/if}

  {#if !animation}
    <div class="overflow-x-auto overflow-y-hidden flex snap-mandatory gap-4 max-w-screen scroll-smooth">
       {#each props as item }
          <div class="shrink-0">
           {@render item()}
         </div>
      {/each}
      
      </div>
      {#if children && props.length==0}
       <div class="flex gap-4 overflow-x-scroll snap-mandatory overflow-y-hidden max-w-full scroll-smooth">
          {@render children()}
        </div>
      {/if}
    {/if}
   
   
  

 

  
  
    
  
  


   
  

