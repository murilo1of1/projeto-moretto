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
  Spinner,
  Text,
} from '@chakra-ui/react';
import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import { AdminHeader } from '@/components/AdminHeader';
import { FormField } from '@/components/FormField';
import { toaster } from '@/components/ui/toaster';
import { getUsuarioDoToken } from '@/utils/auth';

export default function EditPessoaAdminPage({ params }) {
  const resolvedParams = use(params);
  const pessoaId = resolvedParams?.id;
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState(1);
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

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

    const carregarPessoa = async () => {
      try {
        const response = await api.get(`/pessoa/${pessoaId}`);
        const pessoa = response.data.data;
        if (pessoa) {
          setNome(pessoa.nome || '');
          setEmail(pessoa.email || '');
          setTelefone(pessoa.telefone || '');
          setTipoPessoa(pessoa.tipoPessoa || 1);
        }
      } catch (error) {
        console.error('Erro ao carregar pessoa:', error);
        toaster.create({
          title: 'Erro ao carregar pessoa',
          description: 'Não foi possível buscar os dados desta pessoa.',
          type: 'error',
          meta: { closable: true },
        });
      } finally {
        setCarregando(false);
      }
    };

    if (pessoaId) {
      carregarPessoa();
    }
  }, [pessoaId, router]);

  const handleSalvar = async () => {
    if (salvando) return;

    if (!nome.trim() || !email.trim()) {
      toaster.create({
        title: 'Campos obrigatórios',
        description: 'Nome e e-mail são obrigatórios.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    setSalvando(true);

    try {
      const payload = {
        nome: nome.trim(),
        email: email.trim(),
        telefone: telefone.trim(),
        tipoPessoa,
      };

      if (senha.trim()) {
        payload.password = senha.trim();
      }

      await api.patch(`/pessoa/${pessoaId}`, payload);

      toaster.create({
        title: 'Pessoa atualizada',
        description: 'Os dados foram salvos com sucesso.',
        type: 'success',
        meta: { closable: true },
      });

      router.push('/admin/pessoas');
    } catch (error) {
      console.error('Erro ao salvar pessoa:', error);
      toaster.create({
        title: 'Erro ao salvar',
        description: error.response?.data?.message || 'Verifique os dados e tente novamente.',
        type: 'error',
        meta: { closable: true },
      });
    } finally {
      setSalvando(false);
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
                EDITAR PESSOA
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="#1a1a1a"
                mb={4}
              >
                Atualizar cadastro
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="#4c3b29"
              >
                Edite os dados de login ou acesso do usuário.
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
          ) : (
            <Grid templateColumns={{ base: '1fr', lg: '1.1fr 0.9fr' }} gap={{ base: 8, lg: 12 }}>
              <Box>
                <FormField label="Nome completo">
                  <Input
                    placeholder="Nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    borderRadius="none"
                    border="none"
                    borderBottom="1px solid #c8c0ad"
                    bg="transparent"
                    h="44px"
                    px={0}
                    _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
                  />
                </FormField>

                <FormField label="E-mail">
                  <Input
                    type="email"
                    placeholder="usuario@flowmotors.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    borderRadius="none"
                    border="none"
                    borderBottom="1px solid #c8c0ad"
                    bg="transparent"
                    h="44px"
                    px={0}
                    _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
                  />
                </FormField>

                <FormField label="Telefone">
                  <Input
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    borderRadius="none"
                    border="none"
                    borderBottom="1px solid #c8c0ad"
                    bg="transparent"
                    h="44px"
                    px={0}
                    _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
                  />
                </FormField>

                <FormField label="Tipo de acesso">
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={tipoPessoa}
                      onChange={(e) => setTipoPessoa(Number(e.target.value))}
                      borderRadius="none"
                      border="none"
                      borderBottom="1px solid #c8c0ad"
                      bg="transparent"
                      h="44px"
                      px={0}
                      _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
                    >
                      <option value={1}>Cliente</option>
                      <option value={2}>Administrador</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </FormField>

                <FormField label="Senha (deixe em branco para manter)">
                  <Input
                    type="password"
                    placeholder="********"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    borderRadius="none"
                    border="none"
                    borderBottom="1px solid #c8c0ad"
                    bg="transparent"
                    h="44px"
                    px={0}
                    _focus={{ boxShadow: 'none', borderBottomColor: '#0f2b1d' }}
                  />
                </FormField>

                <Flex gap={4} mt={6} direction={{ base: 'column', md: 'row' }}>
                  <Button
                    as={NextLink}
                    href="/admin/pessoas"
                    variant="outline"
                    borderColor="#112a21"
                    color="#112a21"
                    borderRadius="none"
                    h="52px"
                    flex={1}
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="widest"
                    _hover={{ bg: '#112a21', color: 'white' }}
                  >
                    VOLTAR
                  </Button>
                  <Button
                    onClick={handleSalvar}
                    loading={salvando}
                    bg="#112a21"
                    color="white"
                    borderRadius="none"
                    h="52px"
                    flex={2}
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="widest"
                    _hover={{ bg: '#1a3e31' }}
                  >
                    SALVAR ALTERAÇÕES
                  </Button>
                </Flex>
              </Box>

              <Box borderLeft={{ base: 'none', lg: '1px solid #d6c7aa' }} pl={{ base: 0, lg: 10 }}>
                <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={4}>
                  INFORMAÇÕES
                </Text>
                <Text color="#4c3b29" lineHeight="1.8" mb={5}>
                  Atualize o perfil do usuário. A senha só será alterada se você preencher este campo.
                </Text>
                <Text color="#4c3b29" lineHeight="1.8">
                  Administradores têm acesso total ao painel e aos recursos de gestão.
                </Text>
              </Box>
            </Grid>
          )}
        </Box>
      </Box>
    </>
  );
}
