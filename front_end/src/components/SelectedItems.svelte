<script lang="ts" generics="Item">
  import { cn } from "$lib/utils";
  import { Trash2 } from "@lucide/svelte";
    import { Check, Circle,BookOpen } from "lucide-svelte";
  import { fly } from "svelte/transition";

  interface SelectedItemsProps {
    selectedItems: Item[] | string[];
    property?: keyof Item;
    width?: number;
    selectTitle?: string;
    class?:string
    openCheking?:boolean
  }

  // Forma correta em Svelte 5: marcar prop bindable quando for mutável a partir do filho
  let { selectedItems = $bindable(),openCheking=false,property, width,class:style }: SelectedItemsProps = $props();

  const removeItem = (item: Item | string) => {
    selectedItems.filter((select) => {
      if (typeof item === "string" && typeof select === "string") return item !== select;
      if (property && typeof item !== "string" && typeof select !== "string")
        return item[property] !== select[property];
      return true;
    });
  };
 
  let selectedItem:( Item | string)[] = $state([])
  
  
  function check (v:Item|string){
   return selectedItem.some(i =>{
     if(typeof i =='string' && typeof v =='string') return i == v
      if(property && typeof i !=='string' && typeof v !=='string'){
        console.log()
        return   i[property] == v[property]
      }
   })
  }

  const selects = $derived.by(()=>{
   if(openCheking) return selectedItem
   return selectedItems
  })
  




</script>

<div
  class={cn(
    "absolute z-30 top-full left-1 mt-0 flex flex-col overflow-hidden rounded-2xl shadow-xl border border-white/70 backdrop-blur-md bg-white dark:bg-neutral-900/80 max-h-[320px]",
    style
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
    {#each selects as item, i (i)}
      <li
        class="group flex items-center justify-between px-4 py-3 hover:bg-gray-100/70 dark:hover:bg-neutral-800/60 transition-all duration-150"
        style="max-width:{width}px"
        in:fly={{ y: -6, duration: 180 }}
      >
        <!-- Checkbox estilizado -->
        <div class="flex items-center gap-3">
          <button
            class="w-5 h-5 cursor-pointer flex items-center justify-center border rounded-full border-gray-400 dark:border-gray-500 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
            type="button"
            onclick={(()=>{
               if(check(item)){
                selectedItem = selectedItem.filter((it)=>{
                   if(typeof it =='string' && typeof item =='string') return it !== item
                      if(property && typeof it !=='string' && typeof item !=='string'){
                        return   it[property] !== item[property]
                      }
                      return it
                })
                
               } else{
                  selectedItem.push(item)
               }
              
               
            })}
          >

          {#if check(item)}
            <Check
              class={cn(
                "",
               )}
              size={16}
              strokeWidth={3}
            />
            {:else}
             <Circle
              class={cn(
                " ",
               )}
              size={16}
              strokeWidth={0}
            />
            
            
          {/if}
            
          </button>

          <button
            class="uppercase text-sm font-medium tracking-wide text-gray-800 dark:text-gray-100 text-left break-words whitespace-normal"
            type="button"
            onclick={() => {
              /* ação opcional ao clicar no texto */
            }}
          >
            {#if typeof item === "string"}
              {item}
            {:else if typeof item !== "string" && property}
              {String(item[property])}
            {/if}
          </button>
        </div>

        <!-- Botão de remover -->
        <button
          class="p-2.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          type="button"
          aria-label="Remover item"
          onclick={() => removeItem(item)}
        >
         {#if check(item)}
          <Trash2 strokeWidth={2} class="text-gray-400 hover:text-red-600" size={20} />
         {/if}
        </button>
      </li>
    {/each}
  </ul>
</div>