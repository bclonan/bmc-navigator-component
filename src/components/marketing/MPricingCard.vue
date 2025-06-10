<template>
  <div 
    :class="[
      'pricing-card',
      `pricing-${variant}`,
      `pricing-${size}`,
      featured && 'pricing-featured',
      mostPopular && 'pricing-popular',
      elevated && 'md-elevation-2'
    ]"
  >
    <!-- Popular badge -->
    <div v-if="mostPopular" class="popular-badge">
      <span class="badge-text md-caption">{{ popularText }}</span>
    </div>
    
    <!-- Header -->
    <div class="pricing-header">
      <div v-if="icon" class="pricing-icon">
        <i :class="icon"></i>
      </div>
      
      <h3 class="pricing-title md-headline-5">{{ title }}</h3>
      <p v-if="subtitle" class="pricing-subtitle md-body-2">{{ subtitle }}</p>
    </div>
    
    <!-- Price section -->
    <div class="pricing-price">
      <div class="price-main">
        <span v-if="currency" class="price-currency md-headline-6">{{ currency }}</span>
        <span class="price-amount md-headline-2">{{ displayPrice }}</span>
        <span v-if="period" class="price-period md-body-2">{{ period }}</span>
      </div>
      
      <div v-if="originalPrice" class="price-original">
        <span class="original-price md-body-2">{{ currency }}{{ originalPrice }}</span>
        <span v-if="discount" class="discount-text md-caption">Save {{ discount }}%</span>
      </div>
      
      <p v-if="priceDescription" class="price-description md-caption">
        {{ priceDescription }}
      </p>
    </div>
    
    <!-- Features list -->
    <div v-if="features && features.length" class="pricing-features">
      <ul class="features-list">
        <li 
          v-for="(feature, index) in features" 
          :key="index"
          :class="[
            'feature-item',
            feature.included === false && 'feature-disabled'
          ]"
        >
          <i :class="getFeatureIcon(feature)"></i>
          <span class="feature-text md-body-2">{{ feature.text || feature }}</span>
          <span v-if="feature.highlight" class="feature-highlight md-caption">
            {{ feature.highlight }}
          </span>
        </li>
      </ul>
    </div>
    
    <!-- Custom content slot -->
    <div v-if="$slots.content" class="pricing-content">
      <slot name="content"></slot>
    </div>
    
    <!-- Action button -->
    <div class="pricing-action">
      <slot name="action">
        <MButton
          :label="buttonText"
          :variant="buttonVariant"
          :size="buttonSize"
          :disabled="buttonDisabled"
          @click="$emit('select', { title, price, period })"
          class="pricing-button"
        />
      </slot>
    </div>
    
    <!-- Footer text -->
    <div v-if="footerText" class="pricing-footer">
      <p class="footer-text md-caption">{{ footerText }}</p>
    </div>
  </div>
</template>

<script>
import MButton from '../ui/MButton.vue'

export default {
  name: 'MPricingCard',
  components: {
    MButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    price: {
      type: [String, Number],
      required: true
    },
    originalPrice: {
      type: [String, Number],
      default: null
    },
    currency: {
      type: String,
      default: '$'
    },
    period: {
      type: String,
      default: ''
    },
    priceDescription: {
      type: String,
      default: ''
    },
    features: {
      type: Array,
      default: () => []
    },
    buttonText: {
      type: String,
      default: 'Get Started'
    },
    buttonVariant: {
      type: String,
      default: 'primary'
    },
    buttonSize: {
      type: String,
      default: 'large'
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    },
    footerText: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'outlined', 'minimal'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    featured: {
      type: Boolean,
      default: false
    },
    mostPopular: {
      type: Boolean,
      default: false
    },
    popularText: {
      type: String,
      default: 'Most Popular'
    },
    elevated: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ''
    },
    discount: {
      type: Number,
      default: null
    }
  },
  emits: ['select'],
  computed: {
    displayPrice() {
      if (this.price === 0 || this.price === '0') return 'Free'
      if (typeof this.price === 'string') return this.price
      return this.price.toLocaleString()
    }
  },
  methods: {
    getFeatureIcon(feature) {
      if (typeof feature === 'object') {
        if (feature.included === false) {
          return 'fas fa-times feature-icon-disabled'
        }
        if (feature.icon) {
          return feature.icon
        }
      }
      return 'fas fa-check feature-icon-included'
    }
  }
}
</script>

<style scoped>
@import '../../assets/themes/material-design.css';

.pricing-card {
  position: relative;
  background: var(--surface-color);
  border-radius: var(--border-radius-2);
  padding: var(--vspace-18);
  border: 1px solid var(--divider-color);
  display: flex;
  flex-direction: column;
  transition: var(--transition-1);
}

