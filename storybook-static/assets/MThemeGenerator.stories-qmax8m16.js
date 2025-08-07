import{M as i}from"./MThemeGenerator-DKxcPvbC.js";import{M as T}from"./MButton-ClHapibe.js";import{M as x}from"./MCard-BMaDLVhA.js";import{M}from"./MSlider-CAxFof3m.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const C={title:"Tools/Theming/Theme Generator",component:i,parameters:{layout:"fullscreen",docs:{description:{component:"A comprehensive theme generator that allows users to customize colors, typography, spacing, and component styles with real-time preview and export functionality."}}},argTypes:{initialTheme:{control:{type:"object"},description:"Initial theme configuration to load"}}},s={colors:{primary:"#3b82f6",secondary:"#6b7280",success:"#10b981",warning:"#f59e0b",danger:"#ef4444",background:"#ffffff"},typography:{fontFamily:"Inter, system-ui, sans-serif",fontSize:16,lineHeight:1.5,letterSpacing:0},spacing:{base:4,borderRadius:8,padding:16}},n={args:{initialTheme:s},render:r=>({components:{MThemeGenerator:i},setup(){return{args:r}},template:`
      <MThemeGenerator 
        v-bind="args"
        @theme-changed="onThemeChanged"
        @theme-saved="onThemeSaved"
        @theme-exported="onThemeExported"
      />
    `,methods:{onThemeChanged(e){console.log("Theme changed:",e)},onThemeSaved(e){console.log("Theme saved:",e)},onThemeExported(e){console.log("Theme exported:",e)}}})},a={args:{initialTheme:{colors:{primary:"#1e40af",secondary:"#374151",success:"#059669",warning:"#d97706",danger:"#dc2626",background:"#f8fafc"},typography:{fontFamily:"Roboto, sans-serif",fontSize:15,lineHeight:1.6,letterSpacing:.01},spacing:{base:4,borderRadius:6,padding:20}}},render:n.render},o={args:{initialTheme:{colors:{primary:"#3b82f6",secondary:"#6b7280",success:"#10b981",warning:"#f59e0b",danger:"#ef4444",background:"#111827"},typography:{fontFamily:"Inter, system-ui, sans-serif",fontSize:16,lineHeight:1.5,letterSpacing:0},spacing:{base:4,borderRadius:12,padding:18}}},render:n.render,parameters:{backgrounds:{default:"dark"}}},w=r=>({components:{MThemeGenerator:i,MButton:T,MCard:x,MSlider:M},setup(){return{args:r}},data(){return{currentTheme:r.initialTheme||s,showGenerator:!0,loanAmount:25e3}},computed:{themeVariables(){return{"--theme-primary":this.currentTheme.colors.primary,"--theme-secondary":this.currentTheme.colors.secondary,"--theme-success":this.currentTheme.colors.success,"--theme-warning":this.currentTheme.colors.warning,"--theme-danger":this.currentTheme.colors.danger,"--theme-background":this.currentTheme.colors.background,"--theme-font-family":this.currentTheme.typography.fontFamily,"--theme-font-size":`${this.currentTheme.typography.fontSize}px`,"--theme-line-height":this.currentTheme.typography.lineHeight,"--theme-letter-spacing":`${this.currentTheme.typography.letterSpacing}em`,"--theme-border-radius":`${this.currentTheme.spacing.borderRadius}px`,"--theme-padding":`${this.currentTheme.spacing.padding}px`}}},template:`
    <div :style="themeVariables" style="min-height: 100vh; background: var(--theme-background, #ffffff);">
      <div style="padding: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <h1 style="color: var(--theme-primary, #3b82f6); font-family: var(--theme-font-family, inherit); margin: 0;">
            Theme Generator Demo
          </h1>
          <button 
            @click="showGenerator = !showGenerator"
            style="background: var(--theme-primary, #3b82f6); color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--theme-border-radius, 8px); cursor: pointer;"
          >
            {{ showGenerator ? 'Hide' : 'Show' }} Theme Generator
          </button>
        </div>
        
        <div v-if="showGenerator">
          <MThemeGenerator 
            :initial-theme="currentTheme"
            @theme-changed="onThemeChanged"
            @theme-saved="onThemeSaved"
            @theme-exported="onThemeExported"
          />
        </div>
        
        <div v-else style="max-width: 800px; margin: 0 auto;">
          <h2 style="color: var(--theme-primary, #3b82f6); font-family: var(--theme-font-family, inherit); margin-bottom: 2rem;">
            Live Component Preview
          </h2>
          
          <!-- Sample Application UI -->
          <div style="display: grid; gap: 2rem;">
            <!-- Header Card -->
            <MCard 
              title="Loan Application Dashboard" 
              subtitle="Manage your financial applications"
              variant="elevated"
            >
              <template #actions>
                <MButton variant="primary" size="small">New Application</MButton>
              </template>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: var(--theme-border-radius, 8px);">
                  <div style="font-size: 2rem; font-weight: bold; color: var(--theme-primary, #3b82f6);">$2.4M</div>
                  <div style="color: #666; font-size: 0.875rem;">Total Loans</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: var(--theme-border-radius, 8px);">
                  <div style="font-size: 2rem; font-weight: bold; color: var(--theme-success, #10b981);">87%</div>
                  <div style="color: #666; font-size: 0.875rem;">Approval Rate</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: var(--theme-border-radius, 8px);">
                  <div style="font-size: 2rem; font-weight: bold; color: var(--theme-warning, #f59e0b);">24</div>
                  <div style="color: #666; font-size: 0.875rem;">Pending</div>
                </div>
              </div>
              
              <MSlider
                v-model="loanAmount"
                label="Loan Amount"
                :min="1000"
                :max="100000"
                :step="1000"
                unit="$"
                :show-tooltip="true"
                :format-value="(val) => \`$\${val.toLocaleString()}\`"
              />
            </MCard>
            
            <!-- Action Buttons -->
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
              <MButton variant="primary" size="large">Apply for Loan</MButton>
              <MButton variant="secondary" size="large">View Applications</MButton>
              <MButton variant="success" size="large">Make Payment</MButton>
              <MButton variant="outline" size="large">Contact Support</MButton>
              <MButton variant="danger" size="large">Cancel Application</MButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,methods:{onThemeChanged(e){this.currentTheme={...this.currentTheme,...e},console.log("Theme changed:",e)},onThemeSaved(e){console.log("Theme saved:",e),alert(`Theme "${e.name}" saved successfully!`)},onThemeExported(e){console.log("Theme exported:",e),alert(`Theme exported as ${e.fileName}`)}}}),t=w.bind({});t.args={initialTheme:s};var m,d,l;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    initialTheme: defaultInitialTheme
  },
  render: args => ({
    components: {
      MThemeGenerator
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <MThemeGenerator 
        v-bind="args"
        @theme-changed="onThemeChanged"
        @theme-saved="onThemeSaved"
        @theme-exported="onThemeExported"
      />
    \`,
    methods: {
      onThemeChanged(theme) {
        console.log('Theme changed:', theme);
      },
      onThemeSaved(themeData) {
        console.log('Theme saved:', themeData);
      },
      onThemeExported(exportData) {
        console.log('Theme exported:', exportData);
      }
    }
  })
}`,...(l=(d=n.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var h,c,p;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    initialTheme: {
      colors: {
        primary: '#1e40af',
        secondary: '#374151',
        success: '#059669',
        warning: '#d97706',
        danger: '#dc2626',
        background: '#f8fafc'
      },
      typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 15,
        lineHeight: 1.6,
        letterSpacing: 0.01
      },
      spacing: {
        base: 4,
        borderRadius: 6,
        padding: 20
      }
    }
  },
  render: Default.render
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var g,u,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    initialTheme: {
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
        borderRadius: 12,
        padding: 18
      }
    }
  },
  render: Default.render,
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(f=(u=o.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var v,y,b;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
  components: {
    MThemeGenerator,
    MButton,
    MCard,
    MSlider
  },
  setup() {
    return {
      args
    };
  },
  data() {
    return {
      currentTheme: args.initialTheme || defaultInitialTheme,
      showGenerator: true,
      loanAmount: 25000
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
        '--theme-font-size': \`\${this.currentTheme.typography.fontSize}px\`,
        '--theme-line-height': this.currentTheme.typography.lineHeight,
        '--theme-letter-spacing': \`\${this.currentTheme.typography.letterSpacing}em\`,
        '--theme-border-radius': \`\${this.currentTheme.spacing.borderRadius}px\`,
        '--theme-padding': \`\${this.currentTheme.spacing.padding}px\`
      };
    }
  },
  template: \`
    <div :style="themeVariables" style="min-height: 100vh; background: var(--theme-background, #ffffff);">
      <div style="padding: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <h1 style="color: var(--theme-primary, #3b82f6); font-family: var(--theme-font-family, inherit); margin: 0;">
            Theme Generator Demo
          </h1>
          <button 
            @click="showGenerator = !showGenerator"
            style="background: var(--theme-primary, #3b82f6); color: white; border: none; padding: 0.5rem 1rem; border-radius: var(--theme-border-radius, 8px); cursor: pointer;"
          >
            {{ showGenerator ? 'Hide' : 'Show' }} Theme Generator
          </button>
        </div>
        
        <div v-if="showGenerator">
          <MThemeGenerator 
            :initial-theme="currentTheme"
            @theme-changed="onThemeChanged"
            @theme-saved="onThemeSaved"
            @theme-exported="onThemeExported"
          />
        </div>
        
        <div v-else style="max-width: 800px; margin: 0 auto;">
          <h2 style="color: var(--theme-primary, #3b82f6); font-family: var(--theme-font-family, inherit); margin-bottom: 2rem;">
            Live Component Preview
          </h2>
          
          <!-- Sample Application UI -->
          <div style="display: grid; gap: 2rem;">
            <!-- Header Card -->
            <MCard 
              title="Loan Application Dashboard" 
              subtitle="Manage your financial applications"
              variant="elevated"
            >
              <template #actions>
                <MButton variant="primary" size="small">New Application</MButton>
              </template>
              
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: var(--theme-border-radius, 8px);">
                  <div style="font-size: 2rem; font-weight: bold; color: var(--theme-primary, #3b82f6);">$2.4M</div>
                  <div style="color: #666; font-size: 0.875rem;">Total Loans</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: var(--theme-border-radius, 8px);">
                  <div style="font-size: 2rem; font-weight: bold; color: var(--theme-success, #10b981);">87%</div>
                  <div style="color: #666; font-size: 0.875rem;">Approval Rate</div>
                </div>
                <div style="text-align: center; padding: 1rem; background: #f8fafc; border-radius: var(--theme-border-radius, 8px);">
                  <div style="font-size: 2rem; font-weight: bold; color: var(--theme-warning, #f59e0b);">24</div>
                  <div style="color: #666; font-size: 0.875rem;">Pending</div>
                </div>
              </div>
              
              <MSlider
                v-model="loanAmount"
                label="Loan Amount"
                :min="1000"
                :max="100000"
                :step="1000"
                unit="$"
                :show-tooltip="true"
                :format-value="(val) => \\\`$\\\${val.toLocaleString()}\\\`"
              />
            </MCard>
            
            <!-- Action Buttons -->
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
              <MButton variant="primary" size="large">Apply for Loan</MButton>
              <MButton variant="secondary" size="large">View Applications</MButton>
              <MButton variant="success" size="large">Make Payment</MButton>
              <MButton variant="outline" size="large">Contact Support</MButton>
              <MButton variant="danger" size="large">Cancel Application</MButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`,
  methods: {
    onThemeChanged(theme) {
      this.currentTheme = {
        ...this.currentTheme,
        ...theme
      };
      console.log('Theme changed:', theme);
    },
    onThemeSaved(themeData) {
      console.log('Theme saved:', themeData);
      alert(\`Theme "\${themeData.name}" saved successfully!\`);
    },
    onThemeExported(exportData) {
      console.log('Theme exported:', exportData);
      alert(\`Theme exported as \${exportData.fileName}\`);
    }
  }
})`,...(b=(y=t.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};const D=["Default","FinancialTheme","DarkTheme","InteractiveDemo"];export{o as DarkTheme,n as Default,a as FinancialTheme,t as InteractiveDemo,D as __namedExportsOrder,C as default};
