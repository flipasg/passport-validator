<script setup lang="ts">
import { computed } from 'vue';
import {
  passportCountries,
  type PassportCountry,
} from '../domain/passport';
import { usePassportValidation } from '../application/composables/usePassportValidation';
import CountrySelect from './passport/CountrySelect.vue';
import PassportNumberInput from './passport/PassportNumberInput.vue';

const {
  countries,
  state,
  feedback,
  placeholder,
  validate,
  updateCountry,
  updatePassportNumber,
} = usePassportValidation();

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

const countryModel = computed<PassportCountry>({
  get: () => state.country,
  set: (value) => {
    if (passportCountries.includes(value)) {
      updateCountry(value);
    }
  },
});

const passportNumberModel = computed<string>({
  get: () => state.passportNumber,
  set: (value) => {
    updatePassportNumber(value);
  },
});

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
        v-model="countryModel"
      />

      <PassportNumberInput
        id="passport-number"
        label="Passport Number"
        :placeholder="placeholder"
        v-model="passportNumberModel"
        :error="feedback?.type === 'error' ? feedback.message : ''"
      />

      <div v-if="feedback && feedback.type === 'success'" class="flex items-center gap-2 rounded-2xl bg-success-50 px-4 py-3 text-sm font-medium text-success-700">
        <span aria-hidden="true">✅</span>
        <span>{{ feedback.message }}</span>
      </div>

      <button
        type="submit"
        class="w-full rounded-2xl bg-primary-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/40 transition hover:bg-primary-600 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-200"
      >
        Validate
      </button>
    </form>
  </section>
</template>
