import{k as n,l as t,p as l,v as i,F as g,x as h,q,J,O as Q,s as b,z as a,u as K}from"./vue.esm-bundler-BOts1VAj.js";import{_ as X}from"./_plugin-vue_export-helper-DlAUqK2U.js";const Z={name:"MFooter",props:{variant:{type:String,default:"default",validator:o=>["default","minimal","dark"].includes(o)},brand:{type:Object,default:()=>({})},linkSections:{type:Array,default:()=>[]},socialLinks:{type:Array,default:()=>[]},legalLinks:{type:Array,default:()=>[]},showNewsletter:{type:Boolean,default:!1},newsletterTitle:{type:String,default:""},newsletterText:{type:String,default:""},copyrightText:{type:String,default:""},additionalInfo:{type:String,default:""},fluid:{type:Boolean,default:!1}},emits:["link-click","newsletter-submit"],data(){return{newsletterEmail:"",newsletterLoading:!1,newsletterMessage:"",newsletterMessageType:""}},computed:{footerClasses(){return[`footer-${this.variant}`,{"footer-fluid":this.fluid}]},containerClasses(){return{"container-fluid":this.fluid,container:!this.fluid}},currentYear(){return new Date().getFullYear()}},methods:{handleLinkClick(o){this.$emit("link-click",o)},async handleNewsletterSubmit(){if(this.newsletterEmail){this.newsletterLoading=!0,this.newsletterMessage="";try{await this.$emit("newsletter-submit",this.newsletterEmail),this.newsletterMessage="Successfully subscribed to newsletter!",this.newsletterMessageType="success",this.newsletterEmail=""}catch{this.newsletterMessage="Failed to subscribe. Please try again.",this.newsletterMessageType="error"}finally{this.newsletterLoading=!1,setTimeout(()=>{this.newsletterMessage=""},5e3)}}},getSocialIcon(o){const s={facebook:"M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.24v-3.32L15.5 1c-2.13 0-3.89 1.81-3.89 4.04v2.42h-2.61v3.36h2.61V20h3.89v-9.18h2.6l.37-3.36z",twitter:"M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z",linkedin:"M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z",instagram:"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",youtube:"M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"};return s[o]||s.facebook}}},$={key:0,class:"footer-main"},ee={class:"footer-grid"},te={class:"footer-section"},ne={class:"footer-brand"},ae=["src","alt"],re={key:1,class:"footer-brand-text"},se={key:0,class:"footer-description"},ie={key:1,class:"footer-social"},le=["href","aria-label"],oe={class:"footer-social-icon",width:"20",height:"20",viewBox:"0 0 20 20",fill:"currentColor"},ce=["d"],de={class:"footer-section-title"},ue={class:"footer-links"},fe=["href","target","rel","onClick"],me={key:0,class:"footer-external-icon",width:"12",height:"12",viewBox:"0 0 12 12"},ge={key:0,class:"footer-section footer-newsletter"},he={class:"footer-section-title"},be={class:"footer-newsletter-text"},pe={class:"footer-newsletter-input-group"},ye=["disabled"],we={class:"footer-bottom-content"},ve={class:"footer-copyright"},ke={class:"footer-copyright-text"},Le={key:0,class:"footer-legal"},_e={class:"footer-legal-list"},Se=["href","onClick"],xe={key:1,class:"footer-additional"},Te={class:"footer-additional-text"};function Ce(o,s,e,Me,f,c){return a(),n("footer",{class:b(["m-footer",c.footerClasses])},[t("div",{class:b(["footer-container",c.containerClasses])},[e.variant!=="minimal"?(a(),n("div",$,[t("div",ee,[t("div",te,[t("div",ne,[e.brand.logo?(a(),n("img",{key:0,src:e.brand.logo,alt:e.brand.alt,class:"footer-logo"},null,8,ae)):l("",!0),e.brand.text?(a(),n("span",re,i(e.brand.text),1)):l("",!0)]),e.brand.description?(a(),n("p",se,i(e.brand.description),1)):l("",!0),e.socialLinks.length>0?(a(),n("div",ie,[(a(!0),n(g,null,h(e.socialLinks,r=>(a(),n("a",{key:r.id,href:r.url,"aria-label":r.label,class:"footer-social-link",target:"_blank",rel:"noopener noreferrer"},[(a(),n("svg",oe,[t("path",{d:c.getSocialIcon(r.platform)},null,8,ce)]))],8,le))),128))])):l("",!0)]),(a(!0),n(g,null,h(e.linkSections,r=>(a(),n("div",{key:r.id,class:"footer-section"},[t("h3",de,i(r.title),1),t("ul",ue,[(a(!0),n(g,null,h(r.links,d=>(a(),n("li",{key:d.id,class:"footer-link-item"},[t("a",{href:d.href||"#",class:"footer-link",target:d.external?"_blank":"_self",rel:d.external?"noopener noreferrer":"",onClick:Ne=>c.handleLinkClick(d)},[K(i(d.label)+" ",1),d.external?(a(),n("svg",me,s[2]||(s[2]=[t("path",{d:"M3.5 3v1h3.293L2 8.793l.707.707L7.5 4.707V8h1V3h-5z",fill:"currentColor"},null,-1)]))):l("",!0)],8,fe)]))),128))])]))),128)),e.showNewsletter?(a(),n("div",ge,[t("h3",he,i(e.newsletterTitle||"Stay Updated"),1),t("p",be,i(e.newsletterText||"Get the latest updates and financial insights."),1),t("form",{onSubmit:s[1]||(s[1]=q((...r)=>c.handleNewsletterSubmit&&c.handleNewsletterSubmit(...r),["prevent"])),class:"footer-newsletter-form"},[t("div",pe,[J(t("input",{"onUpdate:modelValue":s[0]||(s[0]=r=>f.newsletterEmail=r),type:"email",placeholder:"Enter your email",required:"",class:"footer-newsletter-input"},null,512),[[Q,f.newsletterEmail]]),t("button",{type:"submit",disabled:f.newsletterLoading,class:"footer-newsletter-button"},i(f.newsletterLoading?"Subscribing...":"Subscribe"),9,ye)]),f.newsletterMessage?(a(),n("p",{key:0,class:b(["footer-newsletter-message",f.newsletterMessageType])},i(f.newsletterMessage),3)):l("",!0)],32)])):l("",!0)])])):l("",!0),t("div",{class:b(["footer-bottom",{"footer-bottom-only":e.variant==="minimal"}])},[t("div",we,[t("div",ve,[t("p",ke,i(e.copyrightText||`© ${c.currentYear} Financial Services. All rights reserved.`),1)]),e.legalLinks.length>0?(a(),n("div",Le,[t("ul",_e,[(a(!0),n(g,null,h(e.legalLinks,r=>(a(),n("li",{key:r.id,class:"footer-legal-item"},[t("a",{href:r.href||"#",class:"footer-legal-link",onClick:d=>c.handleLinkClick(r)},i(r.label),9,Se)]))),128))])])):l("",!0),e.additionalInfo?(a(),n("div",xe,[t("p",Te,i(e.additionalInfo),1)])):l("",!0)])],2)],2)],2)}const j=X(Z,[["render",Ce],["__scopeId","data-v-29ca4ae7"]]);Z.__docgenInfo={displayName:"MFooter",exportName:"default",description:"",tags:{},props:[{name:"variant",type:{name:"string"},defaultValue:{func:!1,value:"'default'"},values:["default","minimal","dark"]},{name:"brand",type:{name:"object"},defaultValue:{func:!1,value:"{}"}},{name:"linkSections",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"socialLinks",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"legalLinks",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"showNewsletter",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"newsletterTitle",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"newsletterText",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"copyrightText",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"additionalInfo",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"fluid",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"link-click",type:{names:["undefined"]}},{name:"newsletter-submit",type:{names:["undefined"]}}],sourceFiles:["C:/Users/bradl/OneDrive/Documents/GitHub/bmc-navigator-component/src/components/layout/MFooter.vue"]};const De={title:"Layout/Structure/Footer",component:j,parameters:{layout:"fullscreen",docs:{description:{component:"A comprehensive footer component with brand section, link groups, social media links, newsletter signup, and legal information."}}},argTypes:{variant:{control:{type:"select"},options:["default","minimal","dark"]},fluid:{control:{type:"boolean"}},showNewsletter:{control:{type:"boolean"}}}},O={text:"Your Town Finance",logo:"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM2ODNmNiIvPgo8cGF0aCBkPSJNOCAyMEwxNiAxMkwyNCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",description:"Providing trusted financial solutions since 1927. We help people achieve their financial goals with competitive rates and personalized service."},Fe=[{id:"products",title:"Products",links:[{id:"personal-loans",label:"Personal Loans",href:"#personal-loans"},{id:"auto-loans",label:"Auto Loans",href:"#auto-loans"},{id:"home-loans",label:"Home Loans",href:"#home-loans"},{id:"credit-cards",label:"Credit Cards",href:"#credit-cards"}]},{id:"support",title:"Customer Support",links:[{id:"contact",label:"Contact Us",href:"#contact"},{id:"faq",label:"FAQ",href:"#faq"},{id:"payment-center",label:"Payment Center",href:"#payment-center"},{id:"calculators",label:"Loan Calculators",href:"#calculators"}]},{id:"company",title:"Company",links:[{id:"about",label:"About Us",href:"#about"},{id:"careers",label:"Careers",href:"#careers"},{id:"locations",label:"Branch Locations",href:"#locations"},{id:"news",label:"News & Updates",href:"#news"}]}],U=[{id:"facebook",platform:"facebook",url:"https://facebook.com/yourtownfinance",label:"Facebook"},{id:"twitter",platform:"twitter",url:"https://twitter.com/yourtownfinance",label:"Twitter"},{id:"linkedin",platform:"linkedin",url:"https://linkedin.com/company/yourtownfinance",label:"LinkedIn"},{id:"instagram",platform:"instagram",url:"https://instagram.com/yourtownfinance",label:"Instagram"}],W=[{id:"privacy",label:"Privacy Policy",href:"#privacy"},{id:"terms",label:"Terms of Service",href:"#terms"},{id:"accessibility",label:"Accessibility",href:"#accessibility"},{id:"licensing",label:"State Licensing",href:"#licensing"}],u={args:{brand:O,linkSections:Fe,socialLinks:U,legalLinks:W,variant:"default",fluid:!1,showNewsletter:!0,newsletterTitle:"Stay Updated",newsletterText:"Get the latest financial insights and loan offers delivered to your inbox.",copyrightText:"© 2024 Your Town Finance. All rights reserved. NMLS #1417840",additionalInfo:"Licensed by the Department of Financial Protection and Innovation under the California Financing Law."}},p={args:{...u.args,variant:"dark"},parameters:{backgrounds:{default:"dark"}}},y={args:{variant:"minimal",legalLinks:[{id:"privacy",label:"Privacy Policy",href:"#privacy"},{id:"terms",label:"Terms of Service",href:"#terms"}],copyrightText:"© 2024 Your Town Finance. All rights reserved.",fluid:!1,showNewsletter:!1}},w={args:{...u.args,showNewsletter:!1}},v={args:{...u.args,fluid:!0}},k={args:{brand:{...O,description:"Building financial futures together. Trusted by over 500,000 customers nationwide."},linkSections:[{id:"about",title:"About Your Town Finance",links:[{id:"our-story",label:"Our Story",href:"#our-story"},{id:"leadership",label:"Leadership Team",href:"#leadership"},{id:"awards",label:"Awards & Recognition",href:"#awards"},{id:"community",label:"Community Impact",href:"#community"}]},{id:"resources",title:"Financial Resources",links:[{id:"education",label:"Financial Education",href:"#education"},{id:"blog",label:"Blog & Tips",href:"#blog"},{id:"guides",label:"Buying Guides",href:"#guides"},{id:"tools",label:"Financial Tools",href:"#tools"}]},{id:"legal",title:"Legal & Compliance",links:[{id:"disclosures",label:"Important Disclosures",href:"#disclosures"},{id:"rates",label:"Rate Information",href:"#rates"},{id:"complaints",label:"File a Complaint",href:"#complaints"},{id:"regulatory",label:"Regulatory Information",href:"#regulatory"}]}],socialLinks:U,legalLinks:[...W,{id:"sitemap",label:"Sitemap",href:"#sitemap"},{id:"security",label:"Security Center",href:"#security"}],variant:"default",showNewsletter:!0,newsletterTitle:"Financial Insights Newsletter",newsletterText:"Expert advice, market trends, and exclusive offers for our valued customers.",copyrightText:"© 2024 Your Town Finance LLC. All rights reserved. NMLS #1417840",additionalInfo:"Equal Housing Lender. Licensed by state banking departments and regulatory agencies."}},Ie=o=>({components:{MFooter:j},setup(){return{args:o}},template:`
    <div>
      <!-- Page content to show footer in context -->
      <div style="min-height: 60vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; color: white;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">Your Financial Future Starts Here</h1>
          <p style="font-size: 1.25rem; margin-bottom: 2rem;">Discover competitive rates and personalized service</p>
          <button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; cursor: pointer;">
            Apply for a Loan Today
          </button>
        </div>
      </div>
      
      <!-- Footer -->
      <MFooter 
        v-bind="args" 
        @link-click="onLinkClick"
        @newsletter-submit="onNewsletterSubmit"
      />
    </div>
  `,methods:{onLinkClick(s){console.log("Footer link clicked:",s)},async onNewsletterSubmit(s){console.log("Newsletter subscription:",s),await new Promise(e=>setTimeout(e,1e3)),alert(`Successfully subscribed ${s} to newsletter!`)}}}),m=Ie.bind({});m.args=u.args;var L,_,S;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    brand: defaultBrand,
    linkSections: linkSections,
    socialLinks: socialLinks,
    legalLinks: legalLinks,
    variant: 'default',
    fluid: false,
    showNewsletter: true,
    newsletterTitle: 'Stay Updated',
    newsletterText: 'Get the latest financial insights and loan offers delivered to your inbox.',
    copyrightText: '© 2024 Your Town Finance. All rights reserved. NMLS #1417840',
    additionalInfo: 'Licensed by the Department of Financial Protection and Innovation under the California Financing Law.'
  }
}`,...(S=(_=u.parameters)==null?void 0:_.docs)==null?void 0:S.source}}};var x,T,C;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    variant: 'dark'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}`,...(C=(T=p.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var F,I,M;y.parameters={...y.parameters,docs:{...(F=y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    variant: 'minimal',
    legalLinks: [{
      id: 'privacy',
      label: 'Privacy Policy',
      href: '#privacy'
    }, {
      id: 'terms',
      label: 'Terms of Service',
      href: '#terms'
    }],
    copyrightText: '© 2024 Your Town Finance. All rights reserved.',
    fluid: false,
    showNewsletter: false
  }
}`,...(M=(I=y.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var N,z,A;w.parameters={...w.parameters,docs:{...(N=w.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showNewsletter: false
  }
}`,...(A=(z=w.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var D,P,B;v.parameters={...v.parameters,docs:{...(D=v.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    fluid: true
  }
}`,...(B=(P=v.parameters)==null?void 0:P.docs)==null?void 0:B.source}}};var H,V,E;k.parameters={...k.parameters,docs:{...(H=k.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    brand: {
      ...defaultBrand,
      description: 'Building financial futures together. Trusted by over 500,000 customers nationwide.'
    },
    linkSections: [{
      id: 'about',
      title: 'About Your Town Finance',
      links: [{
        id: 'our-story',
        label: 'Our Story',
        href: '#our-story'
      }, {
        id: 'leadership',
        label: 'Leadership Team',
        href: '#leadership'
      }, {
        id: 'awards',
        label: 'Awards & Recognition',
        href: '#awards'
      }, {
        id: 'community',
        label: 'Community Impact',
        href: '#community'
      }]
    }, {
      id: 'resources',
      title: 'Financial Resources',
      links: [{
        id: 'education',
        label: 'Financial Education',
        href: '#education'
      }, {
        id: 'blog',
        label: 'Blog & Tips',
        href: '#blog'
      }, {
        id: 'guides',
        label: 'Buying Guides',
        href: '#guides'
      }, {
        id: 'tools',
        label: 'Financial Tools',
        href: '#tools'
      }]
    }, {
      id: 'legal',
      title: 'Legal & Compliance',
      links: [{
        id: 'disclosures',
        label: 'Important Disclosures',
        href: '#disclosures'
      }, {
        id: 'rates',
        label: 'Rate Information',
        href: '#rates'
      }, {
        id: 'complaints',
        label: 'File a Complaint',
        href: '#complaints'
      }, {
        id: 'regulatory',
        label: 'Regulatory Information',
        href: '#regulatory'
      }]
    }],
    socialLinks: socialLinks,
    legalLinks: [...legalLinks, {
      id: 'sitemap',
      label: 'Sitemap',
      href: '#sitemap'
    }, {
      id: 'security',
      label: 'Security Center',
      href: '#security'
    }],
    variant: 'default',
    showNewsletter: true,
    newsletterTitle: 'Financial Insights Newsletter',
    newsletterText: 'Expert advice, market trends, and exclusive offers for our valued customers.',
    copyrightText: '© 2024 Your Town Finance LLC. All rights reserved. NMLS #1417840',
    additionalInfo: 'Equal Housing Lender. Licensed by state banking departments and regulatory agencies.'
  }
}`,...(E=(V=k.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var Y,G,R;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`args => ({
  components: {
    MFooter
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div>
      <!-- Page content to show footer in context -->
      <div style="min-height: 60vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; display: flex; align-items: center; justify-content: center;">
        <div style="text-align: center; color: white;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem;">Your Financial Future Starts Here</h1>
          <p style="font-size: 1.25rem; margin-bottom: 2rem;">Discover competitive rates and personalized service</p>
          <button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; cursor: pointer;">
            Apply for a Loan Today
          </button>
        </div>
      </div>
      
      <!-- Footer -->
      <MFooter 
        v-bind="args" 
        @link-click="onLinkClick"
        @newsletter-submit="onNewsletterSubmit"
      />
    </div>
  \`,
  methods: {
    onLinkClick(link) {
      console.log('Footer link clicked:', link);
    },
    async onNewsletterSubmit(email) {
      console.log('Newsletter subscription:', email);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert(\`Successfully subscribed \${email} to newsletter!\`);
    }
  }
})`,...(R=(G=m.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};const Pe=["Default","Dark","Minimal","WithoutNewsletter","Fluid","CompanyFocus","Interactive"];export{k as CompanyFocus,p as Dark,u as Default,v as Fluid,m as Interactive,y as Minimal,w as WithoutNewsletter,Pe as __namedExportsOrder,De as default};
