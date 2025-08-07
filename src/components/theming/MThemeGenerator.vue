<template>
  <div class="m-theme-generator" :style="themeVariables">
    <div class="theme-generator-container">
      <!-- Header -->
      <div class="theme-header">
        <h2 class="theme-title">Theme Generator</h2>
        <p class="theme-subtitle">Customize your application's appearance with real-time preview</p>
        
        <div class="theme-actions">
          <button @click="resetTheme" class="theme-button secondary">
            Reset to Default
          </button>
          <button @click="saveTheme" class="theme-button primary">
            Save Theme
          </button>
          <button @click="exportTheme" class="theme-button outline">
            Export CSS
          </button>
        </div>
      </div>

      <div class="theme-content">
        <!-- Theme Controls -->
        <div class="theme-controls">
          <div class="control-sections">
            <!-- Color Palette -->
            <div class="control-section">
              <h3 class="section-title">Color Palette</h3>
              <div class="color-grid">
                <div class="color-control">
                  <label class="color-label">Primary Color</label>
                  <div class="color-input-group">
                    <input 
                      type="color" 
                      v-model="theme.colors.primary" 
                      class="color-input"
                      @input="updateTheme"
                    />
                    <input 
                      type="text" 
                      v-model="theme.colors.primary" 
                      class="color-text"
                      @input="updateTheme"
                    />
                  </div>
                </div>

                <div class="color-control">
                  <label class="color-label">Secondary Color</label>
                  <div class="color-input-group">
                    <input 
                      type="color" 
                      v-model="theme.colors.secondary" 
                      class="color-input"
                      @input="updateTheme"
                    />
                    <input 
                      type="text" 
                      v-model="theme.colors.secondary" 
                      class="color-text"
                      @input="updateTheme"
                    />
                  </div>
                </div>

                <div class="color-control">
                  <label class="color-label">Success Color</label>
                  <div class="color-input-group">
                    <input 
                      type="color" 
                      v-model="theme.colors.success" 
                      class="color-input"
                      @input="updateTheme"
                    />
                    <input 
                      type="text" 
                      v-model="theme.colors.success" 
                      class="color-text"
                      @input="updateTheme"
                    />
                  </div>
                </div>

                <div class="color-control">
                  <label class="color-label">Warning Color</label>
                  <div class="color-input-group">
                    <input 
                      type="color" 
                      v-model="theme.colors.warning" 
                      class="color-input"
                      @input="updateTheme"
                    />
                    <input 
                      type="text" 
                      v-model="theme.colors.warning" 
                      class="color-text"
                      @input="updateTheme"
                    />
                  </div>
                </div>

                <div class="color-control">
                  <label class="color-label">Danger Color</label>
                  <div class="color-input-group">
                    <input 
                      type="color" 
                      v-model="theme.colors.danger" 
                      class="color-input"
                      @input="updateTheme"
                    />
                    <input 
                      type="text" 
                      v-model="theme.colors.danger" 
                      class="color-text"
                      @input="updateTheme"
                    />
                  </div>
                </div>

                <div class="color-control">
                  <label class="color-label">Background Color</label>
                  <div class="color-input-group">
                    <input 
                      type="color" 
                      v-model="theme.colors.background" 
                      class="color-input"
                      @input="updateTheme"
                    />
                    <input 
                      type="text" 
                      v-model="theme.colors.background" 
                      class="color-text"
                      @input="updateTheme"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Typography -->
            <div class="control-section">
              <h3 class="section-title">Typography</h3>
              <div class="typography-controls">
                <div class="control-group">
                  <label class="control-label">Font Family</label>
                  <select v-model="theme.typography.fontFamily" @change="updateTheme" class="control-select">
                    <option value="Inter, system-ui, sans-serif">Inter (Default)</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Open Sans, sans-serif">Open Sans</option>
                    <option value="Lato, sans-serif">Lato</option>
                    <option value="Montserrat, sans-serif">Montserrat</option>
                    <option value="Poppins, sans-serif">Poppins</option>
                    <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
                    <option value="system-ui, sans-serif">System UI</option>
                  </select>
                </div>

                <div class="control-group">
                  <label class="control-label">Base Font Size</label>
                  <div class="slider-control">
                    <input 
                      type="range" 
                      v-model="theme.typography.fontSize" 
                      min="12" 
                      max="20" 
                      step="1"
                      @input="updateTheme"
                      class="control-slider"
                    />
                    <span class="slider-value">{{ theme.typography.fontSize }}px</span>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">Line Height</label>
                  <div class="slider-control">
                    <input 
                      type="range" 
                      v-model="theme.typography.lineHeight" 
                      min="1.2" 
                      max="2.0" 
                      step="0.1"
                      @input="updateTheme"
                      class="control-slider"
                    />
                    <span class="slider-value">{{ theme.typography.lineHeight }}</span>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">Letter Spacing</label>
                  <div class="slider-control">
                    <input 
                      type="range" 
                      v-model="theme.typography.letterSpacing" 
                      min="-0.05" 
                      max="0.1" 
                      step="0.01"
                      @input="updateTheme"
                      class="control-slider"
                    />
                    <span class="slider-value">{{ theme.typography.letterSpacing }}em</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Spacing & Layout -->
            <div class="control-section">
              <h3 class="section-title">Spacing & Layout</h3>
              <div class="spacing-controls">
                <div class="control-group">
                  <label class="control-label">Base Spacing Unit</label>
                  <div class="slider-control">
                    <input 
                      type="range" 
                      v-model="theme.spacing.base" 
                      min="2" 
                      max="8" 
                      step="1"
                      @input="updateTheme"
                      class="control-slider"
                    />
                    <span class="slider-value">{{ theme.spacing.base }}px</span>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">Border Radius</label>
                  <div class="slider-control">
                    <input 
                      type="range" 
                      v-model="theme.spacing.borderRadius" 
                      min="0" 
                      max="20" 
                      step="2"
                      @input="updateTheme"
                      class="control-slider"
                    />
                    <span class="slider-value">{{ theme.spacing.borderRadius }}px</span>
                  </div>
                </div>

                <div class="control-group">
                  <label class="control-label">Component Padding</label>
                  <div class="slider-control">
                    <input 
                      type="range" 
                      v-model="theme.spacing.padding" 
                      min="8" 
                      max="32" 
                      step="4"
                      @input="updateTheme"
                      class="control-slider"
                    />
                    <span class="slider-value">{{ theme.spacing.padding }}px</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Preset Themes -->
            <div class="control-section">
              <h3 class="section-title">Preset Themes</h3>
              <div class="preset-grid">
                <button 
                  v-for="preset in presetThemes" 
                  :key="preset.name"
                  @click="applyPreset(preset)"
                  class="preset-button"
                  :class="{ active: currentPreset === preset.name }"
                >
                  <div class="preset-colors">
                    <div 
                      class="preset-color" 
                      v-for="color in preset.colors" 
                      :key="color"
                      :style="{ backgroundColor: color }"
                    ></div>
                  </div>
                  <span class="preset-name">{{ preset.name }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Live Preview -->
        <div class="theme-preview">
          <h3 class="preview-title">Live Preview</h3>
          <div class="preview-content">
            <!-- Component Previews -->
            <div class="preview-section">
              <h4 class="preview-section-title">Buttons</h4>
              <div class="preview-buttons">
                <button class="preview-button primary">Primary Button</button>
                <button class="preview-button secondary">Secondary Button</button>
                <button class="preview-button outline">Outline Button</button>
                <button class="preview-button success">Success Button</button>
                <button class="preview-button danger">Danger Button</button>
              </div>
            </div>

            <div class="preview-section">
              <h4 class="preview-section-title">Cards</h4>
              <div class="preview-cards">
                <div class="preview-card">
                  <div class="card-header">
                    <h5 class="card-title">Sample Card</h5>
                    <span class="card-badge">New</span>
                  </div>
                  <div class="card-content">
                    <p>This is a preview of how cards will look with your custom theme.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="preview-section">
              <h4 class="preview-section-title">Form Elements</h4>
              <div class="preview-forms">
                <div class="form-group">
                  <label class="form-label">Text Input</label>
                  <input type="text" class="form-input" placeholder="Enter text..." />
                </div>
                <div class="form-group">
                  <label class="form-label">Select Dropdown</label>
                  <select class="form-select">
                    <option>Choose an option...</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="preview-section">
              <h4 class="preview-section-title">Typography</h4>
              <div class="preview-typography">
                <h1 class="preview-h1">Heading 1</h1>
                <h2 class="preview-h2">Heading 2</h2>
                <h3 class="preview-h3">Heading 3</h3>
                <p class="preview-text">Regular paragraph text with your custom typography settings.</p>
                <small class="preview-small">Small text for captions and metadata.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="export-modal-overlay" @click="closeExportModal">
      <div class="export-modal" @click.stop>
        <div class="export-modal-header">
          <h3 class="export-modal-title">Export Theme</h3>
          <button @click="closeExportModal" class="export-modal-close">×</button>
        </div>
        <div class="export-modal-content">
          <div class="export-tabs">
            <button 
              @click="exportFormat = 'css'"
              class="export-tab"
              :class="{ active: exportFormat === 'css' }"
            >
              CSS Variables
            </button>
            <button 
              @click="exportFormat = 'scss'"
              class="export-tab"
              :class="{ active: exportFormat === 'scss' }"
            >
              SCSS Variables
            </button>
            <button 
              @click="exportFormat = 'json'"
              class="export-tab"
              :class="{ active: exportFormat === 'json' }"
            >
              JSON Config
            </button>
          </div>
          <div class="export-code">
            <pre><code>{{ exportedTheme }}</code></pre>
          </div>
          <div class="export-actions">
            <button @click="copyToClipboard" class="theme-button primary">
              Copy to Clipboard
            </button>
            <button @click="downloadTheme" class="theme-button outline">
              Download File
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MThemeGenerator',
  props: {
    initialTheme: {
      type: Object,
      default: () => ({})
    }
  },

  emits: ['theme-changed', 'theme-saved', 'theme-exported'],

  data() {
    return {
      theme: {
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
        }
      },
      currentPreset: 'default',
      showExportModal: false,
      exportFormat: 'css',
      presetThemes: [
        {
          name: 'Default',
          colors: ['#3b82f6', '#6b7280', '#10b981'],
          theme: {
            colors: {
              primary: '#3b82f6',
              secondary: '#6b7280',
              success: '#10b981',
              warning: '#f59e0b',
              danger: '#ef4444',
              background: '#ffffff'
            }
          }
        },
        {
          name: 'Financial',
          colors: ['#1e40af', '#059669', '#dc2626'],
          theme: {
            colors: {
              primary: '#1e40af',
              secondary: '#374151',
              success: '#059669',
              warning: '#d97706',
              danger: '#dc2626',
              background: '#f8fafc'
            }
          }
        },
        {
          name: 'YourTown',
          colors: ['#2563eb', '#0891b2', '#7c3aed'],
          theme: {
            colors: {
              primary: '#2563eb',
              secondary: '#0891b2',
              success: '#16a34a',
              warning: '#ea580c',
              danger: '#dc2626',
              background: '#ffffff'
            }
          }
        },
        {
          name: 'Dark Mode',
          colors: ['#3b82f6', '#1f2937', '#374151'],
          theme: {
            colors: {
              primary: '#3b82f6',
              secondary: '#6b7280',
              success: '#10b981',
              warning: '#f59e0b',
              danger: '#ef4444',
              background: '#111827'
            }
          }
        }
      ]
    };
  },

  computed: {
    themeVariables() {
      return {
        '--theme-primary': this.theme.colors.primary,
        '--theme-secondary': this.theme.colors.secondary,
        '--theme-success': this.theme.colors.success,
        '--theme-warning': this.theme.colors.warning,
        '--theme-danger': this.theme.colors.danger,
        '--theme-background': this.theme.colors.background,
        '--theme-font-family': this.theme.typography.fontFamily,
        '--theme-font-size': `${this.theme.typography.fontSize}px`,
        '--theme-line-height': this.theme.typography.lineHeight,
        '--theme-letter-spacing': `${this.theme.typography.letterSpacing}em`,
        '--theme-spacing-base': `${this.theme.spacing.base}px`,
        '--theme-border-radius': `${this.theme.spacing.borderRadius}px`,
        '--theme-padding': `${this.theme.spacing.padding}px`
      };
    },

    exportedTheme() {
      if (this.exportFormat === 'css') {
        return this.generateCSSVariables();
      } else if (this.exportFormat === 'scss') {
        return this.generateSCSSVariables();
      } else {
        return JSON.stringify(this.theme, null, 2);
      }
    }
  },

  mounted() {
    if (this.initialTheme && Object.keys(this.initialTheme).length > 0) {
      this.theme = { ...this.theme, ...this.initialTheme };
    }
    this.updateTheme();
  },

  methods: {
    updateTheme() {
      this.$emit('theme-changed', this.theme);
    },

    resetTheme() {
      this.theme = {
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
        }
      };
      this.currentPreset = 'default';
      this.updateTheme();
    },

    applyPreset(preset) {
      this.theme = { ...this.theme, ...preset.theme };
      this.currentPreset = preset.name;
      this.updateTheme();
    },

    saveTheme() {
      const savedThemes = JSON.parse(localStorage.getItem('savedThemes') || '[]');
      const themeName = prompt('Enter a name for your theme:');
      
      if (themeName) {
        const themeData = {
          name: themeName,
          theme: this.theme,
          createdAt: new Date().toISOString()
        };
        
        savedThemes.push(themeData);
        localStorage.setItem('savedThemes', JSON.stringify(savedThemes));
        this.$emit('theme-saved', themeData);
        alert(`Theme "${themeName}" saved successfully!`);
      }
    },

    exportTheme() {
      this.showExportModal = true;
    },

    closeExportModal() {
      this.showExportModal = false;
    },

    generateCSSVariables() {
      return `:root {
  /* Colors */
  --theme-primary: ${this.theme.colors.primary};
  --theme-secondary: ${this.theme.colors.secondary};
  --theme-success: ${this.theme.colors.success};
  --theme-warning: ${this.theme.colors.warning};
  --theme-danger: ${this.theme.colors.danger};
  --theme-background: ${this.theme.colors.background};
  
  /* Typography */
  --theme-font-family: ${this.theme.typography.fontFamily};
  --theme-font-size: ${this.theme.typography.fontSize}px;
  --theme-line-height: ${this.theme.typography.lineHeight};
  --theme-letter-spacing: ${this.theme.typography.letterSpacing}em;
  
  /* Spacing */
  --theme-spacing-base: ${this.theme.spacing.base}px;
  --theme-border-radius: ${this.theme.spacing.borderRadius}px;
  --theme-padding: ${this.theme.spacing.padding}px;
}`;
    },

    generateSCSSVariables() {
      return `// Colors
$theme-primary: ${this.theme.colors.primary};
$theme-secondary: ${this.theme.colors.secondary};
$theme-success: ${this.theme.colors.success};
$theme-warning: ${this.theme.colors.warning};
$theme-danger: ${this.theme.colors.danger};
$theme-background: ${this.theme.colors.background};

// Typography
$theme-font-family: ${this.theme.typography.fontFamily};
$theme-font-size: ${this.theme.typography.fontSize}px;
$theme-line-height: ${this.theme.typography.lineHeight};
$theme-letter-spacing: ${this.theme.typography.letterSpacing}em;

// Spacing
$theme-spacing-base: ${this.theme.spacing.base}px;
$theme-border-radius: ${this.theme.spacing.borderRadius}px;
$theme-padding: ${this.theme.spacing.padding}px;`;
    },

    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.exportedTheme);
        alert('Theme copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
        alert('Failed to copy to clipboard');
      }
    },

    downloadTheme() {
      const fileExtension = this.exportFormat === 'json' ? 'json' : this.exportFormat;
      const fileName = `custom-theme.${fileExtension}`;
      const content = this.exportedTheme;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      this.$emit('theme-exported', { format: this.exportFormat, content, fileName });
    }
  }
};
</script>

