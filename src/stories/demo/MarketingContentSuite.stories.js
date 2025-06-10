import MHeroSection from '../../components/marketing/MHeroSection.vue'
import MFeatureCard from '../../components/marketing/MFeatureCard.vue'
import MTestimonial from '../../components/marketing/MTestimonial.vue'
import MPricingCard from '../../components/marketing/MPricingCard.vue'
import MArticleCard from '../../components/blog/MArticleCard.vue'
import MMultiStepForm from '../../components/forms/MMultiStepForm.vue'
import MButton from '../../components/ui/MButton.vue'
import MCard from '../../components/ui/MCard.vue'
import MLayout from '../../components/layout/MLayout.vue'
import MNavbar from '../../components/layout/MNavbar.vue'
import MFooter from '../../components/layout/MFooter.vue'

export default {
  title: 'Demo/Marketing & Content Suite',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive marketing and content components showcase featuring hero sections, pricing cards, testimonials, blog articles, and advanced forms with Material Design theming.'
      }
    }
  }
}

// Sample data for demonstrations
const heroFeatures = [
  {
    icon: 'fas fa-shield-alt',
    title: 'Bank-Level Security',
    description: 'Your financial data is protected with enterprise-grade encryption and security protocols.'
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Smart Analytics',
    description: 'AI-powered insights help you make better financial decisions and reach your goals faster.'
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile First',
    description: 'Access your finances anywhere with our responsive, touch-optimized mobile experience.'
  }
]

const testimonials = [
  {
    quote: "This loan platform made getting approved for my home purchase incredibly smooth. The process was transparent and the rates were competitive.",
    authorName: "Sarah Johnson",
    authorTitle: "First-time Homebuyer",
    authorImage: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    date: "2024-01-15",
    verified: true
  },
  {
    quote: "I was able to consolidate my debt and save hundreds per month. The customer service team was helpful throughout the entire process.",
    authorName: "Michael Chen",
    authorTitle: "Business Owner",
    authorCompany: "Tech Startup Inc.",
    authorImage: "https://i.pravatar.cc/150?img=2",
    rating: 5,
    date: "2024-02-08"
  },
  {
    quote: "Fast approval, great rates, and no hidden fees. I recommended this service to all my friends and family.",
    authorName: "Emily Rodriguez",
    authorTitle: "Teacher",
    authorImage: "https://i.pravatar.cc/150?img=3",
    rating: 4,
    location: "Austin, TX",
    platform: "Google Reviews"
  }
]

