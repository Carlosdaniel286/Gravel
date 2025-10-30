import type {  AccessMode, AccessProfile, AccessType, Options, ResidentAccess } from "$lib/types/access.types";
import type { Vehicle } from "$lib/types/vehicle.type";


// Opções de modo de acesso
export const optionsAccessMode: AccessMode[] = [
  { id: 1, label: 'Pedestre', value: 'pedestre' },
  { id: 2, label: "Veículo (Condutor)", value: 'veículo' },
  { id: 3, label: 'Bicicleta', value: 'bicicleta' },
  { id: 4, label: 'Bicicleta Elétrica', value: 'bicicleta eletrica' },
  { id: 5, label: 'Veículo Sem Placa', value: 'veiculo sem placa' },
  

];



export const optionsAccessProfile: AccessProfile[] = [
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
    observation?: string;
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


  
