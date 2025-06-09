import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';

export default {
  title: 'Material UI/MCard',
  component: MCard,
  parameters: {
    docs: {
      description: {
        component: 'Material Design card component for displaying content in a structured layout with support for headers, media, content, and actions.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled', 'elevated']
    },
    elevation: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6, 8, 12, 16, 24]
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl']
    },
    rounded: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full']
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark']
    }
  }
};

export const Default = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle'
  },
  render: (args) => ({
    components: { MCard },
    setup() {
      return { args };
    },
    template: `
      <MCard v-bind="args">
        <p>This is the main content of the card. It can contain any type of content including text, images, or other components.</p>
      </MCard>
    `
  })
};

export const Variants = {
  render: () => ({
    components: { MCard },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <MCard variant="default" title="Default Card">
          <p>Default card with standard styling.</p>
        </MCard>
        
        <MCard variant="outlined" title="Outlined Card">
          <p>Card with border outline.</p>
        </MCard>
        
        <MCard variant="filled" title="Filled Card">
          <p>Card with filled background.</p>
        </MCard>
        
        <MCard variant="elevated" title="Elevated Card">
          <p>Card with enhanced shadow elevation.</p>
        </MCard>
      </div>
    `
  })
};

export const Elevations = {
  render: () => ({
    components: { MCard },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <MCard elevation="1" title="Elevation 1">
          <p>Subtle shadow</p>
        </MCard>
        
        <MCard elevation="4" title="Elevation 4">
          <p>Medium shadow</p>
        </MCard>
        
        <MCard elevation="8" title="Elevation 8">
          <p>Strong shadow</p>
        </MCard>
      </div>
    `
  })
};

export const WithMedia = {
  render: () => ({
    components: { MCard, MButton },
    template: `
      <div class="max-w-sm">
        <MCard 
          title="Beautiful Landscape" 
          subtitle="Nature Photography"
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          image-alt="Mountain landscape"
        >
          <p>A stunning view of mountains during golden hour, captured in pristine detail.</p>
          
          <template #actions>
            <MButton variant="text" text="Share" />
            <MButton variant="text" text="Learn More" />
          </template>
        </MCard>
      </div>
    `
  })
};

export const WithActions = {
  render: () => ({
    components: { MCard, MButton },
    template: `
      <div class="max-w-md">
        <MCard title="Complete Your Profile" subtitle="2 of 5 steps completed">
          <p>Add your personal information to unlock more features and get personalized recommendations.</p>
          
          <template #actions>
            <MButton variant="text" text="Skip" />
            <MButton text="Continue" />
          </template>
        </MCard>
      </div>
    `
  })
};

export const ClickableCard = {
  render: () => ({
    components: { MCard },
    template: `
      <div class="grid grid-cols-2 gap-4">
        <MCard 
          :clickable="true" 
          title="Click Me!" 
          subtitle="Interactive card"
          @click="handleClick"
        >
          <p>This card is clickable and will show hover effects.</p>
        </MCard>
        
        <MCard title="Regular Card" subtitle="Non-interactive">
          <p>This card is not clickable.</p>
        </MCard>
      </div>
    `,
    methods: {
      handleClick() {
        alert('Card clicked!');
      }
    }
  })
};

export const CustomSlots = {
  render: () => ({
    components: { MCard, MButton },
    template: `
      <div class="max-w-md">
        <MCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Custom Header</h3>
                <p class="text-sm text-gray-600">With custom layout</p>
              </div>
              <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
            </div>
          </template>
          
          <p>This card uses custom header slot for more complex layouts.</p>
          
          <template #actions>
            <div class="flex justify-between w-full">
              <MButton variant="outlined" text="Cancel" />
              <MButton text="Save Changes" />
            </div>
          </template>
        </MCard>
      </div>
    `
  })
};

export const DarkMode = {
  render: () => ({
    components: { MCard, MButton },
    template: `
      <div class="bg-gray-900 p-8">
        <div class="grid grid-cols-2 gap-4">
          <MCard 
            theme="dark" 
            title="Dark Mode Card" 
            subtitle="Styled for dark theme"
          >
            <p>This card is optimized for dark backgrounds with appropriate text colors.</p>
            
            <template #actions>
              <MButton variant="text" text="Action" />
            </template>
          </MCard>
          
          <MCard 
            theme="dark" 
            variant="outlined"
            title="Outlined Dark" 
            subtitle="With border"
          >
            <p>Dark mode with outlined variant.</p>
          </MCard>
        </div>
      </div>
    `
  })
};

export const MarinerFinanceDashboard = {
  render: () => ({
    components: { MCard, MButton },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Loan Application Status -->
        <MCard title="Current Application" subtitle="Application #LN-2024-001">
          <div class="space-y-3">
            <div class="flex justify-between">
              <span>Status:</span>
              <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Under Review</span>
            </div>
            <div class="flex justify-between">
              <span>Amount:</span>
              <span class="font-semibold">$25,000</span>
            </div>
            <div class="flex justify-between">
              <span>Term:</span>
              <span>60 months</span>
            </div>
          </div>
          
          <template #actions>
            <MButton variant="text" text="View Details" size="sm" />
            <MButton text="Update Info" size="sm" />
          </template>
        </MCard>

        <!-- Quick Actions -->
        <MCard title="Quick Actions" subtitle="Common tasks">
          <div class="space-y-2">
            <MButton :full-width="true" variant="outlined" text="Make a Payment" prepend-icon="fas fa-credit-card" />
            <MButton :full-width="true" variant="outlined" text="Request Extension" prepend-icon="fas fa-clock" />
            <MButton :full-width="true" variant="outlined" text="Update Contact Info" prepend-icon="fas fa-user-edit" />
          </div>
        </MCard>

        <!-- Payment Summary -->
        <MCard title="Payment Summary" subtitle="Next payment due March 15">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Amount Due:</span>
              <span class="font-bold text-lg">$487.50</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Principal:</span>
              <span>$350.00</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Interest:</span>
              <span>$137.50</span>
            </div>
          </div>
          
          <template #actions>
            <MButton :full-width="true" text="Pay Now" color="primary" />
          </template>
        </MCard>

        <!-- Account Overview -->
        <MCard title="Account Overview" subtitle="Loan #ML-789456">
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Remaining Balance:</span>
              <span class="font-semibold">$18,750.00</span>
            </div>
            <div class="flex justify-between">
              <span>Payments Made:</span>
              <span>18 of 60</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 30%"></div>
            </div>
            <p class="text-xs text-gray-600">30% completed</p>
          </div>
        </MCard>

        <!-- Support -->
        <MCard title="Need Help?" subtitle="We're here to assist">
          <p class="text-sm text-gray-600 mb-3">
            Have questions about your loan or need assistance with payments?
          </p>
          
          <template #actions>
            <MButton variant="outlined" text="Live Chat" prepend-icon="fas fa-comments" />
            <MButton variant="outlined" text="Call Us" prepend-icon="fas fa-phone" />
          </template>
        </MCard>

        <!-- Special Offers -->
        <MCard 
          title="Special Offer" 
          subtitle="Limited time"
          variant="elevated"
          :clickable="true"
        >
          <p class="text-sm mb-2">
            <strong>Refinance your current loan</strong> and potentially save on your monthly payments.
          </p>
          <p class="text-xs text-gray-600">*Subject to credit approval</p>
          
          <template #actions>
            <MButton text="Learn More" size="sm" />
          </template>
        </MCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example dashboard layout for Mariner Finance showing loan management, payments, and customer service cards.'
      }
    }
  }
};