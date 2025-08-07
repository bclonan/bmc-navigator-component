# Mood Tracking Data Models

## Overview

This document defines the comprehensive data models used throughout the mood tracking ecosystem, including emotional states, user behavior patterns, analytics data, and integration schemas.

## Core Emotional Data Models

### EmotionalState

```typescript
interface EmotionalState {
  id: string;
  label: string;
  emoji: string;
  category: 'positive' | 'neutral' | 'negative';
  intensity: number; // 1-10 scale
  color: string;
  description: string;
  triggers: string[];
  interventions: string[];
}
```

**Example:**
```json
{
  "id": "frustrated",
  "label": "Frustrated",
  "emoji": "😤",
  "category": "negative",
  "intensity": 7,
  "color": "#ef4444",
  "description": "Feeling annoyed or impatient with the current situation",
  "triggers": ["form_complexity", "validation_errors", "time_pressure"],
  "interventions": ["simplify_interface", "provide_help", "offer_break"]
}
```

### MoodEntry

```typescript
interface MoodEntry {
  id: string;
  userId: string;
  sessionId: string;
  emotion: string; // References EmotionalState.id
  timestamp: number;
  step: number;
  context: {
    formSection: string;
    fieldId?: string;
    trigger: 'manual' | 'automatic' | 'predicted';
    confidence?: number; // For automatic/predicted entries
  };
  metadata: {
    deviceType: 'mobile' | 'tablet' | 'desktop';
    browserInfo: string;
    screenResolution: string;
    timeOnStep: number;
    previousEmotion?: string;
  };
}
```

### EmotionalJourney

```typescript
interface EmotionalJourney {
  userId: string;
  sessionId: string;
  startTime: number;
  endTime?: number;
  totalSteps: number;
  completedSteps: number;
  entries: MoodEntry[];
  patterns: {
    dominantEmotion: string;
    emotionalStability: number; // 0-1 scale
    stressLevel: 'low' | 'medium' | 'high';
    interventionsTriggered: string[];
    recoveryTime: number; // Time to recover from negative emotions
  };
  outcomes: {
    completed: boolean;
    abandonmentReason?: string;
    satisfactionScore?: number;
    supportInteractions: number;
  };
}
```

## Behavioral Data Models

### UserBehavior

```typescript
interface UserBehavior {
  sessionId: string;
  userId: string;
  timestamp: number;
  step: number;
  actions: BehaviorAction[];
  patterns: {
    mouseMovements: number;
    clickEvents: number;
    keystrokes: number;
    scrollEvents: number;
    tabSwitches: number;
    timeIdle: number;
    errorCount: number;
    helpRequests: number;
  };
  stressIndicators: {
    rapidClicking: boolean;
    erraticMouseMovement: boolean;
    highErrorRate: boolean;
    longHesitation: boolean;
    tabSwitching: boolean;
  };
}
```

### BehaviorAction

```typescript
interface BehaviorAction {
  type: 'click' | 'scroll' | 'input' | 'focus' | 'blur' | 'error' | 'help';
  timestamp: number;
  element: string;
  value?: string;
  coordinates?: { x: number; y: number };
  duration?: number;
}
```

## Analytics Data Models

### PredictionModel

```typescript
interface PredictionModel {
  modelId: string;
  type: 'completion' | 'abandonment' | 'emotion' | 'intervention';
  version: string;
  accuracy: number;
  trainingData: {
    sampleSize: number;
    dateRange: { start: number; end: number };
    features: string[];
  };
  parameters: Record<string, any>;
  predictions: {
    userId: string;
    sessionId: string;
    step: number;
    prediction: any;
    confidence: number;
    timestamp: number;
  }[];
}
```

### AnalyticsMetrics

```typescript
interface AnalyticsMetrics {
  timeframe: { start: number; end: number };
  aggregation: 'hourly' | 'daily' | 'weekly' | 'monthly';
  metrics: {
    totalSessions: number;
    completionRate: number;
    averageCompletionTime: number;
    abandonmentRate: number;
    emotionalDistribution: Record<string, number>;
    interventionEffectiveness: Record<string, number>;
    userSatisfaction: number;
    supportRequestRate: number;
  };
  cohorts: {
    cohortId: string;
    size: number;
    characteristics: string[];
    performance: AnalyticsMetrics['metrics'];
  }[];
}
```

## Integration Data Models

### FormIntegration

```typescript
interface FormIntegration {
  formId: string;
  name: string;
  version: string;
  configuration: {
    moodTracking: {
      enabled: boolean;
      frequency: 'per_step' | 'per_field' | 'on_demand';
      emotions: string[]; // Available emotions for this form
      autoDetection: boolean;
    };
    adaptiveInterface: {
      enabled: boolean;
      complexityLevels: string[];
      themes: string[];
      adaptationRules: string[];
    };
    analytics: {
      enabled: boolean;
      retention: number; // Days to retain data
      export: boolean;
      realTime: boolean;
    };
  };
  fields: FormField[];
  steps: FormStep[];
}
```

### ValidationRule

```typescript
interface ValidationRule {
  type: 'required' | 'pattern' | 'length' | 'custom';
  value?: any;
  message: Record<string, string>; // Complexity-level specific messages
  errorHandling: {
    simple: string; // Simple error message
    detailed: string; // Detailed explanation
    supportive: string; // Emotionally supportive message
  };
}
```

## Data Privacy and Security

### Privacy Compliance
- All personal data encrypted at rest using AES-256
- Emotion data retention: 90 days for analytics, 30 days for personal
- User consent required for behavioral tracking
- Right to deletion honored within 48 hours
- GDPR and CCPA compliant data handling

### Security Measures
- All API endpoints secured with JWT authentication
- Rate limiting: 1000 requests per hour per user
- Data anonymization for analytics aggregation
- Audit logging for all data access and modifications
- Regular security audits and penetration testing