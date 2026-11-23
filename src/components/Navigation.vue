<template>
  <button class="tab" :class="{ active }" @click="emit('activeTab', props.category)" type="button">
    {{ props.category }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  category: string;
  active: boolean;
}>();

const emit = defineEmits<{
  activeTab: [category: string];
}>();
</script>
