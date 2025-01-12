import { defineStore } from 'pinia'
import axios from 'axios'

export const useQuotaStore = defineStore({
    id: 'quota',
    state: () => ({
        dataQuota: {
        },
    }),
    actions: {
      async getQuota() {
        const response = await axios.get('/quota', { headers: { 'Content-Type': 'application/json' } });
        this.client = response.data;
      },

      async addQuota(quota) {
        const response =  await axios.post('/quota', JSON.stringify(quota), { headers: { 'Content-Type': 'application/json' } });
        this.showQuota(response.data.id);
      },

      async showQuota(id) {
        const response = await axios.get(`/quota/${id}`, { headers: { 'Content-Type': 'application/json' } });
        this.dataQuota = response.data;
      },

    },

})
