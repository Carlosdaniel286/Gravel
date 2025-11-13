<script lang="ts">
    import { cn } from "$lib/utils";
   import type {   Component, Snippet } from "svelte";
  
   

  interface ItemProps {
    Icon?:Component
    description?: string;
    class?: string; // cor de fundo do círculo
    onClick?: () => void;
    children?:Snippet
  }

  let { Icon, description = "", class:bgColor = "bg-gray-400", onClick }: ItemProps = $props();
</script>

<button
  onclick={onClick}
  class={cn("flex flex-col items-center justify-center w-14 h-14 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200",bgColor)}
 >
  <Icon  class="w-6 h-6  text-white"/>
  <span class="text-xs text-white mt-1">{description}</span>
</button>
