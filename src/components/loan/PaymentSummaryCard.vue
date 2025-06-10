<template>
  <div class="payment-summary-card">
    <div class="summary-header">
      <span class="summary-title">Payment Summary</span>
      <span class="total-paid">Total Paid: {{ formattedTotalPaid }}</span>
    </div>
    <div class="recent-payments">
      <div v-for="(payment, i) in recentPayments" :key="i" class="payment-row">
        <span class="date">{{ payment.date }}</span>
        <span class="amount">{{ formatAmount(payment.amount) }}</span>
        <span class="status" :class="payment.status">{{ payment.status }}</span>
      </div>
    </div>
    <div class="next-payment" v-if="nextPayment">
      <span>Next Payment:</span>
      <span class="amount">{{ formatAmount(nextPayment.amount) }}</span>
      <span class="date">on {{ nextPayment.date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSummaryCard',
  props: {
    totalPaid: { type: Number, default: 0 },
    recentPayments: { type: Array, default: () => [] },
    nextPayment: { type: Object, default: null }
  },
  computed: {
    formattedTotalPaid() {
      return this.totalPaid ? `$${this.totalPaid.toLocaleString()}` : '$0';
    }
  },
  methods: {
    formatAmount(val) {
      return typeof val === 'number' ? `$${val.toLocaleString()}` : '-';
    }
  }
};
</script>

<style scoped>
.payment-summary-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 260px;
}
.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 600;
}
.total-paid {
  color: #059669;
}
.recent-payments {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.payment-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.98rem;
  color: #334155;
}
.payment-row .amount {
  font-weight: 500;
  color: #0ea5e9;
}
.payment-row .status {
  font-size: 0.92rem;
  border-radius: 999px;
  padding: 0.1rem 0.7rem;
  background: #f3f4f6;
  color: #64748b;
  text-transform: capitalize;
}
.payment-row .status.paid {
  background: #e0f7fa;
  color: #059669;
}
.payment-row .status.failed {
  background: #fee2e2;
  color: #dc2626;
}
.payment-row .status.pending {
  background: #fef9c3;
  color: #b45309;
}
.next-payment {
  margin-top: 0.5rem;
  font-size: 0.98rem;
  color: #64748b;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.next-payment .amount {
  color: #0ea5e9;
  font-weight: 500;
}
.next-payment .date {
  color: #334155;
}
</style>
