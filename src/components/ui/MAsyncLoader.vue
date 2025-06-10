<template>
  <component
    :is="loadingComponent"
    v-bind="loadingProps"
    v-if="isLoading"
  />
  
  <div
    v-else-if="hasError"
    class="loading-error"
    :class="errorClasses"
  >
    <div class="error-content">
      <div class="error-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      
      <div class="error-text">
        <h3 class="error-title">{{ errorTitle }}</h3>
        <p class="error-message">{{ errorMessage || error }}</p>
      </div>
      
      <div v-if="showRetry" class="error-actions">
        <button
          class="retry-button"
          @click="handleRetry"
          :disabled="isRetrying"
        >
          <svg 
            v-if="isRetrying" 
            class="retry-spinner" 
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="40" stroke-dashoffset="40">
              <animateTransform attributeName="transform" type="rotate" dur="1s" values="0 12 12;360 12 12" repeatCount="indefinite"/>
            </circle>
          </svg>
          
          <svg v-else class="retry-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="23,4 23,10 17,10"></polyline>
            <path d="M20.49,15a9,9,0,1,1-2.12-9.36L23,10"></path>
          </svg>
          
          {{ isRetrying ? retryingText : retryText }}
        </button>
      </div>
    </div>
  </div>
  
  <div
    v-else
    class="loading-content"
    :class="contentClasses"
  >
    <slot v-bind="{ data, refresh: handleRetry, isLoading, error }" />
  </div>
</template>

<script>
import MSkeleton from './MSkeleton.vue';
import MSkeletonGroup from './MSkeletonGroup.vue';

export default {
  name: 'MAsyncLoader',
  components: {
    MSkeleton,
    MSkeletonGroup
  },
  
  props: {
    /**
     * Loading state
     */
    loading: {
      type: Boolean,
      default: false
    },
    
    /**
     * Error state
     */
    error: {
      type: [String, Error, Boolean],
      default: null
    },
    
    /**
     * Data to pass to slot
     */
    data: {
      type: [Object, Array],
      default: null
    },
    
    /**
     * Loading component to use
     */
    loadingComponent: {
      type: [String, Object],
      default: 'MSkeletonGroup'
    },
    
    /**
     * Props to pass to loading component
     */
    loadingProps: {
      type: Object,
      default: () => ({
        variant: 'card',
        animated: true,
        lines: 3
      })
    },
    
    /**
     * Show retry button on error
     */
    showRetry: {
      type: Boolean,
      default: true
    },
    
    /**
     * Retry button text
     */
    retryText: {
      type: String,
      default: 'Try Again'
    },
    
    /**
     * Retrying state text
     */
    retryingText: {
      type: String,
      default: 'Retrying...'
    },
    
    /**
     * Error title
     */
    errorTitle: {
      type: String,
      default: 'Something went wrong'
    },
    
    /**
     * Custom error message
     */
    errorMessage: {
      type: String,
      default: null
    },
    
    /**
     * Minimum loading time (ms)
     */
    minLoadingTime: {
      type: Number,
      default: 0
    },
    
    /**
     * Auto retry count
     */
    autoRetryCount: {
      type: Number,
      default: 0
    },
    
    /**
     * Auto retry delay (ms)
     */
    autoRetryDelay: {
      type: Number,
      default: 1000
    },
    
    /**
     * Theme variant
     */
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'minimal', 'card'].includes(value)
    }
  },
  
  emits: ['retry', 'error', 'loaded'],
  
  data() {
    return {
      isRetrying: false,
      retryCount: 0,
      autoRetryTimer: null,
      loadingStartTime: null
    };
  },
  
  computed: {
    isLoading() {
      return this.loading || (this.loadingStartTime && this.minLoadingTime > 0);
    },
    
    hasError() {
      return Boolean(this.error);
    },
    
    errorClasses() {
      return [
        'loading-error-base',
        `error-${this.variant}`
      ];
    },
    
    contentClasses() {
      return [
        'loading-content-base',
        `content-${this.variant}`
      ];
    }
  },
  
  watch: {
    loading: {
      handler(newLoading, oldLoading) {
        if (newLoading && !oldLoading) {
          this.loadingStartTime = Date.now();
        } else if (!newLoading && oldLoading) {
          this.handleLoadingComplete();
        }
      },
      immediate: true
    },
    
    error: {
      handler(newError) {
        if (newError && this.autoRetryCount > 0 && this.retryCount < this.autoRetryCount) {
          this.scheduleAutoRetry();
        }
        
        if (newError) {
          this.$emit('error', newError);
        }
      },
      immediate: true
    },
    
    data: {
      handler(newData) {
        if (newData) {
          this.$emit('loaded', newData);
        }
      },
      immediate: true
    }
  },
  
  beforeUnmount() {
    this.clearAutoRetryTimer();
  },
  
  methods: {
    handleRetry() {
      this.isRetrying = true;
      this.retryCount++;
      this.clearAutoRetryTimer();
      
      this.$emit('retry');
      
      // Reset retrying state after a delay
      setTimeout(() => {
        this.isRetrying = false;
      }, 500);
    },
    
    handleLoadingComplete() {
      if (this.minLoadingTime > 0 && this.loadingStartTime) {
        const elapsedTime = Date.now() - this.loadingStartTime;
        const remainingTime = this.minLoadingTime - elapsedTime;
        
        if (remainingTime > 0) {
          setTimeout(() => {
            this.loadingStartTime = null;
          }, remainingTime);
        } else {
          this.loadingStartTime = null;
        }
      }
    },
    
    scheduleAutoRetry() {
      this.clearAutoRetryTimer();
      
      this.autoRetryTimer = setTimeout(() => {
        this.handleRetry();
      }, this.autoRetryDelay);
    },
    
    clearAutoRetryTimer() {
      if (this.autoRetryTimer) {
        clearTimeout(this.autoRetryTimer);
        this.autoRetryTimer = null;
      }
    }
  }
};
</script>

