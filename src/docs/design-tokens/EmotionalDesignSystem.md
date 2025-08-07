# Emotional Design System

## Overview

The Emotional Design System provides a comprehensive set of design tokens, color schemes, typography, and interaction patterns specifically crafted to support emotional intelligence in user interfaces. This system adapts dynamically based on user emotional states to optimize experience and reduce cognitive load.

## Color System

### Core Emotional Palette

#### Positive Emotions
```css
:root {
  /* Confident - Professional Blue */
  --emotion-confident-primary: #3b82f6;
  --emotion-confident-secondary: #dbeafe;
  --emotion-confident-accent: #1d4ed8;
  --emotion-confident-text: #1e3a8a;
  
  /* Excited - Vibrant Purple */
  --emotion-excited-primary: #8b5cf6;
  --emotion-excited-secondary: #f3e8ff;
  --emotion-excited-accent: #7c3aed;
  --emotion-excited-text: #5b21b6;
  
  /* Happy - Warm Green */
  --emotion-happy-primary: #10b981;
  --emotion-happy-secondary: #d1fae5;
  --emotion-happy-accent: #059669;
  --emotion-happy-text: #047857;
  
  /* Focused - Deep Orange */
  --emotion-focused-primary: #f97316;
  --emotion-focused-secondary: #fed7aa;
  --emotion-focused-accent: #ea580c;
  --emotion-focused-text: #c2410c;
}
```

#### Neutral Emotions
```css
:root {
  /* Neutral - Balanced Gray */
  --emotion-neutral-primary: #6b7280;
  --emotion-neutral-secondary: #f3f4f6;
  --emotion-neutral-accent: #4b5563;
  --emotion-neutral-text: #374151;
  
  /* Contemplative - Soft Blue-Gray */
  --emotion-contemplative-primary: #64748b;
  --emotion-contemplative-secondary: #f8fafc;
  --emotion-contemplative-accent: #475569;
  --emotion-contemplative-text: #334155;
}
```

#### Negative Emotions (Calming Variants)
```css
:root {
  /* Frustrated - Muted Red */
  --emotion-frustrated-primary: #dc2626;
  --emotion-frustrated-secondary: #fef2f2;
  --emotion-frustrated-accent: #b91c1c;
  --emotion-frustrated-text: #991b1b;
  
  /* Confused - Warm Yellow */
  --emotion-confused-primary: #f59e0b;
  --emotion-confused-secondary: #fef3c7;
  --emotion-confused-accent: #d97706;
  --emotion-confused-text: #92400e;
  
  /* Anxious - Calming Teal */
  --emotion-anxious-primary: #14b8a6;
  --emotion-anxious-secondary: #f0fdfa;
  --emotion-anxious-accent: #0d9488;
  --emotion-anxious-text: #0f766e;
  
  /* Tired - Soft Gray */
  --emotion-tired-primary: #64748b;
  --emotion-tired-secondary: #f8fafc;
  --emotion-tired-accent: #475569;
  --emotion-tired-text: #334155;
}
```

### Adaptive Color Functions

```css
/* Dynamic color adaptation based on stress level */
.emotion-adaptive {
  --stress-multiplier: var(--current-stress-level, 0.5);
  --saturation-adjustment: calc(100% - (var(--stress-multiplier) * 30%));
  --brightness-adjustment: calc(100% + (var(--stress-multiplier) * 10%));
}

/* Stress-responsive color modifications */
.stress-low {
  --color-saturation: 100%;
  --color-brightness: 100%;
  --animation-intensity: 1;
}

.stress-medium {
  --color-saturation: 85%;
  --color-brightness: 105%;
  --animation-intensity: 0.7;
}

.stress-high {
  --color-saturation: 70%;
  --color-brightness: 110%;
  --animation-intensity: 0.4;
}
```

## Typography System

### Emotional Typography Scale

#### Confident/Professional
```css
.typography-confident {
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-base: 500;
  --font-weight-emphasis: 600;
  --line-height-base: 1.5;
  --letter-spacing: -0.01em;
}
```

#### Calming/Supportive
```css
.typography-calming {
  --font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-base: 400;
  --font-weight-emphasis: 500;
  --line-height-base: 1.6;
  --letter-spacing: 0.01em;
}
```

#### Energetic/Excited
```css
.typography-energetic {
  --font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-base: 500;
  --font-weight-emphasis: 700;
  --line-height-base: 1.4;
  --letter-spacing: -0.02em;
}
```

### Adaptive Font Sizes

