export type AccessOptionBase = { 
  id: number; 
  label: string; 
};

export type AccessMode = AccessOptionBase & {
  value: 'pedestre' | 'veiculo' | 'passageiro' | 'bicicleta';
};

export type AccessType = AccessOptionBase & {
  value: 'fixo' | 'esporádico';
};

export type AccessProfile = AccessOptionBase & {
  value: 'visitante' | 'prestador' | 'entregador';
};

export type ResidentAccess = AccessOptionBase & {
  casa: string | null;
};

export type AccessFormValues = {
  name: string;
  cpf: string;
  accessType: AccessType | null;
  accessMode: AccessMode | null;
  accessProfile: AccessProfile | null;
};
