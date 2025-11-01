<script lang="ts">
    import { cn } from "$lib/utils";
    import Button from "./Button.svelte";
    import Label from "./Label.svelte";

   interface TextAreaProps{
    observation?: string
    class?:string
    maxLength?: number;
    onconfirm?:()=>void
    oncancel?:()=>void
    }

    let {
    observation=$bindable(),
    class:style,
    maxLength=500,
    onconfirm,
    oncancel
  }:TextAreaProps =$props()
    
    
    let textareaEl: HTMLTextAreaElement| null = $state(null)
    
    
    
    function autoResize() {
        if (textareaEl) {
            textareaEl.style.height = "auto"; // reseta altura
            textareaEl.style.height = textareaEl.scrollHeight + "px"; // ajusta conforme conteúdo
        }
    }

    

    function handleCancel() {
        observation = ""; // Limpa o textarea
         oncancel?.()
        if (textareaEl) autoResize(); // Ajusta altura após limpar
    }
</script>

<div class="w-full  overflow-hidden  bg-white rounded-xl p-4 flex flex-col gap-2">
    <!-- Label -->
    <Label for="observation" class="font-bold" label="Digite uma Observação" />

    <!-- Textarea -->
    <textarea
        id="observation"
        bind:this={textareaEl}
        bind:value={observation}
        maxlength={maxLength}
        placeholder="Escreva sua observação..."
        class={cn("w-full  border-none outline-none text-gray-900 text-lg capitalize placeholder-gray-400 font-nunito font-semibold bg-white p-4 rounded-lg resize-none overflow-hidden",style)}
        oninput={autoResize}
        style="min-height: 24rem;"
    ></textarea>

    <!-- Contador de caracteres -->
    <div class="text-right text-sm text-gray-800">
        {observation?.length} caracteres
    </div>

    <!-- Botões OK / Cancelar -->
    <div class="flex justify-between gap-2 mt-2">
        <Button
            variant='cancel'
            onClick={handleCancel}
            text='Cancelar'
        />
            
       
        <Button
            class="bg-blue-600 hover:bg-blue-500"
            onClick={onconfirm}
            text='ok'
        />
    </div>
</div>
