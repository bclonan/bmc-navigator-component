import MButton from '../../components/ui/MButton.vue';

export default {
  title: 'UI/Actions/Button',
  component: MButton,
  parameters: {
    docs: {
      description: {
        component: 'Material Design button component with multiple variants, sizes, and colors. Supports icons, loading states, and accessibility features.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text', 'elevated', 'tonal']
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl']
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral']
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'square', 'pill']
    },
    onClick: { action: 'clicked' }
  }
};

export const Default = {
  args: {
    text: 'Button',
    variant: 'filled',
    color: 'primary'
  }
};

export const Variants = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="space-y-4">
        <div class="space-x-4">
          <MButton variant="filled" text="Filled" />
          <MButton variant="outlined" text="Outlined" />
          <MButton variant="text" text="Text" />
          <MButton variant="elevated" text="Elevated" />
          <MButton variant="tonal" text="Tonal" />
        </div>
      </div>
    `
  })
};

export const Sizes = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="flex items-end space-x-4">
        <MButton size="xs" text="Extra Small" />
        <MButton size="sm" text="Small" />
        <MButton size="md" text="Medium" />
        <MButton size="lg" text="Large" />
        <MButton size="xl" text="Extra Large" />
      </div>
    `
  })
};

export const Colors = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <h3 class="font-semibold">Filled</h3>
          <div class="space-x-2">
            <MButton color="primary" text="Primary" />
            <MButton color="secondary" text="Secondary" />
            <MButton color="success" text="Success" />
            <MButton color="warning" text="Warning" />
          </div>
          <div class="space-x-2">
            <MButton color="error" text="Error" />
            <MButton color="info" text="Info" />
            <MButton color="neutral" text="Neutral" />
          </div>
        </div>
        
        <div class="space-y-2">
          <h3 class="font-semibold">Outlined</h3>
          <div class="space-x-2">
            <MButton variant="outlined" color="primary" text="Primary" />
            <MButton variant="outlined" color="secondary" text="Secondary" />
            <MButton variant="outlined" color="success" text="Success" />
            <MButton variant="outlined" color="warning" text="Warning" />
          </div>
          <div class="space-x-2">
            <MButton variant="outlined" color="error" text="Error" />
            <MButton variant="outlined" color="info" text="Info" />
            <MButton variant="outlined" color="neutral" text="Neutral" />
          </div>
        </div>
      </div>
    `
  })
};

export const WithIcons = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="space-x-4">
        <MButton prepend-icon="fas fa-plus" text="Add Item" />
        <MButton append-icon="fas fa-arrow-right" text="Continue" />
        <MButton prepend-icon="fas fa-download" append-icon="fas fa-external-link" text="Download" />
      </div>
    `
  })
};

export const IconOnly = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="space-x-4">
        <MButton icon-only prepend-icon="fas fa-heart" size="sm" />
        <MButton icon-only prepend-icon="fas fa-share" />
        <MButton icon-only prepend-icon="fas fa-bookmark" size="lg" />
        <MButton variant="outlined" icon-only prepend-icon="fas fa-star" />
      </div>
    `
  })
};

export const LoadingStates = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="space-x-4">
        <MButton :loading="true" text="Loading..." />
        <MButton variant="outlined" :loading="true" text="Processing" />
        <MButton variant="text" :loading="true" text="Saving" />
      </div>
    `
  })
};

export const DisabledStates = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="space-x-4">
        <MButton :disabled="true" text="Disabled" />
        <MButton variant="outlined" :disabled="true" text="Disabled" />
        <MButton variant="text" :disabled="true" text="Disabled" />
      </div>
    `
  })
};

export const Shapes = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="space-x-4">
        <MButton shape="rounded" text="Rounded" />
        <MButton shape="square" text="Square" />
        <MButton shape="pill" text="Pill" />
      </div>
    `
  })
};

export const FullWidth = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="max-w-md space-y-4">
        <MButton :full-width="true" text="Full Width Button" />
        <MButton variant="outlined" :full-width="true" text="Full Width Outlined" />
      </div>
    `
  })
};

export const MarinerFinanceExample = {
  render: () => ({
    components: { MButton },
    template: `
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Loan Application</h2>
        
        <div class="space-y-4">
          <!-- Primary Actions -->
          <MButton 
            :full-width="true" 
            text="Apply for Loan" 
            color="primary" 
            size="lg"
          />
          
          <!-- Secondary Actions -->
          <div class="grid grid-cols-2 gap-3">
            <MButton 
              variant="outlined" 
              text="Calculate Payment" 
              prepend-icon="fas fa-calculator"
            />
            <MButton 
              variant="outlined" 
              text="View Rates" 
              prepend-icon="fas fa-chart-line"
            />
          </div>
          
          <!-- Utility Actions -->
          <div class="flex justify-between">
            <MButton 
              variant="text" 
              text="Need Help?" 
              size="sm"
              prepend-icon="fas fa-question-circle"
            />
            <MButton 
              variant="text" 
              text="Contact Us" 
              size="sm"
              append-icon="fas fa-phone"
            />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example implementation showing how buttons might be used in a Mariner Finance loan application interface.'
      }
    }
  }
};