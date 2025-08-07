import { ref } from 'vue';
import MoodTracker from '../../../components/forms/MoodTracker.vue';

export default {
  title: 'Application Examples/Mood Tracking/Dynamic Mood Tracker',
  component: MoodTracker,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Dynamic emoji-based mood tracker that provides real-time emotional feedback during form completion, helping users stay engaged and providing valuable UX insights.',
      },
    },
  },
  argTypes: {
    currentStep: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Current form step',
      defaultValue: 1,
    },
    totalSteps: {
      control: { type: 'range', min: 3, max: 15, step: 1 },
      description: 'Total number of form steps',
      defaultValue: 5,
    },
    compact: {
      control: { type: 'boolean' },
      description: 'Compact display mode',
      defaultValue: false,
    },
    showInsights: {
      control: { type: 'boolean' },
      description: 'Show mood journey insights',
      defaultValue: true,
    },
    showFeedback: {
      control: { type: 'boolean' },
      description: 'Show contextual feedback messages',
      defaultValue: true,
    },
    autoTrack: {
      control: { type: 'boolean' },
      description: 'Enable automatic mood check prompts',
      defaultValue: true,
    },
  },
};

export const BasicMoodTracker = (args) => ({
  components: { MoodTracker },
  setup() {
    const currentStep = ref(args.currentStep);
    const moodEvents = ref([]);

    const handleMoodChanged = (event) => {
      moodEvents.value.push({
        type: 'mood-changed',
        ...event,
        id: Date.now()
      });
    };

    const handleHelpRequested = (event) => {
      moodEvents.value.push({
        type: 'help-requested',
        ...event,
        id: Date.now()
      });
      alert('Help system would be triggered here');
    };

    const handleBreakRequested = (event) => {
      moodEvents.value.push({
        type: 'break-requested',
        ...event,
        id: Date.now()
      });
      alert('Break reminder system would be activated');
    };

    const handleCompleted = (event) => {
      moodEvents.value.push({
        type: 'completed',
        ...event,
        id: Date.now()
      });
    };

    const advanceStep = () => {
      if (currentStep.value < args.totalSteps) {
        currentStep.value++;
      }
    };

    const resetForm = () => {
      currentStep.value = 1;
      moodEvents.value = [];
      localStorage.removeItem('moodTrackerHistory');
    };

    return { 
      args, 
      currentStep, 
      moodEvents,
      handleMoodChanged,
      handleHelpRequested,
      handleBreakRequested,
      handleCompleted,
      advanceStep,
      resetForm
    };
  },
  template: `
    <div class="mood-tracker-demo">
      <div class="demo-header">
        <h2>Dynamic Mood Tracker</h2>
        <p>Interactive mood tracking system for loan application forms with real-time emotional feedback and user experience insights.</p>
      </div>
      
      <div class="demo-controls">
        <button @click="advanceStep" :disabled="currentStep >= args.totalSteps" class="advance-button">
          Advance to Step {{ currentStep + 1 }}
        </button>
        <button @click="resetForm" class="reset-button">
          Reset Form
        </button>
        <div class="step-indicator">
          Step {{ currentStep }} of {{ args.totalSteps }}
        </div>
      </div>
      
      <div class="tracker-container">
        <MoodTracker
          :current-step="currentStep"
          v-bind="args"
          @mood-changed="handleMoodChanged"
          @help-requested="handleHelpRequested"
          @break-requested="handleBreakRequested"
          @completed="handleCompleted"
        />
      </div>
      
      <div class="event-log" v-if="moodEvents.length > 0">
        <h3>Mood Events Log</h3>
        <div class="events-list">
          <div v-for="event in moodEvents.slice(-5)" :key="event.id" class="event-item">
            <div class="event-type">{{ event.type.replace('-', ' ').toUpperCase() }}</div>
            <div class="event-details">
              <span v-if="event.mood">{{ event.mood.emoji }} {{ event.mood.label }}</span>
              <span class="event-time">{{ new Date(event.timestamp).toLocaleTimeString() }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="feature-showcase">
        <h3>Key Features:</h3>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🎯</div>
            <h4>Progressive Tracking</h4>
            <p>Tracks emotional state throughout form completion process</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <h4>Journey Insights</h4>
            <p>Provides visual timeline of mood changes during application</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">💬</div>
            <h4>Contextual Support</h4>
            <p>Offers help and break suggestions based on emotional state</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h4>Real-time Feedback</h4>
            <p>Immediate encouragement and guidance based on selected mood</p>
          </div>
        </div>
      </div>
    </div>
  `,
});

