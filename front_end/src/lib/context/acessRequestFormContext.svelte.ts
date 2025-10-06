

import {  setContext, getContext } from "svelte";
import {  initRegisterVisitorList, type GeralRegister, type RegisterVisitorList } from "$lib/consts/access.options";
import { initRegisterVehicle } from "$lib/consts/vehicle.options";


import type { Vehicle } from "$lib/types/vehicle.type";

// Chave única para o contexto
const REGISTER_KEY = Symbol("register-form");
 
let initGeralRegister: GeralRegister = {
  person: [], // cria uma cópia
  vehicle: undefined
};



// Classe que gerencia a lista de registros
export class RegisterManager {
       registerList = $state<GeralRegister>(initGeralRegister)
       private registerVisitor = $state<RegisterVisitorList>({ ...initRegisterVisitorList,idRegister: crypto.randomUUID()})
       private registerVehicle = $state<Vehicle>({...initRegisterVehicle})
       
      //"Passageiro (Veículo)"
     constructor() {
      $effect(()=>{
        $inspect(this.registerList)
      })
      $effect(()=>{
        this.registerVisitor.driver = this.registerVisitor.accessMode =='veículo'
        
       })
     }

    // Getter reativo para o último registro
    get register(): RegisterVisitorList {
       return this.registerVisitor
    }
    
    get vehicle():Vehicle{
       return this.registerVehicle
    }
    
    addPerson() {
     const iqualsId =this.registerList.person.some((item)=>{
        return item.idRegister ===this.register.idRegister
     })
     if(iqualsId) return
     this.registerList.person.push(this.register);
   }

    creatPassenger(){
      this.addPerson()
      this.addVehicle()
      this.registerVisitor= { ...initRegisterVisitorList,
        passenger:true ,
        idRegister: crypto.randomUUID(),
        accessMode:"passageiro"
      }
      
    }
  
   addVehicle () {
     this.registerList.vehicle = this.vehicle
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
