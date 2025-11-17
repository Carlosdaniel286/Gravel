<script lang="ts">
  import { cn } from "$lib/utils";
  import type { Component, Snippet } from "svelte";

  interface ItemProps {
    Icon?: Component;
    description?: string;
    class?: string; // permite personalizar cor de fundo, se quiser
    onClick?: () => void;
    children?: Snippet;
  }

  let { Icon, description = "", class: ms = "bg-gray-100", onClick }: ItemProps = $props();
</script>

<div class="flex  flex-col  min-w-full items-center gap-1 cursor-pointer">
  <button
    type="button"
    aria-label={description}
    onclick={onClick}
    class={cn(
      "flex items-center justify-center cursor-pointer w-12 h-12 rounded-2xl shadow-sm transition-transform duration-150 transform hover:scale-105 active:scale-100 focus:outline-none focus:ring-1 focus:ring-gray-300",
      ms
    )}
  >
    {#if Icon}
      <Icon fill="white" class="w-6 h-6 text-white" />
    {/if}
  </button>

  {#if description}
    <span class="font-nunito text-[1rem] font-bold text-sm text-gray-900 text-center">
      {description}
    </span>
  {/if}
</div>
