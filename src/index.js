import { createPinia } from 'pinia';
import ECFRNavigator from './components/ECFRNavigator.vue';
import ECFRSection from './components/ECFRSection.vue';
import ECFRBreadcrumb from './components/ECFRBreadcrumb.vue';
import ECFRNavigatorWrapper from './components/ECFRNavigatorWrapper.vue';
import { useECFRStore } from './stores/ecfr';
import { useECFRNavigator } from './composables/useECFRNavigator';
import { useECFRNavigatorStore } from './composables/useECFRNavigatorStore';

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
    app.component('ECFRNavigatorWrapper', ECFRNavigatorWrapper);
  }
};

// Export components and helpers
export { 
  ECFRNavigator,
  ECFRSection,
  ECFRBreadcrumb,
  ECFRNavigatorWrapper,
  useECFRStore,
  useECFRNavigator,
  useECFRNavigatorStore,
  ECFRNavigatorPlugin
};

// Default export for plugin usage
export default ECFRNavigatorPlugin;