BasicMoodTracker.args = {
  currentStep: 1,
  totalSteps: 5,
  compact: false,
  showInsights: true,
  showFeedback: true,
  autoTrack: true,
};

export const CompactMoodTracker = (args) => ({
  components: { MoodTracker },
  setup() {
    return { args };
  },
  template: `
    <div class="compact-demo">
      <div class="demo-header">
        <h2>Compact Mode</h2>
        <p>Space-efficient version for integration into existing form layouts.</p>
      </div>
      
      <div class="form-simulation">
        <div class="form-section">
          <h3>Personal Information</h3>
          <div class="form-fields">
            <input type="text" placeholder="Full Name" class="form-input" />
            <input type="email" placeholder="Email Address" class="form-input" />
            <input type="tel" placeholder="Phone Number" class="form-input" />
          </div>
        </div>
        
        <MoodTracker v-bind="args" />
        
        <div class="form-section">
          <h3>Loan Details</h3>
          <div class="form-fields">
            <select class="form-input">
              <option>Select Loan Amount</option>
              <option>$5,000 - $10,000</option>
              <option>$10,000 - $25,000</option>
              <option>$25,000+</option>
            </select>
            <select class="form-input">
              <option>Loan Purpose</option>
              <option>Debt Consolidation</option>
              <option>Home Improvement</option>
              <option>Major Purchase</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  `,
});

CompactMoodTracker.args = {
  currentStep: 2,
  totalSteps: 4,
  compact: true,
  showInsights: false,
  showFeedback: true,
  autoTrack: false,
};

export const MoodJourneyAnalytics = () => ({
  components: { MoodTracker },
  setup() {
    const simulatedSteps = ref([
      { step: 1, mood: { id: 'optimistic', emoji: '🙂', label: 'Optimistic' } },
      { step: 2, mood: { id: 'focused', emoji: '🤔', label: 'Focused' } },
      { step: 3, mood: { id: 'confused', emoji: '😕', label: 'Confused' } },
      { step: 4, mood: { id: 'determined', emoji: '💪', label: 'Determined' } },
      { step: 5, mood: { id: 'excited', emoji: '🤩', label: 'Excited' } }
    ]);
    
    const currentSimulation = ref(0);
    
    const nextStep = () => {
      if (currentSimulation.value < simulatedSteps.value.length - 1) {
        currentSimulation.value++;
      }
    };
    
    const resetSimulation = () => {
      currentSimulation.value = 0;
    };
    
    const getCurrentStep = () => simulatedSteps.value[currentSimulation.value];
    
    return {
      simulatedSteps,
      currentSimulation,
      nextStep,
      resetSimulation,
      getCurrentStep
    };
  },
  template: `
    <div class="analytics-demo">
      <div class="demo-header">
        <h2>Mood Journey Analytics</h2>
        <p>Demonstration of mood progression tracking throughout a complete loan application process.</p>
      </div>
      
      <div class="simulation-controls">
        <button @click="nextStep" :disabled="currentSimulation >= simulatedSteps.length - 1" class="next-button">
          Next Step ({{ currentSimulation + 1 }}/{{ simulatedSteps.length }})
        </button>
        <button @click="resetSimulation" class="reset-button">
          Reset Journey
        </button>
      </div>
      
      <div class="journey-visualization">
        <div class="journey-header">
          <h3>Current Progress</h3>
          <div class="current-mood">
            <span class="mood-emoji">{{ getCurrentStep().mood.emoji }}</span>
            <span class="mood-label">{{ getCurrentStep().mood.label }}</span>
          </div>
        </div>
        
        <div class="mood-tracker-container">
          <MoodTracker
            :current-step="getCurrentStep().step"
            :total-steps="5"
            :show-insights="true"
            :show-feedback="true"
            :auto-track="false"
          />
        </div>
        
        <div class="journey-timeline">
          <h4>Complete Journey Visualization</h4>
          <div class="timeline-steps">
            <div 
              v-for="(stepData, index) in simulatedSteps" 
              :key="index"
              :class="['timeline-step', { 'step-completed': index <= currentSimulation, 'step-current': index === currentSimulation }]"
            >
              <div class="step-number">{{ stepData.step }}</div>
              <div class="step-mood">
                <span class="step-emoji">{{ stepData.mood.emoji }}</span>
                <span class="step-label">{{ stepData.mood.label }}</span>
              </div>
              <div class="step-connector" v-if="index < simulatedSteps.length - 1"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="analytics-insights">
        <h4>User Experience Insights</h4>
        <div class="insights-grid">
          <div class="insight-card">
            <div class="insight-icon">📈</div>
            <h5>Emotional Progression</h5>
            <p>Track how user confidence and satisfaction evolve throughout the application process</p>
          </div>
          <div class="insight-card">
            <div class="insight-icon">⚠️</div>
            <h5>Friction Points</h5>
            <p>Identify steps where users commonly experience confusion or frustration</p>
          </div>
          <div class="insight-card">
            <div class="insight-icon">🎯</div>
            <h5>Completion Likelihood</h5>
            <p>Predict application completion probability based on mood patterns</p>
          </div>
          <div class="insight-card">
            <div class="insight-icon">💡</div>
            <h5>Optimization Opportunities</h5>
            <p>Data-driven insights for improving form flow and user experience</p>
          </div>
        </div>
      </div>
    </div>
  `,
});

