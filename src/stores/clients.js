import { defineStore } from 'pinia'
import axios from 'axios'


export const useClientStore = defineStore({
    id: 'client',
    state: () => ({
        client: {
        },
        dataClient: [],
        allClients: [],
    }),
    actions: {
      async getClients() {
        const response = await axios.get('/client', { headers: { 'Content-Type': 'application/json' } });
       //ordenar de forma descendente
        this.allClients = response.data.sort((a, b) => b.id - a.id);
      },
        async addClient(client) {
          const data = {
            "nombre": client.nombre,
            "correoElectronico": client.correoElectronico,
          }
          const response =  await axios.post('/client', JSON.stringify(data), { headers: { 'Content-Type': 'application/json ; charset=utf-8' } });
          this.client = response.data;
          this.dataClient.id = response.data.id;
        },


        async deleteClient(id) {
          console.log(JSON.stringify(id));
          await axios.delete(`client/${id}`);
          this.getClients();
        }

    },

})
