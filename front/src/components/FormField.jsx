'use client';

import { Box, Text } from '@chakra-ui/react';

export function FormField({ label, helper, children }) {
  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="bold"
        letterSpacing="widest"
        color="brand.muted"
        mb={2}
        textTransform="uppercase"
      >
        {label}
      </Text>

      {children}

      {helper && (
        <Text mt={2} fontSize="xs" color="brand.muted">
          {helper}
        </Text>
      )}
    </Box>
  );
}
