<script lang='ts'  generics="Item">
	import { maskAction } from '$lib/hooks/useMask.svelte';
  import { cn } from '$lib/utils';
  import Eraser from '$lib/icons/Eraser.svelte';
  import Label from './Label.svelte';
  import { Eye, EyeClosed, CircleCheck,Minimize2 } from '@lucide/svelte';
  import {  onMount } from 'svelte';
  import FieldMessage from './FieldMessage.svelte';
  import type { Snippet } from "svelte"; 
   
  type AutoCompleteProps<Item> = {
    options?: Item[] | string[];
    onSelect?: (item: Item | string) => void;
    property?: keyof Item;
    filterOptions?: (options: Item[] | string[], value: string) => string[] | Item[] | void
    class?: string;
    mask?: string[] | string | RegExp;
    onClear?:() => void;
    value?: string | (Item | string)[];
    title?:string;
    freeSolo?:boolean
    placeholder?:string;
    height?:string|number;
    multiple?:boolean;
    error?:boolean
    message?:string
    prefix?:string
    children?:Snippet<[()=>void,boolean,string]>
  }
 let { 
    options, 
    onSelect, 
    property, 
    filterOptions, 
    class: className, 
    mask = /.+/, 
    onClear, 
    multiple = false,
    value=$bindable(multiple ? ([] as (Item | string)[]) : ''),
    title, 
    placeholder, 
    height,
    error,
    message,
    freeSolo=false,
    prefix,
    children
  }: AutoCompleteProps<Item> = $props();

  let searchValue = $state('');
  let width = $state(0);
  let openOverlay = $state(false);
  let containerRef = $state<HTMLElement | null>(null);
  let toggleEyes = $state(true);
  let Icon = $derived(toggleEyes ?Eye:EyeClosed );
  let selectedItems: (Item | string)[] = $state([]);
  let limitPosition = $state(true);
  let dropdownRef = $state<HTMLUListElement | null>(null);
  let clicked = $state(false)
  const hasSelectedItems = $derived(selectedItems.length > 0)
  
 const inputPlaceholder = $derived.by(() => {
  if (!hasSelectedItems) {
    return placeholder ?? "";
  } else {
    const count = selectedItems.length;
    return `Você selecionou ${count} item${count > 1 ? 's' : ''}`;
  }
});
  $effect(()=>{
    if(freeSolo && !multiple){
      value = searchValue
    }
    
  })
 
 const valueString = ((item: string | Item)=>{
    if( typeof item =='string') return item
    if(property) return item[property] as string
    return ''
 })
 
  const filterByWordStart = $derived.by(() => {
    const filterOptions = options?.filter((item) => {
      let valueStr = '';
      if(typeof item === 'string') valueStr = item;
      if(property && typeof item !== 'string') valueStr = String(item[property]);
      const words = valueStr.split(/\s+/);
      if (!words) return false;
      const matchFound = words.some(word => word.toUpperCase().startsWith(searchValue.toUpperCase()));
      return matchFound;
    });

    if(!filterOptions) return [];

    return filterOptions
  });

  const filteredOptions = $derived.by(() => {
    if(options && filterOptions) {
      const filtered = filterOptions(options, searchValue);
      if(!filtered) return filterByWordStart;
      
      return filtered
    } else {
      return filterByWordStart;
    }
  });

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    searchValue = target.value;
   if(!multiple) openOverlay = searchValue.trim() !== '';
  }

  function handleClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    if(containerRef && !path.includes(containerRef)) {
      openOverlay = false;
      toggleEyes =false
    }
  }
  onMount(()=>{
   if(Array.isArray(value)) {
      value.forEach((item)=>{
        selectedItems.push(item)
      })
    }else{
      searchValue = value
    }
  })
  function isItemSelected(item:(string | Item)) {
   return selectedItems.some(it => {
    if(typeof item==='string' && typeof it=='string' ){
     return item == it
    }if(typeof item !=='string' && typeof it !=='string' && property){
       return item[property] == it[property]
    }
  })
  }

  function toggleSelection(item:(string | Item)) {
    const index = selectedItems.findIndex(it => {
      if(typeof item==='string' && typeof it=='string' ){
     return item== it
      }if(typeof item !=='string' && typeof it !=='string' && property){
       return item[property] == it[property]
    }
    });
    if(index > -1) {
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push(item);
    }
     
    if(Array.isArray(value)) {
      if(typeof item === 'string') return value.push(item);
      value = selectedItems.map(item => item);
    }
  }

  function setSearchAndValue(item:(string | Item)) {
    if(typeof item === 'string') {
      searchValue = item
      value = item
    } else if(typeof item !== 'string' && property) {
      searchValue = String(item[property]);
      value = String(item[property]);
    }
  }
   $effect(() => {
    if (dropdownRef) {
      const rect = dropdownRef.getBoundingClientRect();
      if (rect.top < 0) limitPosition = false;
    }
  });
