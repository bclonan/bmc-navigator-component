import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import MDialog from '../../components/mui/MDialog.vue';
import MDialogTitle from '../../components/mui/MDialogTitle.vue';
import MDialogContent from '../../components/mui/MDialogContent.vue';
import MDialogActions from '../../components/mui/MDialogActions.vue';

describe('MDialog', () => {
  beforeEach(() => {
    // Create a container for Teleport
    const container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
  });

  it('renders when open is true', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true },
      slots: { default: '<div>Dialog content</div>' },
      attachTo: document.body
    });
    
    await wrapper.vm.$nextTick();
    // Check if dialog content exists in document body due to Teleport
    expect(document.body.innerHTML).toContain('Dialog content');
  });

  it('does not render when open is false', () => {
    const wrapper = mount(MDialog, {
      props: { open: false },
      slots: { default: '<div>Dialog content</div>' }
    });
    expect(document.body.innerHTML).not.toContain('Dialog content');
  });

  it('applies max-width classes correctly', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true, maxWidth: 'sm' },
      attachTo: document.body
    });
    
    await wrapper.vm.$nextTick();
    expect(document.body.innerHTML).toContain('max-w-sm');
  });

  it('applies full-width when specified', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true, fullWidth: true },
      attachTo: document.body
    });
    
    await wrapper.vm.$nextTick();
    expect(document.body.innerHTML).toContain('w-full');
  });

  it('applies full-screen when specified', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true, fullScreen: true },
      attachTo: document.body
    });
    
    await wrapper.vm.$nextTick();
    expect(document.body.innerHTML).toContain('w-full h-full');
  });

  it('emits close event on backdrop click', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true, disableBackdropClick: false },
      attachTo: document.body
    });
    
    await wrapper.vm.$nextTick();
    const backdrop = document.querySelector('[class*="bg-black bg-opacity-50"]');
    if (backdrop) {
      backdrop.click();
      expect(wrapper.emitted('close')).toBeTruthy();
    }
  });

  it('does not emit close when backdrop click is disabled', async () => {
    const wrapper = mount(MDialog, {
      props: { open: true, disableBackdropClick: true },
      attachTo: document.body
    });
    
    await wrapper.vm.$nextTick();
    const backdrop = document.querySelector('[class*="bg-black bg-opacity-50"]');
    if (backdrop) {
      backdrop.click();
      expect(wrapper.emitted('close')).toBeFalsy();
    }
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