<script lang="ts">
  import { getRegisterContext } from '$lib/context/acessRequestFormContext.svelte';
  import { initRegisterVisitorList } from "$lib/consts/access.options";
  import AccessRequestForm from "./AccessRequestForm.svelte";
  import AccessVehicleForm from './AccessVehicleForm.svelte';
  import ProfileSummary from "./ProfileSummary.svelte";
  import VehicleSummary from "./VehicleSummary.svelte";
  import Button from "./Button.svelte";
  import Carousel from "./Carousel.svelte";
  import Overlay from "./Overlay.svelte";
  import type { ApiProps } from "./Carousel.svelte";
  

  interface AccessSummaryProps {
    api?: ApiProps;
    onPrevious?:()=>void
  }

  let { api,onPrevious }: AccessSummaryProps = $props();

  let isAddPassengerOverlayOpen = $state(false);
  let isEditPassengerOverlayOpen = $state(false);
  let isEditVehicleOverlayOpen = $state(false);

  const registerContext = getRegisterContext();

  const INITIAL_PASSENGER_STATE = {
    ...initRegisterVisitorList,
    accessMode: 'passageiro' as const,
    passenger: true
  };

  let newPassenger = $state({ ...INITIAL_PASSENGER_STATE });
  let passengerBeingEdited = $state(registerContext.register);
  let textSection = $state('passageiros');

  let passengerList = $derived.by(() => {
    return registerContext.registerList.vehicle?.passenger || 
           registerContext.registerList.person || [];
  });

  const handleAddPassenger = () => {
    registerContext.createPassenger(newPassenger);
    newPassenger = { ...INITIAL_PASSENGER_STATE };
    isAddPassengerOverlayOpen = false;
  };

  const handleEditPassengerConfirm = () => {
    isEditPassengerOverlayOpen = false;
  };

  const handleDeletePassenger = (passengerId: string, accessMode: string) => {
    if (accessMode === 'passageiro') {
      if (!registerContext.registerList.vehicle?.passenger) return;
      const filterRegister = registerContext.registerList.vehicle.passenger.filter(
        (item) => item.idRegister !== passengerId
      );
      registerContext.registerList.vehicle.passenger = [...filterRegister];
    } else if (accessMode === 'pedestre') {
      const filterRegister = registerContext.registerList.person.filter(
        (item) => item.idRegister !== passengerId
      );
      registerContext.registerList.person = [...filterRegister];
    }
  };

  const handleDeleteVehicle = () => {
    registerContext.register.accessMode = 'pedestre';
    textSection = 'Pedestres';

    const vehiclePassengers = registerContext.registerList.vehicle?.passenger;
    if (vehiclePassengers) {
      vehiclePassengers.forEach(item => {
        registerContext.registerList.person.push({ 
          ...item, 
          accessMode: 'pedestre' 
        });
      });
    }

    registerContext.registerList.vehicle = undefined;
  };

  const handleEditDriver = () => {
    isEditPassengerOverlayOpen = true;
    passengerBeingEdited = registerContext.register;
  };

  const handleAddDriver = () => {
    isEditPassengerOverlayOpen = true;
    passengerBeingEdited = { 
      ...registerContext.initPerson, 
      accessMode: 'veículo' as const 
    };
  };
</script>

<main
  class="min-h-screen w-full bg-gray-50 flex flex-col 
         px-4 sm:px-6 md:px-10 xl:px-20 py-4 md:py-6 gap-6 
         overflow-x-hidden"
>
  <!-- Passenger Registration Overlay -->
  <Overlay show={isAddPassengerOverlayOpen} z={20} class="grid w-full" background="white">
    <AccessRequestForm
      bind:register={newPassenger}
      onConfirm={handleAddPassenger}
      onCancel={() => (isAddPassengerOverlayOpen = false)}
    />
  </Overlay>

  <!-- Passenger Edit Overlay -->
  <Overlay show={isEditPassengerOverlayOpen} z={20} class="grid w-full" background="white">
    <AccessRequestForm
      bind:register={passengerBeingEdited}
      typeForm="edit"
      onConfirm={handleEditPassengerConfirm}
      onCancel={() => (isEditPassengerOverlayOpen = false)}
    />
  </Overlay>

  <!-- Vehicle Edit Overlay -->
  <Overlay show={isEditVehicleOverlayOpen} z={20} class="grid w-full" background="white">
    <AccessVehicleForm
      bind:registerVehicle={registerContext.vehicle}
      onConfirm={() => (isEditVehicleOverlayOpen = false)}
      onCancel={() => (isEditVehicleOverlayOpen = false)}
    />
  </Overlay>

  <!-- Driver and Vehicle Summary -->
  {#if registerContext.registerList.vehicle}
    <section
      class="w-full sm:bg-white rounded-xl sm:shadow-md sm:border-t-2 sm:border-gray-200 
             p-4 md:p-6 xl:p-8 transition-all"
    >
      <div class="flex flex-col lg:flex-row gap-6 xl:gap-10 lg:items-center">
        <ProfileSummary
          name={registerContext.register.name}
          cpf={registerContext.register.cpf}
          typeProfile="driver"
          onEdit={handleEditDriver}
          onDelete={() => {
            registerContext.registerList.person = [];
            registerContext.register = { ...initRegisterVisitorList };
          }}
          onAddDriver={handleAddDriver}
        />

        <VehicleSummary
          onClick={() => (isAddPassengerOverlayOpen = true)}
          model={registerContext.registerList.vehicle?.model}
          brand={registerContext.registerList.vehicle?.brands}
          plate={registerContext.registerList.vehicle?.plate}
          onEdit={() => (isEditVehicleOverlayOpen = true)}
          onDelet={handleDeleteVehicle}
        />
      </div>
    </section>
  {/if}

  <!-- Passengers Carousel -->
  {#if passengerList.length > 0}
    <section
      class="w-full bg-white rounded-xl shadow-md border-t-2 border-gray-200 
             p-4 md:p-6 xl:p-8 transition-all"
    >
      <h3 class="text-lg md:text-xl xl:text-2xl font-bold mb-4 text-gray-700 capitalize">
        {textSection}
      </h3>
      <div class="overflow-hidden">
        <Carousel >
          {#each passengerList as passenger (passenger.idRegister)}
            <div class="shrink-0 px-2">
              <ProfileSummary
                name={passenger.name}
                cpf={passenger.cpf}
                typeProfile={passenger.accessMode === 'pedestre' ? 'pedestrian' : 'passenger'}
                onEdit={() => {
                  passengerBeingEdited = passenger;
                  isEditPassengerOverlayOpen = true;
                }}
                onDelete={() => handleDeletePassenger(passenger.idRegister, passenger.accessMode)}
              />
            </div>
          {/each}
        </Carousel>
      </div>
    </section>
  {/if}

  <!-- Action Buttons -->
  <div
    class="flex flex-col sm:flex-row justify-between gap-3 
           items-stretch sm:items-end pb-3 px-2"
  >
    <Button 
      text="voltar" 
      variant="previous"
      class="w-full sm:w-auto py-3"
      onClick={() => {api?.apiPrevious(),onPrevious?.()}} 
    />
    <Button 
      text="registrar" 
      variant="confirm"
      class="w-full sm:w-auto py-3"
      onClick={() => {
        
      }} 
    />
  </div>
</main>
