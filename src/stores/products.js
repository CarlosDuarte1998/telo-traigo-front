import { defineStore } from 'pinia'
import axios from 'axios'


export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        typeProducts: [],
        percentTotal: 0,
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
        showProduct(id) {
          let product = this.typeProducts.find(product => product.id === id);
          this.percentTotal = product.porcentajeFlete+product.porcentajeGastosImportacion+product.porcentajeSeguro+product.porcentajeImpuestos;
          return product;
        }
    },

})
