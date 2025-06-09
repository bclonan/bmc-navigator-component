<template>
  <div class="dynamic-form-renderer">
    <!-- Form Header with Storage Status -->
    <div class="bg-white shadow-sm border-b sticky top-0 z-10">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ formSchema.title || 'Dynamic Form' }}</h1>
            <p class="text-gray-600">{{ formSchema.description || 'Powered by dynamic rendering engine' }}</p>
          </div>
          <div class="text-right">
            <div class="flex items-center space-x-4">
              <div class="text-sm">
                <div class="flex items-center">
                  <i :class="isFormValid ? 'fas fa-check-circle text-green-500' : 'fas fa-exclamation-circle text-red-500'" class="mr-1"></i>
                  <span>{{ isFormValid ? 'Valid' : 'Has Errors' }}</span>
                </div>
                <div class="text-xs text-gray-500">
                  {{ Object.keys(formData).length }} fields • {{ Math.round(storage.dataSize / 1024) }}KB
                </div>
              </div>
              <div v-if="hasUnsavedChanges" class="text-xs text-orange-600">
                <i class="fas fa-save mr-1"></i>
                Auto-saving...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-3 space-y-6">
          <div 
            v-for="section in formSchema.sections" 
            :key="section.id"
            v-show="isSectionVisible(section)"
          >
            <MCard 
              :title="section.title" 
              :subtitle="section.description"
              :class="getSectionClasses(section)"
            >
              <div :class="section.layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'">
                <div
                  v-for="field in section.fields"
                  :key="field.id"
                  v-show="isFieldVisible(field.id)"
                  :class="getFieldContainerClasses(field)"
                >
                  <!-- Dynamic Field Rendering -->
                  <component
                    :is="getFieldComponent(field)"
                    v-bind="getFieldProps(field)"
                    :model-value="getFieldValue(field.id, field.defaultValue)"
                    @update:model-value="setFieldValue(field.id, $event)"
                    @blur="touchField(field.id)"
                    :error-message="getFieldError(field.id)"
                    :disabled="isFieldDisabled(field.id)"
                    :required="isFieldRequired(field)"
                  />
                  
                  <!-- Field Help Text -->
                  <div v-if="field.helpText" class="text-xs text-gray-500 mt-1">
                    {{ field.helpText }}
                  </div>
                  
                  <!-- Real-time Validation Status -->
                  <div v-if="field.showValidationStatus && hasFieldError(field.id)" class="text-xs text-red-600 mt-1">
                    <i class="fas fa-exclamation-triangle mr-1"></i>
                    {{ getFieldError(field.id) }}
                  </div>
                </div>
              </div>
            </MCard>
          </div>
        </div>

        <!-- Sidebar with Form Controls and Data Inspector -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Form Controls -->
          <MCard title="Form Controls" subtitle="Actions and operations">
            <div class="space-y-3">
              <MButton
                @click="validateForm"
                variant="outlined"
                text="Validate All"
                prepend-icon="fas fa-check-circle"
                :full-width="true"
                size="sm"
              />
              
              <MButton
                @click="handleSubmit"
                :disabled="!isFormValid"
                :loading="isSubmitting"
                text="Submit Form"
                prepend-icon="fas fa-paper-plane"
                :full-width="true"
                size="sm"
              />
              
              <MButton
                @click="resetForm"
                variant="outlined"
                color="warning"
                text="Reset Form"
                prepend-icon="fas fa-undo"
                :full-width="true"
                size="sm"
              />
              
              <div class="border-t pt-3">
                <MButton
                  @click="exportData"
                  variant="outlined"
                  color="secondary"
                  text="Export JSON"
                  prepend-icon="fas fa-download"
                  :full-width="true"
                  size="sm"
                />
                
                <input
                  ref="importInput"
                  type="file"
                  accept=".json"
                  @change="handleImport"
                  class="hidden"
                />
                <MButton
                  @click="$refs.importInput.click()"
                  variant="outlined"
                  color="secondary"
                  text="Import JSON"
                  prepend-icon="fas fa-upload"
                  :full-width="true"
                  size="sm"
                  class="mt-2"
                />
              </div>
            </div>
          </MCard>

          <!-- Storage Information -->
          <MCard title="Storage Engine" subtitle="Data persistence status">
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>Storage Type:</span>
                <span class="font-medium">{{ storageType }}</span>
              </div>
              
              <div class="flex justify-between">
                <span>Auto-save:</span>
                <span class="font-medium text-green-600">Enabled</span>
              </div>
              
              <div class="flex justify-between">
                <span>Encryption:</span>
                <span class="font-medium text-blue-600">Active</span>
              </div>
              
              <div class="flex justify-between">
                <span>Data Size:</span>
                <span class="font-medium">{{ Math.round(storage.dataSize / 1024) }}KB</span>
              </div>
              
              <div class="flex justify-between">
                <span>Version:</span>
                <span class="font-medium">{{ storage.storage.metadata.version }}</span>
              </div>
              
              <div v-if="storage.storage.lastSaved" class="flex justify-between">
                <span>Last Saved:</span>
                <span class="font-medium text-xs">{{ formatTimeAgo(storage.storage.lastSaved) }}</span>
              </div>
            </div>
          </MCard>

          <!-- Real-time Calculations -->
          <MCard 
            v-if="hasCalculatedFields" 
            title="Live Calculations" 
            subtitle="Real-time computed values"
          >
            <div class="space-y-3 text-sm">
              <div v-for="calc in calculatedFields" :key="calc.id" class="flex justify-between">
                <span>{{ calc.label }}:</span>
                <span class="font-medium" :class="calc.colorClass">
                  {{ formatCalculatedValue(calc) }}
                </span>
              </div>
            </div>
          </MCard>

          <!-- Data Inspector -->
          <MCard title="Data Inspector" subtitle="Live form data">
            <div class="text-xs">
              <div class="bg-gray-100 p-2 rounded max-h-60 overflow-auto">
                <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
              </div>
            </div>
          </MCard>

          <!-- Validation Status -->
          <MCard v-if="Object.keys(formErrors).length > 0" title="Validation Errors" subtitle="Current form issues">
            <div class="space-y-2">
              <div 
                v-for="(error, fieldId) in formErrors" 
                :key="fieldId"
                class="text-xs text-red-600 p-2 bg-red-50 rounded"
              >
                <div class="font-medium">{{ getFieldLabel(fieldId) }}</div>
                <div>{{ error }}</div>
              </div>
            </div>
          </MCard>
        </div>
      </div>
    </div>

    <!-- Submission Status Modal -->
    <div 
      v-if="showSubmissionModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showSubmissionModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
        <div class="text-center">
          <i 
            :class="submissionResult.success ? 'fas fa-check-circle text-green-500' : 'fas fa-exclamation-circle text-red-500'"
            class="text-4xl mb-4"
          ></i>
          <h3 class="text-lg font-semibold mb-2">
            {{ submissionResult.success ? 'Success!' : 'Error' }}
          </h3>
          <p class="text-gray-600 mb-4">{{ submissionResult.message }}</p>
          <MButton
            @click="showSubmissionModal = false"
            text="Close"
            :full-width="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MCard from '../ui/MCard.vue';
