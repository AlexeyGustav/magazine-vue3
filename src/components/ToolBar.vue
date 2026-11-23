<template>
  <div class="toolbar">
    <span>Найдено {{ prop.sum }} товаров</span>
    <span>Сортировка ▾</span>
  </div>
</template>

<script setup lang="ts">
const prop = defineProps<{
  sum: number;
}>();
</script>
