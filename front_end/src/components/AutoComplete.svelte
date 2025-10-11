<script lang='ts' generics="Item">
  import { maskAction } from '$lib/hooks/useMask.svelte';
  import { cn } from '$lib/utils';
  import Eraser from '$lib/icons/Eraser.svelte';
  import Label from './Label.svelte';
  import { Eye, EyeClosed, CircleCheck } from '@lucide/svelte';

  type ListItem = {
    id: string;
    item: Item | string;
  }

  interface AutoCompleteProps {
    options?: Item[] | string[];
    onSelect?: (item: Item | string) => void;
    property?: keyof Item;
    filterOptions?: (options: Item[] | string[], value: string) => string[] | void;
    class?: string;
    mask?: string[] | string | RegExp;
    onClear?:() => void;
    value?: string | (Item | string)[];
    title?:string;
    placeholder?:string;
    height?:string|number;
    setSelect?:string;
    multiple?:boolean;
  }

  let { 
    options, onSelect, property, filterOptions, class: className, mask = /.+/, onClear, multiple = false,
    value=$bindable(multiple ? ([] as (Item | string)[]) : ''),
    title, placeholder, height, setSelect 
  }: AutoCompleteProps = $props();

  let searchValue = $state('');
  let width = $state(0);
  let openOverlay = $state(false);
  let containerRef = $state<HTMLElement | null>(null);
  let toggleEyes = $state(false);
  let Icon = $derived(toggleEyes ? Eye : EyeClosed);

  $effect(() => {
    if(setSelect) searchValue = setSelect;
  });

  let selectedItems: ListItem[] = $state([]);

  const filterByWordStart: ListItem[] = $derived.by(() => {
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

    return filterOptions.map((item) => {
      const id = crypto.randomUUID();
      if(typeof item === 'string') return { item, id };
      return { item, id };
    });
  });

  const filteredOptions = $derived.by(() => {
    if(options && filterOptions) {
      const filtered = filterOptions(options, searchValue);
      if(!filtered) return filterByWordStart;
      const id = crypto.randomUUID();
      return filtered.map((item) => {
        return { item, id };
      });
    } else {
      return filterByWordStart;
    }
  });

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    searchValue = target.value;
    openOverlay = searchValue.trim() !== '';
  }

  function handleClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    if(containerRef && !path.includes(containerRef)) {
      openOverlay = false;
    }
  }

  $effect(() => {
    $inspect(value);
  });

  function isItemSelected(item: ListItem) {
    return selectedItems.some(it => item.id == it.id);
  }

  function toggleSelection(item: ListItem) {
    const index = selectedItems.findIndex(it => it.id === item.id);
    if(index > -1) {
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push(item);
    }

    if(Array.isArray(value)) {
      if(typeof item.item === 'string') return value.push(item.item);
      value = selectedItems.map(item => item.item);
    }
  }

  function setSearchAndValue(item: ListItem) {
    if(typeof item.item === 'string') {
      searchValue = item.item;
      value = item.item;
    } else if(typeof item.item !== 'string' && property) {
      searchValue = String(item.item[property]);
      value = String(item.item[property]);
    }
  }
</script>

<svelte:document onclick={handleClickOutside} />

<div class={cn("flex flex-col gap-2", className)}>
  <Label for="" label={title} />
  <div bind:this={containerRef} bind:clientWidth={width} class={cn("input relative h-full w-full flex")} style="height:{height}px;">
    <input
      id="in"
      type="text"
      placeholder={placeholder ?? "Type to search..."}
      class="border-0 focus:outline-none w-full cursor-text uppercase placeholder:text-gray-800"
      bind:value={searchValue}
      oninput={handleInput}
      onclick={() => { openOverlay = true }}
      use:maskAction={{mask, value: searchValue}}
    />
    <div class="flex gap-4">
      {#if multiple}
        <button class="cursor-pointer" onclick={() => {
          toggleEyes = !toggleEyes;
          openOverlay = !toggleEyes;
        }}>
          <Icon size={20} />
        </button>
      {/if}
      <button class="cursor-pointer" onclick={() => {
        searchValue = '';
        openOverlay = false;
        onClear?.();
      }}>
        <Eraser size={20} />
      </button>
    </div>

    {#if openOverlay}
      <ul class={cn("bg-black absolute z-20 top-full left-0 mt-4 flex flex-col gap-2 overflow-auto overflow-x-hidden rounded-md max-h-[300px]")} style="min-width:{width}px">
        {#each filteredOptions as item, i (i)}
          <li style="max-width:{width}px">
            <button
              class="uppercase flex gap-2.5 px-4 py-2 w-full text-white text-left cursor-pointer hover:bg-gray-700 rounded-md break-words whitespace-normal"
              onclick={() => {
                multiple ? toggleSelection(item) : setSearchAndValue(item);
                onSelect?.(item.item);
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

              {#if typeof item.item === 'string'}
                {item.item}
              {:else if typeof item.item !== 'string' && property}
                {item.item[property]}
              {/if}
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
