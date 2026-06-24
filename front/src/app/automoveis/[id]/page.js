'use client';

import NextLink from 'next/link';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/axios';
import { UserHeader } from '@/components/UserHeader';

const imagemPadrao = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7';

export default function AutomovelDetalhesPage() {
  const { id } = useParams();
  const [automovel, setAutomovel] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [fotoAtiva, setFotoAtiva] = useState(0);

  useEffect(() => {
    const buscarAutomovel = async () => {
      try {
        const response = await api.get(`/automoveis/${id}`);
        setAutomovel(response.data.data);
      } catch (error) {
        console.error('Erro ao buscar automóvel:', error);
        setErro('Não foi possível carregar os detalhes deste automóvel.');
      } finally {
        setCarregando(false);
      }
    };

    if (id) {
      buscarAutomovel();
    }
  }, [id]);

  useEffect(() => {
    setFotoAtiva(0);
  }, [id]);

  const imagens = useMemo(() => {
    if (!automovel?.fotos?.length) {
      return [imagemPadrao];
    }

    return automovel.fotos
      .sort((a, b) => a.ordem - b.ordem)
      .map((foto) => {
        if (foto.url.startsWith('http')) {
          return foto.url;
        }

        return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${foto.url}`;
      });
  }, [automovel]);

  if (carregando) {
    return (
      <>
        <UserHeader />
        <Flex minH="100vh" bg="#f9f7f2" align="center" justify="center" pt="85px">
          <Spinner color="#0f2b1d" size="xl" />
        </Flex>
      </>
    );
  }

  if (erro || !automovel) {
    return (
      <>
        <UserHeader />
        <Flex minH="100vh" bg="#f9f7f2" align="center" justify="center" pt="85px" px={6}>
          <Box textAlign="center">
            <Heading
              fontFamily="var(--font-cormorant-garamond)"
              fontSize="4xl"
              color="#1a1a1a"
              mb={4}
            >
              Automóvel não encontrado
            </Heading>

            <Text color="gray.600" mb={8}>
              {erro || 'Este veículo não está disponível no catálogo.'}
            </Text>

            <Button
              as={NextLink}
              href="/home"
              bg="#112a21"
              color="white"
              borderRadius="none"
              px={8}
              _hover={{ bg: '#1a3e31' }}
            >
              VOLTAR AO CATÁLOGO
            </Button>
          </Box>
        </Flex>
      </>
    );
  }

  return (
    <>
      <UserHeader />

      <Box minH="100vh" bg="#f9f7f2" pt="85px">
        <Grid templateColumns={{ base: '1fr', lg: '1.12fr 0.88fr' }} minH={{ lg: 'calc(100vh - 85px)' }}>
          <Box bg="#0a1f15" p={{ base: 5, lg: 10 }}>
            <Image
              src={imagens[fotoAtiva]}
              alt={`${automovel.marca} ${automovel.modelo}`}
              w="100%"
              h={{ base: '340px', lg: '620px' }}
              objectFit="cover"
            />

            {imagens.length > 1 && (
              <SimpleGrid columns={{ base: 3, md: 4 }} gap={3} mt={3}>
                {imagens.slice(0, 5).map((imagem, index) => (
                  <Image
                    key={`${imagem}-${index}`}
                    src={imagem}
                    alt={`${automovel.marca} ${automovel.modelo} — foto ${index + 1}`}
                    h="110px"
                    w="100%"
                    objectFit="cover"
                    cursor="pointer"
                    opacity={fotoAtiva === index ? 1 : 0.5}
                    outline={fotoAtiva === index ? '2px solid #f9f7f2' : 'none'}
                    outlineOffset="-2px"
                    onClick={() => setFotoAtiva(index)}
                    _hover={{ opacity: fotoAtiva === index ? 1 : 0.8 }}
                    transition="opacity 0.15s"
                  />
                ))}
              </SimpleGrid>
            )}
          </Box>

          <Flex direction="column" justify="center" px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
            <Badge
              alignSelf="flex-start"
              bg="#112a21"
              color="white"
              borderRadius="none"
              px={4}
              py={2}
              fontSize="10px"
              letterSpacing="widest"
              mb={6}
            >
              ACERVO FLOW MOTORS
            </Badge>

            <Heading
              as="h1"
              fontFamily="var(--font-cormorant-garamond)"
              fontSize={{ base: '5xl', lg: '7xl' }}
              fontWeight="700"
              lineHeight="0.95"
              color="#1a1a1a"
              mb={5}
            >
              {automovel.marca} {automovel.modelo}
            </Heading>

            <Text
              fontFamily="var(--font-cormorant-garamond)"
              fontStyle="italic"
              fontSize={{ base: 'xl', lg: '2xl' }}
              color="#4c3b29"
              lineHeight="1.55"
              mb={8}
            >
              Um clássico selecionado para quem procura presença, procedência e uma experiência de direção memorável.
            </Text>

            <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mb={8}>
              <Info label="Ano" value={automovel.ano} />
              <Info label="Cor" value={automovel.cor} />
              <Info label="Placa" value={automovel.placa} />
              <Info label="Marca" value={automovel.marca} />
            </SimpleGrid>

            <Box borderTop="1px solid #c8b895" borderBottom="1px solid #c8b895" py={6} mb={8}>
              <Heading
                as="h2"
                fontFamily="var(--font-cormorant-garamond)"
                fontSize="3xl"
                fontWeight="600"
                mb={4}
                color="#1a1a1a"
              >
                Diferenciais
              </Heading>

              <SimpleGrid columns={{ base: 1, md: 2 }} gap={3}>
                <Text color="#2d241b">Curadoria especializada</Text>
                <Text color="#2d241b">Histórico preservado</Text>
                <Text color="#2d241b">Inspeção visual criteriosa</Text>
                <Text color="#2d241b">Disponível para visitação</Text>
              </SimpleGrid>
            </Box>

            <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
              <Button
                as={NextLink}
                href={`/test-drive?automovelId=${automovel.id}`}
                bg="#112a21"
                color="white"
                borderRadius="none"
                h="52px"
                px={8}
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="widest"
                _hover={{ bg: '#1a3e31' }}
              >
                AGENDAR TEST DRIVE
              </Button>

              <Button
                as={NextLink}
                href="/home"
                variant="outline"
                borderColor="#112a21"
                color="#112a21"
                borderRadius="none"
                h="52px"
                px={8}
                fontSize="xs"
                fontWeight="bold"
                letterSpacing="widest"
                _hover={{ bg: '#112a21', color: 'white' }}
              >
                VOLTAR AO CATÁLOGO
              </Button>
            </Flex>
          </Flex>
        </Grid>
      </Box>
    </>
  );
}

function Info({ label, value }) {
  return (
    <Box>
      <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={1}>
        {label}
      </Text>

      <Text fontFamily="var(--font-cormorant-garamond)" fontSize="2xl" color="#1a1a1a">
        {value || '-'}
      </Text>
    </Box>
  );
}
