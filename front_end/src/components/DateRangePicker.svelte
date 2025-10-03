<script lang="ts">
  import { maskAction } from "$lib/hooks/useMask.svelte";
  import { startOfDay, format, differenceInCalendarDays, addDays,isAfter } from "date-fns";
  import Calendar from "./Calendar.svelte";
  import { cn } from "$lib/utils";
    import { onMount } from "svelte";

  interface DateRangePickerProps {
    startDate?: Date;
    endDate?: Date;
    numberOfDays?: number | 'permanente';
    class?: string;
    classDays?: string;
    classCalendar?: string;
  }

  // Data atual zerada
  const today = startOfDay(new Date());

  let {
    startDate = $bindable(today),
    endDate = $bindable(today),
    numberOfDays = $bindable(),
    class: className,
    classDays,
    classCalendar
  }: DateRangePickerProps = $props();

  const daysOfStay = $derived.by(() => {
    const diff = differenceInCalendarDays(endDate, startDate);
    return diff + 1;
  });

 

  // Valores auxiliares para inputs
  let stayDaysInput: string | number = $derived(daysOfStay);
  
  let startDateInput = $derived(format(startDate, "dd/MM/yyyy"))
  
  let endDateInput = $derived.by(()=>{
     if(isAfter(startDate,endDate)){
      return format(startDate, "dd/MM/yyyy")
     }else{
       return format(endDate, "dd/MM/yyyy")
     }
   })
   $effect(() => {
     numberOfDays = daysOfStay;
  });
  
  
  
  
  
  function handleDaysInput() {
    if(startDateInput=='permanente') return
    const num = Number(stayDaysInput);
     
    if (!num || num < 1) return (stayDaysInput = "");
    if (stayDaysInput.toString().length > 3) return;
    if (num > 366) return (stayDaysInput = 366);

    stayDaysInput = num;

    const calculatedEndDate = addDays(startDate, num - 1);
    endDateInput = format(calculatedEndDate, "dd/MM/yyyy");
    endDate = calculatedEndDate;
  }
</script>

<div class={cn("flex flex-col justify-center gap-4", className)}>
  <!-- Início da permanência -->
  <Calendar
    class={classCalendar}
    disabled={{ before: today }}
    startDate={today}
    bind:value={startDate}
    bind:inputValue={startDateInput}
    label="Início de permanência"
  />

  <!-- Fim da permanência -->
  <Calendar
    class={classCalendar}
    disabled={{ before: startDate }}
    startDate={today}
    bind:value={endDate}
    bind:inputValue={endDateInput}
    label="Fim de permanência"
  />

  <!-- Dias de permanência -->
  <fieldset class="flex flex-col  gap-2">
    <label
      for="days-input"
      class="pl-2 uppercase text-gray-800 font-semibold"
    >
      Dias de permanência
    </label>
    <input
      id="days-input"
      disabled={stayDaysInput=='permanente'}
      bind:value={stayDaysInput}
      oninput={handleDaysInput}
      use:maskAction={{ mask: ["000",'permanente'], value: stayDaysInput.toString() }}
      class={cn("input text-center px-1 cursor-auto", 
       stayDaysInput=='permanente'?'text-gray-400':'input',
       classDays
      )}
    />
  </fieldset>
</div>
