import { ref, reactive, computed, watch } from 'vue';
import yourtownfinanceFinanceTheme from '../themes/your-town-finance.js';

// Global theme state with Your Town Finance brand colors as default
const themeState = reactive({
  currentTheme: {
    colors: {
      primary: 'rgb(56, 96, 190)', // Your Town Finance matt-blue
      secondary: 'rgb(1, 52, 116)', // Your Town Finance tardis-blue
      success: 'rgb(50, 174, 136)', // Your Town Finance herbal green
      warning: 'rgb(255, 188, 35)', // Your Town Finance warning yellow
      danger: '#ef4444',
      background: 'rgb(255, 255, 255)' // Your Town Finance white
    },
    typography: {
      fontFamily: 'Muli, sans-serif', // Your Town Finance brand font
      fontSize: 16,
      lineHeight: 1.5,
      letterSpacing: 0
    },
    spacing: {
      base: 4,
      borderRadius: 8,
      padding: 16
    },
    components: {
      buttonStyle: 'rounded',
      cardShadow: 'medium',
      inputStyle: 'outlined'
    }
  },
  savedThemes: [],
  preferences: {
    autoSave: true,
    syncAcrossDevices: false,
    darkModePreference: 'system' // 'light', 'dark', 'system'
  }
});

// Load saved themes from localStorage
function loadSavedThemes() {
  try {
    const saved = localStorage.getItem('savedThemes');
    if (saved) {
      themeState.savedThemes = JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load saved themes:', error);
  }
}

// Load user preferences
function loadPreferences() {
  try {
    const preferences = localStorage.getItem('themePreferences');
    if (preferences) {
      Object.assign(themeState.preferences, JSON.parse(preferences));
    }
  } catch (error) {
    console.warn('Failed to load theme preferences:', error);
  }
}

// Save preferences to localStorage
function savePreferences() {
  try {
    localStorage.setItem('themePreferences', JSON.stringify(themeState.preferences));
  } catch (error) {
    console.warn('Failed to save theme preferences:', error);
  }
}

// Apply theme to document
function applyThemeToDocument(theme) {
  const root = document.documentElement;
  
  // Apply CSS custom properties
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-${key}`, value);
  });
  
  root.style.setProperty('--theme-font-family', theme.typography.fontFamily);
  root.style.setProperty('--theme-font-size', `${theme.typography.fontSize}px`);
  root.style.setProperty('--theme-line-height', theme.typography.lineHeight);
  root.style.setProperty('--theme-letter-spacing', `${theme.typography.letterSpacing}em`);
  
  root.style.setProperty('--theme-spacing-base', `${theme.spacing.base}px`);
  root.style.setProperty('--theme-border-radius', `${theme.spacing.borderRadius}px`);
  root.style.setProperty('--theme-padding', `${theme.spacing.padding}px`);
  
  // Apply component-specific styles
  const buttonRadius = theme.components.buttonStyle === 'pill' ? '9999px' : 
                     theme.components.buttonStyle === 'sharp' ? '0px' : 
                     `${theme.spacing.borderRadius}px`;
  root.style.setProperty('--theme-button-radius', buttonRadius);
  
  const cardShadow = {
    none: 'none',
    subtle: '0 1px 3px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    strong: '0 10px 15px rgba(0, 0, 0, 0.1)'
  }[theme.components.cardShadow] || '0 4px 6px rgba(0, 0, 0, 0.1)';
  root.style.setProperty('--theme-card-shadow', cardShadow);
}

// Generate color variations (lighter/darker shades)
function generateColorVariations(color) {
  // This is a simplified color manipulation
  // In a real implementation, you might use a color manipulation library
  const variations = {};
  
  // Convert hex to RGB
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Generate lighter shades
  for (let i = 1; i <= 9; i++) {
    const factor = i * 0.1;
    const newR = Math.min(255, Math.round(r + (255 - r) * factor));
    const newG = Math.min(255, Math.round(g + (255 - g) * factor));
    const newB = Math.min(255, Math.round(b + (255 - b) * factor));
    variations[`${i}00`] = `rgb(${newR}, ${newG}, ${newB})`;
  }
  
  // Generate darker shades
  for (let i = 1; i <= 9; i++) {
    const factor = i * 0.1;
    const newR = Math.round(r * (1 - factor));
    const newG = Math.round(g * (1 - factor));
    const newB = Math.round(b * (1 - factor));
    variations[`${i + 5}00`] = `rgb(${newR}, ${newG}, ${newB})`;
  }
  
  variations['500'] = color; // Base color
  
  return variations;
}

// Detect user preferences from system
function detectSystemPreferences() {
  const preferences = {};
  
  // Detect dark mode preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    preferences.prefersDarkMode = true;
  }
  
  // Detect reduced motion preference
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    preferences.prefersReducedMotion = true;
  }
  
  // Detect high contrast preference
  if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
    preferences.prefersHighContrast = true;
  }
  
  return preferences;
}

// Main theme composable
export function useTheme() {
  // Initialize themes and preferences
  if (themeState.savedThemes.length === 0) {
    loadSavedThemes();
  }
  loadPreferences();
  
  // Computed values
  const currentTheme = computed(() => themeState.currentTheme);
  const savedThemes = computed(() => themeState.savedThemes);
  const preferences = computed(() => themeState.preferences);
  
  const themeVariables = computed(() => {
    const theme = themeState.currentTheme;
    return {
      '--theme-primary': theme.colors.primary,
      '--theme-secondary': theme.colors.secondary,
      '--theme-success': theme.colors.success,
      '--theme-warning': theme.colors.warning,
      '--theme-danger': theme.colors.danger,
      '--theme-background': theme.colors.background,
      '--theme-font-family': theme.typography.fontFamily,
      '--theme-font-size': `${theme.typography.fontSize}px`,
      '--theme-line-height': theme.typography.lineHeight,
      '--theme-letter-spacing': `${theme.typography.letterSpacing}em`,
      '--theme-spacing-base': `${theme.spacing.base}px`,
      '--theme-border-radius': `${theme.spacing.borderRadius}px`,
      '--theme-padding': `${theme.spacing.padding}px`
    };
  });
  
  // Apply theme when it changes
  watch(
    () => themeState.currentTheme,
    (newTheme) => {
      applyThemeToDocument(newTheme);
      if (themeState.preferences.autoSave) {
        localStorage.setItem('currentTheme', JSON.stringify(newTheme));
      }
    },
    { deep: true, immediate: true }
  );
  
  // Methods
  const setTheme = (theme) => {
    themeState.currentTheme = { ...themeState.currentTheme, ...theme };
  };
  
  const updateColors = (colors) => {
    Object.assign(themeState.currentTheme.colors, colors);
  };
  
  const updateTypography = (typography) => {
    Object.assign(themeState.currentTheme.typography, typography);
  };
  
  const updateSpacing = (spacing) => {
    Object.assign(themeState.currentTheme.spacing, spacing);
  };
  
  const updateComponents = (components) => {
    Object.assign(themeState.currentTheme.components, components);
  };
  
  const saveTheme = (name, theme = null) => {
    const themeToSave = theme || themeState.currentTheme;
    const savedTheme = {
      id: Date.now().toString(),
      name,
      theme: JSON.parse(JSON.stringify(themeToSave)),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };
    
    themeState.savedThemes.push(savedTheme);
    localStorage.setItem('savedThemes', JSON.stringify(themeState.savedThemes));
    
    return savedTheme;
  };
  
  const loadTheme = (themeId) => {
    const theme = themeState.savedThemes.find(t => t.id === themeId);
    if (theme) {
      setTheme(theme.theme);
      return true;
    }
    return false;
  };
  
  const deleteTheme = (themeId) => {
    const index = themeState.savedThemes.findIndex(t => t.id === themeId);
    if (index !== -1) {
      themeState.savedThemes.splice(index, 1);
      localStorage.setItem('savedThemes', JSON.stringify(themeState.savedThemes));
      return true;
    }
    return false;
  };
  
  const exportTheme = (format = 'json') => {
    const theme = themeState.currentTheme;
    
    switch (format) {
      case 'css':
        return generateCSSVariables(theme);
      case 'scss':
        return generateSCSSVariables(theme);
      case 'json':
        return JSON.stringify(theme, null, 2);
      case 'js':
        return `export const theme = ${JSON.stringify(theme, null, 2)};`;
      default:
        return JSON.stringify(theme, null, 2);
    }
  };
  
  const generateCSSVariables = (theme) => {
    return `:root {
  /* Colors */
  --theme-primary: ${theme.colors.primary};
  --theme-secondary: ${theme.colors.secondary};
  --theme-success: ${theme.colors.success};
  --theme-warning: ${theme.colors.warning};
  --theme-danger: ${theme.colors.danger};
  --theme-background: ${theme.colors.background};
  
  /* Typography */
  --theme-font-family: ${theme.typography.fontFamily};
  --theme-font-size: ${theme.typography.fontSize}px;
  --theme-line-height: ${theme.typography.lineHeight};
  --theme-letter-spacing: ${theme.typography.letterSpacing}em;
  
  /* Spacing */
  --theme-spacing-base: ${theme.spacing.base}px;
  --theme-border-radius: ${theme.spacing.borderRadius}px;
  --theme-padding: ${theme.spacing.padding}px;
}`;
  };
  
  const generateSCSSVariables = (theme) => {
    return `// Colors
$theme-primary: ${theme.colors.primary};
$theme-secondary: ${theme.colors.secondary};
$theme-success: ${theme.colors.success};
$theme-warning: ${theme.colors.warning};
$theme-danger: ${theme.colors.danger};
$theme-background: ${theme.colors.background};

// Typography
$theme-font-family: ${theme.typography.fontFamily};
$theme-font-size: ${theme.typography.fontSize}px;
$theme-line-height: ${theme.typography.lineHeight};
$theme-letter-spacing: ${theme.typography.letterSpacing}em;

// Spacing
$theme-spacing-base: ${theme.spacing.base}px;
$theme-border-radius: ${theme.spacing.borderRadius}px;
$theme-padding: ${theme.spacing.padding}px;`;
  };
  
  const resetToDefault = () => {
    themeState.currentTheme = {
      colors: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        background: '#ffffff'
      },
      typography: {
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 16,
        lineHeight: 1.5,
        letterSpacing: 0
      },
      spacing: {
        base: 4,
        borderRadius: 8,
        padding: 16
      },
      components: {
        buttonStyle: 'rounded',
        cardShadow: 'medium',
        inputStyle: 'outlined'
      }
    };
  };
  
  const updatePreferences = (newPreferences) => {
    Object.assign(themeState.preferences, newPreferences);
    savePreferences();
  };
  
  const getColorVariations = (colorKey) => {
    const color = themeState.currentTheme.colors[colorKey];
    return generateColorVariations(color);
  };
  
  const detectAndApplySystemPreferences = () => {
    const systemPrefs = detectSystemPreferences();
    
    if (systemPrefs.prefersDarkMode && themeState.preferences.darkModePreference === 'system') {
      // Apply dark theme
      updateColors({
        background: '#111827',
        primary: '#3b82f6',
        secondary: '#6b7280'
      });
    }
    
    return systemPrefs;
  };
  
  // Initialize
  const initialize = () => {
    // Load saved current theme if auto-save is enabled
    if (themeState.preferences.autoSave) {
      try {
        const savedCurrent = localStorage.getItem('currentTheme');
        if (savedCurrent) {
          const parsed = JSON.parse(savedCurrent);
          setTheme(parsed);
        }
      } catch (error) {
        console.warn('Failed to load current theme:', error);
      }
    }
    
    // Apply system preferences if configured
    if (themeState.preferences.darkModePreference === 'system') {
      detectAndApplySystemPreferences();
    }
    
    // Listen for system preference changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (themeState.preferences.darkModePreference === 'system') {
          detectAndApplySystemPreferences();
        }
      });
    }
  };
  
  return {
    // State
    currentTheme,
    savedThemes,
    preferences,
    themeVariables,
    
    // Methods
    setTheme,
    updateColors,
    updateTypography,
    updateSpacing,
    updateComponents,
    saveTheme,
    loadTheme,
    deleteTheme,
    exportTheme,
    resetToDefault,
    updatePreferences,
    getColorVariations,
    detectAndApplySystemPreferences,
    initialize
  };
}

// Theme provider for app-wide theme management
export function createThemeProvider() {
  const theme = useTheme();
  
  // Initialize theme system
  theme.initialize();
  
  return {
    install(app) {
      // Provide theme globally
      app.provide('theme', theme);
      
      // Add global properties
      app.config.globalProperties.$theme = theme;
    }
  };
}

// Hook for components to use theme
export function useThemeProvider() {
  return useTheme();
}