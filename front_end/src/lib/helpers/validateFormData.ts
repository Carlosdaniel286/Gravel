import {  type RegisterVisitorList } from "$lib/consts/access.options";


import { z } from "zod";

 

 const addressSchema = z.object({
  id: z.number(),
  label: z.string().min(1, "O campo label é obrigatório"),
  casa: z.string().min(1, "O campo casa é obrigatório"),
});

function isValidCPF(cpf: string): boolean {
   const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
  return cpfRegex.test(cpf)
    
}

function isValidCNH(cnh: string): boolean {
  const cnhRegex = /^\d{11}$/;
  return cnhRegex.test(cnh);
}

function isValidCellphone(phone:string): boolean {
  const phoneRegex = /^\d{2}9\d{8}$/;
  return phoneRegex.test(phone);
}




export const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpf: z.string()
    .min(11, "CPF incompleto")
    .refine(value => isValidCPF(value), "CPF inválido"),
    phone: z
  .string()
  .optional()
  .refine(
    (value) => !value || isValidCellphone(value),
    'Número de celular inválido'
  ),

  address: z.array(addressSchema).min(1, "Endereço deve ter pelo menos 1 item"),
  startDate: z.date().refine(val => !!val, "Data de início é obrigatória"),
  endDate: z.date().refine(val => !!val, "Data de término é obrigatória"),
  stayDays: z.number().min(1, "Deve ter pelo menos 1 dia de permanência"),
  cnh: z.string()
    .optional()
    .refine(value => !value || isValidCNH(value) , "CNH inválida")
    .refine(v=>v?.trim()=='','campo obrigatória')
    
    ,
  cnhValidity: z.date().optional().refine(val => !val, "Validade da CNH é obrigatória"),
  accessType: z.string().min(1, "Tipo de acesso é obrigatório"),
  accessMode: z.string().min(1, "Modo de acesso é obrigatório"),
  accessProfile: z.string().min(1, "Perfil de acesso é obrigatório"),
  driver: z.boolean().refine(val => val !== undefined, "Informe se é motorista"),
  passenger: z.boolean().refine(val => val !== undefined, "Informe se é passageiro"),
  observation: z.string().optional(),
});

// Tipo só com campos que você quer pegar o erro
export type RegisterVisitorErrors = 
  |"name"
  | "cpf"
  | "phone"
  | "address"
  | "startDate"
  | "endDate"
  | "stayDays"
  | "cnh"
  | "cnhValidity"
  | "accessType"
  | "accessMode"
  | "accessProfile"
  | "driver"
  | "passenger"
  | "observation"

  
   

export const registerVisitorErrors: Record<RegisterVisitorErrors, { error: boolean; message: string }> = {
  name: { error: false, message: "" },
  cpf: { error: false, message: "" },
  phone: { error: false, message: "" },
  address: { error: false, message: "" },
  startDate: { error: false, message: "" },
  endDate: { error: false, message: "" },
  stayDays: { error: false, message: "" },
  cnh: { error: false, message: "" },
  cnhValidity: { error: false, message: "" },
  accessType: { error: false, message: "" },
  accessMode: { error: false, message: "" },
  accessProfile: { error: false, message: "" },
  driver: { error: false, message: "" },
  passenger: { error: false, message: "" },
  observation: { error: false, message: "" },
};

export function getFieldError(register?: RegisterVisitorList) {
  // sempre recomeça com os erros limpos
  const errors: typeof registerVisitorErrors = JSON.parse(JSON.stringify({...registerVisitorErrors}));
  const result = registerSchema.safeParse(register);
  
  
   if (!result.success && result.error) {
    const tree = z.treeifyError(result.error);
   if (tree.properties) {
      for (const [key, value] of Object.entries(tree.properties)) {
        if (key in errors) {
          errors[key as RegisterVisitorErrors].error = true;
          errors[key as RegisterVisitorErrors].message = value.errors[0];

        }
        
      }
    }
  }

  return {
    data:errors,
    success:result.success
}
}
