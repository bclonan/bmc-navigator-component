import{r as R}from"./vue.esm-bundler-BOts1VAj.js";import{M as e}from"./MarketingWidgets-3L9x4nJJ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const x={title:"Application Examples/Marketing Widgets/Interactive Marketing Components",component:e,parameters:{layout:"fullscreen",docs:{description:{component:"Interactive marketing widgets for loan calculators, rate comparisons, customer testimonials, and lead generation forms."}}},argTypes:{widgetType:{control:{type:"select"},options:["calculator","rates","testimonials","quick-apply","locator","education","mobile-app"],description:"Marketing widget type",defaultValue:"calculator"}}},t=i=>({components:{MarketingWidgets:e},setup(){return{args:i}},template:`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Personal Loan Calculator Widget</h2>
        <p>Interactive calculator allowing users to estimate monthly payments and see total loan costs in real-time.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="calculator" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Real-time payment calculations as users adjust inputs</li>
          <li>Loan amount slider from $1,000 to $50,000</li>
          <li>Term selection from 12 to 60 months</li>
          <li>Visual payment breakdown with total cost display</li>
          <li>Prominent call-to-action button for applications</li>
          <li>Rate disclaimer and terms information</li>
        </ul>
        
        <h3>Use Cases:</h3>
        <ul>
          <li>Website landing pages for loan products</li>
          <li>Email marketing campaigns with interactive elements</li>
          <li>Social media advertisements with embedded calculators</li>
          <li>Branch kiosk displays for in-person consultations</li>
        </ul>
      </div>
    </div>
  `});t.args={widgetType:"calculator"};const n=i=>({components:{MarketingWidgets:e},setup(){return{args:i}},template:`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Rate Comparison Widget</h2>
        <p>Competitive analysis table showcasing Mariner Finance rates and features against competitors.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="rates" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Highlighted Mariner Finance row with "Best Choice" badge</li>
          <li>Clear rate comparison with starting APR display</li>
          <li>Feature comparison including fees and approval times</li>
          <li>Visual distinction between Mariner and competitors</li>
          <li>Maximum loan amounts and key differentiators</li>
          <li>Call-to-action button for rate inquiries</li>
        </ul>
        
        <h3>Competitive Advantages Highlighted:</h3>
        <ul>
          <li>Lower starting rates than major competitors</li>
          <li>No prepayment penalties vs competitor fees</li>
          <li>Faster approval times (24 hours vs 3-5 days)</li>
          <li>Physical branch network vs online-only competitors</li>
        </ul>
      </div>
    </div>
  `});n.args={widgetType:"rates"};const a=i=>({components:{MarketingWidgets:e},setup(){return{args:i}},template:`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Customer Testimonials Widget</h2>
        <p>Rotating testimonial carousel featuring real customer success stories and 5-star ratings.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="testimonials" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Auto-rotating carousel with 5-second intervals</li>
          <li>5-star rating display for each testimonial</li>
          <li>Customer names and locations for credibility</li>
          <li>Dot navigation for manual testimonial selection</li>
          <li>Smooth fade transitions between testimonials</li>
          <li>Call-to-action button to start application process</li>
        </ul>
        
        <h3>Testimonial Themes:</h3>
        <ul>
          <li>Quick approval process and fast funding</li>
          <li>Competitive rates for debt consolidation</li>
          <li>Excellent customer service and branch support</li>
          <li>Transparent terms without hidden fees</li>
        </ul>
      </div>
    </div>
  `});a.args={widgetType:"testimonials"};const s=i=>({components:{MarketingWidgets:e},setup(){return{args:i}},template:`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Quick Pre-Qualification Widget</h2>
        <p>Streamlined form for instant pre-qualification with no credit impact and immediate results.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="quick-apply" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Four simple dropdown selections for quick completion</li>
          <li>Loan amount ranges from $1,000 to $50,000+</li>
          <li>Income brackets for qualification assessment</li>
          <li>Credit score ranges for rate determination</li>
          <li>ZIP code field for location-based offers</li>
          <li>Form validation with disabled submit until complete</li>
        </ul>
        
        <h3>Trust Indicators:</h3>
        <ul>
          <li>256-bit SSL encryption for data security</li>
          <li>Instant pre-qualification promise</li>
          <li>No credit impact guarantee</li>
          <li>Professional security badges and certifications</li>
        </ul>
      </div>
    </div>
  `});s.args={widgetType:"quick-apply"};const o=i=>({components:{MarketingWidgets:e},setup(){return{args:i}},template:`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Branch Locator Widget</h2>
        <p>Find nearby Mariner Finance locations with search functionality and contact information.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="locator" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Search by city, state, or ZIP code</li>
          <li>Distance calculations from search location</li>
          <li>Branch contact information and addresses</li>
          <li>Direct links for directions and phone calls</li>
          <li>Expandable results with detailed branch info</li>
          <li>Link to comprehensive branch directory</li>
        </ul>
        
        <h3>Branch Information Displayed:</h3>
        <ul>
          <li>Branch name and full street address</li>
          <li>Distance in miles from search location</li>
          <li>Operating hours and contact phone numbers</li>
          <li>Services available at each location</li>
        </ul>
      </div>
    </div>
  `});o.args={widgetType:"locator"};const l=i=>({components:{MarketingWidgets:e},setup(){return{args:i}},template:`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Financial Education Widget</h2>
        <p>Educational content carousel featuring helpful articles on credit, budgeting, and loan management.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="education" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Article cards with category tags and titles</li>
          <li>Brief excerpts to preview article content</li>
          <li>Estimated reading times for time management</li>
          <li>Hover effects and click interactions</li>
          <li>Responsive grid layout for various screen sizes</li>
          <li>Link to comprehensive learning center</li>
        </ul>
        
        <h3>Educational Topics Covered:</h3>
        <ul>
          <li>Credit score improvement strategies</li>
          <li>Budgeting and financial planning</li>
          <li>Loan product comparisons and guidance</li>
          <li>Debt consolidation best practices</li>
        </ul>
      </div>
    </div>
  `});l.args={widgetType:"education"};const r=i=>({components:{MarketingWidgets:e},setup(){return{args:i}},template:`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Mobile App Promotion Widget</h2>
        <p>Promote the Mariner Finance mobile app with feature highlights and download links.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="mobile-app" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Feature grid showcasing key app capabilities</li>
          <li>App Store and Google Play download buttons</li>
          <li>Customer rating display with review count</li>
          <li>Icon-based feature presentation</li>
          <li>Professional app store button styling</li>
          <li>Social proof with user ratings</li>
        </ul>
        
        <h3>App Features Highlighted:</h3>
        <ul>
          <li>Mobile payment processing and scheduling</li>
          <li>Real-time account balance viewing</li>
          <li>Automatic payment reminders and notifications</li>
          <li>Mobile check deposit functionality</li>
        </ul>
      </div>
    </div>
  `});r.args={widgetType:"mobile-app"};const d=()=>({components:{MarketingWidgets:e},setup(){return{widgets:R([{type:"calculator",title:"Loan Calculator",description:"Interactive payment estimation"},{type:"rates",title:"Rate Comparison",description:"Competitive rate analysis"},{type:"testimonials",title:"Customer Stories",description:"Success testimonials"},{type:"quick-apply",title:"Quick Pre-Qualification",description:"Instant rate checking"},{type:"locator",title:"Branch Locator",description:"Find nearby locations"},{type:"education",title:"Financial Education",description:"Learning resources"},{type:"mobile-app",title:"Mobile App",description:"App promotion and features"}])}},template:`
    <div class="all-widgets-container">
      <div class="all-widgets-header">
        <h2>Complete Marketing Widget Suite</h2>
        <p>Comprehensive collection of interactive marketing components for various customer engagement scenarios.</p>
      </div>
      
      <div class="widgets-showcase">
        <div v-for="widget in widgets" :key="widget.type" class="widget-showcase-item">
          <div class="widget-info">
            <h3>{{ widget.title }}</h3>
            <p>{{ widget.description }}</p>
          </div>
          
          <div class="widget-demo">
            <MarketingWidgets :widget-type="widget.type" />
          </div>
        </div>
      </div>
      
      <div class="implementation-guide">
        <h3>Implementation Guidelines:</h3>
        <div class="guidelines-grid">
          <div class="guideline-item">
            <h4>Responsive Design</h4>
            <p>All widgets adapt seamlessly to mobile, tablet, and desktop layouts</p>
          </div>
          <div class="guideline-item">
            <h4>Brand Consistency</h4>
            <p>Mariner Finance colors, typography, and styling throughout all components</p>
          </div>
          <div class="guideline-item">
            <h4>Accessibility</h4>
            <p>WCAG 2.1 AA compliant with keyboard navigation and screen reader support</p>
          </div>
          <div class="guideline-item">
            <h4>Performance</h4>
            <p>Optimized for fast loading and smooth interactions across all devices</p>
          </div>
        </div>
      </div>
    </div>
  `});var c,p,g;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    MarketingWidgets
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Personal Loan Calculator Widget</h2>
        <p>Interactive calculator allowing users to estimate monthly payments and see total loan costs in real-time.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="calculator" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Real-time payment calculations as users adjust inputs</li>
          <li>Loan amount slider from $1,000 to $50,000</li>
          <li>Term selection from 12 to 60 months</li>
          <li>Visual payment breakdown with total cost display</li>
          <li>Prominent call-to-action button for applications</li>
          <li>Rate disclaimer and terms information</li>
        </ul>
        
        <h3>Use Cases:</h3>
        <ul>
          <li>Website landing pages for loan products</li>
          <li>Email marketing campaigns with interactive elements</li>
          <li>Social media advertisements with embedded calculators</li>
          <li>Branch kiosk displays for in-person consultations</li>
        </ul>
      </div>
    </div>
  \`
})`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var u,m,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
  components: {
    MarketingWidgets
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Rate Comparison Widget</h2>
        <p>Competitive analysis table showcasing Mariner Finance rates and features against competitors.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="rates" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Highlighted Mariner Finance row with "Best Choice" badge</li>
          <li>Clear rate comparison with starting APR display</li>
          <li>Feature comparison including fees and approval times</li>
          <li>Visual distinction between Mariner and competitors</li>
          <li>Maximum loan amounts and key differentiators</li>
          <li>Call-to-action button for rate inquiries</li>
        </ul>
        
        <h3>Competitive Advantages Highlighted:</h3>
        <ul>
          <li>Lower starting rates than major competitors</li>
          <li>No prepayment penalties vs competitor fees</li>
          <li>Faster approval times (24 hours vs 3-5 days)</li>
          <li>Physical branch network vs online-only competitors</li>
        </ul>
      </div>
    </div>
  \`
})`,...(h=(m=n.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var v,w,y;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
  components: {
    MarketingWidgets
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Customer Testimonials Widget</h2>
        <p>Rotating testimonial carousel featuring real customer success stories and 5-star ratings.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="testimonials" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Auto-rotating carousel with 5-second intervals</li>
          <li>5-star rating display for each testimonial</li>
          <li>Customer names and locations for credibility</li>
          <li>Dot navigation for manual testimonial selection</li>
          <li>Smooth fade transitions between testimonials</li>
          <li>Call-to-action button to start application process</li>
        </ul>
        
        <h3>Testimonial Themes:</h3>
        <ul>
          <li>Quick approval process and fast funding</li>
          <li>Competitive rates for debt consolidation</li>
          <li>Excellent customer service and branch support</li>
          <li>Transparent terms without hidden fees</li>
        </ul>
      </div>
    </div>
  \`
})`,...(y=(w=a.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var f,b,k;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    MarketingWidgets
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Quick Pre-Qualification Widget</h2>
        <p>Streamlined form for instant pre-qualification with no credit impact and immediate results.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="quick-apply" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Four simple dropdown selections for quick completion</li>
          <li>Loan amount ranges from $1,000 to $50,000+</li>
          <li>Income brackets for qualification assessment</li>
          <li>Credit score ranges for rate determination</li>
          <li>ZIP code field for location-based offers</li>
          <li>Form validation with disabled submit until complete</li>
        </ul>
        
        <h3>Trust Indicators:</h3>
        <ul>
          <li>256-bit SSL encryption for data security</li>
          <li>Instant pre-qualification promise</li>
          <li>No credit impact guarantee</li>
          <li>Professional security badges and certifications</li>
        </ul>
      </div>
    </div>
  \`
})`,...(k=(b=s.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var W,M,C;o.parameters={...o.parameters,docs:{...(W=o.parameters)==null?void 0:W.docs,source:{originalSource:`args => ({
  components: {
    MarketingWidgets
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Branch Locator Widget</h2>
        <p>Find nearby Mariner Finance locations with search functionality and contact information.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="locator" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Search by city, state, or ZIP code</li>
          <li>Distance calculations from search location</li>
          <li>Branch contact information and addresses</li>
          <li>Direct links for directions and phone calls</li>
          <li>Expandable results with detailed branch info</li>
          <li>Link to comprehensive branch directory</li>
        </ul>
        
        <h3>Branch Information Displayed:</h3>
        <ul>
          <li>Branch name and full street address</li>
          <li>Distance in miles from search location</li>
          <li>Operating hours and contact phone numbers</li>
          <li>Services available at each location</li>
        </ul>
      </div>
    </div>
  \`
})`,...(C=(M=o.parameters)==null?void 0:M.docs)==null?void 0:C.source}}};var F,A,S;l.parameters={...l.parameters,docs:{...(F=l.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
  components: {
    MarketingWidgets
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Financial Education Widget</h2>
        <p>Educational content carousel featuring helpful articles on credit, budgeting, and loan management.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="education" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Article cards with category tags and titles</li>
          <li>Brief excerpts to preview article content</li>
          <li>Estimated reading times for time management</li>
          <li>Hover effects and click interactions</li>
          <li>Responsive grid layout for various screen sizes</li>
          <li>Link to comprehensive learning center</li>
        </ul>
        
        <h3>Educational Topics Covered:</h3>
        <ul>
          <li>Credit score improvement strategies</li>
          <li>Budgeting and financial planning</li>
          <li>Loan product comparisons and guidance</li>
          <li>Debt consolidation best practices</li>
        </ul>
      </div>
    </div>
  \`
})`,...(S=(A=l.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var P,L,T;r.parameters={...r.parameters,docs:{...(P=r.parameters)==null?void 0:P.docs,source:{originalSource:`args => ({
  components: {
    MarketingWidgets
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="widget-story-container">
      <div class="widget-story-header">
        <h2>Mobile App Promotion Widget</h2>
        <p>Promote the Mariner Finance mobile app with feature highlights and download links.</p>
      </div>
      
      <div class="widget-preview">
        <MarketingWidgets widget-type="mobile-app" />
      </div>
      
      <div class="widget-features">
        <h3>Widget Features:</h3>
        <ul>
          <li>Feature grid showcasing key app capabilities</li>
          <li>App Store and Google Play download buttons</li>
          <li>Customer rating display with review count</li>
          <li>Icon-based feature presentation</li>
          <li>Professional app store button styling</li>
          <li>Social proof with user ratings</li>
        </ul>
        
        <h3>App Features Highlighted:</h3>
        <ul>
          <li>Mobile payment processing and scheduling</li>
          <li>Real-time account balance viewing</li>
          <li>Automatic payment reminders and notifications</li>
          <li>Mobile check deposit functionality</li>
        </ul>
      </div>
    </div>
  \`
})`,...(T=(L=r.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var I,B,E;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`() => ({
  components: {
    MarketingWidgets
  },
  setup() {
    const widgets = ref([{
      type: 'calculator',
      title: 'Loan Calculator',
      description: 'Interactive payment estimation'
    }, {
      type: 'rates',
      title: 'Rate Comparison',
      description: 'Competitive rate analysis'
    }, {
      type: 'testimonials',
      title: 'Customer Stories',
      description: 'Success testimonials'
    }, {
      type: 'quick-apply',
      title: 'Quick Pre-Qualification',
      description: 'Instant rate checking'
    }, {
      type: 'locator',
      title: 'Branch Locator',
      description: 'Find nearby locations'
    }, {
      type: 'education',
      title: 'Financial Education',
      description: 'Learning resources'
    }, {
      type: 'mobile-app',
      title: 'Mobile App',
      description: 'App promotion and features'
    }]);
    return {
      widgets
    };
  },
  template: \`
    <div class="all-widgets-container">
      <div class="all-widgets-header">
        <h2>Complete Marketing Widget Suite</h2>
        <p>Comprehensive collection of interactive marketing components for various customer engagement scenarios.</p>
      </div>
      
      <div class="widgets-showcase">
        <div v-for="widget in widgets" :key="widget.type" class="widget-showcase-item">
          <div class="widget-info">
            <h3>{{ widget.title }}</h3>
            <p>{{ widget.description }}</p>
          </div>
          
          <div class="widget-demo">
            <MarketingWidgets :widget-type="widget.type" />
          </div>
        </div>
      </div>
      
      <div class="implementation-guide">
        <h3>Implementation Guidelines:</h3>
        <div class="guidelines-grid">
          <div class="guideline-item">
            <h4>Responsive Design</h4>
            <p>All widgets adapt seamlessly to mobile, tablet, and desktop layouts</p>
          </div>
          <div class="guideline-item">
            <h4>Brand Consistency</h4>
            <p>Mariner Finance colors, typography, and styling throughout all components</p>
          </div>
          <div class="guideline-item">
            <h4>Accessibility</h4>
            <p>WCAG 2.1 AA compliant with keyboard navigation and screen reader support</p>
          </div>
          <div class="guideline-item">
            <h4>Performance</h4>
            <p>Optimized for fast loading and smooth interactions across all devices</p>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(E=(B=d.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};const H=["LoanCalculatorWidget","RateComparisonWidget","CustomerTestimonialsWidget","QuickApplyWidget","BranchLocatorWidget","FinancialEducationWidget","MobileAppPromotionWidget","AllMarketingWidgets"];export{d as AllMarketingWidgets,o as BranchLocatorWidget,a as CustomerTestimonialsWidget,l as FinancialEducationWidget,t as LoanCalculatorWidget,r as MobileAppPromotionWidget,s as QuickApplyWidget,n as RateComparisonWidget,H as __namedExportsOrder,x as default};
