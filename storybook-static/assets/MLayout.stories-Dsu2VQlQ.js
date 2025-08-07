import{M as G}from"./MNavbar-C4dYuMW0.js";import{k as s,p as o,l as n,B as p,s as b,F as v,x,v as c,Q as J,z as t,C as Q,A as K}from"./vue.esm-bundler-BOts1VAj.js";import{_ as U}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{M as Z}from"./MButton-ClHapibe.js";const O={name:"MLayout",components:{MNavbar:G},props:{variant:{type:String,default:"default",validator:a=>["default","sidebar","dashboard","minimal"].includes(a)},showHeader:{type:Boolean,default:!0},showSidebar:{type:Boolean,default:!1},showFooter:{type:Boolean,default:!0},showBreadcrumb:{type:Boolean,default:!1},navbar:{type:Object,default:null},sidebarItems:{type:Array,default:()=>[]},breadcrumbItems:{type:Array,default:()=>[]},pageTitle:{type:String,default:""},pageSubtitle:{type:String,default:""},footerText:{type:String,default:""},sidebarPosition:{type:String,default:"left",validator:a=>["left","right"].includes(a)},sidebarWidth:{type:String,default:"256px"},fluid:{type:Boolean,default:!1}},emits:["search","action","nav-click","sidebar-click","breadcrumb-click"],data(){return{sidebarMobileOpen:!1}},computed:{layoutClasses(){return[`layout-${this.variant}`,{"layout-with-sidebar":this.showSidebar,"layout-sidebar-right":this.sidebarPosition==="right","layout-fluid":this.fluid}]},mainClasses(){return{"with-sidebar":this.showSidebar,"sidebar-right":this.sidebarPosition==="right"}},sidebarClasses(){return{"sidebar-right":this.sidebarPosition==="right","sidebar-mobile-open":this.sidebarMobileOpen}},contentClasses(){return{"with-sidebar":this.showSidebar,"sidebar-right":this.sidebarPosition==="right",fluid:this.fluid}}},methods:{handleSidebarClick(a){this.$emit("sidebar-click",a)},handleBreadcrumbClick(a){this.$emit("breadcrumb-click",a)},toggleMobileSidebar(){this.sidebarMobileOpen=!this.sidebarMobileOpen},closeMobileSidebar(){this.sidebarMobileOpen=!1},getIconPath(a){const l={dashboard:"M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM11 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM11 12a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z",users:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM5 14a4 4 0 118 0v1a1 1 0 01-1 1H6a1 1 0 01-1-1v-1z",settings:"M10 2L8.09 0.09C7.7 -0.3 7.16 -0.3 6.77 0.09L4.86 2H2.5C1.12 2 0 3.12 0 4.5V17.5C0 18.88 1.12 20 2.5 20H17.5C18.88 20 20 18.88 20 17.5V4.5C20 3.12 18.88 2 17.5 2H15.14L13.23 0.09C12.84 -0.3 12.3 -0.3 11.91 0.09L10 2ZM10 15C7.24 15 5 12.76 5 10S7.24 5 10 5S15 7.24 15 10S12.76 15 10 15Z",analytics:"M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z M12 2.252A8.014 8.014 0 0017.748 8H12V2.252z",documents:"M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm2 3h8v1H6V5zm0 2h8v1H6V7zm0 2h5v1H6V9z"};return l[a]||l.dashboard}}},X={key:0,class:"layout-header"},Y={class:"sidebar-content"},q={class:"sidebar-nav"},$={class:"sidebar-menu"},ee=["href","onClick"],ae={key:0,class:"sidebar-menu-icon"},te={width:"20",height:"20",viewBox:"0 0 20 20",fill:"currentColor"},se=["d"],re={class:"sidebar-menu-text"},ne={key:0,class:"sidebar-submenu"},oe=["href","onClick"],le={key:0,class:"content-breadcrumb"},ie={class:"breadcrumb-nav"},de={class:"breadcrumb-list"},ue=["href","onClick"],ce={key:1,class:"breadcrumb-current"},be={key:2,class:"breadcrumb-separator",width:"16",height:"16",viewBox:"0 0 16 16"},me={key:1,class:"content-header"},pe={class:"content-header-main"},ge={class:"content-header-text"},fe={key:0,class:"page-title"},he={key:1,class:"page-subtitle"},ye={key:0,class:"content-header-actions"},ve={class:"content-body"},xe={key:1,class:"layout-footer"},we={class:"footer-content"},Me={class:"footer-section"},Se={class:"footer-text"};function ke(a,l,r,Be,R,i){const W=J("MNavbar");return t(),s("div",{class:b(["m-layout",i.layoutClasses])},[r.showHeader?(t(),s("header",X,[p(a.$slots,"header",{},()=>[r.navbar?(t(),Q(W,K({key:0},r.navbar,{onSearch:l[0]||(l[0]=e=>a.$emit("search",e)),onAction:l[1]||(l[1]=e=>a.$emit("action",e)),onNavClick:l[2]||(l[2]=e=>a.$emit("nav-click",e))}),null,16)):o("",!0)],!0)])):o("",!0),n("div",{class:b(["layout-main",i.mainClasses])},[r.showSidebar?(t(),s("aside",{key:0,class:b(["layout-sidebar",i.sidebarClasses])},[p(a.$slots,"sidebar",{},()=>[n("div",Y,[n("nav",q,[n("ul",$,[(t(!0),s(v,null,x(r.sidebarItems,e=>(t(),s("li",{key:e.id,class:b(["sidebar-menu-item",{active:e.active}])},[n("a",{href:e.href||"#",class:"sidebar-menu-link",onClick:d=>i.handleSidebarClick(e)},[e.icon?(t(),s("span",ae,[(t(),s("svg",te,[n("path",{d:i.getIconPath(e.icon)},null,8,se)]))])):o("",!0),n("span",re,c(e.label),1),e.badge?(t(),s("span",{key:1,class:b(["sidebar-badge",e.badge.variant])},c(e.badge.text),3)):o("",!0)],8,ee),e.children&&e.expanded?(t(),s("ul",ne,[(t(!0),s(v,null,x(e.children,d=>(t(),s("li",{key:d.id,class:"sidebar-submenu-item"},[n("a",{href:d.href||"#",class:"sidebar-submenu-link",onClick:E=>i.handleSidebarClick(d)},c(d.label),9,oe)]))),128))])):o("",!0)],2))),128))])])])],!0)],2)):o("",!0),n("main",{class:b(["layout-content",i.contentClasses])},[r.showBreadcrumb&&r.breadcrumbItems.length>0?(t(),s("div",le,[n("nav",ie,[n("ol",de,[(t(!0),s(v,null,x(r.breadcrumbItems,(e,d)=>(t(),s("li",{key:e.id||d,class:b(["breadcrumb-item",{active:d===r.breadcrumbItems.length-1}])},[d<r.breadcrumbItems.length-1?(t(),s("a",{key:0,href:e.href||"#",class:"breadcrumb-link",onClick:E=>i.handleBreadcrumbClick(e)},c(e.label),9,ue)):(t(),s("span",ce,c(e.label),1)),d<r.breadcrumbItems.length-1?(t(),s("svg",be,l[4]||(l[4]=[n("path",{d:"M6 12l4-4-4-4",stroke:"currentColor","stroke-width":"2",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},null,-1)]))):o("",!0)],2))),128))])])])):o("",!0),r.pageTitle||r.pageSubtitle||a.$slots.actions?(t(),s("div",me,[n("div",pe,[n("div",ge,[r.pageTitle?(t(),s("h1",fe,c(r.pageTitle),1)):o("",!0),r.pageSubtitle?(t(),s("p",he,c(r.pageSubtitle),1)):o("",!0)]),a.$slots.actions?(t(),s("div",ye,[p(a.$slots,"actions",{},void 0,!0)])):o("",!0)])])):o("",!0),n("div",ve,[p(a.$slots,"default",{},void 0,!0)])],2)],2),r.showFooter?(t(),s("footer",xe,[p(a.$slots,"footer",{},()=>[n("div",we,[n("div",Me,[n("p",Se,c(r.footerText||"© 2024 Financial Services. All rights reserved."),1)])])],!0)])):o("",!0),r.showSidebar&&R.sidebarMobileOpen?(t(),s("div",{key:2,class:"sidebar-overlay",onClick:l[3]||(l[3]=(...e)=>i.closeMobileSidebar&&i.closeMobileSidebar(...e))})):o("",!0)],2)}const w=U(O,[["render",ke],["__scopeId","data-v-698aa647"]]);O.__docgenInfo={displayName:"MLayout",exportName:"default",description:"",tags:{},props:[{name:"variant",type:{name:"string"},defaultValue:{func:!1,value:"'default'"},values:["default","sidebar","dashboard","minimal"]},{name:"showHeader",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showSidebar",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"showFooter",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"showBreadcrumb",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"navbar",type:{name:"object"},defaultValue:{func:!1,value:"null"}},{name:"sidebarItems",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"breadcrumbItems",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"pageTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"pageSubtitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"footerText",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"sidebarPosition",type:{name:"string"},defaultValue:{func:!1,value:"'left'"},values:["left","right"]},{name:"sidebarWidth",type:{name:"string"},defaultValue:{func:!1,value:"'256px'"}},{name:"fluid",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"search"},{name:"action"},{name:"nav-click"},{name:"sidebar-click",type:{names:["undefined"]}},{name:"breadcrumb-click",type:{names:["undefined"]}}],slots:[{name:"header"},{name:"sidebar"},{name:"actions"},{name:"default"},{name:"footer"}],sourceFiles:["C:/Users/bradl/OneDrive/Documents/GitHub/bmc-navigator-component/src/components/layout/MLayout.vue"]};const He={title:"Layout/Structure/Layout",component:w,parameters:{layout:"fullscreen",docs:{description:{component:"A flexible layout component with header, sidebar, main content, and footer areas. Supports multiple variants and responsive design."}}},argTypes:{variant:{control:{type:"select"},options:["default","sidebar","dashboard","minimal"]},showHeader:{control:{type:"boolean"}},showSidebar:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}},showBreadcrumb:{control:{type:"boolean"}},fluid:{control:{type:"boolean"}},sidebarPosition:{control:{type:"select"},options:["left","right"]}}},Ce={brand:{text:"Your Town Finance",logo:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM2ODNmNiIvPgo8cGF0aCBkPSJNOCAyMEwxNiAxMkwyNCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+"},navigationItems:[{id:"dashboard",label:"Dashboard",href:"#dashboard"},{id:"applications",label:"Applications",href:"#applications"},{id:"customers",label:"Customers",href:"#customers"},{id:"reports",label:"Reports",href:"#reports"}],actionItems:[{id:"user",type:"user",name:"John Admin",email:"admin@yourtownfinance.com",showName:!0,menuItems:[{id:"profile",label:"Profile",href:"#profile"},{id:"settings",label:"Settings",href:"#settings"},{id:"logout",label:"Sign Out",href:"#logout"}]}]},_e=[{id:"dashboard",label:"Dashboard",icon:"dashboard",href:"#dashboard",active:!0},{id:"applications",label:"Loan Applications",icon:"documents",href:"#applications",badge:{text:"12",variant:"primary"}},{id:"customers",label:"Customers",icon:"users",href:"#customers"},{id:"analytics",label:"Analytics",icon:"analytics",href:"#analytics",children:[{id:"performance",label:"Performance",href:"#performance"},{id:"revenue",label:"Revenue",href:"#revenue"},{id:"trends",label:"Market Trends",href:"#trends"}],expanded:!0},{id:"settings",label:"Settings",icon:"settings",href:"#settings"}],Ie=[{id:"home",label:"Home",href:"#home"},{id:"dashboard",label:"Dashboard",href:"#dashboard"},{id:"current",label:"Current Page"}],u={args:{variant:"default",showHeader:!0,showFooter:!0,showBreadcrumb:!1,showSidebar:!1,navbar:Ce,pageTitle:"Financial Dashboard",pageSubtitle:"Monitor your financial services performance",fluid:!1},render:a=>({components:{MLayout:w,MButton:Z},setup(){return{args:a}},template:`
      <MLayout v-bind="args">
        <template #actions>
          <MButton variant="primary">New Application</MButton>
          <MButton variant="outline">Export Data</MButton>
        </template>
        
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Applications</h3>
              <p class="text-3xl font-bold text-blue-600">1,247</p>
              <p class="text-sm text-gray-600 mt-1">+12% from last month</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Approval Rate</h3>
              <p class="text-3xl font-bold text-green-600">87.3%</p>
              <p class="text-sm text-gray-600 mt-1">+2.1% from last month</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Average Loan</h3>
              <p class="text-3xl font-bold text-purple-600">$25,400</p>
              <p class="text-sm text-gray-600 mt-1">-3.2% from last month</p>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p class="font-medium text-gray-900">New loan application submitted</p>
                  <p class="text-sm text-gray-600">Application #LA-2024-001 - $15,000</p>
                </div>
                <span class="text-sm text-gray-500">2 minutes ago</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p class="font-medium text-gray-900">Loan approved</p>
                  <p class="text-sm text-gray-600">Application #LA-2024-899 - $22,500</p>
                </div>
                <span class="text-sm text-gray-500">15 minutes ago</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="font-medium text-gray-900">Payment received</p>
                  <p class="text-sm text-gray-600">Customer ID #C-4567 - $485.00</p>
                </div>
                <span class="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </MLayout>
    `})},m={args:{...u.args,variant:"sidebar",showSidebar:!0,sidebarItems:_e,showBreadcrumb:!0,breadcrumbItems:Ie},render:u.render},g={args:{...m.args,variant:"dashboard"},render:u.render},f={args:{...m.args,sidebarPosition:"right"},render:u.render},h={args:{variant:"minimal",showHeader:!1,showFooter:!1,showSidebar:!1,pageTitle:"Loan Application",pageSubtitle:"Complete your personal loan application"},render:a=>({components:{MLayout:w,MButton:Z},setup(){return{args:a}},template:`
      <MLayout v-bind="args">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white p-8 rounded-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-8">
              <MButton variant="outline">Previous</MButton>
              <MButton variant="primary">Continue</MButton>
            </div>
          </div>
        </div>
      </MLayout>
    `})},y={args:{...m.args,fluid:!0},render:u.render};var M,S,k;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    showHeader: true,
    showFooter: true,
    showBreadcrumb: false,
    showSidebar: false,
    navbar: navbarConfig,
    pageTitle: 'Financial Dashboard',
    pageSubtitle: 'Monitor your financial services performance',
    fluid: false
  },
  render: args => ({
    components: {
      MLayout,
      MButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <MLayout v-bind="args">
        <template #actions>
          <MButton variant="primary">New Application</MButton>
          <MButton variant="outline">Export Data</MButton>
        </template>
        
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Applications</h3>
              <p class="text-3xl font-bold text-blue-600">1,247</p>
              <p class="text-sm text-gray-600 mt-1">+12% from last month</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Approval Rate</h3>
              <p class="text-3xl font-bold text-green-600">87.3%</p>
              <p class="text-sm text-gray-600 mt-1">+2.1% from last month</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Average Loan</h3>
              <p class="text-3xl font-bold text-purple-600">$25,400</p>
              <p class="text-sm text-gray-600 mt-1">-3.2% from last month</p>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p class="font-medium text-gray-900">New loan application submitted</p>
                  <p class="text-sm text-gray-600">Application #LA-2024-001 - $15,000</p>
                </div>
                <span class="text-sm text-gray-500">2 minutes ago</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p class="font-medium text-gray-900">Loan approved</p>
                  <p class="text-sm text-gray-600">Application #LA-2024-899 - $22,500</p>
                </div>
                <span class="text-sm text-gray-500">15 minutes ago</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="font-medium text-gray-900">Payment received</p>
                  <p class="text-sm text-gray-600">Customer ID #C-4567 - $485.00</p>
                </div>
                <span class="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </MLayout>
    \`
  })
}`,...(k=(S=u.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var C,_,I;m.parameters={...m.parameters,docs:{...(C=m.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'sidebar',
    showSidebar: true,
    sidebarItems: sidebarItems,
    showBreadcrumb: true,
    breadcrumbItems: breadcrumbItems
  },
  render: Default.render
}`,...(I=(_=m.parameters)==null?void 0:_.docs)==null?void 0:I.source}}};var B,A,L;g.parameters={...g.parameters,docs:{...(B=g.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    ...WithSidebar.args,
    variant: 'dashboard'
  },
  render: Default.render
}`,...(L=(A=g.parameters)==null?void 0:A.docs)==null?void 0:L.source}}};var P,D,H;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    ...WithSidebar.args,
    sidebarPosition: 'right'
  },
  render: Default.render
}`,...(H=(D=f.parameters)==null?void 0:D.docs)==null?void 0:H.source}}};var N,V,z;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    variant: 'minimal',
    showHeader: false,
    showFooter: false,
    showSidebar: false,
    pageTitle: 'Loan Application',
    pageSubtitle: 'Complete your personal loan application'
  },
  render: args => ({
    components: {
      MLayout,
      MButton
    },
    setup() {
      return {
        args
      };
    },
    template: \`
      <MLayout v-bind="args">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white p-8 rounded-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-8">
              <MButton variant="outline">Previous</MButton>
              <MButton variant="primary">Continue</MButton>
            </div>
          </div>
        </div>
      </MLayout>
    \`
  })
}`,...(z=(V=h.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var F,T,j;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    ...WithSidebar.args,
    fluid: true
  },
  render: Default.render
}`,...(j=(T=y.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};const Ne=["Default","WithSidebar","Dashboard","RightSidebar","Minimal","Fluid"];export{g as Dashboard,u as Default,y as Fluid,h as Minimal,f as RightSidebar,m as WithSidebar,Ne as __namedExportsOrder,He as default};
