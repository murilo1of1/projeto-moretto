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
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import { AdminHeader } from '@/components/AdminHeader';
import { getUsuarioDoToken } from '@/utils/auth';

const STATUS_CONFIG = {
  agendado: { bg: '#e1f5ee', color: '#085041', label: 'AGENDADO' },
  concluido: { bg: '#eaf3de', color: '#27500a', label: 'CONCLUÍDO' },
  cancelado: { bg: '#f1efe8', color: '#5f5e5a', label: 'CANCELADO' },
};

export default function AdminTestDrivesPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [testDrives, setTestDrives] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const usuarioToken = getUsuarioDoToken();

    if (!usuarioToken) {
      router.push('/login');
      return;
    }

    if (usuarioToken.tipoPessoa !== 2) {
      router.push('/home');
      return;
    }

    setUsuario(usuarioToken);

    const carregarTestDrives = async () => {
      try {
        const response = await api.get('/testdrives');
        setTestDrives(response.data.data || []);
      } catch (error) {
        console.error('Erro ao buscar test drives:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarTestDrives();
  }, [router]);

  return (
    <>
      <AdminHeader />

      <Box minH="100vh" bg="#f9f7f2" pt="85px">
        <Box px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            mb={8}
          >
            <Box>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={4}>
                TEST DRIVES
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="#1a1a1a"
                mb={4}
              >
                Agendamentos em aberto
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="#4c3b29"
              >
                Consulte os registros de test drives e acompanhe o status de cada reserva.
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
              {usuario?.nome || 'ADMINISTRADOR'}
            </Badge>
          </Flex>

          {carregando ? (
            <Flex py={20} justify="center">
              <Spinner color="#0f2b1d" size="xl" />
            </Flex>
          ) : testDrives.length === 0 ? (
            <Box py={24} textAlign="center">
              <Text color="#4c3b29">Nenhum test drive encontrado no momento.</Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
              {testDrives.map((testDrive) => {
                const cfg = STATUS_CONFIG[testDrive.status] ?? STATUS_CONFIG.agendado;
                return (
                  <Box key={testDrive.id} bg="#fdfaf3" border="1px solid #d6c7aa" p={6}>
                    <Flex justify="space-between" mb={4} gap={3}>
                      <Box>
                        <Heading
                          fontFamily="var(--font-cormorant-garamond)"
                          fontSize="2xl"
                          color="#1a1a1a"
                          mb={2}
                        >
                          {testDrive.Automovel?.marca ?? 'Carro'} {testDrive.Automovel?.modelo ?? ''}
                        </Heading>
                        <Text color="#7a6242" fontSize="sm">
                          {testDrive.Automovel?.ano ?? '----'} · Placa {testDrive.Automovel?.placa ?? '----'}
                        </Text>
                      </Box>
                      <Badge
                        bg={cfg.bg}
                        color={cfg.color}
                        borderRadius="none"
                        px={3}
                        py={1}
                        fontSize="9px"
                        fontWeight="bold"
                        letterSpacing="widest"
                        whiteSpace="nowrap"
                      >
                        {cfg.label}
                      </Badge>
                    </Flex>

                    <Text color="#4c3b29" mb={4}>
                      Cliente: {testDrive.Pessoa?.nome ?? 'Desconhecido'}
                    </Text>

                    <Text color="#2d241b" fontSize="sm" mb={6}>
                      {new Date(testDrive.dataAgendamento).toLocaleString('pt-BR', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>

                    <Button
                      as={NextLink}
                      href={`/admin/pessoas/${testDrive.pessoaId}`}
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
                      VER CLIENTE
                    </Button>
                  </Box>
                );
              })}
            </SimpleGrid>
          )}
        </Box>
      </Box>
    </>
  );
}
