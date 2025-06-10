<template>
  <div class="loading-system-demo">
    <header class="demo-header">
      <h1>Financial UI Loading System Demo</h1>
      <p>Comprehensive demonstration of skeleton loading, async management, and interactive motion components</p>
    </header>

    <div class="demo-sections">
      <!-- Skeleton Loading Demo -->
      <section class="demo-section">
        <h2>Skeleton Loading Components</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>Basic Skeletons</h3>
            <div class="skeleton-examples">
              <MSkeleton variant="text" width="80%" />
              <MSkeleton variant="circular" width="40px" height="40px" />
              <MSkeleton variant="rectangular" width="100%" height="100px" />
              <MSkeleton variant="button" width="120px" />
            </div>
          </div>

          <div class="demo-card">
            <h3>Financial Card Layout</h3>
            <MSkeletonGroup 
              layout="card" 
              :lines="3" 
              :show-image="true" 
              :image-height="120"
              color="primary"
            />
          </div>

          <div class="demo-card">
            <h3>Loan Applications List</h3>
            <MSkeletonGroup 
              layout="list" 
              :count="4" 
              :show-avatar="true" 
              :show-actions="true"
              :lines="2"
            />
          </div>

          <div class="demo-card">
            <h3>Payment History Table</h3>
            <MSkeletonGroup 
              layout="table" 
              :count="5" 
              :columns="4"
            />
          </div>
        </div>
      </section>

      <!-- Async Loading Demo -->
      <section class="demo-section">
        <h2>Async Data Loading</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>Loan Application Status</h3>
            <MAsyncLoader
              :loading="loanDataLoading"
              :error="loanDataError"
              :retry-count="3"
              variant="card"
              @retry="loadLoanData"
            >
              <template #loading>
                <MSkeletonGroup layout="card" :lines="4" :show-image="true" />
              </template>
              
              <template #error="{ error, retry, retryCount }">
                <div class="error-state">
                  <div class="error-icon">⚠️</div>
                  <h4>Failed to load loan application</h4>
                  <p>{{ error?.message || 'Unable to fetch loan data' }}</p>
                  <button @click="retry" class="retry-button">
                    Retry ({{ retryCount }}/3)
                  </button>
                </div>
              </template>
              
              <div v-if="loanData" class="loan-data">
                <h4>{{ loanData.applicationId }}</h4>
                <p>Status: {{ loanData.status }}</p>
                <p>Amount: ${{ loanData.amount?.toLocaleString() }}</p>
                <p>Date: {{ loanData.date }}</p>
              </div>
            </MAsyncLoader>
          </div>

          <div class="demo-card">
            <h3>Credit Score Loading</h3>
            <MAsyncLoader
              :loading="creditScoreLoading"
              :error="creditScoreError"
              variant="minimal"
              @retry="loadCreditScore"
            >
              <template #loading>
                <div class="credit-score-skeleton">
                  <MSkeleton variant="circular" width="120px" height="120px" />
                  <MSkeleton variant="text" width="60%" />
                </div>
              </template>
              
              <div v-if="creditScore" class="credit-score">
                <div class="score-circle">{{ creditScore.score }}</div>
                <p>{{ creditScore.rating }}</p>
              </div>
            </MAsyncLoader>
          </div>
        </div>
      </section>

      <!-- Interactive Motion Demo -->
      <section class="demo-section">
        <h2>Interactive Motion & Feedback</h2>
        
        <div class="demo-grid">
          <div class="demo-card">
            <h3>Payment Buttons</h3>
            <div class="button-examples">
              <MMotionRipple color="rgba(59, 130, 246, 0.3)">
                <MMotionFeedback
                  :state="paymentState"
                  :progress="paymentProgress"
                  intensity="medium"
                  @click="processPayment"
                >
                  <button class="payment-button primary">
                    Process Payment
                  </button>
                </MMotionFeedback>
              </MMotionRipple>

              <MMotionRipple color="rgba(16, 185, 129, 0.3)">
                <MMotionFeedback
                  state="success"
                  intensity="subtle"
                >
                  <button class="payment-button success">
                    Payment Confirmed
                  </button>
                </MMotionFeedback>
              </MMotionRipple>
            </div>
          </div>

          <div class="demo-card">
            <h3>Form Transitions</h3>
            <div class="transition-examples">
              <MMotionTransition
                :show="showForm"
                preset="slideInUp"
                :duration="300"
              >
                <form class="loan-form">
                  <h4>Quick Loan Application</h4>
                  <input type="text" placeholder="Full Name" />
                  <input type="email" placeholder="Email Address" />
                  <input type="number" placeholder="Loan Amount" />
                  <button type="submit">Submit Application</button>
                </form>
              </MMotionTransition>
              
              <button @click="showForm = !showForm" class="toggle-button">
                {{ showForm ? 'Hide' : 'Show' }} Application Form
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Controls -->
      <section class="demo-section">
        <h2>Demo Controls</h2>
        <div class="demo-controls">
          <button @click="toggleLoading" class="control-button">
            {{ loanDataLoading ? 'Stop' : 'Start' }} Loan Data Loading
          </button>
          <button @click="simulateError" class="control-button">
            Simulate Loan Data Error
          </button>
          <button @click="toggleCreditScore" class="control-button">
            {{ creditScoreLoading ? 'Stop' : 'Start' }} Credit Score Loading
          </button>
          <button @click="resetDemo" class="control-button">
            Reset Demo
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import MSkeleton from '../ui/MSkeleton.vue';
import MSkeletonGroup from '../ui/MSkeletonGroup.vue';
import MAsyncLoader from '../ui/MAsyncLoader.vue';
import MMotionRipple from '../ui/MMotionRipple.vue';
import MMotionTransition from '../ui/MMotionTransition.vue';
import MMotionFeedback from '../ui/MMotionFeedback.vue';

