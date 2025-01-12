import { defineStore } from 'pinia'
import axios from 'axios'

export const useQuotaStore = defineStore({
    id: 'quota',
    state: () => ({
        dataQuota: {
        },
        allQuota: [],
    }),
    actions: {
      async getQuota() {
        const response = await axios.get('/quota', { headers: { 'Content-Type': 'application/json' } });
       //Ordenar de forma descendente
        this.allQuota = response.data.sort((a, b) => b.id - a.id);
      },

      async addQuota(quota) {
        const response =  await axios.post('/quota', JSON.stringify(quota), { headers: { 'Content-Type': 'application/json' } });
        this.showQuota(response.data.id);
        this.getQuota();
      },

      async showQuota(id) {
        const response = await axios.get(`/quota/${id}`, { headers: { 'Content-Type': 'application/json' } });
        this.dataQuota = response.data;
      },

     async deleteQuota(id) {
        await axios.delete(`/quota/${id}`);
        this.getQuota();
      }

    },

})
