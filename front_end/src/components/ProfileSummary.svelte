<script lang="ts">
  import Img from '$lib/assets/default_img.jpg';
  import Button from './Button.svelte';
  import { IdCard } from 'lucide-svelte';

  interface CardInfoPerson {
    name?: string;
    cpf?: string;
    typeProfile?: "driver" | "passenger";
  }

  const {
    name = 'Carlos Daniel',
    cpf = '000.000.000-00',
    typeProfile ='driver'
  }: CardInfoPerson = $props();

  // Cores dinâmicas para header, badge e botão
  // Cores dinâmicas para header, badge e botão
const headerGradient =
  typeProfile === 'driver'
    ? 'from-cyan-500 via-cyan-400 to-sky-400'
    : 'from-red-500 via-red-400 to-pink-400'; // vermelho para passageiro

const badgeColor =
  typeProfile === 'driver'
    ? 'bg-cyan-100 text-cyan-900'
    : 'bg-red-100 text-red-900'; // vermelho para passageiro

const badgeIconColor =
  typeProfile === 'driver' ? 'text-cyan-800' : 'text-red-800'; // vermelho para passageiro

const buttonGradient =
  typeProfile === 'driver'
    ? 'from-cyan-400 via-cyan-300 to-sky-300'
    : 'from-red-400 via-red-300 to-pink-300'; // vermelho para passageiro

</script>

<article
  class="bg-white relative w-full max-w-sm rounded-[2rem] shadow-[0_8px_20px_rgba(0,0,0,0.08)]
         overflow-hidden font-nunito select-none transition-transform duration-500
         hover:scale-[1.01] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]"
  aria-label={`Cartão de ${name}`}
>
  <!-- Header -->
  <header
    class={`h-36 w-full flex items-center justify-center rounded-b-[3rem] bg-gradient-to-r ${headerGradient}`}
  >
    <h2 class="text-white text-2xl uppercase font-semibold tracking-wide drop-shadow-md">
      {typeProfile === 'driver' ? 'Condutor' : 'Passageiro'}
    </h2>
  </header>

  <!-- Avatar -->
  <div class="absolute left-1/2 -translate-x-1/2 top-24">
    <img
      src={Img}
      alt={`Foto de ${name}`}
      class="h-28 w-28 rounded-full object-cover ring-4 ring-white
             shadow-[0_10px_25px_rgba(0,0,0,0.15)]
             transition-transform duration-500 ease-in-out hover:scale-105"
      loading="lazy"
      draggable="false"
    />
  </div>

  <!-- Conteúdo -->
  <div class="pt-20 px-6 pb-6 text-center">
    <p class="capitalize text-lg font-extrabold text-gray-900 leading-tight tracking-wide">
      {name}
    </p>

    <!-- Infos -->
    <div class="mt-5 flex justify-center flex-wrap gap-3 items-center">
      <div
        class={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow ${badgeColor}`}
      >
        <IdCard class={badgeIconColor} size={20} />
        <span class="uppercase">{cpf}</span>
      </div>

      <div
        class={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow ${badgeColor}`}
      >
        <span class="uppercase">{typeProfile === 'driver' ? 'Condutor' : 'Passageiro'}</span>
      </div>
    </div>

    <!-- Botão -->
    <footer class="mt-7 border-t border-gray-100 pt-4 flex justify-center">
      <Button
        text="Editar"
        class={`rounded-full font-bold shadow-md hover:shadow-lg transition-all
               bg-gradient-to-r ${buttonGradient} text-white px-6 py-2`}
      />
    </footer>
  </div>
</article>