export default {
  name: 'LoadingSystemDemo',
  components: {
    MSkeleton,
    MSkeletonGroup,
    MAsyncLoader,
    MMotionRipple,
    MMotionTransition,
    MMotionFeedback
  },
  
  data() {
    return {
      // Loan data states
      loanDataLoading: false,
      loanDataError: null,
      loanData: null,
      
      // Credit score states
      creditScoreLoading: false,
      creditScoreError: null,
      creditScore: null,
      
      // Payment states
      paymentState: 'idle',
      paymentProgress: 0,
      
      // UI states
      showForm: false,
      
      // Demo data
      mockLoanData: {
        applicationId: 'LA-2024-001234',
        status: 'Under Review',
        amount: 250000,
        date: '2024-06-09'
      },
      
      mockCreditScore: {
        score: 742,
        rating: 'Excellent'
      }
    };
  },
  
  methods: {
    // Loan data methods
    toggleLoading() {
      if (this.loanDataLoading) {
        this.loanDataLoading = false;
      } else {
        this.loadLoanData();
      }
    },
    
    loadLoanData() {
      this.loanDataLoading = true;
      this.loanDataError = null;
      
      // Simulate API call
      setTimeout(() => {
        this.loanDataLoading = false;
        this.loanData = { ...this.mockLoanData };
      }, 2000);
    },
    
    simulateError() {
      this.loanDataLoading = true;
      this.loanDataError = null;
      
      setTimeout(() => {
        this.loanDataLoading = false;
        this.loanDataError = new Error('Network connection failed. Please check your internet connection and try again.');
      }, 1500);
    },
    
    // Credit score methods
    toggleCreditScore() {
      if (this.creditScoreLoading) {
        this.creditScoreLoading = false;
      } else {
        this.loadCreditScore();
      }
    },
    
    loadCreditScore() {
      this.creditScoreLoading = true;
      this.creditScoreError = null;
      
      setTimeout(() => {
        this.creditScoreLoading = false;
        this.creditScore = { ...this.mockCreditScore };
      }, 3000);
    },
    
    // Payment methods
    processPayment() {
      if (this.paymentState === 'loading') return;
      
      this.paymentState = 'loading';
      this.paymentProgress = 0;
      
      const interval = setInterval(() => {
        this.paymentProgress += 10;
        
        if (this.paymentProgress >= 100) {
          clearInterval(interval);
          this.paymentState = 'success';
          
          setTimeout(() => {
            this.paymentState = 'idle';
            this.paymentProgress = 0;
          }, 2000);
        }
      }, 200);
    },
    
    // Demo controls
    resetDemo() {
      this.loanDataLoading = false;
      this.loanDataError = null;
      this.loanData = null;
      
      this.creditScoreLoading = false;
      this.creditScoreError = null;
      this.creditScore = null;
      
      this.paymentState = 'idle';
      this.paymentProgress = 0;
      
      this.showForm = false;
    }
  }
};
</script>

