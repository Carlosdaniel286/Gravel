// acessRequestForm.svelte.ts

import {  setContext, getContext } from "svelte";
import { initRegisterVisitor } from "$lib/consts/access.options";
import { initRegisterVehicle } from "$lib/consts/vehicle.options";

import type { RegisterVisitor } from "$lib/types/access.types";
import type { Vehicle } from "$lib/types/vehicle.type";

// Chave única para o contexto
const REGISTER_KEY = Symbol("register-form");

// Tipo combinando visitor + vehicle
type Registered = RegisterVisitor & Vehicle;

// Classe que gerencia a lista de registros
export class RegisterManager {
      registerList = $state<Registered[]>([]);
     
      
    constructor() {
        this.addRegister();
      
    }

    // Getter reativo para o último registro
    get register(): Registered {
        return this.registerList[this.registerList.length - 1];
    }

    // Adiciona um novo registro
    addRegister() {
        const initRegistered = { ...initRegisterVisitor, ...initRegisterVehicle };
        const reg = { ...initRegistered, idRegister: crypto.randomUUID() };
        this.registerList.push(reg); // reatividade automática
    }
}

// Função para criar e setar o contexto
export function setRegisterContext(): RegisterManager {
    const manager = new RegisterManager();
    setContext(REGISTER_KEY, manager);
    return manager;
}

// Função para consumir o contexto
export function getRegisterContext(): RegisterManager {
    const manager = getContext<RegisterManager>(REGISTER_KEY);
    if (!manager) {
        throw new Error(
            "Register context not found! Must be called inside a component that has a parent calling setRegisterContext()."
        );
    }
    return manager;
}
