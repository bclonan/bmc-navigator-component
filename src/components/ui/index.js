// Material Design UI Components
import MButton from './MButton.vue';
import MCard from './MCard.vue';
import MTextField from './MTextField.vue';
import MSelect from './MSelect.vue';
import MCheckbox from './MCheckbox.vue';
import MLayout from './MLayout.vue';
import MSlider from './MSlider.vue';
import MProgress from './MProgress.vue';
import MMediaCard from './MMediaCard.vue';

// Loading & Skeleton Components
import MSkeleton from './MSkeleton.vue';
import MSkeletonGroup from './MSkeletonGroup.vue';
import MAsyncLoader from './MAsyncLoader.vue';

// Motion & Animation Components
import MMotionRipple from './MMotionRipple.vue';
import MMotionTransition from './MMotionTransition.vue';
import MMotionFeedback from './MMotionFeedback.vue';

// Export all components
export {
  // Core UI Components
  MButton,
  MCard,
  MTextField,
  MSelect,
  MCheckbox,
  MLayout,
  MSlider,
  MProgress,
  MMediaCard,
  
  // Loading & Skeleton Components
  MSkeleton,
  MSkeletonGroup,
  MAsyncLoader,
  
  // Motion & Animation Components
  MMotionRipple,
  MMotionTransition,
  MMotionFeedback
};

// Plugin for registering all components globally
export const MaterialUIPlugin = {
  install(app) {
    app.component('MButton', MButton);
    app.component('MCard', MCard);
    app.component('MTextField', MTextField);
    app.component('MSelect', MSelect);
    app.component('MCheckbox', MCheckbox);
    app.component('MLayout', MLayout);
    app.component('MSlider', MSlider);
    app.component('MProgress', MProgress);
  }
};

export default MaterialUIPlugin;

export { default as PaymentStatusCard } from '../loan/PaymentStatusCard.vue';
export { default as PaymentSummaryCard } from '../loan/PaymentSummaryCard.vue';
export { default as PaymentActionCard } from '../loan/PaymentActionCard.vue';
export { default as PaymentFlow } from '../loan/PaymentFlow.vue';