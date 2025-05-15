import ECFRNavigator from '../components/ECFRNavigator.vue';

export default {
  title: 'eCFR/Features/ViewModes',
  component: ECFRNavigator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Examples showcasing the different view modes available in the ECFRNavigator component.'
      }
    }
  },
  decorators: [
    () => ({
      template: '<div style="height: 650px; border: 1px solid #ccc; border-radius: 4px;"><story /></div>'
    })
  ]
};

// Sample data for view mode demonstrations
const viewModeData = [
  {
    id: 'title-1',
    type: 'title',
    number: '1',
    title: 'General Provisions',
    children: [
      {
        id: 'part-1-1',
        type: 'part',
        number: '1',
        title: 'Definitions and Scope',
        children: [
          {
            id: 'section-1-1-1',
            type: 'section',
            number: '1.1',
            title: 'Definitions',
            content: '<p>This section contains definitions of key terms used throughout the regulatory framework.</p><p>The following terms have the meanings provided below unless otherwise specified in a specific context:</p><ul><li><strong>Authority</strong>: A governmental body with regulatory power</li><li><strong>Regulation</strong>: A rule or directive made and maintained by an authority</li></ul>',
          },
          {
            id: 'section-1-1-2',
            type: 'section',
            number: '1.2',
            title: 'Scope of Regulations',
            content: '<p>This section defines the scope and applicability of the regulations contained within this title.</p><p>These regulations apply to all entities under federal jurisdiction unless specifically exempted by statute or executive order.</p>',
          }
        ]
      },
      {
        id: 'part-1-2',
        type: 'part',
        number: '2',
        title: 'Administrative Requirements',
        children: [
          {
            id: 'section-1-2-1',
            type: 'section',
            number: '2.1',
            title: 'Documentation Requirements',
            content: '<p>This section outlines the documentation requirements for regulatory compliance.</p><p>All regulated entities must maintain records for a minimum of 7 years and make such records available for inspection upon request by authorized officials.</p>',
          }
        ]
      }
    ]
  }
];

// Standard View Mode
export const StandardViewMode = {
  args: {
    items: viewModeData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard view mode provides a balanced display with moderate spacing, showing type icons and identifiers. This is the default view mode and is suitable for most use cases.'
      }
    }
  }
};

// Compact View Mode
export const CompactViewMode = {
  args: {
    items: viewModeData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'compact',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'tight'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact view mode is optimized for dense navigation with smaller text and reduced spacing. This is ideal for showing more content in limited space or for sidebar navigation.'
      }
    }
  }
};

// Detailed View Mode
export const DetailedViewMode = {
  args: {
    items: viewModeData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'detailed',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'loose',
        maxDescriptionLength: 150
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed view mode provides an enhanced view with comprehensive information and content previews. This is useful for getting a better understanding of the content without navigating into items.'
      }
    }
  }
};

// Styleless View Mode
export const StylelessViewMode = {
  args: {
    items: viewModeData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'styleless',
        showDescription: false,
        showMetadataBadges: false
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Styleless view mode provides minimal styling for custom integrations. This allows you to apply your own styling to the component structure.'
      }
    }
  }
};

// Dark Theme (using Standard view mode)
export const DarkTheme = {
  args: {
    items: viewModeData,
    options: {
      showBreadcrumb: true,
      theme: 'dark',
      display: {
        viewMode: 'standard',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'The component can be displayed with a dark theme for better integration with dark-themed applications or for reduced eye strain in low-light environments.'
      }
    }
  }
};

// Interactive View Mode Switcher
export const ViewModeSwitcher = {
  render: (args) => ({
    components: { ECFRNavigator },
    setup() {
      return { args };
    },
    template: `
      <div>
        <div class="p-3 bg-gray-100 mb-4 rounded">
          <div class="font-medium mb-2">View Mode Controller</div>
          <div class="flex items-center space-x-2 mb-2">
            <span class="text-sm">Mode:</span>
            <select 
              v-model="currentOptions.display.viewMode" 
              class="text-sm border rounded px-2 py-1"
              @change="updateOptions"
            >
              <option value="standard">Standard</option>
              <option value="compact">Compact</option>
              <option value="detailed">Detailed</option>
              <option value="styleless">Styleless</option>
            </select>
            
            <span class="text-sm ml-4">Theme:</span>
            <select 
              v-model="currentOptions.theme" 
              class="text-sm border rounded px-2 py-1"
              @change="updateOptions"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            
            <span class="text-sm ml-4">Spacing:</span>
            <select 
              v-model="currentOptions.display.itemSpacing" 
              class="text-sm border rounded px-2 py-1"
              @change="updateOptions"
            >
              <option value="tight">Tight</option>
              <option value="medium">Medium</option>
              <option value="loose">Loose</option>
            </select>
          </div>
          
          <div class="flex flex-wrap items-center space-x-4">
            <label class="flex items-center text-sm">
              <input 
                type="checkbox" 
                v-model="currentOptions.display.showDescription" 
                @change="updateOptions"
                class="mr-1"
              >
              Show Description
            </label>
            
            <label class="flex items-center text-sm">
              <input 
                type="checkbox" 
                v-model="currentOptions.display.showMetadataBadges" 
                @change="updateOptions"
                class="mr-1"
              >
              Show Metadata Badges
            </label>
            
            <label class="flex items-center text-sm">
              <input 
                type="checkbox" 
                v-model="currentOptions.showBreadcrumb" 
                @change="updateOptions"
                class="mr-1"
              >
              Show Breadcrumb
            </label>
          </div>
        </div>
        
        <ECFRNavigator 
          :items="args.items"
          :options="currentOptions"
          @update:options="handleOptionsUpdate"
        />
      </div>
    `,
    data() {
      return {
        currentOptions: {
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'standard',
            showDescription: false,
            showMetadataBadges: true,
            itemSpacing: 'medium'
          }
        }
      };
    },
    methods: {
      updateOptions() {
        // Create a deep clone to ensure reactivity
        this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions));
      },
      handleOptionsUpdate(newOptions) {
        this.currentOptions = newOptions;
      }
    }
  }),
  args: {
    items: viewModeData
  },
  parameters: {
    docs: {
      description: {
        story: 'This interactive example allows you to switch between different view modes and see how the component appearance changes in real-time.'
      }
    }
  }
};