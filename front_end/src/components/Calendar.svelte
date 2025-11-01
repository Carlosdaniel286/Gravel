<script lang="ts">
  import { cn } from '$lib/utils';
  import {
    startOfDay,
    parse,
    isValid,
    format,
    addYears,
    isAfter,
    setYear
  } from 'date-fns';

  import { maskAction } from '$lib/hooks/useMask.svelte';
  import { normalizeDateInput } from '$lib/helpers/normalizeDateInput';
  import { CalendarSearch, X } from '@lucide/svelte';
  import { onMount } from 'svelte';
  import CalendarGrid from './CalendarGrid.svelte';
    import Label from './Label.svelte';

  interface CalendarProps {
    value?: Date;
    disabled?: { before?: Date; after?: Date };
    startDate?: Date;
    endDate?: Date;
    label?: string;
    class?: string;
    height?: string | number;
    maxYear?: number;
    
  }

  const today = startOfDay(new Date());

  let {
    value = $bindable(), // ✅ bindável com o pai
    disabled,
    startDate,
    endDate,
    label,
    class: className,
    height: heightClass,
    maxYear = addYears(today, 10).getFullYear(),
  }: CalendarProps = $props();

  // Estado interno
  let selectedDay = $state(today.getDate());
  let selectedMonth = $state(today.getMonth());
  let selectedYear = $state(today.getFullYear());
  let selectedDate = $state(startOfDay(today));
  let isCalendarOpen = $state(false);

  let calendarRef = $state<HTMLElement | null>(null);
  let openButtonRef = $state<HTMLElement | null>(null);
  let inputRef = $state<HTMLInputElement | null>(null);
  let height = $state(0);

  let inputValue = $state(format(value??today, 'dd/MM/yyyy'));
  
  const maxDate = $derived(setYear(parse(inputValue, 'dd/MM/yyyy', today),maxYear))

  const date = $derived.by(() => {
  const parsed = parse(inputValue, 'dd/MM/yyyy', today);
  return isAfter(parsed, maxDate)? maxDate :parsed
  });
  
  let isTyping = $state(false);

  $effect(() => {
    if (!isTyping) inputValue = format(value??today, 'dd/MM/yyyy');
    if (isTyping) value = date;

    updateSelected();
  });

  

  function handleClickOutside(event: MouseEvent) {
    const path = event.composedPath();
    if (
      (openButtonRef && path.includes(openButtonRef)) ||
      (calendarRef && path.includes(calendarRef))
    )
      return;

    isCalendarOpen = false;
  }

  function updateSelected() {
    if (isValid(date)) {
      selectedDate = date;
      selectedMonth = date.getMonth();
      selectedYear = date.getFullYear();
    }
  }

  

  onMount(() => updateSelected());

  function handleInput() {
    inputValue = normalizeDateInput(inputValue, maxYear, 1969);
    
  }

  function clearInput() {
    selectedDate = today
    value = today
  }
</script>

<svelte:window bind:innerHeight={height} />
<svelte:document on:click={handleClickOutside} />
 
<div bind:this={calendarRef} class="relative">
  {#if isCalendarOpen}
    <CalendarGrid
      bind:value={value}
      bind:selectedDate={selectedDate}
      bind:selectedDay={selectedDay}
      bind:selectedMonth={selectedMonth}
      bind:selectedYear={selectedYear}
      disabled={disabled}
      startDate={startDate}
      endDate={endDate}
      onclick={() => {
        isCalendarOpen = false;
      }}
    />
  {/if}

  <!-- Input -->
  <div class="flex flex-col gap-2">
    {#if label }
    <Label for="input"  
     label={label}
    />
    {/if}
   
    <div
      class={cn('flex input items-center   p-2', className)}
      style="height:{heightClass}px;"
    >
      <button class="cursor-pointer mr-3 rounded-sm" onclick={clearInput}>
        <X />
      </button>

      <input
        bind:this={inputRef}
        id="input"
        onfocus={() => { isTyping = true; }}
        onblur={() => { isTyping = false; }}
        class="w-full focus:outline-none"
        type="text"
        onclick={() => (isCalendarOpen = true)}
        bind:value={inputValue}
        use:maskAction={{ mask: '00/00/0000', value: inputValue }}
        placeholder="DD/MM/YYYY"
        oninput={() => handleInput()}
      />

      <button bind:this={openButtonRef} class="cursor-pointer rounded-sm">
        <CalendarSearch
          onclick={() => {
            isCalendarOpen = !isCalendarOpen;
          }}
        />
      </button>
    </div>
  </div>
</div>
