import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        variant: 'ghost'
      },
    },
    Checkbox: {
      defaultProps: {
        size: 'lg'
      }
    }
  },
  textStyles: {
    mainContent: {
      h1: {
        fontSize: ['2rem', '3.5rem'],
        fontWeight: 'bold',
      },
      h2: {
        fontsize: ['1.5rem', '2.25rem'],
        fontweight: 'semibold',
      },
      h3: {
        fontsize: ['1.5rem', '2.25rem'],
        fontweight: 'semibold'
      },
      ul: {
        fontsize: ['1.5rem', '2.25rem'],
        fontweight: 'semibold'
      },
      li: {
        fontsize: ['1.5rem', '2.25rem'],
        fontweight: 'semibold'
      },
      p: {
        fontSize: ['1rem', '1.5rem'],
        fontWeight: 'semibold',
      }
    },
  },
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#fff',
      },
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    black: '#16161D',
    whie: "#fff",
    gray: {
      50: "#f1f1fb",
      200: "#bdbdc1",
      500: "#6f6f74",
      700: "#3e3e42"
    }
  },
  fonts,
  breakpoints,
})

export default theme
