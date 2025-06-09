<template>
  <div class="m-layout" :class="layoutClasses">
    <!-- App Bar -->
    <header v-if="hasAppBar" class="m-layout-app-bar" :class="appBarClasses">
      <slot name="app-bar">
        <div class="flex items-center justify-between h-full px-4">
          <!-- Navigation Toggle (Mobile) -->
          <button
            v-if="drawer && !permanent"
            @click="toggleDrawer"
            class="p-2 rounded-md hover:bg-black hover:bg-opacity-10 md:hidden"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- App Title -->
          <div class="flex items-center">
            <slot name="app-title">
              <h1 v-if="appTitle" class="text-xl font-semibold">{{ appTitle }}</h1>
            </slot>
          </div>

          <!-- App Bar Actions -->
          <div class="flex items-center space-x-2">
            <slot name="app-bar-actions"></slot>
          </div>
        </div>
      </slot>
    </header>

    <div class="m-layout-body" :class="bodyClasses">
      <!-- Navigation Drawer -->
      <aside 
        v-if="drawer" 
        class="m-layout-drawer" 
        :class="drawerClasses"
        @click="handleDrawerClick"
      >
        <slot name="drawer">
          <nav class="p-4">
            <slot name="navigation"></slot>
          </nav>
        </slot>
      </aside>

      <!-- Drawer Overlay (Mobile) -->
      <div 
        v-if="drawer && !permanent && drawerOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        @click="closeDrawer"
      ></div>

      <!-- Main Content -->
      <main class="m-layout-main" :class="mainClasses">
        <div v-if="hasToolbar" class="m-layout-toolbar" :class="toolbarClasses">
          <slot name="toolbar"></slot>
        </div>
        
        <div class="m-layout-content" :class="contentClasses">
          <slot></slot>
        </div>
      </main>
    </div>

    <!-- Footer -->
    <footer v-if="hasFooter" class="m-layout-footer" :class="footerClasses">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'MLayout',
  
  props: {
    appTitle: {
      type: String,
      default: ''
    },
    drawer: {
      type: Boolean,
      default: false
    },
    drawerWidth: {
      type: String,
      default: '256px'
    },
    permanent: {
      type: Boolean,
      default: false
    },
    appBarHeight: {
      type: String,
      default: '64px'
    },
    footerHeight: {
      type: String,
      default: 'auto'
    },
    theme: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark'].includes(value)
    },
    fluid: {
      type: Boolean,
      default: false
    },
    clipped: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      drawerOpen: false
    };
  },

  computed: {
    hasAppBar() {
      return this.$slots['app-bar'] || this.$slots['app-title'] || this.$slots['app-bar-actions'] || this.appTitle;
    },

    hasToolbar() {
      return this.$slots.toolbar;
    },

    hasFooter() {
      return this.$slots.footer;
    },

    layoutClasses() {
      return [
        'h-screen flex flex-col',
        {
          'dark': this.theme === 'dark'
        }
      ];
    },

    appBarClasses() {
      return [
        'flex-shrink-0 shadow-sm z-50',
        this.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
        this.clipped ? 'relative' : 'relative'
      ];
    },

    bodyClasses() {
      return [
        'flex flex-1 overflow-hidden'
      ];
    },

    drawerClasses() {
      const baseClasses = [
        'flex-shrink-0 transition-transform duration-300 ease-in-out z-50',
        this.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      ];

      if (this.permanent) {
        baseClasses.push('relative');
      } else {
        baseClasses.push(
          'fixed inset-y-0 left-0 md:relative md:translate-x-0',
          this.drawerOpen ? 'translate-x-0' : '-translate-x-full'
        );
      }

      if (!this.permanent && !this.clipped) {
        baseClasses.push('border-r border-gray-200');
      }

      return baseClasses;
    },

    mainClasses() {
      return [
        'flex-1 flex flex-col overflow-hidden',
        this.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      ];
    },

    toolbarClasses() {
      return [
        'flex-shrink-0 px-4 py-3 border-b',
        this.theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      ];
    },

    contentClasses() {
      return [
        'flex-1 overflow-auto',
        this.fluid ? '' : 'container mx-auto',
        'p-4 md:p-6'
      ];
    },

    footerClasses() {
      return [
        'flex-shrink-0 border-t',
        this.theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      ];
    }
  },

  mounted() {
    // Set initial drawer state based on screen size and permanent prop
    this.updateDrawerState();
    window.addEventListener('resize', this.updateDrawerState);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateDrawerState);
  },

  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
      this.$emit('drawer-toggle', this.drawerOpen);
    },

    closeDrawer() {
      this.drawerOpen = false;
      this.$emit('drawer-close');
    },

    openDrawer() {
      this.drawerOpen = true;
      this.$emit('drawer-open');
    },

    handleDrawerClick(event) {
      // Don't close drawer when clicking inside it on mobile
      event.stopPropagation();
    },

    updateDrawerState() {
      const isMobile = window.innerWidth < 768;
      
      if (this.permanent && !isMobile) {
        this.drawerOpen = true;
      } else if (isMobile) {
        this.drawerOpen = false;
      }
    }
  },

  watch: {
    permanent: {
      handler(newVal) {
        if (newVal) {
          this.updateDrawerState();
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.m-layout-drawer {
  width: v-bind('drawerWidth');
}

.m-layout-app-bar {
  height: v-bind('appBarHeight');
}

.m-layout-footer {
  height: v-bind('footerHeight');
}

@media (max-width: 768px) {
  .m-layout-drawer {
    width: 280px;
  }
}
</style>