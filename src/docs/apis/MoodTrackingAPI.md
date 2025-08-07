# Mood Tracking API Documentation

## Overview

The Mood Tracking API provides comprehensive endpoints for emotional intelligence integration, real-time analytics, adaptive interface management, and support system automation. All endpoints use RESTful conventions with JSON payloads and include real-time capabilities through WebSocket connections.

## Base Configuration

```javascript
const API_BASE_URL = process.env.MOOD_API_BASE || 'https://api.moodtracking.app/v1';
const WS_BASE_URL = process.env.MOOD_WS_BASE || 'wss://ws.moodtracking.app/v1';

// Authentication headers
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.MOOD_API_KEY}`,
  'X-Client-Version': '1.0.0'
};
```

## Core Emotion API

### POST /emotions/track

Track a user's emotional state with contextual information.

**Request:**
```javascript
{
  "userId": "user_12345",
  "sessionId": "session_67890",
  "emotion": "frustrated",
  "step": 3,
  "context": {
    "formSection": "employment_details",
    "fieldId": "annual_income",
    "trigger": "manual",
    "confidence": 0.95
  },
  "metadata": {
    "deviceType": "desktop",
    "browserInfo": "Chrome/120.0.0.0",
    "screenResolution": "1920x1080",
    "timeOnStep": 45000,
    "previousEmotion": "focused"
  }
}
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "entryId": "entry_abc123",
    "timestamp": 1703781234567,
    "adaptations": [
      {
        "type": "interface_simplification",
        "applied": true,
        "reason": "negative_emotion_detected"
      },
      {
        "type": "support_intervention",
        "applied": true,
        "interventionId": "intervention_xyz789"
      }
    ],
    "predictions": {
      "completionLikelihood": 0.73,
      "nextEmotionPrediction": "confused",
      "interventionRecommended": true
    }
  },
  "metadata": {
    "requestId": "req_def456",
    "processingTime": 23,
    "timestamp": 1703781234567
  }
}
```

### GET /emotions/journey/:sessionId

Retrieve complete emotional journey for a session.

**Response:**
```javascript
{
  "success": true,
  "data": {
    "sessionId": "session_67890",
    "userId": "user_12345",
    "startTime": 1703781000000,
    "endTime": null,
    "totalSteps": 5,
    "completedSteps": 3,
    "currentEmotion": "frustrated",
    "dominantEmotion": "focused",
    "emotionalStability": 0.67,
    "stressLevel": "medium",
    "entries": [
      {
        "id": "entry_001",
        "emotion": "optimistic",
        "timestamp": 1703781000000,
        "step": 1,
        "confidence": 0.89
      },
      {
        "id": "entry_002",
        "emotion": "focused",
        "timestamp": 1703781120000,
        "step": 2,
        "confidence": 0.92
      }
    ],
    "interventions": [
      {
        "id": "intervention_001",
        "type": "contextual_help",
        "timestamp": 1703781180000,
        "effectiveness": 0.85
      }
    ]
  }
}
```

## Analytics API

### GET /analytics/heatmap

Generate emotional heatmap data for form optimization.

**Query Parameters:**
```
?timeframe=7d&aggregation=step&formId=loan_application
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "timeframe": {
      "start": 1703174400000,
      "end": 1703781234567
    },
    "totalSessions": 1247,
    "heatmapData": [
      {
        "step": 1,
        "totalInteractions": 1247,
        "averageTime": 89.3,
        "emotions": {
          "optimistic": {
            "count": 561,
            "percentage": 45.0,
            "averageDuration": 67.2
          },
          "neutral": {
            "count": 436,
            "percentage": 35.0,
            "averageDuration": 98.7
          },
          "anxious": {
            "count": 250,
            "percentage": 20.0,
            "averageDuration": 127.8
          }
        },
        "bounceRate": 0.03,
        "errorRate": 0.02
      },
      {
        "step": 3,
        "totalInteractions": 987,
        "averageTime": 234.7,
        "emotions": {
          "confused": {
            "count": 395,
            "percentage": 40.0,
            "averageDuration": 298.4
          },
          "frustrated": {
            "count": 296,
            "percentage": 30.0,
            "averageDuration": 189.2
          },
          "focused": {
            "count": 296,
            "percentage": 30.0,
            "averageDuration": 156.3
          }
        },
        "bounceRate": 0.21,
        "errorRate": 0.15
      }
    ]
  }
}
```

### POST /analytics/predict

Get real-time predictions for user behavior and optimal interventions.

**Request:**
```javascript
{
  "userId": "user_12345",
  "sessionId": "session_67890",
  "currentStep": 3,
  "recentEmotions": ["optimistic", "focused", "confused"],
  "behaviorMetrics": {
    "timeOnStep": 45000,
    "mouseMovements": 156,
    "clickEvents": 23,
    "errorCount": 2,
    "helpRequests": 1
  },
  "predictionTypes": ["completion", "emotion", "intervention"]
}
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "predictions": {
      "completion": {
        "likelihood": 0.73,
        "confidence": 0.94,
        "factors": [
          "consistent_progress",
          "help_seeking_behavior",
          "moderate_emotional_stability"
        ],
        "timeToComplete": 420
      },
      "emotion": {
        "nextEmotion": "frustrated",
        "confidence": 0.67,
        "timeframe": 120,
        "triggers": ["form_complexity", "time_pressure"]
      },
      "intervention": {
        "recommended": [
          {
            "type": "simplify_interface",
            "urgency": "medium",
            "timing": 30,
            "effectiveness": 0.78
          },
          {
            "type": "contextual_help",
            "urgency": "low",
            "timing": 60,
            "effectiveness": 0.65
          }
        ]
      }
    },
    "modelVersions": {
      "completion": "v2.1.3",
      "emotion": "v1.8.7",
      "intervention": "v1.5.2"
    }
  }
}
```

## Adaptive Interface API

### POST /interface/adapt

Request interface adaptations based on emotional state and user context.

**Request:**
```javascript
{
  "userId": "user_12345",
  "sessionId": "session_67890",
  "currentEmotion": "frustrated",
  "stressLevel": "high",
  "deviceType": "mobile",
  "currentComplexity": "standard",
  "adaptationRequest": {
    "automatic": true,
    "preserveProgress": true,
    "userPreferences": {
      "colorScheme": "calming",
      "fontSize": "large",
      "animations": "reduced"
    }
  }
}
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "adaptationId": "adapt_789012",
    "timestamp": 1703781234567,
    "changes": {
      "complexity": "simple",
      "theme": {
        "primaryColor": "#14b8a6",
        "secondaryColor": "#f0fdfa",
        "accentColor": "#0d9488",
        "textColor": "#0f766e"
      },
      "layout": {
        "columns": 1,
        "spacing": "relaxed",
        "fieldSizing": "large"
      },
      "interactions": {
        "animationSpeed": "slow",
        "transitionDuration": "800ms",
        "feedbackIntensity": "gentle"
      },
      "assistance": {
        "level": "proactive",
        "helpVisibility": "prominent",
        "guidanceStyle": "supportive"
      }
    },
    "reasoning": {
      "triggers": ["negative_emotion", "high_stress", "mobile_device"],
      "objectives": ["reduce_cognitive_load", "provide_support", "increase_completion_likelihood"],
      "expectedImpact": {
        "completionImprovement": 0.23,
        "stressReduction": 0.45,
        "satisfactionIncrease": 0.18
      }
    }
  }
}
```

### GET /interface/rules

Retrieve current adaptation rules and their effectiveness.

**Response:**
```javascript
{
  "success": true,
  "data": {
    "rules": [
      {
        "ruleId": "rule_001",
        "name": "Frustration Response",
        "description": "Simplify interface when user shows frustration",
        "conditions": {
          "emotion": ["frustrated", "confused"],
          "errorCount": {"min": 2},
          "timeOnStep": {"min": 30000}
        },
        "actions": {
          "complexity": "simple",
          "theme": "calming",
          "interventions": ["immediate_help"],
          "layout": "single_column"
        },
        "priority": 8,
        "active": true,
        "effectiveness": 0.82,
        "usageCount": 1247,
        "successRate": 0.76
      }
    ],
    "globalSettings": {
      "adaptationEnabled": true,
      "userConsentRequired": true,
      "maxAdaptationsPerSession": 5,
      "cooldownPeriod": 300000
    }
  }
}
```

## Support System API

### POST /support/intervention

Trigger support intervention based on emotional distress.

**Request:**
```javascript
{
  "userId": "user_12345",
  "sessionId": "session_67890",
  "triggerEmotion": "frustrated",
  "context": {
    "step": 3,
    "formSection": "employment_details",
    "userBehavior": {
      "errorCount": 3,
      "timeOnStep": 180000,
      "helpRequests": 2
    }
  },
  "interventionType": "automatic",
  "urgency": "medium"
}
```

**Response:**
```javascript
{
  "success": true,
  "data": {
    "interventionId": "intervention_345678",
    "type": "contextual_help_modal",
    "timestamp": 1703781234567,
    "content": {
      "title": "Need Help with Employment Details?",
      "message": "We understand this section can be complex. Let us help make it easier for you.",
      "actions": [
        {
          "id": "simplify_form",
          "label": "Simplify This Section",
          "type": "primary",
          "action": "interface_adaptation"
        },
        {
          "id": "live_help",
          "label": "Chat with Support",
          "type": "secondary",
          "action": "live_chat"
        },
        {
          "id": "take_break",
          "label": "Take a Break",
          "type": "tertiary",
          "action": "wellness_break"
        }
      ],
      "priority": "medium",
      "displayDuration": 30000,
      "dismissible": true
    },
    "tracking": {
      "impressionId": "imp_456789",
      "analyticsEnabled": true,
      "followUpScheduled": true
    }
  }
}
```

### GET /support/wellness/:userId

Get wellness recommendations based on user's emotional journey.

**Response:**
```javascript
{
  "success": true,
  "data": {
    "userId": "user_12345",
    "currentWellnessScore": 6.7,
    "riskLevel": "medium",
    "recommendations": [
      {
        "type": "break_suggestion",
        "priority": "high",
        "message": "You've been working for 45 minutes. Consider taking a 5-minute break.",
        "action": {
          "type": "guided_break",
          "duration": 300000,
          "activities": ["breathing_exercise", "eye_rest", "light_stretching"]
        }
      },
      {
        "type": "complexity_reduction",
        "priority": "medium",
        "message": "Would you like us to simplify the remaining sections?",
        "action": {
          "type": "interface_adaptation",
          "changes": ["reduce_complexity", "increase_guidance"]
        }
      }
    ],
    "trends": {
      "stressLevel": "increasing",
      "emotionalStability": "decreasing",
      "engagementLevel": "moderate"
    },
    "nextCheckIn": 600000
  }
}
```

## Real-Time WebSocket API

### Connection Setup

```javascript
const ws = new WebSocket(`${WS_BASE_URL}/emotions/live`);

