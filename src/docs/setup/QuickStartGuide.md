# Quick Start Guide - Mood Tracking Ecosystem

## Installation

### 1. Install Dependencies

```bash
npm install @mariner-finance/mood-tracker
# or
yarn add @mariner-finance/mood-tracker
```

### 2. Basic Vue.js Integration

```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import MoodTrackingPlugin from '@mariner-finance/mood-tracker'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(MoodTrackingPlugin, {
  apiKey: process.env.VITE_MOOD_API_KEY,
  emotions: ['confident', 'focused', 'confused', 'frustrated', 'excited'],
  adaptiveInterface: true,
  analytics: true
})

app.mount('#app')
```

### 3. Component Integration

```vue
<template>
  <div class="loan-application">
    <MoodTracker
      v-model:current-emotion="currentEmotion"
      :step="currentStep"
      :total-steps="5"
      @emotion-changed="handleEmotionChange"
      @assistance-requested="handleAssistanceRequest"
    />
    
    <EmotionDrivenInterface
      :current-step="currentStep"
      :total-steps="5"
      :current-emotion="currentEmotion"
      @step-changed="currentStep = $event"
    >
      <template #form-content>
        <!-- Your form fields here -->
        <LoanApplicationForm />
      </template>
    </EmotionDrivenInterface>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MoodTracker, EmotionDrivenInterface } from '@mariner-finance/mood-tracker'
import LoanApplicationForm from './components/LoanApplicationForm.vue'

const currentEmotion = ref('neutral')
const currentStep = ref(1)

const handleEmotionChange = (emotion) => {
  console.log('Emotion changed to:', emotion)
}

const handleAssistanceRequest = (request) => {
  console.log('Assistance requested:', request)
}
</script>
```

## Configuration Options

### Environment Variables

```bash
# .env
VITE_MOOD_API_KEY=your_api_key_here
VITE_MOOD_API_BASE=https://api.moodtracking.app/v1
VITE_MOOD_WS_BASE=wss://ws.moodtracking.app/v1
VITE_MOOD_ANALYTICS_ENABLED=true
VITE_MOOD_DEBUG=false
```

### Plugin Configuration

```javascript
// Advanced configuration
app.use(MoodTrackingPlugin, {
  // Core settings
  apiKey: process.env.VITE_MOOD_API_KEY,
  baseURL: process.env.VITE_MOOD_API_BASE,
  
  // Available emotions
  emotions: [
    'optimistic', 'confident', 'happy', 'excited', 'focused', 'contemplative',
    'neutral', 'tired', 'confused', 'frustrated', 'anxious', 'overwhelmed'
  ],
  
  // Feature toggles
  features: {
    adaptiveInterface: true,
    predictiveAnalytics: true,
    interventionSystem: true,
    wellnessMonitoring: true,
    realTimeUpdates: true
  },
  
  // Analytics configuration
  analytics: {
    enabled: true,
    retention: 90, // days
    sampling: 1.0, // 100% sampling for development
    realTime: true
  },
  
  // Adaptation settings
  adaptation: {
    autoAdapt: true,
    complexityLevels: ['simple', 'standard', 'detailed'],
    themes: ['professional', 'calming', 'energetic'],
    interventionThreshold: 0.7
  },
  
  // Privacy settings
  privacy: {
    anonymizeData: false, // Set to true for production
    consentRequired: true,
    dataRetention: 90, // days
    allowExport: true
  }
})
```

## Core Components

### MoodTracker

Basic emotion tracking component with real-time updates.

```vue
<MoodTracker
  v-model:current-emotion="emotion"
  :emotions="['confident', 'focused', 'confused', 'frustrated']"
  :step="currentStep"
  :auto-detection="true"
  :show-confidence="true"
  @emotion-changed="onEmotionChange"
  @journey-updated="onJourneyUpdate"
/>
```

### EmotionDrivenInterface

Adaptive interface that responds to emotional states.

```vue
<EmotionDrivenInterface
  :current-emotion="currentEmotion"
  :stress-level="stressLevel"
  :adaptive-mode="true"
  :complexity="interfaceComplexity"
  @interface-adapted="onInterfaceAdapted"
  @wellness-action="onWellnessAction"
>
  <template #form-content="{ adaptations }">
    <!-- Form content with adaptation context -->
    <div :class="adaptations.formClasses">
      <!-- Your form fields -->
    </div>
  </template>
</EmotionDrivenInterface>
```

## API Integration Examples

### REST API Setup

```javascript
// services/moodAPI.js
import { MoodTrackingAPI } from '@mariner-finance/mood-tracker'

const moodAPI = new MoodTrackingAPI({
  baseURL: process.env.VITE_MOOD_API_BASE,
  apiKey: process.env.VITE_MOOD_API_KEY,
  timeout: 5000
})

export const trackEmotion = async (emotionData) => {
  try {
    const response = await moodAPI.emotions.track(emotionData)
    return response.data
  } catch (error) {
    console.error('Failed to track emotion:', error)
    throw error
  }
}

export const getAnalytics = async (params) => {
  try {
    const response = await moodAPI.analytics.getHeatmap(params)
    return response.data
  } catch (error) {
    console.error('Failed to get analytics:', error)
    throw error
  }
}
```

## Testing

### Unit Testing with Vitest

```javascript
// tests/MoodTracker.test.js
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { MoodTracker } from '@mariner-finance/mood-tracker'

describe('MoodTracker', () => {
  it('tracks emotion changes correctly', async () => {
    const wrapper = mount(MoodTracker, {
      props: {
        currentEmotion: 'neutral',
        step: 1
      }
    })
    
    const emotionButton = wrapper.find('[data-emotion="confident"]')
    await emotionButton.trigger('click')
    
    expect(wrapper.emitted('emotion-changed')).toHaveLength(1)
    expect(wrapper.emitted('emotion-changed')[0][0]).toMatchObject({
      emotion: 'confident',
      step: 1
    })
  })
})
```

## Troubleshooting

### Common Issues

1. **API Key Issues**
   ```javascript
   // Check if API key is properly set
   if (!process.env.VITE_MOOD_API_KEY) {
     console.error('VITE_MOOD_API_KEY environment variable is required')
   }
   ```

2. **Emotion Not Updating**
   ```javascript
   // Ensure proper v-model usage
   <MoodTracker v-model:current-emotion="emotion" />
   // Not: v-model="emotion"
   ```

For detailed documentation, visit the [complete documentation](../README.md).