<script setup>
import router from '@/router';
import { useForm, configure } from 'vee-validate';
import * as yup from 'yup';
import { useClientStore } from '@/stores/clients';

const clientStore = useClientStore();

const { errors, defineField, handleSubmit } = useForm({
    validationSchema: yup.object({
        email: yup.string().email('Ingrese una dirección valida').required('El correo es requerido'),
    }),
});


configure({
    validateOnChange: true,
    validateOnBlur: true,
    validateOnInput: true,
    validateOnModelUpdate: false,
});


const [email, emailMeta] = defineField('email');


const onSubmit = handleSubmit(
    async () => {
      router.push('/calculadora');
      clientStore.dataClient.email = email.value;
    }
);



</script>

<template>
  <div class="h-screen flex justify-center items-center ">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <div class="flex justify-center items-center">
        <img src="/favicon.ico" alt="logo" class=" w-20" />
      </div>
      <h1 class="text-2xl font-bold sm:text-3xl">Compra lo quieras <br>
        <span class="text-5xl uppercase">¡nosotros te lo llevamos!</span></h1>

      <p class="mt-4 text-gray-500">
        Para calcular el costo de tu envío, ingresa una dirección de correo electrónico para dar el siguiente paso.
      </p>
    </div>

    <form action="#" class="mx-auto mb-0 mt-8 max-w-md space-y-4">
      <div>
        <label for="email" class="sr-only">Correo Electrónico</label>

        <div class="relative">
          <input
            type="email"
            class="w-full rounded-lg border-gray-400 p-4 pe-12 text-lg font-bold shadow-lg"
            placeholder="correo@telotraigo.com"
            v-bind="emailMeta" v-model="email"
          />

          <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
        </div>
        <div>
          <span v-if="errors">
            <p class="text-red-500 text-lg font-medium">{{ errors.email }}</p>
          </span>
        </div>
      </div>



      <div class="flex flex-col items-center justify-center ">

        <button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm mt-5 font-medium text-white"
          @click.prevent="onSubmit"
          >
          Siguiente paso
        </button>




      </div>
    </form>
  </div>
  </div>
</template>

<style scoped>

</style>
