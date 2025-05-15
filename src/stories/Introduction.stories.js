import ECFRNavigator from '../components/ECFRNavigator.vue';

export default {
  title: 'eCFR/Introduction',
  component: ECFRNavigator,
  parameters: {
    docs: {
      description: {
        component: `
# ECFRNavigator Component

A lightweight, reusable Vue 3 component with Pinia integration for navigating hierarchical eCFR-style content in existing Vue applications.

## Features

- 📚 **Hierarchical Navigation**: Navigate complex nested document structures
- 🔖 **Breadcrumb Trail**: Always see your current location in the hierarchy
- 🔍 **Advanced Search**: Find content with fuzzy matching and adjustable sensitivity
- 🎨 **Tailwind CSS Styling**: Clean, minimal interface with Tailwind CSS
- 🧩 **Expandable Sections**: Collapsible sections for better content organization
- 📱 **Responsive Design**: Works on all screen sizes
- 🔌 **Simple Integration**: Easy to integrate into existing Vue applications
- 🔄 **Pinia State Management**: Lightweight state management
- 🌙 **Light/Dark Themes**: Support for light and dark modes
- 📋 **Metadata Support**: Attach custom data to items with extensible processors
- 🔗 **External Resources**: Connect to external resources like XML source files
- 🎯 **Render Targets**: Specify rendering locations for content display
- 🎚️ **Multiple View Modes**: Compact, standard, detailed, and styleless modes
- 🏷️ **Enhanced Filtering**: Filter by type, agency, date range, and keywords
- 💬 **Preview Tooltips**: Interactive previews on search results
- 🎬 **Animated UI**: Smooth transitions for better user experience
        `
      }
    }
  }
};

// Sample data for overview example
const sampleData = [
  {
    id: 'title-1',
    type: 'title',
    number: '1',
    title: 'General Provisions',
    children: [
      {
        id: 'part-1',
        type: 'part',
        number: '1',
        title: 'Definitions and Scope',
        children: [
          {
            id: 'section-1-1',
            type: 'section',
            number: '1.1',
            title: 'Definitions',
            content: '<p>This section contains definitions of key terms used throughout the regulatory framework.</p>',
          },
          {
            id: 'section-1-2',
            type: 'section',
            number: '1.2',
            title: 'Scope of Regulations',
            content: '<p>This section defines the scope and applicability of the regulations contained within this title.</p>',
          }
        ]
      }
    ]
  },
  {
    id: 'title-2',
    type: 'title',
    number: '2',
    title: 'Environmental Regulations',
    children: [
      {
        id: 'part-2-1',
        type: 'part',
        number: '1',
        title: 'Air Quality Standards',
        children: [
          {
            id: 'section-2-1-1',
            type: 'section',
            number: '1.1',
            title: 'Ambient Air Quality',
            content: '<p>This section establishes the national ambient air quality standards.</p>',
          }
        ]
      }
    ]
  }
];

// Component overview example
export const Overview = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: `
## Quick Start

\`\`\`javascript
// Import in your Vue component
import { ECFRNavigator } from 'ecfr-navigator';

export default {
  components: {
    ECFRNavigator
  },
  data() {
    return {
      // Configuration options
      navigatorOptions: {
        showBreadcrumb: true,
        theme: 'light',
        display: {
          viewMode: 'standard',
          showDescription: true,
          showMetadataBadges: true
        }
      },
      
      // Your hierarchical data
      items: [
        {
          id: 'title-1',
          type: 'title',
          number: '1',
          title: 'General Provisions',
          children: [
            // Nested items...
          ]
        }
      ]
    };
  }
};
\`\`\`

## Component Structure

The ECFRNavigator component is built from several smaller components:

1. **ECFRNavigator**: The main component that orchestrates everything
2. **ECFRBreadcrumb**: Displays the current navigation path
3. **ECFRSection**: Renders individual items in the hierarchy

## View Modes

The component supports multiple view modes:

- **Standard Mode (Default)**: Balanced information display
- **Compact Mode**: Optimized for dense navigation
- **Detailed Mode**: Enhanced view with content previews
- **Styleless Mode**: Minimal styling for custom integrations
        `
      }
    }
  }
};

