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
.m-media-card {
  @apply bg-white overflow-hidden transition-all duration-200;
}

/* Elevation styles */
.elevation-0 { @apply shadow-none; }
.elevation-1 { @apply shadow-sm; }
.elevation-2 { @apply shadow; }
.elevation-3 { @apply shadow-md; }
.elevation-4 { @apply shadow-lg; }
.elevation-5 { @apply shadow-xl; }

/* Rounded styles */
.rounded { @apply rounded-lg; }
.rounded-sm { @apply rounded-sm; }
.rounded-md { @apply rounded-md; }
.rounded-lg { @apply rounded-lg; }
.rounded-xl { @apply rounded-xl; }
.rounded-full { @apply rounded-full; }

/* Bordered */
.bordered { @apply border border-gray-200; }

/* Interactive states */
.clickable { @apply cursor-pointer; }
.clickable:hover { @apply shadow-lg transform scale-105; }
.selectable { @apply cursor-pointer; }
.selected { @apply ring-2 ring-blue-500 shadow-lg; }

/* Media container */
.media-container {
  @apply relative overflow-hidden;
}

.media-wrapper {
  @apply relative w-full;
}

/* Aspect ratios */
.aspect-1-1 { @apply aspect-square; }
.aspect-4-3 { aspect-ratio: 4/3; }
.aspect-16-9 { aspect-ratio: 16/9; }
.aspect-3-2 { aspect-ratio: 3/2; }
.aspect-auto { @apply h-auto; }

/* Media elements */
.media-image,
.media-video {
  @apply w-full h-full object-cover;
}

.media-audio {
  @apply w-full;
}

/* Document preview */
.document-container {
  @apply p-6 bg-gray-50 flex items-center justify-center;
  min-height: 120px;
}

.document-preview {
  @apply flex items-center space-x-3;
}

.document-icon {
  @apply text-3xl text-gray-600;
}

.document-info {
  @apply text-left;
}

.document-name {
  @apply font-medium text-gray-900;
}

.document-size {
  @apply text-sm text-gray-500;
}

/* Overlay */
.media-overlay {
  @apply absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center;
  @apply opacity-0 transition-opacity duration-200;
}

.has-overlay:hover .media-overlay {
  @apply opacity-100;
}

.overlay-content {
  @apply text-white text-center p-4;
}

/* Card content */
.card-content {
  @apply p-6;
}

.content-wrapper.no-media {
  @apply p-8;
}

/* Header */
.card-header {
  @apply flex items-start justify-between mb-4;
}

.header-main {
  @apply flex-1;
}

.card-title {
  @apply text-lg font-semibold text-gray-900 mb-1;
}

.title-large {
  @apply text-xl font-bold;
}

.title-small {
  @apply text-base font-medium;
}

.card-subtitle {
  @apply text-sm text-gray-600;
}

.subtitle-muted {
  @apply text-gray-500;
}

.header-actions {
  @apply flex space-x-2 ml-4;
}

/* Main content */
.card-main {
  @apply mb-4;
}

.card-description {
  @apply text-gray-700 leading-relaxed;
}

.content-expanded .card-description {
  @apply text-base leading-relaxed;
}

/* Metadata */
.card-metadata {
  @apply mb-4;
}

.metadata-container {
  @apply space-y-2;
}

.metadata-inline {
  @apply flex flex-wrap gap-4;
}

.metadata-grid {
  @apply grid grid-cols-2 gap-2;
}

.metadata-item {
  @apply text-sm;
}

.metadata-label {
  @apply font-medium text-gray-600;
}

.metadata-value {
  @apply text-gray-900 ml-1;
}

/* Tags */
.card-tags {
  @apply flex flex-wrap gap-2 mb-4;
}

.tag-item {
  @apply px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium;
}

.tag-small {
  @apply px-1.5 py-0.5 text-xs;
}

.tag-large {
  @apply px-3 py-1.5 text-sm;
}

/* Footer */
.card-footer {
  @apply border-t border-gray-200 pt-4;
}

.footer-actions {
  @apply flex space-x-2;
}

/* Action buttons */
.action-button {
  @apply px-3 py-1.5 text-sm font-medium rounded transition-colors duration-200;
}

.action-default {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}

.action-primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.action-disabled {
  @apply opacity-50 cursor-not-allowed;
}

/* Loading state */
.loading-overlay {
  @apply absolute inset-0 bg-white bg-opacity-75 flex flex-col items-center justify-center;
}

.loading-spinner {
  @apply w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin;
}

.loading-text {
  @apply mt-2 text-sm text-gray-600;
}

/* Error state */
.error-overlay {
  @apply absolute inset-0 bg-red-50 flex items-center justify-center;
}

.error-content {
  @apply text-center p-4;
}

.error-icon {
  @apply text-2xl text-red-500 mb-2;
}

.error-text {
  @apply text-red-700 mb-3;
}

.retry-button {
  @apply px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200;
}

/* Variants */
.variant-compact {
  @apply text-sm;
}

.variant-compact .card-content {
  @apply p-4;
}

.variant-featured {
  @apply bg-gradient-to-br from-blue-50 to-indigo-100;
}

.variant-minimal .card-content {
  @apply p-4;
}

.variant-minimal .card-header {
  @apply mb-2;
}

.variant-detailed .card-content {
  @apply p-8;
}

/* Orientation */
.orientation-horizontal {
  @apply flex;
}

.orientation-horizontal .media-container {
  @apply w-1/3 flex-shrink-0;
}

.orientation-horizontal .card-content {
  @apply flex-1;
}

@media (max-width: 768px) {
  .orientation-horizontal {
    @apply flex-col;
  }
  
  .orientation-horizontal .media-container {
    @apply w-full;
  }
}
</style>