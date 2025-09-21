<script>
  import Home from "$lib/icons/Home.svelte";
  import SidebarList from "./SidebarList.svelte";
  import CreatUser from "$lib/icons/CreatUser.svelte";
  import SearchUser from "$lib/icons/SearchUser.svelte";
    import { getOverlayContext } from "$lib/context/overlayContext.svelte";
    const show =getOverlayContext()
   
</script>
<aside class="bg-gray-50 w-[300px] h-full">
  <nav aria-label="Menu principal" class="h-full">
    <ul class="flex flex-col gap-3 h-full pt-4">
        <SidebarList
         description='home'
         Icon={Home}
        />
         <SidebarList
         onClick={(()=>{
           show.toggle()
         
         })}
         description='Cadastrar'
         Icon={CreatUser}
        />
         <SidebarList
         description='Buscar cadastros'
         Icon={SearchUser}
        />
     
    </ul>
  </nav>
</aside>

