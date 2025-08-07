import{r as P}from"./vue.esm-bundler-BOts1VAj.js";import{M as A}from"./MLayout-D_TTJrE-.js";import{D as $}from"./DynamicFormRenderer-Cb9fD5WO.js";import{M as T}from"./MCard-BMaDLVhA.js";import{M as L}from"./MButton-ClHapibe.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MTextField-OPGGVjaU.js";import"./MSelect-BPYUGOCn.js";import"./MCheckbox-B-c44SKF.js";import"./MSlider-CAxFof3m.js";function M(){const o=new Map,p={creditCard:(t,r="Invalid credit card number")=>{if(!t)return!0;const e=t.replace(/\D/g,"");if(e.length<13||e.length>19)return r;let n=0,a=!1;for(let i=e.length-1;i>=0;i--){let s=parseInt(e[i]);a&&(s*=2,s>9&&(s-=9)),n+=s,a=!a}return n%10===0?!0:r},routingNumber:(t,r="Invalid routing number")=>{if(!t)return!0;const e=t.replace(/\D/g,"");if(e.length!==9)return r;const n=e.split("").map(Number);return(3*(n[0]+n[3]+n[6])+7*(n[1]+n[4]+n[7])+1*(n[2]+n[5]+n[8]))%10===0?!0:r},accountNumber:(t,r="Invalid account number format")=>{if(!t)return!0;const e=t.replace(/\D/g,"");return e.length<4||e.length>17?r:!0},iban:(t,r="Invalid IBAN")=>{if(!t)return!0;const e=t.replace(/\s/g,"").toUpperCase();if(!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(e))return r;const a=(e.slice(4)+e.slice(0,4)).replace(/[A-Z]/g,s=>(s.charCodeAt(0)-55).toString());let i="";for(let s=0;s<a.length;s+=7)i=(i+a.slice(s,s+7))%97;return i===1?!0:r},taxId:(t,r="Invalid Tax ID format")=>{if(!t)return!0;const e=t.replace(/\D/g,"");if(e.length!==9)return r;const n=e.slice(0,2);return["01","02","03","04","05","06","10","11","12","13","14","15","16","20","21","22","23","24","25","26","27","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","71","72","73","74","75","76","77","80","81","82","83","84","85","86","87","88","90","91","92","93","94","95","98","99"].includes(n)?!0:r},incomeRange:(t,r,e)=>n=>{const a=Number(n);return isNaN(a)?"Income must be a valid number":a<t||a>r?e||`Income must be between $${t.toLocaleString()} and $${r.toLocaleString()}`:!0},debtToIncomeRatio:(t,r)=>(e,n)=>{var c,d;const a=Number((c=n.employment)==null?void 0:c.grossMonthlyIncome)||0,i=Number((d=n.financial)==null?void 0:d.monthlyDebtPayments)||0;if(a===0)return"Monthly income is required for debt-to-income calculation";const s=i/a*100;return s>t?r||`Debt-to-income ratio (${s.toFixed(1)}%) exceeds maximum allowed (${t}%)`:!0}},h={ssnAdvanced:(t,r="Invalid Social Security Number")=>{if(!t)return!0;const e=t.replace(/\D/g,"");if(e.length!==9)return r;const n=e.slice(0,3),a=e.slice(3,5),i=e.slice(5,9);return n==="000"||n==="666"||n.startsWith("9")||a==="00"||i==="0000"||["123456789","111111111","222222222","333333333","444444444","555555555","777777777","888888888"].includes(e)?r:!0},driversLicense:(t,r="Invalid driver's license format")=>e=>{if(!e)return!0;const a={CA:/^[A-Z]\d{7}$/,NY:/^\d{3}\s?\d{3}\s?\d{3}$/,TX:/^\d{8}$/,FL:/^[A-Z]\d{12}$/,IL:/^[A-Z]\d{11}$/}[t];if(!a)return!0;const i=e.replace(/\s/g,"").toUpperCase();return a.test(i)?!0:r},passport:(t="US",r="Invalid passport number")=>e=>{if(!e)return!0;const a={US:/^\d{9}$/,CA:/^[A-Z]{2}\d{6}$/,UK:/^\d{9}$/,DE:/^[CFGHJKLMNPRTVWXYZ0-9]{9}$/}[t];if(!a)return!0;const i=e.replace(/\s/g,"").toUpperCase();return a.test(i)?!0:r}},f={duns:(t,r="Invalid DUNS number")=>t&&t.replace(/\D/g,"").length!==9?r:!0,naics:(t,r="Invalid NAICS code")=>{if(!t)return!0;const e=t.replace(/\D/g,"");if(e.length!==6)return r;const n=parseInt(e.slice(0,2));return n>=11&&n<=92?!0:r},businessLicense:(t,r="Invalid business license format")=>t?/^[A-Z0-9]{6,20}$/i.test(t)?!0:r:!0},y={zipPlusFour:(t,r="Invalid ZIP+4 format")=>{if(!t)return!0;const e=t.replace(/\D/g,"");return e.length===5?/^\d{5}$/.test(e)?!0:r:e.length===9&&/^\d{5}\d{4}$/.test(e)?!0:r},postalCodeCA:(t,r="Invalid Canadian postal code")=>{if(!t)return!0;const e=t.replace(/\s/g,"").toUpperCase();return/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(e)?!0:r},postcodeUK:(t,r="Invalid UK postcode")=>{if(!t)return!0;const e=t.replace(/\s/g,"").toUpperCase();return/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(e)?!0:r}},v={age:(t,r,e)=>n=>{if(!n)return!0;const a=new Date(n),i=new Date;if(isNaN(a.getTime()))return"Invalid date format";if(a>i)return"Birth date cannot be in the future";const s=Math.floor((i-a)/(365.25*24*60*60*1e3));return s<t||s>r?e||`Age must be between ${t} and ${r} years`:!0},businessHours:(t,r,e)=>n=>{if(!n)return!0;const a=new Date(`1970-01-01T${n}:00`);if(isNaN(a.getTime()))return"Invalid time format";const i=a.getHours();return i<t||i>=r?e||`Time must be between ${t}:00 and ${r}:00`:!0},dateRange:(t,r,e)=>n=>{if(!n)return!0;const a=new Date(n),i=new Date(t),s=new Date(r);return isNaN(a.getTime())?"Invalid date format":a<i||a>s?e||`Date must be between ${i.toLocaleDateString()} and ${s.toLocaleDateString()}`:!0}},w={emailDomain:(t,r)=>async e=>{if(!e)return!0;const n=`emailDomain_${e}`;if(o.has(n))return o.get(n);const a=e.split("@")[1];if(!a)return"Invalid email format";if(t&&!t.includes(a)){const i=r||`Email domain '${a}' is not allowed`;return o.set(n,i),i}try{if(await new Promise(s=>setTimeout(s,300)),["tempmail.com","10minutemail.com","guerrillamail.com"].some(s=>a.includes(s))){const s="Temporary email addresses are not allowed";return o.set(n,s),s}return o.set(n,!0),!0}catch{return"Unable to verify email domain"}},ssnVerification:(t="SSN verification failed")=>async r=>{if(!r)return!0;const e=`ssnVerification_${r}`;if(o.has(e))return o.get(e);try{await new Promise(i=>setTimeout(i,800));const n=r.replace(/\D/g,"");if(["123456789","987654321"].includes(n)){const i="This SSN is flagged in our system";return o.set(e,i),i}return o.set(e,!0),!0}catch{return"Unable to verify SSN at this time"}},addressVerification:(t="Address verification failed")=>async(r,e)=>{var i,s,c;if(!r)return!0;const a=`addressVerification_${`${r} ${(i=e.address)==null?void 0:i.city} ${(s=e.address)==null?void 0:s.state} ${(c=e.address)==null?void 0:c.zipCode}`}`;if(o.has(a))return o.get(a);try{if(await new Promise(d=>setTimeout(d,1e3)),r.toLowerCase().includes("fake")||r.toLowerCase().includes("test")){const d="Address could not be verified";return o.set(a,d),d}return o.set(a,!0),!0}catch{return"Unable to verify address at this time"}},creditCheck:(t,r)=>async(e,n)=>{var s;const a=(s=n.personal)==null?void 0:s.ssn;if(!a)return"SSN required for credit check";const i=`creditCheck_${a}`;if(o.has(i))return o.get(i);try{await new Promise(l=>setTimeout(l,1500));const c=a.replace(/\D/g,""),u=500+parseInt(c.slice(-1))*35;if(u<t){const l=r||`Credit score (${u}) below minimum requirement (${t})`;return o.set(i,l),l}return o.set(i,!0),!0}catch{return"Unable to perform credit check at this time"}}},S={requiredIf:(t,r,e)=>(n,a)=>m(a,t)===r&&(!n||n==="")?e||`This field is required when ${t} is ${r}`:!0,minValueIf:(t,r,e)=>(n,a)=>{const s=(Number(m(a,t))||0)*r;return(Number(n)||0)<s?e||`Value must be at least ${s.toLocaleString()} (${r}x ${t})`:!0},greaterThan:(t,r)=>(e,n)=>{const a=Number(m(n,t))||0;return(Number(e)||0)<=a?r||`Value must be greater than ${t} (${a})`:!0},dateAfter:(t,r)=>(e,n)=>{if(!e)return!0;const a=m(n,t);if(!a)return!0;const i=new Date(e),s=new Date(a);return isNaN(i.getTime())||isNaN(s.getTime())?"Invalid date format":i<=s?r||`Date must be after ${t}`:!0}},m=(t,r)=>r.split(".").reduce((e,n)=>e==null?void 0:e[n],t);return{financialValidators:p,identityValidators:h,businessValidators:f,addressValidators:y,dateValidators:v,asyncValidators:w,conditionalValidators:S,createValidator:(t,...r)=>{const[e,n]=t.split("."),i={financial:p,identity:h,business:f,address:y,date:v,async:w,conditional:S}[e];if(!i||!i[n])throw new Error(`Unknown validation pattern: ${t}`);const s=i[n];return typeof s=="function"?s(...r):s},validateBatch:async(t,r)=>{const e={},n=[];for(const[i,s]of Object.entries(t)){const c=m(r,i);for(const d of s)if(typeof d=="function"){const u=d(c,r);if(u instanceof Promise)n.push(u.then(l=>({fieldPath:i,result:l})).catch(l=>({fieldPath:i,result:l.message})));else if(u!==!0){e[i]=u;break}}}return(await Promise.all(n)).forEach(({fieldPath:i,result:s})=>{s!==!0&&!e[i]&&(e[i]=s)}),e},clearCache:t=>{if(t)for(const r of o.keys())r.includes(t)&&o.delete(r);else o.clear()},getNestedValue:m}}const O={title:"Validation/Advanced Patterns",parameters:{layout:"fullscreen",docs:{description:{component:"Comprehensive showcase of advanced validation patterns for financial services including credit card validation, SSN verification, business validation, and complex conditional logic."}}}},k={title:"Financial Services Validation",description:"Advanced validation patterns for financial applications",sections:[{id:"payment_info",title:"Payment Information",description:"Credit card and banking validation with real algorithms",layout:"grid",styling:{className:"bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl shadow-lg"},fields:[{id:"payment.cardNumber",label:"Credit Card Number",type:"text",placeholder:"4111 1111 1111 1111",icon:"fas fa-credit-card",required:!0,validation:["required",{type:"custom",validator:"financial.creditCard",message:"Invalid credit card number (Luhn algorithm check)"}],styling:{wrap:!0,extend:!0,wrapperClass:"p-4 bg-white border-l-4 border-green-500 rounded-r-lg shadow-md",extendedClass:"border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200"},helpText:"Enter a valid credit card number (Luhn algorithm validation)"},{id:"payment.routingNumber",label:"Bank Routing Number",type:"text",placeholder:"021000021",icon:"fas fa-university",required:!0,validation:["required",{type:"custom",validator:"financial.routingNumber",message:"Invalid ABA routing number"}],styling:{wrap:!0,wrapperClass:"p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-md"},helpText:"Must be a valid 9-digit ABA routing number"},{id:"payment.accountNumber",label:"Account Number",type:"text",placeholder:"123456789012",icon:"fas fa-hashtag",required:!0,validation:["required",{type:"custom",validator:"financial.accountNumber",message:"Invalid account number format"}],styling:{wrap:!0,wrapperClass:"p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-md"},helpText:"Bank account number (4-17 digits)"},{id:"payment.iban",label:"IBAN (International)",type:"text",placeholder:"GB82 WEST 1234 5698 7654 32",icon:"fas fa-globe",validation:[{type:"custom",validator:"financial.iban",message:"Invalid IBAN format"}],layout:{colSpan:2},styling:{wrap:!0,wrapperClass:"p-4 bg-white border border-purple-200 rounded-lg shadow-sm"},helpText:"International Bank Account Number with mod-97 validation"}]},{id:"identity_verification",title:"Identity Verification",description:"Enhanced identity validation with advanced algorithms",layout:"grid",styling:{className:"bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 rounded-xl shadow-lg"},fields:[{id:"identity.ssn",label:"Social Security Number",type:"password",placeholder:"XXX-XX-XXXX",icon:"fas fa-shield-alt",required:!0,validation:["required",{type:"custom",validator:"identity.ssnAdvanced",message:"Invalid SSN format or blocked number"}],styling:{wrap:!0,extend:!0,wrapperClass:"p-4 bg-white border-l-4 border-red-500 rounded-r-lg shadow-lg",extendedClass:"border-2 border-red-300 focus:border-red-500 focus:ring focus:ring-red-200"},helpText:"Enhanced SSN validation with area number checks"},{id:"identity.driversLicense",label:"Driver's License",type:"text",placeholder:"D1234567 (CA format)",icon:"fas fa-id-card",validation:[{type:"custom",validator:'identity.driversLicense("CA")',message:"Invalid California driver's license format"}],styling:{wrap:!0,wrapperClass:"p-4 bg-white border border-orange-200 rounded-lg shadow-sm"},helpText:"State-specific driver's license validation"},{id:"identity.passport",label:"Passport Number",type:"text",placeholder:"123456789 (US format)",icon:"fas fa-passport",validation:[{type:"custom",validator:'identity.passport("US")',message:"Invalid US passport number format"}],styling:{wrap:!0,wrapperClass:"p-4 bg-white border border-orange-200 rounded-lg shadow-sm"},helpText:"Country-specific passport number validation"}]},{id:"business_validation",title:"Business Information",description:"Business entity validation and verification",layout:"grid",styling:{className:"bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl shadow-lg"},fields:[{id:"business.taxId",label:"Tax ID (EIN)",type:"text",placeholder:"12-3456789",icon:"fas fa-file-invoice-dollar",required:!0,validation:["required",{type:"custom",validator:"financial.taxId",message:"Invalid Tax ID format"}],styling:{wrap:!0,wrapperClass:"p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-md"},helpText:"Employer Identification Number validation"},{id:"business.duns",label:"DUNS Number",type:"text",placeholder:"123456789",icon:"fas fa-building",validation:[{type:"custom",validator:"business.duns",message:"Invalid DUNS number format"}],styling:{wrap:!0,wrapperClass:"p-4 bg-white border border-indigo-200 rounded-lg shadow-sm"},helpText:"Data Universal Numbering System identifier"},{id:"business.naics",label:"NAICS Code",type:"text",placeholder:"541511",icon:"fas fa-industry",validation:[{type:"custom",validator:"business.naics",message:"Invalid NAICS code"}],styling:{wrap:!0,wrapperClass:"p-4 bg-white border border-indigo-200 rounded-lg shadow-sm"},helpText:"North American Industry Classification System code"}]}]},g={render:()=>({components:{MLayout:A,DynamicFormRenderer:$},setup(){const o=P(k),{createValidator:p}=M();return{formSchema:o,createValidator:p,async handleSubmission(h){return await new Promise(f=>setTimeout(f,2e3)),{success:!0,message:"Financial validation completed successfully!",data:{validationId:"FIN-"+Date.now()}}}}},template:`
      <MLayout app-title="Financial Validation Patterns" :drawer="false">
        <DynamicFormRenderer
          :schema="formSchema"
          storage-key="financial_validation_demo"
          :on-submit="handleSubmission"
        />
      </MLayout>
    `}),parameters:{docs:{description:{story:"Comprehensive financial validation patterns including credit card Luhn algorithm, ABA routing number validation, IBAN verification, enhanced SSN checks, and complex business validation rules."}}}},b={render:()=>({components:{MLayout:A,DynamicFormRenderer:$,MCard:T,MButton:L},data(){return{currentPattern:"financial",patterns:{financial:{title:"Financial Validation",description:"Credit cards, banking, and financial calculations",schema:k}}}},computed:{currentSchema(){return this.patterns[this.currentPattern].schema}},template:`
      <MLayout app-title="Validation Pattern Comparison" :drawer="false">
        <div class="space-y-6">
          <MCard title="Validation Pattern Selector" subtitle="Compare different validation approaches">
            <div class="flex flex-wrap gap-3 mb-4">
              <button
                v-for="(pattern, key) in patterns"
                :key="key"
                @click="currentPattern = key"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  currentPattern === key 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                ]"
              >
                {{ pattern.title }}
              </button>
            </div>
            
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="text-lg font-semibold mb-2">{{ patterns[currentPattern].title }}</h3>
              <p class="text-gray-600">{{ patterns[currentPattern].description }}</p>
            </div>
          </MCard>
          
          <DynamicFormRenderer
            :key="currentPattern"
            :schema="currentSchema"
            :storage-key="'validation_comparison_' + currentPattern"
          />
        </div>
      </MLayout>
    `}),parameters:{docs:{description:{story:"Interactive comparison of different validation pattern categories. Switch between financial, conditional, and async validation patterns to see implementation differences."}}}};var N,V,I;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      DynamicFormRenderer
    },
    setup() {
      const formSchema = ref(financialValidationSchema);
      const {
        createValidator
      } = useAdvancedValidation();
      return {
        formSchema,
        createValidator,
        async handleSubmission(formData) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          return {
            success: true,
            message: 'Financial validation completed successfully!',
            data: {
              validationId: 'FIN-' + Date.now()
            }
          };
        }
      };
    },
    template: \`
      <MLayout app-title="Financial Validation Patterns" :drawer="false">
        <DynamicFormRenderer
          :schema="formSchema"
          storage-key="financial_validation_demo"
          :on-submit="handleSubmission"
        />
      </MLayout>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive financial validation patterns including credit card Luhn algorithm, ABA routing number validation, IBAN verification, enhanced SSN checks, and complex business validation rules.'
      }
    }
  }
}`,...(I=(V=g.parameters)==null?void 0:V.docs)==null?void 0:I.source}}};var C,x,D;b.parameters={...b.parameters,docs:{...(C=b.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      DynamicFormRenderer,
      MCard,
      MButton
    },
    data() {
      return {
        currentPattern: 'financial',
        patterns: {
          financial: {
            title: 'Financial Validation',
            description: 'Credit cards, banking, and financial calculations',
            schema: financialValidationSchema
          }
        }
      };
    },
    computed: {
      currentSchema() {
        return this.patterns[this.currentPattern].schema;
      }
    },
    template: \`
      <MLayout app-title="Validation Pattern Comparison" :drawer="false">
        <div class="space-y-6">
          <MCard title="Validation Pattern Selector" subtitle="Compare different validation approaches">
            <div class="flex flex-wrap gap-3 mb-4">
              <button
                v-for="(pattern, key) in patterns"
                :key="key"
                @click="currentPattern = key"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  currentPattern === key 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                ]"
              >
                {{ pattern.title }}
              </button>
            </div>
            
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="text-lg font-semibold mb-2">{{ patterns[currentPattern].title }}</h3>
              <p class="text-gray-600">{{ patterns[currentPattern].description }}</p>
            </div>
          </MCard>
          
          <DynamicFormRenderer
            :key="currentPattern"
            :schema="currentSchema"
            :storage-key="'validation_comparison_' + currentPattern"
          />
        </div>
      </MLayout>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive comparison of different validation pattern categories. Switch between financial, conditional, and async validation patterns to see implementation differences.'
      }
    }
  }
}`,...(D=(x=b.parameters)==null?void 0:x.docs)==null?void 0:D.source}}};const Y=["FinancialValidationDemo","ValidationComparisonDemo"];export{g as FinancialValidationDemo,b as ValidationComparisonDemo,Y as __namedExportsOrder,O as default};
