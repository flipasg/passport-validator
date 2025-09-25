<script setup lang="ts">
defineProps<{
  id: string;
  label: string;
  modelValue: string;
  placeholder?: string;
  error?: string;
}>();

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <label :for="id" class="block space-y-2">
    <span class="text-sm font-medium text-slate-700">{{ label }}</span>
    <input
      :id="id"
      type="text"
      class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-200"
      :class="{ 'border-error-500 focus:border-error-500 focus:ring-error-100': error }"
      :value="modelValue"
      :placeholder="placeholder"
      autocomplete="off"
      @input="onInput"
    />
    <p v-if="error" class="flex items-center gap-2 text-sm font-medium text-error-600">
      <span aria-hidden="true">⚠️</span>
      <span>{{ error }}</span>
    </p>
  </label>
</template>
