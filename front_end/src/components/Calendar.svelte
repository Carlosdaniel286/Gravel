<script lang="ts">
  import { cn } from '$lib/utils';
  import {
    startOfMonth,
    lastDayOfMonth,
    addDays,
    isEqual,
    endOfMonth,
    addMonths,
    startOfDay,
    parse,
    isValid,
    format,
    isBefore,
    isAfter,
    addYears,
    differenceInCalendarYears
  } from 'date-fns';
  import Select from './Select.svelte';
  import { maskAction } from '$lib/hooks/useMask.svelte';
  import { normalizeDateInput } from '$lib/helpers/normalizeDateInput';
  import { daysName, months } from '$lib/consts/dateCalendar';
  import { ArrowLeft, ArrowRight, CalendarSearch, X } from '@lucide/svelte';
    import { onMount } from 'svelte';
 

  // -----------------------
  // Tipagem
  // -----------------------
  interface CalendarProps {
    value?: Date | null;
    inputValue?: string;
    disabled?: { before?: Date; after?: Date };
    startDate?: Date;
    endDate?: Date;
    label?: string;
    class?: string;
    height?: string | number;
  }

  // -----------------------
  // Valores iniciais
  // -----------------------
  const today = startOfDay(new Date());
  const initialFormatted = format(today, 'dd/MM/yyyy');
  
  //useSateFrom
  
  let {
    value = $bindable(),
    inputValue = $bindable(initialFormatted),
    disabled,
    startDate,
    endDate,
    label,
    class: className,
    height: heightClass
  }: CalendarProps = $props();

  // -----------------------
  // Estado interno
  // -----------------------
  let selectedDay = $state(today.getDate());
  let selectedMonth = $state(today.getMonth());
  let selectedYear = $state(today.getFullYear());
  let selectedDate = $state(startOfDay(today));
  let isCalendarOpen = $state(false);

  let calendarRef = $state<HTMLElement | null>(null);
  let openButtonRef = $state<HTMLElement | null>(null);
  let inputRef = $state<HTMLDivElement | null>(null);
  let dropdownRef = $state<HTMLDivElement | null>(null);

  let height = $state(0);
  let limitPosition = $state(true);

  const calendarYears = differenceInCalendarYears(
    endDate ?? addYears(today, 11),
    startDate ?? new Date(0)
  );

  // -----------------------
  // Derivados
  // -----------------------
  const currentMonthStart = $derived(
    startOfMonth(new Date(selectedYear, selectedMonth, selectedDay))
  );
  const prevMonthDays = $derived(getPrevMonthTrailingDays());
  const currMonthDays = $derived(getCurrMonthDays());
  const nextMonthDays = $derived(getNextMonthLeadingDays());
  const currentMonthLabel = $derived(months[selectedMonth].month.slice(0, 3));
  const yearOptions = new Array(calendarYears)
    .fill(0)
    .map((_, i) => startDate?.getFullYear() ?? new Date(0).getFullYear() + i);

  // -----------------------
  // Funções auxiliares
  // -----------------------
  function setSelectedDate(date: Date) {
    selectedDate = date;
    value = date;
  }

  function disabledDate(currentDate: Date) {
    if (disabled?.before && isBefore(currentDate, disabled.before)) return true;
    if (disabled?.after && isAfter(currentDate, disabled.after)) return true;
    return false;
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
      selectedMonth = 11; // Dezembro
    }
  }

  function goToNextMonth() {
    if (selectedMonth < 11) {
      selectedMonth++;
    } else {
      selectedMonth = 0; // Janeiro
    }
  }

  // -----------------------
  // Eventos
  // -----------------------
  function handleClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    if (
      (openButtonRef && path.includes(openButtonRef)) ||
      (calendarRef && path.includes(calendarRef))
    ) {
      return;
    }
    isCalendarOpen = false;
  }

  $effect(() => {
    const parsed = parse(inputValue, 'dd/MM/yyyy', new Date());
    if (isValid(parsed)) {
      value = parsed;
      selectedDate = parsed;
      selectedMonth = parsed.getMonth();
      selectedYear = parsed.getFullYear();
    }
  });

  $effect(() => {
    if (dropdownRef) {
      const rect = dropdownRef.getBoundingClientRect();
      if (rect.top < 0) limitPosition = false;
    }
  });
