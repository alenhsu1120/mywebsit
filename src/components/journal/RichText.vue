<template><template v-for="(part, i) in parts" :key="i"><strong v-if="part.bold">{{ part.text }}</strong><template v-else>{{ part.text }}</template></template></template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()

/** 把 **粗體** 拆成片段，避免使用 v-html。 */
const parts = computed(() =>
  props.text
    .split(/(\*\*[^*]+\*\*)/)
    .filter(Boolean)
    .map(s => (s.startsWith('**') && s.endsWith('**') ? { bold: true, text: s.slice(2, -2) } : { bold: false, text: s })),
)
</script>
