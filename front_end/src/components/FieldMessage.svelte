<script lang="ts">
 import {TriangleAlert } from '@lucide/svelte';
 interface FieldMessageProps{
  error?:boolean
  message?:string
 }

 const {error=false,message}:FieldMessageProps= $props()
  
 const propsError = $derived(error)
 const propsMessage = $derived(message)

</script>
  <div class="flex items-center min-h-[19px]  gap-1">
    {#if propsError}
        <span class=" ">
        <TriangleAlert size={12} class='text-red-500  '/>
     </span>
    <span class='text-red-500 font-nunito text-center text-[0.8rem]'>
      {propsMessage}
    </span>
    {/if}
 </div>