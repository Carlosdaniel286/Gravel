<script lang='ts'>
    import { cn } from "$lib/utils";

    
    import Carousel from "./Carousel.svelte";
    import Cards from "./header/Cards.svelte";
    
   interface HeaderProps {
     class?:string
    }

    let {class:style}:HeaderProps =$props()

</script>

<header class={cn("px-2 my-5   ",style)}>
 <Carousel 
flow='x'
class='gap-2   '
>
   <Cards 
    cardType='visitors'/>
    <Cards cardType='order'/>
    <Cards cardType='releases'/>
    <Cards cardType='inflow'/>
    <Cards cardType='outflow'/>
    <Cards cardType='report'/> 
</Carousel>
</header>