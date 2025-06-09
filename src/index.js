import { createPinia } from 'pinia';

// ECFR Navigator Components
import ECFRNavigator from './components/ECFRNavigator.vue';
import ECFRSection from './components/ECFRSection.vue';
import ECFRBreadcrumb from './components/ECFRBreadcrumb.vue';
import ECFRNavigatorWrapper from './components/ECFRNavigatorWrapper.vue';

// Material UI Components
import MButton from './components/ui/MButton.vue';
import MCard from './components/ui/MCard.vue';
import MTextField from './components/ui/MTextField.vue';
import MSelect from './components/ui/MSelect.vue';
import MCheckbox from './components/ui/MCheckbox.vue';
import MLayout from './components/ui/MLayout.vue';
import MSlider from './components/ui/MSlider.vue';
import MProgress from './components/ui/MProgress.vue';

// Charts and Tables
import MChart from './components/charts/MChart.vue';
import MTable from './components/tables/MTable.vue';

// Dynamic Forms and Visualization
import DynamicFormRenderer from './components/dynamic/DynamicFormRenderer.vue';
import StateTransitionVisualizer from './components/visualization/StateTransitionVisualizer.vue';

// Stores and Composables
import { useECFRStore } from './stores/ecfr';
import { useUIStore } from './stores/ui';
import { useECFRNavigator } from './composables/useECFRNavigator';
import { useECFRNavigatorStore } from './composables/useECFRNavigatorStore';
import { useFormValidation } from './composables/useFormValidation';
import { useAdvancedValidation } from './composables/useAdvancedValidation';
import { useStorageEngine } from './composables/useStorageEngine';
import { useDynamicFormRenderer } from './composables/useDynamicFormRenderer';
import { useLoanFlow } from './composables/useLoanFlow';

// Configurations
import { 
  personalLoanFormConfig, 
  loanApplicationStates,
  chartConfigs,
  tableConfigs,
  dashboardConfig,
  loanAnalyticsConfig,
  mobileConfig,
  mergeConfig,
  generateChartData,
  generateTableData
} from './config/formConfigs';

// Create comprehensive plugin
const ECFRNavigatorPlugin = {
  install(app) {
    // Register Pinia if it's not already registered
    try {
      app.use(createPinia());
    } catch (e) {
      console.warn('Pinia is already registered or there was an error initializing it.');
    }
    
    // Register ECFR Navigator components
    app.component('ECFRNavigator', ECFRNavigator);
    app.component('ECFRSection', ECFRSection);
    app.component('ECFRBreadcrumb', ECFRBreadcrumb);
    app.component('ECFRNavigatorWrapper', ECFRNavigatorWrapper);
    
    // Register Material UI components
    app.component('MButton', MButton);
    app.component('MCard', MCard);
    app.component('MTextField', MTextField);
    app.component('MSelect', MSelect);
    app.component('MCheckbox', MCheckbox);
    app.component('MLayout', MLayout);
    app.component('MSlider', MSlider);
    app.component('MProgress', MProgress);
    
    // Register Charts and Tables
    app.component('MChart', MChart);
    app.component('MTable', MTable);
    
    // Register Dynamic Forms and Visualization
    app.component('DynamicFormRenderer', DynamicFormRenderer);
    app.component('StateTransitionVisualizer', StateTransitionVisualizer);
  }
};

// Export ECFR Navigator components and helpers
export { 
  ECFRNavigator,
  ECFRSection,
  ECFRBreadcrumb,
  ECFRNavigatorWrapper,
  useECFRStore,
  useECFRNavigator,
  useECFRNavigatorStore
};

// Export Material UI components
export {
  MButton,
  MCard,
  MTextField,
  MSelect,
  MCheckbox,
  MLayout,
  MSlider,
  MProgress,
  useUIStore
};

// Export Charts and Tables
export {
  MChart,
  MTable
};

// Export Dynamic Forms and Visualization
export {
  DynamicFormRenderer,
  StateTransitionVisualizer
};

// Export Composables
export {
  useFormValidation,
  useAdvancedValidation,
  useStorageEngine,
  useDynamicFormRenderer,
  useLoanFlow
};

// Export Configurations
export {
  personalLoanFormConfig,
  loanApplicationStates,
  chartConfigs,
  tableConfigs,
  dashboardConfig,
  loanAnalyticsConfig,
  mobileConfig,
  mergeConfig,
  generateChartData,
  generateTableData
};

// Export the main plugin
export { ECFRNavigatorPlugin };

// Default export for plugin usage
export default ECFRNavigatorPlugin;