'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';

export function FormPanel({ eyebrow, title, description, children, aside }) {
  return (
    <Box w="100%" maxW="1180px" mx="auto">
      <Flex
        justify="space-between"
        align={{ base: 'flex-start', lg: 'flex-end' }}
        direction={{ base: 'column', lg: 'row' }}
        gap={6}
        mb={8}
      >
        <Box maxW="720px">
          {eyebrow && (
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={4}>
              {eyebrow}
            </Text>
          )}

          <Heading
            fontFamily="var(--font-cormorant-garamond)"
            fontSize={{ base: '5xl', lg: '6xl' }}
            lineHeight="0.98"
            color="brand.ink"
            mb={4}
          >
            {title}
          </Heading>

          {description && (
            <Text
              fontFamily="var(--font-cormorant-garamond)"
              fontStyle="italic"
              fontSize={{ base: 'lg', lg: 'xl' }}
              color="brand.subtle"
              lineHeight="1.55"
            >
              {description}
            </Text>
          )}
        </Box>

        {aside}
      </Flex>

      <Box bg="brand.card" border="1px solid #d6c7aa" p={{ base: 6, md: 8 }}>
        {children}
      </Box>
    </Box>
  );
}
