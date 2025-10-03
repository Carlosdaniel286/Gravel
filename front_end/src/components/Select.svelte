<script lang="ts" generics="Item">
  import { cn } from '$lib/utils';
    import { onMount } from 'svelte';
  import Label from './Label.svelte';
    import { useEffect } from 'react';

  interface SelectProps {
    options?: Item[] | string[];
    onSelect?: (item: Item | string) => void;
    property?: keyof Item; // Propriedade do item a ser exibida
    label?: string;
    title?: string;
    class?: string;
    height?: string | number;
    value?: string;
    setSelected?:string
  }

  let { value=$bindable(), options, onSelect, property, label='Escolha', title, class:className, height,setSelected }: SelectProps = $props();
  let selectedOption = $state<Item | string>('');
  let selected= $state(label)
  const obj = {
    option: '',
    value: ''
  };

  // Gera os labels exibidos no select
  const optionLabels = $derived.by(() => {
    if (!options) return [obj];
    return options.map(option => {
      if (typeof option === "string") return { ...obj, option: option, value: option };
      if (!property) return { ...obj, option: option, value: option };
      return { ...obj, option: option[property] as string, value: option };
    });
  });

  
   $effect(()=>{
     if(setSelected){
      selectedOption=setSelected
      selected=setSelected
     }
   })
  onMount(() => {
    
    if(label!=='Escolha' && label && !value){
       selectedOption=label
      }
    if(value){
      selectedOption=value
      selected=value
    }
    
  });


</script>

<div class={cn("flex flex-col gap-2", className)}>
  <Label 
    for="select"
    label={title}
  />
   <select
    class={cn("input")}
    style="height:{height}px;"
    id='select'
    onchange={() => {
      onSelect?.(selectedOption);
        if (!property) return;
      if (typeof selectedOption !== 'string') {
        value = selectedOption[property] as string;
      } else {
        value = selectedOption;
      }
    }}
    bind:value={selectedOption}
  >
    <option disabled hidden value={selected}>{selected}</option>
    {#each optionLabels as opt}
      <option value={opt.value}>{opt.option}</option>
    {/each}
  </select>
 </div>
