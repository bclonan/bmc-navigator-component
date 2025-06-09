import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MButton from '../../components/ui/MButton.vue';

describe('MButton', () => {
  it('renders with default props', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Click me' }
    });
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('applies variant classes correctly', () => {
    const variants = [
      { variant: 'primary', class: 'bg-blue-600' },
      { variant: 'secondary', class: 'bg-gray-600' },
      { variant: 'outlined', class: 'border-blue-600' }
    ];
    
    variants.forEach(({ variant, class: expectedClass }) => {
      const wrapper = mount(MButton, {
        props: { text: 'Test', variant }
      });
      expect(wrapper.find(`[class*="${expectedClass}"]`).exists()).toBe(true);
    });
  });

  it('applies size classes correctly', () => {
    const sizes = ['small', 'medium', 'large'];
    const expectedClasses = ['px-3 py-1.5', 'px-4 py-2', 'px-6 py-3'];
    
    sizes.forEach((size, index) => {
      const wrapper = mount(MButton, {
        props: { text: 'Test', size }
      });
      expect(wrapper.find(`[class*="${expectedClasses[index]}"]`).exists()).toBe(true);
    });
  });

  it('handles disabled state', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Disabled', disabled: true }
    });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.find('[class*="opacity-50"]').exists()).toBe(true);
  });

  it('handles loading state', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Loading', loading: true }
    });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toContain('Loading...');
  });

  it('emits click event', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Click me' }
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('does not emit click when disabled', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Disabled', disabled: true }
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('renders with icon', () => {
    const wrapper = mount(MButton, {
      props: { 
        text: 'With Icon',
        prependIcon: 'fas fa-plus'
      }
    });
    expect(wrapper.find('i.fas.fa-plus').exists()).toBe(true);
  });

  it('applies full width', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Full Width', fullWidth: true }
    });
    expect(wrapper.find('[class*="w-full"]').exists()).toBe(true);
  });
});