<style scoped>
/* Base styles with CSS custom properties for theming */
.m-theme-generator {
  font-family: var(--theme-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  background: var(--theme-background, #ffffff);
  min-height: 100vh;
  color: #333;
}

.theme-generator-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header */
.theme-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.theme-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--theme-primary, #3b82f6);
  margin: 0 0 0.5rem 0;
}

.theme-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0 0 2rem 0;
}

.theme-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.theme-button {
  padding: 0.75rem 1.5rem;
  border-radius: var(--theme-border-radius, 8px);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 0.875rem;
}

.theme-button.primary {
  background: var(--theme-primary, #3b82f6);
  color: white;
}

.theme-button.primary:hover {
  opacity: 0.9;
}

.theme-button.secondary {
  background: var(--theme-secondary, #6b7280);
  color: white;
}

.theme-button.outline {
  background: transparent;
  border: 1px solid var(--theme-primary, #3b82f6);
  color: var(--theme-primary, #3b82f6);
}

/* Content Layout */
.theme-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.control-sections {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.control-section {
  background: #f9fafb;
  border-radius: var(--theme-border-radius, 8px);
  padding: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 1.5rem 0;
}

/* Color Controls */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.color-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.color-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.color-input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.color-input {
  width: 50px;
  height: 40px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.color-text {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: monospace;
  font-size: 0.875rem;
}

/* Form Controls */
.control-group {
  margin-bottom: 1.5rem;
}

.control-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.control-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
}

.slider-control {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-slider {
  flex: 1;
  -webkit-appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
}

.control-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--theme-primary, #3b82f6);
  cursor: pointer;
}

.slider-value {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  min-width: 60px;
  text-align: right;
}

/* Preset Themes */
.preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.preset-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: var(--theme-border-radius, 8px);
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.preset-button:hover {
  border-color: var(--theme-primary, #3b82f6);
}

.preset-button.active {
  border-color: var(--theme-primary, #3b82f6);
  background: #eff6ff;
}

.preset-colors {
  display: flex;
  gap: 2px;
}

.preset-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #e5e7eb;
}

.preset-name {
  font-size: 0.75rem;
  font-weight: 500;
  color: #374151;
}

/* Preview */
.theme-preview {
  background: white;
  border-radius: var(--theme-border-radius, 8px);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.preview-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.preview-content {
  padding: 1.5rem;
}

.preview-section {
  margin-bottom: 2rem;
}

.preview-section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

/* Preview Components */
.preview-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preview-button {
  padding: var(--theme-padding, 16px);
  border-radius: var(--theme-border-radius, 8px);
  border: none;
  font-weight: 500;
  cursor: pointer;
  font-size: var(--theme-font-size, 16px);
  font-family: var(--theme-font-family, inherit);
}

.preview-button.primary {
  background: var(--theme-primary, #3b82f6);
  color: white;
}

.preview-button.secondary {
  background: var(--theme-secondary, #6b7280);
  color: white;
}

.preview-button.outline {
  background: transparent;
  border: 1px solid var(--theme-primary, #3b82f6);
  color: var(--theme-primary, #3b82f6);
}

.preview-button.success {
  background: var(--theme-success, #10b981);
  color: white;
}

.preview-button.danger {
  background: var(--theme-danger, #ef4444);
  color: white;
}

.preview-cards {
  display: flex;
  gap: 1rem;
}

.preview-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: var(--theme-border-radius, 8px);
  overflow: hidden;
  flex: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  color: #111827;
}

.card-badge {
  background: var(--theme-primary, #3b82f6);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.card-content {
  padding: 1rem;
}

.preview-forms {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.form-input,
.form-select {
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: var(--theme-border-radius, 8px);
  font-size: var(--theme-font-size, 16px);
  font-family: var(--theme-font-family, inherit);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--theme-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Typography Preview */
.preview-typography {
  space-y: 1rem;
}

.preview-h1,
.preview-h2,
.preview-h3 {
  margin: 0 0 0.5rem 0;
  font-family: var(--theme-font-family, inherit);
  letter-spacing: var(--theme-letter-spacing, 0);
}

.preview-h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
}

.preview-h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

.preview-h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.preview-text {
  font-size: var(--theme-font-size, 16px);
  line-height: var(--theme-line-height, 1.5);
  letter-spacing: var(--theme-letter-spacing, 0);
  color: #374151;
  margin: 0 0 1rem 0;
}

.preview-small {
  font-size: 0.875rem;
  color: #6b7280;
}

/* Export Modal */
.export-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.export-modal {
  background: white;
  border-radius: var(--theme-border-radius, 8px);
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.export-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.export-modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.export-modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
}

.export-modal-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.export-tabs {
  display: flex;
  border-bottom: 1px solid #e5e7eb;
}

.export-tab {
  flex: 1;
  padding: 1rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 2px solid transparent;
}

.export-tab.active {
  color: var(--theme-primary, #3b82f6);
  border-bottom-color: var(--theme-primary, #3b82f6);
}

.export-code {
  flex: 1;
  overflow: auto;
  background: #1f2937;
  padding: 1.5rem;
}

.export-code pre {
  margin: 0;
  font-family: 'Fira Code', Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #e5e7eb;
}

.export-actions {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 1024px) {
  .theme-content {
    grid-template-columns: 1fr;
  }
  
  .color-grid {
    grid-template-columns: 1fr;
  }
  
  .preset-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .theme-generator-container {
    padding: 1rem;
  }
  
  .theme-actions {
    flex-direction: column;
  }
  
  .preview-buttons {
    flex-direction: column;
  }
  
  .export-modal {
    width: 95%;
    max-height: 90vh;
  }
  
  .export-actions {
    flex-direction: column;
  }
}
</style>