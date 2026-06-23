'use client';

import NextLink from 'next/link';
import { Button, Flex, HStack, Link, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export function AdminHeader() {
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
      bg="#0a1f15"
      align="center"
      justify="space-between"
      px={{ base: 6, lg: 12 }}
      position="fixed"
      top={0}
      zIndex={20}
      borderBottom="1px solid rgba(255,255,255,0.12)"
    >
      <Text
        as={NextLink}
        href="/admin"
        fontFamily="var(--font-cormorant-garamond)"
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight="600"
        letterSpacing="widest"
        color="white"
        textDecoration="none"
        _hover={{ textDecoration: 'none', color: 'white' }}
      >
        FLOW ADMIN
      </Text>

      <HStack gap={{ base: 4, lg: 9 }} fontSize="xs" fontWeight="bold" letterSpacing="widest" color="rgba(255,255,255,0.72)">
        <Link as={NextLink} href="/admin" _hover={{ color: 'white', textDecoration: 'none' }}>
          PAINEL
        </Link>

        <Link as={NextLink} href="/admin/pessoas" _hover={{ color: 'white', textDecoration: 'none' }}>
          PESSOAS
        </Link>

        <Link as={NextLink} href="/admin/automoveis" _hover={{ color: 'white', textDecoration: 'none' }}>
          CARROS
        </Link>

        <Link as={NextLink} href="/home" _hover={{ color: 'white', textDecoration: 'none' }}>
          SITE
        </Link>

        <Button
          onClick={handleLogout}
          bg="#f9f7f2"
          color="#112a21"
          borderRadius="none"
          h="40px"
          px={{ base: 4, md: 6 }}
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          _hover={{ bg: '#e7dfcf' }}
        >
          SAIR
        </Button>
      </HStack>
    </Flex>
  );
}
