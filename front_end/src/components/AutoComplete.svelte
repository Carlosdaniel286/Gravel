<script lang='ts'  generics="Item">
  import { maskAction } from '$lib/hooks/useMask.svelte';
  import { cn } from '$lib/utils';
  import Eraser from '$lib/icons/Eraser.svelte';
  import Label from './Label.svelte';
  import { Eye, EyeClosed, CircleCheck,Minimize2 } from '@lucide/svelte';
  import SelectedItems from './SelectedItems.svelte';
  import {  onMount } from 'svelte';
  import type { AutoCompleteProps } from '$lib/types/autoComplete';
    
   
 let { 
    options, onSelect, property, filterOptions, class: className, mask = /.+/, onClear, multiple = false,
    value=$bindable(multiple ? ([] as (Item | string)[]) : ''),
    title, placeholder, height
  }: AutoCompleteProps<Item> = $props();

  let searchValue = $state('');
  let width = $state(0);
  let openOverlay = $state(false);
  let containerRef = $state<HTMLElement | null>(null);
  let toggleEyes = $state(false);
  let Icon = $derived(toggleEyes ? Eye : EyeClosed);
  let selectedItems: (Item | string)[] = $state([]);
  let limitPosition = $state(true);
  let dropdownRef = $state<HTMLUListElement | null>(null);
  const hasSelectedItems = $derived(selectedItems.length > 0)
  
 const inputPlaceholder = $derived.by(() => {
  if (!hasSelectedItems) {
    return placeholder ?? "Digite para buscar...";
  } else {
    const count = selectedItems.length;
    return `Você selecionou ${count} item${count > 1 ? 's' : ''}`;
  }
});
 $effect(()=>{if(!hasSelectedItems) toggleEyes = false})
 
 
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
  <Label for="" label={title} />
  <div bind:this={containerRef} bind:clientWidth={width} class={cn("input relative h-full w-full flex")} style="height:{height}px;">
    <input
      id="in"
      type="text"
      placeholder={inputPlaceholder}
      class={cn("border-0 focus:outline-none w-full cursor-text uppercase ",
      'placeholder:text-gray-800'
      )}
      oninput={handleInput}
      bind:value={searchValue}
      onclick={() => { openOverlay = true }}
      use:maskAction={{mask, value: searchValue}}
    />
    <div class="flex gap-4">
       {#if multiple && openOverlay}
        <button class="cursor-pointer" onclick={() => {
          openOverlay=false
          toggleEyes = false
        }}>
          <Minimize2 size={20} />
        </button>
      {/if}
      {#if multiple && hasSelectedItems}
        <button class="cursor-pointer" onclick={() => {
          toggleEyes = !toggleEyes;
        }}>
          <Icon size={20} />
        </button>
      {/if}
      <button class="cursor-pointer" onclick={() => {
        searchValue = '';
        if(!multiple) openOverlay = false;
        selectedItems=[]
        onClear?.();
      }}>
        <Eraser size={20} />
      </button>
    </div>

     {#if toggleEyes && hasSelectedItems}
      <SelectedItems
      bind:selectedItems={selectedItems}
      property={property}
      width={width}
      />
     {/if}
    
    {#if openOverlay && !toggleEyes}
      <ul bind:this={dropdownRef} class={cn("bg-black absolute z-20  flex flex-col gap-2 overflow-auto overflow-x-hidden rounded-md max-h-[300px]",
        limitPosition ? 'bottom-full mb-2' : 'top-full left-0 mt-4'
      )} style="min-width:{width}px">
         {#if multiple && filteredOptions.length === 0}
            <li class="my-4 mx-3">
              <strong class="text-white text-2xl uppercase">
                Sem resultados
              </strong>
            </li>
          {/if}
        {#each filteredOptions as item, i (i)}
          <li style="max-width:{width}px">
            <button
              class="uppercase flex gap-2.5 px-4 py-2 w-full text-white text-left cursor-pointer hover:bg-gray-700 rounded-md break-words whitespace-normal"
              onclick={() => {
                multiple ? toggleSelection(item) : setSearchAndValue(item);
                onSelect?.(item);
                if(!multiple) openOverlay = false
              }}
            >
              {#if multiple}
                <CircleCheck
                  color={isItemSelected(item) ? 'blue' : ''}
                  fill={isItemSelected(item) ? 'white' : ''}
                  class={cn('border-2 rounded-full', isItemSelected(item) ? 'border-0' : 'border-gray-200')}
                  strokeWidth={4}
                />
              {/if}

              {#if typeof item === 'string'}
                {item}
              {:else if typeof item!== 'string' && property}
                {item[property]}
              {/if}
            </button>
          </li>
        {/each}
     
      </ul>
    {/if}
  </div>
</div>
