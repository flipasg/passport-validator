import { computed, reactive } from 'vue';
import {
  passportCountries,
  passportFormats,
  validatePassport,
  type PassportCountry,
} from '../../domain/passport';

type ValidationStatus = 'idle' | 'valid' | 'invalid';

type PassportValidationState = {
  country: PassportCountry;
  passportNumber: string;
  status: ValidationStatus;
  error: string;
};

export const usePassportValidation = () => {
  const defaultCountry = (passportCountries[0] ?? 'USA') as PassportCountry;

  const state = reactive<PassportValidationState>({
    country: defaultCountry,
    passportNumber: '',
    status: 'idle',
    error: '',
  });

  const countries = computed(() => passportCountries);

  const resetFeedback = () => {
    state.status = 'idle';
    state.error = '';
  };

  const updateCountry = (country: PassportCountry) => {
    state.country = country;
    resetFeedback();
  };

  const updatePassportNumber = (value: string) => {
    state.passportNumber = value;
    resetFeedback();
  };

  const validate = () => {
    if (!state.passportNumber.trim()) {
      state.status = 'invalid';
      state.error = 'Passport number is required.';
      return;
    }

    const isValid = validatePassport(state.passportNumber, state.country);

    if (!isValid) {
      state.status = 'invalid';
      state.error = 'Invalid passport number.';
      return;
    }

    state.status = 'valid';
    state.error = '';
  };

  const feedback = computed(() => {
    if (state.status === 'valid') {
      return {
        type: 'success' as const,
        message: 'Passport number is valid.',
      };
    }

    if (state.status === 'invalid') {
      return {
        type: 'error' as const,
        message: state.error,
      };
    }

    return null;
  });

  const isValid = computed(() => state.status === 'valid');

  const placeholder = computed(() => passportFormats[state.country] ?? '');

  return {
    countries,
    state,
    feedback,
    isValid,
    placeholder,
    updateCountry,
    updatePassportNumber,
    validate,
  };
};
