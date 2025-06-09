# Vue 3 Financial UI Library

A comprehensive, production-ready Vue 3 component library combining hierarchical navigation with Material Design UI components, advanced data visualization, and dynamic form rendering for financial services applications.

## 🚀 Features

### Core UI Components
- **Material Design Components**: Buttons, cards, inputs, sliders with consistent styling
- **Data Visualization**: Interactive charts (line, bar, pie) with real-time updates
- **Data Tables**: Advanced tables with sorting, filtering, pagination, and export
- **Form Components**: Dynamic form rendering with validation and storage
- **State Visualization**: Animated transition visualizers for complex workflows

### Financial Services Focus
- **Loan Application Forms**: Multi-step forms with real-time validation
- **Financial Dashboards**: Comprehensive analytics with charts and metrics
- **Credit Assessment**: Built-in credit scoring and DTI calculations
- **Portfolio Management**: Customer and loan portfolio tracking
- **Mobile-First Design**: Responsive components optimized for all devices

### Developer Experience
- **Flat Configuration**: Simple, reusable configuration objects
- **Vue 3 Composition API**: Modern reactive patterns
- **TypeScript Support**: Full type safety and IntelliSense
- **Storybook Integration**: Interactive component documentation
- **Tree Shaking**: Import only what you need

## 📦 Installation

```bash
npm install ecfr-navigator
```

## 🎯 Quick Start

### Basic Usage

```vue
<template>
  <div>
    <!-- Financial Dashboard -->
    <MChart
      type="line"
      title="Loan Performance"
      :data="performanceData"
      :width="600"
      :height="400"
    />
    
    <!-- Loan Applications Table -->
    <MTable
      title="Recent Applications"
      :data="applications"
      :columns="applicationColumns"
      :selectable="true"
      :show-actions="true"
    />
    
    <!-- Interactive Loan Calculator -->
    <MSlider
      v-model="loanAmount"
      label="Loan Amount"
      :min="1000"
      :max="100000"
      unit="$"
      :format-value="(val) => `$${val.toLocaleString()}`"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MChart, MTable, MSlider } from 'ecfr-navigator'

const loanAmount = ref(25000)
const performanceData = [
  { label: 'Applications', data: [/* chart data */] },
  { label: 'Approvals', data: [/* chart data */] }
]
</script>
```

### Complete Plugin Installation

```javascript
import { createApp } from 'vue'
import { ECFRNavigatorPlugin } from 'ecfr-navigator'
import App from './App.vue'

const app = createApp(App)
app.use(ECFRNavigatorPlugin)
app.mount('#app')
```

## 📊 Chart Components

### MChart - Interactive Data Visualization

```vue
<MChart
  type="bar"
  title="Revenue by Loan Type"
  :data="[
    { x: 'Personal', y: 2850000 },
    { x: 'Auto', y: 1950000 },
    { x: 'Mortgage', y: 4200000 }
  ]"
  :formatters="{
    y: (value) => `$${(value / 1000000).toFixed(1)}M`
  }"
  :show-legend="true"
/>
```

**Supported Chart Types:**
- **Line Charts**: Trend analysis, performance tracking
- **Bar Charts**: Categorical comparisons, revenue breakdowns  
- **Pie Charts**: Distribution analysis, portfolio composition

**Features:**
- Interactive tooltips and legends
- Custom formatters for axes and values
- Responsive design with configurable dimensions
- Real-time data updates with Vue reactivity

## 📋 Table Components

### MTable - Advanced Data Tables

```vue
<MTable
  title="Loan Applications"
  :data="applications"
  :columns="[
    { key: 'applicantName', label: 'Applicant', sortable: true },
    { key: 'loanAmount', label: 'Amount', type: 'currency', align: 'right' },
    { key: 'status', label: 'Status', type: 'status' }
  ]"
  :selectable="true"
  :show-filters="true"
  :show-export="true"
  :actions="[
    { key: 'approve', label: 'Approve', variant: 'success' },
    { key: 'reject', label: 'Reject', variant: 'danger' }
  ]"
  @action-click="handleAction"
/>
```

**Features:**
- **Sorting**: Click column headers to sort data
- **Filtering**: Multi-select filters with search
- **Pagination**: Configurable page sizes and navigation
- **Selection**: Single/multiple row selection with bulk actions
- **Export**: CSV export functionality
- **Custom Renderers**: Format currency, dates, status badges

## 🎛️ Form Components

### MSlider - Interactive Range Controls

```vue
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
    { value: 50000, label: '$50K' }
  ]"
  :format-value="(val) => `$${val.toLocaleString()}`"
  variant="primary"
/>
```

