<script lang="ts">
	import Header from './Header.svelte';
    
import { onMount, type Component,type Snippet} from 'svelte';
	  import { fly } from 'svelte/transition';
    
  type ApiProps = {
   apiNext(): void;
   apiPrevious(): void;
  }
  interface CarouselProps{
    components?: Component[]
    onMove?:(api:ApiProps)=>void
    children?:Snippet
    header?:Snippet<[number]>
  }
  
  let {components:Element=[],onMove,children,header}:CarouselProps = $props()
  let activeIndex = $state(0); 
  
  

  function apiNext(){
      activeIndex = (activeIndex + 1) % Element.length;
  }
  function apiPrevious (){
    activeIndex = (activeIndex - 1) % Element.length;
  }
  
  $effect(()=>{
    if(onMove){
      onMove({apiNext,apiPrevious})
    }
  })
  

</script>
 
   


{#each  Element as App , i}
        <div
          in:fly={{ x: 400 ,  duration: 2000 }} 
          out:fly={{ x: -400 , duration: 2000 }}> 
           {#if i === activeIndex}
             <App/>
          {/if}
        </div>
    {/each}
  

 
    <div>
      <button onclick={() => console.log('Selecionado:')}>
        {@render header?.(activeIndex)}
      </button>
    </div>
 