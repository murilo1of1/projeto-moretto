'use client';

import NextLink from 'next/link';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import { UserHeader } from '@/components/UserHeader';
import { getUsuarioDoToken } from '@/utils/auth';

export default function MinhaAreaPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioToken = getUsuarioDoToken();

    if (!usuarioToken) {
      router.push('/login');
      return;
    }

    setUsuario(usuarioToken);

    const buscarAgendamentos = async () => {
      try {
        const response = await api.get('/testdrives');
        setMeusAgendamentos(response.data.data || []);
      } catch (error) {
        console.error('Erro ao buscar test drives:', error);
      } finally {
        setCarregando(false);
      }
    };

    buscarAgendamentos();
  }, [router]);

  if (carregando) {
    return (
      <>
        <UserHeader />
        <Flex minH="100vh" bg="brand.cream" align="center" justify="center" pt="85px">
          <Spinner color="brand.accent" size="xl" />
        </Flex>
      </>
    );
  }

  return (
    <>
      <UserHeader />

      <Box minH="100vh" bg="brand.cream" pt="85px">
        <Box px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            mb={10}
          >
            <Box>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={4}>
                ÁREA DO CLIENTE
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="brand.ink"
                mb={4}
              >
                Olá, {usuario?.nome}
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="brand.subtle"
              >
                Acompanhe seus agendamentos e continue sua jornada pela curadoria Flow Motors.
              </Text>
            </Box>

            <Badge
              bg="brand.green"
              color="white"
              borderRadius="none"
              px={4}
              py={2}
              fontSize="10px"
              letterSpacing="widest"
            >
              {usuario?.tipoPessoa === 2 ? 'ADMINISTRADOR' : 'CLIENTE'}
            </Badge>
          </Flex>

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={8} mb={10}>
            <InfoCard titulo="Nome" valor={usuario?.nome} />
            <InfoCard titulo="E-mail" valor={usuario?.email} />
            <InfoCard titulo="Agendamentos" valor={meusAgendamentos.length} />
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, lg: 3 }} gap={6} mb={12}>
            <Acao href="/home" titulo="Ver catálogo" texto="Explore os automóveis disponíveis." />
            <Acao href="/test-drive" titulo="Agendar test drive" texto="Reserve uma experiência com um clássico." />
            <Acao href="/contato" titulo="Falar com a equipe" texto="Tire dúvidas com a curadoria Flow Motors." />
          </SimpleGrid>

          <Box>
            <Heading
              fontFamily="var(--font-cormorant-garamond)"
              fontSize={{ base: '3xl', lg: '4xl' }}
              color="brand.ink"
              mb={6}
            >
              Meus test drives
            </Heading>

            {meusAgendamentos.length === 0 ? (
              <Box border="1px solid #d6c7aa" bg="brand.card" p={8}>
                <Text color="brand.subtle">
                  Você ainda não possui test drives agendados.
                </Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                {meusAgendamentos.map((testDrive) => (
                  <Box key={testDrive.id} border="1px solid #d6c7aa" bg="brand.card" p={6}>
                    <Flex justify="space-between" gap={4} mb={4}>
                      <Heading
                        fontFamily="var(--font-cormorant-garamond)"
                        fontSize="2xl"
                        color="brand.ink"
                      >
                        {testDrive.Automovei?.marca} {testDrive.Automovei?.modelo}
                      </Heading>

                      <Badge borderRadius="none" colorPalette="green">
                        {testDrive.status}
                      </Badge>
                    </Flex>

                    <Text color="brand.muted" fontWeight="bold" fontSize="sm" mb={2}>
                      {testDrive.Automovei?.ano} - Placa {testDrive.Automovei?.placa}
                    </Text>

                    <Text color="brand.subtleStrong">
                      {new Date(testDrive.dataAgendamento).toLocaleString('pt-BR')}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

function InfoCard({ titulo, valor }) {
  return (
    <Box border="1px solid #d6c7aa" bg="brand.card" p={6}>
      <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={3}>
        {titulo}
      </Text>

      <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="3xl" color="brand.ink">
        {valor || '-'}
      </Heading>
    </Box>
  );
}

function Acao({ href, titulo, texto }) {
  return (
    <Box border="1px solid #d6c7aa" bg="brand.card" p={6}>
      <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="2xl" mb={3} color="brand.ink">
        {titulo}
      </Heading>

      <Text color="brand.subtle" mb={5}>
        {texto}
      </Text>

      <Button
        as={NextLink}
        href={href}
        variant="outline"
        borderColor="brand.green"
        color="brand.green"
        borderRadius="none"
        h="42px"
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="widest"
        _hover={{ bg: 'brand.green', color: 'white' }}
      >
        ACESSAR
      </Button>
    </Box>
  );
}
