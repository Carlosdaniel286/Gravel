<script lang="ts">
  import { cn } from '$lib/utils';
  import AutoComplete from './AutoComplete.svelte';
  import DateRangePicker from './DateRangePicker.svelte';
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import Img from '$lib/assets/default_img.jpg'
  import ButtonAdd from './ButtonAdd.svelte';
    import Button from './Button.svelte';
  const HEIGHT = '58';

</script>

<div class="bg-white flex flex-col gap-5 w-[1200px] m-2 rounded-2xl  px-5 py-9">
  <!-- Header -->
  <header>
    <h2 class="capitalize font-semibold text-lg">Cadastro de Visitantes</h2>
    <span class="text-sm text-gray-500">
      Preencha as informações abaixo para cadastrar um novo visitante.
    </span>
  </header>

  <!-- Form Grid -->
  <form class="grid grid-cols-4  gap-3">
    <!-- Nome Completo -->
    <Input
      mask={/^[A-Za-z ]+$/}
      class={cn(`col-span-3` )}
      height={HEIGHT}
      placeholder="Digite o nome completo"
      label="Nome completo"
    />
    <picture class='row-span-2 flex justify-end  col-start-4 row-start-1'>
        <img 
          src={Img}
          alt=""
          class="rounded-lg cursor-pointer  object-cover "
        />

     </picture>
    <!-- Endereço do Morador -->
    <AutoComplete
      title="Endereço do morador"
      height={HEIGHT}
      class={cn( `col-span-3`)}
      placeholder="Digite endereço ou nome do morador"
    />
    
   <!-- CPF -->
    <Input
     height={HEIGHT}
      mask="000.000.000-00"
      class={cn(`col-span-2 col-start-1 `)}
      placeholder="Digite o CPF"
      label="CPF completo"
    />
    <Input
     height={HEIGHT}
      mask="(00) 00000-0000"
      class={cn(`col-span-2 col-start-1 `)}
      placeholder="Digite o número de telefone "
      label="telefone (opcional)"
    />
    <ButtonAdd
      class={cn(`col-span-2 col-start-1 `)}
      text='criar uma observaçao'
      heigth={HEIGHT}
    />
     <!-- Período de Visita -->
    <DateRangePicker 
     class="row-span-3 row-start-3 col-span-1 col-start-4 " 
     classCalendar={cn(`h-[${HEIGHT}px]`)}
     classDays={cn(`h-[${HEIGHT}px]`)}
    />

    <!-- Selects adicionais -->
    <Select 
      class={cn(` col-start-3 row-start-3 `)}
      height={HEIGHT}
      title='catergoria de vistante'
    />
    <Select 
      class={cn("col-start-3 row-start-4")}
      title='tipo de acesso'
      height={HEIGHT}
    />
    <Select 
      class={cn('col-start-3')}
      height={HEIGHT}
      title='tipo de registro'
    />
    
    <div class=" mt-6 col-span-4 flex justify-between ">
       <Button
       color='cancel'
       text='cancelar'
      />
      
      <Button
       text='enviar'
      />
      
    </div>
   
  </form>
</div>
