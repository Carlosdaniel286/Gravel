  <script lang="ts">
  import { cn } from '$lib/utils';
  import AutoComplete from './AutoComplete.svelte';
  import DateRangePicker from './DateRangePicker.svelte';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import Img from '$lib/assets/default_img.jpg';
  import ButtonAdd from './ButtonAdd.svelte';
  import Button from './Button.svelte';
  import { 
    initRegisterVisitorList,
    optionsAccessMode,
    optionsAccessProfile,
    optionsResidentAccess,
    addressExemple,
    type RegisterVisitorList
  } from '$lib/consts/access.options';
  import HeaderForm from './HeaderForm.svelte';
  import type { ApiProps } from './Carousel.svelte';
  import type { AccessMode } from '$lib/types/access.types';
  import Calendar from './Calendar.svelte';
  import { getFieldError,  registerVisitorErrors } from '$lib/helpers/validateFormData';
  import IconsAutoComplete from './optionsAutoComplete/IconsAutoComplete.svelte';
    import { getOverlayContext } from '$lib/context/overlayContext.svelte';
    import Address from './address/Address.svelte';

  interface AccessFormProps {
    onCancel?: () => void;
    onConfirm?: () => void;
    onNext?: () => void;
    api?: ApiProps;
    register?: RegisterVisitorList;
    typeForm?: 'register' | 'edit';
  }

  const HEIGHT = 65;

  let { onCancel, onConfirm, api = $bindable(),onNext, register = $bindable({ ...initRegisterVisitorList }), typeForm = 'register' }: AccessFormProps = $props();

  const variant = $derived(register?.driver && typeForm === 'register' ? 'next' : 'confirm');

  let fieldErrors = $state({...registerVisitorErrors});
  let isError = $state(false)
  const passenger: AccessMode = { id: 6, label: 'Passageiro', value: 'passageiro' };
  const overlay = getOverlayContext()
  const accessMode = $derived.by(() => {
    if (register.accessMode === 'passageiro') {
      const options = [...optionsAccessMode];
      options.push(passenger);
      return options;
    } else {
      return optionsAccessMode;
    }
  });

  $effect(()=>{
     if(isError){
      fieldErrors= getFieldError(register).data
     }
   // 
  })
 
  // Atualiza erros ao mudar valores
  
</script>

