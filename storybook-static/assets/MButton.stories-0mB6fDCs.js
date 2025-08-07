import{M as t}from"./MButton-ClHapibe.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const J={title:"UI/Actions/Button",component:t,parameters:{docs:{description:{component:"Material Design button component with multiple variants, sizes, and colors. Supports icons, loading states, and accessibility features."}}},argTypes:{variant:{control:{type:"select"},options:["filled","outlined","text","elevated","tonal"]},size:{control:{type:"select"},options:["xs","sm","md","lg","xl"]},color:{control:{type:"select"},options:["primary","secondary","success","warning","error","info","neutral"]},shape:{control:{type:"select"},options:["rounded","square","pill"]},onClick:{action:"clicked"}}},n={args:{text:"Button",variant:"filled",color:"primary"}},e={render:()=>({components:{MButton:t},template:`
      <div class="space-y-4">
        <div class="space-x-4">
          <MButton variant="filled" text="Filled" />
          <MButton variant="outlined" text="Outlined" />
          <MButton variant="text" text="Text" />
          <MButton variant="elevated" text="Elevated" />
          <MButton variant="tonal" text="Tonal" />
        </div>
      </div>
    `})},o={render:()=>({components:{MButton:t},template:`
      <div class="flex items-end space-x-4">
        <MButton size="xs" text="Extra Small" />
        <MButton size="sm" text="Small" />
        <MButton size="md" text="Medium" />
        <MButton size="lg" text="Large" />
        <MButton size="xl" text="Extra Large" />
      </div>
    `})},a={render:()=>({components:{MButton:t},template:`
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <h3 class="font-semibold">Filled</h3>
          <div class="space-x-2">
            <MButton color="primary" text="Primary" />
            <MButton color="secondary" text="Secondary" />
            <MButton color="success" text="Success" />
            <MButton color="warning" text="Warning" />
          </div>
          <div class="space-x-2">
            <MButton color="error" text="Error" />
            <MButton color="info" text="Info" />
            <MButton color="neutral" text="Neutral" />
          </div>
        </div>
        
        <div class="space-y-2">
          <h3 class="font-semibold">Outlined</h3>
          <div class="space-x-2">
            <MButton variant="outlined" color="primary" text="Primary" />
            <MButton variant="outlined" color="secondary" text="Secondary" />
            <MButton variant="outlined" color="success" text="Success" />
            <MButton variant="outlined" color="warning" text="Warning" />
          </div>
          <div class="space-x-2">
            <MButton variant="outlined" color="error" text="Error" />
            <MButton variant="outlined" color="info" text="Info" />
            <MButton variant="outlined" color="neutral" text="Neutral" />
          </div>
        </div>
      </div>
    `})},r={render:()=>({components:{MButton:t},template:`
      <div class="space-x-4">
        <MButton prepend-icon="fas fa-plus" text="Add Item" />
        <MButton append-icon="fas fa-arrow-right" text="Continue" />
        <MButton prepend-icon="fas fa-download" append-icon="fas fa-external-link" text="Download" />
      </div>
    `})},s={render:()=>({components:{MButton:t},template:`
      <div class="space-x-4">
        <MButton icon-only prepend-icon="fas fa-heart" size="sm" />
        <MButton icon-only prepend-icon="fas fa-share" />
        <MButton icon-only prepend-icon="fas fa-bookmark" size="lg" />
        <MButton variant="outlined" icon-only prepend-icon="fas fa-star" />
      </div>
    `})},i={render:()=>({components:{MButton:t},template:`
      <div class="space-x-4">
        <MButton :loading="true" text="Loading..." />
        <MButton variant="outlined" :loading="true" text="Processing" />
        <MButton variant="text" :loading="true" text="Saving" />
      </div>
    `})},l={render:()=>({components:{MButton:t},template:`
      <div class="space-x-4">
        <MButton :disabled="true" text="Disabled" />
        <MButton variant="outlined" :disabled="true" text="Disabled" />
        <MButton variant="text" :disabled="true" text="Disabled" />
      </div>
    `})},c={render:()=>({components:{MButton:t},template:`
      <div class="space-x-4">
        <MButton shape="rounded" text="Rounded" />
        <MButton shape="square" text="Square" />
        <MButton shape="pill" text="Pill" />
      </div>
    `})},d={render:()=>({components:{MButton:t},template:`
      <div class="max-w-md space-y-4">
        <MButton :full-width="true" text="Full Width Button" />
        <MButton variant="outlined" :full-width="true" text="Full Width Outlined" />
      </div>
    `})},u={render:()=>({components:{MButton:t},template:`
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Loan Application</h2>
        
        <div class="space-y-4">
          <!-- Primary Actions -->
          <MButton 
            :full-width="true" 
            text="Apply for Loan" 
            color="primary" 
            size="lg"
          />
          
          <!-- Secondary Actions -->
          <div class="grid grid-cols-2 gap-3">
            <MButton 
              variant="outlined" 
              text="Calculate Payment" 
              prepend-icon="fas fa-calculator"
            />
            <MButton 
              variant="outlined" 
              text="View Rates" 
              prepend-icon="fas fa-chart-line"
            />
          </div>
          
          <!-- Utility Actions -->
          <div class="flex justify-between">
            <MButton 
              variant="text" 
              text="Need Help?" 
              size="sm"
              prepend-icon="fas fa-question-circle"
            />
            <MButton 
              variant="text" 
              text="Contact Us" 
              size="sm"
              append-icon="fas fa-phone"
            />
          </div>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Example implementation showing how buttons might be used in a Your Town Finance loan application interface."}}}};var p,m,x;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    text: 'Button',
    variant: 'filled',
    color: 'primary'
  }
}`,...(x=(m=n.parameters)==null?void 0:m.docs)==null?void 0:x.source}}};var v,B,M;e.parameters={...e.parameters,docs:{...(v=e.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="space-y-4">
        <div class="space-x-4">
          <MButton variant="filled" text="Filled" />
          <MButton variant="outlined" text="Outlined" />
          <MButton variant="text" text="Text" />
          <MButton variant="elevated" text="Elevated" />
          <MButton variant="tonal" text="Tonal" />
        </div>
      </div>
    \`
  })
}`,...(M=(B=e.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var f,g,y;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="flex items-end space-x-4">
        <MButton size="xs" text="Extra Small" />
        <MButton size="sm" text="Small" />
        <MButton size="md" text="Medium" />
        <MButton size="lg" text="Large" />
        <MButton size="xl" text="Extra Large" />
      </div>
    \`
  })
}`,...(y=(g=o.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var h,w,S;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="grid grid-cols-2 gap-4">
        <div class="space-y-2">
          <h3 class="font-semibold">Filled</h3>
          <div class="space-x-2">
            <MButton color="primary" text="Primary" />
            <MButton color="secondary" text="Secondary" />
            <MButton color="success" text="Success" />
            <MButton color="warning" text="Warning" />
          </div>
          <div class="space-x-2">
            <MButton color="error" text="Error" />
            <MButton color="info" text="Info" />
            <MButton color="neutral" text="Neutral" />
          </div>
        </div>
        
        <div class="space-y-2">
          <h3 class="font-semibold">Outlined</h3>
          <div class="space-x-2">
            <MButton variant="outlined" color="primary" text="Primary" />
            <MButton variant="outlined" color="secondary" text="Secondary" />
            <MButton variant="outlined" color="success" text="Success" />
            <MButton variant="outlined" color="warning" text="Warning" />
          </div>
          <div class="space-x-2">
            <MButton variant="outlined" color="error" text="Error" />
            <MButton variant="outlined" color="info" text="Info" />
            <MButton variant="outlined" color="neutral" text="Neutral" />
          </div>
        </div>
      </div>
    \`
  })
}`,...(S=(w=a.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var b,z,E;r.parameters={...r.parameters,docs:{...(b=r.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="space-x-4">
        <MButton prepend-icon="fas fa-plus" text="Add Item" />
        <MButton append-icon="fas fa-arrow-right" text="Continue" />
        <MButton prepend-icon="fas fa-download" append-icon="fas fa-external-link" text="Download" />
      </div>
    \`
  })
}`,...(E=(z=r.parameters)==null?void 0:z.docs)==null?void 0:E.source}}};var F,A,D;s.parameters={...s.parameters,docs:{...(F=s.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="space-x-4">
        <MButton icon-only prepend-icon="fas fa-heart" size="sm" />
        <MButton icon-only prepend-icon="fas fa-share" />
        <MButton icon-only prepend-icon="fas fa-bookmark" size="lg" />
        <MButton variant="outlined" icon-only prepend-icon="fas fa-star" />
      </div>
    \`
  })
}`,...(D=(A=s.parameters)==null?void 0:A.docs)==null?void 0:D.source}}};var L,P,W;i.parameters={...i.parameters,docs:{...(L=i.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="space-x-4">
        <MButton :loading="true" text="Loading..." />
        <MButton variant="outlined" :loading="true" text="Processing" />
        <MButton variant="text" :loading="true" text="Saving" />
      </div>
    \`
  })
}`,...(W=(P=i.parameters)==null?void 0:P.docs)==null?void 0:W.source}}};var I,C,O;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="space-x-4">
        <MButton :disabled="true" text="Disabled" />
        <MButton variant="outlined" :disabled="true" text="Disabled" />
        <MButton variant="text" :disabled="true" text="Disabled" />
      </div>
    \`
  })
}`,...(O=(C=l.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};var T,k,q;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="space-x-4">
        <MButton shape="rounded" text="Rounded" />
        <MButton shape="square" text="Square" />
        <MButton shape="pill" text="Pill" />
      </div>
    \`
  })
}`,...(q=(k=c.parameters)==null?void 0:k.docs)==null?void 0:q.source}}};var N,U,R;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="max-w-md space-y-4">
        <MButton :full-width="true" text="Full Width Button" />
        <MButton variant="outlined" :full-width="true" text="Full Width Outlined" />
      </div>
    \`
  })
}`,...(R=(U=d.parameters)==null?void 0:U.docs)==null?void 0:R.source}}};var V,Y,_;u.parameters={...u.parameters,docs:{...(V=u.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MButton
    },
    template: \`
      <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Loan Application</h2>
        
        <div class="space-y-4">
          <!-- Primary Actions -->
          <MButton 
            :full-width="true" 
            text="Apply for Loan" 
            color="primary" 
            size="lg"
          />
          
          <!-- Secondary Actions -->
          <div class="grid grid-cols-2 gap-3">
            <MButton 
              variant="outlined" 
              text="Calculate Payment" 
              prepend-icon="fas fa-calculator"
            />
            <MButton 
              variant="outlined" 
              text="View Rates" 
              prepend-icon="fas fa-chart-line"
            />
          </div>
          
          <!-- Utility Actions -->
          <div class="flex justify-between">
            <MButton 
              variant="text" 
              text="Need Help?" 
              size="sm"
              prepend-icon="fas fa-question-circle"
            />
            <MButton 
              variant="text" 
              text="Contact Us" 
              size="sm"
              append-icon="fas fa-phone"
            />
          </div>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example implementation showing how buttons might be used in a Your Town Finance loan application interface.'
      }
    }
  }
}`,...(_=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:_.source}}};const K=["Default","Variants","Sizes","Colors","WithIcons","IconOnly","LoadingStates","DisabledStates","Shapes","FullWidth","YourTownFinanceExample"];export{a as Colors,n as Default,l as DisabledStates,d as FullWidth,s as IconOnly,i as LoadingStates,c as Shapes,o as Sizes,e as Variants,r as WithIcons,u as YourTownFinanceExample,K as __namedExportsOrder,J as default};
