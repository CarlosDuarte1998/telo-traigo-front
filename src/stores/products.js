import { defineStore } from 'pinia'
import axios from 'axios'


export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        typeProducts: [],
        percentTotal: 0,
        allProducts: [],
        showButtonAdd: false,
    }),
    actions: {
        async getProducts() {
            const response = await axios.get('/product');
            this.typeProducts = response.data;
            //ordenar de DESCENDENTE
            this.allProducts = response.data.sort((a, b) => b.id - a.id);
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
