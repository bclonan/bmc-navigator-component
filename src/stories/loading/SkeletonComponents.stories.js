import { ref, reactive } from 'vue';
import MSkeleton from '../../components/ui/MSkeleton.vue';
import MSkeletonGroup from '../../components/ui/MSkeletonGroup.vue';

export default {
  title: 'Loading & Motion System/Skeleton Components',
  component: MSkeleton,
  parameters: {
    docs: {
      description: {
        component: 'Skeleton loading components for creating placeholder content while data loads. Supports multiple variants and animation options.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['circular', 'rectangular', 'rounded', 'text', 'card', 'avatar', 'button', 'table-row', 'list-item']
    },
    animated: {
      control: { type: 'boolean' }
    },
    animationSpeed: {
      control: { type: 'select' },
      options: ['slow', 'normal', 'fast']
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'light', 'dark']
    }
  }
};

// Basic Skeleton Story
export const BasicSkeleton = {
  args: {
    variant: 'rectangular',
    width: '200px',
    height: '100px',
    animated: true,
    animationSpeed: 'normal',
    color: 'default'
  },
  render: (args) => ({
    components: { MSkeleton },
    setup() {
      return { args };
    },
    template: `<MSkeleton v-bind="args" />`
  })
};

// Text Skeleton Story
export const TextSkeleton = {
  render: () => ({
    components: { MSkeleton },
    template: `
      <div class="space-y-2 max-w-md">
        <MSkeleton variant="text" width="100%" height="20px" />
        <MSkeleton variant="text" width="85%" height="16px" />
        <MSkeleton variant="text" width="70%" height="16px" />
        <MSkeleton variant="text" width="90%" height="16px" />
      </div>
    `
  })
};

// Avatar and Button Skeletons
export const ComponentSkeletons = {
  render: () => ({
    components: { MSkeleton },
    template: `
      <div class="flex items-center gap-4 p-6">
        <MSkeleton variant="avatar" width="48px" height="48px" />
        <div class="flex-1 space-y-2">
          <MSkeleton variant="text" width="60%" height="16px" />
          <MSkeleton variant="text" width="40%" height="14px" />
        </div>
        <MSkeleton variant="button" width="80px" height="36px" />
      </div>
    `
  })
};

// Skeleton Groups Story
export const SkeletonGroups = {
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text-block', 'card', 'list', 'table', 'custom']
    }
  },
  args: {
    variant: 'card',
    animated: true,
    animationSpeed: 'normal',
    color: 'default'
  },
  render: (args) => ({
    components: { MSkeletonGroup },
    setup() {
      return { args };
    },
    template: `<MSkeletonGroup v-bind="args" />`
  })
};

// Financial Card Layout
export const FinancialCardLayout = {
  render: () => ({
    components: { MSkeleton },
    template: `
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg p-6">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-4">
          <MSkeleton variant="avatar" width="40px" height="40px" />
          <div class="flex-1">
            <MSkeleton variant="text" width="70%" height="16px" class="mb-1" />
            <MSkeleton variant="text" width="50%" height="12px" />
          </div>
        </div>
        
        <!-- Content -->
        <div class="space-y-3 mb-4">
          <div class="flex justify-between">
            <MSkeleton variant="text" width="40%" height="14px" />
            <MSkeleton variant="text" width="30%" height="14px" />
          </div>
          <div class="flex justify-between">
            <MSkeleton variant="text" width="35%" height="14px" />
            <MSkeleton variant="text" width="35%" height="14px" />
          </div>
          <MSkeleton variant="rectangular" width="100%" height="4px" />
        </div>
        
        <!-- Actions -->
        <div class="flex gap-2">
          <MSkeleton variant="button" width="80px" height="32px" />
          <MSkeleton variant="button" width="80px" height="32px" />
        </div>
      </div>
    `
  })
};

