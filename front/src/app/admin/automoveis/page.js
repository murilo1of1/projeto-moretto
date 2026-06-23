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

const imagemPadrao = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7';

function getUsuarioDoToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

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
    const confirmou = window.confirm(`Excluir ${automovel.marca} ${automovel.modelo}?`);

    if (!confirmou) return;

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
                ADMINISTRAÇÃO
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="#1a1a1a"
                mb={4}
              >
                Showroom
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="#4c3b29"
              >
                Gerencie os veículos disponíveis no acervo Flow Motors.
              </Text>
            </Box>

            <Button
              as={NextLink}
              href="/admin/automoveis/novo"
              bg="#112a21"
              color="white"
              borderRadius="none"
              h="48px"
              px={8}
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="widest"
              _hover={{ bg: '#1a3e31' }}
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
              maxW={{ base: '100%', md: '140px' }}
              _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
            />
          </Flex>

          <Box h="1px" bg="#9c8b6e" mb={8} />

          {carregando ? (
            <Flex py={20} justify="center">
              <Spinner color="#0f2b1d" size="xl" />
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
  return (
    <Box bg="#fdfaf3" border="1px solid #d6c7aa" overflow="hidden">
      <Box position="relative">
        <Image
          src={imagemPadrao}
          alt={`${automovel.marca} ${automovel.modelo}`}
          w="100%"
          h="220px"
          objectFit="cover"
        />

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
          {automovel.placa}
        </Badge>
      </Box>

      <Box p={6}>
        <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="3xl" color="#1a1a1a" mb={2}>
          {automovel.marca} {automovel.modelo}
        </Heading>

        <Flex justify="space-between" color="#7a6242" fontSize="sm" fontWeight="bold" mb={6}>
          <Text>{automovel.ano}</Text>
          <Text>{automovel.cor}</Text>
        </Flex>

        <Flex gap={3}>
          <Button
            as={NextLink}
            href={`/automoveis/${automovel.id}`}
            variant="outline"
            borderColor="#112a21"
            color="#112a21"
            borderRadius="none"
            size="sm"
            _hover={{ bg: '#112a21', color: 'white' }}
          >
            VER
          </Button>

          <Button
            as={NextLink}
            href={`/admin/automoveis/${automovel.id}`}
            variant="outline"
            borderColor="#112a21"
            color="#112a21"
            borderRadius="none"
            size="sm"
            _hover={{ bg: '#112a21', color: 'white' }}
          >
            EDITAR
          </Button>

          <Button
            onClick={() => onExcluir(automovel)}
            variant="outline"
            borderColor="#7a1f1f"
            color="#7a1f1f"
            borderRadius="none"
            size="sm"
            _hover={{ bg: '#7a1f1f', color: 'white' }}
          >
            EXCLUIR
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
