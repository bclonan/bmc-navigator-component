import MNavbar from '../../components/layout/MNavbar.vue';

export default {
  title: 'Layout/Navigation/Navbar',
  component: MNavbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive navigation bar component with dropdowns, search, user menu, and mobile responsive design.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['light', 'dark', 'transparent']
    },
    fixed: {
      control: { type: 'boolean' }
    },
    fluid: {
      control: { type: 'boolean' }
    },
    showMobileToggle: {
      control: { type: 'boolean' }
    }
  }
};

const defaultBrand = {
  text: 'Mariner Finance',
  logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM2ODNmNiIvPgo8cGF0aCBkPSJNOCAyMEwxNiAxMkwyNCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
  href: '#'
};

const defaultNavigation = [
  {
    id: 'products',
    label: 'Products',
    children: [
      {
        id: 'personal-loans',
        label: 'Personal Loans',
        description: 'Quick approval personal loans for your needs',
        href: '#personal-loans',
        badge: { text: 'Popular', variant: 'success' }
      },
      {
        id: 'auto-loans',
        label: 'Auto Loans',
        description: 'Competitive rates for new and used vehicles',
        href: '#auto-loans'
      },
      {
        id: 'home-loans',
        label: 'Home Loans',
        description: 'Mortgage solutions for homebuyers',
        href: '#home-loans'
      },
      {
        id: 'credit-cards',
        label: 'Credit Cards',
        description: 'Flexible credit card options',
        href: '#credit-cards',
        badge: { text: 'New', variant: 'primary' }
      }
    ]
  },
  {
    id: 'rates',
    label: 'Rates & Fees',
    href: '#rates'
  },
  {
    id: 'locations',
    label: 'Locations',
    href: '#locations'
  },
  {
    id: 'resources',
    label: 'Resources',
    children: [
      {
        id: 'calculators',
        label: 'Loan Calculators',
        description: 'Calculate payments and rates',
        href: '#calculators'
      },
      {
        id: 'guides',
        label: 'Financial Guides',
        description: 'Expert advice and tips',
        href: '#guides'
      },
      {
        id: 'faq',
        label: 'FAQ',
        description: 'Frequently asked questions',
        href: '#faq'
      }
    ]
  }
];

const defaultActions = [
  {
    id: 'search',
    type: 'search',
    placeholder: 'Search loans, rates, locations...'
  },
  {
    id: 'apply',
    type: 'button',
    label: 'Apply Now',
    variant: 'primary'
  },
  {
    id: 'login',
    type: 'button',
    label: 'Login',
    variant: 'outline'
  }
];

const userMenuActions = [
  {
    id: 'search',
    type: 'search',
    placeholder: 'Search loans, rates, locations...'
  },
  {
    id: 'user',
    type: 'user',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    showName: true,
    menuItems: [
      { id: 'profile', label: 'My Profile', href: '#profile' },
      { id: 'applications', label: 'My Applications', href: '#applications' },
      { id: 'documents', label: 'Documents', href: '#documents' },
      { id: 'settings', label: 'Account Settings', href: '#settings' },
      { id: 'logout', label: 'Sign Out', href: '#logout' }
    ]
  }
];

export const Default = {
  args: {
    brand: defaultBrand,
    navigationItems: defaultNavigation,
    actionItems: defaultActions,
    variant: 'light',
    fixed: false,
    fluid: false,
    showMobileToggle: true
  }
};

export const Dark = {
  args: {
    ...Default.args,
    variant: 'dark'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

export const WithUserMenu = {
  args: {
    ...Default.args,
    actionItems: userMenuActions
  }
};

export const Fixed = {
  args: {
    ...Default.args,
    fixed: true
  }
};