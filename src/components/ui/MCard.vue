<template>
  <div class="m-card" :class="cardClasses">
    <!-- Card Header -->
    <div v-if="$slots.header || title || subtitle" class="card-header" :class="headerClasses">
      <slot name="header">
        <div class="card-header-content">
          <div class="card-header-text">
            <h3 v-if="title" class="card-title">{{ title }}</h3>
            <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
          </div>
          <div v-if="$slots.actions" class="card-header-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </slot>
    </div>

    <!-- Card Body -->
    <div class="card-body" :class="bodyClasses">
      <slot></slot>
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="card-footer" :class="footerClasses">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'elevated', 'outlined', 'flat'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    padding: {
      type: String,
      default: 'normal',
      validator: value => ['none', 'small', 'normal', 'large'].includes(value)
    },
    clickable: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  emits: ['click'],

  computed: {
    cardClasses() {
      return [
        `card-${this.variant}`,
        `card-${this.size}`,
        {
          'card-clickable': this.clickable,
          'card-loading': this.loading
        }
      ];
    },

    headerClasses() {
      return [`card-header-${this.padding}`];
    },

    bodyClasses() {
      return [`card-body-${this.padding}`];
    },

    footerClasses() {
      return [`card-footer-${this.padding}`];
    }
  },

  methods: {
    handleClick(event) {
      if (this.clickable) {
        this.$emit('click', event);
      }
    }
  }
};
</script>

<style scoped>
.m-card {
  @apply bg-white rounded-lg overflow-hidden transition-all duration-200;
}

.card-default {
  @apply border border-gray-200;
}

.card-elevated {
  @apply shadow-lg border-0;
}

.card-outlined {
  @apply border-2 border-gray-300;
}

.card-flat {
  @apply border-0 shadow-none;
}

.card-clickable {
  @apply cursor-pointer hover:shadow-lg;
}

.card-loading {
  @apply opacity-50 pointer-events-none;
}

/* Sizes */
.card-small {
  @apply text-sm;
}

.card-medium {
  @apply text-base;
}

.card-large {
  @apply text-lg;
}

/* Header */
.card-header {
  @apply border-b border-gray-200 bg-gray-50;
}

.card-header-content {
  @apply flex items-start justify-between;
}

.card-header-text {
  @apply flex-1;
}

.card-title {
  @apply text-lg font-semibold text-gray-900 m-0;
}

.card-subtitle {
  @apply text-sm text-gray-600 mt-1 m-0;
}

.card-header-actions {
  @apply ml-4 flex items-center space-x-2;
}

/* Body */
.card-body {
  @apply flex-1;
}

/* Footer */
.card-footer {
  @apply border-t border-gray-200 bg-gray-50;
}

/* Padding variants */
.card-header-none, .card-body-none, .card-footer-none {
  @apply p-0;
}

.card-header-small, .card-body-small, .card-footer-small {
  @apply p-3;
}

.card-header-normal, .card-body-normal, .card-footer-normal {
  @apply p-6;
}

.card-header-large, .card-body-large, .card-footer-large {
  @apply p-8;
}
</style>