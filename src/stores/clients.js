import { defineStore } from 'pinia'
import axios from 'axios'

export const useClientStore = defineStore({
    id: 'client',
    state: () => ({
        client: {
        },
        dataClient: [],
    }),
    actions: {
        async addClient(client) {
          const data = {
            "nombre": client.nombre,
            "correoElectronico": client.correoElectronico,
          }
          const response =  await axios.post('/client', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
          this.client = response.data;
        },
        
    },

})