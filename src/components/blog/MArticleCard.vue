<template>
  <article 
    :class="[
      'article-card',
      `article-${variant}`,
      `article-${size}`,
      interactive && 'article-interactive',
      elevated && 'md-elevation-1'
    ]"
    @click="handleClick"
  >
    <!-- Featured image -->
    <div v-if="image || $slots.image" class="article-image">
      <slot name="image">
        <img 
          v-if="image" 
          :src="image" 
          :alt="title"
          :loading="lazyLoad ? 'lazy' : 'eager'"
        />
      </slot>
      
      <!-- Image overlay content -->
      <div v-if="category || readTime" class="image-overlay">
        <span v-if="category" class="article-category">{{ category }}</span>
        <span v-if="readTime" class="read-time">
          <i class="fas fa-clock"></i>
          {{ readTime }} min read
        </span>
      </div>
    </div>
    
    <!-- Article content -->
    <div class="article-content">
      <!-- Header metadata -->
      <div v-if="!image && (category || readTime || publishDate)" class="article-meta">
        <span v-if="category" class="article-category">{{ category }}</span>
        <span v-if="publishDate" class="publish-date">{{ formattedDate }}</span>
        <span v-if="readTime" class="read-time">
          <i class="fas fa-clock"></i>
          {{ readTime }} min read
        </span>
      </div>
      
      <!-- Title and description -->
      <h2 class="article-title md-headline-5">
        <a v-if="href" :href="href" class="title-link">{{ title }}</a>
        <span v-else>{{ title }}</span>
      </h2>
      
      <p v-if="excerpt" class="article-excerpt md-body-1">
        {{ excerpt }}
      </p>
      
      <!-- Tags -->
      <div v-if="tags && tags.length" class="article-tags">
        <span 
          v-for="tag in tags" 
          :key="tag"
          class="tag md-caption"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- Custom content slot -->
      <div v-if="$slots.content" class="article-custom-content">
        <slot name="content"></slot>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="article-footer">
      <!-- Author information -->
      <div v-if="author" class="article-author">
        <img 
          v-if="author.avatar" 
          :src="author.avatar" 
          :alt="author.name"
          class="author-avatar"
        />
        <div class="author-info">
          <span class="author-name md-subtitle-2">{{ author.name }}</span>
          <span v-if="author.title" class="author-title md-caption">{{ author.title }}</span>
        </div>
      </div>
      
      <!-- Engagement metrics -->
      <div v-if="showEngagement" class="article-engagement">
        <button 
          v-if="likes !== null" 
          class="engagement-item"
          @click.stop="$emit('like')"
        >
          <i class="fas fa-heart"></i>
          <span>{{ formatNumber(likes) }}</span>
        </button>
        
        <button 
          v-if="comments !== null" 
          class="engagement-item"
          @click.stop="$emit('comment')"
        >
          <i class="fas fa-comment"></i>
          <span>{{ formatNumber(comments) }}</span>
        </button>
        
        <button 
          v-if="shares !== null" 
          class="engagement-item"
          @click.stop="$emit('share')"
        >
          <i class="fas fa-share"></i>
          <span>{{ formatNumber(shares) }}</span>
        </button>
      </div>
      
      <!-- Action buttons -->
      <div v-if="$slots.actions" class="article-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'MArticleCard',
  props: {
    title: {
      type: String,
      required: true
    },
    excerpt: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: () => []
    },
    author: {
      type: Object,
      default: null
    },
    publishDate: {
      type: [String, Date],
      default: ''
    },
    readTime: {
      type: [String, Number],
      default: null
    },
    href: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'horizontal', 'minimal', 'featured'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    interactive: {
      type: Boolean,
      default: true
    },
    elevated: {
      type: Boolean,
      default: true
    },
    lazyLoad: {
      type: Boolean,
      default: true
    },
    showEngagement: {
      type: Boolean,
      default: false
    },
    likes: {
      type: Number,
      default: null
    },
    comments: {
      type: Number,
      default: null
    },
    shares: {
      type: Number,
      default: null
    }
  },
  emits: ['click', 'like', 'comment', 'share'],
  computed: {
    formattedDate() {
      if (!this.publishDate) return ''
      
      const date = typeof this.publishDate === 'string' ? new Date(this.publishDate) : this.publishDate
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
  },
  methods: {
    handleClick() {
      if (this.interactive) {
        if (this.href) {
          window.open(this.href, '_blank')
        } else {
          this.$emit('click', { title: this.title, excerpt: this.excerpt })
        }
      }
    },
    formatNumber(num) {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
      }
      return num.toString()
    }
  }
}
</script>

<style scoped>
@import '../../assets/themes/material-design.css';

