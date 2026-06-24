'use client';

import NextLink from 'next/link';
import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPessoaInput from '@/components/AdminPessoaInput';
import { AdminHeader } from '@/components/AdminHeader';
import { FormPanel } from '@/components/FormPanel';
import { toaster } from '@/components/ui/toaster';
import api from '@/utils/axios';
import { getUsuarioDoToken } from '@/utils/auth';

export default function NovaPessoaAdminPage() {
  const router = useRouter();

  useEffect(() => {
    const usuario = getUsuarioDoToken();

    if (!usuario) {
      router.push('/login');
      return;
    }

    if (usuario.tipoPessoa !== 2) {
      router.push('/home');
    }
  }, [router]);

  const handleCreatePessoa = async ({ nome, email, telefone, senha, tipoPessoa }) => {
    try {
      const response = await api.post('/admin/pessoa', {
        nome,
        email,
        telefone,
        tipoPessoa,
        password: senha,
      });

      if (response.status === 200 || response.status === 201) {
        toaster.create({
          title: 'Pessoa cadastrada com sucesso!',
          description: tipoPessoa === 2 ? 'Novo administrador criado.' : 'Novo cliente criado.',
          type: 'success',
          meta: { closable: true },
        });

        return true;
      }

      return false;
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
      toaster.create({
        title: 'Erro ao cadastrar pessoa',
        description: error.response?.data?.message || 'Verifique os dados e tente novamente.',
        type: 'error',
        meta: { closable: true },
      });

      return false;
    }
  };

  return (
    <>
      <AdminHeader />

      <Box
        minH="100vh"
        bg="#f9f7f2"
        px={{ base: 6, lg: 14 }}
        pt={{ base: '125px', lg: '141px' }}
        pb={{ base: 10, lg: 14 }}
      >
        <FormPanel
          eyebrow="ADMINISTRACAO"
          title="Nova pessoa"
          description="Cadastre clientes e administradores autorizados para operar ou acessar a experiencia Flow Motors."
          aside={
            <Button
              as={NextLink}
              href="/admin/pessoas"
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
              VER PESSOAS
            </Button>
          }
        >
          <Grid templateColumns={{ base: '1fr', lg: '1.1fr 0.9fr' }} gap={{ base: 8, lg: 12 }}>
            <AdminPessoaInput onSubmit={handleCreatePessoa} />

            <Box borderLeft={{ base: 'none', lg: '1px solid #d6c7aa' }} pl={{ base: 0, lg: 10 }}>
              <Text fontSize="10px" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={4}>
                REGRAS DE ACESSO
              </Text>

              <Text color="#4c3b29" lineHeight="1.8" mb={5}>
                Clientes acessam catalogo, area do usuario e agendamento de test drive.
              </Text>

              <Text color="#4c3b29" lineHeight="1.8">
                Administradores acessam o painel de gestao, cadastros e listagens internas.
              </Text>
            </Box>
          </Grid>
        </FormPanel>
      </Box>
    </>
  );
}
