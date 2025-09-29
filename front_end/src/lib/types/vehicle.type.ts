export type BaseEntity = {
   name: string;
};

// Marca de carro ou moto
export type Brand = BaseEntity;

// Modelo de carro (associando à marca)
export type CarModel = BaseEntity & {
  brand: string; // poderia ser Brand se quiser referenciar objeto completo
};

// Modelo de moto
export type MotorcycleModel = BaseEntity;

// Tipo de veículo
export type VehicleType = BaseEntity;

// Cor de veículo
export type VehicleColor = BaseEntity;


export type vehicle = {
    plate: string;
    color?: VehicleColor
    brand?: Brand
    model?: CarModel
    vehicleType:VehicleType
    cnh?: string;
    cnhValidity?: Date;
};
