import NextLink from 'next/link';
import { Flex, Text, HStack, Button, Link } from '@chakra-ui/react';

export function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      h="85px"
      bg="#ffffff"
      align="center"
      justify="space-between"
      px={12}
      position="absolute"
      top={0}
      zIndex={10}
      borderBottom="1px solid rgba(0,0,0,0.05)"
    >
      <Text 
        as={NextLink}
        href="/home"
        fontFamily="var(--font-cormorant-garamond)"
        fontSize="3xl"
        fontWeight="600"
        letterSpacing="widest"
        color="brand.ink"
        textDecoration="none"
        cursor="pointer"
        _hover={{ textDecoration: 'none', color: 'brand.ink' }}
      >
        FLOW MOTORS
      </Text>

      <HStack gap={16} fontSize="xs" fontWeight="bold" letterSpacing="widest" color="gray.500" fontFamily="var(--font-inter)">

        <Link 
          href="#" 
          position="relative"
          _after={{ content: '""', position: 'absolute', width: '0', height: '1px', bottom: '-4px', left: '0', bg: 'brand.ink', transition: 'width 0.3s ease' }}
          _hover={{ _after: { width: '100%' }, color: 'brand.ink', textDecoration: 'none' }}
        >
          SERVIÇOS
        </Link>
        <Link 
          href="#" 
          position="relative"
          _after={{ content: '""', position: 'absolute', width: '0', height: '1px', bottom: '-4px', left: '0', bg: 'brand.ink', transition: 'width 0.3s ease' }}
          _hover={{ _after: { width: '100%' }, color: 'brand.ink', textDecoration: 'none' }}
        >
          SOBRE
        </Link>
        <Link 
          as={NextLink}
          href="/contato" 
          position="relative"
          _after={{ content: '""', position: 'absolute', width: '0', height: '1px', bottom: '-4px', left: '0', bg: 'brand.ink', transition: 'width 0.3s ease' }}
          _hover={{ _after: { width: '100%' }, color: 'brand.ink', textDecoration: 'none' }}
        >
          CONTATO
        </Link>
      </HStack>

      <Button
        as={NextLink}
        href="/login"
        bg="brand.green"
        color="white"
        borderRadius="none"
        px={8}
        py={6}
        fontSize="xs"
        fontWeight="bold"
        fontFamily="var(--font-inter)"
        letterSpacing="widest"
        transition="all 0.3s"
        _hover={{ 
          bg: 'brand.greenHover',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        ENTRE
      </Button>
    </Flex>
  );
}
