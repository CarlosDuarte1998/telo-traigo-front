<script setup>
import CalculatorUser from '@/components/CalculatorUser.vue';

const scrollSmooth = () => {
  const e = document.getElementById('form-cal');
  e.scrollIntoView({ behavior: 'smooth' });
};

</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="relative flex flex-col items-center max-w-screen-xl px-4 mx-auto md:flex-row sm:px-6 p-8">
    <div class="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pr-10">
        <div class="text-left">
            <h2
                class="text-4xl font-extrabold leading-10 tracking-tight text-gray-800 sm:text-5xl sm:leading-none md:text-6xl">
                Tu
                <span class="font-bold text-blue-500">Relájate</span>
                <span class="text-xl font-semibold rounded-full text-blueGray-500">:)</span>
            </h2>
            <p class="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                 Nosotros nos encargarémos de llevar tus productos hasta la puerta de tu casa.
            </p>
            <div class="mt-5 sm:flex md:mt-8">
                <div class="rounded-md shadow"><a @click="scrollSmooth"
                        class="flex items-center justify-center w-full cursor-pointer px-8 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue md:py-4 md:text-lg md:px-10">
                        Calcular enviós
                    </a></div>

            </div>
        </div>
    </div>
    <div class="flex items-center py-5 md:w-1/2 md:pb-20 md:pt-10 md:pl-10">
        <div class="relative w-full p-3 rounded  md:p-8">
            <div class="rounded-lg bg-white text-black w-full">
                <img src="https://picsum.photos/400/300" />
            </div>
        </div>
    </div>
</div>

  </div>
  <div class="" id="form-cal">
    <CalculatorUser />
  </div>
</template>

<style scoped>

</style>