// Data structure example
export const DataStructure = {
  render: () => ({
    template: `
      <div class="p-6 bg-gray-100 rounded-lg text-left">
        <h3 class="text-lg font-medium mb-4">Expected Data Structure</h3>
        <pre class="text-xs bg-white p-4 rounded overflow-auto max-h-96">
{
  id: 'unique-id',              // Required: Unique identifier
  title: 'Item Title',          // Required: Title text to display
  subtitle: 'Optional Subtitle', // Optional: Subtitle text
  content: '&lt;p&gt;HTML content&lt;/p&gt;', // Optional: HTML content for this item
  type: 'title',                // Optional: Type of item (title, part, section, etc.)
  number: '1',                  // Optional: Number identifier (e.g., '1', '1.1')
  citationPrefix: 'Title',      // Optional: Override the display prefix
  agency: 'Agency Name',        // Optional: Agency associated with this item
  updatedDate: '2023-05-15',    // Optional: Date of last update (for filtering)
  keywords: ['keyword1', 'keyword2'], // Optional: Keywords for filtering
  children: [                   // Optional: Child items (nested)
    {
      id: 'child-1',
      title: 'Child Item',
      // ... same structure as parent
    }
  ]
}
        </pre>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
## Required Data Structure

The component expects an array of items with the structure shown here. Only the \`id\` and \`title\` fields are required, all other fields are optional but enable additional functionality when provided.

The hierarchical structure is created using the \`children\` property, which can contain an array of child items with the same structure.
        `
      }
    }
  }
};

// Component API
export const ComponentAPI = {
  render: () => ({
    template: `
      <div class="p-6 bg-gray-100 rounded-lg text-left">
        <h3 class="text-lg font-medium mb-4">Component API Reference</h3>
        
        <h4 class="font-medium mt-4 mb-2">Props</h4>
        <table class="w-full text-sm bg-white rounded overflow-hidden">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2 text-left">Prop</th>
              <th class="p-2 text-left">Type</th>
              <th class="p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">items</td>
              <td class="p-2">Array</td>
              <td class="p-2"><strong>Required.</strong> Hierarchical data structure of items to display</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">options</td>
              <td class="p-2">Object</td>
              <td class="p-2">Configuration options for the navigator</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">itemMetadata</td>
              <td class="p-2">Object</td>
              <td class="p-2">Pre-populated metadata for items, keyed by item ID</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">initialSelectedItemId</td>
              <td class="p-2">String</td>
              <td class="p-2">ID of the item to initially select and expand to</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">loading</td>
              <td class="p-2">Boolean</td>
              <td class="p-2">Show loading state for the entire component</td>
            </tr>
          </tbody>
        </table>
        
        <h4 class="font-medium mt-6 mb-2">Events</h4>
        <table class="w-full text-sm bg-white rounded overflow-hidden">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2 text-left">Event</th>
              <th class="p-2 text-left">Payload</th>
              <th class="p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">item-selected</td>
              <td class="p-2">Object</td>
              <td class="p-2">Fired when an item is selected, containing item, path, and metadata</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">path-changed</td>
              <td class="p-2">Array</td>
              <td class="p-2">Fired when the navigation path changes</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">search-completed</td>
              <td class="p-2">Object</td>
              <td class="p-2">Fired when a search completes with results and filters</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">update:options</td>
              <td class="p-2">Object</td>
              <td class="p-2">Fired when options change internally (for v-model support)</td>
            </tr>
            <tr class="border-b border-gray-100">
              <td class="p-2 font-mono">metadata-changed</td>
              <td class="p-2">Object</td>
              <td class="p-2">Fired when item metadata changes</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
## Component Reference

This story provides a reference of all props, events, and configuration options available for the ECFRNavigator component.

For detailed examples of how to use these APIs, see the other stories in this Storybook.
        `
      }
    }
  }
};