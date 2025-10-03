import type { RegisterVisitor } from "$lib/types/access.types";
import { initRegisterVisitor } from "./access.options";


export let useSateFrom = $state<RegisterVisitor>(initRegisterVisitor)