ws.onopen = () => {
  // Authenticate and subscribe
  ws.send(JSON.stringify({
    type: 'auth',
    token: process.env.MOOD_API_KEY,
    userId: 'user_12345',
    sessionId: 'session_67890'
  }));
};
```

### Real-Time Events

#### Emotion Change Event
```javascript
{
  "type": "emotion_changed",
  "timestamp": 1703781234567,
  "data": {
    "userId": "user_12345",
    "sessionId": "session_67890",
    "emotion": "frustrated",
    "previousEmotion": "focused",
    "confidence": 0.87,
    "step": 3,
    "adaptationsTriggered": ["interface_simplification", "support_activation"]
  }
}
```

#### Intervention Triggered Event
```javascript
{
  "type": "intervention_triggered",
  "timestamp": 1703781234567,
  "data": {
    "interventionId": "intervention_345678",
    "userId": "user_12345",
    "type": "wellness_check",
    "reason": "prolonged_negative_emotion",
    "content": {
      "message": "We noticed you might be feeling frustrated. Would you like some help?",
      "actions": ["get_help", "simplify_interface", "take_break"]
    }
  }
}
```

#### Prediction Update Event
```javascript
{
  "type": "prediction_update",
  "timestamp": 1703781234567,
  "data": {
    "userId": "user_12345",
    "sessionId": "session_67890",
    "predictions": {
      "completionLikelihood": 0.68,
      "timeToComplete": 480,
      "nextIntervention": {
        "type": "simplify_interface",
        "timing": 120,
        "probability": 0.73
      }
    }
  }
}
```

## Batch Operations API

### POST /batch/emotions

Submit multiple emotion entries in a single request.

**Request:**
```javascript
{
  "entries": [
    {
      "userId": "user_12345",
      "sessionId": "session_67890",
      "emotion": "optimistic",
      "timestamp": 1703781000000,
      "step": 1
    },
    {
      "userId": "user_12345",
      "sessionId": "session_67890",
      "emotion": "focused",
      "timestamp": 1703781120000,
      "step": 2
    }
  ],
  "options": {
    "skipDuplicates": true,
    "autoAdapt": true,
    "generatePredictions": true
  }
}
```

### POST /batch/analytics/export

Export analytics data for external analysis.

**Request:**
```javascript
{
  "exportConfig": {
    "format": "json",
    "timeframe": {
      "start": 1703174400000,
      "end": 1703781234567
    },
    "includePersonalData": false,
    "aggregationLevel": "daily",
    "metrics": ["emotions", "completion_rates", "intervention_effectiveness"]
  },
  "deliveryMethod": {
    "type": "download",
    "compression": "gzip",
    "encryption": true
  }
}
```

## Error Handling

### Standard Error Response
```javascript
{
  "success": false,
  "error": {
    "code": "EMOTION_VALIDATION_FAILED",
    "message": "Invalid emotion identifier provided",
    "details": {
      "field": "emotion",
      "providedValue": "invalid_emotion",
      "validValues": ["optimistic", "focused", "confused", "frustrated", "excited", "tired", "neutral", "anxious", "confident", "happy", "contemplative", "overwhelmed"]
    }
  },
  "metadata": {
    "requestId": "req_error_123",
    "timestamp": 1703781234567,
    "documentation": "https://docs.moodtracking.app/errors/EMOTION_VALIDATION_FAILED"
  }
}
```

### Common Error Codes
- `INVALID_API_KEY`: Authentication failed
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `EMOTION_VALIDATION_FAILED`: Invalid emotion data
- `SESSION_NOT_FOUND`: Session ID not found
- `PREDICTION_UNAVAILABLE`: Prediction service unavailable
- `ADAPTATION_FAILED`: Interface adaptation failed
- `INTERVENTION_BLOCKED`: User has blocked interventions

## Rate Limiting

```javascript
// Rate limits per API key
const rateLimits = {
  emotions: '1000/hour',
  analytics: '100/hour', 
  predictions: '500/hour',
  adaptations: '200/hour',
  interventions: '50/hour'
};

// Headers included in responses
'X-RateLimit-Limit': '1000'
'X-RateLimit-Remaining': '847'
'X-RateLimit-Reset': '1703781834'
```

## Authentication

### API Key Authentication
```javascript
// Include in request headers
'Authorization': 'Bearer YOUR_API_KEY'
'X-Client-ID': 'your_client_id'
'X-Client-Version': '1.0.0'
```

### JWT Token for WebSocket
```javascript
// Generate token for WebSocket connection
const token = jwt.sign({
  userId: 'user_12345',
  permissions: ['emotions:read', 'emotions:write', 'analytics:read']
}, process.env.JWT_SECRET, { expiresIn: '1h' });
```

This comprehensive API documentation provides complete integration capabilities for the mood tracking ecosystem, supporting real-time emotional intelligence, predictive analytics, and adaptive user experiences.