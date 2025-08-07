import{M as o}from"./MTypography-DmD30oZU.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const L={title:"MUI Components/Data Display/Typography",component:o,parameters:{docs:{description:{component:"Material-UI Typography component with Your Town Finance Muli font family and brand styling for consistent text presentation."}}},argTypes:{variant:{control:{type:"select"},options:["h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","caption","button","overline"],description:"Typography variant",defaultValue:"body1"},color:{control:{type:"select"},options:["inherit","primary","secondary","textPrimary","textSecondary","error"],description:"Text color",defaultValue:"textPrimary"},align:{control:{type:"select"},options:["inherit","left","center","right","justify"],description:"Text alignment",defaultValue:"inherit"},component:{control:{type:"text"},description:"HTML component to render",defaultValue:""},gutterBottom:{control:{type:"boolean"},description:"Add margin bottom",defaultValue:!1},noWrap:{control:{type:"boolean"},description:"Prevent text wrapping",defaultValue:!1}}},n=s=>({components:{MTypography:o},setup(){return{args:s}},template:`
    <MTypography v-bind="args">
      {{ args.content || 'This is customizable typography text. Use the controls to modify appearance.' }}
    </MTypography>
  `});n.args={variant:"body1",color:"textPrimary",align:"inherit",component:"",gutterBottom:!1,noWrap:!1,content:"Sample typography text"};const y=()=>({components:{MTypography:o},template:`
    <div class="space-y-8" style="font-family: var(--mf-font-family);">
      <div>
        <MTypography variant="h1" class="mb-4" style="font-family: var(--mf-font-family-bold); color: var(--mf-primary);">
          Personal Loans Made Simple
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H1 - MuliBold, 2.5rem, Weight 700 - Primary brand color
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="h2" class="mb-4" style="font-family: var(--mf-font-family-bold); color: var(--mf-secondary);">
          Get the Funds You Need Today
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H2 - MuliBold, 2rem, Weight 700 - Secondary brand color
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="h3" class="mb-4" style="color: var(--mf-primary);">
          Quick and Easy Application Process
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H3 - Muli, 1.75rem, Weight 600
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="h4" class="mb-4" style="color: var(--mf-text-primary);">
          Competitive Rates and Flexible Terms
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H4 - Muli, 1.5rem, Weight 600
        </MTypography>
      </div>
    </div>
  `}),e=()=>({components:{MTypography:o},template:`
    <div class="space-y-6" style="font-family: var(--mf-font-family);">
      <div>
        <MTypography variant="body1" class="mb-4" style="color: var(--mf-text-primary);">
          At Your Town Finance, we understand that life can present unexpected financial challenges.
          Whether you need funds for home improvements, debt consolidation, or unexpected expenses, 
          our personal loans are designed to help you achieve your financial goals.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Body1 - Muli, 1rem, Weight 400, Line Height 1.5
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="body2" class="mb-4" style="color: var(--mf-text-secondary);">
          Terms and conditions apply. APR ranges from 5.99% to 35.99%. 
          Loan amounts from $1,000 to $25,000. Actual rate depends on credit profile.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Body2 - Muli, 0.875rem, Weight 400
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle1" class="mb-4" style="color: var(--mf-primary);">
          Why Choose Your Town Finance?
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Subtitle1 - Muli, 1.125rem, Weight 500
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle2" class="mb-4" style="color: var(--mf-secondary);">
          Quick Application Process
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Subtitle2 - Muli, 1rem, Weight 500
        </MTypography>
      </div>
    </div>
  `}),p=()=>({components:{MTypography:o},template:`
    <div class="max-w-4xl space-y-6" style="font-family: var(--mf-font-family);">
      <MTypography variant="h2" class="mb-6" style="font-family: var(--mf-font-family-bold); color: var(--mf-primary);">
        Personal Loan Application
      </MTypography>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MTypography variant="h4" class="mb-4" style="color: var(--mf-secondary);">
            Loan Details
          </MTypography>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Loan Amount:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-primary);">
                $15,000
              </MTypography>
            </div>
            
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Interest Rate:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-success);">
                8.99% APR
              </MTypography>
            </div>
            
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Monthly Payment:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-primary);">
                $187.00
              </MTypography>
            </div>
            
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Term:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-text-primary);">
                60 months
              </MTypography>
            </div>
          </div>
        </div>
        
        <div>
          <MTypography variant="h4" class="mb-4" style="color: var(--mf-secondary);">
            Important Information
          </MTypography>
          
          <MTypography variant="body2" class="mb-4" style="color: var(--mf-text-secondary);">
            Your loan application has been pre-approved based on the information provided. 
            Final approval is subject to verification of income and employment.
          </MTypography>
          
          <MTypography variant="caption" style="color: var(--mf-text-hint);">
            * This is an example of how rates are displayed. Actual rates may vary based on 
            creditworthiness, loan amount, and other factors. All loans subject to approval.
          </MTypography>
        </div>
      </div>
      
      <div class="mt-8 p-6 bg-gray-50 rounded-lg">
        <MTypography variant="h5" class="mb-4" style="color: var(--mf-primary);">
          Next Steps
        </MTypography>
        
        <div class="space-y-3">
          <MTypography variant="body1" style="color: var(--mf-text-primary);">
            1. Review and sign your loan agreement
          </MTypography>
          <MTypography variant="body1" style="color: var(--mf-text-primary);">
            2. Provide required documentation
          </MTypography>
          <MTypography variant="body1" style="color: var(--mf-text-primary);">
            3. Receive funds in 1-2 business days
          </MTypography>
        </div>
      </div>
    </div>
  `}),i=()=>({components:{MTypography:o},template:`
    <div class="space-y-8" style="font-family: var(--mf-font-family);">
      <div>
        <MTypography variant="h1" style="font-family: var(--mf-font-family-bold);">
          Heading 1
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h1"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h2" style="font-family: var(--mf-font-family-bold);">
          Heading 2
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h2"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h3">Heading 3</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h3"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h4">Heading 4</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h4"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h5">Heading 5</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h5"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h6">Heading 6</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h6"</MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle1">Subtitle 1</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="subtitle1"</MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle2">Subtitle 2</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="subtitle2"</MTypography>
      </div>
      
      <div>
        <MTypography variant="body1">
          Body 1 - This is a paragraph of text using the body1 variant. 
          It's perfect for regular content and maintains good readability.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="body1"</MTypography>
      </div>
      
      <div>
        <MTypography variant="body2">
          Body 2 - This is a paragraph of text using the body2 variant. 
          It's slightly smaller than body1 and great for secondary content.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="body2"</MTypography>
      </div>
      
      <div>
        <MTypography variant="button">BUTTON TEXT</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="button"</MTypography>
      </div>
      
      <div>
        <MTypography variant="caption">Caption text - smaller text for annotations</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="caption"</MTypography>
      </div>
      
      <div>
        <MTypography variant="overline">OVERLINE TEXT</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="overline"</MTypography>
      </div>
    </div>
  `}),t=s=>({components:{MTypography:o},setup(){return{args:s}},template:`
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Typography Playground</h3>
        <p class="text-gray-600">Customize typography using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <MTypography 
          v-bind="args"
          :style="getTypographyStyles(args)"
        >
          {{ args.content || 'This is customizable typography text. Use the controls to modify its appearance and styling.' }}
        </MTypography>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Use the Controls panel to modify typography properties and see real-time changes.
      </div>
    </div>
  `,methods:{getTypographyStyles(r){const a={};return r.variant&&["h1","h2"].includes(r.variant)?a.fontFamily="var(--mf-font-family-bold)":a.fontFamily="var(--mf-font-family)",r.color==="primary"?a.color="var(--mf-primary)":r.color==="secondary"?a.color="var(--mf-secondary)":r.color==="textPrimary"?a.color="var(--mf-text-primary)":r.color==="textSecondary"&&(a.color="var(--mf-text-secondary)"),a}}});t.args={variant:"h3",color:"primary",align:"inherit",component:"",gutterBottom:!1,noWrap:!1,content:"Personal Loans Made Simple with Your Town Finance"};var l,d,c;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`args => ({
  components: {
    MTypography
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <MTypography v-bind="args">
      {{ args.content || 'This is customizable typography text. Use the controls to modify appearance.' }}
    </MTypography>
  \`
})`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var v,h,g;y.parameters={...y.parameters,docs:{...(v=y.parameters)==null?void 0:v.docs,source:{originalSource:`() => ({
  components: {
    MTypography
  },
  template: \`
    <div class="space-y-8" style="font-family: var(--mf-font-family);">
      <div>
        <MTypography variant="h1" class="mb-4" style="font-family: var(--mf-font-family-bold); color: var(--mf-primary);">
          Personal Loans Made Simple
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H1 - MuliBold, 2.5rem, Weight 700 - Primary brand color
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="h2" class="mb-4" style="font-family: var(--mf-font-family-bold); color: var(--mf-secondary);">
          Get the Funds You Need Today
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H2 - MuliBold, 2rem, Weight 700 - Secondary brand color
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="h3" class="mb-4" style="color: var(--mf-primary);">
          Quick and Easy Application Process
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H3 - Muli, 1.75rem, Weight 600
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="h4" class="mb-4" style="color: var(--mf-text-primary);">
          Competitive Rates and Flexible Terms
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          H4 - Muli, 1.5rem, Weight 600
        </MTypography>
      </div>
    </div>
  \`
})`,...(g=(h=y.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var m,T,M;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`() => ({
  components: {
    MTypography
  },
  template: \`
    <div class="space-y-6" style="font-family: var(--mf-font-family);">
      <div>
        <MTypography variant="body1" class="mb-4" style="color: var(--mf-text-primary);">
          At Your Town Finance, we understand that life can present unexpected financial challenges.
          Whether you need funds for home improvements, debt consolidation, or unexpected expenses, 
          our personal loans are designed to help you achieve your financial goals.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Body1 - Muli, 1rem, Weight 400, Line Height 1.5
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="body2" class="mb-4" style="color: var(--mf-text-secondary);">
          Terms and conditions apply. APR ranges from 5.99% to 35.99%. 
          Loan amounts from $1,000 to $25,000. Actual rate depends on credit profile.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Body2 - Muli, 0.875rem, Weight 400
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle1" class="mb-4" style="color: var(--mf-primary);">
          Why Choose Your Town Finance?
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Subtitle1 - Muli, 1.125rem, Weight 500
        </MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle2" class="mb-4" style="color: var(--mf-secondary);">
          Quick Application Process
        </MTypography>
        <MTypography variant="body2" color="textSecondary">
          Subtitle2 - Muli, 1rem, Weight 500
        </MTypography>
      </div>
    </div>
  \`
})`,...(M=(T=e.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var f,b,u;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`() => ({
  components: {
    MTypography
  },
  template: \`
    <div class="max-w-4xl space-y-6" style="font-family: var(--mf-font-family);">
      <MTypography variant="h2" class="mb-6" style="font-family: var(--mf-font-family-bold); color: var(--mf-primary);">
        Personal Loan Application
      </MTypography>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <MTypography variant="h4" class="mb-4" style="color: var(--mf-secondary);">
            Loan Details
          </MTypography>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Loan Amount:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-primary);">
                $15,000
              </MTypography>
            </div>
            
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Interest Rate:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-success);">
                8.99% APR
              </MTypography>
            </div>
            
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Monthly Payment:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-primary);">
                $187.00
              </MTypography>
            </div>
            
            <div class="flex justify-between">
              <MTypography variant="body1" style="color: var(--mf-text-primary);">
                Term:
              </MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-text-primary);">
                60 months
              </MTypography>
            </div>
          </div>
        </div>
        
        <div>
          <MTypography variant="h4" class="mb-4" style="color: var(--mf-secondary);">
            Important Information
          </MTypography>
          
          <MTypography variant="body2" class="mb-4" style="color: var(--mf-text-secondary);">
            Your loan application has been pre-approved based on the information provided. 
            Final approval is subject to verification of income and employment.
          </MTypography>
          
          <MTypography variant="caption" style="color: var(--mf-text-hint);">
            * This is an example of how rates are displayed. Actual rates may vary based on 
            creditworthiness, loan amount, and other factors. All loans subject to approval.
          </MTypography>
        </div>
      </div>
      
      <div class="mt-8 p-6 bg-gray-50 rounded-lg">
        <MTypography variant="h5" class="mb-4" style="color: var(--mf-primary);">
          Next Steps
        </MTypography>
        
        <div class="space-y-3">
          <MTypography variant="body1" style="color: var(--mf-text-primary);">
            1. Review and sign your loan agreement
          </MTypography>
          <MTypography variant="body1" style="color: var(--mf-text-primary);">
            2. Provide required documentation
          </MTypography>
          <MTypography variant="body1" style="color: var(--mf-text-primary);">
            3. Receive funds in 1-2 business days
          </MTypography>
        </div>
      </div>
    </div>
  \`
})`,...(u=(b=p.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var x,S,w;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`() => ({
  components: {
    MTypography
  },
  template: \`
    <div class="space-y-8" style="font-family: var(--mf-font-family);">
      <div>
        <MTypography variant="h1" style="font-family: var(--mf-font-family-bold);">
          Heading 1
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h1"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h2" style="font-family: var(--mf-font-family-bold);">
          Heading 2
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h2"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h3">Heading 3</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h3"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h4">Heading 4</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h4"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h5">Heading 5</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h5"</MTypography>
      </div>
      
      <div>
        <MTypography variant="h6">Heading 6</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="h6"</MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle1">Subtitle 1</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="subtitle1"</MTypography>
      </div>
      
      <div>
        <MTypography variant="subtitle2">Subtitle 2</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="subtitle2"</MTypography>
      </div>
      
      <div>
        <MTypography variant="body1">
          Body 1 - This is a paragraph of text using the body1 variant. 
          It's perfect for regular content and maintains good readability.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="body1"</MTypography>
      </div>
      
      <div>
        <MTypography variant="body2">
          Body 2 - This is a paragraph of text using the body2 variant. 
          It's slightly smaller than body1 and great for secondary content.
        </MTypography>
        <MTypography variant="body2" color="textSecondary">variant="body2"</MTypography>
      </div>
      
      <div>
        <MTypography variant="button">BUTTON TEXT</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="button"</MTypography>
      </div>
      
      <div>
        <MTypography variant="caption">Caption text - smaller text for annotations</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="caption"</MTypography>
      </div>
      
      <div>
        <MTypography variant="overline">OVERLINE TEXT</MTypography>
        <MTypography variant="body2" color="textSecondary">variant="overline"</MTypography>
      </div>
    </div>
  \`
})`,...(w=(S=i.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var P,A,H;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`args => ({
  components: {
    MTypography
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Typography Playground</h3>
        <p class="text-gray-600">Customize typography using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <MTypography 
          v-bind="args"
          :style="getTypographyStyles(args)"
        >
          {{ args.content || 'This is customizable typography text. Use the controls to modify its appearance and styling.' }}
        </MTypography>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Use the Controls panel to modify typography properties and see real-time changes.
      </div>
    </div>
  \`,
  methods: {
    getTypographyStyles(args) {
      const styles = {};

      // Apply Your Town Finance font family
      if (args.variant && ['h1', 'h2'].includes(args.variant)) {
        styles.fontFamily = 'var(--mf-font-family-bold)';
      } else {
        styles.fontFamily = 'var(--mf-font-family)';
      }

      // Apply brand colors
      if (args.color === 'primary') {
        styles.color = 'var(--mf-primary)';
      } else if (args.color === 'secondary') {
        styles.color = 'var(--mf-secondary)';
      } else if (args.color === 'textPrimary') {
        styles.color = 'var(--mf-text-primary)';
      } else if (args.color === 'textSecondary') {
        styles.color = 'var(--mf-text-secondary)';
      }
      return styles;
    }
  }
})`,...(H=(A=t.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};const I=["Default","YourTownFinanceHeadings","BodyText","FinancialContent","AllVariants","Playground"];export{i as AllVariants,e as BodyText,n as Default,p as FinancialContent,t as Playground,y as YourTownFinanceHeadings,I as __namedExportsOrder,L as default};
