// Payment Action Card Component // Displays a summary of a loan payment action
with a title, description, and a call to action button.
<template>
  <div class="payment-action-card">
    <div class="action-header">Take Action</div>
    <div class="action-buttons">
      <button class="pay-now" @click="$emit('pay-now')">Pay Now</button>
      <button class="schedule" @click="$emit('schedule')">
        Schedule Payment
      </button>
    </div>
    <div v-if="message" class="action-message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "PaymentActionCard",
  props: {
    message: { type: String, default: "" },
  },
};
</script>

<style scoped>
.payment-action-card {
  border-radius: 12px;
  box-shadow: var(--shadow-2);
  background: var(--color-white);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.action-header {
  font-weight: bold;
  font-size: 1.1rem;
}
.action-buttons {
  display: flex;
  gap: 1rem;
}
.pay-now,
.schedule {
  background: var(--color-matt-blue);
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.pay-now:hover,
.schedule:hover {
  background: var(--color-way-beyond-the-blue);
}
.action-message {
  color: var(--color-herbal);
  font-size: 0.95rem;
}
</style>
