<script setup>
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';

import { useProductsStore } from '@/stores/products';
import { useClientStore } from '@/stores/clients';
import { useQuotaStore } from '@/stores/quota';
import { onMounted } from 'vue';
import router from '@/router';


const productsStore = useProductsStore();
const clientStore = useClientStore();
const quotaStore = useQuotaStore();

const { errors, defineField, handleSubmit } = useForm({
  validationSchema: yup.object({
    first_name: yup.string().required('Nombre es requerido'),
    last_name: yup.string().required('Apellido es requerido'),
    typeProduct: yup.string().required('Tipo de producto es requerido'),
    priceStore: yup.number().required('Precio es requerido'),
    weight: yup.number().required('Peso del producto es requerido'),
    email: yup.string().email('Ingrese una dirección valida').required('El correo es requerido'),
  }),
});

configure({
  validateOnChange: true,
  validateOnBlur: true,
  validateOnInput: true,
  validateOnModelUpdate: false,
});

const [first_name, first_nameMeta] = defineField('first_name');
const [last_name, last_nameMeta] = defineField('last_name');
const [typeProduct, typeProductMeta] = defineField('typeProduct');
const [priceStore, priceStoreMeta] = defineField('priceStore');
const [weight, weightMeta] = defineField('weight');
let [email, emailMeta] = defineField('email');

typeProduct.value = '';

const onSubmit = handleSubmit(
  async () => {
    const data = {
      nombre: first_name.value + ' ' + last_name.value,
      correoElectronico: email.value,
    };
    await clientStore.addClient(data);
    const dataQuotation = {
      clientModel: {
        id: clientStore.dataClient.id,
      },
      tipoProducto: {
        id: typeProduct.value,
      },
      peso: parseFloat(weight.value),
      costoProducto: parseFloat(priceStore.value),
      flete: parseFloat(productsStore.showProduct(typeProduct.value).porcentajeFlete) * parseFloat(priceStore.value),
      gastosImportacion: parseFloat(productsStore.showProduct(typeProduct.value).porcentajeGastosImportacion) * parseFloat(priceStore.value),
      seguro: parseFloat(productsStore.showProduct(typeProduct.value).porcentajeSeguro) * parseFloat(priceStore.value),
      impuestos: parseFloat(productsStore.showProduct(typeProduct.value).porcentajeImpuestos) * parseFloat(priceStore.value),
      costoTotalImportacion: parseFloat(productsStore.percentTotal * parseFloat(priceStore.value)),
      costoProductoMasImportacion: parseFloat(productsStore.percentTotal * parseFloat(priceStore.value) + parseFloat(priceStore.value)),
    };
    await quotaStore.addQuota(dataQuotation);

    //Hacer que haga scroll hacia abajo hasta lo ultimo de la pagina desde de medio segundo

    setTimeout(() => {
      document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
    }, 500);

  }
);

onMounted(async () => {
  if (!clientStore.dataClient.email) {
    router.push('/');
  } else {
    email.value = clientStore.dataClient.email;
  }

});





</script>

<template>





  <div class="flex justify-center items-center h-full py-10">
    <div class="max-w-xl w-full ">
