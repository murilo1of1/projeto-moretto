'use client';

import NextLink from 'next/link';
import { Button, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export function UserHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <Flex
      as="header"
      w="100%"
      h="85px"
      bg="brand.cream"
      align="center"
      justify="space-between"
      px={{ base: 6, lg: 12 }}
      position="fixed"
      top={0}
      zIndex={20}
      borderBottom="1px solid #d6c7aa"
    >
      <Text
        as={NextLink}
        href="/home"
        fontFamily="var(--font-cormorant-garamond)"
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="600"
        letterSpacing="widest"
        color="brand.ink"
        textDecoration="none"
        _hover={{ textDecoration: 'none', color: 'brand.ink' }}
      >
        FLOW MOTORS
      </Text>

      <HStack gap={{ base: 4, lg: 10 }} fontSize="xs" fontWeight="bold" letterSpacing="widest" color="#6f6658">
        <Link as={NextLink} href="/home" _hover={{ color: 'brand.green', textDecoration: 'none' }}>
          CATALOGO
        </Link>

        <Link as={NextLink} href="/minha-area" _hover={{ color: 'brand.green', textDecoration: 'none' }}>
          MINHA AREA
        </Link>

        <Link as={NextLink} href="/test-drive" _hover={{ color: 'brand.green', textDecoration: 'none' }}>
          TEST DRIVE
        </Link>

        <Button
          onClick={handleLogout}
          variant="outline"
          borderColor="brand.green"
          color="brand.green"
          borderRadius="none"
          h="40px"
          px={{ base: 4, md: 6 }}
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          _hover={{ bg: 'brand.green', color: 'white' }}
        >
          SAIR
        </Button>
      </HStack>
    </Flex>
  );
}
