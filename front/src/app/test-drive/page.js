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
import { getUsuarioDoToken } from '@/utils/auth';

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

    setUsuario(usuarioToken);

    const carregarAutomoveis = async () => {
      try {
        const response = await api.get('/automoveis');
        setAutomoveis(response.data.data || []);
      } catch (error) {
        console.error('Erro ao carregar automoveis:', error);
        toaster.create({
          title: 'Erro ao carregar automoveis',
          description: 'Não foi possível buscar os carros disponíveis.',
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
        bg="brand.cream"
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
              borderColor="brand.green"
              color="brand.green"
              borderRadius="none"
              h="46px"
              px={7}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              _hover={{ bg: 'brand.green', color: 'white' }}
            >
              VER CATALOGO
            </Button>
          }
        >
          {carregando ? (
            <Flex py={16} justify="center">
              <Spinner color="brand.accent" size="xl" />
            </Flex>
          ) : (
            <Grid templateColumns={{ base: '1fr', lg: '1.05fr 0.95fr' }} gap={{ base: 8, lg: 12 }}>
              <Box>
                <Box mb={7}>
                  <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={3}>
                    SELECIONE O AUTOMÓVEL
                  </Text>

                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={3}>
                    {automoveis.map((auto) => (
                      <Box
                        key={auto.id}
                        borderWidth={automovelId === String(auto.id) ? '2px' : '1px'}
                        borderStyle="solid"
                        borderColor={automovelId === String(auto.id) ? 'brand.green' : 'brand.line'}
                        bg="brand.card"
                        cursor="pointer"
                        onClick={() => setAutomovelId(String(auto.id))}
                        overflow="hidden"
                        _hover={{ borderColor: 'brand.green' }}
                        transition="border-color 0.15s"
                      >
                        <CarColorBand cor={auto.cor} marca={auto.marca} height="60px" />
                        <Box p={3}>
                          <Text fontSize="8px" fontWeight="700" letterSpacing="2px" color="brand.muted">
                            {auto.marca}
                          </Text>
                          <Text fontFamily="var(--font-cormorant-garamond)" fontSize="lg" fontWeight="600" lineHeight="1.2">
                            {auto.modelo}
                          </Text>
                          <Text fontSize="11px" color="brand.divider" mt={1}>
                            {auto.ano} · {auto.cor}
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </SimpleGrid>
                </Box>

                <FormField label="Data e horário">
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
                    _focus={{ boxShadow: 'none', borderBottomColor: 'brand.accent' }}
                  />
                </FormField>

                <Box borderTop="1px solid #d6c7aa" pt={6}>
                  <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={3}>
                    AGENDADO PARA
                  </Text>

                  <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="3xl" color="brand.ink" mb={2}>
                    {usuario?.nome || 'Usuario logado'}
                  </Heading>

                  <Text color="brand.subtle">{usuario?.email}</Text>
                </Box>

                <Button
                  onClick={handleSubmit}
                  loading={enviando}
                  bg="brand.green"
                  color="white"
                  borderRadius="none"
                  h="54px"
                  w="100%"
                  mt={8}
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  _hover={{ bg: 'brand.greenHover' }}
                >
                  CONFIRMAR TEST DRIVE
                </Button>
              </Box>

              <Box borderLeft={{ base: 'none', lg: '1px solid #d6c7aa' }} pl={{ base: 0, lg: 10 }}>
                <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={4}>
                  RESUMO DO AUTOMOVEL
                </Text>

                {automovelSelecionado ? (
                  <Box>
                    <Badge bg="brand.green" color="white" borderRadius="none" px={3} py={1} mb={5}>
                      {automovelSelecionado.placa}
                    </Badge>

                    <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="4xl" color="brand.ink" mb={4}>
                      {automovelSelecionado.marca} {automovelSelecionado.modelo}
                    </Heading>

                    <SimpleGrid columns={2} gap={4}>
                      <ResumoItem label="Ano" value={automovelSelecionado.ano} />
                      <ResumoItem label="Cor" value={automovelSelecionado.cor} />
                    </SimpleGrid>
                  </Box>
                ) : (
                  <Text color="brand.subtle" lineHeight="1.8">
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

function CarColorBand({ cor, marca, height = '60px' }) {
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

  const bg = COR_BAND[cor?.toLowerCase()] ?? '#2a2a2a';

  return (
    <Box h={height} bg={bg} position="relative" overflow="hidden">
      <Text
        position="absolute"
        right={3}
        bottom={1}
        fontFamily="var(--font-cormorant-garamond)"
        fontSize="4xl"
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

function ResumoItem({ label, value }) {
  return (
    <Box>
      <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={1}>
        {label}
      </Text>
      <Text fontFamily="var(--font-cormorant-garamond)" fontSize="2xl" color="brand.ink">
        {value || '-'}
      </Text>
    </Box>
  );
}
