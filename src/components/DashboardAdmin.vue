<script setup>
import { useClientStore } from '@/stores/clients';
import { useQuotaStore } from '@/stores/quota';
import { useProductsStore } from '@/stores/products';
import { useSectionActiveStore } from '@/stores/sectionActive';
import { onMounted } from 'vue';
import FormAddProduct from './FormAddProduct.vue';
import  Swal from "sweetalert2";

const clientStore = useClientStore();
const quotationStore = useQuotaStore();
const productStore = useProductsStore();
const sectionActiveStore = useSectionActiveStore();



onMounted(async () => {
  sectionActiveStore.activeSection = 'cotizaciones';
  await quotationStore.getQuota();
  await clientStore.getClients();
  await productStore.getProducts();
});

const deleteProduct = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
  });

  if (result.isConfirmed) {
    await productStore.deleteProduct(id);
    Swal.fire(
      '¡Eliminado!',
      'El producto ha sido eliminado.',
      'success'
    )
  }
};

const deleteClient = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
  });

  if (result.isConfirmed) {
    await clientStore.deleteClient(id);
    Swal.fire(
      '¡Eliminado!',
      'El cliente ha sido eliminado.',
      'success'
    )
  }
};

const deleteQuota = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: "¡No podrás revertir esto!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminarlo!'
  });

  if (result.isConfirmed) {
    await quotationStore.deleteQuota(id);
    Swal.fire(
      '¡Eliminado!',
      'La cotización ha sido eliminada.',
      'success'
    )
  }
};

</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center h-screen"
      v-if="sectionActiveStore.activeSection == 'dashboard'">
      <h1 class="text-3xl font-bold">Dashboard Admin</h1>
      <p class="text-gray-500">Bienvenido al panel de administración</p>
    </div>
    <div class="p-4" v-if="sectionActiveStore.activeSection == 'cotizaciones'">
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
                  {{ item.id }}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {{ item.clientModel.nombre }}
                </th>
                <td class="px-6 py-4">
                  {{ item.clientModel.correoElectronico }}
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
                  <span class="flex gap-2"><svg @click="deleteQuota(item,id)" class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path
                        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>

                    <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                    </svg>

                  </span>
                </td>
              </tr>
            </template>



          </tbody>
        </table>
      </div>

    </div>

    <div class="p-4" v-if="sectionActiveStore.activeSection == 'clientes'">
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
                  <span class="flex gap-2"><svg @click="deleteClient(item.id)" class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path
                        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>

                    <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                    </svg>

                  </span>
                </td>
              </tr>
            </template>



          </tbody>
        </table>
      </div>

    </div>

    <div class="p-4" v-if="sectionActiveStore.activeSection == 'productos'">
      <h1 class="text-3xl font-bold">Productos</h1>
      <p class="text-gray-500">Listado de productos</p>

      <div class="flex justify-start" v-if="productStore.showButtonAdd == false">
        <button @click="productStore.showButtonAdd = true"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Agregar producto</button>
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
                  {{ item.id }}
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {{ item.nombre }}
                </th>
                <td class="px-6 py-4">
                  {{ item.porcentajeFlete * 100 }}%
                </td>
                <td class="px-6 py-4">
                  {{ item.porcentajeGastosImportacion * 100 }}%
                </td>
                <td class="px-6 py-4">
                  {{ item.porcentajeSeguro * 100 }}%
                </td>
                <td class="px-6 py-4">
                  {{ item.porcentajeImpuestos * 100 }}%
                </td>
                <td class="px-6 py-4">
                  <span class="flex gap-2"><svg @click="deleteProduct(item.id)" class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                      <path
                        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                    </svg>

                    <svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path
                        d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                    </svg>

                  </span>
                </td>
              </tr>
            </template>



          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>
