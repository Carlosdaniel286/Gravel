<script lang="ts" generics="Item">
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';
  import Label from './Label.svelte';
    import FieldMessage from './FieldMessage.svelte';
    import { useEffect } from 'react';
   

  interface SelectProps {
    options?: Item[] | string[];
    onSelect?: (item: Item | string) => void;
    property?: keyof Item;
    valueProperty?: keyof Item;
    label?: string;
    title?: string;
    class?: string;
    height?: string | number;
    value?: string;
    disabled?:boolean
    error?:boolean
    message?:string
  }

  let { value=$bindable(), options, onSelect, property, label='Escolha', title, class:className, height,disabled=false,valueProperty,error,message }: SelectProps = $props();
  
  
  const labelSelect = $derived.by(()=>{
    if(label && !value) return label
    return value
  })
  let selectedOption = $state<Item | string>('');
  
    $effect(()=>{
    if(labelSelect){
      selectedOption=labelSelect
    }
  })
  
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

  const styleDisabled = disabled?'text-gray-400 hover:ring-transparent':''
</script>

<div class={cn("flex flex-col gap-2", className)}>
  <Label 
   label={title}
  />
   <select
    class={cn("input text-gray-700",styleDisabled)}
    style="height:{height}px; "
    id='select'
    disabled={disabled}
    
    onchange={() => {
      onSelect?.(selectedOption);
      
      const objProperty = valueProperty?valueProperty:property
      if (!objProperty) return;
        if (typeof selectedOption !== 'string') {
        value = selectedOption[objProperty] as string;
      } else {
        value = selectedOption;
      }
      
    }}
    bind:value={selectedOption}
  >
   
    <option  disabled hidden value={labelSelect}>{labelSelect}</option>
    
    {#each optionLabels as opt}
      <option   value={opt.value}>{opt.option}</option>
    {/each}
  </select>
   <FieldMessage
    error={error}
    message={message}
   /> 
 </div>
