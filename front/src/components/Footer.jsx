import { Box, Flex, Text, Link, VStack } from '@chakra-ui/react';

export function Footer() {
  return (
    <Box w="100%" bg="brand.ink" color="white" py={20} px={10}>
      <Flex justify="space-between" align="flex-start" maxW="1200px" mx="auto" direction={{ base: "column", md: "row" }} gap={10}>
        <Box maxW="400px">
          <Text 
            fontFamily="var(--font-cormorant-garamond)" 
            fontSize="2xl" 
            fontWeight="600" 
            letterSpacing="widest" 
            mb={6}
          >
            FLOW MOTORS
          </Text>
          <Text fontSize="sm" color="gray.400" lineHeight="1.8" fontFamily="var(--font-inter)">
            Curadores dos automóveis clássicos e exóticos mais significativos do mundo. Nos orgulhamos de oferecer uma coleção inigualável para o colecionador exigente.
          </Text>
        </Box>

        <Flex gap={{ base: 12, md: 24 }}>
          <VStack align="flex-start" gap={4}>
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" mb={2} color="gray.300" fontFamily="var(--font-inter)">JURÍDICO</Text>
            <Link fontSize="sm" color="gray.400" transition="all 0.3s" _hover={{ color: 'white', textDecoration: 'none' }} fontFamily="var(--font-inter)">Política de Privacidade</Link>
            <Link fontSize="sm" color="gray.400" transition="all 0.3s" _hover={{ color: 'white', textDecoration: 'none' }} fontFamily="var(--font-inter)">Termos de Serviço</Link>
            <Link fontSize="sm" color="gray.400" transition="all 0.3s" _hover={{ color: 'white', textDecoration: 'none' }} fontFamily="var(--font-inter)">Garantia de Procedência</Link>
            <Link fontSize="sm" color="gray.400" transition="all 0.3s" _hover={{ color: 'white', textDecoration: 'none' }} fontFamily="var(--font-inter)">Política de Cookies</Link>
          </VStack>

          <VStack align="flex-start" gap={4}>
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" mb={2} color="gray.300" fontFamily="var(--font-inter)">ATENDIMENTO</Text>
            <Link fontSize="sm" color="gray.400" transition="all 0.3s" _hover={{ color: 'white', textDecoration: 'none' }} fontFamily="var(--font-inter)">Consultas Privadas</Link>
            <Link fontSize="sm" color="gray.400" transition="all 0.3s" _hover={{ color: 'white', textDecoration: 'none' }} fontFamily="var(--font-inter)">Agendar Visita</Link>
            <Link fontSize="sm" color="gray.400" transition="all 0.3s" _hover={{ color: 'white', textDecoration: 'none' }} fontFamily="var(--font-inter)">Consignação</Link>
          </VStack>
        </Flex>
      </Flex>
      
      <Flex justify="space-between" align="center" mt={24} maxW="1200px" mx="auto" borderTop="1px solid rgba(255,255,255,0.1)" pt={8} direction={{ base: "column", md: "row" }} gap={4}>
        <Text fontSize="xs" color="gray.500" fontFamily="var(--font-inter)" letterSpacing="wider">
          © 2024 FLOW MOTORS. TODOS OS DIREITOS RESERVADOS.
        </Text>
        <Flex gap={4}>
           {/* Ícones sociais podem entrar aqui futuramente */}
           <Text fontSize="xs" color="gray.500" fontFamily="var(--font-inter)" cursor="pointer" _hover={{ color: 'white' }}>INSTAGRAM</Text>
           <Text fontSize="xs" color="gray.500" fontFamily="var(--font-inter)" cursor="pointer" _hover={{ color: 'white' }}>LINKEDIN</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
