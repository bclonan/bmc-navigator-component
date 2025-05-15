import ECFRSection from '../components/ECFRSection.vue';

export default {
  title: 'eCFR/ECFRSection',
  component: ECFRSection,
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: 'The item to be displayed'
    },
    index: {
      control: 'number',
      description: 'Index of the item in its parent list'
    },
    level: {
      control: 'number',
      description: 'Nesting level (depth) of the item'
    },
    darkMode: {
      control: 'boolean',
      description: 'Whether to display in dark mode'
    },
    isSelected: {
      control: 'boolean',
      description: 'Whether the item is currently selected'
    },
    isExpanded: {
      control: 'boolean',
      description: 'Whether the item is expanded (if it has children)'
    },
    options: {
      control: 'object',
      description: 'Display options for the section'
    },
    hasMetadata: {
      control: 'boolean',
      description: 'Whether the item has associated metadata'
    }
  },
  decorators: [
    () => ({
      template: '<div class="p-4 max-w-3xl mx-auto"><story /></div>'
    })
  ]
};

// Standard section item
const standardItem = {
  id: 'section-1',
  type: 'section',
  number: '1.1',
  title: 'General Requirements',
  content: '<p>This section outlines the general requirements for regulatory compliance.</p>',
  agency: 'Department of Regulation',
  updatedDate: '2023-05-15'
};

// Item with children
const itemWithChildren = {
  id: 'part-1',
  type: 'part',
  number: '1',
  title: 'Regulatory Framework',
  children: [
    {
      id: 'section-1-1',
      type: 'section',
      number: '1.1',
      title: 'Scope and Definitions',
      content: '<p>Definitions of key terms used in this part.</p>'
    },
    {
      id: 'section-1-2',
      type: 'section',
      number: '1.2',
      title: 'Applicability',
      content: '<p>Areas to which this part applies.</p>'
    }
  ]
};

// Standard display
export const Standard = {
  args: {
    item: standardItem,
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        showTypeIcon: true
      }
    },
    hasMetadata: false
  }
};

// With children
export const WithChildren = {
  args: {
    item: itemWithChildren,
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        showTypeIcon: true
      }
    },
    hasMetadata: false
  }
};

// Selected state
export const Selected = {
  args: {
    item: standardItem,
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: true,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        showTypeIcon: true
      }
    },
    hasMetadata: false
  }
};

// Expanded state (for items with children)
export const Expanded = {
  args: {
    item: itemWithChildren,
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: false,
    isExpanded: true,
    options: {
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        showTypeIcon: true
      }
    },
    hasMetadata: false
  }
};

// Nested child (level > 0)
export const NestedChild = {
  args: {
    item: standardItem,
    index: 0,
    level: 2,
    darkMode: false,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        showTypeIcon: true,
        indentItems: true
      }
    },
    hasMetadata: false
  }
};

// With metadata
export const WithMetadata = {
  args: {
    item: standardItem,
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        showTypeIcon: true
      }
    },
    hasMetadata: true
  }
};

// Compact view mode
export const CompactViewMode = {
  args: {
    item: standardItem,
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'compact',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'tight',
        showTypeIcon: false
      }
    },
    hasMetadata: false
  }
};

// Detailed view mode
export const DetailedViewMode = {
  args: {
    item: {
      ...standardItem,
      content: '<p>This section outlines the general requirements for regulatory compliance. All entities subject to these regulations must adhere to the standards set forth in this section. Compliance reports must be submitted annually by March 31st.</p><p>Additional documentation may be required for high-risk activities as defined in Appendix B.</p>'
    },
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'detailed',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'loose',
        showTypeIcon: true,
        maxDescriptionLength: 200
      }
    },
    hasMetadata: false
  }
};

// Styleless view mode
export const StylelessViewMode = {
  args: {
    item: standardItem,
    index: 0,
    level: 0,
    darkMode: false,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'styleless',
        showDescription: true,
        showMetadataBadges: false,
        itemSpacing: 'medium',
        showTypeIcon: true
      }
    },
    hasMetadata: false
  }
};

// Dark mode
export const DarkMode = {
  args: {
    item: standardItem,
    index: 0,
    level: 0,
    darkMode: true,
    isSelected: false,
    isExpanded: false,
    options: {
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        showTypeIcon: true
      }
    },
    hasMetadata: false
  }
};