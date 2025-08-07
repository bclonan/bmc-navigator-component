import MAlert from '../../components/mui/MAlert.vue';

export default {
  title: 'MUI Components/Feedback/Alert',
  component: MAlert,
  parameters: {
    docs: {
      description: {
        component: 'Material-UI Alert component for displaying important messages with Your Town Finance brand styling.',
      },
    },
  },
  argTypes: {
    severity: {
      control: { type: 'select' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Alert severity level',
      defaultValue: 'info'
    },
    title: {
      control: { type: 'text' },
      description: 'Alert title',
      defaultValue: 'Alert Title'
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'standard'],
      description: 'Alert variant style',
      defaultValue: 'standard'
    },
    closable: {
      control: { type: 'boolean' },
      description: 'Show close button',
      defaultValue: false
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Show severity icon',
      defaultValue: true
    }
  }
};

export const Default = (args) => ({
  components: { MAlert },
  setup() {
    return { args };
  },
  template: `
    <MAlert v-bind="args">
      This is a default alert message. You can customize the content using the controls panel.
    </MAlert>
  `
});

Default.args = {
  severity: 'info',
  title: 'Information',
  variant: 'standard',
  closable: false,
  icon: true
};

export const YourTownFinanceAlerts = () => ({
  components: { MAlert },
  template: `
    <div class="space-y-4">
      <MAlert 
        severity="success" 
        title="Loan Approved!" 
        class="mf-alert-success"
      >
        Congratulations! Your personal loan application for <strong>$15,000</strong> has been approved. 
        Funds will be available in your account within 1-2 business days.
      </MAlert>
      
      <MAlert 
        severity="warning" 
        title="Payment Due Soon" 
        class="mf-alert-warning"
      >
        Your next payment of <strong>$187.00</strong> is due on February 15, 2024. 
        Set up autopay to never miss a payment.
      </MAlert>
      
      <MAlert 
        severity="info" 
        title="New Rate Available" 
        class="mf-alert-info"
      >
        Good news! You may qualify for a lower interest rate. 
        Check your eligibility for rate reduction today.
      </MAlert>
      
      <MAlert 
        severity="error" 
        title="Action Required" 
        class="mf-alert-error"
      >
        We need additional documentation to process your application. 
        Please upload the required documents within 7 days.
      </MAlert>
    </div>
  `
});

export const FinancialNotifications = () => ({
  components: { MAlert },
  template: `
    <div class="space-y-4">
      <MAlert severity="success" title="Application Submitted" class="mf-alert-success">
        Your loan application has been successfully submitted. You'll receive a decision within 24 hours.
      </MAlert>
      
      <MAlert severity="warning" title="Credit Check Required" class="mf-alert-warning">
        A soft credit check is needed to provide you with personalized rates. This won't affect your credit score.
      </MAlert>
      
      <MAlert severity="info" title="Pre-Approval Available" class="mf-alert-info">
        You're pre-approved for up to $25,000 with rates starting at 5.99% APR. Apply now to lock in your rate.
      </MAlert>
      
      <MAlert severity="error" title="Application Incomplete" class="mf-alert-error">
        Your application is missing required information. Please complete all fields to continue.
      </MAlert>
    </div>
  `
});

export const WithCloseButton = () => ({
  components: { MAlert },
  data() {
    return {
      alerts: [
        { id: 1, show: true, severity: 'success', title: 'Payment Processed', message: 'Your payment of $187.00 has been successfully processed.' },
        { id: 2, show: true, severity: 'warning', title: 'Rate Expiring', message: 'Your promotional rate expires in 30 days.' },
        { id: 3, show: true, severity: 'info', title: 'Account Update', message: 'Your account information has been updated.' },
        { id: 4, show: true, severity: 'error', title: 'Payment Failed', message: 'Unable to process payment. Please check your payment method.' }
      ]
    };
  },
  methods: {
    closeAlert(id) {
      const alert = this.alerts.find(a => a.id === id);
      if (alert) alert.show = false;
    }
  },
  template: `
    <div class="space-y-4">
      <template v-for="alert in alerts" :key="alert.id">
        <MAlert 
          v-if="alert.show"
          :severity="alert.severity" 
          :title="alert.title"
          closable
          @close="closeAlert(alert.id)"
          :class="alert.severity === 'success' ? 'mf-alert-success' : alert.severity === 'warning' ? 'mf-alert-warning' : alert.severity === 'info' ? 'mf-alert-info' : 'mf-alert-error'"
        >
          {{ alert.message }}
        </MAlert>
      </template>
    </div>
  `
});

export const Playground = (args) => ({
  components: { MAlert },
  setup() {
    return { args };
  },
  template: `
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Alert Playground</h3>
        <p class="text-gray-600">Customize the alert using the controls panel.</p>
      </div>
      
      <MAlert 
        v-bind="args"
        :class="getAlertClass(args.severity)"
      >
        {{ args.content || 'This is a customizable alert message. Use the controls to modify its appearance and content.' }}
      </MAlert>
    </div>
  `,
  methods: {
    getAlertClass(severity) {
      const classMap = {
        success: 'mf-alert-success',
        warning: 'mf-alert-warning',
        info: 'mf-alert-info',
        error: 'mf-alert-error'
      };
      return classMap[severity] || '';
    }
  }
});

Playground.args = {
  severity: 'success',
  title: 'Customizable Alert',
  variant: 'standard',
  closable: true,
  icon: true,
  content: 'This message can be customized using the controls panel.'
};