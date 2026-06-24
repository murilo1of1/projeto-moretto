'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@/theme/system';
import { Toaster } from '@/components/ui/toaster';

export function Providers({ children }) {
  return (
    <ChakraProvider value={system}>
      {children}
      <Toaster />
    </ChakraProvider>
  );
}
