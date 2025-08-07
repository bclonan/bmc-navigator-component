<template>
  <div class="payment-status-card" :class="statusClass">
    <div class="status-header">
      <span class="status-icon" :class="statusClass"></span>
      <span class="status-title">{{ statusLabel }}</span>
    </div>
    <div class="status-details">
      <div class="amount-due">
        <span class="label">Amount Due</span>
        <span class="value">{{ amount | currency }}</span>
      </div>
      <div class="due-date">
        <span class="label">Due Date</span>
        <span class="value">{{ dueDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentStatusCard",
  props: {
    status: { type: String, default: "due" }, // 'due', 'paid', 'overdue'
    amount: { type: Number, default: 0 },
    dueDate: { type: String, default: "" },
  },
  computed: {
    statusLabel() {
      switch (this.status) {
        case "paid":
          return "Paid";
        case "overdue":
          return "Overdue";
        default:
          return "Payment Due";
      }
    },
    statusClass() {
      return {
        "status-due": this.status === "due",
        "status-paid": this.status === "paid",
        "status-overdue": this.status === "overdue",
      };
    },
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

<style scoped>
.payment-status-card {
  border-radius: 12px;
  box-shadow: var(--shadow-2);
  background: var(--color-white);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.status-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
}
.status-icon.status-due {
  background: var(--color-not-yo-cheese);
}
.status-icon.status-paid {
  background: var(--color-herbal);
}
.status-icon.status-overdue {
  background: var(--color-matt-blue);
}
.status-icon {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  display: inline-block;
}
.status-title {
  font-size: 1.1rem;
}
.status-details {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.label {
  color: var(--color-bank-vault);
  font-size: 0.9rem;
}
.value {
  font-weight: 600;
}
</style>