<style scoped>
.loading-error-base {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--vspace-32);
  min-height: 200px;
}

.error-default {
  background: var(--color-doctor);
  border: 1px solid var(--color-grey-area);
  border-radius: var(--border-radius-3);
}

.error-minimal {
  background: transparent;
}

.error-card {
  background: var(--color-white);
  box-shadow: var(--shadow-3);
  border: 1px solid var(--color-grey-area);
  border-radius: var(--border-radius-10);
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  width: var(--vspace-32);
  height: var(--vspace-32);
  margin: 0 auto var(--vspace-16) auto;
  color: var(--error-color);
}

.error-icon svg {
  width: 100%;
  height: 100%;
}

.error-text {
  margin-bottom: var(--vspace-24);
}

.error-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--vspace-8);
}

.error-message {
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-8);
}

.retry-button {
  display: inline-flex;
  align-items: center;
  gap: var(--hspace-8);
  padding: var(--vspace-8) var(--vspace-16);
  background: var(--primary-color);
  color: var(--color-white);
  border-radius: var(--border-radius-3);
  border: none;
  cursor: pointer;
  transition: var(--transition-16);
}

.retry-button:hover {
  background: var(--primary-dark);
}

.retry-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.retry-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.retry-icon,
.retry-spinner {
  width: var(--vspace-16);
  height: var(--vspace-16);
}

.retry-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.loading-content-base {
  width: 100%;
}

.content-default {
  display: block;
}

.content-minimal {
  display: block;
}

.content-card {
  background: var(--color-white);
  box-shadow: var(--shadow-2);
  border: 1px solid var(--color-grey-area);
  border-radius: var(--border-radius-3);
  padding: var(--vspace-24);
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .error-default {
    background: var(--color-black-8);
    border-color: var(--color-vulcan);
  }
  
  .error-card {
    background: var(--color-black-4);
    border-color: var(--color-vulcan);
  }
  
  .error-title {
    color: var(--color-white);
  }
  
  .error-message {
    color: var(--color-weathered-stone);
  }
  
  .content-card {
    background: var(--color-black-4);
    border-color: var(--color-vulcan);
  }
}

/* Animation for state transitions */
.loading-error-base,
.loading-content-base {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .loading-error-base {
    padding: var(--vspace-16);
    min-height: 150px;
  }
  
  .error-content {
    max-width: none;
  }
  
  .error-icon {
    width: var(--vspace-25);
    height: var(--vspace-25);
    margin-bottom: var(--vspace-12);
  }
  
  .error-title {
    font-size: 1rem;
  }
  
  .retry-button {
    padding: var(--vspace-6) var(--vspace-12);
    font-size: 0.875rem;
  }
}
</style>
