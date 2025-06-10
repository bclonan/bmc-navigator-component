<template>
  <div
    class="skeleton-group"
    :class="groupClasses"
    :aria-label="ariaLabel"
    role="status"
    aria-live="polite"
  >
    <!-- Text skeleton layout -->
    <template v-if="variant === 'text-block'">
      <MSkeleton
        v-for="(line, index) in lines"
        :key="`line-${index}`"
        variant="text"
        :width="getLineWidth(index)"
        :animated="animated"
        :animation-speed="animationSpeed"
        :color="color"
        class="mb-2"
      />
    </template>
    
    <!-- Card skeleton layout -->
    <template v-else-if="variant === 'card'">
      <div class="skeleton-card-layout">
        <MSkeleton
          v-if="showAvatar"
          variant="avatar"
          :width="avatarSize"
          :height="avatarSize"
          :animated="animated"
          :animation-speed="animationSpeed"
          :color="color"
          class="skeleton-avatar"
        />
        
        <div class="skeleton-card-content">
          <MSkeleton
            variant="text"
            width="75%"
            height="20px"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
            class="mb-2"
          />
          <MSkeleton
            variant="text"
            width="50%"
            height="16px"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
            class="mb-3"
          />
          
          <MSkeleton
            v-if="showImage"
            variant="rectangular"
            width="100%"
            :height="imageHeight"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
            class="mb-3"
          />
          
          <MSkeleton
            v-for="n in contentLines"
            :key="`content-${n}`"
            variant="text"
            :width="n === contentLines ? '60%' : '100%'"
            height="14px"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
            class="mb-1"
          />
        </div>
      </div>
    </template>
    
    <!-- List skeleton layout -->
    <template v-else-if="variant === 'list'">
      <div
        v-for="n in items"
        :key="`item-${n}`"
        class="skeleton-list-item"
      >
        <MSkeleton
          v-if="showAvatar"
          variant="avatar"
          :width="avatarSize"
          :height="avatarSize"
          :animated="animated"
          :animation-speed="animationSpeed"
          :color="color"
        />
        
        <div class="skeleton-list-content">
          <MSkeleton
            variant="text"
            width="70%"
            height="16px"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
            class="mb-1"
          />
          <MSkeleton
            variant="text"
            width="45%"
            height="14px"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
          />
        </div>
        
        <MSkeleton
          v-if="showActions"
          variant="button"
          width="80px"
          height="32px"
          :animated="animated"
          :animation-speed="animationSpeed"
          :color="color"
        />
      </div>
    </template>
    
    <!-- Table skeleton layout -->
    <template v-else-if="variant === 'table'">
      <div class="skeleton-table">
        <!-- Table header -->
        <div class="skeleton-table-header">
          <MSkeleton
            v-for="n in columns"
            :key="`header-${n}`"
            variant="text"
            :width="getColumnWidth(n)"
            height="16px"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
          />
        </div>
        
        <!-- Table rows -->
        <div
          v-for="n in rows"
          :key="`row-${n}`"
          class="skeleton-table-row"
        >
          <MSkeleton
            v-for="col in columns"
            :key="`cell-${n}-${col}`"
            variant="text"
            :width="getColumnWidth(col)"
            height="14px"
            :animated="animated"
            :animation-speed="animationSpeed"
            :color="color"
          />
        </div>
      </div>
    </template>
    
    <!-- Custom layout -->
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
import MSkeleton from './MSkeleton.vue';

