// Mariner Finance Brand Assets
// SVG logos and brand elements for consistent branding across applications

export const MarinerLogos = {
  // Primary Logo - Full Color
  primary: `
    <svg width="240" height="80" viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="marinerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3860be;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#013474;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="240" height="80" rx="8" fill="url(#marinerGradient)"/>
      
      <!-- Anchor Symbol -->
      <g transform="translate(20, 20)">
        <path d="M20 5 L20 35 M10 25 L30 25 M15 30 C15 33 17 35 20 35 C23 35 25 33 25 30" 
              stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="20" cy="10" r="4" fill="white"/>
      </g>
      
      <!-- MARINER Text -->
      <text x="70" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="white">
        MARINER
      </text>
      
      <!-- FINANCE Text -->
      <text x="70" y="55" font-family="Arial, sans-serif" font-size="14" fill="#dcfce7" letter-spacing="2px">
        FINANCE
      </text>
      
      <!-- Tagline -->
      <text x="70" y="70" font-family="Arial, sans-serif" font-size="10" fill="#a5b4fc" font-style="italic">
        Your Financial Navigator
      </text>
    </svg>
  `,

  // Secondary Logo - White Version
  white: `
    <svg width="240" height="80" viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="240" height="80" rx="8" fill="white"/>
      
      <!-- Anchor Symbol -->
      <g transform="translate(20, 20)">
        <path d="M20 5 L20 35 M10 25 L30 25 M15 30 C15 33 17 35 20 35 C23 35 25 33 25 30" 
              stroke="#3860be" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="20" cy="10" r="4" fill="#3860be"/>
      </g>
      
      <!-- MARINER Text -->
      <text x="70" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#3860be">
        MARINER
      </text>
      
      <!-- FINANCE Text -->
      <text x="70" y="55" font-family="Arial, sans-serif" font-size="14" fill="#013474" letter-spacing="2px">
        FINANCE
      </text>
      
      <!-- Tagline -->
      <text x="70" y="70" font-family="Arial, sans-serif" font-size="10" fill="#6366f1" font-style="italic">
        Your Financial Navigator
      </text>
    </svg>
  `,

  // Icon Only - Primary
  icon: `
    <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3860be;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#013474;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background Circle -->
      <circle cx="30" cy="30" r="28" fill="url(#iconGradient)" stroke="white" stroke-width="2"/>
      
      <!-- Anchor Symbol -->
      <g transform="translate(20, 15)">
        <path d="M10 5 L10 25 M5 17 L15 17 M7.5 22 C7.5 24 8.5 25 10 25 C11.5 25 12.5 24 12.5 22" 
              stroke="white" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="10" cy="8" r="3" fill="white"/>
      </g>
    </svg>
  `,

  // Horizontal Layout - Compact
  horizontal: `
    <svg width="200" height="40" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
      <!-- Anchor Symbol -->
      <g transform="translate(10, 8)">
        <path d="M12 2 L12 22 M6 16 L18 16 M9 19 C9 21 10.5 22 12 22 C13.5 22 15 21 15 19" 
              stroke="#3860be" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="12" cy="6" r="2.5" fill="#3860be"/>
      </g>
      
      <!-- MARINER FINANCE Text -->
      <text x="40" y="20" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#3860be">
        MARINER
      </text>
      <text x="110" y="20" font-family="Arial, sans-serif" font-size="12" fill="#013474">
        FINANCE
      </text>
      
      <!-- Tagline -->
      <text x="40" y="32" font-family="Arial, sans-serif" font-size="8" fill="#6366f1" font-style="italic">
        Your Financial Navigator
      </text>
    </svg>
  `,

  // Favicon/App Icon
  favicon: `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="faviconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3860be;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#013474;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="32" height="32" rx="6" fill="url(#faviconGradient)"/>
      
      <!-- Simplified Anchor -->
      <g transform="translate(8, 6)">
        <path d="M8 2 L8 18 M4 13 L12 13 M6 16 C6 17.5 7 18 8 18 C9 18 10 17.5 10 16" 
              stroke="white" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <circle cx="8" cy="5" r="2" fill="white"/>
      </g>
    </svg>
  `
};

export const BrandColors = {
  primary: {
    mattBlue: '#3860be',
    tardisBlue: '#013474'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #3860be 0%, #013474 100%)',
    secondary: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    success: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    error: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
  },
  semantic: {
    success: '#059669',
    warning: '#f59e0b',
    error: '#dc2626',
    info: '#3b82f6'
  },
  neutral: {
    white: '#ffffff',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827'
  }
};

export const BrandTypography = {
  fontFamilies: {
    primary: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    secondary: "'Inter', 'Segoe UI', sans-serif",
    monospace: "'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace"
  },
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem'  // 60px
  },
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  }
};

export const BrandSpacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
  '5xl': '6rem',   // 96px
  '6xl': '8rem'    // 128px
};

export const BrandShadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  mariner: '0 8px 25px rgba(56, 96, 190, 0.3)'
};

// Utility function to get SVG as data URL
export function getSvgDataUrl(svgContent) {
  return 'data:image/svg+xml;base64,' + btoa(svgContent);
}

// Utility function to create CSS custom properties
export function createCSSVariables() {
  return `
    :root {
      /* Brand Colors */
      --mf-color-primary: ${BrandColors.primary.mattBlue};
      --mf-color-primary-dark: ${BrandColors.primary.tardisBlue};
      --mf-gradient-primary: ${BrandColors.gradients.primary};
      --mf-gradient-secondary: ${BrandColors.gradients.secondary};
      --mf-color-success: ${BrandColors.semantic.success};
      --mf-color-warning: ${BrandColors.semantic.warning};
      --mf-color-error: ${BrandColors.semantic.error};
      --mf-color-info: ${BrandColors.semantic.info};
      
      /* Typography */
      --mf-font-family: ${BrandTypography.fontFamilies.primary};
      --mf-font-size-base: ${BrandTypography.fontSizes.base};
      --mf-font-weight-normal: ${BrandTypography.fontWeights.normal};
      --mf-font-weight-bold: ${BrandTypography.fontWeights.bold};
      
      /* Spacing */
      --mf-spacing-sm: ${BrandSpacing.sm};
      --mf-spacing-md: ${BrandSpacing.md};
      --mf-spacing-lg: ${BrandSpacing.lg};
      --mf-spacing-xl: ${BrandSpacing.xl};
      
      /* Shadows */
      --mf-shadow-base: ${BrandShadows.base};
      --mf-shadow-md: ${BrandShadows.md};
      --mf-shadow-lg: ${BrandShadows.lg};
      --mf-shadow-mariner: ${BrandShadows.mariner};
    }
  `;
}

export default {
  MarinerLogos,
  BrandColors,
  BrandTypography,
  BrandSpacing,
  BrandShadows,
  getSvgDataUrl,
  createCSSVariables
};