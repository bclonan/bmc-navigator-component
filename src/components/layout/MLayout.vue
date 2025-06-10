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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  flex-shrink: 0;
}

.layout-main {
  display: flex;
  flex: 1;
}

.layout-main.with-sidebar {
  position: relative;
}

/* Sidebar */
.layout-sidebar {
  width: 16rem;
  background-color: white;
  border-right: 1px solid rgb(229 231 235);
  flex-shrink: 0;
  display: none;
}

@media (min-width: 1024px) {
  .layout-sidebar {
    display: block;
  }
}

.layout-sidebar.sidebar-right {
  border-right: none;
  border-left: 1px solid rgb(229 231 235);
  order: 2;
}

.layout-sidebar.sidebar-mobile-open {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 50;
}

@media (min-width: 1024px) {
  .layout-sidebar.sidebar-mobile-open {
    position: relative;
  }
}

.sidebar-content {
  padding: 1rem;
  height: 100%;
  overflow-y: auto;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-menu-item {
  position: relative;
}

.sidebar-menu-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  color: rgb(55 65 81);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.sidebar-menu-link:hover {
  background-color: rgb(243 244 246);
}

.sidebar-menu-item.active .sidebar-menu-link {
  background-color: rgb(239 246 255);
  color: rgb(29 78 216);
  font-weight: 500;
}

.sidebar-menu-icon {
  margin-right: 0.75rem;
  flex-shrink: 0;
  color: rgb(156 163 175);
}

.sidebar-menu-item.active .sidebar-menu-icon {
  color: rgb(37 99 235);
}

.sidebar-menu-text {
  flex: 1;
}

.sidebar-badge {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 9999px;
  background-color: rgb(229 231 235);
  color: rgb(75 85 99);
}

.sidebar-badge.primary {
  background-color: rgb(219 234 254);
  color: rgb(37 99 235);
}

.sidebar-badge.success {
  background-color: rgb(220 252 231);
  color: rgb(22 163 74);
}

.sidebar-badge.warning {
  background-color: rgb(254 249 195);
  color: rgb(161 98 7);
}

.sidebar-badge.danger {
  background-color: rgb(254 226 226);
  color: rgb(220 38 38);
}

.sidebar-submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: 1.5rem;
  margin-top: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-submenu-link {
  display: block;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  color: rgb(75 85 99);
  border-radius: 0.25rem;
  text-decoration: none;
}

.sidebar-submenu-link:hover {
  background-color: rgb(249 250 251);
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

@media (min-width: 1024px) {
  .sidebar-overlay {
    display: none;
  }
}

/* Content */
.layout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.layout-content.with-sidebar {
  margin-left: 0;
}

@media (min-width: 1024px) {
  .layout-content.with-sidebar {
    margin-left: 0;
  }
}

.layout-content.fluid {
  padding-left: 0;
  padding-right: 0;
}

.content-breadcrumb {
  padding: 1rem 1.5rem;
  background-color: rgb(249 250 251);
  border-bottom: 1px solid rgb(229 231 235);
}

.breadcrumb-nav {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.layout-content.fluid .breadcrumb-nav {
  max-width: none;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: rgb(75 85 99);
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: rgb(17 24 39);
}

.breadcrumb-current {
  color: rgb(17 24 39);
  font-weight: 500;
}

.breadcrumb-separator {
  margin-left: 0.5rem;
  color: rgb(156 163 175);
}

.content-header {
  padding: 1.5rem;
  background-color: white;
  border-bottom: 1px solid rgb(229 231 235);
}

.content-header-main {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.layout-content.fluid .content-header-main {
  max-width: none;
}

.content-header-text {
  flex: 1;
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: rgb(17 24 39);
  margin-bottom: 0.25rem;
}

.page-subtitle {
  color: rgb(75 85 99);
  margin: 0;
}

.content-header-actions {
  margin-left: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.content-body {
  flex: 1;
  padding: 1.5rem;
}

.content-body > * {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.layout-content.fluid .content-body > * {
  max-width: none;
}

/* Footer */
.layout-footer {
  background-color: rgb(249 250 251);
  border-top: 1px solid rgb(229 231 235);
  margin-top: auto;
}

.footer-content {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 1.5rem;
}

.layout-fluid .footer-content {
  max-width: none;
}

.footer-section {
  text-align: center;
}

.footer-text {
  font-size: 0.875rem;
  color: rgb(75 85 99);
  margin: 0;
}

/* Layout Variants */
.layout-dashboard .layout-sidebar {
  background-color: rgb(17 24 39);
  border-color: rgb(55 65 81);
}

.layout-dashboard .sidebar-menu-link {
  color: rgb(209 213 219);
}

.layout-dashboard .sidebar-menu-link:hover {
  background-color: rgb(31 41 55);
}

.layout-dashboard .sidebar-menu-item.active .sidebar-menu-link {
  background-color: rgb(37 99 235);
  color: white;
}

.layout-dashboard .sidebar-menu-icon {
  color: rgb(156 163 175);
}

.layout-dashboard .sidebar-menu-item.active .sidebar-menu-icon {
  color: white;
}

.layout-minimal .layout-header,
.layout-minimal .layout-footer {
  display: none;
}

.layout-minimal .content-header {
  padding: 0;
  background-color: transparent;
  border-bottom: none;
}

.layout-minimal .content-body {
  padding: 0;
}

/* Responsive */
@media (max-width: 1023px) {
  .layout-sidebar {
    display: none;
  }
  
  .layout-sidebar.sidebar-mobile-open {
    display: block;
  }
  
  .content-header-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .content-header-actions {
    margin-left: 0;
    width: 100%;
  }
}
</style>