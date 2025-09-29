package controllers

import (
    "encoding/json"
    "net/http"
)

// Response padrão para o servidor
type Response struct {
    Status  string      `json:"status"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
}

// RootHandler é o handler da rota "/"
func RootHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")

    resp := Response{
        Status:  "success",
        Message: "Servidor Go rodando 🚀",
    }

    // Retorna o JSON
    json.NewEncoder(w).Encode(resp)
}
