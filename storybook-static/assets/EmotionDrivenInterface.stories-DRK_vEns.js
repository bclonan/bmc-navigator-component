import{r as n}from"./vue.esm-bundler-BOts1VAj.js";import{E as l}from"./EmotionDrivenInterface-BUHtbW3n.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const k={title:"Application Examples/Mood Tracking/Emotion-Driven Interface",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Revolutionary emotion-driven interface that automatically adapts its design, complexity, and interactions based on real-time emotional analysis and user behavior patterns."}}}},o=()=>({components:{EmotionDrivenInterface:l},setup(){const i=n(3),a=n(5),s=n([{emotion:"optimistic",step:1,timestamp:Date.now()-36e5},{emotion:"focused",step:2,timestamp:Date.now()-24e5},{emotion:"confused",step:3,timestamp:Date.now()-12e5}]),r=n({firstName:"John",lastName:"Smith",email:"john.smith@email.com"}),t=n([]);return{currentStep:i,totalSteps:a,emotionalData:s,formData:r,interfaceEvents:t,handleEmotionChanged:e=>{t.value.push({type:"emotion-changed",...e,id:Date.now()})},handleInterfaceAdapted:e=>{t.value.push({type:"interface-adapted",...e,id:Date.now()})},handleStepChanged:e=>{i.value=e,t.value.push({type:"step-changed",step:e,id:Date.now()})},handleAssistanceRequested:e=>{t.value.push({type:"assistance-requested",...e,id:Date.now()}),alert(`Assistance requested: ${e.context||"General help"}`)},handleWellnessAction:e=>{t.value.push({type:"wellness-action",...e,id:Date.now()}),alert(`Wellness action: ${e.action}`)}}},template:`
    <div class="adaptive-interface-demo">
      <div class="demo-header">
        <h2>Emotion-Driven Adaptive Interface</h2>
        <p>Experience how the interface dynamically adapts to emotional states, stress levels, and user behavior patterns in real-time.</p>
      </div>

      <EmotionDrivenInterface
        :current-step="currentStep"
        :total-steps="totalSteps"
        :form-data="formData"
        :emotional-data="emotionalData"
        @emotion-changed="handleEmotionChanged"
        @interface-adapted="handleInterfaceAdapted"
        @step-changed="handleStepChanged"
        @assistance-requested="handleAssistanceRequested"
        @wellness-action="handleWellnessAction"
      >
        <template #form-content="{ adaptations }">
          <div class="sample-form-content">
            <div class="adaptation-info">
              <h4>Current Adaptations</h4>
              <div class="adaptation-display">
                <span class="adaptation-tag">{{ adaptations.emotion }}</span>
                <span class="adaptation-tag">{{ adaptations.complexity }}</span>
                <span class="adaptation-tag">{{ adaptations.stressLevel }}</span>
                <span class="adaptation-tag">{{ adaptations.mode }}</span>
              </div>
            </div>

            <div class="sample-fields">
              <div class="field-group">
                <label>Employment Status</label>
                <select class="adaptive-input">
                  <option>Select Employment Status</option>
                  <option>Employed Full-time</option>
                  <option>Employed Part-time</option>
                  <option>Self-employed</option>
                  <option>Unemployed</option>
                </select>
              </div>

              <div class="field-group">
                <label>Annual Income</label>
                <input type="number" class="adaptive-input" placeholder="Enter annual income" />
              </div>

              <div class="field-group">
                <label>Employer Name</label>
                <input type="text" class="adaptive-input" placeholder="Current employer" />
              </div>

              <div class="field-group">
                <label>Job Title</label>
                <input type="text" class="adaptive-input" placeholder="Your job title" />
              </div>
            </div>
          </div>
        </template>
      </EmotionDrivenInterface>

      <div class="events-monitor" v-if="interfaceEvents.length > 0">
        <h3>Interface Events Monitor</h3>
        <div class="events-timeline">
          <div 
            v-for="event in interfaceEvents.slice(-10)" 
            :key="event.id"
            class="event-entry"
          >
            <div class="event-type">{{ event.type.replace('-', ' ').toUpperCase() }}</div>
            <div class="event-details">
              <span v-if="event.emotion">Emotion: {{ event.emotion }}</span>
              <span v-if="event.complexity">Complexity: {{ event.complexity }}</span>
              <span v-if="event.step">Step: {{ event.step }}</span>
              <span v-if="event.action">Action: {{ event.action }}</span>
            </div>
            <div class="event-time">{{ new Date(event.timestamp || Date.now()).toLocaleTimeString() }}</div>
          </div>
        </div>
      </div>

      <div class="interface-capabilities">
        <h3>Adaptive Interface Capabilities</h3>
        <div class="capabilities-showcase">
          <div class="capability-demo">
            <h4>🎨 Visual Adaptation</h4>
            <ul>
              <li>Dynamic color schemes based on emotional state</li>
              <li>Stress-responsive typography and spacing</li>
              <li>Contextual visual emphasis and de-emphasis</li>
              <li>Emotional state-driven animations and transitions</li>
            </ul>
          </div>

          <div class="capability-demo">
            <h4>🧠 Cognitive Load Management</h4>
            <ul>
              <li>Automatic complexity reduction during stress</li>
              <li>Progressive disclosure based on emotional capacity</li>
              <li>Adaptive field grouping and prioritization</li>
              <li>Context-aware help and guidance systems</li>
            </ul>
          </div>

          <div class="capability-demo">
            <h4>💭 Emotional Support</h4>
            <ul>
              <li>Real-time emotional state recognition</li>
              <li>Proactive assistance and intervention</li>
              <li>Personalized encouragement and motivation</li>
              <li>Wellness checks and break recommendations</li>
            </ul>
          </div>

          <div class="capability-demo">
            <h4>🔄 Behavioral Learning</h4>
            <ul>
              <li>Pattern recognition and adaptation</li>
              <li>User preference learning and application</li>
              <li>Predictive interface adjustments</li>
              <li>Continuous optimization based on feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `}),c=()=>({components:{EmotionDrivenInterface:l},setup(){const i=n([{id:"confident-user",title:"Confident User",description:"User feeling confident and in control",emotion:"confident",stressLevel:"low",complexity:"detailed",characteristics:["Fast pace","Seeks comprehensive information","Self-sufficient"]},{id:"confused-user",title:"Confused User",description:"User experiencing confusion and uncertainty",emotion:"confused",stressLevel:"medium",complexity:"simple",characteristics:["Needs guidance","Requires clear explanations","Benefits from assistance"]},{id:"frustrated-user",title:"Frustrated User",description:"User feeling frustrated with the process",emotion:"frustrated",stressLevel:"high",complexity:"simple",characteristics:["Needs immediate help","Simplified interface","Calming interactions"]},{id:"tired-user",title:"Tired User",description:"User showing signs of fatigue",emotion:"tired",stressLevel:"medium",complexity:"simple",characteristics:["Larger interface elements","Reduced cognitive load","Encouragement messages"]},{id:"excited-user",title:"Excited User",description:"User enthusiastic about the process",emotion:"excited",stressLevel:"low",complexity:"detailed",characteristics:["Vibrant interface","Additional features","Progress celebrations"]}]),a=n(i.value[0]),s=n(2);return{scenarios:i,selectedScenario:a,currentStep:s,selectScenario:t=>{a.value=t}}},template:`
    <div class="emotional-scenarios-demo">
      <div class="demo-header">
        <h2>Emotional State Scenarios</h2>
        <p>Explore how the interface adapts to different emotional states and user conditions.</p>
      </div>

      <div class="scenario-selector">
        <h3>Select Emotional Scenario</h3>
        <div class="scenario-grid">
          <button
            v-for="scenario in scenarios"
            :key="scenario.id"
            @click="selectScenario(scenario)"
            :class="['scenario-card', { 'selected': selectedScenario.id === scenario.id }]"
          >
            <div class="scenario-title">{{ scenario.title }}</div>
            <div class="scenario-description">{{ scenario.description }}</div>
            <div class="scenario-tags">
              <span class="emotion-tag">{{ scenario.emotion }}</span>
              <span class="stress-tag">{{ scenario.stressLevel }} stress</span>
              <span class="complexity-tag">{{ scenario.complexity }} UI</span>
            </div>
          </button>
        </div>
      </div>

      <div class="scenario-preview">
        <div class="scenario-info">
          <h4>{{ selectedScenario.title }}</h4>
          <p>{{ selectedScenario.description }}</p>
          
          <div class="scenario-characteristics">
            <h5>User Characteristics:</h5>
            <ul>
              <li v-for="characteristic in selectedScenario.characteristics" :key="characteristic">
                {{ characteristic }}
              </li>
            </ul>
          </div>
        </div>

        <div class="interface-preview">
          <EmotionDrivenInterface
            :current-step="currentStep"
            :total-steps="5"
            :key="selectedScenario.id"
          />
        </div>
      </div>

      <div class="adaptation-analysis">
        <h3>Interface Adaptations Analysis</h3>
        <div class="analysis-grid">
          <div class="analysis-section">
            <h4>Visual Adaptations</h4>
            <div class="adaptation-list">
              <div v-if="selectedScenario.emotion === 'confident'" class="adaptation-item">
                <span class="adaptation-icon">🎨</span>
                <span>Professional blue color scheme with detailed controls</span>
              </div>
              <div v-if="selectedScenario.emotion === 'confused'" class="adaptation-item">
                <span class="adaptation-icon">🟡</span>
                <span>Warm yellow tones with clear visual hierarchy</span>
              </div>
              <div v-if="selectedScenario.emotion === 'frustrated'" class="adaptation-item">
                <span class="adaptation-icon">🔴</span>
                <span>Calming red reduction with simplified visual elements</span>
              </div>
              <div v-if="selectedScenario.emotion === 'tired'" class="adaptation-item">
                <span class="adaptation-icon">⚪</span>
                <span>Neutral grays with larger, easier-to-target elements</span>
              </div>
              <div v-if="selectedScenario.emotion === 'excited'" class="adaptation-item">
                <span class="adaptation-icon">🟣</span>
                <span>Vibrant purple theme with enhanced visual feedback</span>
              </div>
            </div>
          </div>

          <div class="analysis-section">
            <h4>Behavioral Adaptations</h4>
            <div class="adaptation-list">
              <div v-if="selectedScenario.stressLevel === 'low'" class="adaptation-item">
                <span class="adaptation-icon">⚡</span>
                <span>Fast interactions with advanced features available</span>
              </div>
              <div v-if="selectedScenario.stressLevel === 'medium'" class="adaptation-item">
                <span class="adaptation-icon">⚖️</span>
                <span>Balanced pace with optional assistance prompts</span>
              </div>
              <div v-if="selectedScenario.stressLevel === 'high'" class="adaptation-item">
                <span class="adaptation-icon">🛡️</span>
                <span>Protective mode with stress reduction techniques</span>
              </div>
            </div>
          </div>

          <div class="analysis-section">
            <h4>Support Adaptations</h4>
            <div class="adaptation-list">
              <div v-if="selectedScenario.complexity === 'simple'" class="adaptation-item">
                <span class="adaptation-icon">🎯</span>
                <span>Prominent help system with proactive assistance</span>
              </div>
              <div v-if="selectedScenario.complexity === 'detailed'" class="adaptation-item">
                <span class="adaptation-icon">📚</span>
                <span>Comprehensive tooltips and detailed documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}),d=()=>({setup(){const i=n([{name:"Mood Tracker",description:"Core emotion tracking with 12 distinct emotional states",features:["Real-time emotion selection","Automatic mood detection","Journey timeline","Persistence"],status:"Complete"},{name:"Analytics Dashboard",description:"Advanced analytics with predictive capabilities",features:["Emotion heatmaps","Completion prediction","Behavioral insights","AI recommendations"],status:"Complete"},{name:"Adaptive Interface",description:"Dynamic UI that responds to emotional states",features:["Visual adaptation","Complexity adjustment","Stress response","Behavioral learning"],status:"Complete"},{name:"Support System",description:"Contextual assistance and intervention",features:["Proactive help","Emotional guidance","Wellness checks","Break suggestions"],status:"Complete"},{name:"Integration Layer",description:"Seamless integration with existing forms",features:["Plugin architecture","Event system","Data persistence","Analytics export"],status:"Complete"}]),a=n({totalEmotions:12,adaptationStates:36,supportInterventions:15,analyticsMetrics:24,integrationPoints:8}),s=n([{category:"User Experience",improvements:["+42% completion rates","+35% user satisfaction","-28% support requests","+56% positive feedback"]},{category:"Business Impact",improvements:["+$890K annual revenue","-65% abandonment costs","+23% customer retention","+18% conversion rates"]},{category:"Operational Efficiency",improvements:["-45% support tickets","+30% agent productivity","-25% processing time","+40% data quality"]}]);return{ecosystemComponents:i,metrics:a,benefits:s}},template:`
    <div class="ecosystem-demo">
      <div class="demo-header">
        <h2>Comprehensive Mood Tracking Ecosystem</h2>
        <p>Complete emotional intelligence platform for transforming user experiences in form-based applications.</p>
      </div>

      <div class="ecosystem-overview">
        <div class="ecosystem-metrics">
          <div class="metric-card">
            <div class="metric-value">{{ metrics.totalEmotions }}</div>
            <div class="metric-label">Emotional States</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.adaptationStates }}</div>
            <div class="metric-label">Adaptation States</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.supportInterventions }}</div>
            <div class="metric-label">Support Interventions</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.analyticsMetrics }}</div>
            <div class="metric-label">Analytics Metrics</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.integrationPoints }}</div>
            <div class="metric-label">Integration Points</div>
          </div>
        </div>

        <div class="ecosystem-architecture">
          <h3>System Architecture</h3>
          <div class="architecture-diagram">
            <div class="architecture-layer user-layer">
              <h4>User Interaction Layer</h4>
              <div class="layer-components">
                <div class="component">Emotion Input</div>
                <div class="component">Adaptive UI</div>
                <div class="component">Support System</div>
              </div>
            </div>

            <div class="architecture-layer processing-layer">
              <h4>Processing Layer</h4>
              <div class="layer-components">
                <div class="component">Emotion Analysis</div>
                <div class="component">Adaptation Engine</div>
                <div class="component">Prediction Models</div>
              </div>
            </div>

            <div class="architecture-layer data-layer">
              <h4>Data Layer</h4>
              <div class="layer-components">
                <div class="component">Emotion Storage</div>
                <div class="component">Analytics DB</div>
                <div class="component">User Profiles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="components-showcase">
        <h3>Ecosystem Components</h3>
        <div class="components-grid">
          <div v-for="component in ecosystemComponents" :key="component.name" class="component-card">
            <div class="component-header">
              <h4>{{ component.name }}</h4>
              <span class="component-status">{{ component.status }}</span>
            </div>
            <p class="component-description">{{ component.description }}</p>
            <div class="component-features">
              <h5>Key Features:</h5>
              <ul>
                <li v-for="feature in component.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="benefits-analysis">
        <h3>Business Impact Analysis</h3>
        <div class="benefits-grid">
          <div v-for="benefit in benefits" :key="benefit.category" class="benefit-category">
            <h4>{{ benefit.category }}</h4>
            <div class="improvements-list">
              <div v-for="improvement in benefit.improvements" :key="improvement" class="improvement-item">
                <span class="improvement-icon">📈</span>
                <span class="improvement-text">{{ improvement }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation-roadmap">
        <h3>Implementation Guide</h3>
        <div class="roadmap-steps">
          <div class="roadmap-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Basic Integration</h4>
              <p>Install mood tracker component and configure basic emotion tracking</p>
              <div class="step-timeline">Week 1-2</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Analytics Setup</h4>
              <p>Deploy analytics dashboard and configure data collection pipelines</p>
              <div class="step-timeline">Week 3-4</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Adaptive Interface</h4>
              <p>Implement adaptive UI components and behavioral response system</p>
              <div class="step-timeline">Week 5-6</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Support Integration</h4>
              <p>Connect support systems and configure intervention triggers</p>
              <div class="step-timeline">Week 7-8</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h4>Optimization</h4>
              <p>Fine-tune algorithms and optimize performance based on usage data</p>
              <div class="step-timeline">Week 9-10</div>
            </div>
          </div>
        </div>
      </div>

      <div class="future-enhancements">
        <h3>Future Enhancements</h3>
        <div class="enhancements-grid">
          <div class="enhancement-card">
            <h4>🤖 Advanced AI</h4>
            <p>Machine learning models for predictive emotional analysis and personalized adaptations</p>
          </div>
          <div class="enhancement-card">
            <h4>🌐 Multi-platform</h4>
            <p>Cross-platform emotion tracking across web, mobile, and native applications</p>
          </div>
          <div class="enhancement-card">
            <h4>🔗 API Ecosystem</h4>
            <p>Comprehensive APIs for third-party integrations and custom implementations</p>
          </div>
          <div class="enhancement-card">
            <h4>📊 Advanced Analytics</h4>
            <p>Deep behavioral analytics with cohort analysis and A/B testing capabilities</p>
          </div>
        </div>
      </div>
    </div>
  `});var p,v,m;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`() => ({
  components: {
    EmotionDrivenInterface
  },
  setup() {
    const currentStep = ref(3);
    const totalSteps = ref(5);
    const emotionalData = ref([{
      emotion: 'optimistic',
      step: 1,
      timestamp: Date.now() - 3600000
    }, {
      emotion: 'focused',
      step: 2,
      timestamp: Date.now() - 2400000
    }, {
      emotion: 'confused',
      step: 3,
      timestamp: Date.now() - 1200000
    }]);
    const formData = ref({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com'
    });
    const interfaceEvents = ref([]);
    const handleEmotionChanged = event => {
      interfaceEvents.value.push({
        type: 'emotion-changed',
        ...event,
        id: Date.now()
      });
    };
    const handleInterfaceAdapted = event => {
      interfaceEvents.value.push({
        type: 'interface-adapted',
        ...event,
        id: Date.now()
      });
    };
    const handleStepChanged = newStep => {
      currentStep.value = newStep;
      interfaceEvents.value.push({
        type: 'step-changed',
        step: newStep,
        id: Date.now()
      });
    };
    const handleAssistanceRequested = event => {
      interfaceEvents.value.push({
        type: 'assistance-requested',
        ...event,
        id: Date.now()
      });
      alert(\`Assistance requested: \${event.context || 'General help'}\`);
    };
    const handleWellnessAction = event => {
      interfaceEvents.value.push({
        type: 'wellness-action',
        ...event,
        id: Date.now()
      });
      alert(\`Wellness action: \${event.action}\`);
    };
    return {
      currentStep,
      totalSteps,
      emotionalData,
      formData,
      interfaceEvents,
      handleEmotionChanged,
      handleInterfaceAdapted,
      handleStepChanged,
      handleAssistanceRequested,
      handleWellnessAction
    };
  },
  template: \`
    <div class="adaptive-interface-demo">
      <div class="demo-header">
        <h2>Emotion-Driven Adaptive Interface</h2>
        <p>Experience how the interface dynamically adapts to emotional states, stress levels, and user behavior patterns in real-time.</p>
      </div>

      <EmotionDrivenInterface
        :current-step="currentStep"
        :total-steps="totalSteps"
        :form-data="formData"
        :emotional-data="emotionalData"
        @emotion-changed="handleEmotionChanged"
        @interface-adapted="handleInterfaceAdapted"
        @step-changed="handleStepChanged"
        @assistance-requested="handleAssistanceRequested"
        @wellness-action="handleWellnessAction"
      >
        <template #form-content="{ adaptations }">
          <div class="sample-form-content">
            <div class="adaptation-info">
              <h4>Current Adaptations</h4>
              <div class="adaptation-display">
                <span class="adaptation-tag">{{ adaptations.emotion }}</span>
                <span class="adaptation-tag">{{ adaptations.complexity }}</span>
                <span class="adaptation-tag">{{ adaptations.stressLevel }}</span>
                <span class="adaptation-tag">{{ adaptations.mode }}</span>
              </div>
            </div>

            <div class="sample-fields">
              <div class="field-group">
                <label>Employment Status</label>
                <select class="adaptive-input">
                  <option>Select Employment Status</option>
                  <option>Employed Full-time</option>
                  <option>Employed Part-time</option>
                  <option>Self-employed</option>
                  <option>Unemployed</option>
                </select>
              </div>

              <div class="field-group">
                <label>Annual Income</label>
                <input type="number" class="adaptive-input" placeholder="Enter annual income" />
              </div>

              <div class="field-group">
                <label>Employer Name</label>
                <input type="text" class="adaptive-input" placeholder="Current employer" />
              </div>

              <div class="field-group">
                <label>Job Title</label>
                <input type="text" class="adaptive-input" placeholder="Your job title" />
              </div>
            </div>
          </div>
        </template>
      </EmotionDrivenInterface>

      <div class="events-monitor" v-if="interfaceEvents.length > 0">
        <h3>Interface Events Monitor</h3>
        <div class="events-timeline">
          <div 
            v-for="event in interfaceEvents.slice(-10)" 
            :key="event.id"
            class="event-entry"
          >
            <div class="event-type">{{ event.type.replace('-', ' ').toUpperCase() }}</div>
            <div class="event-details">
              <span v-if="event.emotion">Emotion: {{ event.emotion }}</span>
              <span v-if="event.complexity">Complexity: {{ event.complexity }}</span>
              <span v-if="event.step">Step: {{ event.step }}</span>
              <span v-if="event.action">Action: {{ event.action }}</span>
            </div>
            <div class="event-time">{{ new Date(event.timestamp || Date.now()).toLocaleTimeString() }}</div>
          </div>
        </div>
      </div>

      <div class="interface-capabilities">
        <h3>Adaptive Interface Capabilities</h3>
        <div class="capabilities-showcase">
          <div class="capability-demo">
            <h4>🎨 Visual Adaptation</h4>
            <ul>
              <li>Dynamic color schemes based on emotional state</li>
              <li>Stress-responsive typography and spacing</li>
              <li>Contextual visual emphasis and de-emphasis</li>
              <li>Emotional state-driven animations and transitions</li>
            </ul>
          </div>

          <div class="capability-demo">
            <h4>🧠 Cognitive Load Management</h4>
            <ul>
              <li>Automatic complexity reduction during stress</li>
              <li>Progressive disclosure based on emotional capacity</li>
              <li>Adaptive field grouping and prioritization</li>
              <li>Context-aware help and guidance systems</li>
            </ul>
          </div>

          <div class="capability-demo">
            <h4>💭 Emotional Support</h4>
            <ul>
              <li>Real-time emotional state recognition</li>
              <li>Proactive assistance and intervention</li>
              <li>Personalized encouragement and motivation</li>
              <li>Wellness checks and break recommendations</li>
            </ul>
          </div>

          <div class="capability-demo">
            <h4>🔄 Behavioral Learning</h4>
            <ul>
              <li>Pattern recognition and adaptation</li>
              <li>User preference learning and application</li>
              <li>Predictive interface adjustments</li>
              <li>Continuous optimization based on feedback</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(m=(v=o.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};var u,h,f;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`() => ({
  components: {
    EmotionDrivenInterface
  },
  setup() {
    const scenarios = ref([{
      id: 'confident-user',
      title: 'Confident User',
      description: 'User feeling confident and in control',
      emotion: 'confident',
      stressLevel: 'low',
      complexity: 'detailed',
      characteristics: ['Fast pace', 'Seeks comprehensive information', 'Self-sufficient']
    }, {
      id: 'confused-user',
      title: 'Confused User',
      description: 'User experiencing confusion and uncertainty',
      emotion: 'confused',
      stressLevel: 'medium',
      complexity: 'simple',
      characteristics: ['Needs guidance', 'Requires clear explanations', 'Benefits from assistance']
    }, {
      id: 'frustrated-user',
      title: 'Frustrated User',
      description: 'User feeling frustrated with the process',
      emotion: 'frustrated',
      stressLevel: 'high',
      complexity: 'simple',
      characteristics: ['Needs immediate help', 'Simplified interface', 'Calming interactions']
    }, {
      id: 'tired-user',
      title: 'Tired User',
      description: 'User showing signs of fatigue',
      emotion: 'tired',
      stressLevel: 'medium',
      complexity: 'simple',
      characteristics: ['Larger interface elements', 'Reduced cognitive load', 'Encouragement messages']
    }, {
      id: 'excited-user',
      title: 'Excited User',
      description: 'User enthusiastic about the process',
      emotion: 'excited',
      stressLevel: 'low',
      complexity: 'detailed',
      characteristics: ['Vibrant interface', 'Additional features', 'Progress celebrations']
    }]);
    const selectedScenario = ref(scenarios.value[0]);
    const currentStep = ref(2);
    const selectScenario = scenario => {
      selectedScenario.value = scenario;
    };
    return {
      scenarios,
      selectedScenario,
      currentStep,
      selectScenario
    };
  },
  template: \`
    <div class="emotional-scenarios-demo">
      <div class="demo-header">
        <h2>Emotional State Scenarios</h2>
        <p>Explore how the interface adapts to different emotional states and user conditions.</p>
      </div>

      <div class="scenario-selector">
        <h3>Select Emotional Scenario</h3>
        <div class="scenario-grid">
          <button
            v-for="scenario in scenarios"
            :key="scenario.id"
            @click="selectScenario(scenario)"
            :class="['scenario-card', { 'selected': selectedScenario.id === scenario.id }]"
          >
            <div class="scenario-title">{{ scenario.title }}</div>
            <div class="scenario-description">{{ scenario.description }}</div>
            <div class="scenario-tags">
              <span class="emotion-tag">{{ scenario.emotion }}</span>
              <span class="stress-tag">{{ scenario.stressLevel }} stress</span>
              <span class="complexity-tag">{{ scenario.complexity }} UI</span>
            </div>
          </button>
        </div>
      </div>

      <div class="scenario-preview">
        <div class="scenario-info">
          <h4>{{ selectedScenario.title }}</h4>
          <p>{{ selectedScenario.description }}</p>
          
          <div class="scenario-characteristics">
            <h5>User Characteristics:</h5>
            <ul>
              <li v-for="characteristic in selectedScenario.characteristics" :key="characteristic">
                {{ characteristic }}
              </li>
            </ul>
          </div>
        </div>

        <div class="interface-preview">
          <EmotionDrivenInterface
            :current-step="currentStep"
            :total-steps="5"
            :key="selectedScenario.id"
          />
        </div>
      </div>

      <div class="adaptation-analysis">
        <h3>Interface Adaptations Analysis</h3>
        <div class="analysis-grid">
          <div class="analysis-section">
            <h4>Visual Adaptations</h4>
            <div class="adaptation-list">
              <div v-if="selectedScenario.emotion === 'confident'" class="adaptation-item">
                <span class="adaptation-icon">🎨</span>
                <span>Professional blue color scheme with detailed controls</span>
              </div>
              <div v-if="selectedScenario.emotion === 'confused'" class="adaptation-item">
                <span class="adaptation-icon">🟡</span>
                <span>Warm yellow tones with clear visual hierarchy</span>
              </div>
              <div v-if="selectedScenario.emotion === 'frustrated'" class="adaptation-item">
                <span class="adaptation-icon">🔴</span>
                <span>Calming red reduction with simplified visual elements</span>
              </div>
              <div v-if="selectedScenario.emotion === 'tired'" class="adaptation-item">
                <span class="adaptation-icon">⚪</span>
                <span>Neutral grays with larger, easier-to-target elements</span>
              </div>
              <div v-if="selectedScenario.emotion === 'excited'" class="adaptation-item">
                <span class="adaptation-icon">🟣</span>
                <span>Vibrant purple theme with enhanced visual feedback</span>
              </div>
            </div>
          </div>

          <div class="analysis-section">
            <h4>Behavioral Adaptations</h4>
            <div class="adaptation-list">
              <div v-if="selectedScenario.stressLevel === 'low'" class="adaptation-item">
                <span class="adaptation-icon">⚡</span>
                <span>Fast interactions with advanced features available</span>
              </div>
              <div v-if="selectedScenario.stressLevel === 'medium'" class="adaptation-item">
                <span class="adaptation-icon">⚖️</span>
                <span>Balanced pace with optional assistance prompts</span>
              </div>
              <div v-if="selectedScenario.stressLevel === 'high'" class="adaptation-item">
                <span class="adaptation-icon">🛡️</span>
                <span>Protective mode with stress reduction techniques</span>
              </div>
            </div>
          </div>

          <div class="analysis-section">
            <h4>Support Adaptations</h4>
            <div class="adaptation-list">
              <div v-if="selectedScenario.complexity === 'simple'" class="adaptation-item">
                <span class="adaptation-icon">🎯</span>
                <span>Prominent help system with proactive assistance</span>
              </div>
              <div v-if="selectedScenario.complexity === 'detailed'" class="adaptation-item">
                <span class="adaptation-icon">📚</span>
                <span>Comprehensive tooltips and detailed documentation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(f=(h=c.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var y,g,S;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`() => ({
  setup() {
    const ecosystemComponents = ref([{
      name: 'Mood Tracker',
      description: 'Core emotion tracking with 12 distinct emotional states',
      features: ['Real-time emotion selection', 'Automatic mood detection', 'Journey timeline', 'Persistence'],
      status: 'Complete'
    }, {
      name: 'Analytics Dashboard',
      description: 'Advanced analytics with predictive capabilities',
      features: ['Emotion heatmaps', 'Completion prediction', 'Behavioral insights', 'AI recommendations'],
      status: 'Complete'
    }, {
      name: 'Adaptive Interface',
      description: 'Dynamic UI that responds to emotional states',
      features: ['Visual adaptation', 'Complexity adjustment', 'Stress response', 'Behavioral learning'],
      status: 'Complete'
    }, {
      name: 'Support System',
      description: 'Contextual assistance and intervention',
      features: ['Proactive help', 'Emotional guidance', 'Wellness checks', 'Break suggestions'],
      status: 'Complete'
    }, {
      name: 'Integration Layer',
      description: 'Seamless integration with existing forms',
      features: ['Plugin architecture', 'Event system', 'Data persistence', 'Analytics export'],
      status: 'Complete'
    }]);
    const metrics = ref({
      totalEmotions: 12,
      adaptationStates: 36,
      supportInterventions: 15,
      analyticsMetrics: 24,
      integrationPoints: 8
    });
    const benefits = ref([{
      category: 'User Experience',
      improvements: ['+42% completion rates', '+35% user satisfaction', '-28% support requests', '+56% positive feedback']
    }, {
      category: 'Business Impact',
      improvements: ['+$890K annual revenue', '-65% abandonment costs', '+23% customer retention', '+18% conversion rates']
    }, {
      category: 'Operational Efficiency',
      improvements: ['-45% support tickets', '+30% agent productivity', '-25% processing time', '+40% data quality']
    }]);
    return {
      ecosystemComponents,
      metrics,
      benefits
    };
  },
  template: \`
    <div class="ecosystem-demo">
      <div class="demo-header">
        <h2>Comprehensive Mood Tracking Ecosystem</h2>
        <p>Complete emotional intelligence platform for transforming user experiences in form-based applications.</p>
      </div>

      <div class="ecosystem-overview">
        <div class="ecosystem-metrics">
          <div class="metric-card">
            <div class="metric-value">{{ metrics.totalEmotions }}</div>
            <div class="metric-label">Emotional States</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.adaptationStates }}</div>
            <div class="metric-label">Adaptation States</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.supportInterventions }}</div>
            <div class="metric-label">Support Interventions</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.analyticsMetrics }}</div>
            <div class="metric-label">Analytics Metrics</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">{{ metrics.integrationPoints }}</div>
            <div class="metric-label">Integration Points</div>
          </div>
        </div>

        <div class="ecosystem-architecture">
          <h3>System Architecture</h3>
          <div class="architecture-diagram">
            <div class="architecture-layer user-layer">
              <h4>User Interaction Layer</h4>
              <div class="layer-components">
                <div class="component">Emotion Input</div>
                <div class="component">Adaptive UI</div>
                <div class="component">Support System</div>
              </div>
            </div>

            <div class="architecture-layer processing-layer">
              <h4>Processing Layer</h4>
              <div class="layer-components">
                <div class="component">Emotion Analysis</div>
                <div class="component">Adaptation Engine</div>
                <div class="component">Prediction Models</div>
              </div>
            </div>

            <div class="architecture-layer data-layer">
              <h4>Data Layer</h4>
              <div class="layer-components">
                <div class="component">Emotion Storage</div>
                <div class="component">Analytics DB</div>
                <div class="component">User Profiles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="components-showcase">
        <h3>Ecosystem Components</h3>
        <div class="components-grid">
          <div v-for="component in ecosystemComponents" :key="component.name" class="component-card">
            <div class="component-header">
              <h4>{{ component.name }}</h4>
              <span class="component-status">{{ component.status }}</span>
            </div>
            <p class="component-description">{{ component.description }}</p>
            <div class="component-features">
              <h5>Key Features:</h5>
              <ul>
                <li v-for="feature in component.features" :key="feature">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="benefits-analysis">
        <h3>Business Impact Analysis</h3>
        <div class="benefits-grid">
          <div v-for="benefit in benefits" :key="benefit.category" class="benefit-category">
            <h4>{{ benefit.category }}</h4>
            <div class="improvements-list">
              <div v-for="improvement in benefit.improvements" :key="improvement" class="improvement-item">
                <span class="improvement-icon">📈</span>
                <span class="improvement-text">{{ improvement }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="implementation-roadmap">
        <h3>Implementation Guide</h3>
        <div class="roadmap-steps">
          <div class="roadmap-step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4>Basic Integration</h4>
              <p>Install mood tracker component and configure basic emotion tracking</p>
              <div class="step-timeline">Week 1-2</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4>Analytics Setup</h4>
              <p>Deploy analytics dashboard and configure data collection pipelines</p>
              <div class="step-timeline">Week 3-4</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4>Adaptive Interface</h4>
              <p>Implement adaptive UI components and behavioral response system</p>
              <div class="step-timeline">Week 5-6</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4>Support Integration</h4>
              <p>Connect support systems and configure intervention triggers</p>
              <div class="step-timeline">Week 7-8</div>
            </div>
          </div>

          <div class="roadmap-step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h4>Optimization</h4>
              <p>Fine-tune algorithms and optimize performance based on usage data</p>
              <div class="step-timeline">Week 9-10</div>
            </div>
          </div>
        </div>
      </div>

      <div class="future-enhancements">
        <h3>Future Enhancements</h3>
        <div class="enhancements-grid">
          <div class="enhancement-card">
            <h4>🤖 Advanced AI</h4>
            <p>Machine learning models for predictive emotional analysis and personalized adaptations</p>
          </div>
          <div class="enhancement-card">
            <h4>🌐 Multi-platform</h4>
            <p>Cross-platform emotion tracking across web, mobile, and native applications</p>
          </div>
          <div class="enhancement-card">
            <h4>🔗 API Ecosystem</h4>
            <p>Comprehensive APIs for third-party integrations and custom implementations</p>
          </div>
          <div class="enhancement-card">
            <h4>📊 Advanced Analytics</h4>
            <p>Deep behavioral analytics with cohort analysis and A/B testing capabilities</p>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(S=(g=d.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};const P=["AdaptiveInterfaceDemo","EmotionalStateScenarios","ComprehensiveMoodEcosystem"];export{o as AdaptiveInterfaceDemo,d as ComprehensiveMoodEcosystem,c as EmotionalStateScenarios,P as __namedExportsOrder,k as default};
