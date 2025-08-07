export default {
    title: 'Demo/Accessibility & Internationalization',
    parameters: {
        docs: {
            description: {
                component: 'Accessibility and i18n demo stories for the component library.'
            }
        }
    }
};

import { ref, reactive, computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { MButton, MInput, MSelect } from '@/components/mui';
import { yourtownfinanceFinanceTheme } from '@/components/mui';
import { MAppBar, MToolbar, MTypography } from '@/components/mui';

export const AccessibilityDemo = () => {
  const { t } = useI18n();

  return h(MAppBar, { position: "static" }, [
    h(MToolbar, {}, [
      h(MTypography, { variant: "h6" }, t('demo.accessibility.title'))
    ])
  ]);
};

export const InternationalizationDemo = () => {
  const { t } = useI18n();

  return h(MAppBar, { position: "static" }, [
    h(MToolbar, {}, [
      h(MTypography, { variant: "h6" }, t('demo.internationalization.title'))
    ])
  ]);
};

export const AccessibilityAndInternationalizationDemo = () => {
  const { t } = useI18n();
  const formData = reactive({
    name: '',
    email: '',
    message: ''
  });

  return h(MAppBar, { position: "static" }, [
    h(MToolbar, {}, [
      h(MTypography, { variant: "h6" }, t('demo.accessibility.title'))
    ])
  ]);
};

export const AccessibilityAndInternationalizationForm = () => {
    const { t } = useI18n();
    const formData = reactive({
        name: '',
        email: '',
        message: ''
    });
    
    return h('div', {}, [
        h(MInput, {
            'v-model': formData.name,
            label: t('demo.form.name'),
            'aria-label': t('demo.form.name')
        }),
        h(MInput, {
            'v-model': formData.email,
            label: t('demo.form.email'),
            'aria-label': t('demo.form.email')
        }),
        h(MInput, {
            'v-model': formData.message,
            label: t('demo.form.message'),
            'aria-label': t('demo.form.message')
        }),
        h(MButton, { 
            variant: "contained", 
            color: "primary" 
        }, t('demo.form.submit'))
    ]);
}

export const AccessibilityAndInternationalizationSelect = () => {
    const { t } = useI18n();
    const options = ref([
        { value: 'option1', label: t('demo.select.option1') },
        { value: 'option2', label: t('demo.select.option2') },
        { value: 'option3', label: t('demo.select.option3') }
    ]);
    const selectedOption = ref('');

    return h(MSelect, {
        'v-model': selectedOption,
        options: options,
        label: t('demo.select.label'),
        'aria-label': t('demo.select.label')
    });
};

export const AccessibilityAndInternationalizationButton = () => {
    const { t } = useI18n();

    return h(MButton, {
        variant: "contained",
        color: "primary",
        'aria-label': t('demo.button.label')
    }, t('demo.button.text'));
};



