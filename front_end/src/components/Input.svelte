<script lang="ts">
  import { cn } from "$lib/utils";
  import Label from "./Label.svelte";
  import FieldMessage from "./FieldMessage.svelte";
    import { onMount } from "svelte";
    import IMask, { type FactoryArg } from "imask";
 
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
    oninput?:()=>void
    onclick?:()=>void
  }

  let { mask, class: className, label, placeholder,prefix, oninput, onclick, value = $bindable(), height, error, message }: InputProps = $props()

  let inputElement: HTMLInputElement | null = $state(null)

  onMount(() => {
    if(!inputElement) return
    if(!mask)return
    const maskInput = IMask(inputElement, {
      mask:mask as any
    });

    return () => {
      maskInput.destroy(); // limpa quando o componente for destruído
    };
  });
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
    oninput={oninput}
    onclick={onclick}
    bind:this={inputElement}
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