</script>

<svelte:window bind:innerHeight={height} />
<svelte:document onclick={handleClickOutside} />

<div bind:this={calendarRef} class="relative">
  {#if isCalendarOpen}
    <div
      bind:this={dropdownRef}
      class={cn(
        'p-1 border absolute z-20 left-1/2 -translate-x-1/2 bg-white rounded-[1.2rem] flex flex-col justify-center items-center',
        limitPosition ? 'bottom-full mb-2' : 'top-full mt-2'
      )}
    >
      <!-- Navegação mês/ano -->
      <div class="flex gap-2 justify-center items-center max-w-[400px]">
        <button class="cursor-pointer" onclick={goToPrevMonth}>
          <ArrowLeft size={60} class="h-5 w-5" />
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

        <button class="cursor-pointer" onclick={goToNextMonth}>
          <ArrowRight size={60} class="h-5 w-5" />
        </button>
      </div>

      <!-- Dias do calendário -->
      <div class="grid grid-cols-7 min-w-[300px] min-h-[300px] gap-0 p-1">
        {#each daysName as dayName}
          <span class="h-[30px] text-sm flex justify-center text-gray-600 items-center">
            {dayName.slice(0, 3)}
          </span>
        {/each}

        {#each [...prevMonthDays, ...currMonthDays, ...nextMonthDays] as item}
          <button
            disabled={disabledDate(item.date)}
            onclick={() => {
              const clickedMonth = item.date.getMonth();
              if (selectedMonth + 1 === clickedMonth) goToNextMonth();
              if (selectedMonth - 1 === clickedMonth) goToPrevMonth();

              setSelectedDate(item.date);
              inputValue = format(item.date, 'ddMMyyyy');
              isCalendarOpen = false;
            }}
            class={cn(
              'button',
              item.date.getTime() === today.getTime() && 'bg-gray-200',
              item.isSelected && !disabledDate(item.date) && 'bg-black text-white',
              prevMonthDays.includes(item) && 'text-gray-400 text-sm',
              nextMonthDays.includes(item) && 'text-gray-400 text-sm',
              disabledDate(item.date) ? 'text-gray-300' : null,
              disabledDate(item.date) ? 'hover:bg-transparent' : null
            )}
          >
            {item.day}
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Input de data -->
  <div class="flex flex-col gap-2">
    <label for="input" class="pl-2 uppercase text-gray-800 font-semibold">{label}</label>
    <div
      bind:this={inputRef}
      class={cn('flex input', className)}
      style="height:{heightClass}px;"
    >
      <button class="cursor-pointer mr-3 rounded-sm">
        <X
          onclick={() => {
            inputValue = format(disabled?.before ?? today, 'dd/MM/yyyy');
          }}
        />
      </button>

      <input
        id="input"
        class="w-full focus:outline-0 focus:ring-0"
        type="text"
        onclick={() => (isCalendarOpen = true)}
        bind:value={inputValue}
        use:maskAction={{ mask: '00/00/0000', value: inputValue }}
        placeholder="DD/MM/YYYY"
        onkeydown={(event) => {
          const onlyNumbers = inputValue.replace(/\D/g, '');
          if (event.key === 'Backspace') {
            event.preventDefault();
            inputValue = onlyNumbers.slice(0, -1);
          }
        }}
        oninput={() => {
          inputValue = normalizeDateInput(
            inputValue,
            today,
            yearOptions[yearOptions.length - 1],
            yearOptions[0]
          );
        }}
      />

      <button bind:this={openButtonRef} class="cursor-pointer rounded-sm">
        <CalendarSearch onclick={() => (isCalendarOpen = !isCalendarOpen)} />
      </button>
    </div>
  </div>
</div>
