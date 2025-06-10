<template>
  <div class="multi-step-form">
    <!-- Progress indicator -->
    <div v-if="showProgress" class="form-progress">
      <div class="progress-steps">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          :class="[
            'progress-step',
            getStepClass(index)
          ]"
          @click="navigateToStep(index)"
        >
          <div class="step-circle">
            <i v-if="isStepCompleted(index)" class="fas fa-check"></i>
            <span v-else>{{ index + 1 }}</span>
          </div>
          <span class="step-label md-caption">{{ step.title }}</span>
        </div>
      </div>
      
      <div class="progress-bar">
        <div 
          class="progress-fill"
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
    
    <!-- Form content -->
    <div class="form-container md-elevation-1">
      <!-- Step header -->
      <div class="step-header">
        <h2 class="step-title md-headline-5">{{ currentStep.title }}</h2>
        <p v-if="currentStep.description" class="step-description md-body-1">
          {{ currentStep.description }}
        </p>
      </div>
      
      <!-- Step content -->
      <div class="step-content">
        <slot 
          :name="`step-${currentStepIndex}`"
          :step="currentStep"
          :formData="formData"
          :errors="errors"
          :updateField="updateField"
          :validateField="validateField"
        >
          <!-- Default step content -->
          <div v-if="currentStep.fields" class="step-fields">
            <div 
              v-for="field in currentStep.fields" 
              :key="field.name"
              :class="['form-field', field.size && `field-${field.size}`]"
            >
              <!-- Text input -->
              <MTextField
                v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
                :label="field.label"
                :placeholder="field.placeholder"
                :type="field.type"
                :required="field.required"
                :disabled="field.disabled"
                :modelValue="formData[field.name]"
                @update:modelValue="updateField(field.name, $event)"
                @blur="validateField(field.name)"
                :error="errors[field.name]"
                :helper-text="field.helperText"
              />
              
              <!-- Select dropdown -->
              <MSelect
                v-else-if="field.type === 'select'"
                :label="field.label"
                :options="field.options"
                :required="field.required"
                :disabled="field.disabled"
                :modelValue="formData[field.name]"
                @update:modelValue="updateField(field.name, $event)"
                @blur="validateField(field.name)"
                :error="errors[field.name]"
                :helper-text="field.helperText"
              />
              
              <!-- Checkbox -->
              <MCheckbox
                v-else-if="field.type === 'checkbox'"
                :label="field.label"
                :required="field.required"
                :disabled="field.disabled"
                :checked="formData[field.name]"
                @update:checked="updateField(field.name, $event)"
                :error="errors[field.name]"
              />
              
              <!-- Slider -->
              <div v-else-if="field.type === 'slider'" class="slider-field">
                <label class="field-label md-subtitle-2">{{ field.label }}</label>
                <MSlider
                  :min="field.min || 0"
                  :max="field.max || 100"
                  :step="field.step || 1"
                  :value="formData[field.name]"
                  @input="updateField(field.name, $event)"
                  :prefix="field.prefix"
                  :suffix="field.suffix"
                />
                <div v-if="field.helperText" class="field-helper md-caption">
                  {{ field.helperText }}
                </div>
              </div>
              
              <!-- File upload -->
              <div v-else-if="field.type === 'file'" class="file-field">
                <label class="field-label md-subtitle-2">{{ field.label }}</label>
                <div class="file-upload">
                  <input
                    :id="field.name"
                    type="file"
                    :accept="field.accept"
                    :multiple="field.multiple"
                    @change="handleFileUpload(field.name, $event)"
                    class="file-input"
                  />
                  <label :for="field.name" class="file-label">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <span>{{ field.uploadText || 'Choose files' }}</span>
                  </label>
                  <div v-if="formData[field.name]" class="file-list">
                    <div 
                      v-for="(file, index) in getFileList(field.name)" 
                      :key="index"
                      class="file-item"
                    >
                      <span class="file-name">{{ file.name }}</span>
                      <button 
                        type="button"
                        @click="removeFile(field.name, index)"
                        class="file-remove"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div v-if="errors[field.name]" class="field-error md-caption">
                  {{ errors[field.name] }}
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>
      
      <!-- Navigation buttons -->
      <div class="form-navigation">
        <MButton
          v-if="currentStepIndex > 0"
          label="Previous"
          variant="outlined"
          @click="previousStep"
          :disabled="loading"
        />
        
        <div class="nav-spacer"></div>
        
        <MButton
          v-if="currentStepIndex < steps.length - 1"
          label="Next"
          variant="primary"
          @click="nextStep"
          :disabled="!canProceed || loading"
          :loading="loading"
        />
        
        <MButton
          v-else
          :label="submitText"
          variant="primary"
          @click="submitForm"
          :disabled="!canSubmit || loading"
          :loading="loading"
        />
      </div>
    </div>
    
    <!-- Summary sidebar (optional) -->
    <div v-if="showSummary" class="form-summary md-elevation-1">
      <h3 class="summary-title md-headline-6">Summary</h3>
      <div class="summary-content">
        <slot name="summary" :formData="formData" :steps="steps">
          <div 
            v-for="(step, index) in completedSteps" 
            :key="index"
            class="summary-step"
          >
            <h4 class="summary-step-title md-subtitle-2">{{ step.title }}</h4>
            <div class="summary-fields">
              <div 
                v-for="field in step.fields" 
                :key="field.name"
                v-show="formData[field.name] !== undefined && formData[field.name] !== ''"
                class="summary-field"
              >
                <span class="summary-label md-caption">{{ field.label }}:</span>
                <span class="summary-value md-body-2">{{ formatValue(field, formData[field.name]) }}</span>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import MTextField from '../ui/MTextField.vue'
