<script lang="ts">
    import { optionsResidentAccess } from "$lib/consts/access.options";
    import { cn } from "$lib/utils";
    import AutoComplete from "./AutoComplete.svelte";
    import Button from "./Button.svelte";
    import HeaderForm from "./HeaderForm.svelte";
    import Input from "./Input.svelte";
    const HEIGHT = 65;
    
    interface FilterRegisterProps{
        oncancel?:()=>void
    }
  
    let {oncancel}:FilterRegisterProps = $props()

</script>

<main class="bg-white w-[800px] h-[600px] p-6 rounded-2xl shadow-md justify-between flex flex-col  gap-6">
  <!-- Cabeçalho -->
  <HeaderForm
    title="Busque um cadastro"
    subTitle="Faça sua busca refinada"
  />

  <!-- Campos em grid -->
  <div class="grid  grid-cols-2 gap-4">
    <Input
      mask={/^[A-Za-z ]+$/}
      label="Nome"
      class="w-full"
      height={HEIGHT}
    />
    <Input
      mask="000.000.000-00"
      label="CPF"
      class="w-full"
       height={HEIGHT}
    />
    <Input
      mask={["aaa0a00", "aaa-0000"]}
      label="Placa"
      class="w-full"
       height={HEIGHT}
    />
   <AutoComplete
      title="Endereço visitado"
       height={HEIGHT}
       class={cn(` `)}
       options={optionsResidentAccess}
       property="label"
     />

     <Input
      mask={/^\d+$/}
      label="senha"
      class="w-full"
      height={HEIGHT}
    />
     <Input
      height={HEIGHT}
      mask="(00) 9 0000-0000"
      label="Telefone"
     
    />
   
   </div>

  <!-- Botão de busca centralizado -->
   <div class="flex  justify-between">
  <Button
    type="button"
    variant='cancel'
    text='fechar'
    onClick={oncancel}
  />
   <Button
    type="button"
    variant='confirm'
    class='bg-blue-700'
    text='força busca'
  />
  </div>
    
</main>


