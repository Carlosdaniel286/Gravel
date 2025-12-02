<script lang="ts">
  import image from '$lib/assets/rosto.jpg';
  import {
    ArrowUp,
    ArrowDown,
    Car,
    Footprints,
    MapPinHouse,
    Clock,
    
  } from 'lucide-svelte';

  import Info from './Info.svelte';

  type FlowType = 'entrada' | 'saída';
  type CardType = 'residente' | 'vistante' | 'proprietário' | 'funcionário' | 'encomendas';
  type FlowMode = 'pedestre' | 'veículo';

  export interface CardsInfoProps {
    flow?: FlowType;
    cardType?: CardType;
    flowMode?: FlowMode;
    name?: string;
    address?: string;
  }

  let {
    flow = 'saída',
    cardType = 'funcionário',
    flowMode = 'veículo',
    name = 'luciana lany',
    address = 'Qd 20 lt 02'
  }: CardsInfoProps = $props();
  
  
  // Ícone dependendo da direção
  const iconFlow = flow === 'entrada' ? ArrowDown : ArrowUp;

  // Cores do card de entrada/saída
  const flowColor = {
    saída: {
      bg: 'bg-red-200',
      textColor: 'text-red-600',
      hover: '#ffe2e2'
    },
    entrada: {
      bg: 'bg-blue-200',
      textColor: 'text-blue-600',
      hover: '#BFDBFE'
    }
  }[flow];
</script>

<div class="bg-white w-full hover:scale-101 text-blue-900 rounded-2xl shadow-xl p-4 
            border border-gray-100 font-nunito select-none">

  <!-- Header -->
  <header class="flex items-center cursor-pointer gap-6 mb-4 pb-4 border-b border-gray-100">
    <img
      alt="perfil"
      src={image}
      class="w-24 h-24 rounded-full object-cover shadow-md
             ring-4 ring-blue-500/40 ring-offset-2"
    />

    <div class="flex flex-col gap-1 justify-center">
      <p class="capitalize font-extrabold text-3xl tracking-tight text-blue-900">
        {name}
      </p>
      <p class="text-gray-500 capitalize font-medium mt-1">
        {cardType}
      </p>
      <div class="flex items-center  gap-1">
        <div><Clock size={14} class='text-sky-500'/></div>
      <p class="text-sky-500 text-sm">
        10:30
      </p>
      </div>
    </div>
  </header>

  <!-- Cards -->
  <div class="grid lg:grid-cols-3 auto-rows-auto gap-2 px-1.5">

    <!-- Entrada/Saída -->
    <Info
      bg={flowColor.bg}
      text={flow}
      textColor={flowColor.textColor}
      icon={iconFlow}
      hover={flowColor.hover}
    />

    <!-- Veículo / Pedestre -->
    <Info
      bg="bg-yellow-200"
      text={flowMode}
      textColor="text-yellow-500"
      icon={flowMode === 'pedestre' ? Footprints : Car}
      hover="#FEF9C3"
    />

    <!-- Endereço -->
     <div class="h-full w-full  ">
    <Info
      bg="bg-green-200"
      text={address}
      textColor="text-green-600"
      icon={MapPinHouse}
      hover="#dcfce7"
      class=' sm:text-[0.85rem] 2xl:text-[1rem] '
    />
    </div>
  </div>

  <!-- Botão Detalhes -->
  


</div>
