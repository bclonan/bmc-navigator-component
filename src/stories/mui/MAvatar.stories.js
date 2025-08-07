import MAvatar from '../../components/mui/MAvatar.vue';

export default {
  title: 'MUI Components/Data Display/Avatar',
  component: MAvatar,
  parameters: {
    docs: {
      description: {
        component: 'Material-UI Avatar component for displaying user profile pictures, initials, or icons with Your Town Finance styling.',
      },
    },
  },
  argTypes: {
    src: {
      control: { type: 'text' },
      description: 'Image source URL',
      defaultValue: ''
    },
    alt: {
      control: { type: 'text' },
      description: 'Alternative text or initials',
      defaultValue: 'Avatar'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Avatar size',
      defaultValue: 'medium'
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Avatar background color',
      defaultValue: 'primary'
    },
    variant: {
      control: { type: 'select' },
      options: ['circular', 'rounded', 'square'],
      description: 'Avatar shape variant',
      defaultValue: 'circular'
    }
  }
};

export const Default = (args) => ({
  components: { MAvatar },
  setup() {
    return { args };
  },
  template: '<MAvatar v-bind="args" />'
});

Default.args = {
  src: '',
  alt: 'JD',
  size: 'medium',
  color: 'primary',
  variant: 'circular'
};

export const UserProfiles = () => ({
  components: { MAvatar },
  template: `
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Customer Representatives</h4>
        <div class="flex gap-4 items-center">
          <MAvatar alt="Sarah Johnson" color="primary" class="mf-avatar" />
          <MAvatar alt="MC" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="ER" color="success" class="mf-avatar success" />
          <MAvatar alt="DT" color="primary" class="mf-avatar" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Loan Officers</h4>
        <div class="flex gap-4 items-center">
          <MAvatar alt="John Smith" size="large" color="primary" class="mf-avatar" />
          <MAvatar alt="Lisa Chen" size="large" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="Robert Wilson" size="large" color="success" class="mf-avatar success" />
        </div>
      </div>
    </div>
  `
});

export const Sizes = () => ({
  components: { MAvatar },
  template: `
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Small Avatars</h4>
        <div class="flex gap-3 items-center">
          <MAvatar alt="JD" size="small" color="primary" class="mf-avatar" />
          <MAvatar alt="SM" size="small" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="LC" size="small" color="success" class="mf-avatar success" />
          <MAvatar alt="RW" size="small" color="warning" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Medium Avatars</h4>
        <div class="flex gap-4 items-center">
          <MAvatar alt="JD" size="medium" color="primary" class="mf-avatar" />
          <MAvatar alt="SM" size="medium" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="LC" size="medium" color="success" class="mf-avatar success" />
          <MAvatar alt="RW" size="medium" color="warning" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Large Avatars</h4>
        <div class="flex gap-6 items-center">
          <MAvatar alt="JD" size="large" color="primary" class="mf-avatar" />
          <MAvatar alt="SM" size="large" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="LC" size="large" color="success" class="mf-avatar success" />
          <MAvatar alt="RW" size="large" color="warning" />
        </div>
      </div>
    </div>
  `
});

export const Variants = () => ({
  components: { MAvatar },
  template: `
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Circular (Default)</h4>
        <div class="flex gap-4 items-center">
          <MAvatar alt="JD" variant="circular" color="primary" class="mf-avatar" />
          <MAvatar alt="SM" variant="circular" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="LC" variant="circular" color="success" class="mf-avatar success" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Rounded</h4>
        <div class="flex gap-4 items-center">
          <MAvatar alt="JD" variant="rounded" color="primary" class="mf-avatar" />
          <MAvatar alt="SM" variant="rounded" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="LC" variant="rounded" color="success" class="mf-avatar success" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Square</h4>
        <div class="flex gap-4 items-center">
          <MAvatar alt="JD" variant="square" color="primary" class="mf-avatar" />
          <MAvatar alt="SM" variant="square" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="LC" variant="square" color="success" class="mf-avatar success" />
        </div>
      </div>
    </div>
  `
});

export const Colors = () => ({
  components: { MAvatar },
  template: `
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Brand Colors</h4>
        <div class="flex gap-4 items-center">
          <MAvatar alt="P" color="primary" class="mf-avatar" />
          <MAvatar alt="S" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="Su" color="success" class="mf-avatar success" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">All Colors</h4>
        <div class="flex gap-4 items-center flex-wrap">
          <MAvatar alt="D" color="default" />
          <MAvatar alt="P" color="primary" class="mf-avatar" />
          <MAvatar alt="S" color="secondary" class="mf-avatar secondary" />
          <MAvatar alt="Su" color="success" class="mf-avatar success" />
          <MAvatar alt="W" color="warning" />
          <MAvatar alt="E" color="error" />
          <MAvatar alt="I" color="info" />
        </div>
      </div>
    </div>
  `
});

export const Playground = (args) => ({
  components: { MAvatar },
  setup() {
    return { args };
  },
  template: `
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Avatar Playground</h3>
        <p class="text-gray-600">Customize the avatar using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 inline-block">
        <MAvatar 
          v-bind="args"
          :class="getAvatarClass(args)"
        />
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Use the Controls panel to modify avatar properties.
      </div>
    </div>
  `,
  methods: {
    getAvatarClass(args) {
      if (args.color === 'primary') return 'mf-avatar';
      if (args.color === 'secondary') return 'mf-avatar secondary';
      if (args.color === 'success') return 'mf-avatar success';
      return '';
    }
  }
});

Playground.args = {
  src: '',
  alt: 'User',
  size: 'medium',
  color: 'primary',
  variant: 'circular'
};