.article-card {
  background: var(--surface-color);
  border-radius: var(--border-radius-2);
  overflow: hidden;
  border: 1px solid var(--divider-color);
  transition: var(--transition-1);
  display: flex;
  flex-direction: column;
}

.article-interactive {
  cursor: pointer;
}

.article-interactive:hover {
  box-shadow: var(--shadow-3);
  transform: translateY(-2px);
}

/* Variants */
.article-default {
  flex-direction: column;
  max-width: 400px;
}

.article-horizontal {
  flex-direction: row;
  align-items: stretch;
}

.article-horizontal .article-image {
  width: 300px;
  flex-shrink: 0;
}

.article-minimal {
  border: none;
  box-shadow: none;
  background: transparent;
  padding: var(--vspace-14);
}

.article-featured {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  border: none;
}

.article-featured .article-title,
.article-featured .article-excerpt,
.article-featured .author-name {
  color: white;
}

.article-featured .article-category,
.article-featured .read-time,
.article-featured .publish-date {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Sizes */
.article-small .article-content {
  padding: var(--vspace-14);
}

.article-medium .article-content {
  padding: var(--vspace-18);
}

.article-large .article-content {
  padding: var(--vspace-28);
}

/* Image styling */
.article-image {
  position: relative;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: var(--transition-10);
}

.article-large .article-image img {
  height: 250px;
}

.article-small .article-image img {
  height: 150px;
}

.article-interactive:hover .article-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: var(--vspace-12);
  left: var(--hspace-12);
  right: var(--hspace-12);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* Content styling */
.article-content {
  flex: 1;
  padding: var(--vspace-18);
}

.article-meta {
  display: flex;
  align-items: center;
  gap: var(--hspace-12);
  margin-bottom: var(--vspace-14);
  flex-wrap: wrap;
}

.article-category {
  background: var(--primary-color);
  color: white;
  padding: var(--vspace-5) var(--hspace-12);
  border-radius: var(--border-radius-6);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.publish-date,
.read-time {
  color: var(--text-secondary);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: var(--hspace-6);
}

.article-title {
  margin-bottom: var(--vspace-14);
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.3;
}

.title-link {
  color: inherit;
  text-decoration: none;
  transition: var(--transition-15);
}

.title-link:hover {
  color: var(--primary-color);
}

.article-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--vspace-14);
}

/* Tags */
.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--hspace-8);
  margin-bottom: var(--vspace-14);
}

.tag {
  background: var(--color-lighthouse);
  color: var(--text-secondary);
  padding: var(--vspace-5) var(--hspace-10);
  border-radius: var(--border-radius-6);
  font-weight: 600;
  transition: var(--transition-2);
}

.tag:hover {
  background: var(--color-jupiter);
  color: var(--text-primary);
}

/* Footer */
.article-footer {
  padding: var(--vspace-14) var(--vspace-18);
  border-top: 1px solid var(--divider-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--hspace-12);
}

.article-minimal .article-footer {
  border-top: none;
  padding: 0;
  padding-top: var(--vspace-14);
}

/* Author */
.article-author {
  display: flex;
  align-items: center;
  gap: var(--hspace-10);
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: var(--border-radius-1);
  object-fit: cover;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1;
}

.author-title {
  color: var(--text-secondary);
  margin-top: var(--vspace-3);
}

/* Engagement */
.article-engagement {
  display: flex;
  gap: var(--hspace-14);
}

.engagement-item {
  display: flex;
  align-items: center;
  gap: var(--hspace-6);
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  padding: var(--vspace-5) var(--hspace-8);
  border-radius: var(--border-radius-2);
  transition: var(--transition-2);
}

.engagement-item:hover {
  background: var(--color-lighthouse);
  color: var(--text-primary);
}

.engagement-item i {
  font-size: 0.875rem;
}

/* Custom content */
.article-custom-content {
  margin: var(--vspace-14) 0;
}

.article-actions {
  display: flex;
  gap: var(--hspace-8);
}

/* Responsive design */
@media (max-width: 768px) {
  .article-horizontal {
    flex-direction: column;
  }
  
  .article-horizontal .article-image {
    width: 100%;
  }
  
  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--vspace-12);
  }
  
  .article-engagement {
    width: 100%;
    justify-content: space-around;
  }
  
  .image-overlay {
    flex-direction: column;
    gap: var(--vspace-8);
  }
}

@media (max-width: 480px) {
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--vspace-8);
  }
  
  .article-tags {
    gap: var(--hspace-6);
  }
  
  .tag {
    font-size: 0.75rem;
    padding: var(--vspace-3) var(--hspace-8);
  }
  
  .article-content {
    padding: var(--vspace-14);
  }
  
  .article-footer {
    padding: var(--vspace-12) var(--vspace-14);
  }
}
</style>
