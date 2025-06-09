import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    // Theme settings
    theme: 'light',
    
    // Layout settings
    drawerOpen: false,
    drawerPermanent: false,
    
    // Loading states
    loading: false,
    loadingMessage: '',
    
    // Notifications/Toasts
    notifications: [],
    
    // Modal/Dialog states
    activeModal: null,
    modalProps: {},
    
    // Form states
    formErrors: {},
    formTouched: {},
    
    // Progress indicators
    progressStates: {},
    
    // Responsive breakpoints
    screenSize: 'md',
    isMobile: false,
    
    // Component states
    componentStates: {}
  }),

  getters: {
    /**
     * Get current theme mode
     */
    isDarkMode: (state) => state.theme === 'dark',
    
    /**
     * Get active notifications
     */
    activeNotifications: (state) => state.notifications.filter(n => !n.dismissed),
    
    /**
     * Check if any loading state is active
     */
    isLoading: (state) => state.loading || Object.values(state.progressStates).some(p => p.loading),
    
    /**
     * Get form errors for a specific form
     */
    getFormErrors: (state) => (formId) => state.formErrors[formId] || {},
    
    /**
     * Check if form field has been touched
     */
    isFieldTouched: (state) => (formId, fieldName) => {
      return state.formTouched[formId]?.[fieldName] || false;
    },
    
    /**
     * Get component state by ID
     */
    getComponentState: (state) => (componentId) => state.componentStates[componentId] || {},
    
    /**
     * Check if drawer should be shown based on screen size and settings
     */
    shouldShowDrawer: (state) => {
      if (state.isMobile) {
        return state.drawerOpen;
      }
      return state.drawerPermanent || state.drawerOpen;
    }
  },

  actions: {
    /**
     * Toggle theme between light and dark
     */
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.persistTheme();
    },
    
    /**
     * Set specific theme
     */
    setTheme(theme) {
      this.theme = theme;
      this.persistTheme();
    },
    
    /**
     * Persist theme to localStorage
     */
    persistTheme() {
      if (typeof window !== 'undefined') {
        localStorage.setItem('ui-theme', this.theme);
        document.documentElement.classList.toggle('dark', this.theme === 'dark');
      }
    },
    
    /**
     * Initialize theme from localStorage
     */
    initializeTheme() {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('ui-theme');
        if (savedTheme) {
          this.theme = savedTheme;
        } else {
          // Check system preference
          this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        this.persistTheme();
      }
    },
    
    /**
     * Toggle drawer open/closed
     */
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    
    /**
     * Set drawer state
     */
    setDrawerOpen(open) {
      this.drawerOpen = open;
    },
    
    /**
     * Set drawer permanent state
     */
    setDrawerPermanent(permanent) {
      this.drawerPermanent = permanent;
    },
    
    /**
     * Set global loading state
     */
    setLoading(loading, message = '') {
      this.loading = loading;
      this.loadingMessage = message;
    },
    
    /**
     * Set component-specific loading state
     */
    setComponentLoading(componentId, loading, message = '') {
      if (!this.progressStates[componentId]) {
        this.progressStates[componentId] = {};
      }
      this.progressStates[componentId].loading = loading;
      this.progressStates[componentId].message = message;
    },
    
    /**
     * Add notification
     */
    addNotification(notification) {
      const id = Date.now() + Math.random();
      const newNotification = {
        id,
        type: 'info',
        title: '',
        message: '',
        timeout: 5000,
        dismissible: true,
        dismissed: false,
        ...notification
      };
      
      this.notifications.push(newNotification);
      
      // Auto-dismiss if timeout is set
      if (newNotification.timeout > 0) {
        setTimeout(() => {
          this.dismissNotification(id);
        }, newNotification.timeout);
      }
      
      return id;
    },
    
    /**
     * Dismiss notification
     */
    dismissNotification(id) {
      const notification = this.notifications.find(n => n.id === id);
      if (notification) {
        notification.dismissed = true;
      }
    },
    
    /**
     * Clear all notifications
     */
    clearNotifications() {
      this.notifications = [];
    },
    
    /**
     * Show modal
     */
    showModal(modalName, props = {}) {
      this.activeModal = modalName;
      this.modalProps = props;
    },
    
    /**
     * Hide modal
     */
    hideModal() {
      this.activeModal = null;
      this.modalProps = {};
    },
    
    /**
     * Set form errors
     */
    setFormErrors(formId, errors) {
      this.formErrors[formId] = errors;
    },
    
    /**
     * Clear form errors
     */
    clearFormErrors(formId) {
      delete this.formErrors[formId];
    },
    
    /**
     * Set field as touched
     */
    setFieldTouched(formId, fieldName, touched = true) {
      if (!this.formTouched[formId]) {
        this.formTouched[formId] = {};
      }
      this.formTouched[formId][fieldName] = touched;
    },
    
    /**
     * Clear all touched fields for a form
     */
    clearFormTouched(formId) {
      delete this.formTouched[formId];
    },
    
    /**
     * Update screen size and mobile state
     */
    updateScreenSize() {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        
        if (width < 640) {
          this.screenSize = 'sm';
          this.isMobile = true;
        } else if (width < 768) {
          this.screenSize = 'md';
          this.isMobile = true;
        } else if (width < 1024) {
          this.screenSize = 'lg';
          this.isMobile = false;
        } else if (width < 1280) {
          this.screenSize = 'xl';
          this.isMobile = false;
        } else {
          this.screenSize = '2xl';
          this.isMobile = false;
        }
        
        // Auto-adjust drawer on screen size change
        if (this.isMobile && this.drawerPermanent) {
          this.drawerOpen = false;
        }
      }
    },
    
    /**
     * Set component state
     */
    setComponentState(componentId, state) {
      this.componentStates[componentId] = {
        ...this.componentStates[componentId],
        ...state
      };
    },
    
    /**
     * Clear component state
     */
    clearComponentState(componentId) {
      delete this.componentStates[componentId];
    },
    
    /**
     * Initialize UI store
     */
    initialize() {
      this.initializeTheme();
      this.updateScreenSize();
      
      if (typeof window !== 'undefined') {
        window.addEventListener('resize', this.updateScreenSize);
      }
    },
    
    /**
     * Cleanup UI store
     */
    cleanup() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.updateScreenSize);
      }
    }
  }
});