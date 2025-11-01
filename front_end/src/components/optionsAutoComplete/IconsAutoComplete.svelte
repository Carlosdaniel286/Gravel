 <script lang="ts" generics="Item">
  import type { RegisterVisitorList } from "$lib/consts/access.options";
  import { cn } from "$lib/utils";
  import { CalendarClock, Hourglass, Pin } from "lucide-svelte";
  import { onMount } from "svelte";
    import { derived } from "svelte/store";
    import SelectedItems from "../SelectedItems.svelte";
    import Select from "../Select.svelte";

  interface IconsAutoCompleteProps {
    onClick?: () => void;
    clicked?: boolean;
    register?: RegisterVisitorList;
    label?: string;
    
  }

  let { onClick, clicked = false, register = $bindable(), label }: IconsAutoCompleteProps = $props();

  type SelectedItem = "Esporádico" | "Fixo" | "Eventual" | null;
  

  let hoverEsporadico = $state(false);
  let hoverFixo = $state(false);
  let hoverEventual = $state(false);
  let selectedItem = $state<SelectedItem>(null);
  
   $effect(() => {
    if (!register) return;
     if(register.address.length==0) selectedItem =null
     register.address.map((item) => {
      if (item.label === label) {
        if( selectedItem == null ){
          selectedItem = item.accessType
         }
        if (selectedItem !== null) item.accessType = selectedItem;
      }
      return item;
    });
  });

  onMount(() => {
    register?.address.forEach((item) => {
      if (item.label === label) {
        selectedItem = item.accessType;
      }
    });
  });
</script>

<div class="flex justify-around w-[60%]">
  <!-- Esporádico -->
  <button
    type="button"
    class={cn(
      "relative flex items-center justify-center w-9 h-9 shadow-sm cursor-pointer rounded-md transition-all focus:ring-2 active:scale-95",
      selectedItem === "Esporádico" ? "focus:ring-blue-400" : "focus:ring-0"
    )}
    class:bg-gray-200={selectedItem !== "Esporádico"}
    class:text-gray-600={selectedItem !== "Esporádico"}
    class:bg-blue-500={selectedItem === "Esporádico"}
    class:text-white={selectedItem === "Esporádico"}
    onmouseenter={() => (hoverEsporadico = true)}
    onmouseleave={() => (hoverEsporadico = false)}
    onclick={() => {
      
      if (selectedItem === "Esporádico") {
        onClick?.();
        selectedItem = null;
        return;
      }
      selectedItem = "Esporádico";
      if (!clicked) onClick?.();
    }}
    aria-label="Esporádico"
    aria-pressed={selectedItem === "Esporádico"}
  >
    <Hourglass size={19} />
    {#if hoverEsporadico}
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
    class={cn(
      "relative flex items-center justify-center w-9 h-9 shadow-sm cursor-pointer rounded-md transition-all focus:ring-2 active:scale-95",
      selectedItem === "Fixo" ? "focus:ring-green-400" : "focus:ring-0"
    )}
    class:bg-gray-200={selectedItem !== "Fixo"}
    class:text-gray-600={selectedItem !== "Fixo"}
    class:bg-green-500={selectedItem === "Fixo"}
    class:text-white={selectedItem === "Fixo"}
    onmouseenter={() => (hoverFixo = true)}
    onmouseleave={() => (hoverFixo = false)}
    onclick={() => {
      if (selectedItem === "Fixo") {
        onClick?.();
        selectedItem = null;
        return;
      }
      selectedItem = "Fixo";
      if (!clicked) onClick?.();
    }}
    aria-label="Fixo"
    aria-pressed={selectedItem === "Fixo"}
  >
    <Pin size={20} />
    {#if hoverFixo}
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
    class={cn(
      "relative flex items-center justify-center w-9 h-9 shadow-sm cursor-pointer rounded-md transition-all focus:ring-2 active:scale-95",
      selectedItem === "Eventual" ? "focus:ring-yellow-400" : "focus:ring-0"
    )}
    class:bg-gray-200={selectedItem !== "Eventual"}
    class:text-gray-600={selectedItem !== "Eventual"}
    class:bg-yellow-500={selectedItem === "Eventual"}
    class:text-white={selectedItem === "Eventual"}
    onmouseenter={() => (hoverEventual = true)}
    onmouseleave={() => (hoverEventual = false)}
    onclick={() => {
      if (selectedItem === "Eventual") {
        onClick?.();
        selectedItem = null;
        return;
      }
      selectedItem = "Eventual";
      if (!clicked) onClick?.();
    }}
    aria-label="Eventual"
    aria-pressed={selectedItem === "Eventual"}
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
