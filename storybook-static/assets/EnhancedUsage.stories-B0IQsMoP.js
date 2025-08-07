import{k as X,C as Y,p as Z,B as ee,Q as te,z as U,a as ae,W as ne,r as p,G as H}from"./vue.esm-bundler-BOts1VAj.js";import{E as re,F as se}from"./ECFRNavigator-D-HAEfL4.js";import{u as G}from"./ECFRSection-CJFRE6S2.js";import{_ as oe}from"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ECFRBreadcrumb-D9-R7w7A.js";import"./pinia-C5ekiB_t.js";const J={name:"ECFRNavigatorWrapper",components:{ECFRNavigator:re},props:{data:{type:Array,default:()=>[]},dataUrl:{type:String,default:""},dataUrls:{type:Array,default:()=>[]},options:{type:Object,default:()=>({})},showNavigator:{type:Boolean,default:!0},preloadStrategy:{type:String,default:"lazy",validator:e=>["lazy","eager","worker"].includes(e)}},data(){return{selectedItem:null,metadata:null,processedMetadata:null,loading:!1,errors:[],hasInitialized:!1,worker:null}},computed:{navigatorOptions(){return{viewMode:"styleless",showMetadata:!0,expandOnSelect:!0,...this.options}},ecfrStore(){return G()}},watch:{data:{handler(e){e&&e.length>0&&this.setData(e)},deep:!0}},created(){this.preloadStrategy==="eager"&&this.initializeData(),this.preloadStrategy==="worker"&&typeof Worker<"u"&&this.setupWorker()},mounted(){!this.hasInitialized&&this.preloadStrategy!=="worker"&&this.initializeData(),this.$watch(()=>this.ecfrStore.currentItem,e=>{e&&(this.selectedItem=e,this.updateMetadata())})},beforeUnmount(){this.worker&&(this.worker.terminate(),this.worker=null)},methods:{initializeData(){this.data&&this.data.length>0?this.setData(this.data):(this.dataUrl||this.dataUrls&&this.dataUrls.length>0)&&this.loadData(),this.hasInitialized=!0},setData(e){this.ecfrStore.setRootItems(e),e.length>0&&!this.selectedItem&&(this.selectedItem=e[0],this.updateMetadata())},async loadData(){this.loading=!0,this.errors=[];try{const e=[];this.dataUrl&&e.push(this.dataUrl),this.dataUrls&&this.dataUrls.length&&e.push(...this.dataUrls);const o=await Promise.all(e.map(n=>fetch(n).then(a=>{if(!a.ok)throw new Error(`Failed to load ${n}: ${a.status} ${a.statusText}`);return a.json()}))),r=[];o.forEach(n=>{Array.isArray(n)?r.push(...n):n&&typeof n=="object"&&(Array.isArray(n.items)?r.push(...n.items):r.push(n))}),this.setData(r),this.$emit("data-loaded",r)}catch(e){console.error("Error loading data:",e),this.errors.push(e.message),this.$emit("load-error",e)}finally{this.loading=!1}},setupWorker(){const e=`
        self.onmessage = function(e) {
          const urls = e.data;
          
          Promise.all(
            urls.map(url => 
              fetch(url)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Failed to load ' + url + ': ' + response.status);
                  }
                  return response.json();
                })
            )
          )
          .then(results => {
            self.postMessage({ type: 'success', data: results });
          })
          .catch(error => {
            self.postMessage({ type: 'error', error: error.message });
          });
        };
      `,o=new Blob([e],{type:"application/javascript"});this.worker=new Worker(URL.createObjectURL(o)),this.worker.onmessage=n=>{if(n.data.type==="success"){const a=[];n.data.data.forEach(t=>{Array.isArray(t)?a.push(...t):t&&typeof t=="object"&&(Array.isArray(t.items)?a.push(...t.items):a.push(t))}),this.setData(a),this.$emit("data-loaded",a),this.loading=!1}else n.data.type==="error"&&(console.error("Worker error:",n.data.error),this.errors.push(n.data.error),this.$emit("load-error",new Error(n.data.error)),this.loading=!1)},this.loading=!0;const r=[];this.dataUrl&&r.push(this.dataUrl),this.dataUrls&&this.dataUrls.length&&r.push(...this.dataUrls),r.length>0?this.worker.postMessage(r):this.loading=!1},handleItemSelected(e){this.selectedItem=e.item,this.updateMetadata(),this.$emit("item-selected",e)},updateMetadata(){this.selectedItem&&this.selectedItem.id?(this.metadata=this.ecfrStore.getItemMetadata(this.selectedItem.id),this.processedMetadata=this.ecfrStore.processItemMetadata(this.selectedItem.id)):(this.metadata=null,this.processedMetadata=null)},navigateTo(e){return this.ecfrStore.navigateTo(e)},expandItem(e){this.ecfrStore.expandItem(e)},collapseItem(e){this.ecfrStore.collapseItem(e)},expandAll(){this.ecfrStore.expandAll()},collapseAll(){this.ecfrStore.collapseAll()},setItemMetadata(e,o,r){this.ecfrStore.setItemMetadata(e,o,r),this.selectedItem&&this.selectedItem.id===e&&this.updateMetadata()},removeItemMetadata(e,o){this.ecfrStore.removeItemMetadata(e,o),this.selectedItem&&this.selectedItem.id===e&&this.updateMetadata()},registerMetadataProcessor(e,o){this.ecfrStore.registerMetadataProcessor(e,o),this.selectedItem&&this.updateMetadata()},unregisterMetadataProcessor(e){this.ecfrStore.unregisterMetadataProcessor(e),this.selectedItem&&this.updateMetadata()}}},le={class:"ecfr-wrapper"};function ie(e,o,r,n,a,t){const d=te("ECFRNavigator");return U(),X("div",le,[r.showNavigator?(U(),Y(d,{key:0,data:r.data,"data-url":r.dataUrl,"data-urls":r.dataUrls,options:t.navigatorOptions,onItemSelected:t.handleItemSelected},null,8,["data","data-url","data-urls","options","onItemSelected"])):Z("",!0),ee(e.$slots,"default",{selectedItem:a.selectedItem,metadata:a.metadata,processedMetadata:a.processedMetadata,loading:a.loading,errors:a.errors},void 0,!0)])}const y=oe(J,[["render",ie],["__scopeId","data-v-fe22f557"]]);J.__docgenInfo={displayName:"ECFRNavigatorWrapper",exportName:"default",description:"",tags:{},props:[{name:"data",description:"Direct data array to pass to the navigator",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"dataUrl",description:"Single URL to load data from",type:{name:"string"},defaultValue:{func:!1,value:"''"}},{name:"dataUrls",description:"Multiple URLs to load data from",type:{name:"array"},defaultValue:{func:!1,value:"[]"}},{name:"options",description:"Options to configure the navigator",type:{name:"object"},defaultValue:{func:!1,value:"{}"}},{name:"showNavigator",description:"Whether to show the navigator component",type:{name:"boolean"},defaultValue:{func:!1,value:"true"}},{name:"preloadStrategy",description:`Preload strategy - can be 'lazy', 'eager', or 'worker'
- lazy: load when component mounts
- eager: start loading immediately when script executes
- worker: use a web worker for loading (if supported)`,type:{name:"string"},defaultValue:{func:!1,value:"'lazy'"},values:["lazy","eager","worker"]}],events:[{name:"data-loaded",type:{names:["undefined"]}},{name:"load-error",type:{names:["undefined"]}},{name:"item-selected",type:{names:["undefined"]}}],slots:[{name:"default",scoped:!0,bindings:[{name:"selected-item",title:"binding"},{name:"metadata",title:"binding"},{name:"processed-metadata",title:"binding"},{name:"loading",title:"binding"},{name:"errors",title:"binding"}]}],sourceFiles:["C:/Users/bradl/OneDrive/Documents/GitHub/bmc-navigator-component/src/components/ECFRNavigatorWrapper.vue"]};function q(e={}){const{autoExpandSelected:o=!0,onItemSelected:r,onMetadataChanged:n}=e,a=G(),t=ae({currentItem:null,selectedPath:[],rootItems:[],loading:!1,errors:[],metadata:null,processedMetadata:null}),d=()=>{t.currentItem=a.currentItem,t.selectedPath=a.currentPath,t.rootItems=a.rootItems,t.currentItem&&t.currentItem.id?(t.metadata=a.getItemMetadata(t.currentItem.id),t.processedMetadata=a.processItemMetadata(t.currentItem.id)):(t.metadata=null,t.processedMetadata=null)},l=s=>{t.loading=!1,a.setRootItems(s),d()},x=async s=>{if(!s)return;t.loading=!0,t.errors=[];const i=Array.isArray(s)?s:[s];try{const m=await Promise.all(i.map(c=>fetch(c).then(u=>{if(!u.ok)throw new Error(`Failed to load ${c}: ${u.status} ${u.statusText}`);return u.json()}))),v=[];return m.forEach(c=>{Array.isArray(c)?v.push(...c):c&&typeof c=="object"&&(Array.isArray(c.items)?v.push(...c.items):v.push(c))}),l(v),v}catch(m){throw console.error("Error loading data:",m),t.errors.push(m.message),t.loading=!1,m}},M=s=>{if(!s)return!1;const i=R(s);return i&&o&&t.currentItem&&a.expandItem(t.currentItem.id),i&&r&&typeof r=="function"&&r(t.currentItem),i},R=s=>{if(!s)return!1;const i=(m,v,c=[])=>{for(let u=0;u<m.length;u++){const h=m[u];if(h.id===v){const g=[...c,{item:h,index:u}];return a.navigateToPath(g),d(),!0}if(h.children&&h.children.length>0){const g=[...c,{item:h,index:u}];if(i(h.children,v,g))return!0}}return!1};return i(a.rootItems,s)},N=(s,i,m)=>{a.setItemMetadata(s,i,m),t.currentItem&&t.currentItem.id===s&&d(),n&&typeof n=="function"&&n({action:"add",itemId:s,metadataType:m,metadata:i})},C=(s,i)=>{const m=a.getItemMetadata(s,i);a.removeItemMetadata(s,i),t.currentItem&&t.currentItem.id===s&&d(),n&&typeof n=="function"&&n({action:"remove",itemId:s,metadataType:i,oldMetadata:m})},L=(s,i)=>{a.registerMetadataProcessor(s,i),t.currentItem&&d()},F=s=>{a.unregisterMetadataProcessor(s),t.currentItem&&d()},f=(s,i={})=>{const v={...{keys:["label","title","content"],threshold:.4,includeMatches:!0},...i},c=(h,g=[])=>{for(const b of h)g.push(b),b.children&&b.children.length>0&&c(b.children,g);return g},u=c(a.rootItems);return u.length<100||!window.Worker?new se(u,v).search(s):new Promise(h=>{const g=`
        importScripts('https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js');
        
        self.onmessage = function(e) {
          const { items, query, options } = e.data;
          const fuse = new Fuse(items, options);
          const results = fuse.search(query);
          self.postMessage(results);
        };
      `,b=new Blob([g],{type:"application/javascript"}),D=new Worker(URL.createObjectURL(b));D.onmessage=K=>{h(K.data),D.terminate()},D.postMessage({items:u,query:s,options:v})})};return d(),{state:ne(t),store:a,setData:l,loadData:x,selectItem:M,navigateTo:R,expandItem:s=>{a.expandItem(s),d()},collapseItem:s=>{a.collapseItem(s),d()},expandAll:()=>{a.expandAll(),d()},collapseAll:()=>{a.collapseAll(),d()},setItemMetadata:N,removeItemMetadata:C,registerMetadataProcessor:L,unregisterMetadataProcessor:F,findItems:f,get currentItem(){return t.currentItem},get selectedPath(){return t.selectedPath},get rootItems(){return t.rootItems},get metadata(){return t.metadata},get processedMetadata(){return t.processedMetadata},get loading(){return t.loading},get errors(){return t.errors}}}const he={title:"Enhanced/Usage Examples",component:y,parameters:{layout:"fullscreen"}},I=[{id:"item1",title:"Title 1",children:[{id:"item1-1",title:"Section 1.1",content:"<p>This is the content for section 1.1</p>"},{id:"item1-2",title:"Section 1.2",content:"<p>This is the content for section 1.2</p>"}]},{id:"item2",title:"Title 2",children:[{id:"item2-1",title:"Section 2.1",content:"<p>This is the content for section 2.1</p>"}]}],w={render:()=>({components:{ECFRNavigatorWrapper:y},template:`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">ECFRNavigatorWrapper Example</h1>
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/3 pr-4">
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="options"
              @item-selected="handleItemSelected"
              v-slot="{ selectedItem, metadata, processedMetadata }"
            >
              <div v-if="selectedItem" class="mt-4 p-4 bg-gray-100 rounded">
                <p class="font-semibold">Selected: {{ selectedItem.title }}</p>
                <p v-if="metadata">Has metadata</p>
              </div>
            </ECFRNavigatorWrapper>
          </div>
          
          <div class="w-full md:w-2/3 mt-4 md:mt-0">
            <div v-if="currentItem" class="p-4 border rounded">
              <h2 class="text-xl font-bold">{{ currentItem.title }}</h2>
              <div v-if="currentItem.content" v-html="currentItem.content"></div>
              <div v-else class="text-gray-500">No content available</div>
            </div>
            <div v-else class="p-4 border rounded text-gray-500">
              Select an item on the left
            </div>
          </div>
        </div>
      </div>
    `,setup(){const e=p(null);return{mockData:I,options:{viewMode:"standard",fontSize:"medium",darkMode:!1,showMetadata:!0},currentItem:e,handleItemSelected:n=>{e.value=n.item}}}})},S={render:()=>({components:{ECFRNavigatorWrapper:y},template:`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">useECFRNavigatorStore Example</h1>
        
        <div class="mb-4 flex items-center">
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="navigator.expandAll()"
          >
            Expand All
          </button>
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="navigator.collapseAll()"
          >
            Collapse All
          </button>
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-4"
            @click="addMetadata()"
          >
            Add Metadata
          </button>
          
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search..."
            class="px-3 py-1 border rounded w-64"
            @input="performSearch"
          />
        </div>
        
        <div v-if="searchResults.length > 0" class="mb-4 p-4 bg-gray-100 rounded">
          <h2 class="font-bold mb-2">Search Results:</h2>
          <ul class="list-disc pl-5">
            <li v-for="result in searchResults" :key="result.item.id" class="mb-1">
              <a 
                href="#" 
                class="text-blue-600 hover:underline"
                @click.prevent="navigator.selectItem(result.item.id)"
              >
                {{ result.item.title }}
              </a>
            </li>
          </ul>
        </div>
        
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/3 pr-4">
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="options"
              ref="navigatorRef"
            />
          </div>
          
          <div class="w-full md:w-2/3 mt-4 md:mt-0">
            <div v-if="navigator.state.loading" class="p-4 border rounded">
              <p>Loading...</p>
            </div>
            
            <div v-else-if="navigator.state.currentItem" class="p-4 border rounded">
              <h2 class="text-xl font-bold">{{ navigator.state.currentItem.title }}</h2>
              
              <div v-if="navigator.state.metadata" class="my-4 p-3 bg-gray-100 rounded">
                <h3 class="font-semibold mb-1">Metadata:</h3>
                <pre class="text-sm">{{ JSON.stringify(navigator.state.metadata, null, 2) }}</pre>
              </div>
              
              <div v-if="navigator.state.currentItem.content" v-html="navigator.state.currentItem.content"></div>
              <div v-else class="text-gray-500">No content available</div>
            </div>
            
            <div v-else class="p-4 border rounded text-gray-500">
              Select an item on the left
            </div>
          </div>
        </div>
      </div>
    `,setup(){const e=p(null),o=p(""),r=p([]),n=q({autoExpandSelected:!0,onItemSelected:l=>{console.log("Item selected:",l)},onMetadataChanged:l=>{console.log("Metadata changed:",l)}});return H(()=>{n.setData(I)}),{mockData:I,options:{viewMode:"standard",fontSize:"medium",darkMode:!1,showMetadata:!0},navigator:n,navigatorRef:e,searchQuery:o,searchResults:r,addMetadata:()=>{var x;const l=(x=n.state.currentItem)==null?void 0:x.id;l&&n.setItemMetadata(l,{type:"info",timestamp:new Date().toISOString(),note:"This is custom metadata added via the enhanced store"})},performSearch:async()=>{if(!o.value){r.value=[];return}r.value=await n.findItems(o.value)}}}})},k={render:()=>({components:{ECFRNavigatorWrapper:y},template:`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Optimized Loading Example</h1>
        
        <div class="mb-4">
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="loadData('lazy')"
            :disabled="loading"
          >
            Load with Lazy Loading
          </button>
          
          <button 
            class="px-3 py-1 bg-green-500 text-white rounded mr-2"
            @click="loadData('eager')"
            :disabled="loading"
          >
            Load with Eager Loading
          </button>
          
          <button 
            class="px-3 py-1 bg-purple-500 text-white rounded mr-2"
            @click="loadData('worker')"
            :disabled="loading || !workerSupported"
          >
            Load with Web Worker
          </button>
        </div>
        
        <div v-if="loading" class="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
          <p>Loading data... Please wait.</p>
        </div>
        
        <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-300 rounded">
          <p class="text-red-700">{{ error }}</p>
        </div>
        
        <div v-if="performanceStats.length > 0" class="mb-4 p-4 bg-gray-100 rounded">
          <h2 class="font-bold mb-2">Performance:</h2>
          <ul>
            <li v-for="(stat, index) in performanceStats" :key="index" class="mb-1">
              {{ stat }}
            </li>
          </ul>
        </div>
        
        <ECFRNavigatorWrapper
          v-if="showNavigator"
          :data-url="dataUrl"
          :preload-strategy="preloadStrategy"
          :options="options"
          @data-loaded="onDataLoaded"
          @load-error="onLoadError"
          @item-selected="onItemSelected"
        />
      </div>
    `,setup(){const e=p(!1),o=p(""),r=p(!1),n=p([]),a=p("lazy"),t=p(""),d=p(0),l=p(null),x=typeof Worker<"u",M="/mock.json";return{loading:e,error:o,showNavigator:r,performanceStats:n,preloadStrategy:a,dataUrl:t,options:{viewMode:"compact",fontSize:"small",showMetadata:!0},selectedItem:l,workerSupported:x,loadData:f=>{o.value="",e.value=!0,r.value=!1,n.value=[],d.value=performance.now(),a.value=f,setTimeout(()=>{t.value=M,r.value=!0},100)},onDataLoaded:f=>{const i=(performance.now()-d.value).toFixed(2);n.value.push(`Strategy: ${a.value}`,`Load time: ${i}ms`,`Items loaded: ${f.length}`),e.value=!1},onLoadError:f=>{o.value=f.message,e.value=!1},onItemSelected:f=>{l.value=f.item}}}})},E={render:()=>({components:{ECFRNavigatorWrapper:y},template:`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Styleless Mode Example</h1>
        <p class="mb-4">This example shows how to use the ECFRNavigator in styleless mode with your own custom styling.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-100 p-4 rounded shadow">
            <h2 class="text-lg font-bold mb-3 border-b pb-2">Navigation</h2>
            
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="{ viewMode: 'styleless' }"
              :show-navigator="false"
              v-slot="{ selectedItem, loading }"
            >
              <div v-if="loading" class="text-gray-500 italic">Loading...</div>
              <div v-else>
                <ul class="custom-tree">
                  <template v-for="(item, index) in mockData" :key="item.id">
                    <li>
                      <a 
                        href="#" 
                        class="block p-2 hover:bg-blue-100 rounded"
                        :class="{ 'bg-blue-100 font-semibold': isSelected(item) }"
                        @click.prevent="selectItem(item)"
                      >
                        {{ item.title }}
                      </a>
                      
                      <ul v-if="item.children && isExpanded(item)" class="pl-4 mt-1 border-l-2 border-gray-200">
                        <li v-for="child in item.children" :key="child.id">
                          <a 
                            href="#" 
                            class="block p-2 hover:bg-blue-100 rounded"
                            :class="{ 'bg-blue-100 font-semibold': isSelected(child) }"
                            @click.prevent="selectItem(child)"
                          >
                            {{ child.title }}
                          </a>
                        </li>
                      </ul>
                      
                      <button 
                        v-if="item.children && item.children.length > 0"
                        @click="toggleExpand(item)"
                        class="text-xs text-blue-500 mt-1 ml-2"
                      >
                        {{ isExpanded(item) ? 'Collapse' : 'Expand' }}
                      </button>
                    </li>
                  </template>
                </ul>
              </div>
            </ECFRNavigatorWrapper>
          </div>
          
          <div class="md:col-span-2 bg-white p-4 rounded shadow border">
            <div v-if="currentItem">
              <h2 class="text-xl font-bold mb-3 pb-2 border-b">{{ currentItem.title }}</h2>
              
              <div v-if="currentItem.content" class="prose max-w-none" v-html="currentItem.content"></div>
              <div v-else class="text-gray-500 italic">No content available</div>
              
              <div v-if="currentItem.children && currentItem.children.length > 0" class="mt-4">
                <h3 class="font-semibold mb-2">Child Sections:</h3>
                <ul class="list-disc pl-5">
                  <li v-for="child in currentItem.children" :key="child.id" class="mb-1">
                    <a 
                      href="#" 
                      class="text-blue-600 hover:underline"
                      @click.prevent="selectItem(child)"
                    >
                      {{ child.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div v-else class="text-gray-500 italic">
              Select an item from the navigation tree
            </div>
          </div>
        </div>
      </div>
    `,setup(){const e=q(),o=p(null),r=p(new Set);return H(()=>{e.setData(I),I.length>0&&r.value.add(I[0].id)}),{mockData:I,currentItem:o,expandedItems:r,navigator:e,selectItem:l=>{e.selectItem(l.id),o.value=l},isSelected:l=>o.value&&o.value.id===l.id,isExpanded:l=>r.value.has(l.id),toggleExpand:l=>{r.value.has(l.id)?r.value.delete(l.id):r.value.add(l.id)}}}})};var W,A,z;w.parameters={...w.parameters,docs:{...(W=w.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigatorWrapper
    },
    template: \`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">ECFRNavigatorWrapper Example</h1>
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/3 pr-4">
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="options"
              @item-selected="handleItemSelected"
              v-slot="{ selectedItem, metadata, processedMetadata }"
            >
              <div v-if="selectedItem" class="mt-4 p-4 bg-gray-100 rounded">
                <p class="font-semibold">Selected: {{ selectedItem.title }}</p>
                <p v-if="metadata">Has metadata</p>
              </div>
            </ECFRNavigatorWrapper>
          </div>
          
          <div class="w-full md:w-2/3 mt-4 md:mt-0">
            <div v-if="currentItem" class="p-4 border rounded">
              <h2 class="text-xl font-bold">{{ currentItem.title }}</h2>
              <div v-if="currentItem.content" v-html="currentItem.content"></div>
              <div v-else class="text-gray-500">No content available</div>
            </div>
            <div v-else class="p-4 border rounded text-gray-500">
              Select an item on the left
            </div>
          </div>
        </div>
      </div>
    \`,
    setup() {
      const currentItem = ref(null);
      const options = {
        viewMode: 'standard',
        fontSize: 'medium',
        darkMode: false,
        showMetadata: true
      };
      const handleItemSelected = event => {
        currentItem.value = event.item;
      };
      return {
        mockData,
        options,
        currentItem,
        handleItemSelected
      };
    }
  })
}`,...(z=(A=w.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var P,T,O;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigatorWrapper
    },
    template: \`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">useECFRNavigatorStore Example</h1>
        
        <div class="mb-4 flex items-center">
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="navigator.expandAll()"
          >
            Expand All
          </button>
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="navigator.collapseAll()"
          >
            Collapse All
          </button>
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-4"
            @click="addMetadata()"
          >
            Add Metadata
          </button>
          
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search..."
            class="px-3 py-1 border rounded w-64"
            @input="performSearch"
          />
        </div>
        
        <div v-if="searchResults.length > 0" class="mb-4 p-4 bg-gray-100 rounded">
          <h2 class="font-bold mb-2">Search Results:</h2>
          <ul class="list-disc pl-5">
            <li v-for="result in searchResults" :key="result.item.id" class="mb-1">
              <a 
                href="#" 
                class="text-blue-600 hover:underline"
                @click.prevent="navigator.selectItem(result.item.id)"
              >
                {{ result.item.title }}
              </a>
            </li>
          </ul>
        </div>
        
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/3 pr-4">
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="options"
              ref="navigatorRef"
            />
          </div>
          
          <div class="w-full md:w-2/3 mt-4 md:mt-0">
            <div v-if="navigator.state.loading" class="p-4 border rounded">
              <p>Loading...</p>
            </div>
            
            <div v-else-if="navigator.state.currentItem" class="p-4 border rounded">
              <h2 class="text-xl font-bold">{{ navigator.state.currentItem.title }}</h2>
              
              <div v-if="navigator.state.metadata" class="my-4 p-3 bg-gray-100 rounded">
                <h3 class="font-semibold mb-1">Metadata:</h3>
                <pre class="text-sm">{{ JSON.stringify(navigator.state.metadata, null, 2) }}</pre>
              </div>
              
              <div v-if="navigator.state.currentItem.content" v-html="navigator.state.currentItem.content"></div>
              <div v-else class="text-gray-500">No content available</div>
            </div>
            
            <div v-else class="p-4 border rounded text-gray-500">
              Select an item on the left
            </div>
          </div>
        </div>
      </div>
    \`,
    setup() {
      const navigatorRef = ref(null);
      const searchQuery = ref('');
      const searchResults = ref([]);

      // Initialize navigator with callbacks
      const navigator = useECFRNavigatorStore({
        autoExpandSelected: true,
        onItemSelected: item => {
          console.log('Item selected:', item);
        },
        onMetadataChanged: event => {
          console.log('Metadata changed:', event);
        }
      });

      // Set data on mount
      onMounted(() => {
        navigator.setData(mockData);
      });

      // Add metadata to an item
      const addMetadata = () => {
        const currentItemId = navigator.state.currentItem?.id;
        if (currentItemId) {
          navigator.setItemMetadata(currentItemId, {
            type: 'info',
            timestamp: new Date().toISOString(),
            note: 'This is custom metadata added via the enhanced store'
          });
        }
      };

      // Perform search
      const performSearch = async () => {
        if (!searchQuery.value) {
          searchResults.value = [];
          return;
        }
        searchResults.value = await navigator.findItems(searchQuery.value);
      };
      const options = {
        viewMode: 'standard',
        fontSize: 'medium',
        darkMode: false,
        showMetadata: true
      };
      return {
        mockData,
        options,
        navigator,
        navigatorRef,
        searchQuery,
        searchResults,
        addMetadata,
        performSearch
      };
    }
  })
}`,...(O=(T=S.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};var _,j,$;k.parameters={...k.parameters,docs:{...(_=k.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigatorWrapper
    },
    template: \`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Optimized Loading Example</h1>
        
        <div class="mb-4">
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="loadData('lazy')"
            :disabled="loading"
          >
            Load with Lazy Loading
          </button>
          
          <button 
            class="px-3 py-1 bg-green-500 text-white rounded mr-2"
            @click="loadData('eager')"
            :disabled="loading"
          >
            Load with Eager Loading
          </button>
          
          <button 
            class="px-3 py-1 bg-purple-500 text-white rounded mr-2"
            @click="loadData('worker')"
            :disabled="loading || !workerSupported"
          >
            Load with Web Worker
          </button>
        </div>
        
        <div v-if="loading" class="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
          <p>Loading data... Please wait.</p>
        </div>
        
        <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-300 rounded">
          <p class="text-red-700">{{ error }}</p>
        </div>
        
        <div v-if="performanceStats.length > 0" class="mb-4 p-4 bg-gray-100 rounded">
          <h2 class="font-bold mb-2">Performance:</h2>
          <ul>
            <li v-for="(stat, index) in performanceStats" :key="index" class="mb-1">
              {{ stat }}
            </li>
          </ul>
        </div>
        
        <ECFRNavigatorWrapper
          v-if="showNavigator"
          :data-url="dataUrl"
          :preload-strategy="preloadStrategy"
          :options="options"
          @data-loaded="onDataLoaded"
          @load-error="onLoadError"
          @item-selected="onItemSelected"
        />
      </div>
    \`,
    setup() {
      const loading = ref(false);
      const error = ref('');
      const showNavigator = ref(false);
      const performanceStats = ref([]);
      const preloadStrategy = ref('lazy');
      const dataUrl = ref('');
      const startTime = ref(0);
      const selectedItem = ref(null);
      const workerSupported = typeof Worker !== 'undefined';

      // Setup mock data URL
      const mockDataUrl = '/mock.json';
      const options = {
        viewMode: 'compact',
        fontSize: 'small',
        showMetadata: true
      };
      const loadData = strategy => {
        // Reset state
        error.value = '';
        loading.value = true;
        showNavigator.value = false;
        performanceStats.value = [];
        startTime.value = performance.now();

        // Set loading strategy
        preloadStrategy.value = strategy;

        // Use timeout to allow UI to update before heavy operation
        setTimeout(() => {
          dataUrl.value = mockDataUrl;
          showNavigator.value = true;
        }, 100);
      };
      const onDataLoaded = data => {
        const endTime = performance.now();
        const loadTime = (endTime - startTime.value).toFixed(2);
        performanceStats.value.push(\`Strategy: \${preloadStrategy.value}\`, \`Load time: \${loadTime}ms\`, \`Items loaded: \${data.length}\`);
        loading.value = false;
      };
      const onLoadError = err => {
        error.value = err.message;
        loading.value = false;
      };
      const onItemSelected = event => {
        selectedItem.value = event.item;
      };
      return {
        loading,
        error,
        showNavigator,
        performanceStats,
        preloadStrategy,
        dataUrl,
        options,
        selectedItem,
        workerSupported,
        loadData,
        onDataLoaded,
        onLoadError,
        onItemSelected
      };
    }
  })
}`,...($=(j=k.parameters)==null?void 0:j.docs)==null?void 0:$.source}}};var Q,B,V;E.parameters={...E.parameters,docs:{...(Q=E.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigatorWrapper
    },
    template: \`
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Styleless Mode Example</h1>
        <p class="mb-4">This example shows how to use the ECFRNavigator in styleless mode with your own custom styling.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-100 p-4 rounded shadow">
            <h2 class="text-lg font-bold mb-3 border-b pb-2">Navigation</h2>
            
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="{ viewMode: 'styleless' }"
              :show-navigator="false"
              v-slot="{ selectedItem, loading }"
            >
              <div v-if="loading" class="text-gray-500 italic">Loading...</div>
              <div v-else>
                <ul class="custom-tree">
                  <template v-for="(item, index) in mockData" :key="item.id">
                    <li>
                      <a 
                        href="#" 
                        class="block p-2 hover:bg-blue-100 rounded"
                        :class="{ 'bg-blue-100 font-semibold': isSelected(item) }"
                        @click.prevent="selectItem(item)"
                      >
                        {{ item.title }}
                      </a>
                      
                      <ul v-if="item.children && isExpanded(item)" class="pl-4 mt-1 border-l-2 border-gray-200">
                        <li v-for="child in item.children" :key="child.id">
                          <a 
                            href="#" 
                            class="block p-2 hover:bg-blue-100 rounded"
                            :class="{ 'bg-blue-100 font-semibold': isSelected(child) }"
                            @click.prevent="selectItem(child)"
                          >
                            {{ child.title }}
                          </a>
                        </li>
                      </ul>
                      
                      <button 
                        v-if="item.children && item.children.length > 0"
                        @click="toggleExpand(item)"
                        class="text-xs text-blue-500 mt-1 ml-2"
                      >
                        {{ isExpanded(item) ? 'Collapse' : 'Expand' }}
                      </button>
                    </li>
                  </template>
                </ul>
              </div>
            </ECFRNavigatorWrapper>
          </div>
          
          <div class="md:col-span-2 bg-white p-4 rounded shadow border">
            <div v-if="currentItem">
              <h2 class="text-xl font-bold mb-3 pb-2 border-b">{{ currentItem.title }}</h2>
              
              <div v-if="currentItem.content" class="prose max-w-none" v-html="currentItem.content"></div>
              <div v-else class="text-gray-500 italic">No content available</div>
              
              <div v-if="currentItem.children && currentItem.children.length > 0" class="mt-4">
                <h3 class="font-semibold mb-2">Child Sections:</h3>
                <ul class="list-disc pl-5">
                  <li v-for="child in currentItem.children" :key="child.id" class="mb-1">
                    <a 
                      href="#" 
                      class="text-blue-600 hover:underline"
                      @click.prevent="selectItem(child)"
                    >
                      {{ child.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div v-else class="text-gray-500 italic">
              Select an item from the navigation tree
            </div>
          </div>
        </div>
      </div>
    \`,
    setup() {
      // Initialize navigator store for easier access
      const navigator = useECFRNavigatorStore();
      const currentItem = ref(null);
      const expandedItems = ref(new Set());

      // Set initial data
      onMounted(() => {
        navigator.setData(mockData);
        if (mockData.length > 0) {
          expandedItems.value.add(mockData[0].id);
        }
      });

      // Custom navigation handling
      const selectItem = item => {
        navigator.selectItem(item.id);
        currentItem.value = item;
      };
      const isSelected = item => {
        return currentItem.value && currentItem.value.id === item.id;
      };
      const isExpanded = item => {
        return expandedItems.value.has(item.id);
      };
      const toggleExpand = item => {
        if (expandedItems.value.has(item.id)) {
          expandedItems.value.delete(item.id);
        } else {
          expandedItems.value.add(item.id);
        }
      };
      return {
        mockData,
        currentItem,
        expandedItems,
        navigator,
        selectItem,
        isSelected,
        isExpanded,
        toggleExpand
      };
    }
  })
}`,...(V=(B=E.parameters)==null?void 0:B.docs)==null?void 0:V.source}}};const fe=["WrapperComponentExample","ComposableExample","OptimizedLoadingExample","StylelessExample"];export{S as ComposableExample,k as OptimizedLoadingExample,E as StylelessExample,w as WrapperComponentExample,fe as __namedExportsOrder,he as default};
