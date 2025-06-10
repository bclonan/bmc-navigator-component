import { ref, reactive, computed, watch } from 'vue';
import MThemeGenerator from '../../components/theming/MThemeGenerator.vue';
import MButton from '../../components/ui/MButton.vue';
import MCard from '../../components/ui/MCard.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MCheckbox from '../../components/ui/MCheckbox.vue';
import MSlider from '../../components/ui/MSlider.vue';
import MProgress from '../../components/ui/MProgress.vue';
import MLayout from '../../components/ui/MLayout.vue';
import MChart from '../../components/charts/MChart.vue';
import MTable from '../../components/tables/MTable.vue';
import ECFRNavigator from '../../components/ECFRNavigator.vue';

export default {
  title: 'Demo/Theme Variations & Customization',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive theme customization and variations showcase demonstrating real-time theme generation, preset themes, dark/light modes, and custom branding across all components.'
      }
    }
  }
};

// Real-Time Theme Customization
export const LiveThemeCustomization = {
  render: () => ({
    components: { 
      MThemeGenerator, MLayout, MCard, MButton, MTextField, MSelect, MCheckbox, 
      MSlider, MProgress, MChart, MTable, ECFRNavigator 
    },
    setup() {
      const showThemeGenerator = ref(true);
      const currentTheme = ref('mariner');
      const previewMode = ref('dashboard');
      
      // Predefined themes
      const themes = {
        mariner: {
          colors: {
            primary: '#2563eb',
            secondary: '#0891b2',
            success: '#16a34a',
            warning: '#ea580c',
            danger: '#dc2626',
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
        financial: {
          colors: {
            primary: '#1e40af',
            secondary: '#374151',
            success: '#059669',
            warning: '#d97706',
            danger: '#dc2626',
            background: '#f8fafc'
          },
          typography: {
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: 15,
            lineHeight: 1.6,
            letterSpacing: 0.025
          },
          spacing: {
            base: 4,
            borderRadius: 6,
            padding: 20
          }
        },
        modern: {
          colors: {
            primary: '#7c3aed',
            secondary: '#64748b',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            background: '#ffffff'
          },
          typography: {
            fontFamily: '"Poppins", sans-serif',
            fontSize: 16,
            lineHeight: 1.5,
            letterSpacing: -0.025
          },
          spacing: {
            base: 4,
            borderRadius: 12,
            padding: 24
          }
        },
        dark: {
          colors: {
            primary: '#3b82f6',
            secondary: '#6b7280',
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            background: '#111827'
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
        }
      };

      const selectedTheme = computed(() => themes[currentTheme.value]);

      // Sample data for components
      const chartData = ref([
        { label: 'Jan', value: 4500, category: 'Revenue' },
        { label: 'Feb', value: 5200, category: 'Revenue' },
        { label: 'Mar', value: 4800, category: 'Revenue' },
        { label: 'Apr', value: 6100, category: 'Revenue' },
        { label: 'May', value: 5800, category: 'Revenue' },
        { label: 'Jun', value: 6500, category: 'Revenue' }
      ]);

      const tableData = ref([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', amount: '$2,500' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', amount: '$1,800' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active', amount: '$3,200' }
      ]);

      const tableColumns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'status', label: 'Status', sortable: false },
        { key: 'amount', label: 'Amount', sortable: true }
      ];

      const navigatorData = ref([
        {
          id: 'theme-demo',
          type: 'category',
          title: 'Theme Demonstration',
          description: 'Showcasing theme variations',
          children: [
            {
              id: 'colors',
              type: 'section',
              title: 'Color Palette',
              description: 'Primary, secondary, and accent colors'
            },
            {
              id: 'typography',
              type: 'section',
              title: 'Typography',
              description: 'Font families, sizes, and spacing'
            },
            {
              id: 'components',
              type: 'section',
              title: 'Component Styling',
              description: 'How themes affect component appearance'
            }
          ]
        }
      ]);

      const formData = reactive({
        customerName: 'John Doe',
        loanAmount: 25000,
        interestRate: 4.5,
        term: 36,
        autoApproval: true,
        riskLevel: 'medium'
      });

      // Theme application
      const applyTheme = (theme) => {
        const root = document.documentElement;
        const themeData = themes[theme];
        
        // Apply CSS custom properties
        root.style.setProperty('--theme-primary', themeData.colors.primary);
        root.style.setProperty('--theme-secondary', themeData.colors.secondary);
        root.style.setProperty('--theme-success', themeData.colors.success);
        root.style.setProperty('--theme-warning', themeData.colors.warning);
        root.style.setProperty('--theme-danger', themeData.colors.danger);
        root.style.setProperty('--theme-background', themeData.colors.background);
        root.style.setProperty('--theme-font-family', themeData.typography.fontFamily);
        root.style.setProperty('--theme-font-size', `${themeData.typography.fontSize}px`);
        root.style.setProperty('--theme-line-height', themeData.typography.lineHeight);
        root.style.setProperty('--theme-border-radius', `${themeData.spacing.borderRadius}px`);
        root.style.setProperty('--theme-padding', `${themeData.spacing.padding}px`);
      };

      const handleThemeChange = (themeData) => {
        // Apply custom theme from generator
        const root = document.documentElement;
        root.style.setProperty('--theme-primary', themeData.colors.primary);
        root.style.setProperty('--theme-secondary', themeData.colors.secondary);
        root.style.setProperty('--theme-success', themeData.colors.success);
        root.style.setProperty('--theme-warning', themeData.colors.warning);
        root.style.setProperty('--theme-danger', themeData.colors.danger);
        root.style.setProperty('--theme-background', themeData.colors.background);
      };

      watch(currentTheme, (newTheme) => {
        applyTheme(newTheme);
      }, { immediate: true });

      return {
        showThemeGenerator,
        currentTheme,
        previewMode,
        themes,
        selectedTheme,
        chartData,
        tableData,
        tableColumns,
        navigatorData,
        formData,
        handleThemeChange
      };
    },
    template: `
      <div class="min-h-screen bg-gray-50" :style="selectedTheme ? {
        '--theme-primary': selectedTheme.colors.primary,
        '--theme-secondary': selectedTheme.colors.secondary,
        '--theme-success': selectedTheme.colors.success,
        '--theme-warning': selectedTheme.colors.warning,
        '--theme-danger': selectedTheme.colors.danger,
        '--theme-background': selectedTheme.colors.background,
        '--theme-font-family': selectedTheme.typography.fontFamily,
        '--theme-font-size': selectedTheme.typography.fontSize + 'px',
        '--theme-border-radius': selectedTheme.spacing.borderRadius + 'px'
      } : {}">
        <MLayout app-title="Live Theme Customization" :drawer="true" permanent>
          <template #drawer>
            <div class="p-4 space-y-6">
              <!-- Theme Selector -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Theme Selection</h3>
                
                <div class="space-y-3">
                  <MSelect
                    v-model="currentTheme"
                    label="Preset Themes"
                    :options="[
                      { value: 'mariner', label: '🌊 Mariner Finance' },
                      { value: 'financial', label: '💼 Professional Financial' },
                      { value: 'modern', label: '✨ Modern Purple' },
                      { value: 'dark', label: '🌙 Dark Mode' }
                    ]"
                  />
                  
                  <MSelect
                    v-model="previewMode"
                    label="Preview Mode"
                    :options="[
                      { value: 'dashboard', label: '📊 Dashboard View' },
                      { value: 'forms', label: '📝 Forms View' },
                      { value: 'navigation', label: '🧭 Navigation View' },
                      { value: 'components', label: '🎛️ Components View' }
                    ]"
                  />
                </div>

                <!-- Theme Generator Toggle -->
                <div class="mt-4">
                  <label class="flex items-center">
                    <input
                      type="checkbox"
                      v-model="showThemeGenerator"
                      class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span class="ml-2 text-sm text-gray-700">Show Theme Generator</span>
                  </label>
                </div>
              </div>

              <!-- Quick Theme Info -->
              <div class="bg-white p-3 rounded-lg border">
                <h4 class="text-sm font-medium text-gray-900 mb-2">Current Theme</h4>
                <div class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-4 h-4 rounded"
                      :style="{ backgroundColor: selectedTheme.colors.primary }"
                    ></div>
                    <span class="text-xs text-gray-600">Primary</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-4 h-4 rounded"
                      :style="{ backgroundColor: selectedTheme.colors.secondary }"
                    ></div>
                    <span class="text-xs text-gray-600">Secondary</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-4 h-4 rounded"
                      :style="{ backgroundColor: selectedTheme.colors.success }"
                    ></div>
                    <span class="text-xs text-gray-600">Success</span>
                  </div>
                </div>
              </div>

              <!-- Navigation Demo -->
              <div v-if="previewMode === 'navigation'">
                <h4 class="text-sm font-medium text-gray-700 mb-2">Navigation Demo</h4>
                <div class="border rounded-lg bg-white overflow-hidden max-h-64">
                  <ECFRNavigator
                    :items="navigatorData"
                    :options="{
                      showBreadcrumb: true,
                      theme: currentTheme === 'dark' ? 'dark' : 'light',
                      display: {
                        viewMode: 'standard',
                        showDescription: true
                      }
                    }"
                  />
                </div>
              </div>
            </div>
          </template>

          <!-- Main Content -->
          <div class="space-y-6">
            <!-- Theme Generator -->
            <div v-if="showThemeGenerator">
              <MThemeGenerator
                :initial-theme="selectedTheme"
                @theme-changed="handleThemeChange"
                class="mb-6"
              />
            </div>

            <!-- Dashboard Preview -->
            <div v-if="previewMode === 'dashboard'">
              <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
                <p class="text-gray-600 mt-2">Real-time theme customization preview</p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- KPI Cards -->
                <MCard title="Total Revenue" class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <div class="text-3xl font-bold">$125,430</div>
                  <div class="text-blue-100 text-sm mt-1">+12% from last month</div>
                </MCard>

                <MCard title="Active Loans" class="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <div class="text-3xl font-bold">1,234</div>
                  <div class="text-green-100 text-sm mt-1">+8% from last month</div>
                </MCard>

                <MCard title="Approval Rate" class="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                  <div class="text-3xl font-bold">87%</div>
                  <div class="text-purple-100 text-sm mt-1">+3% from last month</div>
                </MCard>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <!-- Chart -->
                <MCard title="Revenue Trends" subtitle="Monthly performance">
                  <MChart
                    type="line"
                    :data="chartData"
                    :width="400"
                    :height="250"
                    :show-grid="true"
                    :show-points="true"
                  />
                </MCard>

                <!-- Progress Indicators -->
                <MCard title="Goal Progress" subtitle="Monthly targets">
                  <div class="space-y-4">
                    <div>
                      <div class="flex justify-between text-sm mb-1">
                        <span>Loan Applications</span>
                        <span>75%</span>
                      </div>
                      <MProgress :value="75" class="h-2" />
                    </div>
                    <div>
                      <div class="flex justify-between text-sm mb-1">
                        <span>Customer Satisfaction</span>
                        <span>92%</span>
                      </div>
                      <MProgress :value="92" class="h-2" />
                    </div>
                    <div>
                      <div class="flex justify-between text-sm mb-1">
                        <span>Revenue Target</span>
                        <span>68%</span>
                      </div>
                      <MProgress :value="68" class="h-2" />
                    </div>
                  </div>
                </MCard>
              </div>
            </div>

            <!-- Forms Preview -->
            <div v-if="previewMode === 'forms'">
              <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Form Components</h1>
                <p class="text-gray-600 mt-2">See how themes affect form styling</p>
              </div>

              <MCard title="Loan Application Form" subtitle="Customer information and loan details">
                <form class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MTextField
                      v-model="formData.customerName"
                      label="Customer Name"
                      placeholder="Enter full name"
                      required
                    />
                    
                    <MTextField
                      v-model="formData.loanAmount"
                      label="Loan Amount"
                      type="number"
                      placeholder="Enter amount"
                      prefix="$"
                      required
                    />
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MTextField
                      v-model="formData.interestRate"
                      label="Interest Rate"
                      type="number"
                      step="0.1"
                      suffix="%"
                      placeholder="4.5"
                    />
                    
                    <MSelect
                      v-model="formData.term"
                      label="Loan Term"
                      :options="[
                        { value: 12, label: '12 months' },
                        { value: 24, label: '24 months' },
                        { value: 36, label: '36 months' },
                        { value: 48, label: '48 months' },
                        { value: 60, label: '60 months' }
                      ]"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Risk Assessment: {{ formData.riskLevel }}
                    </label>
                    <MSlider
                      v-model="formData.riskLevel"
                      :min="1"
                      :max="5"
                      :step="1"
                      :labels="['Very Low', 'Low', 'Medium', 'High', 'Very High']"
                    />
                  </div>

                  <MCheckbox
                    v-model="formData.autoApproval"
                    label="Enable automatic approval for qualified applicants"
                  />

                  <div class="flex justify-end space-x-3">
                    <MButton text="Cancel" variant="outlined" />
                    <MButton text="Submit Application" />
                  </div>
                </form>
              </MCard>
            </div>

            <!-- Components Preview -->
            <div v-if="previewMode === 'components'">
              <div class="mb-6">
                <h1 class="text-3xl font-bold text-gray-900">Component Gallery</h1>
                <p class="text-gray-600 mt-2">All components styled with current theme</p>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Buttons -->
                <MCard title="Button Variations">
                  <div class="space-y-4">
                    <div class="flex flex-wrap gap-2">
                      <MButton text="Primary" />
                      <MButton text="Outlined" variant="outlined" />
                      <MButton text="Text" variant="text" />
                      <MButton text="Elevated" variant="elevated" />
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <MButton text="Small" size="small" />
                      <MButton text="Medium" size="medium" />
                      <MButton text="Large" size="large" />
                    </div>
                    <div class="flex flex-wrap gap-2">
                      <MButton text="Success" color="success" />
                      <MButton text="Warning" color="warning" />
                      <MButton text="Danger" color="danger" />
                    </div>
                  </div>
                </MCard>

                <!-- Data Table -->
                <MCard title="Data Table">
                  <MTable
                    :data="tableData"
                    :columns="tableColumns"
                    :show-search="true"
                    :show-pagination="true"
                    :items-per-page="5"
                  />
                </MCard>

                <!-- Form Controls -->
                <MCard title="Form Controls">
                  <div class="space-y-4">
                    <MTextField
                      label="Text Input"
                      placeholder="Themed text input"
                    />
                    
                    <MSelect
                      label="Select Dropdown"
                      :options="[
                        { value: 'option1', label: 'Option 1' },
                        { value: 'option2', label: 'Option 2' },
                        { value: 'option3', label: 'Option 3' }
                      ]"
                      placeholder="Choose an option"
                    />
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        Slider Control
                      </label>
                      <MSlider :min="0" :max="100" :step="10" />
                    </div>
                    
                    <MCheckbox label="Themed checkbox control" />
                  </div>
                </MCard>

                <!-- Progress Indicators -->
                <MCard title="Progress & Status">
                  <div class="space-y-4">
                    <div>
                      <div class="text-sm text-gray-600 mb-1">Loading Progress</div>
                      <MProgress :value="45" class="h-2" />
                    </div>
                    <div>
                      <div class="text-sm text-gray-600 mb-1">Success Progress</div>
                      <MProgress :value="100" variant="success" class="h-2" />
                    </div>
                    <div>
                      <div class="text-sm text-gray-600 mb-1">Warning Progress</div>
                      <MProgress :value="75" variant="warning" class="h-2" />
                    </div>
                    <div>
                      <div class="text-sm text-gray-600 mb-1">Danger Progress</div>
                      <MProgress :value="30" variant="danger" class="h-2" />
                    </div>
                  </div>
                </MCard>
              </div>
            </div>
          </div>
        </MLayout>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Live theme customization with real-time preview across all components, preset themes, and custom theme generation capabilities.'
      }
    }
  }
};

// Brand Customization Showcase
export const BrandCustomizationShowcase = {
  render: () => ({
    components: { 
      MLayout, MCard, MButton, MTextField, MChart, MProgress 
    },
    setup() {
      const selectedBrand = ref('mariner');
      
      // Brand configurations
      const brands = {
        mariner: {
          name: 'Mariner Finance',
          logo: '⚓',
          primaryColor: '#2563eb',
          secondaryColor: '#0891b2',
          accentColor: '#16a34a',
          backgroundColor: '#f8fafc',
          fontFamily: 'Inter, system-ui, sans-serif',
          borderRadius: 8,
          tagline: 'Your trusted financial partner',
          values: ['Trust', 'Innovation', 'Excellence']
        },
        techbank: {
          name: 'TechBank',
          logo: '💎',
          primaryColor: '#7c3aed',
          secondaryColor: '#3b82f6',
          accentColor: '#06b6d4',
          backgroundColor: '#fafafa',
          fontFamily: '"SF Pro Display", system-ui, sans-serif',
          borderRadius: 12,
          tagline: 'Banking for the digital age',
          values: ['Innovation', 'Security', 'Simplicity']
        },
        greenfinance: {
          name: 'Green Finance',
          logo: '🌱',
          primaryColor: '#059669',
          secondaryColor: '#10b981',
          accentColor: '#84cc16',
          backgroundColor: '#f0fdf4',
          fontFamily: '"Poppins", sans-serif',
          borderRadius: 16,
          tagline: 'Sustainable financial solutions',
          values: ['Sustainability', 'Growth', 'Community']
        },
        premiumbank: {
          name: 'Premium Bank',
          logo: '👑',
          primaryColor: '#9333ea',
          secondaryColor: '#d97706',
          accentColor: '#dc2626',
          backgroundColor: '#fefce8',
          fontFamily: '"Playfair Display", serif',
          borderRadius: 6,
          tagline: 'Luxury banking redefined',
          values: ['Exclusivity', 'Prestige', 'Service']
        }
      };

      const currentBrand = computed(() => brands[selectedBrand.value]);

      // Sample data
      const brandMetrics = computed(() => ({
        customers: Math.floor(Math.random() * 50000) + 10000,
        satisfaction: Math.floor(Math.random() * 20) + 80,
        growth: Math.floor(Math.random() * 15) + 5,
        revenue: Math.floor(Math.random() * 1000000) + 500000
      }));

      const chartData = ref([
        { label: 'Q1', value: 2500 },
        { label: 'Q2', value: 3200 },
        { label: 'Q3', value: 2800 },
        { label: 'Q4', value: 3600 }
      ]);

      return {
        selectedBrand,
        brands,
        currentBrand,
        brandMetrics,
        chartData
      };
    },
    template: `
      <div 
        class="min-h-screen transition-all duration-500"
        :style="{
          backgroundColor: currentBrand.backgroundColor,
          fontFamily: currentBrand.fontFamily
        }"
      >
        <MLayout :app-title="currentBrand.name" :drawer="true" permanent>
          <template #drawer>
            <div class="p-4 space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-4">Brand Selection</h3>
                
                <div class="space-y-3">
                  <button
                    v-for="(brand, key) in brands"
                    :key="key"
                    @click="selectedBrand = key"
                    class="w-full p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-md"
                    :class="selectedBrand === key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'"
                  >
                    <div class="flex items-center space-x-3">
                      <div class="text-2xl">{{ brand.logo }}</div>
                      <div>
                        <div class="font-medium text-gray-900">{{ brand.name }}</div>
                        <div class="text-xs text-gray-500">{{ brand.tagline }}</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Brand Details -->
              <div class="bg-white p-4 rounded-lg border">
                <h4 class="text-sm font-medium text-gray-900 mb-3">Brand Colors</h4>
                <div class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-6 h-6 rounded"
                      :style="{ backgroundColor: currentBrand.primaryColor }"
                    ></div>
                    <span class="text-sm text-gray-600">Primary</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-6 h-6 rounded"
                      :style="{ backgroundColor: currentBrand.secondaryColor }"
                    ></div>
                    <span class="text-sm text-gray-600">Secondary</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div 
                      class="w-6 h-6 rounded"
                      :style="{ backgroundColor: currentBrand.accentColor }"
                    ></div>
                    <span class="text-sm text-gray-600">Accent</span>
                  </div>
                </div>
              </div>

              <!-- Brand Values -->
              <div class="bg-white p-4 rounded-lg border">
                <h4 class="text-sm font-medium text-gray-900 mb-3">Core Values</h4>
                <div class="space-y-1">
                  <div 
                    v-for="value in currentBrand.values" 
                    :key="value"
                    class="text-sm text-gray-600 flex items-center"
                  >
                    <div class="w-2 h-2 rounded-full mr-2" :style="{ backgroundColor: currentBrand.accentColor }"></div>
                    {{ value }}
                  </div>
                </div>
              </div>
            </div>
          </template>

          <!-- Main Content -->
          <div class="space-y-6" :style="{ '--brand-primary': currentBrand.primaryColor, '--brand-secondary': currentBrand.secondaryColor, '--brand-accent': currentBrand.accentColor }">
            <!-- Brand Header -->
            <div class="text-center py-8 px-4 rounded-lg" :style="{ backgroundColor: currentBrand.primaryColor, color: 'white' }">
              <div class="text-6xl mb-4">{{ currentBrand.logo }}</div>
              <h1 class="text-4xl font-bold mb-2">{{ currentBrand.name }}</h1>
              <p class="text-xl opacity-90">{{ currentBrand.tagline }}</p>
            </div>

            <!-- Brand Metrics -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MCard title="Total Customers" class="text-center">
                <div class="text-3xl font-bold" :style="{ color: currentBrand.primaryColor }">
                  {{ brandMetrics.customers.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-500 mt-1">Active accounts</div>
              </MCard>

              <MCard title="Satisfaction Rate" class="text-center">
                <div class="text-3xl font-bold" :style="{ color: currentBrand.accentColor }">
                  {{ brandMetrics.satisfaction }}%
                </div>
                <div class="text-sm text-gray-500 mt-1">Customer rating</div>
              </MCard>

              <MCard title="Growth Rate" class="text-center">
                <div class="text-3xl font-bold" :style="{ color: currentBrand.secondaryColor }">
                  +{{ brandMetrics.growth }}%
                </div>
                <div class="text-sm text-gray-500 mt-1">Annual growth</div>
              </MCard>

              <MCard title="Revenue" class="text-center">
                <div class="text-3xl font-bold" :style="{ color: currentBrand.primaryColor }">
                  \${{ (brandMetrics.revenue / 1000000).toFixed(1) }}M
                </div>
                <div class="text-sm text-gray-500 mt-1">Annual revenue</div>
              </MCard>
            </div>

            <!-- Branded Components Showcase -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Branded Chart -->
              <MCard title="Performance Overview" subtitle="Quarterly results">
                <MChart
                  type="bar"
                  :data="chartData"
                  :width="400"
                  :height="250"
                  :colors="[currentBrand.primaryColor, currentBrand.secondaryColor, currentBrand.accentColor]"
                  :show-grid="true"
                />
              </MCard>

              <!-- Branded Form -->
              <MCard title="Quick Contact" subtitle="Get in touch with our team">
                <form class="space-y-4">
                  <MTextField
                    label="Full Name"
                    placeholder="Enter your name"
                    :style="{ '--input-focus-color': currentBrand.primaryColor }"
                  />
                  
                  <MTextField
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    :style="{ '--input-focus-color': currentBrand.primaryColor }"
                  />
                  
                  <MTextField
                    label="Message"
                    type="textarea"
                    placeholder="How can we help you?"
                    rows="3"
                    :style="{ '--input-focus-color': currentBrand.primaryColor }"
                  />
                  
                  <MButton 
                    text="Send Message" 
                    class="w-full"
                    :style="{ 
                      backgroundColor: currentBrand.primaryColor,
                      borderColor: currentBrand.primaryColor,
                      color: 'white'
                    }"
                  />
                </form>
              </MCard>
            </div>

            <!-- Brand Features -->
            <MCard title="What Makes Us Different" subtitle="Our unique value proposition">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  v-for="(value, index) in currentBrand.values" 
                  :key="value"
                  class="text-center p-6 rounded-lg border"
                  :style="{ borderColor: currentBrand.primaryColor + '20', backgroundColor: currentBrand.primaryColor + '05' }"
                >
                  <div 
                    class="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-xl"
                    :style="{ backgroundColor: currentBrand.primaryColor }"
                  >
                    {{ ['🎯', '🚀', '⭐'][index] }}
                  </div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ value }}</h3>
                  <p class="text-gray-600">
                    {{ 
                      value === 'Trust' ? 'Building lasting relationships through transparency and reliability.' :
                      value === 'Innovation' ? 'Leveraging cutting-edge technology for better financial solutions.' :
                      value === 'Excellence' ? 'Delivering exceptional service and results every time.' :
                      value === 'Security' ? 'Protecting your financial data with industry-leading security measures.' :
                      value === 'Simplicity' ? 'Making complex financial processes easy and intuitive.' :
                      value === 'Sustainability' ? 'Promoting environmental responsibility in all our operations.' :
                      value === 'Growth' ? 'Helping our customers and communities thrive and prosper.' :
                      value === 'Community' ? 'Supporting local communities and social causes.' :
                      value === 'Exclusivity' ? 'Providing premium, personalized financial services.' :
                      value === 'Prestige' ? 'Offering elite banking experiences for discerning clients.' :
                      value === 'Service' ? 'Delivering white-glove customer service and support.' :
                      'Committed to delivering exceptional value and service.'
                    }}
                  </p>
                </div>
              </div>
            </MCard>

            <!-- Progress Indicators with Brand Colors -->
            <MCard title="Key Performance Indicators" subtitle="Real-time business metrics">
              <div class="space-y-6">
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Customer Acquisition</span>
                    <span>{{ brandMetrics.growth + 10 }}%</span>
                  </div>
                  <MProgress 
                    :value="brandMetrics.growth + 10" 
                    class="h-3"
                    :style="{ '--progress-color': currentBrand.primaryColor }"
                  />
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Revenue Target</span>
                    <span>{{ brandMetrics.satisfaction - 5 }}%</span>
                  </div>
                  <MProgress 
                    :value="brandMetrics.satisfaction - 5" 
                    class="h-3"
                    :style="{ '--progress-color': currentBrand.secondaryColor }"
                  />
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-2">
                    <span>Customer Satisfaction</span>
                    <span>{{ brandMetrics.satisfaction }}%</span>
                  </div>
                  <MProgress 
                    :value="brandMetrics.satisfaction" 
                    class="h-3"
                    :style="{ '--progress-color': currentBrand.accentColor }"
                  />
                </div>
              </div>
            </MCard>
          </div>
        </MLayout>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Brand customization showcase demonstrating how to apply different brand identities, colors, typography, and styling across the entire component library.'
      }
    }
  }
};
