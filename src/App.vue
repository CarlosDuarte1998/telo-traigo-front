<script setup>
import { useProductsStore } from '@/stores/products';
import { onMounted } from 'vue';



const productsStore = useProductsStore();

onMounted(async () => {
    await productsStore.getProducts();
});
</script>

<template>
  <RouterView />
</template>

<style scoped>
</style>
