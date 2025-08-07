<template>
  <div class="email-templates-container">
    <!-- Loan Approval Email -->
    <div v-if="templateType === 'approval'" class="email-template" :style="emailStyles">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; min-height: 100vh;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #3860be 0%, #013474 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <img :src="marinerLogo" alt="Mariner Finance" style="height: 60px; margin-bottom: 20px;">
                  <h1 style="color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 28px; margin: 0; font-weight: bold;">
                    Congratulations! Your Loan is Approved
                  </h1>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #374151; line-height: 1.6;">
                    <p style="font-size: 18px; margin-bottom: 25px;">
                      Dear {{ customerName }},
                    </p>
                    
                    <p style="font-size: 16px; margin-bottom: 30px;">
                      We're excited to inform you that your personal loan application has been <strong style="color: #059669;">approved</strong>! 
                      Your funds will be available shortly.
                    </p>
                    
                    <!-- Loan Details Box -->
                    <div style="background-color: #f0f9ff; border: 2px solid #3860be; border-radius: 8px; padding: 25px; margin: 30px 0;">
                      <h2 style="color: #3860be; font-size: 20px; margin: 0 0 20px 0; font-weight: bold;">Loan Details</h2>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Loan Amount:</td>
                          <td style="padding: 8px 0; text-align: right; font-size: 18px; font-weight: bold; color: #059669;">${{ loanAmount?.toLocaleString() }}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold; color: #374151;">APR:</td>
                          <td style="padding: 8px 0; text-align: right; font-weight: bold;">{{ apr }}%</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Term:</td>
                          <td style="padding: 8px 0; text-align: right; font-weight: bold;">{{ termMonths }} months</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold; color: #374151;">Monthly Payment:</td>
                          <td style="padding: 8px 0; text-align: right; font-size: 18px; font-weight: bold; color: #3860be;">${{ monthlyPayment?.toLocaleString() }}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold; color: #374151;">First Payment Due:</td>
                          <td style="padding: 8px 0; text-align: right; font-weight: bold;">{{ firstPaymentDate }}</td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- Next Steps -->
                    <div style="margin: 30px 0;">
                      <h3 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Next Steps:</h3>
                      <ol style="color: #6b7280; padding-left: 20px;">
                        <li style="margin-bottom: 10px;">Your funds will be deposited into your account within 1-2 business days</li>
                        <li style="margin-bottom: 10px;">You'll receive your loan documents via email and mail</li>
                        <li style="margin-bottom: 10px;">Set up automatic payments to never miss a due date</li>
                        <li>Access your account portal to manage your loan</li>
                      </ol>
                    </div>
                    
                    <!-- CTA Button -->
                    <div style="text-align: center; margin: 40px 0;">
                      <a href="#" style="background: linear-gradient(135deg, #3860be 0%, #013474 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                        Access Your Account
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    Questions? Contact us at <a href="mailto:support@marinerfinance.com" style="color: #3860be;">support@marinerfinance.com</a> or call (855) 884-4365
                  </p>
                  <p style="color: #9ca3af; font-size: 12px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    © 2024 Mariner Finance. All rights reserved. | 8211 Town Center Dr, Nottingham, MD 21236
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!-- Payment Reminder Email -->
    <div v-if="templateType === 'payment-reminder'" class="email-template" :style="emailStyles">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; min-height: 100vh;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <img :src="marinerLogo" alt="Mariner Finance" style="height: 60px; margin-bottom: 20px; filter: brightness(0) invert(1);">
                  <h1 style="color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 26px; margin: 0; font-weight: bold;">
                    Payment Reminder
                  </h1>
                </td>
              </tr>
              
              <!-- Main Content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #374151; line-height: 1.6;">
                    <p style="font-size: 18px; margin-bottom: 25px;">
                      Dear {{ customerName }},
                    </p>
                    
                    <p style="font-size: 16px; margin-bottom: 30px;">
                      This is a friendly reminder that your loan payment of <strong style="color: #f59e0b; font-size: 18px;">${{ paymentAmount?.toLocaleString() }}</strong> 
                      is due on <strong>{{ dueDate }}</strong>.
                    </p>
                    
                    <!-- Payment Details -->
                    <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0;">
                      <h3 style="color: #92400e; margin: 0 0 15px 0;">Payment Information</h3>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding: 5px 0; font-weight: bold;">Account Number:</td>
                          <td style="padding: 5px 0; text-align: right;">{{ accountNumber }}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; font-weight: bold;">Payment Amount:</td>
                          <td style="padding: 5px 0; text-align: right; font-size: 18px; font-weight: bold; color: #f59e0b;">${{ paymentAmount?.toLocaleString() }}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; font-weight: bold;">Due Date:</td>
                          <td style="padding: 5px 0; text-align: right; font-weight: bold;">{{ dueDate }}</td>
                        </tr>
                        <tr>
                          <td style="padding: 5px 0; font-weight: bold;">Remaining Balance:</td>
                          <td style="padding: 5px 0; text-align: right;">${{ remainingBalance?.toLocaleString() }}</td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- Payment Options -->
                    <div style="margin: 30px 0;">
                      <h3 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Easy Payment Options:</h3>
                      <ul style="color: #6b7280; padding-left: 20px;">
                        <li style="margin-bottom: 10px;">Online at marinerfinance.com</li>
                        <li style="margin-bottom: 10px;">Mobile app (iOS/Android)</li>
                        <li style="margin-bottom: 10px;">Phone: (855) 884-4365</li>
                        <li style="margin-bottom: 10px;">Mail or visit any branch location</li>
                        <li>Set up AutoPay to never miss a payment</li>
                      </ul>
                    </div>
                    
                    <!-- CTA Buttons -->
                    <div style="text-align: center; margin: 40px 0;">
                      <a href="#" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; text-decoration: none; padding: 15px 25px; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; margin: 0 10px 10px 0;">
                        Make Payment
                      </a>
                      <a href="#" style="background: transparent; color: #3860be; text-decoration: none; padding: 15px 25px; border: 2px solid #3860be; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; margin: 0 10px 10px 0;">
                        Set Up AutoPay
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    Questions? Contact us at <a href="mailto:payments@marinerfinance.com" style="color: #3860be;">payments@marinerfinance.com</a> or call (855) 884-4365
                  </p>
                  <p style="color: #9ca3af; font-size: 12px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    © 2024 Mariner Finance. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <!-- Marketing Promotion Email -->
    <div v-if="templateType === 'marketing'" class="email-template" :style="emailStyles">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; min-height: 100vh;">
        <tr>
          <td align="center" style="padding: 40px 20px;">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
                  <img :src="marinerLogo" alt="Mariner Finance" style="height: 60px; margin-bottom: 25px; filter: brightness(0) invert(1);">
                  <h1 style="color: white; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 32px; margin: 0 0 10px 0; font-weight: bold;">
                    Limited Time Offer
                  </h1>
                  <p style="color: #dcfce7; font-size: 18px; margin: 0;">
                    Special rates for qualified borrowers
                  </p>
                </td>
              </tr>
              
              <!-- Hero Section -->
              <tr>
                <td style="padding: 0;">
                  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 40px 30px; text-align: center;">
                    <h2 style="color: #047857; font-size: 28px; margin: 0 0 15px 0; font-weight: bold;">
                      Personal Loans Starting at 6.99% APR*
                    </h2>
                    <p style="color: #065f46; font-size: 18px; margin: 0 0 25px 0;">
                      Get the funds you need with our lowest rates of the year
                    </p>
                    <div style="background: white; border-radius: 8px; padding: 25px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                      <div style="font-size: 48px; font-weight: bold; color: #059669; margin-bottom: 10px;">6.99%</div>
                      <div style="color: #374151; font-size: 16px;">APR* for qualified borrowers</div>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Features -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    <h3 style="color: #374151; font-size: 22px; text-align: center; margin: 0 0 30px 0;">Why Choose Mariner Finance?</h3>
                    
                    <div style="margin-bottom: 30px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="50%" style="padding-right: 15px; vertical-align: top;">
                            <div style="text-align: center; margin-bottom: 25px;">
                              <div style="background-color: #f0fdf4; width: 60px; height: 60px; border-radius: 50%; display: inline-block; line-height: 60px; margin-bottom: 15px;">
                                <span style="color: #059669; font-size: 24px; font-weight: bold;">✓</span>
                              </div>
                              <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Quick Approval</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px;">Get approved in as little as 24 hours</p>
                            </div>
                          </td>
                          <td width="50%" style="padding-left: 15px; vertical-align: top;">
                            <div style="text-align: center; margin-bottom: 25px;">
                              <div style="background-color: #f0fdf4; width: 60px; height: 60px; border-radius: 50%; display: inline-block; line-height: 60px; margin-bottom: 15px;">
                                <span style="color: #059669; font-size: 24px; font-weight: bold;">$</span>
                              </div>
                              <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Flexible Terms</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px;">Loan amounts $1,000 - $50,000</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td width="50%" style="padding-right: 15px; vertical-align: top;">
                            <div style="text-align: center;">
                              <div style="background-color: #f0fdf4; width: 60px; height: 60px; border-radius: 50%; display: inline-block; line-height: 60px; margin-bottom: 15px;">
                                <span style="color: #059669; font-size: 18px; font-weight: bold;">📱</span>
                              </div>
                              <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Digital Experience</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px;">Apply online or on our mobile app</p>
                            </div>
                          </td>
                          <td width="50%" style="padding-left: 15px; vertical-align: top;">
                            <div style="text-align: center;">
                              <div style="background-color: #f0fdf4; width: 60px; height: 60px; border-radius: 50%; display: inline-block; line-height: 60px; margin-bottom: 15px;">
                                <span style="color: #059669; font-size: 18px; font-weight: bold;">🏪</span>
                              </div>
                              <h4 style="color: #374151; margin: 0 0 10px 0; font-size: 16px;">Local Service</h4>
                              <p style="color: #6b7280; margin: 0; font-size: 14px;">Over 480+ branch locations</p>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                    
                    <!-- CTA Section -->
                    <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 8px; padding: 30px; margin: 40px 0; text-align: center;">
                      <h3 style="color: #047857; margin: 0 0 15px 0; font-size: 20px;">Ready to Get Started?</h3>
                      <p style="color: #065f46; margin: 0 0 25px 0; font-size: 16px;">Apply now and get a decision in minutes</p>
                      <a href="#" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; text-decoration: none; padding: 18px 35px; border-radius: 6px; font-weight: bold; font-size: 18px; display: inline-block;">
                        Apply Now
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                  <p style="color: #6b7280; font-size: 12px; margin: 0 0 15px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    *APR = Annual Percentage Rate. Rates from 6.99% to 35.99% APR. Your rate depends on credit history, loan amount, loan term, and other factors. Not all applicants will qualify for the lowest rate. Subject to credit approval.
                  </p>
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    Questions? Contact us at <a href="mailto:info@marinerfinance.com" style="color: #3860be;">info@marinerfinance.com</a> or call (855) 884-4365
                  </p>
                  <p style="color: #9ca3af; font-size: 12px; margin: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    © 2024 Mariner Finance. All rights reserved. | 8211 Town Center Dr, Nottingham, MD 21236
                  </p>
                  <div style="margin-top: 15px;">
                    <a href="#" style="color: #9ca3af; font-size: 12px; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                    <a href="#" style="color: #9ca3af; font-size: 12px; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                    <a href="#" style="color: #9ca3af; font-size: 12px; text-decoration: none; margin: 0 10px;">Terms</a>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'EmailTemplates',
  props: {
    templateType: {
      type: String,
      required: true,
      validator: (value) => ['approval', 'payment-reminder', 'marketing', 'application-status', 'welcome'].includes(value)
    },
    customerName: {
      type: String,
      default: 'Valued Customer'
    },
    loanAmount: {
      type: Number,
      default: 25000
    },
    apr: {
      type: Number,
      default: 8.99
    },
    termMonths: {
      type: Number,
      default: 60
    },
    monthlyPayment: {
      type: Number,
      default: 515
    },
    firstPaymentDate: {
      type: String,
      default: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
    },
    paymentAmount: {
      type: Number,
      default: 515
    },
    dueDate: {
      type: String,
      default: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()
    },
    accountNumber: {
      type: String,
      default: '****1234'
    },
    remainingBalance: {
      type: Number,
      default: 22350
    }
  },
  setup() {
    const marinerLogo = computed(() => {
      // SVG logo for Mariner Finance
      return 'data:image/svg+xml;base64,' + btoa(`
        <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
          <rect width="200" height="60" fill="#3860be"/>
          <text x="100" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">
            MARINER
          </text>
          <text x="100" y="50" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#dcfce7">
            FINANCE
          </text>
        </svg>
      `);
    });

    const emailStyles = computed(() => ({
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      lineHeight: '1.6',
      color: '#374151'
    }));

    return {
      marinerLogo,
      emailStyles
    };
  }
};
</script>

<style scoped>
.email-templates-container {
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
}

.email-template {
  width: 100%;
  min-width: 600px;
}

.email-template table {
  border-collapse: collapse;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
}

.email-template img {
  border: 0;
  height: auto;
  line-height: 100%;
  outline: none;
  text-decoration: none;
}

@media only screen and (max-width: 620px) {
  .email-template table[width="600"] {
    width: 100% !important;
  }
  
  .email-template .mobile-padding {
    padding: 20px !important;
  }
  
  .email-template .mobile-text-center {
    text-align: center !important;
  }
  
  .email-template .mobile-block {
    display: block !important;
    width: 100% !important;
    margin-bottom: 10px !important;
  }
}
</style>