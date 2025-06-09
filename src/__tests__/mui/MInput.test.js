import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MInput from '../../components/mui/MInput.vue';
import MFormControl from '../../components/mui/MFormControl.vue';
import MInputLabel from '../../components/mui/MInputLabel.vue';
import MFormHelperText from '../../components/mui/MFormHelperText.vue';

describe('MInput', () => {
  it('renders input element', () => {
    const wrapper = mount(MInput);
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('binds value correctly', () => {
    const wrapper = mount(MInput, {
      props: { modelValue: 'test value' }
    });
    expect(wrapper.find('input').element.value).toBe('test value');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(MInput);
    const input = wrapper.find('input');
    
    await input.setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['new value']);
  });

  it('applies variant classes correctly', () => {
    const variants = [
      { variant: 'outlined', class: 'border border-gray-300' },
      { variant: 'filled', class: 'bg-gray-100' },
      { variant: 'standard', class: 'border-b border-gray-400' }
    ];
    
    variants.forEach(({ variant, class: expectedClass }) => {
      const wrapper = mount(MInput, { props: { variant } });
      expect(wrapper.find(`input[class*="${expectedClass.split(' ')[0]}"]`).exists()).toBe(true);
    });
  });

  it('applies size classes correctly', () => {
    const sizes = ['small', 'medium', 'large'];
    const expectedClasses = ['h-8', 'h-10', 'h-12'];
    
    sizes.forEach((size, index) => {
      const wrapper = mount(MInput, { props: { size } });
      expect(wrapper.find(`input[class*="${expectedClasses[index]}"]`).exists()).toBe(true);
    });
  });

  it('handles disabled state', () => {
    const wrapper = mount(MInput, { props: { disabled: true } });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });

  it('handles error state', () => {
    const wrapper = mount(MInput, { props: { error: true } });
    expect(wrapper.find('input[class*="border-red-500"]').exists()).toBe(true);
  });

  it('applies full width', () => {
    const wrapper = mount(MInput, { props: { fullWidth: true } });
    expect(wrapper.find('input[class*="w-full"]').exists()).toBe(true);
  });

  it('renders start and end adornments', () => {
    const wrapper = mount(MInput, {
      props: { startAdornment: 'Start', endAdornment: 'End' }
    });
    expect(wrapper.text()).toContain('Start');
    expect(wrapper.text()).toContain('End');
  });

  it('emits focus and blur events', async () => {
    const wrapper = mount(MInput);
    const input = wrapper.find('input');
    
    await input.trigger('focus');
    expect(wrapper.emitted('focus')).toBeTruthy();
    
    await input.trigger('blur');
    expect(wrapper.emitted('blur')).toBeTruthy();
  });
});

describe('MFormControl', () => {
  it('provides context to child components', () => {
    const wrapper = mount(MFormControl, {
      props: { error: true, disabled: true },
      slots: {
        default: '<div data-testid="child">Child</div>'
      }
    });
    expect(wrapper.find('[data-testid="child"]').exists()).toBe(true);
  });

  it('applies margin classes', () => {
    const margins = ['none', 'dense', 'normal'];
    const expectedClasses = ['', 'mb-2', 'mb-4'];
    
    margins.forEach((margin, index) => {
      const wrapper = mount(MFormControl, { props: { margin } });
      if (expectedClasses[index]) {
        expect(wrapper.find(`[class*="${expectedClasses[index]}"]`).exists()).toBe(true);
      }
    });
  });

  it('applies full width', () => {
    const wrapper = mount(MFormControl, { props: { fullWidth: true } });
    expect(wrapper.find('[class*="w-full"]').exists()).toBe(true);
  });
});

describe('MInputLabel', () => {
  it('renders label text', () => {
    const wrapper = mount(MInputLabel, {
      props: { children: 'Test Label' }
    });
    expect(wrapper.text()).toContain('Test Label');
  });

  it('shows required asterisk', () => {
    const wrapper = mount(MInputLabel, {
      props: { required: true, children: 'Required Field' }
    });
    expect(wrapper.text()).toContain('*');
  });

  it('applies error styling', () => {
    const wrapper = mount(MInputLabel, {
      props: { error: true, children: 'Error Label' }
    });
    expect(wrapper.find('[class*="text-red-600"]').exists()).toBe(true);
  });

  it('applies focus styling', () => {
    const wrapper = mount(MInputLabel, {
      props: { focused: true, children: 'Focused Label' }
    });
    expect(wrapper.find('[class*="text-blue-600"]').exists()).toBe(true);
  });
});

describe('MFormHelperText', () => {
  it('renders helper text', () => {
    const wrapper = mount(MFormHelperText, {
      props: { children: 'Helper text' }
    });
    expect(wrapper.text()).toBe('Helper text');
  });

  it('applies error styling', () => {
    const wrapper = mount(MFormHelperText, {
      props: { error: true, children: 'Error text' }
    });
    expect(wrapper.find('[class*="text-red-600"]').exists()).toBe(true);
  });

  it('applies disabled styling', () => {
    const wrapper = mount(MFormHelperText, {
      props: { disabled: true, children: 'Disabled text' }
    });
    expect(wrapper.find('[class*="text-gray-400"]').exists()).toBe(true);
  });

  it('does not render when no content', () => {
    const wrapper = mount(MFormHelperText);
    expect(wrapper.html()).toBe('<!--v-if-->');
  });
});