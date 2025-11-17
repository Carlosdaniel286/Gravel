 <script lang='ts' generics="T">
	import Label from './../Label.svelte';
    import { cn } from "$lib/utils";
    import SelectedItems from '../SelectedItems.svelte';
    import Input from '../Input.svelte';
    import { BookOpen } from 'lucide-svelte';
    import { Check } from '@lucide/svelte';
    
    
   type AddressResident = {
    qd: string;
    lt: string;
    label: string;

   }
   
    interface AddressProps {
     class?:string
     height?:number|string
     address?:AddressResident[]
   }
  let { class:style,height,address}:AddressProps = $props()
  
  let open = $state(false)
  
  let addressState = $state({
    lt:'',
    qd:''
  })
  let width = $state(0)
  
  let filterAddress = $derived.by(()=>{
    if(!address) return []
      return address.filter((item)=> {
         
        if(addressState.lt!=='' && addressState.qd =='') {
            return Number(item.lt).toString() == addressState.lt
        }
        if(addressState.lt =='' && addressState.qd !=='') {
         return Number(item.qd).toString() == addressState.qd
       
        }

        if(Number(item.lt).toString() == addressState.lt && Number(item.qd).toString() == addressState.qd) return true
        
        
         return false
     })
  })
 
  $effect(()=>{
    $inspect(filterAddress)
  })
 
 
 </script>

 <div class={cn(style)}>
  
 <div class="flex  flex-col   w-full">
    <div class="flex items-center gap-2">
    <Label
     label='endereços visitados'
    />
    
   <Check
       class="bg-gray-100 dark:bg-neutral-800 p-1 rounded-full cursor-pointer text-gray-500 dark:text-gray-300 
         hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 transition-colors duration-150"
        stroke-width={2}
        size={22}
        onclick={(()=>{
        open =! open
        console.log(open)
        })}
       />

   
    </div>
    <div bind:clientWidth={width} class="flex relative  gap-3 justify-between">
     
    <Input
     height={height}
     class='flex-1 placeholder:text-black'
     placeholder='qd'
     prefix='qd:'
     mask='00'
     bind:value={addressState.qd}
     
      />
     <Input
     height={height}
     class='flex-1 placeholder:text-black'
     placeholder='lt'
     prefix='lt:'
     mask='00'
     bind:value={addressState.lt}
    />
     {#if addressState.lt !=='' || addressState.qd!=='' }
    <SelectedItems
     bind:selectedItems={filterAddress}
     property='label'
     openCheking={open}
     width={width}
     class='top-[80%]'
    /> 
     {/if}
     
    </div>
    
   
 </div>
 
</div>