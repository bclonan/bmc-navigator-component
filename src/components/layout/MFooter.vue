<template>
  <footer class="m-footer" :class="footerClasses">
    <div class="footer-container" :class="containerClasses">
      <!-- Main Footer Content -->
      <div v-if="variant !== 'minimal'" class="footer-main">
        <div class="footer-grid">
          <!-- Company Info -->
          <div class="footer-section">
            <div class="footer-brand">
              <img v-if="brand.logo" :src="brand.logo" :alt="brand.alt" class="footer-logo" />
              <span v-if="brand.text" class="footer-brand-text">{{ brand.text }}</span>
            </div>
            <p v-if="brand.description" class="footer-description">
              {{ brand.description }}
            </p>
            <div v-if="socialLinks.length > 0" class="footer-social">
              <a
                v-for="social in socialLinks"
                :key="social.id"
                :href="social.url"
                :aria-label="social.label"
                class="footer-social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg class="footer-social-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path :d="getSocialIcon(social.platform)" />
                </svg>
              </a>
            </div>
          </div>

          <!-- Footer Links -->
          <div
            v-for="section in linkSections"
            :key="section.id"
            class="footer-section"
          >
            <h3 class="footer-section-title">{{ section.title }}</h3>
            <ul class="footer-links">
              <li v-for="link in section.links" :key="link.id" class="footer-link-item">
                <a
                  :href="link.href || '#'"
                  class="footer-link"
                  :target="link.external ? '_blank' : '_self'"
                  :rel="link.external ? 'noopener noreferrer' : ''"
                  @click="handleLinkClick(link)"
                >
                  {{ link.label }}
                  <svg v-if="link.external" class="footer-external-icon" width="12" height="12" viewBox="0 0 12 12">
                    <path d="M3.5 3v1h3.293L2 8.793l.707.707L7.5 4.707V8h1V3h-5z" fill="currentColor"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <!-- Newsletter Signup -->
          <div v-if="showNewsletter" class="footer-section footer-newsletter">
            <h3 class="footer-section-title">{{ newsletterTitle || 'Stay Updated' }}</h3>
            <p class="footer-newsletter-text">
              {{ newsletterText || 'Get the latest updates and financial insights.' }}
            </p>
            <form @submit.prevent="handleNewsletterSubmit" class="footer-newsletter-form">
              <div class="footer-newsletter-input-group">
                <input
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Enter your email"
                  required
                  class="footer-newsletter-input"
                />
                <button
                  type="submit"
                  :disabled="newsletterLoading"
                  class="footer-newsletter-button"
                >
                  {{ newsletterLoading ? 'Subscribing...' : 'Subscribe' }}
                </button>
              </div>
              <p v-if="newsletterMessage" class="footer-newsletter-message" :class="newsletterMessageType">
                {{ newsletterMessage }}
              </p>
            </form>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom" :class="{ 'footer-bottom-only': variant === 'minimal' }">
        <div class="footer-bottom-content">
          <div class="footer-copyright">
            <p class="footer-copyright-text">
              {{ copyrightText || `© ${currentYear} Financial Services. All rights reserved.` }}
            </p>
          </div>

          <!-- Legal Links -->
          <div v-if="legalLinks.length > 0" class="footer-legal">
            <ul class="footer-legal-list">
              <li v-for="link in legalLinks" :key="link.id" class="footer-legal-item">
                <a
                  :href="link.href || '#'"
                  class="footer-legal-link"
                  @click="handleLinkClick(link)"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Additional Info -->
          <div v-if="additionalInfo" class="footer-additional">
            <p class="footer-additional-text">{{ additionalInfo }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MFooter',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: value => ['default', 'minimal', 'dark'].includes(value)
    },
    brand: {
      type: Object,
      default: () => ({})
    },
    linkSections: {
      type: Array,
      default: () => []
    },
    socialLinks: {
      type: Array,
      default: () => []
    },
    legalLinks: {
      type: Array,
      default: () => []
    },
    showNewsletter: {
      type: Boolean,
      default: false
    },
    newsletterTitle: {
      type: String,
      default: ''
    },
    newsletterText: {
      type: String,
      default: ''
    },
    copyrightText: {
      type: String,
      default: ''
    },
    additionalInfo: {
      type: String,
      default: ''
    },
    fluid: {
      type: Boolean,
      default: false
    }
  },

  emits: ['link-click', 'newsletter-submit'],

  data() {
    return {
      newsletterEmail: '',
      newsletterLoading: false,
      newsletterMessage: '',
      newsletterMessageType: ''
    };
  },

  computed: {
    footerClasses() {
      return [
        `footer-${this.variant}`,
        {
          'footer-fluid': this.fluid
        }
      ];
    },

    containerClasses() {
      return {
        'container-fluid': this.fluid,
        'container': !this.fluid
      };
    },

    currentYear() {
      return new Date().getFullYear();
    }
  },

  methods: {
    handleLinkClick(link) {
      this.$emit('link-click', link);
    },

    async handleNewsletterSubmit() {
      if (!this.newsletterEmail) return;

      this.newsletterLoading = true;
      this.newsletterMessage = '';

      try {
        await this.$emit('newsletter-submit', this.newsletterEmail);
        this.newsletterMessage = 'Successfully subscribed to newsletter!';
        this.newsletterMessageType = 'success';
        this.newsletterEmail = '';
      } catch (error) {
        this.newsletterMessage = 'Failed to subscribe. Please try again.';
        this.newsletterMessageType = 'error';
      } finally {
        this.newsletterLoading = false;
        setTimeout(() => {
          this.newsletterMessage = '';
        }, 5000);
      }
    },

    getSocialIcon(platform) {
      const icons = {
        facebook: 'M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.24v-3.32L15.5 1c-2.13 0-3.89 1.81-3.89 4.04v2.42h-2.61v3.36h2.61V20h3.89v-9.18h2.6l.37-3.36z',
        twitter: 'M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z',
        linkedin: 'M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z',
        instagram: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
        youtube: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'
      };
      return icons[platform] || icons.facebook;
    }
  }
};
</script>

