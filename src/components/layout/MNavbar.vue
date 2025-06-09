<template>
  <nav class="m-navbar" :class="navbarClasses">
    <div class="navbar-container" :class="containerClasses">
      <!-- Brand/Logo Section -->
      <div class="navbar-brand">
        <router-link v-if="brand.to" :to="brand.to" class="brand-link">
          <img v-if="brand.logo" :src="brand.logo" :alt="brand.alt" class="brand-logo" />
          <span v-if="brand.text" class="brand-text">{{ brand.text }}</span>
        </router-link>
        <div v-else class="brand-link">
          <img v-if="brand.logo" :src="brand.logo" :alt="brand.alt" class="brand-logo" />
          <span v-if="brand.text" class="brand-text">{{ brand.text }}</span>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        v-if="showMobileToggle"
        @click="toggleMobileMenu"
        class="mobile-toggle"
        :class="{ 'active': mobileMenuOpen }"
        aria-label="Toggle navigation menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>

      <!-- Navigation Items -->
      <div class="navbar-nav" :class="{ 'mobile-open': mobileMenuOpen }">
        <!-- Primary Navigation -->
        <ul class="nav-list primary-nav">
          <li
            v-for="item in navigationItems"
            :key="item.id"
            class="nav-item"
            :class="getNavItemClasses(item)"
          >
            <!-- Dropdown Menu -->
            <div v-if="item.children" class="nav-dropdown">
              <button
                @click="toggleDropdown(item.id)"
                class="nav-link dropdown-toggle"
                :class="{ 'active': activeDropdown === item.id }"
                :aria-expanded="activeDropdown === item.id"
              >
                <span>{{ item.label }}</span>
                <svg class="dropdown-icon" :class="{ 'rotated': activeDropdown === item.id }" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              
              <div
                v-show="activeDropdown === item.id"
                class="dropdown-menu"
                @click="closeDropdown"
              >
                <div class="dropdown-content">
                  <div v-for="child in item.children" :key="child.id" class="dropdown-item">
                    <a
                      :href="child.href || '#'"
                      class="dropdown-link"
                      @click="handleNavClick(child)"
                    >
                      <div class="dropdown-item-content">
                        <div class="dropdown-item-header">
                          <span class="dropdown-item-title">{{ child.label }}</span>
                          <span v-if="child.badge" class="dropdown-badge" :class="child.badge.variant">
                            {{ child.badge.text }}
                          </span>
                        </div>
                        <p v-if="child.description" class="dropdown-item-description">
                          {{ child.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Regular Link -->
            <a
              v-else
              :href="item.href || '#'"
              class="nav-link"
              :class="{ 'active': isActive(item) }"
              @click="handleNavClick(item)"
            >
              {{ item.label }}
              <span v-if="item.badge" class="nav-badge" :class="item.badge.variant">
                {{ item.badge.text }}
              </span>
            </a>
          </li>
        </ul>

        <!-- Action Items -->
        <div v-if="actionItems.length > 0" class="navbar-actions">
          <div
            v-for="action in actionItems"
            :key="action.id"
            class="action-item"
          >
            <!-- Search -->
            <div v-if="action.type === 'search'" class="search-container">
              <div class="search-input-wrapper">
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="action.placeholder || 'Search...'"
                  class="search-input"
                  @focus="searchFocused = true"
                  @blur="searchFocused = false"
                  @input="handleSearch"
                />
                <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20">
                  <path d="M19 19l-3.5-3.5M8 15A7 7 0 108 1a7 7 0 000 14z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              
              <div v-if="searchFocused && searchResults.length > 0" class="search-results">
                <div
                  v-for="result in searchResults"
                  :key="result.id"
                  class="search-result-item"
                  @click="selectSearchResult(result)"
                >
                  {{ result.title }}
                </div>
              </div>
            </div>

            <!-- Button -->
            <button
              v-else-if="action.type === 'button'"
              @click="handleAction(action)"
              class="action-button"
              :class="action.variant || 'primary'"
            >
              {{ action.label }}
            </button>

            <!-- User Menu -->
            <div v-else-if="action.type === 'user'" class="user-menu">
              <button
                @click="toggleUserMenu"
                class="user-button"
                :class="{ 'active': userMenuOpen }"
              >
                <img
                  v-if="action.avatar"
                  :src="action.avatar"
                  :alt="action.name"
                  class="user-avatar"
                />
                <div v-else class="user-avatar-placeholder">
                  {{ action.name?.charAt(0) || 'U' }}
                </div>
                <span v-if="action.showName" class="user-name">{{ action.name }}</span>
                <svg class="user-dropdown-icon" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>

              <div v-show="userMenuOpen" class="user-dropdown" @click="closeUserMenu">
                <div class="user-dropdown-content">
                  <div class="user-info">
                    <div class="user-info-name">{{ action.name }}</div>
                    <div v-if="action.email" class="user-info-email">{{ action.email }}</div>
                  </div>
                  <div class="user-menu-divider"></div>
                  <div
                    v-for="menuItem in action.menuItems"
                    :key="menuItem.id"
                    class="user-menu-item"
                  >
                    <button
                      @click="handleAction(menuItem)"
                      class="user-menu-link"
                    >
                      {{ menuItem.label }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Overlay -->
    <div
      v-if="mobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

<script>
export default {
  name: 'MNavbar',
  props: {
    brand: {
      type: Object,
      default: () => ({})
    },
    navigationItems: {
      type: Array,
      default: () => []
    },
    actionItems: {
      type: Array,
      default: () => []
    },
    variant: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark', 'transparent'].includes(value)
    },
    fixed: {
      type: Boolean,
      default: false
    },
    fluid: {
      type: Boolean,
      default: false
    },
    showMobileToggle: {
      type: Boolean,
      default: true
    }
  },

  emits: ['search', 'action', 'nav-click'],

  data() {
    return {
      mobileMenuOpen: false,
      activeDropdown: null,
      userMenuOpen: false,
      searchQuery: '',
      searchFocused: false,
      searchResults: []
    };
  },

  computed: {
    navbarClasses() {
      return [
        `navbar-${this.variant}`,
        {
          'navbar-fixed': this.fixed,
          'navbar-fluid': this.fluid
        }
      ];
    },

    containerClasses() {
      return {
        'container-fluid': this.fluid,
        'container': !this.fluid
      };
    }
  },

  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },

    closeMobileMenu() {
      this.mobileMenuOpen = false;
    },

    toggleDropdown(itemId) {
      this.activeDropdown = this.activeDropdown === itemId ? null : itemId;
    },

    closeDropdown() {
      this.activeDropdown = null;
    },

    toggleUserMenu() {
      this.userMenuOpen = !this.userMenuOpen;
    },

    closeUserMenu() {
      this.userMenuOpen = false;
    },

    isActive(item) {
      return false; // Simplified for demo
    },

    getNavItemClasses(item) {
      return {
        'has-dropdown': item.children,
        'dropdown-open': this.activeDropdown === item.id
      };
    },

    handleSearch() {
      this.$emit('search', this.searchQuery);
      
      if (this.searchQuery.length > 2) {
        this.searchResults = [
          { id: 1, title: `Search result for "${this.searchQuery}"` },
          { id: 2, title: `Another result for "${this.searchQuery}"` }
        ];
      } else {
        this.searchResults = [];
      }
    },

    selectSearchResult(result) {
      this.searchQuery = result.title;
      this.searchResults = [];
      this.searchFocused = false;
      this.$emit('search', result);
    },

    handleAction(action) {
      this.$emit('action', action);
    },

    handleNavClick(item) {
      this.$emit('nav-click', item);
    }
  }
};
</script>