export const EmotionalSupportSystem = () => ({
  components: { MoodTracker },
  setup() {
    const supportScenarios = ref([
      {
        id: 'anxious',
        mood: { id: 'anxious', emoji: '😰', label: 'Anxious', sentiment: 'negative' },
        title: 'Anxiety Support',
        description: 'User feeling nervous about financial application'
      },
      {
        id: 'frustrated',
        mood: { id: 'frustrated', emoji: '😤', label: 'Frustrated', sentiment: 'negative' },
        title: 'Frustration Management',
        description: 'User experiencing difficulty with form complexity'
      },
      {
        id: 'confused',
        mood: { id: 'confused', emoji: '😕', label: 'Confused', sentiment: 'negative' },
        title: 'Clarity Assistance',
        description: 'User needs help understanding requirements'
      },
      {
        id: 'overwhelmed',
        mood: { id: 'overwhelmed', emoji: '😵', label: 'Overwhelmed', sentiment: 'negative' },
        title: 'Overwhelm Support',
        description: 'User feeling stressed by information volume'
      }
    ]);
    
    const selectedScenario = ref(supportScenarios.value[0]);
    
    const selectScenario = (scenario) => {
      selectedScenario.value = scenario;
    };
    
    return {
      supportScenarios,
      selectedScenario,
      selectScenario
    };
  },
  template: `
    <div class="support-demo">
      <div class="demo-header">
        <h2>Emotional Support System</h2>
        <p>Contextual support and encouragement based on user emotional state during form completion.</p>
      </div>
      
      <div class="scenario-selector">
        <h3>Support Scenarios</h3>
        <div class="scenario-buttons">
          <button 
            v-for="scenario in supportScenarios" 
            :key="scenario.id"
            @click="selectScenario(scenario)"
            :class="['scenario-button', { 'active': selectedScenario.id === scenario.id }]"
          >
            <span class="scenario-emoji">{{ scenario.mood.emoji }}</span>
            <span class="scenario-title">{{ scenario.title }}</span>
          </button>
        </div>
      </div>
      
      <div class="support-preview">
        <div class="scenario-info">
          <h4>{{ selectedScenario.title }}</h4>
          <p>{{ selectedScenario.description }}</p>
        </div>
        
        <MoodTracker
          :current-step="3"
          :total-steps="5"
          :show-insights="true"
          :show-feedback="true"
          :auto-track="false"
        />
      </div>
      
      <div class="support-features">
        <h3>Support System Features</h3>
        <div class="features-list">
          <div class="support-feature">
            <div class="feature-icon">🤗</div>
            <div class="feature-content">
              <h4>Empathetic Messaging</h4>
              <p>Personalized encouragement based on specific emotional states</p>
            </div>
          </div>
          <div class="support-feature">
            <div class="feature-icon">💬</div>
            <div class="feature-content">
              <h4>Instant Help Access</h4>
              <p>One-click access to live support when users feel stuck</p>
            </div>
          </div>
          <div class="support-feature">
            <div class="feature-icon">🌟</div>
            <div class="feature-content">
              <h4>Break Suggestions</h4>
              <p>Intelligent recommendations for taking breaks during long forms</p>
            </div>
          </div>
          <div class="support-feature">
            <div class="feature-icon">🎯</div>
            <div class="feature-content">
              <h4>Progress Celebration</h4>
              <p>Positive reinforcement to maintain motivation throughout the process</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});