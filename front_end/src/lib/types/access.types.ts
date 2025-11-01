import type { Vehicle } from "./vehicle.type";

export type AccessOptionBase = { 
  id: number; 
  label: string; 
  
};

export type AccessMode = AccessOptionBase & {
  
  value: 
    | 'pedestre'
    | 'veículo'
    | 'bicicleta'
    | 'bicicleta eletrica' // bicicleta elétrica, sem placa
    | 'veiculo sem placa'
    | 'passageiro'
    | null
};


export type AccessType = AccessOptionBase & {
  value: 'Fixo' | 'Esporádico'| 'Eventual'
};

 type AccessProfile = AccessOptionBase & {
  value:
    // Visitantes
    | 'visitante'

    // Prestadores de serviço
    | 'pedreiro'
    | 'encanador'
    | 'eletricista'
    | 'jardineiro'
    | 'pintor'
    | 'domestica'
    | 'baba'
    | 'piscineiro'
    | 'tecnico-internet'
    | 'tecnico-ar-condicionado'
    | 'porteiro'
    | 'vigilante'

    // Entregadores e transporte
    | 'entregador-delivery'
    | 'entregador-farmacia'
    | 'entregador-encomendas'
    | 'freteiro'
    | 'motorista-aplicativo'
    | 'taxista'

    // Serviços públicos e essenciais
    | 'correios'
    | 'empresa-energia'
    | 'empresa-agua'
    | 'limpa-fossa'
    | 'oficial-justica'

    // Forças Policiais
    | 'policia-militar'
    | 'policia-civil'
    | 'policia-federal'
    | 'policia-rodoviaria-federal'
    | 'policia-penal'
    | 'guarda-civil'

    // Outros
    | 'prestador-condominio'
    | 'outro'
    | 'serviços gerais'
};


export type Options = "Esporádico" | "Fixo" | "Eventual" | null;
export type ResidentAccess = AccessOptionBase & {
  casa: string | null
  accessType:Options
};

