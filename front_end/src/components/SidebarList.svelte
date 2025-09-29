<script lang="ts">
  import type { Component } from "svelte";

  interface ItemProps {
    Icon: Component;
    description?: string;
    onClick?: () => void; // callback opcional
  }


  let { Icon, description = "",onClick }: ItemProps = $props();
</script>

<button 
 onclick={onClick}
class="cursor-pointer flex px-4 py-2.5 items-center gap-4 capitalize font-semibold hover:bg-gray-200 text-md">
  
    <Icon />
 
  <span class="text-gray-700 font-semibold">{description}</span>
</button>
