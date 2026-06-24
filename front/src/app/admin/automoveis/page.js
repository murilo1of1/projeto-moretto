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
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import { AdminHeader } from '@/components/AdminHeader';
import { toaster } from '@/components/ui/toaster';
import { getUsuarioDoToken } from '@/utils/auth';

const imagemPadrao = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7';

export default function AdminAutomoveisPage() {
  const router = useRouter();
  const [automoveis, setAutomoveis] = useState([]);
  const [busca, setBusca] = useState('');
  const [ano, setAno] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregarAutomoveis = async () => {
    try {
      const response = await api.get('/automoveis');
      setAutomoveis(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar automóveis:', error);
      toaster.create({
        title: 'Erro ao buscar automóveis',
        description: 'Não foi possível carregar o showroom.',
        type: 'error',
        meta: { closable: true },
      });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const usuario = getUsuarioDoToken();

    if (!usuario) {
      router.push('/login');
      return;
    }

    if (usuario.tipoPessoa !== 2) {
      router.push('/home');
      return;
    }

    carregarAutomoveis();
  }, [router]);

  const automoveisFiltrados = useMemo(() => {
    return automoveis.filter((automovel) => {
      const texto = `${automovel.marca} ${automovel.modelo} ${automovel.cor} ${automovel.placa}`.toLowerCase();
      const combinaBusca = texto.includes(busca.toLowerCase());
      const combinaAno = ano ? String(automovel.ano).includes(ano) : true;

      return combinaBusca && combinaAno;
    });
  }, [automoveis, busca, ano]);

  const excluirAutomovel = async (automovel) => {
    try {
      await api.delete(`/automoveis/${automovel.id}`);
      setAutomoveis((lista) => lista.filter((item) => item.id !== automovel.id));

      toaster.create({
        title: 'Automóvel excluído',
        description: 'Veículo removido do showroom.',
        type: 'success',
        meta: { closable: true },
      });
    } catch (error) {
      console.error('Erro ao excluir automóvel:', error);
      toaster.create({
        title: 'Erro ao excluir',
        description: error.response?.data?.message || 'Não foi possível remover este veículo.',
        type: 'error',
        meta: { closable: true },
      });
    }
  };

  return (
    <>
      <AdminHeader />

      <Box minH="100vh" bg="brand.cream" pt="85px">
        <Box px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            mb={8}
          >
            <Box>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={4}>
                ADMINISTRAÇÃO
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="brand.ink"
                mb={4}
              >
                Showroom
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="brand.subtle"
              >
                Gerencie os veículos disponíveis no acervo Flow Motors.
              </Text>
            </Box>

            <Button
              as={NextLink}
              href="/admin/automoveis/novo"
              bg="brand.green"
              color="white"
              borderRadius="none"
              h="48px"
              px={8}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              _hover={{ bg: 'brand.greenHover' }}
            >
              NOVO AUTOMÓVEL
            </Button>
          </Flex>

          <Flex gap={4} direction={{ base: 'column', md: 'row' }} mb={8}>
            <Input
              placeholder="Buscar por marca, modelo, cor ou placa"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              bg="transparent"
              border="none"
              borderBottom="1px solid #c8c0ad"
              borderRadius="none"
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
              maxW={{ base: '100%', md: '140px' }}
              _focus={{ boxShadow: 'none', borderBottomColor: 'brand.accent' }}
            />
          </Flex>

          <Box h="1px" bg="brand.divider" mb={8} />

          {carregando ? (
            <Flex py={20} justify="center">
              <Spinner color="brand.accent" size="xl" />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={7}>
              {automoveisFiltrados.map((automovel) => (
                <AutomovelCard key={automovel.id} automovel={automovel} onExcluir={excluirAutomovel} />
              ))}
            </SimpleGrid>
          )}

          {!carregando && automoveisFiltrados.length === 0 && (
            <Box py={16} textAlign="center">
              <Text color="gray.600">Nenhum automóvel encontrado.</Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

function AutomovelCard({ automovel, onExcluir }) {
  const [confirmando, setConfirmando] = useState(false);
  const fotoUrl = automovel.fotos?.length > 0
    ? (automovel.fotos[0].url.startsWith('http')
        ? automovel.fotos[0].url
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}${automovel.fotos[0].url}`)
    : null;

  return (
    <Box bg="brand.card" border="1px solid #d6c7aa" overflow="hidden">
      <Box position="relative">
        {fotoUrl ? (
          <Image
            src={fotoUrl}
            alt={`${automovel.marca} ${automovel.modelo}`}
            w="100%"
            h="220px"
            objectFit="cover"
          />
        ) : (
          <CarColorBand cor={automovel.cor} marca={automovel.marca} />
        )}

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
          {automovel.placa}
        </Badge>
      </Box>

      <Box p={6}>
        <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="3xl" color="brand.ink" mb={2}>
          {automovel.marca} {automovel.modelo}
        </Heading>

        <Flex justify="space-between" color="brand.muted" fontSize="sm" fontWeight="bold" mb={6}>
          <Text>{automovel.ano}</Text>
          <Text>{automovel.cor}</Text>
        </Flex>

        {!confirmando ? (
          <Flex gap={3}>
            <Button
              as={NextLink}
              href={`/automoveis/${automovel.id}`}
              variant="outline"
              borderColor="brand.green"
              color="brand.green"
              borderRadius="none"
              size="sm"
              _hover={{ bg: 'brand.green', color: 'white' }}
            >
              VER
            </Button>

            <Button
              as={NextLink}
              href={`/admin/automoveis/${automovel.id}`}
              variant="outline"
              borderColor="brand.green"
              color="brand.green"
              borderRadius="none"
              size="sm"
              _hover={{ bg: 'brand.green', color: 'white' }}
            >
              EDITAR
            </Button>

            <Button
              onClick={() => setConfirmando(true)}
              variant="outline"
              borderColor="brand.danger"
              color="brand.danger"
              borderRadius="none"
              size="sm"
              _hover={{ bg: 'brand.danger', color: 'white' }}
            >
              EXCLUIR
            </Button>
          </Flex>
        ) : (
          <Flex gap={3} align="center">
            <Text fontSize="xs" color="brand.danger" fontWeight="bold" flex={1}>
              Confirmar exclusão?
            </Text>
            <Button
              onClick={() => { onExcluir(automovel); setConfirmando(false); }}
              bg="brand.danger"
              color="white"
              borderRadius="none"
              size="sm"
            >
              SIM
            </Button>
            <Button
              onClick={() => setConfirmando(false)}
              variant="outline"
              borderColor="brand.ink"
              color="brand.ink"
              borderRadius="none"
              size="sm"
            >
              NÃO
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
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
