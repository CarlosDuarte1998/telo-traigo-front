import { defineStore } from 'pinia'
import axios from 'axios'

export const useQuotaStore = defineStore({
    id: 'quota',
    state: () => ({
        client: {
        },
    }),
    actions: {
      async getQuota() {
        const response = await axios.get('/quota');
        this.client = response.data;
      },

    },

})
