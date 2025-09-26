<script lang='ts'>
    import HeaderForm from "./HeaderForm.svelte";

 interface AccessVehicleFormProps{
    onCancel?:()=>void
 }

 let {onCancel}:AccessVehicleFormProps =$props()

</script>

<div class="w-full h-full bg-white">
  <div>
   <HeaderForm
    title="Cadastro de Veículo"
    subTitle="Preencha as informações abaixo para cadastrar um novo veículo"
   />

  </div>
</div>