### DynamicFormRenderer - Schema-Driven Forms

```vue
<DynamicFormRenderer
  :schema="loanApplicationForm"
  :auto-save="true"
  @submit="handleSubmit"
/>
```

## 📱 Configuration System

### Flat Configuration Objects

```javascript
import { 
  personalLoanFormConfig,
  chartConfigs,
  tableConfigs,
  generateChartData,
  generateTableData
} from 'ecfr-navigator'

// Pre-built configurations for financial services
const loanChart = {
  ...chartConfigs.loanPerformance,
  data: generateChartData('line', { points: 12 })
}

const applicationsTable = {
  ...tableConfigs.loanApplications,
  data: generateTableData('loanApplications', 20)
}
```

## 🎨 Styling and Theming

Built with Tailwind CSS for consistent, professional styling:

```css
/* Custom theme variables */
:root {
  --primary-color: #3b82f6;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
}
```

## 🔧 Advanced Usage

### Real-Time Financial Dashboard

```vue
<template>
  <div class="financial-dashboard">
    <!-- Key Metrics -->
    <div class="metrics-grid">
      <MetricCard
        title="Total Applications"
        :value="analytics.totalApplications"
        trend="up"
      />
      <MetricCard
        title="Approval Rate"
        :value="`${analytics.approvalRate}%`"
        trend="up"
      />
    </div>
    
    <!-- Interactive Charts -->
    <div class="charts-section">
      <MChart
        type="line"
        title="Monthly Trends"
        :data="trendsData"
        :width="800"
        :height="400"
      />
      
      <MChart
        type="pie"
        title="Portfolio Distribution"
        :data="portfolioData"
        :show-legend="true"
      />
    </div>
    
    <!-- Live Applications Table -->
    <MTable
      title="Live Applications"
      :data="applications"
      :columns="applicationColumns"
      :refresh-interval="30000"
      @action-click="handleApplicationAction"
    />
  </div>
</template>
```

### Mobile-Optimized Loan Calculator

```vue
<template>
  <div class="mobile-calculator">
    <MSlider
      v-model="loanAmount"
      label="Loan Amount"
      :min="1000"
      :max="50000"
      size="large"
      :show-tooltip="true"
    />
    
    <div class="calculation-results">
      <div class="result-item">
        <span>Monthly Payment:</span>
        <span class="amount">${{ monthlyPayment }}</span>
      </div>
      <div class="result-item">
        <span>Total Interest:</span>
        <span class="amount">${{ totalInterest }}</span>
      </div>
    </div>
  </div>
</template>
```

## 🧪 Testing and Storybook

Interactive component documentation and testing:

```bash
# Start Storybook development server
npm run storybook

# Build static Storybook
npm run build-storybook
```

Visit the Storybook to explore all components with live examples:
- Financial Dashboard demos
- Loan application workflows
- Interactive component showcase
- Mobile-responsive examples

## 📚 Component API Reference

### MChart Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'line' \| 'bar' \| 'pie'` | `'line'` | Chart type |
| `data` | `Array` | `[]` | Chart data |
| `width` | `Number` | `400` | Chart width |
| `height` | `Number` | `300` | Chart height |
| `title` | `String` | - | Chart title |
| `showLegend` | `Boolean` | `false` | Show legend |
| `formatters` | `Object` | `{}` | Axis formatters |

### MTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `Array` | `[]` | Table data |
| `columns` | `Array` | `[]` | Column definitions |
| `selectable` | `Boolean` | `false` | Enable row selection |
| `showFilters` | `Boolean` | `false` | Show filter controls |
| `showPagination` | `Boolean` | `true` | Enable pagination |
| `pageSize` | `Number` | `10` | Rows per page |
| `actions` | `Array` | `[]` | Row actions |

### MSlider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Number` | `0` | Current value |
| `min` | `Number` | `0` | Minimum value |
| `max` | `Number` | `100` | Maximum value |
| `step` | `Number` | `1` | Step increment |
| `unit` | `String` | - | Display unit |
| `showTooltip` | `Boolean` | `false` | Show value tooltip |
| `markers` | `Array` | `[]` | Value markers |

## 🚀 Production Deployment

Built for production use with:

- **Performance**: Optimized rendering and minimal bundle size
- **Accessibility**: ARIA labels and keyboard navigation
- **Security**: Input validation and XSS protection
- **Scalability**: Efficient data handling for large datasets
- **Browser Support**: Modern browsers with graceful degradation

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ for financial services applications**