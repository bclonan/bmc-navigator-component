import{E as k}from"./ECFRNavigator-D-HAEfL4.js";import"./ECFRSection-CJFRE6S2.js";import"./pinia-C5ekiB_t.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ECFRBreadcrumb-D9-R7w7A.js";const e=[{id:"title-1",type:"title",number:"1",title:"General Provisions",agency:"Office of Federal Regulations",updatedDate:"2023-05-15",children:[{id:"part-1",type:"part",number:"1",title:"Definitions",agency:"Office of Federal Regulations",updatedDate:"2023-04-10",children:[{id:"section-1-1",type:"section",number:"1.1",title:"Scope and Purpose",content:"<p>This section defines the scope and purpose of these regulations. The purpose of this regulation is to provide a structured framework for federal regulatory content and ensure consistency across government regulations.</p><p>All definitions and interpretations should be considered within the context provided by this introductory section.</p>",agency:"Office of Federal Regulations",updatedDate:"2023-03-22"},{id:"section-1-2",type:"section",number:"1.2",title:"Terminology",content:"<p>This section provides definitions for terminology used throughout the regulations. Unless otherwise stated, the following definitions apply:</p><ul><li><strong>Agency</strong>: A federal government entity with regulatory authority</li><li><strong>Regulation</strong>: A rule or directive made and maintained by an authority</li><li><strong>Section</strong>: A distinct part of the regulatory framework addressing a specific topic</li></ul>",agency:"Office of Federal Regulations",updatedDate:"2023-02-15"}]},{id:"part-2",type:"part",number:"2",title:"Applications and Procedures",agency:"Department of Administration",updatedDate:"2023-01-30",children:[{id:"section-2-1",type:"section",number:"2.1",title:"Application Process",content:"<p>This section outlines the application process for regulatory compliance. All applications must be submitted through the designated portal with the required documentation as specified in Appendix A.</p><p>The review process typically takes 30 business days from the date of submission.</p>",agency:"Department of Administration",updatedDate:"2022-12-15"}]}]},{id:"title-2",type:"title",number:"2",title:"Administrative Requirements",agency:"Department of Administrative Affairs",updatedDate:"2022-11-10",children:[{id:"part-2-1",type:"part",number:"1",title:"Administrative Procedures",agency:"Department of Administrative Affairs",updatedDate:"2022-10-05",children:[{id:"section-2-1-1",type:"section",number:"1.1",title:"General Requirements",content:"<p>This section covers the general administrative requirements for all federal agencies. Agencies must maintain proper documentation of all regulatory actions and provide annual reports to the Office of Federal Regulations.</p>",agency:"Department of Administrative Affairs",updatedDate:"2022-09-12"}]}]}],t={"section-1-1":{xmlLink:{url:"https://example.com/api/xml/section-1-1.xml",version:"2023-03-22"},renderTarget:{elementId:"content-viewer",mode:"replace"}},"section-1-2":{xmlLink:{url:"https://example.com/api/xml/section-1-2.xml",version:"2023-02-15"},references:[{type:"related",id:"section-2-1",title:"Related Procedures"}]}},W={title:"eCFR/ECFRNavigator",component:k,tags:["autodocs"],argTypes:{items:{control:"object",description:"Hierarchical data structure of items to navigate"},options:{control:"object",description:"Configuration options for the navigator"},itemMetadata:{control:"object",description:"Metadata associated with specific items"},initialSelectedItemId:{control:"text",description:"ID of the item to initially select"}},decorators:[()=>({template:'<div style="height: 600px; border: 1px solid #ccc; border-radius: 4px;"><story /></div>'})]},a={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"}},itemMetadata:t,initialSelectedItemId:"section-1-1"}},i={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"compact",showDescription:!1,showMetadataBadges:!0,itemSpacing:"tight"}},itemMetadata:t}},n={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"detailed",showDescription:!0,showMetadataBadges:!0,itemSpacing:"loose"}},itemMetadata:t}},s={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"styleless",showDescription:!0,showMetadataBadges:!1}},itemMetadata:t}},r={args:{items:e,options:{showBreadcrumb:!0,theme:"dark",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"}},itemMetadata:t}},o={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"},filters:{showAgencyFilter:!0,showDateFilter:!0,showTypeFilter:!0,showKeywordFilter:!0,agencyList:["Office of Federal Regulations","Department of Administration","Department of Administrative Affairs"]}},itemMetadata:t}},d={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"},tooltips:{enabled:!0,showDelay:300,hideDelay:100,maxLength:300,showTypeInfo:!0,position:"right"}},itemMetadata:t}},l={args:{items:e,options:{showBreadcrumb:!0,expandAll:!1,hideContentOnNavigation:!1,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium",maxTitleLength:40,showTypeIcon:!0,showItemNumbers:!0,indentItems:!0,hideEmptyItems:!1},filters:{showAgencyFilter:!0,showDateFilter:!0,showTypeFilter:!0,showKeywordFilter:!0},tooltips:{enabled:!0,showDelay:300,hideDelay:100,maxLength:300},breadcrumb:{rootLabel:"Home",truncate:!0,visibleItems:3,maxVisible:5,type:"scrollable",separatorType:"icon"},fuzzySearch:{enabled:!0,threshold:.4,distance:100}},itemMetadata:t,initialSelectedItemId:"section-1-1"}};var m,c,p;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: sampleMetadata,
    initialSelectedItemId: 'section-1-1'
  }
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var u,h,g;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'compact',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'tight'
      }
    },
    itemMetadata: sampleMetadata
  }
}`,...(g=(h=i.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var w,y,f;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'detailed',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'loose'
      }
    },
    itemMetadata: sampleMetadata
  }
}`,...(f=(y=n.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var M,D,b;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'styleless',
        showDescription: true,
        showMetadataBadges: false
      }
    },
    itemMetadata: sampleMetadata
  }
}`,...(b=(D=s.parameters)==null?void 0:D.docs)==null?void 0:b.source}}};var v,A,S;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'dark',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: sampleMetadata
  }
}`,...(S=(A=r.parameters)==null?void 0:A.docs)==null?void 0:S.source}}};var B,F,x;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      },
      filters: {
        showAgencyFilter: true,
        showDateFilter: true,
        showTypeFilter: true,
        showKeywordFilter: true,
        agencyList: ['Office of Federal Regulations', 'Department of Administration', 'Department of Administrative Affairs']
      }
    },
    itemMetadata: sampleMetadata
  }
}`,...(x=(F=o.parameters)==null?void 0:F.docs)==null?void 0:x.source}}};var T,I,R;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      },
      tooltips: {
        enabled: true,
        showDelay: 300,
        hideDelay: 100,
        maxLength: 300,
        showTypeInfo: true,
        position: 'right'
      }
    },
    itemMetadata: sampleMetadata
  }
}`,...(R=(I=d.parameters)==null?void 0:I.docs)==null?void 0:R.source}}};var L,C,O;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      expandAll: false,
      hideContentOnNavigation: false,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        maxTitleLength: 40,
        showTypeIcon: true,
        showItemNumbers: true,
        indentItems: true,
        hideEmptyItems: false
      },
      filters: {
        showAgencyFilter: true,
        showDateFilter: true,
        showTypeFilter: true,
        showKeywordFilter: true
      },
      tooltips: {
        enabled: true,
        showDelay: 300,
        hideDelay: 100,
        maxLength: 300
      },
      breadcrumb: {
        rootLabel: 'Home',
        truncate: true,
        visibleItems: 3,
        maxVisible: 5,
        type: 'scrollable',
        separatorType: 'icon'
      },
      fuzzySearch: {
        enabled: true,
        threshold: 0.4,
        distance: 100
      }
    },
    itemMetadata: sampleMetadata,
    initialSelectedItemId: 'section-1-1'
  }
}`,...(O=(C=l.parameters)==null?void 0:C.docs)==null?void 0:O.source}}};const j=["StandardMode","CompactMode","DetailedMode","StylelessMode","DarkTheme","WithAdvancedFiltering","WithTooltips","FullConfiguration"];export{i as CompactMode,r as DarkTheme,n as DetailedMode,l as FullConfiguration,a as StandardMode,s as StylelessMode,o as WithAdvancedFiltering,d as WithTooltips,j as __namedExportsOrder,W as default};