const pricingPlans = [
  {
    title: "Basic",
    subtitle: "Perfect for individuals",
    price: 0,
    period: "/month",
    features: [
      "Free credit score monitoring",
      "Basic financial planning tools",
      "Educational resources",
      "Email support"
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outlined"
  },
  {
    title: "Premium",
    subtitle: "For serious savers",
    price: 9.99,
    originalPrice: 19.99,
    discount: 50,
    period: "/month",
    features: [
      "Advanced analytics and insights",
      "Personalized recommendations",
      "Priority customer support",
      "Investment tracking",
      "Goal-based savings plans"
    ],
    mostPopular: true,
    featured: true
  },
  {
    title: "Professional",
    subtitle: "For financial advisors",
    price: 29.99,
    period: "/month",
    features: [
      "White-label platform",
      "Client management tools",
      "Advanced reporting",
      "API access",
      "Dedicated account manager"
    ],
    buttonText: "Contact Sales"
  }
]

const blogArticles = [
  {
    title: "5 Smart Strategies to Improve Your Credit Score Fast",
    excerpt: "Discover proven methods to boost your credit score and unlock better loan rates and financial opportunities.",
    image: "https://picsum.photos/400/250?random=1",
    category: "Credit Tips",
    author: {
      name: "David Kim",
      title: "Credit Expert",
      avatar: "https://i.pravatar.cc/64?img=4"
    },
    readTime: 5,
    publishDate: "2024-03-01",
    tags: ["Credit Score", "Financial Tips", "Personal Finance"],
    likes: 342,
    comments: 28,
    shares: 67
  },
  {
    title: "First-Time Home Buyer's Complete Guide to Mortgages",
    excerpt: "Everything you need to know about securing your first mortgage, from pre-approval to closing day.",
    image: "https://picsum.photos/400/250?random=2",
    category: "Home Buying",
    author: {
      name: "Lisa Park",
      title: "Mortgage Specialist",
      avatar: "https://i.pravatar.cc/64?img=5"
    },
    readTime: 12,
    publishDate: "2024-02-28",
    tags: ["Mortgages", "Home Buying", "Real Estate"],
    likes: 189,
    comments: 45,
    shares: 23
  },
  {
    title: "Investment Basics: Building Your Portfolio from Scratch",
    excerpt: "Learn the fundamentals of investing and start building wealth with confidence using these beginner-friendly strategies.",
    image: "https://picsum.photos/400/250?random=3",
    category: "Investing",
    author: {
      name: "Robert Wilson",
      title: "Investment Advisor",
      avatar: "https://i.pravatar.cc/64?img=6"
    },
    readTime: 8,
    publishDate: "2024-02-25",
    tags: ["Investing", "Portfolio", "Wealth Building"],
    likes: 298,
    comments: 52,
    shares: 89
  }
]

const loanFormSteps = [
  {
    title: "Personal Information",
    description: "Tell us about yourself to get started",
    fields: [
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        required: true,
        size: "medium"
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        required: true,
        size: "medium"
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        required: true,
        size: "large"
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        required: true,
        size: "medium"
      },
      {
        name: "birthDate",
        label: "Date of Birth",
        type: "date",
        required: true,
        size: "medium"
      }
    ]
  },
  {
    title: "Loan Details",
    description: "What kind of loan are you looking for?",
    fields: [
      {
        name: "loanType",
        label: "Loan Type",
        type: "select",
        required: true,
        options: [
          { label: "Personal Loan", value: "personal" },
          { label: "Auto Loan", value: "auto" },
          { label: "Home Loan", value: "home" },
          { label: "Business Loan", value: "business" }
        ]
      },
      {
        name: "loanAmount",
        label: "Loan Amount",
        type: "slider",
        min: 1000,
        max: 100000,
        step: 500,
        prefix: "$",
        required: true,
        helperText: "Select your desired loan amount"
      },
      {
        name: "loanPurpose",
        label: "Purpose of Loan",
        type: "select",
        required: true,
        options: [
          { label: "Debt Consolidation", value: "debt" },
          { label: "Home Improvement", value: "home_improvement" },
          { label: "Major Purchase", value: "purchase" },
          { label: "Emergency Expenses", value: "emergency" }
        ]
      }
    ]
  },
  {
    title: "Financial Information",
    description: "Help us understand your financial situation",
    fields: [
      {
        name: "annualIncome",
        label: "Annual Income",
        type: "slider",
        min: 20000,
        max: 500000,
        step: 5000,
        prefix: "$",
        required: true
      },
      {
        name: "employmentStatus",
        label: "Employment Status",
        type: "select",
        required: true,
        options: [
          { label: "Full-time Employee", value: "fulltime" },
          { label: "Part-time Employee", value: "parttime" },
          { label: "Self-employed", value: "selfemployed" },
          { label: "Retired", value: "retired" }
        ]
      },
      {
        name: "hasCollateral",
        label: "I have collateral to secure this loan",
        type: "checkbox"
      }
    ]
  },
  {
    title: "Documents",
    description: "Upload required documents to complete your application",
    fields: [
      {
        name: "idDocument",
        label: "Government ID",
        type: "file",
        accept: ".pdf,.jpg,.png",
        required: true,
        uploadText: "Upload ID Document"
      },
      {
        name: "incomeProof",
        label: "Proof of Income",
        type: "file",
        accept: ".pdf,.jpg,.png",
        multiple: true,
        helperText: "Pay stubs, tax returns, or bank statements"
      }
    ]
  }
]

