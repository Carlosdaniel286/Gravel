 <script lang="ts">
  import Label from './../Label.svelte';
  import { cn } from "$lib/utils";
  import SelectedItems from '../SelectedItems.svelte';
  import Input from '../Input.svelte';
  import ButtonAdd from '../ButtonAdd.svelte';
  import Overlay from '../Overlay.svelte';
  import Button from '../Button.svelte';

  // Modelo renomeado
  type ResidentAddress = {
    qd: string;
    lt: string;
    label: string;
    name: string;
  };

  interface AddressProps {
    class?: string;
    height?: number | string;
    address?: ResidentAddress[];
  }

  let {
    class: className,
    height,
    address
  }: AddressProps = $props();

  // Estados reorganizados e renomeados
  let isSelecting = $state(false);
  let panelRef = $state<HTMLElement | null>(null);
  let showDropdown = $state(true);

  let searchFilters = $state({
    lt: '',
    qd: '',
    name: ''
  });

  let panelWidth = $state(0);
  let selectedItems: ResidentAddress[] = $state([]);
  let isAddressPanelOpen = $state(false);

  // Filtro organizado
  let filteredAddresses = $derived.by(() => {
    const list = isSelecting ? selectedItems : address;

    if (!list) return [];

    if (
      searchFilters.lt === '' &&
      searchFilters.qd === '' &&
      searchFilters.name === ''
    ) {
      return list;
    }

    return list.filter((item) => {
      const matchLt = Number(item.lt).toString() === searchFilters.lt;
      const matchQd = Number(item.qd).toString() === searchFilters.qd;

      const matchName = item.name
        .toUpperCase()
        .startsWith(searchFilters.name.toUpperCase());

      const words = item.name.split(/\s+/);
      const matchLastName = words.some((word) =>
        word.toUpperCase().startsWith(searchFilters.name.toUpperCase())
      );

      if (searchFilters.name !== '') return matchLastName;

      if (searchFilters.lt !== '' && searchFilters.qd === '') return matchLt;
      if (searchFilters.lt === '' && searchFilters.qd !== '') return matchQd;

      return matchLt && matchQd && matchName;
    });
  });

  function handleOutsideClick(event: MouseEvent) {
    const path = event.composedPath();

    if (panelRef && !path.includes(panelRef)) {
      if (selectedItems.length > 0) {
        isAddressPanelOpen = false;
      }

      showDropdown = false;
      isSelecting = false;
    }
  }
</script>

<svelte:document onclick={handleOutsideClick} />

<div bind:this={panelRef} class={cn(className)}>
  <div class="flex flex-col w-full">

    <div class="flex items-center gap-2 mb-1">
      <Label label="Endereços visitados" />
    </div>

    <Overlay
      show={isAddressPanelOpen}
      
      onOverlay={(()=>{
        isAddressPanelOpen = false
        searchFilters.lt = '';
        searchFilters.name = '';
        searchFilters.qd = '';
      })}
      class=" sm:rounded-lg overflow-auto sm:h-auto h-full flex flex-col gap-4 w-[700px] p-4 bg-white shadow-md"
    >
      <header class="text-center">
        <h3 class="capitalize font-bold text-2xl font-nunito">
          Escolha os endereços de visita
        </h3>
      </header>

      <div
        bind:clientWidth={panelWidth}
        class="flex bg-white  flex-col gap-4 justify-between"
      >
        <div class="flex flex-col sm:flex-row gap-3 justify-between">
          <Input
            height={height}
            class="flex-1 placeholder:text-black"
            placeholder="qd"
            prefix="qd:"
            mask="00"
            bind:value={searchFilters.qd}
          />

          <Input
            height={height}
            class="flex-1 placeholder:text-black"
            placeholder="lt"
            prefix="lt:"
            mask="00"
            bind:value={searchFilters.lt}
          />
        </div>

        <div>
          <Input
            height={height}
            class="flex-1 placeholder:text-black"
            placeholder="nome"
            mask={/^[A-Za-z ]+$/}
            bind:value={searchFilters.name}
          />
        </div>

        {#if showDropdown}
          <SelectedItems
            bind:selectedItems={selectedItems}
            options={filteredAddresses}
            property="label"
            width={panelWidth}
            class="top-[80%] "
            onclick={() => {
              showDropdown = false;
              isSelecting = false;
              isAddressPanelOpen = true;
            }}
          />
        {/if}
      </div>

      <div class="flex justify-between">
        <Button
          text={isSelecting ? "adicionar" : "ver"}
          class=""
          onClick={() => {
            isSelecting = !isSelecting;
          }}
        />

        <Button
          class=""
          text="ok"
          onClick={() => {
            isAddressPanelOpen = false;
          }}
        />
      </div>
    </Overlay>

    <ButtonAdd
      height={height}
      text="adicionar e ver endereços"
      onClick={() => {
        isAddressPanelOpen = true;
        showDropdown = true;
        searchFilters.lt = '';
        searchFilters.name = '';
        searchFilters.qd = '';
      }}
      class="mb-6 mt-2 w-full"
    />
  </div>
</div>
