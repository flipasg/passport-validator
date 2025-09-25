import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
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

  it('updates the passport placeholder to match the selected country format', async () => {
    const wrapper = mountComponent();
    const input = wrapper.get('#passport-number');
    const select = wrapper.get('#passport-country');

    expect(input.attributes('placeholder')).toBe('LDDDDDDDD');

    await select.setValue('Japan');
    await nextTick();

    expect(input.attributes('placeholder')).toBe('LLDDDDDDD');
  });

  it('renders the primary action button with a blue background', () => {
    const wrapper = mountComponent();
    const button = wrapper.get('button[type="submit"]');

    expect(button.classes()).toContain('bg-primary-500');
    expect(button.classes()).toContain('text-white');
  });

  it('applies slim focus styles to the passport input', () => {
    const wrapper = mountComponent();
    const input = wrapper.get('#passport-number');
    const classString = input.attributes('class') ?? '';

    expect(classString).toContain('focus:ring-0');
    expect(classString).not.toContain('focus:ring-4');
  });
});
