import{E as L}from"./ECFRBreadcrumb-D9-R7w7A.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const I={title:"eCFR/ECFRBreadcrumb",component:L,tags:["autodocs"],argTypes:{path:{control:"object",description:"The breadcrumb path array containing the hierarchy"},darkMode:{control:"boolean",description:"Whether to display the breadcrumb in dark mode"},options:{control:"object",description:"Configuration options for the breadcrumb"}}},e=[{id:"home",title:"Home",type:"root"},{id:"title-1",title:"General Provisions",type:"title",number:"1"},{id:"part-1",title:"Definitions",type:"part",number:"1"},{id:"section-1-1",title:"Scope and Purpose",type:"section",number:"1.1"}],t={args:{path:e,darkMode:!1,options:{rootLabel:"Home",truncate:!0,visibleItems:3,maxVisible:4,type:"standard",separatorType:"icon"}}},a={args:{path:e,darkMode:!0,options:{rootLabel:"Home",truncate:!0,visibleItems:3,maxVisible:4,type:"standard",separatorType:"icon"}}},r={args:{path:e,darkMode:!1,options:{rootLabel:"Home",truncate:!1,type:"scrollable",separatorType:"icon"}}},n={args:{path:e,darkMode:!1,options:{rootLabel:"Home",truncate:!0,visibleItems:1,maxVisible:2,type:"standard",separatorType:"text",style:"compact"}}},o={args:{path:[{id:"home",title:"Home",type:"root"},{id:"title-1",title:"General Provisions",type:"title",number:"1"},{id:"part-1",title:"Definitions",type:"part",number:"1"},{id:"subpart-a",title:"General Definitions",type:"subpart",number:"A"},{id:"section-1-1",title:"Scope and Purpose",type:"section",number:"1.1"},{id:"paragraph-a",title:"General Scope",type:"paragraph",number:"a"},{id:"subparagraph-1",title:"Application",type:"subparagraph",number:"1"}],darkMode:!1,options:{rootLabel:"Home",truncate:!0,visibleItems:2,maxVisible:3,type:"standard",separatorType:"icon"}}},s={args:{path:e,darkMode:!1,options:{rootLabel:"Home",truncate:!0,visibleItems:3,maxVisible:4,type:"standard",separatorType:"icon",customClasses:{container:"bg-indigo-100 p-3 rounded-lg",item:"text-indigo-700 hover:text-indigo-900",separator:"text-indigo-400",current:"font-bold text-indigo-800"}}}};var i,p,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 3,
      maxVisible: 4,
      type: 'standard',
      separatorType: 'icon'
    }
  }
}`,...(d=(p=t.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,c,m;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    path: samplePath,
    darkMode: true,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 3,
      maxVisible: 4,
      type: 'standard',
      separatorType: 'icon'
    }
  }
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,b,y;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: false,
      type: 'scrollable',
      separatorType: 'icon'
    }
  }
}`,...(y=(b=r.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var g,h,f;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 1,
      maxVisible: 2,
      type: 'standard',
      separatorType: 'text',
      style: 'compact'
    }
  }
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var x,S,k;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    path: [{
      id: 'home',
      title: 'Home',
      type: 'root'
    }, {
      id: 'title-1',
      title: 'General Provisions',
      type: 'title',
      number: '1'
    }, {
      id: 'part-1',
      title: 'Definitions',
      type: 'part',
      number: '1'
    }, {
      id: 'subpart-a',
      title: 'General Definitions',
      type: 'subpart',
      number: 'A'
    }, {
      id: 'section-1-1',
      title: 'Scope and Purpose',
      type: 'section',
      number: '1.1'
    }, {
      id: 'paragraph-a',
      title: 'General Scope',
      type: 'paragraph',
      number: 'a'
    }, {
      id: 'subparagraph-1',
      title: 'Application',
      type: 'subparagraph',
      number: '1'
    }],
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 2,
      maxVisible: 3,
      type: 'standard',
      separatorType: 'icon'
    }
  }
}`,...(k=(S=o.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var v,H,M;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    path: samplePath,
    darkMode: false,
    options: {
      rootLabel: 'Home',
      truncate: true,
      visibleItems: 3,
      maxVisible: 4,
      type: 'standard',
      separatorType: 'icon',
      customClasses: {
        container: 'bg-indigo-100 p-3 rounded-lg',
        item: 'text-indigo-700 hover:text-indigo-900',
        separator: 'text-indigo-400',
        current: 'font-bold text-indigo-800'
      }
    }
  }
}`,...(M=(H=s.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};const V=["Standard","DarkMode","Scrollable","Compact","LongPath","CustomStyling"];export{n as Compact,s as CustomStyling,a as DarkMode,o as LongPath,r as Scrollable,t as Standard,V as __namedExportsOrder,I as default};
