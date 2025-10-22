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
  }

  let { api }: AccessSummaryProps = $props();

  // --- States ---
  let isAddPassengerOverlayOpen = $state(false);
  let isEditPassengerOverlayOpen = $state(false);
  let isEditVehicleOverlayOpen = $state(false);

  // --- Context ---
  const registerContext = getRegisterContext();

  // --- Constants ---
  const INITIAL_PASSENGER_STATE = {
    ...initRegisterVisitorList,
    accessMode: 'passageiro' as const,
    passenger: true
  };

  // --- Reactive state ---
  let newPassenger = $state({ ...INITIAL_PASSENGER_STATE });
  let passengerBeingEdited = $state(registerContext.register);
  let textSection =$state('passageiros')
  // --- Derived state ---
  let passengerList = $derived.by(() => {
    return registerContext.registerList.vehicle?.passenger || 
           registerContext.registerList.person || [];
  });

  // --- Methods ---
  const handleAddPassenger = () => {
    registerContext.createPassenger(newPassenger);
    newPassenger = { ...INITIAL_PASSENGER_STATE };
    isAddPassengerOverlayOpen = false;
  };

  const handleEditPassengerConfirm = () => {
    isEditPassengerOverlayOpen = false;
    // TODO: Implementar edição no contexto se necessário
  };

  const handleDeletePassenger = (passengerId: string,accessMode:string) => {
     
     if(accessMode=='passageiro'){
      console.log(accessMode)
      if(!registerContext.registerList.vehicle?.passenger) return
     const filterRegister = registerContext.registerList.vehicle.passenger.filter((item)=>{
         return item.idRegister !== passengerId
      })
       if(filterRegister) registerContext.registerList.vehicle.passenger=[...filterRegister]
    }else if(accessMode=='pedestre'){
        const filterRegister = registerContext.registerList.person.filter((item)=>{
            return item.idRegister !== passengerId
        })
        registerContext.registerList.person =[...filterRegister]
    }
  };

  const handleDeleteVehicle = () => {
    registerContext.register.accessMode = 'pedestre';
    textSection='Pedestres'
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

<main class=" h-screen w-screen grid gap-6 bg-gray-50 ">
<!-- Passenger Registration Overlay --> <!-- Passenger Registration Overlay -->
<Overlay
  show={isAddPassengerOverlayOpen}
  z={20}
  class="grid w-full"
  background="white"
>
  <AccessRequestForm
    bind:register={newPassenger}
    onConfirm={handleAddPassenger}
    onCancel={(()=>isAddPassengerOverlayOpen=false)}
  />
</Overlay>

<!-- Passenger Edit Overlay -->
<Overlay
  show={isEditPassengerOverlayOpen}
  z={20}
  class="grid w-full"
  background="white"
>
  <AccessRequestForm
    bind:register={passengerBeingEdited}
    typeForm="edit"
    onConfirm={handleEditPassengerConfirm}
    onCancel={(()=>isEditPassengerOverlayOpen=false)}
  />
</Overlay>

<!-- Vehicle Edit Overlay -->
<Overlay
  show={isEditVehicleOverlayOpen}
  z={20}
  class="grid w-full"
  background="white"
>
  <AccessVehicleForm
    bind:registerVehicle={registerContext.vehicle}
    onConfirm={() => isEditVehicleOverlayOpen = false}
    onCancel={(()=>isEditVehicleOverlayOpen=false)}
  />
</Overlay>



  <!-- Driver and Vehicle Summary -->
  {#if registerContext.registerList.vehicle}
    <section class="w-full p-4 bg-white rounded-xl shadow-md border-t-2 border-gray-200">
      <div class="flex flex-col md:flex-row gap-6 md:items-center">
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
          onClick={() => isAddPassengerOverlayOpen = true}
          model={registerContext.registerList.vehicle?.model}
          brand={registerContext.registerList.vehicle?.brands}
          plate={registerContext.registerList.vehicle?.plate}
          onEdit={() => isEditVehicleOverlayOpen = true}
          onDelet={handleDeleteVehicle}
        />
      </div>
    </section>
  {/if}

  <!-- Passengers Carousel -->
  {#if passengerList.length>0 }
    <section class="w-full p-4 bg-white rounded-xl shadow-md border-t-2 border-gray-200">
    <h3 class="text-lg font-bold mb-4 text-gray-700">{textSection}</h3>
    <div>
      <Carousel animation={false}>
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
  <!-- Action Button -->
  <div class=" flex pb-3 p-2  justify-end items-end  ">
    <Button 
    text="Próximo" 
    class="px-6 py-3 rounded-full shadow-lg bg-gradient-to-r from-cyan-500 to-sky-400 text-white font-bold hover:scale-105 transition-transform" 
    onClick={() =>{api?.apiNext()}} 
    />
  </div>

</main>