.pricing-card:hover {
  box-shadow: var(--shadow-3);
  transform: translateY(-4px);
}

/* Variants */
.pricing-outlined {
  border: 2px solid var(--primary-color);
  background: transparent;
}

.pricing-minimal {
  border: none;
  box-shadow: none;
  background: transparent;
}

.pricing-featured {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
  transform: scale(1.05);
}

.pricing-featured .pricing-title,
.pricing-featured .pricing-subtitle,
.pricing-featured .price-amount,
.pricing-featured .price-period,
.pricing-featured .feature-text,
.pricing-featured .footer-text {
  color: white;
}

.pricing-featured .price-currency {
  color: rgba(255, 255, 255, 0.9);
}

.pricing-popular {
  border-color: var(--accent-color);
  border-width: 2px;
}

/* Sizes */
.pricing-small {
  padding: var(--vspace-14);
}

.pricing-medium {
  padding: var(--vspace-18);
}

.pricing-large {
  padding: var(--vspace-28);
}

/* Popular badge */
.popular-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-color);
  color: var(--color-black-4);
  padding: var(--vspace-8) var(--hspace-16);
  border-radius: var(--border-radius-6);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* Header */
.pricing-header {
  text-align: center;
  margin-bottom: var(--vspace-18);
}

.pricing-icon {
  margin-bottom: var(--vspace-14);
}

.pricing-icon i {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.pricing-featured .pricing-icon i {
  color: white;
}

.pricing-title {
  margin-bottom: var(--vspace-8);
  font-weight: 700;
  color: var(--text-primary);
}

.pricing-subtitle {
  color: var(--text-secondary);
}

/* Price section */
.pricing-price {
  text-align: center;
  margin-bottom: var(--vspace-28);
  padding-bottom: var(--vspace-18);
  border-bottom: 1px solid var(--divider-color);
}

.pricing-featured .pricing-price {
  border-bottom-color: rgba(255, 255, 255, 0.2);
}

.price-main {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--hspace-6);
  margin-bottom: var(--vspace-8);
}

.price-currency {
  color: var(--text-secondary);
  font-weight: 600;
}

.price-amount {
  font-weight: 700;
  color: var(--text-primary);
}

.price-period {
  color: var(--text-secondary);
}

.price-original {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--hspace-8);
  margin-bottom: var(--vspace-8);
}

.original-price {
  text-decoration: line-through;
  color: var(--text-disabled);
}

.discount-text {
  background: var(--success-color);
  color: white;
  padding: var(--vspace-3) var(--hspace-8);
  border-radius: var(--border-radius-6);
  font-weight: 600;
}

.price-description {
  color: var(--text-secondary);
  margin-top: var(--vspace-8);
}

/* Features */
.pricing-features {
  flex: 1;
  margin-bottom: var(--vspace-28);
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: var(--vspace-12);
  transition: var(--transition-19);
}

.feature-item i {
  margin-right: var(--hspace-12);
  font-size: 0.875rem;
  flex-shrink: 0;
}

.feature-icon-included {
  color: var(--success-color);
}

.feature-icon-disabled {
  color: var(--text-disabled);
}

.feature-text {
  flex: 1;
  color: var(--text-primary);
}

.feature-disabled .feature-text {
  color: var(--text-disabled);
  text-decoration: line-through;
}

.feature-highlight {
  background: var(--primary-color);
  color: white;
  padding: var(--vspace-3) var(--hspace-8);
  border-radius: var(--border-radius-6);
  font-weight: 600;
  margin-left: var(--hspace-8);
}

/* Action button */
.pricing-action {
  margin-bottom: var(--vspace-14);
}

.pricing-button {
  width: 100%;
}

.pricing-featured .pricing-button {
  background: white;
  color: var(--primary-color);
  border-color: white;
}

.pricing-featured .pricing-button:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Footer */
.pricing-footer {
  text-align: center;
}

.footer-text {
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Responsive design */
@media (max-width: 768px) {
  .pricing-featured {
    transform: none;
  }
  
  .pricing-card {
    padding: var(--vspace-14);
  }
  
  .price-main {
    flex-direction: column;
    gap: var(--vspace-5);
  }
  
  .price-original {
    flex-direction: column;
    gap: var(--vspace-5);
  }
}

@media (max-width: 480px) {
  .popular-badge {
    font-size: 0.75rem;
    padding: var(--vspace-6) var(--hspace-12);
  }
  
  .pricing-icon i {
    font-size: 2rem;
  }
  
  .feature-item {
    margin-bottom: var(--vspace-10);
  }
}
</style>
