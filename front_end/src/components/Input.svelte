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
  }

  let { mask, class: className, label, placeholder, value = $bindable(), height, error, message }: InputProps = $props()

  
</script>

<div class={cn("flex flex-col gap-2", className)}>
  <!-- Rótulo visual -->
  <Label label={label} />
  <!-- destivar o autofill do chorme -->
  <label class="hidden" for="name">name</label>
  
  <input
    use:maskAction={{ mask, value }}
    bind:value={value}
    class={cn("input uppercase cursor-text placeholder:h-full")}
    style="height:{height}px;"
    id='name'
    aria-label={label}         
    name='name' 
    autocomplete='off'      
    placeholder=''
    type="text"
  />
  <FieldMessage {error} {message} />
</div>


