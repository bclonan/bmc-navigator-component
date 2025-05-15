import ECFRNavigator from '../components/ECFRNavigator.vue';
import { useECFRStore } from '../stores/ecfr';

// Sample data for demonstration
const sampleData = [
  {
    id: 'title-1',
    type: 'title',
    number: '1',
    title: 'General Provisions',
    agency: 'Office of Federal Regulations',
    updatedDate: '2023-05-15',
    children: [
      {
        id: 'part-1',
        type: 'part',
        number: '1',
        title: 'Definitions',
        agency: 'Office of Federal Regulations',
        updatedDate: '2023-04-10',
        children: [
          {
            id: 'section-1-1',
            type: 'section',
            number: '1.1',
            title: 'Scope and Purpose',
            content: '<p>This section defines the scope and purpose of these regulations. The purpose of this regulation is to provide a structured framework for federal regulatory content and ensure consistency across government regulations.</p><p>All definitions and interpretations should be considered within the context provided by this introductory section.</p>',
            agency: 'Office of Federal Regulations',
            updatedDate: '2023-03-22',
          },
          {
            id: 'section-1-2',
            type: 'section',
            number: '1.2',
            title: 'Terminology',
            content: '<p>This section provides definitions for terminology used throughout the regulations. Unless otherwise stated, the following definitions apply:</p><ul><li><strong>Agency</strong>: A federal government entity with regulatory authority</li><li><strong>Regulation</strong>: A rule or directive made and maintained by an authority</li><li><strong>Section</strong>: A distinct part of the regulatory framework addressing a specific topic</li></ul>',
            agency: 'Office of Federal Regulations',
            updatedDate: '2023-02-15',
          }
        ]
      },
      {
        id: 'part-2',
        type: 'part',
        number: '2',
        title: 'Applications and Procedures',
        agency: 'Department of Administration',
        updatedDate: '2023-01-30',
        children: [
          {
            id: 'section-2-1',
            type: 'section',
            number: '2.1',
            title: 'Application Process',
            content: '<p>This section outlines the application process for regulatory compliance. All applications must be submitted through the designated portal with the required documentation as specified in Appendix A.</p><p>The review process typically takes 30 business days from the date of submission.</p>',
            agency: 'Department of Administration',
            updatedDate: '2022-12-15',
          }
        ]
      }
    ]
  },
  {
    id: 'title-2',
    type: 'title',
    number: '2',
    title: 'Administrative Requirements',
    agency: 'Department of Administrative Affairs',
    updatedDate: '2022-11-10',
    children: [
      {
        id: 'part-2-1',
        type: 'part',
        number: '1',
        title: 'Administrative Procedures',
        agency: 'Department of Administrative Affairs',
        updatedDate: '2022-10-05',
        children: [
          {
            id: 'section-2-1-1',
            type: 'section',
            number: '1.1',
            title: 'General Requirements',
            content: '<p>This section covers the general administrative requirements for all federal agencies. Agencies must maintain proper documentation of all regulatory actions and provide annual reports to the Office of Federal Regulations.</p>',
            agency: 'Department of Administrative Affairs',
            updatedDate: '2022-09-12',
          }
        ]
      }
    ]
  }
];

// Sample metadata for demonstration
const sampleMetadata = {
  'section-1-1': {
    xmlLink: {
      url: 'https://example.com/api/xml/section-1-1.xml',
      version: '2023-03-22'
    },
    renderTarget: {
      elementId: 'content-viewer',
      mode: 'replace'
    }
  },
  'section-1-2': {
    xmlLink: {
      url: 'https://example.com/api/xml/section-1-2.xml',
      version: '2023-02-15'
    },
    references: [
      { type: 'related', id: 'section-2-1', title: 'Related Procedures' }
    ]
  }
};

export default {
  title: 'eCFR/ECFRNavigator',
  component: ECFRNavigator,
  tags: ['autodocs'],
  argTypes: {
    items: { 
      control: 'object',
      description: 'Hierarchical data structure of items to navigate'
    },
    options: {
      control: 'object',
      description: 'Configuration options for the navigator'
    },
    itemMetadata: {
      control: 'object',
      description: 'Metadata associated with specific items'
    },
    initialSelectedItemId: {
      control: 'text',
      description: 'ID of the item to initially select'
    }
  },
  decorators: [
    () => ({
      template: '<div style="height: 600px; border: 1px solid #ccc; border-radius: 4px;"><story /></div>'
    })
  ]
};

// Base Navigator (Standard Mode)
export const StandardMode = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: sampleMetadata,
    initialSelectedItemId: 'section-1-1'
  }
};

// Compact Mode
export const CompactMode = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'compact',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'tight'
      }
    },
    itemMetadata: sampleMetadata
  }
};

// Detailed Mode
export const DetailedMode = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'detailed',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'loose'
      }
    },
    itemMetadata: sampleMetadata
  }
};

// Styleless Mode
export const StylelessMode = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'styleless',
        showDescription: true,
        showMetadataBadges: false
      }
    },
    itemMetadata: sampleMetadata
  }
};

// Dark Theme
export const DarkTheme = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'dark',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: sampleMetadata
  }
};

// With Advanced Filtering Enabled
export const WithAdvancedFiltering = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      },
      filters: {
        showAgencyFilter: true,
        showDateFilter: true,
        showTypeFilter: true,
        showKeywordFilter: true,
        agencyList: [
          'Office of Federal Regulations',
          'Department of Administration',
          'Department of Administrative Affairs'
        ]
      }
    },
    itemMetadata: sampleMetadata
  }
};

// With Tooltips Enabled
export const WithTooltips = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      },
      tooltips: {
        enabled: true,
        showDelay: 300,
        hideDelay: 100,
        maxLength: 300,
        showTypeInfo: true,
        position: 'right'
      }
    },
    itemMetadata: sampleMetadata
  }
};

// Full Configuration Example
export const FullConfiguration = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      expandAll: false,
      hideContentOnNavigation: false,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        maxTitleLength: 40,
        showTypeIcon: true,
        showItemNumbers: true,
        indentItems: true,
        hideEmptyItems: false
      },
      filters: {
        showAgencyFilter: true,
        showDateFilter: true,
        showTypeFilter: true,
        showKeywordFilter: true
      },
      tooltips: {
        enabled: true,
        showDelay: 300,
        hideDelay: 100,
        maxLength: 300
      },
      breadcrumb: {
        rootLabel: 'Home',
        truncate: true,
        visibleItems: 3,
        maxVisible: 5,
        type: 'scrollable',
        separatorType: 'icon'
      },
      fuzzySearch: {
        enabled: true,
        threshold: 0.4,
        distance: 100
      }
    },
    itemMetadata: sampleMetadata,
    initialSelectedItemId: 'section-1-1'
  }
};