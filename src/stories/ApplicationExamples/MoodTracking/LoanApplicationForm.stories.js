import { ref } from 'vue';
import LoanApplicationForm from '../../../components/forms/LoanApplicationForm.vue';

export default {
  title: 'Application Examples/Mood Tracking/Complete Loan Application',
  component: LoanApplicationForm,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete loan application form with integrated mood tracking system. This demonstrates how the mood tracker seamlessly integrates into a real-world application flow to enhance user experience and provide valuable analytics.',
      },
    },
  },
};

export const FullLoanApplication = () => ({
  components: { LoanApplicationForm },
  setup() {
    const applicationEvents = ref([]);
    const moodAnalytics = ref({
      totalMoodChanges: 0,
      helpRequests: 0,
      breakRequests: 0,
      averageMoodScore: 0,
      completionTime: 0
    });

    const startTime = Date.now();

    const handleApplicationEvent = (event) => {
      applicationEvents.value.push({
        ...event,
        timestamp: Date.now(),
        id: Date.now()
      });

      // Update analytics
      if (event.type === 'mood-changed') {
        moodAnalytics.value.totalMoodChanges++;
      } else if (event.type === 'help-requested') {
        moodAnalytics.value.helpRequests++;
      } else if (event.type === 'break-requested') {
        moodAnalytics.value.breakRequests++;
      }

      moodAnalytics.value.completionTime = Math.round((Date.now() - startTime) / 1000);
    };

    return {
      applicationEvents,
      moodAnalytics,
      handleApplicationEvent
    };
  },
  template: `
    <div class="loan-application-demo">
      <div class="demo-header">
        <h2>Complete Loan Application with Mood Tracking</h2>
        <p>Experience the full loan application process with integrated emotional feedback and user experience analytics.</p>
      </div>

      <div class="application-container">
        <LoanApplicationForm @application-event="handleApplicationEvent" />
      </div>

      <div class="analytics-sidebar" v-if="applicationEvents.length > 0">
        <h3>Real-time UX Analytics</h3>
        
        <div class="analytics-metrics">
          <div class="metric-card">
            <div class="metric-value">{{ moodAnalytics.totalMoodChanges }}</div>
            <div class="metric-label">Mood Changes</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">{{ moodAnalytics.helpRequests }}</div>
            <div class="metric-label">Help Requests</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">{{ moodAnalytics.breakRequests }}</div>
            <div class="metric-label">Break Requests</div>
          </div>
          
          <div class="metric-card">
            <div class="metric-value">{{ moodAnalytics.completionTime }}s</div>
            <div class="metric-label">Time Spent</div>
          </div>
        </div>

        <div class="recent-events">
          <h4>Recent Events</h4>
          <div class="events-timeline">
            <div 
              v-for="event in applicationEvents.slice(-5)" 
              :key="event.id"
              class="event-timeline-item"
            >
              <div class="event-icon">
                <span v-if="event.type === 'mood-changed'">😊</span>
                <span v-else-if="event.type === 'help-requested'">❓</span>
                <span v-else-if="event.type === 'break-requested'">⏸️</span>
                <span v-else>📝</span>
              </div>
              <div class="event-details">
                <div class="event-type">{{ event.type.replace('-', ' ') }}</div>
                <div class="event-time">{{ new Date(event.timestamp).toLocaleTimeString() }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="insights-summary">
          <h4>UX Insights</h4>
          <div class="insight-item">
            <span class="insight-icon">📊</span>
            <span class="insight-text">
              {{ getMoodInsight() }}
            </span>
          </div>
          <div class="insight-item">
            <span class="insight-icon">⏱️</span>
            <span class="insight-text">
              {{ getTimeInsight() }}
            </span>
          </div>
          <div class="insight-item">
            <span class="insight-icon">🎯</span>
            <span class="insight-text">
              {{ getEngagementInsight() }}
            </span>
          </div>
        </div>
      </div>

      <div class="implementation-guide">
        <h3>Implementation Benefits</h3>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">📈</div>
            <h4>Improved Completion Rates</h4>
            <p>Emotional support reduces abandonment by identifying and addressing user frustration points</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon">🎯</div>
            <h4>Data-Driven Optimization</h4>
            <p>Real-time insights help identify form friction points and optimize user experience</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon">💬</div>
            <h4>Proactive Support</h4>
            <p>Automatic help prompts based on emotional state provide timely assistance</p>
          </div>
          
          <div class="benefit-card">
            <div class="benefit-icon">⭐</div>
            <h4>Enhanced Satisfaction</h4>
            <p>Empathetic feedback and encouragement create positive user experiences</p>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    getMoodInsight() {
      const changes = this.moodAnalytics.totalMoodChanges;
      if (changes === 0) return "User hasn't shared mood feedback yet";
      if (changes <= 2) return "Stable emotional journey";
      if (changes <= 4) return "Normal emotional fluctuation";
      return "High emotional variability - consider UX improvements";
    },
    
    getTimeInsight() {
      const time = this.moodAnalytics.completionTime;
      if (time < 60) return "Quick start - good initial engagement";
      if (time < 300) return "Normal progression through application";
      if (time < 600) return "Taking time to consider - thoughtful approach";
      return "Extended session - may need assistance";
    },
    
    getEngagementInsight() {
      const helps = this.moodAnalytics.helpRequests;
      const breaks = this.moodAnalytics.breakRequests;
      
      if (helps === 0 && breaks === 0) return "Self-sufficient user experience";
      if (helps <= 1 && breaks === 0) return "Minimal support needed";
      if (helps > 1 || breaks > 0) return "User needs additional guidance";
      return "High support requirements";
    }
  }
});

export const MoodTrackingShowcase = () => ({
  components: { LoanApplicationForm },
  setup() {
    const demoScenarios = ref([
      {
        id: 'smooth-journey',
        title: 'Smooth Journey',
        description: 'User progresses confidently through application',
        moodPattern: ['optimistic', 'confident', 'focused', 'determined', 'excited']
      },
      {
        id: 'challenging-journey',
        title: 'Challenging Journey',
        description: 'User encounters difficulties and needs support',
        moodPattern: ['optimistic', 'confused', 'frustrated', 'anxious', 'determined']
      },
      {
        id: 'mixed-journey',
        title: 'Mixed Journey',
        description: 'Typical user experience with ups and downs',
        moodPattern: ['neutral', 'focused', 'tired', 'confident', 'happy']
      }
    ]);

    const selectedScenario = ref(demoScenarios.value[0]);
    const currentMoodIndex = ref(0);

    const selectScenario = (scenario) => {
      selectedScenario.value = scenario;
      currentMoodIndex.value = 0;
    };

    const nextMood = () => {
      if (currentMoodIndex.value < selectedScenario.value.moodPattern.length - 1) {
        currentMoodIndex.value++;
      }
    };

    const resetDemo = () => {
      currentMoodIndex.value = 0;
    };

    const getCurrentMood = () => {
      const moodId = selectedScenario.value.moodPattern[currentMoodIndex.value];
      const moodMap = {
        'optimistic': { emoji: '🙂', label: 'Optimistic', color: '#8b5cf6' },
        'confident': { emoji: '😎', label: 'Confident', color: '#3b82f6' },
        'focused': { emoji: '🤔', label: 'Focused', color: '#f97316' },
        'determined': { emoji: '💪', label: 'Determined', color: '#dc2626' },
        'excited': { emoji: '🤩', label: 'Excited', color: '#f59e0b' },
        'confused': { emoji: '😕', label: 'Confused', color: '#fbbf24' },
        'frustrated': { emoji: '😤', label: 'Frustrated', color: '#ef4444' },
        'anxious': { emoji: '😰', label: 'Anxious', color: '#a855f7' },
        'neutral': { emoji: '😐', label: 'Neutral', color: '#6b7280' },
        'tired': { emoji: '😴', label: 'Tired', color: '#64748b' },
        'happy': { emoji: '😊', label: 'Happy', color: '#10b981' }
      };
      return moodMap[moodId] || moodMap.neutral;
    };

    return {
      demoScenarios,
      selectedScenario,
      currentMoodIndex,
      selectScenario,
      nextMood,
      resetDemo,
      getCurrentMood
    };
  },
  template: `
    <div class="mood-showcase-demo">
      <div class="demo-header">
        <h2>Mood Tracking Journey Scenarios</h2>
        <p>Explore different user emotional journeys through the loan application process.</p>
      </div>

      <div class="scenario-controls">
        <h3>Select Journey Type</h3>
        <div class="scenario-tabs">
          <button
            v-for="scenario in demoScenarios"
            :key="scenario.id"
            @click="selectScenario(scenario)"
            :class="['scenario-tab', { 'active': selectedScenario.id === scenario.id }]"
          >
            {{ scenario.title }}
          </button>
        </div>
        
        <div class="scenario-description">
          <p>{{ selectedScenario.description }}</p>
        </div>
      </div>

      <div class="journey-visualization">
        <div class="journey-progress">
          <h4>Emotional Journey Progress</h4>
          <div class="mood-timeline">
            <div
              v-for="(moodId, index) in selectedScenario.moodPattern"
              :key="index"
              :class="[
                'mood-step',
                { 
                  'current': index === currentMoodIndex,
                  'completed': index < currentMoodIndex,
                  'future': index > currentMoodIndex
                }
              ]"
            >
              <div class="mood-circle">
                <span class="mood-emoji">{{ getMoodEmoji(moodId) }}</span>
              </div>
              <div class="mood-info">
                <div class="mood-name">{{ getMoodLabel(moodId) }}</div>
                <div class="step-number">Step {{ index + 1 }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="current-mood-display">
          <h4>Current Emotional State</h4>
          <div class="current-mood-card">
            <div class="mood-visual">
              <span class="large-emoji">{{ getCurrentMood().emoji }}</span>
              <div class="mood-details">
                <div class="mood-title">{{ getCurrentMood().label }}</div>
                <div class="mood-step">Step {{ currentMoodIndex + 1 }} of {{ selectedScenario.moodPattern.length }}</div>
              </div>
            </div>
            
            <div class="mood-actions">
              <button
                @click="nextMood"
                :disabled="currentMoodIndex >= selectedScenario.moodPattern.length - 1"
                class="progress-button"
              >
                Next Mood
              </button>
              <button @click="resetDemo" class="reset-button">
                Reset Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="insights-analysis">
        <h4>Journey Analysis</h4>
        <div class="analysis-grid">
          <div class="analysis-card">
            <h5>{{ selectedScenario.title }} Characteristics</h5>
            <div class="characteristics-list">
              <div v-if="selectedScenario.id === 'smooth-journey'" class="characteristic">
                <span class="char-icon">✅</span>
                <span>High completion likelihood</span>
              </div>
              <div v-if="selectedScenario.id === 'smooth-journey'" class="characteristic">
                <span class="char-icon">⚡</span>
                <span>Minimal support needed</span>
              </div>
              <div v-if="selectedScenario.id === 'smooth-journey'" class="characteristic">
                <span class="char-icon">🎯</span>
                <span>Positive user experience</span>
              </div>
              
              <div v-if="selectedScenario.id === 'challenging-journey'" class="characteristic">
                <span class="char-icon">⚠️</span>
                <span>Risk of abandonment</span>
              </div>
              <div v-if="selectedScenario.id === 'challenging-journey'" class="characteristic">
                <span class="char-icon">🆘</span>
                <span>Requires intervention</span>
              </div>
              <div v-if="selectedScenario.id === 'challenging-journey'" class="characteristic">
                <span class="char-icon">💪</span>
                <span>Can recover with support</span>
              </div>
              
              <div v-if="selectedScenario.id === 'mixed-journey'" class="characteristic">
                <span class="char-icon">📊</span>
                <span>Typical user pattern</span>
              </div>
              <div v-if="selectedScenario.id === 'mixed-journey'" class="characteristic">
                <span class="char-icon">🔄</span>
                <span>Natural emotional variation</span>
              </div>
              <div v-if="selectedScenario.id === 'mixed-journey'" class="characteristic">
                <span class="char-icon">🎯</span>
                <span>Moderate support needs</span>
              </div>
            </div>
          </div>

          <div class="analysis-card">
            <h5>Recommended Actions</h5>
            <div class="recommendations-list">
              <div v-if="selectedScenario.id === 'smooth-journey'" class="recommendation">
                <span class="rec-icon">🌟</span>
                <span>Celebrate progress milestones</span>
              </div>
              <div v-if="selectedScenario.id === 'smooth-journey'" class="recommendation">
                <span class="rec-icon">📈</span>
                <span>Offer premium services</span>
              </div>
              
              <div v-if="selectedScenario.id === 'challenging-journey'" class="recommendation">
                <span class="rec-icon">🤝</span>
                <span>Trigger immediate support</span>
              </div>
              <div v-if="selectedScenario.id === 'challenging-journey'" class="recommendation">
                <span class="rec-icon">📞</span>
                <span>Offer callback assistance</span>
              </div>
              <div v-if="selectedScenario.id === 'challenging-journey'" class="recommendation">
                <span class="rec-icon">💡</span>
                <span>Simplify next steps</span>
              </div>
              
              <div v-if="selectedScenario.id === 'mixed-journey'" class="recommendation">
                <span class="rec-icon">👀</span>
                <span>Monitor closely</span>
              </div>
              <div v-if="selectedScenario.id === 'mixed-journey'" class="recommendation">
                <span class="rec-icon">🎯</span>
                <span>Provide contextual help</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    getMoodEmoji(moodId) {
      const moodMap = {
        'optimistic': '🙂', 'confident': '😎', 'focused': '🤔',
        'determined': '💪', 'excited': '🤩', 'confused': '😕',
        'frustrated': '😤', 'anxious': '😰', 'neutral': '😐',
        'tired': '😴', 'happy': '😊'
      };
      return moodMap[moodId] || '😐';
    },
    
    getMoodLabel(moodId) {
      const labels = {
        'optimistic': 'Optimistic', 'confident': 'Confident', 'focused': 'Focused',
        'determined': 'Determined', 'excited': 'Excited', 'confused': 'Confused',
        'frustrated': 'Frustrated', 'anxious': 'Anxious', 'neutral': 'Neutral',
        'tired': 'Tired', 'happy': 'Happy'
      };
      return labels[moodId] || 'Neutral';
    }
  }
});

