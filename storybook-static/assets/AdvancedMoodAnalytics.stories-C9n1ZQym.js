import{r as n}from"./vue.esm-bundler-BOts1VAj.js";import{A as o}from"./AdvancedMoodAnalytics-CCigKCF8.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const P={title:"Application Examples/Mood Tracking/Advanced Analytics Dashboard",component:o,parameters:{layout:"fullscreen",docs:{description:{component:"Advanced mood analytics dashboard with predictive analytics, sentiment analysis, behavioral pattern recognition, and AI-powered recommendations for optimizing user experience."}}}},s=()=>({components:{AdvancedMoodAnalytics:o},setup(){return{simulatedMoodData:n([{step:1,mood:"optimistic",timestamp:Date.now()-36e5,userId:"user1"},{step:2,mood:"confident",timestamp:Date.now()-3e6,userId:"user1"},{step:3,mood:"confused",timestamp:Date.now()-24e5,userId:"user1"},{step:4,mood:"determined",timestamp:Date.now()-18e5,userId:"user1"},{step:5,mood:"excited",timestamp:Date.now()-12e5,userId:"user1"}])}},template:`
    <div class="analytics-demo">
      <div class="demo-header">
        <h2>Advanced Mood Analytics Dashboard</h2>
        <p>Comprehensive emotional intelligence platform with predictive analytics, real-time sentiment analysis, and behavioral pattern recognition for optimizing form completion experiences.</p>
      </div>

      <AdvancedMoodAnalytics :mood-data="simulatedMoodData" />

      <div class="analytics-capabilities">
        <h3>Advanced Analytics Capabilities</h3>
        <div class="capabilities-grid">
          <div class="capability-section">
            <h4>🎯 Predictive Analytics</h4>
            <ul>
              <li>Completion likelihood prediction with 94% accuracy</li>
              <li>Optimal intervention timing recommendations</li>
              <li>User satisfaction forecasting</li>
              <li>Abandonment risk assessment</li>
              <li>Support need prediction algorithms</li>
            </ul>
          </div>

          <div class="capability-section">
            <h4>🧠 Sentiment Analysis</h4>
            <ul>
              <li>Real-time emotional state monitoring</li>
              <li>Multi-dimensional sentiment scoring</li>
              <li>Emotional journey visualization</li>
              <li>Sentiment trend analysis over time</li>
              <li>Contextual mood interpretation</li>
            </ul>
          </div>

          <div class="capability-section">
            <h4>📊 Behavioral Insights</h4>
            <ul>
              <li>Hesitation pattern recognition</li>
              <li>Attention and focus analysis</li>
              <li>Stress level indicators</li>
              <li>User engagement metrics</li>
              <li>Cognitive load assessment</li>
            </ul>
          </div>

          <div class="capability-section">
            <h4>🤖 AI Recommendations</h4>
            <ul>
              <li>Automated UX optimization suggestions</li>
              <li>Form design improvement recommendations</li>
              <li>Personalized support interventions</li>
              <li>Dynamic content adaptation</li>
              <li>Performance enhancement strategies</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="technical-specifications">
        <h3>Technical Implementation</h3>
        <div class="specs-grid">
          <div class="spec-card">
            <h4>Data Collection</h4>
            <div class="spec-details">
              <p><strong>Real-time Events:</strong> Mouse movements, clicks, keyboard activity, focus changes</p>
              <p><strong>Temporal Data:</strong> Time spent per field, hesitation patterns, completion velocity</p>
              <p><strong>Emotional Data:</strong> Explicit mood selections, implicit behavioral indicators</p>
              <p><strong>Context Data:</strong> Form step progression, help requests, abandonment points</p>
            </div>
          </div>

          <div class="spec-card">
            <h4>Analytics Engine</h4>
            <div class="spec-details">
              <p><strong>Sentiment Scoring:</strong> Multi-factor emotional state calculation</p>
              <p><strong>Predictive Models:</strong> Machine learning algorithms for completion forecasting</p>
              <p><strong>Pattern Recognition:</strong> Behavioral anomaly detection and trend analysis</p>
              <p><strong>Risk Assessment:</strong> Dynamic abandonment probability calculation</p>
            </div>
          </div>

          <div class="spec-card">
            <h4>Intervention System</h4>
            <div class="spec-details">
              <p><strong>Smart Triggers:</strong> Context-aware support activation</p>
              <p><strong>Personalization:</strong> Adaptive messaging based on emotional state</p>
              <p><strong>Escalation Logic:</strong> Progressive support levels from tips to live help</p>
              <p><strong>Success Tracking:</strong> Intervention effectiveness measurement</p>
            </div>
          </div>

          <div class="spec-card">
            <h4>Performance Metrics</h4>
            <div class="spec-details">
              <p><strong>Completion Rates:</strong> Overall and per-step success tracking</p>
              <p><strong>User Satisfaction:</strong> Emotional journey quality assessment</p>
              <p><strong>Support Efficiency:</strong> Help request resolution effectiveness</p>
              <p><strong>Business Impact:</strong> Revenue and conversion optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}),t=()=>({components:{AdvancedMoodAnalytics:o},setup(){const i=n([{id:"high-risk",title:"High Abandonment Risk",description:"User showing multiple stress indicators and negative sentiment trend",riskLevel:89,interventions:["immediate-help","simplify-form","callback-offer"],emotionalState:{current:"frustrated",trend:"declining",confidence:94}},{id:"moderate-support",title:"Moderate Support Need",description:"User experiencing confusion but maintaining engagement",riskLevel:34,interventions:["contextual-help","progress-encouragement"],emotionalState:{current:"confused",trend:"stable",confidence:87}},{id:"optimal-flow",title:"Optimal User Flow",description:"User progressing smoothly with positive emotional indicators",riskLevel:8,interventions:["progress-celebration","premium-upsell"],emotionalState:{current:"confident",trend:"improving",confidence:96}}]),e=n(i.value[0]),r=n({currentStep:3,timeOnStep:847,mouseMovements:156,clickEvents:23,keystrokes:89,tabSwitches:2,scrollEvents:45}),l=n([{emotion:"frustration",probability:78,triggers:["long-hesitation","multiple-corrections","help-seeking"]},{emotion:"confusion",probability:67,triggers:["field-hovering","backtracking","incomplete-entries"]},{emotion:"satisfaction",probability:23,triggers:["steady-progress","quick-completion","positive-interactions"]},{emotion:"anxiety",probability:45,triggers:["rapid-clicking","tab-switching","validation-errors"]}]);return{predictionScenarios:i,selectedScenario:e,realTimeMetrics:r,emotionPredictions:l,selectScenario:y=>{e.value=y}}},template:`
    <div class="prediction-demo">
      <div class="demo-header">
        <h2>Real-Time Emotion Prediction Engine</h2>
        <p>Advanced machine learning algorithms analyze user behavior patterns to predict emotional states and recommend optimal interventions.</p>
      </div>

      <div class="prediction-interface">
        <div class="scenario-selector">
          <h3>Prediction Scenarios</h3>
          <div class="scenario-buttons">
            <button
              v-for="scenario in predictionScenarios"
              :key="scenario.id"
              @click="selectScenario(scenario)"
              :class="['scenario-btn', { 'active': selectedScenario.id === scenario.id }]"
            >
              {{ scenario.title }}
            </button>
          </div>
        </div>

        <div class="prediction-dashboard">
          <div class="current-scenario">
            <div class="scenario-header">
              <h4>{{ selectedScenario.title }}</h4>
              <div class="risk-indicator" :class="getRiskLevel(selectedScenario.riskLevel)">
                <span class="risk-value">{{ selectedScenario.riskLevel }}%</span>
                <span class="risk-label">Risk Level</span>
              </div>
            </div>

            <p class="scenario-description">{{ selectedScenario.description }}</p>

            <div class="emotional-analysis">
              <div class="current-emotion">
                <div class="emotion-display">
                  <span class="emotion-emoji">{{ getEmotionEmoji(selectedScenario.emotionalState.current) }}</span>
                  <div class="emotion-details">
                    <span class="emotion-name">{{ formatEmotion(selectedScenario.emotionalState.current) }}</span>
                    <span class="emotion-trend">{{ selectedScenario.emotionalState.trend }}</span>
                    <span class="emotion-confidence">{{ selectedScenario.emotionalState.confidence }}% confidence</span>
                  </div>
                </div>
              </div>

              <div class="recommended-interventions">
                <h5>Recommended Interventions</h5>
                <div class="intervention-list">
                  <div
                    v-for="intervention in selectedScenario.interventions"
                    :key="intervention"
                    class="intervention-item"
                  >
                    <span class="intervention-icon">{{ getInterventionIcon(intervention) }}</span>
                    <span class="intervention-name">{{ formatIntervention(intervention) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="real-time-metrics">
            <h4>Real-Time Behavioral Metrics</h4>
            <div class="metrics-grid">
              <div class="metric-item">
                <span class="metric-icon">📍</span>
                <div class="metric-info">
                  <span class="metric-label">Current Step</span>
                  <span class="metric-value">{{ realTimeMetrics.currentStep }}/5</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">⏱️</span>
                <div class="metric-info">
                  <span class="metric-label">Time on Step</span>
                  <span class="metric-value">{{ Math.floor(realTimeMetrics.timeOnStep / 60) }}:{{ String(realTimeMetrics.timeOnStep % 60).padStart(2, '0') }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">🖱️</span>
                <div class="metric-info">
                  <span class="metric-label">Mouse Activity</span>
                  <span class="metric-value">{{ realTimeMetrics.mouseMovements }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">👆</span>
                <div class="metric-info">
                  <span class="metric-label">Click Events</span>
                  <span class="metric-value">{{ realTimeMetrics.clickEvents }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">⌨️</span>
                <div class="metric-info">
                  <span class="metric-label">Keystrokes</span>
                  <span class="metric-value">{{ realTimeMetrics.keystrokes }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">🔄</span>
                <div class="metric-info">
                  <span class="metric-label">Tab Switches</span>
                  <span class="metric-value">{{ realTimeMetrics.tabSwitches }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="emotion-predictions">
            <h4>Emotion Probability Matrix</h4>
            <div class="prediction-matrix">
              <div
                v-for="prediction in emotionPredictions"
                :key="prediction.emotion"
                class="prediction-row"
              >
                <div class="emotion-label">
                  <span class="emotion-emoji">{{ getEmotionEmoji(prediction.emotion) }}</span>
                  <span class="emotion-name">{{ formatEmotion(prediction.emotion) }}</span>
                </div>

                <div class="probability-bar">
                  <div
                    class="probability-fill"
                    :style="{
                      width: prediction.probability + '%',
                      backgroundColor: getProbabilityColor(prediction.probability)
                    }"
                  ></div>
                  <span class="probability-value">{{ prediction.probability }}%</span>
                </div>

                <div class="prediction-triggers">
                  <span
                    v-for="trigger in prediction.triggers"
                    :key="trigger"
                    class="trigger-tag"
                  >
                    {{ formatTrigger(trigger) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="prediction-algorithms">
        <h3>Prediction Algorithm Details</h3>
        <div class="algorithm-cards">
          <div class="algorithm-card">
            <h4>Behavioral Pattern Analysis</h4>
            <div class="algorithm-details">
              <p><strong>Input Features:</strong> Mouse velocity, click patterns, typing rhythm, hesitation duration</p>
              <p><strong>Model Type:</strong> Ensemble Random Forest with temporal sequence analysis</p>
              <p><strong>Accuracy:</strong> 89.3% on validation dataset</p>
              <p><strong>Update Frequency:</strong> Real-time with 500ms intervals</p>
            </div>
          </div>

          <div class="algorithm-card">
            <h4>Sentiment Classification</h4>
            <div class="algorithm-details">
              <p><strong>Input Features:</strong> Interaction patterns, form completion velocity, error frequency</p>
              <p><strong>Model Type:</strong> Deep neural network with LSTM layers</p>
              <p><strong>Accuracy:</strong> 92.7% emotion classification accuracy</p>
              <p><strong>Classes:</strong> 12 distinct emotional states with confidence scores</p>
            </div>
          </div>

          <div class="algorithm-card">
            <h4>Abandonment Risk Prediction</h4>
            <div class="algorithm-details">
              <p><strong>Input Features:</strong> Session duration, step completion time, help requests, error rates</p>
              <p><strong>Model Type:</strong> Gradient boosting with feature importance ranking</p>
              <p><strong>Accuracy:</strong> 94.1% precision for high-risk prediction</p>
              <p><strong>Intervention Trigger:</strong> 70% probability threshold</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,methods:{getRiskLevel(i){return i>70?"high":i>30?"medium":"low"},getEmotionEmoji(i){return{frustrated:"😤",confused:"😕",confident:"😎",anxious:"😰",satisfied:"😊",frustration:"😤",confusion:"😕",satisfaction:"😊",anxiety:"😰"}[i]||"😐"},formatEmotion(i){return i.charAt(0).toUpperCase()+i.slice(1)},getInterventionIcon(i){return{"immediate-help":"🆘","simplify-form":"📝","callback-offer":"📞","contextual-help":"💡","progress-encouragement":"🌟","progress-celebration":"🎉","premium-upsell":"⭐"}[i]||"🔧"},formatIntervention(i){return i.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")},getProbabilityColor(i){return i>70?"#ef4444":i>40?"#f59e0b":"#10b981"},formatTrigger(i){return i.split("-").join(" ")}}}),a=()=>({components:{AdvancedMoodAnalytics:o},setup(){const i=n([{id:"analytical",title:"Analytical User",characteristics:["Detail-oriented","Methodical","Prefers comprehensive information"],adaptations:["Extended tooltips","Detailed progress indicators","Comprehensive validation messages"],moodPattern:["focused","analytical","methodical","satisfied"],completionRate:94},{id:"casual",title:"Casual User",characteristics:["Quick decision maker","Prefers simplicity","Easily distracted"],adaptations:["Simplified interface","Progress celebrations","Quick help bubbles"],moodPattern:["optimistic","impatient","satisfied","excited"],completionRate:78},{id:"anxious",title:"Anxious User",characteristics:["Careful consideration","Seeks reassurance","Worry about mistakes"],adaptations:["Calming colors","Reassuring messages","Undo capabilities"],moodPattern:["anxious","cautious","relieved","confident"],completionRate:86}]),e=n(i.value[0]),r=n([{feature:"Interface Complexity",analytical:"Full feature set with detailed options",casual:"Simplified interface with essential features only",anxious:"Step-by-step guidance with clear explanations"},{feature:"Progress Feedback",analytical:"Detailed completion metrics and time estimates",casual:"Quick visual progress with celebration animations",anxious:"Gentle progress indicators with reassuring messages"},{feature:"Help System",analytical:"Comprehensive documentation and detailed tooltips",casual:"Quick tips and contextual hints",anxious:"Calming guidance with safety nets and undo options"},{feature:"Error Handling",analytical:"Detailed error descriptions with correction guidance",casual:"Simple error messages with quick fixes",anxious:"Gentle error notifications with reassuring recovery options"}]);return{userProfiles:i,selectedProfile:e,adaptiveFeatures:r,selectProfile:c=>{e.value=c}}},template:`
    <div class="personalization-demo">
      <div class="demo-header">
        <h2>Personalized User Experience Adaptation</h2>
        <p>Dynamic interface adaptation based on emotional patterns and behavioral analysis for optimized user journeys.</p>
      </div>

      <div class="profile-selector">
        <h3>User Profile Types</h3>
        <div class="profile-tabs">
          <button
            v-for="profile in userProfiles"
            :key="profile.id"
            @click="selectProfile(profile)"
            :class="['profile-tab', { 'active': selectedProfile.id === profile.id }]"
          >
            {{ profile.title }}
          </button>
        </div>
      </div>

      <div class="personalization-dashboard">
        <div class="profile-overview">
          <div class="profile-header">
            <h4>{{ selectedProfile.title }}</h4>
            <div class="completion-rate">
              <span class="rate-value">{{ selectedProfile.completionRate }}%</span>
              <span class="rate-label">Completion Rate</span>
            </div>
          </div>

          <div class="profile-characteristics">
            <h5>User Characteristics</h5>
            <ul class="characteristics-list">
              <li v-for="characteristic in selectedProfile.characteristics" :key="characteristic">
                {{ characteristic }}
              </li>
            </ul>
          </div>

          <div class="mood-journey">
            <h5>Typical Emotional Journey</h5>
            <div class="mood-flow">
              <div
                v-for="(mood, index) in selectedProfile.moodPattern"
                :key="index"
                class="mood-step"
              >
                <span class="mood-emoji">{{ getMoodEmoji(mood) }}</span>
                <span class="mood-label">{{ formatMood(mood) }}</span>
                <div v-if="index < selectedProfile.moodPattern.length - 1" class="flow-arrow">→</div>
              </div>
            </div>
          </div>

          <div class="adaptive-features-applied">
            <h5>Applied Adaptations</h5>
            <ul class="adaptations-list">
              <li v-for="adaptation in selectedProfile.adaptations" :key="adaptation">
                <span class="adaptation-icon">✓</span>
                {{ adaptation }}
              </li>
            </ul>
          </div>
        </div>

        <div class="feature-adaptations">
          <h4>Dynamic Feature Adaptations</h4>
          <div class="adaptations-table">
            <div class="table-header">
              <div class="feature-column">Feature</div>
              <div class="adaptation-column">{{ selectedProfile.title }} Adaptation</div>
            </div>
            
            <div
              v-for="feature in adaptiveFeatures"
              :key="feature.feature"
              class="table-row"
            >
              <div class="feature-name">{{ feature.feature }}</div>
              <div class="adaptation-description">
                {{ feature[selectedProfile.id] }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="personalization-benefits">
        <h3>Personalization Impact</h3>
        <div class="benefits-comparison">
          <div class="comparison-chart">
            <h4>Performance Metrics Comparison</h4>
            <div class="metrics-comparison">
              <div class="metric-group">
                <div class="metric-label">Completion Rate</div>
                <div class="metric-bars">
                  <div class="metric-bar">
                    <span class="bar-label">Generic Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill generic" style="width: 67%"></div>
                      <span class="bar-value">67%</span>
                    </div>
                  </div>
                  <div class="metric-bar">
                    <span class="bar-label">Personalized Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill personalized" style="width: 86%"></div>
                      <span class="bar-value">86%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="metric-group">
                <div class="metric-label">User Satisfaction</div>
                <div class="metric-bars">
                  <div class="metric-bar">
                    <span class="bar-label">Generic Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill generic" style="width: 72%"></div>
                      <span class="bar-value">7.2/10</span>
                    </div>
                  </div>
                  <div class="metric-bar">
                    <span class="bar-label">Personalized Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill personalized" style="width: 91%"></div>
                      <span class="bar-value">9.1/10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="metric-group">
                <div class="metric-label">Time to Complete</div>
                <div class="metric-bars">
                  <div class="metric-bar">
                    <span class="bar-label">Generic Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill generic-time" style="width: 78%"></div>
                      <span class="bar-value">12.3 min</span>
                    </div>
                  </div>
                  <div class="metric-bar">
                    <span class="bar-label">Personalized Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill personalized-time" style="width: 56%"></div>
                      <span class="bar-value">8.9 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="roi-summary">
            <h4>Business Impact</h4>
            <div class="roi-metrics">
              <div class="roi-item">
                <span class="roi-value">+28%</span>
                <span class="roi-label">Conversion Increase</span>
              </div>
              <div class="roi-item">
                <span class="roi-value">-35%</span>
                <span class="roi-label">Support Requests</span>
              </div>
              <div class="roi-item">
                <span class="roi-value">+42%</span>
                <span class="roi-label">User Satisfaction</span>
              </div>
              <div class="roi-item">
                <span class="roi-value">$890K</span>
                <span class="roi-label">Annual Revenue Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,methods:{getMoodEmoji(i){return{focused:"🤔",analytical:"🧐",methodical:"📊",satisfied:"😊",optimistic:"🙂",impatient:"😤",excited:"🤩",anxious:"😰",cautious:"😟",relieved:"😌",confident:"😎"}[i]||"😐"},formatMood(i){return i.charAt(0).toUpperCase()+i.slice(1)}}});var d,p,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`() => ({
  components: {
    AdvancedMoodAnalytics
  },
  setup() {
    const simulatedMoodData = ref([{
      step: 1,
      mood: 'optimistic',
      timestamp: Date.now() - 3600000,
      userId: 'user1'
    }, {
      step: 2,
      mood: 'confident',
      timestamp: Date.now() - 3000000,
      userId: 'user1'
    }, {
      step: 3,
      mood: 'confused',
      timestamp: Date.now() - 2400000,
      userId: 'user1'
    }, {
      step: 4,
      mood: 'determined',
      timestamp: Date.now() - 1800000,
      userId: 'user1'
    }, {
      step: 5,
      mood: 'excited',
      timestamp: Date.now() - 1200000,
      userId: 'user1'
    }]);
    return {
      simulatedMoodData
    };
  },
  template: \`
    <div class="analytics-demo">
      <div class="demo-header">
        <h2>Advanced Mood Analytics Dashboard</h2>
        <p>Comprehensive emotional intelligence platform with predictive analytics, real-time sentiment analysis, and behavioral pattern recognition for optimizing form completion experiences.</p>
      </div>

      <AdvancedMoodAnalytics :mood-data="simulatedMoodData" />

      <div class="analytics-capabilities">
        <h3>Advanced Analytics Capabilities</h3>
        <div class="capabilities-grid">
          <div class="capability-section">
            <h4>🎯 Predictive Analytics</h4>
            <ul>
              <li>Completion likelihood prediction with 94% accuracy</li>
              <li>Optimal intervention timing recommendations</li>
              <li>User satisfaction forecasting</li>
              <li>Abandonment risk assessment</li>
              <li>Support need prediction algorithms</li>
            </ul>
          </div>

          <div class="capability-section">
            <h4>🧠 Sentiment Analysis</h4>
            <ul>
              <li>Real-time emotional state monitoring</li>
              <li>Multi-dimensional sentiment scoring</li>
              <li>Emotional journey visualization</li>
              <li>Sentiment trend analysis over time</li>
              <li>Contextual mood interpretation</li>
            </ul>
          </div>

          <div class="capability-section">
            <h4>📊 Behavioral Insights</h4>
            <ul>
              <li>Hesitation pattern recognition</li>
              <li>Attention and focus analysis</li>
              <li>Stress level indicators</li>
              <li>User engagement metrics</li>
              <li>Cognitive load assessment</li>
            </ul>
          </div>

          <div class="capability-section">
            <h4>🤖 AI Recommendations</h4>
            <ul>
              <li>Automated UX optimization suggestions</li>
              <li>Form design improvement recommendations</li>
              <li>Personalized support interventions</li>
              <li>Dynamic content adaptation</li>
              <li>Performance enhancement strategies</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="technical-specifications">
        <h3>Technical Implementation</h3>
        <div class="specs-grid">
          <div class="spec-card">
            <h4>Data Collection</h4>
            <div class="spec-details">
              <p><strong>Real-time Events:</strong> Mouse movements, clicks, keyboard activity, focus changes</p>
              <p><strong>Temporal Data:</strong> Time spent per field, hesitation patterns, completion velocity</p>
              <p><strong>Emotional Data:</strong> Explicit mood selections, implicit behavioral indicators</p>
              <p><strong>Context Data:</strong> Form step progression, help requests, abandonment points</p>
            </div>
          </div>

          <div class="spec-card">
            <h4>Analytics Engine</h4>
            <div class="spec-details">
              <p><strong>Sentiment Scoring:</strong> Multi-factor emotional state calculation</p>
              <p><strong>Predictive Models:</strong> Machine learning algorithms for completion forecasting</p>
              <p><strong>Pattern Recognition:</strong> Behavioral anomaly detection and trend analysis</p>
              <p><strong>Risk Assessment:</strong> Dynamic abandonment probability calculation</p>
            </div>
          </div>

          <div class="spec-card">
            <h4>Intervention System</h4>
            <div class="spec-details">
              <p><strong>Smart Triggers:</strong> Context-aware support activation</p>
              <p><strong>Personalization:</strong> Adaptive messaging based on emotional state</p>
              <p><strong>Escalation Logic:</strong> Progressive support levels from tips to live help</p>
              <p><strong>Success Tracking:</strong> Intervention effectiveness measurement</p>
            </div>
          </div>

          <div class="spec-card">
            <h4>Performance Metrics</h4>
            <div class="spec-details">
              <p><strong>Completion Rates:</strong> Overall and per-step success tracking</p>
              <p><strong>User Satisfaction:</strong> Emotional journey quality assessment</p>
              <p><strong>Support Efficiency:</strong> Help request resolution effectiveness</p>
              <p><strong>Business Impact:</strong> Revenue and conversion optimization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var v,u,g;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`() => ({
  components: {
    AdvancedMoodAnalytics
  },
  setup() {
    const predictionScenarios = ref([{
      id: 'high-risk',
      title: 'High Abandonment Risk',
      description: 'User showing multiple stress indicators and negative sentiment trend',
      riskLevel: 89,
      interventions: ['immediate-help', 'simplify-form', 'callback-offer'],
      emotionalState: {
        current: 'frustrated',
        trend: 'declining',
        confidence: 94
      }
    }, {
      id: 'moderate-support',
      title: 'Moderate Support Need',
      description: 'User experiencing confusion but maintaining engagement',
      riskLevel: 34,
      interventions: ['contextual-help', 'progress-encouragement'],
      emotionalState: {
        current: 'confused',
        trend: 'stable',
        confidence: 87
      }
    }, {
      id: 'optimal-flow',
      title: 'Optimal User Flow',
      description: 'User progressing smoothly with positive emotional indicators',
      riskLevel: 8,
      interventions: ['progress-celebration', 'premium-upsell'],
      emotionalState: {
        current: 'confident',
        trend: 'improving',
        confidence: 96
      }
    }]);
    const selectedScenario = ref(predictionScenarios.value[0]);
    const realTimeMetrics = ref({
      currentStep: 3,
      timeOnStep: 847,
      mouseMovements: 156,
      clickEvents: 23,
      keystrokes: 89,
      tabSwitches: 2,
      scrollEvents: 45
    });
    const emotionPredictions = ref([{
      emotion: 'frustration',
      probability: 78,
      triggers: ['long-hesitation', 'multiple-corrections', 'help-seeking']
    }, {
      emotion: 'confusion',
      probability: 67,
      triggers: ['field-hovering', 'backtracking', 'incomplete-entries']
    }, {
      emotion: 'satisfaction',
      probability: 23,
      triggers: ['steady-progress', 'quick-completion', 'positive-interactions']
    }, {
      emotion: 'anxiety',
      probability: 45,
      triggers: ['rapid-clicking', 'tab-switching', 'validation-errors']
    }]);
    const selectScenario = scenario => {
      selectedScenario.value = scenario;
    };
    return {
      predictionScenarios,
      selectedScenario,
      realTimeMetrics,
      emotionPredictions,
      selectScenario
    };
  },
  template: \`
    <div class="prediction-demo">
      <div class="demo-header">
        <h2>Real-Time Emotion Prediction Engine</h2>
        <p>Advanced machine learning algorithms analyze user behavior patterns to predict emotional states and recommend optimal interventions.</p>
      </div>

      <div class="prediction-interface">
        <div class="scenario-selector">
          <h3>Prediction Scenarios</h3>
          <div class="scenario-buttons">
            <button
              v-for="scenario in predictionScenarios"
              :key="scenario.id"
              @click="selectScenario(scenario)"
              :class="['scenario-btn', { 'active': selectedScenario.id === scenario.id }]"
            >
              {{ scenario.title }}
            </button>
          </div>
        </div>

        <div class="prediction-dashboard">
          <div class="current-scenario">
            <div class="scenario-header">
              <h4>{{ selectedScenario.title }}</h4>
              <div class="risk-indicator" :class="getRiskLevel(selectedScenario.riskLevel)">
                <span class="risk-value">{{ selectedScenario.riskLevel }}%</span>
                <span class="risk-label">Risk Level</span>
              </div>
            </div>

            <p class="scenario-description">{{ selectedScenario.description }}</p>

            <div class="emotional-analysis">
              <div class="current-emotion">
                <div class="emotion-display">
                  <span class="emotion-emoji">{{ getEmotionEmoji(selectedScenario.emotionalState.current) }}</span>
                  <div class="emotion-details">
                    <span class="emotion-name">{{ formatEmotion(selectedScenario.emotionalState.current) }}</span>
                    <span class="emotion-trend">{{ selectedScenario.emotionalState.trend }}</span>
                    <span class="emotion-confidence">{{ selectedScenario.emotionalState.confidence }}% confidence</span>
                  </div>
                </div>
              </div>

              <div class="recommended-interventions">
                <h5>Recommended Interventions</h5>
                <div class="intervention-list">
                  <div
                    v-for="intervention in selectedScenario.interventions"
                    :key="intervention"
                    class="intervention-item"
                  >
                    <span class="intervention-icon">{{ getInterventionIcon(intervention) }}</span>
                    <span class="intervention-name">{{ formatIntervention(intervention) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="real-time-metrics">
            <h4>Real-Time Behavioral Metrics</h4>
            <div class="metrics-grid">
              <div class="metric-item">
                <span class="metric-icon">📍</span>
                <div class="metric-info">
                  <span class="metric-label">Current Step</span>
                  <span class="metric-value">{{ realTimeMetrics.currentStep }}/5</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">⏱️</span>
                <div class="metric-info">
                  <span class="metric-label">Time on Step</span>
                  <span class="metric-value">{{ Math.floor(realTimeMetrics.timeOnStep / 60) }}:{{ String(realTimeMetrics.timeOnStep % 60).padStart(2, '0') }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">🖱️</span>
                <div class="metric-info">
                  <span class="metric-label">Mouse Activity</span>
                  <span class="metric-value">{{ realTimeMetrics.mouseMovements }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">👆</span>
                <div class="metric-info">
                  <span class="metric-label">Click Events</span>
                  <span class="metric-value">{{ realTimeMetrics.clickEvents }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">⌨️</span>
                <div class="metric-info">
                  <span class="metric-label">Keystrokes</span>
                  <span class="metric-value">{{ realTimeMetrics.keystrokes }}</span>
                </div>
              </div>

              <div class="metric-item">
                <span class="metric-icon">🔄</span>
                <div class="metric-info">
                  <span class="metric-label">Tab Switches</span>
                  <span class="metric-value">{{ realTimeMetrics.tabSwitches }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="emotion-predictions">
            <h4>Emotion Probability Matrix</h4>
            <div class="prediction-matrix">
              <div
                v-for="prediction in emotionPredictions"
                :key="prediction.emotion"
                class="prediction-row"
              >
                <div class="emotion-label">
                  <span class="emotion-emoji">{{ getEmotionEmoji(prediction.emotion) }}</span>
                  <span class="emotion-name">{{ formatEmotion(prediction.emotion) }}</span>
                </div>

                <div class="probability-bar">
                  <div
                    class="probability-fill"
                    :style="{
                      width: prediction.probability + '%',
                      backgroundColor: getProbabilityColor(prediction.probability)
                    }"
                  ></div>
                  <span class="probability-value">{{ prediction.probability }}%</span>
                </div>

                <div class="prediction-triggers">
                  <span
                    v-for="trigger in prediction.triggers"
                    :key="trigger"
                    class="trigger-tag"
                  >
                    {{ formatTrigger(trigger) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="prediction-algorithms">
        <h3>Prediction Algorithm Details</h3>
        <div class="algorithm-cards">
          <div class="algorithm-card">
            <h4>Behavioral Pattern Analysis</h4>
            <div class="algorithm-details">
              <p><strong>Input Features:</strong> Mouse velocity, click patterns, typing rhythm, hesitation duration</p>
              <p><strong>Model Type:</strong> Ensemble Random Forest with temporal sequence analysis</p>
              <p><strong>Accuracy:</strong> 89.3% on validation dataset</p>
              <p><strong>Update Frequency:</strong> Real-time with 500ms intervals</p>
            </div>
          </div>

          <div class="algorithm-card">
            <h4>Sentiment Classification</h4>
            <div class="algorithm-details">
              <p><strong>Input Features:</strong> Interaction patterns, form completion velocity, error frequency</p>
              <p><strong>Model Type:</strong> Deep neural network with LSTM layers</p>
              <p><strong>Accuracy:</strong> 92.7% emotion classification accuracy</p>
              <p><strong>Classes:</strong> 12 distinct emotional states with confidence scores</p>
            </div>
          </div>

          <div class="algorithm-card">
            <h4>Abandonment Risk Prediction</h4>
            <div class="algorithm-details">
              <p><strong>Input Features:</strong> Session duration, step completion time, help requests, error rates</p>
              <p><strong>Model Type:</strong> Gradient boosting with feature importance ranking</p>
              <p><strong>Accuracy:</strong> 94.1% precision for high-risk prediction</p>
              <p><strong>Intervention Trigger:</strong> 70% probability threshold</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  methods: {
    getRiskLevel(risk) {
      if (risk > 70) return 'high';
      if (risk > 30) return 'medium';
      return 'low';
    },
    getEmotionEmoji(emotion) {
      const emojiMap = {
        frustrated: '😤',
        confused: '😕',
        confident: '😎',
        anxious: '😰',
        satisfied: '😊',
        frustration: '😤',
        confusion: '😕',
        satisfaction: '😊',
        anxiety: '😰'
      };
      return emojiMap[emotion] || '😐';
    },
    formatEmotion(emotion) {
      return emotion.charAt(0).toUpperCase() + emotion.slice(1);
    },
    getInterventionIcon(intervention) {
      const iconMap = {
        'immediate-help': '🆘',
        'simplify-form': '📝',
        'callback-offer': '📞',
        'contextual-help': '💡',
        'progress-encouragement': '🌟',
        'progress-celebration': '🎉',
        'premium-upsell': '⭐'
      };
      return iconMap[intervention] || '🔧';
    },
    formatIntervention(intervention) {
      return intervention.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    getProbabilityColor(probability) {
      if (probability > 70) return '#ef4444';
      if (probability > 40) return '#f59e0b';
      return '#10b981';
    },
    formatTrigger(trigger) {
      return trigger.split('-').join(' ');
    }
  }
})`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var f,h,b;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`() => ({
  components: {
    AdvancedMoodAnalytics
  },
  setup() {
    const userProfiles = ref([{
      id: 'analytical',
      title: 'Analytical User',
      characteristics: ['Detail-oriented', 'Methodical', 'Prefers comprehensive information'],
      adaptations: ['Extended tooltips', 'Detailed progress indicators', 'Comprehensive validation messages'],
      moodPattern: ['focused', 'analytical', 'methodical', 'satisfied'],
      completionRate: 94
    }, {
      id: 'casual',
      title: 'Casual User',
      characteristics: ['Quick decision maker', 'Prefers simplicity', 'Easily distracted'],
      adaptations: ['Simplified interface', 'Progress celebrations', 'Quick help bubbles'],
      moodPattern: ['optimistic', 'impatient', 'satisfied', 'excited'],
      completionRate: 78
    }, {
      id: 'anxious',
      title: 'Anxious User',
      characteristics: ['Careful consideration', 'Seeks reassurance', 'Worry about mistakes'],
      adaptations: ['Calming colors', 'Reassuring messages', 'Undo capabilities'],
      moodPattern: ['anxious', 'cautious', 'relieved', 'confident'],
      completionRate: 86
    }]);
    const selectedProfile = ref(userProfiles.value[0]);
    const adaptiveFeatures = ref([{
      feature: 'Interface Complexity',
      analytical: 'Full feature set with detailed options',
      casual: 'Simplified interface with essential features only',
      anxious: 'Step-by-step guidance with clear explanations'
    }, {
      feature: 'Progress Feedback',
      analytical: 'Detailed completion metrics and time estimates',
      casual: 'Quick visual progress with celebration animations',
      anxious: 'Gentle progress indicators with reassuring messages'
    }, {
      feature: 'Help System',
      analytical: 'Comprehensive documentation and detailed tooltips',
      casual: 'Quick tips and contextual hints',
      anxious: 'Calming guidance with safety nets and undo options'
    }, {
      feature: 'Error Handling',
      analytical: 'Detailed error descriptions with correction guidance',
      casual: 'Simple error messages with quick fixes',
      anxious: 'Gentle error notifications with reassuring recovery options'
    }]);
    const selectProfile = profile => {
      selectedProfile.value = profile;
    };
    return {
      userProfiles,
      selectedProfile,
      adaptiveFeatures,
      selectProfile
    };
  },
  template: \`
    <div class="personalization-demo">
      <div class="demo-header">
        <h2>Personalized User Experience Adaptation</h2>
        <p>Dynamic interface adaptation based on emotional patterns and behavioral analysis for optimized user journeys.</p>
      </div>

      <div class="profile-selector">
        <h3>User Profile Types</h3>
        <div class="profile-tabs">
          <button
            v-for="profile in userProfiles"
            :key="profile.id"
            @click="selectProfile(profile)"
            :class="['profile-tab', { 'active': selectedProfile.id === profile.id }]"
          >
            {{ profile.title }}
          </button>
        </div>
      </div>

      <div class="personalization-dashboard">
        <div class="profile-overview">
          <div class="profile-header">
            <h4>{{ selectedProfile.title }}</h4>
            <div class="completion-rate">
              <span class="rate-value">{{ selectedProfile.completionRate }}%</span>
              <span class="rate-label">Completion Rate</span>
            </div>
          </div>

          <div class="profile-characteristics">
            <h5>User Characteristics</h5>
            <ul class="characteristics-list">
              <li v-for="characteristic in selectedProfile.characteristics" :key="characteristic">
                {{ characteristic }}
              </li>
            </ul>
          </div>

          <div class="mood-journey">
            <h5>Typical Emotional Journey</h5>
            <div class="mood-flow">
              <div
                v-for="(mood, index) in selectedProfile.moodPattern"
                :key="index"
                class="mood-step"
              >
                <span class="mood-emoji">{{ getMoodEmoji(mood) }}</span>
                <span class="mood-label">{{ formatMood(mood) }}</span>
                <div v-if="index < selectedProfile.moodPattern.length - 1" class="flow-arrow">→</div>
              </div>
            </div>
          </div>

          <div class="adaptive-features-applied">
            <h5>Applied Adaptations</h5>
            <ul class="adaptations-list">
              <li v-for="adaptation in selectedProfile.adaptations" :key="adaptation">
                <span class="adaptation-icon">✓</span>
                {{ adaptation }}
              </li>
            </ul>
          </div>
        </div>

        <div class="feature-adaptations">
          <h4>Dynamic Feature Adaptations</h4>
          <div class="adaptations-table">
            <div class="table-header">
              <div class="feature-column">Feature</div>
              <div class="adaptation-column">{{ selectedProfile.title }} Adaptation</div>
            </div>
            
            <div
              v-for="feature in adaptiveFeatures"
              :key="feature.feature"
              class="table-row"
            >
              <div class="feature-name">{{ feature.feature }}</div>
              <div class="adaptation-description">
                {{ feature[selectedProfile.id] }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="personalization-benefits">
        <h3>Personalization Impact</h3>
        <div class="benefits-comparison">
          <div class="comparison-chart">
            <h4>Performance Metrics Comparison</h4>
            <div class="metrics-comparison">
              <div class="metric-group">
                <div class="metric-label">Completion Rate</div>
                <div class="metric-bars">
                  <div class="metric-bar">
                    <span class="bar-label">Generic Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill generic" style="width: 67%"></div>
                      <span class="bar-value">67%</span>
                    </div>
                  </div>
                  <div class="metric-bar">
                    <span class="bar-label">Personalized Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill personalized" style="width: 86%"></div>
                      <span class="bar-value">86%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="metric-group">
                <div class="metric-label">User Satisfaction</div>
                <div class="metric-bars">
                  <div class="metric-bar">
                    <span class="bar-label">Generic Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill generic" style="width: 72%"></div>
                      <span class="bar-value">7.2/10</span>
                    </div>
                  </div>
                  <div class="metric-bar">
                    <span class="bar-label">Personalized Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill personalized" style="width: 91%"></div>
                      <span class="bar-value">9.1/10</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="metric-group">
                <div class="metric-label">Time to Complete</div>
                <div class="metric-bars">
                  <div class="metric-bar">
                    <span class="bar-label">Generic Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill generic-time" style="width: 78%"></div>
                      <span class="bar-value">12.3 min</span>
                    </div>
                  </div>
                  <div class="metric-bar">
                    <span class="bar-label">Personalized Interface</span>
                    <div class="bar-container">
                      <div class="bar-fill personalized-time" style="width: 56%"></div>
                      <span class="bar-value">8.9 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="roi-summary">
            <h4>Business Impact</h4>
            <div class="roi-metrics">
              <div class="roi-item">
                <span class="roi-value">+28%</span>
                <span class="roi-label">Conversion Increase</span>
              </div>
              <div class="roi-item">
                <span class="roi-value">-35%</span>
                <span class="roi-label">Support Requests</span>
              </div>
              <div class="roi-item">
                <span class="roi-value">+42%</span>
                <span class="roi-label">User Satisfaction</span>
              </div>
              <div class="roi-item">
                <span class="roi-value">$890K</span>
                <span class="roi-label">Annual Revenue Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  methods: {
    getMoodEmoji(mood) {
      const emojiMap = {
        focused: '🤔',
        analytical: '🧐',
        methodical: '📊',
        satisfied: '😊',
        optimistic: '🙂',
        impatient: '😤',
        excited: '🤩',
        anxious: '😰',
        cautious: '😟',
        relieved: '😌',
        confident: '😎'
      };
      return emojiMap[mood] || '😐';
    },
    formatMood(mood) {
      return mood.charAt(0).toUpperCase() + mood.slice(1);
    }
  }
})`,...(b=(h=a.parameters)==null?void 0:h.docs)==null?void 0:b.source}}};const E=["ComprehensiveAnalyticsDashboard","RealTimeEmotionPrediction","PersonalizedUserExperience"];export{s as ComprehensiveAnalyticsDashboard,a as PersonalizedUserExperience,t as RealTimeEmotionPrediction,E as __namedExportsOrder,P as default};
