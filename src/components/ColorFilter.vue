<template>
  <div class="filter-group">
    <h4 class="filter-title">{{ filters.colorList.label }}</h4>
    <label :key="item" class="filter-check" v-for="item in filters.colorList.options">
      <input :value="item" type="checkbox" v-model="currentColor" /> {{ item }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { useFilters } from '../stores/filtersProducts.ts';
const filters = useFilters();
// defineProps(['colorList']);
const currentColor = defineModel<string[]>('currentColor', { default: () => [] });
</script>