<style scoped>
.m-navbar {
  @apply bg-white border-b border-gray-200 sticky top-0 z-50;
}

.navbar-dark {
  @apply bg-gray-900 border-gray-700;
}

.navbar-transparent {
  @apply bg-transparent border-transparent;
}

.navbar-fixed {
  @apply fixed top-0 left-0 right-0;
}

.navbar-container {
  @apply px-4 py-3 flex items-center justify-between;
}

.container {
  @apply max-w-7xl mx-auto;
}

.container-fluid {
  @apply w-full;
}

/* Brand */
.navbar-brand {
  @apply flex items-center;
}

.brand-link {
  @apply flex items-center space-x-3 text-xl font-bold text-gray-900 no-underline;
}

.navbar-dark .brand-link {
  @apply text-white;
}

.brand-logo {
  @apply h-8 w-auto;
}

/* Mobile Toggle */
.mobile-toggle {
  @apply lg:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer;
}

.hamburger-line {
  @apply w-6 h-0.5 bg-gray-600 mb-1 transition-all duration-300;
}

.navbar-dark .hamburger-line {
  @apply bg-gray-300;
}

.mobile-toggle.active .hamburger-line:nth-child(1) {
  @apply transform rotate-45 translate-y-1.5;
}

.mobile-toggle.active .hamburger-line:nth-child(2) {
  @apply opacity-0;
}

.mobile-toggle.active .hamburger-line:nth-child(3) {
  @apply transform -rotate-45 -translate-y-1.5;
}

/* Navigation */
.navbar-nav {
  @apply hidden lg:flex items-center justify-between flex-1 ml-8;
}

.navbar-nav.mobile-open {
  @apply flex lg:flex fixed lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto h-screen lg:h-auto bg-white lg:bg-transparent flex-col lg:flex-row p-6 lg:p-0 shadow-lg lg:shadow-none;
}

