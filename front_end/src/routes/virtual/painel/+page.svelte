<script lang='ts'>
    import { cards } from "$lib/consts/ex";
    import Carousel from "../../../components/Carousel.svelte";
    import CardsInfo from "./info/CardsInfo.svelte";
    let maxHeight:number  =  $state(0);
  

</script>

<div bind:clientHeight={maxHeight} class='w-full overflow-hidden'>
  <Carousel flow='y'
    class='p-1 pb-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 '
    maxHeight={maxHeight}
    >
  {#each cards as  item}
    <CardsInfo
     name={item.name}
     flow={item.flow}
     flowMode={item.flowMode}
     cardType={item.cardType}
     address={item.address}
     
    />  
  {/each}
</Carousel>

</div>