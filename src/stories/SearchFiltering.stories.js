import ECFRNavigator from '../components/ECFRNavigator.vue';

export default {
  title: 'eCFR/Features/SearchFiltering',
  component: ECFRNavigator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Interactive examples demonstrating the search and filtering capabilities of the ECFRNavigator component.'
      }
    }
  },
  decorators: [
    () => ({
      template: '<div style="height: 650px; border: 1px solid #ccc; border-radius: 4px;"><story /></div>'
    })
  ]
};

// Sample data with diverse attributes for search and filtering demonstration
const filterableData = [
  {
    id: 'title-1',
    type: 'title',
    number: '1',
    title: 'General Provisions',
    agency: 'Office of Federal Regulations',
    updatedDate: '2023-05-15',
    keywords: ['general', 'provision', 'regulatory'],
    children: [
      {
        id: 'part-1-1',
        type: 'part',
        number: '1',
        title: 'Definitions and Scope',
        agency: 'Office of Federal Regulations',
        updatedDate: '2023-04-10',
        keywords: ['definition', 'scope', 'terminology'],
        children: [
          {
            id: 'section-1-1-1',
            type: 'section',
            number: '1.1',
            title: 'Definitions',
            content: '<p>This section contains definitions of key terms used throughout the regulatory framework.</p><p>The following terms have the meanings provided below unless otherwise specified in a specific context:</p><ul><li><strong>Authority</strong>: A governmental body with regulatory power</li><li><strong>Regulation</strong>: A rule or directive made and maintained by an authority</li></ul>',
            agency: 'Office of Federal Regulations',
            updatedDate: '2023-03-22',
            keywords: ['definition', 'terms', 'glossary']
          },
          {
            id: 'section-1-1-2',
            type: 'section',
            number: '1.2',
            title: 'Scope of Regulations',
            content: '<p>This section defines the scope and applicability of the regulations contained within this title.</p><p>These regulations apply to all entities under federal jurisdiction unless specifically exempted by statute or executive order.</p>',
            agency: 'Office of Federal Regulations',
            updatedDate: '2023-01-15',
            keywords: ['scope', 'applicability', 'jurisdiction']
          }
        ]
      },
      {
        id: 'part-1-2',
        type: 'part',
        number: '2',
        title: 'Administrative Requirements',
        agency: 'Department of Administration',
        updatedDate: '2022-12-10',
        keywords: ['administrative', 'requirements', 'procedures'],
        children: [
          {
            id: 'section-1-2-1',
            type: 'section',
            number: '2.1',
            title: 'Documentation Requirements',
            content: '<p>This section outlines the documentation requirements for regulatory compliance.</p><p>All regulated entities must maintain records for a minimum of 7 years and make such records available for inspection upon request by authorized officials.</p>',
            agency: 'Department of Administration',
            updatedDate: '2022-10-05',
            keywords: ['documentation', 'records', 'compliance']
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
    agency: 'Environmental Protection Agency',
    updatedDate: '2022-09-20',
    keywords: ['environmental', 'protection', 'conservation'],
    children: [
      {
        id: 'part-2-1',
        type: 'part',
        number: '1',
        title: 'Air Quality Standards',
        agency: 'Environmental Protection Agency',
        updatedDate: '2022-08-15',
        keywords: ['air', 'quality', 'pollution', 'standards'],
        children: [
          {
            id: 'section-2-1-1',
            type: 'section',
            number: '1.1',
            title: 'Ambient Air Quality',
            content: '<p>This section establishes the national ambient air quality standards.</p><p>The concentration of pollutants in ambient air shall not exceed the limits specified in Table 1 of this section. Measurement methods and procedures are detailed in Appendix A.</p>',
            agency: 'Environmental Protection Agency',
            updatedDate: '2022-07-01',
            keywords: ['ambient', 'air', 'quality', 'measurement']
          }
        ]
      }
    ]
  },
  {
    id: 'title-3',
    type: 'title',
    number: '3',
    title: 'Financial Regulations',
    agency: 'Department of Treasury',
    updatedDate: '2022-06-15',
    keywords: ['financial', 'banking', 'regulation', 'treasury'],
    children: [
      {
        id: 'part-3-1',
        type: 'part',
        number: '1',
        title: 'Banking Standards',
        agency: 'Department of Treasury',
        updatedDate: '2022-05-10',
        keywords: ['banking', 'standards', 'practices'],
        children: [
          {
            id: 'section-3-1-1',
            type: 'section',
            number: '1.1',
            title: 'Capital Requirements',
            content: '<p>This section establishes minimum capital requirements for financial institutions.</p><p>All banking institutions must maintain a capital adequacy ratio of at least 8% as calculated using the methods described in this section.</p>',
            agency: 'Department of Treasury',
            updatedDate: '2022-04-01',
            keywords: ['capital', 'requirements', 'adequacy', 'ratio']
          }
        ]
      }
    ]
  }
];

// Basic search example
export const BasicSearch = {
  args: {
    items: filterableData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      },
      fuzzySearch: {
        enabled: true,
        threshold: 0.4,
        distance: 100
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple search functionality with fuzzy matching enabled for more flexible results.'
      }
    }
  }
};

// Advanced filtering by agency
export const AgencyFiltering = {
  args: {
    items: filterableData,
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
        showTypeFilter: false,
        showDateFilter: false,
        showKeywordFilter: false,
        agencyList: [
          'Office of Federal Regulations',
          'Department of Administration',
          'Environmental Protection Agency',
          'Department of Treasury'
        ]
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter results by agency, showcasing how to enable only specific filter types and provide a predefined list of agencies.'
      }
    }
  }
};

