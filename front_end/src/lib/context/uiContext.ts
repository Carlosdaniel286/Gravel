// uiContext.ts
import { getContext, setContext } from "svelte";

type UIConfig = {
  size: number
  color: string
};

const key = {};

export function setUIContext(config: UIConfig) {
  setContext(key, config);
}

export function getUIContext(): UIConfig {
  return getContext(key) as UIConfig;
}
