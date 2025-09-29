<script>
  import Login from '$lib/assets/login.png';
  
</script>
 
<div
  class="w-screen h-screen bg-cover bg-center"
  style="background-image: url({Login})"
>
  <!-- Overlay escuro com blur -->
  <div class="w-screen h-screen bg-white backdrop-blur-[3px] sm:bg-black/40 flex items-center justify-center">
    
    <!-- Card centralizado -->
    <main class="bg-white rounded-md w-full max-w-[400px] p-6 sm:h-auto sm:shadow-lg">
      
      <!-- Cabeçalho do formulário -->
      <header class="mb-6">
        <h1 class="text-3xl font-semibold text-center capitalize">Login</h1>
      </header>
      
      <!-- Formulário -->
      <form class="flex flex-col gap-24 sm:gap-6" action="">
        
        <!-- Inputs -->
        <div class="flex flex-col gap-16 sm:gap-5">
          <input
            class="input h-[58px] "
            type="text"
            placeholder="Digite nome completo"
            required
          />
          <input
            class="input h-[58px] "
            type="password"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <!-- Botão -->
        <button
          type="submit"
          class="button"
         >
          Entrar
        </button>

      </form>
    </main>
  </div>
</div>
