<template>
  <div class="m-layout" :class="layoutClasses">
    <!-- Header -->
    <header v-if="showHeader" class="layout-header">
      <slot name="header">
        <MNavbar
          v-if="navbar"
          v-bind="navbar"
          @search="$emit('search', $event)"
          @action="$emit('action', $event)"
          @nav-click="$emit('nav-click', $event)"
        />
      </slot>
    </header>

    <!-- Main Content Area -->
    <div class="layout-main" :class="mainClasses">
      <!-- Sidebar -->
      <aside 
        v-if="showSidebar" 
        class="layout-sidebar" 
        :class="sidebarClasses"
      >
        <slot name="sidebar">
          <div class="sidebar-content">
            <nav class="sidebar-nav">
              <ul class="sidebar-menu">
                <li 
                  v-for="item in sidebarItems" 
                  :key="item.id"
                  class="sidebar-menu-item"
                  :class="{ 'active': item.active }"
                >
                  <a 
                    :href="item.href || '#'"
                    class="sidebar-menu-link"
                    @click="handleSidebarClick(item)"
                  >
                    <span v-if="item.icon" class="sidebar-menu-icon">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                        <path :d="getIconPath(item.icon)" />
                      </svg>
                    </span>
                    <span class="sidebar-menu-text">{{ item.label }}</span>
                    <span v-if="item.badge" class="sidebar-badge" :class="item.badge.variant">
                      {{ item.badge.text }}
                    </span>
                  </a>
                  
                  <!-- Submenu -->
                  <ul v-if="item.children && item.expanded" class="sidebar-submenu">
                    <li 
                      v-for="child in item.children" 
                      :key="child.id"
                      class="sidebar-submenu-item"
                    >
                      <a 
                        :href="child.href || '#'"
                        class="sidebar-submenu-link"
                        @click="handleSidebarClick(child)"
                      >
                        {{ child.label }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </slot>
      </aside>

      <!-- Content -->
      <main class="layout-content" :class="contentClasses">
        <!-- Breadcrumb -->
        <div v-if="showBreadcrumb && breadcrumbItems.length > 0" class="content-breadcrumb">
          <nav class="breadcrumb-nav">
            <ol class="breadcrumb-list">
              <li 
                v-for="(item, index) in breadcrumbItems" 
                :key="item.id || index"
                class="breadcrumb-item"
                :class="{ 'active': index === breadcrumbItems.length - 1 }"
              >
                <a 
                  v-if="index < breadcrumbItems.length - 1"
                  :href="item.href || '#'"
                  class="breadcrumb-link"
                  @click="handleBreadcrumbClick(item)"
                >
                  {{ item.label }}
                </a>
                <span v-else class="breadcrumb-current">{{ item.label }}</span>
                <svg 
                  v-if="index < breadcrumbItems.length - 1"
                  class="breadcrumb-separator"
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16"
                >
                  <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Page Header -->
        <div v-if="pageTitle || pageSubtitle || $slots.actions" class="content-header">
          <div class="content-header-main">
            <div class="content-header-text">
              <h1 v-if="pageTitle" class="page-title">{{ pageTitle }}</h1>
              <p v-if="pageSubtitle" class="page-subtitle">{{ pageSubtitle }}</p>
            </div>
            <div v-if="$slots.actions" class="content-header-actions">
              <slot name="actions"></slot>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="content-body">
          <slot></slot>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer v-if="showFooter" class="layout-footer">
      <slot name="footer">
        <div class="footer-content">
          <div class="footer-section">
            <p class="footer-text">{{ footerText || '© 2024 Financial Services. All rights reserved.' }}</p>
          </div>
        </div>
      </slot>
    </footer>

    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="showSidebar && sidebarMobileOpen"
      class="sidebar-overlay"
      @click="closeMobileSidebar"
    ></div>
  </div>
</template>

<script>
import MNavbar from './MNavbar.vue';

export default {
  name: 'MLayout',
  components: {
    MNavbar
  },
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'sidebar', 'dashboard', 'minimal'].includes(value)
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showSidebar: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showBreadcrumb: {
      type: Boolean,
      default: false
    },
    navbar: {
      type: Object,
      default: null
    },
    sidebarItems: {
      type: Array,
      default: () => []
    },
    breadcrumbItems: {
      type: Array,
      default: () => []
    },
    pageTitle: {
      type: String,
      default: ''
    },
    pageSubtitle: {
      type: String,
      default: ''
    },
    footerText: {
      type: String,
      default: ''
    },
    sidebarPosition: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    },
    sidebarWidth: {
      type: String,
      default: '256px'
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },

  emits: ['search', 'action', 'nav-click', 'sidebar-click', 'breadcrumb-click'],

  data() {
    return {
      sidebarMobileOpen: false
    };
  },

  computed: {
    layoutClasses() {
      return [
        `layout-${this.variant}`,
        {
          'layout-with-sidebar': this.showSidebar,
          'layout-sidebar-right': this.sidebarPosition === 'right',
          'layout-fluid': this.fluid
        }
      ];
    },

    mainClasses() {
      return {
        'with-sidebar': this.showSidebar,
        'sidebar-right': this.sidebarPosition === 'right'
      };
    },

    sidebarClasses() {
      return {
        'sidebar-right': this.sidebarPosition === 'right',
        'sidebar-mobile-open': this.sidebarMobileOpen
      };
    },

    contentClasses() {
      return {
        'with-sidebar': this.showSidebar,
        'sidebar-right': this.sidebarPosition === 'right',
        'fluid': this.fluid
      };
    }
  },

  methods: {
    handleSidebarClick(item) {
      this.$emit('sidebar-click', item);
    },

    handleBreadcrumbClick(item) {
      this.$emit('breadcrumb-click', item);
    },

    toggleMobileSidebar() {
      this.sidebarMobileOpen = !this.sidebarMobileOpen;
    },

    closeMobileSidebar() {
      this.sidebarMobileOpen = false;
    },

    getIconPath(iconName) {
      const icons = {
        dashboard: 'M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z',
        users: 'M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 14a4 4 0 118 0v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1z',
        settings: 'M10 2L8.09 0.09C7.7 -0.3 7.16 -0.3 6.77 0.09L4.86 2H2.5C1.12 2 0 3.12 0 4.5V17.5C0 18.88 1.12 20 2.5 20H17.5C18.88 20 20 18.88 20 17.5V4.5C20 3.12 18.88 2 17.5 2H15.14L13.23 0.09C12.84 -0.3 12.3 -0.3 11.91 0.09L10 2ZM10 15C7.24 15 5 12.76 5 10S7.24 5 10 5S15 7.24 15 10S12.76 15 10 15Z',
        analytics: 'M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z M12 2.252A8.014 8.014 0 0017.748 8H12V2.252z',
        documents: 'M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm2 3h8v1H6V5zm0 2h8v1H6V7zm0 2h5v1H6V9z'
      };
      return icons[iconName] || icons.dashboard;
    }
  }
};
</script>

