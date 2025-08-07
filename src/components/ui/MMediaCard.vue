<template>
  <div class="m-media-card" :class="cardClasses">
    <!-- Media Content -->
    <div v-if="hasMedia" class="media-container" :class="mediaContainerClasses">
      <!-- Image Media -->
      <div v-if="mediaType === 'image'" class="image-container">
        <img 
          :src="mediaSrc" 
          :alt="mediaAlt || title"
          :class="imageClasses"
          @load="onMediaLoad"
          @error="onMediaError"
        />
        <div v-if="showOverlay" class="media-overlay" :class="overlayClasses">
          <slot name="overlay">
            <div v-if="overlayContent" v-html="overlayContent"></div>
          </slot>
        </div>
      </div>
      
      <!-- Video Media -->
      <div v-else-if="mediaType === 'video'" class="video-container">
        <video 
          :src="mediaSrc"
          :controls="videoControls"
          :autoplay="videoAutoplay"
          :muted="videoMuted"
          :loop="videoLoop"
          :class="videoClasses"
          @loadeddata="onMediaLoad"
          @error="onMediaError"
        >
          Your browser does not support video playback.
        </video>
        <div v-if="showOverlay" class="media-overlay" :class="overlayClasses">
          <slot name="overlay">
            <div v-if="overlayContent" v-html="overlayContent"></div>
          </slot>
        </div>
      </div>
      
      <!-- Audio Media -->
      <div v-else-if="mediaType === 'audio'" class="audio-container">
        <audio 
          :src="mediaSrc"
          :controls="audioControls"
          :autoplay="audioAutoplay"
          :muted="audioMuted"
          :loop="audioLoop"
          :class="audioClasses"
          @loadeddata="onMediaLoad"
          @error="onMediaError"
        >
          Your browser does not support audio playback.
        </audio>
      </div>
      
      <!-- Document/File Media -->
      <div v-else-if="mediaType === 'document'" class="document-container">
        <div class="document-preview" :class="documentClasses">
          <i :class="documentIcon" class="document-icon"></i>
          <div class="document-info">
            <div class="document-name">{{ documentName || 'Document' }}</div>
            <div class="document-size">{{ documentSize }}</div>
          </div>
        </div>
      </div>
      
      <!-- Custom Media Slot -->
      <div v-else-if="mediaType === 'custom'" class="custom-media-container">
        <slot name="media"></slot>
      </div>
    </div>
    
    <!-- Card Content -->
    <div class="card-content" :class="contentClasses">
      <!-- Header Section -->
      <div v-if="hasHeader" class="card-header">
        <div class="header-main">
          <h3 v-if="title" class="card-title" :class="titleClasses">{{ title }}</h3>
          <p v-if="subtitle" class="card-subtitle" :class="subtitleClasses">{{ subtitle }}</p>
        </div>
        <div v-if="hasHeaderActions" class="header-actions">
          <slot name="header-actions">
            <button 
              v-for="action in headerActions" 
              :key="action.id"
              @click="handleAction(action)"
              :class="getActionClasses(action)"
              :disabled="action.disabled"
            >
              <i v-if="action.icon" :class="action.icon" class="mr-1"></i>
              {{ action.label }}
            </button>
          </slot>
        </div>
      </div>
      
      <!-- Main Content -->
      <div v-if="hasContent" class="card-main" :class="mainContentClasses">
        <slot>
          <p v-if="description" class="card-description">{{ description }}</p>
        </slot>
      </div>
      
      <!-- Metadata Section -->
      <div v-if="hasMetadata" class="card-metadata" :class="metadataClasses">
        <div 
          v-for="(value, key) in metadata" 
          :key="key"
          class="metadata-item"
        >
          <span class="metadata-label">{{ formatMetadataLabel(key) }}:</span>
          <span class="metadata-value">{{ formatMetadataValue(value) }}</span>
        </div>
      </div>
      
      <!-- Tags Section -->
      <div v-if="hasTags" class="card-tags">
        <span 
          v-for="tag in tags" 
          :key="tag"
          class="tag"
          :class="tagClasses"
        >
          {{ tag }}
        </span>
      </div>
      
      <!-- Footer Actions -->
      <div v-if="hasFooterActions" class="card-footer">
        <slot name="footer-actions">
          <div class="footer-actions">
            <button 
              v-for="action in footerActions" 
              :key="action.id"
              @click="handleAction(action)"
              :class="getActionClasses(action)"
              :disabled="action.disabled"
            >
              <i v-if="action.icon" :class="action.icon" class="mr-1"></i>
              {{ action.label }}
            </button>
          </div>
        </slot>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <div v-if="loadingText" class="loading-text">{{ loadingText }}</div>
    </div>
    
    <!-- Error State -->
    <div v-if="error" class="error-overlay">
      <div class="error-content">
        <i class="fas fa-exclamation-triangle error-icon"></i>
        <div class="error-text">{{ error }}</div>
        <button v-if="retryable" @click="retry" class="retry-button">
          <i class="fas fa-redo mr-1"></i>
          Retry
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MMediaCard',
  
  props: {
    // Media props
    mediaType: {
      type: String,
      default: null,
      validator: (value) => [null, 'image', 'video', 'audio', 'document', 'custom'].includes(value)
    },
    mediaSrc: {
      type: String,
      default: null
    },
    mediaAlt: {
      type: String,
      default: null
    },
    
    // Video props
    videoControls: {
      type: Boolean,
      default: true
    },
    videoAutoplay: {
      type: Boolean,
      default: false
    },
    videoMuted: {
      type: Boolean,
      default: false
    },
    videoLoop: {
      type: Boolean,
      default: false
    },
    
    // Audio props
    audioControls: {
      type: Boolean,
      default: true
    },
    audioAutoplay: {
      type: Boolean,
      default: false
    },
    audioMuted: {
      type: Boolean,
      default: false
    },
    audioLoop: {
      type: Boolean,
      default: false
    },
    
    // Document props
    documentName: {
      type: String,
      default: null
    },
    documentSize: {
      type: String,
      default: null
    },
    documentType: {
      type: String,
      default: null
    },
    
    // Content props
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    metadata: {
      type: Object,
      default: () => ({})
    },
    tags: {
      type: Array,
      default: () => []
    },
    
    // Action props
    headerActions: {
      type: Array,
      default: () => []
    },
    footerActions: {
      type: Array,
      default: () => []
    },
    
    // Overlay props
    showOverlay: {
      type: Boolean,
      default: false
    },
    overlayContent: {
      type: String,
      default: null
    },
    
    // Layout props
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'compact', 'featured', 'minimal', 'detailed'].includes(value)
    },
    orientation: {
      type: String,
      default: 'vertical',
      validator: (value) => ['vertical', 'horizontal'].includes(value)
    },
    aspectRatio: {
      type: String,
      default: '16/9',
      validator: (value) => ['1/1', '4/3', '16/9', '3/2', 'auto'].includes(value)
    },
    
    // Style props
    elevation: {
      type: [String, Number],
      default: 1,
      validator: (value) => [0, 1, 2, 3, 4, 5].includes(Number(value))
    },
    rounded: {
      type: [Boolean, String],
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    
    // State props
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    retryable: {
      type: Boolean,
      default: true
    },
    
    // Interaction props
    clickable: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  
  emits: [
    'click',
    'media-load',
    'media-error',
    'action',
    'retry',
    'select'
  ],
  
  computed: {
    hasMedia() {
      return this.mediaType && this.mediaSrc;
    },
    
    hasHeader() {
      return this.title || this.subtitle || this.hasHeaderActions;
    },
    
    hasContent() {
      return this.$slots.default || this.description;
    },
    
    hasMetadata() {
      return Object.keys(this.metadata).length > 0;
    },
    
    hasTags() {
      return this.tags.length > 0;
    },
    
    hasHeaderActions() {
      return this.headerActions.length > 0 || this.$slots['header-actions'];
    },
    
    hasFooterActions() {
      return this.footerActions.length > 0 || this.$slots['footer-actions'];
    },
    
    cardClasses() {
      return [
        'media-card',
        `variant-${this.variant}`,
        `orientation-${this.orientation}`,
        `elevation-${this.elevation}`,
        {
          'rounded': this.rounded === true,
          [`rounded-${this.rounded}`]: typeof this.rounded === 'string',
          'bordered': this.bordered,
          'clickable': this.clickable,
          'selectable': this.selectable,
          'selected': this.selected,
          'loading': this.loading,
          'error': this.error
        }
      ];
    },
    
    mediaContainerClasses() {
      return [
        'media-wrapper',
        `aspect-${this.aspectRatio.replace('/', '-')}`,
        {
          'has-overlay': this.showOverlay
        }
      ];
    },
    
    imageClasses() {
      return [
        'media-image',
        {
          'object-cover': this.aspectRatio !== 'auto',
          'object-contain': this.aspectRatio === 'auto'
        }
      ];
    },
    
    videoClasses() {
      return [
        'media-video',
        {
          'object-cover': this.aspectRatio !== 'auto'
        }
      ];
    },
    
    audioClasses() {
      return ['media-audio'];
    },
    
    documentClasses() {
      return [
        'document-preview-content',
        {
          [`document-${this.documentType}`]: this.documentType
        }
      ];
    },
    
    overlayClasses() {
      return [
        'overlay-content',
        {
          'overlay-visible': this.showOverlay
        }
      ];
    },
    
    contentClasses() {
      return [
        'content-wrapper',
        {
          'no-media': !this.hasMedia
        }
      ];
    },
    
    titleClasses() {
      return [
        'title',
        {
          'title-large': this.variant === 'featured',
          'title-small': this.variant === 'compact'
        }
      ];
    },
    
    subtitleClasses() {
      return [
        'subtitle',
        {
          'subtitle-muted': this.variant !== 'featured'
        }
      ];
    },
    
    mainContentClasses() {
      return [
        'main-content',
        {
          'content-expanded': this.variant === 'detailed'
        }
      ];
    },
    
    metadataClasses() {
      return [
        'metadata-container',
        {
          'metadata-inline': this.variant === 'compact',
          'metadata-grid': this.variant === 'detailed'
        }
      ];
    },
    
    tagClasses() {
      return [
        'tag-item',
        {
          'tag-small': this.variant === 'compact',
          'tag-large': this.variant === 'featured'
        }
      ];
    },
    
    documentIcon() {
      const iconMap = {
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'xls': 'fas fa-file-excel',
        'xlsx': 'fas fa-file-excel',
        'ppt': 'fas fa-file-powerpoint',
        'pptx': 'fas fa-file-powerpoint',
        'zip': 'fas fa-file-archive',
        'rar': 'fas fa-file-archive',
        'txt': 'fas fa-file-alt',
        'csv': 'fas fa-file-csv',
        'json': 'fas fa-file-code',
        'xml': 'fas fa-file-code',
        'html': 'fas fa-file-code'
      };
      
      return iconMap[this.documentType] || 'fas fa-file';
    }
  },
  
  methods: {
    handleAction(action) {
      if (action.disabled) return;
      this.$emit('action', action);
      if (action.handler) {
        action.handler(action);
      }
    },
    
    getActionClasses(action) {
      return [
        'action-button',
        `action-${action.variant || 'default'}`,
        {
          'action-primary': action.primary,
          'action-disabled': action.disabled,
          'action-loading': action.loading
        }
      ];
    },
    
    onMediaLoad(event) {
      this.$emit('media-load', event);
    },
    
    onMediaError(event) {
      this.$emit('media-error', event);
    },
    
    retry() {
      this.$emit('retry');
    },
    
    formatMetadataLabel(key) {
      return key.replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())
                .trim();
    },
    
    formatMetadataValue(value) {
      if (value instanceof Date) {
        return value.toLocaleDateString();
      }
      if (typeof value === 'number') {
        return value.toLocaleString();
      }
      return String(value);
    },
    
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event);
      }
      if (this.selectable) {
        this.$emit('select', !this.selected);
      }
    }
  }
};
</script>

<style scoped>



</style>