<div class="bg-white flex flex-col w-full lg:h-auto gap-6 max-w-[1536px] 3xl:rounded-lg px-5 py-8 pb-16">
  <!-- Header -->
  <HeaderForm
    title="Cadastro Geral"
    subTitle="Preencha as informações abaixo para criar um novo cadastro."
  />
     
  <!-- Form Grid -->
  <form autocomplete="off" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
    
    <!-- Nome Completo -->
    <Input
      mask={/^[A-Za-z ]+$/}
      class={cn(`col-start-1 sm:row-start-1 lg:col-span-3`)}
      height={HEIGHT}
      error={fieldErrors.name.error}
      message={fieldErrors.name.message}
      placeholder="Digite o nome completo"
      label="Nome completo"
      bind:value={register.name}
    />

    <picture class="md:col-start-2 sm:col-span-1  flex justify-end row-span-2  lg:col-start-4 row-start-1">
      <img src={Img} alt="" class="rounded-lg cursor-pointer object-cover" />
    </picture>

    <!-- Endereço do Morador -->
     {#snippet children(select:()=>void,clicked:boolean,label:string)}
	     <IconsAutoComplete
        onClick={select}
        clicked={clicked}
        bind:register={register}
        label={label}
       />
       {/snippet}
    
     <Address
      height={HEIGHT}
      class={cn(`col-start-1 sm:row-start-3  lg:col-span-2 z-10`)}
      address={addressExemple}
      />
   <!-- CPF -->
    <Input
      height={HEIGHT}
      class={cn(`lg:col-span-2 lg:col-start-1 sm:row-start-3 sm:col-start-2 md:row-auto md:col-auto`)}
      placeholder="Digite o CPF"
      label="CPF completo"
      mask={'000.000.000-00'}
      bind:value={register.cpf}
      error={fieldErrors.cpf.error}
      message={fieldErrors.cpf.message}
    />

    
   
      <Input
      height={HEIGHT}
      mask="(00) 9 0000-0000"
      class={cn(`md:col-start-1 lg:col-span-1 lg:row-start-4 lg:col-start-1`)}
      placeholder="Telefone..."
      label="Telefone (opcional)"
      bind:value={register.phone}
      error={fieldErrors.phone.error}
      message={fieldErrors.phone.message}
    />
     
   

    <!-- Período de Visita -->
    <DateRangePicker
      class="row-span-3 md:row-start-5 lg:row-start-2 lg:col-span-1 lg:col-start-3 gap-[43px]"
      height={HEIGHT}
      bind:startDate={register.startDate}
      bind:endDate={register.endDate}
     />

    <!-- Perfil de acesso -->
    <AutoComplete
      class={cn(`md:col-start-2 md:row-start-3 lg:col-start-4 lg:row-start-3`)}
      height={HEIGHT}
      title="Escolha o perfil"
      freeSolo={true}
      options={optionsAccessProfile}
      property="label"
      bind:value={register.accessProfile}
      error={fieldErrors.accessProfile.error}
      message={fieldErrors.accessProfile.message}
    />

    <!-- Modo de acesso -->
    <Select
      class={cn(`md:col-start-2 lg:col-start-4 lg:row-start-4`)}
      title="Modo de acesso"
      height={HEIGHT}
      disabled={register.accessMode == 'passageiro' || typeForm == 'edit'}
      options={accessMode}
      label='sss'
      onSelect={((item)=>{
        if(item=='veículo'){
          register.cnh=''
        }
      })}
      property="label"
      valueProperty="value"
      bind:value={register.accessMode}
      error={fieldErrors.accessMode.error}
      message={fieldErrors.accessMode.message}
    />
     
    <!-- Tipo de registro -->
     <Input
      height={HEIGHT}
      class={cn(``,register.accessMode === 'veículo'?'sm:col-span-2':"sm:col-span-1",'md:col-span-1')}
       label="empresa"
     />

    {#if register.accessMode === 'veículo'}
      <!-- CNH -->
        <Select
        height={HEIGHT}
        class='sm:col-start-2 sm:row-start-7  md:mt-7 lg:col-start-1 lg:row-start-auto lg:mt-0 lg:col-span-2'
        label='A'
        title='categoria da cnh'
        options={[  
          "A",
          "B",
          "C",
          "D",
          "E",
          "AB",
          "AC",
          "AD",
          "AE"
         ]}
       
       />
      <Input
        height={HEIGHT}
        class='col-start-1 md:row-start-5  md:col-start-2 lg:col-start-3'
        label="Número da CNH"
        placeholder="Digite a CNH"
        mask={['00000000000']}
        bind:value={register.cnh}
        error={fieldErrors.cnh.error}
        message={fieldErrors.cnh.message}
      />

      <!-- Validade CNH -->
       <div class='sm:col-start-2  md:row-start-6  lg:row-start-5  lg:col-start-4'>
      <Calendar
       height={HEIGHT}
        label="Validade da CNH"
        bind:value={register.cnhValidity}
        startDate={new Date()}
       />
       </div>
    {/if}
    
    <ButtonAdd class={cn(`sm:hidden`)} text="Criar uma observação" height={HEIGHT} />

    <div class="mt-6 h-[51px] sm:col-span-2 md:col-span-2 lg:col-span-4 flex justify-between">
      <Button variant="cancel" text="Cancelar" onClick={onCancel} />

      <ButtonAdd 
      class={cn(`hidden sm:block`)} 
      text="Criar uma observação" 
      onClick={()=>{
        overlay.overlayManager('textArea',true)
      }}
      />

      <Button
        text={typeForm == 'edit' ? 'Prosseguir' : 'Registrar'}
        variant={variant}
        onClick={() => {
          if (variant === 'next') {
            const {success,data} = getFieldError(register)
            //if(!success) return fieldErrors = data
            isError = success
            api?.apiNext();
            onNext?.()
            
          } else {
              onConfirm?.();
              fieldErrors = getFieldError(register).data
              console.log($state.snapshot(register))
              isError = true
          }
        }}
      />
    </div>
  </form>
</div>