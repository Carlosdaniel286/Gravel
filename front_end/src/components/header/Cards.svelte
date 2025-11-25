<script lang="ts">
  import { cn } from '$lib/utils';
    
  import { SquareCheckBig,  CircleOff,PackagePlus,Users,FileText, ArrowUpFromLine,ArrowDownFromLine ,type Icon as IconType} from "lucide-svelte";
  // Função utilitária para gerar inteiros aleatórios
   interface CardsProps {
     cardType?:"order"|"report" | "releases"|"inflow"|'outflow'|"visitors"
   }
  
   let {cardType}:CardsProps = $props()
    
  

  interface CardData {
    icon: typeof IconType;
    bg: string; // gradiente CSS inline
    text:string
  }

 const card: CardData = (() => {
  switch (cardType) {
    case "order":
      return {
        icon: PackagePlus,
        bg: "linear-gradient(to right, #86efac, #22c55e)",
        text: 'encomendas'
      };
    case "report":
      return {
        icon: FileText,
        bg: "linear-gradient(to right, #c084fc, #9333ea)",
        text: 'relatórios'
      };
    case "releases":
      return {
        icon: SquareCheckBig,
        bg: "linear-gradient(to right, #fcd34d, #f97316)",
        text: 'liberações'
      };
    case "inflow":
      return {
        icon: ArrowUpFromLine,
        bg: "linear-gradient(to right, #38bdf8, #0ea5e9)",
        text: 'entradas'
      };
    case "outflow":
      return {
        icon: ArrowDownFromLine,
        bg: "linear-gradient(to right, #f87171, #dc2626)",
        text: 'saídas'
      };
    case "visitors":
      return {
        icon: Users,
        bg: "linear-gradient(to right, #f472b6, #ec4899)",
        text: 'visitantes'
      };
    default:
      return {
        icon: CircleOff,
        bg: "linear-gradient(to right, #d1d5db, #9ca3af)",
        text: 'off'
      };
  }
})();

  
 
 const Component = card.icon
   
   
   
   function random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
 type Ball= {
    size: number;
    opacity: number;
    top: number;
    left: number;
    
  }
  // Gerar dinamicamente 6 bolinhas
  const balls:Ball[] = Array.from({ length: 6 }, () => ({
    size: random(35, 55),            // tamanho px
    opacity: random(20, 35) / 100,   // opacidade 0.20 a 0.35
    top: random(0, 120),             // posição dentro do card
    left: random(0, 220),
    
  }));
</script>

<div
  class={cn("bg-gradient-to-r cursor-pointer relative",
        "w-[290px] h-[155px] rounded-sm flex-shrink-0 overflow-hidden flex items-center justify-center",
         "transition-transform duration-300 hover:scale-120",
          
         )}
         
         style="background:{card.bg}"
         >
  
  {#each balls as b}
    <div
      class="absolute rounded-full"
      style="
        width: {b.size}px;
        height: {b.size}px;
        background-color: rgba(255,255,255,{b.opacity});
        top: {b.top}px;
        left: {b.left}px;
       "
    ></div>
    
  {/each}

  <!-- Conteúdo central -->
  <div class="flex gap-4 pl-1 items-center z-10">

   <Component class='text-white' size={70}/>
    <p class="text-white font-nunito font-bold text-2xl uppercase">
        {card.text}
    </p>
  </div>

</div>