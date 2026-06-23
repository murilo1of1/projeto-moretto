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
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import api from '@/utils/axios';
import { UserHeader } from '@/components/UserHeader';

export default function HomePage() {
  const [automoveis, setAutomoveis] = useState([]);
  const [busca, setBusca] = useState('');
  const [ano, setAno] = useState('');

  useEffect(() => {
    const buscarAutomoveis = async () => {
      try {
        const response = await api.get('/automoveis');
        setAutomoveis(response.data.data || []);
      } catch (error) {
        console.error('Erro ao buscar automóveis:', error);
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

  const destaques = automoveisFiltrados.slice(0, 3);

  return (
    <>
      <UserHeader />

      <Box minH="100vh" bg="#f9f7f2" pt="85px">
        <Box
          minH={{ base: '520px', lg: '620px' }}
          display="flex"
          alignItems="center"
          px={{ base: 6, lg: 14 }}
          bg="#0a1f15"
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
              bg="#f9f7f2"
              color="#0f2b1d"
              borderRadius="none"
              h="52px"
              px={8}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              _hover={{ bg: '#e7dfcf' }}
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
                color="#1a1a1a"
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
                _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
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
                _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
              />
            </Flex>
          </Flex>

          <Box h="1px" bg="#9c8b6e" mb={8} />

          {destaques.length > 0 && (
            <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} mb={12}>
              {destaques.map((automovel) => (
                <CarCard key={automovel.id} automovel={automovel} destaque />
              ))}
            </SimpleGrid>
          )}

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
            {automoveisFiltrados.map((automovel) => (
              <CarCard key={automovel.id} automovel={automovel} />
            ))}
          </SimpleGrid>

          {automoveisFiltrados.length === 0 && (
            <Box py={16} textAlign="center">
              <Text color="gray.600" fontFamily="var(--font-inter)">
                Nenhum automóvel encontrado com os filtros informados.
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

function CarCard({ automovel, destaque = false }) {
  return (
    <Box
      bg="#fdfaf3"
      border="1px solid #d6c7aa"
      boxShadow="0 4px 12px rgba(0,0,0,0.12)"
      overflow="hidden"
    >
      <Box position="relative">
        <Image
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7"
          alt={`${automovel.marca} ${automovel.modelo}`}
          w="100%"
          h={destaque ? '240px' : '200px'}
          objectFit="cover"
        />

        {destaque && (
          <Badge
            position="absolute"
            top={4}
            left={4}
            bg="#f9f7f2"
            color="#0f2b1d"
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

        <Flex justify="space-between" color="#7a6242" fontSize="sm" fontWeight="bold" mb={4}>
          <Text>{automovel.ano}</Text>
          <Text>{automovel.cor}</Text>
        </Flex>

        <Text
          fontFamily="var(--font-cormorant-garamond)"
          fontStyle="italic"
          fontSize="sm"
          color="#2d241b"
          mb={5}
        >
          Clássico selecionado para compor o acervo Flow Motors.
        </Text>

        <Button
          as={NextLink}
          href={`/automoveis/${automovel.id}`}
          variant="outline"
          borderColor="#0f2b1d"
          color="#0f2b1d"
          borderRadius="none"
          h="42px"
          w="100%"
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          _hover={{ bg: '#0f2b1d', color: 'white' }}
        >
          VER DETALHES
        </Button>
      </Box>
    </Box>
  );
}
