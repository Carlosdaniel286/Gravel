<script lang="ts">
  import { maskAction } from "$lib/hooks/useMask.svelte";
  import { cn } from "$lib/utils";
  import Label from "./Label.svelte";
  import FieldMessage from "./FieldMessage.svelte";

  interface InputProps {
    mask?:string | RegExp | string[]
    class?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    height?: string | number;
    error?: boolean;
    message?: string;
    prefix?:string
  }

  let { mask, class: className, label, placeholder,prefix, value = $bindable(), height, error, message }: InputProps = $props()

  
</script>

<div class={cn("flex flex-col gap-2", className)}>
  <!-- Rótulo visual -->
  <Label label={label} />
  <!-- destivar o autofill do chorme -->
  <label class="hidden" for="name">name</label>
  
  <div style="height:{height}px;" 
  class="input flex items-center gap-1 ">
  {#if prefix }
    <p class=" uppercase font-nunito">{prefix}</p>
  {/if}
  <input
    use:maskAction={{ mask, value }}
    bind:value={value}
    class={cn(" border-0 outline-0 focus:none h-full w-full uppercase  cursor-text placeholder:h-full")}
    id='name'
    aria-label={label}         
    name='name' 
    autocomplete='off'      
    placeholder={placeholder}
    type="text"
  />
  </div>
  
    <FieldMessage {error} {message} />
  
  
</div>


