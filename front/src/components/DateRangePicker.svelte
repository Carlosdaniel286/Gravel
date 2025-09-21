<script lang="ts">
  import { maskAction } from "$lib/hooks/useMask.svelte";
  import { startOfDay, format, differenceInCalendarDays, addDays } from "date-fns";
  import Calendar from "./Calendar.svelte";
  import { cn } from "$lib/utils";

  interface DateRangePickerProps {
    startDate?: Date;
    endDate?: Date;
    numberOfDays?: number;
    class?: string;
    classDays?: string;
    classCalendar?: string;
  }

  // Data atual zerada
  const today = startOfDay(new Date());

  let {
    startDate = $bindable(),
    endDate = $bindable(),
    numberOfDays = $bindable(),
    class: className,
    classDays,
    classCalendar
  }: DateRangePickerProps = $props();

  // Estado das datas
  let period = $state({
    startDate: today,
    endDate: today
  });

  // Quantidade de dias (sempre >= 1)
  const daysOfStay = $derived.by(() => {
    const diff = differenceInCalendarDays(period.endDate, period.startDate);
    return diff + 1;
  });

  $effect(() => {
    startDate = period.startDate;
    endDate = period.endDate;
    numberOfDays = daysOfStay;
  });

  // Valores auxiliares para inputs
  let stayDaysInput: string | number = $derived(daysOfStay);
  let endDateInput = $derived(format(period.startDate, "dd/MM/yyyy"));
  let startDateInput = $derived(format(period.startDate, "dd/MM/yyyy"));

  // Atualiza a data final ao digitar os dias
  function handleDaysInput() {
    const num = Number(stayDaysInput);

    if (!num || num < 1) return (stayDaysInput = "");
    if (stayDaysInput.toString().length > 3) return;
    if (num > 366) return (stayDaysInput = 366);

    stayDaysInput = num;

    const calculatedEndDate = addDays(period.startDate, num - 1);
    endDateInput = format(calculatedEndDate, "dd/MM/yyyy");
    period.endDate = calculatedEndDate;
  }
</script>

<div class={cn("flex flex-col justify-center gap-3", className)}>
  <!-- Início da permanência -->
  <Calendar
    class={classCalendar}
    disabled={{ before: period.startDate }}
    startDate={today}
    bind:selectedDate={period.startDate}
    bind:inputValue={startDateInput}
    label="Início de permanência"
  />

  <!-- Fim da permanência -->
  <Calendar
    class={classCalendar}
    disabled={{ before: period.startDate }}
    startDate={today}
    bind:selectedDate={period.endDate}
    bind:inputValue={endDateInput}
    label="Fim de permanência"
  />

  <!-- Dias de permanência -->
  <fieldset class="flex flex-col gap-2">
    <label
      for="days-input"
      class="pl-2 uppercase text-gray-800 font-semibold"
    >
      Dias de permanência
    </label>
    <input
      id="days-input"
      bind:value={stayDaysInput}
      oninput={handleDaysInput}
      use:maskAction={{ mask: "000", value: stayDaysInput.toString() }}
      class={cn("input text-center px-1 cursor-auto", classDays)}
    />
  </fieldset>
</div>
