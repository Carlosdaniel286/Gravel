import { initAccessForm } from "$lib/consts/access.options";
// Não precisamos importar todos os tipos, apenas o principal:
import type { AccessFormValues } from "$lib/types/access.types"; 
import { getContext, setContext } from "svelte";

// Usamos uma chave única e tipada
const REGISTER_KEY = Symbol("register-form"); 

// Define a interface do Contexto
type RegisterFormContext = {
    // 1. Getter/Setter para atualizar TODO o formulário de uma vez
    set register(value: AccessFormValues); 
    get register(): AccessFormValues;

    // 2. Método de atualização parcial (para mudar apenas um campo)
    

    // 3. Método para resetar o formulário
    reset(): void;
};


export function setRegisterContext() {
    // Variável de estado interna com a digitação CORRIGIDA: 'register'
    let register = $state(initAccessForm);
    
    // Armazena a forma inicial para a função reset()
    const initialForm = initAccessForm;

    const context: RegisterFormContext = {
        // 1. SETTER: Permite que o estado seja substituído completamente
        set register(value: AccessFormValues) {
            register = value;
        },

        // 2. GETTER: Permite a leitura do estado (usada para rastrear reatividade)
        get register() {
            return register;
        },

        
        reset() {
            // Cria uma cópia fresca do estado inicial
            register = { ...initialForm }; 
        }
    };

    setContext(REGISTER_KEY, context);
    return context;
}

export function getRegisterContext(): RegisterFormContext {
    const context = getContext<RegisterFormContext>(REGISTER_KEY);
    // Erro de Contexto mais específico
    if (!context) throw new Error("Register context not found! Must be called inside a component that has a parent calling setRegisterContext().");
    return context;
}