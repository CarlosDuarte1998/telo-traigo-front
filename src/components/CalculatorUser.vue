<script setup>
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';

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
    alert('Form submitted');
  }
);


</script>

<template>

  <div>
    <template>
  <!--
    Heads up! 👋

    This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
  -->

  <section
    class="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat"
  >
    <div
      class="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
    ></div>

    <div
      class="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
    >
      <div class="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
        <h1 class="text-3xl font-extrabold text-white sm:text-5xl">
          Let us find your

          <strong class="block font-extrabold text-rose-500"> Forever Home. </strong>
        </h1>

        <p class="mt-4 max-w-lg text-white sm:text-xl/relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
          numquam ea!
        </p>

        <div class="mt-8 flex flex-wrap gap-4 text-center">
          <a
            href="#"
            class="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
          >
            Get Started
          </a>

          <a
            href="#"
            class="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
  </div>

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
                <p class="text-red-500 text-sm">{{ errors.weight }}</p>
              </span>
          </div>
          <div>
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 ">Apellidos</label>
           <input type="text" id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5     "
              placeholder="Doe" v-model="last_name" v-bind="last_nameMeta" />
              <span v-if="errors">
                <p class="text-red-500 text-sm">{{ errors.weight }}</p>
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
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
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
