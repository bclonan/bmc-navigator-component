import { createPinia } from 'pinia';
import ECFRNavigator from './components/ECFRNavigator.vue';
import ECFRSection from './components/ECFRSection.vue';
import ECFRBreadcrumb from './components/ECFRBreadcrumb.vue';
import { useECFRStore } from './stores/ecfr';
import { useECFRNavigator } from './composables/useECFRNavigator';

// Create plugin
const ECFRNavigatorPlugin = {
  install(app) {
    // Register Pinia if it's not already registered
    try {
      app.use(createPinia());
    } catch (e) {
      console.warn('Pinia is already registered or there was an error initializing it.');
    }
    
    // Register components
    app.component('ECFRNavigator', ECFRNavigator);
    app.component('ECFRSection', ECFRSection);
    app.component('ECFRBreadcrumb', ECFRBreadcrumb);
  }
};

// Export components and helpers
export { 
  ECFRNavigator,
  ECFRSection,
  ECFRBreadcrumb,
  useECFRStore,
  useECFRNavigator,
  ECFRNavigatorPlugin
};

// Default export for plugin usage
export default ECFRNavigatorPlugin;