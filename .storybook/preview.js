import { createPinia } from 'pinia';
import { setActivePinia } from 'pinia';
import 'tailwindcss/tailwind.css'; // Import Tailwind directly

// Create and configure Pinia for all stories
const pinia = createPinia();
setActivePinia(pinia); // Set the Pinia instance as active for the stories

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    actions: { 
      argTypesRegex: '^on[A-Z].*',
      disable: false,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst',
      hideNoControlsWarning: true,
    },
    layout: 'centered',
    backgrounds: {
      default: 'yourtownfinance-light',
      values: [
        { name: 'yourtownfinance-light', value: '#ffffff' },
        { name: 'yourtownfinance-bg', value: '#f8f8f8' },
        { name: 'yourtownfinance-surface', value: '#f4f4f4' },
        { name: 'yourtownfinance-primary', value: 'rgb(56, 96, 190)' },
        { name: 'yourtownfinance-secondary', value: 'rgb(1, 52, 116)' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'financial-green', value: 'rgb(249, 255, 250)' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile (375px)',
          styles: { width: '375px', height: '667px' },
          type: 'mobile',
        },
        mobileLarge: {
          name: 'Mobile Large (414px)',
          styles: { width: '414px', height: '896px' },
          type: 'mobile',
        },
        tablet: {
          name: 'Tablet (768px)',
          styles: { width: '768px', height: '1024px' },
          type: 'tablet',
        },
        tabletLarge: {
          name: 'Tablet Large (1024px)',
          styles: { width: '1024px', height: '768px' },
          type: 'tablet',
        },
        desktop: {
          name: 'Desktop (1280px)',
          styles: { width: '1280px', height: '800px' },
          type: 'desktop',
        },
        desktopLarge: {
          name: 'Large Desktop (1440px)',
          styles: { width: '1440px', height: '900px' },
          type: 'desktop',
        },
        desktopXL: {
          name: 'XL Desktop (1920px)',
          styles: { width: '1920px', height: '1080px' },
          type: 'desktop',
        },
      },
    },
    docs: {
      source: {
        state: 'open',
        excludeDecorators: true,
        format: 'dedent',
      },
      canvas: { sourceState: 'shown' },
      extractComponentDescription: (component, { notes }) => {
        if (notes) {
          return typeof notes === 'string' ? notes : notes.markdown || notes.text;
        }
        return null;
      },
    },
    options: {
      storySort: {
        order: [
          'Welcome',
          'Your Town Finance Design System',
          [
            'Overview',
            'Brand Guidelines',
            'Colors & Themes',
            'Typography',
            'Spacing & Layout',
            'Accessibility Standards',
            'Testing Framework',
          ],
          'Core Components',
          [
            'Buttons & Actions',
            ['Button', 'Icon Button', 'Button Group'],
            'Form Controls',
            ['Input', 'Select', 'Checkbox', 'Radio', 'Switch'],
            'Data Display',
            ['Typography', 'Avatar', 'Badge', 'Chip', 'Tooltip'],
            'Feedback & Status',
            ['Alert', 'Progress', 'Loading', 'Snackbar'],
            'Navigation',
            ['App Bar', 'Toolbar', 'Drawer', 'List', 'Breadcrumb'],
            'Surfaces & Layout',
            ['Card', 'Dialog', 'Paper', 'Container'],
          ],
          'Financial Components',
          [
            'Loan Application',
            ['Form Renderer', 'Validation', 'Multi-Step Forms'],
            'Financial Literacy',
            ['Educational Tooltips', 'Context Help', 'Analytics'],
            'Data Visualization',
            ['Charts', 'Tables', 'Dashboards'],
          ],
          'Application Examples',
          [
            'Complete Loan Flow',
            'Dashboard Layouts',
            'Mobile Responsive',
            'Accessibility Showcase',
          ],
          'Testing & Quality',
          [
            'Accessibility Tests',
            'Visual Regression',
            'Interaction Tests',
            'Performance',
          ],
          '*',
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'yourtownfinance',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'yourtownfinance', title: 'Your Town Finance', left: '🏦' },
          { value: 'default', title: 'Default Material', left: '⚪' },
          { value: 'dark', title: 'Dark Mode', left: '🌙' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English', right: '🇺🇸' },
          { value: 'es', title: 'Español', right: '🇪🇸' },
        ],
      },
    },
    density: {
      description: 'Component density',
      defaultValue: 'medium',
      toolbar: {
        title: 'Density',
        icon: 'component',
        items: [
          { value: 'compact', title: 'Compact' },
          { value: 'medium', title: 'Medium' },
          { value: 'comfortable', title: 'Comfortable' },
        ],
      },
    },
  },
  decorators: [
    (story, context) => ({
      components: { story },
      template: `
        <div class="sb-decorator font-sans" :class="decoratorClasses">
          <story />
        </div>
      `,
      setup() {
        const theme = context.globals.theme || 'yourtownfinance';
        const density = context.globals.density || 'medium';
        
        const decoratorClasses = {
          'p-2': density === 'compact',
          'p-4': density === 'medium',
          'p-6': density === 'comfortable',
          'yourtownfinance-theme': theme === 'yourtownfinance',
          'default-theme': theme === 'default',
          'dark-theme': theme === 'dark',
        };
        
        return { pinia, decoratorClasses };
      },
    }),
  ],
};

export default preview;