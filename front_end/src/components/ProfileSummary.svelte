<script lang="ts">
  import Img from '$lib/assets/default_img.jpg';
  import Button from './Button.svelte';
  import { IdCard,SquareChevronRight,Trash } from 'lucide-svelte';
    import ButtonAdd from './ButtonAdd.svelte';
//square-chevron-right
  interface CardInfoPerson {
    name?: string;
    cpf?: string;
    typeProfile?: "driver" | "passenger"|'pedestrian'
    onEdit?:()=>void
    onDelete?:()=>void
    onAddDriver?:()=>void
  }

  const {
    name,
    cpf ,
    typeProfile ='driver',
    onEdit,
    onDelete,
    onAddDriver
  }: CardInfoPerson = $props();


const text = $derived.by(()=>{
   switch(typeProfile){
    case 'driver':
      return 'condutor'
    case 'passenger':
      return 'passagerio'
    case 'pedestrian':
      return 'pedestre'
   }
})
const headerGradient =$derived(
  typeProfile === 'driver'
    ? 'from-cyan-500 via-cyan-400 to-sky-400'
    : typeProfile === 'passenger'
    ? 'from-blue-800 via-blue-700 to-indigo-700':
    'from-rose-600 via-rose-500 to-rose-600'
)

const badgeColor =$derived(
  typeProfile === 'driver'
    ? 'bg-cyan-100 text-cyan-900'
    : typeProfile === 'passenger'
    ? 'bg-indigo-100 text-blue-900'
    : 'bg-rose-100 text-rose-900') // Badge rosa claro com texto escuro



const buttonGradient = $derived(
  typeProfile === 'driver'
    ? 'from-cyan-400 via-cyan-300 to-sky-300'
    : typeProfile === 'passenger'
    ? 'from-blue-700 via-blue-600 to-indigo-600'
    : 'from-rose-600 via-rose-500 to-rose-500' // Botão rosa
)
  const  badgeIconColor = $derived(
     typeProfile === 'driver'
    ? 'text-cyan-800'
    : typeProfile === 'passenger'
    ? 'text-blue-800'
    : 'text-rose-800'
  )

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
      {text}

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
        <span class="uppercase"><SquareChevronRight class={badgeIconColor} size={20}/></span>
      </div>
    </div>

    <!-- Botão -->
    <footer class="mt-7 border-t border-gray-100 pt-4 gap-8 flex justify-center">
      {#if name}
        <Button
        text={"Editar"}
        onClick={onEdit}
        class={`rounded-full font-bold shadow-md hover:shadow-lg transition-all
               bg-gradient-to-r ${buttonGradient} text-white px-6 py-2`}
      />
      {:else}
      <ButtonAdd 
      onClick={onAddDriver}
       text='condutor'
        style={` font-bold shadow-md hover:shadow-lg transition-all
               text-white px-6 py-2`}
      />
      {/if}
       <button
        onclick={onDelete}
        class={`rounded-full font-bold shadow-md hover:shadow-lg transition-all 
         bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white px-6 py-2
          cursor-pointer
         `
         }

      ><Trash  /></button>
    </footer>
  </div>
</article>
