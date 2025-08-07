import{M as b}from"./MNavbar-C4dYuMW0.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const D={title:"Layout/Navigation/Navbar",component:b,parameters:{layout:"fullscreen",docs:{description:{component:"A comprehensive navigation bar component with dropdowns, search, user menu, and mobile responsive design."}}},argTypes:{variant:{control:{type:"select"},options:["light","dark","transparent"]},fixed:{control:{type:"boolean"}},fluid:{control:{type:"boolean"}},showMobileToggle:{control:{type:"boolean"}}}},h={text:"Your Town Finance",logo:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM2ODNmNiIvPgo8cGF0aCBkPSJNOCAyMEwxNiAxMkwyNCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",href:"#"},y=[{id:"products",label:"Products",children:[{id:"personal-loans",label:"Personal Loans",description:"Quick approval personal loans for your needs",href:"#personal-loans",badge:{text:"Popular",variant:"success"}},{id:"auto-loans",label:"Auto Loans",description:"Competitive rates for new and used vehicles",href:"#auto-loans"},{id:"home-loans",label:"Home Loans",description:"Mortgage solutions for homebuyers",href:"#home-loans"},{id:"credit-cards",label:"Credit Cards",description:"Flexible credit card options",href:"#credit-cards",badge:{text:"New",variant:"primary"}}]},{id:"rates",label:"Rates & Fees",href:"#rates"},{id:"locations",label:"Locations",href:"#locations"},{id:"resources",label:"Resources",children:[{id:"calculators",label:"Loan Calculators",description:"Calculate payments and rates",href:"#calculators"},{id:"guides",label:"Financial Guides",description:"Expert advice and tips",href:"#guides"},{id:"faq",label:"FAQ",description:"Frequently asked questions",href:"#faq"}]}],v=[{id:"search",type:"search",placeholder:"Search loans, rates, locations..."},{id:"apply",type:"button",label:"Apply Now",variant:"primary"},{id:"login",type:"button",label:"Login",variant:"outline"}],I=[{id:"search",type:"search",placeholder:"Search loans, rates, locations..."},{id:"user",type:"user",name:"John Doe",email:"john.doe@example.com",avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",showName:!0,menuItems:[{id:"profile",label:"My Profile",href:"#profile"},{id:"applications",label:"My Applications",href:"#applications"},{id:"documents",label:"Documents",href:"#documents"},{id:"settings",label:"Account Settings",href:"#settings"},{id:"logout",label:"Sign Out",href:"#logout"}]}],e={args:{brand:h,navigationItems:y,actionItems:v,variant:"light",fixed:!1,fluid:!1,showMobileToggle:!0}},a={args:{...e.args,variant:"dark"},parameters:{backgrounds:{default:"dark"}}},r={args:{...e.args,actionItems:I}},o={args:{...e.args,fixed:!0}};var s,t,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    brand: defaultBrand,
    navigationItems: defaultNavigation,
    actionItems: defaultActions,
    variant: 'light',
    fixed: false,
    fluid: false,
    showMobileToggle: true
  }
}`,...(n=(t=e.parameters)==null?void 0:t.docs)==null?void 0:n.source}}};var i,l,c;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(c=(l=a.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,u,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    actionItems: userMenuActions
  }
}`,...(p=(u=r.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var m,g,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fixed: true
  }
}`,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const N=["Default","Dark","WithUserMenu","Fixed"];export{a as Dark,e as Default,o as Fixed,r as WithUserMenu,N as __namedExportsOrder,D as default};