export const MarketingLandingPage = () => ({
  components: {
    MHeroSection,
    MFeatureCard,
    MTestimonial,
    MPricingCard,
    MLayout,
    MNavbar,
    MFooter,
    MCard,
    MButton
  },
  data() {
    return {
      features: [
        {
          title: "Instant Pre-approval",
          description: "Get pre-approved in minutes with our advanced AI-powered credit assessment system.",
          icon: "fas fa-bolt",
          metrics: [
            { value: "2 min", label: "Average Approval" },
            { value: "98%", label: "Approval Rate" }
          ]
        },
        {
          title: "Competitive Rates",
          description: "Access some of the market's best loan rates with transparent pricing and no hidden fees.",
          icon: "fas fa-percentage",
          features: ["No origination fees", "No prepayment penalties", "Rate matching guarantee"]
        },
        {
          title: "Expert Support",
          description: "Our certified loan specialists are here to guide you through every step of the process.",
          icon: "fas fa-user-tie",
          actionLabel: "Talk to Expert",
          actionVariant: "primary"
        }
      ],
      testimonials,
      pricingPlans,
      navItems: [
        { label: 'Home', href: '#' },
        { label: 'Loans', href: '#' },
        { label: 'Rates', href: '#' },
        { label: 'About', href: '#' }
      ]
    }
  },
  methods: {
    handleHeroAction(action) {
      console.log('Hero action:', action)
    },
    handleFeatureClick(feature) {
      console.log('Feature clicked:', feature)
    },
    handlePricingSelect(plan) {
      console.log('Pricing plan selected:', plan)
    }
  },
  template: `
    <MLayout class="min-h-screen">
      <MNavbar 
        title="LoanPro"
        :nav-items="navItems"
        show-user-menu
      />
      
      <main>
        <!-- Hero Section -->
        <MHeroSection
          headline="Get Your Dream Loan in Minutes"
          subheadline="Smart Financial Solutions"
          description="Experience the fastest, most secure way to get approved for personal loans, auto loans, and mortgages with competitive rates and exceptional service."
          variant="default"
          size="large"
          background-image="https://picsum.photos/1920/1080?random=10"
          overlay
          overlay-color="rgba(25, 118, 210, 0.7)"
          :primary-action="{ label: 'Apply Now', href: '#apply' }"
          :secondary-action="{ label: 'Learn More', href: '#features' }"
          :features="heroFeatures"
          @primary-action="handleHeroAction"
          @secondary-action="handleHeroAction"
        />
        
        <!-- Features Section -->
        <section class="py-16 bg-gray-50">
          <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
              <h2 class="md-headline-3 mb-4">Why Choose LoanPro?</h2>
              <p class="md-body-1 text-gray-600 max-w-3xl mx-auto">
                We've revolutionized the lending industry with cutting-edge technology and customer-first approach.
              </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
              <MFeatureCard
                v-for="(feature, index) in features"
                :key="index"
                :title="feature.title"
                :description="feature.description"
                :icon="feature.icon"
                :metrics="feature.metrics"
                :features="feature.features"
                :action-label="feature.actionLabel"
                :action-variant="feature.actionVariant"
                variant="default"
                size="medium"
                interactive
                @click="handleFeatureClick"
              />
            </div>
          </div>
        </section>
        
        <!-- Testimonials Section -->
        <section class="py-16">
          <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
              <h2 class="md-headline-3 mb-4">What Our Customers Say</h2>
              <p class="md-body-1 text-gray-600">
                Join thousands of satisfied customers who chose LoanPro for their financial needs.
              </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
              <MTestimonial
                v-for="(testimonial, index) in testimonials"
                :key="index"
                :quote="testimonial.quote"
                :author-name="testimonial.authorName"
                :author-title="testimonial.authorTitle"
                :author-company="testimonial.authorCompany"
                :author-image="testimonial.authorImage"
                :rating="testimonial.rating"
                :date="testimonial.date"
                :platform="testimonial.platform"
                :location="testimonial.location"
                :verified="testimonial.verified"
                :variant="index === 1 ? 'featured' : 'default'"
                size="medium"
              />
            </div>
          </div>
        </section>
        
        <!-- Pricing Section -->
        <section class="py-16 bg-gray-50">
          <div class="max-w-6xl mx-auto px-6">
            <div class="text-center mb-12">
              <h2 class="md-headline-3 mb-4">Choose Your Plan</h2>
              <p class="md-body-1 text-gray-600">
                Select the perfect plan for your financial journey. Upgrade or downgrade anytime.
              </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <MPricingCard
                v-for="(plan, index) in pricingPlans"
                :key="index"
                :title="plan.title"
                :subtitle="plan.subtitle"
                :price="plan.price"
                :original-price="plan.originalPrice"
                :discount="plan.discount"
                :period="plan.period"
                :features="plan.features"
                :button-text="plan.buttonText"
                :button-variant="plan.buttonVariant"
                :most-popular="plan.mostPopular"
                :featured="plan.featured"
                @select="handlePricingSelect"
              />
            </div>
          </div>
        </section>
        
        <!-- CTA Section -->
        <section class="py-16 bg-blue-600 text-white">
          <div class="max-w-4xl mx-auto px-6 text-center">
            <h2 class="md-headline-3 mb-4">Ready to Get Started?</h2>
            <p class="md-body-1 mb-8 opacity-90">
              Join thousands of customers who have already transformed their financial future with LoanPro.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <MButton
                label="Apply for Loan"
                variant="primary"
                size="large"
                class="bg-white text-blue-600 hover:bg-gray-100"
              />
              <MButton
                label="Contact Us"
                variant="outlined"
                size="large"
                class="border-white text-white hover:bg-white hover:text-blue-600"
              />
            </div>
          </div>
        </section>
      </main>
      
      <MFooter 
        company-name="LoanPro"
        copyright="© 2024 LoanPro. All rights reserved."
        :links="[
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms of Service', href: '#' },
          { label: 'Contact', href: '#' }
        ]"
      />
    </MLayout>
  `
})

