// Mariner Finance Brand Theme
// Based on https://loans.marinerfinance.com/select-amount and https://www.marinerfinance.com/

export const marinerFinanceTheme = {
  name: 'Mariner Finance',
  description: 'Official Mariner Finance brand theme with primary colors and typography',
  
  // Primary brand colors from Mariner Finance CSS variables
  colors: {
    primary: {
      main: 'rgb(56, 96, 190)', // --color-matt-blue
      light: 'rgb(25, 118, 210)', // --color-way-beyond-the-blue
      dark: 'rgb(1, 52, 116)', // --color-tardis-blue
      contrastText: '#ffffff'
    },
    
    secondary: {
      main: 'rgb(1, 52, 116)', // --color-tardis-blue
      light: 'rgb(39, 69, 92)', // --color-one-year-of-rain
      dark: 'rgb(46, 54, 68)', // --color-vulcan
      contrastText: '#ffffff'
    },
    
    success: {
      main: 'rgb(50, 174, 136)', // --color-herbal
      light: 'rgb(70, 130, 84)', // --color-amazon
      dark: 'rgb(0, 128, 0)', // --color-hulk
      contrastText: '#ffffff'
    },
    
    warning: {
      main: 'rgb(255, 188, 35)', // --color-not-yo-cheese
      light: 'rgb(255, 205, 70)',
      dark: 'rgb(235, 168, 15)',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#ffffff'
    },
    
    info: {
      main: 'rgb(215, 230, 237)', // --color-iceberg
      light: 'rgb(235, 245, 250)',
      dark: 'rgb(195, 210, 217)',
      contrastText: 'rgba(0, 0, 0, 0.87)'
    },
    
    background: {
      default: 'rgb(255, 255, 255)', // --color-white
      paper: 'rgb(248, 248, 248)', // --color-doctor
      light: 'rgb(249, 255, 250)', // --color-ceramic
      subtle: 'rgb(246, 246, 246)' // --color-white-smoke
    },
    
    text: {
      primary: 'rgba(0, 0, 0, 0.87)', // --color-black-7
      secondary: 'rgba(0, 0, 0, 0.6)', // --color-black-6
      disabled: 'rgba(0, 0, 0, 0.26)', // --color-black-5
      hint: 'rgba(0, 0, 0, 0.54)' // --color-black-8
    }
  },
  
  typography: {
    fontFamily: 'Muli, sans-serif',
    fontFamilyBold: 'MuliBold, sans-serif',
    
    h1: {
      fontFamily: 'MuliBold, sans-serif',
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    
    h2: {
      fontFamily: 'MuliBold, sans-serif', 
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3
    },
    
    body1: {
      fontFamily: 'Muli, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5
    },
    
    button: {
      fontFamily: 'Muli, sans-serif',
      fontSize: '0.875rem',
      fontWeight: 500,
      textTransform: 'uppercase'
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px', 
    large: '12px',
    round: '50%'
  },
  
  shadows: {
    1: 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px',
    2: 'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
    3: 'rgba(0, 0, 0, 0.2) 0px 5px 5px -3px, rgba(0, 0, 0, 0.14) 0px 8px 10px 1px, rgba(0, 0, 0, 0.12) 0px 3px 14px 2px'
  },
  
  transitions: {
    standard: 'all 0.2s ease',
    emphasized: 'all 0.25s ease-out',
    decelerated: 'all 0.5s ease'
  }
};

export default marinerFinanceTheme;