// Loan Application Table
export const LoanApplicationTable = {
  render: () => ({
    components: { MSkeleton },
    template: `
      <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <!-- Table Header -->
        <div class="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div class="flex gap-6">
            <MSkeleton variant="text" width="120px" height="14px" />
            <MSkeleton variant="text" width="100px" height="14px" />
            <MSkeleton variant="text" width="80px" height="14px" />
            <MSkeleton variant="text" width="100px" height="14px" />
            <MSkeleton variant="text" width="80px" height="14px" />
          </div>
        </div>
        
        <!-- Table Rows -->
        <div class="divide-y divide-gray-200">
          <div v-for="n in 5" :key="n" class="px-6 py-4">
            <div class="flex gap-6 items-center">
              <MSkeleton variant="text" width="120px" height="14px" />
              <MSkeleton variant="text" width="100px" height="14px" />
              <MSkeleton variant="text" width="80px" height="14px" />
              <MSkeleton variant="text" width="100px" height="14px" />
              <MSkeleton variant="rounded" width="80px" height="24px" />
            </div>
          </div>
        </div>
      </div>
    `
  })
};

// Different Animation Speeds
export const AnimationSpeeds = {
  render: () => ({
    components: { MSkeleton },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Slow Animation</h3>
          <MSkeleton variant="rectangular" width="300px" height="60px" animation-speed="slow" />
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Normal Animation</h3>
          <MSkeleton variant="rectangular" width="300px" height="60px" animation-speed="normal" />
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Fast Animation</h3>
          <MSkeleton variant="rectangular" width="300px" height="60px" animation-speed="fast" />
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">No Animation (Pulse)</h3>
          <MSkeleton variant="rectangular" width="300px" height="60px" :animated="false" />
        </div>
      </div>
    `
  })
};

// Color Themes
export const ColorThemes = {
  render: () => ({
    components: { MSkeleton },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Default Theme</h3>
          <MSkeleton variant="rectangular" width="300px" height="60px" color="default" />
        </div>
        
        <div>
          <h3 class="text-sm font-medium text-gray-700 mb-2">Light Theme</h3>
          <MSkeleton variant="rectangular" width="300px" height="60px" color="light" />
        </div>
        
        <div class="bg-gray-800 p-4 rounded">
          <h3 class="text-sm font-medium text-white mb-2">Dark Theme</h3>
          <MSkeleton variant="rectangular" width="300px" height="60px" color="dark" />
        </div>
      </div>
    `
  })
};

// Interactive Demo
export const InteractiveDemo = {
  render: () => ({
    components: { MSkeleton, MSkeletonGroup },
    setup() {
      const settings = reactive({
        variant: 'card',
        animated: true,
        animationSpeed: 'normal',
        color: 'default',
        showGroup: true
      });
      
      const variants = ['text-block', 'card', 'list', 'table'];
      const speeds = ['slow', 'normal', 'fast'];
      const colors = ['default', 'light', 'dark'];
      
      return {
        settings,
        variants,
        speeds,
        colors
      };
    },
    template: `
      <div class="space-y-6">
        <!-- Controls -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="font-medium mb-4">Skeleton Settings</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <select v-model="settings.variant" class="w-full p-2 border border-gray-300 rounded text-sm">
                <option v-for="variant in variants" :key="variant" :value="variant">
                  {{ variant }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Speed</label>
              <select v-model="settings.animationSpeed" class="w-full p-2 border border-gray-300 rounded text-sm">
                <option v-for="speed in speeds" :key="speed" :value="speed">
                  {{ speed }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <select v-model="settings.color" class="w-full p-2 border border-gray-300 rounded text-sm">
                <option v-for="color in colors" :key="color" :value="color">
                  {{ color }}
                </option>
              </select>
            </div>
            
            <div class="flex items-end">
              <label class="flex items-center">
                <input v-model="settings.animated" type="checkbox" class="mr-2">
                <span class="text-sm">Animated</span>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Preview -->
        <div class="border border-gray-200 rounded-lg p-6" :class="settings.color === 'dark' ? 'bg-gray-800' : 'bg-white'">
          <h3 class="font-medium mb-4" :class="settings.color === 'dark' ? 'text-white' : 'text-gray-900'">
            Preview: {{ settings.variant }} skeleton
          </h3>
          
          <MSkeletonGroup
            :variant="settings.variant"
            :animated="settings.animated"
            :animation-speed="settings.animationSpeed"
            :color="settings.color"
            :lines="3"
            :items="3"
            :rows="4"
            :columns="4"
            :show-avatar="true"
            :show-image="settings.variant === 'card'"
            :show-actions="settings.variant === 'list'"
          />
        </div>
      </div>
    `
  })
};
