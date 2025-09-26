<script lang="ts">
    import type { Snippet} from 'svelte';
    import { cubicInOut, linear } from 'svelte/easing';
    import { fly,fade } from 'svelte/transition';
    
  export type ApiProps = {
   apiNext(): void;
   apiPrevious(): void;
  }
  interface CarouselProps{
    onMove?:(api:ApiProps)=>void
    children?:Snippet[]
    
  }
  let move = $state({
    in:-1000,
    out:1000
  })
  
  const {onMove,children=[]}:CarouselProps = $props()
  let activeIndex = $state(0); 
  
function apiNext() {
  activeIndex = (activeIndex + 1) % children.length;
  move = { in: -1000, out: 1000 };
}

function apiPrevious() {
  activeIndex = (activeIndex - 1 + children.length) % children.length;
  move = { in: 1000, out: -1000 };
}

  
  $effect(()=>{
    if(onMove){
      onMove({apiNext,apiPrevious})
    }
  })
  

</script>
  {#key activeIndex}
  <div
     class="w-full  h-full overflow-x-hidden flex justify-center items-center "
     in:fly={{x:move.in, duration: 1000,delay:400,easing:cubicInOut}}
     out:fly={{x:move.out, duration: 1000,easing:cubicInOut }}>
       {@render children[activeIndex]()}
  </div>
  {/key}
  
  
    
  
  


   
  

