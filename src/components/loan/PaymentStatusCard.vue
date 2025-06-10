<template>
  <div class="payment-status-card">
    <div class="status-header">
      <span class="status-label" :class="statusClass">{{ statusText }}</span>
      <span class="amount-due">{{ formattedAmount }}</span>
    </div>
    <div class="due-date">
      <span>Due:</span>
      <span class="date">{{ dueDate }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentStatusCard',
  props: {
    status: { type: String, default: 'due' }, // due, paid, overdue
    amount: { type: Number, required: true },
    dueDate: { type: String, required: true }
  },
  computed: {
    statusText() {
      if (this.status === 'paid') return 'Paid';
      if (this.status === 'overdue') return 'Overdue';
      return 'Due';
    },
    statusClass() {
      return {
        'paid': this.status === 'paid',
        'overdue': this.status === 'overdue',
        'due': this.status === 'due'
      };
    },
    formattedAmount() {
      return this.amount ? `$${this.amount.toLocaleString()}` : '$0';
    }
  }
};
</script>

<style scoped>
.payment-status-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 220px;
}
.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-label {
  font-weight: 600;
  font-size: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: #f3f4f6;
  color: #374151;
}
.status-label.paid {
  background: #e0f7fa;
  color: #059669;
}
.status-label.overdue {
  background: #fee2e2;
  color: #dc2626;
}
.status-label.due {
  background: #fef9c3;
  color: #b45309;
}
.amount-due {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
}
.due-date {
  font-size: 0.95rem;
  color: #64748b;
  display: flex;
  gap: 0.5rem;
}
.date {
  font-weight: 500;
  color: #0ea5e9;
}
</style>
