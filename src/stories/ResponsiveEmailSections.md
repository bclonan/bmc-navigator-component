# Responsive Email Sections

## Personal Loan Notification (Approval)
```html
<table width="100%" style="max-width:600px;margin:auto;font-family:'Nunito Sans',Arial,sans-serif;background:#fff;border-radius:8px;overflow:hidden;">
  <tr style="background:#385fc0;color:#fff;">
    <td style="padding:24px 32px;text-align:center;">
      <img src="https://yourdomain.com/logo.png" alt="Mariner Finance" style="height:40px;margin-bottom:12px;" />
      <h1 style="margin:0;font-size:24px;">Congratulations, Your Loan is Approved!</h1>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 32px 16px 32px;">
      <p style="font-size:16px;color:#222;">Dear {{name}},</p>
      <p style="font-size:16px;color:#222;">We're excited to let you know your personal loan application has been <b>approved</b>! Your funds will be available soon.</p>
      <p style="font-size:16px;color:#222;">Loan Amount: <b>${{amount}}</b></p>
      <a href="{{dashboardUrl}}" style="display:inline-block;margin:24px 0 0 0;padding:12px 32px;background:#3b82f6;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold;">View Your Account</a>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px 16px 32px;font-size:13px;color:#6b7280;text-align:center;">
      Mariner Finance, 123 Main St, Baltimore, MD 21201<br />
      <a href="{{unsubscribeUrl}}" style="color:#6b7280;">Unsubscribe</a>
    </td>
  </tr>
</table>
```

## Payment Reminder
```html
<table width="100%" style="max-width:600px;margin:auto;font-family:'Nunito Sans',Arial,sans-serif;background:#fff;border-radius:8px;overflow:hidden;">
  <tr style="background:#385fc0;color:#fff;">
    <td style="padding:24px 32px;text-align:center;">
      <img src="https://yourdomain.com/logo.png" alt="Mariner Finance" style="height:40px;margin-bottom:12px;" />
      <h1 style="margin:0;font-size:22px;">Upcoming Payment Reminder</h1>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 32px 16px 32px;">
      <p style="font-size:16px;color:#222;">Hi {{name}},</p>
      <p style="font-size:16px;color:#222;">This is a reminder that your next loan payment of <b>${{amount}}</b> is due on <b>{{dueDate}}</b>.</p>
      <a href="{{payUrl}}" style="display:inline-block;margin:24px 0 0 0;padding:12px 32px;background:#22c55e;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold;">Make a Payment</a>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px 16px 32px;font-size:13px;color:#6b7280;text-align:center;">
      Need help? <a href="mailto:support@marinerfinance.com" style="color:#6b7280;">Contact Support</a>
    </td>
  </tr>
</table>
```

## Marketing Promo (Pre-Approved Offer)
```html
<table width="100%" style="max-width:600px;margin:auto;font-family:'Nunito Sans',Arial,sans-serif;background:#fff;border-radius:8px;overflow:hidden;">
  <tr style="background:#3b82f6;color:#fff;">
    <td style="padding:24px 32px;text-align:center;">
      <img src="https://yourdomain.com/logo.png" alt="Mariner Finance" style="height:40px;margin-bottom:12px;" />
      <h1 style="margin:0;font-size:22px;">You're Pre-Approved!</h1>
    </td>
  </tr>
  <tr>
    <td style="padding:32px 32px 16px 32px;">
      <p style="font-size:16px;color:#222;">Hi {{name}},</p>
      <p style="font-size:16px;color:#222;">Unlock a personal loan up to <b>${{maxAmount}}</b> with low rates. No impact to your credit score to check your offer.</p>
      <a href="{{applyUrl}}" style="display:inline-block;margin:24px 0 0 0;padding:12px 32px;background:#385fc0;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold;">Check My Offer</a>
    </td>
  </tr>
  <tr>
    <td style="padding:24px 32px 16px 32px;font-size:13px;color:#6b7280;text-align:center;">
      Terms and conditions apply. See website for details.
    </td>
  </tr>
</table>
```

---

# More Marketing Widgets

## Rate Calculator Widget
```vue
<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
    <h3 class="text-lg font-bold mb-2">Estimate Your Rate</h3>
    <input v-model="amount" type="number" min="1000" max="50000" class="border rounded p-2 w-full mb-3" placeholder="Loan Amount" />
    <button @click="calculate" class="bg-blue-600 text-white px-4 py-2 rounded">Calculate</button>
    <div v-if="rate" class="mt-3 text-green-700 font-semibold">Estimated Rate: {{ rate }}%</div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const amount = ref(5000);
const rate = ref(null);
function calculate() {
  rate.value = (5 + (amount.value - 1000) / 10000).toFixed(2);
}
</script>
```

## Testimonial Carousel Widget
```vue
<template>
  <div class="bg-gray-50 rounded-lg p-6 max-w-lg mx-auto">
    <h3 class="text-lg font-bold mb-4">What Our Customers Say</h3>
    <div v-for="(testimonial, i) in testimonials" :key="i" v-show="i === current" class="transition-all">
      <blockquote class="italic text-gray-700 mb-2">“{{ testimonial.text }}”</blockquote>
      <div class="text-sm text-gray-500">— {{ testimonial.author }}</div>
    </div>
    <div class="flex gap-2 mt-4 justify-center">
      <button v-for="(t, i) in testimonials" :key="i" @click="current = i" :class="['w-3 h-3 rounded-full', current === i ? 'bg-blue-600' : 'bg-gray-300']"></button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const testimonials = ref([
  { text: 'The process was fast and easy!', author: 'Jane D.' },
  { text: 'Great rates and friendly service.', author: 'Mike S.' },
  { text: 'Highly recommend Mariner Finance.', author: 'Lisa K.' }
]);
const current = ref(0);
</script>
```

## Loan Progress Widget
```vue
<template>
  <div class="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
    <h3 class="text-lg font-bold mb-2">Your Loan Progress</h3>
    <div class="w-full bg-gray-200 rounded h-4 mb-2">
      <div class="bg-blue-600 h-4 rounded" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="text-sm text-gray-600">{{ progress }}% complete</div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const progress = ref(60);
</script>
```

---

# Documentation Index (cont.)
- Responsive Email Sections
- Marketing Widgets
