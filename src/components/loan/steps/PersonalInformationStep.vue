<template>
  <div class="personal-information-step">
    <MCard title="Personal Information" subtitle="Your basic contact and identity details">
      <div class="space-y-6">
        <!-- Name Fields -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MTextField 
            :model-value="formData.personal.firstName"
            @update:model-value="updateField('personal.firstName', $event)"
            @blur="touchField('personal.firstName')"
            label="First Name" 
            placeholder="Enter your legal first name"
            prepend-icon="fas fa-user"
            :required="true"
            :error-message="getFieldError('personal.firstName')"
            :wrap="true"
            wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
          />
          
          <MTextField 
            :model-value="formData.personal.middleName"
            @update:model-value="updateField('personal.middleName', $event)"
            label="Middle Name" 
            placeholder="Middle name (optional)"
            prepend-icon="fas fa-user"
          />
          
          <MTextField 
            :model-value="formData.personal.lastName"
            @update:model-value="updateField('personal.lastName', $event)"
            @blur="touchField('personal.lastName')"
            label="Last Name" 
            placeholder="Enter your legal last name"
            prepend-icon="fas fa-user"
            :required="true"
            :error-message="getFieldError('personal.lastName')"
            :wrap="true"
            wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
          />
        </div>
        
        <!-- Suffix and Date of Birth -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MSelect 
            :model-value="formData.personal.suffix"
            @update:model-value="updateField('personal.suffix', $event)"
            label="Suffix" 
            :options="suffixOptions"
            placeholder="Select suffix (optional)"
            prepend-icon="fas fa-user-tag"
          />
          
          <MTextField 
            :model-value="formData.personal.dateOfBirth"
            @update:model-value="updateField('personal.dateOfBirth', $event)"
            @blur="touchField('personal.dateOfBirth')"
            type="date"
            label="Date of Birth" 
            prepend-icon="fas fa-calendar"
            :required="true"
            :error-message="getFieldError('personal.dateOfBirth')"
            :extend="true"
            extended-class="border-2 border-gray-300"
          />
        </div>
        
        <!-- SSN - High Security -->
        <MTextField 
          :model-value="formData.personal.ssn"
          @update:model-value="updateField('personal.ssn', $event)"
          @blur="touchField('personal.ssn')"
          type="password"
          label="Social Security Number" 
          placeholder="XXX-XX-XXXX"
          prepend-icon="fas fa-shield-alt"
          :required="true"
          :error-message="getFieldError('personal.ssn')"
          :wrap="true"
          :extend="true"
          wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
          extended-class="border-2 border-red-300 shadow-md"
          helper-text="Your SSN is encrypted and secure - required for credit verification"
        />
        
        <!-- Contact Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MTextField 
            :model-value="formData.personal.email"
            @update:model-value="updateField('personal.email', $event)"
            @blur="touchField('personal.email')"
            type="email"
            label="Email Address" 
            placeholder="your.email@example.com"
            prepend-icon="fas fa-envelope"
            :required="true"
            :error-message="getFieldError('personal.email')"
            :wrap="true"
            wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
          />
          
          <MTextField 
            :model-value="formData.personal.phone"
            @update:model-value="updateField('personal.phone', $event)"
            @blur="touchField('personal.phone')"
            type="tel"
            label="Primary Phone" 
            placeholder="(555) 123-4567"
            prepend-icon="fas fa-phone"
            :required="true"
            :error-message="getFieldError('personal.phone')"
            :wrap="true"
            wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
          />
        </div>
        
        <MTextField 
          :model-value="formData.personal.alternatePhone"
          @update:model-value="updateField('personal.alternatePhone', $event)"
          type="tel"
          label="Alternate Phone" 
          placeholder="(555) 987-6543 (optional)"
          prepend-icon="fas fa-phone-alt"
          helper-text="Additional contact number (optional)"
        />
        
        <!-- Personal Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MSelect 
            :model-value="formData.personal.maritalStatus"
            @update:model-value="updateField('personal.maritalStatus', $event)"
            @blur="touchField('personal.maritalStatus')"
            label="Marital Status" 
            :options="maritalStatusOptions"
            placeholder="Select marital status"
            prepend-icon="fas fa-heart"
            :required="true"
            :error-message="getFieldError('personal.maritalStatus')"
          />
          
          <div>
            <label class="block text-sm font-medium mb-2">Number of Dependents: {{ formData.personal.dependents }}</label>
            <MSlider 
              :model-value="formData.personal.dependents"
              @update:model-value="updateField('personal.dependents', $event)"
              :min="0"
              :max="10"
              :step="1"
              color="secondary"
              :show-value="true"
              :show-ticks="true"
              helper-text="Include children and other dependents"
            />
          </div>
        </div>
      </div>
    </MCard>
    
    <!-- Address Information -->
    <MCard title="Current Address" subtitle="Your residential information" class="mt-6">
      <div class="space-y-4">
        <MTextField 
          :model-value="formData.address.street"
          @update:model-value="updateField('address.street', $event)"
          @blur="touchField('address.street')"
          label="Street Address" 
          placeholder="123 Main Street"
          prepend-icon="fas fa-map-marker-alt"
          :required="true"
          :error-message="getFieldError('address.street')"
          :wrap="true"
          wrapper-class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
        />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MTextField 
            :model-value="formData.address.apartment"
            @update:model-value="updateField('address.apartment', $event)"
            label="Apartment/Unit" 
            placeholder="Apt 123 (optional)"
            prepend-icon="fas fa-building"
          />
          
          <MTextField 
            :model-value="formData.address.city"
            @update:model-value="updateField('address.city', $event)"
            @blur="touchField('address.city')"
            label="City" 
            placeholder="Your city"
            prepend-icon="fas fa-city"
            :required="true"
            :error-message="getFieldError('address.city')"
            :wrap="true"
            wrapper-class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MSelect 
            :model-value="formData.address.state"
            @update:model-value="updateField('address.state', $event)"
            @blur="touchField('address.state')"
            label="State" 
            :options="stateOptions"
            placeholder="Select state"
            prepend-icon="fas fa-flag"
            :required="true"
            :error-message="getFieldError('address.state')"
            :searchable="true"
          />
          
          <MTextField 
            :model-value="formData.address.zipCode"
            @update:model-value="updateField('address.zipCode', $event)"
            @blur="touchField('address.zipCode')"
            label="ZIP Code" 
            placeholder="12345"
            prepend-icon="fas fa-mail-bulk"
            :required="true"
            :error-message="getFieldError('address.zipCode')"
            :wrap="true"
            wrapper-class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MSelect 
            :model-value="formData.address.residencyType"
            @update:model-value="updateField('address.residencyType', $event)"
            @blur="touchField('address.residencyType')"
            label="Residency Type" 
            :options="residencyTypeOptions"
            placeholder="Select residency type"
            prepend-icon="fas fa-home"
            :required="true"
            :error-message="getFieldError('address.residencyType')"
          />
          
          <div>
            <label class="block text-sm font-medium mb-2">Months at Current Address: {{ formData.address.monthsAtAddress }}</label>
            <MSlider 
              :model-value="formData.address.monthsAtAddress"
              @update:model-value="updateField('address.monthsAtAddress', $event)"
              @blur="touchField('address.monthsAtAddress')"
              :min="0"
              :max="360"
              :step="1"
              color="warning"
              :show-value="true"
              :format-value="(value) => value + ' months'"
              helper-text="Time at current residence"
              :error-message="getFieldError('address.monthsAtAddress')"
            />
          </div>
        </div>
        
        <!-- Previous Address (if less than 2 years) -->
        <div v-if="formData.address.monthsAtAddress < 24" class="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 class="text-md font-semibold mb-4">Previous Address</h4>
          <p class="text-sm text-gray-600 mb-4">Since you've been at your current address for less than 2 years, please provide your previous address.</p>
          
          <div class="space-y-4">
            <MTextField 
              :model-value="formData.address.previousAddress.street"
              @update:model-value="updateField('address.previousAddress.street', $event)"
              label="Previous Street Address" 
              placeholder="123 Previous Street"
              prepend-icon="fas fa-map-marker-alt"
              :required="true"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MTextField 
                :model-value="formData.address.previousAddress.city"
                @update:model-value="updateField('address.previousAddress.city', $event)"
                label="Previous City" 
                placeholder="Previous city"
                prepend-icon="fas fa-city"
                :required="true"
              />
              
              <MSelect 
                :model-value="formData.address.previousAddress.state"
                @update:model-value="updateField('address.previousAddress.state', $event)"
                label="Previous State" 
                :options="stateOptions"
                placeholder="Select state"
                prepend-icon="fas fa-flag"
                :required="true"
                :searchable="true"
              />
              
              <MTextField 
                :model-value="formData.address.previousAddress.zipCode"
                @update:model-value="updateField('address.previousAddress.zipCode', $event)"
                label="Previous ZIP" 
                placeholder="12345"
                prepend-icon="fas fa-mail-bulk"
                :required="true"
              />
            </div>
          </div>
        </div>
      </div>
    </MCard>
  </div>
