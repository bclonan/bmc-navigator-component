import{k as v,l,v as y,y as ue,F as me,x as ce,B as pe,p as E,u as F,z as f,s as D,N as u,D as R,Q as M,r as C,c as b,w as ve}from"./vue.esm-bundler-BOts1VAj.js";import{M as fe}from"./MLayout-D_TTJrE-.js";import{M as _}from"./MCard-BMaDLVhA.js";import{M as ge}from"./MButton-ClHapibe.js";import{M as z}from"./MTextField-OPGGVjaU.js";import{M as j}from"./MSelect-BPYUGOCn.js";import{M as be}from"./MCheckbox-B-c44SKF.js";import{M as Y}from"./MSlider-CAxFof3m.js";import{M as ye}from"./MProgress-Dbt3URTC.js";import{_ as H}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{u as he}from"./useFormValidation-FIwfB6Hc.js";const W={name:"LoanFlowStepper",props:{steps:{type:Array,required:!0},currentStep:{type:Number,default:0},completedSteps:{type:Set,default:()=>new Set},stepErrors:{type:Set,default:()=>new Set},progressPercentage:{type:Number,default:0},applicationId:{type:String,default:""},isValidating:{type:Boolean,default:!1},isSubmitting:{type:Boolean,default:!1},isSaving:{type:Boolean,default:!1},lastSaved:{type:Date,default:null},canSubmit:{type:Boolean,default:!1}},emits:["navigate-to-step","next-step","previous-step","save-draft","submit-application"],computed:{currentStepInfo(){return this.steps[this.currentStep]},isFirstStep(){return this.currentStep===0},isLastStep(){return this.currentStep===this.steps.length-1}},methods:{getStepClasses(o){const e=o===this.currentStep,t=this.completedSteps.has(o),c=this.stepErrors.has(o),g=this.canNavigateToStep(o);return{"bg-blue-600 border-blue-600 text-white":e&&!c,"bg-green-600 border-green-600 text-white":t&&!c,"bg-red-600 border-red-600 text-white":c,"bg-gray-100 border-gray-300 text-gray-400":!e&&!t&&!c&&!g,"bg-white border-gray-300 text-gray-600":!e&&!t&&!c&&g,"hover:bg-gray-50":g&&!e&&!t&&!c,"cursor-pointer":g,"cursor-not-allowed":!g}},getStepTextClasses(o){const e=o===this.currentStep,t=this.completedSteps.has(o),c=this.stepErrors.has(o);return{"text-blue-600 font-semibold":e&&!c,"text-green-600 font-semibold":t&&!c,"text-red-600 font-semibold":c,"text-gray-900":!e&&!t&&!c,"text-gray-400":!this.canNavigateToStep(o)}},canNavigateToStep(o){return o===0?!0:this.completedSteps.has(o-1)||this.completedSteps.has(o)},navigateToStep(o){this.canNavigateToStep(o)&&this.$emit("navigate-to-step",o)},nextStep(){this.$emit("next-step")},previousStep(){this.$emit("previous-step")},saveDraft(){this.$emit("save-draft")},submitApplication(){this.$emit("submit-application")},formatTimeAgo(o){if(!o)return"";const t=Math.floor((new Date-o)/1e3);return t<60?"just now":t<3600?`${Math.floor(t/60)}m ago`:t<86400?`${Math.floor(t/3600)}h ago`:`${Math.floor(t/86400)}d ago`}}},xe={class:"loan-flow-stepper"},Se={class:"stepper-header bg-white shadow-sm border-b"},we={class:"max-w-6xl mx-auto px-4 py-4"},Fe={class:"flex items-center justify-between mb-4"},De={class:"text-gray-600"},Me={class:"text-right"},Ce={class:"text-2xl font-bold text-blue-600"},Ie={class:"w-full bg-gray-200 rounded-full h-2 mb-6"},Ee={class:"flex items-center justify-between relative"},Ve=["onClick"],Te={key:0,class:"fas fa-check text-white text-sm"},Pe={key:1,class:"fas fa-exclamation text-white text-sm"},Ae={class:"ml-3 min-w-0 flex-1"},ke={class:"text-xs text-gray-500 truncate"},Ne={class:"stepper-content bg-gray-50 min-h-screen"},qe={class:"max-w-4xl mx-auto px-4 py-8"},Le={class:"stepper-footer bg-white border-t shadow-lg sticky bottom-0"},Re={class:"max-w-4xl mx-auto px-4 py-4"},Be={class:"flex items-center justify-between"},Oe={class:"flex items-center space-x-4"},Ue={key:1,class:"flex items-center text-sm text-gray-500"},_e={class:"flex items-center space-x-4"},ze=["disabled"],je=["disabled"],Ye=["disabled"],He={key:0,class:"fas fa-spinner fa-spin mr-2"},We={key:1,class:"fas fa-paper-plane mr-2"};function Xe(o,e,t,c,g,s){return f(),v("div",xe,[l("div",Se,[l("div",we,[l("div",Fe,[l("div",null,[e[4]||(e[4]=l("h1",{class:"text-2xl font-bold text-gray-900"},"Loan Application",-1)),l("p",De,"Application ID: "+y(t.applicationId),1)]),l("div",Me,[e[5]||(e[5]=l("div",{class:"text-sm text-gray-600"},"Progress",-1)),l("div",Ce,y(t.progressPercentage)+"%",1)])]),l("div",Ie,[l("div",{class:"bg-blue-600 h-2 rounded-full transition-all duration-300",style:ue({width:t.progressPercentage+"%"})},null,4)]),l("div",Ee,[(f(!0),v(me,null,ce(t.steps,(i,p)=>(f(),v("div",{key:i.id,class:D(["flex items-center",{"flex-1":p<t.steps.length-1}])},[l("div",{class:D(["relative flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all",s.getStepClasses(p)]),onClick:S=>s.navigateToStep(p)},[t.completedSteps.has(p)?(f(),v("i",Te)):t.stepErrors.has(p)?(f(),v("i",Pe)):(f(),v("i",{key:2,class:D([i.icon,"text-sm"])},null,2))],10,Ve),l("div",Ae,[l("div",{class:D(["text-sm font-medium truncate",s.getStepTextClasses(p)])},y(i.title),3),l("div",ke,y(i.description),1)]),p<t.steps.length-1?(f(),v("div",{key:0,class:D(["flex-1 h-0.5 mx-4",t.completedSteps.has(p)?"bg-blue-600":"bg-gray-300"])},null,2)):E("",!0)],2))),128))])])]),l("div",Ne,[l("div",qe,[pe(o.$slots,"default",{currentStep:s.currentStepInfo,stepIndex:t.currentStep},void 0,!0)])]),l("div",Le,[l("div",Re,[l("div",Be,[l("div",Oe,[s.isFirstStep?E("",!0):(f(),v("button",{key:0,onClick:e[0]||(e[0]=(...i)=>s.previousStep&&s.previousStep(...i)),class:"px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"},e[6]||(e[6]=[l("i",{class:"fas fa-arrow-left mr-2"},null,-1),F(" Previous ")]))),t.lastSaved?(f(),v("div",Ue,[e[7]||(e[7]=l("i",{class:"fas fa-check-circle mr-1 text-green-500"},null,-1)),F(" Saved "+y(s.formatTimeAgo(t.lastSaved)),1)])):E("",!0)]),l("div",_e,[l("button",{onClick:e[1]||(e[1]=(...i)=>s.saveDraft&&s.saveDraft(...i)),disabled:t.isSaving,class:"px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"},[e[8]||(e[8]=l("i",{class:"fas fa-save mr-2"},null,-1)),F(" "+y(t.isSaving?"Saving...":"Save Draft"),1)],8,ze),s.isLastStep?(f(),v("button",{key:1,onClick:e[3]||(e[3]=(...i)=>s.submitApplication&&s.submitApplication(...i)),disabled:t.isSubmitting||!t.canSubmit,class:"px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"},[t.isSubmitting?(f(),v("i",He)):(f(),v("i",We)),F(" "+y(t.isSubmitting?"Submitting...":"Submit Application"),1)],8,Ye)):(f(),v("button",{key:0,onClick:e[2]||(e[2]=(...i)=>s.nextStep&&s.nextStep(...i)),disabled:t.isValidating,class:"px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"},[F(y(t.isValidating?"Validating...":"Continue")+" ",1),e[9]||(e[9]=l("i",{class:"fas fa-arrow-right ml-2"},null,-1))],8,je))])])])])])}const Je=H(W,[["render",Xe],["__scopeId","data-v-6e8a212e"]]);W.__docgenInfo={displayName:"LoanFlowStepper",exportName:"default",description:"",tags:{},props:[{name:"steps",type:{name:"array"},required:!0},{name:"currentStep",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"completedSteps",type:{name:"Set"},defaultValue:{func:!0,value:"() => new Set()"}},{name:"stepErrors",type:{name:"Set"},defaultValue:{func:!0,value:"() => new Set()"}},{name:"progressPercentage",type:{name:"number"},defaultValue:{func:!1,value:"0"}},{name:"applicationId",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"isValidating",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isSubmitting",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"isSaving",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"lastSaved",type:{name:"date"},defaultValue:{func:!1,value:"null"}},{name:"canSubmit",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"navigate-to-step",type:{names:["undefined"]}},{name:"next-step"},{name:"previous-step"},{name:"save-draft"},{name:"submit-application"}],slots:[{name:"default",scoped:!0,bindings:[{name:"current-step",title:"binding"},{name:"step-index",title:"binding"}]}],sourceFiles:["C:/Users/bradl/OneDrive/Documents/GitHub/bmc-navigator-component/src/components/loan/LoanFlowStepper.vue"]};const X={name:"PersonalInformationStep",components:{MCard:_,MTextField:z,MSelect:j,MSlider:Y},props:{formData:{type:Object,required:!0},updateField:{type:Function,required:!0},touchField:{type:Function,required:!0},getFieldError:{type:Function,required:!0}},data(){return{suffixOptions:[{value:"jr",text:"Jr."},{value:"sr",text:"Sr."},{value:"ii",text:"II"},{value:"iii",text:"III"},{value:"iv",text:"IV"}],maritalStatusOptions:[{value:"single",text:"Single"},{value:"married",text:"Married"},{value:"divorced",text:"Divorced"},{value:"widowed",text:"Widowed"},{value:"separated",text:"Separated"}],residencyTypeOptions:[{value:"own",text:"Own"},{value:"rent",text:"Rent"},{value:"with_family",text:"Live with Family"},{value:"other",text:"Other"}],stateOptions:[{value:"AL",text:"Alabama"},{value:"AK",text:"Alaska"},{value:"AZ",text:"Arizona"},{value:"AR",text:"Arkansas"},{value:"CA",text:"California"},{value:"CO",text:"Colorado"},{value:"CT",text:"Connecticut"},{value:"DE",text:"Delaware"},{value:"FL",text:"Florida"},{value:"GA",text:"Georgia"},{value:"HI",text:"Hawaii"},{value:"ID",text:"Idaho"},{value:"IL",text:"Illinois"},{value:"IN",text:"Indiana"},{value:"IA",text:"Iowa"},{value:"KS",text:"Kansas"},{value:"KY",text:"Kentucky"},{value:"LA",text:"Louisiana"},{value:"ME",text:"Maine"},{value:"MD",text:"Maryland"},{value:"MA",text:"Massachusetts"},{value:"MI",text:"Michigan"},{value:"MN",text:"Minnesota"},{value:"MS",text:"Mississippi"},{value:"MO",text:"Missouri"},{value:"MT",text:"Montana"},{value:"NE",text:"Nebraska"},{value:"NV",text:"Nevada"},{value:"NH",text:"New Hampshire"},{value:"NJ",text:"New Jersey"},{value:"NM",text:"New Mexico"},{value:"NY",text:"New York"},{value:"NC",text:"North Carolina"},{value:"ND",text:"North Dakota"},{value:"OH",text:"Ohio"},{value:"OK",text:"Oklahoma"},{value:"OR",text:"Oregon"},{value:"PA",text:"Pennsylvania"},{value:"RI",text:"Rhode Island"},{value:"SC",text:"South Carolina"},{value:"SD",text:"South Dakota"},{value:"TN",text:"Tennessee"},{value:"TX",text:"Texas"},{value:"UT",text:"Utah"},{value:"VT",text:"Vermont"},{value:"VA",text:"Virginia"},{value:"WA",text:"Washington"},{value:"WV",text:"West Virginia"},{value:"WI",text:"Wisconsin"},{value:"WY",text:"Wyoming"}]}}},Ge={class:"personal-information-step"},Ze={class:"space-y-6"},Ke={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},Qe={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},$e={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},et={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},tt={class:"block text-sm font-medium mb-2"},at={class:"space-y-4"},rt={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},nt={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},lt={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},ot={class:"block text-sm font-medium mb-2"},st={key:0,class:"mt-6 p-4 bg-gray-50 rounded-lg"},it={class:"space-y-4"},dt={class:"grid grid-cols-1 md:grid-cols-3 gap-4"};function ut(o,e,t,c,g,s){const i=M("MTextField"),p=M("MSelect"),S=M("MSlider"),w=M("MCard");return f(),v("div",Ge,[u(w,{title:"Personal Information",subtitle:"Your basic contact and identity details"},{default:R(()=>[l("div",Ze,[l("div",Ke,[u(i,{"model-value":t.formData.personal.firstName,"onUpdate:modelValue":e[0]||(e[0]=a=>t.updateField("personal.firstName",a)),onBlur:e[1]||(e[1]=a=>t.touchField("personal.firstName")),label:"First Name",placeholder:"Enter your legal first name","prepend-icon":"fas fa-user",required:!0,"error-message":t.getFieldError("personal.firstName"),wrap:!0,"wrapper-class":"p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"},null,8,["model-value","error-message"]),u(i,{"model-value":t.formData.personal.middleName,"onUpdate:modelValue":e[2]||(e[2]=a=>t.updateField("personal.middleName",a)),label:"Middle Name",placeholder:"Middle name (optional)","prepend-icon":"fas fa-user"},null,8,["model-value"]),u(i,{"model-value":t.formData.personal.lastName,"onUpdate:modelValue":e[3]||(e[3]=a=>t.updateField("personal.lastName",a)),onBlur:e[4]||(e[4]=a=>t.touchField("personal.lastName")),label:"Last Name",placeholder:"Enter your legal last name","prepend-icon":"fas fa-user",required:!0,"error-message":t.getFieldError("personal.lastName"),wrap:!0,"wrapper-class":"p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"},null,8,["model-value","error-message"])]),l("div",Qe,[u(p,{"model-value":t.formData.personal.suffix,"onUpdate:modelValue":e[5]||(e[5]=a=>t.updateField("personal.suffix",a)),label:"Suffix",options:g.suffixOptions,placeholder:"Select suffix (optional)","prepend-icon":"fas fa-user-tag"},null,8,["model-value","options"]),u(i,{"model-value":t.formData.personal.dateOfBirth,"onUpdate:modelValue":e[6]||(e[6]=a=>t.updateField("personal.dateOfBirth",a)),onBlur:e[7]||(e[7]=a=>t.touchField("personal.dateOfBirth")),type:"date",label:"Date of Birth","prepend-icon":"fas fa-calendar",required:!0,"error-message":t.getFieldError("personal.dateOfBirth"),extend:!0,"extended-class":"border-2 border-gray-300"},null,8,["model-value","error-message"])]),u(i,{"model-value":t.formData.personal.ssn,"onUpdate:modelValue":e[8]||(e[8]=a=>t.updateField("personal.ssn",a)),onBlur:e[9]||(e[9]=a=>t.touchField("personal.ssn")),type:"password",label:"Social Security Number",placeholder:"XXX-XX-XXXX","prepend-icon":"fas fa-shield-alt",required:!0,"error-message":t.getFieldError("personal.ssn"),wrap:!0,extend:!0,"wrapper-class":"p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg","extended-class":"border-2 border-red-300 shadow-md","helper-text":"Your SSN is encrypted and secure - required for credit verification"},null,8,["model-value","error-message"]),l("div",$e,[u(i,{"model-value":t.formData.personal.email,"onUpdate:modelValue":e[10]||(e[10]=a=>t.updateField("personal.email",a)),onBlur:e[11]||(e[11]=a=>t.touchField("personal.email")),type:"email",label:"Email Address",placeholder:"your.email@example.com","prepend-icon":"fas fa-envelope",required:!0,"error-message":t.getFieldError("personal.email"),wrap:!0,"wrapper-class":"p-3 bg-green-50 border border-green-200 rounded-lg"},null,8,["model-value","error-message"]),u(i,{"model-value":t.formData.personal.phone,"onUpdate:modelValue":e[12]||(e[12]=a=>t.updateField("personal.phone",a)),onBlur:e[13]||(e[13]=a=>t.touchField("personal.phone")),type:"tel",label:"Primary Phone",placeholder:"(555) 123-4567","prepend-icon":"fas fa-phone",required:!0,"error-message":t.getFieldError("personal.phone"),wrap:!0,"wrapper-class":"p-3 bg-green-50 border border-green-200 rounded-lg"},null,8,["model-value","error-message"])]),u(i,{"model-value":t.formData.personal.alternatePhone,"onUpdate:modelValue":e[14]||(e[14]=a=>t.updateField("personal.alternatePhone",a)),type:"tel",label:"Alternate Phone",placeholder:"(555) 987-6543 (optional)","prepend-icon":"fas fa-phone-alt","helper-text":"Additional contact number (optional)"},null,8,["model-value"]),l("div",et,[u(p,{"model-value":t.formData.personal.maritalStatus,"onUpdate:modelValue":e[15]||(e[15]=a=>t.updateField("personal.maritalStatus",a)),onBlur:e[16]||(e[16]=a=>t.touchField("personal.maritalStatus")),label:"Marital Status",options:g.maritalStatusOptions,placeholder:"Select marital status","prepend-icon":"fas fa-heart",required:!0,"error-message":t.getFieldError("personal.maritalStatus")},null,8,["model-value","options","error-message"]),l("div",null,[l("label",tt,"Number of Dependents: "+y(t.formData.personal.dependents),1),u(S,{"model-value":t.formData.personal.dependents,"onUpdate:modelValue":e[17]||(e[17]=a=>t.updateField("personal.dependents",a)),min:0,max:10,step:1,color:"secondary","show-value":!0,"show-ticks":!0,"helper-text":"Include children and other dependents"},null,8,["model-value"])])])])]),_:1}),u(w,{title:"Current Address",subtitle:"Your residential information",class:"mt-6"},{default:R(()=>[l("div",at,[u(i,{"model-value":t.formData.address.street,"onUpdate:modelValue":e[18]||(e[18]=a=>t.updateField("address.street",a)),onBlur:e[19]||(e[19]=a=>t.touchField("address.street")),label:"Street Address",placeholder:"123 Main Street","prepend-icon":"fas fa-map-marker-alt",required:!0,"error-message":t.getFieldError("address.street"),wrap:!0,"wrapper-class":"p-3 bg-yellow-50 border border-yellow-200 rounded-lg"},null,8,["model-value","error-message"]),l("div",rt,[u(i,{"model-value":t.formData.address.apartment,"onUpdate:modelValue":e[20]||(e[20]=a=>t.updateField("address.apartment",a)),label:"Apartment/Unit",placeholder:"Apt 123 (optional)","prepend-icon":"fas fa-building"},null,8,["model-value"]),u(i,{"model-value":t.formData.address.city,"onUpdate:modelValue":e[21]||(e[21]=a=>t.updateField("address.city",a)),onBlur:e[22]||(e[22]=a=>t.touchField("address.city")),label:"City",placeholder:"Your city","prepend-icon":"fas fa-city",required:!0,"error-message":t.getFieldError("address.city"),wrap:!0,"wrapper-class":"p-3 bg-yellow-50 border border-yellow-200 rounded-lg"},null,8,["model-value","error-message"])]),l("div",nt,[u(p,{"model-value":t.formData.address.state,"onUpdate:modelValue":e[23]||(e[23]=a=>t.updateField("address.state",a)),onBlur:e[24]||(e[24]=a=>t.touchField("address.state")),label:"State",options:g.stateOptions,placeholder:"Select state","prepend-icon":"fas fa-flag",required:!0,"error-message":t.getFieldError("address.state"),searchable:!0},null,8,["model-value","options","error-message"]),u(i,{"model-value":t.formData.address.zipCode,"onUpdate:modelValue":e[25]||(e[25]=a=>t.updateField("address.zipCode",a)),onBlur:e[26]||(e[26]=a=>t.touchField("address.zipCode")),label:"ZIP Code",placeholder:"12345","prepend-icon":"fas fa-mail-bulk",required:!0,"error-message":t.getFieldError("address.zipCode"),wrap:!0,"wrapper-class":"p-3 bg-yellow-50 border border-yellow-200 rounded-lg"},null,8,["model-value","error-message"])]),l("div",lt,[u(p,{"model-value":t.formData.address.residencyType,"onUpdate:modelValue":e[27]||(e[27]=a=>t.updateField("address.residencyType",a)),onBlur:e[28]||(e[28]=a=>t.touchField("address.residencyType")),label:"Residency Type",options:g.residencyTypeOptions,placeholder:"Select residency type","prepend-icon":"fas fa-home",required:!0,"error-message":t.getFieldError("address.residencyType")},null,8,["model-value","options","error-message"]),l("div",null,[l("label",ot,"Months at Current Address: "+y(t.formData.address.monthsAtAddress),1),u(S,{"model-value":t.formData.address.monthsAtAddress,"onUpdate:modelValue":e[29]||(e[29]=a=>t.updateField("address.monthsAtAddress",a)),onBlur:e[30]||(e[30]=a=>t.touchField("address.monthsAtAddress")),min:0,max:360,step:1,color:"warning","show-value":!0,"format-value":a=>a+" months","helper-text":"Time at current residence","error-message":t.getFieldError("address.monthsAtAddress")},null,8,["model-value","format-value","error-message"])])]),t.formData.address.monthsAtAddress<24?(f(),v("div",st,[e[35]||(e[35]=l("h4",{class:"text-md font-semibold mb-4"},"Previous Address",-1)),e[36]||(e[36]=l("p",{class:"text-sm text-gray-600 mb-4"},"Since you've been at your current address for less than 2 years, please provide your previous address.",-1)),l("div",it,[u(i,{"model-value":t.formData.address.previousAddress.street,"onUpdate:modelValue":e[31]||(e[31]=a=>t.updateField("address.previousAddress.street",a)),label:"Previous Street Address",placeholder:"123 Previous Street","prepend-icon":"fas fa-map-marker-alt",required:!0},null,8,["model-value"]),l("div",dt,[u(i,{"model-value":t.formData.address.previousAddress.city,"onUpdate:modelValue":e[32]||(e[32]=a=>t.updateField("address.previousAddress.city",a)),label:"Previous City",placeholder:"Previous city","prepend-icon":"fas fa-city",required:!0},null,8,["model-value"]),u(p,{"model-value":t.formData.address.previousAddress.state,"onUpdate:modelValue":e[33]||(e[33]=a=>t.updateField("address.previousAddress.state",a)),label:"Previous State",options:g.stateOptions,placeholder:"Select state","prepend-icon":"fas fa-flag",required:!0,searchable:!0},null,8,["model-value","options"]),u(i,{"model-value":t.formData.address.previousAddress.zipCode,"onUpdate:modelValue":e[34]||(e[34]=a=>t.updateField("address.previousAddress.zipCode",a)),label:"Previous ZIP",placeholder:"12345","prepend-icon":"fas fa-mail-bulk",required:!0},null,8,["model-value"])])])])):E("",!0)])]),_:1})])}const mt=H(X,[["render",ut]]);X.__docgenInfo={displayName:"PersonalInformationStep",exportName:"default",description:"",tags:{},props:[{name:"formData",type:{name:"object"},required:!0},{name:"updateField",type:{name:"func"},required:!0},{name:"touchField",type:{name:"func"},required:!0},{name:"getFieldError",type:{name:"func"},required:!0}],sourceFiles:["C:/Users/bradl/OneDrive/Documents/GitHub/bmc-navigator-component/src/components/loan/steps/PersonalInformationStep.vue"]};function ct(){const o=C([{id:"personal",title:"Personal Information",description:"Basic contact and identity details",icon:"fas fa-user",required:!0},{id:"employment",title:"Employment Details",description:"Current employment and income information",icon:"fas fa-briefcase",required:!0},{id:"financial",title:"Financial Profile",description:"Assets, debts, and financial situation",icon:"fas fa-chart-line",required:!0},{id:"loan",title:"Loan Configuration",description:"Loan amount, purpose, and terms",icon:"fas fa-money-bill-wave",required:!0},{id:"documents",title:"Document Upload",description:"Required verification documents",icon:"fas fa-file-upload",required:!1},{id:"review",title:"Review & Submit",description:"Final review before submission",icon:"fas fa-check-circle",required:!0}]),e=C(0),t=C(new Set),c=C(new Set),g={personal:{firstName:"",lastName:"",middleName:"",suffix:"",ssn:"",dateOfBirth:"",email:"",phone:"",alternatePhone:"",maritalStatus:"",dependents:0},address:{street:"",apartment:"",city:"",state:"",zipCode:"",residencyType:"",monthsAtAddress:0,previousAddress:{street:"",city:"",state:"",zipCode:""}},employment:{status:"",employer:"",jobTitle:"",workPhone:"",supervisor:"",monthsEmployed:0,grossMonthlyIncome:0,otherIncome:0,otherIncomeSource:"",previousEmployer:{name:"",monthsEmployed:0}},financial:{bankName:"",accountType:"",monthlyRent:0,monthlyDebtPayments:0,creditScore:0,assets:{checking:0,savings:0,investments:0,realEstate:0,vehicle:0,other:0},debts:{creditCards:0,autoLoans:0,studentLoans:0,mortgage:0,other:0}},loan:{amount:15e3,purpose:"",purposeDetails:"",term:48,preferredPaymentDate:"",collateral:!1,collateralDescription:"",coBorrower:!1},coBorrower:{firstName:"",lastName:"",ssn:"",phone:"",relationship:"",income:0},documents:{idVerification:[],incomeVerification:[],addressVerification:[],bankStatements:[],additional:[]},agreements:{terms:!1,privacy:!1,creditCheck:!1,electronicSignature:!1,marketing:!1},metadata:{applicationId:"",startedAt:new Date,lastSaved:null,referralSource:"",campaignId:"",ipAddress:"",userAgent:""}},{formData:s,setValidationRules:i,setAsyncValidators:p,validateField:S,validateForm:w,setFieldValue:a,touchField:J,getFieldError:G,hasFieldError:P,isValid:Z,hasErrors:K,handleSubmit:Q,validators:r,resetForm:$}=he(g);(()=>{i({"personal.firstName":[r.required(),r.minLength(2),r.maxLength(50),r.pattern(/^[A-Za-z\s'-]+$/,"Only letters, spaces, hyphens, and apostrophes allowed")],"personal.lastName":[r.required(),r.minLength(2),r.maxLength(50),r.pattern(/^[A-Za-z\s'-]+$/,"Only letters, spaces, hyphens, and apostrophes allowed")],"personal.ssn":[r.required(),r.ssn()],"personal.dateOfBirth":[r.required(),r.custom(n=>{if(!n)return"Date of birth is required";const d=new Date,m=new Date(n),h=(d-m)/(365.25*24*60*60*1e3);return h<18?"You must be at least 18 years old":h>100?"Please enter a valid date of birth":!0})],"personal.email":[r.required(),r.email()],"personal.phone":[r.required(),r.phone()],"personal.maritalStatus":[r.required()],"address.street":[r.required(),r.minLength(5),r.maxLength(100)],"address.city":[r.required(),r.minLength(2),r.maxLength(50),r.pattern(/^[A-Za-z\s'-]+$/,"Only letters, spaces, hyphens, and apostrophes allowed")],"address.state":[r.required()],"address.zipCode":[r.required(),r.pattern(/^\d{5}(-\d{4})?$/,"Please enter a valid ZIP code")],"address.residencyType":[r.required()],"address.monthsAtAddress":[r.required(),r.minValue(0)],"employment.status":[r.required()],"employment.employer":[r.required(),r.minLength(2),r.maxLength(100)],"employment.jobTitle":[r.required(),r.minLength(2),r.maxLength(100)],"employment.monthsEmployed":[r.required(),r.minValue(0)],"employment.grossMonthlyIncome":[r.required(),r.minValue(1e3,"Monthly income must be at least $1,000")],"financial.bankName":[r.required(),r.minLength(2)],"financial.accountType":[r.required()],"financial.monthlyRent":[r.required(),r.minValue(0)],"financial.monthlyDebtPayments":[r.required(),r.minValue(0)],"loan.amount":[r.required(),r.minValue(1e3,"Minimum loan amount is $1,000"),r.maxValue(5e4,"Maximum loan amount is $50,000")],"loan.purpose":[r.required()],"loan.term":[r.required(),r.minValue(12),r.maxValue(84)],"agreements.terms":[r.custom(n=>n===!0||"You must accept the terms and conditions")],"agreements.privacy":[r.custom(n=>n===!0||"You must accept the privacy policy")],"agreements.creditCheck":[r.custom(n=>n===!0||"You must authorize the credit check")],"agreements.electronicSignature":[r.custom(n=>n===!0||"You must consent to electronic signature")]}),p({"personal.email":async n=>n?(await new Promise(d=>setTimeout(d,300)),n.includes("test@blocked.com")?"This email address is not allowed":!0):!0,"personal.ssn":async n=>n?(await new Promise(d=>setTimeout(d,500)),n==="123-45-6789"?"This SSN is invalid":!0):!0})})();const A=n=>n===0?!0:t.value.has(n-1)||t.value.has(n),ee=n=>{A(n)&&(e.value=n)},te=async()=>{await k()?(t.value.add(e.value),c.value.delete(e.value),e.value<o.value.length-1&&e.value++,await V()):c.value.add(e.value)},ae=()=>{e.value>0&&e.value--},k=async()=>{const n=o.value[e.value],m=N(n.id).map(x=>S(x));return(await Promise.all(m)).every(x=>x===!0)},N=n=>({personal:["personal.firstName","personal.lastName","personal.ssn","personal.dateOfBirth","personal.email","personal.phone","personal.maritalStatus","address.street","address.city","address.state","address.zipCode","address.residencyType","address.monthsAtAddress"],employment:["employment.status","employment.employer","employment.jobTitle","employment.monthsEmployed","employment.grossMonthlyIncome"],financial:["financial.bankName","financial.accountType","financial.monthlyRent","financial.monthlyDebtPayments"],loan:["loan.amount","loan.purpose","loan.term"],documents:[],review:["agreements.terms","agreements.privacy","agreements.creditCheck","agreements.electronicSignature"]})[n]||[],re=b(()=>Math.round(t.value.size/o.value.length*100)),ne=b(()=>o.value[e.value]),le=b(()=>e.value===0),oe=b(()=>e.value===o.value.length-1),V=async()=>{try{s.metadata.lastSaved=new Date;const n={applicationId:s.metadata.applicationId||T(),currentStep:e.value,completedSteps:Array.from(t.value),formData:JSON.parse(JSON.stringify(s)),timestamp:new Date().toISOString()};return localStorage.setItem("loanApplicationProgress",JSON.stringify(n)),n}catch(n){throw console.error("Error saving progress:",n),n}},se=()=>{try{const n=localStorage.getItem("loanApplicationProgress");if(n){const d=JSON.parse(n);return Object.assign(s,d.formData),e.value=d.currentStep||0,t.value=new Set(d.completedSteps||[]),!0}}catch(n){console.error("Error loading progress:",n)}return!1},ie=async()=>{if(!await w()){const d=o.value.findIndex(m=>N(m.id).some(x=>P(x)));return d!==-1&&(e.value=d),{success:!1,errors:"Please correct all errors before submitting"}}return Q(async d=>(await new Promise(m=>setTimeout(m,2e3)),localStorage.removeItem("loanApplicationProgress"),{applicationId:d.metadata.applicationId,submittedAt:new Date().toISOString(),status:"submitted",estimatedDecisionTime:"24-48 hours"}))},T=()=>"APP-"+Date.now()+"-"+Math.random().toString(36).substr(2,9).toUpperCase(),q=b(()=>{const n=s.employment.grossMonthlyIncome+s.employment.otherIncome,d=s.financial.monthlyDebtPayments;return n===0?0:Math.round(d/n*100)}),de=b(()=>{const n=s.loan.amount,d=s.loan.term,m=L();if(n&&d&&m){const h=m/12,x=n*(h*Math.pow(1+h,d))/(Math.pow(1+h,d)-1);return Math.round(x*100)/100}return 0}),L=()=>{const n=s.financial.creditScore||650,d=q.value;let m=.15;return n>=750?m-=.03:n>=700?m-=.02:n>=650?m-=.01:n<600&&(m+=.03),d>40?m+=.02:d<20&&(m-=.01),Math.max(.08,Math.min(.25,m))};return ve(()=>s,()=>{clearTimeout(window.autoSaveTimeout),window.autoSaveTimeout=setTimeout(()=>{V()},1e3)},{deep:!0}),s.metadata.applicationId||(s.metadata.applicationId=T()),{steps:b(()=>o.value),currentStep:b(()=>e.value),currentStepInfo:ne,completedSteps:b(()=>t.value),stepErrors:b(()=>c.value),progressPercentage:re,isFirstStep:le,isLastStep:oe,formData:s,setFieldValue:a,touchField:J,getFieldError:G,hasFieldError:P,isValid:Z,hasErrors:K,canNavigateToStep:A,goToStep:ee,nextStep:te,previousStep:ae,validateCurrentStep:k,validateForm:w,saveProgress:V,loadProgress:se,submitApplication:ie,calculateDebtToIncome:q,estimatedMonthlyPayment:de,getEstimatedInterestRate:L,resetForm:$,generateApplicationId:T}}const Mt={title:"Loan Application/Complete Flow",parameters:{layout:"fullscreen",docs:{description:{component:"Complete loan application flow with multi-step forms, validation, state management, and real-time updates. Demonstrates comprehensive form handling patterns for financial services."}}}},I={render:()=>({components:{MLayout:fe,MCard:_,MButton:ge,MTextField:z,MSelect:j,MCheckbox:be,MSlider:Y,MProgress:ye,LoanFlowStepper:Je,PersonalInformationStep:mt},setup(){const o=ct();return{...o,loadSavedProgress:()=>{o.loadProgress()&&console.log("Loaded saved progress")}}},mounted(){this.loadSavedProgress()},computed:{canSubmit(){return this.isValid&&this.completedSteps.has(this.steps.length-2)},formattedApplicationId(){return this.formData.metadata.applicationId||"Loading..."},lastSavedFormatted(){return this.formData.metadata.lastSaved?new Date(this.formData.metadata.lastSaved):null}},methods:{async handleNextStep(){await this.nextStep()},async handlePreviousStep(){this.previousStep()},async handleNavigateToStep(o){this.goToStep(o)},async handleSaveDraft(){try{await this.saveProgress(),this.showSuccessMessage("Draft saved successfully")}catch{this.showErrorMessage("Failed to save draft")}},async handleSubmitApplication(){(await this.submitApplication()).success?this.showSuccessMessage("Application submitted successfully!"):this.showErrorMessage("Please correct all errors before submitting")},showSuccessMessage(o){alert(o)},showErrorMessage(o){alert(o)},formatCurrency(o){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0}).format(o)}},template:`
      <MLayout app-title="Your Town Finance" :drawer="false">
        <LoanFlowStepper
          :steps="steps"
          :current-step="currentStep"
          :completed-steps="completedSteps"
          :step-errors="stepErrors"
          :progress-percentage="progressPercentage"
          :application-id="formattedApplicationId"
          :is-validating="isValidating"
          :is-submitting="isSubmitting"
          :is-saving="false"
          :last-saved="lastSavedFormatted"
          :can-submit="canSubmit"
          @navigate-to-step="handleNavigateToStep"
          @next-step="handleNextStep"
          @previous-step="handlePreviousStep"
          @save-draft="handleSaveDraft"
          @submit-application="handleSubmitApplication"
        >
          <!-- Personal Information Step -->
          <PersonalInformationStep
            v-if="currentStepInfo.id === 'personal'"
            :form-data="formData"
            :update-field="setFieldValue"
            :touch-field="touchField"
            :get-field-error="getFieldError"
          />
          
          <!-- Employment Details Step -->
          <div v-else-if="currentStepInfo.id === 'employment'" class="space-y-6">
            <MCard title="Employment Information" subtitle="Current employment and income details">
              <div class="space-y-6">
                <MSelect 
                  :model-value="formData.employment.status"
                  @update:model-value="setFieldValue('employment.status', $event)"
                  @blur="touchField('employment.status')"
                  label="Employment Status" 
                  :options="[
                    { value: 'full_time', text: 'Full-time Employee' },
                    { value: 'part_time', text: 'Part-time Employee' },
                    { value: 'self_employed', text: 'Self-employed' },
                    { value: 'contractor', text: 'Independent Contractor' },
                    { value: 'retired', text: 'Retired' },
                    { value: 'unemployed', text: 'Unemployed' }
                  ]"
                  placeholder="Select employment status"
                  prepend-icon="fas fa-briefcase"
                  :required="true"
                  :error-message="getFieldError('employment.status')"
                  :wrap="true"
                  wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                />
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MTextField 
                    :model-value="formData.employment.employer"
                    @update:model-value="setFieldValue('employment.employer', $event)"
                    @blur="touchField('employment.employer')"
                    label="Current Employer" 
                    placeholder="Company name"
                    prepend-icon="fas fa-building"
                    :required="true"
                    :error-message="getFieldError('employment.employer')"
                    :wrap="true"
                    wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                  />
                  
                  <MTextField 
                    :model-value="formData.employment.jobTitle"
                    @update:model-value="setFieldValue('employment.jobTitle', $event)"
                    @blur="touchField('employment.jobTitle')"
                    label="Job Title" 
                    placeholder="Your position"
                    prepend-icon="fas fa-id-card"
                    :required="true"
                    :error-message="getFieldError('employment.jobTitle')"
                    :wrap="true"
                    wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Months with Current Employer: {{ formData.employment.monthsEmployed }}</label>
                    <MSlider 
                      :model-value="formData.employment.monthsEmployed"
                      @update:model-value="setFieldValue('employment.monthsEmployed', $event)"
                      @blur="touchField('employment.monthsEmployed')"
                      :min="0"
                      :max="480"
                      :step="1"
                      color="success"
                      :show-value="true"
                      :format-value="(value) => value + ' months'"
                      helper-text="Employment stability factor"
                      :error-message="getFieldError('employment.monthsEmployed')"
                      :wrap="true"
                      wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Gross Monthly Income: {{ formatCurrency(formData.employment.grossMonthlyIncome) }}</label>
                    <MSlider 
                      :model-value="formData.employment.grossMonthlyIncome"
                      @update:model-value="setFieldValue('employment.grossMonthlyIncome', $event)"
                      @blur="touchField('employment.grossMonthlyIncome')"
                      :min="1000"
                      :max="20000"
                      :step="100"
                      color="primary"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Before taxes and deductions"
                      :error-message="getFieldError('employment.grossMonthlyIncome')"
                      :wrap="true"
                      :extend="true"
                      wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
                      extended-class="border-2 border-blue-400 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Financial Profile Step -->
          <div v-else-if="currentStepInfo.id === 'financial'" class="space-y-6">
            <MCard title="Financial Information" subtitle="Your financial profile and obligations">
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MTextField 
                    :model-value="formData.financial.bankName"
                    @update:model-value="setFieldValue('financial.bankName', $event)"
                    @blur="touchField('financial.bankName')"
                    label="Bank Name" 
                    placeholder="Your primary bank"
                    prepend-icon="fas fa-university"
                    :required="true"
                    :error-message="getFieldError('financial.bankName')"
                    :wrap="true"
                    wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                  />
                  
                  <MSelect 
                    :model-value="formData.financial.accountType"
                    @update:model-value="setFieldValue('financial.accountType', $event)"
                    @blur="touchField('financial.accountType')"
                    label="Account Type" 
                    :options="[
                      { value: 'checking', text: 'Checking' },
                      { value: 'savings', text: 'Savings' },
                      { value: 'both', text: 'Both Checking & Savings' }
                    ]"
                    placeholder="Select account type"
                    prepend-icon="fas fa-credit-card"
                    :required="true"
                    :error-message="getFieldError('financial.accountType')"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Monthly Rent/Mortgage: {{ formatCurrency(formData.financial.monthlyRent) }}</label>
                    <MSlider 
                      :model-value="formData.financial.monthlyRent"
                      @update:model-value="setFieldValue('financial.monthlyRent', $event)"
                      @blur="touchField('financial.monthlyRent')"
                      :min="0"
                      :max="5000"
                      :step="50"
                      color="warning"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Housing payment"
                      :error-message="getFieldError('financial.monthlyRent')"
                      :wrap="true"
                      wrapper-class="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Monthly Debt Payments: {{ formatCurrency(formData.financial.monthlyDebtPayments) }}</label>
                    <MSlider 
                      :model-value="formData.financial.monthlyDebtPayments"
                      @update:model-value="setFieldValue('financial.monthlyDebtPayments', $event)"
                      @blur="touchField('financial.monthlyDebtPayments')"
                      :min="0"
                      :max="3000"
                      :step="25"
                      color="error"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Credit cards, loans, etc."
                      :error-message="getFieldError('financial.monthlyDebtPayments')"
                      :wrap="true"
                      wrapper-class="p-3 bg-red-50 border border-red-200 rounded-lg"
                    />
                  </div>
                </div>
                
                <!-- Debt-to-Income Ratio Display -->
                <div class="p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Debt-to-Income Ratio:</span>
                    <span class="text-lg font-bold" :class="{
                      'text-green-600': calculateDebtToIncome <= 30,
                      'text-yellow-600': calculateDebtToIncome > 30 && calculateDebtToIncome <= 40,
                      'text-red-600': calculateDebtToIncome > 40
                    }">
                      {{ calculateDebtToIncome }}%
                    </span>
                  </div>
                  <MProgress 
                    :value="Math.min(calculateDebtToIncome, 50)" 
                    :max="50"
                    :color="calculateDebtToIncome <= 30 ? 'success' : calculateDebtToIncome <= 40 ? 'warning' : 'error'"
                    :show-percentage="false"
                  />
                  <p class="text-xs text-gray-600 mt-1">
                    {{ calculateDebtToIncome <= 30 ? 'Excellent' : calculateDebtToIncome <= 40 ? 'Good' : 'High' }} - 
                    Lower ratios improve loan approval chances
                  </p>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Loan Configuration Step -->
          <div v-else-if="currentStepInfo.id === 'loan'" class="space-y-6">
            <MCard title="Loan Details" subtitle="Configure your loan amount and terms">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Loan Amount: {{ formatCurrency(formData.loan.amount) }}</label>
                  <MSlider 
                    :model-value="formData.loan.amount"
                    @update:model-value="setFieldValue('loan.amount', $event)"
                    @blur="touchField('loan.amount')"
                    :min="1000"
                    :max="50000"
                    :step="500"
                    color="primary"
                    :show-value="true"
                    :format-value="formatCurrency"
                    helper-text="How much do you need to borrow?"
                    :error-message="getFieldError('loan.amount')"
                    :wrap="true"
                    :extend="true"
                    wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                    extended-class="border-2 border-blue-400 shadow-xl"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MSelect 
                    :model-value="formData.loan.purpose"
                    @update:model-value="setFieldValue('loan.purpose', $event)"
                    @blur="touchField('loan.purpose')"
                    label="Loan Purpose" 
                    :options="[
                      { value: 'debt_consolidation', text: 'Debt Consolidation' },
                      { value: 'home_improvement', text: 'Home Improvement' },
                      { value: 'auto_repair', text: 'Auto Repair' },
                      { value: 'medical', text: 'Medical Expenses' },
                      { value: 'education', text: 'Education' },
                      { value: 'vacation', text: 'Vacation' },
                      { value: 'other', text: 'Other' }
                    ]"
                    placeholder="What will you use this loan for?"
                    prepend-icon="fas fa-target"
                    :required="true"
                    :error-message="getFieldError('loan.purpose')"
                    :searchable="true"
                    :wrap="true"
                    wrapper-class="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
                  />
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Loan Term: {{ formData.loan.term }} months</label>
                    <MSlider 
                      :model-value="formData.loan.term"
                      @update:model-value="setFieldValue('loan.term', $event)"
                      @blur="touchField('loan.term')"
                      :min="12"
                      :max="84"
                      :step="6"
                      color="secondary"
                      :show-value="true"
                      :show-ticks="true"
                      :format-value="(value) => value + ' months'"
                      helper-text="Repayment period"
                      :error-message="getFieldError('loan.term')"
                    />
                  </div>
                </div>
                
                <!-- Loan Summary -->
                <div class="p-4 bg-blue-50 rounded-lg">
                  <h4 class="font-semibold mb-3">Loan Summary</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-blue-600">{{ formatCurrency(formData.loan.amount) }}</div>
                      <div class="text-xs text-gray-600">Loan Amount</div>
                    </div>
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-green-600">{{ formatCurrency(estimatedMonthlyPayment) }}</div>
                      <div class="text-xs text-gray-600">Est. Monthly Payment</div>
                    </div>
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-purple-600">{{ (getEstimatedInterestRate() * 100).toFixed(1) }}%</div>
                      <div class="text-xs text-gray-600">Est. Interest Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Documents Step -->
          <div v-else-if="currentStepInfo.id === 'documents'" class="space-y-6">
            <MCard title="Document Upload" subtitle="Required verification documents">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <i class="fas fa-id-card text-3xl text-gray-400 mb-2"></i>
                  <h4 class="font-semibold">ID Verification</h4>
                  <p class="text-sm text-gray-600">Driver's license or state ID</p>
                  <MButton variant="outlined" text="Upload Document" prepend-icon="fas fa-upload" class="mt-2" size="sm" />
                </div>
                
                <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <i class="fas fa-file-invoice-dollar text-3xl text-gray-400 mb-2"></i>
                  <h4 class="font-semibold">Income Verification</h4>
                  <p class="text-sm text-gray-600">Recent pay stubs</p>
                  <MButton variant="outlined" text="Upload Document" prepend-icon="fas fa-upload" class="mt-2" size="sm" />
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Review Step -->
          <div v-else-if="currentStepInfo.id === 'review'" class="space-y-6">
            <MCard title="Application Review" subtitle="Please review your information before submitting">
              <div class="space-y-6">
                <div class="border-l-4 border-blue-400 pl-4">
                  <h4 class="font-semibold text-lg">Personal Information</h4>
                  <div class="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <span class="font-medium">Name:</span> 
                      {{ formData.personal.firstName }} {{ formData.personal.lastName }}
                    </div>
                    <div>
                      <span class="font-medium">Email:</span> 
                      {{ formData.personal.email }}
                    </div>
                  </div>
                </div>
              </div>
            </MCard>
            
            <!-- Legal Agreements -->
            <MCard title="Required Agreements" subtitle="Please review and accept all required agreements">
              <div class="space-y-4">
                <MCheckbox 
                  :model-value="formData.agreements.terms"
                  @update:model-value="setFieldValue('agreements.terms', $event)"
                  @blur="touchField('agreements.terms')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.terms')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I agree to the Terms and Conditions
                </MCheckbox>
                
                <MCheckbox 
                  :model-value="formData.agreements.privacy"
                  @update:model-value="setFieldValue('agreements.privacy', $event)"
                  @blur="touchField('agreements.privacy')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.privacy')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I accept the Privacy Policy
                </MCheckbox>
                
                <MCheckbox 
                  :model-value="formData.agreements.creditCheck"
                  @update:model-value="setFieldValue('agreements.creditCheck', $event)"
                  @blur="touchField('agreements.creditCheck')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.creditCheck')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I authorize credit check and information verification
                </MCheckbox>
              </div>
            </MCard>
          </div>
        </LoanFlowStepper>
      </MLayout>
    `}),parameters:{docs:{description:{story:"Complete loan application demonstrating multi-step forms, comprehensive validation, state management, auto-save functionality, and real-time form interaction patterns for financial services."}}}};var B,O,U;I.parameters={...I.parameters,docs:{...(B=I.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard,
      MButton,
      MTextField,
      MSelect,
      MCheckbox,
      MSlider,
      MProgress,
      LoanFlowStepper,
      PersonalInformationStep
    },
    setup() {
      const loanFlow = useLoanFlow();
      const loadSavedProgress = () => {
        const loaded = loanFlow.loadProgress();
        if (loaded) {
          console.log('Loaded saved progress');
        }
      };
      return {
        ...loanFlow,
        loadSavedProgress
      };
    },
    mounted() {
      this.loadSavedProgress();
    },
    computed: {
      canSubmit() {
        return this.isValid && this.completedSteps.has(this.steps.length - 2);
      },
      formattedApplicationId() {
        return this.formData.metadata.applicationId || 'Loading...';
      },
      lastSavedFormatted() {
        return this.formData.metadata.lastSaved ? new Date(this.formData.metadata.lastSaved) : null;
      }
    },
    methods: {
      async handleNextStep() {
        await this.nextStep();
      },
      async handlePreviousStep() {
        this.previousStep();
      },
      async handleNavigateToStep(stepIndex) {
        this.goToStep(stepIndex);
      },
      async handleSaveDraft() {
        try {
          await this.saveProgress();
          this.showSuccessMessage('Draft saved successfully');
        } catch (error) {
          this.showErrorMessage('Failed to save draft');
        }
      },
      async handleSubmitApplication() {
        const result = await this.submitApplication();
        if (result.success) {
          this.showSuccessMessage('Application submitted successfully!');
        } else {
          this.showErrorMessage('Please correct all errors before submitting');
        }
      },
      showSuccessMessage(message) {
        alert(message);
      },
      showErrorMessage(message) {
        alert(message);
      },
      formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        }).format(amount);
      }
    },
    template: \`
      <MLayout app-title="Your Town Finance" :drawer="false">
        <LoanFlowStepper
          :steps="steps"
          :current-step="currentStep"
          :completed-steps="completedSteps"
          :step-errors="stepErrors"
          :progress-percentage="progressPercentage"
          :application-id="formattedApplicationId"
          :is-validating="isValidating"
          :is-submitting="isSubmitting"
          :is-saving="false"
          :last-saved="lastSavedFormatted"
          :can-submit="canSubmit"
          @navigate-to-step="handleNavigateToStep"
          @next-step="handleNextStep"
          @previous-step="handlePreviousStep"
          @save-draft="handleSaveDraft"
          @submit-application="handleSubmitApplication"
        >
          <!-- Personal Information Step -->
          <PersonalInformationStep
            v-if="currentStepInfo.id === 'personal'"
            :form-data="formData"
            :update-field="setFieldValue"
            :touch-field="touchField"
            :get-field-error="getFieldError"
          />
          
          <!-- Employment Details Step -->
          <div v-else-if="currentStepInfo.id === 'employment'" class="space-y-6">
            <MCard title="Employment Information" subtitle="Current employment and income details">
              <div class="space-y-6">
                <MSelect 
                  :model-value="formData.employment.status"
                  @update:model-value="setFieldValue('employment.status', $event)"
                  @blur="touchField('employment.status')"
                  label="Employment Status" 
                  :options="[
                    { value: 'full_time', text: 'Full-time Employee' },
                    { value: 'part_time', text: 'Part-time Employee' },
                    { value: 'self_employed', text: 'Self-employed' },
                    { value: 'contractor', text: 'Independent Contractor' },
                    { value: 'retired', text: 'Retired' },
                    { value: 'unemployed', text: 'Unemployed' }
                  ]"
                  placeholder="Select employment status"
                  prepend-icon="fas fa-briefcase"
                  :required="true"
                  :error-message="getFieldError('employment.status')"
                  :wrap="true"
                  wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                />
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MTextField 
                    :model-value="formData.employment.employer"
                    @update:model-value="setFieldValue('employment.employer', $event)"
                    @blur="touchField('employment.employer')"
                    label="Current Employer" 
                    placeholder="Company name"
                    prepend-icon="fas fa-building"
                    :required="true"
                    :error-message="getFieldError('employment.employer')"
                    :wrap="true"
                    wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                  />
                  
                  <MTextField 
                    :model-value="formData.employment.jobTitle"
                    @update:model-value="setFieldValue('employment.jobTitle', $event)"
                    @blur="touchField('employment.jobTitle')"
                    label="Job Title" 
                    placeholder="Your position"
                    prepend-icon="fas fa-id-card"
                    :required="true"
                    :error-message="getFieldError('employment.jobTitle')"
                    :wrap="true"
                    wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Months with Current Employer: {{ formData.employment.monthsEmployed }}</label>
                    <MSlider 
                      :model-value="formData.employment.monthsEmployed"
                      @update:model-value="setFieldValue('employment.monthsEmployed', $event)"
                      @blur="touchField('employment.monthsEmployed')"
                      :min="0"
                      :max="480"
                      :step="1"
                      color="success"
                      :show-value="true"
                      :format-value="(value) => value + ' months'"
                      helper-text="Employment stability factor"
                      :error-message="getFieldError('employment.monthsEmployed')"
                      :wrap="true"
                      wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Gross Monthly Income: {{ formatCurrency(formData.employment.grossMonthlyIncome) }}</label>
                    <MSlider 
                      :model-value="formData.employment.grossMonthlyIncome"
                      @update:model-value="setFieldValue('employment.grossMonthlyIncome', $event)"
                      @blur="touchField('employment.grossMonthlyIncome')"
                      :min="1000"
                      :max="20000"
                      :step="100"
                      color="primary"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Before taxes and deductions"
                      :error-message="getFieldError('employment.grossMonthlyIncome')"
                      :wrap="true"
                      :extend="true"
                      wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
                      extended-class="border-2 border-blue-400 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Financial Profile Step -->
          <div v-else-if="currentStepInfo.id === 'financial'" class="space-y-6">
            <MCard title="Financial Information" subtitle="Your financial profile and obligations">
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MTextField 
                    :model-value="formData.financial.bankName"
                    @update:model-value="setFieldValue('financial.bankName', $event)"
                    @blur="touchField('financial.bankName')"
                    label="Bank Name" 
                    placeholder="Your primary bank"
                    prepend-icon="fas fa-university"
                    :required="true"
                    :error-message="getFieldError('financial.bankName')"
                    :wrap="true"
                    wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                  />
                  
                  <MSelect 
                    :model-value="formData.financial.accountType"
                    @update:model-value="setFieldValue('financial.accountType', $event)"
                    @blur="touchField('financial.accountType')"
                    label="Account Type" 
                    :options="[
                      { value: 'checking', text: 'Checking' },
                      { value: 'savings', text: 'Savings' },
                      { value: 'both', text: 'Both Checking & Savings' }
                    ]"
                    placeholder="Select account type"
                    prepend-icon="fas fa-credit-card"
                    :required="true"
                    :error-message="getFieldError('financial.accountType')"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Monthly Rent/Mortgage: {{ formatCurrency(formData.financial.monthlyRent) }}</label>
                    <MSlider 
                      :model-value="formData.financial.monthlyRent"
                      @update:model-value="setFieldValue('financial.monthlyRent', $event)"
                      @blur="touchField('financial.monthlyRent')"
                      :min="0"
                      :max="5000"
                      :step="50"
                      color="warning"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Housing payment"
                      :error-message="getFieldError('financial.monthlyRent')"
                      :wrap="true"
                      wrapper-class="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Monthly Debt Payments: {{ formatCurrency(formData.financial.monthlyDebtPayments) }}</label>
                    <MSlider 
                      :model-value="formData.financial.monthlyDebtPayments"
                      @update:model-value="setFieldValue('financial.monthlyDebtPayments', $event)"
                      @blur="touchField('financial.monthlyDebtPayments')"
                      :min="0"
                      :max="3000"
                      :step="25"
                      color="error"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Credit cards, loans, etc."
                      :error-message="getFieldError('financial.monthlyDebtPayments')"
                      :wrap="true"
                      wrapper-class="p-3 bg-red-50 border border-red-200 rounded-lg"
                    />
                  </div>
                </div>
                
                <!-- Debt-to-Income Ratio Display -->
                <div class="p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Debt-to-Income Ratio:</span>
                    <span class="text-lg font-bold" :class="{
                      'text-green-600': calculateDebtToIncome <= 30,
                      'text-yellow-600': calculateDebtToIncome > 30 && calculateDebtToIncome <= 40,
                      'text-red-600': calculateDebtToIncome > 40
                    }">
                      {{ calculateDebtToIncome }}%
                    </span>
                  </div>
                  <MProgress 
                    :value="Math.min(calculateDebtToIncome, 50)" 
                    :max="50"
                    :color="calculateDebtToIncome <= 30 ? 'success' : calculateDebtToIncome <= 40 ? 'warning' : 'error'"
                    :show-percentage="false"
                  />
                  <p class="text-xs text-gray-600 mt-1">
                    {{ calculateDebtToIncome <= 30 ? 'Excellent' : calculateDebtToIncome <= 40 ? 'Good' : 'High' }} - 
                    Lower ratios improve loan approval chances
                  </p>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Loan Configuration Step -->
          <div v-else-if="currentStepInfo.id === 'loan'" class="space-y-6">
            <MCard title="Loan Details" subtitle="Configure your loan amount and terms">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Loan Amount: {{ formatCurrency(formData.loan.amount) }}</label>
                  <MSlider 
                    :model-value="formData.loan.amount"
                    @update:model-value="setFieldValue('loan.amount', $event)"
                    @blur="touchField('loan.amount')"
                    :min="1000"
                    :max="50000"
                    :step="500"
                    color="primary"
                    :show-value="true"
                    :format-value="formatCurrency"
                    helper-text="How much do you need to borrow?"
                    :error-message="getFieldError('loan.amount')"
                    :wrap="true"
                    :extend="true"
                    wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                    extended-class="border-2 border-blue-400 shadow-xl"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MSelect 
                    :model-value="formData.loan.purpose"
                    @update:model-value="setFieldValue('loan.purpose', $event)"
                    @blur="touchField('loan.purpose')"
                    label="Loan Purpose" 
                    :options="[
                      { value: 'debt_consolidation', text: 'Debt Consolidation' },
                      { value: 'home_improvement', text: 'Home Improvement' },
                      { value: 'auto_repair', text: 'Auto Repair' },
                      { value: 'medical', text: 'Medical Expenses' },
                      { value: 'education', text: 'Education' },
                      { value: 'vacation', text: 'Vacation' },
                      { value: 'other', text: 'Other' }
                    ]"
                    placeholder="What will you use this loan for?"
                    prepend-icon="fas fa-target"
                    :required="true"
                    :error-message="getFieldError('loan.purpose')"
                    :searchable="true"
                    :wrap="true"
                    wrapper-class="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
                  />
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Loan Term: {{ formData.loan.term }} months</label>
                    <MSlider 
                      :model-value="formData.loan.term"
                      @update:model-value="setFieldValue('loan.term', $event)"
                      @blur="touchField('loan.term')"
                      :min="12"
                      :max="84"
                      :step="6"
                      color="secondary"
                      :show-value="true"
                      :show-ticks="true"
                      :format-value="(value) => value + ' months'"
                      helper-text="Repayment period"
                      :error-message="getFieldError('loan.term')"
                    />
                  </div>
                </div>
                
                <!-- Loan Summary -->
                <div class="p-4 bg-blue-50 rounded-lg">
                  <h4 class="font-semibold mb-3">Loan Summary</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-blue-600">{{ formatCurrency(formData.loan.amount) }}</div>
                      <div class="text-xs text-gray-600">Loan Amount</div>
                    </div>
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-green-600">{{ formatCurrency(estimatedMonthlyPayment) }}</div>
                      <div class="text-xs text-gray-600">Est. Monthly Payment</div>
                    </div>
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-purple-600">{{ (getEstimatedInterestRate() * 100).toFixed(1) }}%</div>
                      <div class="text-xs text-gray-600">Est. Interest Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Documents Step -->
          <div v-else-if="currentStepInfo.id === 'documents'" class="space-y-6">
            <MCard title="Document Upload" subtitle="Required verification documents">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <i class="fas fa-id-card text-3xl text-gray-400 mb-2"></i>
                  <h4 class="font-semibold">ID Verification</h4>
                  <p class="text-sm text-gray-600">Driver's license or state ID</p>
                  <MButton variant="outlined" text="Upload Document" prepend-icon="fas fa-upload" class="mt-2" size="sm" />
                </div>
                
                <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <i class="fas fa-file-invoice-dollar text-3xl text-gray-400 mb-2"></i>
                  <h4 class="font-semibold">Income Verification</h4>
                  <p class="text-sm text-gray-600">Recent pay stubs</p>
                  <MButton variant="outlined" text="Upload Document" prepend-icon="fas fa-upload" class="mt-2" size="sm" />
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Review Step -->
          <div v-else-if="currentStepInfo.id === 'review'" class="space-y-6">
            <MCard title="Application Review" subtitle="Please review your information before submitting">
              <div class="space-y-6">
                <div class="border-l-4 border-blue-400 pl-4">
                  <h4 class="font-semibold text-lg">Personal Information</h4>
                  <div class="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <span class="font-medium">Name:</span> 
                      {{ formData.personal.firstName }} {{ formData.personal.lastName }}
                    </div>
                    <div>
                      <span class="font-medium">Email:</span> 
                      {{ formData.personal.email }}
                    </div>
                  </div>
                </div>
              </div>
            </MCard>
            
            <!-- Legal Agreements -->
            <MCard title="Required Agreements" subtitle="Please review and accept all required agreements">
              <div class="space-y-4">
                <MCheckbox 
                  :model-value="formData.agreements.terms"
                  @update:model-value="setFieldValue('agreements.terms', $event)"
                  @blur="touchField('agreements.terms')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.terms')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I agree to the Terms and Conditions
                </MCheckbox>
                
                <MCheckbox 
                  :model-value="formData.agreements.privacy"
                  @update:model-value="setFieldValue('agreements.privacy', $event)"
                  @blur="touchField('agreements.privacy')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.privacy')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I accept the Privacy Policy
                </MCheckbox>
                
                <MCheckbox 
                  :model-value="formData.agreements.creditCheck"
                  @update:model-value="setFieldValue('agreements.creditCheck', $event)"
                  @blur="touchField('agreements.creditCheck')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.creditCheck')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I authorize credit check and information verification
                </MCheckbox>
              </div>
            </MCard>
          </div>
        </LoanFlowStepper>
      </MLayout>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete loan application demonstrating multi-step forms, comprehensive validation, state management, auto-save functionality, and real-time form interaction patterns for financial services.'
      }
    }
  }
}`,...(U=(O=I.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};const Ct=["FullLoanApplication"];export{I as FullLoanApplication,Ct as __namedExportsOrder,Mt as default};
