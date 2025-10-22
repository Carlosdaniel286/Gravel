import { setContext, getContext } from "svelte";
import * as z from "zod";

import {
  initRegisterVisitorList,
  type GeralRegister,
  type RegisterVisitorList
} from "$lib/consts/access.options";

import { initRegisterVehicle } from "$lib/consts/vehicle.options";
import type { Vehicle } from "$lib/types/vehicle.type";

// 🔑 Chave única para o contexto
const REGISTER_KEY = Symbol("register-form");

// 🔹 Estado inicial do registro geral
let initGeralRegister: GeralRegister = {
  person: [],
  vehicle: undefined
};

// 🧩 Classe que gerencia a lista de registros
export class RegisterManager {
  registerList = $state<GeralRegister>(initGeralRegister);
  register = $state<RegisterVisitorList>({
    ...initRegisterVisitorList,
    idRegister: crypto.randomUUID()
  });
  vehicle = $state<Vehicle>({ ...initRegisterVehicle });
  hasVehicleWithoutDriver = $state(false);
  disabled = $state(false)
  
  constructor() {
    // Inspeciona reatividade
    $effect(() => {
     $inspect(this.registerList)
      
    });

    // Define se o visitante é motorista
    $effect(() => {
      this.register.driver =
        this.register.accessMode === "veículo";
       
    });
  }

  get initPerson(){
   return {
    ...initRegisterVisitorList,
    idRegister: crypto.randomUUID()
   } 
  }

   addPerson() {
    const exists = this.registerList.person.some(
      (item) => item.idRegister === this.register.idRegister
    );
    if (exists) return;
   
    this.registerList.person.push(this.register);
  }
 // 🧍‍♂️ Cria novo passageiro associado ao veículo
  createPassenger(register:RegisterVisitorList) {
    const passenger = {...register, 
      accessMode:'passageiro',
      idRegister: crypto.randomUUID(),
      passenger: true
    }
    if(!this.registerList.vehicle?.passenger) return
    const exists = this.registerList.vehicle.passenger.some(
      (item) => item.idRegister === passenger.idRegister
    );
    
    if (exists) return;
    this.registerList.vehicle.passenger.push(passenger)
  }
  // 🚗 Adiciona veículo atual ao registro
  addVehicle() {
    this.addPerson()
    this.registerList.vehicle = this.vehicle
  }
}

// 📦 Cria e define o contexto
export function setRegisterContext(): RegisterManager {
  const manager = new RegisterManager();
  setContext(REGISTER_KEY, manager);
  return manager;
}

// 📦 Obtém o contexto
export function getRegisterContext(): RegisterManager {
  const manager = getContext<RegisterManager>(REGISTER_KEY);
  if (!manager) {
    throw new Error(
      "Register context not found! Must be called inside a component that has a parent calling setRegisterContext()."
    );
  }
  return manager;
}
