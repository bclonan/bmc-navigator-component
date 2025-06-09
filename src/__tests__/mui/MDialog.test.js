import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MDialog from '../../components/mui/MDialog.vue';
import MDialogTitle from '../../components/mui/MDialogTitle.vue';
import MDialogContent from '../../components/mui/MDialogContent.vue';
import MDialogActions from '../../components/mui/MDialogActions.vue';

describe('MDialog', () => {
  it('renders when open is true', () => {
    const wrapper = mount(MDialog, {
      props: { open: true },
      slots: { default: '<div>Dialog content</div>' }
    });
    expect(wrapper.find('[class*="bg-white"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Dialog content');
  });

  it('does not render when open is false', () => {
    const wrapper = mount(MDialog, {
      props: { open: false },
      slots: { default: '<div>Dialog content</div>' }
    });
    expect(wrapper.find('[class*="bg-white"]').exists()).toBe(false);
  });

  it('applies max-width classes correctly', () => {
    const maxWidths = ['xs', 'sm', 'md', 'lg', 'xl'];
    const expectedClasses = ['max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl'];
    
    maxWidths.forEach((maxWidth, index) => {
      const wrapper = mount(MDialog, {
        props: { open: true, maxWidth }
      });
      expect(wrapper.find(`[class*="${expectedClasses[index]}"]`).exists()).toBe(true);
    });
  });

  it('applies full-width when specified', () => {
    const wrapper = mount(MDialog, {
      props: { open: true, fullWidth: true }
    });
    expect(wrapper.find('[class*="w-full"]').exists()).toBe(true);
  });

  it('applies full-screen when specified', () => {
    const wrapper = mount(MDialog, {
      props: { open: true, fullScreen: true }
    });
    expect(wrapper.find('[class*="w-full h-full"]').exists()).toBe(true);
  });

  it('emits close event on backdrop click', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true, disableBackdropClick: false }
    });
    
    await wrapper.find('[class*="bg-black bg-opacity-50"]').trigger('click');
    expect(wrapper.emitted('close')).toBeTruthy();
  });

  it('does not emit close when backdrop click is disabled', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true, disableBackdropClick: true }
    });
    
    await wrapper.find('[class*="bg-black bg-opacity-50"]').trigger('click');
    expect(wrapper.emitted('close')).toBeFalsy();
  });
});

describe('MDialogTitle', () => {
  it('renders title text', () => {
    const wrapper = mount(MDialogTitle, {
      props: { children: 'Dialog Title' }
    });
    expect(wrapper.text()).toBe('Dialog Title');
  });

  it('applies typography classes by default', () => {
    const wrapper = mount(MDialogTitle);
    expect(wrapper.find('[class*="text-lg font-semibold"]').exists()).toBe(true);
  });

  it('disables typography when specified', () => {
    const wrapper = mount(MDialogTitle, {
      props: { disableTypography: true }
    });
    expect(wrapper.find('[class*="text-lg font-semibold"]').exists()).toBe(false);
  });
});

describe('MDialogContent', () => {
  it('renders content', () => {
    const wrapper = mount(MDialogContent, {
      props: { children: 'Dialog content' }
    });
    expect(wrapper.text()).toBe('Dialog content');
  });

  it('applies dividers when specified', () => {
    const wrapper = mount(MDialogContent, {
      props: { dividers: true }
    });
    expect(wrapper.find('[class*="border-t border-b"]').exists()).toBe(true);
  });
});

describe('MDialogActions', () => {
  it('renders actions', () => {
    const wrapper = mount(MDialogActions, {
      slots: { default: '<button>Action</button>' }
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('applies spacing by default', () => {
    const wrapper = mount(MDialogActions);
    expect(wrapper.find('[class*="space-x-2"]').exists()).toBe(true);
  });

  it('disables spacing when specified', () => {
    const wrapper = mount(MDialogActions, {
      props: { disableSpacing: true }
    });
    expect(wrapper.find('[class*="space-x-2"]').exists()).toBe(false);
  });
});