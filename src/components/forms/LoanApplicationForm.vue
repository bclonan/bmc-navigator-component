<template>
  <div class="loan-application-form">
    <div class="form-header">
      <h1>Personal Loan Application</h1>
      <p>Complete your loan application in {{ totalSteps }} easy steps</p>
    </div>

    <!-- Progress Indicator -->
    <div class="progress-section">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: `${(currentStep / totalSteps) * 100}%` }"
        ></div>
      </div>
      <div class="step-labels">
        <span 
          v-for="step in totalSteps" 
          :key="step"
          :class="['step-label', { 
            'active': step === currentStep, 
            'completed': step < currentStep 
          }]"
        >
          {{ getStepLabel(step) }}
        </span>
      </div>
    </div>

    <!-- Mood Tracker Integration -->
    <MoodTracker
      :current-step="currentStep"
      :total-steps="totalSteps"
      :compact="true"
      :show-insights="true"
      :show-feedback="true"
      :auto-track="true"
      @mood-changed="handleMoodChanged"
      @help-requested="handleHelpRequested"
      @break-requested="handleBreakRequested"
      @completed="handleMoodCompleted"
    />

    <!-- Form Steps -->
    <div class="form-content">
      <!-- Step 1: Personal Information -->
      <div v-if="currentStep === 1" class="form-step">
        <div class="step-header">
          <h2>Personal Information</h2>
          <p>Please provide your basic personal details</p>
        </div>
        
        <div class="form-fields">
          <div class="field-group">
            <label>First Name *</label>
            <input 
              v-model="formData.firstName" 
              type="text" 
              required 
              class="form-input"
              placeholder="Enter your first name"
              @blur="validateField('firstName')"
            />
            <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
          </div>
          
          <div class="field-group">
            <label>Last Name *</label>
            <input 
              v-model="formData.lastName" 
              type="text" 
              required 
              class="form-input"
              placeholder="Enter your last name"
              @blur="validateField('lastName')"
            />
            <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
          </div>
          
          <div class="field-group">
            <label>Email Address *</label>
            <input 
              v-model="formData.email" 
              type="email" 
              required 
              class="form-input"
              placeholder="your.email@example.com"
              @blur="validateField('email')"
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>
          
          <div class="field-group">
            <label>Phone Number *</label>
            <input 
              v-model="formData.phone" 
              type="tel" 
              required 
              class="form-input"
              placeholder="(555) 123-4567"
              @blur="validateField('phone')"
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>
          
          <div class="field-group">
            <label>Date of Birth *</label>
            <input 
              v-model="formData.dateOfBirth" 
              type="date" 
              required 
              class="form-input"
              @blur="validateField('dateOfBirth')"
            />
            <span v-if="errors.dateOfBirth" class="error-message">{{ errors.dateOfBirth }}</span>
          </div>
          
          <div class="field-group">
            <label>Social Security Number *</label>
            <input 
              v-model="formData.ssn" 
              type="text" 
              required 
              class="form-input"
              placeholder="XXX-XX-XXXX"
              maxlength="11"
              @input="formatSSN"
              @blur="validateField('ssn')"
            />
            <span v-if="errors.ssn" class="error-message">{{ errors.ssn }}</span>
            <span class="field-help">Your SSN is encrypted and secure</span>
          </div>
        </div>
      </div>

      <!-- Step 2: Address Information -->
      <div v-if="currentStep === 2" class="form-step">
        <div class="step-header">
          <h2>Address Information</h2>
          <p>Where do you currently live?</p>
        </div>
        
        <div class="form-fields">
          <div class="field-group full-width">
            <label>Street Address *</label>
            <input 
              v-model="formData.address" 
              type="text" 
              required 
              class="form-input"
              placeholder="123 Main Street"
              @blur="validateField('address')"
            />
            <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
          </div>
          
          <div class="field-group">
            <label>City *</label>
            <input 
              v-model="formData.city" 
              type="text" 
              required 
              class="form-input"
              placeholder="Your city"
              @blur="validateField('city')"
            />
            <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
          </div>
          
          <div class="field-group">
            <label>State *</label>
            <select 
              v-model="formData.state" 
              required 
              class="form-input"
              @blur="validateField('state')"
            >
              <option value="">Select State</option>
              <option v-for="state in states" :key="state.code" :value="state.code">
                {{ state.name }}
              </option>
            </select>
            <span v-if="errors.state" class="error-message">{{ errors.state }}</span>
          </div>
          
          <div class="field-group">
            <label>ZIP Code *</label>
            <input 
              v-model="formData.zipCode" 
              type="text" 
              required 
              class="form-input"
              placeholder="12345"
              maxlength="5"
              @blur="validateField('zipCode')"
            />
            <span v-if="errors.zipCode" class="error-message">{{ errors.zipCode }}</span>
          </div>
          
          <div class="field-group">
            <label>Housing Status *</label>
            <select 
              v-model="formData.housingStatus" 
              required 
              class="form-input"
              @blur="validateField('housingStatus')"
            >
              <option value="">Select Housing Status</option>
              <option value="own">Own</option>
              <option value="rent">Rent</option>
              <option value="live-with-family">Live with Family</option>
              <option value="other">Other</option>
            </select>
            <span v-if="errors.housingStatus" class="error-message">{{ errors.housingStatus }}</span>
          </div>
          
          <div class="field-group">
            <label>Monthly Housing Payment</label>
            <input 
              v-model="formData.monthlyHousingPayment" 
              type="number" 
              class="form-input"
              placeholder="1500"
              min="0"
            />
            <span class="field-help">Rent or mortgage payment (optional)</span>
          </div>
        </div>
      </div>

      <!-- Step 3: Employment Information -->
      <div v-if="currentStep === 3" class="form-step">
        <div class="step-header">
          <h2>Employment Information</h2>
          <p>Tell us about your current employment</p>
        </div>
        
        <div class="form-fields">
          <div class="field-group">
            <label>Employment Status *</label>
            <select 
              v-model="formData.employmentStatus" 
              required 
              class="form-input"
              @change="handleEmploymentStatusChange"
              @blur="validateField('employmentStatus')"
            >
              <option value="">Select Employment Status</option>
              <option value="employed">Employed</option>
              <option value="self-employed">Self-Employed</option>
              <option value="retired">Retired</option>
              <option value="unemployed">Unemployed</option>
              <option value="student">Student</option>
            </select>
            <span v-if="errors.employmentStatus" class="error-message">{{ errors.employmentStatus }}</span>
          </div>
          
          <template v-if="formData.employmentStatus === 'employed' || formData.employmentStatus === 'self-employed'">
            <div class="field-group">
              <label>Employer Name *</label>
              <input 
                v-model="formData.employerName" 
                type="text" 
                required 
                class="form-input"
                placeholder="Company Name"
                @blur="validateField('employerName')"
              />
              <span v-if="errors.employerName" class="error-message">{{ errors.employerName }}</span>
            </div>
            
            <div class="field-group">
              <label>Job Title *</label>
              <input 
                v-model="formData.jobTitle" 
                type="text" 
                required 
                class="form-input"
                placeholder="Your job title"
                @blur="validateField('jobTitle')"
              />
              <span v-if="errors.jobTitle" class="error-message">{{ errors.jobTitle }}</span>
            </div>
            
            <div class="field-group">
              <label>Employment Start Date *</label>
              <input 
                v-model="formData.employmentStartDate" 
                type="date" 
                required 
                class="form-input"
                @blur="validateField('employmentStartDate')"
              />
              <span v-if="errors.employmentStartDate" class="error-message">{{ errors.employmentStartDate }}</span>
            </div>
          </template>
          
          <div class="field-group">
            <label>Annual Income *</label>
            <input 
              v-model="formData.annualIncome" 
              type="number" 
              required 
              class="form-input"
              placeholder="50000"
              min="0"
              @blur="validateField('annualIncome')"
            />
            <span v-if="errors.annualIncome" class="error-message">{{ errors.annualIncome }}</span>
            <span class="field-help">Enter your gross annual income</span>
          </div>
          
          <div class="field-group">
            <label>Additional Income Sources</label>
            <textarea 
              v-model="formData.additionalIncome" 
              class="form-input"
              rows="3"
              placeholder="Other income sources (optional)"
            ></textarea>
            <span class="field-help">Rental income, investments, etc.</span>
          </div>
        </div>
      </div>

      <!-- Step 4: Loan Details -->
      <div v-if="currentStep === 4" class="form-step">
        <div class="step-header">
          <h2>Loan Details</h2>
          <p>Tell us about the loan you need</p>
        </div>
        
        <div class="form-fields">
          <div class="field-group">
            <label>Loan Amount *</label>
            <div class="loan-amount-slider">
              <input 
                v-model="formData.loanAmount" 
                type="range" 
                min="1000" 
                max="50000" 
                step="500"
                class="slider"
                @input="updateLoanCalculations"
              />
              <div class="amount-display">
                ${{ formatCurrency(formData.loanAmount) }}
              </div>
            </div>
            <span v-if="errors.loanAmount" class="error-message">{{ errors.loanAmount }}</span>
          </div>
          
          <div class="field-group">
            <label>Loan Purpose *</label>
            <select 
              v-model="formData.loanPurpose" 
              required 
              class="form-input"
              @blur="validateField('loanPurpose')"
            >
              <option value="">Select Purpose</option>
              <option value="debt-consolidation">Debt Consolidation</option>
              <option value="home-improvement">Home Improvement</option>
              <option value="major-purchase">Major Purchase</option>
              <option value="medical-expenses">Medical Expenses</option>
              <option value="vacation">Vacation</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </select>
            <span v-if="errors.loanPurpose" class="error-message">{{ errors.loanPurpose }}</span>
          </div>
          
          <div class="field-group">
            <label>Preferred Term *</label>
            <select 
              v-model="formData.loanTerm" 
              required 
              class="form-input"
              @change="updateLoanCalculations"
              @blur="validateField('loanTerm')"
            >
              <option value="">Select Term</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
            </select>
            <span v-if="errors.loanTerm" class="error-message">{{ errors.loanTerm }}</span>
          </div>
          
          <div class="loan-calculator" v-if="formData.loanAmount && formData.loanTerm">
            <h3>Estimated Monthly Payment</h3>
            <div class="payment-breakdown">
              <div class="payment-amount">${{ calculateMonthlyPayment() }}</div>
              <div class="payment-details">
                <div class="detail-item">
                  <span>Principal:</span>
                  <span>${{ formatCurrency(formData.loanAmount) }}</span>
                </div>
                <div class="detail-item">
                  <span>Estimated APR:</span>
                  <span>{{ estimatedAPR }}%</span>
                </div>
                <div class="detail-item">
                  <span>Total Interest:</span>
                  <span>${{ calculateTotalInterest() }}</span>
                </div>
                <div class="detail-item">
                  <span>Total Cost:</span>
                  <span>${{ calculateTotalCost() }}</span>
                </div>
              </div>
            </div>
            <p class="calculator-disclaimer">
              *This is an estimate. Your actual rate and payment may differ based on creditworthiness and other factors.
            </p>
          </div>
        </div>
      </div>

      <!-- Step 5: Review & Submit -->
      <div v-if="currentStep === 5" class="form-step">
        <div class="step-header">
          <h2>Review Your Application</h2>
          <p>Please review all information before submitting</p>
        </div>
        
        <div class="review-sections">
          <div class="review-section">
            <h3>Personal Information</h3>
            <div class="review-grid">
              <div class="review-item">
                <label>Name:</label>
                <span>{{ formData.firstName }} {{ formData.lastName }}</span>
              </div>
              <div class="review-item">
                <label>Email:</label>
                <span>{{ formData.email }}</span>
              </div>
              <div class="review-item">
                <label>Phone:</label>
                <span>{{ formData.phone }}</span>
              </div>
              <div class="review-item">
                <label>Date of Birth:</label>
                <span>{{ formatDate(formData.dateOfBirth) }}</span>
              </div>
            </div>
          </div>
          
          <div class="review-section">
            <h3>Address</h3>
            <div class="review-grid">
              <div class="review-item">
                <label>Address:</label>
                <span>{{ formData.address }}, {{ formData.city }}, {{ formData.state }} {{ formData.zipCode }}</span>
              </div>
              <div class="review-item">
                <label>Housing Status:</label>
                <span>{{ formatHousingStatus(formData.housingStatus) }}</span>
              </div>
            </div>
          </div>
          
          <div class="review-section">
            <h3>Employment</h3>
            <div class="review-grid">
              <div class="review-item">
                <label>Status:</label>
                <span>{{ formatEmploymentStatus(formData.employmentStatus) }}</span>
              </div>
              <div class="review-item" v-if="formData.employerName">
                <label>Employer:</label>
                <span>{{ formData.employerName }}</span>
              </div>
              <div class="review-item">
                <label>Annual Income:</label>
                <span>${{ formatCurrency(formData.annualIncome) }}</span>
              </div>
            </div>
          </div>
          
          <div class="review-section">
            <h3>Loan Details</h3>
            <div class="review-grid">
              <div class="review-item">
                <label>Amount:</label>
                <span>${{ formatCurrency(formData.loanAmount) }}</span>
              </div>
              <div class="review-item">
                <label>Purpose:</label>
                <span>{{ formatLoanPurpose(formData.loanPurpose) }}</span>
              </div>
              <div class="review-item">
                <label>Term:</label>
                <span>{{ formData.loanTerm }} months</span>
              </div>
              <div class="review-item">
                <label>Estimated Payment:</label>
                <span>${{ calculateMonthlyPayment() }}/month</span>
              </div>
            </div>
          </div>
          
          <div class="consent-section">
            <div class="consent-item">
              <input 
                type="checkbox" 
                id="terms-consent" 
                v-model="consents.terms"
                required
              />
              <label for="terms-consent">
                I agree to the <a href="#" @click.prevent="showTerms">Terms and Conditions</a> *
              </label>
            </div>
            
            <div class="consent-item">
              <input 
                type="checkbox" 
                id="credit-consent" 
                v-model="consents.creditCheck"
                required
              />
              <label for="credit-consent">
                I authorize Mariner Finance to perform a credit check *
              </label>
            </div>
            
            <div class="consent-item">
              <input 
                type="checkbox" 
                id="marketing-consent" 
                v-model="consents.marketing"
              />
              <label for="marketing-consent">
                I agree to receive marketing communications (optional)
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Navigation -->
    <div class="form-navigation">
      <button 
        v-if="currentStep > 1" 
        @click="previousStep" 
        class="nav-button secondary"
        :disabled="isSubmitting"
      >
        Previous
      </button>
      
      <button 
        v-if="currentStep < totalSteps" 
        @click="nextStep" 
        class="nav-button primary"
        :disabled="!canProceed || isSubmitting"
      >
        {{ currentStep === totalSteps - 1 ? 'Review Application' : 'Next Step' }}
      </button>
      
      <button 
        v-if="currentStep === totalSteps" 
        @click="submitApplication" 
        class="nav-button submit"
        :disabled="!canSubmit || isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
      </button>
    </div>

    <!-- Help Modal -->
    <div v-if="showHelpModal" class="help-modal-overlay" @click="closeHelpModal">
      <div class="help-modal" @click.stop>
        <div class="help-header">
          <h3>Need Help?</h3>
          <button @click="closeHelpModal" class="close-button">×</button>
        </div>
        <div class="help-content">
          <p>Our customer service team is here to help you complete your application.</p>
          <div class="help-options">
            <button @click="callSupport" class="help-option">
              <span class="help-icon">📞</span>
              <span>Call (1-877-310-2373)</span>
            </button>
            <button @click="startChat" class="help-option">
              <span class="help-icon">💬</span>
              <span>Start Live Chat</span>
            </button>
            <button @click="scheduleCallback" class="help-option">
              <span class="help-icon">📅</span>
              <span>Schedule Callback</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue';
