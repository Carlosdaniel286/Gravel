<script lang='ts' generics="Item">
	
	import { maskAction } from '$lib/hooks/useMask.svelte';
	
  import { cn } from '$lib/utils';
  import Eraser from '$lib/icons/Eraser.svelte';
    import Label from './Label.svelte';
  
  
  interface AutoCompleteProps {
    options?: Item[] | string[];
    onSelect?: (item: Item | string) => void;
    property?: keyof Item;
    filterOptions?: (options: Item[] | string[], value: string) => string[] | void;
    class?: string;
    mask?: string[] | string | RegExp;
    onClear?:() => void;
    value?:string;
    title?:string
    placeholder?:string
    height?:string|number
  }
  
  const { options, onSelect, property, filterOptions, class: className, mask = /.+/,onClear,value=$bindable(),title,placeholder,height}: AutoCompleteProps = $props();
 
  let searchValue = $state(value??'');
  let width = $state(0);
  let openOverlay = $state(true);
  // Armazenar a instância da máscara
  
  
  // Mapear opções para strings
  function mapOptionsToStrings(): string[] {
    if (!options) return [];
    return options.map(option => {
      //if(openOverlay==true) return option
      if (typeof option === 'string') return option;
      if (!property) return JSON.stringify(option);
      return String(option[property]);
    });
  }

  // Lista de opções mapeadas
  const mappedOptions = mapOptionsToStrings();

  const filterByWordStart = $derived.by(() => {
   
    return mappedOptions.filter((item) => {
      const regex = /\b\w+/g;
      const words = item.match(regex);
      if (!words) return false;
      const matchFound = words.some((word) =>
        word.toUpperCase().startsWith(searchValue.toUpperCase())
      );
      return matchFound;
    });
  });

  const filteredOptions = $derived.by(() => {
     if (options && filterOptions) {
      const filtered = filterOptions(options, searchValue);
      if (!filtered) return filterByWordStart;
      return filtered;
    } else {
      return filterByWordStart;
    }
  });

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    searchValue = target.value;
   
    openOverlay = searchValue.trim() !== '';
  }
</script>

<div class={cn("relative flex flex-col gap-2",className)}>
  <Label  
  for="in"
  label={title}
  />
  <div bind:clientWidth={width} class={cn("input h-full w-full flex",`h-[${height}px]`)}>
    <input 
     id="in"
      type="text" 
      placeholder={placeholder?? "Type to search..."}
      class="border-0 focus:outline-none w-full cursor-text uppercase placeholder:text-gray-800"
      bind:value={searchValue}
      oninput={handleInput}
      onclick={(()=>{
        openOverlay=true
      })}
       use:maskAction={{mask,value:searchValue}}
      
      />
      
      <button class="cursor-pointer" onclick={() => {
      searchValue = '';
      openOverlay = false;
      onClear?.()
    }}><Eraser size={20} /></button>
  </div>
  {#if openOverlay}
    <ul class="bg-gray-100 absolute top-[2.7rem] flex flex-col gap-2 overflow-y-auto rounded-md max-h-[300px]">
      {#each filteredOptions as item, i (i)}
        <li style="min-width:{width}px;">
          <button 
            class="uppercase  px-4 py-2 w-full text-left cursor-pointer hover:bg-gray-200 rounded-md"
            onclick={() => {
              searchValue = item;
              openOverlay = false
              onSelect?.(item);
            }}
          >
            {item}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>