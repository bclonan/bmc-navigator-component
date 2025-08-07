import{M as t}from"./MChip-tZQLCLk1.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const D={title:"MUI Components/Data Display/Chip",component:t,parameters:{docs:{description:{component:"Material-UI Chip component for displaying compact elements like tags, status indicators, and filters with Your Town Finance styling."}}},argTypes:{text:{control:{type:"text"},description:"Chip text content",defaultValue:"Chip"},color:{control:{type:"select"},options:["default","primary","secondary","success","warning","error","info"],description:"Chip color theme",defaultValue:"default"},variant:{control:{type:"select"},options:["filled","outlined"],description:"Chip variant style",defaultValue:"filled"},size:{control:{type:"select"},options:["small","medium"],description:"Chip size",defaultValue:"medium"},clickable:{control:{type:"boolean"},description:"Make chip clickable",defaultValue:!1},deletable:{control:{type:"boolean"},description:"Show delete button",defaultValue:!1},disabled:{control:{type:"boolean"},description:"Disable chip interaction",defaultValue:!1},avatar:{control:{type:"text"},description:"Avatar URL or initials",defaultValue:""},icon:{control:{type:"text"},description:"Icon class (e.g., fas fa-star)",defaultValue:""}}},l=i=>({components:{MChip:t},setup(){return{args:i}},template:`
    <MChip 
      v-bind="args" 
      @click="onClick"
      @delete="onDelete"
    />
  `,methods:{onClick(){console.log("Chip clicked!")},onDelete(){console.log("Chip deleted!")}}});l.args={text:"Default Chip",color:"primary",variant:"filled",size:"medium",clickable:!1,deletable:!1,disabled:!1,avatar:"",icon:""};const n=()=>({components:{MChip:t},template:`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Application Status</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Approved" color="success" class="mf-chip-success" />
          <MChip text="Pending Review" color="warning" class="mf-chip-warning" />
          <MChip text="In Progress" color="primary" class="mf-chip-primary" />
          <MChip text="Under Review" color="info" />
          <MChip text="Rejected" color="error" />
          <MChip text="Pre-Qualified" color="success" variant="outlined" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Loan Types</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Personal Loan" color="primary" class="mf-chip-primary" />
          <MChip text="Auto Loan" color="secondary" />
          <MChip text="Home Improvement" color="primary" variant="outlined" />
          <MChip text="Debt Consolidation" color="secondary" variant="outlined" />
          <MChip text="Medical Expenses" color="info" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Account Features</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="AutoPay Enabled" color="success" icon="fas fa-check-circle" />
          <MChip text="Paperless Statements" color="info" icon="fas fa-leaf" />
          <MChip text="Mobile Banking" color="primary" icon="fas fa-mobile-alt" />
          <MChip text="24/7 Support" color="secondary" icon="fas fa-headset" />
        </div>
      </div>
    </div>
  `}),s=()=>({components:{MChip:t},data(){return{selectedFilters:["personal-loan","auto-pay"],availableFilters:[{id:"personal-loan",text:"Personal Loan",color:"primary"},{id:"auto-loan",text:"Auto Loan",color:"secondary"},{id:"home-improvement",text:"Home Improvement",color:"primary"},{id:"debt-consolidation",text:"Debt Consolidation",color:"secondary"},{id:"auto-pay",text:"AutoPay",color:"success"},{id:"paperless",text:"Paperless",color:"info"}]}},methods:{toggleFilter(i){const e=this.selectedFilters.indexOf(i);e>-1?this.selectedFilters.splice(e,1):this.selectedFilters.push(i)},removeFilter(i){const e=this.selectedFilters.indexOf(i);e>-1&&this.selectedFilters.splice(e,1)}},template:`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Available Filters (Click to Select)</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip 
            v-for="filter in availableFilters"
            :key="filter.id"
            :text="filter.text"
            :color="filter.color"
            :variant="selectedFilters.includes(filter.id) ? 'filled' : 'outlined'"
            clickable
            @click="toggleFilter(filter.id)"
            :class="filter.color === 'primary' ? 'mf-chip-primary' : filter.color === 'success' ? 'mf-chip-success' : ''"
          />
        </div>
      </div>
      
      <div v-if="selectedFilters.length > 0">
        <h4 class="mb-4 text-lg font-semibold">Selected Filters (Click X to Remove)</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip 
            v-for="filterId in selectedFilters"
            :key="filterId"
            :text="availableFilters.find(f => f.id === filterId)?.text"
            :color="availableFilters.find(f => f.id === filterId)?.color"
            deletable
            @delete="removeFilter(filterId)"
            :class="availableFilters.find(f => f.id === filterId)?.color === 'primary' ? 'mf-chip-primary' : availableFilters.find(f => f.id === filterId)?.color === 'success' ? 'mf-chip-success' : ''"
          />
        </div>
      </div>
    </div>
  `}),a=()=>({components:{MChip:t},template:`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Loan Officers</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Sarah Johnson" color="primary" avatar="SJ" />
          <MChip text="Michael Chen" color="secondary" avatar="MC" />
          <MChip text="Emily Rodriguez" color="primary" avatar="ER" />
          <MChip text="David Thompson" color="secondary" avatar="DT" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Customer Service Team</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Online Support" color="success" icon="fas fa-comments" clickable />
          <MChip text="Phone Support" color="info" icon="fas fa-phone" clickable />
          <MChip text="Email Support" color="primary" icon="fas fa-envelope" clickable />
          <MChip text="Live Chat" color="warning" icon="fas fa-comment-dots" clickable />
        </div>
      </div>
    </div>
  `}),r=()=>({components:{MChip:t},template:`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Small Chips</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Small Filled" color="primary" size="small" class="mf-chip-primary" />
          <MChip text="Small Outlined" color="primary" size="small" variant="outlined" />
          <MChip text="Small Success" color="success" size="small" class="mf-chip-success" />
          <MChip text="Small Warning" color="warning" size="small" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Medium Chips</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Medium Filled" color="primary" size="medium" class="mf-chip-primary" />
          <MChip text="Medium Outlined" color="primary" size="medium" variant="outlined" />
          <MChip text="Medium Success" color="success" size="medium" class="mf-chip-success" />
          <MChip text="Medium Warning" color="warning" size="medium" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">All Colors - Filled</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Default" color="default" />
          <MChip text="Primary" color="primary" class="mf-chip-primary" />
          <MChip text="Secondary" color="secondary" />
          <MChip text="Success" color="success" class="mf-chip-success" />
          <MChip text="Warning" color="warning" />
          <MChip text="Error" color="error" />
          <MChip text="Info" color="info" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">All Colors - Outlined</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Default" color="default" variant="outlined" />
          <MChip text="Primary" color="primary" variant="outlined" />
          <MChip text="Secondary" color="secondary" variant="outlined" />
          <MChip text="Success" color="success" variant="outlined" />
          <MChip text="Warning" color="warning" variant="outlined" />
          <MChip text="Error" color="error" variant="outlined" />
          <MChip text="Info" color="info" variant="outlined" />
        </div>
      </div>
    </div>
  `}),o=i=>({components:{MChip:t},setup(){return{args:i}},template:`
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Chip Playground</h3>
        <p class="text-gray-600">Customize the chip using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 inline-block">
        <MChip 
          v-bind="args"
          @click="onClick"
          @delete="onDelete"
          :class="getChipClass(args)"
        />
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Use the Controls panel to modify chip properties. Check console for interaction events.
      </div>
    </div>
  `,methods:{onClick(){console.log("Playground chip clicked!",this.args)},onDelete(){console.log("Playground chip deleted!",this.args)},getChipClass(e){return e.color==="primary"?"mf-chip-primary":e.color==="success"?"mf-chip-success":e.color==="warning"?"mf-chip-warning":""}}});o.args={text:"Interactive Chip",color:"primary",variant:"filled",size:"medium",clickable:!0,deletable:!1,disabled:!1,avatar:"",icon:"fas fa-star"};var c,d,p;l.parameters={...l.parameters,docs:{...(c=l.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    MChip
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <MChip 
      v-bind="args" 
      @click="onClick"
      @delete="onDelete"
    />
  \`,
  methods: {
    onClick() {
      console.log('Chip clicked!');
    },
    onDelete() {
      console.log('Chip deleted!');
    }
  }
})`,...(p=(d=l.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var m,f,h;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`() => ({
  components: {
    MChip
  },
  template: \`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Application Status</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Approved" color="success" class="mf-chip-success" />
          <MChip text="Pending Review" color="warning" class="mf-chip-warning" />
          <MChip text="In Progress" color="primary" class="mf-chip-primary" />
          <MChip text="Under Review" color="info" />
          <MChip text="Rejected" color="error" />
          <MChip text="Pre-Qualified" color="success" variant="outlined" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Loan Types</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Personal Loan" color="primary" class="mf-chip-primary" />
          <MChip text="Auto Loan" color="secondary" />
          <MChip text="Home Improvement" color="primary" variant="outlined" />
          <MChip text="Debt Consolidation" color="secondary" variant="outlined" />
          <MChip text="Medical Expenses" color="info" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Account Features</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="AutoPay Enabled" color="success" icon="fas fa-check-circle" />
          <MChip text="Paperless Statements" color="info" icon="fas fa-leaf" />
          <MChip text="Mobile Banking" color="primary" icon="fas fa-mobile-alt" />
          <MChip text="24/7 Support" color="secondary" icon="fas fa-headset" />
        </div>
      </div>
    </div>
  \`
})`,...(h=(f=n.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var u,v,x;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`() => ({
  components: {
    MChip
  },
  data() {
    return {
      selectedFilters: ['personal-loan', 'auto-pay'],
      availableFilters: [{
        id: 'personal-loan',
        text: 'Personal Loan',
        color: 'primary'
      }, {
        id: 'auto-loan',
        text: 'Auto Loan',
        color: 'secondary'
      }, {
        id: 'home-improvement',
        text: 'Home Improvement',
        color: 'primary'
      }, {
        id: 'debt-consolidation',
        text: 'Debt Consolidation',
        color: 'secondary'
      }, {
        id: 'auto-pay',
        text: 'AutoPay',
        color: 'success'
      }, {
        id: 'paperless',
        text: 'Paperless',
        color: 'info'
      }]
    };
  },
  methods: {
    toggleFilter(filterId) {
      const index = this.selectedFilters.indexOf(filterId);
      if (index > -1) {
        this.selectedFilters.splice(index, 1);
      } else {
        this.selectedFilters.push(filterId);
      }
    },
    removeFilter(filterId) {
      const index = this.selectedFilters.indexOf(filterId);
      if (index > -1) {
        this.selectedFilters.splice(index, 1);
      }
    }
  },
  template: \`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Available Filters (Click to Select)</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip 
            v-for="filter in availableFilters"
            :key="filter.id"
            :text="filter.text"
            :color="filter.color"
            :variant="selectedFilters.includes(filter.id) ? 'filled' : 'outlined'"
            clickable
            @click="toggleFilter(filter.id)"
            :class="filter.color === 'primary' ? 'mf-chip-primary' : filter.color === 'success' ? 'mf-chip-success' : ''"
          />
        </div>
      </div>
      
      <div v-if="selectedFilters.length > 0">
        <h4 class="mb-4 text-lg font-semibold">Selected Filters (Click X to Remove)</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip 
            v-for="filterId in selectedFilters"
            :key="filterId"
            :text="availableFilters.find(f => f.id === filterId)?.text"
            :color="availableFilters.find(f => f.id === filterId)?.color"
            deletable
            @delete="removeFilter(filterId)"
            :class="availableFilters.find(f => f.id === filterId)?.color === 'primary' ? 'mf-chip-primary' : availableFilters.find(f => f.id === filterId)?.color === 'success' ? 'mf-chip-success' : ''"
          />
        </div>
      </div>
    </div>
  \`
})`,...(x=(v=s.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var C,g,y;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`() => ({
  components: {
    MChip
  },
  template: \`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Loan Officers</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Sarah Johnson" color="primary" avatar="SJ" />
          <MChip text="Michael Chen" color="secondary" avatar="MC" />
          <MChip text="Emily Rodriguez" color="primary" avatar="ER" />
          <MChip text="David Thompson" color="secondary" avatar="DT" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Customer Service Team</h4>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Online Support" color="success" icon="fas fa-comments" clickable />
          <MChip text="Phone Support" color="info" icon="fas fa-phone" clickable />
          <MChip text="Email Support" color="primary" icon="fas fa-envelope" clickable />
          <MChip text="Live Chat" color="warning" icon="fas fa-comment-dots" clickable />
        </div>
      </div>
    </div>
  \`
})`,...(y=(g=a.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var M,b,S;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`() => ({
  components: {
    MChip
  },
  template: \`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Small Chips</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Small Filled" color="primary" size="small" class="mf-chip-primary" />
          <MChip text="Small Outlined" color="primary" size="small" variant="outlined" />
          <MChip text="Small Success" color="success" size="small" class="mf-chip-success" />
          <MChip text="Small Warning" color="warning" size="small" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Medium Chips</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Medium Filled" color="primary" size="medium" class="mf-chip-primary" />
          <MChip text="Medium Outlined" color="primary" size="medium" variant="outlined" />
          <MChip text="Medium Success" color="success" size="medium" class="mf-chip-success" />
          <MChip text="Medium Warning" color="warning" size="medium" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">All Colors - Filled</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Default" color="default" />
          <MChip text="Primary" color="primary" class="mf-chip-primary" />
          <MChip text="Secondary" color="secondary" />
          <MChip text="Success" color="success" class="mf-chip-success" />
          <MChip text="Warning" color="warning" />
          <MChip text="Error" color="error" />
          <MChip text="Info" color="info" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">All Colors - Outlined</h4>
        <div class="flex gap-3 flex-wrap items-center">
          <MChip text="Default" color="default" variant="outlined" />
          <MChip text="Primary" color="primary" variant="outlined" />
          <MChip text="Secondary" color="secondary" variant="outlined" />
          <MChip text="Success" color="success" variant="outlined" />
          <MChip text="Warning" color="warning" variant="outlined" />
          <MChip text="Error" color="error" variant="outlined" />
          <MChip text="Info" color="info" variant="outlined" />
        </div>
      </div>
    </div>
  \`
})`,...(S=(b=r.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var F,k,w;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
  components: {
    MChip
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Chip Playground</h3>
        <p class="text-gray-600">Customize the chip using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50 inline-block">
        <MChip 
          v-bind="args"
          @click="onClick"
          @delete="onDelete"
          :class="getChipClass(args)"
        />
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Use the Controls panel to modify chip properties. Check console for interaction events.
      </div>
    </div>
  \`,
  methods: {
    onClick() {
      console.log('Playground chip clicked!', this.args);
    },
    onDelete() {
      console.log('Playground chip deleted!', this.args);
    },
    getChipClass(args) {
      if (args.color === 'primary') return 'mf-chip-primary';
      if (args.color === 'success') return 'mf-chip-success';
      if (args.color === 'warning') return 'mf-chip-warning';
      return '';
    }
  }
})`,...(w=(k=o.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};const A=["Default","LoanStatusChips","InteractiveChips","WithAvatars","SizesAndVariants","Playground"];export{l as Default,s as InteractiveChips,n as LoanStatusChips,o as Playground,r as SizesAndVariants,a as WithAvatars,A as __namedExportsOrder,D as default};
