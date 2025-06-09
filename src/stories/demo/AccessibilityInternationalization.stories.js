import { ref, reactive, computed } from 'vue';
import MButton from '../../components/ui/MButton.vue';
import MCard from '../../components/ui/MCard.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MCheckbox from '../../components/ui/MCheckbox.vue';
import MSlider from '../../components/ui/MSlider.vue';
import MProgress from '../../components/ui/MProgress.vue';
import MLayout from '../../components/ui/MLayout.vue';
import ECFRNavigator from '../../components/ECFRNavigator.vue';

export default {
  title: 'Demo/Accessibility & Internationalization',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive demonstrations of accessibility features, keyboard navigation, screen reader support, and internationalization capabilities across all components.'
      }
    }
  }
};

// Accessibility Features Showcase
export const AccessibilityShowcase = {
  render: () => ({
    components: { 
      MLayout, MCard, MButton, MTextField, MSelect, MCheckbox, MSlider, MProgress, ECFRNavigator 
    },
    setup() {
      const highContrast = ref(false);
      const reducedMotion = ref(false);
      const fontSize = ref(16);
      const screenReaderMode = ref(false);
      const keyboardNavigation = ref(true);
      
      const accessibilitySettings = reactive({
        highContrast: false,
        reducedMotion: false,
        fontSize: 16,
        screenReaderAnnouncements: true,
        keyboardNavigation: true,
        focusIndicators: true,
        skipLinks: true
      });

      const sampleData = ref([
        {
          id: 'accessibility-guide',
          type: 'guide',
          title: 'Web Accessibility Guidelines',
          description: 'WCAG 2.1 AA compliance standards',
          children: [
            {
              id: 'perceivable',
              type: 'principle',
              title: 'Perceivable',
              description: 'Information must be presentable to users in ways they can perceive',
              children: [
                {
                  id: 'text-alternatives',
                  type: 'guideline',
                  title: '1.1 Text Alternatives',
                  description: 'Provide text alternatives for any non-text content'
                },
                {
                  id: 'captions-alternatives',
                  type: 'guideline',
                  title: '1.2 Captions and Other Alternatives',
                  description: 'Provide alternatives for time-based media'
                }
              ]
            },
            {
              id: 'operable',
              type: 'principle',
              title: 'Operable',
              description: 'Interface components must be operable',
              children: [
                {
                  id: 'keyboard-accessible',
                  type: 'guideline',
                  title: '2.1 Keyboard Accessible',
                  description: 'Make all functionality available from a keyboard'
                }
              ]
            }
          ]
        }
      ]);

      const navigatorOptions = computed(() => ({
        showBreadcrumb: true,
        theme: accessibilitySettings.highContrast ? 'dark' : 'light',
        display: {
          viewMode: 'detailed',
          showDescription: true,
          showMetadataBadges: true,
          animations: !accessibilitySettings.reducedMotion,
          enhancedMobile: true,
          fontScaling: {
            enabled: true,
            baseSize: accessibilitySettings.fontSize,
            scaleRatio: 1.2
          }
        },
        accessibility: {
          announceChanges: accessibilitySettings.screenReaderAnnouncements,
          keyboardNavigation: accessibilitySettings.keyboardNavigation,
          focusManagement: true,
          ariaLabels: true,
          roleDefinitions: true
        }
      }));

      const formData = reactive({
        fullName: '',
        email: '',
        accessibilityNeeds: '',
        newsletter: false,
        fontSize: 16
      });

      const toggleHighContrast = () => {
        accessibilitySettings.highContrast = !accessibilitySettings.highContrast;
        
        // Apply high contrast styles
        if (accessibilitySettings.highContrast) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      };

      const toggleReducedMotion = () => {
        accessibilitySettings.reducedMotion = !accessibilitySettings.reducedMotion;
        
        // Apply reduced motion preference
        if (accessibilitySettings.reducedMotion) {
          document.documentElement.style.setProperty('--animation-duration', '0s');
        } else {
          document.documentElement.style.removeProperty('--animation-duration');
        }
      };

      const announceToScreenReader = (message) => {
        if (accessibilitySettings.screenReaderAnnouncements) {
          const announcement = document.createElement('div');
          announcement.setAttribute('aria-live', 'polite');
          announcement.setAttribute('aria-atomic', 'true');
          announcement.className = 'sr-only';
          announcement.textContent = message;
          document.body.appendChild(announcement);
          
          setTimeout(() => {
            document.body.removeChild(announcement);
          }, 1000);
        }
      };

      const handleFormSubmit = () => {
        announceToScreenReader('Form submitted successfully. Thank you for your feedback.');
      };

      return {
        accessibilitySettings,
        sampleData,
        navigatorOptions,
        formData,
        toggleHighContrast,
        toggleReducedMotion,
        announceToScreenReader,
        handleFormSubmit
      };
    },
    template: `
      <MLayout app-title="Accessibility Features Demo" :drawer="true" permanent>
        <template #drawer>
          <div class="p-4 space-y-6">
            <div>
              <h3 class="text-lg font-semibold mb-4">Accessibility Settings</h3>
              
              <!-- Skip Links (Screen Reader) -->
              <nav class="sr-only focus-within:not-sr-only mb-4" aria-label="Skip links">
                <a href="#main-content" class="skip-link">Skip to main content</a>
                <a href="#navigation" class="skip-link">Skip to navigation</a>
                <a href="#accessibility-form" class="skip-link">Skip to accessibility form</a>
              </nav>
              
              <div class="space-y-4">
                <!-- High Contrast Toggle -->
                <div class="flex items-center justify-between">
                  <label for="high-contrast" class="text-sm font-medium text-gray-700">
                    High Contrast Mode
                  </label>
                  <button
                    id="high-contrast"
                    type="button"
                    role="switch"
                    :aria-checked="accessibilitySettings.highContrast"
                    @click="toggleHighContrast"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :class="accessibilitySettings.highContrast ? 'bg-blue-600' : 'bg-gray-200'"
                  >
                    <span
                      :class="accessibilitySettings.highContrast ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    ></span>
                  </button>
                </div>

                <!-- Reduced Motion -->
                <div class="flex items-center justify-between">
                  <label for="reduced-motion" class="text-sm font-medium text-gray-700">
                    Reduce Motion
                  </label>
                  <button
                    id="reduced-motion"
                    type="button"
                    role="switch"
                    :aria-checked="accessibilitySettings.reducedMotion"
                    @click="toggleReducedMotion"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :class="accessibilitySettings.reducedMotion ? 'bg-blue-600' : 'bg-gray-200'"
                  >
                    <span
                      :class="accessibilitySettings.reducedMotion ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    ></span>
                  </button>
                </div>

                <!-- Font Size Adjustment -->
                <div>
                  <label for="font-size" class="block text-sm font-medium text-gray-700 mb-2">
                    Font Size: {{ accessibilitySettings.fontSize }}px
                  </label>
                  <MSlider
                    id="font-size"
                    v-model="accessibilitySettings.fontSize"
                    :min="12"
                    :max="24"
                    :step="2"
                    aria-label="Adjust font size"
                    @update:model-value="announceToScreenReader(\`Font size changed to \${accessibilitySettings.fontSize} pixels\`)"
                  />
                </div>

                <!-- Screen Reader Announcements -->
                <div class="flex items-center justify-between">
                  <label for="screen-reader" class="text-sm font-medium text-gray-700">
                    Screen Reader Announcements
                  </label>
                  <button
                    id="screen-reader"
                    type="button"
                    role="switch"
                    :aria-checked="accessibilitySettings.screenReaderAnnouncements"
                    @click="accessibilitySettings.screenReaderAnnouncements = !accessibilitySettings.screenReaderAnnouncements"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    :class="accessibilitySettings.screenReaderAnnouncements ? 'bg-blue-600' : 'bg-gray-200'"
                  >
                    <span
                      :class="accessibilitySettings.screenReaderAnnouncements ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Accessibility Navigator -->
            <div id="navigation" role="navigation" aria-label="Accessibility guidelines">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Navigation Demo</h4>
              <div class="border rounded-lg bg-white overflow-hidden max-h-64">
                <ECFRNavigator
                  :items="sampleData"
                  :options="navigatorOptions"
                  aria-label="Accessibility guidelines navigator"
                  @item-selected="announceToScreenReader(\`Selected: \${$event.title}\`)"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- Main Content -->
        <main id="main-content" class="space-y-6" tabindex="-1">
          <div class="focus:outline-none">
            <h1 class="text-3xl font-bold text-gray-900">Accessibility Features</h1>
            <p class="text-gray-600 mt-2">
              Comprehensive accessibility support including WCAG 2.1 AA compliance,
              keyboard navigation, screen reader support, and customizable display options.
            </p>
          </div>

          <!-- Accessibility Features Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Keyboard Navigation Demo -->
            <MCard 
              title="Keyboard Navigation" 
              subtitle="Tab through interactive elements"
              role="region"
              aria-labelledby="keyboard-nav-title"
            >
              <div id="keyboard-nav-title" class="sr-only">Keyboard Navigation Demo</div>
              <div class="space-y-4">
                <p class="text-sm text-gray-600">
                  Use Tab to navigate forward, Shift+Tab to navigate backward.
                  All interactive elements are keyboard accessible.
                </p>
                
                <div class="grid grid-cols-2 gap-3">
                  <MButton
                    text="Button 1"
                    @click="announceToScreenReader('Button 1 activated')"
                    aria-describedby="button-help"
                  />
                  <MButton
                    text="Button 2"
                    variant="outlined"
                    @click="announceToScreenReader('Button 2 activated')"
                  />
                  <MButton
                    text="Button 3"
                    variant="text"
                    @click="announceToScreenReader('Button 3 activated')"
                  />
                  <MButton
                    text="Button 4"
                    variant="elevated"
                    @click="announceToScreenReader('Button 4 activated')"
                  />
                </div>
                
                <div id="button-help" class="text-xs text-gray-500">
                  Press Enter or Space to activate buttons
                </div>
              </div>
            </MCard>

            <!-- Form Accessibility Demo -->
            <MCard 
              title="Accessible Forms" 
              subtitle="Proper labels, descriptions, and error handling"
              role="region"
              aria-labelledby="form-demo-title"
            >
              <div id="form-demo-title" class="sr-only">Accessible Forms Demo</div>
              <form id="accessibility-form" @submit.prevent="handleFormSubmit" class="space-y-4">
                <MTextField
                  v-model="formData.fullName"
                  label="Full Name"
                  placeholder="Enter your full name"
                  required
                  aria-describedby="name-help"
                  autocomplete="name"
                />
                <div id="name-help" class="text-xs text-gray-500">
                  Your name will be used for identification purposes
                </div>

                <MTextField
                  v-model="formData.email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  required
                  aria-describedby="email-help"
                  autocomplete="email"
                />
                <div id="email-help" class="text-xs text-gray-500">
                  We'll use this to send you updates
                </div>

                <MSelect
                  v-model="formData.accessibilityNeeds"
                  label="Accessibility Needs"
                  placeholder="Select your needs..."
                  :options="[
                    { value: 'none', label: 'No specific needs' },
                    { value: 'screen-reader', label: 'Screen reader user' },
                    { value: 'keyboard-only', label: 'Keyboard-only navigation' },
                    { value: 'low-vision', label: 'Low vision support' },
                    { value: 'motor-impairment', label: 'Motor impairment accommodations' }
                  ]"
                  aria-describedby="needs-help"
                />
                <div id="needs-help" class="text-xs text-gray-500">
                  Help us customize your experience
                </div>

                <MCheckbox
                  v-model="formData.newsletter"
                  label="Subscribe to accessibility newsletter"
                  aria-describedby="newsletter-help"
                />
                <div id="newsletter-help" class="text-xs text-gray-500">
                  Monthly updates on accessibility improvements
                </div>

                <MButton
                  type="submit"
                  text="Submit Form"
                  class="w-full"
                  aria-describedby="submit-help"
                />
                <div id="submit-help" class="text-xs text-gray-500">
                  Form submission will be announced to screen readers
                </div>
              </form>
            </MCard>
          </div>

          <!-- Screen Reader Information -->
          <MCard 
            title="Screen Reader Support" 
            subtitle="ARIA attributes and semantic markup"
            role="region"
            aria-labelledby="screen-reader-title"
          >
            <div id="screen-reader-title" class="sr-only">Screen Reader Support Information</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-3">ARIA Features</h4>
                <ul class="space-y-2 text-sm text-gray-600" role="list">
                  <li role="listitem">
                    <strong>aria-label:</strong> Descriptive labels for interactive elements
                  </li>
                  <li role="listitem">
                    <strong>aria-describedby:</strong> Additional context and help text
                  </li>
                  <li role="listitem">
                    <strong>aria-live:</strong> Dynamic content announcements
                  </li>
                  <li role="listitem">
                    <strong>role attributes:</strong> Semantic meaning for complex widgets
                  </li>
                  <li role="listitem">
                    <strong>aria-expanded:</strong> State information for collapsible content
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-3">Semantic Markup</h4>
                <ul class="space-y-2 text-sm text-gray-600" role="list">
                  <li role="listitem">
                    <strong>Headings:</strong> Proper heading hierarchy (h1-h6)
                  </li>
                  <li role="listitem">
                    <strong>Landmarks:</strong> Navigation, main, aside, footer regions
                  </li>
                  <li role="listitem">
                    <strong>Lists:</strong> Structured content with proper list markup
                  </li>
                  <li role="listitem">
                    <strong>Forms:</strong> Proper form controls and fieldsets
                  </li>
                  <li role="listitem">
                    <strong>Tables:</strong> Headers and captions for data tables
                  </li>
                </ul>
              </div>
            </div>
          </MCard>

          <!-- Focus Management Demo -->
          <MCard 
            title="Focus Management" 
            subtitle="Logical focus order and focus indicators"
            role="region"
            aria-labelledby="focus-demo-title"
          >
            <div id="focus-demo-title" class="sr-only">Focus Management Demo</div>
            <div class="space-y-4">
              <p class="text-sm text-gray-600">
                Focus moves logically through the interface. Focus indicators are clearly visible
                and meet WCAG contrast requirements.
              </p>
              
              <div class="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <div class="grid grid-cols-3 gap-3">
                  <MButton text="Focus 1" size="small" />
                  <MButton text="Focus 2" size="small" variant="outlined" />
                  <MButton text="Focus 3" size="small" variant="text" />
                </div>
                <div class="mt-3">
                  <MTextField
                    placeholder="Focus moves here next"
                    aria-label="Focus demonstration input"
                  />
                </div>
              </div>
              
              <div class="text-xs text-gray-500">
                <strong>Tip:</strong> Try using Tab key to navigate through the elements above.
                Notice how the focus indicator moves in a logical order.
              </div>
            </div>
          </MCard>
        </main>

        <!-- Hidden live region for announcements -->
        <div aria-live="polite" aria-atomic="true" class="sr-only" id="announcements"></div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility features demonstration including WCAG 2.1 AA compliance, keyboard navigation, screen reader support, high contrast mode, and reduced motion preferences.'
      }
    }
  }
};

// Internationalization Demo
export const InternationalizationDemo = {
  render: () => ({
    components: { 
      MLayout, MCard, MButton, MTextField, MSelect, MProgress, ECFRNavigator 
    },
    setup() {
      const currentLanguage = ref('en');
      const currentRegion = ref('US');
      const textDirection = ref('ltr');
      
      // Simulated translations
      const translations = {
        en: {
          title: 'Financial Services Dashboard',
          subtitle: 'Manage your financial portfolio',
          navigation: 'Navigation',
          settings: 'Settings',
          language: 'Language',
          region: 'Region',
          currency: 'Currency',
          dateFormat: 'Date Format',
          numberFormat: 'Number Format',
          personalInfo: 'Personal Information',
          firstName: 'First Name',
          lastName: 'Last Name',
          email: 'Email Address',
          phone: 'Phone Number',
          submit: 'Submit',
          cancel: 'Cancel',
          loading: 'Loading...',
          success: 'Success!',
          error: 'Error occurred',
          welcome: 'Welcome back!',
          totalBalance: 'Total Balance',
          recentTransactions: 'Recent Transactions',
          monthlyGoal: 'Monthly Savings Goal'
        },
        es: {
          title: 'Panel de Servicios Financieros',
          subtitle: 'Gestiona tu cartera financiera',
          navigation: 'Navegación',
          settings: 'Configuración',
          language: 'Idioma',
          region: 'Región',
          currency: 'Moneda',
          dateFormat: 'Formato de Fecha',
          numberFormat: 'Formato de Número',
          personalInfo: 'Información Personal',
          firstName: 'Nombre',
          lastName: 'Apellido',
          email: 'Dirección de Correo',
          phone: 'Número de Teléfono',
          submit: 'Enviar',
          cancel: 'Cancelar',
          loading: 'Cargando...',
          success: '¡Éxito!',
          error: 'Ocurrió un error',
          welcome: '¡Bienvenido de nuevo!',
          totalBalance: 'Saldo Total',
          recentTransactions: 'Transacciones Recientes',
          monthlyGoal: 'Meta de Ahorro Mensual'
        },
        fr: {
          title: 'Tableau de Bord des Services Financiers',
          subtitle: 'Gérez votre portefeuille financier',
          navigation: 'Navigation',
          settings: 'Paramètres',
          language: 'Langue',
          region: 'Région',
          currency: 'Devise',
          dateFormat: 'Format de Date',
          numberFormat: 'Format de Nombre',
          personalInfo: 'Informations Personnelles',
          firstName: 'Prénom',
          lastName: 'Nom de Famille',
          email: 'Adresse Email',
          phone: 'Numéro de Téléphone',
          submit: 'Soumettre',
          cancel: 'Annuler',
          loading: 'Chargement...',
          success: 'Succès!',
          error: 'Erreur survenue',
          welcome: 'Bon retour!',
          totalBalance: 'Solde Total',
          recentTransactions: 'Transactions Récentes',
          monthlyGoal: 'Objectif d\'Épargne Mensuel'
        },
        ar: {
          title: 'لوحة تحكم الخدمات المالية',
          subtitle: 'إدارة محفظتك المالية',
          navigation: 'التنقل',
          settings: 'الإعدادات',
          language: 'اللغة',
          region: 'المنطقة',
          currency: 'العملة',
          dateFormat: 'تنسيق التاريخ',
          numberFormat: 'تنسيق الرقم',
          personalInfo: 'المعلومات الشخصية',
          firstName: 'الاسم الأول',
          lastName: 'اسم العائلة',
          email: 'عنوان البريد الإلكتروني',
          phone: 'رقم الهاتف',
          submit: 'إرسال',
          cancel: 'إلغاء',
          loading: 'جاري التحميل...',
          success: 'نجح!',
          error: 'حدث خطأ',
          welcome: 'مرحباً بعودتك!',
          totalBalance: 'الرصيد الإجمالي',
          recentTransactions: 'المعاملات الأخيرة',
          monthlyGoal: 'هدف التوفير الشهري'
        },
        zh: {
          title: '金融服务仪表板',
          subtitle: '管理您的金融投资组合',
          navigation: '导航',
          settings: '设置',
          language: '语言',
          region: '地区',
          currency: '货币',
          dateFormat: '日期格式',
          numberFormat: '数字格式',
          personalInfo: '个人信息',
          firstName: '名字',
          lastName: '姓氏',
          email: '电子邮件地址',
          phone: '电话号码',
          submit: '提交',
          cancel: '取消',
          loading: '加载中...',
          success: '成功！',
          error: '发生错误',
          welcome: '欢迎回来！',
          totalBalance: '总余额',
          recentTransactions: '最近交易',
          monthlyGoal: '月度储蓄目标'
        }
      };

      const languages = [
        { value: 'en', label: 'English', flag: '🇺🇸' },
        { value: 'es', label: 'Español', flag: '🇪🇸' },
        { value: 'fr', label: 'Français', flag: '🇫🇷' },
        { value: 'ar', label: 'العربية', flag: '🇸🇦' },
        { value: 'zh', label: '中文', flag: '🇨🇳' }
      ];

      const regions = {
        en: [
          { value: 'US', label: 'United States', currency: 'USD', dateFormat: 'MM/DD/YYYY' },
          { value: 'CA', label: 'Canada', currency: 'CAD', dateFormat: 'DD/MM/YYYY' },
          { value: 'GB', label: 'United Kingdom', currency: 'GBP', dateFormat: 'DD/MM/YYYY' }
        ],
        es: [
          { value: 'ES', label: 'España', currency: 'EUR', dateFormat: 'DD/MM/YYYY' },
          { value: 'MX', label: 'México', currency: 'MXN', dateFormat: 'DD/MM/YYYY' },
          { value: 'AR', label: 'Argentina', currency: 'ARS', dateFormat: 'DD/MM/YYYY' }
        ],
        fr: [
          { value: 'FR', label: 'France', currency: 'EUR', dateFormat: 'DD/MM/YYYY' },
          { value: 'CA', label: 'Canada', currency: 'CAD', dateFormat: 'DD/MM/YYYY' }
        ],
        ar: [
          { value: 'SA', label: 'المملكة العربية السعودية', currency: 'SAR', dateFormat: 'DD/MM/YYYY' },
          { value: 'AE', label: 'الإمارات العربية المتحدة', currency: 'AED', dateFormat: 'DD/MM/YYYY' }
        ],
        zh: [
          { value: 'CN', label: '中国', currency: 'CNY', dateFormat: 'YYYY/MM/DD' },
          { value: 'TW', label: '台湾', currency: 'TWD', dateFormat: 'YYYY/MM/DD' }
        ]
      };

      const t = computed(() => translations[currentLanguage.value] || translations.en);
      const availableRegions = computed(() => regions[currentLanguage.value] || regions.en);
      const currentRegionData = computed(() => 
        availableRegions.value.find(r => r.value === currentRegion.value) || availableRegions.value[0]
      );

      const formData = reactive({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      });

      const sampleFinancialData = computed(() => [
        {
          id: 'banking',
          type: 'category',
          title: currentLanguage.value === 'es' ? 'Servicios Bancarios' :
                currentLanguage.value === 'fr' ? 'Services Bancaires' :
                currentLanguage.value === 'ar' ? 'الخدمات المصرفية' :
                currentLanguage.value === 'zh' ? '银行服务' : 'Banking Services',
          children: [
            {
              id: 'accounts',
              type: 'subcategory',
              title: currentLanguage.value === 'es' ? 'Cuentas' :
                    currentLanguage.value === 'fr' ? 'Comptes' :
                    currentLanguage.value === 'ar' ? 'الحسابات' :
                    currentLanguage.value === 'zh' ? '账户' : 'Accounts'
            }
          ]
        }
      ]);

      const formatCurrency = (amount) => {
        const currency = currentRegionData.value.currency;
        return new Intl.NumberFormat(currentLanguage.value + '-' + currentRegion.value, {
          style: 'currency',
          currency: currency
        }).format(amount);
      };

      const formatNumber = (number) => {
        return new Intl.NumberFormat(currentLanguage.value + '-' + currentRegion.value).format(number);
      };

      const formatDate = (date) => {
        return new Intl.DateTimeFormat(currentLanguage.value + '-' + currentRegion.value).format(date);
      };

      const changeLanguage = (newLanguage) => {
        currentLanguage.value = newLanguage;
        
        // Update text direction for RTL languages
        textDirection.value = newLanguage === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = textDirection.value;
        
        // Reset region to first available for new language
        currentRegion.value = availableRegions.value[0].value;
      };

      return {
        currentLanguage,
        currentRegion,
        textDirection,
        languages,
        availableRegions,
        currentRegionData,
        t,
        formData,
        sampleFinancialData,
        formatCurrency,
        formatNumber,
        formatDate,
        changeLanguage
      };
    },
    template: `
      <MLayout :app-title="t.title" :drawer="true" permanent>
        <template #drawer>
          <div class="p-4 space-y-6">
            <div>
              <h3 class="text-lg font-semibold mb-4">{{ t.settings }}</h3>
              
              <!-- Language Selection -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.language }}
                  </label>
                  <MSelect
                    :model-value="currentLanguage"
                    :options="languages.map(lang => ({ 
                      value: lang.value, 
                      label: \`\${lang.flag} \${lang.label}\`
                    }))"
                    @update:model-value="changeLanguage"
                  />
                </div>

                <!-- Region Selection -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ t.region }}
                  </label>
                  <MSelect
                    v-model="currentRegion"
                    :options="availableRegions.map(region => ({ 
                      value: region.value, 
                      label: region.label 
                    }))"
                  />
                </div>

                <!-- Format Information -->
                <div class="bg-gray-50 p-3 rounded-lg space-y-2">
                  <div class="text-xs text-gray-600">
                    <strong>{{ t.currency }}:</strong> {{ currentRegionData.currency }}
                  </div>
                  <div class="text-xs text-gray-600">
                    <strong>{{ t.dateFormat }}:</strong> {{ currentRegionData.dateFormat }}
                  </div>
                  <div class="text-xs text-gray-600">
                    <strong>{{ t.numberFormat }}:</strong> {{ formatNumber(1234567.89) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Demo -->
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">{{ t.navigation }}</h4>
              <div class="border rounded-lg bg-white overflow-hidden max-h-64">
                <ECFRNavigator
                  :items="sampleFinancialData"
                  :options="{
                    showBreadcrumb: true,
                    theme: 'light',
                    display: {
                      viewMode: 'standard',
                      showDescription: true
                    }
                  }"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- Main Content -->
        <div class="space-y-6" :dir="textDirection">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ t.title }}</h1>
            <p class="text-gray-600 mt-2">{{ t.subtitle }}</p>
          </div>

          <!-- Dashboard Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Welcome Card -->
            <MCard :title="t.welcome" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <div class="text-2xl font-bold">{{ formatDate(new Date()) }}</div>
            </MCard>

            <!-- Balance Card -->
            <MCard :title="t.totalBalance">
              <div class="text-3xl font-bold text-green-600">
                {{ formatCurrency(12847.53) }}
              </div>
              <div class="text-sm text-gray-600 mt-1">
                +{{ formatCurrency(234.12) }} {{ 
                  currentLanguage === 'es' ? 'este mes' :
                  currentLanguage === 'fr' ? 'ce mois' :
                  currentLanguage === 'ar' ? 'هذا الشهر' :
                  currentLanguage === 'zh' ? '本月' : 'this month'
                }}
              </div>
            </MCard>

            <!-- Savings Goal -->
            <MCard :title="t.monthlyGoal">
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>{{ formatCurrency(750) }}</span>
                  <span>{{ formatCurrency(1000) }}</span>
                </div>
                <MProgress :value="75" class="h-2" />
                <div class="text-xs text-gray-600">75% {{ 
                  currentLanguage === 'es' ? 'completado' :
                  currentLanguage === 'fr' ? 'terminé' :
                  currentLanguage === 'ar' ? 'مكتمل' :
                  currentLanguage === 'zh' ? '已完成' : 'complete'
                }}</div>
              </div>
            </MCard>
          </div>

          <!-- Internationalized Form -->
          <MCard :title="t.personalInfo" :subtitle="currentLanguage === 'ar' ? 'املأ المعلومات أدناه' : 'Fill out the information below'">
            <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MTextField
                v-model="formData.firstName"
                :label="t.firstName"
                :placeholder="t.firstName"
                required
              />
              
              <MTextField
                v-model="formData.lastName"
                :label="t.lastName"
                :placeholder="t.lastName"
                required
              />
              
              <MTextField
                v-model="formData.email"
                :label="t.email"
                :placeholder="t.email"
                type="email"
                required
              />
              
              <MTextField
                v-model="formData.phone"
                :label="t.phone"
                :placeholder="t.phone"
                type="tel"
                required
              />
              
              <div class="md:col-span-2 flex justify-end space-x-3">
                <MButton :text="t.cancel" variant="outlined" />
                <MButton :text="t.submit" type="submit" />
              </div>
            </form>
          </MCard>

          <!-- Recent Transactions -->
          <MCard :title="t.recentTransactions">
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b">
                <div>
                  <div class="font-medium">
                    {{ currentLanguage === 'es' ? 'Depósito Directo' :
                       currentLanguage === 'fr' ? 'Dépôt Direct' :
                       currentLanguage === 'ar' ? 'إيداع مباشر' :
                       currentLanguage === 'zh' ? '直接存款' : 'Direct Deposit' }}
                  </div>
                  <div class="text-sm text-gray-600">{{ formatDate(new Date(Date.now() - 86400000)) }}</div>
                </div>
                <div class="text-green-600 font-semibold">+{{ formatCurrency(2500.00) }}</div>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b">
                <div>
                  <div class="font-medium">
                    {{ currentLanguage === 'es' ? 'Compra en Línea' :
                       currentLanguage === 'fr' ? 'Achat en Ligne' :
                       currentLanguage === 'ar' ? 'شراء عبر الإنترنت' :
                       currentLanguage === 'zh' ? '在线购买' : 'Online Purchase' }}
                  </div>
                  <div class="text-sm text-gray-600">{{ formatDate(new Date(Date.now() - 172800000)) }}</div>
                </div>
                <div class="text-red-600 font-semibold">-{{ formatCurrency(89.99) }}</div>
              </div>
              
              <div class="flex justify-between items-center py-2">
                <div>
                  <div class="font-medium">
                    {{ currentLanguage === 'es' ? 'Transferencia ATM' :
                       currentLanguage === 'fr' ? 'Retrait GAB' :
                       currentLanguage === 'ar' ? 'سحب من الصراف' :
                       currentLanguage === 'zh' ? 'ATM取款' : 'ATM Withdrawal' }}
                  </div>
                  <div class="text-sm text-gray-600">{{ formatDate(new Date(Date.now() - 259200000)) }}</div>
                </div>
                <div class="text-red-600 font-semibold">-{{ formatCurrency(200.00) }}</div>
              </div>
            </div>
          </MCard>

          <!-- RTL Layout Demo (for Arabic) -->
          <div v-if="currentLanguage === 'ar'" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-yellow-800 mb-2">تخطيط RTL التجريبي</h3>
            <p class="text-yellow-700">
              يتم عرض هذا المحتوى من اليمين إلى اليسار (RTL) لدعم اللغة العربية بشكل صحيح.
              جميع العناصر والتخطيطات تتكيف تلقائيًا مع اتجاه النص.
            </p>
          </div>
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive internationalization demonstration with multiple languages, regional formatting, RTL support, and localized content across all components.'
      }
    }
  }
};

// Responsive Design Showcase
export const ResponsiveDesignShowcase = {
  render: () => ({
    components: { 
      MLayout, MCard, MButton, MTextField, MSelect, MProgress, ECFRNavigator 
    },
    setup() {
      const screenSize = ref('desktop');
      const orientation = ref('landscape');
      
      // Simulate different screen sizes
      const updateScreenSize = () => {
        const width = window.innerWidth;
        if (width < 640) {
          screenSize.value = 'mobile';
        } else if (width < 768) {
          screenSize.value = 'tablet-portrait';
        } else if (width < 1024) {
          screenSize.value = 'tablet-landscape';
        } else {
          screenSize.value = 'desktop';
        }
        
        orientation.value = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
      };

      const responsiveData = ref([
        {
          id: 'mobile-banking',
          type: 'service',
          title: 'Mobile Banking',
          description: 'Optimized for touch interfaces',
          children: [
            {
              id: 'quick-balance',
              type: 'feature',
              title: 'Quick Balance Check',
              description: 'View balance with single tap'
            },
            {
              id: 'mobile-deposit',
              type: 'feature',
              title: 'Mobile Check Deposit',
              description: 'Deposit checks using camera'
            }
          ]
        }
      ]);

      const responsiveOptions = computed(() => ({
        showBreadcrumb: screenSize.value !== 'mobile',
        theme: 'light',
        showControls: screenSize.value === 'desktop',
        display: {
          viewMode: screenSize.value === 'mobile' ? 'compact' : 'standard',
          showDescription: screenSize.value !== 'mobile',
          showMetadataBadges: screenSize.value === 'desktop',
          animations: true,
          enhancedMobile: screenSize.value === 'mobile' || screenSize.value === 'tablet-portrait',
          fontScaling: {
            enabled: true,
            baseSize: screenSize.value === 'mobile' ? 14 : 16,
            scaleRatio: screenSize.value === 'mobile' ? 1.1 : 1.2
          }
        }
      }));

      return {
        screenSize,
        orientation,
        responsiveData,
        responsiveOptions,
        updateScreenSize
      };
    },
    mounted() {
      this.updateScreenSize();
      window.addEventListener('resize', this.updateScreenSize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.updateScreenSize);
    },
    template: `
      <MLayout 
        app-title="Responsive Design Demo" 
        :drawer="screenSize !== 'mobile'" 
        :permanent="screenSize === 'desktop'"
      >
        <template #drawer>
          <div class="p-4 space-y-4">
            <div>
              <h3 class="text-lg font-semibold mb-2">Screen Info</h3>
              <div class="space-y-2 text-sm">
                <div>
                  <strong>Size:</strong> 
                  <span class="capitalize">{{ screenSize.replace('-', ' ') }}</span>
                </div>
                <div>
                  <strong>Orientation:</strong> 
                  <span class="capitalize">{{ orientation }}</span>
                </div>
                <div>
                  <strong>Width:</strong> {{ window.innerWidth }}px
                </div>
                <div>
                  <strong>Height:</strong> {{ window.innerHeight }}px
                </div>
              </div>
            </div>
            
            <div class="border rounded-lg overflow-hidden">
              <ECFRNavigator
                :items="responsiveData"
                :options="responsiveOptions"
                class="max-h-48"
              />
            </div>
          </div>
        </template>

        <!-- Responsive Content -->
        <div class="space-y-6">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900">
              Responsive Design
            </h1>
            <p class="text-gray-600 mt-2 text-sm md:text-base">
              Components that adapt to different screen sizes and orientations
            </p>
          </div>

          <!-- Responsive Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <!-- Mobile Card -->
            <MCard 
              title="Mobile Optimized" 
              :subtitle="screenSize === 'mobile' ? 'Active' : 'Preview'"
              :class="screenSize === 'mobile' ? 'ring-2 ring-blue-500' : ''"
            >
              <div class="space-y-3">
                <div class="text-sm text-gray-600">
                  Touch-friendly controls and compact layouts
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <MButton text="Tap Me" size="small" class="text-xs" />
                  <MButton text="Quick Action" size="small" variant="outlined" class="text-xs" />
                </div>
              </div>
            </MCard>

            <!-- Tablet Card -->
            <MCard 
              title="Tablet Optimized" 
              :subtitle="screenSize.includes('tablet') ? 'Active' : 'Preview'"
              :class="screenSize.includes('tablet') ? 'ring-2 ring-blue-500' : ''"
            >
              <div class="space-y-3">
                <div class="text-sm text-gray-600">
                  Balanced layouts for medium screens
                </div>
                <MTextField placeholder="Tablet input" size="small" />
              </div>
            </MCard>

            <!-- Desktop Card -->
            <MCard 
              title="Desktop Optimized" 
              :subtitle="screenSize === 'desktop' ? 'Active' : 'Preview'"
              :class="screenSize === 'desktop' ? 'ring-2 ring-blue-500' : ''"
            >
              <div class="space-y-3">
                <div class="text-sm text-gray-600">
                  Full-featured interface with detailed controls
                </div>
                <div class="flex space-x-2">
                  <MButton text="Primary" size="small" />
                  <MButton text="Secondary" variant="outlined" size="small" />
                </div>
              </div>
            </MCard>
          </div>

          <!-- Responsive Form -->
          <MCard title="Responsive Form Layout">
            <form class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <MTextField
                  label="Name"
                  placeholder="Enter your name"
                  class="w-full"
                />
                <MTextField
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  class="w-full"
                />
              </div>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <MSelect
                  label="Country"
                  :options="[
                    { value: 'us', label: 'United States' },
                    { value: 'ca', label: 'Canada' },
                    { value: 'uk', label: 'United Kingdom' }
                  ]"
                  class="w-full"
                />
                <MTextField
                  label="Phone"
                  type="tel"
                  placeholder="Phone number"
                  class="w-full"
                />
                <MTextField
                  label="Postal Code"
                  placeholder="Postal code"
                  class="w-full"
                />
              </div>

              <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <MButton 
                  text="Cancel" 
                  variant="outlined" 
                  :class="screenSize === 'mobile' ? 'w-full' : ''"
                />
                <MButton 
                  text="Submit" 
                  :class="screenSize === 'mobile' ? 'w-full' : ''"
                />
              </div>
            </form>
          </MCard>

          <!-- Responsive Tables/Lists -->
          <MCard title="Responsive Data Display">
            <!-- Desktop Table View -->
            <div v-if="screenSize === 'desktop'" class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Doe</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <MButton text="Edit" variant="text" size="small" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mobile Card View -->
            <div v-else class="space-y-3">
              <div class="bg-white border rounded-lg p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="font-medium text-gray-900">John Doe</div>
                    <div class="text-sm text-gray-500">john@example.com</div>
                  </div>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div class="mt-3 flex justify-end">
                  <MButton text="Edit" variant="text" size="small" />
                </div>
              </div>
            </div>
          </MCard>

          <!-- Responsive Indicators -->
          <MCard title="Current Breakpoint">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-3 rounded-lg" :class="screenSize === 'mobile' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'">
                <div class="text-lg font-semibold">Mobile</div>
                <div class="text-xs">&lt; 640px</div>
              </div>
              <div class="text-center p-3 rounded-lg" :class="screenSize === 'tablet-portrait' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'">
                <div class="text-lg font-semibold">Tablet Portrait</div>
                <div class="text-xs">640px - 767px</div>
              </div>
              <div class="text-center p-3 rounded-lg" :class="screenSize === 'tablet-landscape' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'">
                <div class="text-lg font-semibold">Tablet Landscape</div>
                <div class="text-xs">768px - 1023px</div>
              </div>
              <div class="text-center p-3 rounded-lg" :class="screenSize === 'desktop' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'">
                <div class="text-lg font-semibold">Desktop</div>
                <div class="text-xs">≥ 1024px</div>
              </div>
            </div>
          </MCard>
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Responsive design demonstration showing how components adapt to different screen sizes, orientations, and device types with appropriate layout adjustments.'
      }
    }
  }
};