<style scoped>
.m-layout {
  @apply min-h-screen flex flex-col;
}

.layout-header {
  @apply flex-shrink-0;
}

.layout-main {
  @apply flex flex-1;
}

.layout-main.with-sidebar {
  @apply relative;
}

/* Sidebar */
.layout-sidebar {
  @apply w-64 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block;
}

.layout-sidebar.sidebar-right {
  @apply border-r-0 border-l border-gray-200 order-2;
}

.layout-sidebar.sidebar-mobile-open {
  @apply block lg:block fixed lg:relative top-0 left-0 h-full z-50;
}

.sidebar-content {
  @apply p-4 h-full overflow-y-auto;
}

.sidebar-nav {
  @apply space-y-2;
}

.sidebar-menu {
  @apply list-none p-0 m-0 space-y-1;
}

.sidebar-menu-item {
  @apply relative;
}

.sidebar-menu-link {
  @apply flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 no-underline;
}

.sidebar-menu-item.active .sidebar-menu-link {
  @apply bg-blue-50 text-blue-700 font-medium;
}

.sidebar-menu-icon {
  @apply mr-3 flex-shrink-0 text-gray-400;
}

.sidebar-menu-item.active .sidebar-menu-icon {
  @apply text-blue-600;
}

.sidebar-menu-text {
  @apply flex-1;
}

