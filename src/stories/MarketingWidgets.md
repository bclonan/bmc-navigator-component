# Book Section: Marketing Widgets

## Overview
This section provides a library of reusable marketing widgets for use in landing pages, dashboards, and emails. All widgets are responsive, accessible, and brand-aligned.

---

## Widget Gallery

### 1. Hero Section Widget
```vue
<template>
  <div class="bg-blue-600 text-white py-16 px-6 text-center rounded-lg shadow">
    <h1 class="text-3xl font-bold mb-4">Get a Personal Loan in Minutes</h1>
    <p class="mb-6 text-lg">Fast approval. Flexible terms. No hidden fees.</p>
    <a href="/apply" class="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100">Apply Now</a>
  </div>
</template>
```

### 2. Feature Card Widget
```vue
<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
    <img src="/assets/fast.svg" alt="Fast" class="w-12 h-12 mb-3" />
    <h3 class="font-bold text-lg mb-1">Fast Funding</h3>
    <p class="text-gray-600">Get funds as soon as the next business day.</p>
  </div>
</template>
```

### 3. Pricing Card Widget
```vue
<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-xs mx-auto text-center">
    <h3 class="text-xl font-bold mb-2">Personal Loan</h3>
    <div class="text-3xl font-bold text-blue-600 mb-2">5.99% APR</div>
    <ul class="mb-4 text-gray-600">
      <li>No origination fee</li>
      <li>Flexible terms</li>
      <li>Fixed monthly payments</li>
    </ul>
    <a href="/apply" class="inline-block bg-blue-600 text-white px-4 py-2 rounded">Apply Now</a>
  </div>
</template>
```

### 4. Testimonial Widget
```vue
<template>
  <div class="bg-gray-50 rounded-lg p-6 max-w-lg mx-auto">
    <blockquote class="italic text-gray-700 mb-2">“The process was fast and easy!”</blockquote>
    <div class="text-sm text-gray-500">— Jane D.</div>
  </div>
</template>
```

### 5. Loan Calculator Widget
```vue
<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
    <h3 class="text-lg font-bold mb-2">Estimate Your Payment</h3>
    <input v-model="amount" type="number" min="1000" max="50000" class="border rounded p-2 w-full mb-3" placeholder="Loan Amount" />
    <button @click="calculate" class="bg-blue-600 text-white px-4 py-2 rounded">Calculate</button>
    <div v-if="payment" class="mt-3 text-green-700 font-semibold">Estimated Payment: ${{ payment }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const amount = ref(5000);
const payment = ref(null);
function calculate() {
  payment.value = (amount.value * 0.021).toFixed(2);
}
</script>
```

---

## Usage
- Import widgets into any page or email template.
- All widgets are mobile-friendly and accessible.
- Customize props, images, and text as needed.

---

# Add this section to the Book and Storybook for easy access.
