# Payment Flow Component # Manages the payment process for a loan application,
including payment methods and actions.
<template>
  <div class="payment-flow">
    <PaymentStatusCard :status="status" :amount="amount" :dueDate="dueDate" />
    <PaymentSummaryCard
      :totalPaid="totalPaid"
      :nextPayment="nextPayment"
      :nextDueDate="nextDueDate"
      :paymentsMade="paymentsMade"
    />
    <PaymentActionCard
      :message="actionMessage"
      @pay-now="handlePayNow"
      @schedule="handleSchedule"
    />
  </div>
</template>

<script>
import PaymentStatusCard from "./PaymentStatusCard.vue";
import PaymentSummaryCard from "./PaymentSummaryCard.vue";
import PaymentActionCard from "./PaymentActionCard.vue";

export default {
  name: "PaymentFlow",
  components: {
    PaymentStatusCard,
    PaymentSummaryCard,
    PaymentActionCard,
  },
  props: {
    status: { type: String, default: "due" },
    amount: { type: Number, default: 0 },
    dueDate: { type: String, default: "" },
    totalPaid: { type: Number, default: 0 },
    nextPayment: { type: Number, default: 0 },
    nextDueDate: { type: String, default: "" },
    paymentsMade: { type: Number, default: 0 },
  },
  data() {
    return {
      actionMessage: "",
    };
  },
  methods: {
    handlePayNow() {
      this.actionMessage = "Payment processing...";
      setTimeout(() => {
        this.actionMessage = "Payment successful!";
        this.$emit("payment-complete");
      }, 1500);
    },
    handleSchedule() {
      this.actionMessage = "Payment scheduled!";
      this.$emit("payment-scheduled");
    },
  },
};
</script>

<style scoped>
.payment-flow {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 480px;
  margin: 0 auto;
}
</style>
