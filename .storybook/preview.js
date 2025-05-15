import { createPinia } from 'pinia';
import '../src/index.css'; // Import your styles if needed

// Create pinia to pass to stories
const pinia = createPinia();

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
  },
  decorators: [
    (story) => ({
      components: { story },
      template: '<div class="sb-decorator"><story /></div>',
      setup() {
        return { pinia };
      },
    }),
  ],
};

export default preview;