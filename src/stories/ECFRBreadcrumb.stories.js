import ECFRBreadcrumb from '../components/ECFRBreadcrumb.vue';

export default {
  title: 'eCFR/ECFRBreadcrumb',
  component: ECFRBreadcrumb,
  tags: ['autodocs'],
  argTypes: {
    path: {
      control: 'object',
      description: 'The breadcrumb path array containing the hierarchy'
    },
    darkMode: {
      control: 'boolean',
      description: 'Whether to display the breadcrumb in dark mode'
    },
    options: {
      control: 'object',
      description: 'Configuration options for the breadcrumb'
    }
  }
};

// Sample breadcrumb path
const samplePath = [
  { id: 'home', title: 'Home', type: 'root' },
  { id: 'title-1', title: 'General Provisions', type: 'title', number: '1' },
  { id: 'part-1', title: 'Definitions', type: 'part', number: '1' },
  { id: 'section-1-1', title: 'Scope and Purpose', type: 'section', number: '1.1' }
];

// Standard Breadcrumb
export const Standard = {
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 3,
      maxVisible: 4,
      type: 'standard',
      separatorType: 'icon'
    }
  }
};

// Dark Mode Breadcrumb
export const DarkMode = {
  args: {
    path: samplePath,
    darkMode: true,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 3,
      maxVisible: 4,
      type: 'standard',
      separatorType: 'icon'
    }
  }
};

// Scrollable Breadcrumb
export const Scrollable = {
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: false,
      type: 'scrollable',
      separatorType: 'icon'
    }
  }
};

// Compact Breadcrumb
export const Compact = {
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 1,
      maxVisible: 2,
      type: 'standard',
      separatorType: 'text',
      style: 'compact'
    }
  }
};

// Very Long Path
export const LongPath = {
  args: {
    path: [
      { id: 'home', title: 'Home', type: 'root' },
      { id: 'title-1', title: 'General Provisions', type: 'title', number: '1' },
      { id: 'part-1', title: 'Definitions', type: 'part', number: '1' },
      { id: 'subpart-a', title: 'General Definitions', type: 'subpart', number: 'A' },
      { id: 'section-1-1', title: 'Scope and Purpose', type: 'section', number: '1.1' },
      { id: 'paragraph-a', title: 'General Scope', type: 'paragraph', number: 'a' },
      { id: 'subparagraph-1', title: 'Application', type: 'subparagraph', number: '1' }
    ],
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 2,
      maxVisible: 3,
      type: 'standard',
      separatorType: 'icon'
    }
  }
};

// With Custom Styling
export const CustomStyling = {
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 3,
      maxVisible: 4,
      type: 'standard',
      separatorType: 'icon',
      customClasses: {
        container: 'bg-indigo-100 p-3 rounded-lg',
        item: 'text-indigo-700 hover:text-indigo-900',
        separator: 'text-indigo-400',
        current: 'font-bold text-indigo-800'
      }
    }
  }
};