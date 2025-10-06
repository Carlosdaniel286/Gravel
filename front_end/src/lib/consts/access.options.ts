import type {  AccessMode, AccessProfile, AccessType, ResidentAccess } from "$lib/types/access.types";
import type { Vehicle } from "$lib/types/vehicle.type";


// Opções de modo de acesso
export const optionsAccessMode: AccessMode[] = [
  { id: 1, label: 'Pedestre', value: 'pedestre' },
  { id: 2, label: "Veículo (Condutor)", value: 'veículo' },
  { id: 3, label: 'Passageiro (Veículo)', value: 'passageiro' },
  { id: 4, label: 'Bicicleta', value: 'bicicleta' },
  { id: 5, label: 'Bicicleta Elétrica', value: 'bicicleta eletrica' },
  { id: 6, label: 'Veículo Sem Placa', value: 'veiculo sem placa' },
];

// Opções de perfil de acesso
export const optionsAccessProfile: AccessProfile[] = [
  { id: 1, label: 'Visitante', value: 'visitante' },
  { id: 2, label: 'Serviços Gerais', value: 'servicos-gerais' },
  { id: 3, label: 'Serviço Limpa Fossa', value: 'servico(limpa-fossa)' },
  { id: 4, label: 'Segurança Pública', value: 'servico publico(seguranca)' },
  { id: 5, label: 'Empresa de Energia', value: 'servico publico(energia)' },
  { id: 6, label: 'Empresa de Água', value: 'servico publico(agua)' },
  { id: 7, label: 'Oficial da Justiça', value: 'servico publico(justica)' },
  { id: 8, label: 'Correios', value: 'servico publico(correios)' },
  { id: 9, label: 'Prestador de Obra', value: 'prestador(obra)' },
  { id: 10, label: 'Prestador Doméstico', value: 'prestador(domestica)' },
  { id: 11, label: 'Babá', value: 'prestador(baba)' },
  { id: 12, label: 'Prestador do Condomínio', value: 'prestador(condominio)' },
  { id: 13, label: 'Portaria', value: 'prestador(portaria)' },
  { id: 14, label: 'Segurança Privada', value: 'prestador(seguranca)' },
  { id: 15, label: 'Taxi', value: 'prestador(taxi)' },
  { id: 16, label: 'Aplicativo de Corrida', value: 'prestador(aplicativo de corrida)' },
  { id: 17, label: 'Delivery', value: 'entregador(delivery)' },
  { id: 18, label: 'Farmácia', value: 'entregador(farmacia)' },
  { id: 19, label: 'Encomendas', value: 'entregador(encomendas)' },
  { id: 20, label: 'Frete (móveis/sofás)', value: 'entregador(frete)' },
  { id: 21, label: 'Obras', value: 'entregador(obras)' },
];


// Opções de tipo de acesso (fixo ou esporádico)
export const optionsAccessType: AccessType[] = [
  { id: 1, label: 'Fixo', value: 'fixo' },           // moradores, prestadores fixos
  { id: 2, label: 'Esporádico', value: 'esporádico' }, // visitantes ocasionais
  { id: 3, label: 'Temporário', value: 'temporario' }, // prestadores por período limitado (obra, serviços)
 
];


// Opções de moradores / endereço
export const optionsResidentAccess: ResidentAccess[] = [
  { id: 1, label: 'João Silva  - Casa 1', casa: '1' },
  { id: 2, label: 'Maria Oliveira - Casa 1', casa: '1' },
  { id: 3, label: 'Carlos Daniel - Casa 1', casa: '1' },
  { id: 4, label: 'Ana Paula - Casa 2', casa: '2' },
  { id: 5, label: 'Pedro Santos - Casa 2', casa: '2' },
  { id: 6, label: 'Lucas Pereira - Casa 2', casa: '2' },
  { id: 7, label: 'Mariana Costa - Casa 3', casa: '3' },
  { id: 8, label: 'Ricardo Almeida - Casa 3', casa: '3' },
  { id: 9, label: 'Fernanda Lima - Casa 3', casa: '3' },
  { id: 10, label: 'Bruno Souza - Casa 4', casa: '4' },
  { id: 11, label: 'Camila Rocha - Casa 4', casa: '4' },
  { id: 12, label: 'Diego Martins - Casa 4', casa: '4' },
];




 export type RegisterVisitorList ={
  idRegister: string;
    name: string;
    cpf: string;
    address: string;
    phone: undefined|string
    startDate: Date;
    endDate: Date;
    stayDays: number;
    cnhValidity:undefined|Date
    cnh?:string
    accessType: string;
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
  address:'',
  phone:undefined,
  startDate:new Date(),
  endDate:new Date(),
  stayDays:1,
  cnh:undefined,
  cnhValidity:undefined,
  accessType: '',
  accessMode: '',
  accessProfile: '',
  driver:false,
  passenger:false,
  observation:undefined
};

export const initRegisterVehicle:Vehicle ={
  idVehicle:'',
  plate:'',
  color:'',
  vehicleType:'',
  model:'',
  brands:'',
}


export type GeralRegister ={
  person:RegisterVisitorList[],
  vehicle?:Vehicle
}


  
