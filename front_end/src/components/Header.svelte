<script>
    import Carousel from "./Carousel.svelte";
    import Cards from "./header/Cards.svelte";


</script>

<header class="px-2 mt-2  shadow-2xl bg-gray-200">
<Carousel 
flow='x'

class='gap-1  '
>
    <Cards cardType='visitors'/>
    <Cards cardType='order'/>
    <Cards cardType='releases'/>
    <Cards cardType='inflow'/>
    <Cards cardType='outflow'/>
    <Cards cardType='report'/>
</Carousel>
</header>