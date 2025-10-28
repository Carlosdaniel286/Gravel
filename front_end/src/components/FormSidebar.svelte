<script lang="ts">
  import { FileText, Car, CircleCheckBig} from "lucide-svelte";
  import type { Snippet } from "svelte";

  interface FormSidebarProps {
    children?: Snippet;
    step?: number;
  }

  let { children,step=$bindable(1) }: FormSidebarProps = $props();

  // etapa ativa apenas pra ilustrar (pode mudar manualmente)
  let activeStep = $derived(step)
  $effect(()=>{
    if(step>3) step=3
    if(step<1) step=1
  })
</script>

<aside class="bg-gray-800 py-10 h-screen  items-center w-[280px]">
  <div class="w-full  h-full flex flex-col justify-around px-4">

    <!-- Etapa 1 -->
    <div class="flex items-center gap-3">
      <div
        class={`border-2 rounded-full w-[34px] h-[34px] flex items-center justify-center transition-colors duration-200 
          ${activeStep === 1 ? 'bg-white text-gray-800 border-white' : 'border-gray-400 text-white'}`}
      >
        <FileText size={18} />
      </div>
      <span class={`capitalize text-sm ${activeStep === 1 ? 'text-white font-semibold' : 'text-gray-400'}`}>
        registro geral
      </span>
    </div>

    <!-- Etapa 2 -->
    <div class="flex items-center gap-3">
      <div
        class={`border-2 rounded-full w-[34px] h-[34px] flex items-center justify-center transition-colors duration-200 
          ${activeStep === 2 ? 'bg-white text-gray-800 border-white' : 'border-gray-400 text-white'}`}
      >
        <Car size={18} />
      </div>
      <span class={`capitalize text-sm ${activeStep === 2 ? 'text-white font-semibold' : 'text-gray-400'}`}>
        registro de veículos
      </span>
    </div>

    <!-- Etapa 3 -->
    <div class="flex items-center gap-3">
      <div
        class={`border-2 rounded-full w-[34px] h-[34px] flex items-center justify-center transition-colors duration-200 
          ${activeStep === 3 ? 'bg-white text-gray-800 border-white' : 'border-gray-400 text-white'}`}
      >
        <CircleCheckBig size={18} />
      </div>
      <span class={`capitalize text-sm ${activeStep === 3 ? 'text-white font-semibold' : 'text-gray-400'}`}>
        finalizar registro
      </span>
    </div>
  </div>
</aside>

<div class="overflow-auto w-full h-full">
  {@render children?.()}
</div>
