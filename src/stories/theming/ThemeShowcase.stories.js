import { ref } from 'vue';
import MThemeGenerator from '../../components/theming/MThemeGenerator.vue';
import MButton from '../../components/ui/MButton.vue';
import MCard from '../../components/ui/MCard.vue';
import MSlider from '../../components/ui/MSlider.vue';
import MTable from '../../components/tables/MTable.vue';
import MChart from '../../components/charts/MChart.vue';

export default {
  title: 'Tools/Theming/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase demonstrating how the theme generator affects all components in real-time financial application scenarios.'
      }
    }
  }
};

// Complete financial application with theming
export const FinancialDashboard = {
  render: () => ({
    components: { 
      MThemeGenerator, 
      MButton, 
      MCard, 
      MSlider, 
      MTable, 
      MChart 
    },
    setup() {
      const currentTheme = ref({
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
      });

      const loanAmount = ref(35000);
      const monthlyIncome = ref(75000);
      const showGenerator = ref(false);

      // Sample financial data
      const loanApplications = [
        {
          id: 'LA-2024-001',
          applicant: 'Sarah Johnson',
          amount: 25000,
          purpose: 'Home Improvement',
          status: 'Under Review',
          submitted: '2024-01-15',
          creditScore: 742
        },
        {
          id: 'LA-2024-002',
          applicant: 'Michael Chen',
          amount: 45000,
          purpose: 'Debt Consolidation',
          status: 'Approved',
          submitted: '2024-01-14',
          creditScore: 785
        },
        {
          id: 'LA-2024-003',
          applicant: 'Emma Davis',
          amount: 15000,
          purpose: 'Medical Expenses',
          status: 'Pending Documents',
          submitted: '2024-01-13',
          creditScore: 698
        }
      ];

      const tableColumns = [
        { key: 'id', label: 'Application ID', sortable: true },
        { key: 'applicant', label: 'Applicant', sortable: true },
        { key: 'amount', label: 'Amount', type: 'currency', sortable: true },
        { key: 'purpose', label: 'Purpose', sortable: true },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'creditScore', label: 'Credit Score', sortable: true }
      ];

      const chartData = [
        { x: 'Jan', y: 2400 },
        { x: 'Feb', y: 1800 },
        { x: 'Mar', y: 3200 },
        { x: 'Apr', y: 2900 },
        { x: 'May', y: 3800 },
        { x: 'Jun', y: 4200 }
      ];

      return {
        currentTheme,
        loanAmount,
        monthlyIncome,
        showGenerator,
        loanApplications,
        tableColumns,
        chartData
      };
    },
    computed: {
      themeVariables() {
        return {
          '--theme-primary': this.currentTheme.colors.primary,
          '--theme-secondary': this.currentTheme.colors.secondary,
          '--theme-success': this.currentTheme.colors.success,
          '--theme-warning': this.currentTheme.colors.warning,
          '--theme-danger': this.currentTheme.colors.danger,
          '--theme-background': this.currentTheme.colors.background,
          '--theme-font-family': this.currentTheme.typography.fontFamily,
          '--theme-font-size': `${this.currentTheme.typography.fontSize}px`,
          '--theme-line-height': this.currentTheme.typography.lineHeight,
          '--theme-letter-spacing': `${this.currentTheme.typography.letterSpacing}em`,
          '--theme-border-radius': `${this.currentTheme.spacing.borderRadius}px`,
          '--theme-padding': `${this.currentTheme.spacing.padding}px`
        };
      },

      monthlyPayment() {
        const principal = this.loanAmount;
        const rate = 0.089 / 12; // 8.9% APR
        const payments = 60; // 5 years
        return Math.round((principal * rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1));
      },

      approvalLikelihood() {
        const dti = (this.monthlyPayment * 12) / this.monthlyIncome;
        if (dti < 0.28) return { score: 95, status: 'Excellent' };
        if (dti < 0.36) return { score: 80, status: 'Good' };
        if (dti < 0.43) return { score: 65, status: 'Fair' };
        return { score: 40, status: 'Poor' };
      }
    },
    template: `
      <div :style="themeVariables" style="min-height: 100vh; background: var(--theme-background, #ffffff); font-family: var(--theme-font-family, inherit);">
        <!-- Theme Generator Toggle -->
        <div style="position: fixed; top: 1rem; right: 1rem; z-index: 1000;">
          <button 
            @click="showGenerator = !showGenerator"
            style="background: var(--theme-primary, #3b82f6); color: white; border: none; padding: 0.75rem 1rem; border-radius: var(--theme-border-radius, 8px); cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"
          >
            {{ showGenerator ? 'Hide' : 'Show' }} Theme Editor
          </button>
        </div>

        <!-- Theme Generator Modal -->
        <div v-if="showGenerator" style="position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 999; overflow-y: auto;">
          <div style="min-height: 100vh; padding: 2rem; display: flex; align-items: center; justify-content: center;">
            <div style="background: var(--theme-background, #ffffff); border-radius: var(--theme-border-radius, 8px); max-width: 1200px; width: 100%; max-height: 90vh; overflow-y: auto;">
              <MThemeGenerator 
                :initial-theme="currentTheme"
                @theme-changed="onThemeChanged"
              />
            </div>
          </div>
        </div>

        <!-- Main Application -->
        <div style="padding: 2rem;">
          <!-- Header -->
          <header style="margin-bottom: 3rem; text-align: center;">
            <h1 style="color: var(--theme-primary, #3b82f6); font-size: 2.5rem; font-weight: 700; margin: 0 0 0.5rem 0;">
              Mariner Finance Dashboard
            </h1>
            <p style="color: #6b7280; font-size: 1.125rem; margin: 0;">
              Comprehensive loan management and application system
            </p>
          </header>

          <!-- Key Metrics -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
            <MCard variant="elevated" padding="large">
              <div style="text-align: center;">
                <div style="font-size: 2.5rem; font-weight: bold; color: var(--theme-primary, #3b82f6); margin-bottom: 0.5rem;">
                  $4.2M
                </div>
                <div style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">Total Loans Outstanding</div>
                <div style="color: var(--theme-success, #10b981); font-size: 0.75rem;">↑ 12% from last month</div>
              </div>
            </MCard>

            <MCard variant="elevated" padding="large">
              <div style="text-align: center;">
                <div style="font-size: 2.5rem; font-weight: bold; color: var(--theme-success, #10b981); margin-bottom: 0.5rem;">
                  89.3%
                </div>
                <div style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">Approval Rate</div>
                <div style="color: var(--theme-success, #10b981); font-size: 0.75rem;">↑ 2.1% improvement</div>
              </div>
            </MCard>

            <MCard variant="elevated" padding="large">
              <div style="text-align: center;">
                <div style="font-size: 2.5rem; font-weight: bold; color: var(--theme-warning, #f59e0b); margin-bottom: 0.5rem;">
                  247
                </div>
                <div style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">Active Applications</div>
                <div style="color: var(--theme-primary, #3b82f6); font-size: 0.75rem;">+18 new today</div>
              </div>
            </MCard>

            <MCard variant="elevated" padding="large">
              <div style="text-align: center;">
                <div style="font-size: 2.5rem; font-weight: bold; color: var(--theme-secondary, #6b7280); margin-bottom: 0.5rem;">
                  $26.4K
                </div>
                <div style="color: #6b7280; font-size: 0.875rem; margin-bottom: 0.5rem;">Average Loan Amount</div>
                <div style="color: var(--theme-danger, #ef4444); font-size: 0.75rem;">↓ 3.2% from last month</div>
              </div>
            </MCard>
          </div>

          <!-- Loan Calculator -->
          <MCard 
            title="Personal Loan Calculator" 
            subtitle="Calculate your loan payments and approval likelihood"
            variant="elevated"
            style="margin-bottom: 3rem;"
          >
            <template #actions>
              <MButton variant="primary" size="small">Get Pre-Approved</MButton>
            </template>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
              <div>
                <MSlider
                  v-model="loanAmount"
                  label="Loan Amount"
                  :min="5000"
                  :max="100000"
                  :step="1000"
                  unit="$"
                  :show-tooltip="true"
                  :show-markers="true"
                  :markers="[
                    { value: 10000, label: '$10K' },
                    { value: 25000, label: '$25K' },
                    { value: 50000, label: '$50K' },
                    { value: 75000, label: '$75K' }
                  ]"
                  :format-value="(val) => \`$\${val.toLocaleString()}\`"
                  style="margin-bottom: 2rem;"
                />

                <MSlider
                  v-model="monthlyIncome"
                  label="Annual Income"
                  :min="30000"
                  :max="200000"
                  :step="5000"
                  unit="$"
                  :show-tooltip="true"
                  :format-value="(val) => \`$\${val.toLocaleString()}\`"
                />
              </div>

              <div style="background: #f9fafb; padding: 1.5rem; border-radius: var(--theme-border-radius, 8px);">
                <h4 style="margin: 0 0 1rem 0; color: var(--theme-primary, #3b82f6);">Loan Summary</h4>
                
                <div style="display: grid; gap: 1rem;">
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #6b7280;">Loan Amount:</span>
                    <span style="font-weight: 600;">\${{ loanAmount.toLocaleString() }}</span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #6b7280;">Monthly Payment:</span>
                    <span style="font-weight: 600; color: var(--theme-primary, #3b82f6);">\${{ monthlyPayment.toLocaleString() }}</span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #6b7280;">Interest Rate:</span>
                    <span style="font-weight: 600;">8.90% APR</span>
                  </div>
                  
                  <div style="display: flex; justify-content: space-between;">
                    <span style="color: #6b7280;">Term:</span>
                    <span style="font-weight: 600;">60 months</span>
                  </div>
                  
                  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 0.5rem 0;">
                  
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #6b7280;">Approval Likelihood:</span>
                    <div style="text-align: right;">
                      <div style="font-weight: 600; font-size: 1.25rem;" :style="{ color: approvalLikelihood.score > 80 ? 'var(--theme-success, #10b981)' : approvalLikelihood.score > 60 ? 'var(--theme-warning, #f59e0b)' : 'var(--theme-danger, #ef4444)' }">
                        {{ approvalLikelihood.score }}%
                      </div>
                      <div style="font-size: 0.75rem; color: #6b7280;">{{ approvalLikelihood.status }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <template #footer>
              <div style="display: flex; gap: 1rem; justify-content: center;">
                <MButton variant="primary" size="large">Apply Now</MButton>
                <MButton variant="outline" size="large">Save Quote</MButton>
                <MButton variant="secondary" size="large">Compare Rates</MButton>
              </div>
            </template>
          </MCard>

          <!-- Charts Section -->
          <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 3rem;">
            <MCard title="Monthly Loan Volume" variant="elevated">
              <MChart
                type="line"
                :data="chartData"
                :width="600"
                :height="300"
                :formatters="{
                  y: (value) => \`$\${(value / 1000).toFixed(1)}K\`
                }"
                :show-legend="false"
              />
            </MCard>

            <MCard title="Application Status" variant="elevated">
              <MChart
                type="pie"
                :data="[
                  { label: 'Approved', value: 156 },
                  { label: 'Under Review', value: 89 },
                  { label: 'Pending', value: 42 },
                  { label: 'Rejected', value: 23 }
                ]"
                :width="300"
                :height="300"
                :show-legend="true"
              />
            </MCard>
          </div>

          <!-- Applications Table -->
          <MCard title="Recent Loan Applications" variant="elevated">
            <template #actions>
              <MButton variant="outline" size="small">Export Data</MButton>
              <MButton variant="primary" size="small">New Application</MButton>
            </template>

            <MTable
              :data="loanApplications"
              :columns="tableColumns"
              :show-pagination="true"
              :show-filters="true"
              :selectable="true"
              :actions="[
                { key: 'approve', label: 'Approve', variant: 'success' },
                { key: 'review', label: 'Review', variant: 'primary' },
                { key: 'reject', label: 'Reject', variant: 'danger' }
              ]"
              @action-click="handleTableAction"
            />
          </MCard>
        </div>
      </div>
    `,
    methods: {
      onThemeChanged(theme) {
        this.currentTheme = { ...this.currentTheme, ...theme };
      },
      handleTableAction(action, row) {
        console.log('Table action:', action, 'Row:', row);
      }
    }
  })
};

