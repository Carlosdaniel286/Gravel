package controllers

import (
	"encoding/json"
	"net/http"
    "io" // Import necessário para fechar o corpo da requisição de forma limpa
    "back_end/models"
)



// CreatVisitor é o handler para a criação de um novo visitante via POST
func CreateVisitor(w http.ResponseWriter, req *http.Request) {
       // É crucial fechar o corpo da requisição, e 'defer' garante que isso aconteça
    // mesmo que haja um erro durante a decodificação.
    defer req.Body.Close()
    // 1. Decodificar o JSON do corpo da requisição
	var newVisitor models.Register
    
    // Configura o decodificador e tenta decodificar o corpo da requisição
	err := json.NewDecoder(req.Body).Decode(&newVisitor)
    
 

    // 2. Tratar erros de decodificação
	if err != nil {
        // Verifica se o erro é io.EOF, que geralmente indica corpo vazio
        if err == io.EOF {
            http.Error(w, "O corpo da requisição não pode estar vazio.", http.StatusBadRequest)
            return
        }
        // Para outros erros de JSON (ex: malformado)
		http.Error(w, "Erro ao decodificar JSON: " + err.Error(), http.StatusBadRequest)
		return
	}

    // 3. Adicionar o novo visitante à lista (o seu "Model" simples)
	

    // 4. Configurar e enviar a resposta
	w.Header().Set("Content-Type", "application/json")
    
    // Para criação de recursos, o status ideal é 201 Created
	w.WriteHeader(http.StatusCreated) 

    // O padrão é retornar o objeto recém-criado, não a lista inteira.
    // Retornar a lista inteira pode ser ineficiente.
	json.NewEncoder(w).Encode(newVisitor)
}