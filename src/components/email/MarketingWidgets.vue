<template>
  <div class="marketing-widgets-container">
    <!-- Loan Calculator Widget -->
    <div v-if="widgetType === 'calculator'" class="widget calculator-widget">
      <div class="widget-header">
        <h3>Personal Loan Calculator</h3>
        <p>See your potential monthly payment</p>
      </div>
      <div class="widget-content">
        <div class="input-group">
          <label>Loan Amount</label>
          <div class="currency-input">
            <span>$</span>
            <input v-model.number="loanAmount" type="number" min="1000" max="50000" step="100">
          </div>
        </div>
        <div class="input-group">
          <label>Term Length</label>
          <select v-model.number="termMonths">
            <option value="12">12 months</option>
            <option value="24">24 months</option>
            <option value="36">36 months</option>
            <option value="48">48 months</option>
            <option value="60">60 months</option>
          </select>
        </div>
        <div class="result-display">
          <div class="monthly-payment">
            <span class="label">Estimated Monthly Payment</span>
            <span class="amount">${{ calculatedPayment }}</span>
          </div>
          <div class="total-cost">
            <span>Total Cost: ${{ totalCost.toLocaleString() }}</span>
          </div>
        </div>
        <button class="cta-button primary">
          Apply Now
        </button>
        <p class="disclaimer">*Rates from 6.99% - 35.99% APR. Your rate depends on creditworthiness.</p>
      </div>
    </div>

    <!-- Rate Comparison Widget -->
    <div v-if="widgetType === 'rates'" class="widget rates-widget">
      <div class="widget-header">
        <h3>Compare Our Rates</h3>
        <p>See how we stack up against the competition</p>
      </div>
      <div class="widget-content">
        <div class="comparison-table">
          <div class="comparison-row header">
            <div class="lender">Lender</div>
            <div class="rate">Starting APR</div>
            <div class="amount">Max Amount</div>
            <div class="features">Key Features</div>
          </div>
          <div class="comparison-row mariner highlight">
            <div class="lender">
              <strong>Mariner Finance</strong>
              <span class="badge">Best Choice</span>
            </div>
            <div class="rate">
              <strong>6.99%</strong>
            </div>
            <div class="amount">$50,000</div>
            <div class="features">
              • No prepayment penalty<br>
              • 24-hour approval<br>
              • 480+ locations
            </div>
          </div>
          <div class="comparison-row competitor">
            <div class="lender">Competitor A</div>
            <div class="rate">8.99%</div>
            <div class="amount">$40,000</div>
            <div class="features">
              • Prepayment penalty<br>
              • 3-5 day approval<br>
              • Online only
            </div>
          </div>
          <div class="comparison-row competitor">
            <div class="lender">Competitor B</div>
            <div class="rate">9.99%</div>
            <div class="amount">$35,000</div>
            <div class="features">
              • Origination fees<br>
              • 2-3 day approval<br>
              • Limited locations
            </div>
          </div>
        </div>
        <button class="cta-button primary">
          Get Your Rate
        </button>
      </div>
    </div>

    <!-- Customer Testimonials Widget -->
    <div v-if="widgetType === 'testimonials'" class="widget testimonials-widget">
      <div class="widget-header">
        <h3>What Our Customers Say</h3>
        <p>Real stories from satisfied borrowers</p>
      </div>
      <div class="widget-content">
        <div class="testimonial-carousel">
          <div v-for="(testimonial, index) in testimonials" :key="index" 
               :class="['testimonial', { active: activeTestimonial === index }]">
            <div class="rating">
              <span v-for="star in 5" :key="star" class="star">★</span>
            </div>
            <blockquote>
              "{{ testimonial.quote }}"
            </blockquote>
            <cite>
              <strong>{{ testimonial.name }}</strong>
              <span>{{ testimonial.location }}</span>
            </cite>
          </div>
        </div>
        <div class="carousel-controls">
          <button v-for="(testimonial, index) in testimonials" :key="index"
                  :class="['dot', { active: activeTestimonial === index }]"
                  @click="activeTestimonial = index">
          </button>
        </div>
        <button class="cta-button secondary">
          Start Your Application
        </button>
      </div>
    </div>

    <!-- Quick Apply Widget -->
    <div v-if="widgetType === 'quick-apply'" class="widget quick-apply-widget">
      <div class="widget-header">
        <h3>Get Pre-Qualified in 60 Seconds</h3>
        <p>No impact to your credit score</p>
      </div>
      <div class="widget-content">
        <form class="quick-form">
          <div class="form-row">
            <div class="input-group">
              <label>How much do you need?</label>
              <select v-model="quickAmount">
                <option value="">Select amount</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000-15000">$5,000 - $15,000</option>
                <option value="15000-25000">$15,000 - $25,000</option>
                <option value="25000-50000">$25,000 - $50,000</option>
              </select>
            </div>
            <div class="input-group">
              <label>Annual Income</label>
              <select v-model="quickIncome">
                <option value="">Select income</option>
                <option value="25000-35000">$25,000 - $35,000</option>
                <option value="35000-50000">$35,000 - $50,000</option>
                <option value="50000-75000">$50,000 - $75,000</option>
                <option value="75000+">$75,000+</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="input-group">
              <label>Credit Range</label>
              <select v-model="quickCredit">
                <option value="">Select range</option>
                <option value="poor">Poor (300-579)</option>
                <option value="fair">Fair (580-669)</option>
                <option value="good">Good (670-739)</option>
                <option value="excellent">Excellent (740+)</option>
              </select>
            </div>
            <div class="input-group">
              <label>ZIP Code</label>
              <input v-model="quickZip" type="text" placeholder="12345" maxlength="5">
            </div>
          </div>
          <button type="submit" class="cta-button primary full-width" 
                  :disabled="!canSubmitQuickForm">
            Check My Rate
          </button>
        </form>
        <div class="trust-indicators">
          <div class="indicator">
            <span class="icon">🔒</span>
            <span>256-bit SSL Encryption</span>
          </div>
          <div class="indicator">
            <span class="icon">⚡</span>
            <span>Instant Pre-Qualification</span>
          </div>
          <div class="indicator">
            <span class="icon">✓</span>
            <span>No Credit Impact</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Branch Locator Widget -->
    <div v-if="widgetType === 'locator'" class="widget locator-widget">
      <div class="widget-header">
        <h3>Find a Branch Near You</h3>
        <p>Over 480 locations nationwide</p>
      </div>
      <div class="widget-content">
        <div class="search-box">
          <input v-model="locationSearch" type="text" placeholder="Enter city, state, or ZIP code">
          <button class="search-btn">Search</button>
        </div>
        <div class="branch-results">
          <div v-for="branch in nearbyBranches" :key="branch.id" class="branch-item">
            <div class="branch-info">
              <h4>{{ branch.name }}</h4>
              <p class="address">{{ branch.address }}</p>
              <p class="distance">{{ branch.distance }} miles away</p>
            </div>
            <div class="branch-actions">
              <button class="link-btn">Get Directions</button>
              <button class="link-btn">Call Branch</button>
            </div>
          </div>
        </div>
        <button class="cta-button secondary">
          View All Locations
        </button>
      </div>
    </div>

    <!-- Financial Education Widget -->
    <div v-if="widgetType === 'education'" class="widget education-widget">
      <div class="widget-header">
        <h3>Financial Education Center</h3>
        <p>Learn before you borrow</p>
      </div>
      <div class="widget-content">
        <div class="education-grid">
          <div v-for="article in educationArticles" :key="article.id" class="article-card">
            <div class="article-category">{{ article.category }}</div>
            <h4>{{ article.title }}</h4>
            <p>{{ article.excerpt }}</p>
            <div class="article-meta">
              <span class="read-time">{{ article.readTime }} min read</span>
              <button class="read-more">Read More</button>
            </div>
          </div>
        </div>
        <button class="cta-button secondary">
          Visit Learning Center
        </button>
      </div>
    </div>

    <!-- Mobile App Promotion Widget -->
    <div v-if="widgetType === 'mobile-app'" class="widget mobile-app-widget">
      <div class="widget-header">
        <h3>Manage Your Loan On-the-Go</h3>
        <p>Download our mobile app for iOS and Android</p>
      </div>
      <div class="widget-content">
        <div class="app-features">
          <div class="feature-grid">
            <div class="feature">
              <span class="feature-icon">💳</span>
              <span>Make Payments</span>
            </div>
            <div class="feature">
              <span class="feature-icon">📊</span>
              <span>View Balance</span>
            </div>
            <div class="feature">
              <span class="feature-icon">📅</span>
              <span>Payment Reminders</span>
            </div>
            <div class="feature">
              <span class="feature-icon">📱</span>
              <span>Mobile Deposit</span>
            </div>
          </div>
        </div>
        <div class="download-buttons">
          <button class="download-btn ios">
            <span class="store-icon">📱</span>
            <div>
              <small>Download on the</small>
              <strong>App Store</strong>
            </div>
          </button>
          <button class="download-btn android">
            <span class="store-icon">🤖</span>
            <div>
              <small>Get it on</small>
              <strong>Google Play</strong>
            </div>
          </button>
        </div>
        <div class="app-rating">
          <div class="rating-stars">★★★★★</div>
          <span>4.8/5 rating with 10,000+ reviews</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  name: 'MarketingWidgets',
  props: {
    widgetType: {
      type: String,
      required: true,
      validator: (value) => [
        'calculator', 'rates', 'testimonials', 'quick-apply', 
        'locator', 'education', 'mobile-app'
      ].includes(value)
    }
  },
  setup() {
    // Calculator Widget Data
    const loanAmount = ref(15000);
    const termMonths = ref(36);
    const baseRate = 8.99;

    const calculatedPayment = computed(() => {
      const monthlyRate = baseRate / 100 / 12;
      const payment = (loanAmount.value * monthlyRate * Math.pow(1 + monthlyRate, termMonths.value)) / 
                     (Math.pow(1 + monthlyRate, termMonths.value) - 1);
      return Math.round(payment).toLocaleString();
    });

    const totalCost = computed(() => {
      const monthlyRate = baseRate / 100 / 12;
      const payment = (loanAmount.value * monthlyRate * Math.pow(1 + monthlyRate, termMonths.value)) / 
                     (Math.pow(1 + monthlyRate, termMonths.value) - 1);
      return Math.round(payment * termMonths.value);
    });

    // Quick Apply Widget Data
    const quickAmount = ref('');
    const quickIncome = ref('');
    const quickCredit = ref('');
    const quickZip = ref('');

    const canSubmitQuickForm = computed(() => {
      return quickAmount.value && quickIncome.value && quickCredit.value && quickZip.value;
    });

    // Testimonials Widget Data
    const activeTestimonial = ref(0);
    const testimonials = ref([
      {
        quote: "Mariner Finance made getting a personal loan so easy. I was approved in less than 24 hours and the funds were in my account the next day. Great customer service!",
        name: "Sarah M.",
        location: "Baltimore, MD"
      },
      {
        quote: "I needed to consolidate my credit card debt and Mariner Finance offered me a much better rate than my cards. The monthly payment fits perfectly in my budget.",
        name: "Michael R.",
        location: "Atlanta, GA"
      },
      {
        quote: "The branch staff was incredibly helpful and walked me through every step of the process. I never felt pressured and they answered all my questions.",
        name: "Jennifer L.",
        location: "Phoenix, AZ"
      }
    ]);

    // Branch Locator Widget Data
    const locationSearch = ref('');
    const nearbyBranches = ref([
      {
        id: 1,
        name: "Mariner Finance - Downtown",
        address: "123 Main St, Baltimore, MD 21201",
        distance: 2.3
      },
      {
        id: 2,
        name: "Mariner Finance - Eastside",
        address: "456 East Ave, Baltimore, MD 21224",
        distance: 4.7
      },
      {
        id: 3,
        name: "Mariner Finance - Westside",
        address: "789 West Blvd, Baltimore, MD 21229",
        distance: 6.1
      }
    ]);

    // Education Widget Data
    const educationArticles = ref([
      {
        id: 1,
        category: "Credit",
        title: "5 Ways to Improve Your Credit Score",
        excerpt: "Learn practical steps to boost your credit score and qualify for better rates.",
        readTime: 4
      },
      {
        id: 2,
        category: "Budgeting",
        title: "Creating a Budget That Works",
        excerpt: "Simple strategies to manage your money and reach your financial goals.",
        readTime: 6
      },
      {
        id: 3,
        category: "Loans",
        title: "Personal Loan vs Credit Card",
        excerpt: "Compare the pros and cons to decide which option is right for you.",
        readTime: 5
      }
    ]);

    // Auto-rotate testimonials
    onMounted(() => {
      setInterval(() => {
        activeTestimonial.value = (activeTestimonial.value + 1) % testimonials.value.length;
      }, 5000);
    });

    return {
      loanAmount,
      termMonths,
      calculatedPayment,
      totalCost,
      quickAmount,
      quickIncome,
      quickCredit,
      quickZip,
      canSubmitQuickForm,
      activeTestimonial,
      testimonials,
      locationSearch,
      nearbyBranches,
      educationArticles
    };
  }
};
</script>