import MButton from '../ui/MButton.vue';
import MTextField from '../ui/MTextField.vue';
import MSelect from '../ui/MSelect.vue';
import MCheckbox from '../ui/MCheckbox.vue';
import MSlider from '../ui/MSlider.vue';
import { useDynamicFormRenderer } from '../../composables/useDynamicFormRenderer.js';

export default {
  name: 'DynamicFormRenderer',
  
  components: {
    MCard,
    MButton,
    MTextField,
    MSelect,
    MCheckbox,
    MSlider
  },
  
  props: {
    schema: {
      type: Object,
      required: true
    },
    storageKey: {
      type: String,
      default: 'dynamic_form'
    },
    storageType: {
      type: String,
      default: 'localStorage'
    },
    onSubmit: {
      type: Function,
      default: null
    }
  },
  
  setup(props) {
    const dynamicForm = useDynamicFormRenderer({
      storageKey: props.storageKey,
      autoSave: true,
      enableValidation: true,
      enableConditionalLogic: true,
      enableCalculations: true
    });
    
    return {
      ...dynamicForm
    };
  },
  
  data() {
    return {
      isSubmitting: false,
      showSubmissionModal: false,
      submissionResult: null
    };
  },
  
  computed: {
    calculatedFields() {
      const fields = [];
      
      // Add specific calculated fields based on form data
      if (this.formData.employment?.grossMonthlyIncome && this.formData.financial?.monthlyDebtPayments) {
        const income = Number(this.formData.employment.grossMonthlyIncome) || 0;
        const debt = Number(this.formData.financial.monthlyDebtPayments) || 0;
        const ratio = income > 0 ? ((debt / income) * 100) : 0;
        
        fields.push({
          id: 'debt_to_income',
          label: 'Debt-to-Income Ratio',
          value: ratio,
          format: 'percentage',
          colorClass: ratio <= 30 ? 'text-green-600' : ratio <= 40 ? 'text-yellow-600' : 'text-red-600'
        });
      }
      
      if (this.formData.loan?.amount && this.formData.loan?.term) {
        const amount = Number(this.formData.loan.amount) || 0;
        const term = Number(this.formData.loan.term) || 12;
        const rate = this.getEstimatedRate();
        const monthlyPayment = this.calculateMonthlyPayment(amount, rate, term);
        
        fields.push({
          id: 'monthly_payment',
          label: 'Est. Monthly Payment',
          value: monthlyPayment,
          format: 'currency',
          colorClass: 'text-blue-600'
        });
      }
      
      return fields;
    },
    
    hasCalculatedFields() {
      return this.calculatedFields.length > 0;
    }
  },
  
  mounted() {
    this.loadSchema(this.schema);
  },
  
  watch: {
    schema: {
      handler(newSchema) {
        this.loadSchema(newSchema);
      },
      deep: true
    }
  },
  
  methods: {
    getFieldComponent(field) {
      const componentMap = {
        'MTextField': MTextField,
        'MSelect': MSelect,
        'MCheckbox': MCheckbox,
        'MSlider': MSlider
      };
      
      const config = this.getFieldConfig(field.id);
      const componentName = config?.component || 'MTextField';
      return componentMap[componentName] || MTextField;
    },
    
    getFieldProps(field) {
      const baseProps = {
        label: field.label,
        placeholder: field.placeholder,
        helperText: field.helperText,
        prependIcon: field.icon,
        required: this.isFieldRequired(field)
      };
      
      // Add field-specific props
      if (field.type === 'select' && field.options) {
        baseProps.options = field.options;
        baseProps.searchable = field.searchable;
      }
      
      if (field.type === 'slider') {
        baseProps.min = field.min || 0;
        baseProps.max = field.max || 100;
        baseProps.step = field.step || 1;
        baseProps.showValue = field.showValue !== false;
        baseProps.formatValue = field.formatValue;
        baseProps.color = field.color || 'primary';
      }
      
      if (field.type === 'textarea') {
        baseProps.multiline = true;
        baseProps.rows = field.rows || 3;
      }
      
      // Add styling props
      if (field.styling) {
        if (field.styling.wrap) {
          baseProps.wrap = true;
          baseProps.wrapperClass = field.styling.wrapperClass;
        }
        if (field.styling.extend) {
          baseProps.extend = true;
          baseProps.extendedClass = field.styling.extendedClass;
        }
      }
      
      return baseProps;
    },
    
    getFieldContainerClasses(field) {
      const classes = [];
      
      if (field.layout?.colSpan) {
        classes.push(`md:col-span-${field.layout.colSpan}`);
      }
      
      if (field.layout?.className) {
        classes.push(field.layout.className);
      }
      
      return classes.join(' ');
    },
    
    getSectionClasses(section) {
      const classes = [];
      
      if (section.styling?.className) {
        classes.push(section.styling.className);
      }
      
      return classes.join(' ');
    },
    
    isSectionVisible(section) {
      if (!section.conditional) return true;
      
      // Evaluate section conditional logic
      const { condition } = section.conditional;
      if (typeof condition === 'function') {
        return condition(this.formData);
      }
      
      return true;
    },
    
    isFieldRequired(field) {
      const config = this.getFieldConfig(field.id);
      return config?.required || field.required || false;
    },
    
    getFieldLabel(fieldId) {
      const config = this.getFieldConfig(fieldId);
      return config?.label || fieldId;
    },
    
    formatCalculatedValue(calc) {
      switch (calc.format) {
        case 'currency':
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
          }).format(calc.value);
        case 'percentage':
          return `${calc.value.toFixed(1)}%`;
        default:
          return calc.value.toString();
      }
    },
    
    getEstimatedRate() {
      const creditScore = Number(this.formData.financial?.creditScore) || 650;
      if (creditScore >= 750) return 0.06; // 6%
      if (creditScore >= 700) return 0.08; // 8%
      if (creditScore >= 650) return 0.12; // 12%
      return 0.18; // 18%
    },
    
    calculateMonthlyPayment(amount, annualRate, termMonths) {
      const monthlyRate = annualRate / 12;
      if (monthlyRate === 0) return amount / termMonths;
      
      const numerator = amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths);
      const denominator = Math.pow(1 + monthlyRate, termMonths) - 1;
      return numerator / denominator;
    },
    
    formatTimeAgo(date) {
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    },
    
    async handleSubmit() {
      this.isSubmitting = true;
      
      try {
        const result = await this.submitForm(async (data) => {
          if (this.onSubmit) {
            return await this.onSubmit(data);
          }
          
          // Default submission simulation
          await new Promise(resolve => setTimeout(resolve, 2000));
          return {
            id: 'APP-' + Date.now(),
            status: 'submitted',
            timestamp: new Date().toISOString()
          };
        });
        
        this.submissionResult = result;
        this.showSubmissionModal = true;
      } catch (error) {
        this.submissionResult = {
          success: false,
          message: `Submission failed: ${error.message}`
        };
        this.showSubmissionModal = true;
      } finally {
        this.isSubmitting = false;
      }
    },
    
    exportData() {
      const data = this.exportForm('json');
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `form-data-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    
    handleImport(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.importForm(data);
        } catch (error) {
          alert('Invalid JSON file');
        }
      };
      reader.readAsText(file);
    }
  }
};
</script>

<style scoped>
.dynamic-form-renderer {
  min-height: 100vh;
  background-color: #f9fafb;
}
</style>