<script setup>
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';
import { onMounted } from 'vue';
import router from '@/router';
import { useProductsStore } from '@/stores/products';

const productStore = useProductsStore();

configure({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
});

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    nameProduct: yup.string().required('Nombre del producto es requerido'),
    porceFlete: yup.number().required('Porcentaje de flete es requerido'),
    porceGastos: yup.number().required('Porcentaje de gastos de importación es requerido'),
    porceImport: yup.number().required('Gastos de Import es requerido'),
    porceSeguro: yup.number().required('Seguro es requerido'),
  }),
});

const [nameProduct, nameProduct_nameMeta] = defineField('nameProduct');
const [porceFlete, porceFleteMeta] = defineField('porceFlete');
const [porceGastos, porceGastosMeta] = defineField('porceGastos');
const [porceSeguro, porceSeguroMeta] = defineField('porceSeguro');
const [porceImport, porceImportMeta] = defineField('porceImport');






const onSubmit = handleSubmit(
  async () => {
    await productStore.addProduct({
      nombre: nameProduct.value,
      porcentajeFlete: parseFloat(porceFlete.value)/100,
      porcentajeGastosImportacion: parseFloat(porceGastos.value)/100,
      porcentajeSeguro: parseFloat(porceSeguro.value)/100,
      porcentajeImpuestos: parseFloat(porceImport.value)/100,
    });

  });



</script>

<template>
  <div>
    <form>

        <div class="mb-6">
          <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Nombre del producto</label>
            <input type="text" id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="Computadoras" v-model="nameProduct" v-bind="nameProduct_nameMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm">{{ errors.nameProduct }}</p>
            </span>
          </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 ">Porcentaje de flete</label>
            <input type="number" id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="0%" required v-model="porceFlete" v-bind="porceFleteMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm ">{{ errors.porceFlete }}</p>
            </span>
          </div>
          <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">
              Gastos de importación
            </label>
            <input type="number" id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0%" v-model="porceGastos" v-bind="porceGastosMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm">{{ errors.porceGastos }}</p>
            </span>
          </div>
          <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">
              Seguro
            </label>
            <input type="number" id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0%" v-model="porceSeguro" v-bind="porceSeguroMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm">{{ errors.porceSeguro }}</p>
            </span>
          </div>
          <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">
              Impuestos
            </label>
            <input type="number" id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="0%" v-model="porceImport" v-bind="porceImportMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm">{{ errors.porceImport }}</p>
            </span>
          </div>
        </div>
        <div class="flex gap-3"><button type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
          @click.prevent="onSubmit">Guardar datos</button>
          <button type="submit"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center   "
          @click.prevent="productStore.showButtonAdd=false">Cerrar</button></div>
      </form>
  </div>
</template>

<style scoped>

</style>