export const BlogContentHub = () => ({
  components: {
    MArticleCard,
    MLayout,
    MNavbar,
    MFooter,
    MButton,
    MCard
  },
  data() {
    return {
      articles: blogArticles,
      featuredArticle: blogArticles[0],
      categories: ['All', 'Credit Tips', 'Home Buying', 'Investing', 'Personal Finance'],
      selectedCategory: 'All',
      navItems: [
        { label: 'Home', href: '#' },
        { label: 'Blog', href: '#', active: true },
        { label: 'Resources', href: '#' },
        { label: 'About', href: '#' }
      ]
    }
  },
  methods: {
    handleArticleClick(article) {
      console.log('Article clicked:', article)
    },
    handleLike() {
      console.log('Article liked')
    },
    handleComment() {
      console.log('Article comment')
    },
    handleShare() {
      console.log('Article shared')
    },
    filterByCategory(category) {
      this.selectedCategory = category
    }
  },
  template: `
    <MLayout class="min-h-screen bg-gray-50">
      <MNavbar 
        title="LoanPro Blog"
        :nav-items="navItems"
        show-user-menu
      />
      
      <main class="max-w-7xl mx-auto px-6 py-8">
        <!-- Hero/Featured Article -->
        <section class="mb-12">
          <MCard class="overflow-hidden">
            <div class="grid lg:grid-cols-2 gap-8 p-8">
              <div>
                <span class="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  Featured Article
                </span>
                <h1 class="md-headline-2 mb-4">{{ featuredArticle.title }}</h1>
                <p class="md-body-1 text-gray-600 mb-6">{{ featuredArticle.excerpt }}</p>
                
                <div class="flex items-center gap-4 mb-6">
                  <img 
                    :src="featuredArticle.author.avatar" 
                    :alt="featuredArticle.author.name"
                    class="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div class="md-subtitle-2">{{ featuredArticle.author.name }}</div>
                    <div class="md-caption text-gray-600">{{ featuredArticle.author.title }}</div>
                  </div>
                  <div class="text-gray-500">•</div>
                  <div class="md-caption text-gray-600">{{ featuredArticle.readTime }} min read</div>
                </div>
                
                <MButton
                  label="Read Full Article"
                  variant="primary"
                  size="large"
                  @click="handleArticleClick(featuredArticle)"
                />
              </div>
              
              <div>
                <img 
                  :src="featuredArticle.image" 
                  :alt="featuredArticle.title"
                  class="w-full h-64 lg:h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </MCard>
        </section>
        
        <!-- Category Filter -->
        <section class="mb-8">
          <div class="flex flex-wrap gap-2">
            <MButton
              v-for="category in categories"
              :key="category"
              :label="category"
              :variant="selectedCategory === category ? 'primary' : 'outlined'"
              size="small"
              @click="filterByCategory(category)"
            />
          </div>
        </section>
        
        <!-- Articles Grid -->
        <section class="mb-12">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MArticleCard
              v-for="(article, index) in articles"
              :key="index"
              :title="article.title"
              :excerpt="article.excerpt"
              :image="article.image"
              :category="article.category"
              :tags="article.tags"
              :author="article.author"
              :publish-date="article.publishDate"
              :read-time="article.readTime"
              :likes="article.likes"
              :comments="article.comments"
              :shares="article.shares"
              show-engagement
              @click="handleArticleClick"
              @like="handleLike"
              @comment="handleComment"
              @share="handleShare"
            />
          </div>
        </section>
        
        <!-- Newsletter Signup -->
        <section class="mb-12">
          <MCard class="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div class="p-8 text-center">
              <h2 class="md-headline-4 mb-4">Stay Updated with Financial Tips</h2>
              <p class="md-body-1 mb-6 opacity-90">
                Get the latest insights, tips, and trends delivered straight to your inbox.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <MButton
                  label="Subscribe"
                  variant="primary"
                  class="bg-white text-blue-600 hover:bg-gray-100"
                />
              </div>
            </div>
          </MCard>
        </section>
      </main>
      
      <MFooter 
        company-name="LoanPro"
        copyright="© 2024 LoanPro. All rights reserved."
        :links="[
          { label: 'Privacy Policy', href: '#' },
          { label: 'Terms of Service', href: '#' },
          { label: 'Contact', href: '#' }
        ]"
      />
    </MLayout>
  `
})

