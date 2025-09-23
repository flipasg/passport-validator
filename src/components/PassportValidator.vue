<script setup lang="ts">
import { ref } from 'vue';
import { passportFormats } from '../constants';
import { validatePassport } from '../utils/PassportValidator';
const countryNames = Object.keys(passportFormats);

const countryName = ref<string>(countryNames[0] as string);
const passportNumber = ref<string>();
const errorMessage = ref<string>();

const validate = () => {
  errorMessage.value = '';
  if (!passportNumber.value) {
    errorMessage.value = 'Required';
    return;
  }
  const isValid = validatePassport(passportNumber.value, countryName.value);

  if (!isValid) {
    errorMessage.value = 'Is not valid passport number';
  }
};
</script>
<template>
  <div>
    <label for="country-name">Country</label>
    <select
      id="country-name"
      name="country-name"
      :value="countryName"
      @input="(event) => (countryName = event.target.value)"
    >
      <option v-for="countrName of countryNames" :key="countrName">
        {{ countrName }}
      </option>
    </select>
  </div>
  <div>
    <label for="passport-number">Passport number</label>
    <input
      id="passport-number"
      name="passport-number"
      type="text"
      class="border"
      :value="passportNumber"
      @input="(event) => (passportNumber = event.target.value)"
    />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
  <button @click="validate">Validate</button>
</template>