export default {
  name: 'MSkeletonGroup',
  components: {
    MSkeleton
  },
  
  props: {
    /**
     * Layout variant
     */
    variant: {
      type: String,
      default: 'text-block',
      validator: (value) => [
        'text-block',
        'card', 
        'list',
        'table',
        'custom'
      ].includes(value)
    },
    
    /**
     * Number of lines for text-block
     */
    lines: {
      type: Number,
      default: 3
    },
    
    /**
     * Number of items for list
     */
    items: {
      type: Number,
      default: 3
    },
    
    /**
     * Number of table rows
     */
    rows: {
      type: Number,
      default: 5
    },
    
    /**
     * Number of table columns
     */
    columns: {
      type: Number,
      default: 4
    },
    
    /**
     * Content lines for card
     */
    contentLines: {
      type: Number,
      default: 3
    },
    
    /**
     * Show avatar in layouts
     */
    showAvatar: {
      type: Boolean,
      default: true
    },
    
    /**
     * Show image in card layout
     */
    showImage: {
      type: Boolean,
      default: false
    },
    
    /**
     * Show action buttons in list
     */
    showActions: {
      type: Boolean,
      default: false
    },
    
    /**
     * Avatar size
     */
    avatarSize: {
      type: [String, Number],
      default: 40
    },
    
    /**
     * Image height for card
     */
    imageHeight: {
      type: [String, Number],
      default: 120
    },
    
    /**
     * Enable shimmer animation
     */
    animated: {
      type: Boolean,
      default: true
    },
    
    /**
     * Animation speed
     */
    animationSpeed: {
      type: String,
      default: 'normal',
      validator: (value) => ['slow', 'normal', 'fast'].includes(value)
    },
    
    /**
     * Theme color
     */
    color: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'light', 'dark'].includes(value)
    },
    
    /**
     * Spacing between elements
     */
    spacing: {
      type: String,
      default: 'normal',
      validator: (value) => ['tight', 'normal', 'loose'].includes(value)
    },
    
    /**
     * Accessibility label
     */
    ariaLabel: {
      type: String,
      default: 'Loading content...'
    }
  },
  
  computed: {
    groupClasses() {
      return [
        'skeleton-group-base',
        `skeleton-spacing-${this.spacing}`,
        `skeleton-variant-${this.variant}`
      ];
    }
  },
  
  methods: {
    getLineWidth(index) {
      const widths = ['100%', '95%', '85%', '75%', '90%', '80%'];
      return widths[index % widths.length];
    },
    
    getColumnWidth(columnIndex) {
      const patterns = {
        1: '25%',
        2: '30%', 
        3: '20%',
        4: '25%'
      };
      return patterns[columnIndex] || '25%';
    }
  }
};
</script>

<style scoped>
.skeleton-group-base {
  width: 100%;
}

/* Spacing variants */
.skeleton-spacing-tight > * + * {
  margin-top: var(--vspace-8);
}

.skeleton-spacing-normal > * + * {
  margin-top: var(--vspace-14);
}

.skeleton-spacing-loose > * + * {
  margin-top: var(--vspace-28);
}

/* Card layout */
.skeleton-card-layout {
  display: flex;
  gap: var(--hspace-16);
  padding: var(--vspace-16);
  border: 1px solid var(--color-grey-area);
  border-radius: var(--border-radius-3);
}

.skeleton-card-content {
  flex: 1;
}

.skeleton-avatar {
  flex-shrink: 0;
}

/* List layout */
.skeleton-list-item {
  display: flex;
  align-items: center;
  gap: var(--hspace-12);
  padding: var(--vspace-12);
  border-bottom: 1px solid var(--color-grey-area);
}

.skeleton-list-item:last-child {
  border-bottom: 0;
}

.skeleton-list-content {
  flex: 1;
}

/* Table layout */
.skeleton-table {
  width: 100%;
  border: 1px solid var(--color-grey-area);
  border-radius: var(--border-radius-3);
  overflow: hidden;
}

.skeleton-table-header {
  display: flex;
  gap: var(--hspace-16);
  padding: var(--vspace-12);
  background: var(--color-doctor);
  border-bottom: 1px solid var(--color-grey-area);
}

.skeleton-table-row {
  display: flex;
  gap: var(--hspace-16);
  padding: var(--vspace-12);
  border-bottom: 1px solid var(--color-grey-area);
}

.skeleton-table-row:last-child {
  border-bottom: 0;
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .skeleton-card-layout {
    border-color: var(--color-vulcan);
  }
  
  .skeleton-list-item {
    border-bottom-color: var(--color-vulcan);
  }
  
  .skeleton-table {
    border-color: var(--color-vulcan);
  }
  
  .skeleton-table-header {
    background: var(--color-black-8);
    border-bottom-color: var(--color-vulcan);
  }
  
  .skeleton-table-row {
    border-bottom-color: var(--color-vulcan);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .skeleton-card-layout {
    flex-direction: column;
    gap: var(--hspace-8);
    padding: var(--vspace-12);
  }
  
  .skeleton-list-item {
    gap: var(--hspace-8);
    padding: var(--vspace-8);
  }
  
  .skeleton-table-header,
  .skeleton-table-row {
    gap: var(--hspace-8);
    padding: var(--vspace-8);
  }
}
</style>
