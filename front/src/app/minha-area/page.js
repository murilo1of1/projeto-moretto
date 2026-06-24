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
        <Flex minH="100vh" bg="#f9f7f2" align="center" justify="center" pt="85px">
          <Spinner color="#0f2b1d" size="xl" />
        </Flex>
      </>
    );
  }

  return (
    <>
      <UserHeader />

      <Box minH="100vh" bg="#f9f7f2" pt="85px">
        <Box px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            mb={10}
          >
            <Box>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={4}>
                ÁREA DO CLIENTE
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="#1a1a1a"
                mb={4}
              >
                Olá, {usuario?.nome}
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="#4c3b29"
              >
                Acompanhe seus agendamentos e continue sua jornada pela curadoria Flow Motors.
              </Text>
            </Box>

            <Badge
              bg="#112a21"
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
              color="#1a1a1a"
              mb={6}
            >
              Meus test drives
            </Heading>

            {meusAgendamentos.length === 0 ? (
              <Box border="1px solid #d6c7aa" bg="#fdfaf3" p={8}>
                <Text color="#4c3b29">
                  Você ainda não possui test drives agendados.
                </Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                {meusAgendamentos.map((testDrive) => (
                  <Box key={testDrive.id} border="1px solid #d6c7aa" bg="#fdfaf3" p={6}>
                    <Flex justify="space-between" gap={4} mb={4}>
                      <Heading
                        fontFamily="var(--font-cormorant-garamond)"
                        fontSize="2xl"
                        color="#1a1a1a"
                      >
                        {testDrive.Automovei?.marca} {testDrive.Automovei?.modelo}
                      </Heading>

                      <Badge borderRadius="none" colorPalette="green">
                        {testDrive.status}
                      </Badge>
                    </Flex>

                    <Text color="#7a6242" fontWeight="bold" fontSize="sm" mb={2}>
                      {testDrive.Automovei?.ano} - Placa {testDrive.Automovei?.placa}
                    </Text>

                    <Text color="#2d241b">
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
    <Box border="1px solid #d6c7aa" bg="#fdfaf3" p={6}>
      <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={3}>
        {titulo}
      </Text>

      <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="3xl" color="#1a1a1a">
        {valor || '-'}
      </Heading>
    </Box>
  );
}

function Acao({ href, titulo, texto }) {
  return (
    <Box border="1px solid #d6c7aa" bg="#fdfaf3" p={6}>
      <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="2xl" mb={3} color="#1a1a1a">
        {titulo}
      </Heading>

      <Text color="#4c3b29" mb={5}>
        {texto}
      </Text>

      <Button
        as={NextLink}
        href={href}
        variant="outline"
        borderColor="#112a21"
        color="#112a21"
        borderRadius="none"
        h="42px"
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="widest"
        _hover={{ bg: '#112a21', color: 'white' }}
      >
        ACESSAR
      </Button>
    </Box>
  );
}