<style scoped>
.loading-system-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--vspace-32);
  font-family: var(--theme-font-family, 'Inter, system-ui, sans-serif');
}

.demo-header {
  text-align: center;
  margin-bottom: var(--vspace-32);
}

.demo-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--vspace-16);
}

.demo-header p {
  font-size: 1.125rem;
  color: var(--text-secondary);
}

.demo-section {
  margin-bottom: var(--vspace-32);
}

.demo-section h2 {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--vspace-24);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: var(--vspace-8);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--vspace-24);
}

.demo-card {
  background: var(--surface-color);
  border: 1px solid var(--color-grey-area);
  border-radius: var(--border-radius-3);
  padding: var(--vspace-24);
  box-shadow: var(--shadow-2);
}

.demo-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--vspace-16);
}

.skeleton-examples {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-12);
}

.error-state {
  text-align: center;
  padding: var(--vspace-24);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: var(--vspace-16);
}

.error-state h4 {
  color: var(--error-color);
  margin-bottom: var(--vspace-8);
}

.retry-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: var(--vspace-8) var(--vspace-16);
  border-radius: var(--border-radius-2);
  cursor: pointer;
  transition: var(--transition-16);
}

.retry-button:hover {
  background: var(--primary-dark);
}

.loan-data,
.credit-score {
  padding: var(--vspace-16);
  border-radius: var(--border-radius-2);
  background: var(--color-ceramic);
}

.credit-score-skeleton {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--vspace-16);
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--success-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
}

.button-examples {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-16);
}

.payment-button {
  width: 100%;
  padding: var(--vspace-12) var(--vspace-24);
  border: none;
  border-radius: var(--border-radius-2);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-16);
}

.payment-button.primary {
  background: var(--primary-color);
  color: white;
}

.payment-button.success {
  background: var(--success-color);
  color: white;
}

.transition-examples {
  display: flex;
  flex-direction: column;
  gap: var(--vspace-16);
}

.loan-form {
  background: var(--surface-color);
  padding: var(--vspace-24);
  border-radius: var(--border-radius-3);
  border: 1px solid var(--color-grey-area);
}

.loan-form h4 {
  margin-bottom: var(--vspace-16);
  color: var(--text-primary);
}

.loan-form input {
  width: 100%;
  padding: var(--vspace-8);
  margin-bottom: var(--vspace-12);
  border: 1px solid var(--color-grey-area);
  border-radius: var(--border-radius-2);
}

.loan-form button {
  width: 100%;
  padding: var(--vspace-12);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius-2);
  cursor: pointer;
}

.toggle-button,
.control-button {
  background: var(--secondary-color);
  color: white;
  border: none;
  padding: var(--vspace-8) var(--vspace-16);
  border-radius: var(--border-radius-2);
  cursor: pointer;
  margin-right: var(--hspace-8);
  margin-bottom: var(--vspace-8);
  transition: var(--transition-16);
}

.toggle-button:hover,
.control-button:hover {
  background: var(--secondary-dark);
}

.demo-controls {
  display: flex;
  flex-wrap: wrap;
  gap: var(--vspace-8);
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }
  
  .loading-system-demo {
    padding: var(--vspace-16);
  }
  
  .demo-header h1 {
    font-size: 2rem;
  }
}
</style>
