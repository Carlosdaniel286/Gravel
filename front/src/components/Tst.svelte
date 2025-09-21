<script lang="ts">
  import { cn } from '$lib/utils';
  import {
    startOfMonth, lastDayOfMonth, addDays, isEqual, endOfMonth,
    addMonths, startOfDay, parse, isValid, format, isBefore
  } from 'date-fns';
  import Select from './Select.svelte';
  import { maskAction } from '$lib/hooks/useMask.svelte';
  import { normalizeDateInput } from '$lib/helpers/normalizeDateInput';
  import { daysName, months } from '$lib/consts/dateCalendar';
  import { ArrowLeft, ArrowRight, CalendarSearch } from '@lucide/svelte';

  // -----------------------
  // Estado
  // -----------------------
  const today = startOfDay(new Date());
  let day         = $state(today.getDate());
  let month       = $state(today.getMonth());
  let years       = $state(today.getFullYear());
  let dateCliked  = $state(today);
  let calendarOpen = $state(false);
  let value       = $state(format(today, "ddMMyyyy"));

  // -----------------------
  // Derivados
  // -----------------------
  const currentDate = $derived( startOfMonth(new Date(years, month, day)));
  const monthCurrent = $derived( months[month].month.slice(0, 3));
  const yearsList = Array.from({ length: 11 }, (_, i) => today.getFullYear() + i);

  const previousMonthDays = $derived( getTrailingDays(currentDate, dateCliked, years, month));
  const currentMonthDays  = $derived( getCurrentMonthDays(currentDate, dateCliked));
  const nextMonthDays     = $derived( getLeadingDays(currentDate, dateCliked));

  // -----------------------
  // Efeitos
  // -----------------------
  $effect(() => {
    const date = parse(value, "dd/MM/yyyy", new Date());
    if (isValid(date)) {
      dateCliked = date;
      month = date.getMonth();
      years = date.getFullYear();
    }
  });

  // -----------------------
  // Funções puras
  // -----------------------
  function getLeadingDays(current: Date, clicked: Date) {
    const lastDayIndex = endOfMonth(current).getDay();
    const length = 6 - lastDayIndex;
    const getNextMonth = addMonths(current, 1);
    return generateDays(getNextMonth, length, clicked);
  }

  function getTrailingDays(current: Date, clicked: Date, y: number, m: number) {
    const firstDayIndex = startOfMonth(current).getDay();
    const lastPrev = lastDayOfMonth(new Date(y, m - 1));
    const startDay = addDays(lastPrev, -firstDayIndex);
    return generateDays(addDays(startDay, 1), firstDayIndex, clicked);
  }

  function getCurrentMonthDays(current: Date, clicked: Date) {
    const lastDay = lastDayOfMonth(current).getDate();
    return Array.from({ length: lastDay }, (_, i) => {
      const date = new Date(current.getFullYear(), current.getMonth(), i + 1);
      return { date, days: date.getDate(), clicked: isEqual(date, clicked) };
    });
  }

  function generateDays(start: Date, length: number, clicked: Date) {
    return Array.from({ length }, (_, i) => {
      const date = addDays(start, i);
      return { date, days: date.getDate(), clicked: isEqual(date, clicked) };
    });
  }

  // -----------------------
  // Ações
  // -----------------------
  function changeMonth(dir: number) {
    month = (month + dir + 12) % 12;
    dateCliked = today.getMonth() === month ? today : currentDate;
  }

  function selectDate(date: Date) {
    dateCliked = date;
    value = format(date, "ddMMyyyy");
  }

  function handleCalendarFocusOut(event: MouseEvent) {
    const inside = event.composedPath().some(
      el => el instanceof HTMLElement && (el.id === 'click' || el.id === 'open')
    );
    calendarOpen = inside;
  }
</script>

<svelte:document onclick={handleCalendarFocusOut} />

<div class="relative" id="click">
  {#if calendarOpen}
    <div
      tabindex="-1"
      class="p-1 border absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-[1.2rem] flex flex-col justify-center items-center"
    >
      <!-- Navegação -->
      <div class="flex gap-2 justify-center items-center max-w-[400px]">
        <button class="cursor-pointer" onclick={() => changeMonth(-1)}>
          <ArrowLeft size={60} class="h-5 w-5" />
        </button>

        <Select
          property="month"
          options={months.map(it => ({ ...it, month: it.month.slice(0, 3) }))}
          label={monthCurrent}
          onSelect={item => {
            if (typeof item !== 'string') {
              month = item.id;
              dateCliked = currentDate;
            }
          }}
        />

        <Select
          options={yearsList}
          label={currentDate.getFullYear().toString()}
          onSelect={item => {
            if (typeof item !== 'string') {
              years = item;
              dateCliked = currentDate;
            }
          }}
        />

        <button class="cursor-pointer" onclick={() => changeMonth(1)}>
          <ArrowRight size={60} class="h-5 w-5" />
        </button>
      </div>

      <!-- Dias -->
      <div class="grid grid-cols-7 min-w-[300px] min-h-[300px] gap-0 p-1">
        {#each daysName as it}
          <span class="h-[30px] text-sm flex justify-center text-gray-600 items-center">
            {it.slice(0, 3)}
          </span>
        {/each}

        {#each [...previousMonthDays, ...currentMonthDays, ...nextMonthDays] as item}
          <button
            disabled={isBefore(item.date, today)}
            onclick={() => selectDate(item.date)}
            class={cn(
              "button",
              item.date.getTime() === today.getTime() && "bg-gray-200",
              item.clicked && !isBefore(item.date, today) && "bg-black text-white",
              isBefore(item.date, today) && 'text-gray-300 hover:bg-transparent',
              previousMonthDays.includes(item) && "text-gray-400",
              nextMonthDays.includes(item) && "text-gray-400 text-sm"
            )}
          >
            {item.days}
          </button>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Input -->
  <div class="flex input">
    <input
      class="w-full focus:outline-0 focus:ring-0"
      type="text"
      bind:value={value}
      use:maskAction={{ mask: '00/00/0000', value }}
      onkeydown={item => {
        const onlyNumbers = value.replace(/\D/g, "");
        if (item.key === 'Backspace') {
          item.preventDefault();
          value = onlyNumbers.slice(0, -1);
        }
      }}
      placeholder="DD/MM/YYYY"
      oninput={() => {
       // value = normalizeDateInput(value, today);
      }}
    />

    <button id="open" class="cursor-pointer rounded-sm">
      <CalendarSearch
        onclick={() => { calendarOpen = !calendarOpen }}
        id="open"
      />
    </button>
  </div>
</div>