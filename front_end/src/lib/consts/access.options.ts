import type {  AccessMode, AccessType, Options, ResidentAccess } from "$lib/types/access.types";
import type { Vehicle } from "$lib/types/vehicle.type";


// Opções de modo de acesso
export const optionsAccessMode: AccessMode[] = [
  { id: 1, label: 'Pedestre', value: 'pedestre' },
  { id: 2, label: "Veículo (Condutor)", value: 'veículo' },
  { id: 3, label: 'Bicicleta', value: 'bicicleta' },
  { id: 4, label: 'Bicicleta Elétrica', value: 'bicicleta eletrica' },
  { id: 5, label: 'Veículo Sem Placa', value: 'veiculo sem placa' },
  

];



export const optionsAccessProfile = [
  // Visitantes
  { id: 1, label: 'Visitante', value: 'visitante' },

  // Prestadores de serviço
  { id: 2, label: 'Pedreiro', value: 'pedreiro' },
  { id: 3, label: 'Encanador', value: 'encanador' },
  { id: 4, label: 'Eletricista', value: 'eletricista' },
  { id: 5, label: 'Jardineiro', value: 'jardineiro' },
  { id: 6, label: 'Pintor', value: 'pintor' },
  { id: 7, label: 'Doméstica', value: 'domestica' },
  { id: 8, label: 'Babá', value: 'baba' },
  { id: 9, label: 'Piscineiro', value: 'piscineiro' },
  { id: 10, label: 'Técnico de Internet', value: 'tecnico-internet' },
  { id: 11, label: 'Técnico de Ar Condicionado', value: 'tecnico-ar-condicionado' },
  { id: 12, label: 'Porteiro', value: 'porteiro' },
  { id: 13, label: 'Vigilante', value: 'vigilante' },

  // Entregadores e transporte
  { id: 14, label: 'Entregador de Delivery', value: 'entregador-delivery' },
  { id: 15, label: 'Entregador de Farmácia', value: 'entregador-farmacia' },
  { id: 16, label: 'Entregador de Encomendas', value: 'entregador-encomendas' },
  { id: 17, label: 'Freteiro / Caminhoneiro', value: 'freteiro' },
  { id: 18, label: 'Motorista de Aplicativo', value: 'motorista-aplicativo' },
  { id: 19, label: 'Taxista', value: 'taxista' },

  // Serviços públicos e essenciais
  { id: 20, label: 'Funcionário dos Correios', value: 'correios' },
  { id: 21, label: 'Funcionário da Enel (Energia)', value: 'empresa-energia' },
  { id: 22, label: 'Funcionário da Saneago (Água)', value: 'empresa-agua' },
  { id: 23, label: 'Serviço de Limpa Fossa', value: 'limpa-fossa' },
  { id: 24, label: 'Oficial de Justiça', value: 'oficial-justica' },

  // Forças Policiais (5 principais)
  { id: 25, label: 'Polícia Militar', value: 'policia-militar' },
  { id: 26, label: 'Polícia Civil', value: 'policia-civil' },
  { id: 27, label: 'Polícia Federal', value: 'policia-federal' },
  { id: 28, label: 'Polícia Rodoviária Federal', value: 'policia-rodoviaria-federal' },
  { id: 29, label: 'Polícia Penal', value: 'policia-penal' },

  // Outros
  { id: 30, label: 'Guarda Civil Metropolitana (GCM)', value: 'guarda-civil' },
  { id: 31, label: 'Prestador do Condomínio', value: 'prestador-condominio' },
  { id: 32, label: 'Outro Profissional', value: 'outro' },
  { id: 33, label: 'Serviços gerais', value: 'serviços gerais' },
];



// Opções de tipo de acesso (fixo ou esporádico)
export const optionsAccessType: AccessType[] = [
  { id: 1, label: 'Fixo', value: 'Fixo' },           // moradores, prestadores fixos
  { id: 2, label: 'Esporádico', value: 'Esporádico' }, // visitantes ocasionais
  { id: 3, label: 'Eventual', value: 'Eventual' }, // prestadores por período limitado (obra, serviços)
 
];

 const accessType: Options = 'Esporádico';

