import{r as f}from"./vue.esm-bundler-BOts1VAj.js";import{E as l}from"./EmailTemplates-DCBAFEKJ.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const w={title:"Application Examples/Email Templates/Responsive Email Templates",component:l,parameters:{layout:"fullscreen",docs:{description:{component:"Responsive email templates for loan notifications, payment reminders, and marketing campaigns with Mariner Finance branding."}}},argTypes:{templateType:{control:{type:"select"},options:["approval","payment-reminder","marketing","application-status","welcome"],description:"Email template type",defaultValue:"approval"},customerName:{control:{type:"text"},description:"Customer name for personalization",defaultValue:"John Smith"},loanAmount:{control:{type:"number"},description:"Loan amount",defaultValue:25e3},apr:{control:{type:"number"},description:"Annual Percentage Rate",defaultValue:8.99},termMonths:{control:{type:"number"},description:"Loan term in months",defaultValue:60},monthlyPayment:{control:{type:"number"},description:"Monthly payment amount",defaultValue:515}}},a=e=>({components:{EmailTemplates:l},setup(){return{args:e}},template:`
    <div class="story-container">
      <div class="story-header">
        <h2>Loan Approval Email Template</h2>
        <p>Congratulatory email sent when a personal loan application is approved with loan details and next steps.</p>
      </div>
      
      <div class="email-preview">
        <EmailTemplates
          template-type="approval"
          :customer-name="args.customerName"
          :loan-amount="args.loanAmount"
          :apr="args.apr"
          :term-months="args.termMonths"
          :monthly-payment="args.monthlyPayment"
          first-payment-date="March 15, 2024"
        />
      </div>
      
      <div class="template-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Mariner Finance branded header with gradient background</li>
          <li>Clear loan details table with financial breakdown</li>
          <li>Next steps checklist for customer guidance</li>
          <li>Prominent call-to-action button</li>
          <li>Responsive design for mobile and desktop</li>
          <li>Professional footer with contact information</li>
        </ul>
      </div>
    </div>
  `});a.args={templateType:"approval",customerName:"Alice Johnson",loanAmount:25e3,apr:8.99,termMonths:60,monthlyPayment:515};const t=e=>({components:{EmailTemplates:l},setup(){return{args:e}},template:`
    <div class="story-container">
      <div class="story-header">
        <h2>Payment Reminder Email Template</h2>
        <p>Friendly reminder email sent before payment due dates with multiple payment options and account details.</p>
      </div>
      
      <div class="email-preview">
        <EmailTemplates
          template-type="payment-reminder"
          :customer-name="args.customerName"
          :payment-amount="args.monthlyPayment"
          due-date="March 15, 2024"
          account-number="****1234"
          :remaining-balance="22350"
        />
      </div>
      
      <div class="template-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Warning-themed orange gradient header</li>
          <li>Payment information highlighted in bordered section</li>
          <li>Multiple payment options clearly listed</li>
          <li>Dual call-to-action buttons (Pay Now / AutoPay)</li>
          <li>Account details for easy reference</li>
          <li>Mobile-optimized button layout</li>
        </ul>
      </div>
    </div>
  `});t.args={templateType:"payment-reminder",customerName:"Robert Chen",monthlyPayment:485};const n=e=>({components:{EmailTemplates:l},setup(){return{args:e}},template:`
    <div class="story-container">
      <div class="story-header">
        <h2>Marketing Promotion Email Template</h2>
        <p>Promotional email template for marketing campaigns featuring special rates and company benefits.</p>
      </div>
      
      <div class="email-preview">
        <EmailTemplates
          template-type="marketing"
          customer-name="Valued Customer"
        />
      </div>
      
      <div class="template-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Eye-catching green gradient for promotional feel</li>
          <li>Large rate display with prominent pricing</li>
          <li>Feature grid showcasing company benefits</li>
          <li>Trust indicators and value propositions</li>
          <li>Compliance disclaimer text</li>
          <li>Unsubscribe and legal links in footer</li>
        </ul>
      </div>
    </div>
  `});n.args={templateType:"marketing",customerName:"Valued Customer"};i.parameters={layout:"fullscreen",docs:{source:{code:`