</script>

<svelte:document onclick={handleClickOutside} />

<div class={cn("flex flex-col gap-2", className)}>
  <Label label={title} />

  <div
    bind:this={containerRef}
    bind:clientWidth={width}
    class={cn("input relative h-full w-full flex items-center    bg-white focus-within:ring-2  transition-all")}
    style="height:{height}px;"
  >
   <p class="uppercase">{prefix}</p>
    <input
      id="in"
      autocorrect='on'
      type="text"
      placeholder={inputPlaceholder}
      class={cn(
        "w-full h-full px-2 py-2 text-[15px] font-semibold tracking-wide uppercase rounded-xl border-0 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none cursor-text "
      )}
      oninput={handleInput}
      bind:value={searchValue}
      onclick={() => { openOverlay = true,toggleEyes=true }}
      use:maskAction={{ mask, value: searchValue }}
    />

    <div class="flex gap-3 items-center pr-3">
      {#if multiple && hasSelectedItems}
        <button
         type='button'
          class="cursor-pointer text-gray-500 hover:text-blue-600 transition-colors"
          onclick={() => { toggleEyes = !toggleEyes, openOverlay=!openOverlay }}
        >
          <Icon size={20} />
        </button>
      {/if}

      <button
      type='button'
        class="cursor-pointer text-gray-500 hover:text-red-600 transition-colors"
        onclick={() => {
          onClear?.();
          if (!multiple) openOverlay = false;
          if(searchValue!==''.trim()) return searchValue = '';
          selectedItems = [];
          if(typeof value =='string') return value = ''
          value = []
        }}
      >
        <Eraser size={20} />
      </button>
    </div>

   

    {#if openOverlay && toggleEyes}
      <ul
        bind:this={dropdownRef}
        class={cn(
          "absolute z-20 flex flex-col gap-1 overflow-auto overflow-x-hidden rounded-xl shadow-lg border border-gray-200 bg-white/95 backdrop-blur-md max-h-[300px] text-gray-800 transition-all",
          limitPosition ? 'bottom-full mb-2' : 'top-full left-0 mt-3'
        )}
        style="min-width:{width}px"
      >
        {#if multiple && filteredOptions.length === 0}
          <li class="my-4 mx-3">
            <strong class="text-gray-700 text-lg font-bold uppercase">
              Sem resultados
            </strong>
          </li>
        {/if}
         
        
          {#each filteredOptions as item, i (i)}
          <li class="flex justify-center items-center" style="max-width:{width}px">
            <button
            type='button'
              class="uppercase flex gap-3 px-4 py-2 w-full text-left cursor-pointer hover:bg-blue-100 active:bg-blue-200 rounded-lg break-words whitespace-normal font-semibold transition-colors"
              onclick={() => {
                multiple ? toggleSelection(item) : setSearchAndValue(item);
                onSelect?.(item);
                 clicked =isItemSelected(item)
                 
                if (!multiple) openOverlay = false;
              }}
            >
              {#if multiple}
                <CircleCheck
                  color={isItemSelected(item) ? '#2563eb' : ''}
                  
                  fill={isItemSelected(item) ? '#2563eb' : 'transparent'}
                  class={cn('border-2 rounded-full', isItemSelected(item) ? 'border-0' : 'border-gray-300')}
                  strokeWidth={4}
                />
              {/if}
                
              {#if typeof item === 'string'}
                {item}
              {:else if typeof item !== 'string' && property}
                {item[property]}
              {/if}
               
            </button>
            {#if children}
             
              {@render children(()=>{
                  multiple ? toggleSelection(item) : setSearchAndValue(item);
                  
              }, isItemSelected(item),valueString(item))}
             
            {/if}
             
          </li>
        {/each}
         
        
       
        
       
      </ul>
    {/if}
  </div>

  <FieldMessage error={error} message={message} />
</div>