// Opções de moradores / endereço
export const optionsResidentAccess: ResidentAccess[] = [
  { id: 1, label: 'João Silva  - Casa 1', casa: '1', accessType },
  { id: 2, label: 'Maria Oliveira - Casa 1', casa: '1', accessType },
  { id: 3, label: 'Carlos Daniel - Casa 1', casa: '1', accessType },
  { id: 4, label: 'Ana Paula - Casa 2', casa: '2', accessType },
  { id: 5, label: 'Pedro Santos - Casa 2', casa: '2', accessType },
  { id: 6, label: 'Lucas Pereira - Casa 2', casa: '2', accessType },
  { id: 7, label: 'Mariana Costa - Casa 3', casa: '3', accessType },
  { id: 8, label: 'Ricardo Almeida - Casa 3', casa: '3', accessType },
  { id: 9, label: 'Fernanda Lima - Casa 3', casa: '3', accessType },
  { id: 10, label: 'Bruno Souza - Casa 4', casa: '4', accessType },
  { id: 11, label: 'Camila Rocha - Casa 4', casa: '4', accessType },
  { id: 12, label: 'Diego Martins - Casa 4', casa: '4', accessType },
];

export const addressExemple = [
  { qd: "01", lt: "01", label: "Carlos Daniel - qd 01 - lt 01", name: "Carlos Daniel" },
  { qd: "01", lt: "02", label: "Ana Paula Ferreira - qd 01 - lt 02", name: "Ana Paula Ferreira" },
  { qd: "01", lt: "03", label: "João Henrique Silva - qd 01 - lt 03", name: "João Henrique Silva" },
  { qd: "01", lt: "04", label: "Maria Eduarda Castro - qd 01 - lt 04", name: "Maria Eduarda Castro" },
  { qd: "01", lt: "05", label: "Felipe Augusto Mendes - qd 01 - lt 05", name: "Felipe Augusto Mendes" },

  { qd: "02", lt: "01", label: "Bruna Carvalho - qd 02 - lt 01", name: "Bruna Carvalho" },
  { qd: "02", lt: "02", label: "Gabriel Souza - qd 02 - lt 02", name: "Gabriel Souza" },
  { qd: "02", lt: "03", label: "Larissa Andrade - qd 02 - lt 03", name: "Larissa Andrade" },
  { qd: "02", lt: "04", label: "Ricardo Moreira - qd 02 - lt 04", name: "Ricardo Moreira" },
  { qd: "02", lt: "05", label: "Fernanda Lopes - qd 02 - lt 05", name: "Fernanda Lopes" },

  { qd: "03", lt: "01", label: "Thiago Martins - qd 03 - lt 01", name: "Thiago Martins" },
  { qd: "03", lt: "02", label: "Patrícia Barbosa - qd 03 - lt 02", name: "Patrícia Barbosa" },
  { qd: "03", lt: "03", label: "Rafael Gonçalves - qd 03 - lt 03", name: "Rafael Gonçalves" },
  { qd: "03", lt: "04", label: "Juliana Figueiredo - qd 03 - lt 04", name: "Juliana Figueiredo" },
  { qd: "03", lt: "05", label: "Eduardo Santana - qd 03 - lt 05", name: "Eduardo Santana" },

  { qd: "04", lt: "01", label: "Marcela Tavares - qd 04 - lt 01", name: "Marcela Tavares" },
  { qd: "04", lt: "02", label: "André Ribeiro - qd 04 - lt 02", name: "André Ribeiro" },
  { qd: "04", lt: "03", label: "Camila Duarte - qd 04 - lt 03", name: "Camila Duarte" },
  { qd: "04", lt: "04", label: "Diego Monteiro - qd 04 - lt 04", name: "Diego Monteiro" },
  { qd: "04", lt: "05", label: "Isabela Rocha - qd 04 - lt 05", name: "Isabela Rocha" },

  { qd: "05", lt: "01", label: "Lucas Fernandes - qd 05 - lt 01", name: "Lucas Fernandes" },
  { qd: "05", lt: "02", label: "Aline Nascimento - qd 05 - lt 02", name: "Aline Nascimento" },
  { qd: "05", lt: "03", label: "Matheus Correia - qd 05 - lt 03", name: "Matheus Correia" },
  { qd: "05", lt: "04", label: "Renata Teixeira - qd 05 - lt 04", name: "Renata Teixeira" },
  { qd: "05", lt: "05", label: "Bruno Almeida - qd 05 - lt 05", name: "Bruno Almeida" },

  { qd: "06", lt: "01", label: "Letícia Moura - qd 06 - lt 01", name: "Letícia Moura" },
  { qd: "06", lt: "02", label: "Paulo César Braga - qd 06 - lt 02", name: "Paulo César Braga" },
  { qd: "06", lt: "03", label: "Vanessa Meireles - qd 06 - lt 03", name: "Vanessa Meireles" },
  { qd: "06", lt: "04", label: "Jorge Matos - qd 06 - lt 04", name: "Jorge Matos" },
  { qd: "06", lt: "05", label: "Mariana Guedes - qd 06 - lt 05", name: "Mariana Guedes" },

  { qd: "07", lt: "01", label: "Renato Vasconcelos - qd 07 - lt 01", name: "Renato Vasconcelos" },
  { qd: "07", lt: "02", label: "Natália Pires - qd 07 - lt 02", name: "Natália Pires" },
  { qd: "07", lt: "03", label: "Alexandre Campos - qd 07 - lt 03", name: "Alexandre Campos" },
  { qd: "07", lt: "04", label: "Beatriz Antunes - qd 07 - lt 04", name: "Beatriz Antunes" },
  { qd: "07", lt: "05", label: "Cláudio Aragão - qd 07 - lt 05", name: "Cláudio Aragão" },

  { qd: "08", lt: "01", label: "Helena Mourão - qd 08 - lt 01", name: "Helena Mourão" },
  { qd: "08", lt: "02", label: "Fábio Cardoso - qd 08 - lt 02", name: "Fábio Cardoso" },
  { qd: "08", lt: "03", label: "Giovana Ribeiro - qd 08 - lt 03", name: "Giovana Ribeiro" },
  { qd: "08", lt: "04", label: "Marcelo Batista - qd 08 - lt 04", name: "Marcelo Batista" },
  { qd: "08", lt: "05", label: "Sabrina Costa - qd 08 - lt 05", name: "Sabrina Costa" },

  { qd: "09", lt: "01", label: "Henrique Dias - qd 09 - lt 01", name: "Henrique Dias" },
  { qd: "09", lt: "02", label: "Carolina Assis - qd 09 - lt 02", name: "Carolina Assis" },
  { qd: "09", lt: "03", label: "Victor Rezende - qd 09 - lt 03", name: "Victor Rezende" },
  { qd: "09", lt: "04", label: "Tatiane Borges - qd 09 - lt 04", name: "Tatiane Borges" },
  { qd: "09", lt: "05", label: "Rodrigo Peixoto - qd 09 - lt 05", name: "Rodrigo Peixoto" },

  { qd: "10", lt: "01", label: "Elisa Martins - qd 10 - lt 01", name: "Elisa Martins" },
  { qd: "10", lt: "02", label: "Gustavo Aguiar - qd 10 - lt 02", name: "Gustavo Aguiar" },
  { qd: "10", lt: "03", label: "Priscila Freitas - qd 10 - lt 03", name: "Priscila Freitas" },
  { qd: "10", lt: "04", label: "Samuel Porto - qd 10 - lt 04", name: "Samuel Porto" },
  { qd: "10", lt: "05", label: "Daniela Cunha - qd 10 - lt 05", name: "Daniela Cunha" }
];





 export type RegisterVisitorList ={
  idRegister: string;
    name: string;
    cpf: string;
    address: ResidentAccess[] 
    phone: undefined|string
    startDate: Date;
    endDate: Date;
    stayDays: number;
    cnhValidity:undefined|Date
    cnh:string|undefined
    accessMode: string;
    accessProfile: string;
    driver: boolean;
    passenger: boolean;
    observation:string|undefined
 }

export const initRegisterVisitorList:RegisterVisitorList = {
  idRegister:'',
  name: '',
  cpf: '',
  address:[],
  phone:undefined,
  startDate:new Date(),
  endDate:new Date(),
  stayDays:1,
  cnh:undefined,
  cnhValidity:undefined,
  accessMode:'pedestre',
  accessProfile: '',
  driver:false,
  passenger:false,
  observation:undefined
};

 


export type GeralRegister ={
  person:RegisterVisitorList[],
  vehicle?:Vehicle
}


  