import MoodTracker from './MoodTracker.vue';

export default {
  name: 'LoanApplicationForm',
  components: {
    MoodTracker
  },
  setup() {
    const currentStep = ref(1);
    const totalSteps = ref(5);
    const isSubmitting = ref(false);
    const showHelpModal = ref(false);
    const moodData = ref([]);

    // Form data
    const formData = ref({
      // Personal Info
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      ssn: '',
      // Address
      address: '',
      city: '',
      state: '',
      zipCode: '',
      housingStatus: '',
      monthlyHousingPayment: '',
      // Employment
      employmentStatus: '',
      employerName: '',
      jobTitle: '',
      employmentStartDate: '',
      annualIncome: '',
      additionalIncome: '',
      // Loan
      loanAmount: 25000,
      loanPurpose: '',
      loanTerm: ''
    });

    // Validation errors
    const errors = ref({});

    // Consents
    const consents = ref({
      terms: false,
      creditCheck: false,
      marketing: false
    });

    // US States data
    const states = ref([
      { code: 'AL', name: 'Alabama' },
      { code: 'AK', name: 'Alaska' },
      { code: 'AZ', name: 'Arizona' },
      { code: 'AR', name: 'Arkansas' },
      { code: 'CA', name: 'California' },
      { code: 'CO', name: 'Colorado' },
      { code: 'CT', name: 'Connecticut' },
      { code: 'DE', name: 'Delaware' },
      { code: 'FL', name: 'Florida' },
      { code: 'GA', name: 'Georgia' },
      { code: 'HI', name: 'Hawaii' },
      { code: 'ID', name: 'Idaho' },
      { code: 'IL', name: 'Illinois' },
      { code: 'IN', name: 'Indiana' },
      { code: 'IA', name: 'Iowa' },
      { code: 'KS', name: 'Kansas' },
      { code: 'KY', name: 'Kentucky' },
      { code: 'LA', name: 'Louisiana' },
      { code: 'ME', name: 'Maine' },
      { code: 'MD', name: 'Maryland' },
      { code: 'MA', name: 'Massachusetts' },
      { code: 'MI', name: 'Michigan' },
      { code: 'MN', name: 'Minnesota' },
      { code: 'MS', name: 'Mississippi' },
      { code: 'MO', name: 'Missouri' },
      { code: 'MT', name: 'Montana' },
      { code: 'NE', name: 'Nebraska' },
      { code: 'NV', name: 'Nevada' },
      { code: 'NH', name: 'New Hampshire' },
      { code: 'NJ', name: 'New Jersey' },
      { code: 'NM', name: 'New Mexico' },
      { code: 'NY', name: 'New York' },
      { code: 'NC', name: 'North Carolina' },
      { code: 'ND', name: 'North Dakota' },
      { code: 'OH', name: 'Ohio' },
      { code: 'OK', name: 'Oklahoma' },
      { code: 'OR', name: 'Oregon' },
      { code: 'PA', name: 'Pennsylvania' },
      { code: 'RI', name: 'Rhode Island' },
      { code: 'SC', name: 'South Carolina' },
      { code: 'SD', name: 'South Dakota' },
      { code: 'TN', name: 'Tennessee' },
      { code: 'TX', name: 'Texas' },
      { code: 'UT', name: 'Utah' },
      { code: 'VT', name: 'Vermont' },
      { code: 'VA', name: 'Virginia' },
      { code: 'WA', name: 'Washington' },
      { code: 'WV', name: 'West Virginia' },
      { code: 'WI', name: 'Wisconsin' },
      { code: 'WY', name: 'Wyoming' }
    ]);

    const estimatedAPR = ref(8.99);

    // Computed properties
    const canProceed = computed(() => {
      return validateCurrentStep();
    });

    const canSubmit = computed(() => {
      return consents.value.terms && consents.value.creditCheck && validateAllSteps();
    });

    // Methods
    const getStepLabel = (step) => {
      const labels = {
        1: 'Personal',
        2: 'Address',
        3: 'Employment',
        4: 'Loan Details',
        5: 'Review'
      };
      return labels[step] || `Step ${step}`;
    };

    const validateField = (fieldName) => {
      const value = formData.value[fieldName];
      
      // Clear previous error
      delete errors.value[fieldName];
      
      // Required field validation
      const requiredFields = [
        'firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'ssn',
        'address', 'city', 'state', 'zipCode', 'housingStatus',
        'employmentStatus', 'annualIncome', 'loanAmount', 'loanPurpose', 'loanTerm'
      ];
      
      if (requiredFields.includes(fieldName) && (!value || value.toString().trim() === '')) {
        errors.value[fieldName] = 'This field is required';
        return false;
      }
      
      // Specific field validations
      switch (fieldName) {
        case 'email':
          if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errors.value[fieldName] = 'Please enter a valid email address';
            return false;
          }
          break;
        case 'phone':
          if (value && !/^\(?[\d\s\-\(\)]{10,}$/.test(value.replace(/\D/g, ''))) {
            errors.value[fieldName] = 'Please enter a valid phone number';
            return false;
          }
          break;
        case 'ssn':
          if (value && !/^\d{3}-\d{2}-\d{4}$/.test(value)) {
            errors.value[fieldName] = 'Please enter a valid SSN (XXX-XX-XXXX)';
            return false;
          }
          break;
        case 'zipCode':
          if (value && !/^\d{5}$/.test(value)) {
            errors.value[fieldName] = 'Please enter a valid 5-digit ZIP code';
            return false;
          }
          break;
        case 'annualIncome':
          if (value && (isNaN(value) || value < 0)) {
            errors.value[fieldName] = 'Please enter a valid income amount';
            return false;
          }
          break;
        case 'loanAmount':
          if (value && (isNaN(value) || value < 1000 || value > 50000)) {
            errors.value[fieldName] = 'Loan amount must be between $1,000 and $50,000';
            return false;
          }
          break;
      }
      
      return true;
    };

    const validateCurrentStep = () => {
      const stepFields = {
        1: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'ssn'],
        2: ['address', 'city', 'state', 'zipCode', 'housingStatus'],
        3: ['employmentStatus', 'annualIncome'],
        4: ['loanAmount', 'loanPurpose', 'loanTerm'],
        5: []
      };
      
      const fields = stepFields[currentStep.value] || [];
      let isValid = true;
      
      fields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      // Additional step-specific validations
      if (currentStep.value === 3) {
        if (formData.value.employmentStatus === 'employed' || formData.value.employmentStatus === 'self-employed') {
          ['employerName', 'jobTitle', 'employmentStartDate'].forEach(field => {
            if (!validateField(field)) {
              isValid = false;
            }
          });
        }
      }
      
      return isValid;
    };

    const validateAllSteps = () => {
      for (let step = 1; step <= totalSteps.value - 1; step++) {
        currentStep.value = step;
        if (!validateCurrentStep()) {
          return false;
        }
      }
      currentStep.value = totalSteps.value;
      return true;
    };

    const nextStep = () => {
      if (validateCurrentStep() && currentStep.value < totalSteps.value) {
        currentStep.value++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const previousStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const submitApplication = async () => {
      if (!canSubmit.value) return;
      
      try {
        isSubmitting.value = true;
        
        const applicationData = {
          ...formData.value,
          consents: consents.value,
          moodData: moodData.value,
          submittedAt: new Date().toISOString()
        };
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Success - redirect or show success message
        alert('Application submitted successfully! We will review your application and contact you within 24 hours.');
        
      } catch (error) {
        alert('There was an error submitting your application. Please try again.');
      } finally {
        isSubmitting.value = false;
      }
    };

    const formatSSN = (event) => {
      let value = event.target.value.replace(/\D/g, '');
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
      } else if (value.length >= 4) {
        value = value.replace(/(\d{3})(\d{2})/, '$1-$2');
      }
      formData.value.ssn = value;
    };

    const handleEmploymentStatusChange = () => {
      // Clear employment fields if not employed
      if (formData.value.employmentStatus !== 'employed' && formData.value.employmentStatus !== 'self-employed') {
        formData.value.employerName = '';
        formData.value.jobTitle = '';
        formData.value.employmentStartDate = '';
      }
    };

    const updateLoanCalculations = () => {
      // Trigger recalculation of payment estimates
    };

    const calculateMonthlyPayment = () => {
      const principal = parseFloat(formData.value.loanAmount) || 0;
      const rate = (estimatedAPR.value / 100) / 12;
      const term = parseInt(formData.value.loanTerm) || 1;
      
      if (rate === 0) {
        return Math.round(principal / term);
      }
      
      const payment = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
      return Math.round(payment);
    };

    const calculateTotalInterest = () => {
      const monthlyPayment = calculateMonthlyPayment();
      const term = parseInt(formData.value.loanTerm) || 1;
      const principal = parseFloat(formData.value.loanAmount) || 0;
      
      return Math.round((monthlyPayment * term) - principal);
    };

    const calculateTotalCost = () => {
      const monthlyPayment = calculateMonthlyPayment();
      const term = parseInt(formData.value.loanTerm) || 1;
      
      return Math.round(monthlyPayment * term);
    };

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US').format(amount || 0);
    };

    const formatDate = (dateString) => {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US');
    };

    const formatHousingStatus = (status) => {
      const statuses = {
        'own': 'Own',
        'rent': 'Rent',
        'live-with-family': 'Live with Family',
        'other': 'Other'
      };
      return statuses[status] || status;
    };

    const formatEmploymentStatus = (status) => {
      const statuses = {
        'employed': 'Employed',
        'self-employed': 'Self-Employed',
        'retired': 'Retired',
        'unemployed': 'Unemployed',
        'student': 'Student'
      };
      return statuses[status] || status;
    };

    const formatLoanPurpose = (purpose) => {
      const purposes = {
        'debt-consolidation': 'Debt Consolidation',
        'home-improvement': 'Home Improvement',
        'major-purchase': 'Major Purchase',
        'medical-expenses': 'Medical Expenses',
        'vacation': 'Vacation',
        'wedding': 'Wedding',
        'other': 'Other'
      };
      return purposes[purpose] || purpose;
    };

    // Mood tracker event handlers
    const handleMoodChanged = (moodEvent) => {
      moodData.value.push(moodEvent);
      console.log('Mood changed:', moodEvent);
    };

    const handleHelpRequested = (helpEvent) => {
      showHelpModal.value = true;
      moodData.value.push({ type: 'help-requested', ...helpEvent });
    };

    const handleBreakRequested = (breakEvent) => {
      moodData.value.push({ type: 'break-requested', ...breakEvent });
      alert('Consider taking a short break. Your progress is automatically saved.');
    };

    const handleMoodCompleted = (completedEvent) => {
      moodData.value.push({ type: 'mood-completed', ...completedEvent });
      console.log('Mood tracking completed:', completedEvent);
    };

    // Help modal functions
    const closeHelpModal = () => {
      showHelpModal.value = false;
    };

    const callSupport = () => {
      window.open('tel:+18773102373');
      closeHelpModal();
    };

    const startChat = () => {
      // Implement chat integration
      alert('Live chat would open here');
      closeHelpModal();
    };

    const scheduleCallback = () => {
      // Implement callback scheduling
      alert('Callback scheduling would open here');
      closeHelpModal();
    };

    const showTerms = () => {
      // Open terms and conditions
      alert('Terms and conditions would open here');
    };

    // Auto-save functionality
    watch(formData, (newData) => {
      localStorage.setItem('loanApplicationData', JSON.stringify(newData));
    }, { deep: true });

    // Load saved data on mount
    onMounted(() => {
      try {
        const saved = localStorage.getItem('loanApplicationData');
        if (saved) {
          const savedData = JSON.parse(saved);
          Object.assign(formData.value, savedData);
        }
      } catch (error) {
        console.warn('Could not load saved application data:', error);
      }
    });

    return {
      currentStep,
      totalSteps,
      isSubmitting,
      showHelpModal,
      formData,
      errors,
      consents,
      states,
      estimatedAPR,
      canProceed,
      canSubmit,
      getStepLabel,
      validateField,
      nextStep,
      previousStep,
      submitApplication,
      formatSSN,
      handleEmploymentStatusChange,
      updateLoanCalculations,
      calculateMonthlyPayment,
      calculateTotalInterest,
      calculateTotalCost,
      formatCurrency,
      formatDate,
      formatHousingStatus,
      formatEmploymentStatus,
      formatLoanPurpose,
      handleMoodChanged,
      handleHelpRequested,
      handleBreakRequested,
      handleMoodCompleted,
      closeHelpModal,
      callSupport,
      startChat,
      scheduleCallback,
      showTerms
    };
  }
};
</script>

