<script lang="ts">
    import AutoComplete from "./AutoComplete.svelte";
    import Button from "./Button.svelte";
  import Calendar from "./Calendar.svelte";
  import HeaderForm from "./HeaderForm.svelte";
  import Input from "./Input.svelte";
  import Select from "./Select.svelte";

  interface AccessVehicleFormProps {
    onPrevious?: () => void;
    onConfirm?: ()=>void
  }
  const Height =58;
  
  let {onPrevious,onConfirm }: AccessVehicleFormProps = $props();
</script>

<div class="flex flex-col justify-center items-center gap-14 px-6 py-5 w-full h-full bg-white">
  <HeaderForm
    class="w-full max-w-[1440px]"
    title="Cadastro de Veículo"
    subTitle="Preencha as informações abaixo para cadastrar um novo veículo"
  />
  
  <form class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1440px] w-full">
    <Input
      height={Height}
      label="Placa do veículo"
      placeholder="Digite a placa"
      mask={["aaa0a00", "aaa-0000"]}
    />
     <Input
      height={Height}
      label="Número da CNH"
      placeholder="Digite a CNH"
      mask="00000000000"
      />
      
      <AutoComplete
      height={Height}
      placeholder="Marca do veículo"
      title="Selecione a marca"
      />

      <AutoComplete
      height={Height}
      placeholder="Modelo do veículo"
      title="Selecione o modelo"
      />

      <AutoComplete
      height={Height}
      placeholder="Cor do veículo"
      title="Selecione a cor"
      />

      <AutoComplete
      height={Height}
      placeholder="Tipo de veículo"
      title="Selecione o tipo"
      />


    <div class="">
      <Calendar
        height={Height}
        label="Validade da CNH"
      />
    </div>
    <div class=" flex justify-between row-start-5 col-span-2">
       <Button
       variant='previous'
       onClick={onPrevious}
       />
       <Button
        variant='confirm'
        text='confimar'
        onClick={onConfirm}
       />
    </div>
  </form>
</div>

