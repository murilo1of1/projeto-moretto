'use client';

import NextLink from 'next/link';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
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

export default function AdminPessoasPage() {
  const router = useRouter();
  const [pessoas, setPessoas] = useState([]);
  const [busca, setBusca] = useState('');
  const [tipo, setTipo] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregarPessoas = async () => {
    try {
      const response = await api.get('/pessoa');
      setPessoas(response.data.data || []);
    } catch (error) {
      console.error('Erro ao buscar pessoas:', error);
      toaster.create({
        title: 'Erro ao buscar pessoas',
        description: 'Não foi possível carregar os usuários.',
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

    carregarPessoas();
  }, [router]);

  const pessoasFiltradas = useMemo(() => {
    return pessoas.filter((pessoa) => {
      const texto = `${pessoa.nome} ${pessoa.email} ${pessoa.telefone || ''}`.toLowerCase();
      const combinaBusca = texto.includes(busca.toLowerCase());
      const combinaTipo = tipo ? String(pessoa.tipoPessoa) === tipo : true;

      return combinaBusca && combinaTipo;
    });
  }, [pessoas, busca, tipo]);

  const excluirPessoa = async (pessoa) => {
    try {
      await api.delete(`/pessoa/${pessoa.id}`);
      setPessoas((lista) => lista.filter((item) => item.id !== pessoa.id));

      toaster.create({
        title: 'Pessoa excluída',
        description: 'Registro removido com sucesso.',
        type: 'success',
        meta: { closable: true },
      });
    } catch (error) {
      console.error('Erro ao excluir pessoa:', error);
      toaster.create({
        title: 'Erro ao excluir',
        description: error.response?.data?.message || 'Não foi possível remover esta pessoa.',
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
                Pessoas
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="#4c3b29"
              >
                Consulte clientes e administradores cadastrados.
              </Text>
            </Box>

            <Button
              as={NextLink}
              href="/admin/pessoas/novo"
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
              NOVA PESSOA
            </Button>
          </Flex>

          <Flex gap={4} direction={{ base: 'column', md: 'row' }} mb={8}>
            <Input
              placeholder="Buscar por nome, e-mail ou telefone"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              bg="transparent"
              border="none"
              borderBottom="1px solid #c8c0ad"
              borderRadius="none"
              _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
            />

            <HStack gap={2} wrap="wrap">
              {[
                { label: 'TODOS', value: '' },
                { label: 'CLIENTES', value: '1' },
                { label: 'ADMINS', value: '2' },
              ].map(({ label, value }) => (
                <Button
                  key={value}
                  bg={tipo === value ? '#112a21' : 'transparent'}
                  color={tipo === value ? 'white' : '#112a21'}
                  border="1px solid #112a21"
                  borderRadius="none"
                  h="38px"
                  px={5}
                  fontSize="10px"
                  fontWeight="bold"
                  letterSpacing="widest"
                  onClick={() => setTipo(value)}
                  _hover={{ bg: '#112a21', color: 'white' }}
                >
                  {label}
                </Button>
              ))}
            </HStack>
          </Flex>

          <Box h="1px" bg="#9c8b6e" mb={8} />

          {carregando ? (
            <Flex py={20} justify="center">
              <Spinner color="#0f2b1d" size="xl" />
            </Flex>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={6}>
              {pessoasFiltradas.map((pessoa) => (
                <PessoaCard key={pessoa.id} pessoa={pessoa} onExcluir={excluirPessoa} />
              ))}
            </SimpleGrid>
          )}

          {!carregando && pessoasFiltradas.length === 0 && (
            <Box py={16} textAlign="center">
              <Text color="gray.600">Nenhuma pessoa encontrada.</Text>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

function PessoaCard({ pessoa, onExcluir }) {
  const [confirmando, setConfirmando] = useState(false);
  const tipoLabel = pessoa.tipoPessoa === 2 ? 'ADMIN' : 'CLIENTE';

  return (
    <Box bg="#fdfaf3" border="1px solid #d6c7aa" p={6}>
      <Flex justify="space-between" align="flex-start" gap={4} mb={4}>
        <Heading fontFamily="var(--font-cormorant-garamond)" fontSize="3xl" color="#1a1a1a">
          {pessoa.nome}
        </Heading>

        <Badge bg={pessoa.tipoPessoa === 2 ? '#112a21' : '#7a6242'} color="white" borderRadius="none">
          {tipoLabel}
        </Badge>
      </Flex>

      <Text color="#4c3b29" mb={2}>{pessoa.email}</Text>
      <Text color="#7a6242" fontSize="sm" mb={6}>{pessoa.telefone || 'Telefone não informado'}</Text>

      {!confirmando ? (
        <Flex gap={3}>
          <Button
            as={NextLink}
            href={`/admin/pessoas/${pessoa.id}`}
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
            onClick={() => setConfirmando(true)}
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
      ) : (
        <Flex gap={3} align="center">
          <Text fontSize="xs" color="#7a1f1f" fontWeight="bold" flex={1}>
            Confirmar exclusão?
          </Text>
          <Button
            onClick={() => { onExcluir(pessoa); setConfirmando(false); }}
            bg="#7a1f1f"
            color="white"
            borderRadius="none"
            size="sm"
          >
            SIM
          </Button>
          <Button
            onClick={() => setConfirmando(false)}
            variant="outline"
            borderColor="#1a1a1a"
            color="#1a1a1a"
            borderRadius="none"
            size="sm"
          >
            NÃO
          </Button>
        </Flex>
      )}
    </Box>
  );
}
