import { createPinia } from 'pinia';
import { setActivePinia } from 'pinia';
import 'tailwindcss/tailwind.css'; // Import Tailwind directly

// Create and configure Pinia for all stories
const pinia = createPinia();
setActivePinia(pinia); // Set the Pinia instance as active for the stories

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'centered', // Center all stories by default
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fa' },
        { name: 'dark', value: '#343a40' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
    },
    docs: {
      source: {
        state: 'open', // Show source code by default in docs
      },
    },
  },
  decorators: [
    (story) => ({
      components: { story },
      template: `
        <div class="sb-decorator p-4 font-sans">
          <story />
        </div>
      `,
      setup() {
        return { pinia };
      },
    }),
  ],
};

export default preview;