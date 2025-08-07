import{j as n,M as l}from"./index-BKmdEwFY.js";import{useMDXComponents as s}from"./index-CsaDCHfb.js";import"./iframe-pXRg1mF0.js";import"./index-Bx-go_-4.js";import"./index-DrFu-skq.js";function r(i){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return n.jsxs(n.Fragment,{children:[n.jsx(l,{title:"Design System/Accessibility"}),`
`,n.jsx(e.h1,{id:"accessibility-standards",children:"Accessibility Standards"}),`
`,n.jsx(e.p,{children:"The Your Town Finance component library is built with accessibility as a core principle. All components meet WCAG 2.1 AA standards to ensure inclusive experiences for users with disabilities in financial applications."}),`
`,n.jsx(e.h2,{id:"accessibility-features",children:"Accessibility Features"}),`
`,n.jsx(e.h3,{id:"color-and-contrast",children:"Color and Contrast"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"4.5:1 contrast ratio"})," for normal text against backgrounds"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"3:1 contrast ratio"})," for large text (18pt+ or 14pt+ bold)"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"3:1 contrast ratio"})," for UI components and graphical elements"]}),`
`,n.jsx(e.li,{children:"Color is never the only means of conveying information"}),`
`]}),`
`,n.jsx(e.h3,{id:"keyboard-navigation",children:"Keyboard Navigation"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"All interactive elements are keyboard accessible"}),`
`,n.jsx(e.li,{children:"Logical tab order follows visual layout"}),`
`,n.jsx(e.li,{children:"Focus indicators are clearly visible"}),`
`,n.jsx(e.li,{children:"Escape key closes modals and overlays"}),`
`,n.jsx(e.li,{children:"Arrow keys navigate through related elements"}),`
`]}),`
`,n.jsx(e.h3,{id:"screen-reader-support",children:"Screen Reader Support"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Semantic HTML elements used throughout"}),`
`,n.jsx(e.li,{children:"ARIA labels and descriptions for complex components"}),`
`,n.jsx(e.li,{children:"Live regions announce dynamic content changes"}),`
`,n.jsx(e.li,{children:"Form labels properly associated with inputs"}),`
`,n.jsx(e.li,{children:"Error messages announced to assistive technology"}),`
`]}),`
`,n.jsx(e.h3,{id:"focus-management",children:"Focus Management"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Focus trap in modal dialogs"}),`
`,n.jsx(e.li,{children:"Focus restoration when closing overlays"}),`
`,n.jsx(e.li,{children:"Skip links for main content navigation"}),`
`,n.jsx(e.li,{children:"Clear focus indicators with sufficient contrast"}),`
`]}),`
`,n.jsx(e.h2,{id:"component-accessibility",children:"Component Accessibility"}),`
`,n.jsx(e.h3,{id:"buttons",children:"Buttons"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Accessible button with proper labeling -->\r
<button \r
  type="button"\r
  aria-label="Apply for personal loan"\r
  aria-describedby="loan-help-text"\r
>\r
  Apply Now\r
</button>
`})}),`
`,n.jsx(e.h3,{id:"form-controls",children:"Form Controls"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Accessible form field with validation -->\r
<label for="loan-amount">\r
  Loan Amount *\r
  <span class="sr-only">(Required field)</span>\r
</label>\r
<input \r
  id="loan-amount"\r
  type="number"\r
  aria-required="true"\r
  aria-invalid="false"\r
  aria-describedby="amount-help amount-error"\r
/>\r
<div id="amount-help">Enter amount between $1,000 - $100,000</div>\r
<div id="amount-error" role="alert" aria-live="polite"></div>
`})}),`
`,n.jsx(e.h3,{id:"tooltips-and-help",children:"Tooltips and Help"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Accessible tooltip trigger -->\r
<button \r
  type="button"\r
  aria-label="Get help about APR"\r
  aria-expanded="false"\r
  aria-describedby="apr-tooltip"\r
  data-tooltip-trigger\r
>\r
  <i class="fas fa-question-circle" aria-hidden="true"></i>\r
</button>\r
<div \r
  id="apr-tooltip" \r
  role="tooltip"\r
  aria-hidden="true"\r
>\r
  APR includes both interest rate and fees\r
</div>
`})}),`
`,n.jsx(e.h3,{id:"modal-dialogs",children:"Modal Dialogs"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Accessible modal dialog -->\r
<div \r
  role="dialog"\r
  aria-modal="true"\r
  aria-labelledby="dialog-title"\r
  aria-describedby="dialog-content"\r
>\r
  <h2 id="dialog-title">Loan Application Confirmation</h2>\r
  <div id="dialog-content">\r
    Please review your loan details before submitting.\r
  </div>\r
</div>
`})}),`
`,n.jsx(e.h2,{id:"financial-application-context",children:"Financial Application Context"}),`
`,n.jsx(e.h3,{id:"loan-status-indicators",children:"Loan Status Indicators"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Status changes announced to screen readers"}),`
`,n.jsx(e.li,{children:"Visual and text indicators for approval/rejection"}),`
`,n.jsx(e.li,{children:"Clear error messages for failed applications"}),`
`]}),`
`,n.jsx(e.h3,{id:"financial-data-tables",children:"Financial Data Tables"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Sortable columns with keyboard navigation"}),`
`,n.jsx(e.li,{children:"Row and column headers properly associated"}),`
`,n.jsx(e.li,{children:"Summary information for complex financial data"}),`
`]}),`
`,n.jsx(e.h3,{id:"progress-indicators",children:"Progress Indicators"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Current step announced to screen readers"}),`
`,n.jsx(e.li,{children:"Progress percentage available to assistive technology"}),`
`,n.jsx(e.li,{children:"Clear navigation between application steps"}),`
`]}),`
`,n.jsx(e.h2,{id:"testing-guidelines",children:"Testing Guidelines"}),`
`,n.jsx(e.h3,{id:"automated-testing",children:"Automated Testing"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Use axe-core for automated accessibility scanning"}),`
`,n.jsx(e.li,{children:"Lighthouse accessibility audits in CI/CD pipeline"}),`
`,n.jsx(e.li,{children:"ESLint accessibility rules enforced"}),`
`]}),`
`,n.jsx(e.h3,{id:"manual-testing",children:"Manual Testing"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Keyboard-only navigation testing"}),`
`,n.jsx(e.li,{children:"Screen reader testing with NVDA/JAWS/VoiceOver"}),`
`,n.jsx(e.li,{children:"High contrast mode compatibility"}),`
`,n.jsx(e.li,{children:"Zoom testing up to 200% magnification"}),`
`]}),`
`,n.jsx(e.h3,{id:"browser-compatibility",children:"Browser Compatibility"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"Modern browsers with assistive technology support"}),`
`,n.jsx(e.li,{children:"Mobile screen reader compatibility"}),`
`,n.jsx(e.li,{children:"Voice control software compatibility"}),`
`]}),`
`,n.jsx(e.h2,{id:"implementation-standards",children:"Implementation Standards"}),`
`,n.jsx(e.h3,{id:"html-semantics",children:"HTML Semantics"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Use semantic HTML structure -->\r
<main>\r
  <header>\r
    <h1>Personal Loan Application</h1>\r
  </header>\r
  \r
  <section aria-labelledby="personal-info">\r
    <h2 id="personal-info">Personal Information</h2>\r
    <form>\r
      <!-- Form content -->\r
    </form>\r
  </section>\r
  \r
  <aside aria-label="Financial education resources">\r
    <!-- Help content -->\r
  </aside>\r
</main>
`})}),`
`,n.jsx(e.h3,{id:"error-handling",children:"Error Handling"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Accessible error messaging -->\r
<div role="alert" aria-live="assertive">\r
  <h3>Application Error</h3>\r
  <p>Please correct the following errors:</p>\r
  <ul>\r
    <li><a href="#email-field">Email address is required</a></li>\r
    <li><a href="#income-field">Annual income must be a positive number</a></li>\r
  </ul>\r
</div>
`})}),`
`,n.jsx(e.h3,{id:"loading-states",children:"Loading States"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<!-- Accessible loading indicator -->\r
<div \r
  role="status" \r
  aria-live="polite" \r
  aria-label="Processing your application"\r
>\r
  <div aria-hidden="true">\r
    <!-- Visual spinner -->\r
  </div>\r
  <span class="sr-only">Processing your application, please wait...</span>\r
</div>
`})}),`
`,n.jsx(e.h2,{id:"screen-reader-classes",children:"Screen Reader Classes"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`/* Screen reader only content */\r
.sr-only {\r
  position: absolute;\r
  width: 1px;\r
  height: 1px;\r
  padding: 0;\r
  margin: -1px;\r
  overflow: hidden;\r
  clip: rect(0, 0, 0, 0);\r
  white-space: nowrap;\r
  border: 0;\r
}\r
\r
/* Focus visible improvements */\r
.focus-visible {\r
  outline: 2px solid rgb(56, 96, 190);\r
  outline-offset: 2px;\r
}
`})}),`
`,n.jsx(e.h2,{id:"compliance-checklist",children:"Compliance Checklist"}),`
`,n.jsx(e.h3,{id:"wcag-21-aa-requirements",children:"WCAG 2.1 AA Requirements"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"[ ] Perceivable: Content is presentable without loss of meaning"}),`
`,n.jsx(e.li,{children:"[ ] Operable: Interface components are operable by all users"}),`
`,n.jsx(e.li,{children:"[ ] Understandable: Information and UI operation is understandable"}),`
`,n.jsx(e.li,{children:"[ ] Robust: Content can be interpreted by assistive technologies"}),`
`]}),`
`,n.jsx(e.h3,{id:"financial-services-considerations",children:"Financial Services Considerations"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"[ ] Multi-language support for diverse customer base"}),`
`,n.jsx(e.li,{children:"[ ] Clear error recovery for financial transactions"}),`
`,n.jsx(e.li,{children:"[ ] Timeout warnings for secure sessions"}),`
`,n.jsx(e.li,{children:"[ ] Alternative formats for financial documents"}),`
`]}),`
`,n.jsx(e.h3,{id:"legal-compliance",children:"Legal Compliance"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"[ ] Section 508 compliance for government accessibility"}),`
`,n.jsx(e.li,{children:"[ ] ADA compliance for business accessibility"}),`
`,n.jsx(e.li,{children:"[ ] State accessibility laws compliance"}),`
`]}),`
`,n.jsx(e.h2,{id:"resources",children:"Resources"}),`
`,n.jsx(e.h3,{id:"testing-tools",children:"Testing Tools"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"axe DevTools"})," - Browser extension for accessibility testing"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"WAVE"})," - Web accessibility evaluation tool"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Lighthouse"})," - Automated accessibility auditing"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"Color Contrast Analyzers"})," - Ensure sufficient contrast ratios"]}),`
`]}),`
`,n.jsx(e.h3,{id:"assistive-technology",children:"Assistive Technology"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"NVDA"})," - Free Windows screen reader"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"JAWS"})," - Popular Windows screen reader"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"VoiceOver"})," - Built-in macOS/iOS screen reader"]}),`
`,n.jsxs(e.li,{children:[n.jsx(e.strong,{children:"TalkBack"})," - Built-in Android screen reader"]}),`
`]}),`
`,n.jsx(e.p,{children:"The accessibility standards ensure that Your Town Finance's digital experiences are inclusive and compliant with legal requirements while providing excellent usability for all customers."})]})}function h(i={}){const{wrapper:e}={...s(),...i.components};return e?n.jsx(e,{...i,children:n.jsx(r,{...i})}):r(i)}export{h as default};
