import MFooter from '../../components/layout/MFooter.vue';

export default {
  title: 'Layout/Structure/Footer',
  component: MFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive footer component with brand section, link groups, social media links, newsletter signup, and legal information.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'dark']
    },
    fluid: {
      control: { type: 'boolean' }
    },
    showNewsletter: {
      control: { type: 'boolean' }
    }
  }
};

const defaultBrand = {
  text: 'Your Town Finance',
  logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM2ODNmNiIvPgo8cGF0aCBkPSJNOCAyMEwxNiAxMkwyNCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+',
  description: 'Providing trusted financial solutions since 1927. We help people achieve their financial goals with competitive rates and personalized service.'
};

const linkSections = [
  {
    id: 'products',
    title: 'Products',
    links: [
      { id: 'personal-loans', label: 'Personal Loans', href: '#personal-loans' },
      { id: 'auto-loans', label: 'Auto Loans', href: '#auto-loans' },
      { id: 'home-loans', label: 'Home Loans', href: '#home-loans' },
      { id: 'credit-cards', label: 'Credit Cards', href: '#credit-cards' }
    ]
  },
  {
    id: 'support',
    title: 'Customer Support',
    links: [
      { id: 'contact', label: 'Contact Us', href: '#contact' },
      { id: 'faq', label: 'FAQ', href: '#faq' },
      { id: 'payment-center', label: 'Payment Center', href: '#payment-center' },
      { id: 'calculators', label: 'Loan Calculators', href: '#calculators' }
    ]
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { id: 'about', label: 'About Us', href: '#about' },
      { id: 'careers', label: 'Careers', href: '#careers' },
      { id: 'locations', label: 'Branch Locations', href: '#locations' },
      { id: 'news', label: 'News & Updates', href: '#news' }
    ]
  }
];

const socialLinks = [
  { id: 'facebook', platform: 'facebook', url: 'https://facebook.com/yourtownfinance', label: 'Facebook' },
  { id: 'twitter', platform: 'twitter', url: 'https://twitter.com/yourtownfinance', label: 'Twitter' },
  { id: 'linkedin', platform: 'linkedin', url: 'https://linkedin.com/company/yourtownfinance', label: 'LinkedIn' },
  { id: 'instagram', platform: 'instagram', url: 'https://instagram.com/yourtownfinance', label: 'Instagram' }
];

const legalLinks = [
  { id: 'privacy', label: 'Privacy Policy', href: '#privacy' },
  { id: 'terms', label: 'Terms of Service', href: '#terms' },
  { id: 'accessibility', label: 'Accessibility', href: '#accessibility' },
  { id: 'licensing', label: 'State Licensing', href: '#licensing' }
];

export const Default = {
  args: {
    brand: defaultBrand,
    linkSections: linkSections,
    socialLinks: socialLinks,
    legalLinks: legalLinks,
    variant: 'default',
    fluid: false,
    showNewsletter: true,
    newsletterTitle: 'Stay Updated',
    newsletterText: 'Get the latest financial insights and loan offers delivered to your inbox.',
    copyrightText: '© 2024 Your Town Finance. All rights reserved. NMLS #1417840',
    additionalInfo: 'Licensed by the Department of Financial Protection and Innovation under the California Financing Law.'
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

export const Minimal = {
  args: {
    variant: 'minimal',
    legalLinks: [
      { id: 'privacy', label: 'Privacy Policy', href: '#privacy' },
      { id: 'terms', label: 'Terms of Service', href: '#terms' }
    ],
    copyrightText: '© 2024 Your Town Finance. All rights reserved.',
    fluid: false,
    showNewsletter: false
  }
};

export const WithoutNewsletter = {
  args: {
    ...Default.args,
    showNewsletter: false
  }
};

export const Fluid = {
  args: {
    ...Default.args,
    fluid: true
  }
};

export const CompanyFocus = {
  args: {
    brand: {
      ...defaultBrand,
      description: 'Building financial futures together. Trusted by over 500,000 customers nationwide.'
    },
    linkSections: [
      {
        id: 'about',
        title: 'About Your Town Finance',
        links: [
          { id: 'our-story', label: 'Our Story', href: '#our-story' },
          { id: 'leadership', label: 'Leadership Team', href: '#leadership' },
          { id: 'awards', label: 'Awards & Recognition', href: '#awards' },
          { id: 'community', label: 'Community Impact', href: '#community' }
        ]
      },
      {
        id: 'resources',
        title: 'Financial Resources',
        links: [
          { id: 'education', label: 'Financial Education', href: '#education' },
          { id: 'blog', label: 'Blog & Tips', href: '#blog' },
          { id: 'guides', label: 'Buying Guides', href: '#guides' },
          { id: 'tools', label: 'Financial Tools', href: '#tools' }
        ]
      },
      {
        id: 'legal',
        title: 'Legal & Compliance',
        links: [
          { id: 'disclosures', label: 'Important Disclosures', href: '#disclosures' },
          { id: 'rates', label: 'Rate Information', href: '#rates' },
          { id: 'complaints', label: 'File a Complaint', href: '#complaints' },
          { id: 'regulatory', label: 'Regulatory Information', href: '#regulatory' }
        ]
      }
    ],
    socialLinks: socialLinks,
    legalLinks: [
      ...legalLinks,
      { id: 'sitemap', label: 'Sitemap', href: '#sitemap' },
      { id: 'security', label: 'Security Center', href: '#security' }
    ],
    variant: 'default',
    showNewsletter: true,
    newsletterTitle: 'Financial Insights Newsletter',
    newsletterText: 'Expert advice, market trends, and exclusive offers for our valued customers.',
    copyrightText: '© 2024 Your Town Finance LLC. All rights reserved. NMLS #1417840',
    additionalInfo: 'Equal Housing Lender. Licensed by state banking departments and regulatory agencies.'
  }
};

// Interactive demo with form submission
const Template = (args) => ({
  components: { MFooter },
  setup() {
    return { args };
  },
  template: `
    <div>
      <!-- Page content to show footer in context -->
      <div style="min-height: 60vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; color: white;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">Your Financial Future Starts Here</h1>
          <p style="font-size: 1.25rem; margin-bottom: 2rem;">Discover competitive rates and personalized service</p>
          <button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; cursor: pointer;">
            Apply for a Loan Today
          </button>
        </div>
      </div>
      
      <!-- Footer -->
      <MFooter 
        v-bind="args" 
        @link-click="onLinkClick"
        @newsletter-submit="onNewsletterSubmit"
      />
    </div>
  `,
  methods: {
    onLinkClick(link) {
      console.log('Footer link clicked:', link);
    },
    async onNewsletterSubmit(email) {
      console.log('Newsletter subscription:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(`Successfully subscribed ${email} to newsletter!`);
    }
  }
});

export const Interactive = Template.bind({});
Interactive.args = Default.args;