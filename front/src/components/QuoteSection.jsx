import { Box, Text, VStack } from '@chakra-ui/react';

export function QuoteSection() {
  return (
    <Box w="100%" bg="#f4f4f4" py={32} px={10} textAlign="center">
      <VStack spacing={10} maxW="900px" mx="auto">
        
        <Text 
          fontSize={{ base: "3xl", md: "5xl" }} 
          fontFamily="var(--font-cormorant-garamond)" 
          fontStyle="italic"
          fontWeight="400" 
          lineHeight="1.3"
          color="#1a1a1a"
        >
          "Um automóvel não é apenas uma máquina, é a manifestação física da ambição de uma era, forjada em aço e couro."
        </Text>
        
        <Text 
          fontSize="xs" 
          fontWeight="bold" 
          color="gray.500" 
          letterSpacing="widest" 
          textTransform="uppercase"
          fontFamily="var(--font-inter)"
        >
          — A FILOSOFIA DO EDUARDO
        </Text>
      </VStack>
    </Box>
  );
}
