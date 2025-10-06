<script lang="ts" generics="Item">
  import { cn } from '$lib/utils';
  import { onMount } from 'svelte';
  import Label from './Label.svelte';
   

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
  }

  let { value=$bindable(), options, onSelect, property, label='Escolha', title, class:className, height,disabled=false,valueProperty }: SelectProps = $props();
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

  
  
  onMount(() => {
    
    if(label!=='Escolha' && label && !value){
       selectedOption=label
      }
      if(value){
    
      let valuePrevious = '';

      for (const item of optionLabels) {
        const obj = item.value;

      // Caso o valor seja uma string simples
      if (typeof obj === 'string' && obj === value) {
        valuePrevious = obj;
        break;
      }

      // Se não tiver as propriedades necessárias, pula
      if (!property || !valueProperty) continue;

      // Caso o valor seja um objeto
      if (obj && typeof obj === 'object' && obj[valueProperty] === value) {
        valuePrevious = obj[property] as string;
        break;
      }
    }

    selectedOption = valuePrevious;
    selected = valuePrevious;
  }
  });
  
  const styleDisabled = disabled?'text-gray-400 hover:ring-transparent':''
</script>

<div class={cn("flex flex-col gap-2", className)}>
  <Label 
    for="select"
    label={title}
  />
   <select
    class={cn("input",styleDisabled)}
    style="height:{height}px;"
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
    <option disabled hidden value={selected}>{selected}</option>
    {#each optionLabels as opt}
      <option  value={opt.value}>{opt.option}</option>
    {/each}
  </select>
 </div>