export const BusinessInsights = () => ({
  setup() {
    const kpiMetrics = ref([
      { label: 'Application Completion Rate', value: '87%', change: '+12%', trend: 'up' },
      { label: 'Average Completion Time', value: '8.5 min', change: '-2.3 min', trend: 'down' },
      { label: 'Support Requests', value: '23%', change: '-8%', trend: 'down' },
      { label: 'User Satisfaction Score', value: '4.6/5', change: '+0.4', trend: 'up' }
    ]);

    const useCases = ref([
      {
        icon: '🏦',
        title: 'Financial Services',
        description: 'Loan applications, account openings, investment consultations',
        benefits: ['Reduced abandonment', 'Improved customer satisfaction', 'Better risk assessment']
      },
      {
        icon: '🏥',
        title: 'Healthcare',
        description: 'Patient intake forms, insurance applications, treatment consents',
        benefits: ['Reduced anxiety', 'Better patient experience', 'Improved compliance']
      },
      {
        icon: '🎓',
        title: 'Education',
        description: 'Student applications, enrollment forms, course registrations',
        benefits: ['Higher completion rates', 'Student support insights', 'Process optimization']
      },
      {
        icon: '🏢',
        title: 'Enterprise',
        description: 'Employee onboarding, benefits enrollment, compliance training',
        benefits: ['Better employee experience', 'Reduced HR workload', 'Data-driven improvements']
      }
    ]);

    return {
      kpiMetrics,
      useCases
    };
  },
  template: `
    <div class="business-insights-demo">
      <div class="demo-header">
        <h2>Business Impact & ROI</h2>
        <p>Quantifiable benefits of implementing mood tracking in form processes.</p>
      </div>

      <div class="kpi-dashboard">
        <h3>Key Performance Indicators</h3>
        <div class="kpi-grid">
          <div v-for="kpi in kpiMetrics" :key="kpi.label" class="kpi-card">
            <div class="kpi-value">{{ kpi.value }}</div>
            <div class="kpi-label">{{ kpi.label }}</div>
            <div :class="['kpi-change', kpi.trend]">
              <span class="change-icon">{{ kpi.trend === 'up' ? '📈' : '📉' }}</span>
              <span class="change-value">{{ kpi.change }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="roi-analysis">
        <h3>Return on Investment</h3>
        <div class="roi-breakdown">
          <div class="roi-item">
            <div class="roi-metric">
              <div class="roi-value">$145,000</div>
              <div class="roi-label">Annual Revenue Increase</div>
            </div>
            <div class="roi-description">
              From improved completion rates and customer acquisition
            </div>
          </div>
          
          <div class="roi-item">
            <div class="roi-metric">
              <div class="roi-value">$67,000</div>
              <div class="roi-label">Support Cost Reduction</div>
            </div>
            <div class="roi-description">
              Reduced call center volume and support tickets
            </div>
          </div>
          
          <div class="roi-item">
            <div class="roi-metric">
              <div class="roi-value">340%</div>
              <div class="roi-label">Implementation ROI</div>
            </div>
            <div class="roi-description">
              Calculated over 12-month period including development costs
            </div>
          </div>
        </div>
      </div>

      <div class="industry-applications">
        <h3>Industry Applications</h3>
        <div class="industries-grid">
          <div v-for="useCase in useCases" :key="useCase.title" class="industry-card">
            <div class="industry-icon">{{ useCase.icon }}</div>
            <h4>{{ useCase.title }}</h4>
            <p>{{ useCase.description }}</p>
            <div class="benefits-list">
              <div v-for="benefit in useCase.benefits" :key="benefit" class="benefit-item">
                <span class="benefit-check">✓</span>
                <span>{{ benefit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation-roadmap">
        <h3>Implementation Roadmap</h3>
        <div class="roadmap-timeline">
          <div class="roadmap-phase">
            <div class="phase-number">1</div>
            <div class="phase-content">
              <h4>Integration Setup</h4>
              <p>Install mood tracker component and configure basic settings</p>
              <div class="phase-duration">Week 1-2</div>
            </div>
          </div>
          
          <div class="roadmap-phase">
            <div class="phase-number">2</div>
            <div class="phase-content">
              <h4>Customization</h4>
              <p>Tailor mood options, feedback messages, and support triggers</p>
              <div class="phase-duration">Week 3-4</div>
            </div>
          </div>
          
          <div class="roadmap-phase">
            <div class="phase-number">3</div>
            <div class="phase-content">
              <h4>Analytics Integration</h4>
              <p>Connect to business intelligence tools and set up dashboards</p>
              <div class="phase-duration">Week 5-6</div>
            </div>
          </div>
          
          <div class="roadmap-phase">
            <div class="phase-number">4</div>
            <div class="phase-content">
              <h4>Launch & Optimization</h4>
              <p>Deploy to production and iterate based on initial data</p>
              <div class="phase-duration">Week 7-8</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});