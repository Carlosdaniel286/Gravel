// context/overlayContext.svelte.ts
import { getContext, setContext } from "svelte";

const OVERLAY_KEY = Symbol("overlay");

type OverlayContext = {
  get isOpen(): boolean;
  set isOpen(value: boolean);
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export function setOverlayContext(initialOpen = false) {
  let isOpen = $state(initialOpen); // 🔥 reativo nativo do Svelte 5

  const context: OverlayContext = {
    get isOpen() {
      return isOpen;
    },
    set isOpen(value: boolean) {
      isOpen = value;
    },
    open() {
      isOpen = true;
    },
    close() {
      isOpen = false;
    },
    toggle() {
      isOpen = !isOpen;
    }
  };

  setContext(OVERLAY_KEY, context);
  return context;
}

export function getOverlayContext(): OverlayContext {
  const context = getContext<OverlayContext>(OVERLAY_KEY);
  if (!context) throw new Error("Overlay context not found!");
  return context;
}
