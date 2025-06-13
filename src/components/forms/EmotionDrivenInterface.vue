<template>
  <div 
    class="emotion-driven-interface" 
    :class="[
      `interface-mode-${currentMode}`,
      `emotion-state-${currentEmotion}`,
      `stress-level-${stressLevel}`,
      { 'adaptive-mode': adaptiveMode }
    ]"
    :style="dynamicStyles"
  >
    <!-- Adaptive Header -->
    <div class="adaptive-header">
      <div class="emotional-indicator">
        <div class="emotion-visualization">
          <div class="emotion-pulse" :style="{ animationDuration: getPulseSpeed() }"></div>
          <span class="current-emotion-emoji">{{ getCurrentEmotionEmoji() }}</span>
        </div>
        <div class="emotion-details">
          <span class="emotion-label">{{ getCurrentEmotionLabel() }}</span>
          <span class="confidence-score">{{ emotionalConfidence }}% confidence</span>
        </div>
      </div>
      
      <div class="interface-controls">
        <button @click="toggleAdaptiveMode" class="adaptive-toggle">
          {{ adaptiveMode ? 'Manual Mode' : 'Adaptive Mode' }}
        </button>
        <button @click="resetInterface" class="reset-button">
          Reset Interface
        </button>
      </div>
    </div>

    <!-- Dynamic Navigation -->
    <nav class="adaptive-navigation" :class="getNavigationStyle()">
      <div class="nav-items">
        <button 
          v-for="item in adaptiveNavigation" 
          :key="item.id"
          @click="navigateToStep(item.step)"
          :class="[
            'nav-item',
            { 'active': currentStep === item.step },
            { 'completed': item.step < currentStep },
            { 'simplified': isSimplifiedMode() }
          ]"
          :disabled="item.disabled"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span class="nav-label" v-if="!isSimplifiedMode()">{{ item.label }}</span>
          <span class="nav-progress" v-if="item.progress">{{ item.progress }}%</span>
        </button>
      </div>
      
      <div class="emotional-assistance" v-if="needsAssistance()">
        <div class="assistance-prompt">
          <span class="assistance-icon">{{ getAssistanceIcon() }}</span>
          <span class="assistance-message">{{ getAssistanceMessage() }}</span>
          <button @click="activateAssistance" class="assistance-button">
            Get Help
          </button>
        </div>
      </div>
    </nav>

    <!-- Adaptive Content Area -->
    <main class="adaptive-content" :class="getContentStyle()">
      <!-- Emotional Context Bar -->
      <div class="emotional-context-bar" v-if="showContextualInfo()">
        <div class="context-insights">
          <div class="insight-item">
            <span class="insight-icon">🎯</span>
            <span class="insight-text">{{ getContextualInsight() }}</span>
          </div>
          <div class="progress-encouragement" v-if="shouldShowEncouragement()">
            <span class="encouragement-text">{{ getEncouragementMessage() }}</span>
          </div>
        </div>
        
        <div class="adaptive-controls">
          <button 
            @click="adjustInterfaceComplexity('simple')"
            :class="['complexity-btn', { 'active': interfaceComplexity === 'simple' }]"
          >
            Simple
          </button>
          <button 
            @click="adjustInterfaceComplexity('standard')"
            :class="['complexity-btn', { 'active': interfaceComplexity === 'standard' }]"
          >
            Standard
          </button>
          <button 
            @click="adjustInterfaceComplexity('detailed')"
            :class="['complexity-btn', { 'active': interfaceComplexity === 'detailed' }]"
          >
            Detailed
          </button>
        </div>
      </div>

      <!-- Dynamic Form Content -->
      <div class="form-content-adaptive" :class="getFormContentClasses()">
        <slot name="form-content" :adaptations="currentAdaptations">
          <!-- Default adaptive form content -->
          <div class="adaptive-form-section">
            <div class="section-header" :class="getSectionHeaderStyle()">
              <h2>{{ getCurrentSectionTitle() }}</h2>
              <p v-if="showSectionDescription()" class="section-description">
                {{ getCurrentSectionDescription() }}
              </p>
            </div>
            
            <div class="form-fields-grid" :class="getFieldGridStyle()">
              <div 
                v-for="field in getAdaptiveFields()" 
                :key="field.id"
                class="adaptive-field"
                :class="getFieldClasses(field)"
              >
                <label :class="getLabelClasses(field)">
                  {{ field.label }}
                  <span v-if="field.required && showRequiredIndicators()" class="required-indicator">*</span>
                  <span v-if="field.helpText && showInlineHelp()" class="field-help">
                    {{ field.helpText }}
                  </span>
                </label>
                
                <component
                  :is="getFieldComponent(field.type)"
                  v-model="fieldValues[field.id]"
                  :class="getInputClasses(field)"
                  :placeholder="getAdaptivePlaceholder(field)"
                  :disabled="field.disabled"
                  @focus="handleFieldFocus(field)"
                  @blur="handleFieldBlur(field)"
                  @input="handleFieldInput(field, $event)"
                />
                
                <div v-if="fieldErrors[field.id]" class="field-error">
                  {{ fieldErrors[field.id] }}
                </div>
                
                <div v-if="field.emotionalGuidance && showEmotionalGuidance()" class="emotional-guidance">
                  <span class="guidance-icon">{{ field.emotionalGuidance.icon }}</span>
                  <span class="guidance-text">{{ field.emotionalGuidance.message }}</span>
                </div>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <!-- Adaptive Sidebar -->
      <aside class="adaptive-sidebar" v-if="showSidebar()" :class="getSidebarStyle()">
        <!-- Real-time Emotional Support -->
        <div class="emotional-support-panel">
          <h3>How are you feeling?</h3>
          <div class="emotion-quick-select">
            <button
              v-for="emotion in quickEmotions"
              :key="emotion.id"
              @click="selectQuickEmotion(emotion)"
              :class="['emotion-btn', { 'selected': currentEmotion === emotion.id }]"
            >
              <span class="emotion-emoji">{{ emotion.emoji }}</span>
              <span class="emotion-name">{{ emotion.name }}</span>
            </button>
          </div>
        </div>

        <!-- Adaptive Help System -->
        <div class="adaptive-help-system">
          <h4>Personalized Assistance</h4>
          <div class="help-suggestions">
            <div 
              v-for="suggestion in getPersonalizedHelp()"
              :key="suggestion.id"
              class="help-suggestion"
              @click="activateHelpSuggestion(suggestion)"
            >
              <span class="suggestion-icon">{{ suggestion.icon }}</span>
              <div class="suggestion-content">
                <span class="suggestion-title">{{ suggestion.title }}</span>
                <span class="suggestion-description">{{ suggestion.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Insights -->
        <div class="progress-insights">
          <h4>Your Progress</h4>
          <div class="progress-visualization">
            <div class="progress-ring">
              <svg viewBox="0 0 36 36" class="circular-chart">
                <path
                  class="circle-bg"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  class="circle"
                  :stroke-dasharray="`${progressPercentage}, 100`"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div class="progress-center">
                <span class="progress-value">{{ progressPercentage }}%</span>
                <span class="progress-label">Complete</span>
              </div>
            </div>
            
            <div class="progress-milestones">
              <div v-for="milestone in progressMilestones" :key="milestone.step" class="milestone">
                <span class="milestone-icon">{{ milestone.completed ? '✓' : milestone.icon }}</span>
                <span class="milestone-label">{{ milestone.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Emotional Journey Tracker -->
        <div class="emotional-journey-tracker">
          <h4>Emotional Journey</h4>
          <div class="journey-timeline">
            <div 
              v-for="(entry, index) in emotionalHistory.slice(-5)" 
              :key="index"
              class="journey-entry"
            >
              <span class="journey-time">{{ formatTime(entry.timestamp) }}</span>
              <span class="journey-emotion">{{ entry.emotion.emoji }}</span>
              <span class="journey-context">{{ entry.context }}</span>
            </div>
          </div>
          
          <div class="journey-insights">
            <p class="insight-summary">{{ getJourneyInsight() }}</p>
          </div>
        </div>
      </aside>
    </main>

    <!-- Adaptive Footer -->
    <footer class="adaptive-footer" :class="getFooterStyle()">
      <div class="emotional-wellness-check" v-if="shouldShowWellnessCheck()">
        <div class="wellness-prompt">
          <span class="wellness-icon">🌟</span>
          <span class="wellness-message">{{ getWellnessMessage() }}</span>
          <button @click="performWellnessAction" class="wellness-action">
            {{ getWellnessActionLabel() }}
          </button>
        </div>
      </div>
      
      <div class="adaptive-actions">
        <button 
          @click="previousStep" 
          :disabled="currentStep <= 1"
          class="step-button previous"
          :class="getStepButtonStyle('previous')"
        >
          {{ getPreviousButtonLabel() }}
        </button>
        
        <div class="step-indicator">
          <span class="current-step">{{ currentStep }}</span>
          <span class="step-separator">of</span>
          <span class="total-steps">{{ totalSteps }}</span>
        </div>
        
        <button 
          @click="nextStep"
          :disabled="!canProceed"
          class="step-button next"
          :class="getStepButtonStyle('next')"
        >
          {{ getNextButtonLabel() }}
        </button>
      </div>
    </footer>

    <!-- Floating Emotional Assistant -->
    <div 
      v-if="showFloatingAssistant()" 
      class="floating-emotional-assistant"
      :class="getAssistantStyle()"
    >
      <div class="assistant-avatar">
        <span class="assistant-emoji">{{ getAssistantEmoji() }}</span>
      </div>
      
      <div class="assistant-bubble">
        <p class="assistant-message">{{ getAssistantMessage() }}</p>
        <div class="assistant-actions">
          <button 
            v-for="action in getAssistantActions()" 
            :key="action.id"
            @click="performAssistantAction(action)"
            class="assistant-action-btn"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
      
      <button @click="dismissAssistant" class="assistant-dismiss">×</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

export default {
  name: 'EmotionDrivenInterface',
  props: {
    currentStep: {
      type: Number,
      default: 1
    },
    totalSteps: {
      type: Number,
      default: 5
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    emotionalData: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    'emotion-changed',
    'interface-adapted',
    'step-changed',
    'assistance-requested',
    'wellness-action'
  ],
  setup(props, { emit }) {
    // Core state
    const adaptiveMode = ref(true);
    const currentEmotion = ref('neutral');
    const emotionalConfidence = ref(85);
    const stressLevel = ref('low');
    const interfaceComplexity = ref('standard');
    const currentMode = ref('adaptive');
    
    // Interface state
    const fieldValues = ref({});
    const fieldErrors = ref({});
    const emotionalHistory = ref([]);
    const assistantVisible = ref(false);
    const assistantMessage = ref('');
    
    // Behavioral tracking
    const userBehavior = ref({
      timeOnStep: 0,
      clickCount: 0,
      errorCount: 0,
      helpRequests: 0,
      lastActivity: Date.now()
    });

    const quickEmotions = ref([
      { id: 'confident', emoji: '😎', name: 'Confident' },
      { id: 'focused', emoji: '🤔', name: 'Focused' },
      { id: 'confused', emoji: '😕', name: 'Confused' },
      { id: 'frustrated', emoji: '😤', name: 'Frustrated' },
      { id: 'excited', emoji: '🤩', name: 'Excited' },
      { id: 'tired', emoji: '😴', name: 'Tired' }
    ]);

    const adaptiveNavigation = ref([
      { id: 1, step: 1, icon: '👤', label: 'Personal Info', progress: 100, disabled: false },
      { id: 2, step: 2, icon: '🏠', label: 'Address', progress: 75, disabled: false },
      { id: 3, step: 3, icon: '💼', label: 'Employment', progress: 45, disabled: false },
      { id: 4, step: 4, icon: '💰', label: 'Loan Details', progress: 0, disabled: true },
      { id: 5, step: 5, icon: '✅', label: 'Review', progress: 0, disabled: true }
    ]);

    const progressMilestones = ref([
      { step: 1, icon: '📝', label: 'Started', completed: true },
      { step: 2, icon: '🏠', label: 'Address Added', completed: true },
      { step: 3, icon: '💼', label: 'Employment Info', completed: false },
      { step: 4, icon: '💰', label: 'Loan Configured', completed: false },
      { step: 5, icon: '🎉', label: 'Application Complete', completed: false }
    ]);

    // Computed properties
    const progressPercentage = computed(() => {
      return Math.round((props.currentStep / props.totalSteps) * 100);
    });

    const currentAdaptations = computed(() => {
      return {
        emotion: currentEmotion.value,
        complexity: interfaceComplexity.value,
        stressLevel: stressLevel.value,
        mode: currentMode.value
      };
    });

    const dynamicStyles = computed(() => {
      const emotion = currentEmotion.value;
      const stress = stressLevel.value;
      
      const colorMap = {
        confident: { primary: '#3b82f6', secondary: '#dbeafe', accent: '#1d4ed8' },
        focused: { primary: '#f97316', secondary: '#fed7aa', accent: '#ea580c' },
        confused: { primary: '#fbbf24', secondary: '#fef3c7', accent: '#d97706' },
        frustrated: { primary: '#ef4444', secondary: '#fecaca', accent: '#dc2626' },
        excited: { primary: '#a855f7', secondary: '#e9d5ff', accent: '#9333ea' },
        tired: { primary: '#64748b', secondary: '#f1f5f9', accent: '#475569' },
        neutral: { primary: '#6b7280', secondary: '#f3f4f6', accent: '#4b5563' }
      };

      const colors = colorMap[emotion] || colorMap.neutral;
      
      return {
        '--primary-color': colors.primary,
        '--secondary-color': colors.secondary,
        '--accent-color': colors.accent,
        '--stress-intensity': stress === 'high' ? '1' : stress === 'medium' ? '0.7' : '0.4',
        '--animation-speed': stress === 'high' ? '0.5s' : stress === 'medium' ? '1s' : '2s'
      };
    });

    const canProceed = computed(() => {
      // Implement validation logic based on current step and emotional state
      return true; // Simplified for demo
    });

    // Methods
    const getCurrentEmotionEmoji = () => {
      const emojiMap = {
        confident: '😎',
        focused: '🤔',
        confused: '😕',
        frustrated: '😤',
        excited: '🤩',
        tired: '😴',
        neutral: '😐'
      };
      return emojiMap[currentEmotion.value] || '😐';
    };

    const getCurrentEmotionLabel = () => {
      return currentEmotion.value.charAt(0).toUpperCase() + currentEmotion.value.slice(1);
    };

    const getPulseSpeed = () => {
      const speedMap = {
        high: '0.8s',
        medium: '1.2s',
        low: '2s'
      };
      return speedMap[stressLevel.value] || '1.5s';
    };

    const toggleAdaptiveMode = () => {
      adaptiveMode.value = !adaptiveMode.value;
      currentMode.value = adaptiveMode.value ? 'adaptive' : 'manual';
      emit('interface-adapted', { mode: currentMode.value });
    };

    const resetInterface = () => {
      interfaceComplexity.value = 'standard';
      currentEmotion.value = 'neutral';
      stressLevel.value = 'low';
      assistantVisible.value = false;
      emit('interface-adapted', { action: 'reset' });
    };

    const selectQuickEmotion = (emotion) => {
      currentEmotion.value = emotion.id;
      recordEmotionalEntry(emotion.id, 'manual_selection');
      adaptInterface();
      emit('emotion-changed', {
        emotion: emotion.id,
        confidence: emotionalConfidence.value,
        timestamp: Date.now()
      });
    };

    const recordEmotionalEntry = (emotion, context) => {
      emotionalHistory.value.push({
        emotion: { id: emotion, emoji: getCurrentEmotionEmoji() },
        context,
        timestamp: Date.now(),
        step: props.currentStep
      });
      
      // Keep only last 20 entries
      if (emotionalHistory.value.length > 20) {
        emotionalHistory.value = emotionalHistory.value.slice(-20);
      }
    };

    const adaptInterface = () => {
      if (!adaptiveMode.value) return;

      const emotion = currentEmotion.value;
      const stress = stressLevel.value;
      
      // Adapt complexity based on emotion and stress
      if (['frustrated', 'confused', 'tired'].includes(emotion) || stress === 'high') {
        interfaceComplexity.value = 'simple';
      } else if (['confident', 'focused'].includes(emotion) && stress === 'low') {
        interfaceComplexity.value = 'detailed';
      } else {
        interfaceComplexity.value = 'standard';
      }

      // Show assistant for negative emotions
      if (['frustrated', 'confused'].includes(emotion)) {
        showEmotionalAssistant();
      }

      emit('interface-adapted', currentAdaptations.value);
    };

    const showEmotionalAssistant = () => {
      assistantVisible.value = true;
      assistantMessage.value = getContextualAssistantMessage();
    };

    const getContextualAssistantMessage = () => {
      const messages = {
        frustrated: "I notice you might be feeling frustrated. Would you like me to simplify this step or provide additional help?",
        confused: "It looks like this section might be unclear. I can break it down into smaller steps for you.",
        tired: "You've been working hard! Would you like to take a break or save your progress?",
        anxious: "Take your time - there's no rush. I'm here to help if you need clarification on anything."
      };
      return messages[currentEmotion.value] || "I'm here to help make this process easier for you.";
    };

    const adjustInterfaceComplexity = (level) => {
      interfaceComplexity.value = level;
      emit('interface-adapted', { complexity: level });
    };

    const navigateToStep = (step) => {
      if (step <= props.currentStep) {
        emit('step-changed', step);
      }
    };

    const nextStep = () => {
      if (canProceed.value) {
        emit('step-changed', props.currentStep + 1);
      }
    };

    const previousStep = () => {
      if (props.currentStep > 1) {
        emit('step-changed', props.currentStep - 1);
      }
    };

    const handleFieldFocus = (field) => {
      userBehavior.value.lastActivity = Date.now();
      
      // Show contextual help for complex fields
      if (interfaceComplexity.value === 'simple' && field.complexity === 'high') {
        showFieldGuidance(field);
      }
    };

    const handleFieldBlur = (field) => {
      // Validate field and update emotional state if needed
      validateField(field);
    };

    const handleFieldInput = (field, event) => {
      fieldValues.value[field.id] = event.target ? event.target.value : event;
      
      // Clear errors when user starts typing
      if (fieldErrors.value[field.id]) {
        delete fieldErrors.value[field.id];
      }
      
      // Track user behavior
      userBehavior.value.lastActivity = Date.now();
    };

    const validateField = (field) => {
      // Implement field validation logic
      const value = fieldValues.value[field.id];
      
      if (field.required && (!value || value.trim() === '')) {
        fieldErrors.value[field.id] = `${field.label} is required`;
        userBehavior.value.errorCount++;
        
        // Adapt to errors
        if (userBehavior.value.errorCount > 2) {
          if (currentEmotion.value !== 'frustrated') {
            currentEmotion.value = 'frustrated';
            stressLevel.value = 'medium';
            adaptInterface();
          }
        }
      }
    };

    const activateAssistance = () => {
      emit('assistance-requested', {
        emotion: currentEmotion.value,
        step: props.currentStep,
        context: 'emotional_distress'
      });
    };

    const performWellnessAction = () => {
      const action = getWellnessActionType();
      emit('wellness-action', {
        action,
        emotion: currentEmotion.value,
        timestamp: Date.now()
      });
    };

    const dismissAssistant = () => {
      assistantVisible.value = false;
    };

    // Styling methods
    const getNavigationStyle = () => {
      return {
        'simplified': interfaceComplexity.value === 'simple',
        'detailed': interfaceComplexity.value === 'detailed',
        'stress-adapted': stressLevel.value === 'high'
      };
    };

    const getContentStyle = () => {
      return {
        'single-column': interfaceComplexity.value === 'simple',
        'multi-column': interfaceComplexity.value === 'detailed',
        'stress-reduced': stressLevel.value === 'high'
      };
    };

    const getFormContentClasses = () => {
      return {
        'simplified-layout': interfaceComplexity.value === 'simple',
        'detailed-layout': interfaceComplexity.value === 'detailed',
        'emotional-adaptation': adaptiveMode.value
      };
    };

    const getSectionHeaderStyle = () => {
      return {
        'minimalist': interfaceComplexity.value === 'simple',
        'comprehensive': interfaceComplexity.value === 'detailed'
      };
    };

    const getFieldGridStyle = () => {
      const gridMap = {
        simple: 'single-column',
        standard: 'two-column',
        detailed: 'three-column'
      };
      return gridMap[interfaceComplexity.value];
    };

    const getFieldClasses = (field) => {
      return {
        'high-priority': field.priority === 'high',
        'emotional-sensitive': field.emotionalSensitive,
        'simplified': interfaceComplexity.value === 'simple' && field.complexity === 'high'
      };
    };

    const getLabelClasses = (field) => {
      return {
        'prominent': interfaceComplexity.value === 'simple',
        'detailed': interfaceComplexity.value === 'detailed',
        'stress-friendly': stressLevel.value === 'high'
      };
    };

    const getInputClasses = (field) => {
      return {
        'large-target': stressLevel.value === 'high' || interfaceComplexity.value === 'simple',
        'detailed-input': interfaceComplexity.value === 'detailed',
        'error-state': fieldErrors.value[field.id]
      };
    };

    // Helper methods for conditional rendering
    const needsAssistance = () => {
      return ['frustrated', 'confused', 'anxious'].includes(currentEmotion.value) ||
             stressLevel.value === 'high' ||
             userBehavior.value.errorCount > 2;
    };

    const showContextualInfo = () => {
      return interfaceComplexity.value !== 'simple' && adaptiveMode.value;
    };

    const shouldShowEncouragement = () => {
      return ['tired', 'frustrated'].includes(currentEmotion.value) ||
             progressPercentage.value > 50;
    };

    const showSidebar = () => {
      return interfaceComplexity.value !== 'simple' && adaptiveMode.value;
    };

    const showFloatingAssistant = () => {
      return assistantVisible.value && adaptiveMode.value;
    };

    const shouldShowWellnessCheck = () => {
      const timeOnStep = Date.now() - userBehavior.value.lastActivity;
      return timeOnStep > 300000 || // 5 minutes
             stressLevel.value === 'high' ||
             ['frustrated', 'tired', 'anxious'].includes(currentEmotion.value);
    };

    const isSimplifiedMode = () => {
      return interfaceComplexity.value === 'simple';
    };

    const showSectionDescription = () => {
      return interfaceComplexity.value !== 'simple';
    };

    const showRequiredIndicators = () => {
      return interfaceComplexity.value !== 'simple';
    };

    const showInlineHelp = () => {
      return interfaceComplexity.value === 'detailed' ||
             (interfaceComplexity.value === 'standard' && stressLevel.value !== 'low');
    };

    const showEmotionalGuidance = () => {
      return adaptiveMode.value && ['confused', 'frustrated', 'anxious'].includes(currentEmotion.value);
    };

    // Content generation methods
    const getCurrentSectionTitle = () => {
      const titles = {
        1: 'Personal Information',
        2: 'Address Details',
        3: 'Employment Information',
        4: 'Loan Preferences',
        5: 'Review & Submit'
      };
      return titles[props.currentStep] || 'Form Section';
    };

    const getCurrentSectionDescription = () => {
      const descriptions = {
        1: 'Please provide your basic personal details for identity verification.',
        2: 'We need your current address information for processing your application.',
        3: 'Employment details help us assess your application more accurately.',
        4: 'Configure your loan amount and terms based on your needs.',
        5: 'Please review all information before submitting your application.'
      };
      return descriptions[props.currentStep] || '';
    };

    const getAdaptiveFields = () => {
      // Return fields based on current step and complexity
      const baseFields = [
        {
          id: 'field1',
          type: 'text',
          label: 'Sample Field',
          required: true,
          complexity: 'medium',
          helpText: 'This is a sample field for demonstration',
          emotionalGuidance: {
            icon: '💡',
            message: 'Take your time with this field'
          }
        }
      ];
      
      return baseFields.filter(field => {
        if (interfaceComplexity.value === 'simple') {
          return field.complexity !== 'high';
        }
        return true;
      });
    };

    const getFieldComponent = (type) => {
      const componentMap = {
        text: 'input',
        email: 'input',
        tel: 'input',
        select: 'select',
        textarea: 'textarea'
      };
      return componentMap[type] || 'input';
    };

    const getAdaptivePlaceholder = (field) => {
      if (interfaceComplexity.value === 'simple') {
        return field.simplePlaceholder || field.placeholder || '';
      }
      return field.placeholder || '';
    };

    const getContextualInsight = () => {
      const insights = {
        confident: 'You\'re making great progress! Keep up the excellent work.',
        focused: 'Your attention to detail is appreciated. Take your time.',
        confused: 'Don\'t worry if this seems complex - we\'re here to help.',
        frustrated: 'We understand this can be challenging. Let us assist you.',
        excited: 'Your enthusiasm is wonderful! We\'re excited to help you.',
        tired: 'You\'re doing well. Feel free to take breaks as needed.',
        neutral: 'You\'re progressing steadily through the application.'
      };
      return insights[currentEmotion.value] || insights.neutral;
    };

    const getEncouragementMessage = () => {
      const messages = [
        'You\'re over halfway there!',
        'Great job staying focused!',
        'Almost done - you\'ve got this!',
        'Your persistence is paying off!',
        'Each step brings you closer to approval!'
      ];
      return messages[Math.floor(Math.random() * messages.length)];
    };

    const getPersonalizedHelp = () => {
      const helpItems = {
        confused: [
          { id: 1, icon: '📖', title: 'Step-by-step Guide', description: 'Detailed walkthrough of this section' },
          { id: 2, icon: '💬', title: 'Live Chat', description: 'Chat with a helpful agent' }
        ],
        frustrated: [
          { id: 1, icon: '🎯', title: 'Simplify Form', description: 'Switch to easier view' },
          { id: 2, icon: '📞', title: 'Phone Support', description: 'Speak with someone now' }
        ],
        tired: [
          { id: 1, icon: '💾', title: 'Save Progress', description: 'Save and continue later' },
          { id: 2, icon: '☕', title: 'Take a Break', description: 'Guided relaxation exercise' }
        ]
      };
      return helpItems[currentEmotion.value] || helpItems.confused;
    };

    const getJourneyInsight = () => {
      if (emotionalHistory.value.length === 0) {
        return 'Start tracking your emotional journey by selecting how you feel.';
      }
      
      const recentEmotions = emotionalHistory.value.slice(-3);
      const positiveEmotions = recentEmotions.filter(e => 
        ['confident', 'focused', 'excited'].includes(e.emotion.id)
      );
      
      if (positiveEmotions.length >= 2) {
        return 'You\'re maintaining a positive mindset throughout this process!';
      } else if (positiveEmotions.length === 1) {
        return 'Your emotional state is mixed but manageable.';
      } else {
        return 'Consider taking a break or asking for help if needed.';
      }
    };

    const getWellnessMessage = () => {
      const messages = {
        high: 'You seem stressed. Would you like to take a short break?',
        medium: 'How about a quick breathing exercise to help you relax?',
        low: 'You\'re doing great! Keep up the good work.'
      };
      return messages[stressLevel.value] || messages.low;
    };

    const getWellnessActionLabel = () => {
      const labels = {
        high: 'Take Break',
        medium: 'Breathing Exercise',
        low: 'Continue'
      };
      return labels[stressLevel.value] || 'Continue';
    };

    const getWellnessActionType = () => {
      const actions = {
        high: 'break',
        medium: 'breathing',
        low: 'continue'
      };
      return actions[stressLevel.value] || 'continue';
    };

    const getPreviousButtonLabel = () => {
      return interfaceComplexity.value === 'simple' ? 'Back' : 'Previous Step';
    };

    const getNextButtonLabel = () => {
      if (props.currentStep === props.totalSteps) {
        return 'Submit Application';
      }
      return interfaceComplexity.value === 'simple' ? 'Next' : 'Continue';
    };

    const getStepButtonStyle = (direction) => {
      return {
        'large-button': interfaceComplexity.value === 'simple' || stressLevel.value === 'high',
        'prominent': direction === 'next',
        'stress-adapted': stressLevel.value === 'high'
      };
    };

    const getAssistantEmoji = () => {
      const emojiMap = {
        frustrated: '🤗',
        confused: '💡',
        tired: '🌟',
        anxious: '😌'
      };
      return emojiMap[currentEmotion.value] || '😊';
    };

    const getAssistantMessage = () => {
      return assistantMessage.value;
    };

    const getAssistantActions = () => {
      return [
        { id: 'help', label: 'Get Help' },
        { id: 'simplify', label: 'Simplify' },
        { id: 'break', label: 'Take Break' }
      ];
    };

    const getAssistanceIcon = () => {
      const iconMap = {
        frustrated: '🆘',
        confused: '❓',
        tired: '💤',
        anxious: '🤝'
      };
      return iconMap[currentEmotion.value] || '💬';
    };

    const getAssistanceMessage = () => {
      const messages = {
        frustrated: 'Feeling stuck? We can help!',
        confused: 'Need clarification? Ask away!',
        tired: 'Take a break when you need it.',
        anxious: 'We\'re here to support you.'
      };
      return messages[currentEmotion.value] || 'Need assistance?';
    };

    const getAssistantStyle = () => {
      return {
        'urgent': ['frustrated', 'anxious'].includes(currentEmotion.value),
        'supportive': ['confused', 'tired'].includes(currentEmotion.value)
      };
    };

    const getSidebarStyle = () => {
      return {
        'compact': interfaceComplexity.value === 'simple',
        'detailed': interfaceComplexity.value === 'detailed'
      };
    };

    const getFooterStyle = () => {
      return {
        'prominent': stressLevel.value === 'high',
        'minimal': interfaceComplexity.value === 'simple'
      };
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Action handlers
    const activateHelpSuggestion = (suggestion) => {
      emit('assistance-requested', {
        type: suggestion.id,
        context: suggestion.title,
        emotion: currentEmotion.value
      });
    };

    const performAssistantAction = (action) => {
      switch (action.id) {
        case 'help':
          activateAssistance();
          break;
        case 'simplify':
          adjustInterfaceComplexity('simple');
          break;
        case 'break':
          performWellnessAction();
          break;
      }
      dismissAssistant();
    };

    const showFieldGuidance = (field) => {
      // Show contextual field guidance
      console.log('Showing guidance for field:', field.id);
    };

    // Lifecycle
    onMounted(() => {
      // Initialize behavioral tracking
      const behaviorInterval = setInterval(() => {
        const timeSinceActivity = Date.now() - userBehavior.value.lastActivity;
        
        // Update stress level based on behavior
        if (timeSinceActivity > 180000) { // 3 minutes
          if (stressLevel.value !== 'high') {
            stressLevel.value = 'medium';
          }
        }
        
        // Auto-adapt interface
        if (adaptiveMode.value) {
          adaptInterface();
        }
      }, 5000);

      onUnmounted(() => {
        clearInterval(behaviorInterval);
      });
    });

    return {
      // State
      adaptiveMode,
      currentEmotion,
      emotionalConfidence,
      stressLevel,
      interfaceComplexity,
      currentMode,
      fieldValues,
      fieldErrors,
      emotionalHistory,
      assistantVisible,
      quickEmotions,
      adaptiveNavigation,
      progressMilestones,
      
      // Computed
      progressPercentage,
      currentAdaptations,
      dynamicStyles,
      canProceed,
      
      // Methods
      getCurrentEmotionEmoji,
      getCurrentEmotionLabel,
      getPulseSpeed,
      toggleAdaptiveMode,
      resetInterface,
      selectQuickEmotion,
      adjustInterfaceComplexity,
      navigateToStep,
      nextStep,
      previousStep,
      handleFieldFocus,
      handleFieldBlur,
      handleFieldInput,
      activateAssistance,
      performWellnessAction,
      dismissAssistant,
      
      // Styling methods
      getNavigationStyle,
      getContentStyle,
      getFormContentClasses,
      getSectionHeaderStyle,
      getFieldGridStyle,
      getFieldClasses,
      getLabelClasses,
      getInputClasses,
      
      // Conditional rendering
      needsAssistance,
      showContextualInfo,
      shouldShowEncouragement,
      showSidebar,
      showFloatingAssistant,
      shouldShowWellnessCheck,
      isSimplifiedMode,
      showSectionDescription,
      showRequiredIndicators,
      showInlineHelp,
      showEmotionalGuidance,
      
      // Content generation
      getCurrentSectionTitle,
      getCurrentSectionDescription,
      getAdaptiveFields,
      getFieldComponent,
      getAdaptivePlaceholder,
      getContextualInsight,
      getEncouragementMessage,
      getPersonalizedHelp,
      getJourneyInsight,
      getWellnessMessage,
      getWellnessActionLabel,
      getPreviousButtonLabel,
      getNextButtonLabel,
      getStepButtonStyle,
      getAssistantEmoji,
      getAssistantMessage,
      getAssistantActions,
      getAssistanceIcon,
      getAssistanceMessage,
      getAssistantStyle,
      getSidebarStyle,
      getFooterStyle,
      formatTime,
      
      // Action handlers
      activateHelpSuggestion,
      performAssistantAction
    };
  }
};
</script>

<style scoped>
.emotion-driven-interface {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--secondary-color) 0%, #ffffff 100%);
  transition: all 0.6s ease;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #1e293b;
}

/* Adaptive Header */
.adaptive-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--primary-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.emotional-indicator {
  display: flex;
  align-items: center;
  gap: 15px;
}

.emotion-visualization {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emotion-pulse {
  position: absolute;
  width: 60px;
  height: 60px;
  border: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: emotionPulse var(--animation-speed) infinite;
  opacity: var(--stress-intensity);
}

@keyframes emotionPulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.current-emotion-emoji {
  font-size: 2rem;
  z-index: 1;
}

.emotion-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.emotion-label {
  font-weight: 600;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.confidence-score {
  font-size: 0.9rem;
  color: #64748b;
}

.interface-controls {
  display: flex;
  gap: 12px;
}

.adaptive-toggle,
.reset-button {
  padding: 10px 16px;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.adaptive-toggle:hover,
.reset-button:hover {
  background: var(--accent-color);
  transform: translateY(-2px);
}

/* Adaptive Navigation */
.adaptive-navigation {
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.9);
  border-bottom: 1px solid #e2e8f0;
}

.nav-items {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 15px 20px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.nav-item:hover:not(:disabled) {
  background: var(--secondary-color);
  border-color: var(--primary-color);
  transform: translateY(-2px);
}

.nav-item.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.nav-item.completed {
  background: #f0fdf4;
  border-color: #10b981;
  color: #059669;
}

.nav-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-item.simplified {
  min-width: 80px;
  padding: 12px 16px;
}

.nav-icon {
  font-size: 1.5rem;
}

.nav-label {
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
}

.nav-progress {
  font-size: 0.8rem;
  opacity: 0.8;
}

.emotional-assistance {
  display: flex;
  justify-content: center;
}

.assistance-prompt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #fef7cd;
  border: 2px solid #fbbf24;
  border-radius: 20px;
  color: #92400e;
  animation: assistancePulse 2s infinite;
}

@keyframes assistancePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.assistance-icon {
  font-size: 1.2rem;
}

.assistance-message {
  font-weight: 500;
}

.assistance-button {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.assistance-button:hover {
  background: #d97706;
}

/* Adaptive Content */
.adaptive-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  padding: 30px;
  max-width: 1400px;
  margin: 0 auto;
}

.adaptive-content.single-column {
  grid-template-columns: 1fr;
  max-width: 800px;
}

.adaptive-content.stress-reduced {
  gap: 20px;
  padding: 20px;
}

.emotional-context-bar {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid var(--primary-color);
  margin-bottom: 20px;
}

.context-insights {
  display: flex;
  align-items: center;
  gap: 20px;
}

.insight-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-color);
  font-weight: 500;
}

.insight-icon {
  font-size: 1.2rem;
}

.progress-encouragement {
  color: #059669;
  font-weight: 600;
  animation: encouragementGlow 3s infinite;
}

@keyframes encouragementGlow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.adaptive-controls {
  display: flex;
  gap: 8px;
}

.complexity-btn {
  padding: 8px 12px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.complexity-btn:hover {
  background: #e2e8f0;
}

.complexity-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

/* Form Content */
.form-content-adaptive {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid var(--secondary-color);
}

.simplified-layout {
  padding: 20px;
}

.detailed-layout {
  padding: 40px;
}

.section-header {
  margin-bottom: 30px;
  text-align: center;
}

.section-header.minimalist {
  margin-bottom: 20px;
}

.section-header.comprehensive {
  margin-bottom: 40px;
}

.section-header h2 {
  color: var(--primary-color);
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 10px 0;
}

.section-description {
  color: #64748b;
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

.form-fields-grid {
  display: grid;
  gap: 20px;
}

.form-fields-grid.single-column {
  grid-template-columns: 1fr;
}

.form-fields-grid.two-column {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.form-fields-grid.three-column {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.adaptive-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.adaptive-field.high-priority {
  order: -1;
  background: rgba(59, 130, 246, 0.05);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.adaptive-field.simplified {
  gap: 12px;
}

.adaptive-field label {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.adaptive-field label.prominent {
  font-size: 1.1rem;
  color: var(--primary-color);
}

.adaptive-field label.detailed {
  font-size: 0.9rem;
}

.adaptive-field label.stress-friendly {
  font-size: 1.2rem;
  color: var(--primary-color);
  font-weight: 700;
}

.required-indicator {
  color: #ef4444;
  font-weight: bold;
  margin-left: 4px;
}

.field-help {
  display: block;
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 400;
  margin-top: 4px;
  line-height: 1.4;
}

.adaptive-field input,
.adaptive-field select,
.adaptive-field textarea {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
}

.adaptive-field input.large-target,
.adaptive-field select.large-target,
.adaptive-field textarea.large-target {
  padding: 16px 20px;
  font-size: 1.1rem;
  border-width: 3px;
}

.adaptive-field input.detailed-input,
.adaptive-field select.detailed-input,
.adaptive-field textarea.detailed-input {
  padding: 10px 14px;
  font-size: 0.95rem;
}

.adaptive-field input:focus,
.adaptive-field select:focus,
.adaptive-field textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.adaptive-field input.error-state,
.adaptive-field select.error-state,
.adaptive-field textarea.error-state {
  border-color: #ef4444;
  background: #fef2f2;
}

.field-error {
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 500;
}

.emotional-guidance {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--secondary-color);
  border-radius: 6px;
  border-left: 4px solid var(--primary-color);
  font-size: 0.9rem;
  color: var(--accent-color);
}

.guidance-icon {
  font-size: 1.1rem;
}

/* Adaptive Sidebar */
.adaptive-sidebar {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.adaptive-sidebar.compact {
  gap: 15px;
}

.emotional-support-panel,
.adaptive-help-system,
.progress-insights,
.emotional-journey-tracker {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

.emotional-support-panel h3,
.adaptive-help-system h4,
.progress-insights h4,
.emotional-journey-tracker h4 {
  margin: 0 0 15px 0;
  color: var(--primary-color);
  font-size: 1.1rem;
  font-weight: 600;
}

.emotion-quick-select {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.emotion-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.emotion-btn:hover {
  background: var(--secondary-color);
  border-color: var(--primary-color);
}

.emotion-btn.selected {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.emotion-emoji {
  font-size: 1.5rem;
}

.emotion-name {
  font-weight: 500;
}

.help-suggestions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.help-suggestion {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #e2e8f0;
}

.help-suggestion:hover {
  background: var(--secondary-color);
  border-color: var(--primary-color);
}

.suggestion-icon {
  font-size: 1.3rem;
  color: var(--primary-color);
}

.suggestion-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.suggestion-title {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.suggestion-description {
  color: #6b7280;
  font-size: 0.8rem;
}

/* Progress Visualization */
.progress-visualization {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.progress-ring {
  position: relative;
  width: 80px;
  height: 80px;
}

.circular-chart {
  width: 100%;
  height: 100%;
}

.circle-bg {
  fill: none;
  stroke: #e2e8f0;
  stroke-width: 2.8;
}

.circle {
  fill: none;
  stroke: var(--primary-color);
  stroke-width: 2.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease;
}

.progress-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-value {
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  color: var(--primary-color);
}

.progress-label {
  font-size: 0.7rem;
  color: #6b7280;
}

.progress-milestones {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.milestone {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}

.milestone-icon {
  font-size: 1rem;
  color: var(--primary-color);
}

.milestone-label {
  color: #6b7280;
}

/* Emotional Journey */
.journey-timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 120px;
  overflow-y: auto;
}

.journey-entry {
  display: grid;
  grid-template-columns: 40px 30px 1fr;
  gap: 8px;
  align-items: center;
  font-size: 0.8rem;
}

.journey-time {
  color: #9ca3af;
  font-size: 0.7rem;
}

.journey-emotion {
  font-size: 1.2rem;
}

.journey-context {
  color: #6b7280;
}

.journey-insights {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
}

.insight-summary {
  color: #374151;
  font-size: 0.85rem;
  margin: 0;
  font-style: italic;
}

/* Adaptive Footer */
.adaptive-footer {
  padding: 20px 30px;
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid #e2e8f0;
  backdrop-filter: blur(10px);
}

.adaptive-footer.prominent {
  padding: 30px;
  border-top-width: 3px;
}

.adaptive-footer.minimal {
  padding: 15px 20px;
}

.emotional-wellness-check {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.wellness-prompt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: #f0fdf4;
  border: 2px solid #10b981;
  border-radius: 20px;
  color: #065f46;
}

.wellness-icon {
  font-size: 1.2rem;
}

.wellness-message {
  font-weight: 500;
}

.wellness-action {
  background: #10b981;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.wellness-action:hover {
  background: #059669;
}

.adaptive-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-button {
  padding: 12px 24px;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.step-button.large-button {
  padding: 16px 32px;
  font-size: 1.1rem;
  min-width: 150px;
}

.step-button.previous {
  background: transparent;
  color: var(--primary-color);
}

.step-button:hover:not(:disabled) {
  background: var(--accent-color);
  transform: translateY(-2px);
}

.step-button.previous:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
}

.step-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.step-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
}

.step-separator {
  color: #9ca3af;
  font-weight: 400;
}

/* Floating Assistant */
.floating-emotional-assistant {
  position: fixed;
  bottom: 30px;
  right: 30px;
  max-width: 350px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 2px solid var(--primary-color);
  z-index: 1000;
  animation: assistantSlideIn 0.5s ease;
}

@keyframes assistantSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.floating-emotional-assistant.urgent {
  border-color: #ef4444;
  animation: assistantUrgentPulse 2s infinite;
}

@keyframes assistantUrgentPulse {
  0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); }
  50% { box-shadow: 0 10px 30px rgba(239, 68, 68, 0.4); }
}

.floating-emotional-assistant.supportive {
  border-color: #10b981;
}

.assistant-avatar {
  position: absolute;
  top: -15px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
}

.assistant-emoji {
  font-size: 1.5rem;
}

.assistant-bubble {
  margin-top: 15px;
}

.assistant-message {
  color: #374151;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0 0 15px 0;
}

.assistant-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.assistant-action-btn {
  padding: 8px 12px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.assistant-action-btn:hover {
  background: var(--accent-color);
}

.assistant-dismiss {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border: none;
  background: #f1f5f9;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #6b7280;
  transition: all 0.2s ease;
}

.assistant-dismiss:hover {
  background: #e2e8f0;
  color: #374151;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .adaptive-content {
    grid-template-columns: 1fr;
  }
  
  .emotional-context-bar {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .adaptive-header {
    flex-direction: column;
    gap: 15px;
    padding: 15px 20px;
  }
  
  .adaptive-navigation {
    padding: 15px 20px;
  }
  
  .nav-items {
    flex-direction: column;
    align-items: center;
  }
  
  .adaptive-content {
    padding: 20px 15px;
    gap: 20px;
  }
  
  .form-content-adaptive {
    padding: 20px 15px;
  }
  
  .form-fields-grid.two-column,
  .form-fields-grid.three-column {
    grid-template-columns: 1fr;
  }
  
  .adaptive-footer {
    padding: 15px 20px;
  }
  
  .adaptive-actions {
    flex-direction: column;
    gap: 15px;
  }
  
  .floating-emotional-assistant {
    bottom: 15px;
    right: 15px;
    left: 15px;
    max-width: none;
  }
}

@media (max-width: 480px) {
  .emotion-quick-select {
    grid-template-columns: 1fr;
  }
  
  .step-button {
    width: 100%;
  }
  
  .context-insights {
    flex-direction: column;
    gap: 10px;
  }
  
  .adaptive-controls {
    flex-wrap: wrap;
    justify-content: center;
  }
}

/* Emotion-specific adaptations */
.interface-mode-adaptive.emotion-state-frustrated {
  --primary-color: #ef4444;
  --secondary-color: #fef2f2;
  --accent-color: #dc2626;
}

.interface-mode-adaptive.emotion-state-confused {
  --primary-color: #f59e0b;
  --secondary-color: #fef3c7;
  --accent-color: #d97706;
}

.interface-mode-adaptive.emotion-state-tired {
  --primary-color: #64748b;
  --secondary-color: #f8fafc;
  --accent-color: #475569;
}

.interface-mode-adaptive.emotion-state-excited {
  --primary-color: #8b5cf6;
  --secondary-color: #f3e8ff;
  --accent-color: #7c3aed;
}

.interface-mode-adaptive.stress-level-high {
  --animation-speed: 0.8s;
  --stress-intensity: 1;
}

.interface-mode-adaptive.stress-level-high .form-content-adaptive {
  border-width: 3px;
  border-color: var(--primary-color);
}

.interface-mode-adaptive.stress-level-high .adaptive-field input,
.interface-mode-adaptive.stress-level-high .adaptive-field select,
.interface-mode-adaptive.stress-level-high .adaptive-field textarea {
  border-width: 3px;
  font-size: 1.2rem;
  padding: 18px 22px;
}
</style>