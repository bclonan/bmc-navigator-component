<template>
  <section 
    :class="[
      'hero-section',
      `hero-${variant}`,
      `hero-${size}`,
      fullHeight && 'hero-full-height'
    ]"
    :style="backgroundStyle"
  >
    <!-- Background overlay -->
    <div v-if="overlay" class="hero-overlay" :style="overlayStyle"></div>
    
    <!-- Content container -->
    <div class="hero-container">
      <div class="hero-content">
        <!-- Main content -->
        <div class="hero-text">
          <h1 v-if="headline" class="hero-headline md-headline-1">
            {{ headline }}
          </h1>
          
          <p v-if="subheadline" class="hero-subheadline md-subtitle-1">
            {{ subheadline }}
          </p>
          
          <p v-if="description" class="hero-description md-body-1">
            {{ description }}
          </p>
          
          <!-- Call-to-action buttons -->
          <div v-if="$slots.actions || primaryAction || secondaryAction" class="hero-actions">
            <slot name="actions">
              <MButton
                v-if="primaryAction"
                :label="primaryAction.label"
                variant="primary"
                size="large"
                @click="$emit('primary-action', primaryAction)"
                class="hero-primary-btn"
              />
              <MButton
                v-if="secondaryAction"
                :label="secondaryAction.label"
                variant="outlined"
                size="large"
                @click="$emit('secondary-action', secondaryAction)"
                class="hero-secondary-btn"
              />
            </slot>
          </div>
        </div>
        
        <!-- Media content -->
        <div v-if="$slots.media || mediaUrl" class="hero-media">
          <slot name="media">
            <div v-if="mediaType === 'image'" class="hero-image">
              <img :src="mediaUrl" :alt="mediaAlt" />
            </div>
            <div v-else-if="mediaType === 'video'" class="hero-video">
              <video 
                :src="mediaUrl" 
                :poster="videoPoster"
                :autoplay="videoAutoplay"
                :loop="videoLoop"
                :muted="videoMuted"
                controls
              />
            </div>
          </slot>
        </div>
      </div>
      
      <!-- Features/benefits list -->
      <div v-if="features && features.length" class="hero-features">
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-item md-elevation-1"
          >
            <div v-if="feature.icon" class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3 class="feature-title md-headline-6">{{ feature.title }}</h3>
            <p class="feature-description md-body-2">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MButton from '../ui/MButton.vue'

export default {
  name: 'MHeroSection',
  components: {
    MButton
  },
  props: {
    headline: {
      type: String,
      default: ''
    },
    subheadline: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'centered', 'split', 'minimal'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    fullHeight: {
      type: Boolean,
      default: false
    },
    backgroundImage: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    gradientBackground: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    },
    overlayColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    primaryAction: {
      type: Object,
      default: null
    },
    secondaryAction: {
      type: Object,
      default: null
    },
    mediaUrl: {
      type: String,
      default: ''
    },
    mediaType: {
      type: String,
      default: 'image',
      validator: value => ['image', 'video'].includes(value)
    },
    mediaAlt: {
      type: String,
      default: ''
    },
    videoPoster: {
      type: String,
      default: ''
    },
    videoAutoplay: {
      type: Boolean,
      default: false
    },
    videoLoop: {
      type: Boolean,
      default: false
    },
    videoMuted: {
      type: Boolean,
      default: true
    },
    features: {
      type: Array,
      default: () => []
    }
  },
  emits: ['primary-action', 'secondary-action'],
  computed: {
    backgroundStyle() {
      const styles = {}
      
      if (this.gradientBackground) {
        styles.background = this.gradientBackground
      } else if (this.backgroundImage) {
        styles.backgroundImage = `url(${this.backgroundImage})`
        styles.backgroundSize = 'cover'
        styles.backgroundPosition = 'center'
        styles.backgroundRepeat = 'no-repeat'
      } else if (this.backgroundColor) {
        styles.backgroundColor = this.backgroundColor
      }
      
      return styles
    },
    overlayStyle() {
      return {
        backgroundColor: this.overlayColor
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/themes/material-design.css';

.hero-section {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: var(--surface-color);
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--vspace-31) var(--hspace-16);
}

.hero-content {
  display: grid;
  gap: var(--hspace-21);
  align-items: center;
}

/* Variants */
.hero-default .hero-content {
  grid-template-columns: 1fr 1fr;
  text-align: left;
}

.hero-centered .hero-content {
  grid-template-columns: 1fr;
  text-align: center;
}

.hero-split .hero-content {
  grid-template-columns: 1fr 1fr;
  gap: var(--hspace-21);
}

.hero-minimal .hero-content {
  grid-template-columns: 1fr;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

/* Sizes */
.hero-small {
  min-height: 60vh;
}

.hero-medium {
  min-height: 70vh;
}

.hero-large {
  min-height: 80vh;
}

.hero-full-height {
  min-height: 100vh;
}

/* Content styling */
.hero-text {
  space-y: var(--vspace-18);
}

.hero-headline {
  margin-bottom: var(--vspace-18);
  color: var(--text-primary);
  font-weight: 700;
}

.hero-subheadline {
  margin-bottom: var(--vspace-25);
  color: var(--primary-color);
  font-weight: 600;
}

.hero-description {
  margin-bottom: var(--vspace-28);
  color: var(--text-secondary);
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: var(--hspace-15);
  flex-wrap: wrap;
}

.hero-centered .hero-actions {
  justify-content: center;
}

.hero-primary-btn {
  transition: var(--transition-1);
}

.hero-secondary-btn {
  transition: var(--transition-1);
}

/* Media styling */
.hero-media {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image img {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: var(--border-radius-3);
  box-shadow: var(--shadow-1);
}

.hero-video video {
  width: 100%;
  max-width: 600px;
  border-radius: var(--border-radius-3);
  box-shadow: var(--shadow-1);
}

/* Features grid */
.hero-features {
  margin-top: var(--vspace-32);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--hspace-18);
  margin-top: var(--vspace-28);
}

.feature-item {
  padding: var(--vspace-18);
  background: var(--surface-color);
  border-radius: var(--border-radius-2);
  text-align: center;
  transition: var(--transition-1);
}

.feature-item:hover {
  box-shadow: var(--shadow-3);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: var(--vspace-14);
}

.feature-title {
  margin-bottom: var(--vspace-12);
  color: var(--text-primary);
}

.feature-description {
  color: var(--text-secondary);
}

/* Responsive design */
@media (max-width: 768px) {
  .hero-default .hero-content,
  .hero-split .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--hspace-18);
  }
  
  .hero-container {
    padding: var(--vspace-28) var(--hspace-15);
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions .m-button {
    width: 100%;
    max-width: 300px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--hspace-15);
  }
  
  .hero-headline {
    font-size: 2rem;
    line-height: 1.2;
  }
}

@media (max-width: 480px) {
  .hero-small,
  .hero-medium,
  .hero-large {
    min-height: 70vh;
  }
  
  .hero-headline {
    font-size: 1.75rem;
  }
}
</style>
