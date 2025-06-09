import { ref, reactive, computed, watch } from 'vue';
import MButton from '../../components/ui/MButton.vue';
import MCard from '../../components/ui/MCard.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MCheckbox from '../../components/ui/MCheckbox.vue';
import MSlider from '../../components/ui/MSlider.vue';
import MProgress from '../../components/ui/MProgress.vue';
import MMediaCard from '../../components/ui/MMediaCard.vue';
import MLayout from '../../components/ui/MLayout.vue';

export default {
  title: 'UI/Complete Component Catalog',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive catalog showcasing every component with all variants, states, and configuration options.'
      }
    }
  }
};

// Complete Button Showcase
export const ButtonCatalog = {
  render: () => ({
    components: { MButton, MCard },
    setup() {
      const buttonStates = reactive({
        disabled: false,
        loading: false,
        size: 'medium'
      });

      const buttonVariants = [
        'primary', 'secondary', 'success', 'warning', 'error', 
        'outlined', 'text', 'elevated'
      ];

      const buttonSizes = ['small', 'medium', 'large'];

      const iconButtons = [
        { icon: 'fas fa-heart', label: 'Like' },
        { icon: 'fas fa-share', label: 'Share' },
        { icon: 'fas fa-download', label: 'Download' },
        { icon: 'fas fa-edit', label: 'Edit' },
        { icon: 'fas fa-trash', label: 'Delete' },
        { icon: 'fas fa-search', label: 'Search' }
      ];

      return {
        buttonStates,
        buttonVariants,
        buttonSizes,
        iconButtons
      };
    },
    template: `
      <div class="space-y-8 p-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Button Component Catalog</h1>
          <p class="text-gray-600">Complete showcase of all button variants and states</p>
        </div>

        <!-- Button Controls -->
        <MCard title="Button State Controls" subtitle="Test different button states">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Size</label>
              <select
                v-model="buttonStates.size"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option v-for="size in buttonSizes" :key="size" :value="size">
                  {{ size.charAt(0).toUpperCase() + size.slice(1) }}
                </option>
              </select>
            </div>
            
            <div class="flex items-center space-x-4">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="buttonStates.disabled"
                  class="mr-2"
                />
                Disabled
              </label>
              
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="buttonStates.loading"
                  class="mr-2"
                />
                Loading
              </label>
            </div>
          </div>
        </MCard>

        <!-- Button Variants -->
        <MCard title="Button Variants" subtitle="All available button styles">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MButton
              v-for="variant in buttonVariants"
              :key="variant"
              :variant="variant"
              :text="variant.charAt(0).toUpperCase() + variant.slice(1)"
              :size="buttonStates.size"
              :disabled="buttonStates.disabled"
              :loading="buttonStates.loading"
            />
          </div>
        </MCard>

        <!-- Button Sizes -->
        <MCard title="Button Sizes" subtitle="Different size variations">
          <div class="space-y-4">
            <div v-for="size in buttonSizes" :key="size" class="flex items-center space-x-4">
              <span class="w-16 text-sm font-medium">{{ size.charAt(0).toUpperCase() + size.slice(1) }}:</span>
              <div class="flex space-x-2">
                <MButton
                  variant="primary"
                  :text="\`Primary \${size}\`"
                  :size="size"
                />
                <MButton
                  variant="outlined"
                  :text="\`Outlined \${size}\`"
                  :size="size"
                />
                <MButton
                  variant="text"
                  :text="\`Text \${size}\`"
                  :size="size"
                />
              </div>
            </div>
          </div>
        </MCard>

        <!-- Icon Buttons -->
        <MCard title="Icon Buttons" subtitle="Buttons with icons and different configurations">
          <div class="space-y-6">
            <!-- Prepend Icons -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Prepend Icons</h4>
              <div class="flex flex-wrap gap-3">
                <MButton
                  v-for="btn in iconButtons"
                  :key="'prepend-' + btn.icon"
                  variant="primary"
                  :text="btn.label"
                  :prepend-icon="btn.icon"
                />
              </div>
            </div>

            <!-- Append Icons -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Append Icons</h4>
              <div class="flex flex-wrap gap-3">
                <MButton
                  v-for="btn in iconButtons"
                  :key="'append-' + btn.icon"
                  variant="outlined"
                  :text="btn.label"
                  :append-icon="btn.icon"
                />
              </div>
            </div>

            <!-- Icon Only -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Icon Only</h4>
              <div class="flex flex-wrap gap-3">
                <MButton
                  v-for="btn in iconButtons"
                  :key="'icon-only-' + btn.icon"
                  variant="text"
                  :prepend-icon="btn.icon"
                  :icon-only="true"
                  :title="btn.label"
                />
              </div>
            </div>
          </div>
        </MCard>

        <!-- Full Width Buttons -->
        <MCard title="Full Width Buttons" subtitle="Buttons that span the full container width">
          <div class="space-y-3">
            <MButton
              variant="primary"
              text="Full Width Primary Button"
              :full-width="true"
            />
            <MButton
              variant="outlined"
              text="Full Width Outlined Button"
              :full-width="true"
              prepend-icon="fas fa-arrow-right"
            />
            <MButton
              variant="success"
              text="Full Width Success Button"
              :full-width="true"
              :loading="true"
            />
          </div>
        </MCard>

        <!-- Button Groups -->
        <MCard title="Button Groups" subtitle="Related buttons grouped together">
          <div class="space-y-6">
            <!-- Toolbar Style -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Toolbar Style</h4>
              <div class="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
                <MButton variant="text" text="Bold" prepend-icon="fas fa-bold" />
                <MButton variant="text" text="Italic" prepend-icon="fas fa-italic" />
                <MButton variant="text" text="Underline" prepend-icon="fas fa-underline" />
              </div>
            </div>

            <!-- Action Groups -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Action Groups</h4>
              <div class="flex space-x-2">
                <MButton variant="primary" text="Save" prepend-icon="fas fa-save" />
                <MButton variant="outlined" text="Cancel" />
                <MButton variant="text" text="Reset" prepend-icon="fas fa-undo" />
              </div>
            </div>

            <!-- Segmented Control -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Segmented Control</h4>
              <div class="inline-flex border border-gray-300 rounded-lg overflow-hidden">
                <MButton variant="text" text="Day" class="rounded-none border-r" />
                <MButton variant="primary" text="Week" class="rounded-none border-r" />
                <MButton variant="text" text="Month" class="rounded-none" />
              </div>
            </div>
          </div>
        </MCard>

        <!-- Special Button Types -->
        <MCard title="Special Button Types" subtitle="Unique button implementations">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Floating Action Button -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Floating Action Button</h4>
              <div class="relative h-32 bg-gray-50 rounded-lg p-4">
                <MButton
                  variant="primary"
                  prepend-icon="fas fa-plus"
                  :icon-only="true"
                  size="large"
                  class="absolute bottom-4 right-4 rounded-full w-14 h-14 shadow-lg hover:shadow-xl"
                />
              </div>
            </div>

            <!-- Split Button -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Split Button</h4>
              <div class="flex">
                <MButton
                  variant="primary"
                  text="Save Document"
                  class="rounded-r-none border-r-0"
                />
                <MButton
                  variant="primary"
                  prepend-icon="fas fa-chevron-down"
                  :icon-only="true"
                  class="rounded-l-none px-3"
                />
              </div>
            </div>

            <!-- Loading States -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Loading States</h4>
              <div class="space-y-2">
                <MButton
                  variant="primary"
                  text="Processing..."
                  :loading="true"
                />
                <MButton
                  variant="outlined"
                  text="Upload File"
                  prepend-icon="fas fa-upload"
                  :loading="true"
                />
              </div>
            </div>

            <!-- Link Buttons -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-3">Link Style</h4>
              <div class="space-y-2">
                <MButton
                  variant="text"
                  text="Learn More"
                  append-icon="fas fa-external-link-alt"
                  class="text-blue-600 hover:text-blue-800 p-0"
                />
                <MButton
                  variant="text"
                  text="View Documentation"
                  append-icon="fas fa-arrow-right"
                  class="text-purple-600 hover:text-purple-800 p-0"
                />
              </div>
            </div>
          </div>
        </MCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete catalog of all button variations, states, and styling options available in the component library.'
      }
    }
  }
};

// Form Components Showcase
export const FormComponentsCatalog = {
  render: () => ({
    components: { 
      MCard, MTextField, MSelect, MCheckbox, MSlider, MButton, MProgress 
    },
    setup() {
      const formData = reactive({
        // Text field data
        basicText: '',
        email: '',
        password: '',
        multiline: '',
        
        // Select data
        simpleSelect: '',
        multiSelect: [],
        searchableSelect: '',
        
        // Checkbox data
        singleCheck: false,
        multipleChecks: [],
        
        // Slider data
        basicSlider: 50,
        rangeSlider: [25, 75],
        stepSlider: 1000,
        
        // Advanced controls
        progress: 65
      });

      const selectOptions = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' }
      ];

      const multiSelectOptions = [
        { value: 'feature1', label: 'Feature 1' },
        { value: 'feature2', label: 'Feature 2' },
        { value: 'feature3', label: 'Feature 3' },
        { value: 'feature4', label: 'Feature 4' },
        { value: 'feature5', label: 'Feature 5' }
      ];

      const checkboxOptions = [
        { value: 'newsletter', label: 'Subscribe to newsletter' },
        { value: 'notifications', label: 'Enable notifications' },
        { value: 'analytics', label: 'Allow analytics tracking' },
        { value: 'marketing', label: 'Receive marketing emails' }
      ];

      return {
        formData,
        selectOptions,
        multiSelectOptions,
        checkboxOptions
      };
    },
    template: `
      <div class="space-y-8 p-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Form Components Catalog</h1>
          <p class="text-gray-600">Complete showcase of all form input components</p>
        </div>

        <!-- Text Field Variants -->
        <MCard title="Text Field Components" subtitle="Various text input configurations">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Basic Text Fields -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700">Basic Text Fields</h4>
              
              <MTextField
                v-model="formData.basicText"
                label="Basic Text Field"
                placeholder="Enter some text..."
                helper-text="This is a basic text input field"
              />
              
              <MTextField
                v-model="formData.email"
                label="Email Address"
                type="email"
                placeholder="user@example.com"
                prepend-icon="fas fa-envelope"
                required
              />
              
              <MTextField
                v-model="formData.password"
                label="Password"
                type="password"
                placeholder="Enter password"
                prepend-icon="fas fa-lock"
                show-password-toggle
                required
              />
            </div>

            <!-- Advanced Text Fields -->
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700">Advanced Configurations</h4>
              
              <MTextField
                v-model="formData.multiline"
                label="Multiline Text"
                multiline
                :rows="4"
                placeholder="Enter a longer description..."
                helper-text="This field supports multiple lines"
              />
              
              <MTextField
                label="Read-only Field"
                value="This field is read-only"
                readonly
                prepend-icon="fas fa-info-circle"
              />
              
              <MTextField
                label="Disabled Field"
                placeholder="This field is disabled"
                disabled
                prepend-icon="fas fa-ban"
              />
            </div>
          </div>

          <!-- Field Variants -->
          <div class="mt-8">
            <h4 class="text-sm font-medium text-gray-700 mb-4">Field Variants</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MTextField
                label="Outlined (Default)"
                placeholder="Outlined variant"
                variant="outlined"
              />
              
              <MTextField
                label="Filled Variant"
                placeholder="Filled variant"
                variant="filled"
              />
              
              <MTextField
                label="Standard Variant"
                placeholder="Standard variant"
                variant="standard"
              />
            </div>
          </div>
        </MCard>

        <!-- Select Components -->
        <MCard title="Select Components" subtitle="Dropdown and selection controls">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700">Basic Selects</h4>
              
              <MSelect
                v-model="formData.simpleSelect"
                label="Simple Select"
                :options="selectOptions"
                placeholder="Choose an option..."
                prepend-icon="fas fa-list"
              />
              
              <MSelect
                v-model="formData.searchableSelect"
                label="Searchable Select"
                :options="selectOptions"
                searchable
                placeholder="Search options..."
                prepend-icon="fas fa-search"
              />
            </div>

            <div class="space-y-4">
              <h4 class="text-sm font-medium text-gray-700">Advanced Selects</h4>
              
              <MSelect
                v-model="formData.multiSelect"
                label="Multi-Select"
                :options="multiSelectOptions"
                multiple
                placeholder="Select multiple options..."
                prepend-icon="fas fa-check-square"
              />
              
              <MSelect
                label="Disabled Select"
                :options="selectOptions"
                disabled
                placeholder="This select is disabled"
                prepend-icon="fas fa-ban"
              />
            </div>
          </div>
        </MCard>

        <!-- Checkbox Components -->
        <MCard title="Checkbox Components" subtitle="Various checkbox configurations">
          <div class="space-y-6">
            <!-- Basic Checkboxes -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Basic Checkboxes</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MCheckbox
                  v-model="formData.singleCheck"
                  label="Single Checkbox"
                  helper-text="This is a basic checkbox"
                />
                
                <MCheckbox
                  label="Disabled Checkbox"
                  disabled
                  helper="This checkbox is disabled"
                />
              </div>
            </div>

            <!-- Checkbox Groups -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Checkbox Groups</h4>
              <div class="space-y-3">
                <MCheckbox
                  v-for="option in checkboxOptions"
                  :key="option.value"
                  :model-value="formData.multipleChecks.includes(option.value)"
                  :label="option.label"
                  @update:model-value="(checked) => {
                    if (checked) {
                      formData.multipleChecks.push(option.value);
                    } else {
                      const index = formData.multipleChecks.indexOf(option.value);
                      if (index > -1) formData.multipleChecks.splice(index, 1);
                    }
                  }"
                />
              </div>
            </div>

            <!-- Checkbox Variants -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Checkbox Variants</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MCheckbox
                  label="Primary Color"
                  color="primary"
                  :model-value="true"
                />
                
                <MCheckbox
                  label="Success Color"
                  color="success"
                  :model-value="true"
                />
                
                <MCheckbox
                  label="Warning Color"
                  color="warning"
                  :model-value="true"
                />
              </div>
            </div>
          </div>
        </MCard>

        <!-- Slider Components -->
        <MCard title="Slider Components" subtitle="Range and value selection controls">
          <div class="space-y-6">
            <!-- Basic Sliders -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Basic Sliders</h4>
              <div class="space-y-6">
                <MSlider
                  v-model="formData.basicSlider"
                  label="Basic Slider"
                  :min="0"
                  :max="100"
                  :show-tooltip="true"
                />
                
                <MSlider
                  v-model="formData.stepSlider"
                  label="Loan Amount"
                  :min="1000"
                  :max="100000"
                  :step="1000"
                  unit="$"
                  :format-value="(value) => \`$\${value.toLocaleString()}\`"
                  :show-tooltip="true"
                  variant="success"
                />
              </div>
            </div>

            <!-- Slider with Markers -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Slider with Markers</h4>
              <MSlider
                v-model="formData.basicSlider"
                label="Credit Score Range"
                :min="300"
                :max="850"
                :step="10"
                :show-markers="true"
                :markers="[
                  { value: 300, label: 'Poor' },
                  { value: 500, label: 'Fair' },
                  { value: 650, label: 'Good' },
                  { value: 750, label: 'Excellent' },
                  { value: 850, label: 'Perfect' }
                ]"
                :show-tooltip="true"
                variant="primary"
              />
            </div>

            <!-- Slider Variants -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Slider Variants</h4>
              <div class="space-y-4">
                <MSlider
                  label="Primary Slider"
                  :model-value="60"
                  variant="primary"
                  :show-tooltip="true"
                />
                
                <MSlider
                  label="Success Slider"
                  :model-value="80"
                  variant="success"
                  :show-tooltip="true"
                />
                
                <MSlider
                  label="Warning Slider"
                  :model-value="40"
                  variant="warning"
                  :show-tooltip="true"
                />
                
                <MSlider
                  label="Disabled Slider"
                  :model-value="50"
                  disabled
                />
              </div>
            </div>
          </div>
        </MCard>

        <!-- Progress Components -->
        <MCard title="Progress Components" subtitle="Progress indicators and feedback">
          <div class="space-y-6">
            <!-- Linear Progress -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Linear Progress</h4>
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Primary Progress</span>
                    <span>{{ formData.progress }}%</span>
                  </div>
                  <MProgress
                    :value="formData.progress"
                    color="primary"
                    :show-percentage="false"
                  />
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Success Progress</span>
                    <span>85%</span>
                  </div>
                  <MProgress
                    :value="85"
                    color="success"
                    :show-percentage="false"
                  />
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Warning Progress</span>
                    <span>45%</span>
                  </div>
                  <MProgress
                    :value="45"
                    color="warning"
                    :show-percentage="false"
                  />
                </div>
              </div>
            </div>

            <!-- Progress with Labels -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Progress with Labels</h4>
              <div class="space-y-4">
                <MProgress
                  label="Application Progress"
                  :value="formData.progress"
                  :show-percentage="true"
                  color="primary"
                />
                
                <MProgress
                  label="Document Upload"
                  :value="100"
                  :show-percentage="true"
                  color="success"
                />
                
                <MProgress
                  label="Credit Check"
                  :value="30"
                  :show-percentage="true"
                  color="warning"
                />
              </div>
            </div>

            <!-- Interactive Progress Control -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Interactive Progress</h4>
              <MSlider
                v-model="formData.progress"
                label="Adjust Progress Value"
                :min="0"
                :max="100"
                :show-tooltip="true"
                :format-value="(value) => \`\${value}%\`"
              />
            </div>
          </div>
        </MCard>

        <!-- Form Layout Examples -->
        <MCard title="Form Layout Examples" subtitle="Complete form compositions">
          <div class="space-y-8">
            <!-- Horizontal Layout -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Horizontal Layout</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MTextField
                  label="First Name"
                  placeholder="Enter first name"
                  required
                />
                <MTextField
                  label="Last Name"
                  placeholder="Enter last name"
                  required
                />
                <MTextField
                  label="Email"
                  type="email"
                  placeholder="Enter email"
                  required
                />
                <MSelect
                  label="Country"
                  :options="[
                    { value: 'us', label: 'United States' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'uk', label: 'United Kingdom' }
                  ]"
                  required
                />
              </div>
            </div>

            <!-- Compact Form -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Compact Form</h4>
              <div class="max-w-md space-y-3">
                <MTextField
                  label="Username"
                  placeholder="Choose username"
                  size="small"
                  required
                />
                <MTextField
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  size="small"
                  required
                />
                <MCheckbox
                  label="Remember me"
                  size="small"
                />
                <MButton
                  variant="primary"
                  text="Sign In"
                  :full-width="true"
                />
              </div>
            </div>
          </div>
        </MCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive catalog of all form components including text fields, selects, checkboxes, sliders, and progress indicators.'
      }
    }
  }
};

