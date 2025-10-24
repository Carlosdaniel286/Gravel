<script lang="ts">
  import {
    brands,
    initRegisterVehicle,
    popularCars,
    motorcycleBrands,
    popularMotorcycles,
    truckBrands,
    truckModels,
    vehicleColors,
    vehicleTypes
  } from "$lib/consts/vehicle.options";
  
  import type { Vehicle } from "$lib/types/vehicle.type";
  import AutoComplete from "./AutoComplete.svelte";
  import Button from "./Button.svelte";
  import HeaderForm from "./HeaderForm.svelte";
  import Input from "./Input.svelte";

  interface AccessVehicleFormProps {
    onPrevious?: () => void;
    onCancel?: () => void;
    onConfirm?: () => void;
    registerVehicle?: Vehicle;
    cnh?: string;
    cnhValidity?: Date;
  }

  const HEIGHT = 65;

  let {
    onPrevious,
    onConfirm,
    onCancel,
    registerVehicle = $bindable({ ...initRegisterVehicle }),
    cnh = $bindable(),
    cnhValidity = $bindable()
  }: AccessVehicleFormProps = $props();

  // Deriva as opções conforme o tipo de veículo
  const vehicleBrands = $derived.by(() => {
    switch (registerVehicle?.vehicleType) {
      case "Carro":
        return brands;
      case "Caminhão":
        return truckBrands;
      case "Moto":
        return motorcycleBrands;
      default:
        return brands;
    }
  });

  const vehicleModels = $derived.by(() => {
    switch (registerVehicle?.vehicleType) {
      case "Carro":
        return popularCars;
      case "Caminhão":
        return truckModels;
      case "Moto":
        return popularMotorcycles;
      default:
        return popularCars;
    }
  });
</script>

<div class="flex flex-col items-center w-full min-h-screen bg-white px-6 py-10">
  <HeaderForm
    class="w-full max-w-[1200px]"
    title="Cadastro de Veículo"
    subTitle="Preencha as informações abaixo para cadastrar um novo veículo"
  />

  <form class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 w-full max-w-[1200px]">
    <!-- Tipo e placa -->
    <AutoComplete
      height={HEIGHT}
      placeholder="Tipo de veículo"
      title="Selecione o tipo"
      options={vehicleTypes}
      property="type"
      bind:value={registerVehicle.vehicleType}
    />

    <Input
      height={HEIGHT}
      label="Placa do veículo"
      placeholder="Digite a placa"
      mask={["aaa0a00", "aaa-0000"]}
      bind:value={registerVehicle.plate}
    />

    <!-- Marca e modelo -->
    <AutoComplete
      height={HEIGHT}
      placeholder="Marca do veículo"
      title="Selecione a marca"
      options={vehicleBrands}
      property="brand"
      bind:value={registerVehicle.brands}
    />

    <AutoComplete
      height={HEIGHT}
      placeholder="Modelo do veículo"
      title="Selecione o modelo"
      options={vehicleModels}
      property="model"
      bind:value={registerVehicle.model}
    />

    <!-- Cor -->
    <AutoComplete
      height={HEIGHT}
      placeholder="Cor do veículo"
      title="Selecione a cor"
      options={vehicleColors}
      property="color"
      bind:value={registerVehicle.color}
    />

    <!-- Ações -->
    <div class="flex justify-between items-center gap-4 md:col-span-2 mt-4">
      {#if onCancel}
        <Button
        variant='cancel'
        text='cancelar'
        onClick={onCancel}
        class="h-[54px] w-full md:w-auto"
      />
      {/if}
      <Button
        variant="previous"
        onClick={onPrevious}
        class="h-[54px] w-full md:w-auto"
      />
      <Button
        variant="confirm"
        text="Prosseguir"
        onClick={() => onConfirm?.()}
        class="h-[54px] w-full md:w-auto"
      />
    </div>
  </form>
</div>