export const AdvancedLoanApplication = () => ({
  components: {
    MMultiStepForm,
    MLayout,
    MNavbar,
    MCard
  },
  data() {
    return {
      steps: loanFormSteps,
      initialData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        loanAmount: 25000,
        annualIncome: 75000
      },
      validation: {
        email: (value) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return emailRegex.test(value) || 'Please enter a valid email address'
        },
        phone: (value) => {
          const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
          return phoneRegex.test(value) || 'Please enter a valid phone number (###) ###-####'
        },
        loanAmount: (value) => {
          return value >= 1000 || 'Minimum loan amount is $1,000'
        }
      },
      navItems: [
        { label: 'Home', href: '#' },
        { label: 'Apply', href: '#', active: true },
        { label: 'Rates', href: '#' }
      ]
    }
  },
  methods: {
    handleStepChange(stepIndex, step) {
      console.log('Step changed:', stepIndex, step.title)
    },
    handleFieldChange(formData) {
      console.log('Form data updated:', formData)
    },
    async handleSubmit(formData) {
      console.log('Form submitted:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert('Application submitted successfully!')
    },
    handleError(error) {
      console.error('Form error:', error)
      alert(error)
    }
  },
  template: `
    <MLayout class="min-h-screen bg-gray-50">
      <MNavbar 
        title="LoanPro Application"
        :nav-items="navItems"
      />
      
      <main class="max-w-4xl mx-auto px-6 py-8">
        <div class="text-center mb-8">
          <h1 class="md-headline-2 mb-4">Apply for Your Loan</h1>
          <p class="md-body-1 text-gray-600">
            Complete our secure application to get pre-approved in minutes
          </p>
        </div>
        
        <MMultiStepForm
          :steps="steps"
          :initial-data="initialData"
          :validation="validation"
          show-progress
          show-summary
          auto-save
          persist-key="loan-application"
          submit-text="Submit Application"
          @step-change="handleStepChange"
          @field-change="handleFieldChange"
          @submit="handleSubmit"
          @error="handleError"
        >
          <template #summary="{ formData, steps }">
            <div class="space-y-4">
              <div class="p-4 bg-blue-50 rounded-lg">
                <h4 class="md-subtitle-1 text-blue-800 mb-2">Loan Summary</h4>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Amount:</span>
                    <span class="font-semibold">\${{ formData.loanAmount?.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Type:</span>
                    <span class="font-semibold">{{ formData.loanType }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Annual Income:</span>
                    <span class="font-semibold">\${{ formData.annualIncome?.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
              
              <div class="p-4 bg-green-50 rounded-lg">
                <h4 class="md-subtitle-1 text-green-800 mb-2">Estimated Rate</h4>
                <div class="text-2xl font-bold text-green-700">4.99% APR*</div>
                <p class="text-xs text-green-600 mt-1">*Rate based on provided information</p>
              </div>
            </div>
          </template>
        </MMultiStepForm>
      </main>
    </MLayout>
  `
})

MarketingLandingPage.parameters = {
  docs: {
    description: {
      story: 'Complete marketing landing page showcasing hero sections, feature cards, testimonials, and pricing with Material Design theming and financial services branding.'
    }
  }
}

BlogContentHub.parameters = {
  docs: {
    description: {
      story: 'Professional blog and content hub with article cards, category filtering, engagement metrics, and newsletter signup functionality.'
    }
  }
}

AdvancedLoanApplication.parameters = {
  docs: {
    description: {
      story: 'Advanced multi-step loan application form with validation, auto-save, progress tracking, and dynamic summary sidebar for optimal user experience.'
    }
  }
}
