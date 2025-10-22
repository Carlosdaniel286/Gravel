  <script lang="ts">
  import { cn } from '$lib/utils';
  import AutoComplete from './AutoComplete.svelte';
  import DateRangePicker from './DateRangePicker.svelte';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import Img from '$lib/assets/default_img.jpg'
  import ButtonAdd from './ButtonAdd.svelte';
  import Button from './Button.svelte';
  import {  initRegisterVisitorList, optionsAccessMode, optionsAccessProfile, optionsAccessType, optionsResidentAccess, type RegisterVisitorList } from '$lib/consts/access.options';
  import HeaderForm from './HeaderForm.svelte';
  import type { ApiProps } from './Carousel.svelte';
    import type { AccessMode } from '$lib/types/access.types';
    import Calendar from './Calendar.svelte';
  
   
   
  interface AccessFormProps{
    onCancel?:()=>void
    onConfirm?: () => void
    api?:ApiProps 
    register?:RegisterVisitorList
    typeForm?:'register'|'edit'
   }
   const HEIGHT = '58';
 
  let {onCancel,onConfirm,api=$bindable(),register = $bindable({...initRegisterVisitorList}),typeForm='register'}:AccessFormProps= $props()
  const variant = $derived(register?.driver && typeForm==='register'   ?'next':'confirm')
  
  
  
  const passenger:AccessMode = { id: 6, label: 'Passageiro', value:'passageiro' }
   const accessMode = $derived.by(()=>{
    if(register.accessMode=='passageiro'){
      const options = [...optionsAccessMode]
      options.push(passenger)
      return options
    }else{
      return optionsAccessMode
    }
  })


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
    bind:value={register.name}
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
    multiple={true}
    property='label'
    bind:value={register.address}
    
  />

  <!-- CPF -->
  <Input
    height={HEIGHT}
    mask="000.000.000-00"
    class={cn(`lg:col-span-2 lg:col-start-1`)}
    placeholder="Digite o CPF"
    label="CPF completo"
    bind:value={register.cpf}
  />

  <Input
    height={HEIGHT}
    mask="(00) 9 0000-0000"
    class={cn(`md:col-start-1 lg:col-span-2 lg:row-start-5 lg:col-start-1`)}
    placeholder="telefone..."
    label="telefone (opcional)"
    bind:value={register.phone}
    
  />

  

  <!-- Período de Visita -->
  <DateRangePicker 
    class="row-span-3 md: row-start-5 lg:row-start-2 lg:col-span-1 lg:col-start-3 gap-8"
    classCalendar={cn(`h-[${HEIGHT}px]`)}
    classDays={cn(`h-[${HEIGHT}px]`)}
    bind:startDate={register.startDate}
    bind:endDate={register.endDate}
    />

  <!-- Selects adicionais -->
  <AutoComplete 
    class={cn(`md:col-start-2 md:row-start-3 lg:col-start-4 lg:row-start-3`)}
    height={HEIGHT}
    title='escolha o perfil'
    placeholder='perfil de vistante'
    options={optionsAccessProfile}
    property='label'
    bind:value={register.accessProfile}
  />

  <Select 
    class={cn(`md:col-start-2 lg:col-start-4 lg:row-start-4`)}
    title='modo de acesso'
    label={register.accessMode=='passageiro'?'passagerio':'locomoção'}
    height={HEIGHT}
    disabled={register.accessMode=='passageiro' || typeForm=='edit'}
    options={accessMode}
    property='label'
    valueProperty='value'
    bind:value={register.accessMode}
   
  />

  <Select 
    class={cn(`md:col-start-2 lg:col-span-2 lg:col-start-1 lg:row-start-4`)}
    height={HEIGHT}
    title='tipo de registro'
    options={optionsAccessType}
    property='label'
    label='tipo de registro'
    bind:value={register.accessType}
  
  />
  {#if register.accessMode==='veículo'}
   <Input
      height={HEIGHT}
      label="Número da CNH"
      placeholder="Digite a CNH"
      mask={"00000000000"}
      bind:value={register.cnh}
      />
       <Calendar
        height={HEIGHT}
        label="Validade da CNH"
        bind:value={register.cnhValidity}
        startDate={new Date()}
      />
    {/if}
    
     <ButtonAdd
      class={cn(`sm:hidden`)}
      text='criar uma observaçao'
      height={HEIGHT}
      />
    
     <div class=" mt-6 h-[51px] col-span-1 md:col-span-2 lg:col-span-4 flex justify-between ">
    <Button
      variant='cancel'
      text='cancelar'
      onClick={onCancel}
     />
     <ButtonAdd
      class={cn(`hidden sm:block`)}
      text='criar uma observaçao'
      />
       <Button
        text={typeForm=='edit'?'Prosseguir':'Resgistar'}
       variant={variant}
       onClick={(()=>{
       if(variant==='next'){
        api?.apiNext()
        if(register.cnh==undefined){
          register.cnh=''
        }
        if(register.cnhValidity==undefined){
          register.cnhValidity=new Date()
        }
        
      
      }else{
        onConfirm?.()
        
       }
      })}
      />
      
     
      
    </div>
   
  </form>
</div>
