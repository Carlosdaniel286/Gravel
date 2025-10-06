<script lang="ts">

  import { brands, initRegisterVehicle, popularCars,motorcycleBrands, popularMotorcycles, truckBrands,truckModels, vehicleColors, vehicleTypes } from "$lib/consts/vehicle.options";
   
  import { getRegisterContext } from "$lib/context/acessRequestFormContext.svelte";
  import AutoComplete from "./AutoComplete.svelte";
  import Button from "./Button.svelte";
  import ButtonAdd from "./ButtonAdd.svelte";
  import Calendar from "./Calendar.svelte";
  import HeaderForm from "./HeaderForm.svelte";
  import Input from "./Input.svelte";
  

  interface AccessVehicleFormProps {
    onPrevious?: () => void;
    onConfirm?: ()=>void
  }
  const Height =58;
  let {onPrevious,onConfirm }: AccessVehicleFormProps = $props();
  const registerManager = getRegisterContext();
  $effect(()=>{
    
  })

  
  const vehicleBrands = $derived.by(()=>{
  switch(registerManager.vehicle.vehicleType){
    case 'Carro':
      return brands
    case 'Caminhão':
      return truckBrands
    case 'Moto':
      return motorcycleBrands
    default :
      return brands
  } 
})

const vehicleModel = $derived.by(()=>{
  switch(registerManager.vehicle.vehicleType){
    case 'Carro':
      return popularCars
    case 'Caminhão':
      return truckModels
    case 'Moto':
      return popularMotorcycles
    default :
      return popularCars
  } 
})




</script>

<div class="flex flex-col justify-center items-center gap-14 px-6 py-8 w-full h-full  bg-white">
  <HeaderForm
    class="w-full max-w-[1440px]"
    title="Cadastro de Veículo"
    subTitle="Preencha as informações abaixo para cadastrar um novo veículo"
  />
  
  <form class="grid grid-cols-1 md:grid-cols-2 h-full gap-8 max-w-[1440px] w-full">
    <Input
      height={Height}
      label="Placa do veículo"
      placeholder="Digite a placa"
      mask={["aaa0a00", "aaa-0000"]}
       bind:value={registerManager.vehicle.plate}
    />
     <Input
      height={Height}
      label="Número da CNH"
      placeholder="Digite a CNH"
      mask="00000000000"
      bind:value={registerManager.register.cnh}
      />
       <AutoComplete
      height={Height}
      placeholder="Tipo de veículo"
      title="Selecione o tipo"
      options={vehicleTypes}
      property='type'
      bind:value={registerManager.vehicle.vehicleType}
      />
      
      <AutoComplete
      height={Height}
      class='z-20'
      placeholder="Marca do veículo"
      title="Selecione a marca"
      options={vehicleBrands}
      property='brand'
      bind:value={registerManager.vehicle.brands}
      />

      <AutoComplete
      height={Height}
      placeholder="Modelo do veículo"
      title="Selecione o modelo"
      options={vehicleModel}
      property='model'
      bind:value={registerManager.vehicle.model}
      />

      <AutoComplete
      height={Height}
      placeholder="Cor do veículo"
      title="Selecione a cor"
      options={vehicleColors}
      property='color'
      bind:value={registerManager.vehicle.color}
      />
    <div class="">
      <Calendar
        height={Height}
        label="Validade da CNH"
        bind:value={registerManager.register.cnhValidity}
      />
    </div>
    <div class=" flex justify-between md:row-start-5 md:col-span-2">
       <Button
       variant='previous'
       onClick={onPrevious}
       class='h-[54px]'
       />
       <ButtonAdd
       label=''
       text='adiconar passageiro'
       class=' h-[54px]'
       onClick={(()=>{
        registerManager.creatPassenger()
        onPrevious?.()
       })}
       />
       <Button
        variant='confirm'
        text='confimar'
        onClick={(()=>{
          onConfirm?.()
          registerManager.addPerson()
          registerManager.addVehicle()
         
          
        })}
        class='h-[54px]'
       />
    </div>
  </form>
</div>