.navbar-dark .navbar-nav.mobile-open {
  @apply bg-gray-900;
}

.nav-list {
  @apply flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-6 list-none m-0 p-0;
}

.primary-nav {
  @apply flex-1;
}

.nav-item {
  @apply relative;
}

.nav-link {
  @apply flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 no-underline transition-colors duration-200;
}

.navbar-dark .nav-link {
  @apply text-gray-300 hover:text-blue-400;
}

.nav-link.active {
  @apply text-blue-600 font-medium;
}

.navbar-dark .nav-link.active {
  @apply text-blue-400;
}

.nav-badge {
  @apply ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600;
}

.nav-badge.success {
  @apply bg-green-100 text-green-600;
}

.nav-badge.warning {
  @apply bg-yellow-100 text-yellow-600;
}

.nav-badge.danger {
  @apply bg-red-100 text-red-600;
}

/* Dropdown */
.nav-dropdown {
  @apply relative;
}

.dropdown-toggle {
  @apply flex items-center space-x-1;
}

.dropdown-icon {
  @apply transition-transform duration-200;
}

.dropdown-icon.rotated {
  @apply transform rotate-180;
}

.dropdown-menu {
  @apply absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50;
}

.navbar-dark .dropdown-menu {
  @apply bg-gray-800 border-gray-700;
}

.dropdown-content {
  @apply p-4;
}

.dropdown-item {
  @apply mb-2 last:mb-0;
}

.dropdown-link {
  @apply block p-3 rounded-lg hover:bg-gray-50 no-underline transition-colors duration-200;
}

.navbar-dark .dropdown-link {
  @apply hover:bg-gray-700;
}

.dropdown-item-content {
  @apply space-y-1;
}

.dropdown-item-header {
  @apply flex items-center justify-between;
}

.dropdown-item-title {
  @apply font-medium text-gray-900;
}

.navbar-dark .dropdown-item-title {
  @apply text-white;
}

.dropdown-item-description {
  @apply text-sm text-gray-600 m-0;
}

.navbar-dark .dropdown-item-description {
  @apply text-gray-400;
}

.dropdown-badge {
  @apply px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-600;
}

/* Actions */
.navbar-actions {
  @apply flex items-center space-x-4;
}

.action-item {
  @apply relative;
}

/* Search */
.search-container {
  @apply relative;
}

.search-input-wrapper {
  @apply relative;
}

.search-input {
  @apply w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400;
}

.search-results {
  @apply absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50;
}

.search-result-item {
  @apply p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0;
}

/* Action Button */
.action-button {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-200;
}

.action-button.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}

.action-button.secondary {
  @apply bg-gray-200 text-gray-900 hover:bg-gray-300;
}

.action-button.outline {
  @apply border border-gray-300 text-gray-700 hover:bg-gray-50;
}

/* User Menu */
.user-menu {
  @apply relative;
}

.user-button {
  @apply flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200;
}

.navbar-dark .user-button {
  @apply hover:bg-gray-800;
}

.user-avatar {
  @apply w-8 h-8 rounded-full object-cover;
}

.user-avatar-placeholder {
  @apply w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium;
}

.user-name {
  @apply text-sm font-medium text-gray-700;
}

.navbar-dark .user-name {
  @apply text-gray-300;
}

.user-dropdown-icon {
  @apply text-gray-400;
}

.user-dropdown {
  @apply absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50;
}

.navbar-dark .user-dropdown {
  @apply bg-gray-800 border-gray-700;
}

.user-dropdown-content {
  @apply p-4;
}

.user-info {
  @apply mb-3;
}

.user-info-name {
  @apply font-medium text-gray-900;
}

.navbar-dark .user-info-name {
  @apply text-white;
}

.user-info-email {
  @apply text-sm text-gray-600;
}

.navbar-dark .user-info-email {
  @apply text-gray-400;
}

.user-menu-divider {
  @apply border-t border-gray-200 my-3;
}

.navbar-dark .user-menu-divider {
  @apply border-gray-700;
}

.user-menu-item {
  @apply mb-1 last:mb-0;
}

.user-menu-link {
  @apply block w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-100 rounded no-underline transition-colors duration-200;
}

.navbar-dark .user-menu-link {
  @apply text-gray-300 hover:bg-gray-700;
}

/* Mobile Overlay */
.mobile-overlay {
  @apply lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40;
}

/* Responsive */
@media (max-width: 1023px) {
  .search-input {
    @apply w-full;
  }
  
  .navbar-actions {
    @apply flex-col space-x-0 space-y-4 w-full mt-6;
  }
  
  .action-item {
    @apply w-full;
  }
  
  .action-button {
    @apply w-full justify-center;
  }
}
</style>