// Card and Layout Showcase
export const CardLayoutCatalog = {
  render: () => ({
    components: { MCard, MButton, MMediaCard, MLayout, MProgress },
    setup() {
      const cardVariants = ['default', 'elevated', 'outlined', 'flat'];
      const cardSizes = ['small', 'medium', 'large'];
      const cardPadding = ['none', 'small', 'normal', 'large'];

      const mediaItems = [
        {
          title: 'Financial Dashboard',
          subtitle: 'Real-time analytics',
          description: 'Comprehensive dashboard with real-time financial data and analytics.',
          imageUrl: 'https://via.placeholder.com/300x200?text=Dashboard',
          tags: ['Analytics', 'Finance', 'Real-time']
        },
        {
          title: 'Loan Application',
          subtitle: 'Streamlined process',
          description: 'User-friendly loan application with step-by-step guidance.',
          imageUrl: 'https://via.placeholder.com/300x200?text=Loan+App',
          tags: ['Forms', 'Finance', 'UX']
        },
        {
          title: 'Credit Analysis',
          subtitle: 'Advanced algorithms',
          description: 'Sophisticated credit analysis using machine learning algorithms.',
          imageUrl: 'https://via.placeholder.com/300x200?text=Credit+Analysis',
          tags: ['AI', 'Credit', 'Analysis']
        }
      ];

      return {
        cardVariants,
        cardSizes,
        cardPadding,
        mediaItems
      };
    },
    template: `
      <div class="space-y-8 p-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Cards & Layout Catalog</h1>
          <p class="text-gray-600">Complete showcase of card components and layout patterns</p>
        </div>

        <!-- Basic Card Variants -->
        <MCard title="Card Variants" subtitle="Different card styling options">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MCard
              v-for="variant in cardVariants"
              :key="variant"
              :title="variant.charAt(0).toUpperCase() + variant.slice(1)"
              :subtitle="\`\${variant} variant\`"
              :variant="variant"
            >
              <p class="text-sm text-gray-600">
                This is a {{ variant }} card variant with sample content to demonstrate the styling.
              </p>
              
              <template #footer>
                <MButton
                  variant="text"
                  text="Learn More"
                  size="small"
                />
              </template>
            </MCard>
          </div>
        </MCard>

        <!-- Card Sizes -->
        <MCard title="Card Sizes" subtitle="Different size configurations">
          <div class="space-y-6">
            <MCard
              v-for="size in cardSizes"
              :key="size"
              :title="\`\${size.charAt(0).toUpperCase() + size.slice(1)} Card\`"
              :subtitle="\`This is a \${size} sized card\`"
              :size="size"
              variant="elevated"
            >
              <p :class="size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base'">
                Card content scales with the {{ size }} size setting. Typography and spacing adjust accordingly.
              </p>
              
              <template #footer>
                <div class="flex space-x-2">
                  <MButton
                    variant="primary"
                    text="Primary Action"
                    :size="size === 'large' ? 'medium' : 'small'"
                  />
                  <MButton
                    variant="outlined"
                    text="Secondary"
                    :size="size === 'large' ? 'medium' : 'small'"
                  />
                </div>
              </template>
            </MCard>
          </div>
        </MCard>

        <!-- Card Padding Options -->
        <MCard title="Card Padding Options" subtitle="Different padding configurations">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MCard
              v-for="padding in cardPadding"
              :key="padding"
              :title="padding.charAt(0).toUpperCase() + padding.slice(1)"
              :subtitle="\`\${padding} padding\`"
              :padding="padding"
              variant="outlined"
            >
              <p class="text-sm text-gray-600">
                This card demonstrates {{ padding }} padding settings.
              </p>
            </MCard>
          </div>
        </MCard>

        <!-- Interactive Cards -->
        <MCard title="Interactive Cards" subtitle="Clickable and dynamic cards">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Clickable Card -->
            <MCard
              title="Clickable Card"
              subtitle="Click to interact"
              variant="elevated"
              :clickable="true"
              @click="() => alert('Card clicked!')"
            >
              <p class="text-sm text-gray-600">
                This card has hover effects and can be clicked.
              </p>
              <div class="mt-2">
                <span class="text-xs text-blue-600">Click me!</span>
              </div>
            </MCard>

            <!-- Loading Card -->
            <MCard
              title="Loading Card"
              subtitle="Processing state"
              variant="elevated"
              :loading="true"
            >
              <p class="text-sm text-gray-600">
                This card shows a loading state.
              </p>
              <div class="mt-4">
                <MProgress :value="65" color="primary" />
              </div>
            </MCard>

            <!-- Action Card -->
            <MCard
              title="Action Card"
              subtitle="With header actions"
              variant="elevated"
            >
              <template #actions>
                <MButton
                  variant="text"
                  prepend-icon="fas fa-ellipsis-v"
                  :icon-only="true"
                />
              </template>
              
              <p class="text-sm text-gray-600">
                This card has actions in the header area.
              </p>
              
              <template #footer>
                <div class="flex justify-between">
                  <MButton variant="text" text="Cancel" />
                  <MButton variant="primary" text="Save" />
                </div>
              </template>
            </MCard>
          </div>
        </MCard>

        <!-- Media Cards -->
        <MCard title="Media Cards" subtitle="Cards with images and rich content">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MMediaCard
              v-for="item in mediaItems"
              :key="item.title"
              :title="item.title"
              :subtitle="item.subtitle"
              :description="item.description"
              :image-url="item.imageUrl"
              :tags="item.tags"
              variant="elevated"
            >
              <template #actions>
                <MButton variant="text" text="View Details" />
                <MButton variant="primary" text="Get Started" />
              </template>
            </MMediaCard>
          </div>
        </MCard>

        <!-- Complex Card Layouts -->
        <MCard title="Complex Card Layouts" subtitle="Advanced card compositions">
          <div class="space-y-6">
            <!-- Dashboard Card -->
            <MCard
              title="Financial Dashboard"
              subtitle="Q4 2024 Performance"
              variant="elevated"
              padding="large"
            >
              <template #actions>
                <MButton variant="text" text="Export" prepend-icon="fas fa-download" />
                <MButton variant="outline" text="Refresh" prepend-icon="fas fa-sync" />
              </template>
              
              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="text-sm text-blue-600 font-medium">Total Revenue</div>
                  <div class="text-2xl font-bold text-blue-900">$2.4M</div>
                  <div class="text-sm text-blue-600">+12% vs Q3</div>
                </div>
                
                <div class="bg-green-50 rounded-lg p-4">
                  <div class="text-sm text-green-600 font-medium">Loan Approvals</div>
                  <div class="text-2xl font-bold text-green-900">1,247</div>
                  <div class="text-sm text-green-600">+8% vs Q3</div>
                </div>
                
                <div class="bg-yellow-50 rounded-lg p-4">
                  <div class="text-sm text-yellow-600 font-medium">Avg Processing</div>
                  <div class="text-2xl font-bold text-yellow-900">2.4 days</div>
                  <div class="text-sm text-yellow-600">-15% vs Q3</div>
                </div>
                
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="text-sm text-purple-600 font-medium">Customer Sat.</div>
                  <div class="text-2xl font-bold text-purple-900">4.8/5</div>
                  <div class="text-sm text-purple-600">+0.2 vs Q3</div>
                </div>
              </div>
              
              <template #footer>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500">Last updated: 2 minutes ago</span>
                  <MButton variant="primary" text="View Full Report" />
                </div>
              </template>
            </MCard>

            <!-- Settings Card -->
            <MCard
              title="Account Settings"
              subtitle="Manage your preferences"
              variant="outlined"
            >
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div class="font-medium">Email Notifications</div>
                    <div class="text-sm text-gray-600">Receive updates via email</div>
                  </div>
                  <input type="checkbox" checked class="toggle" />
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div class="font-medium">Two-Factor Authentication</div>
                    <div class="text-sm text-gray-600">Enhanced security for your account</div>
                  </div>
                  <input type="checkbox" class="toggle" />
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div class="font-medium">Marketing Communications</div>
                    <div class="text-sm text-gray-600">Product updates and offers</div>
                  </div>
                  <input type="checkbox" checked class="toggle" />
                </div>
              </div>
              
              <template #footer>
                <div class="flex space-x-2">
                  <MButton variant="outline" text="Reset" />
                  <MButton variant="primary" text="Save Changes" />
                </div>
              </template>
            </MCard>
          </div>
        </MCard>

        <!-- Layout Examples -->
        <MCard title="Layout Patterns" subtitle="Common card arrangement patterns">
          <div class="space-y-8">
            <!-- Grid Layout -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Grid Layout</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <MCard
                  v-for="i in 8"
                  :key="'grid-' + i"
                  :title="\`Item \${i}\`"
                  :subtitle="\`Grid item \${i}\`"
                  variant="outlined"
                  size="small"
                >
                  <p class="text-xs text-gray-600">Content for grid item {{ i }}</p>
                </MCard>
              </div>
            </div>

            <!-- Masonry Layout -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-4">Staggered Heights</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MCard title="Short Card" variant="elevated">
                  <p class="text-sm text-gray-600">Brief content.</p>
                </MCard>
                
                <MCard title="Medium Card" variant="elevated">
                  <p class="text-sm text-gray-600">
                    This card has more content to demonstrate varying heights in a grid layout.
                    The content naturally makes this card taller.
                  </p>
                </MCard>
                
                <MCard title="Tall Card" variant="elevated">
                  <p class="text-sm text-gray-600">
                    This card has even more content to show how cards can have different heights
                    while maintaining a clean grid layout. The flexbox layout handles the 
                    alignment automatically.
                  </p>
                  <div class="mt-4 space-y-2">
                    <div class="w-full h-2 bg-gray-200 rounded"></div>
                    <div class="w-3/4 h-2 bg-gray-200 rounded"></div>
                    <div class="w-1/2 h-2 bg-gray-200 rounded"></div>
                  </div>
                </MCard>
              </div>
            </div>
          </div>
        </MCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete catalog of card components and layout patterns including variants, sizes, interactive states, and composition examples.'
      }
    }
  }
};