```css
/* Base scale for standard complexity */
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
}

/* Simplified scale for stress reduction */
.complexity-simple {
  --text-xs: 0.875rem;   /* 14px */
  --text-sm: 1rem;       /* 16px */
  --text-base: 1.125rem; /* 18px */
  --text-lg: 1.25rem;    /* 20px */
  --text-xl: 1.5rem;     /* 24px */
  --text-2xl: 1.875rem;  /* 30px */
}

/* Detailed scale for confident users */
.complexity-detailed {
  --text-xs: 0.625rem;   /* 10px */
  --text-sm: 0.75rem;    /* 12px */
  --text-base: 0.875rem; /* 14px */
  --text-lg: 1rem;       /* 16px */
  --text-xl: 1.125rem;   /* 18px */
  --text-2xl: 1.25rem;   /* 20px */
}
```

## Spacing System

### Emotional Spacing Scale

```css
:root {
  /* Standard spacing */
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}

/* Stress-adaptive spacing */
.stress-high {
  --space-multiplier: 1.5;
  --space-4: calc(1rem * var(--space-multiplier));
  --space-6: calc(1.5rem * var(--space-multiplier));
  --space-8: calc(2rem * var(--space-multiplier));
}

.stress-low {
  --space-multiplier: 0.8;
  --space-4: calc(1rem * var(--space-multiplier));
  --space-6: calc(1.5rem * var(--space-multiplier));
  --space-8: calc(2rem * var(--space-multiplier));
}
```

## Animation System

### Emotional Animation Curves

```css
:root {
  /* Calm/Relaxing */
  --ease-calm: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --duration-calm: 800ms;
  
  /* Confident/Assured */
  --ease-confident: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-confident: 300ms;
  
  /* Excited/Energetic */
  --ease-excited: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --duration-excited: 500ms;
  
  /* Supportive/Gentle */
  --ease-supportive: cubic-bezier(0.23, 1, 0.32, 1);
  --duration-supportive: 600ms;
}
```

### Stress-Responsive Animations

```css
.animation-adaptive {
  animation-duration: var(--adaptive-duration);
  animation-timing-function: var(--adaptive-easing);
}

.stress-low .animation-adaptive {
  --adaptive-duration: var(--duration-confident);
  --adaptive-easing: var(--ease-confident);
}

.stress-medium .animation-adaptive {
  --adaptive-duration: var(--duration-supportive);
  --adaptive-easing: var(--ease-supportive);
}

.stress-high .animation-adaptive {
  --adaptive-duration: var(--duration-calm);
  --adaptive-easing: var(--ease-calm);
}
```

## Component Design Tokens

### Button System

```css
/* Emotional button variants */
.btn-emotional {
  --btn-padding-x: var(--space-4);
  --btn-padding-y: var(--space-3);
  --btn-border-radius: 0.5rem;
  --btn-font-weight: 500;
  --btn-transition: all 200ms var(--ease-confident);
}

.btn-confident {
  --btn-bg: var(--emotion-confident-primary);
  --btn-color: white;
  --btn-hover-bg: var(--emotion-confident-accent);
  --btn-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-calming {
  --btn-bg: var(--emotion-anxious-primary);
  --btn-color: white;
  --btn-hover-bg: var(--emotion-anxious-accent);
  --btn-shadow: 0 2px 8px rgba(20, 184, 166, 0.2);
  --btn-padding-x: var(--space-6);
  --btn-padding-y: var(--space-4);
}

.btn-supportive {
  --btn-bg: var(--emotion-happy-secondary);
  --btn-color: var(--emotion-happy-text);
  --btn-border: 2px solid var(--emotion-happy-primary);
  --btn-hover-bg: var(--emotion-happy-primary);
  --btn-hover-color: white;
}
```

### Form Field System

```css
.form-field-emotional {
  --field-padding: var(--space-3) var(--space-4);
  --field-border-width: 2px;
  --field-border-radius: 0.5rem;
  --field-transition: all 300ms var(--ease-supportive);
}

/* Stress-adaptive field sizing */
.stress-high .form-field-emotional {
  --field-padding: var(--space-4) var(--space-6);
  --field-font-size: var(--text-lg);
  --field-border-width: 3px;
}

/* Emotion-specific field styling */
.emotion-frustrated .form-field-emotional {
  --field-border-color: var(--emotion-frustrated-secondary);
  --field-focus-color: var(--emotion-frustrated-primary);
  --field-bg: var(--emotion-frustrated-secondary);
}

.emotion-confident .form-field-emotional {
  --field-border-color: var(--emotion-confident-secondary);
  --field-focus-color: var(--emotion-confident-primary);
  --field-bg: white;
}
```

## Accessibility Design Tokens

