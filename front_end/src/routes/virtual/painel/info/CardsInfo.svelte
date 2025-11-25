<script lang="ts">
  import image from '$lib/assets/rosto.jpg';
  import { ArrowUp, Car, Plus, MapPinHouse,type Icon as IconType } from 'lucide-svelte';

  interface CardsInfoProps{
    flow?:'inside'|'outside'
    cardType?:"resident"|'visitor'|'owner'|'employee'
    flowMode?:'pedestrian'|'vehicle'
  }
  
  let {flow='inside',cardType='employee',flowMode='pedestrian'}:CardsInfoProps = $props()
  
  
  
  
  
  
  const style = (()=>{
     switch(cardType){
       case 'employee':
       return {
        bg:'white',
        textColor:"#1c398e",
        flowMode,
        
       }
      }
  })()


  
  
  
  
  const styles =[
    {
     textColor:"oklch(57.7% 0.245 27.325)",
     bgHover:'#ffe2e2',

    }
  ]

   




</script>

<div 
  class="bg-white w-full max-w-full text-blue-900 rounded-2xl shadow-xl 
         p-4 border border-gray-100 font-nunito select-none"
>
    <!-- Header -->
    <header class="flex items-center gap-6 mb-3 pb-4 border-b border-gray-100">
        <img 
            alt="perfil" 
            src={image} 
            class="w-24 h-24 rounded-full object-cover shadow-md 
                   ring-4 ring-blue-500/40 ring-offset-2"
        />
        <div>
            <p class="capitalize font-extrabold text-3xl tracking-tight text-blue-900">
                Luciana Lany
            </p>
            <p class="text-gray-500 font-medium mt-1">Visitante</p>
        </div>
    </header>

    <!-- Cards (tudo igual ao de Saída) -->
    <div class=" grid  lg:grid-cols-3   px-1.5 lg:h-16 gap-2">

        <!-- Saída -->
        <div 
          class="flex items-center bg-red-200 lg:bg-transparent   justify-center gap-2 rounded-sm
                 hover:bg-red-100 transition duration-200 hover:scale-110"
        >
            <ArrowUp class="text-red-600"/>
            <p class="capitalize font-semibold text-red-600 text-md">Saída</p>
        </div>

        <!-- Carro -->
        <div 
          class="flex items-center bg-blue-200 lg:bg-transparent justify-center gap-2 rounded-sm
                 hover:bg-blue-100 transition duration-200 hover:scale-110"
        >
            <Car class="text-blue-600"/>
            <p class="capitalize font-semibold text-blue-700 text-md">Carro</p>
        </div>

        <!-- Endereço -->
        <div 
          class="flex items-center bg-green-200 lg:bg-transparent justify-center gap-2 rounded-sm
                 hover:bg-green-100 transition duration-200 hover:scale-110"
        >
            <MapPinHouse class="text-green-600"/>
            <p class="capitalize font-semibold text-green-700 text-sm flex lg:flex-col items-center xl:flex xl:flex-row gap-1  ">
                <span class="text-sm capitalize whitespace-nowrap">qd 20</span>
                <span class="text-sm capitalize whitespace-nowrap">lt 02</span>
            </p>
        </div>

    </div>

    <!-- Botão Detalhes separado, mesmo estilo -->
    <div class="mt-3">
      <button
        class="w-full flex items-center cursor-pointer justify-center gap-2 rounded-sm
               hover:bg-orange-100 transition duration-200 hover:scale-[1.05]
               active:scale-[0.97]"
      >
          <Plus class="text-orange-600"/>
          <p class="capitalize font-semibold text-orange-700 text-md">Detalhes</p>
      </button>
    </div>
</div>
  