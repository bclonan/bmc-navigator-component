import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MCircularProgress from '../../components/mui/MCircularProgress.vue';
import MLinearProgress from '../../components/mui/MLinearProgress.vue';

describe('MCircularProgress', () => {
  it('renders with default props', () => {
    const wrapper = mount(MCircularProgress);
    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.find('circle').exists()).toBe(true);
  });

  it('applies color classes correctly', () => {
    const colors = ['primary', 'secondary', 'error', 'success'];
    colors.forEach(color => {
      const wrapper = mount(MCircularProgress, { props: { color } });
      expect(wrapper.find('[class*="text-"]').exists()).toBe(true);
    });
  });

  it('handles determinate variant with value', () => {
    const wrapper = mount(MCircularProgress, {
      props: { variant: 'determinate', value: 50 }
    });
    expect(wrapper.attributes('aria-valuenow')).toBe('50');
    expect(wrapper.attributes('aria-valuemin')).toBe('0');
    expect(wrapper.attributes('aria-valuemax')).toBe('100');
  });

  it('applies custom size', () => {
    const wrapper = mount(MCircularProgress, { props: { size: 60 } });
    const svg = wrapper.find('svg');
    expect(svg.attributes('width')).toBe('60');
    expect(svg.attributes('height')).toBe('60');
  });

  it('applies custom thickness', () => {
    const wrapper = mount(MCircularProgress, { props: { thickness: 5 } });
    const circle = wrapper.find('circle');
    expect(circle.attributes('stroke-width')).toBe('5');
  });
});

describe('MLinearProgress', () => {
  it('renders with default props', () => {
    const wrapper = mount(MLinearProgress);
    expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);
  });

  it('applies color classes correctly', () => {
    const colors = ['primary', 'secondary', 'error', 'success'];
    colors.forEach(color => {
      const wrapper = mount(MLinearProgress, { props: { color } });
      expect(wrapper.find('[class*="bg-"]').exists()).toBe(true);
    });
  });

  it('handles determinate variant with value', () => {
    const wrapper = mount(MLinearProgress, {
      props: { variant: 'determinate', value: 75 }
    });
    expect(wrapper.attributes('aria-valuenow')).toBe('75');
  });

  it('handles buffer variant', () => {
    const wrapper = mount(MLinearProgress, {
      props: { variant: 'buffer', value: 60, valueBuffer: 80 }
    });
    expect(wrapper.attributes('aria-valuenow')).toBe('60');
    expect(wrapper.find('[class*="opacity-30"]').exists()).toBe(true);
  });

  it('applies indeterminate animation', () => {
    const wrapper = mount(MLinearProgress, {
      props: { variant: 'indeterminate' }
    });
    expect(wrapper.find('[class*="animate-"]').exists()).toBe(true);
  });
});