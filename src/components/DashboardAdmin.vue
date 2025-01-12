<script setup>
import { useClientStore } from '@/stores/clients';
import { useQuotaStore } from '@/stores/quota';
import { useProductsStore } from '@/stores/products';
import { useSectionActiveStore } from '@/stores/sectionActive';
import { onMounted } from 'vue';
import FormAddProduct from './FormAddProduct.vue';

const clientStore = useClientStore();
const quotationStore = useQuotaStore();
const productStore = useProductsStore();
const sectionActiveStore = useSectionActiveStore();
let showAddProduct = false;




onMounted( async () => {
    sectionActiveStore.activeSection = 'cotizaciones';
    await quotationStore.getQuota();
    await clientStore.getClients();
    await productStore.getProducts();
});
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center h-screen" v-if="sectionActiveStore.activeSection =='dashboard'">
      <h1 class="text-3xl font-bold">Dashboard Admin</h1>
      <p class="text-gray-500">Bienvenido al panel de administración</p>
    </div>
    <div class="p-4" v-if="sectionActiveStore.activeSection =='cotizaciones'">
      <h1 class="text-3xl font-bold">Cotizaciones</h1>
      <p class="text-gray-500">Listado de cotizaciones</p>



<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                    id
                </th>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Correo Electrónico
                </th>
                <th scope="col" class="px-6 py-3">
                    Tipo de producto
                </th>
                <th scope="col" class="px-6 py-3">
                    Peso del producto
                </th>
                <th scope="col" class="px-6 py-3">
                    Costo del producto
                </th>
                <th scope="col" class="px-6 py-3">
                    Flete
                </th>
                <th scope="col" class="px-6 py-3">
                    Gasto de importación
                </th>
                <th scope="col" class="px-6 py-3">
                    Seguro
                </th>
                <th scope="col" class="px-6 py-3">
                    Impuestos
                </th>
                <th scope="col" class="px-6 py-3">
                  Costo total importación
                </th>
                <th scope="col" class="px-6 py-3">
                  Costo producto + importación
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            <template v-for="(item, index) in quotationStore.allQuota" :key="index">
                <tr class="odd:bg-white  even:bg-gray-50  border-b ">
                  <td class="px-6 py-4">
                        {{ item.id  }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ item.clientModel.nombre }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.clientModel.correoElectronico  }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.tipoProducto.nombre }}
                    </td>
                    <td class="px-6 py-4">
                        {{ item.peso }} libras
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.costoProducto }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.flete }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.gastosImportacion }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.seguro }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.impuestos }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.costoTotalImportacion }}
                    </td>
                    <td class="px-6 py-4">
                        ${{ item.costoProductoMasImportacion }}
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </template>



        </tbody>
    </table>
</div>

    </div>

    <div class="p-4" v-if="sectionActiveStore.activeSection =='clientes'">
      <h1 class="text-3xl font-bold">Clientes</h1>
      <p class="text-gray-500">Listado de clientes</p>



<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-16">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                    id
                </th>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Correo Electrónico
                </th>

                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            <template v-for="(item, index) in clientStore.allClients" :key="index">
                <tr class="odd:bg-white  even:bg-gray-50  border-b ">
                  <td class="px-6 py-4">
                        {{ item.id }}
                    </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ item.nombre }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.correoElectronico }}
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </template>



        </tbody>
    </table>
</div>

    </div>

    <div class="p-4" v-if="sectionActiveStore.activeSection =='productos'">
      <h1 class="text-3xl font-bold">Productos</h1>
      <p class="text-gray-500">Listado de productos</p>

      <div class="flex justify-start" v-if="productStore.showButtonAdd==false">
        <button @click="productStore.showButtonAdd=true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Agregar producto</button>
      </div>

      <div class="mt-5 max-w-lg" v-if="productStore.showButtonAdd">
        <FormAddProduct />
      </div>




<div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" class="px-6 py-3">
                    id
                </th>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                  Flete
                </th>
                <th scope="col" class="px-6 py-3">
                  Gastos de importación
                </th>
                <th scope="col" class="px-6 py-3">
                  Seguro
                </th>
                <th scope="col" class="px-6 py-3">
                  Impuestos
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>

            <template v-for="(item, index) in productStore.allProducts" :key="index">

                <tr class="odd:bg-white  even:bg-gray-50  border-b ">
                  <td class="px-6 py-4">
                        {{ item.id  }}
                  </td>
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {{ item.nombre }}
                    </th>
                    <td class="px-6 py-4">
                        {{ item.porcentajeFlete*100 }}%
                    </td>
                    <td class="px-6 py-4">
                        {{ item.porcentajeGastosImportacion*100 }}%
                    </td>
                    <td class="px-6 py-4">
                        {{ item.porcentajeSeguro*100 }}%
                    </td>
                    <td class="px-6 py-4">
                        {{ item.porcentajeImpuestos*100 }}%
                    </td>
                    <td class="px-6 py-4">
                        <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>
            </template>



        </tbody>
    </table>
</div>

    </div>
  </div>
</template>
