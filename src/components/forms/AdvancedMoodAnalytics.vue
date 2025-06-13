<template>
  <div class="advanced-mood-analytics">
    <div class="analytics-header">
      <h2>Advanced Mood Analytics Dashboard</h2>
      <p>Real-time emotional intelligence and user experience insights</p>
    </div>

    <!-- Real-time Mood Heatmap -->
    <div class="analytics-section">
      <div class="section-header">
        <h3>Emotional Journey Heatmap</h3>
        <div class="time-range-selector">
          <button 
            v-for="range in timeRanges" 
            :key="range.value"
            @click="selectedTimeRange = range.value"
            :class="['time-button', { 'active': selectedTimeRange === range.value }]"
          >
            {{ range.label }}
          </button>
        </div>
      </div>
      
      <div class="heatmap-container">
        <div class="heatmap-grid">
          <div class="heatmap-header">
            <div class="step-label">Step</div>
            <div v-for="mood in moodTypes" :key="mood.id" class="mood-header">
              <span class="mood-emoji">{{ mood.emoji }}</span>
              <span class="mood-name">{{ mood.label }}</span>
            </div>
          </div>
          
          <div v-for="step in formSteps" :key="step" class="heatmap-row">
            <div class="step-number">{{ step }}</div>
            <div 
              v-for="mood in moodTypes" 
              :key="`${step}-${mood.id}`"
              :class="['heatmap-cell', getHeatmapIntensity(step, mood.id)]"
              :title="`Step ${step}: ${getMoodPercentage(step, mood.id)}% ${mood.label}`"
            >
              <span class="cell-value">{{ getMoodPercentage(step, mood.id) }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Emotion Flow Diagram -->
    <div class="analytics-section">
      <div class="section-header">
        <h3>Emotional Flow Patterns</h3>
        <div class="flow-controls">
          <select v-model="selectedFlowPattern">
            <option value="completion">Completion Flow</option>
            <option value="abandonment">Abandonment Flow</option>
            <option value="support">Support Request Flow</option>
          </select>
        </div>
      </div>
      
      <div class="flow-diagram">
        <div class="flow-nodes">
          <div 
            v-for="(node, index) in getFlowPattern()" 
            :key="index"
            class="flow-node"
            :style="{ '--intensity': node.intensity }"
          >
            <div class="node-content">
              <span class="node-emoji">{{ node.emoji }}</span>
              <span class="node-label">{{ node.label }}</span>
              <span class="node-percentage">{{ node.percentage }}%</span>
            </div>
            <div v-if="index < getFlowPattern().length - 1" class="flow-arrow">
              <span class="arrow-icon">→</span>
              <span class="transition-rate">{{ node.transitionRate }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Predictive Analytics -->
    <div class="analytics-section">
      <div class="section-header">
        <h3>Predictive Completion Analytics</h3>
      </div>
      
      <div class="prediction-cards">
        <div class="prediction-card completion-likelihood">
          <div class="prediction-header">
            <h4>Completion Likelihood</h4>
            <span class="prediction-confidence">94% confidence</span>
          </div>
          <div class="prediction-chart">
            <div class="likelihood-meter">
              <div class="meter-fill" :style="{ width: `${completionLikelihood}%` }"></div>
              <span class="meter-value">{{ completionLikelihood }}%</span>
            </div>
          </div>
          <div class="prediction-factors">
            <div class="factor positive">
              <span class="factor-icon">📈</span>
              <span>Consistent positive mood</span>
            </div>
            <div class="factor positive">
              <span class="factor-icon">⚡</span>
              <span>Fast progression</span>
            </div>
            <div class="factor neutral">
              <span class="factor-icon">⏱️</span>
              <span>Extended time on step 3</span>
            </div>
          </div>
        </div>

        <div class="prediction-card intervention-timing">
          <div class="prediction-header">
            <h4>Optimal Intervention Timing</h4>
            <span class="prediction-confidence">87% accuracy</span>
          </div>
          <div class="intervention-timeline">
            <div 
              v-for="intervention in predictedInterventions" 
              :key="intervention.step"
              class="intervention-point"
              :class="intervention.type"
            >
              <div class="intervention-step">Step {{ intervention.step }}</div>
              <div class="intervention-type">{{ intervention.action }}</div>
              <div class="intervention-probability">{{ intervention.probability }}%</div>
            </div>
          </div>
        </div>

        <div class="prediction-card satisfaction-forecast">
          <div class="prediction-header">
            <h4>Satisfaction Forecast</h4>
            <span class="prediction-confidence">91% accuracy</span>
          </div>
          <div class="satisfaction-chart">
            <div class="forecast-line">
              <svg viewBox="0 0 300 100" class="satisfaction-svg">
                <path 
                  :d="satisfactionPath" 
                  fill="none" 
                  stroke="#3860be" 
                  stroke-width="3"
                  class="satisfaction-line"
                />
                <circle 
                  v-for="(point, index) in satisfactionPoints" 
                  :key="index"
                  :cx="point.x" 
                  :cy="point.y" 
                  r="4" 
                  :fill="point.color"
                  class="satisfaction-point"
                />
              </svg>
            </div>
            <div class="forecast-labels">
              <span class="current-label">Current: 7.2/10</span>
              <span class="predicted-label">Predicted Final: 8.4/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sentiment Analysis -->
    <div class="analytics-section">
      <div class="section-header">
        <h3>Advanced Sentiment Analysis</h3>
      </div>
      
      <div class="sentiment-dashboard">
        <div class="sentiment-overview">
          <div class="sentiment-gauge">
            <div class="gauge-container">
              <svg viewBox="0 0 200 120" class="gauge-svg">
                <path 
                  d="M 20 100 A 80 80 0 0 1 180 100" 
                  fill="none" 
                  stroke="#e5e7eb" 
                  stroke-width="8"
                />
                <path 
                  :d="sentimentArcPath" 
                  fill="none" 
                  :stroke="sentimentColor" 
                  stroke-width="8" 
                  stroke-linecap="round"
                />
                <circle 
                  :cx="sentimentNeedleX" 
                  :cy="sentimentNeedleY" 
                  r="6" 
                  :fill="sentimentColor"
                />
              </svg>
              <div class="gauge-labels">
                <span class="negative-label">😔 Negative</span>
                <span class="neutral-label">😐 Neutral</span>
                <span class="positive-label">😊 Positive</span>
              </div>
              <div class="gauge-value">
                <span class="sentiment-score">{{ overallSentiment.toFixed(1) }}</span>
                <span class="sentiment-description">{{ getSentimentDescription() }}</span>
              </div>
            </div>
          </div>

          <div class="sentiment-breakdown">
            <h4>Emotional Composition</h4>
            <div class="emotion-bars">
              <div 
                v-for="emotion in emotionBreakdown" 
                :key="emotion.type"
                class="emotion-bar"
              >
                <div class="emotion-label">
                  <span class="emotion-emoji">{{ emotion.emoji }}</span>
                  <span class="emotion-name">{{ emotion.name }}</span>
                </div>
                <div class="emotion-progress">
                  <div 
                    class="emotion-fill" 
                    :style="{ 
                      width: `${emotion.percentage}%`,
                      backgroundColor: emotion.color 
                    }"
                  ></div>
                  <span class="emotion-percentage">{{ emotion.percentage }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sentiment-trends">
          <h4>Sentiment Trends</h4>
          <div class="trend-chart">
            <div class="trend-timeline">
              <div 
                v-for="(point, index) in sentimentHistory" 
                :key="index"
                class="trend-point"
                :style="{ 
                  left: `${(index / (sentimentHistory.length - 1)) * 100}%`,
                  bottom: `${(point.value + 1) * 40}%`
                }"
                :title="`${point.time}: ${point.description}`"
              >
                <div class="trend-dot" :class="point.sentiment"></div>
                <div class="trend-tooltip">
                  <span class="trend-time">{{ point.time }}</span>
                  <span class="trend-mood">{{ point.mood }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Behavioral Insights -->
    <div class="analytics-section">
      <div class="section-header">
        <h3>Behavioral Pattern Recognition</h3>
      </div>
      
      <div class="behavior-insights">
        <div class="insight-card hesitation-patterns">
          <h4>Hesitation Patterns</h4>
          <div class="pattern-visualization">
            <div class="hesitation-map">
              <div 
                v-for="step in formSteps" 
                :key="step"
                class="hesitation-step"
                :class="getHesitationLevel(step)"
              >
                <div class="step-circle">{{ step }}</div>
                <div class="hesitation-info">
                  <span class="hesitation-time">{{ getHesitationTime(step) }}</span>
                  <span class="hesitation-description">{{ getHesitationDescription(step) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="insight-card attention-analysis">
          <h4>Attention & Focus Analysis</h4>
          <div class="attention-metrics">
            <div class="attention-gauge">
              <div class="gauge-title">Focus Score</div>
              <div class="circular-progress">
                <svg viewBox="0 0 120 120" class="progress-svg">
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#e5e7eb" 
                    stroke-width="8"
                  />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="#3860be" 
                    stroke-width="8" 
                    stroke-linecap="round"
                    :stroke-dasharray="focusCircumference"
                    :stroke-dashoffset="focusOffset"
                    class="progress-circle"
                  />
                </svg>
                <div class="progress-text">
                  <span class="progress-value">{{ focusScore }}</span>
                  <span class="progress-unit">%</span>
                </div>
              </div>
            </div>

            <div class="attention-factors">
              <div class="factor-item">
                <span class="factor-icon">👁️</span>
                <div class="factor-details">
                  <span class="factor-name">Tab Focus</span>
                  <span class="factor-value">{{ tabFocusTime }}% active</span>
                </div>
              </div>
              <div class="factor-item">
                <span class="factor-icon">🖱️</span>
                <div class="factor-details">
                  <span class="factor-name">Mouse Activity</span>
                  <span class="factor-value">{{ mouseActivity }} actions/min</span>
                </div>
              </div>
              <div class="factor-item">
                <span class="factor-icon">⌨️</span>
                <div class="factor-details">
                  <span class="factor-name">Typing Rhythm</span>
                  <span class="factor-value">{{ typingRhythm }} consistent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="insight-card stress-indicators">
          <h4>Stress Level Indicators</h4>
          <div class="stress-dashboard">
            <div class="stress-level" :class="getStressLevel()">
              <div class="stress-icon">{{ getStressIcon() }}</div>
              <div class="stress-info">
                <span class="stress-value">{{ stressLevel }}/10</span>
                <span class="stress-description">{{ getStressDescription() }}</span>
              </div>
            </div>

            <div class="stress-factors">
              <div class="stress-factor" v-for="factor in stressFactors" :key="factor.name">
                <div class="factor-header">
                  <span class="factor-emoji">{{ factor.emoji }}</span>
                  <span class="factor-name">{{ factor.name }}</span>
                </div>
                <div class="factor-meter">
                  <div 
                    class="factor-bar" 
                    :style="{ 
                      width: `${factor.level}%`,
                      backgroundColor: factor.color 
                    }"
                  ></div>
                  <span class="factor-level">{{ factor.level }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Recommendations -->
    <div class="analytics-section">
      <div class="section-header">
        <h3>AI-Powered Recommendations</h3>
      </div>
      
      <div class="ai-recommendations">
        <div 
          v-for="recommendation in aiRecommendations" 
          :key="recommendation.id"
          class="recommendation-card"
          :class="recommendation.priority"
        >
          <div class="recommendation-header">
            <span class="recommendation-icon">{{ recommendation.icon }}</span>
            <div class="recommendation-info">
              <h4>{{ recommendation.title }}</h4>
              <span class="recommendation-priority">{{ recommendation.priority }} priority</span>
            </div>
            <span class="recommendation-confidence">{{ recommendation.confidence }}% confidence</span>
          </div>
          
          <div class="recommendation-content">
            <p>{{ recommendation.description }}</p>
            
            <div class="recommendation-actions">
              <button 
                v-for="action in recommendation.actions" 
                :key="action.id"
                @click="executeRecommendation(action)"
                class="action-button"
                :class="action.type"
              >
                {{ action.label }}
              </button>
            </div>
          </div>

          <div class="recommendation-impact">
            <div class="impact-metrics">
              <div class="impact-item">
                <span class="impact-label">Expected Impact:</span>
                <span class="impact-value">{{ recommendation.expectedImpact }}</span>
              </div>
              <div class="impact-item">
                <span class="impact-label">Implementation Time:</span>
                <span class="impact-value">{{ recommendation.implementationTime }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';

export default {
  name: 'AdvancedMoodAnalytics',
  props: {
    moodData: {
      type: Array,
      default: () => []
    },
    formSteps: {
      type: Array,
      default: () => [1, 2, 3, 4, 5]
    }
  },
  setup(props) {
    const selectedTimeRange = ref('24h');
    const selectedFlowPattern = ref('completion');

    const timeRanges = ref([
      { value: '1h', label: 'Last Hour' },
      { value: '24h', label: 'Last 24 Hours' },
      { value: '7d', label: 'Last 7 Days' },
      { value: '30d', label: 'Last 30 Days' }
    ]);

    const moodTypes = ref([
      { id: 'excited', emoji: '🤩', label: 'Excited' },
      { id: 'confident', emoji: '😎', label: 'Confident' },
      { id: 'happy', emoji: '😊', label: 'Happy' },
      { id: 'focused', emoji: '🤔', label: 'Focused' },
      { id: 'neutral', emoji: '😐', label: 'Neutral' },
      { id: 'tired', emoji: '😴', label: 'Tired' },
      { id: 'confused', emoji: '😕', label: 'Confused' },
      { id: 'frustrated', emoji: '😤', label: 'Frustrated' },
      { id: 'anxious', emoji: '😰', label: 'Anxious' }
    ]);

    // Simulated analytics data
    const moodHeatmapData = ref({
      1: { excited: 45, confident: 30, happy: 15, focused: 5, neutral: 3, tired: 1, confused: 1 },
      2: { excited: 25, confident: 35, happy: 20, focused: 12, neutral: 5, tired: 2, confused: 1 },
      3: { excited: 15, confident: 20, happy: 15, focused: 25, neutral: 15, tired: 5, confused: 3, frustrated: 2 },
      4: { excited: 35, confident: 25, happy: 20, focused: 15, neutral: 3, tired: 1, confused: 1 },
      5: { excited: 55, confident: 25, happy: 15, focused: 3, neutral: 1, tired: 1 }
    });

    const completionLikelihood = ref(87);
    const overallSentiment = ref(0.6);
    const focusScore = ref(78);
    const tabFocusTime = ref(94);
    const mouseActivity = ref(12);
    const typingRhythm = ref('High');
    const stressLevel = ref(3.2);

    const predictedInterventions = ref([
      { step: 2, action: 'Offer Help', probability: 23, type: 'low' },
      { step: 3, action: 'Suggest Break', probability: 67, type: 'high' },
      { step: 4, action: 'Provide Support', probability: 34, type: 'medium' }
    ]);

    const emotionBreakdown = ref([
      { type: 'positive', name: 'Positive', emoji: '😊', percentage: 65, color: '#10b981' },
      { type: 'neutral', name: 'Neutral', emoji: '😐', percentage: 25, color: '#6b7280' },
      { type: 'negative', name: 'Negative', emoji: '😔', percentage: 10, color: '#ef4444' }
    ]);

    const sentimentHistory = ref([
      { time: '10:00', value: 0.3, sentiment: 'neutral', mood: 'Starting', description: 'Beginning application' },
      { time: '10:15', value: 0.7, sentiment: 'positive', mood: 'Confident', description: 'Making good progress' },
      { time: '10:30', value: 0.1, sentiment: 'negative', mood: 'Confused', description: 'Stuck on employment section' },
      { time: '10:45', value: 0.8, sentiment: 'positive', mood: 'Determined', description: 'Getting help and moving forward' },
      { time: '11:00', value: 0.9, sentiment: 'positive', mood: 'Excited', description: 'Nearing completion' }
    ]);

    const stressFactors = ref([
      { name: 'Time Pressure', emoji: '⏰', level: 45, color: '#f59e0b' },
      { name: 'Form Complexity', emoji: '📋', level: 67, color: '#ef4444' },
      { name: 'Technical Issues', emoji: '💻', level: 12, color: '#10b981' },
      { name: 'Information Gaps', emoji: '❓', level: 34, color: '#f59e0b' }
    ]);

    const aiRecommendations = ref([
      {
        id: 1,
        title: 'Implement Progressive Disclosure',
        priority: 'high',
        confidence: 92,
        icon: '🎯',
        description: 'User is showing signs of cognitive overload on step 3. Consider breaking complex sections into smaller, progressive steps.',
        expectedImpact: '+15% completion rate',
        implementationTime: '2-3 days',
        actions: [
          { id: 'implement', label: 'Implement Now', type: 'primary' },
          { id: 'schedule', label: 'Schedule Implementation', type: 'secondary' },
          { id: 'dismiss', label: 'Dismiss', type: 'tertiary' }
        ]
      },
      {
        id: 2,
        title: 'Add Contextual Help Tooltips',
        priority: 'medium',
        confidence: 87,
        icon: '💡',
        description: 'Analysis shows 34% of users hesitate on employment verification fields. Contextual help could reduce confusion.',
        expectedImpact: '+8% user satisfaction',
        implementationTime: '1 day',
        actions: [
          { id: 'implement', label: 'Add Tooltips', type: 'primary' },
          { id: 'test', label: 'A/B Test First', type: 'secondary' }
        ]
      },
      {
        id: 3,
        title: 'Optimize Mobile Experience',
        priority: 'medium',
        confidence: 78,
        icon: '📱',
        description: 'Mobile users show 23% higher stress indicators. Consider simplifying mobile layout and interactions.',
        expectedImpact: '+12% mobile completion',
        implementationTime: '1-2 weeks',
        actions: [
          { id: 'audit', label: 'Mobile Audit', type: 'secondary' },
          { id: 'implement', label: 'Start Optimization', type: 'primary' }
        ]
      }
    ]);

    // Computed properties
    const focusCircumference = computed(() => 2 * Math.PI * 50);
    const focusOffset = computed(() => {
      return focusCircumference.value - (focusScore.value / 100) * focusCircumference.value;
    });

    const sentimentColor = computed(() => {
      if (overallSentiment.value > 0.3) return '#10b981';
      if (overallSentiment.value > -0.3) return '#f59e0b';
      return '#ef4444';
    });

    const sentimentArcPath = computed(() => {
      const angle = ((overallSentiment.value + 1) / 2) * Math.PI;
      const x = 100 + 80 * Math.cos(Math.PI - angle);
      const y = 100 - 80 * Math.sin(Math.PI - angle);
      return `M 20 100 A 80 80 0 0 1 ${x} ${y}`;
    });

    const sentimentNeedleX = computed(() => {
      const angle = ((overallSentiment.value + 1) / 2) * Math.PI;
      return 100 + 80 * Math.cos(Math.PI - angle);
    });

    const sentimentNeedleY = computed(() => {
      const angle = ((overallSentiment.value + 1) / 2) * Math.PI;
      return 100 - 80 * Math.sin(Math.PI - angle);
    });

    const satisfactionPoints = computed(() => {
      return [
        { x: 50, y: 70, color: '#f59e0b' },
        { x: 100, y: 45, color: '#10b981' },
        { x: 150, y: 60, color: '#ef4444' },
        { x: 200, y: 30, color: '#10b981' },
        { x: 250, y: 20, color: '#10b981' }
      ];
    });

    const satisfactionPath = computed(() => {
      const points = satisfactionPoints.value;
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
      return path;
    });

    // Methods
    const getMoodPercentage = (step, moodId) => {
      return moodHeatmapData.value[step]?.[moodId] || 0;
    };

    const getHeatmapIntensity = (step, moodId) => {
      const percentage = getMoodPercentage(step, moodId);
      if (percentage > 40) return 'high';
      if (percentage > 20) return 'medium';
      if (percentage > 5) return 'low';
      return 'none';
    };

    const getFlowPattern = () => {
      const patterns = {
        completion: [
          { emoji: '🙂', label: 'Optimistic', percentage: 45, intensity: 0.7, transitionRate: 89 },
          { emoji: '🤔', label: 'Focused', percentage: 67, intensity: 0.8, transitionRate: 94 },
          { emoji: '💪', label: 'Determined', percentage: 78, intensity: 0.9, transitionRate: 96 },
          { emoji: '🤩', label: 'Excited', percentage: 87, intensity: 1.0 }
        ],
        abandonment: [
          { emoji: '🙂', label: 'Optimistic', percentage: 45, intensity: 0.7, transitionRate: 67 },
          { emoji: '😕', label: 'Confused', percentage: 34, intensity: 0.4, transitionRate: 45 },
          { emoji: '😤', label: 'Frustrated', percentage: 23, intensity: 0.2, transitionRate: 12 },
          { emoji: '😵', label: 'Abandoned', percentage: 8, intensity: 0.1 }
        ],
        support: [
          { emoji: '😕', label: 'Confused', percentage: 34, intensity: 0.4, transitionRate: 78 },
          { emoji: '💬', label: 'Seeking Help', percentage: 56, intensity: 0.6, transitionRate: 89 },
          { emoji: '💪', label: 'Reassured', percentage: 78, intensity: 0.8, transitionRate: 92 },
          { emoji: '😊', label: 'Satisfied', percentage: 84, intensity: 0.9 }
        ]
      };
      return patterns[selectedFlowPattern.value];
    };

    const getSentimentDescription = () => {
      if (overallSentiment.value > 0.6) return 'Very Positive';
      if (overallSentiment.value > 0.2) return 'Positive';
      if (overallSentiment.value > -0.2) return 'Neutral';
      if (overallSentiment.value > -0.6) return 'Negative';
      return 'Very Negative';
    };

    const getHesitationLevel = (step) => {
      const hesitationData = { 1: 'low', 2: 'medium', 3: 'high', 4: 'medium', 5: 'low' };
      return hesitationData[step];
    };

    const getHesitationTime = (step) => {
      const times = { 1: '1.2min', 2: '2.8min', 3: '5.4min', 4: '3.1min', 5: '0.8min' };
      return times[step];
    };

    const getHesitationDescription = (step) => {
      const descriptions = {
        1: 'Quick start',
        2: 'Moderate pace',
        3: 'Complex section',
        4: 'Steady progress',
        5: 'Final review'
      };
      return descriptions[step];
    };

    const getStressLevel = () => {
      if (stressLevel.value < 3) return 'low';
      if (stressLevel.value < 6) return 'medium';
      return 'high';
    };

    const getStressIcon = () => {
      if (stressLevel.value < 3) return '😌';
      if (stressLevel.value < 6) return '😐';
      return '😰';
    };

    const getStressDescription = () => {
      if (stressLevel.value < 3) return 'Relaxed';
      if (stressLevel.value < 6) return 'Moderate';
      return 'Elevated';
    };

    const executeRecommendation = (action) => {
      console.log(`Executing recommendation action: ${action.label}`);
      // Implementation would trigger actual system changes
    };

    return {
      selectedTimeRange,
      selectedFlowPattern,
      timeRanges,
      moodTypes,
      completionLikelihood,
      overallSentiment,
      focusScore,
      tabFocusTime,
      mouseActivity,
      typingRhythm,
      stressLevel,
      predictedInterventions,
      emotionBreakdown,
      sentimentHistory,
      stressFactors,
      aiRecommendations,
      focusCircumference,
      focusOffset,
      sentimentColor,
      sentimentArcPath,
      sentimentNeedleX,
      sentimentNeedleY,
      satisfactionPoints,
      satisfactionPath,
      getMoodPercentage,
      getHeatmapIntensity,
      getFlowPattern,
      getSentimentDescription,
      getHesitationLevel,
      getHesitationTime,
      getHesitationDescription,
      getStressLevel,
      getStressIcon,
      getStressDescription,
      executeRecommendation
    };
  }
};
</script>

<style scoped>
.advanced-mood-analytics {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f9fafb;
}

.analytics-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(30, 41, 59, 0.3);
}

.analytics-header h2 {
  margin: 0 0 10px 0;
  font-size: 2.2rem;
  font-weight: bold;
}

.analytics-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.analytics-section {
  background: white;
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f3f4f6;
}

.section-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1.5rem;
  font-weight: 600;
}

.time-range-selector {
  display: flex;
  gap: 8px;
}

.time-button {
  padding: 8px 16px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.time-button:hover {
  background: #e5e7eb;
}

.time-button.active {
  background: #3860be;
  color: white;
  border-color: #3860be;
}

/* Heatmap Styles */
.heatmap-container {
  overflow-x: auto;
}

.heatmap-grid {
  min-width: 800px;
  display: grid;
  gap: 2px;
}

.heatmap-header {
  display: grid;
  grid-template-columns: 80px repeat(9, 1fr);
  gap: 2px;
  margin-bottom: 4px;
}

.step-label {
  background: #374151;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  border-radius: 6px;
}

.mood-header {
  background: #f3f4f6;
  padding: 8px 4px;
  text-align: center;
  border-radius: 6px;
  font-size: 0.8rem;
}

.mood-emoji {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 2px;
}

.mood-name {
  font-size: 0.7rem;
  color: #6b7280;
  font-weight: 500;
}

.heatmap-row {
  display: grid;
  grid-template-columns: 80px repeat(9, 1fr);
  gap: 2px;
  margin-bottom: 2px;
}

.step-number {
  background: #6b7280;
  color: white;
  padding: 12px;
  text-align: center;
  font-weight: 600;
  border-radius: 6px;
}

.heatmap-cell {
  padding: 8px 4px;
  text-align: center;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
}

.heatmap-cell.high {
  background: #dc2626;
  color: white;
}

.heatmap-cell.medium {
  background: #f59e0b;
  color: white;
}

.heatmap-cell.low {
  background: #10b981;
  color: white;
}

.heatmap-cell.none {
  background: #f3f4f6;
  color: #9ca3af;
}

.heatmap-cell:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Flow Diagram Styles */
.flow-controls select {
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 0.9rem;
}

.flow-diagram {
  padding: 20px 0;
}

.flow-nodes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.flow-node {
  display: flex;
  align-items: center;
  gap: 15px;
}

.node-content {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid #bae6fd;
  min-width: 120px;
  opacity: calc(0.3 + var(--intensity) * 0.7);
  transition: all 0.3s ease;
}

.node-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.node-emoji {
  font-size: 2rem;
  display: block;
  margin-bottom: 8px;
}

.node-label {
  font-weight: 600;
  color: #374151;
  display: block;
  margin-bottom: 4px;
}

.node-percentage {
  font-size: 0.9rem;
  color: #6b7280;
}

.flow-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.arrow-icon {
  font-size: 1.5rem;
  color: #6b7280;
}

.transition-rate {
  font-size: 0.8rem;
  color: #9ca3af;
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Prediction Cards */
.prediction-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.prediction-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 25px;
  transition: transform 0.2s ease;
}

.prediction-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.prediction-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.prediction-header h4 {
  margin: 0;
  color: #374151;
  font-size: 1.1rem;
}

.prediction-confidence {
  background: #10b981;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.completion-likelihood .likelihood-meter {
  background: #e5e7eb;
  border-radius: 20px;
  height: 12px;
  position: relative;
  margin: 15px 0;
}

.meter-fill {
  background: linear-gradient(90deg, #3860be 0%, #10b981 100%);
  height: 100%;
  border-radius: 20px;
  transition: width 0.6s ease;
}

.meter-value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  color: white;
  font-size: 0.9rem;
}

.prediction-factors {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.factor {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.factor.positive {
  color: #059669;
}

.factor.neutral {
  color: #f59e0b;
}

.factor.negative {
  color: #dc2626;
}

.factor-icon {
  font-size: 1rem;
}

/* Intervention Timeline */
.intervention-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.intervention-point {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid;
}

.intervention-point.low {
  background: #f0fdf4;
  border-left-color: #10b981;
}

.intervention-point.medium {
  background: #fefbf1;
  border-left-color: #f59e0b;
}

.intervention-point.high {
  background: #fef2f2;
  border-left-color: #ef4444;
}

.intervention-step {
  font-weight: 600;
  color: #374151;
}

.intervention-type {
  color: #6b7280;
  font-size: 0.9rem;
}

.intervention-probability {
  font-weight: 600;
  font-size: 0.9rem;
}

/* Satisfaction Chart */
.satisfaction-chart {
  position: relative;
}

.satisfaction-svg {
  width: 100%;
  height: 100px;
}

.satisfaction-line {
  animation: drawLine 2s ease-out;
}

.satisfaction-point {
  animation: fadeIn 0.5s ease-out;
}

@keyframes drawLine {
  from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
  to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.forecast-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
}

.current-label {
  color: #f59e0b;
  font-weight: 600;
}

.predicted-label {
  color: #10b981;
  font-weight: 600;
}

/* Sentiment Dashboard */
.sentiment-dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: start;
}

.sentiment-overview {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.gauge-container {
  position: relative;
  text-align: center;
}

.gauge-svg {
  width: 200px;
  height: 120px;
}

.gauge-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #6b7280;
}

.gauge-value {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.sentiment-score {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
}

.sentiment-description {
  font-size: 0.9rem;
  color: #6b7280;
}

.emotion-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.emotion-bar {
  display: flex;
  align-items: center;
  gap: 12px;
}

.emotion-label {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 120px;
}

.emotion-emoji {
  font-size: 1.2rem;
}

.emotion-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.emotion-progress {
  flex: 1;
  position: relative;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.emotion-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.emotion-percentage {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

/* Sentiment Trends */
.trend-chart {
  position: relative;
  height: 150px;
  background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
  border-radius: 8px;
  padding: 20px;
}

.trend-timeline {
  position: relative;
  height: 100%;
}

.trend-point {
  position: absolute;
  cursor: pointer;
}

.trend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.trend-dot.positive {
  background: #10b981;
}

.trend-dot.neutral {
  background: #f59e0b;
}

.trend-dot.negative {
  background: #ef4444;
}

.trend-tooltip {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.trend-point:hover .trend-tooltip {
  opacity: 1;
}

.trend-time {
  display: block;
  font-weight: 600;
}

.trend-mood {
  display: block;
  opacity: 0.8;
}

/* Behavioral Insights */
.behavior-insights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 25px;
}

.insight-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 25px;
}

.insight-card h4 {
  margin: 0 0 20px 0;
  color: #374151;
  font-size: 1.2rem;
  font-weight: 600;
}

/* Hesitation Patterns */
.hesitation-map {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.hesitation-step {
  text-align: center;
  flex: 1;
}

.step-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  margin: 0 auto 8px;
}

.hesitation-step.low .step-circle {
  background: #10b981;
}

.hesitation-step.medium .step-circle {
  background: #f59e0b;
}

.hesitation-step.high .step-circle {
  background: #ef4444;
}

.hesitation-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.hesitation-time {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.hesitation-description {
  color: #6b7280;
  font-size: 0.8rem;
}

/* Attention Analysis */
.attention-metrics {
  display: flex;
  gap: 25px;
  align-items: center;
}

.attention-gauge {
  text-align: center;
}

.gauge-title {
  margin-bottom: 10px;
  font-weight: 600;
  color: #374151;
}

.circular-progress {
  position: relative;
  width: 120px;
  height: 120px;
}

.progress-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-circle {
  transition: stroke-dashoffset 0.6s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.progress-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3860be;
}

.progress-unit {
  font-size: 1rem;
  color: #6b7280;
}

.attention-factors {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.factor-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.factor-icon {
  font-size: 1.5rem;
}

.factor-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.factor-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.factor-value {
  color: #6b7280;
  font-size: 0.8rem;
}

/* Stress Indicators */
.stress-dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stress-level {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid;
}

.stress-level.low {
  background: #f0fdf4;
  border-color: #10b981;
}

.stress-level.medium {
  background: #fefbf1;
  border-color: #f59e0b;
}

.stress-level.high {
  background: #fef2f2;
  border-color: #ef4444;
}

.stress-icon {
  font-size: 2rem;
}

.stress-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stress-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #374151;
}

.stress-description {
  color: #6b7280;
  font-size: 0.9rem;
}

.stress-factors {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stress-factor {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.factor-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.factor-emoji {
  font-size: 1.2rem;
}

.factor-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.factor-meter {
  position: relative;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.factor-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.factor-level {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
}

/* AI Recommendations */
.ai-recommendations {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.recommendation-card {
  border: 2px solid;
  border-radius: 12px;
  padding: 25px;
  background: white;
  transition: transform 0.2s ease;
}

.recommendation-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.recommendation-card.high {
  border-color: #ef4444;
  background: #fef2f2;
}

.recommendation-card.medium {
  border-color: #f59e0b;
  background: #fefbf1;
}

.recommendation-card.low {
  border-color: #10b981;
  background: #f0fdf4;
}

.recommendation-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.recommendation-icon {
  font-size: 1.5rem;
}

.recommendation-info {
  flex: 1;
}

.recommendation-info h4 {
  margin: 0 0 4px 0;
  color: #374151;
  font-size: 1.1rem;
}

.recommendation-priority {
  color: #6b7280;
  font-size: 0.9rem;
  text-transform: capitalize;
}

.recommendation-confidence {
  background: #374151;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.recommendation-content p {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 15px 0;
}

.recommendation-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.action-button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button.primary {
  background: #3860be;
  color: white;
}

.action-button.primary:hover {
  background: #013474;
}

.action-button.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #e5e7eb;
}

.action-button.secondary:hover {
  background: #e5e7eb;
}

.action-button.tertiary {
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.action-button.tertiary:hover {
  background: #f9fafb;
}

.recommendation-impact {
  background: rgba(0, 0, 0, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.impact-metrics {
  display: flex;
  gap: 20px;
}

.impact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.impact-label {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.impact-value {
  font-size: 0.9rem;
  color: #374151;
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .sentiment-dashboard {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .attention-metrics {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .advanced-mood-analytics {
    padding: 15px;
  }
  
  .analytics-header {
    padding: 20px 15px;
  }
  
  .analytics-header h2 {
    font-size: 1.8rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .prediction-cards,
  .behavior-insights {
    grid-template-columns: 1fr;
  }
  
  .flow-nodes {
    flex-direction: column;
    align-items: stretch;
  }
  
  .flow-arrow {
    transform: rotate(90deg);
    margin: 10px 0;
  }
  
  .hesitation-map {
    flex-direction: column;
    gap: 20px;
  }
  
  .impact-metrics {
    flex-direction: column;
    gap: 10px;
  }
  
  .recommendation-actions {
    flex-direction: column;
  }
  
  .action-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .analytics-header h2 {
    font-size: 1.5rem;
  }
  
  .heatmap-header,
  .heatmap-row {
    grid-template-columns: 60px repeat(9, 1fr);
  }
  
  .mood-header {
    padding: 6px 2px;
  }
  
  .mood-emoji {
    font-size: 1rem;
  }
  
  .mood-name {
    font-size: 0.6rem;
  }
}
</style>