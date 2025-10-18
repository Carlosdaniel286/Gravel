import { redirect, type ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies }) => {
  const loggedIn = cookies.get('user_session');

  if (!loggedIn) {
   // throw redirect(303, '/virtual/painel');
  }

  // Se o usuário estiver logado, retorne um objeto de dados (mesmo que vazio).
  // A tipagem de `ServerLoad` exige que um valor seja retornado.
  return {}; 
};