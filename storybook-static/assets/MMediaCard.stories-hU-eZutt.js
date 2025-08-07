import{k as o,p as r,l as d,s,B as u,v as c,F as f,x as v,u as T,z as i}from"./vue.esm-bundler-BOts1VAj.js";import{_ as se}from"./_plugin-vue_export-helper-DlAUqK2U.js";const re={name:"MMediaCard",props:{mediaType:{type:String,default:null,validator:e=>[null,"image","video","audio","document","custom"].includes(e)},mediaSrc:{type:String,default:null},mediaAlt:{type:String,default:null},videoControls:{type:Boolean,default:!0},videoAutoplay:{type:Boolean,default:!1},videoMuted:{type:Boolean,default:!1},videoLoop:{type:Boolean,default:!1},audioControls:{type:Boolean,default:!0},audioAutoplay:{type:Boolean,default:!1},audioMuted:{type:Boolean,default:!1},audioLoop:{type:Boolean,default:!1},documentName:{type:String,default:null},documentSize:{type:String,default:null},documentType:{type:String,default:null},title:{type:String,default:null},subtitle:{type:String,default:null},description:{type:String,default:null},metadata:{type:Object,default:()=>({})},tags:{type:Array,default:()=>[]},headerActions:{type:Array,default:()=>[]},footerActions:{type:Array,default:()=>[]},showOverlay:{type:Boolean,default:!1},overlayContent:{type:String,default:null},variant:{type:String,default:"default",validator:e=>["default","compact","featured","minimal","detailed"].includes(e)},orientation:{type:String,default:"vertical",validator:e=>["vertical","horizontal"].includes(e)},aspectRatio:{type:String,default:"16/9",validator:e=>["1/1","4/3","16/9","3/2","auto"].includes(e)},elevation:{type:[String,Number],default:1,validator:e=>[0,1,2,3,4,5].includes(Number(e))},rounded:{type:[Boolean,String],default:!0},bordered:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},loadingText:{type:String,default:null},error:{type:String,default:null},retryable:{type:Boolean,default:!0},clickable:{type:Boolean,default:!1},selectable:{type:Boolean,default:!1},selected:{type:Boolean,default:!1}},emits:["click","media-load","media-error","action","retry","select"],computed:{hasMedia(){return this.mediaType&&this.mediaSrc},hasHeader(){return this.title||this.subtitle||this.hasHeaderActions},hasContent(){return this.$slots.default||this.description},hasMetadata(){return Object.keys(this.metadata).length>0},hasTags(){return this.tags.length>0},hasHeaderActions(){return this.headerActions.length>0||this.$slots["header-actions"]},hasFooterActions(){return this.footerActions.length>0||this.$slots["footer-actions"]},cardClasses(){return["media-card",`variant-${this.variant}`,`orientation-${this.orientation}`,`elevation-${this.elevation}`,{rounded:this.rounded===!0,[`rounded-${this.rounded}`]:typeof this.rounded=="string",bordered:this.bordered,clickable:this.clickable,selectable:this.selectable,selected:this.selected,loading:this.loading,error:this.error}]},mediaContainerClasses(){return["media-wrapper",`aspect-${this.aspectRatio.replace("/","-")}`,{"has-overlay":this.showOverlay}]},imageClasses(){return["media-image",{"object-cover":this.aspectRatio!=="auto","object-contain":this.aspectRatio==="auto"}]},videoClasses(){return["media-video",{"object-cover":this.aspectRatio!=="auto"}]},audioClasses(){return["media-audio"]},documentClasses(){return["document-preview-content",{[`document-${this.documentType}`]:this.documentType}]},overlayClasses(){return["overlay-content",{"overlay-visible":this.showOverlay}]},contentClasses(){return["content-wrapper",{"no-media":!this.hasMedia}]},titleClasses(){return["title",{"title-large":this.variant==="featured","title-small":this.variant==="compact"}]},subtitleClasses(){return["subtitle",{"subtitle-muted":this.variant!=="featured"}]},mainContentClasses(){return["main-content",{"content-expanded":this.variant==="detailed"}]},metadataClasses(){return["metadata-container",{"metadata-inline":this.variant==="compact","metadata-grid":this.variant==="detailed"}]},tagClasses(){return["tag-item",{"tag-small":this.variant==="compact","tag-large":this.variant==="featured"}]},documentIcon(){return{pdf:"fas fa-file-pdf",doc:"fas fa-file-word",docx:"fas fa-file-word",xls:"fas fa-file-excel",xlsx:"fas fa-file-excel",ppt:"fas fa-file-powerpoint",pptx:"fas fa-file-powerpoint",zip:"fas fa-file-archive",rar:"fas fa-file-archive",txt:"fas fa-file-alt",csv:"fas fa-file-csv",json:"fas fa-file-code",xml:"fas fa-file-code",html:"fas fa-file-code"}[this.documentType]||"fas fa-file"}},methods:{handleAction(e){e.disabled||(this.$emit("action",e),e.handler&&e.handler(e))},getActionClasses(e){return["action-button",`action-${e.variant||"default"}`,{"action-primary":e.primary,"action-disabled":e.disabled,"action-loading":e.loading}]},onMediaLoad(e){this.$emit("media-load",e)},onMediaError(e){this.$emit("media-error",e)},retry(){this.$emit("retry")},formatMetadataLabel(e){return e.replace(/([A-Z])/g," $1").replace(/^./,l=>l.toUpperCase()).trim()},formatMetadataValue(e){return e instanceof Date?e.toLocaleDateString():typeof e=="number"?e.toLocaleString():String(e)},handleClick(e){this.clickable&&this.$emit("click",e),this.selectable&&this.$emit("select",!this.selected)}}},de={key:0,class:"image-container"},ce=["src","alt"],ue=["innerHTML"],me={key:1,class:"video-container"},pe=["src","controls","autoplay","muted","loop"],fe=["innerHTML"],ve={key:2,class:"audio-container"},he=["src","controls","autoplay","muted","loop"],ge={key:3,class:"document-container"},ye={class:"document-info"},be={class:"document-name"},Ce={class:"document-size"},we={key:4,class:"custom-media-container"},Se={key:0,class:"card-header"},ke={class:"header-main"},xe={key:0,class:"header-actions"},Me=["onClick","disabled"],Ae={key:0,class:"card-description"},Te={class:"metadata-label"},De={class:"metadata-value"},_e={key:3,class:"card-tags"},Ve={key:4,class:"card-footer"},Le={class:"footer-actions"},Pe=["onClick","disabled"],Re={key:1,class:"loading-overlay"},ze={key:0,class:"loading-text"},Be={key:2,class:"error-overlay"},Oe={class:"error-content"},Ee={class:"error-text"};function Ne(e,l,a,Ie,qe,t){return i(),o("div",{class:s(["m-media-card",t.cardClasses])},[t.hasMedia?(i(),o("div",{key:0,class:s(["media-container",t.mediaContainerClasses])},[a.mediaType==="image"?(i(),o("div",de,[d("img",{src:a.mediaSrc,alt:a.mediaAlt||a.title,class:s(t.imageClasses),onLoad:l[0]||(l[0]=(...n)=>t.onMediaLoad&&t.onMediaLoad(...n)),onError:l[1]||(l[1]=(...n)=>t.onMediaError&&t.onMediaError(...n))},null,42,ce),a.showOverlay?(i(),o("div",{key:0,class:s(["media-overlay",t.overlayClasses])},[u(e.$slots,"overlay",{},()=>[a.overlayContent?(i(),o("div",{key:0,innerHTML:a.overlayContent},null,8,ue)):r("",!0)])],2)):r("",!0)])):a.mediaType==="video"?(i(),o("div",me,[d("video",{src:a.mediaSrc,controls:a.videoControls,autoplay:a.videoAutoplay,muted:a.videoMuted,loop:a.videoLoop,class:s(t.videoClasses),onLoadeddata:l[2]||(l[2]=(...n)=>t.onMediaLoad&&t.onMediaLoad(...n)),onError:l[3]||(l[3]=(...n)=>t.onMediaError&&t.onMediaError(...n))}," Your browser does not support video playback. ",42,pe),a.showOverlay?(i(),o("div",{key:0,class:s(["media-overlay",t.overlayClasses])},[u(e.$slots,"overlay",{},()=>[a.overlayContent?(i(),o("div",{key:0,innerHTML:a.overlayContent},null,8,fe)):r("",!0)])],2)):r("",!0)])):a.mediaType==="audio"?(i(),o("div",ve,[d("audio",{src:a.mediaSrc,controls:a.audioControls,autoplay:a.audioAutoplay,muted:a.audioMuted,loop:a.audioLoop,class:s(t.audioClasses),onLoadeddata:l[4]||(l[4]=(...n)=>t.onMediaLoad&&t.onMediaLoad(...n)),onError:l[5]||(l[5]=(...n)=>t.onMediaError&&t.onMediaError(...n))}," Your browser does not support audio playback. ",42,he)])):a.mediaType==="document"?(i(),o("div",ge,[d("div",{class:s(["document-preview",t.documentClasses])},[d("i",{class:s([t.documentIcon,"document-icon"])},null,2),d("div",ye,[d("div",be,c(a.documentName||"Document"),1),d("div",Ce,c(a.documentSize),1)])],2)])):a.mediaType==="custom"?(i(),o("div",we,[u(e.$slots,"media")])):r("",!0)],2)):r("",!0),d("div",{class:s(["card-content",t.contentClasses])},[t.hasHeader?(i(),o("div",Se,[d("div",ke,[a.title?(i(),o("h3",{key:0,class:s(["card-title",t.titleClasses])},c(a.title),3)):r("",!0),a.subtitle?(i(),o("p",{key:1,class:s(["card-subtitle",t.subtitleClasses])},c(a.subtitle),3)):r("",!0)]),t.hasHeaderActions?(i(),o("div",xe,[u(e.$slots,"header-actions",{},()=>[(i(!0),o(f,null,v(a.headerActions,n=>(i(),o("button",{key:n.id,onClick:p=>t.handleAction(n),class:s(t.getActionClasses(n)),disabled:n.disabled},[n.icon?(i(),o("i",{key:0,class:s([n.icon,"mr-1"])},null,2)):r("",!0),T(" "+c(n.label),1)],10,Me))),128))])])):r("",!0)])):r("",!0),t.hasContent?(i(),o("div",{key:1,class:s(["card-main",t.mainContentClasses])},[u(e.$slots,"default",{},()=>[a.description?(i(),o("p",Ae,c(a.description),1)):r("",!0)])],2)):r("",!0),t.hasMetadata?(i(),o("div",{key:2,class:s(["card-metadata",t.metadataClasses])},[(i(!0),o(f,null,v(a.metadata,(n,p)=>(i(),o("div",{key:p,class:"metadata-item"},[d("span",Te,c(t.formatMetadataLabel(p))+":",1),d("span",De,c(t.formatMetadataValue(n)),1)]))),128))],2)):r("",!0),t.hasTags?(i(),o("div",_e,[(i(!0),o(f,null,v(a.tags,n=>(i(),o("span",{key:n,class:s(["tag",t.tagClasses])},c(n),3))),128))])):r("",!0),t.hasFooterActions?(i(),o("div",Ve,[u(e.$slots,"footer-actions",{},()=>[d("div",Le,[(i(!0),o(f,null,v(a.footerActions,n=>(i(),o("button",{key:n.id,onClick:p=>t.handleAction(n),class:s(t.getActionClasses(n)),disabled:n.disabled},[n.icon?(i(),o("i",{key:0,class:s([n.icon,"mr-1"])},null,2)):r("",!0),T(" "+c(n.label),1)],10,Pe))),128))])])])):r("",!0)],2),a.loading?(i(),o("div",Re,[l[7]||(l[7]=d("div",{class:"loading-spinner"},null,-1)),a.loadingText?(i(),o("div",ze,c(a.loadingText),1)):r("",!0)])):r("",!0),a.error?(i(),o("div",Be,[d("div",Oe,[l[9]||(l[9]=d("i",{class:"fas fa-exclamation-triangle error-icon"},null,-1)),d("div",Ee,c(a.error),1),a.retryable?(i(),o("button",{key:0,onClick:l[6]||(l[6]=(...n)=>t.retry&&t.retry(...n)),class:"retry-button"},l[8]||(l[8]=[d("i",{class:"fas fa-redo mr-1"},null,-1),T(" Retry ")]))):r("",!0)])])):r("",!0)],2)}const m=se(re,[["render",Ne]]);re.__docgenInfo={displayName:"MMediaCard",exportName:"default",description:"",tags:{},props:[{name:"mediaType",type:{name:"string"},defaultValue:{func:!1,value:"null"},values:["image","video","audio","document","custom"]},{name:"mediaSrc",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"mediaAlt",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"videoControls",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"videoAutoplay",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"videoMuted",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"videoLoop",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"audioControls",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"audioAutoplay",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"audioMuted",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"audioLoop",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"documentName",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"documentSize",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"documentType",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"title",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"subtitle",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"description",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"metadata",type:{name:"object"},defaultValue:{func:!1,value:"{}"}},{name:"tags",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"headerActions",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"footerActions",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"showOverlay",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"overlayContent",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"variant",type:{name:"string"},defaultValue:{func:!1,value:"'default'"},values:["default","compact","featured","minimal","detailed"]},{name:"orientation",type:{name:"string"},defaultValue:{func:!1,value:"'vertical'"},values:["vertical","horizontal"]},{name:"aspectRatio",type:{name:"string"},defaultValue:{func:!1,value:"'16/9'"},values:["1/1","4/3","16/9","3/2","auto"]},{name:"elevation",type:{name:"string|number"},defaultValue:{func:!1,value:"1"},values:[1,2,3,4,5]},{name:"rounded",type:{name:"boolean|string"},defaultValue:{func:!1,value:"true"}},{name:"bordered",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loading",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"loadingText",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"error",type:{name:"string"},defaultValue:{func:!1,value:"null"}},{name:"retryable",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"clickable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"selectable",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}},{name:"selected",type:{name:"boolean"},defaultValue:{func:!1,value:"false"}}],events:[{name:"click",type:{names:["undefined"]}},{name:"media-load",type:{names:["undefined"]}},{name:"media-error",type:{names:["undefined"]}},{name:"action",type:{names:["undefined"]}},{name:"retry"},{name:"select",type:{names:["undefined"]}}],slots:[{name:"overlay"},{name:"media"},{name:"header-actions"},{name:"default"},{name:"footer-actions"}],sourceFiles:["C:/Users/bradl/OneDrive/Documents/GitHub/bmc-navigator-component/src/components/ui/MMediaCard.vue"]};const je={title:"UI Components/Media Card",component:m,parameters:{docs:{description:{component:"Versatile media card component supporting images, videos, audio, documents, and custom media with overlay support, actions, and multiple layout variants."}}},argTypes:{variant:{control:{type:"select"},options:["default","compact","featured","minimal","detailed"]},orientation:{control:{type:"select"},options:["vertical","horizontal"]},aspectRatio:{control:{type:"select"},options:["1/1","4/3","16/9","3/2","auto"]},elevation:{control:{type:"select"},options:[0,1,2,3,4,5]}}},Fe=[{id:"edit",label:"Edit",icon:"fas fa-edit",variant:"default"},{id:"share",label:"Share",icon:"fas fa-share",variant:"default"},{id:"delete",label:"Delete",icon:"fas fa-trash",variant:"default"}],He={fileSize:"2.4 MB",lastModified:new Date("2024-01-15"),author:"John Doe",category:"Financial Documents"},h={args:{mediaType:"image",mediaSrc:"https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",mediaAlt:"Modern office building",title:"Corporate Headquarters",subtitle:"Main Office Location",description:"Our state-of-the-art corporate headquarters featuring modern architecture and sustainable design principles.",metadata:{location:"New York, NY",floors:25,yearBuilt:2020,squareFeet:"500,000 sq ft"},tags:["Corporate","Real Estate","Headquarters"],footerActions:Fe,variant:"default",elevation:2,aspectRatio:"16/9"}},g={args:{mediaType:"video",mediaSrc:"https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4",title:"Product Demo Video",subtitle:"New Features Overview",description:"Comprehensive walkthrough of our latest product features and improvements.",metadata:{duration:"3:45",quality:"1080p HD",uploadDate:new Date("2024-01-10")},tags:["Demo","Product","Tutorial"],headerActions:[{id:"fullscreen",label:"Fullscreen",icon:"fas fa-expand"}],footerActions:[{id:"like",label:"Like",icon:"fas fa-thumbs-up"},{id:"share",label:"Share",icon:"fas fa-share"}],videoControls:!0,videoMuted:!0,variant:"featured"}},y={args:{mediaType:"audio",mediaSrc:"https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",title:"Quarterly Earnings Call",subtitle:"Q4 2023 Results",description:"Audio recording of our quarterly earnings call discussing financial performance and future outlook.",metadata:{duration:"45:30",recordedDate:new Date("2024-01-08"),participants:12,fileFormat:"MP3"},tags:["Earnings","Financial","Audio"],footerActions:[{id:"download",label:"Download",icon:"fas fa-download"},{id:"transcript",label:"Transcript",icon:"fas fa-file-alt"}],audioControls:!0,variant:"detailed"}},b={args:{mediaType:"document",documentName:"Financial_Report_Q4_2023.pdf",documentSize:"2.4 MB",documentType:"pdf",title:"Q4 2023 Financial Report",subtitle:"Annual Financial Summary",description:"Comprehensive financial report covering Q4 2023 performance, including revenue, expenses, and projections for 2024.",metadata:He,tags:["Financial","Report","Q4 2023"],headerActions:[{id:"preview",label:"Preview",icon:"fas fa-eye"}],footerActions:[{id:"download",label:"Download",icon:"fas fa-download",primary:!0},{id:"share",label:"Share",icon:"fas fa-share"},{id:"print",label:"Print",icon:"fas fa-print"}],variant:"default"}},C={args:{mediaType:"image",mediaSrc:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=150&fit=crop",title:"Budget Analysis",subtitle:"Monthly Review",description:"Quick overview of monthly budget performance.",tags:["Budget","Analysis"],footerActions:[{id:"view",label:"View",icon:"fas fa-eye"}],variant:"compact",elevation:1,aspectRatio:"4/3"}},w={args:{mediaType:"image",mediaSrc:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",title:"Market Analysis Dashboard",subtitle:"Real-time Data Visualization",description:"Interactive dashboard showing real-time market data, trends, and analytics for informed decision making.",metadata:{lastUpdated:new Date,dataPoints:"1.2M",refreshRate:"30 seconds"},tags:["Dashboard","Analytics","Real-time"],footerActions:[{id:"open",label:"Open Dashboard",icon:"fas fa-external-link-alt",primary:!0}],orientation:"horizontal",variant:"default",elevation:3}},S={args:{mediaType:"image",mediaSrc:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",title:"Investment Portfolio",subtitle:"Performance Overview",showOverlay:!0,overlayContent:'<div class="text-center"><h3 class="text-lg font-bold mb-2">+15.3% Growth</h3><p>Portfolio performance this quarter</p></div>',description:"Comprehensive view of investment portfolio performance with detailed analytics.",metadata:{totalValue:"$125,000",growth:"+15.3%",riskLevel:"Moderate"},tags:["Investment","Portfolio","Growth"],variant:"featured",aspectRatio:"16/9"}},k={render:()=>({components:{MMediaCard:m},data(){return{selectedCards:new Set,cards:[{id:1,mediaType:"document",documentName:"loan_application.pdf",documentType:"pdf",title:"Loan Application",description:"Personal loan application form"},{id:2,mediaType:"document",documentName:"credit_report.pdf",documentType:"pdf",title:"Credit Report",description:"Latest credit score report"},{id:3,mediaType:"document",documentName:"income_verification.pdf",documentType:"pdf",title:"Income Verification",description:"Employment and income documentation"}]}},methods:{handleSelect(e,l){l?this.selectedCards.add(e):this.selectedCards.delete(e)}},template:`
      <div class="space-y-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Select Documents for Processing</h3>
          <p class="text-gray-600">Choose the documents you want to include in your loan application.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MMediaCard
            v-for="card in cards"
            :key="card.id"
            v-bind="card"
            selectable
            :selected="selectedCards.has(card.id)"
            @select="handleSelect(card.id, $event)"
            variant="compact"
            elevation="1"
          />
        </div>
        
        <div v-if="selectedCards.size > 0" class="mt-4 p-4 bg-blue-50 rounded-lg">
          <p class="text-blue-800">
            Selected {{ selectedCards.size }} document(s) for processing.
          </p>
        </div>
      </div>
    `})},x={render:()=>({components:{MMediaCard:m},data(){return{loadingCard:!0,errorCard:!1,loadingText:"Processing document..."}},methods:{toggleLoading(){this.loadingCard=!this.loadingCard},simulateError(){this.errorCard=!0,this.loadingCard=!1},retry(){this.errorCard=!1,this.loadingCard=!0,setTimeout(()=>{this.loadingCard=!1},2e3)}},template:`
      <div class="space-y-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Loading and Error States</h3>
          <div class="space-x-2">
            <button @click="toggleLoading" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {{ loadingCard ? 'Stop Loading' : 'Start Loading' }}
            </button>
            <button @click="simulateError" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Simulate Error
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MMediaCard
            mediaType="document"
            documentName="processing_document.pdf"
            documentType="pdf"
            title="Document Processing"
            subtitle="Status: In Progress"
            description="Document is being processed for verification."
            :loading="loadingCard"
            :loading-text="loadingText"
            variant="default"
          />
          
          <MMediaCard
            mediaType="document"
            documentName="failed_document.pdf"
            documentType="pdf"
            title="Failed Processing"
            subtitle="Status: Error"
            description="Document processing encountered an error."
            :error="errorCard ? 'Processing failed due to invalid format' : null"
            :retryable="true"
            @retry="retry"
            variant="default"
          />
        </div>
      </div>
    `})},M={render:()=>({components:{MMediaCard:m},data(){return{variant:"default",orientation:"vertical",aspectRatio:"16/9",elevation:2,showOverlay:!1,bordered:!1,clickable:!0}},computed:{cardProps(){return{mediaType:"image",mediaSrc:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",title:"Interactive Card Demo",subtitle:"Customize the appearance",description:"Use the controls below to modify this card's appearance and behavior.",metadata:{variant:this.variant,orientation:this.orientation,aspectRatio:this.aspectRatio},tags:["Demo","Interactive","Customizable"],footerActions:[{id:"action1",label:"Action 1",icon:"fas fa-cog"},{id:"action2",label:"Action 2",icon:"fas fa-star"}],variant:this.variant,orientation:this.orientation,aspectRatio:this.aspectRatio,elevation:this.elevation,showOverlay:this.showOverlay,bordered:this.bordered,clickable:this.clickable}}},methods:{handleAction(e){alert(`Action clicked: ${e.label}`)},handleClick(){alert("Card was clicked!")}},template:`
      <div class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Card Customization</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Variant</label>
              <select v-model="variant" class="w-full border rounded px-2 py-1">
                <option value="default">Default</option>
                <option value="compact">Compact</option>
                <option value="featured">Featured</option>
                <option value="minimal">Minimal</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Orientation</label>
              <select v-model="orientation" class="w-full border rounded px-2 py-1">
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Aspect Ratio</label>
              <select v-model="aspectRatio" class="w-full border rounded px-2 py-1">
                <option value="1/1">1:1 Square</option>
                <option value="4/3">4:3 Standard</option>
                <option value="16/9">16:9 Widescreen</option>
                <option value="3/2">3:2 Photo</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Elevation</label>
              <select v-model.number="elevation" class="w-full border rounded px-2 py-1">
                <option :value="0">0 - None</option>
                <option :value="1">1 - Subtle</option>
                <option :value="2">2 - Small</option>
                <option :value="3">3 - Medium</option>
                <option :value="4">4 - Large</option>
                <option :value="5">5 - Extra Large</option>
              </select>
            </div>
          </div>
          
          <div class="mt-4 flex space-x-4">
            <label class="flex items-center">
              <input type="checkbox" v-model="showOverlay" class="mr-2">
              Show Overlay
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="bordered" class="mr-2">
              Bordered
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="clickable" class="mr-2">
              Clickable
            </label>
          </div>
        </div>
        
        <div class="max-w-md mx-auto">
          <MMediaCard
            v-bind="cardProps"
            @action="handleAction"
            @click="handleClick"
          />
        </div>
      </div>
    `})},A={render:()=>({components:{MMediaCard:m},data(){return{documents:[{id:1,mediaType:"document",documentName:"loan_agreement.pdf",documentType:"pdf",documentSize:"1.2 MB",title:"Loan Agreement",subtitle:"Personal Loan - $25,000",description:"Comprehensive loan agreement including terms, conditions, and payment schedule.",metadata:{loanAmount:"$25,000",interestRate:"8.5%",term:"36 months",monthlyPayment:"$789"},tags:["Loan","Agreement","Legal"],status:"active"},{id:2,mediaType:"image",mediaSrc:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",title:"Payment History",subtitle:"Last 12 Months",description:"Visual representation of payment history and trends over the past year.",metadata:{onTimePayments:"11/12",totalPaid:"$8,868",nextPayment:"Mar 15, 2024"},tags:["Payment","History","Chart"],status:"current"},{id:3,mediaType:"document",documentName:"credit_score_report.pdf",documentType:"pdf",documentSize:"856 KB",title:"Credit Score Report",subtitle:"Score: 742 (Good)",description:"Detailed credit report including score breakdown and improvement recommendations.",metadata:{creditScore:742,rating:"Good",lastUpdated:new Date("2024-01-15"),previousScore:728},tags:["Credit","Score","Report"],status:"updated"}]}},methods:{getStatusBadge(e){return{active:"bg-green-100 text-green-800",current:"bg-blue-100 text-blue-800",updated:"bg-yellow-100 text-yellow-800"}[e]||"bg-gray-100 text-gray-800"},handleDocumentAction(e,l){switch(console.log(`Action ${e.id} on document:`,l.title),e.id){case"view":alert(`Opening ${l.title}`);break;case"download":alert(`Downloading ${l.title}`);break;case"share":alert(`Sharing ${l.title}`);break}}},template:`
      <div class="space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Financial Document Gallery</h2>
          <p class="text-gray-600">Manage your loan documents and financial reports</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MMediaCard
            v-for="doc in documents"
            :key="doc.id"
            v-bind="doc"
            :footer-actions="[
              { id: 'view', label: 'View', icon: 'fas fa-eye', variant: 'primary' },
              { id: 'download', label: 'Download', icon: 'fas fa-download' },
              { id: 'share', label: 'Share', icon: 'fas fa-share' }
            ]"
            @action="handleDocumentAction($event, doc)"
            variant="default"
            elevation="2"
            clickable
            class="hover:shadow-lg transition-shadow"
          >
            <template #header-actions>
              <span :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusBadge(doc.status)]">
                {{ doc.status.charAt(0).toUpperCase() + doc.status.slice(1) }}
              </span>
            </template>
          </MMediaCard>
        </div>
      </div>
    `})};var D,_,V;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    mediaType: 'image',
    mediaSrc: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    mediaAlt: 'Modern office building',
    title: 'Corporate Headquarters',
    subtitle: 'Main Office Location',
    description: 'Our state-of-the-art corporate headquarters featuring modern architecture and sustainable design principles.',
    metadata: {
      location: 'New York, NY',
      floors: 25,
      yearBuilt: 2020,
      squareFeet: '500,000 sq ft'
    },
    tags: ['Corporate', 'Real Estate', 'Headquarters'],
    footerActions: sampleActions,
    variant: 'default',
    elevation: 2,
    aspectRatio: '16/9'
  }
}`,...(V=(_=h.parameters)==null?void 0:_.docs)==null?void 0:V.source}}};var L,P,R;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    mediaType: 'video',
    mediaSrc: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4',
    title: 'Product Demo Video',
    subtitle: 'New Features Overview',
    description: 'Comprehensive walkthrough of our latest product features and improvements.',
    metadata: {
      duration: '3:45',
      quality: '1080p HD',
      uploadDate: new Date('2024-01-10')
    },
    tags: ['Demo', 'Product', 'Tutorial'],
    headerActions: [{
      id: 'fullscreen',
      label: 'Fullscreen',
      icon: 'fas fa-expand'
    }],
    footerActions: [{
      id: 'like',
      label: 'Like',
      icon: 'fas fa-thumbs-up'
    }, {
      id: 'share',
      label: 'Share',
      icon: 'fas fa-share'
    }],
    videoControls: true,
    videoMuted: true,
    variant: 'featured'
  }
}`,...(R=(P=g.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var z,B,O;y.parameters={...y.parameters,docs:{...(z=y.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    mediaType: 'audio',
    mediaSrc: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    title: 'Quarterly Earnings Call',
    subtitle: 'Q4 2023 Results',
    description: 'Audio recording of our quarterly earnings call discussing financial performance and future outlook.',
    metadata: {
      duration: '45:30',
      recordedDate: new Date('2024-01-08'),
      participants: 12,
      fileFormat: 'MP3'
    },
    tags: ['Earnings', 'Financial', 'Audio'],
    footerActions: [{
      id: 'download',
      label: 'Download',
      icon: 'fas fa-download'
    }, {
      id: 'transcript',
      label: 'Transcript',
      icon: 'fas fa-file-alt'
    }],
    audioControls: true,
    variant: 'detailed'
  }
}`,...(O=(B=y.parameters)==null?void 0:B.docs)==null?void 0:O.source}}};var E,N,F;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    mediaType: 'document',
    documentName: 'Financial_Report_Q4_2023.pdf',
    documentSize: '2.4 MB',
    documentType: 'pdf',
    title: 'Q4 2023 Financial Report',
    subtitle: 'Annual Financial Summary',
    description: 'Comprehensive financial report covering Q4 2023 performance, including revenue, expenses, and projections for 2024.',
    metadata: sampleMetadata,
    tags: ['Financial', 'Report', 'Q4 2023'],
    headerActions: [{
      id: 'preview',
      label: 'Preview',
      icon: 'fas fa-eye'
    }],
    footerActions: [{
      id: 'download',
      label: 'Download',
      icon: 'fas fa-download',
      primary: true
    }, {
      id: 'share',
      label: 'Share',
      icon: 'fas fa-share'
    }, {
      id: 'print',
      label: 'Print',
      icon: 'fas fa-print'
    }],
    variant: 'default'
  }
}`,...(F=(N=b.parameters)==null?void 0:N.docs)==null?void 0:F.source}}};var H,I,q;C.parameters={...C.parameters,docs:{...(H=C.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    mediaType: 'image',
    mediaSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=150&fit=crop',
    title: 'Budget Analysis',
    subtitle: 'Monthly Review',
    description: 'Quick overview of monthly budget performance.',
    tags: ['Budget', 'Analysis'],
    footerActions: [{
      id: 'view',
      label: 'View',
      icon: 'fas fa-eye'
    }],
    variant: 'compact',
    elevation: 1,
    aspectRatio: '4/3'
  }
}`,...(q=(I=C.parameters)==null?void 0:I.docs)==null?void 0:q.source}}};var Q,G,j;w.parameters={...w.parameters,docs:{...(Q=w.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    mediaType: 'image',
    mediaSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
    title: 'Market Analysis Dashboard',
    subtitle: 'Real-time Data Visualization',
    description: 'Interactive dashboard showing real-time market data, trends, and analytics for informed decision making.',
    metadata: {
      lastUpdated: new Date(),
      dataPoints: '1.2M',
      refreshRate: '30 seconds'
    },
    tags: ['Dashboard', 'Analytics', 'Real-time'],
    footerActions: [{
      id: 'open',
      label: 'Open Dashboard',
      icon: 'fas fa-external-link-alt',
      primary: true
    }],
    orientation: 'horizontal',
    variant: 'default',
    elevation: 3
  }
}`,...(j=(G=w.parameters)==null?void 0:G.docs)==null?void 0:j.source}}};var U,Y,W;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    mediaType: 'image',
    mediaSrc: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    title: 'Investment Portfolio',
    subtitle: 'Performance Overview',
    showOverlay: true,
    overlayContent: '<div class="text-center"><h3 class="text-lg font-bold mb-2">+15.3% Growth</h3><p>Portfolio performance this quarter</p></div>',
    description: 'Comprehensive view of investment portfolio performance with detailed analytics.',
    metadata: {
      totalValue: '$125,000',
      growth: '+15.3%',
      riskLevel: 'Moderate'
    },
    tags: ['Investment', 'Portfolio', 'Growth'],
    variant: 'featured',
    aspectRatio: '16/9'
  }
}`,...(W=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:W.source}}};var K,J,Z;k.parameters={...k.parameters,docs:{...(K=k.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MMediaCard
    },
    data() {
      return {
        selectedCards: new Set(),
        cards: [{
          id: 1,
          mediaType: 'document',
          documentName: 'loan_application.pdf',
          documentType: 'pdf',
          title: 'Loan Application',
          description: 'Personal loan application form'
        }, {
          id: 2,
          mediaType: 'document',
          documentName: 'credit_report.pdf',
          documentType: 'pdf',
          title: 'Credit Report',
          description: 'Latest credit score report'
        }, {
          id: 3,
          mediaType: 'document',
          documentName: 'income_verification.pdf',
          documentType: 'pdf',
          title: 'Income Verification',
          description: 'Employment and income documentation'
        }]
      };
    },
    methods: {
      handleSelect(cardId, selected) {
        if (selected) {
          this.selectedCards.add(cardId);
        } else {
          this.selectedCards.delete(cardId);
        }
      }
    },
    template: \`
      <div class="space-y-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Select Documents for Processing</h3>
          <p class="text-gray-600">Choose the documents you want to include in your loan application.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MMediaCard
            v-for="card in cards"
            :key="card.id"
            v-bind="card"
            selectable
            :selected="selectedCards.has(card.id)"
            @select="handleSelect(card.id, $event)"
            variant="compact"
            elevation="1"
          />
        </div>
        
        <div v-if="selectedCards.size > 0" class="mt-4 p-4 bg-blue-50 rounded-lg">
          <p class="text-blue-800">
            Selected {{ selectedCards.size }} document(s) for processing.
          </p>
        </div>
      </div>
    \`
  })
}`,...(Z=(J=k.parameters)==null?void 0:J.docs)==null?void 0:Z.source}}};var X,$,ee;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MMediaCard
    },
    data() {
      return {
        loadingCard: true,
        errorCard: false,
        loadingText: 'Processing document...'
      };
    },
    methods: {
      toggleLoading() {
        this.loadingCard = !this.loadingCard;
      },
      simulateError() {
        this.errorCard = true;
        this.loadingCard = false;
      },
      retry() {
        this.errorCard = false;
        this.loadingCard = true;
        setTimeout(() => {
          this.loadingCard = false;
        }, 2000);
      }
    },
    template: \`
      <div class="space-y-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Loading and Error States</h3>
          <div class="space-x-2">
            <button @click="toggleLoading" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {{ loadingCard ? 'Stop Loading' : 'Start Loading' }}
            </button>
            <button @click="simulateError" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Simulate Error
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MMediaCard
            mediaType="document"
            documentName="processing_document.pdf"
            documentType="pdf"
            title="Document Processing"
            subtitle="Status: In Progress"
            description="Document is being processed for verification."
            :loading="loadingCard"
            :loading-text="loadingText"
            variant="default"
          />
          
          <MMediaCard
            mediaType="document"
            documentName="failed_document.pdf"
            documentType="pdf"
            title="Failed Processing"
            subtitle="Status: Error"
            description="Document processing encountered an error."
            :error="errorCard ? 'Processing failed due to invalid format' : null"
            :retryable="true"
            @retry="retry"
            variant="default"
          />
        </div>
      </div>
    \`
  })
}`,...(ee=($=x.parameters)==null?void 0:$.docs)==null?void 0:ee.source}}};var ae,te,ne;M.parameters={...M.parameters,docs:{...(ae=M.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MMediaCard
    },
    data() {
      return {
        variant: 'default',
        orientation: 'vertical',
        aspectRatio: '16/9',
        elevation: 2,
        showOverlay: false,
        bordered: false,
        clickable: true
      };
    },
    computed: {
      cardProps() {
        return {
          mediaType: 'image',
          mediaSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
          title: 'Interactive Card Demo',
          subtitle: 'Customize the appearance',
          description: 'Use the controls below to modify this card\\'s appearance and behavior.',
          metadata: {
            variant: this.variant,
            orientation: this.orientation,
            aspectRatio: this.aspectRatio
          },
          tags: ['Demo', 'Interactive', 'Customizable'],
          footerActions: [{
            id: 'action1',
            label: 'Action 1',
            icon: 'fas fa-cog'
          }, {
            id: 'action2',
            label: 'Action 2',
            icon: 'fas fa-star'
          }],
          variant: this.variant,
          orientation: this.orientation,
          aspectRatio: this.aspectRatio,
          elevation: this.elevation,
          showOverlay: this.showOverlay,
          bordered: this.bordered,
          clickable: this.clickable
        };
      }
    },
    methods: {
      handleAction(action) {
        alert(\`Action clicked: \${action.label}\`);
      },
      handleClick() {
        alert('Card was clicked!');
      }
    },
    template: \`
      <div class="space-y-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Card Customization</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Variant</label>
              <select v-model="variant" class="w-full border rounded px-2 py-1">
                <option value="default">Default</option>
                <option value="compact">Compact</option>
                <option value="featured">Featured</option>
                <option value="minimal">Minimal</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Orientation</label>
              <select v-model="orientation" class="w-full border rounded px-2 py-1">
                <option value="vertical">Vertical</option>
                <option value="horizontal">Horizontal</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Aspect Ratio</label>
              <select v-model="aspectRatio" class="w-full border rounded px-2 py-1">
                <option value="1/1">1:1 Square</option>
                <option value="4/3">4:3 Standard</option>
                <option value="16/9">16:9 Widescreen</option>
                <option value="3/2">3:2 Photo</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Elevation</label>
              <select v-model.number="elevation" class="w-full border rounded px-2 py-1">
                <option :value="0">0 - None</option>
                <option :value="1">1 - Subtle</option>
                <option :value="2">2 - Small</option>
                <option :value="3">3 - Medium</option>
                <option :value="4">4 - Large</option>
                <option :value="5">5 - Extra Large</option>
              </select>
            </div>
          </div>
          
          <div class="mt-4 flex space-x-4">
            <label class="flex items-center">
              <input type="checkbox" v-model="showOverlay" class="mr-2">
              Show Overlay
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="bordered" class="mr-2">
              Bordered
            </label>
            <label class="flex items-center">
              <input type="checkbox" v-model="clickable" class="mr-2">
              Clickable
            </label>
          </div>
        </div>
        
        <div class="max-w-md mx-auto">
          <MMediaCard
            v-bind="cardProps"
            @action="handleAction"
            @click="handleClick"
          />
        </div>
      </div>
    \`
  })
}`,...(ne=(te=M.parameters)==null?void 0:te.docs)==null?void 0:ne.source}}};var oe,ie,le;A.parameters={...A.parameters,docs:{...(oe=A.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MMediaCard
    },
    data() {
      return {
        documents: [{
          id: 1,
          mediaType: 'document',
          documentName: 'loan_agreement.pdf',
          documentType: 'pdf',
          documentSize: '1.2 MB',
          title: 'Loan Agreement',
          subtitle: 'Personal Loan - $25,000',
          description: 'Comprehensive loan agreement including terms, conditions, and payment schedule.',
          metadata: {
            loanAmount: '$25,000',
            interestRate: '8.5%',
            term: '36 months',
            monthlyPayment: '$789'
          },
          tags: ['Loan', 'Agreement', 'Legal'],
          status: 'active'
        }, {
          id: 2,
          mediaType: 'image',
          mediaSrc: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
          title: 'Payment History',
          subtitle: 'Last 12 Months',
          description: 'Visual representation of payment history and trends over the past year.',
          metadata: {
            onTimePayments: '11/12',
            totalPaid: '$8,868',
            nextPayment: 'Mar 15, 2024'
          },
          tags: ['Payment', 'History', 'Chart'],
          status: 'current'
        }, {
          id: 3,
          mediaType: 'document',
          documentName: 'credit_score_report.pdf',
          documentType: 'pdf',
          documentSize: '856 KB',
          title: 'Credit Score Report',
          subtitle: 'Score: 742 (Good)',
          description: 'Detailed credit report including score breakdown and improvement recommendations.',
          metadata: {
            creditScore: 742,
            rating: 'Good',
            lastUpdated: new Date('2024-01-15'),
            previousScore: 728
          },
          tags: ['Credit', 'Score', 'Report'],
          status: 'updated'
        }]
      };
    },
    methods: {
      getStatusBadge(status) {
        const badges = {
          active: 'bg-green-100 text-green-800',
          current: 'bg-blue-100 text-blue-800',
          updated: 'bg-yellow-100 text-yellow-800'
        };
        return badges[status] || 'bg-gray-100 text-gray-800';
      },
      handleDocumentAction(action, document) {
        console.log(\`Action \${action.id} on document:\`, document.title);
        switch (action.id) {
          case 'view':
            alert(\`Opening \${document.title}\`);
            break;
          case 'download':
            alert(\`Downloading \${document.title}\`);
            break;
          case 'share':
            alert(\`Sharing \${document.title}\`);
            break;
        }
      }
    },
    template: \`
      <div class="space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Financial Document Gallery</h2>
          <p class="text-gray-600">Manage your loan documents and financial reports</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MMediaCard
            v-for="doc in documents"
            :key="doc.id"
            v-bind="doc"
            :footer-actions="[
              { id: 'view', label: 'View', icon: 'fas fa-eye', variant: 'primary' },
              { id: 'download', label: 'Download', icon: 'fas fa-download' },
              { id: 'share', label: 'Share', icon: 'fas fa-share' }
            ]"
            @action="handleDocumentAction($event, doc)"
            variant="default"
            elevation="2"
            clickable
            class="hover:shadow-lg transition-shadow"
          >
            <template #header-actions>
              <span :class="['px-2 py-1 text-xs font-medium rounded-full', getStatusBadge(doc.status)]">
                {{ doc.status.charAt(0).toUpperCase() + doc.status.slice(1) }}
              </span>
            </template>
          </MMediaCard>
        </div>
      </div>
    \`
  })
}`,...(le=(ie=A.parameters)==null?void 0:ie.docs)==null?void 0:le.source}}};const Ue=["ImageCard","VideoCard","AudioCard","DocumentCard","CompactVariant","HorizontalLayout","WithOverlay","SelectableCards","LoadingStates","InteractiveDemo","FinancialDocumentGallery"];export{y as AudioCard,C as CompactVariant,b as DocumentCard,A as FinancialDocumentGallery,w as HorizontalLayout,h as ImageCard,M as InteractiveDemo,x as LoadingStates,k as SelectableCards,g as VideoCard,S as WithOverlay,Ue as __namedExportsOrder,je as default};
