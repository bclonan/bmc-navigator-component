<template>
  <div 
    class="m-card" 
    :class="[
      variantClasses,
      elevationClasses,
      paddingClasses,
      roundedClasses,
      themeClasses,
      { 'cursor-pointer': clickable },
      { 'border': outlined },
      customClass
    ]"
    @click="handleClick"
    :style="customStyles"
  >
    <!-- Header Section -->
    <header v-if="hasHeader" class="m-card-header" :class="headerClasses">
      <slot name="header">
        <div v-if="title || subtitle" class="m-card-title-section">
          <h3 v-if="title" class="m-card-title" :class="titleClasses">{{ title }}</h3>
          <p v-if="subtitle" class="m-card-subtitle" :class="subtitleClasses">{{ subtitle }}</p>
        </div>
      </slot>
      <div v-if="hasHeaderActions" class="m-card-actions">
        <slot name="header-actions"></slot>
      </div>
    </header>

    <!-- Media Section -->
    <div v-if="hasMedia" class="m-card-media" :class="mediaClasses">
      <slot name="media">
        <img v-if="image" :src="image" :alt="imageAlt" class="w-full h-full object-cover" />
      </slot>
    </div>

    <!-- Content Section -->
    <div v-if="hasContent" class="m-card-content" :class="contentClasses">
      <slot></slot>
    </div>

    <!-- Actions Section -->
    <footer v-if="hasActions" class="m-card-actions" :class="actionsClasses">
      <slot name="actions"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MCard',
  
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'outlined', 'filled', 'elevated'].includes(value)
    },
    elevation: {
      type: [String, Number],
      default: 1,
      validator: value => [0, 1, 2, 3, 4, 5, 6, 8, 12, 16, 24].includes(Number(value))
    },
    padding: {
      type: String,
      default: 'md',
      validator: value => ['none', 'xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    rounded: {
      type: String,
      default: 'md',
      validator: value => ['none', 'sm', 'md', 'lg', 'xl', 'full'].includes(value)
    },
    theme: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark'].includes(value)
    },
    clickable: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    subtitle: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    imageAlt: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyles: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    hasHeader() {
      return this.$slots.header || this.title || this.subtitle || this.hasHeaderActions;
    },
    
    hasHeaderActions() {
      return this.$slots['header-actions'];
    },
    
    hasMedia() {
      return this.$slots.media || this.image;
    },
    
    hasContent() {
      return this.$slots.default;
    },
    
    hasActions() {
      return this.$slots.actions;
    },

    variantClasses() {
      const variants = {
        default: 'bg-white',
        outlined: 'bg-white border-gray-200',
        filled: 'bg-gray-50',
        elevated: 'bg-white'
      };
      return variants[this.variant] || variants.default;
    },

    elevationClasses() {
      if (this.variant === 'outlined') return '';
      
      const elevations = {
        0: 'shadow-none',
        1: 'shadow-sm',
        2: 'shadow',
        3: 'shadow-md',
        4: 'shadow-lg',
        5: 'shadow-xl',
        6: 'shadow-2xl',
        8: 'shadow-2xl',
        12: 'shadow-2xl',
        16: 'shadow-2xl',
        24: 'shadow-2xl'
      };
      return elevations[Number(this.elevation)] || elevations[1];
    },

    paddingClasses() {
      const paddings = {
        none: 'p-0',
        xs: 'p-2',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8'
      };
      return paddings[this.padding] || paddings.md;
    },

    roundedClasses() {
      const rounded = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full'
      };
      return rounded[this.rounded] || rounded.md;
    },

    themeClasses() {
      return {
        'dark': this.theme === 'dark',
        'opacity-60 pointer-events-none': this.disabled
      };
    },

    headerClasses() {
      return [
        'flex justify-between items-start',
        this.padding !== 'none' ? 'pb-2' : '',
        this.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
      ];
    },

    titleClasses() {
      return [
        'text-lg font-semibold',
        this.theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
      ];
    },

    subtitleClasses() {
      return [
        'text-sm mt-1',
        this.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      ];
    },

    mediaClasses() {
      return [
        'overflow-hidden',
        this.hasHeader && this.padding !== 'none' ? 'mt-2' : '',
        this.hasContent && this.padding !== 'none' ? 'mb-2' : ''
      ];
    },

    contentClasses() {
      return [
        this.theme === 'dark' ? 'text-gray-200' : 'text-gray-700',
        this.hasHeader && this.padding !== 'none' ? 'pt-2' : '',
        this.hasActions && this.padding !== 'none' ? 'pb-2' : ''
      ];
    },

    actionsClasses() {
      return [
        'flex gap-2 items-center',
        this.padding !== 'none' ? 'pt-3' : '',
        this.theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
      ];
    }
  },

  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) return;
      
      if (this.clickable) {
        this.$emit('click', event);
      }
    }
  }
};
</script>

<style scoped>
.m-card {
  @apply transition-all duration-200 ease-in-out;
}

.m-card.cursor-pointer:hover {
  @apply transform -translate-y-0.5;
}

.m-card-header {
  @apply border-b border-gray-100 last:border-0;
}

.m-card.dark .m-card-header {
  @apply border-gray-700;
}

.m-card-title-section {
  @apply flex-1;
}

.m-card-actions {
  @apply flex-shrink-0;
}

.m-card-media {
  @apply relative;
}

.m-card-content {
  @apply flex-1;
}
</style>