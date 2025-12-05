<script lang="ts">
  import { House,  UserPlus, Search,type Icon as IconType} from "lucide-svelte";
  import SidebarList from "./SidebarList.svelte";
  import { getOverlayContext } from "$lib/context/overlayContext.svelte";
    import { cn } from "$lib/utils";
  const overlay = getOverlayContext();
 
  type MenuItem = {
    bg: string;
    description: string;
    icon: typeof IconType;
    onclick?:()=>void
   
  };

  const menuItems: MenuItem[] = [
    {
      description:'Home',
      bg:'bg-indigo-500',
      icon: House
    },
    {
      description:"Cadastrar",
      bg:'bg-teal-500',
      icon: UserPlus,
      onclick:() => overlay.overlayManager('form', true)
    },
    {
      description:"Buscar",
      bg:'bg-fuchsia-500',
      icon: Search,
      onclick:()=> overlay.overlayManager('filterRegister',true)
    },
  ];
  let {class:style=''}=$props()
</script>

<aside class={cn("bg-gray-100 hidden w-[110px] h-full sm:flex flex-col items-start  py-4 gap-6 shadow-lg",style)}>
  
{#each menuItems as item}
  {@const Icon = item.icon}
   <SidebarList
    description={item.description}
    Icon={Icon as any }
    class={item.bg}
    onClick={item.onclick}
  />
{/each}
</aside>
