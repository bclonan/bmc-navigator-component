<template>
  <div class="payment-action-card">
    <div class="action-header">
      <span class="action-title">Payment Actions</span>
    </div>
    <div class="action-buttons">
      <button class="pay-now" @click="$emit('pay-now')" :disabled="loading">{{ loading ? 'Processing...' : 'Pay Now' }}</button>
      <button class="schedule" @click="$emit('schedule')" :disabled="loading">Schedule</button>
      <button class="history" @click="$emit('history')">History</button>
    </div>
    <div v-if="message" class="action-message" :class="messageType">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'PaymentActionCard',
  props: {
    loading: { type: Boolean, default: false },
    message: { type: String, default: '' },
    messageType: { type: String, default: '' } // success, error, info
  }
};
</script>

<style scoped>
.payment-action-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 220px;
}
.action-header {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.action-buttons {
  display: flex;
  gap: 1rem;
}
.action-buttons button {
  padding: 0.5rem 1.2rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.pay-now {
  background: #2563eb;
  color: white;
}
.pay-now:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}
.schedule {
  background: #fbbf24;
  color: #78350f;
}
.history {
  background: #f3f4f6;
  color: #334155;
}
.action-message {
  margin-top: 0.5rem;
  font-size: 0.98rem;
  border-radius: 0.5rem;
  padding: 0.4rem 1rem;
}
.action-message.success {
  background: #e0f7fa;
  color: #059669;
}
.action-message.error {
  background: #fee2e2;
  color: #dc2626;
}
.action-message.info {
  background: #fef9c3;
  color: #b45309;
}
</style>
