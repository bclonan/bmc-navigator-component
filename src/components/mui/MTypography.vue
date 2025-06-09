<template>
  <component 
    :is="component"
    :class="typographyClasses"
    :style="typographyStyles"
  >
    <slot>{{ children }}</slot>
  </component>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MTypography',
  props: {
    align: {
      type: String,
      default: 'inherit',
      validator: (value) => ['inherit', 'left', 'center', 'right', 'justify'].includes(value)
    },
    children: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'inherit',
      validator: (value) => ['inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary', 'error'].includes(value)
    },
    component: {
      type: String,
      default: null
    },
    display: {
      type: String,
      default: 'initial',
      validator: (value) => ['initial', 'block', 'inline'].includes(value)
    },
    gutterBottom: {
      type: Boolean,
      default: false
    },
    noWrap: {
      type: Boolean,
      default: false
    },
    paragraph: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'body1',
      validator: (value) => [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'subtitle1', 'subtitle2',
        'body1', 'body2',
        'button', 'caption', 'overline'
      ].includes(value)
    }
  },
  setup(props) {
    const variantMap = {
      h1: { tag: 'h1', classes: 'text-6xl font-light leading-tight' },
      h2: { tag: 'h2', classes: 'text-5xl font-light leading-tight' },
      h3: { tag: 'h3', classes: 'text-4xl font-normal leading-tight' },
      h4: { tag: 'h4', classes: 'text-3xl font-normal leading-tight' },
      h5: { tag: 'h5', classes: 'text-2xl font-normal leading-tight' },
      h6: { tag: 'h6', classes: 'text-xl font-medium leading-tight' },
      subtitle1: { tag: 'h6', classes: 'text-base font-normal leading-relaxed' },
      subtitle2: { tag: 'h6', classes: 'text-sm font-medium leading-relaxed' },
      body1: { tag: 'p', classes: 'text-base font-normal leading-relaxed' },
      body2: { tag: 'p', classes: 'text-sm font-normal leading-relaxed' },
      button: { tag: 'span', classes: 'text-sm font-medium uppercase tracking-wide' },
      caption: { tag: 'span', classes: 'text-xs font-normal leading-tight' },
      overline: { tag: 'span', classes: 'text-xs font-normal uppercase tracking-wider' }
    };

    const colorMap = {
      inherit: 'text-inherit',
      primary: 'text-blue-600',
      secondary: 'text-purple-600',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-600',
      error: 'text-red-600'
    };

    const alignMap = {
      inherit: '',
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify'
    };

    const displayMap = {
      initial: '',
      block: 'block',
      inline: 'inline'
    };

    const component = computed(() => {
      if (props.component) return props.component;
      if (props.paragraph) return 'p';
      return variantMap[props.variant].tag;
    });

    const typographyClasses = computed(() => [
      variantMap[props.variant].classes,
      colorMap[props.color],
      alignMap[props.align],
      displayMap[props.display],
      props.gutterBottom ? 'mb-4' : '',
      props.noWrap ? 'whitespace-nowrap overflow-hidden text-ellipsis' : ''
    ]);

    const typographyStyles = computed(() => ({}));

    return {
      component,
      typographyClasses,
      typographyStyles
    };
  }
};
</script>