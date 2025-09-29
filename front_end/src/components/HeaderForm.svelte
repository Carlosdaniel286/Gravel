<script lang="ts">
    import { cn } from "$lib/utils";

  interface HeaderFormProps{
    title?:string
    subTitle?:string
    class?:string
  }
 const {title='titulo',subTitle='subtitulo',class:style}:HeaderFormProps= $props()

</script>

<header class={cn(style)}>
    <h2 class="capitalize font-semibold text-lg">{title}</h2>
    <span class="text-sm text-gray-500">
      {subTitle}
    </span>
  
  </header>