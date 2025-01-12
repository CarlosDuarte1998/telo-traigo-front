<script setup>
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';

import { useProductsStore } from '@/stores/products';
import { useClientStore } from '@/stores/clients';

const productsStore = useProductsStore();
const clientStore = useClientStore();

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
const [email, emailMeta] = defineField('email');

typeProduct.value = '';

const onSubmit = handleSubmit(
  async () => {
    const data = {
      nombre: first_name.value + ' ' + last_name.value,
      correoElectronico : email.value,
    };
    await clientStore.addClient(data);

  }
);


</script>

<template>





  <div class="flex justify-center items-center h-full py-10">
    <div class="max-w-xl w-full ">
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
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="typeProduct" v-bind="typeProductMeta
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
              placeholder="$0" required
              v-model="priceStore" v-bind="priceStoreMeta"
              />
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
              placeholder="$0"
              v-model="weight" v-bind="weightMeta"
              />
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
  </div>

</template>
