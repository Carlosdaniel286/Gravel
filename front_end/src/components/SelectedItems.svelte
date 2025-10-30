<script lang="ts" generics="Item">
  import { cn } from "$lib/utils";
  import { Trash2 } from "@lucide/svelte";
  import { fly } from "svelte/transition";

  interface SelectedItemsProps {
    selectedItems: (Item | string)[];
    property?: keyof Item;
    width?: number;
    selectTitle?: string;
  }

  // Forma correta em Svelte 5: marcar prop bindable quando for mutável a partir do filho
  let { selectedItems = $bindable(), property, width }: SelectedItemsProps = $props();

  const removeItem = (item: Item | string) => {
    selectedItems = selectedItems.filter((select) => {
      if (typeof item === "string" && typeof select === "string") return item !== select;
      if (property && typeof item !== "string" && typeof select !== "string")
        return item[property] !== select[property];
      return true;
    });
  };
</script>

<div
  class={cn(
    "absolute z-30 top-full left-0 mt-3 flex flex-col overflow-hidden rounded-2xl shadow-xl border border-white/70 backdrop-blur-md bg-white dark:bg-neutral-900/80 max-h-[320px]"
  )}
  style="min-width:{width}px"
  aria-live="polite"
>
  <header
    class="px-5 py-3 bg-gradient-to-r from-gray-100/80 to-gray-200/60 dark:from-neutral-800/70 dark:to-neutral-700/70 border-b"
  >
    <h4 class="font-semibold text-gray-800 dark:text-gray-100 tracking-wide text-sm select-none">
      {selectedItems.length} {selectedItems.length > 1 ? "itens escolhidos" : "item escolhido"}
    </h4>
  </header>

  <ul class="flex flex-col overflow-y-auto divide-y divide-gray-300/20 dark:divide-neutral-700/20">
    {#each selectedItems as item, i (i)}
      <li
        class="group flex items-center justify-between px-4 py-3 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60 transition-all duration-150"
        style="max-width:{width}px"
        in:fly={{ y: -6, duration: 180 }}
      >
        <button
          class="uppercase text-sm font-medium tracking-wide flex-1 text-gray-800 dark:text-gray-100 text-left break-words whitespace-normal"
          type="button"
          onclick={() => {
            /* exemplo: poderia disparar ação ao clicar no texto (se desejar) */
          }}
        >
          {#if typeof item === "string"}
            {item}
          {:else if typeof item !== "string" && property}
            {String(item[property])}
          {/if}
        </button>

        <button
          class="p-2.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          type="button"
          aria-label="Remover item"
          onclick={() => removeItem(item)}
        >
          <Trash2 strokeWidth={2} class="text-gray-400 hover:text-red-600" size={20} />
        </button>
      </li>
    {/each}
  </ul>
</div>
