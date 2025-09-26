import type { AccessFormValues, AccessMode, AccessProfile, AccessType, ResidentAccess } from "$lib/types/access.types";


// Opções de modo de acesso
export const optionsAccessMode: AccessMode[] = [
  { id: 1, label: 'Pedestre', value: 'pedestre' },
  { id: 2, label: 'Veículo', value: 'veiculo' },
  { id: 3, label: 'Passageiro', value: 'passageiro' },
  { id: 4, label: 'Bicicleta', value: 'bicicleta' },
];

// Opções de perfil de acesso
export const optionsAccessProfile: AccessProfile[] = [
  { id: 1, label: 'Visitante', value: 'visitante' },
  { id: 2, label: 'Prestador', value: 'prestador' },
  { id: 3, label: 'Entregador', value: 'entregador' },
];

// Opções de tipo de acesso (fixo ou esporádico)
export const optionsAccessType: AccessType[] = [
  { id: 1, label: 'Fixo', value: 'fixo' },
  { id: 2, label: 'Esporádico', value: 'esporádico' },
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

// Valor inicial do formulário
export const initAccessForm: AccessFormValues = {
  name: '',
  cpf: '',
  accessType: null,
  accessMode: null,
  accessProfile: null,
};
