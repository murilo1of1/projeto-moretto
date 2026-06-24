import { Box, Flex, Grid, GridItem, Heading, Text, Link, Image } from '@chakra-ui/react';

export function Destaques() {
  return (
    <Box w="100%" bg="#fafafa" py={20} px={10}>
      <Flex justify="space-between" align="flex-end" mb={10}>
        <Box>
          <Heading
            as="h2"
            fontSize="4xl"
            fontFamily="var(--font-cormorant-garamond)"
            fontWeight="500"
            mb={3}
            color="brand.ink"
          >
            Acervo em Destaque
          </Heading>
          <Text color="gray.500" fontSize="sm" fontFamily="var(--font-inter)">
            Destaques selecionados do nosso estoque atual.
          </Text>
        </Box>
        <Link
          fontSize="xs"
          fontWeight="bold"
          fontFamily="var(--font-inter)"
          letterSpacing="widest"
          borderBottom="1px solid black"
          pb={1}
          transition="all 0.3s"
          _hover={{ color: 'gray.500', borderColor: 'gray.500', textDecoration: 'none' }}
        >
          VER ESTOQUE COMPLETO
        </Link>
      </Flex>

      <Grid
        templateRows={{ base: "repeat(4, 300px)", md: "repeat(2, 350px)" }}
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
      >

        <GridItem
          colSpan={{ base: 1, md: 2 }}
          position="relative"
          overflow="hidden"
          role="group"
          cursor="pointer"
        >
          <Image
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhgppdlF7R7_YB5HU8l7IZNYF8N3_SkHYuFAFYxzYH0iGNXsSuFSxVpqXOL7APEsFjVLqLaqA_4U0rLtGEKJbSP3pXpqEaNU20WaGR3tj0jl-yLUKSSVE78raw92eidAp2iWBjwmNdV4eQ/s4522/IMG_7501.JPG"
            alt="Paratizona"
            position="absolute"
            bgSize="50%"
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="center"
            transition="transform 0.6s ease"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            p={8}
            color="white"
            bgImage="linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.55), transparent)"
            w="full"
            h="50%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
          >
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" mb={1}>1994</Text>
            <Heading as="h3" fontSize="2xl" fontFamily="var(--font-cormorant-garamond)" fontWeight="500">
              Volkswagen Parati GLS 94
            </Heading>
          </Box>
        </GridItem>

        <GridItem
          colSpan={1}
          position="relative"
          overflow="hidden"
          role="group"
          cursor="pointer"
        >
          <Image
            src="http://i.ytimg.com/vi/Nve_OkRZpEk/maxresdefault.jpg"
            alt="Corsera"
            position="absolute"
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="44% center"
            transition="transform 0.6s ease"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            p={8}
            color="white"
            bgImage="linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.55), transparent)"
            w="full"
            h="60%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
          >
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" mb={1}>2005</Text>
            <Heading as="h3" fontSize="2xl" fontFamily="var(--font-cormorant-garamond)" fontWeight="500">
              Chevrolet Corsa ???
            </Heading>
          </Box>
        </GridItem>

        <GridItem
          colSpan={1}
          position="relative"
          overflow="hidden"
          role="group"
          cursor="pointer"
        >
          <Image
            src="https://turboclass.com.br/images/anuncio/tc-5ryq1o-somente-venda-fiat-marea-elx/28302634-capadm-tc-5ryq1o-somente-venda-fiat-marea-elxv-1-1612111816046218.webp"
            alt="Marea"
            position="absolute"
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="center 60%"
            transition="transform 0.6s ease"
            _groupHover={{ transform: 'scale(1.05)' }}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            p={8}
            color="white"
            bgImage="linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.55), transparent)"
            w="full"
            h="60%"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
          >
            <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" mb={1}>2002</Text>
            <Heading as="h3" fontSize="2xl" fontFamily="var(--font-cormorant-garamond)" fontWeight="500">
              Fiat Marea ELX 2.4
            </Heading>
          </Box>
        </GridItem>

        {/* Bloco de Texto */}
        <GridItem
          colSpan={{ base: 1, md: 2 }}
          bg="#f4f4f4"
          p={12}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box mb={6}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#235a40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </Box>
          <Heading
            as="h4"
            fontSize="3xl"
            fontFamily="var(--font-cormorant-garamond)"
            fontWeight="600"
            mb={4}
            color="brand.ink"
          >
            Garantia de Procedência
          </Heading>
          <Text
            color="gray.600"
            fontSize="md"
            fontFamily="var(--font-inter)"
            lineHeight="1.8"
            mb={8}
            maxW="90%"
          >
            Cada automóvel em nossa coleção passa por uma exaustiva verificação histórica e avaliação mecânica. Não vendemos apenas veículos, nós curamos história sobre rodas, garantindo a linhagem e a integridade do seu investimento.
          </Text>
          <Link
            fontSize="xs"
            fontWeight="bold"
            fontFamily="var(--font-inter)"
            letterSpacing="widest"
            display="flex"
            alignItems="center"
            color="brand.ink"
            _hover={{ color: 'brand.accentHover', textDecoration: 'none' }}
          >
            LEIA NOSSA METODOLOGIA →
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
}
