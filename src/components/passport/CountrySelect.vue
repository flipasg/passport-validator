<script setup lang="ts">
interface Option {
  value: string;
  label: string;
  icon?: string;
}

defineProps<{
  id: string;
  label: string;
  modelValue: string;
  options: Option[];
}>();

const emit = defineEmits<{ 'update:modelValue': [string] }>();

const onInput = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
};
</script>

<template>
  <label :for="id" class="block space-y-2">
    <span class="text-sm font-medium text-slate-700">{{ label }}</span>
    <div class="relative">
      <select
        :id="id"
        class="w-full appearance-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 shadow-sm transition focus:border-primary-500 focus-visible:border-primary-500 focus:outline-none focus:ring-0 focus-visible:ring-0"
        :value="modelValue"
        @input="onInput"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.icon ? `${option.icon} ${option.label}` : option.label }}
        </option>
      </select>
      <span
        class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400"
        aria-hidden="true"
      >
        ▾
      </span>
    </div>
  </label>
</template>
