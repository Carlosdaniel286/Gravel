<script lang="ts">
  import { House, UserPlus, Search,type Icon as IconType} from "lucide-svelte";
  import SidebarList from "./SidebarList.svelte";
  import { getOverlayContext } from "$lib/context/overlayContext.svelte";
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
      icon: Search
    },
  ];
</script>

<aside class="bg-gray-200 w-[90px] h-full flex flex-col items-center py-4 gap-6 shadow-lg">
  
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
