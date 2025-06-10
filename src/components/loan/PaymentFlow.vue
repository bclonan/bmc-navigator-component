<template>
  <div class="payment-flow">
    <PaymentStatusCard
      :status="status"
      :amount="amountDue"
      :due-date="dueDate"
      class="mb-4"
    />
    <PaymentSummaryCard
      :total-paid="totalPaid"
      :recent-payments="recentPayments"
      :next-payment="nextPayment"
      class="mb-4"
    />
    <PaymentActionCard
      :loading="loading"
      :message="message"
      :message-type="messageType"
      @pay-now="payNow"
      @schedule="schedulePayment"
      @history="viewHistory"
    />
  </div>
</template>

<script>
import PaymentStatusCard from './PaymentStatusCard.vue';
import PaymentSummaryCard from './PaymentSummaryCard.vue';
import PaymentActionCard from './PaymentActionCard.vue';

export default {
  name: 'PaymentFlow',
  components: {
    PaymentStatusCard,
    PaymentSummaryCard,
    PaymentActionCard
  },
  props: {
    status: { type: String, default: 'due' },
    amountDue: { type: Number, default: 0 },
    dueDate: { type: String, default: '' },
    totalPaid: { type: Number, default: 0 },
    recentPayments: { type: Array, default: () => [] },
    nextPayment: { type: Object, default: null }
  },
  data() {
    return {
      loading: false,
      message: '',
      messageType: ''
    };
  },
  methods: {
    async payNow() {
      this.loading = true;
      this.message = '';
      this.messageType = '';
      try {
        // Simulate payment API
        await new Promise(res => setTimeout(res, 1200));
        this.message = 'Payment successful!';
        this.messageType = 'success';
      } catch (e) {
        this.message = 'Payment failed. Please try again.';
        this.messageType = 'error';
      } finally {
        this.loading = false;
        setTimeout(() => { this.message = ''; }, 4000);
      }
    },
    schedulePayment() {
      this.message = 'Payment scheduled!';
      this.messageType = 'info';
      setTimeout(() => { this.message = ''; }, 4000);
    },
    viewHistory() {
      this.message = 'Viewing payment history...';
      this.messageType = 'info';
      setTimeout(() => { this.message = ''; }, 2000);
    }
  }
};
</script>

<style scoped>
.payment-flow {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 420px;
  margin: 0 auto;
}
</style>