.sidebar-badge {
  @apply ml-2 px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-600;
}

.sidebar-badge.primary {
  @apply bg-blue-100 text-blue-600;
}

.sidebar-badge.success {
  @apply bg-green-100 text-green-600;
}

.sidebar-badge.warning {
  @apply bg-yellow-100 text-yellow-600;
}

.sidebar-badge.danger {
  @apply bg-red-100 text-red-600;
}

.sidebar-submenu {
  @apply list-none p-0 m-0 ml-6 mt-1 space-y-1;
}

.sidebar-submenu-link {
  @apply block px-3 py-1 text-sm text-gray-600 rounded hover:bg-gray-50 no-underline;
}

.sidebar-overlay {
  @apply lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40;
}

/* Content */
.layout-content {
  @apply flex-1 flex flex-col;
}

.layout-content.with-sidebar {
  @apply lg:ml-0;
}

.layout-content.fluid {
  @apply px-0;
}

.content-breadcrumb {
  @apply px-6 py-4 bg-gray-50 border-b border-gray-200;
}

.breadcrumb-nav {
  @apply max-w-7xl mx-auto;
}

.layout-content.fluid .breadcrumb-nav {
  @apply max-w-none;
}

.breadcrumb-list {
  @apply flex items-center space-x-2 list-none p-0 m-0;
}

.breadcrumb-item {
  @apply flex items-center;
}

.breadcrumb-link {
  @apply text-gray-600 hover:text-gray-900 no-underline;
}

.breadcrumb-current {
  @apply text-gray-900 font-medium;
}

.breadcrumb-separator {
  @apply ml-2 text-gray-400;
}

.content-header {
  @apply px-6 py-6 bg-white border-b border-gray-200;
}

.content-header-main {
  @apply max-w-7xl mx-auto flex items-start justify-between;
}

.layout-content.fluid .content-header-main {
  @apply max-w-none;
}

.content-header-text {
  @apply flex-1;
}

.page-title {
  @apply text-2xl font-bold text-gray-900 mb-1;
}

.page-subtitle {
  @apply text-gray-600 m-0;
}

.content-header-actions {
  @apply ml-6 flex items-center space-x-3;
}

.content-body {
  @apply flex-1 px-6 py-6;
}

.content-body > * {
  @apply max-w-7xl mx-auto;
}

.layout-content.fluid .content-body > * {
  @apply max-w-none;
}

/* Footer */
.layout-footer {
  @apply bg-gray-50 border-t border-gray-200 mt-auto;
}

.footer-content {
  @apply max-w-7xl mx-auto px-6 py-4;
}

.layout-fluid .footer-content {
  @apply max-w-none;
}

.footer-section {
  @apply text-center;
}

.footer-text {
  @apply text-sm text-gray-600 m-0;
}

/* Layout Variants */
.layout-dashboard .layout-sidebar {
  @apply bg-gray-900 border-gray-700;
}

.layout-dashboard .sidebar-menu-link {
  @apply text-gray-300 hover:bg-gray-800;
}

.layout-dashboard .sidebar-menu-item.active .sidebar-menu-link {
  @apply bg-blue-600 text-white;
}

.layout-dashboard .sidebar-menu-icon {
  @apply text-gray-400;
}

.layout-dashboard .sidebar-menu-item.active .sidebar-menu-icon {
  @apply text-white;
}

.layout-minimal .layout-header,
.layout-minimal .layout-footer {
  @apply hidden;
}

.layout-minimal .content-header {
  @apply px-0 py-0 bg-transparent border-b-0;
}

.layout-minimal .content-body {
  @apply px-0 py-0;
}

/* Responsive */
@media (max-width: 1023px) {
  .layout-sidebar {
    @apply hidden;
  }
  
  .layout-sidebar.sidebar-mobile-open {
    @apply block;
  }
  
  .content-header-main {
    @apply flex-col items-start space-y-4;
  }
  
  .content-header-actions {
    @apply ml-0 w-full;
  }
}
</style>