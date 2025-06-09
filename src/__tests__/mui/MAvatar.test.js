import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MAvatar from '../../components/mui/MAvatar.vue';

describe('MAvatar', () => {
  it('renders with default props', () => {
    const wrapper = mount(MAvatar);
    expect(wrapper.find('[class*="w-10 h-10"]').exists()).toBe(true);
    expect(wrapper.find('[class*="rounded-full"]').exists()).toBe(true);
    expect(wrapper.find('[class*="bg-gray-200"]').exists()).toBe(true);
  });

  it('displays text children correctly', () => {
    const wrapper = mount(MAvatar, {
      props: { children: 'AB' }
    });
    expect(wrapper.text()).toBe('AB');
  });

  it('displays image when src is provided', () => {
    const wrapper = mount(MAvatar, {
      props: { 
        src: 'https://example.com/avatar.jpg',
        alt: 'Test Avatar'
      }
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://example.com/avatar.jpg');
    expect(img.attributes('alt')).toBe('Test Avatar');
  });

  it('falls back to initials when image fails to load', async () => {
    const wrapper = mount(MAvatar, {
      props: { 
        src: 'invalid-url.jpg',
        alt: 'Test Avatar'
      }
    });
    
    const img = wrapper.find('img');
    await img.trigger('error');
    
    expect(wrapper.text()).toBe('T'); // First letter of alt
  });

  it('applies correct size classes', () => {
    const sizes = ['small', 'medium', 'large'];
    const expectedClasses = ['w-8 h-8', 'w-10 h-10', 'w-14 h-14'];
    
    sizes.forEach((size, index) => {
      const wrapper = mount(MAvatar, { props: { size } });
      expect(wrapper.find(`[class*="${expectedClasses[index]}"]`).exists()).toBe(true);
    });
  });

  it('applies custom numeric size', () => {
    const wrapper = mount(MAvatar, { props: { size: 60 } });
    const avatarElement = wrapper.find('div');
    expect(avatarElement.element.style.width).toBe('60px');
    expect(avatarElement.element.style.height).toBe('60px');
  });

  it('applies variant classes correctly', () => {
    const variants = [
      { variant: 'circular', class: 'rounded-full' },
      { variant: 'rounded', class: 'rounded-lg' },
      { variant: 'square', class: 'rounded-none' }
    ];
    
    variants.forEach(({ variant, class: expectedClass }) => {
      const wrapper = mount(MAvatar, { props: { variant } });
      expect(wrapper.find(`[class*="${expectedClass}"]`).exists()).toBe(true);
    });
  });

  it('applies color classes correctly', () => {
    const colors = [
      { color: 'primary', class: 'bg-blue-600' },
      { color: 'secondary', class: 'bg-purple-600' },
      { color: 'success', class: 'bg-green-600' }
    ];
    
    colors.forEach(({ color, class: expectedClass }) => {
      const wrapper = mount(MAvatar, { props: { color } });
      expect(wrapper.find(`[class*="${expectedClass}"]`).exists()).toBe(true);
    });
  });

  it('handles click events when clickable', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MAvatar, {
      props: { clickable: true },
      attrs: { onClick: handleClick }
    });
    
    wrapper.trigger('click');
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not handle click events when not clickable', () => {
    const handleClick = vi.fn();
    const wrapper = mount(MAvatar, {
      props: { clickable: false },
      attrs: { onClick: handleClick }
    });
    
    wrapper.trigger('click');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders slot content', () => {
    const wrapper = mount(MAvatar, {
      slots: {
        default: '<span>Custom Content</span>'
      }
    });
    expect(wrapper.find('span').text()).toBe('Custom Content');
  });
});