<script lang='ts'>
    import { cn } from "$lib/utils";

 interface LabelProps{
  label?:string
  class?:string
  for?:string
  
 }
const {label,class:style,for:id}:LabelProps =$props()

</script>
 

<label
 class={cn("pl-2 uppercase text-gray-800 font-semibold",style )}
 for={id}  aria-autocomplete='none' >
 {label}
</label>