</template>

<script>
import MCard from '../../ui/MCard.vue';
import MTextField from '../../ui/MTextField.vue';
import MSelect from '../../ui/MSelect.vue';
import MSlider from '../../ui/MSlider.vue';

export default {
  name: 'PersonalInformationStep',
  
  components: {
    MCard,
    MTextField,
    MSelect,
    MSlider
  },
  
  props: {
    formData: {
      type: Object,
      required: true
    },
    updateField: {
      type: Function,
      required: true
    },
    touchField: {
      type: Function,
      required: true
    },
    getFieldError: {
      type: Function,
      required: true
    }
  },
  
  data() {
    return {
      suffixOptions: [
        { value: 'jr', text: 'Jr.' },
        { value: 'sr', text: 'Sr.' },
        { value: 'ii', text: 'II' },
        { value: 'iii', text: 'III' },
        { value: 'iv', text: 'IV' }
      ],
      
      maritalStatusOptions: [
        { value: 'single', text: 'Single' },
        { value: 'married', text: 'Married' },
        { value: 'divorced', text: 'Divorced' },
        { value: 'widowed', text: 'Widowed' },
        { value: 'separated', text: 'Separated' }
      ],
      
      residencyTypeOptions: [
        { value: 'own', text: 'Own' },
        { value: 'rent', text: 'Rent' },
        { value: 'with_family', text: 'Live with Family' },
        { value: 'other', text: 'Other' }
      ],
      
      stateOptions: [
        { value: 'AL', text: 'Alabama' },
        { value: 'AK', text: 'Alaska' },
        { value: 'AZ', text: 'Arizona' },
        { value: 'AR', text: 'Arkansas' },
        { value: 'CA', text: 'California' },
        { value: 'CO', text: 'Colorado' },
        { value: 'CT', text: 'Connecticut' },
        { value: 'DE', text: 'Delaware' },
        { value: 'FL', text: 'Florida' },
        { value: 'GA', text: 'Georgia' },
        { value: 'HI', text: 'Hawaii' },
        { value: 'ID', text: 'Idaho' },
        { value: 'IL', text: 'Illinois' },
        { value: 'IN', text: 'Indiana' },
        { value: 'IA', text: 'Iowa' },
        { value: 'KS', text: 'Kansas' },
        { value: 'KY', text: 'Kentucky' },
        { value: 'LA', text: 'Louisiana' },
        { value: 'ME', text: 'Maine' },
        { value: 'MD', text: 'Maryland' },
        { value: 'MA', text: 'Massachusetts' },
        { value: 'MI', text: 'Michigan' },
        { value: 'MN', text: 'Minnesota' },
        { value: 'MS', text: 'Mississippi' },
        { value: 'MO', text: 'Missouri' },
        { value: 'MT', text: 'Montana' },
        { value: 'NE', text: 'Nebraska' },
        { value: 'NV', text: 'Nevada' },
        { value: 'NH', text: 'New Hampshire' },
        { value: 'NJ', text: 'New Jersey' },
        { value: 'NM', text: 'New Mexico' },
        { value: 'NY', text: 'New York' },
        { value: 'NC', text: 'North Carolina' },
        { value: 'ND', text: 'North Dakota' },
        { value: 'OH', text: 'Ohio' },
        { value: 'OK', text: 'Oklahoma' },
        { value: 'OR', text: 'Oregon' },
        { value: 'PA', text: 'Pennsylvania' },
        { value: 'RI', text: 'Rhode Island' },
        { value: 'SC', text: 'South Carolina' },
        { value: 'SD', text: 'South Dakota' },
        { value: 'TN', text: 'Tennessee' },
        { value: 'TX', text: 'Texas' },
        { value: 'UT', text: 'Utah' },
        { value: 'VT', text: 'Vermont' },
        { value: 'VA', text: 'Virginia' },
        { value: 'WA', text: 'Washington' },
        { value: 'WV', text: 'West Virginia' },
        { value: 'WI', text: 'Wisconsin' },
        { value: 'WY', text: 'Wyoming' }
      ]
    };
  }
};
</script>