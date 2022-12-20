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
      variants: {
        solid: {
          bg: 'gray.300',
          color: 'black',
        }
      }
    },
    Checkbox: {
      defaultProps: {
        size: 'lg'
      }
    },
    Heading: {
      defaultProps: {
        size: 'xl',
        marginBottom: '2px',
        marginTop: '2px'
      }
    }
  },
  textStyles: {
    mainContent: {
      h1: {
        fontSize: ['2rem', '2.5rem'],
        fontWeight: 'bold',
      },
      h2: {
        fontSize: ['1.8rem', '2.2rem'],
        fontWeight: 'bold',
      },
      h3: {
        fontSize: ['1.4rem', '1.75rem'],
        fontWeight: 'bold',
      },
      ul: {
        fontSize: ['1rem', '1.2rem'],
        fontWeight: 'normal',
        listStyleType: 'none'
      },
      li: {
        fontSize: ['1rem', '1.2rem'],
        fontWeight: 'normal',
      },
      p: {
        fontSize: ['1rem', '1.2rem'],
        fontWeight: 'normal',
      },
      pre: {
        fontSize: ['0.8rem', '1rem'],
        whiteSpace: 'pre-wrap',
      }
    },
    projectLinks: {
      a: {
        color: 'blue.400',
        textDecoration: 'underline'
      },
    },
    containerContent: {
      padding: ['2rem 2rem 2rem 2rem', '3rem 3rem 3rem 3rem', '3rem 3rem 3rem 3rem', '1.2rem 10rem 3rem 10rem']
    }
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
      50: "#F7FAFC",
      200: "#bdbdc1",
      500: "#6f6f74",
      700: "#3e3e42"
    }
  },
  fonts,
  breakpoints,
})

export default theme