import MSelect from '../ui/MSelect.vue'
import MCheckbox from '../ui/MCheckbox.vue'
import MSlider from '../ui/MSlider.vue'
import MButton from '../ui/MButton.vue'

export default {
  name: 'MMultiStepForm',
  components: {
    MTextField,
    MSelect,
    MCheckbox,
    MSlider,
    MButton
  },
  props: {
    steps: {
      type: Array,
      required: true
    },
    initialData: {
      type: Object,
      default: () => ({})
    },
    validation: {
      type: Object,
      default: () => ({})
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    allowNavigation: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: 'Submit'
    },
    autoSave: {
      type: Boolean,
      default: false
    },
    persistKey: {
      type: String,
      default: ''
    }
  },
  emits: ['step-change', 'field-change', 'submit', 'error'],
  data() {
    return {
      currentStepIndex: 0,
      formData: { ...this.initialData },
      errors: {},
      completedSteps: [],
      loading: false
    }
  },
  computed: {
    currentStep() {
      return this.steps[this.currentStepIndex] || {}
    },
    progressPercentage() {
      return Math.round(((this.currentStepIndex + 1) / this.steps.length) * 100)
    },
    canProceed() {
      return this.validateCurrentStep()
    },
    canSubmit() {
      return this.validateAllSteps()
    }
  },
  watch: {
    formData: {
      handler(newData) {
        if (this.autoSave && this.persistKey) {
          this.saveToStorage()
        }
        this.$emit('field-change', newData)
      },
      deep: true
    }
  },
  mounted() {
    if (this.persistKey) {
      this.loadFromStorage()
    }
  },
  methods: {
    updateField(fieldName, value) {
      this.formData[fieldName] = value
      this.clearError(fieldName)
    },
    
    validateField(fieldName) {
      const field = this.getCurrentField(fieldName)
      const value = this.formData[fieldName]
      
      if (!field) return true
      
      // Required validation
      if (field.required && (!value || value === '')) {
        this.errors[fieldName] = `${field.label} is required`
        return false
      }
      
      // Custom validation
      if (this.validation[fieldName]) {
        const result = this.validation[fieldName](value, this.formData)
        if (result !== true) {
          this.errors[fieldName] = result
          return false
        }
      }
      
      this.clearError(fieldName)
      return true
    },
    
    validateCurrentStep() {
      if (!this.currentStep.fields) return true
      
      return this.currentStep.fields.every(field => {
        return this.validateField(field.name)
      })
    },
    
    validateAllSteps() {
      return this.steps.every(step => {
        if (!step.fields) return true
        return step.fields.every(field => this.validateField(field.name))
      })
    },
    
    clearError(fieldName) {
      if (this.errors[fieldName]) {
        delete this.errors[fieldName]
        this.$forceUpdate()
      }
    },
    
    nextStep() {
      if (this.validateCurrentStep() && this.currentStepIndex < this.steps.length - 1) {
        this.completedSteps.push(this.currentStep)
        this.currentStepIndex++
        this.$emit('step-change', this.currentStepIndex, this.currentStep)
      }
    },
    
    previousStep() {
      if (this.currentStepIndex > 0) {
        this.currentStepIndex--
        this.$emit('step-change', this.currentStepIndex, this.currentStep)
      }
    },
    
    navigateToStep(stepIndex) {
      if (this.allowNavigation && stepIndex >= 0 && stepIndex < this.steps.length) {
        this.currentStepIndex = stepIndex
        this.$emit('step-change', this.currentStepIndex, this.currentStep)
      }
    },
    
    async submitForm() {
      if (!this.validateAllSteps()) {
        this.$emit('error', 'Please complete all required fields')
        return
      }
      
      this.loading = true
      try {
        await this.$emit('submit', this.formData)
        if (this.persistKey) {
          this.clearStorage()
        }
      } catch (error) {
        this.$emit('error', error.message || 'Submission failed')
      } finally {
        this.loading = false
      }
    },
    
    handleFileUpload(fieldName, event) {
      const files = Array.from(event.target.files)
      this.formData[fieldName] = files
    },
    
    removeFile(fieldName, index) {
      const files = [...(this.formData[fieldName] || [])]
      files.splice(index, 1)
      this.formData[fieldName] = files
    },
    
    getFileList(fieldName) {
      return this.formData[fieldName] || []
    },
    
    getCurrentField(fieldName) {
      return this.currentStep.fields?.find(field => field.name === fieldName)
    },
    
    getStepClass(index) {
      if (index < this.currentStepIndex) return 'step-completed'
      if (index === this.currentStepIndex) return 'step-current'
      return 'step-pending'
    },
    
    isStepCompleted(index) {
      return index < this.currentStepIndex
    },
    
    formatValue(field, value) {
      if (field.type === 'file') {
        return value?.length ? `${value.length} file(s)` : 'No files'
      }
      if (field.type === 'checkbox') {
        return value ? 'Yes' : 'No'
      }
      if (field.type === 'slider' && field.prefix) {
        return `${field.prefix}${value}${field.suffix || ''}`
      }
      return value || 'Not specified'
    },
    
    saveToStorage() {
      localStorage.setItem(`form_${this.persistKey}`, JSON.stringify({
        currentStepIndex: this.currentStepIndex,
        formData: this.formData,
        completedSteps: this.completedSteps
      }))
    },
    
    loadFromStorage() {
      const saved = localStorage.getItem(`form_${this.persistKey}`)
      if (saved) {
        const data = JSON.parse(saved)
        this.currentStepIndex = data.currentStepIndex || 0
        this.formData = { ...this.initialData, ...data.formData }
        this.completedSteps = data.completedSteps || []
      }
    },
    
    clearStorage() {
      if (this.persistKey) {
        localStorage.removeItem(`form_${this.persistKey}`)
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/themes/material-design.css';

.multi-step-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--vspace-28);
  max-width: 1200px;
  margin: 0 auto;
}

.multi-step-form.has-summary {
  grid-template-columns: 1fr 300px;
}

/* Progress indicator */
.form-progress {
  margin-bottom: var(--vspace-28);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--vspace-18);
  position: relative;
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: var(--transition-16);
  flex: 1;
  max-width: 120px;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-bottom: var(--vspace-8);
  transition: var(--transition-16);
}

.step-current .step-circle {
  background: var(--primary-color);
  color: white;
}

.step-completed .step-circle {
  background: var(--success-color);
  color: white;
}

.step-pending .step-circle {
  background: var(--color-lighthouse);
  color: var(--text-secondary);
  border: 2px solid var(--divider-color);
}

.step-label {
  text-align: center;
  color: var(--text-secondary);
  font-weight: 600;
}

.step-current .step-label {
  color: var(--primary-color);
}

.progress-bar {
  height: 4px;
  background: var(--color-lighthouse);
  border-radius: var(--border-radius-8);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: var(--transition-17);
}

/* Form container */
.form-container {
  background: var(--surface-color);
  border-radius: var(--border-radius-2);
  padding: var(--vspace-31);
}

.step-header {
  margin-bottom: var(--vspace-28);
  text-align: center;
}

.step-title {
  color: var(--text-primary);
  margin-bottom: var(--vspace-12);
}

.step-description {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Step content */
.step-content {
  margin-bottom: var(--vspace-31);
}

.step-fields {
  display: grid;
  gap: var(--vspace-18);
}

.form-field {
  width: 100%;
}

.field-small {
  grid-column: span 1;
}

.field-medium {
  grid-column: span 2;
}

.field-large {
  grid-column: span 3;
}

/* File upload styling */
.file-field {
  margin-bottom: var(--vspace-18);
}

.field-label {
  display: block;
  margin-bottom: var(--vspace-8);
  color: var(--text-primary);
  font-weight: 600;
}

.file-upload {
  border: 2px dashed var(--divider-color);
  border-radius: var(--border-radius-2);
  padding: var(--vspace-28);
  text-align: center;
  transition: var(--transition-14);
}

.file-upload:hover {
  border-color: var(--primary-color);
  background: var(--color-ceramic);
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--vspace-8);
  cursor: pointer;
  color: var(--text-secondary);
  font-weight: 600;
}

.file-label i {
  font-size: 2rem;
  color: var(--primary-color);
}

.file-list {
  margin-top: var(--vspace-14);
  display: flex;
  flex-direction: column;
  gap: var(--vspace-8);
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--vspace-8) var(--hspace-12);
  background: var(--color-lighthouse);
  border-radius: var(--border-radius-2);
}

