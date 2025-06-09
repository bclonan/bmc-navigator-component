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
    const wrapper = mount(MButton, {
      props: { text: 'Test', variant: 'primary' }
    });
    // Check for primary button styling
    expect(wrapper.find('button').classes()).toContain('bg-blue-600');
  });

  it('applies size classes correctly', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Test', size: 'large' }
    });
    const classes = wrapper.find('button').classes().join(' ');
    expect(classes).toMatch(/px-\d/);
  });

  it('handles disabled state', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Disabled', disabled: true }
    });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    const classes = wrapper.find('button').classes().join(' ');
    expect(classes).toMatch(/opacity-\d+/);
  });

  it('handles loading state', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Loading', loading: true }
    });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    expect(wrapper.text()).toBe('Loading');
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