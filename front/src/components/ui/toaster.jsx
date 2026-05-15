'use client';

import { Toaster as ChakraToaster, Portal, Spinner, Stack, Toast, createToaster } from '@chakra-ui/react';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});

export function Toaster() {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: 'auto' }}>
        {(toast) => (
          <Toast.Root
            width={{ md: '380px' }}
            bg="#1a1a1a"
            color="white"
            borderRadius="none"
            border="1px solid rgba(255,255,255,0.1)"
            boxShadow="0 8px 24px rgba(0,0,0,0.4)"
          >
            {toast.type === 'loading' ? (
              <Spinner size="sm" color="white" />
            ) : (
              <Toast.Indicator
                css={{
                  '&[data-type=success]': { color: '#4ade80' },
                  '&[data-type=error]': { color: '#f87171' },
                }}
              />
            )}
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && (
                <Toast.Title fontFamily="var(--font-inter)" fontSize="sm" fontWeight="bold" letterSpacing="wide">
                  {toast.title}
                </Toast.Title>
              )}
              {toast.description && (
                <Toast.Description fontFamily="var(--font-inter)" fontSize="xs" color="gray.300">
                  {toast.description}
                </Toast.Description>
              )}
            </Stack>
            {toast.action && (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )}
            {toast.meta?.closable && <Toast.CloseTrigger color="gray.400" _hover={{ color: 'white' }} />}
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
}
