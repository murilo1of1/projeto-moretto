'use client';

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          deep: { value: '#0a1f15' }, 
          green: { value: '#112a21' },
          greenHover: { value: '#1a3e31' }, 
          accent: { value: '#0f2b1d' }, 
          accentHover: { value: '#235a40' }, 

          cream: { value: '#f9f7f2' }, 
          card: { value: '#fdfaf3' }, 
          creamHover: { value: '#f5f2eb' },
          pill: { value: '#e7dfcf' }, 

          sand: { value: '#c8c0ad' }, 
          line: { value: '#d6c7aa' }, 
          lineStrong: { value: '#c8b895' }, 
          divider: { value: '#9c8b6e' }, 

          ink: { value: '#1a1a1a' }, 
          muted: { value: '#7a6242' }, 
          subtle: { value: '#4c3b29' },
          subtleStrong: { value: '#2d241b' },

          danger: { value: '#7a1f1f' },
          dangerHover: { value: '#fce9e9' },
        },
      },
      fonts: {
        heading: { value: 'var(--font-cormorant-garamond)' },
        body: { value: 'var(--font-inter)' },
      },
    },

    recipes: {
      button: {
        base: {
          borderRadius: 'none',
          fontFamily: 'body',
        },
      },
      input: {
        base: {
          borderRadius: 'none',
        },
      },
      heading: {
        base: {
          fontFamily: 'heading',
        },
      },
    },
  },

  globalCss: {
    body: {
      bg: 'brand.cream',
      color: 'brand.ink',
      fontFamily: 'body',
    },
    '::selection': {
      bg: 'brand.green',
      color: 'white',
    },
  },
});

export const system = createSystem(defaultConfig, config);
