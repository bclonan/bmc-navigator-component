export default {
  title: 'Getting Started/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Vue 3 Financial UI Library - A comprehensive component system for financial services applications with Material Design principles, advanced data visualization, and responsive layouts.'
      }
    }
  }
};

const Template = () => ({
  template: `
    <div class="overview-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-text">Vue 3 Component Library</span>
          </div>
          <h1 class="hero-title">Financial UI Components</h1>
          <p class="hero-description">
            A production-ready Vue 3 component library designed for financial services applications. 
            Features Material Design components, advanced data visualization, dynamic forms, and responsive layouts.
          </p>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Components</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">8</div>
              <div class="stat-label">Categories</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">100%</div>
              <div class="stat-label">Mobile Ready</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Component Categories -->
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">Component Categories</h2>
          <p class="section-description">
            Organized following Vue Storefront's design system principles for maximum developer productivity.
          </p>
          
          <div class="categories-grid">
            <!-- Layout Components -->
            <div class="category-card">
              <div class="category-icon layout-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="6" rx="2" fill="currentColor" opacity="0.8"/>
                  <rect x="4" y="13" width="8" height="15" rx="2" fill="currentColor" opacity="0.6"/>
                  <rect x="15" y="13" width="13" height="15" rx="2" fill="currentColor"/>
                </svg>
              </div>
              <h3 class="category-title">Layout</h3>
              <p class="category-description">Navigation bars, layouts, footers, and structural components for building complete page layouts.</p>
              <div class="category-components">
                <span class="component-tag">Navbar</span>
                <span class="component-tag">Layout</span>
                <span class="component-tag">Footer</span>
              </div>
            </div>

            <!-- UI Components -->
            <div class="category-card">
              <div class="category-icon ui-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="8" width="24" height="4" rx="2" fill="currentColor" opacity="0.8"/>
                  <rect x="4" y="16" width="16" height="4" rx="2" fill="currentColor" opacity="0.6"/>
                  <circle cx="26" cy="18" r="2" fill="currentColor"/>
                  <rect x="4" y="24" width="12" height="4" rx="2" fill="currentColor" opacity="0.4"/>
                </svg>
              </div>
              <h3 class="category-title">UI Components</h3>
              <p class="category-description">Buttons, cards, forms, sliders, and interactive elements following Material Design principles.</p>
              <div class="category-components">
                <span class="component-tag">Button</span>
                <span class="component-tag">Card</span>
                <span class="component-tag">Slider</span>
                <span class="component-tag">Forms</span>
              </div>
            </div>

            <!-- Data Visualization -->
            <div class="category-card">
              <div class="category-icon data-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 24L10 18L16 22L28 10" stroke="currentColor" stroke-width="3" fill="none"/>
                  <circle cx="4" cy="24" r="2" fill="currentColor"/>
                  <circle cx="10" cy="18" r="2" fill="currentColor"/>
                  <circle cx="16" cy="22" r="2" fill="currentColor"/>
                  <circle cx="28" cy="10" r="2" fill="currentColor"/>
                </svg>
              </div>
              <h3 class="category-title">Data Visualization</h3>
              <p class="category-description">Interactive charts, tables, and data presentation components for financial analytics.</p>
              <div class="category-components">
                <span class="component-tag">Charts</span>
                <span class="component-tag">Tables</span>
                <span class="component-tag">Analytics</span>
              </div>
            </div>

            <!-- Forms & Validation -->
            <div class="category-card">
              <div class="category-icon forms-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="6" y="4" width="20" height="24" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
                  <path d="M10 12H22" stroke="currentColor" stroke-width="2"/>
                  <path d="M10 16H18" stroke="currentColor" stroke-width="2"/>
                  <path d="M10 20H20" stroke="currentColor" stroke-width="2"/>
                  <circle cx="22" cy="24" r="6" fill="currentColor" opacity="0.8"/>
                  <path d="M20 24L21.5 25.5L24 23" stroke="white" stroke-width="2" fill="none"/>
                </svg>
              </div>
              <h3 class="category-title">Forms & Validation</h3>
              <p class="category-description">Dynamic form rendering, advanced validation patterns, and loan application workflows.</p>
              <div class="category-components">
                <span class="component-tag">Dynamic Forms</span>
                <span class="component-tag">Validation</span>
                <span class="component-tag">Loan Flow</span>
              </div>
            </div>

            <!-- Navigation -->
            <div class="category-card">
              <div class="category-icon nav-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M4 8H28" stroke="currentColor" stroke-width="3"/>
                  <path d="M4 16H20" stroke="currentColor" stroke-width="3"/>
                  <path d="M4 24H24" stroke="currentColor" stroke-width="3"/>
                  <circle cx="26" cy="16" r="4" fill="currentColor" opacity="0.6"/>
                </svg>
              </div>
              <h3 class="category-title">Navigation</h3>
              <p class="category-description">Hierarchical navigation, breadcrumbs, and ECFR-style document browsing components.</p>
              <div class="category-components">
                <span class="component-tag">ECFR Navigator</span>
                <span class="component-tag">Breadcrumbs</span>
                <span class="component-tag">Search</span>
              </div>
            </div>

            <!-- Demos -->
            <div class="category-card">
              <div class="category-icon demo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="2" y="6" width="28" height="20" rx="3" stroke="currentColor" stroke-width="2" fill="none"/>
                  <circle cx="16" cy="16" r="6" fill="currentColor" opacity="0.6"/>
                  <path d="M14 14L18 16L14 18V14Z" fill="white"/>
                </svg>
              </div>
              <h3 class="category-title">Demos & Examples</h3>
              <p class="category-description">Complete application demos showcasing real-world usage patterns and integrations.</p>
              <div class="category-components">
                <span class="component-tag">Dashboard</span>
                <span class="component-tag">Loan App</span>
                <span class="component-tag">Showcase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Key Features</h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">📱</div>
              <h3 class="feature-title">Mobile First</h3>
              <p class="feature-description">Responsive design with touch-friendly interfaces optimized for all devices.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎨</div>
              <h3 class="feature-title">Material Design</h3>
              <p class="feature-description">Consistent styling following Google's Material Design principles.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <h3 class="feature-title">Vue 3 + Composition API</h3>
              <p class="feature-description">Modern reactive patterns with TypeScript support and tree shaking.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🛡️</div>
              <h3 class="feature-title">Financial Focus</h3>
              <p class="feature-description">Built specifically for loan applications, credit assessment, and financial workflows.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📊</div>
              <h3 class="feature-title">Data Visualization</h3>
              <p class="feature-description">Interactive charts and tables for financial analytics and reporting.</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🔧</div>
              <h3 class="feature-title">Flat Configuration</h3>
              <p class="feature-description">Simple, reusable configuration objects that work in any JavaScript environment.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Getting Started -->
      <section class="getting-started-section">
        <div class="container">
          <h2 class="section-title">Getting Started</h2>
          <div class="code-example">
            <div class="code-header">
              <span class="code-language">bash</span>
            </div>
            <pre class="code-block"><code>npm install ecfr-navigator</code></pre>
          </div>
          
          <div class="code-example">
            <div class="code-header">
              <span class="code-language">javascript</span>
            </div>
            <pre class="code-block"><code>import { createApp } from 'vue'
import { ECFRNavigatorPlugin } from 'ecfr-navigator'
import App from './App.vue'

const app = createApp(App)
app.use(ECFRNavigatorPlugin)
app.mount('#app')</code></pre>
          </div>

          <div class="code-example">
            <div class="code-header">
              <span class="code-language">vue</span>
            </div>
            <pre class="code-block"><code>&lt;template&gt;
  &lt;MLayout&gt;
    &lt;MChart type="line" :data="chartData" /&gt;
    &lt;MTable :data="tableData" :columns="columns" /&gt;
    &lt;MSlider v-model="loanAmount" label="Loan Amount" /&gt;
  &lt;/MLayout&gt;
&lt;/template&gt;</code></pre>
          </div>
        </div>
      </section>
    </div>
  `,
  
  style: `
    <style scoped>
    .overview-container {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 5rem 2rem;
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 0.5rem 1rem;
      border-radius: 2rem;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      letter-spacing: -0.02em;
    }

    .hero-description {
      font-size: 1.25rem;
      margin: 0 0 3rem 0;
      opacity: 0.9;
      line-height: 1.7;
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 3rem;
      margin-top: 3rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      display: block;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
      margin-top: 0.5rem;
    }

    /* Sections */
    .categories-section,
    .features-section,
    .getting-started-section {
      padding: 5rem 2rem;
    }

    .categories-section {
      background: #f8fafc;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin: 0 0 1rem 0;
      color: #1a202c;
    }

    .section-description {
      text-align: center;
      font-size: 1.125rem;
      color: #64748b;
      margin: 0 0 3rem 0;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Categories Grid */
    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .category-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .category-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
    }

    .category-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .layout-icon { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }
    .ui-icon { background: linear-gradient(135deg, #f093fb, #f5576c); color: white; }
    .data-icon { background: linear-gradient(135deg, #4facfe, #00f2fe); color: white; }
    .forms-icon { background: linear-gradient(135deg, #43e97b, #38f9d7); color: white; }
    .nav-icon { background: linear-gradient(135deg, #fa709a, #fee140); color: white; }
    .demo-icon { background: linear-gradient(135deg, #a8edea, #fed6e3); color: #333; }

    .category-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: #1a202c;
    }

    .category-description {
      color: #64748b;
      margin: 0 0 1.5rem 0;
      line-height: 1.6;
    }

    .category-components {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .component-tag {
      background: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Features Grid */
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .feature-item {
      text-align: center;
      padding: 2rem;
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 1rem 0;
      color: #1a202c;
    }

    .feature-description {
      color: #64748b;
      margin: 0;
    }

    /* Code Examples */
    .code-example {
      background: #1a202c;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      overflow: hidden;
    }

    .code-header {
      background: #2d3748;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #4a5568;
    }

    .code-language {
      color: #a0aec0;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .code-block {
      margin: 0;
      padding: 1.5rem;
      overflow-x: auto;
    }

    .code-block code {
      color: #e2e8f0;
      font-family: 'Fira Code', Consolas, monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-stats {
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .categories-grid {
        grid-template-columns: 1fr;
      }
      
      .section-title {
        font-size: 2rem;
      }
    }
    </style>
  `
});

export const ComponentLibrary = Template.bind({});
ComponentLibrary.parameters = {
  docs: {
    source: {
      code: 'View the source code in the "Docs" tab for implementation details.',
    },
  },
};