package models

import "time"

// AccessInfo agrupa todos os dados relacionados ao acesso
type AccessInfo struct {
	AccessType    string `json:"accessType"`    // visitor, contractor, resident, etc.
	AccessMode    string `json:"accessMode"`    // manual, digital, biometric, etc.
	AccessProfile string `json:"accessProfile"` // perfil de acesso (e.g., diário, permanente)
	StartDate     time.Time `json:"startDate"`
	EndDate       time.Time `json:"endDate"`
	StayDays      int    `json:"stayDays"`
}

// VehicleInfo agrupa todos os dados relacionados ao veículo e motorista
type VehicleInfo struct {
	Plate         string    `json:"plate,omitempty"`
	Color         string    `json:"color,omitempty"`
	Brand         string    `json:"brand,omitempty"`
	Model         string    `json:"model,omitempty"`
	VehicleType   string    `json:"vehicleType,omitempty"` // Carro, moto, etc.
	CNH           string    `json:"cnh,omitempty"`         // CNH do motorista
	CNHValidity   time.Time `json:"cnhValidity,omitempty"`
}

// Register representa um registro de entrada de pessoa no condomínio
type Register struct {
    // Identificação Pessoal
    Name        string `json:"name"`
    Cpf         string `json:"cpf"`
    Address     string `json:"address"`
    Phone       string `json:"phone,omitempty"`
    Observation string `json:"observation,omitempty"`

    // Acesso e veículo
    Access  AccessInfo   `json:"access"`
    Vehicle *VehicleInfo `json:"vehicle,omitempty"`

    // Auditoria
    CreatedAt time.Time `json:"createdAt"`
    UpdatedAt time.Time `json:"updatedAt"`
    CreatedBy string    `json:"createdBy,omitempty"`
}
