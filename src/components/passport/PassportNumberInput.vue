<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
}>();

const modelValue = defineModel<string>();
</script>

<template>
  <label :for="id" class="block space-y-2">
    <span class="text-sm font-medium text-slate-700">{{ label }}</span>
    <input
      :id="id"
      v-model="modelValue"
      type="text"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-primary-500 focus-visible:border-primary-500 focus:outline-none focus:ring-0 focus-visible:ring-0"
      :class="{
        'border-error-500 focus:border-error-500 focus-visible:border-error-500 focus:ring-0 focus-visible:ring-0': error,
      }"
      :placeholder="placeholder"
      autocomplete="off"
    />
    <p
      v-if="error"
      class="flex items-center gap-2 text-sm font-medium text-error-600 text-red-600"
    >
      <span aria-hidden="true">⚠️</span>
      <span>{{ error }}</span>
    </p>
  </label>
</template>
