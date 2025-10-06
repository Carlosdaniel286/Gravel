<script lang="ts">
  import { cn } from '$lib/utils';
  import Select from "./Select.svelte";
  import { ArrowLeft, ArrowRight } from "@lucide/svelte";
  import { 
    addDays, addMonths, addYears, differenceInCalendarYears, 
    endOfMonth, isAfter, isBefore, isEqual, lastDayOfMonth, 
    startOfDay, startOfMonth 
  } from "date-fns";
  import { daysName, months } from '$lib/consts/dateCalendar';

  interface CalendarGridProps {
    value?: Date;
    disabled?: { before?: Date; after?: Date };
    startDate?: Date;
    endDate?: Date;
    selectedMonth?: number
    selectedDay?: number
    selectedYear?:number
    selectedDate?: Date
    onclick?: () => void;
    setSelectedDate?: (date: Date) => void;

  }

  const today = startOfDay(new Date());

  let {
    value = $bindable(today),
    disabled,
    startDate,
    endDate,
    onclick,
    selectedMonth=$bindable(today.getMonth()),
    selectedDate=$bindable(today),
    selectedDay=$bindable(today.getDate()),
    selectedYear=$bindable(today.getFullYear())

  }: CalendarGridProps = $props();

  let limitPosition = $state(true);
  let dropdownRef = $state<HTMLDivElement | null>(null);

   const currentMonthStart = $derived(
    startOfMonth(new Date(selectedYear, selectedMonth, selectedDay))
  );
  const prevMonthDays = $derived(getPrevMonthTrailingDays());
  const currMonthDays = $derived(getCurrMonthDays());
  const nextMonthDays = $derived(getNextMonthLeadingDays());
  const currentMonthLabel = $derived(months[selectedMonth].month.slice(0, 3));

  const calendarYears = differenceInCalendarYears(
    endDate ?? addYears(today, 11),
    startDate ?? new Date(0)
  );
  const yearOptions = new Array(calendarYears)
    .fill(0)
    .map((_, i) =>
      startDate?.getFullYear()
        ? startDate.getFullYear() + i
        : new Date(0).getFullYear() + i
    );

  function setSelectedDate(date: Date) {
    selectedDate = date;
    value = date;
    onclick?.();
  }

  function getPrevMonthTrailingDays() {
    const firstWeekdayIndex = startOfMonth(currentMonthStart).getDay();
    const prevMonthLastDay = lastDayOfMonth(
      new Date(selectedYear, selectedMonth - 1)
    );
    const startDay = addDays(prevMonthLastDay, -firstWeekdayIndex);

    return Array.from({ length: firstWeekdayIndex }, (_, i) => {
      const date = addDays(startDay, i + 1);
      return {
        date,
        day: date.getDate(),
        isSelected: isEqual(date, selectedDate)
      };
    });
  }

  function getCurrMonthDays() {
    const lastDay = lastDayOfMonth(currentMonthStart).getDate();
    return Array.from({ length: lastDay }, (_, i) => {
      const date = new Date(
        currentMonthStart.getFullYear(),
        currentMonthStart.getMonth(),
        i + 1
      );
      return {
        date,
        day: date.getDate(),
        isSelected: isEqual(date, selectedDate)
      };
    });
  }

  function getNextMonthLeadingDays() {
    const lastWeekdayIndex = endOfMonth(currentMonthStart).getDay();
    const length = 6 - lastWeekdayIndex;
    const firstDayNextMonth = addMonths(currentMonthStart, 1);

    return Array.from({ length }, (_, i) => {
      const date = addDays(firstDayNextMonth, i);
      return {
        date,
        day: date.getDate(),
        isSelected: isEqual(date, selectedDate)
      };
    });
  }

  function goToPrevMonth() {
    if (selectedMonth > 0) {
      selectedMonth--;
    } else {
      selectedMonth = 11;
      selectedYear--;
    }
  }

  function goToNextMonth() {
    if (selectedMonth < 11) {
      selectedMonth++;
    } else {
      selectedMonth = 0;
      selectedYear++;
    }
  }

  function disabledDate(currentDate: Date) {
    if (disabled?.before && isBefore(currentDate, disabled.before)) return true;
    if (disabled?.after && isAfter(currentDate, disabled.after)) return true;
    return false;
  }

  $effect(() => {
    if (dropdownRef) {
      const rect = dropdownRef.getBoundingClientRect();
      if (rect.top < 0) limitPosition = false;
    }
  });
</script>

<div
  bind:this={dropdownRef}
  class={cn(
    'p-3 border absolute z-20 left-1/2 -translate-x-1/2 bg-white w-full max-w-[320px] md:min-w-[295px]  rounded-xl shadow-lg flex flex-col items-center',
    limitPosition ? 'bottom-full mb-2' : 'top-full mt-2'
  )}
>
  <!-- Cabeçalho moderno -->
  <div class="flex items-center gap-3 mb-2">
    <button
      class="p-1 rounded hover:bg-gray-200 transition"
      onclick={goToPrevMonth}
    >
      <ArrowLeft size={20} />
    </button>

    <Select
      property="month"
      options={months.map((it) => ({ ...it, month: it.month.slice(0, 3) }))}
      setSelected={currentMonthLabel}
      onSelect={(item) => {
        if (typeof item !== 'string') {
          selectedMonth = item.id;
          selectedDate = currentMonthStart;
        }
      }}
    />

    <Select
      options={yearOptions}
      setSelected={currentMonthStart.getFullYear().toString()}
      onSelect={(item) => {
        if (typeof item !== 'string') {
          selectedYear = item;
          selectedDate = currentMonthStart;
        }
      }}
    />

    <button
      class="p-1 rounded hover:bg-gray-200 transition"
      onclick={goToNextMonth}
    >
      <ArrowRight size={20} />
    </button>
  </div>

  <!-- Dias da semana -->
  <div class="grid grid-cols-7 w-full text-center font-semibold text-gray-600 mb-1 bg-gray-100 rounded">
    {#each daysName as dayName}
      <div class="py-1">{dayName.slice(0, 3)}</div>
    {/each}
  </div>

  <!-- Dias do mês -->
  <div class="grid grid-cols-7 gap-1 w-full">
    {#each [...prevMonthDays, ...currMonthDays, ...nextMonthDays] as item}
      <button
        disabled={disabledDate(item.date)}
        onclick={() => setSelectedDate(item.date)}
        class={cn(
          'py-2 rounded-full transition-all cursor-pointer duration-100',
          item.isSelected && !disabledDate(item.date)
            ? 'bg-blue-600 text-white'
            : isEqual(item.date, today)
            ? 'bg-blue-100 text-blue-800'
            : prevMonthDays.includes(item) || nextMonthDays.includes(item)
            ? 'text-gray-400'
            : 'text-gray-700',
            !disabledDate(item.date) && 'hover:bg-gray-200',
            disabledDate(item.date) && 'text-gray-300 cursor-auto'
        )}
      >
        {item.day}
      </button>
    {/each}
  </div>
</div>

  