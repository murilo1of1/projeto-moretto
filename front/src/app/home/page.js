'use client';

import NextLink from 'next/link';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import api from '@/utils/axios';
import { UserHeader } from '@/components/UserHeader';

export default function HomePage() {
  const [automoveis, setAutomoveis] = useState([]);
  const [busca, setBusca] = useState('');
  const [ano, setAno] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarAutomoveis = async () => {
      try {
        const response = await api.get('/automoveis');
        setAutomoveis(response.data.data || []);
      } catch (error) {
        console.error('Erro ao buscar automóveis:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarAutomoveis();
  }, []);

  const automoveisFiltrados = useMemo(() => {
    return automoveis.filter((automovel) => {
      const textoBusca = `${automovel.marca} ${automovel.modelo} ${automovel.cor}`.toLowerCase();
      const combinaBusca = textoBusca.includes(busca.toLowerCase());
      const combinaAno = ano ? String(automovel.ano).includes(ano) : true;

      return combinaBusca && combinaAno;
    });
  }, [automoveis, busca, ano]);

  return (
    <>
      <UserHeader />

      <Box minH="100vh" bg="brand.cream" pt="85px">
        <Box
          minH={{ base: '520px', lg: '620px' }}
          display="flex"
          alignItems="center"
          px={{ base: 6, lg: 14 }}
          bg="brand.deep"
          position="relative"
          overflow="hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
            alt="Automóvel clássico em destaque"
            position="absolute"
            inset={0}
            w="100%"
            h="100%"
            objectFit="cover"
            opacity={0.32}
          />

          <Box position="absolute" inset={0} bg="rgba(10, 31, 21, 0.62)" />

          <Box position="relative" maxW="760px" color="white">
            <Text
              fontFamily="var(--font-inter)"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              mb={5}
            >
              CURADORIA FLOW MOTORS
            </Text>

            <Heading
              as="h1"
              fontFamily="var(--font-cormorant-garamond)"
              fontSize={{ base: '5xl', lg: '7xl' }}
              fontWeight="700"
              lineHeight="0.95"
              mb={6}
            >
              Clássicos selecionados para histórias raras.
            </Heading>

            <Text
              fontFamily="var(--font-cormorant-garamond)"
              fontStyle="italic"
              fontSize={{ base: 'lg', lg: '2xl' }}
              color="rgba(255,255,255,0.86)"
              maxW="620px"
              lineHeight="1.55"
              mb={8}
            >
              Explore automóveis antigos com presença, procedência e personalidade.
            </Text>

            <Button
              as={NextLink}
              href="#catalogo"
              bg="brand.cream"
              color="brand.accent"
              borderRadius="none"
              h="52px"
              px={8}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              _hover={{ bg: 'brand.pill' }}
            >
              VER CATÁLOGO
            </Button>
          </Box>
        </Box>

        <Box id="catalogo" px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            mb={8}
          >
            <Box>
              <Heading
                as="h2"
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '4xl', lg: '6xl' }}
                fontWeight="700"
                letterSpacing="widest"
                color="brand.ink"
                mb={3}
              >
                CLÁSSICOS DISPONÍVEIS
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize="lg"
                color="#3a2d1f"
              >
                Uma seleção enxuta de veículos históricos prontos para visitação.
              </Text>
            </Box>

            <Flex gap={4} direction={{ base: 'column', md: 'row' }} w={{ base: '100%', lg: 'auto' }}>
              <Input
                placeholder="Buscar por marca, modelo ou cor"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                bg="transparent"
                border="none"
                borderBottom="1px solid #c8c0ad"
                borderRadius="none"
                minW={{ base: '100%', md: '280px' }}
                _focus={{ boxShadow: 'none', borderBottomColor: 'brand.accent' }}
              />

              <Input
                placeholder="Ano"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                bg="transparent"
                border="none"
                borderBottom="1px solid #c8c0ad"
                borderRadius="none"
                maxW={{ base: '100%', md: '120px' }}
                _focus={{ boxShadow: 'none', borderBottomColor: 'brand.accent' }}
              />
            </Flex>
          </Flex>

          <Box h="1px" bg="brand.divider" mb={8} />

          {carregando ? (
            <Flex py={20} justify="center">
              <Spinner color="brand.accent" size="xl" />
            </Flex>
          ) : (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {automoveisFiltrados.map((automovel, index) => (
                  <CarCard key={automovel.id} automovel={automovel} destaque={index < 3} />
                ))}
              </SimpleGrid>

              {automoveisFiltrados.length === 0 && (
                <Box py={16} textAlign="center">
                  <Text color="gray.600" fontFamily="var(--font-inter)">
                    Nenhum automóvel encontrado com os filtros informados.
                  </Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
}

const COR_BAND = {
  vermelho: '#5a1008',
  amarelo: '#574200',
  preto: '#141414',
  branco: '#9e9a92',
  cinza: '#363636',
  prata: '#6e6e6e',
  azul: '#1a2a5e',
  verde: '#1a3e1a',
};

function CarColorBand({ cor, marca, height = '200px' }) {
  const bg = COR_BAND[cor?.toLowerCase()] ?? '#2a2a2a';

  return (
    <Box h={height} bg={bg} position="relative" overflow="hidden">
      <Text
        position="absolute"
        right={3}
        bottom={1}
        fontFamily="var(--font-cormorant-garamond)"
        fontSize="5xl"
        fontWeight="700"
        color="rgba(255,255,255,0.07)"
        userSelect="none"
        lineHeight={1}
      >
        {marca?.slice(0, 3).toUpperCase()}
      </Text>
    </Box>
  );
}

function CarCard({ automovel, destaque = false }) {
  const fotoUrl = automovel.fotos?.length > 0
    ? (automovel.fotos[0].url.startsWith('http')
        ? automovel.fotos[0].url
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${automovel.fotos[0].url}`)
    : null;

  return (
    <Box
      bg="brand.card"
      border="1px solid #d6c7aa"
      overflow="hidden"
    >
      <Box position="relative">
        {fotoUrl ? (
          <Image
            src={fotoUrl}
            alt={`${automovel.marca} ${automovel.modelo}`}
            w="100%"
            h={destaque ? '240px' : '200px'}
            objectFit="cover"
          />
        ) : (
          <CarColorBand cor={automovel.cor} marca={automovel.marca} height={destaque ? '240px' : '200px'} />
        )}

        {destaque && (
          <Badge
            position="absolute"
            top={4}
            left={4}
            bg="brand.cream"
            color="brand.accent"
            borderRadius="none"
            px={3}
            py={1}
            fontSize="10px"
            letterSpacing="widest"
          >
            DESTAQUE
          </Badge>
        )}
      </Box>

      <Box p={5}>
        <Heading
          as="h3"
          fontFamily="var(--font-cormorant-garamond)"
          fontSize="2xl"
          color="#111"
          mb={2}
        >
          {automovel.marca} {automovel.modelo}
        </Heading>

        <Box h="1px" bg="#d6c7aa" mb={4} />

        <Flex justify="space-between" color="brand.muted" fontSize="sm" fontWeight="bold" mb={4}>
          <Text>{automovel.ano}</Text>
          <Text>{automovel.cor}</Text>
        </Flex>

        <Text
          fontFamily="var(--font-mono)"
          fontSize="xs"
          color="brand.divider"
          letterSpacing="widest"
          mb={4}
        >
          {automovel.placa}
        </Text>

        <Flex gap={3} align="center">
          <Button
            as={NextLink}
            href={`/automoveis/${automovel.id}`}
            variant="outline"
            borderColor="brand.accent"
            color="brand.accent"
            borderRadius="none"
            h="42px"
            flex={1}
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            _hover={{ bg: 'brand.accent', color: 'white' }}
          >
            DETALHES
          </Button>

          <Button
            as={NextLink}
            href={`/test-drive?automovelId=${automovel.id}`}
            bg="brand.green"
            color="white"
            borderRadius="none"
            h="42px"
            flex={1}
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            _hover={{ bg: 'brand.greenHover' }}
          >
            TEST DRIVE
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
