import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MChip from '../../components/mui/MChip.vue';

describe('MChip', () => {
  it('renders with label', () => {
    const wrapper = mount(MChip, {
      props: { label: 'Test Chip' }
    });
    expect(wrapper.text()).toContain('Test Chip');
  });

  it('applies variant classes correctly', () => {
    const variants = [
      { variant: 'filled', color: 'primary', class: 'bg-blue-600' },
      { variant: 'outlined', color: 'primary', class: 'border-blue-600' }
    ];
    
    variants.forEach(({ variant, color, class: expectedClass }) => {
      const wrapper = mount(MChip, {
        props: { label: 'Test', variant, color }
      });
      expect(wrapper.find(`[class*="${expectedClass}"]`).exists()).toBe(true);
    });
  });

  it('applies size classes correctly', () => {
    const sizes = ['small', 'medium', 'large'];
    const expectedClasses = ['h-6 text-xs', 'h-8 text-sm', 'h-10 text-base'];
    
    sizes.forEach((size, index) => {
      const wrapper = mount(MChip, {
        props: { label: 'Test', size }
      });
      expect(wrapper.find(`[class*="${expectedClasses[index]}"]`).exists()).toBe(true);
    });
  });

  it('handles click events when clickable', () => {
    const wrapper = mount(MChip, {
      props: { label: 'Clickable', clickable: true }
    });
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });

  it('shows delete button when deletable', () => {
    const wrapper = mount(MChip, {
      props: { label: 'Deletable', deletable: true }
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('emits delete event', () => {
    const wrapper = mount(MChip, {
      props: { label: 'Deletable', deletable: true }
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('delete')).toBeTruthy();
  });

  it('does not handle events when disabled', () => {
    const wrapper = mount(MChip, {
      props: { label: 'Disabled', disabled: true, clickable: true, deletable: true }
    });
    wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeFalsy();
  });

  it('renders icon when provided', () => {
    const wrapper = mount(MChip, {
      props: { label: 'With Icon', icon: 'fas fa-star' }
    });
    expect(wrapper.find('i.fas.fa-star').exists()).toBe(true);
  });
});