<style scoped>
.m-footer {
  background-color: rgb(243 244 246);
  border-top: 1px solid rgb(229 231 235);
}

.footer-dark {
  background-color: rgb(17 24 39);
  border-color: rgb(55 65 81);
}

.footer-container {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.container-fluid {
  width: 100%;
}

/* Main Footer */
.footer-main {
  margin-bottom: 3rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-newsletter {
  grid-column: span 1;
}

/* Brand */
.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-logo {
  height: 2rem;
  width: auto;
}

.footer-brand-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: rgb(17 24 39);
}

.footer-dark .footer-brand-text {
  color: white;
}

.footer-description {
  color: rgb(75 85 99);
  font-size: 0.875rem;
  line-height: 1.625;
}

.footer-dark .footer-description {
  color: rgb(156 163 175);
}

/* Social Links */
.footer-social {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer-social-link {
  padding: 0.5rem;
  color: rgb(107 114 128);
  transition: color 0.2s ease;
}

.footer-social-link:hover {
  color: rgb(55 65 81);
}

.footer-dark .footer-social-link {
  color: rgb(156 163 175);
}

.footer-dark .footer-social-link:hover {
  color: rgb(229 231 235);
}

.footer-social-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Footer Sections */
.footer-section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(17 24 39);
  margin-bottom: 1rem;
}

.footer-dark .footer-section-title {
  color: white;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link-item {
  display: flex;
  align-items: center;
}

.footer-link {
  color: rgb(75 85 99);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: rgb(17 24 39);
}

.footer-dark .footer-link {
  color: rgb(156 163 175);
}

.footer-dark .footer-link:hover {
  color: rgb(229 231 235);
}

.footer-external-icon {
  margin-left: 0.25rem;
  opacity: 0.6;
}

/* Newsletter */
.footer-newsletter-text {
  color: rgb(75 85 99);
  font-size: 0.875rem;
}

.footer-dark .footer-newsletter-text {
  color: rgb(156 163 175);
}

.footer-newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-newsletter-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .footer-newsletter-input-group {
    flex-direction: row;
  }
}

.footer-newsletter-input {
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid rgb(209 213 219);
  border-radius: 0.5rem;
  outline: none;
}

.footer-newsletter-input:focus {
  box-shadow: 0 0 0 2px rgb(59 130 246);
  border-color: rgb(59 130 246);
}

.footer-dark .footer-newsletter-input {
  background-color: rgb(31 41 55);
  border-color: rgb(75 85 99);
  color: white;
}

.footer-dark .footer-newsletter-input::placeholder {
  color: rgb(156 163 175);
}

.footer-newsletter-button {
  padding: 0.5rem 1.5rem;
  background-color: rgb(37 99 235);
  color: white;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.footer-newsletter-button:hover {
  background-color: rgb(29 78 216);
}

.footer-newsletter-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.footer-newsletter-message {
  font-size: 0.875rem;
}

.footer-newsletter-message.success {
  color: rgb(22 163 74);
}

.footer-newsletter-message.error {
  color: rgb(220 38 38);
}

/* Footer Bottom */
.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgb(229 231 235);
}

.footer-dark .footer-bottom {
  border-color: rgb(55 65 81);
}

.footer-bottom-only {
  padding-top: 1.5rem;
  border-top: none;
}

.footer-bottom-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .footer-bottom-content {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 0;
  }
}

.footer-copyright-text {
  color: rgb(75 85 99);
  font-size: 0.875rem;
  margin: 0;
}

.footer-dark .footer-copyright-text {
  color: rgb(156 163 175);
}

/* Legal Links */
.footer-legal-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-legal-link {
  color: rgb(75 85 99);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s ease;
}

.footer-legal-link:hover {
  color: rgb(17 24 39);
}

.footer-dark .footer-legal-link {
  color: rgb(156 163 175);
}

.footer-dark .footer-legal-link:hover {
  color: rgb(229 231 235);
}

/* Additional Info */
.footer-additional-text {
  color: rgb(107 114 128);
  font-size: 0.75rem;
  margin: 0;
}

.footer-dark .footer-additional-text {
  color: rgb(107 114 128);
}

/* Minimal Variant */
.footer-minimal {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.footer-minimal .footer-bottom-content {
  flex-direction: column;
  text-align: center;
  gap: 0.5rem;
}

/* Responsive */
@media (max-width: 767px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .footer-newsletter-input-group {
    flex-direction: column;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .footer-legal-list {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>