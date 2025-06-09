import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MAlert from '../../components/mui/MAlert.vue';

describe('MAlert', () => {
  it('renders with default props', () => {
    const wrapper = mount(MAlert, {
      props: { children: 'Test alert message' }
    });
    expect(wrapper.text()).toContain('Test alert message');
    expect(wrapper.find('[role="alert"]').exists()).toBe(true);
  });

  it('applies severity classes correctly', () => {
    const severities = [
      { severity: 'error', class: 'bg-red-50' },
      { severity: 'warning', class: 'bg-orange-50' },
      { severity: 'info', class: 'bg-blue-50' },
      { severity: 'success', class: 'bg-green-50' }
    ];
    
    severities.forEach(({ severity, class: expectedClass }) => {
      const wrapper = mount(MAlert, {
        props: { severity, children: 'Test' }
      });
      expect(wrapper.find(`[class*="${expectedClass}"]`).exists()).toBe(true);
    });
  });

  it('applies variant classes correctly', () => {
    const variants = [
      { variant: 'standard', severity: 'info', class: 'border' },
      { variant: 'filled', severity: 'info', class: 'bg-blue-600' },
      { variant: 'outlined', severity: 'info', class: 'border-2' }
    ];
    
    variants.forEach(({ variant, severity, class: expectedClass }) => {
      const wrapper = mount(MAlert, {
        props: { variant, severity, children: 'Test' }
      });
      expect(wrapper.find(`[class*="${expectedClass}"]`).exists()).toBe(true);
    });
  });

  it('shows close button when closable', () => {
    const wrapper = mount(MAlert, {
      props: { children: 'Test', closable: true }
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('emits close event when close button clicked', () => {
    const wrapper = mount(MAlert, {
      props: { children: 'Test', closable: true }
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('hides alert when closed', async () => {
    const wrapper = mount(MAlert, {
      props: { children: 'Test', closable: true }
    });
    await wrapper.find('button').trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
  });

  it('renders title when provided', () => {
    const wrapper = mount(MAlert, {
      props: { title: 'Alert Title', children: 'Alert message' }
    });
    expect(wrapper.text()).toContain('Alert Title');
  });

  it('renders default icon for each severity', () => {
    const wrapper = mount(MAlert, {
      props: { severity: 'success', children: 'Test' }
    });
    expect(wrapper.find('svg').exists()).toBe(true);
  });

  it('does not render icon when icon is false', () => {
    const wrapper = mount(MAlert, {
      props: { severity: 'info', children: 'Test', icon: false }
    });
    expect(wrapper.find('svg').exists()).toBe(false);
  });
});