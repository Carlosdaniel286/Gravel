package routes

import (
	"back_end/controllers"
	"log"
	"net/http"
)

func loggingMiddleware(next http.HandlerFunc) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        log.Printf("%s %s\n", r.Method, r.URL.Path)
        next(w, r)
    }
}

// SetupRoutes associa todas as rotas aos handlers
func SetupRoutes() {
    http.HandleFunc("/", loggingMiddleware(controllers.RootHandler))
    http.HandleFunc("/registers", loggingMiddleware(controllers.CreateVisitor))
    //http.HandleFunc("/visitors", controllers.ListVisitors) // se quiser listar
}
