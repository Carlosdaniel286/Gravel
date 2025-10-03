<script lang="ts">
	
  import { cn } from '$lib/utils';
  import AutoComplete from './AutoComplete.svelte';
  import DateRangePicker from './DateRangePicker.svelte';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import Img from '$lib/assets/default_img.jpg'
  import ButtonAdd from './ButtonAdd.svelte';
  import Button from './Button.svelte';
  import {  optionsAccessMode, optionsAccessProfile, optionsAccessType, optionsResidentAccess } from '$lib/consts/access.options';
  import HeaderForm from './HeaderForm.svelte';
  import type { ApiProps } from './Carousel.svelte';
  import { getRegisterContext } from '$lib/context/acessRequestForm.svelte';
    
   
  interface AccessFormProps{
    onCancel?:()=>void
    onConfirm?: () => void
    api?:ApiProps 
   }
 
  const HEIGHT = '58';
 
  let {onCancel,onConfirm,api=$bindable()}:AccessFormProps= $props()
  const registerManager = getRegisterContext();
  
</script>


<div class="bg-white flex flex-col w-full lg:h-[calc(100vh+110px)]   gap-5  max-w-[1536px] 3xl:rounded-lg  px-5 py-5  ">
   <!-- Header -->
  <HeaderForm
  title='Cadastro Geral'
  subTitle='Preencha as informações abaixo para criar um novo cadastro.'
  />
    <!-- Form Grid -->
  <form  class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
  <!-- Nome Completo -->
  <Input
    mask={/^[A-Za-z ]+$/}
    class={cn(`lg:col-span-3`)}
    height={HEIGHT}
    placeholder="Digite o nome completo"
    label="Nome completo"
    bind:value={registerManager.register.name}
  />

  <picture class=' md:col-start-2 flex justify-end row-span-2 lg:col-start-4 row-start-1'>
    <img 
      src={Img}
      alt=""
      class="rounded-lg cursor-pointer object-cover"
    />
  </picture>

  <!-- Endereço do Morador -->
  <AutoComplete
    title="Endereço do morador"
    height={HEIGHT}
    class={cn(` lg:col-span-2 z-10`)}
    placeholder="Digite endereço ou nome do morador"
    options={optionsResidentAccess}
    property='label'
    bind:value={registerManager.register.address}
    setSelect={registerManager.register.address}
  />

  <!-- CPF -->
  <Input
    height={HEIGHT}
    mask="000.000.000-00"
    class={cn(`lg:col-span-2 lg:col-start-1`)}
    placeholder="Digite o CPF"
    label="CPF completo"
    bind:value={registerManager.register.cpf}
  />

  <Input
    height={HEIGHT}
    mask="(00) 9 0000-0000"
    class={cn(`md:col-start-1 lg:col-span-2 lg:col-start-1`)}
    placeholder="Digite o número de telefone"
    label="telefone (opcional)"
    bind:value={registerManager.register.phone}
    
  />

  <ButtonAdd
    class={cn(`md:col-start-2 md:row-start-7 row-start-13 lg:row-start-auto lg:col-span-2 lg:col-start-1  `)}
    text='criar uma observaçao'
    label="Mais informações (opcional)"
    style='height:{HEIGHT}px'
  />

  <!-- Período de Visita -->
  <DateRangePicker 
    class="row-span-3 md: row-start-5 lg:row-start-2 lg:col-span-1 lg:col-start-3 gap-8"
    classCalendar={cn(`h-[${HEIGHT}px]`)}
    classDays={cn(`h-[${HEIGHT}px]`)}
    bind:startDate={registerManager.register.startDate}
    bind:endDate={registerManager.register.endDate}
    />

  <!-- Selects adicionais -->
  <Select 
    class={cn(`md:col-start-2 lg:col-start-4 lg:row-start-3`)}
    height={HEIGHT}
    label='escolha o perfil'
    title='perfil de vistante'
    options={optionsAccessProfile}
    property='label'
    
    bind:value={registerManager.register.accessProfile}
  />

  <Select 
    class={cn(`md:col-start-2 lg:col-start-4 lg:row-start-4`)}
    title='modo de acesso'
    label='escolha a locomoção'
    height={HEIGHT}
    options={optionsAccessMode}
    property='label'
    bind:value={registerManager.register.accessMode}
   
  />

  <Select 
    class={cn(`md:col-start-2 lg:col-span-2 lg:col-start-3 lg:row-start-5`)}
    height={HEIGHT}
    title='tipo de registro'
    options={optionsAccessType}
    property='label'
    label='tipo de registro'
    bind:value={registerManager.register.accessType}
  
  />
    <div class=" mt-6 col-span-1 md:col-span-2 lg:col-span-4 flex justify-between ">
       <Button
       variant='cancel'
       text='cancelar'
       onClick={onCancel}
      />
      
      <Button
       text='enviar'
       variant={registerManager.register.accessMode=='Veículo (Condutor)' ?'next':'confirm'}
       onClick={(()=>{
         
        if(registerManager.register.accessMode=='Veículo (Condutor)'){
          
           api?.apiNext()
        }else{
          onConfirm?.()
          //registerList.push({...newRegister,idRegister:id})
        }
       })}
      />
      
    </div>
   
  </form>
</div>
