<script lang="ts">
  import Button from './Button.svelte';
  import { Car, Trash } from 'lucide-svelte';
    import ButtonAdd from './ButtonAdd.svelte';

  interface CarCardProps {
    plate?: string;
    brand?: string;
    model?: string;
    onClick?:()=>void
    onEdit?:()=>void
    onDelet?:()=>void
  }

  const { plate='AAA-0000', brand='Fiat', model='Uno',onClick,onEdit,onDelet }: CarCardProps = $props();
</script>

<article
  class="bg-white relative w-full max-w-sm rounded-[2rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)]
         overflow-hidden font-nunito select-none transition-transform duration-500
         hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
  aria-label={`Car card ${plate}`}
>
  <!-- Header -->
  <header
    class="h-32 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500
           flex items-center justify-center rounded-b-[2.5rem]"
  >
    <h2 class="text-white text-2xl uppercase font-semibold tracking-wide drop-shadow-md">
      Veículo
    </h2>
  </header>

  <!-- Car icon -->
  <div class="absolute left-1/2 -translate-x-1/2 top-24 bg-orange-100 rounded-full p-4 shadow-lg">
    <Car class="text-orange-600 h-24 w-24" />
  </div>

  <!-- Content -->
  <div class="pt-28 px-6 pb-3 mt-3 text-center">
    <p class="capitalize text-xl font-extrabold text-gray-900 leading-tight tracking-wide">{brand}</p>

    <!-- Info badges -->
    <div class="mt-4 flex justify-center gap-3 flex-wrap items-center">
      <div
        class="flex items-center gap-2 bg-amber-50 text-amber-800 px-6 py-2 rounded-full
               text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
      >
        <span class="uppercase">Placa: {plate}</span>
      </div>

      <div
        class="flex items-center gap-2 bg-orange-50 text-orange-800 px-6 py-2 rounded-full
               text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
      >
        <span class="uppercase">{model}</span>
      </div>
    </div>

    <!-- Button -->
    <footer class="mt-5 border-t border-gray-100 pt-2 flex gap-5 justify-center">
      <Button
        text="Editar"
        onClick={onEdit}
        class="rounded-full font-bold shadow-md hover:shadow-lg transition-all
               bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white px-6 py-2"
      />
      <ButtonAdd
       text='passageiro'
       style='bg-orange-600 rounded-full font-bold shadow-md hover:shadow-lg hover:bg-orange-500'
       onClick={onClick}
      />

      <button
        onclick={onDelet}
        class={`rounded-full font-bold shadow-md hover:shadow-lg transition-all 
         bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white px-6 py-2
          cursor-pointer
         `
         
         }

      ><Trash  /></button>
    </footer>
  </div>
</article>
