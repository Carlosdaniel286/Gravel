 <script lang='ts'>
    import { cn } from '$lib/utils';
  import {type Icon as IconType } from 'lucide-svelte'
 
  interface InfoProps{
    icon?: typeof IconType
    bg?:string
    hover?:string
    textColor?:string,
    text?:string
    class?:string
  }

  const {icon:Component,hover,textColor,text,class:style}:InfoProps = $props()
 
 
 </script>

  <div 
     style=" --color-hover:{hover};"
       class={cn(
            " flex items-center  w-full  lg:bg-transparent   justify-center gap-2 rounded-sm",
             'hover:bg-(--color-hover)',
            "transition duration-200 hover:scale-110",
             
            )}
          
            
        >
           
        {#if Component}
        <Component size={24} class={cn(textColor)}/>
           <p class={cn("capitalize font-semibold py-2.5 ",textColor,style)}>
            {text}
           </p>
            {/if}
        </div>
      
        
        
        
       