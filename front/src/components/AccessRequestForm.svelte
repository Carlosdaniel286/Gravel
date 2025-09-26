<script lang="ts">
	
  import { cn } from '$lib/utils';
  import AutoComplete from './AutoComplete.svelte';
  import DateRangePicker from './DateRangePicker.svelte';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import Img from '$lib/assets/default_img.jpg'
  import ButtonAdd from './ButtonAdd.svelte';
  import Button from './Button.svelte';
  import { initAccessForm, optionsAccessMode, optionsAccessProfile, optionsAccessType, optionsResidentAccess } from '$lib/consts/access.options';
    import HeaderForm from './HeaderForm.svelte';
   interface AccessFormProps{
    onCancel?:()=>void
    onConfirm?: () => void
   }


  const HEIGHT = '58';
  let inputsForm= $state(initAccessForm)
  let height = $state(0)
  const {onCancel,onConfirm}:AccessFormProps= $props()
  
</script>


<div class="bg-white flex flex-col w-full   gap-5  max-w-[1536px] 3xl:rounded-lg  px-5 py-5 ">
   <!-- Header -->
  <HeaderForm
  title='Cadastro de Visitantes'
  subTitle='Preencha as informações abaixo para cadastrar um novo visitante.'
  />
    <!-- Form Grid -->
  <form bind:clientHeight={height} class="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-3">
  <!-- Nome Completo -->
  <Input
    mask={/^[A-Za-z ]+$/}
    class={cn(`lg:col-span-3`)}
    height={HEIGHT}
    placeholder="Digite o nome completo"
    label="Nome completo"
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
  />

  <!-- CPF -->
  <Input
    height={HEIGHT}
    mask="000.000.000-00"
    class={cn(`lg:col-span-2 lg:col-start-1`)}
    placeholder="Digite o CPF"
    label="CPF completo"
  />

  <Input
    height={HEIGHT}
    mask="(00) 00000-0000"
    class={cn(`md:col-start-1 lg:col-span-2 lg:col-start-1`)}
    placeholder="Digite o número de telefone"
    label="telefone (opcional)"
  />

  <ButtonAdd
    class={cn(`md:col-start-2 md:row-start-7 row-start-13 lg:row-start-auto lg:col-span-2 lg:col-start-1  `)}
    text='criar uma observaçao'
    heigth={HEIGHT}
  />

  <!-- Período de Visita -->
  <DateRangePicker 
    class="row-span-3 md: row-start-5 lg:row-start-2 lg:col-span-1 lg:col-start-3"
    classCalendar={cn(`h-[${HEIGHT}px]`)}
    classDays={cn(`h-[${HEIGHT}px]`)}
  />

  <!-- Selects adicionais -->
  <Select 
    class={cn(` md:col-start-2 lg:col-start-4 lg:row-start-3`)}
    height={HEIGHT}
    label='escolha o perfil'
    title='perfil de vistante'
    options={optionsAccessProfile}
    property='label'
  />

  <Select 
    class={cn(`md:col-start-2 lg:col-start-4 lg:row-start-4`)}
    title='modo de acesso'
    label='escolha a locomoção'
    height={HEIGHT}
    options={optionsAccessMode}
    property='label'
    onSelect={((item)=>{
      if(typeof item ==='string') return
      inputsForm.accessMode=item
      
    })}
    />

  <Select 
    class={cn(`md:col-start-2 lg:col-span-2 lg:col-start-3 lg:row-start-5`)}
    height={HEIGHT}
    title='tipo de registro'
    options={optionsAccessType}
    property='label'
    label='tipo de registro'
  />
    <div class=" mt-6 col-span-1 md:col-span-2 lg:col-span-4 flex justify-between ">
       <Button
       variant='cancel'
       text='cancelar'
       onClick={onCancel}
      />
      
      <Button
       text='enviar'
       variant={inputsForm.accessMode?.value=='veiculo'|| inputsForm.accessMode?.value=='passageiro' ?'next':'confirm'}
       onClick={onConfirm}
      />
      
    </div>
   
  </form>
</div>
