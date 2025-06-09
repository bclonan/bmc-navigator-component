// Material Design UI Components
import MButton from './MButton.vue';
import MCard from './MCard.vue';
import MTextField from './MTextField.vue';
import MSelect from './MSelect.vue';
import MCheckbox from './MCheckbox.vue';
import MLayout from './MLayout.vue';
import MSlider from './MSlider.vue';
import MProgress from './MProgress.vue';

// Export all components
export {
  MButton,
  MCard,
  MTextField,
  MSelect,
  MCheckbox,
  MLayout,
  MSlider,
  MProgress
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