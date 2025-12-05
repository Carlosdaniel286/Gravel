<script lang="ts">
  import { cn } from '$lib/utils';
  import { goto } from '$app/navigation';
  import { SquareCheckBig,  CircleOff,PackagePlus,Users,FileText, ArrowUpFromLine,ArrowDownFromLine ,type Icon as IconType} from "lucide-svelte";
  // Função utilitária para gerar inteiros aleatórios
   interface CardsProps {
     cardType?:"order"|"report" | "releases"|"inflow"|'outflow'|"visitors",
     
   }
  
   let {cardType}:CardsProps = $props()
    
   function cleanString(str:string) {
  return str
    .normalize('NFD')               // separate accents from letters
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-zA-Z0-9\s-]/g, '') // remove special characters
    .trim()                          // remove leading/trailing spaces
    .replace(/\s+/g, '-')            // replace spaces with hyphens
    .toLowerCase();                  // optional: convert to lowercase
}
  

  interface CardData {
    icon: typeof IconType;
    bg: string; // gradiente CSS inline
    text:string,
    
  }

 const card: CardData = (() => {
  switch (cardType) {
    case "order":
      return {
        icon: PackagePlus,
        bg: "bg-[#32C785]",   // Encomendas (verde)
        text: "encomendas"

      };
    case "report":
      return {
        icon: FileText,
        bg: "bg-purple-700",   // Relatórios (usei o rosa, já que não tem na imagem)
        text: "relatórios"
      };
    case "releases":
      return {
        icon: SquareCheckBig,
        bg: "bg-[#F5B133]",   // Liberações (amarelo)
        text: "liberações"
      };
    case "inflow":
      return {
        icon: ArrowUpFromLine,
        bg: "bg-[#1DA0E8]",   // Entradas (azul)
        text: "entradas"
      };
    case "outflow":
      return {
        icon: ArrowDownFromLine,
        bg: "bg-[#D84C45]",   // Saídas (vermelho)
        text: "saídas"
      };
    case "visitors":
      return {
        icon: Users,
        bg: "bg-[#F26C7F]",   // Visitantes (rosa forte)
        text: "visitantes"
      };
    default:
      return {
        icon: CircleOff,
        bg: "bg-gray-600",
        text: "off"
      };
  }
})();


 
 const Component = card.icon
   
   
   
  
  //bg-linear-to-r 
</script>

<button
type="button"
  class={cn("cursor-pointer relative",
        "w-[295px] h-[150px]  rounded-sm shrink-0 overflow-hidden flex items-center justify-center",
         "transition-transform duration-300 hover:scale-110",
          card.bg
         )}
         style="background-color: {card.bg};"
         onclick={(()=>{
          goto(`/virtual/${cleanString(card.text)}`);
         })}
        
         >
   <!-- Conteúdo central -->
  <div class="flex gap-4 pl-1 items-center z-10">

   <Component class='text-white' size={70}/>
    <p class="text-white font-nunito font-bold text-2xl uppercase">
        {card.text}
    </p>
  </div>

</button>