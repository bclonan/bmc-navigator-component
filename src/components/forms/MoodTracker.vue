<template>
  <div class="mood-tracker" :class="{ 'mood-tracker--compact': compact }">
    <div class="mood-header" v-if="!compact">
      <h3 class="mood-title">How are you feeling about this application?</h3>
      <p class="mood-subtitle">Your feedback helps us improve your experience</p>
    </div>
    
    <div class="mood-progress-container">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${progressPercentage}%` }"
        ></div>
        <div class="progress-labels">
          <span class="progress-start">Start</span>
          <span class="progress-end">Complete</span>
        </div>
      </div>
      
      <div class="mood-indicator">
        <div class="current-mood" :class="`mood-${currentMood.id}`">
          <span class="mood-emoji">{{ currentMood.emoji }}</span>
          <span class="mood-label" v-if="!compact">{{ currentMood.label }}</span>
        </div>
      </div>
    </div>
    
    <div class="mood-selector" v-if="showMoodSelector">
      <div class="mood-question">
        <p>How are you feeling right now?</p>
      </div>
      
      <div class="mood-options">
        <button
          v-for="mood in moodOptions"
          :key="mood.id"
          @click="selectMood(mood)"
          :class="[
            'mood-option',
            { 'mood-option--selected': selectedMood?.id === mood.id }
          ]"
          :aria-label="`Select ${mood.label} mood`"
        >
          <span class="mood-option-emoji">{{ mood.emoji }}</span>
          <span class="mood-option-label">{{ mood.label }}</span>
        </button>
      </div>
    </div>
    
    <div class="mood-insights" v-if="showInsights && moodHistory.length > 0">
      <div class="insights-header">
        <h4>Your Journey</h4>
        <button 
          @click="toggleInsights" 
          class="insights-toggle"
          :aria-label="showDetailedInsights ? 'Hide details' : 'Show details'"
        >
          {{ showDetailedInsights ? '−' : '+' }}
        </button>
      </div>
      
      <div class="mood-timeline" v-if="showDetailedInsights">
        <div 
          v-for="(entry, index) in moodHistory" 
          :key="index"
          class="timeline-entry"
          :class="`timeline-${entry.mood.id}`"
        >
          <div class="timeline-dot">
            <span class="timeline-emoji">{{ entry.mood.emoji }}</span>
          </div>
          <div class="timeline-content">
            <div class="timeline-step">Step {{ entry.step }}</div>
            <div class="timeline-time">{{ formatTime(entry.timestamp) }}</div>
          </div>
        </div>
      </div>
      
      <div class="mood-summary" v-else>
        <div class="summary-moods">
          <span 
            v-for="entry in recentMoods" 
            :key="entry.timestamp"
            class="summary-emoji"
            :title="`${entry.mood.label} at step ${entry.step}`"
          >
            {{ entry.mood.emoji }}
          </span>
        </div>
        <div class="summary-text">
          {{ getMoodSummary() }}
        </div>
      </div>
    </div>
    
    <div class="mood-feedback" v-if="showFeedback">
      <div class="feedback-message" :class="`feedback-${currentMood.sentiment}`">
        <span class="feedback-emoji">{{ getFeedbackEmoji() }}</span>
        <span class="feedback-text">{{ getFeedbackMessage() }}</span>
      </div>
      
      <div class="encouragement" v-if="needsEncouragement">
        <p>{{ getEncouragementMessage() }}</p>
        <div class="encouragement-actions">
          <button @click="requestHelp" class="help-button">
            Need Help? 💬
          </button>
          <button @click="takeBreak" class="break-button">
            Take a Break 🌟
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

export default {
  name: 'MoodTracker',
  props: {
    currentStep: {
      type: Number,
      default: 1
    },
    totalSteps: {
      type: Number,
      default: 5
    },
    compact: {
      type: Boolean,
      default: false
    },
    showInsights: {
      type: Boolean,
      default: true
    },
    showFeedback: {
      type: Boolean,
      default: true
    },
    autoTrack: {
      type: Boolean,
      default: true
    }
  },
  emits: ['mood-changed', 'help-requested', 'break-requested', 'completed'],
  setup(props, { emit }) {
    const moodOptions = ref([
      { id: 'excited', emoji: '🤩', label: 'Excited', energy: 5, sentiment: 'positive' },
      { id: 'confident', emoji: '😎', label: 'Confident', energy: 4, sentiment: 'positive' },
      { id: 'happy', emoji: '😊', label: 'Happy', energy: 4, sentiment: 'positive' },
      { id: 'optimistic', emoji: '🙂', label: 'Optimistic', energy: 3, sentiment: 'positive' },
      { id: 'neutral', emoji: '😐', label: 'Neutral', energy: 2, sentiment: 'neutral' },
      { id: 'focused', emoji: '🤔', label: 'Focused', energy: 3, sentiment: 'neutral' },
      { id: 'determined', emoji: '💪', label: 'Determined', energy: 4, sentiment: 'positive' },
      { id: 'tired', emoji: '😴', label: 'Tired', energy: 1, sentiment: 'negative' },
      { id: 'confused', emoji: '😕', label: 'Confused', energy: 2, sentiment: 'negative' },
      { id: 'frustrated', emoji: '😤', label: 'Frustrated', energy: 2, sentiment: 'negative' },
      { id: 'anxious', emoji: '😰', label: 'Anxious', energy: 1, sentiment: 'negative' },
      { id: 'overwhelmed', emoji: '😵', label: 'Overwhelmed', energy: 1, sentiment: 'negative' }
    ]);

    const selectedMood = ref(null);
    const moodHistory = ref([]);
    const showMoodSelector = ref(false);
    const showDetailedInsights = ref(false);
    const lastMoodCheck = ref(Date.now());

    // Computed properties
    const progressPercentage = computed(() => {
      return Math.min(100, (props.currentStep / props.totalSteps) * 100);
    });

    const currentMood = computed(() => {
      if (selectedMood.value) {
        return selectedMood.value;
      }
      
      // Auto-determine mood based on progress and time spent
      const timeSpent = Date.now() - lastMoodCheck.value;
      const progress = progressPercentage.value;
      
      if (progress < 20) {
        return moodOptions.value.find(m => m.id === 'optimistic');
      } else if (progress < 40) {
        return timeSpent > 300000 ? // 5 minutes
          moodOptions.value.find(m => m.id === 'focused') :
          moodOptions.value.find(m => m.id === 'confident');
      } else if (progress < 60) {
        return timeSpent > 600000 ? // 10 minutes
          moodOptions.value.find(m => m.id === 'tired') :
          moodOptions.value.find(m => m.id === 'determined');
      } else if (progress < 80) {
        return moodOptions.value.find(m => m.id === 'focused');
      } else {
        return moodOptions.value.find(m => m.id === 'excited');
      }
    });

    const recentMoods = computed(() => {
      return moodHistory.value.slice(-5);
    });

    const needsEncouragement = computed(() => {
      if (!selectedMood.value) return false;
      
      const negativeMoods = ['frustrated', 'anxious', 'overwhelmed', 'confused'];
      const recentNegative = recentMoods.value.filter(
        entry => negativeMoods.includes(entry.mood.id)
      );
      
      return negativeMoods.includes(selectedMood.value.id) || recentNegative.length >= 2;
    });

    // Methods
    const selectMood = (mood) => {
      selectedMood.value = mood;
      recordMoodEntry(mood);
      showMoodSelector.value = false;
      emit('mood-changed', {
        mood,
        step: props.currentStep,
        timestamp: Date.now(),
        needsHelp: needsEncouragement.value
      });
    };

    const recordMoodEntry = (mood) => {
      const entry = {
        mood,
        step: props.currentStep,
        timestamp: Date.now(),
        progressPercentage: progressPercentage.value
      };
      
      moodHistory.value.push(entry);
      
      // Keep only last 10 entries
      if (moodHistory.value.length > 10) {
        moodHistory.value = moodHistory.value.slice(-10);
      }
      
      // Store in localStorage
      localStorage.setItem('moodTrackerHistory', JSON.stringify(moodHistory.value));
    };

    const getMoodSummary = () => {
      if (moodHistory.value.length === 0) return "Let's track your journey!";
      
      const positiveCount = moodHistory.value.filter(
        entry => entry.mood.sentiment === 'positive'
      ).length;
      
      const totalCount = moodHistory.value.length;
      const positiveRatio = positiveCount / totalCount;
      
      if (positiveRatio > 0.7) {
        return "You're doing great! Keep up the positive energy!";
      } else if (positiveRatio > 0.4) {
        return "Mixed feelings - that's completely normal for forms!";
      } else {
        return "This seems challenging. Remember, we're here to help!";
      }
    };

    const getFeedbackEmoji = () => {
      const mood = currentMood.value;
      const feedbackEmojis = {
        positive: ['✨', '🎉', '👏', '🌟', '💫'],
        neutral: ['👍', '📝', '⭐', '🎯', '💭'],
        negative: ['🤗', '💙', '🫶', '🌈', '☀️']
      };
      
      const emojis = feedbackEmojis[mood.sentiment] || feedbackEmojis.neutral;
      return emojis[Math.floor(Math.random() * emojis.length)];
    };

    const getFeedbackMessage = () => {
      const mood = currentMood.value;
      const messages = {
        excited: "Your enthusiasm is contagious! This energy will help you complete the application smoothly.",
        confident: "Great confidence! You're well-prepared for this application process.",
        happy: "Your positive attitude makes everything easier. You're doing wonderfully!",
        optimistic: "Love the optimism! This mindset will carry you through successfully.",
        neutral: "Staying calm and focused is a great approach. You're making steady progress.",
        focused: "Excellent focus! This concentration will help you provide accurate information.",
        determined: "Your determination is inspiring! Nothing can stop you now.",
        tired: "It's okay to feel tired. Take your time and consider a short break if needed.",
        confused: "Questions are normal! Don't hesitate to reach out if you need clarification.",
        frustrated: "We understand this can be challenging. You're not alone in this process.",
        anxious: "It's natural to feel nervous about important applications. Take deep breaths.",
        overwhelmed: "This feels like a lot right now, but you're capable of handling this step by step."
      };
      
      return messages[mood.id] || "Every feeling is valid during this process.";
    };

    const getEncouragementMessage = () => {
      const encouragements = [
        "Remember, thousands of people complete this process successfully every day.",
        "You've already made great progress by starting this application.",
        "Each step forward is an achievement worth celebrating.",
        "Financial applications can feel overwhelming, but you're handling it well.",
        "Take your time - there's no rush to complete everything at once."
      ];
      
      return encouragements[Math.floor(Math.random() * encouragements.length)];
    };

    const requestHelp = () => {
      emit('help-requested', {
        currentStep: props.currentStep,
        mood: currentMood.value,
        timestamp: Date.now()
      });
    };

    const takeBreak = () => {
      emit('break-requested', {
        currentStep: props.currentStep,
        mood: currentMood.value,
        timestamp: Date.now()
      });
    };

    const toggleInsights = () => {
      showDetailedInsights.value = !showDetailedInsights.value;
    };

    const formatTime = (timestamp) => {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const checkMoodTrigger = () => {
      if (!props.autoTrack) return;
      
      const timeSpent = Date.now() - lastMoodCheck.value;
      const shouldShowSelector = 
        timeSpent > 180000 || // 3 minutes
        (props.currentStep > 1 && !selectedMood.value) ||
        Math.random() < 0.3; // 30% random chance
      
      if (shouldShowSelector && !showMoodSelector.value) {
        showMoodSelector.value = true;
        lastMoodCheck.value = Date.now();
      }
    };

    const loadSavedHistory = () => {
      try {
        const saved = localStorage.getItem('moodTrackerHistory');
        if (saved) {
          moodHistory.value = JSON.parse(saved);
        }
      } catch (error) {
        console.warn('Could not load mood history:', error);
      }
    };

    // Watchers
    watch(() => props.currentStep, (newStep, oldStep) => {
      if (newStep > oldStep) {
        // Step advanced - trigger mood check
        setTimeout(checkMoodTrigger, 2000);
      }
      
      if (newStep === props.totalSteps) {
        emit('completed', {
          moodHistory: moodHistory.value,
          finalMood: currentMood.value,
          timestamp: Date.now()
        });
      }
    });

    // Lifecycle
    onMounted(() => {
      loadSavedHistory();
      
      // Initial mood check after 30 seconds
      setTimeout(() => {
        if (props.autoTrack) {
          showMoodSelector.value = true;
        }
      }, 30000);
      
      // Periodic mood checks
      const moodInterval = setInterval(checkMoodTrigger, 120000); // Every 2 minutes
      
      onUnmounted(() => {
        clearInterval(moodInterval);
      });
    });

    return {
      moodOptions,
      selectedMood,
      moodHistory,
      showMoodSelector,
      showDetailedInsights,
      progressPercentage,
      currentMood,
      recentMoods,
      needsEncouragement,
      selectMood,
      getMoodSummary,
      getFeedbackEmoji,
      getFeedbackMessage,
      getEncouragementMessage,
      requestHelp,
      takeBreak,
      toggleInsights,
      formatTime
    };
  }
};
</script>

<style scoped>
.mood-tracker {
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  margin: 20px 0;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  transition: all 0.3s ease;
}

.mood-tracker--compact {
  padding: 16px;
  margin: 12px 0;
}

.mood-header {
  text-align: center;
  margin-bottom: 24px;
}

.mood-title {
  color: #3860be;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.mood-subtitle {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0;
}

.mood-progress-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.progress-bar {
  flex: 1;
  position: relative;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3860be 0%, #059669 100%);
  border-radius: 4px;
  transition: width 0.6s ease;
}

.progress-labels {
  position: absolute;
  top: -20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #64748b;
}

.mood-indicator {
  flex-shrink: 0;
}

.current-mood {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.mood-excited { border-color: #f59e0b; background: #fef3c7; }
.mood-confident { border-color: #3b82f6; background: #dbeafe; }
.mood-happy { border-color: #10b981; background: #d1fae5; }
.mood-optimistic { border-color: #8b5cf6; background: #ede9fe; }
.mood-neutral { border-color: #6b7280; background: #f3f4f6; }
.mood-focused { border-color: #f97316; background: #fed7aa; }
.mood-determined { border-color: #dc2626; background: #fee2e2; }
.mood-tired { border-color: #64748b; background: #f1f5f9; }
.mood-confused { border-color: #fbbf24; background: #fef3c7; }
.mood-frustrated { border-color: #ef4444; background: #fecaca; }
.mood-anxious { border-color: #a855f7; background: #f3e8ff; }
.mood-overwhelmed { border-color: #e11d48; background: #ffe4e6; }

.mood-emoji {
  font-size: 1.5rem;
  line-height: 1;
}

.mood-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
}

.mood-selector {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
}

.mood-question p {
  text-align: center;
  color: #374151;
  font-weight: 500;
  margin: 0 0 16px 0;
}

.mood-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 12px;
}

.mood-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.8rem;
}

.mood-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #3860be;
}

.mood-option--selected {
  background: #3860be;
  color: white;
  border-color: #3860be;
}

.mood-option-emoji {
  font-size: 1.8rem;
  line-height: 1;
}

.mood-option-label {
  font-weight: 500;
  text-align: center;
}

.mood-insights {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  margin-top: 16px;
}

.insights-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.insights-header h4 {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}

.insights-toggle {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  color: #475569;
}

.mood-timeline {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.timeline-entry {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 6px;
}

.timeline-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-emoji {
  font-size: 1.2rem;
}

.timeline-content {
  flex: 1;
}

.timeline-step {
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.timeline-time {
  color: #64748b;
  font-size: 0.8rem;
}

.mood-summary {
  display: flex;
  align-items: center;
  gap: 12px;
}

.summary-moods {
  display: flex;
  gap: 4px;
}

.summary-emoji {
  font-size: 1.2rem;
  opacity: 0.8;
}

.summary-text {
  color: #64748b;
  font-size: 0.9rem;
  flex: 1;
}

.mood-feedback {
  margin-top: 16px;
}

.feedback-message {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background: #f8fafc;
  border-left: 4px solid #3860be;
}

.feedback-positive { 
  background: #f0fdf4; 
  border-left-color: #10b981; 
}

.feedback-negative { 
  background: #fef2f2; 
  border-left-color: #ef4444; 
}

.feedback-neutral { 
  background: #f8fafc; 
  border-left-color: #6b7280; 
}

.feedback-emoji {
  font-size: 1.2rem;
  line-height: 1;
}

.feedback-text {
  color: #374151;
  font-size: 0.9rem;
  line-height: 1.5;
}

.encouragement {
  margin-top: 12px;
  padding: 16px;
  background: #fef7cd;
  border: 1px solid #fbbf24;
  border-radius: 8px;
}

.encouragement p {
  color: #92400e;
  font-size: 0.9rem;
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.encouragement-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.help-button,
.break-button {
  background: white;
  border: 1px solid #d97706;
  color: #d97706;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.help-button:hover,
.break-button:hover {
  background: #d97706;
  color: white;
}

@media (max-width: 768px) {
  .mood-tracker {
    padding: 16px;
    margin: 12px 0;
  }
  
  .mood-options {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 8px;
  }
  
  .mood-option {
    padding: 8px 6px;
  }
  
  .mood-option-emoji {
    font-size: 1.5rem;
  }
  
  .encouragement-actions {
    flex-direction: column;
  }
  
  .help-button,
  .break-button {
    width: 100%;
  }
}
</style>