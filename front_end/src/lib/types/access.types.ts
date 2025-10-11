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
    | null
};


export type AccessType = AccessOptionBase & {
  value: 'fixo' | 'esporádico'| 'temporario'
};

export type AccessProfile = AccessOptionBase & {
  value:
    | 'visitante'
    | 'servicos-gerais'
    | 'servico(limpa-fossa)'  
    | 'servico publico(seguranca)'      // polícia ou vigilância pública
    | 'servico publico(energia)'        // empresas de energia
    | 'servico publico(agua)'           // empresas de água
    | 'servico publico(justica)'        // oficial da justiça
    | 'servico publico(correios)'
    | 'prestador(obra)'
    | 'prestador(domestica)'
    | 'prestador(baba)'
    | 'prestador(condominio)'
    | 'prestador(portaria)'
    | 'prestador(seguranca)'
    | 'prestador(taxi)'
    | 'prestador(aplicativo de corrida)' // Uber, 99, etc.
    | 'entregador(delivery)'
    | 'entregador(farmacia)'
    | 'entregador(encomendas)'
    | 'entregador(frete)'                // entrega de móveis/sofás
    | 'entregador(obras)'
    
};


export type ResidentAccess = AccessOptionBase & {
  casa: string | null
};

