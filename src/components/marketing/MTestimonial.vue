<template>
  <div 
    :class="[
      'testimonial-card',
      `testimonial-${variant}`,
      `testimonial-${size}`,
      elevated && 'md-elevation-2'
    ]"
  >
    <!-- Quote content -->
    <div class="testimonial-content">
      <div v-if="showQuoteIcon" class="quote-icon">
        <i class="fas fa-quote-left"></i>
      </div>
      
      <blockquote class="testimonial-quote md-body-1">
        {{ quote }}
      </blockquote>
      
      <!-- Rating stars -->
      <div v-if="rating > 0" class="testimonial-rating">
        <div class="stars">
          <i 
            v-for="star in 5" 
            :key="star"
            :class="[
              'star',
              star <= rating ? 'star-filled' : 'star-empty',
              'fas fa-star'
            ]"
          ></i>
        </div>
        <span v-if="showRatingText" class="rating-text md-caption">
          {{ rating }}/5 stars
        </span>
      </div>
    </div>
    
    <!-- Author information -->
    <div class="testimonial-author">
      <div v-if="authorImage" class="author-image">
        <img :src="authorImage" :alt="authorName" />
      </div>
      
      <div class="author-info">
        <div class="author-name md-subtitle-2">{{ authorName }}</div>
        <div v-if="authorTitle" class="author-title md-caption">{{ authorTitle }}</div>
        <div v-if="authorCompany" class="author-company md-caption">{{ authorCompany }}</div>
        <div v-if="location" class="author-location md-caption">{{ location }}</div>
      </div>
      
      <!-- Company logo -->
      <div v-if="companyLogo" class="company-logo">
        <img :src="companyLogo" :alt="authorCompany" />
      </div>
    </div>
    
    <!-- Additional metadata -->
    <div v-if="date || platform || verified" class="testimonial-meta">
      <span v-if="date" class="meta-date md-caption">{{ formattedDate }}</span>
      <span v-if="platform" class="meta-platform md-caption">via {{ platform }}</span>
      <span v-if="verified" class="meta-verified md-caption">
        <i class="fas fa-check-circle"></i>
        Verified
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MTestimonial',
  props: {
    quote: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    authorTitle: {
      type: String,
      default: ''
    },
    authorCompany: {
      type: String,
      default: ''
    },
    authorImage: {
      type: String,
      default: ''
    },
    companyLogo: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 5
    },
    showRatingText: {
      type: Boolean,
      default: true
    },
    showQuoteIcon: {
      type: Boolean,
      default: true
    },
    date: {
      type: [String, Date],
      default: ''
    },
    platform: {
      type: String,
      default: ''
    },
    verified: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'compact', 'featured', 'minimal'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    elevated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    formattedDate() {
      if (!this.date) return ''
      
      const date = typeof this.date === 'string' ? new Date(this.date) : this.date
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  }
}
</script>

<style scoped>
@import '../../assets/themes/material-design.css';

.testimonial-card {
  background: var(--surface-color);
  border-radius: var(--border-radius-2);
  padding: var(--vspace-18);
  border: 1px solid var(--divider-color);
  transition: var(--transition-1);
}

.testimonial-card:hover {
  box-shadow: var(--shadow-3);
}

/* Variants */
.testimonial-default {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-18);
}

.testimonial-compact {
  display: flex;
  flex-direction: row;
  gap: var(--hspace-15);
  align-items: flex-start;
}

.testimonial-featured {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
}

.testimonial-featured .testimonial-quote,
.testimonial-featured .author-name,
.testimonial-featured .author-title,
.testimonial-featured .author-company,
.testimonial-featured .author-location {
  color: white;
}

.testimonial-featured .quote-icon i {
  color: rgba(255, 255, 255, 0.7);
}

.testimonial-minimal {
  border: none;
  box-shadow: none;
  background: transparent;
  padding: var(--vspace-14);
}

/* Sizes */
.testimonial-small {
  padding: var(--vspace-14);
}

.testimonial-medium {
  padding: var(--vspace-18);
}

.testimonial-large {
  padding: var(--vspace-28);
}

/* Quote content */
.testimonial-content {
  position: relative;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: -10px;
  font-size: 1.5rem;
  color: var(--primary-color);
  opacity: 0.3;
}

.testimonial-quote {
  font-style: italic;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
  quotes: """ """ "'" "'";
}

.testimonial-quote:before {
  content: open-quote;
}

.testimonial-quote:after {
  content: close-quote;
}

/* Rating */
.testimonial-rating {
  display: flex;
  align-items: center;
  gap: var(--hspace-10);
  margin-top: var(--vspace-14);
}

.stars {
  display: flex;
  gap: var(--hspace-6);
}

.star {
  font-size: 1rem;
  transition: var(--transition-9);
}

.star-filled {
  color: var(--accent-color);
}

.star-empty {
  color: var(--color-jupiter);
}

.rating-text {
  color: var(--text-secondary);
  font-weight: 600;
}

/* Author information */
.testimonial-author {
  display: flex;
  align-items: center;
  gap: var(--hspace-12);
}

.testimonial-compact .testimonial-author {
  flex-direction: column;
  align-items: flex-start;
  gap: var(--vspace-8);
}

.author-image {
  flex-shrink: 0;
}

.author-image img {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-1);
  object-fit: cover;
  border: 2px solid var(--divider-color);
}

.testimonial-large .author-image img {
  width: 64px;
  height: 64px;
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--vspace-5);
}

.author-title,
.author-company,
.author-location {
  color: var(--text-secondary);
  margin-bottom: var(--vspace-3);
}

.company-logo {
  flex-shrink: 0;
  opacity: 0.7;
}

.company-logo img {
  height: 24px;
  width: auto;
  object-fit: contain;
}

/* Metadata */
.testimonial-meta {
  display: flex;
  align-items: center;
  gap: var(--hspace-12);
  margin-top: var(--vspace-12);
  padding-top: var(--vspace-12);
  border-top: 1px solid var(--divider-color);
  font-size: 0.75rem;
}

.testimonial-featured .testimonial-meta {
  border-top-color: rgba(255, 255, 255, 0.2);
}

.meta-date,
.meta-platform {
  color: var(--text-secondary);
}

.meta-verified {
  color: var(--success-color);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: var(--hspace-6);
}

.meta-verified i {
  font-size: 0.875rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .testimonial-compact {
    flex-direction: column;
    gap: var(--vspace-14);
  }
  
  .testimonial-author {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--vspace-10);
  }
  
  .testimonial-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--vspace-8);
  }
  
  .testimonial-card {
    padding: var(--vspace-14);
  }
}

@media (max-width: 480px) {
  .author-image img {
    width: 40px;
    height: 40px;
  }
  
  .testimonial-large .author-image img {
    width: 48px;
    height: 48px;
  }
  
  .testimonial-rating {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--vspace-8);
  }
}
</style>