.file-name {
  font-size: 0.875rem;
  color: var(--text-primary);
}

.file-remove {
  background: none;
  border: none;
  color: var(--error-color);
  cursor: pointer;
  padding: var(--vspace-5);
  border-radius: var(--border-radius-2);
  transition: var(--transition-2);
}

.file-remove:hover {
  background: var(--error-color);
  color: white;
}

/* Slider field */
.slider-field {
  margin-bottom: var(--vspace-18);
}

.field-helper {
  margin-top: var(--vspace-8);
  color: var(--text-secondary);
}

.field-error {
  margin-top: var(--vspace-8);
  color: var(--error-color);
}

/* Navigation */
.form-navigation {
  display: flex;
  align-items: center;
  gap: var(--hspace-15);
  padding-top: var(--vspace-18);
  border-top: 1px solid var(--divider-color);
}

.nav-spacer {
  flex: 1;
}

/* Summary sidebar */
.form-summary {
  background: var(--surface-color);
  border-radius: var(--border-radius-2);
  padding: var(--vspace-18);
  height: fit-content;
  position: sticky;
  top: var(--vspace-18);
}

.summary-title {
  margin-bottom: var(--vspace-18);
  color: var(--text-primary);
  text-align: center;
}

.summary-step {
  margin-bottom: var(--vspace-18);
  padding-bottom: var(--vspace-14);
  border-bottom: 1px solid var(--divider-color);
}

