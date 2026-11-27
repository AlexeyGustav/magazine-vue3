<template>
  <div class="filter-group">
    <h4 class="filter-title">{{ filters.materialList.label }}</h4>
    <label :key="item" v-for="item in filters.materialList.options" class="filter-check"
      ><input type="checkbox" :value="item" v-model="selectedMaterial" /> {{ item }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { useFilters } from '../stores/filtersProducts.ts';
const filters = useFilters();
// const props = defineProps(['materialList']);
const selectedMaterial = defineModel<string[]>('selectedMaterial', { default: () => [] });
</script>
