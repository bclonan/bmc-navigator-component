import MMediaCard from '../../components/ui/MMediaCard.vue';

export default {
  title: 'UI Components/Media Card',
  component: MMediaCard,
  parameters: {
    docs: {
      description: {
        component: 'Versatile media card component supporting images, videos, audio, documents, and custom media with overlay support, actions, and multiple layout variants.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact', 'featured', 'minimal', 'detailed']
    },
    orientation: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal']
    },
    aspectRatio: {
      control: { type: 'select' },
      options: ['1/1', '4/3', '16/9', '3/2', 'auto']
    },
    elevation: {
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5]
    }
  }
};

// Sample data for demonstrations
const sampleActions = [
  { id: 'edit', label: 'Edit', icon: 'fas fa-edit', variant: 'default' },
  { id: 'share', label: 'Share', icon: 'fas fa-share', variant: 'default' },
  { id: 'delete', label: 'Delete', icon: 'fas fa-trash', variant: 'default' }
];

const sampleMetadata = {
  fileSize: '2.4 MB',
  lastModified: new Date('2024-01-15'),
  author: 'John Doe',
  category: 'Financial Documents'
};

export const ImageCard = {
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
};

export const VideoCard = {
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
    headerActions: [
      { id: 'fullscreen', label: 'Fullscreen', icon: 'fas fa-expand' }
    ],
    footerActions: [
      { id: 'like', label: 'Like', icon: 'fas fa-thumbs-up' },
      { id: 'share', label: 'Share', icon: 'fas fa-share' }
    ],
    videoControls: true,
    videoMuted: true,
    variant: 'featured'
  }
};

export const AudioCard = {
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
    footerActions: [
      { id: 'download', label: 'Download', icon: 'fas fa-download' },
      { id: 'transcript', label: 'Transcript', icon: 'fas fa-file-alt' }
    ],
    audioControls: true,
    variant: 'detailed'
  }
};

export const DocumentCard = {
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
    headerActions: [
      { id: 'preview', label: 'Preview', icon: 'fas fa-eye' }
    ],
    footerActions: [
      { id: 'download', label: 'Download', icon: 'fas fa-download', primary: true },
      { id: 'share', label: 'Share', icon: 'fas fa-share' },
      { id: 'print', label: 'Print', icon: 'fas fa-print' }
    ],
    variant: 'default'
  }
};

export const CompactVariant = {
  args: {
    mediaType: 'image',
    mediaSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=150&fit=crop',
    title: 'Budget Analysis',
    subtitle: 'Monthly Review',
    description: 'Quick overview of monthly budget performance.',
    tags: ['Budget', 'Analysis'],
    footerActions: [
      { id: 'view', label: 'View', icon: 'fas fa-eye' }
    ],
    variant: 'compact',
    elevation: 1,
    aspectRatio: '4/3'
  }
};

export const HorizontalLayout = {
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
    footerActions: [
      { id: 'open', label: 'Open Dashboard', icon: 'fas fa-external-link-alt', primary: true }
    ],
    orientation: 'horizontal',
    variant: 'default',
    elevation: 3
  }
};

export const WithOverlay = {
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
};

export const SelectableCards = {
  render: () => ({
    components: { MMediaCard },
    data() {
      return {
        selectedCards: new Set(),
        cards: [
          {
            id: 1,
            mediaType: 'document',
            documentName: 'loan_application.pdf',
            documentType: 'pdf',
            title: 'Loan Application',
            description: 'Personal loan application form'
          },
          {
            id: 2,
            mediaType: 'document',
            documentName: 'credit_report.pdf',
            documentType: 'pdf',
            title: 'Credit Report',
            description: 'Latest credit score report'
          },
          {
            id: 3,
            mediaType: 'document',
            documentName: 'income_verification.pdf',
            documentType: 'pdf',
            title: 'Income Verification',
            description: 'Employment and income documentation'
          }
        ]
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
    template: `
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
    `
  })
};

export const LoadingStates = {
  render: () => ({
    components: { MMediaCard },
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
    template: `
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
    `
  })
};

export const InteractiveDemo = {
  render: () => ({
    components: { MMediaCard },
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
          description: 'Use the controls below to modify this card\'s appearance and behavior.',
          metadata: {
            variant: this.variant,
            orientation: this.orientation,
            aspectRatio: this.aspectRatio
          },
          tags: ['Demo', 'Interactive', 'Customizable'],
          footerActions: [
            { id: 'action1', label: 'Action 1', icon: 'fas fa-cog' },
            { id: 'action2', label: 'Action 2', icon: 'fas fa-star' }
          ],
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
        alert(`Action clicked: ${action.label}`);
      },
      handleClick() {
        alert('Card was clicked!');
      }
    },
    template: `
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
    `
  })
};

export const FinancialDocumentGallery = {
  render: () => ({
    components: { MMediaCard },
    data() {
      return {
        documents: [
          {
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
          },
          {
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
          },
          {
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
          }
        ]
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
        console.log(`Action ${action.id} on document:`, document.title);
        switch (action.id) {
          case 'view':
            alert(`Opening ${document.title}`);
            break;
          case 'download':
            alert(`Downloading ${document.title}`);
            break;
          case 'share':
            alert(`Sharing ${document.title}`);
            break;
        }
      }
    },
    template: `
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
    `
  })
};