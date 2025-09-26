<script lang="ts">
  interface HeaderFormProps{
    title?:string
    subTitle?:string
  }
 const {title='titulo',subTitle='subtitulo'}:HeaderFormProps= $props()

</script>

<header>
    <h2 class="capitalize font-semibold text-lg">{title}</h2>
    <span class="text-sm text-gray-500">
      {subTitle}
    </span>
  
  </header>