.summary-step:last-child {
  border-bottom: none;
}

.summary-step-title {
  margin-bottom: var(--vspace-12);
  color: var(--primary-color);
}

.summary-fields {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-8);
}

.summary-field {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-3);
}

.summary-label {
  color: var(--text-secondary);
  font-weight: 600;
}

.summary-value {
  color: var(--text-primary);
}

/* Responsive design */
@media (max-width: 1024px) {
  .multi-step-form.has-summary {
    grid-template-columns: 1fr;
  }
  
  .form-summary {
    order: -1;
    position: static;
  }
}

@media (max-width: 768px) {
  .progress-steps {
    flex-direction: column;
    gap: var(--vspace-12);
  }
  
  .progress-step {
    flex-direction: row;
    max-width: none;
    justify-content: flex-start;
  }
  
  .step-circle {
    margin-bottom: 0;
    margin-right: var(--hspace-12);
  }
  
  .form-container {
    padding: var(--vspace-18);
  }
  
  .step-fields {
    gap: var(--vspace-14);
  }
  
  .form-navigation {
    flex-direction: column;
    gap: var(--vspace-12);
  }
  
  .nav-spacer {
    display: none;
  }
}

@media (max-width: 480px) {
  .step-circle {
    width: 32px;
    height: 32px;
    font-size: 0.875rem;
  }
  
  .form-container {
    padding: var(--vspace-14);
  }
  
  .file-upload {
    padding: var(--vspace-18);
  }
}
</style>
