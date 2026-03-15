import { createTheme, type MantineColorsTuple, type MantineTheme, rem } from '@mantine/core';

const violetPrimary: MantineColorsTuple = [
  '#f5f3ff',
  '#ede9fe',
  '#ddd6fe',
  '#c4b5fd',
  '#a78bfa',
  '#8b5cf6',
  '#7c3aed',
  '#6d28d9',
  '#5b21b6',
  '#4c1d95',
];

export const theme = createTheme({
  primaryColor: 'violet',
  colors: {
    violet: violetPrimary,
  },
  fontFamily: 'Sora, sans-serif',
  headings: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    fontWeight: '800',
  },
  cursorType: 'pointer',
  defaultRadius: 'md',
  white: '#ffffff',
  black: '#1a1b1e',
  other: {
    navbarHeight: rem(90),
    gradientPrimary: 'linear-gradient(90deg, var(--mantine-color-violet-6) 0%, var(--mantine-color-cyan-6) 100%)',
    glassBgLight: 'rgba(255, 255, 255, 0.8)',
    glassBgDark: 'rgba(26, 27, 30, 0.8)',
    glassBlur: 'blur(12px)',
  },
  components: {
    Container: {
      defaultProps: {
        size: 'lg',
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        withBorder: true,
      },
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: theme.shadows.md,
          },
        },
      }),
    },
    Text: {
      styles: {
        root: {
          lineHeight: 1.6,
          transition: 'color 0.3s ease',
        },
      },
    },
    Title: {
      styles: {
        root: {
          letterSpacing: rem(-0.5),
          transition: 'color 0.3s ease',
        },
      },
    },
    Anchor: {
      defaultProps: {
        underline: 'never',
      },
      styles: {
        root: {
          transition: 'color 0.2s ease',
        },
      },
    },
  },
});