<div class="h-screen">
  <h2
        class="text-4xl text-center py- font-extrabold leading-10 tracking-tight text-gray-800 sm:text-5xl sm:leading-none md:text-5xl">
        Cotiza tu producto
      </h2>

      <div class="mt-10 mb-5">
        <p class="mt-3 text-base text-gray-500 ">
          Ingresa los datos del producto que deseas importar y te daremos una cotización.
        </p>
      </div>
      <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">Nombres</label>
            <input type="text" id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="Joe" v-model="first_name" v-bind="first_nameMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm">{{ errors.first_name }}</p>
            </span>
          </div>
          <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 ">Apellidos</label>
            <input type="text" id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="Doe" v-model="last_name" v-bind="last_nameMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm">{{ errors.last_name }}</p>
            </span>


          </div>
        </div>
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Correo Electrónico</label>
          <input type="email" id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="correo@telotraigo.com" v-model="email" v-bind="emailMeta" />
          <span v-if="errors">
            <p class="text-red-500 text-sm ">{{ errors.email }}</p>
          </span>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-2">

          <div>
            <label for="typeProduct" class="block mb-2 text-sm font-medium text-gray-900 ">Tipo de producto que desean
              importar.</label>
            <select id="countries"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              v-model="typeProduct" v-bind="typeProductMeta
                ">
              <option value="" selected disabled>Elija la categoría</option>
              <option v-for="(item, index) in productsStore.typeProducts" :key="index" :value="item.id">
                {{ item.nombre }}
              </option>

            </select>

            <span v-if="errors">
              <p class="text-red-500 text-sm ">{{ errors.typeProduct }}</p>
            </span>
          </div>
          <div>
            <label for="visitors" class="block mb-2 text-sm font-medium text-gray-900 ">Precio según tienda en
              linea</label>
            <input type="number" id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="$0" required v-model="priceStore" v-bind="priceStoreMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm ">{{ errors.priceStore }}</p>
            </span>
          </div>
          <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900 ">
              Peso del producto en libras
            </label>
            <input type="number" id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="$0" v-model="weight" v-bind="weightMeta" />
            <span v-if="errors">
              <p class="text-red-500 text-sm">{{ errors.weight }}</p>
            </span>
          </div>
        </div>
        <button type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click.prevent="onSubmit">Calcular</button>
      </form>
</div>



      <div>
        <div class="my-10" id="result" v-if="quotaStore.dataQuota.clientModel">
        <div class="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
          <dl class="-my-3 divide-y divide-gray-100 text-sm">
            <div class="gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class=" text-gray-900 text-center text-lg font-bold">Cotización por importación de productos con ¡Te
                Lo Traigo!</dt>
            </div>
            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Nombre</dt>
              <dd class="text-gray-700 sm:col-span-2">{{ first_name + ' ' + last_name }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Correo electrónico</dt>
              <dd v-if="quotaStore.dataQuota.clientModel" class="text-gray-700 sm:col-span-2">
                {{ quotaStore.dataQuota.clientModel.correoElectronico }}
              </dd>
            </div>

            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Tipo de producto</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.tipoProducto">{{
                quotaStore.dataQuota.tipoProducto.nombre }}</dd>
            </div>
            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Peso del producto</dt>
              <dd class="text-gray-700 sm:col-span-2 " v-if="quotaStore.dataQuota.peso">{{ quotaStore.dataQuota.peso }}
                libras</dd>
            </div>
            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Costo del producto</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.costoProducto">{{
                quotaStore.dataQuota.costoProducto }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Flete</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.flete">${{ quotaStore.dataQuota.flete
                }}</dd>
            </div>

            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Gasto de importación</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.gastosImportacion">
                ${{ quotaStore.dataQuota.gastosImportacion }}
              </dd>

            </div>

            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Seguro</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.seguro">
                ${{ quotaStore.dataQuota.seguro }}
              </dd>

            </div>

            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Impuestos</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.impuestos">
                ${{ quotaStore.dataQuota.impuestos }}

              </dd>

            </div>
            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Costo total importación</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.costoTotalImportacion">
                ${{ quotaStore.dataQuota.costoTotalImportacion }}
              </dd>

            </div>
            <div class="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt class="font-medium text-gray-900">Costo producto + importación</dt>
              <dd class="text-gray-700 sm:col-span-2" v-if="quotaStore.dataQuota.costoProductoMasImportacion">
                ${{ quotaStore.dataQuota.costoProductoMasImportacion }}
              </dd>

            </div>
          </dl>
        </div>
      </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
dd {
  margin-left: 0;
  text-align: right;
}
</style>
