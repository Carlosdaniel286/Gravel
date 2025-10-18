<script lang='ts' generics="Item">
import { cn } from '$lib/utils';
import { Trash2 } from '@lucide/svelte';
interface SelectedItemsProps{
    selectedItems: (Item | string)[]
    property?:keyof Item
    width?:number
    selectTitle?:string
    
  }
let {selectedItems=$bindable(),property,width}:SelectedItemsProps = $props()
  
</script>
   <div class={cn("absolute bg-gray-200 z-20 top-full left-0 mt-4 flex flex-col   overflow-auto overflow-x-hidden rounded-md max-h-[300px]")} style="min-width:{width}px">
      <header class="bg-gray-300 px-4 py-2">
        <h4>{selectedItems.length} {selectedItems.length>1?"itens escolhidos":'item escolhido'} </h4>
      </header>
        {#each selectedItems as item, i (i)}
         <ul class="flex flex-col  ">
          <li class="flex bg-black hover:bg-gray-700" style="max-width:{width}px">
            <button
              class="uppercase  flex  px-4 py-2 w-full text-white text-left cursor-pointer   break-words whitespace-normal"
              >
            {#if typeof item === 'string'}
                {item}
               {:else if typeof item !== 'string' && property}
                {item[property]}
              {/if}
            </button>
            <button class=" cursor-pointer "
             onclick={(()=>{
            selectedItems = selectedItems.filter(select => {
                if (typeof item === "string" && typeof select === "string") {
                  return item !== select; // mantém apenas os que são diferentes
                }
                if (property && typeof item !== "string" && typeof select !== "string") {
                  return item[property] !== select[property]; // compara propriedade
                }
                return true; // mantém os outros itens que não entram nas condições
              });
          })}
            >
               <Trash2 strokeWidth={2} class='text-gray-400 hover:text-red-600' size={22}/>
            </button>
          </li>
          </ul>
        {/each}
    </div>