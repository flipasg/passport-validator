import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import PassportValidator from '../../src/components/PassportValidator.vue';

const mountComponent = () =>
  mount(PassportValidator, {
    attachTo: document.body,
  });

describe('PassportValidator component', () => {
  it('shows a required message when submitted without input', async () => {
    const wrapper = mountComponent();

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Passport number is required.');
  });

  it('shows an invalid message when pattern does not match', async () => {
    const wrapper = mountComponent();
    const input = wrapper.get('#passport-number');

    await input.setValue('123456789');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Invalid passport number.');
  });

  it('validates a correct passport number for the selected country', async () => {
    const wrapper = mountComponent();
    const input = wrapper.get('#passport-number');

    await input.setValue('A12345678');
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.text()).toContain('Passport number is valid.');
  });

  it('resets feedback when switching countries', async () => {
    const wrapper = mountComponent();
    const input = wrapper.get('#passport-number');
    const select = wrapper.get('#passport-country');

    await input.setValue('A12345678');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('Passport number is valid.');

    await select.setValue('Canada');

    expect(wrapper.text()).not.toContain('Passport number is valid.');
  });
});
