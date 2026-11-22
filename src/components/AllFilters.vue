<template>
  <aside class="filters-panel">
    <div class="filters-head">
      <h3>Фильтры</h3>
      <button @click="emits('clear')" class="reset-btn" type="button">Сбросить</button>
    </div>

    <div class="filter-group">
      <h4 class="filter-title">Цена</h4>
      <div class="range">
        <input
          class="range-input"
          type="range"
          :min="min"
          :max="max"
          step="10"
          @input="emits('update:valueRange',Number(($event.target as HTMLInputElement).value))"
          :value="valueRange"
        />
      </div>
      <p>
        {{ valueRange }}
      </p>

      <div class="price-labels">
        <span>От {{ min }} ₽</span>
        <span>До {{ max }} ₽</span>
      </div>
    </div>

    <MarkFilter v-model:selectedMarks="selectedMarks" />

    <MaterialFilter v-model:selectedMaterial="selectedMaterial" />

    <ColorFilter v-model:currentColor="currentColor" :colorList="colorList" />

    <StyleFilter :styleList="styleList" v-model:currentStyle="currentStyle" />
  </aside>
</template>

<script setup lang="ts">
import MarkFilter from './MarkFilter.vue';
import MaterialFilter from './MaterialFilter.vue';
import ColorFilter from './ColorFilter.vue';
import StyleFilter from './StyleFilter.vue';
import type { OptionsByApi } from '@/types/types.ts';

interface Props {
  min?: number;
  max?: number;
  valueRange?: number;
  materialList?: OptionsByApi;
  colorList?: OptionsByApi;
  styleList?: OptionsByApi;
}

interface Emits {
  'update:valueRange': [value: number];
  clear: [];
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
const selectedMarks = defineModel<string[]>('selectedMarks');
const selectedMaterial = defineModel<string[]>('selectedMaterial');
const currentColor = defineModel<string[]>('currentColor');
const currentStyle = defineModel<string[]>('currentStyle');
</script>

<style scoped></style>