// Type filtering
export const TypeFiltering = {
  args: {
    items: filterableData,
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
        showAgencyFilter: false,
        showTypeFilter: true,
        showDateFilter: false,
        showKeywordFilter: false,
        availableTypes: ['title', 'part', 'section']
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter results by document type, allowing users to focus on specific levels of the regulatory hierarchy.'
      }
    }
  }
};

// Date-based filtering
export const DateFiltering = {
  args: {
    items: filterableData,
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
        showAgencyFilter: false,
        showTypeFilter: false,
        showDateFilter: true,
        showKeywordFilter: false,
        dateFilterOptions: [
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'Past Week' },
          { value: 'month', label: 'Past Month' },
          { value: 'year', label: 'Past Year' },
          { value: 'custom', label: 'Custom Range' }
        ]
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter content by update date, allowing users to focus on recently updated regulations.'
      }
    }
  }
};

// Keyword filtering
export const KeywordFiltering = {
  args: {
    items: filterableData,
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
        showAgencyFilter: false,
        showTypeFilter: false,
        showDateFilter: false,
        showKeywordFilter: true
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter content by keywords, allowing for free-form tag-based filtering. Try entering keywords like "requirements", "standards", or "quality".'
      }
    }
  }
};

// Full filtering experience
export const FullFilteringCapabilities = {
  args: {
    items: filterableData,
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
        showTypeFilter: true,
        showDateFilter: true,
        showKeywordFilter: true,
        agencyList: [
          'Office of Federal Regulations',
          'Department of Administration',
          'Environmental Protection Agency',
          'Department of Treasury'
        ],
        availableTypes: ['title', 'part', 'section']
      },
      fuzzySearch: {
        enabled: true,
        threshold: 0.4,
        distance: 100
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete search and filtering experience with all filter types enabled, along with fuzzy search for more flexible query matching.'
      }
    }
  }
};

// With interactive tooltips on search results
export const SearchResultsWithTooltips = {
  args: {
    items: filterableData,
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
        showTypeFilter: true,
        showDateFilter: false,
        showKeywordFilter: true
      },
      tooltips: {
        enabled: true,
        showDelay: 300,
        hideDelay: 100,
        maxLength: 300,
        showTypeInfo: true,
        position: 'right'
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive tooltips display detailed content previews when hovering over search results, allowing users to quickly scan content without navigating away from search results.'
      }
    }
  }
};