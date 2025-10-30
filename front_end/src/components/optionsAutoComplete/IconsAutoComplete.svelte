<script lang="ts">
    import type { RegisterVisitorList } from "$lib/consts/access.options";
    import { CalendarClock, Hourglass, Pin } from "lucide-svelte";
    import { onMount } from "svelte";
    
   
  interface IconsAutoCompleteProps {
    onClick?: () => void;
    clicked?: boolean;
    register?: RegisterVisitorList;
    label?:string
    
  }
  let { onClick, clicked = false,register=$bindable(),label}: IconsAutoCompleteProps = $props();
  
  type SelectedItem = "Esporádico" | "fixo" | "eventual" | null;

  let hoverOccasional = $state(false);
  let hoverFixed = $state(false);
  let hoverEventual = $state(false);
  let selectedItem = $state<SelectedItem>(null);

  $effect(() => {
    if(!register) return
     register.address.map((item)=>{
      if(item.label==label){
       if(selectedItem!==null) item.accessType=selectedItem
      }
      return item
    })
  });
   
  onMount(()=>{
    register?.address.forEach((item)=>{
      if(item.label==label){
        selectedItem = item.accessType
      }
    })
  })

  
  

  
  

</script>

<div class="flex justify-around w-[60%]">
  <!-- Esporádico -->
  <button
    type="button"
    class="relative flex items-center justify-center w-9 h-9 shadow-sm cursor-pointer rounded-md transition-all focus:ring-2 focus:ring-blue-400 active:scale-95"
    class:bg-gray-200={selectedItem !== "Esporádico"}
    class:text-gray-600={selectedItem !== "Esporádico"}
    class:bg-blue-500={selectedItem === "Esporádico"}
    class:text-white={selectedItem === "Esporádico"}
    onmouseenter={() => (hoverOccasional = true)}
    onmouseleave={() => (hoverOccasional = false)}
    onclick={() => {
      selectedItem = "Esporádico";
      if (!clicked) onClick?.();
      
    }}
    aria-label="Esporádico"
    aria-pressed={selectedItem === "Esporádico"}
  >
    <Hourglass size={19} />
    {#if hoverOccasional}
      <span
        class="absolute bottom-[-36px] left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-semibold text-white bg-gray-900 rounded whitespace-nowrap z-50"
      >
        Esporádico
      </span>
    {/if}
  </button>

  <!-- Fixo -->
  <button
    type="button"
    class="relative flex items-center justify-center w-9 h-9 shadow-sm cursor-pointer rounded-md transition-all focus:ring-2 focus:ring-green-400 active:scale-95"
    class:bg-gray-200={selectedItem !== "fixo"}
    class:text-gray-600={selectedItem !== "fixo"}
    class:bg-green-500={selectedItem === "fixo"}
    class:text-white={selectedItem === "fixo"}
    onmouseenter={() => (hoverFixed = true)}
    onmouseleave={() => (hoverFixed = false)}
    onclick={() => {
      selectedItem = "fixo";
       if (!clicked) onClick?.();
       
    }}
    aria-label="Fixo"
    aria-pressed={selectedItem === "fixo"}
  >
    <Pin size={20} />
    {#if hoverFixed}
      <span
        class="absolute bottom-[-36px] left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-semibold text-white bg-gray-900 rounded whitespace-nowrap z-50"
      >
        Fixo
      </span>
    {/if}
  </button>

  <!-- Eventual -->
  <button
    type="button"
    class="relative flex items-center justify-center w-9 h-9 shadow-sm cursor-pointer rounded-md transition-all focus:ring-2 focus:ring-yellow-400 active:scale-95"
    class:bg-gray-200={selectedItem !== "eventual"}
    class:text-gray-600={selectedItem !== "eventual"}
    class:bg-yellow-500={selectedItem === "eventual"}
    class:text-white={selectedItem === "eventual"}
    onmouseenter={() => (hoverEventual = true)}
    onmouseleave={() => (hoverEventual = false)}
    onclick={() => {
      selectedItem = "eventual";
      if (!clicked) onClick?.();
      
    }}
    aria-label="Eventual"
    aria-pressed={selectedItem === "eventual"}
  >
    <CalendarClock size={20} />
    {#if hoverEventual}
      <span
        class="absolute bottom-[-36px] left-1/2 -translate-x-1/2 px-2 py-1 text-xs font-semibold text-white bg-gray-900 rounded whitespace-nowrap z-50"
      >
        Eventual
      </span>
    {/if}
  </button>
</div>
