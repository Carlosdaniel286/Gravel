import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
//import dns from 'node:dns';

//dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [
    sveltekit(),
    tailwindcss(),
    enhancedImages()
  ],

  server: {
   port: 3000,
   host:true,
  },
  preview:{
    port:4000
  }
  
});
