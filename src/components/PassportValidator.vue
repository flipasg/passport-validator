<script setup lang="ts">
import { computed } from 'vue';
import {
  passportCountries,
  type PassportCountry,
} from '../domain/passport';
import { usePassportValidation } from '../application/passport/usePassportValidation';
import CountrySelect from './passport/CountrySelect.vue';
import PassportNumberInput from './passport/PassportNumberInput.vue';

const { countries, state, feedback, validate, updateCountry, updatePassportNumber } =
  usePassportValidation();

const countryPresentation: Record<PassportCountry, { label: string; icon: string }> = {
  USA: { label: 'United States', icon: '🇺🇸' },
  Canada: { label: 'Canada', icon: '🇨🇦' },
  Ireland: { label: 'Ireland', icon: '🇮🇪' },
  Japan: { label: 'Japan', icon: '🇯🇵' },
};

const countryOptions = computed(() =>
  countries.value.map((country) => ({
    value: country,
    label: countryPresentation[country]?.label ?? country,
    icon: countryPresentation[country]?.icon ?? '',
  }))
);

const selectedCountryLabel = computed(() =>
  countryPresentation[state.country]?.label ?? state.country
);

const handleCountryChange = (value: string) => {
  if (passportCountries.includes(value as PassportCountry)) {
    updateCountry(value as PassportCountry);
  }
};

const handleSubmit = (event: Event) => {
  event.preventDefault();
  validate();
};
</script>

<template>
  <section
    aria-labelledby="passport-validator-title"
    class="w-full max-w-md rounded-[28px] border border-slate-100 bg-white p-8 shadow-card backdrop-blur"
  >
    <header class="text-center">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">Verify</p>
      <h1 id="passport-validator-title" class="mt-2 text-2xl font-semibold text-slate-900">
        Passport Validator
      </h1>
      <p class="mt-2 text-sm text-slate-500">
        Ensure the passport number matches the official format for
        <span class="font-medium text-slate-700">{{ selectedCountryLabel }}</span>.
      </p>
    </header>

    <form class="mt-8 space-y-6" @submit="handleSubmit">
      <CountrySelect
        id="passport-country"
        label="Country Name"
        :options="countryOptions"
        :model-value="state.country"
        @update:model-value="handleCountryChange"
      />

      <PassportNumberInput
        id="passport-number"
        label="Passport Number"
        placeholder="123456789"
        :model-value="state.passportNumber"
        :error="feedback?.type === 'error' ? feedback.message : ''"
        @update:model-value="updatePassportNumber"
      />

      <div v-if="feedback && feedback.type === 'success'" class="flex items-center gap-2 rounded-2xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
        <span aria-hidden="true">✅</span>
        <span>{{ feedback.message }}</span>
      </div>

      <button
        type="submit"
        class="w-full rounded-2xl bg-primary-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-200"
      >
        Validate
      </button>
    </form>
  </section>
</template>
