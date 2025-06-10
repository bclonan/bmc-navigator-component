<template>
  <div 
    :class="[
      'feature-card',
      `feature-card-${variant}`,
      `feature-card-${size}`,
      interactive && 'feature-card-interactive',
      elevated && 'md-elevation-2'
    ]"
    @click="handleClick"
  >
    <!-- Icon/Image -->
    <div v-if="icon || image || $slots.icon" class="feature-icon">
      <slot name="icon">
        <img v-if="image" :src="image" :alt="title" class="feature-image" />
        <i v-else-if="icon" :class="['feature-icon-element', icon]"></i>
      </slot>
    </div>
    
    <!-- Content -->
    <div class="feature-content">
      <h3 v-if="title" class="feature-title md-headline-6">
        {{ title }}
      </h3>
      
      <p v-if="description" class="feature-description md-body-2">
        {{ description }}
      </p>
      
      <!-- Custom content slot -->
      <div v-if="$slots.content" class="feature-custom-content">
        <slot name="content"></slot>
      </div>
      
      <!-- Metrics/Stats -->
      <div v-if="metrics && metrics.length" class="feature-metrics">
        <div 
          v-for="(metric, index) in metrics" 
          :key="index"
          class="metric-item"
        >
          <span class="metric-value md-headline-6">{{ metric.value }}</span>
          <span class="metric-label md-caption">{{ metric.label }}</span>
        </div>
      </div>
      
      <!-- List of features/benefits -->
      <ul v-if="features && features.length" class="feature-list">
        <li 
          v-for="(feature, index) in features" 
          :key="index"
          class="feature-list-item md-body-2"
        >
          <i class="feature-list-icon fas fa-check"></i>
          {{ feature }}
        </li>
      </ul>
      
      <!-- Action button -->
      <div v-if="actionLabel || $slots.action" class="feature-action">
        <slot name="action">
          <MButton
            v-if="actionLabel"
            :label="actionLabel"
            :variant="actionVariant"
            :size="actionSize"
            @click.stop="$emit('action', { title, description })"
          />
        </slot>
      </div>
    </div>
    
    <!-- Badge/Tag -->
    <div v-if="badge" class="feature-badge">
      <span class="badge-text md-caption">{{ badge }}</span>
    </div>
  </div>
</template>

<script>
import MButton from '../ui/MButton.vue'

export default {
  name: 'MFeatureCard',
  components: {
    MButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'horizontal', 'centered', 'minimal', 'outlined'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    interactive: {
      type: Boolean,
      default: false
    },
    elevated: {
      type: Boolean,
      default: true
    },
    actionLabel: {
      type: String,
      default: ''
    },
    actionVariant: {
      type: String,
      default: 'primary'
    },
    actionSize: {
      type: String,
      default: 'medium'
    },
    metrics: {
      type: Array,
      default: () => []
    },
    features: {
      type: Array,
      default: () => []
    },
    badge: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    }
  },
  emits: ['click', 'action'],
  methods: {
    handleClick() {
      if (this.interactive) {
        if (this.href) {
          window.open(this.href, '_blank')
        } else {
          this.$emit('click', { title: this.title, description: this.description })
        }
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/themes/material-design.css';

.feature-card {
  position: relative;
  background: var(--surface-color);
  border-radius: var(--border-radius-2);
  padding: var(--vspace-18);
  transition: var(--transition-1);
  border: 1px solid var(--divider-color);
}

.feature-card-interactive {
  cursor: pointer;
}

.feature-card-interactive:hover {
  box-shadow: var(--shadow-3);
  transform: translateY(-2px);
}

/* Variants */
.feature-card-default {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.feature-card-horizontal {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  text-align: left;
  gap: var(--hspace-15);
}

.feature-card-centered {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}

.feature-card-minimal {
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: var(--vspace-14);
  border: none;
  box-shadow: none;
}

.feature-card-outlined {
  background: transparent;
  border: 2px solid var(--primary-color);
}

/* Sizes */
.feature-card-small {
  padding: var(--vspace-14);
}

.feature-card-medium {
  padding: var(--vspace-18);
}

.feature-card-large {
  padding: var(--vspace-28);
}

/* Icon styling */
.feature-icon {
  margin-bottom: var(--vspace-18);
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-card-horizontal .feature-icon {
  margin-bottom: 0;
  flex-shrink: 0;
}

.feature-icon-element {
  font-size: 2.5rem;
  color: var(--primary-color);
  transition: var(--transition-9);
}

.feature-image {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: var(--border-radius-2);
}

.feature-card-large .feature-icon-element {
  font-size: 3rem;
}

.feature-card-large .feature-image {
  width: 80px;
  height: 80px;
}

/* Content styling */
.feature-content {
  flex: 1;
}

.feature-title {
  margin-bottom: var(--vspace-12);
  color: var(--text-primary);
  font-weight: 700;
}

.feature-description {
  margin-bottom: var(--vspace-14);
  color: var(--text-secondary);
  line-height: 1.6;
}

.feature-custom-content {
  margin: var(--vspace-14) 0;
}

/* Metrics styling */
.feature-metrics {
  display: flex;
  gap: var(--hspace-16);
  margin: var(--vspace-14) 0;
  justify-content: center;
}

.feature-card-horizontal .feature-metrics,
.feature-card-minimal .feature-metrics {
  justify-content: flex-start;
}

.metric-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.metric-value {
  color: var(--primary-color);
  font-weight: 700;
  line-height: 1;
}

.metric-label {
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: var(--vspace-5);
}

/* Feature list styling */
.feature-list {
  list-style: none;
  padding: 0;
  margin: var(--vspace-14) 0;
}

.feature-list-item {
  display: flex;
  align-items: center;
  margin-bottom: var(--vspace-10);
  color: var(--text-secondary);
}

.feature-list-icon {
  color: var(--success-color);
  margin-right: var(--hspace-10);
  font-size: 0.875rem;
  flex-shrink: 0;
}

/* Action styling */
.feature-action {
  margin-top: var(--vspace-18);
}

.feature-card-centered .feature-action {
  display: flex;
  justify-content: center;
}

/* Badge styling */
.feature-badge {
  position: absolute;
  top: var(--vspace-12);
  right: var(--hspace-12);
  background: var(--accent-color);
  color: var(--color-black-4);
  padding: var(--vspace-5) var(--hspace-10);
  border-radius: var(--border-radius-6);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Hover effects */
.feature-card-interactive:hover .feature-icon-element {
  color: var(--primary-dark);
  transform: scale(1.1);
}

.feature-card-interactive:hover .feature-title {
  color: var(--primary-color);
}

/* Responsive design */
@media (max-width: 768px) {
  .feature-card-horizontal {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  
  .feature-card-horizontal .feature-icon {
    margin-bottom: var(--vspace-18);
  }
  
  .feature-metrics {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--hspace-12);
  }
  
  .feature-card {
    padding: var(--vspace-14);
  }
}

@media (max-width: 480px) {
  .feature-icon-element {
    font-size: 2rem;
  }
  
  .feature-card-large .feature-icon-element {
    font-size: 2.5rem;
  }
  
  .feature-metrics {
    gap: var(--hspace-10);
  }
}
</style>
