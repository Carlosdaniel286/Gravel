<script lang="ts">
  import { maskAction } from "$lib/hooks/useMask.svelte";
  import { startOfDay, differenceInCalendarDays, addDays, isAfter, isBefore } from "date-fns";
  import Calendar from "./calendar/Calendar.svelte";
  import { cn } from "$lib/utils";
    import Label from "./Label.svelte";

  interface DateRangePickerProps {
    startDate?: Date;
    endDate?: Date;
    numberOfDays?: number | "permanente";
    class?: string;
    classDays?: string;
    classCalendar?: string;
    height?:number|string
  }

  const today = startOfDay(new Date());

  let {
    startDate = $bindable(today),
    endDate = $bindable(today),
    numberOfDays = $bindable(),
    class: className,
    classDays,
    classCalendar,
    height
  }: DateRangePickerProps = $props();

  // Dias de permanência derivados
  const daysOfStay = $derived.by(() => differenceInCalendarDays(endDate, startDate) + 1);

  // Input de dias
  let stayDaysInput: "" | number = $state(1);

  function handleDaysInput() {
    const num = Number(stayDaysInput);
    if (!num || num < 1) return (stayDaysInput = "");
    if (stayDaysInput.toString().length > 4) return;
    stayDaysInput = num;
   // Atualiza a data final
    endDate = startOfDay(addDays(startDate, num - 1));
  }

  // Sincroniza endDate caso startDate ultrapasse
  $effect(() => {
    if (isAfter(startDate, endDate)) endDate = startDate;
  });

  // Atualiza automaticamente input e binding de numberOfDays
  $effect(() => {
    numberOfDays = daysOfStay;
    stayDaysInput = daysOfStay;
  });

  const disabledEndDate = $derived.by(()=>{
    if(isBefore(startDate,today)) return today
    return startDate
  }) 


</script>

<div class={cn("flex flex-col  gap-8  ", className)}>
  <!-- Início da permanência -->
   
   
  <Calendar
    class={cn(classCalendar)}
    disabled={{ before: today }}
    startDate={today}
    bind:value={startDate}
    label='Início de permanência'
    height={height}
  />

  <!-- Fim da permanência -->
  <Calendar
    class={classCalendar}
    disabled={{ before: disabledEndDate }}
    startDate={today}
    bind:value={endDate}
    label="Fim de permanência"
    height={height}
  />

  <!-- Dias de permanência -->
  <fieldset class=" flex flex-col gap-2">
    <Label for="days-input" 
    label='Dias de permanência'
    
    />
      
    
    <input
      id="days-input"
      bind:value={stayDaysInput}
      oninput={handleDaysInput}
      style="height:{height}px;"
      use:maskAction={{ mask: ["0000"], value: stayDaysInput.toString() }}
      class={cn("input text-center px-1 cursor-auto", classDays)}
    />
  </fieldset>
</div>

