'use client';

import { Box, Text } from '@chakra-ui/react';

export function FormField({ label, helper, children }) {
  return (
    <Box>
      <Text
        fontSize="10px"
        fontWeight="bold"
        letterSpacing="widest"
        color="#7a6242"
        mb={2}
        textTransform="uppercase"
      >
        {label}
      </Text>

      {children}

      {helper && (
        <Text mt={2} fontSize="xs" color="#7a6242">
          {helper}
        </Text>
      )}
    </Box>
  );
}
