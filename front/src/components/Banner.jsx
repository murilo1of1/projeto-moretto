import NextLink from 'next/link';
import { Flex, Box, Text, Heading, Button } from '@chakra-ui/react';

export function Banner() {
  return (
    <Flex
      w="100%"
      h="80vh"
      bg="brand.ink"
      
      bgSize="cover"
      bgPosition="center"
      position="relative"
      align="center"
      justify="center"
      mt="80px"
      flexDirection="column"
      color="white"
      textAlign="center"
    >
  
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        bgImage="linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.85))"
        zIndex={1}
      />

      <Box zIndex={2} mb={10} px={4}>
        <Text
          fontSize="xs"
          letterSpacing="widest"
          fontWeight="semibold"
          mb={6}
          textTransform="uppercase"
          color="gray.300"
          fontFamily="var(--font-inter)"
        >
          Projeto dev web
        </Text>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
          fontFamily="var(--font-cormorant-garamond)"
          fontWeight="400"
          mb={6}
          lineHeight="1.1"
          textShadow="0px 2px 10px rgba(0,0,0,0.5)"
        >
          Clássicos & Exóticos
        </Heading>
        <Text
          fontSize="md"
          maxW="500px"
          mx="auto"
          mb={10}
          color="gray.200"
          fontFamily="var(--font-inter)"
          lineHeight="tall"
        >
          Não é apenas um carro. É o próximo capítulo da sua história.
        </Text>
        <Button
          as={NextLink}
          href="/register"
          bg="brand.accentHover"
          color="white"
          borderRadius="none"
          px={10}
          py={7}
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          textTransform="uppercase"
          border="1px solid transparent"
          transition="all 0.3s ease"
          _hover={{ 
            bg: 'white', 
            color: 'brand.accentHover', 
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
          }}
        >
          CRIE SUA CONTA
        </Button>
      </Box>
    </Flex>
  );
}
