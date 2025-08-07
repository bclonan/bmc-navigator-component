<template>
  <div class="payment-summary-card">
    <div class="summary-header">Payment Summary</div>
    <div class="summary-row">
      <span>Total Paid:</span>
      <span>{{ totalPaid | currency }}</span>
    </div>
    <div class="summary-row">
      <span>Next Payment:</span>
      <span>{{ nextPayment | currency }} on {{ nextDueDate }}</span>
    </div>
    <div class="summary-row">
      <span>Payments Made:</span>
      <span>{{ paymentsMade }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentSummaryCard",
  props: {
    totalPaid: { type: Number, default: 0 },
    nextPayment: { type: Number, default: 0 },
    nextDueDate: { type: String, default: "" },
    paymentsMade: { type: Number, default: 0 },
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    },
  },
};
</script>

