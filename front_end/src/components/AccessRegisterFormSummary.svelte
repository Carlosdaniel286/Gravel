<script lang="ts">
    import type { RegisterVisitorList } from "$lib/consts/access.options";
    import type { Vehicle } from "$lib/types/vehicle.type";
    import type { ApiProps } from "./Carousel.svelte";

   interface AccessRegisterFormSummaryProps{
    api?:ApiProps 
    register?:RegisterVisitorList
    registerVehicle?:Vehicle
   }
</script>