// Theme comparison showcase
export const ThemeComparison = {
  render: () => ({
    components: { MButton, MCard, MSlider },
    data() {
      return {
        themes: [
          {
            name: 'Default',
            description: 'Clean and modern design',
            colors: { 
              primary: '#3b82f6', 
              success: '#10b981', 
              background: '#ffffff',
              secondary: '#6b7280'
            },
            spacing: { borderRadius: 8, padding: 16 }
          },
          {
            name: 'Financial Pro',
            description: 'Professional financial services',
            colors: { 
              primary: '#1e40af', 
              success: '#059669', 
              background: '#f8fafc',
              secondary: '#374151'
            },
            spacing: { borderRadius: 6, padding: 20 }
          },
          {
            name: 'Dark Mode',
            description: 'Elegant dark interface',
            colors: { 
              primary: '#3b82f6', 
              success: '#10b981', 
              background: '#111827',
              secondary: '#6b7280'
            },
            spacing: { borderRadius: 12, padding: 18 }
          },
          {
            name: 'Minimal',
            description: 'Simple and clean',
            colors: { 
              primary: '#000000', 
              success: '#28a745', 
              background: '#ffffff',
              secondary: '#666666'
            },
            spacing: { borderRadius: 0, padding: 12 }
          }
        ],
        sliderValue: 25000
      };
    },
    template: `
      <div style="padding: 3rem;">
        <div style="text-align: center; margin-bottom: 4rem;">
          <h1 style="font-size: 2.5rem; font-weight: 700; color: #111827; margin: 0 0 1rem 0;">
            Theme Showcase
          </h1>
          <p style="font-size: 1.125rem; color: #6b7280; margin: 0;">
            Compare how different themes affect the same components
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
          <div 
            v-for="theme in themes" 
            :key="theme.name"
            :style="{
              '--theme-primary': theme.colors.primary,
              '--theme-success': theme.colors.success,
              '--theme-background': theme.colors.background,
              '--theme-secondary': theme.colors.secondary,
              '--theme-border-radius': theme.spacing.borderRadius + 'px',
              '--theme-padding': theme.spacing.padding + 'px',
              background: theme.colors.background,
              padding: '2rem',
              borderRadius: theme.spacing.borderRadius + 'px',
              border: '2px solid #e5e7eb',
              color: theme.name === 'Dark Mode' ? '#e5e7eb' : '#111827'
            }"
          >
            <div style="margin-bottom: 2rem; text-align: center;">
              <h3 :style="{ color: theme.colors.primary, margin: '0 0 0.5rem 0', fontSize: '1.5rem', fontWeight: '600' }">
                {{ theme.name }}
              </h3>
              <p :style="{ margin: '0', fontSize: '0.875rem', opacity: '0.8' }">
                {{ theme.description }}
              </p>
            </div>

            <!-- Color Palette -->
            <div style="margin-bottom: 1.5rem;">
              <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem;">
                <div 
                  :style="{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: theme.colors.primary,
                    border: '2px solid rgba(255,255,255,0.2)'
                  }"
                  :title="'Primary: ' + theme.colors.primary"
                ></div>
                <div 
                  :style="{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: theme.colors.success,
                    border: '2px solid rgba(255,255,255,0.2)'
                  }"
                  :title="'Success: ' + theme.colors.success"
                ></div>
                <div 
                  :style="{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    backgroundColor: theme.colors.secondary,
                    border: '2px solid rgba(255,255,255,0.2)'
                  }"
                  :title="'Secondary: ' + theme.colors.secondary"
                ></div>
              </div>
            </div>

            <!-- Sample Components -->
            <div style="space-y: 1rem;">
              <!-- Buttons -->
              <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                <button :style="{ 
                  background: theme.colors.primary, 
                  color: 'white', 
                  border: 'none', 
                  padding: theme.spacing.padding + 'px', 
                  borderRadius: theme.spacing.borderRadius + 'px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }">Primary</button>
                <button :style="{ 
                  background: theme.colors.success, 
                  color: 'white', 
                  border: 'none', 
                  padding: theme.spacing.padding + 'px', 
                  borderRadius: theme.spacing.borderRadius + 'px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }">Success</button>
              </div>

              <!-- Card -->
              <div :style="{ 
                background: theme.name === 'Dark Mode' ? '#1f2937' : (theme.name === 'Financial Pro' ? '#ffffff' : '#f9fafb'), 
                padding: theme.spacing.padding + 'px', 
                borderRadius: theme.spacing.borderRadius + 'px',
                border: '1px solid ' + (theme.name === 'Dark Mode' ? '#374151' : '#e5e7eb'),
                marginBottom: '1rem'
              }">
                <div :style="{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: theme.colors.primary,
                  marginBottom: '0.5rem'
                }">
                  Sample Card
                </div>
                <p :style="{ 
                  margin: '0', 
                  fontSize: '0.875rem', 
                  opacity: '0.8',
                  lineHeight: '1.5'
                }">
                  This card demonstrates the {{ theme.name.toLowerCase() }} theme styling with proper contrast and spacing.
                </p>
              </div>

              <!-- Input -->
              <input 
                type="text" 
                placeholder="Sample input field"
                :style="{ 
                  width: '100%', 
                  padding: theme.spacing.padding + 'px', 
                  borderRadius: theme.spacing.borderRadius + 'px',
                  border: '1px solid ' + (theme.name === 'Dark Mode' ? '#374151' : '#d1d5db'),
                  background: theme.name === 'Dark Mode' ? '#1f2937' : '#ffffff',
                  color: theme.name === 'Dark Mode' ? '#e5e7eb' : '#111827',
                  fontSize: '0.875rem'
                }"
              />

              <!-- Metrics -->
              <div style="margin-top: 1.5rem; text-align: center;">
                <div :style="{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: theme.colors.primary,
                  marginBottom: '0.25rem'
                }">
                  $35,000
                </div>
                <div style="fontSize: '0.75rem'; opacity: '0.8';">
                  Sample Metric
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  })
};