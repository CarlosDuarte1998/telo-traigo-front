import { defineStore } from 'pinia'
import axios from 'axios'


export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        typeProducts: [],
    }),
    actions: {
        async getProducts() {
            const response = await axios.get('/product');
            this.typeProducts = response.data;
        },
        async addProduct(product) {
            await axios.post('/product', product);
            this.getProducts();
        },
    },

})
