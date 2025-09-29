package main

import (
    "log"
    "net/http"
    "back_end/routes"
    
)

func main() {
    routes.SetupRoutes()
    port := ":8080"
    log.Printf("🌐 Servidor rodando na porta %s\n", port)

    if err := http.ListenAndServe(port, nil); err != nil {
        log.Fatalf("❌ Erro ao iniciar o servidor: %v", err)
    }
}