### Contrast Ratios

```css
:root {
  /* WCAG AA compliant contrast ratios */
  --contrast-aa-normal: 4.5;
  --contrast-aa-large: 3;
  --contrast-aaa-normal: 7;
  --contrast-aaa-large: 4.5;
}

/* High contrast mode for accessibility */
.high-contrast {
  --emotion-confident-primary: #0066cc;
  --emotion-confident-text: #000000;
  --emotion-frustrated-primary: #cc0000;
  --emotion-frustrated-text: #000000;
}
```

### Focus Indicators

```css
.focus-emotional {
  --focus-ring-width: 3px;
  --focus-ring-style: solid;
  --focus-ring-offset: 2px;
}

.emotion-confident .focus-emotional:focus {
  --focus-ring-color: var(--emotion-confident-primary);
  box-shadow: 0 0 0 var(--focus-ring-offset) white,
              0 0 0 calc(var(--focus-ring-offset) + var(--focus-ring-width)) var(--focus-ring-color);
}

.stress-high .focus-emotional:focus {
  --focus-ring-width: 4px;
  --focus-ring-offset: 3px;
}
```

## Responsive Design Tokens

### Breakpoint System

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Emotional adaptations for mobile */
@media (max-width: 768px) {
  .emotion-adaptive {
    --space-multiplier: 1.2;
    --text-base: 1rem;
    --btn-padding-y: var(--space-4);
  }
  
  .stress-high.emotion-adaptive {
    --space-multiplier: 1.5;
    --text-base: 1.125rem;
  }
}
```

## Dark Mode Emotional Adaptations

```css
@media (prefers-color-scheme: dark) {
  :root {
    /* Adjusted emotional colors for dark mode */
    --emotion-confident-primary: #60a5fa;
    --emotion-confident-secondary: #1e3a8a;
    --emotion-confident-text: #dbeafe;
    
    --emotion-frustrated-primary: #f87171;
    --emotion-frustrated-secondary: #7f1d1d;
    --emotion-frustrated-text: #fef2f2;
    
    --emotion-happy-primary: #34d399;
    --emotion-happy-secondary: #064e3b;
    --emotion-happy-text: #d1fae5;
  }
}
```

## Implementation Examples

### CSS Custom Properties Usage

```css
.emotional-component {
  background: var(--emotion-primary);
  color: var(--emotion-text);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--border-radius-md);
  transition: all var(--duration-supportive) var(--ease-supportive);
  font-family: var(--font-family);
  font-size: var(--text-base);
  line-height: var(--line-height-base);
}

.emotional-component:hover {
  background: var(--emotion-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-emotional);
}
```

### JavaScript Integration

```javascript
// Dynamic theme application
const applyEmotionalTheme = (emotion, stressLevel = 'low') => {
  const root = document.documentElement;
  
  // Apply base emotional colors
  root.style.setProperty('--current-emotion', emotion);
  root.style.setProperty('--current-stress-level', stressLevel);
  
  // Update primary colors
  root.style.setProperty('--emotion-primary', `var(--emotion-${emotion}-primary)`);
  root.style.setProperty('--emotion-secondary', `var(--emotion-${emotion}-secondary)`);
  root.style.setProperty('--emotion-accent', `var(--emotion-${emotion}-accent)`);
  root.style.setProperty('--emotion-text', `var(--emotion-${emotion}-text)`);
  
  // Apply stress-level modifications
  const stressMultipliers = {
    low: { space: 0.8, animation: 1.2 },
    medium: { space: 1.0, animation: 1.0 },
    high: { space: 1.5, animation: 0.6 }
  };
  
  const multiplier = stressMultipliers[stressLevel];
  root.style.setProperty('--space-multiplier', multiplier.space);
  root.style.setProperty('--animation-multiplier', multiplier.animation);
};
```

## Design Token Validation

### Contrast Checking

```javascript
// Automatic contrast validation
const validateContrast = (foreground, background) => {
  const contrast = calculateContrast(foreground, background);
  return {
    aa: contrast >= 4.5,
    aaa: contrast >= 7,
    large_aa: contrast >= 3,
    large_aaa: contrast >= 4.5
  };
};
```

### Accessibility Compliance

```css
/* Ensure minimum touch targets for mobile */
@media (max-width: 768px) {
  .btn-emotional {
    min-height: 44px;
    min-width: 44px;
  }
  
  .stress-high .btn-emotional {
    min-height: 48px;
    min-width: 48px;
  }
}
```

This comprehensive design token system ensures consistent, accessible, and emotionally responsive design across all components while maintaining flexibility for different user needs and emotional states.