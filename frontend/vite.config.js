import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {port : 5173}
})


// 'port 5173 config here' enables the main frontend to run on the same port 5173 