<style scoped>
.loan-application-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #f9fafb;
  min-height: 100vh;
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px;
  background: linear-gradient(135deg, #3860be 0%, #013474 100%);
  color: white;
  border-radius: 16px;
  box-shadow: 0 8px 25px rgba(56, 96, 190, 0.3);
}

.form-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.2rem;
  font-weight: bold;
}

.form-header p {
  margin: 0;
  opacity: 0.9;
  font-size: 1.1rem;
}

.progress-section {
  margin-bottom: 30px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3860be 0%, #059669 100%);
  transition: width 0.6s ease;
}

.step-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-label {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 12px;
  background: #f3f4f6;
  transition: all 0.3s ease;
}

.step-label.active {
  background: #3860be;
  color: white;
}

.step-label.completed {
  background: #10b981;
  color: white;
}

.form-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  margin: 20px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-step {
  min-height: 400px;
}

.step-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f3f4f6;
}

.step-header h2 {
  margin: 0 0 10px 0;
  color: #374151;
  font-size: 1.8rem;
}

.step-header p {
  margin: 0;
  color: #6b7280;
  font-size: 1rem;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-group.full-width {
  grid-column: 1 / -1;
}

.field-group label {
  font-weight: 600;
  color: #374151;
  font-size: 0.9rem;
}

.form-input {
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #3860be;
  box-shadow: 0 0 0 3px rgba(56, 96, 190, 0.1);
}

.form-input:invalid {
  border-color: #ef4444;
}

.error-message {
  color: #ef4444;
  font-size: 0.8rem;
  font-weight: 500;
}

.field-help {
  color: #6b7280;
  font-size: 0.8rem;
  font-style: italic;
}

.loan-amount-slider {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3860be;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.amount-display {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #3860be;
  padding: 10px;
  background: #f0f9ff;
  border-radius: 8px;
}

.loan-calculator {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  padding: 25px;
  border-radius: 12px;
  border: 2px solid #bae6fd;
  margin-top: 20px;
}

.loan-calculator h3 {
  margin: 0 0 20px 0;
  color: #374151;
  font-size: 1.3rem;
  text-align: center;
}

.payment-breakdown {
  text-align: center;
}

.payment-amount {
  font-size: 2.5rem;
  font-weight: bold;
  color: #3860be;
  margin-bottom: 20px;
}

.payment-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  background: white;
  border-radius: 6px;
  border: 1px solid #bae6fd;
}

.calculator-disclaimer {
  margin-top: 15px;
  font-size: 0.8rem;
  color: #6b7280;
  text-align: center;
  font-style: italic;
}

.review-sections {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.review-section {
  background: #f9fafb;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.review-section h3 {
  margin: 0 0 15px 0;
  color: #374151;
  font-size: 1.2rem;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e7eb;
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.review-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.review-item label {
  font-weight: 600;
  color: #6b7280;
}

.review-item span {
  color: #374151;
  font-weight: 500;
}

.consent-section {
  background: #fef7cd;
  padding: 25px;
  border-radius: 12px;
  border: 2px solid #fbbf24;
  margin-top: 20px;
}

.consent-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 15px;
}

.consent-item:last-child {
  margin-bottom: 0;
}

.consent-item input[type="checkbox"] {
  margin-top: 2px;
  width: 16px;
  height: 16px;
  accent-color: #3860be;
}

.consent-item label {
  color: #92400e;
  font-size: 0.9rem;
  line-height: 1.5;
  cursor: pointer;
}

.consent-item a {
  color: #3860be;
  text-decoration: underline;
}

.form-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.nav-button {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.nav-button.secondary {
  background: #f3f4f6;
  color: #374151;
  border: 2px solid #e5e7eb;
}

.nav-button.secondary:hover:not(:disabled) {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.nav-button.primary {
  background: #3860be;
  color: white;
}

.nav-button.primary:hover:not(:disabled) {
  background: #013474;
  transform: translateY(-2px);
}

.nav-button.submit {
  background: #059669;
  color: white;
}

.nav-button.submit:hover:not(:disabled) {
  background: #047857;
  transform: translateY(-2px);
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.help-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.help-modal {
  background: white;
  border-radius: 16px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.help-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f3f4f6;
}

.help-header h3 {
  margin: 0;
  color: #374151;
  font-size: 1.4rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6b7280;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-button:hover {
  color: #374151;
}

.help-content p {
  margin: 0 0 20px 0;
  color: #6b7280;
  line-height: 1.6;
}

.help-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.help-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.help-option:hover {
  background: #3860be;
  color: white;
  border-color: #3860be;
  transform: translateY(-2px);
}

.help-icon {
  font-size: 1.5rem;
}

@media (max-width: 768px) {
  .loan-application-form {
    padding: 15px;
  }

  .form-header {
    padding: 20px 15px;
  }

  .form-header h1 {
    font-size: 1.8rem;
  }

  .form-content {
    padding: 25px 20px;
  }

  .form-fields {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .step-labels {
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
  }

  .payment-details {
    grid-template-columns: 1fr;
  }

  .review-grid {
    grid-template-columns: 1fr;
  }

  .form-navigation {
    flex-direction: column;
    gap: 15px;
  }

  .nav-button {
    width: 100%;
  }

  .help-modal {
    padding: 20px;
    margin: 20px;
  }
}

@media (max-width: 480px) {
  .form-header h1 {
    font-size: 1.5rem;
  }

  .step-header h2 {
    font-size: 1.5rem;
  }

  .payment-amount {
    font-size: 2rem;
  }
}
</style>