<div class="templates-grid">
  <EmailTemplates
    template-type="approval"
    customer-name="Alice Johnson"
    :loan-amount="25000"
    :apr="8.99"
    :monthly-payment="515"
  />
  <EmailTemplates
    template-type="payment-reminder"
    customer-name="Robert Chen"
    :payment-amount="485"
  />
  <EmailTemplates
    template-type="marketing"
    customer-name="Valued Customer"
  />
</div>`}}};const i=()=>({components:{EmailTemplates:l},setup(){return{templates:f([{type:"approval",title:"Loan Approval",description:"Congratulatory email with loan details",customerName:"Alice Johnson",data:{loanAmount:25e3,apr:8.99,monthlyPayment:515}},{type:"payment-reminder",title:"Payment Reminder",description:"Friendly payment due notification",customerName:"Robert Chen",data:{paymentAmount:485}},{type:"marketing",title:"Marketing Promotion",description:"Promotional campaign email",customerName:"Valued Customer",data:{}}])}},template:`
    <div class="comparison-container">
      <div class="comparison-header">
        <h2>Email Template Comparison</h2>
        <p>Side-by-side comparison of all available email templates with different use cases and styling approaches.</p>
      </div>
      
      <div class="templates-grid">
        <div v-for="template in templates" :key="template.type" class="template-column">
          <div class="template-info">
            <h3>{{ template.title }}</h3>
            <p>{{ template.description }}</p>
          </div>
          
          <div class="template-preview">
            <EmailTemplates
              :template-type="template.type"
              :customer-name="template.customerName"
              v-bind="template.data"
            />
          </div>
        </div>
      </div>
      
      <div class="template-specs">
        <h3>Technical Specifications:</h3>
        <div class="specs-grid">
          <div class="spec-item">
            <h4>Responsive Design</h4>
            <p>All templates adapt to mobile, tablet, and desktop screens with fluid layouts</p>
          </div>
          <div class="spec-item">
            <h4>Email Client Support</h4>
            <p>Compatible with Gmail, Outlook, Apple Mail, and major email clients</p>
          </div>
          <div class="spec-item">
            <h4>Brand Consistency</h4>
            <p>Mariner Finance brand colors, typography, and logo integration</p>
          </div>
          <div class="spec-item">
            <h4>Accessibility</h4>
            <p>High contrast ratios, semantic HTML, and screen reader compatibility</p>
          </div>
        </div>
      </div>
    </div>
  `});var o,s,r;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
  components: {
    EmailTemplates
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="story-container">
      <div class="story-header">
        <h2>Loan Approval Email Template</h2>
        <p>Congratulatory email sent when a personal loan application is approved with loan details and next steps.</p>
      </div>
      
      <div class="email-preview">
        <EmailTemplates
          template-type="approval"
          :customer-name="args.customerName"
          :loan-amount="args.loanAmount"
          :apr="args.apr"
          :term-months="args.termMonths"
          :monthly-payment="args.monthlyPayment"
          first-payment-date="March 15, 2024"
        />
      </div>
      
      <div class="template-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Mariner Finance branded header with gradient background</li>
          <li>Clear loan details table with financial breakdown</li>
          <li>Next steps checklist for customer guidance</li>
          <li>Prominent call-to-action button</li>
          <li>Responsive design for mobile and desktop</li>
          <li>Professional footer with contact information</li>
        </ul>
      </div>
    </div>
  \`
})`,...(r=(s=a.parameters)==null?void 0:s.docs)==null?void 0:r.source}}};var m,p,c;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
  components: {
    EmailTemplates
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="story-container">
      <div class="story-header">
        <h2>Payment Reminder Email Template</h2>
        <p>Friendly reminder email sent before payment due dates with multiple payment options and account details.</p>
      </div>
      
      <div class="email-preview">
        <EmailTemplates
          template-type="payment-reminder"
          :customer-name="args.customerName"
          :payment-amount="args.monthlyPayment"
          due-date="March 15, 2024"
          account-number="****1234"
          :remaining-balance="22350"
        />
      </div>
      
      <div class="template-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Warning-themed orange gradient header</li>
          <li>Payment information highlighted in bordered section</li>
          <li>Multiple payment options clearly listed</li>
          <li>Dual call-to-action buttons (Pay Now / AutoPay)</li>
          <li>Account details for easy reference</li>
          <li>Mobile-optimized button layout</li>
        </ul>
      </div>
    </div>
  \`
})`,...(c=(p=t.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,u,y;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    EmailTemplates
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="story-container">
      <div class="story-header">
        <h2>Marketing Promotion Email Template</h2>
        <p>Promotional email template for marketing campaigns featuring special rates and company benefits.</p>
      </div>
      
      <div class="email-preview">
        <EmailTemplates
          template-type="marketing"
          customer-name="Valued Customer"
        />
      </div>
      
      <div class="template-features">
        <h3>Key Features:</h3>
        <ul>
          <li>Eye-catching green gradient for promotional feel</li>
          <li>Large rate display with prominent pricing</li>
          <li>Feature grid showcasing company benefits</li>
          <li>Trust indicators and value propositions</li>
          <li>Compliance disclaimer text</li>
          <li>Unsubscribe and legal links in footer</li>
        </ul>
      </div>
    </div>
  \`
})`,...(y=(u=n.parameters)==null?void 0:u.docs)==null?void 0:y.source}}};var h,v,g;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => ({
  components: {
    EmailTemplates
  },
  setup() {
    const templates = ref([{
      type: 'approval',
      title: 'Loan Approval',
      description: 'Congratulatory email with loan details',
      customerName: 'Alice Johnson',
      data: {
        loanAmount: 25000,
        apr: 8.99,
        monthlyPayment: 515
      }
    }, {
      type: 'payment-reminder',
      title: 'Payment Reminder',
      description: 'Friendly payment due notification',
      customerName: 'Robert Chen',
      data: {
        paymentAmount: 485
      }
    }, {
      type: 'marketing',
      title: 'Marketing Promotion',
      description: 'Promotional campaign email',
      customerName: 'Valued Customer',
      data: {}
    }]);
    return {
      templates
    };
  },
  template: \`
    <div class="comparison-container">
      <div class="comparison-header">
        <h2>Email Template Comparison</h2>
        <p>Side-by-side comparison of all available email templates with different use cases and styling approaches.</p>
      </div>
      
      <div class="templates-grid">
        <div v-for="template in templates" :key="template.type" class="template-column">
          <div class="template-info">
            <h3>{{ template.title }}</h3>
            <p>{{ template.description }}</p>
          </div>
          
          <div class="template-preview">
            <EmailTemplates
              :template-type="template.type"
              :customer-name="template.customerName"
              v-bind="template.data"
            />
          </div>
        </div>
      </div>
      
      <div class="template-specs">
        <h3>Technical Specifications:</h3>
        <div class="specs-grid">
          <div class="spec-item">
            <h4>Responsive Design</h4>
            <p>All templates adapt to mobile, tablet, and desktop screens with fluid layouts</p>
          </div>
          <div class="spec-item">
            <h4>Email Client Support</h4>
            <p>Compatible with Gmail, Outlook, Apple Mail, and major email clients</p>
          </div>
          <div class="spec-item">
            <h4>Brand Consistency</h4>
            <p>Mariner Finance brand colors, typography, and logo integration</p>
          </div>
          <div class="spec-item">
            <h4>Accessibility</h4>
            <p>High contrast ratios, semantic HTML, and screen reader compatibility</p>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(g=(v=i.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};const P=["LoanApprovalEmail","PaymentReminderEmail","MarketingPromotionEmail","EmailTemplateComparison"];export{i as EmailTemplateComparison,a as LoanApprovalEmail,n as MarketingPromotionEmail,t as PaymentReminderEmail,P as __namedExportsOrder,w as default};
