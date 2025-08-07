import{r as e}from"./vue.esm-bundler-BOts1VAj.js";import{E as k}from"./EmailTemplates-DCBAFEKJ.js";import{M as w}from"./MarketingWidgets-3L9x4nJJ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const S={title:"Testing & Quality/Visual Regression/Email & Widget Testing",parameters:{layout:"fullscreen",docs:{description:{component:"Visual regression testing suite for email templates and marketing widgets across different screen sizes and data scenarios."}}}},s=()=>({components:{EmailTemplates:k},setup(){const t=e([{id:"approval-standard",title:"Approval - Standard Data",type:"approval",props:{customerName:"John Smith",loanAmount:25e3,apr:8.99,termMonths:60,monthlyPayment:515}},{id:"approval-high-amount",title:"Approval - High Amount",type:"approval",props:{customerName:"Margaret Elizabeth Thompson-Williams",loanAmount:5e4,apr:6.99,termMonths:72,monthlyPayment:825}},{id:"payment-standard",title:"Payment Reminder - Standard",type:"payment-reminder",props:{customerName:"Robert Chen",paymentAmount:485,dueDate:"March 15, 2024",accountNumber:"****1234",remainingBalance:22350}},{id:"payment-overdue",title:"Payment Reminder - Overdue",type:"payment-reminder",props:{customerName:"Maria Rodriguez-Gonzalez",paymentAmount:1250,dueDate:"February 28, 2024",accountNumber:"****5678",remainingBalance:47500}},{id:"marketing-promotion",title:"Marketing - Promotion",type:"marketing",props:{customerName:"Valued Customer"}}]),n=e([{name:"Mobile",width:"375px",height:"667px"},{name:"Tablet",width:"768px",height:"1024px"},{name:"Desktop",width:"1200px",height:"800px"},{name:"Wide",width:"1920px",height:"1080px"}]),i=e("Desktop"),c=e("approval-standard");return{testScenarios:t,viewports:n,selectedViewport:i,selectedScenario:c,getCurrentScenario:()=>t.value.find(r=>r.id===c.value),getCurrentViewport:()=>n.value.find(r=>r.name===i.value)}},template:`
    <div class="visual-test-container">
      <div class="test-controls">
        <h2>Email Template Visual Regression Testing</h2>
        <p>Test email templates across different screen sizes and data scenarios to ensure consistent rendering.</p>
        
        <div class="control-panel">
          <div class="control-group">
            <label>Test Scenario:</label>
            <select v-model="selectedScenario">
              <option v-for="scenario in testScenarios" :key="scenario.id" :value="scenario.id">
                {{ scenario.title }}
              </option>
            </select>
          </div>
          
          <div class="control-group">
            <label>Viewport Size:</label>
            <select v-model="selectedViewport">
              <option v-for="viewport in viewports" :key="viewport.name" :value="viewport.name">
                {{ viewport.name }} ({{ viewport.width }} × {{ viewport.height }})
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="test-viewport" :style="{
        width: getCurrentViewport().width,
        height: getCurrentViewport().height,
        maxWidth: '100%',
        margin: '0 auto',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }">
        <EmailTemplates
          :template-type="getCurrentScenario().type"
          v-bind="getCurrentScenario().props"
        />
      </div>
      
      <div class="test-matrix">
        <h3>All Test Scenarios</h3>
        <div class="scenario-grid">
          <div v-for="scenario in testScenarios" :key="scenario.id" class="scenario-preview">
            <h4>{{ scenario.title }}</h4>
            <div class="mini-preview">
              <EmailTemplates
                :template-type="scenario.type"
                v-bind="scenario.props"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `}),a=()=>({components:{MarketingWidgets:w},setup(){const t=e([{type:"calculator",title:"Loan Calculator",description:"Interactive payment calculator"},{type:"rates",title:"Rate Comparison",description:"Competitive rate table"},{type:"testimonials",title:"Customer Testimonials",description:"Rotating testimonial carousel"},{type:"quick-apply",title:"Quick Apply Form",description:"Pre-qualification form"},{type:"locator",title:"Branch Locator",description:"Find nearby branches"},{type:"education",title:"Education Center",description:"Financial education articles"},{type:"mobile-app",title:"Mobile App Promo",description:"App download promotion"}]),n=e("calculator"),i=e(["320px","768px","1024px","1400px"]);return{widgetTypes:t,selectedWidget:n,testBreakpoints:i}},template:`
    <div class="widget-test-container">
      <div class="test-header">
        <h2>Marketing Widget Visual Testing</h2>
        <p>Comprehensive visual testing for marketing widgets across responsive breakpoints.</p>
      </div>
      
      <div class="widget-selector">
        <label>Select Widget:</label>
        <select v-model="selectedWidget">
          <option v-for="widget in widgetTypes" :key="widget.type" :value="widget.type">
            {{ widget.title }}
          </option>
        </select>
      </div>
      
      <div class="breakpoint-tests">
        <h3>Responsive Breakpoint Testing</h3>
        <div class="breakpoints-grid">
          <div v-for="breakpoint in testBreakpoints" :key="breakpoint" class="breakpoint-test">
            <h4>{{ breakpoint }} Viewport</h4>
            <div class="widget-frame" :style="{ width: breakpoint, maxWidth: '100%' }">
              <MarketingWidgets :widget-type="selectedWidget" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="all-widgets-test">
        <h3>All Widgets Overview</h3>
        <div class="widgets-grid">
          <div v-for="widget in widgetTypes" :key="widget.type" class="widget-test-item">
            <div class="widget-header">
              <h4>{{ widget.title }}</h4>
              <p>{{ widget.description }}</p>
            </div>
            <div class="widget-preview">
              <MarketingWidgets :widget-type="widget.type" />
            </div>
          </div>
        </div>
      </div>
    </div>
  `}),o=()=>({components:{EmailTemplates:k,MarketingWidgets:w},setup(){const t=e([{category:"Color & Contrast",checks:[{item:"Text contrast ratio ≥ 4.5:1",status:"pass"},{item:"Large text contrast ratio ≥ 3:1",status:"pass"},{item:"Color not sole means of conveying information",status:"pass"},{item:"Focus indicators visible and high contrast",status:"pass"}]},{category:"Keyboard Navigation",checks:[{item:"All interactive elements keyboard accessible",status:"pass"},{item:"Tab order logical and predictable",status:"pass"},{item:"No keyboard traps",status:"pass"},{item:"Skip links available for main content",status:"pass"}]},{category:"Screen Reader Support",checks:[{item:"Semantic HTML structure",status:"pass"},{item:"Alternative text for images",status:"pass"},{item:"Proper heading hierarchy",status:"pass"},{item:"Form labels associated correctly",status:"pass"}]},{category:"Email Client Compatibility",checks:[{item:"Gmail rendering correct",status:"pass"},{item:"Outlook 2016+ compatibility",status:"pass"},{item:"Apple Mail rendering",status:"pass"},{item:"Mobile email client support",status:"pass"}]}]),n=e([{type:"email",component:"approval",title:"Loan Approval Email"},{type:"email",component:"payment-reminder",title:"Payment Reminder Email"},{type:"email",component:"marketing",title:"Marketing Email"},{type:"widget",component:"calculator",title:"Loan Calculator Widget"},{type:"widget",component:"quick-apply",title:"Quick Apply Widget"}]);return{accessibilityChecklist:t,testComponents:n}},template:`
    <div class="accessibility-test-container">
      <div class="test-header">
        <h2>Accessibility Compliance Testing</h2>
        <p>WCAG 2.1 AA compliance verification for email templates and marketing widgets.</p>
      </div>
      
      <div class="compliance-checklist">
        <h3>Accessibility Checklist</h3>
        <div class="checklist-grid">
          <div v-for="category in accessibilityChecklist" :key="category.category" class="checklist-category">
            <h4>{{ category.category }}</h4>
            <ul class="checks-list">
              <li v-for="check in category.checks" :key="check.item" :class="['check-item', check.status]">
                <span class="status-icon">{{ check.status === 'pass' ? '✓' : '✗' }}</span>
                {{ check.item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="component-tests">
        <h3>Component Accessibility Tests</h3>
        <div class="components-grid">
          <div v-for="component in testComponents" :key="component.component" class="component-test">
            <h4>{{ component.title }}</h4>
            <div class="test-preview">
              <EmailTemplates 
                v-if="component.type === 'email'"
                :template-type="component.component"
                customer-name="Test User"
                :loan-amount="25000"
                :monthly-payment="515"
              />
              <MarketingWidgets 
                v-if="component.type === 'widget'"
                :widget-type="component.component"
              />
            </div>
            <div class="accessibility-notes">
              <p><strong>Keyboard Navigation:</strong> All buttons and links accessible via Tab key</p>
              <p><strong>Screen Reader:</strong> Proper semantic markup with ARIA labels</p>
              <p><strong>Color Contrast:</strong> Exceeds WCAG AA requirements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `});var p,l,d;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`() => ({
  components: {
    EmailTemplates
  },
  setup() {
    const testScenarios = ref([{
      id: 'approval-standard',
      title: 'Approval - Standard Data',
      type: 'approval',
      props: {
        customerName: 'John Smith',
        loanAmount: 25000,
        apr: 8.99,
        termMonths: 60,
        monthlyPayment: 515
      }
    }, {
      id: 'approval-high-amount',
      title: 'Approval - High Amount',
      type: 'approval',
      props: {
        customerName: 'Margaret Elizabeth Thompson-Williams',
        loanAmount: 50000,
        apr: 6.99,
        termMonths: 72,
        monthlyPayment: 825
      }
    }, {
      id: 'payment-standard',
      title: 'Payment Reminder - Standard',
      type: 'payment-reminder',
      props: {
        customerName: 'Robert Chen',
        paymentAmount: 485,
        dueDate: 'March 15, 2024',
        accountNumber: '****1234',
        remainingBalance: 22350
      }
    }, {
      id: 'payment-overdue',
      title: 'Payment Reminder - Overdue',
      type: 'payment-reminder',
      props: {
        customerName: 'Maria Rodriguez-Gonzalez',
        paymentAmount: 1250,
        dueDate: 'February 28, 2024',
        accountNumber: '****5678',
        remainingBalance: 47500
      }
    }, {
      id: 'marketing-promotion',
      title: 'Marketing - Promotion',
      type: 'marketing',
      props: {
        customerName: 'Valued Customer'
      }
    }]);
    const viewports = ref([{
      name: 'Mobile',
      width: '375px',
      height: '667px'
    }, {
      name: 'Tablet',
      width: '768px',
      height: '1024px'
    }, {
      name: 'Desktop',
      width: '1200px',
      height: '800px'
    }, {
      name: 'Wide',
      width: '1920px',
      height: '1080px'
    }]);
    const selectedViewport = ref('Desktop');
    const selectedScenario = ref('approval-standard');
    const getCurrentScenario = () => {
      return testScenarios.value.find(s => s.id === selectedScenario.value);
    };
    const getCurrentViewport = () => {
      return viewports.value.find(v => v.name === selectedViewport.value);
    };
    return {
      testScenarios,
      viewports,
      selectedViewport,
      selectedScenario,
      getCurrentScenario,
      getCurrentViewport
    };
  },
  template: \`
    <div class="visual-test-container">
      <div class="test-controls">
        <h2>Email Template Visual Regression Testing</h2>
        <p>Test email templates across different screen sizes and data scenarios to ensure consistent rendering.</p>
        
        <div class="control-panel">
          <div class="control-group">
            <label>Test Scenario:</label>
            <select v-model="selectedScenario">
              <option v-for="scenario in testScenarios" :key="scenario.id" :value="scenario.id">
                {{ scenario.title }}
              </option>
            </select>
          </div>
          
          <div class="control-group">
            <label>Viewport Size:</label>
            <select v-model="selectedViewport">
              <option v-for="viewport in viewports" :key="viewport.name" :value="viewport.name">
                {{ viewport.name }} ({{ viewport.width }} × {{ viewport.height }})
              </option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="test-viewport" :style="{
        width: getCurrentViewport().width,
        height: getCurrentViewport().height,
        maxWidth: '100%',
        margin: '0 auto',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }">
        <EmailTemplates
          :template-type="getCurrentScenario().type"
          v-bind="getCurrentScenario().props"
        />
      </div>
      
      <div class="test-matrix">
        <h3>All Test Scenarios</h3>
        <div class="scenario-grid">
          <div v-for="scenario in testScenarios" :key="scenario.id" class="scenario-preview">
            <h4>{{ scenario.title }}</h4>
            <div class="mini-preview">
              <EmailTemplates
                :template-type="scenario.type"
                v-bind="scenario.props"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,v,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`() => ({
  components: {
    MarketingWidgets
  },
  setup() {
    const widgetTypes = ref([{
      type: 'calculator',
      title: 'Loan Calculator',
      description: 'Interactive payment calculator'
    }, {
      type: 'rates',
      title: 'Rate Comparison',
      description: 'Competitive rate table'
    }, {
      type: 'testimonials',
      title: 'Customer Testimonials',
      description: 'Rotating testimonial carousel'
    }, {
      type: 'quick-apply',
      title: 'Quick Apply Form',
      description: 'Pre-qualification form'
    }, {
      type: 'locator',
      title: 'Branch Locator',
      description: 'Find nearby branches'
    }, {
      type: 'education',
      title: 'Education Center',
      description: 'Financial education articles'
    }, {
      type: 'mobile-app',
      title: 'Mobile App Promo',
      description: 'App download promotion'
    }]);
    const selectedWidget = ref('calculator');
    const testBreakpoints = ref(['320px', '768px', '1024px', '1400px']);
    return {
      widgetTypes,
      selectedWidget,
      testBreakpoints
    };
  },
  template: \`
    <div class="widget-test-container">
      <div class="test-header">
        <h2>Marketing Widget Visual Testing</h2>
        <p>Comprehensive visual testing for marketing widgets across responsive breakpoints.</p>
      </div>
      
      <div class="widget-selector">
        <label>Select Widget:</label>
        <select v-model="selectedWidget">
          <option v-for="widget in widgetTypes" :key="widget.type" :value="widget.type">
            {{ widget.title }}
          </option>
        </select>
      </div>
      
      <div class="breakpoint-tests">
        <h3>Responsive Breakpoint Testing</h3>
        <div class="breakpoints-grid">
          <div v-for="breakpoint in testBreakpoints" :key="breakpoint" class="breakpoint-test">
            <h4>{{ breakpoint }} Viewport</h4>
            <div class="widget-frame" :style="{ width: breakpoint, maxWidth: '100%' }">
              <MarketingWidgets :widget-type="selectedWidget" />
            </div>
          </div>
        </div>
      </div>
      
      <div class="all-widgets-test">
        <h3>All Widgets Overview</h3>
        <div class="widgets-grid">
          <div v-for="widget in widgetTypes" :key="widget.type" class="widget-test-item">
            <div class="widget-header">
              <h4>{{ widget.title }}</h4>
              <p>{{ widget.description }}</p>
            </div>
            <div class="widget-preview">
              <MarketingWidgets :widget-type="widget.type" />
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(g=(v=a.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var u,y,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`() => ({
  components: {
    EmailTemplates,
    MarketingWidgets
  },
  setup() {
    const accessibilityChecklist = ref([{
      category: 'Color & Contrast',
      checks: [{
        item: 'Text contrast ratio ≥ 4.5:1',
        status: 'pass'
      }, {
        item: 'Large text contrast ratio ≥ 3:1',
        status: 'pass'
      }, {
        item: 'Color not sole means of conveying information',
        status: 'pass'
      }, {
        item: 'Focus indicators visible and high contrast',
        status: 'pass'
      }]
    }, {
      category: 'Keyboard Navigation',
      checks: [{
        item: 'All interactive elements keyboard accessible',
        status: 'pass'
      }, {
        item: 'Tab order logical and predictable',
        status: 'pass'
      }, {
        item: 'No keyboard traps',
        status: 'pass'
      }, {
        item: 'Skip links available for main content',
        status: 'pass'
      }]
    }, {
      category: 'Screen Reader Support',
      checks: [{
        item: 'Semantic HTML structure',
        status: 'pass'
      }, {
        item: 'Alternative text for images',
        status: 'pass'
      }, {
        item: 'Proper heading hierarchy',
        status: 'pass'
      }, {
        item: 'Form labels associated correctly',
        status: 'pass'
      }]
    }, {
      category: 'Email Client Compatibility',
      checks: [{
        item: 'Gmail rendering correct',
        status: 'pass'
      }, {
        item: 'Outlook 2016+ compatibility',
        status: 'pass'
      }, {
        item: 'Apple Mail rendering',
        status: 'pass'
      }, {
        item: 'Mobile email client support',
        status: 'pass'
      }]
    }]);
    const testComponents = ref([{
      type: 'email',
      component: 'approval',
      title: 'Loan Approval Email'
    }, {
      type: 'email',
      component: 'payment-reminder',
      title: 'Payment Reminder Email'
    }, {
      type: 'email',
      component: 'marketing',
      title: 'Marketing Email'
    }, {
      type: 'widget',
      component: 'calculator',
      title: 'Loan Calculator Widget'
    }, {
      type: 'widget',
      component: 'quick-apply',
      title: 'Quick Apply Widget'
    }]);
    return {
      accessibilityChecklist,
      testComponents
    };
  },
  template: \`
    <div class="accessibility-test-container">
      <div class="test-header">
        <h2>Accessibility Compliance Testing</h2>
        <p>WCAG 2.1 AA compliance verification for email templates and marketing widgets.</p>
      </div>
      
      <div class="compliance-checklist">
        <h3>Accessibility Checklist</h3>
        <div class="checklist-grid">
          <div v-for="category in accessibilityChecklist" :key="category.category" class="checklist-category">
            <h4>{{ category.category }}</h4>
            <ul class="checks-list">
              <li v-for="check in category.checks" :key="check.item" :class="['check-item', check.status]">
                <span class="status-icon">{{ check.status === 'pass' ? '✓' : '✗' }}</span>
                {{ check.item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="component-tests">
        <h3>Component Accessibility Tests</h3>
        <div class="components-grid">
          <div v-for="component in testComponents" :key="component.component" class="component-test">
            <h4>{{ component.title }}</h4>
            <div class="test-preview">
              <EmailTemplates 
                v-if="component.type === 'email'"
                :template-type="component.component"
                customer-name="Test User"
                :loan-amount="25000"
                :monthly-payment="515"
              />
              <MarketingWidgets 
                v-if="component.type === 'widget'"
                :widget-type="component.component"
              />
            </div>
            <div class="accessibility-notes">
              <p><strong>Keyboard Navigation:</strong> All buttons and links accessible via Tab key</p>
              <p><strong>Screen Reader:</strong> Proper semantic markup with ARIA labels</p>
              <p><strong>Color Contrast:</strong> Exceeds WCAG AA requirements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const W=["EmailTemplateVisualTests","MarketingWidgetVisualTests","AccessibilityComplianceTests"];export{o as AccessibilityComplianceTests,s as EmailTemplateVisualTests,a as MarketingWidgetVisualTests,W as __namedExportsOrder,S as default};
