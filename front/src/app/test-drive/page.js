'use client';

import NextLink from 'next/link';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  NativeSelect,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from '@/utils/axios';
import { UserHeader } from '@/components/UserHeader';
import { FormField } from '@/components/FormField';
import { FormPanel } from '@/components/FormPanel';
import { toaster } from '@/components/ui/toaster';

function getUsuarioDoToken() {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export default function TestDrivePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [usuario, setUsuario] = useState(null);
  const [automoveis, setAutomoveis] = useState([]);
  const [automovelId, setAutomovelId] = useState(searchParams.get('automovelId') || '');
  const [dataAgendamento, setDataAgendamento] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const usuarioToken = getUsuarioDoToken();

    if (!usuarioToken) {
      router.push('/login');
      return;
    }

    const carregarAutomoveis = async () => {
      try {
        setUsuario(usuarioToken);
        const response = await api.get('/automoveis');
        setAutomoveis(response.data.data || []);
      } catch (error) {
        console.error('Erro ao carregar automoveis:', error);
        toaster.create({
          title: 'Erro ao carregar automoveis',
          description: 'Nao foi possivel buscar os carros disponiveis.',
          type: 'error',
          meta: { closable: true },
        });
      } finally {
        setCarregando(false);
      }
    };

    carregarAutomoveis();
  }, [router]);

  const automovelSelecionado = useMemo(() => {
    return automoveis.find((automovel) => String(automovel.id) === String(automovelId));
  }, [automoveis, automovelId]);

  const handleSubmit = async () => {
    if (!usuario?.idPessoa) {
      toaster.create({
        title: 'Sessao invalida',
        description: 'Entre novamente para agendar um test drive.',
        type: 'error',
        meta: { closable: true },
      });
      router.push('/login');
      return;
    }

    if (!automovelId || !dataAgendamento) {
      toaster.create({
        title: 'Preencha todos os campos',
        description: 'Selecione um carro e informe data e horario.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    const dataEscolhida = new Date(dataAgendamento);

    if (Number.isNaN(dataEscolhida.getTime()) || dataEscolhida <= new Date()) {
      toaster.create({
        title: 'Data invalida',
        description: 'Escolha uma data futura para o test drive.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    setEnviando(true);

    try {
      await api.post('/testdrives', {
        automovelId: Number(automovelId),
        pessoaId: Number(usuario.idPessoa),
        dataAgendamento,
        status: 'agendado',
      });

      toaster.create({
        title: 'Test drive agendado',
        description: 'Sua experiencia foi reservada com sucesso.',
        type: 'success',
        meta: { closable: true },
      });

      setTimeout(() => router.push('/minha-area'), 1200);
    } catch (error) {
      console.error('Erro ao agendar test drive:', error);
      toaster.create({
        title: 'Erro ao agendar',
        description: error.response?.data?.message || 'Tente novamente em alguns instantes.',
        type: 'error',
        meta: { closable: true },
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <UserHeader />

      <Box
        minH="100vh"
        bg="#f9f7f2"
        px={{ base: 6, lg: 14 }}
        pt={{ base: '125px', lg: '141px' }}
        pb={{ base: 10, lg: 14 }}
      >
        <FormPanel
          eyebrow="EXPERIENCIA FLOW MOTORS"
          title="Agendar test drive"
          description="Escolha o automovel, confirme o melhor horario e reserve uma visita guiada pela curadoria Flow Motors."
          aside={
            <Button
              as={NextLink}
              href="/home"
              variant="outline"
              borderColor="#112a21"
              color="#112a21"
              borderRadius="none"
              h="46px"
              px={7}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              _hover={{ bg: '#112a21', color: 'white' }}
            >
              VER CATALOGO
            </Button>
          }
        >
          {carregando ? (
            <Flex py={16} justify="center">
              <Spinner color="#0f2b1d" size="xl" />
            </Flex>
          ) : (
            <Grid templateColumns={{ base: '1fr', lg: '1.05fr 0.95fr' }} gap={{ base: 8, lg: 12 }}>
              <Box>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} mb={7}>
                  <FormField label="Automovel">
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={automovelId}
                        onChange={(e) => setAutomovelId(e.target.value)}
                        borderRadius="none"
                        border="none"
                        borderBottom="1px solid #c8c0ad"
                        bg="transparent"
                        h="44px"
                        px={0}
                        _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
                      >
                        <option value="">Selecione um automovel</option>
                        {automoveis.map((automovel) => (
                          <option key={automovel.id} value={automovel.id}>
                            {automovel.marca} {automovel.modelo} - {automovel.ano}
                          </option>
                        ))}
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  </FormField>

                  <FormField label="Data e horario">
                    <Input
                      type="datetime-local"
                      value={dataAgendamento}
                      onChange={(e) => setDataAgendamento(e.target.value)}
                      borderRadius="none"
                      border="none"
                      borderBottom="1px solid #c8c0ad"
                      bg="transparent"
                      h="44px"
                      px={0}
                      _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
                    />
                  </FormField>
                </SimpleGrid>

                <Box borderTop="1px solid #d6c7aa" pt={6}>
                  <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={3}>
                    AGENDADO PARA
                  </Text>

                  <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="3xl" color="#1a1a1a" mb={2}>
                    {usuario?.nome || 'Usuario logado'}
                  </Heading>

                  <Text color="#4c3b29">{usuario?.email}</Text>
                </Box>

                <Button
                  onClick={handleSubmit}
                  loading={enviando}
                  bg="#112a21"
                  color="white"
                  borderRadius="none"
                  h="54px"
                  w="100%"
                  mt={8}
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  _hover={{ bg: '#1a3e31' }}
                >
                  CONFIRMAR TEST DRIVE
                </Button>
              </Box>

              <Box borderLeft={{ base: 'none', lg: '1px solid #d6c7aa' }} pl={{ base: 0, lg: 10 }}>
                <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={4}>
                  RESUMO DO AUTOMOVEL
                </Text>

                {automovelSelecionado ? (
                  <Box>
                    <Badge bg="#112a21" color="white" borderRadius="none" px={3} py={1} mb={5}>
                      {automovelSelecionado.placa}
                    </Badge>

                    <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="4xl" color="#1a1a1a" mb={4}>
                      {automovelSelecionado.marca} {automovelSelecionado.modelo}
                    </Heading>

                    <SimpleGrid columns={2} gap={4}>
                      <ResumoItem label="Ano" value={automovelSelecionado.ano} />
                      <ResumoItem label="Cor" value={automovelSelecionado.cor} />
                    </SimpleGrid>
                  </Box>
                ) : (
                  <Text color="#4c3b29" lineHeight="1.8">
                    Selecione um automovel para revisar os detalhes antes de confirmar o agendamento.
                  </Text>
                )}
              </Box>
            </Grid>
          )}
        </FormPanel>
      </Box>
    </>
  );
}

function ResumoItem({ label, value }) {
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