<style scoped>
.marketing-widgets-container {
  max-width: 100%;
  margin: 0 auto;
}

.widget {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.widget-header {
  background: linear-gradient(135deg, #3860be 0%, #013474 100%);
  color: white;
  padding: 24px;
  text-align: center;
}

.widget-header h3 {
  margin: 0 0 8px 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.widget-header p {
  margin: 0;
  opacity: 0.9;
}

.widget-content {
  padding: 24px;
}

/* Calculator Widget Styles */
.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #374151;
}

.currency-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-input span {
  position: absolute;
  left: 12px;
  color: #6b7280;
  font-weight: bold;
  z-index: 1;
}

.currency-input input {
  width: 100%;
  padding: 12px 12px 12px 28px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 16px;
}

select, input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 16px;
}

.result-display {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-radius: 8px;
  padding: 20px;
  margin: 24px 0;
  text-align: center;
}

.monthly-payment .label {
  display: block;
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 8px;
}

.monthly-payment .amount {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #3860be;
}

.total-cost {
  margin-top: 12px;
  color: #6b7280;
  font-size: 14px;
}

/* Button Styles */
.cta-button {
  width: 100%;
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.cta-button.primary {
  background: linear-gradient(135deg, #3860be 0%, #013474 100%);
  color: white;
}

.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(56, 96, 190, 0.3);
}

.cta-button.secondary {
  background: transparent;
  color: #3860be;
  border: 2px solid #3860be;
}

.cta-button.secondary:hover {
  background: #3860be;
  color: white;
}

.cta-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.disclaimer {
  margin-top: 16px;
  font-size: 12px;
  color: #6b7280;
  text-align: center;
}

/* Rates Widget Styles */
.comparison-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.comparison-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.comparison-row.header {
  background: #f9fafb;
  font-weight: bold;
  color: #374151;
}

.comparison-row.highlight {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border-left: 4px solid #3860be;
}

.badge {
  background: #059669;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
}

.competitor {
  background: #f9fafb;
}

/* Testimonials Widget Styles */
.testimonial-carousel {
  position: relative;
  height: 200px;
  margin-bottom: 20px;
}

.testimonial {
  position: absolute;
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s;
  text-align: center;
}

.testimonial.active {
  opacity: 1;
}

.rating {
  color: #fbbf24;
  font-size: 1.5rem;
  margin-bottom: 16px;
}

blockquote {
  font-style: italic;
  font-size: 1.1rem;
  color: #374151;
  margin: 0 0 16px 0;
  line-height: 1.6;
}

cite {
  display: block;
  text-align: center;
}

cite strong {
  color: #3860be;
}

cite span {
  display: block;
  color: #6b7280;
  font-size: 14px;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #d1d5db;
  cursor: pointer;
  transition: background 0.2s;
}

.dot.active {
  background: #3860be;
}

/* Quick Apply Widget Styles */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

.trust-indicators {
  display: flex;
  justify-content: space-around;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.indicator {
  text-align: center;
  font-size: 14px;
  color: #6b7280;
}

.indicator .icon {
  display: block;
  font-size: 24px;
  margin-bottom: 8px;
}

/* Branch Locator Widget Styles */
.search-box {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.search-box input {
  flex: 1;
}

.search-btn {
  padding: 12px 24px;
  background: #3860be;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.branch-results {
  margin-bottom: 24px;
}

.branch-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
}

.branch-info h4 {
  margin: 0 0 4px 0;
  color: #374151;
}

.branch-info .address {
  margin: 0 0 4px 0;
  color: #6b7280;
  font-size: 14px;
}

.branch-info .distance {
  margin: 0;
  color: #3860be;
  font-size: 14px;
  font-weight: bold;
}

.branch-actions {
  display: flex;
  gap: 12px;
}

.link-btn {
  background: none;
  border: none;
  color: #3860be;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
}

/* Education Widget Styles */
.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.article-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  transition: transform 0.2s;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.article-category {
  background: #f3f4f6;
  color: #6b7280;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 12px;
}

.article-card h4 {
  margin: 0 0 8px 0;
  color: #374151;
}

.article-card p {
  margin: 0 0 16px 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.read-time {
  font-size: 12px;
  color: #9ca3af;
}

.read-more {
  background: none;
  border: none;
  color: #3860be;
  cursor: pointer;
  font-weight: bold;
  text-decoration: underline;
}

/* Mobile App Widget Styles */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.feature-icon {
  font-size: 24px;
}

.download-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.download-btn {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #1f2937;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.download-btn:hover {
  background: #374151;
}

.store-icon {
  font-size: 24px;
}

.download-btn div {
  text-align: left;
}

.download-btn small {
  display: block;
  font-size: 12px;
  opacity: 0.8;
}

.download-btn strong {
  display: block;
  font-size: 16px;
}

.app-rating {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.rating-stars {
  color: #fbbf24;
  font-size: 20px;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .comparison-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .trust-indicators {
    flex-direction: column;
    gap: 16px;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .download-buttons {
    flex-direction: column;
  }
}
</style>