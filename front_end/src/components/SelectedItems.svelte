<script lang="ts" generics="Item">
  import { cn } from "$lib/utils";
  import { Check, Circle } from "lucide-svelte";
  import { fly } from "svelte/transition";
  

  interface Props {
    options: Item[] | string[];
    selectedItems?:(Item | string)[];
    property?: keyof Item;
    width?: number;
    selectTitle?: string;
    class?: string;
    openCheking?: boolean;
    onselect?:(item: Item | string)=>void
    onclick?: () => void;
  }

  // Props bindables
  let {
   options,
   selectedItems= $bindable([]),
    property: propertyKey,
    width,
    class: customClass,
    openCheking  ,
    
    onselect
  }: Props = $props();

  // Estado interno
 
  let containerRef = $state<HTMLElement | null>(null);
  const isItemChecked = (value: Item | string) => {
    return selectedItems.some((i) => {
      if (typeof i === "string" && typeof value === "string") {
         return i === value;
      }
      if (
        propertyKey &&
        typeof i !== "string" &&
        typeof value !== "string"
      ) {
        
        return i[propertyKey] === value[propertyKey];
      }
    });
  };

  const toggleItem = (item: Item | string) => {
    
    if (isItemChecked(item)) {
      selectedItems = selectedItems.filter((i) => {
        if (typeof i === "string" && typeof item === "string"){
            return i !== item;
        }
        if (
          propertyKey &&
          typeof i !== "string" &&
          typeof item !== "string"
        ){
          
        return i[propertyKey] !== item[propertyKey];
         }
        
        return true;
      });
    } else {
      selectedItems = [...selectedItems, item];
    }
    
  };

  const visibleItems = $derived.by(() =>
     options
  );
</script>

<div
  class={cn(
    " left-1 mt-0 flex flex-col overflow-hidden rounded-2xl shadow-xl border border-white/70 backdrop-blur-md bg-white dark:bg-neutral-900/80 min-h-[320px] max-h-[320px]",
    customClass
  )}
  style="min-width:{width}px"
  bind:this={containerRef}
  aria-live="polite"
>
  <header
    class="px-5 py-3 bg-gradient-to-r from-gray-100/80 to-gray-200/60 dark:from-neutral-800/70 dark:to-neutral-700/70 border-b"
  >
    <h4 class="font-semibold text-gray-800 dark:text-gray-100 tracking-wide text-sm select-none">
       {visibleItems.length}
        {visibleItems.length > 1 ? " itens " : " item "}
    
    </h4>
  </header>

  <div
    class="flex flex-col overflow-y-auto divide-y divide-gray-300/20 dark:divide-neutral-700/20"
  >
    {#each visibleItems as item, index (index)}
      <button
        class="group flex items-center cursor-pointer justify-between px-4 py-3 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60 transition-all duration-150"
        style="max-width:{width}px"
        in:fly={{ y: -6, duration: 180 }}
        onclick={() => {
          toggleItem(item)
          
          onselect?.(item)
        }}
      >
        <div class="flex items-center gap-3">
          <!-- Checkbox -->
          <div
            class="w-5 h-5 flex items-center justify-center border rounded-full border-gray-400 dark:border-gray-500 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            {#if isItemChecked(item)}
              <Check size={16} strokeWidth={3} />
            {:else}
              <Circle size={16} strokeWidth={0} />
            {/if}
          </div>

          <!-- Label -->
          <p
            class="uppercase text-sm font-medium tracking-wide text-gray-800 dark:text-gray-100 text-left break-words whitespace-normal"
          >
            {#if typeof item === "string"}
              {item}
            {:else if propertyKey}
              {String(item[propertyKey])}
            {/if}
          </p>
        </div>
      </button>
    {/each}
  </div>

  
</div>
