<script lang="ts" generics="Item">
    import { cn } from '$lib/utils';
    import Label from './Label.svelte';


    

  interface SelectProps {
    options?: Item[] | string[];
    onSelect?: (item: Item | string) => void;
    property?: keyof Item; // Propriedade do item a ser exibida
    label?:string
    title?:string
    class?:string
    height?:string|number
  }

  const { options, onSelect, property,label='Escolha',title,class:className,height}: SelectProps = $props();
  let selectedOption = $state<Item | string>(label); // Valor selecionado pelo usuário
  
 
  const obj ={
     option:'',
     value:''
  }
  
  
  // Gera os labels exibidos no select
  function getOptionLabels() {
   if (!options) return [obj];
     return options.map(option => {
      if (typeof option === "string") return {...obj,option:option,value:option}
      if (!property) return {...obj,option:option,value:option}
      
      return {...obj,option:option[property] as string,value:option}
    });

    
  }

  
  
  
  let optionLabels = $derived(getOptionLabels());
  $effect(()=>{
    selectedOption=label
  })
  
</script>
 <div class={cn("flex flex-col gap-2",className)}>
 <Label 
  for="select"
  label={title}
  />
  <select
   class={cn("input",`h-[${height}px]`)}
   id='select'
    onchange={(()=>{
      onSelect?.(selectedOption)
    })}
     bind:value={selectedOption} 
    >
    <option disabled hidden value={label}>{label}</option>
    {#each optionLabels as opt}
      <option value={opt.value}>{opt.option}</option>
    {/each}
  </select>
  </div>

