'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminPessoaInput from '@/components/AdminPessoaInput';
import { toaster } from '@/components/ui/toaster';
import api from '@/utils/axios';

export default function NovaPessoaAdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    const dadosToken = JSON.parse(atob(token.split('.')[1]));

    if (dadosToken.tipoPessoa !== 2) {
      router.push('/');
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
      }
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
      toaster.create({
        title: 'Erro ao cadastrar pessoa',
        description: error.response?.data?.message || 'Verifique os dados e tente novamente.',
        type: 'error',
        meta: { closable: true },
      });
    }
  };

  return (
    <Flex w="100vw" minH="100vh" direction={{ base: 'column', lg: 'row' }}>
      <Box
        w={{ base: '100%', lg: '63%' }}
        minH={{ base: '40vh', lg: '100vh' }}
        bg="#0a1f15"
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        px={14}
        textAlign="center"
      >
        <Box
          position="absolute"
          inset={0}
          bg="rgba(10, 31, 21, 0.82)"
          zIndex={1}
        />

        <Box zIndex={2}>
          <Heading
            as="div"
            fontFamily="var(--font-cormorant-garamond)"
            fontSize={{ base: '5xl', lg: '7xl' }}
            fontWeight="700"
            color="white"
            letterSpacing="widest"
            lineHeight="1"
            mb={8}
          >
            FLOW<br />MOTORS
          </Heading>

          <Box w="50px" h="1px" bg="rgba(255,255,255,0.4)" mx="auto" mb={8} />

          <Text
            fontFamily="var(--font-cormorant-garamond)"
            fontStyle="italic"
            fontSize={{ base: 'lg', lg: 'xl' }}
            color="rgba(255,255,255,0.85)"
            maxW="380px"
            lineHeight="1.6"
          >
            "Administre os acessos da concessionária com cuidado e precisão."
          </Text>
        </Box>
      </Box>

      <Flex
        w={{ base: '100%', lg: '37%' }}
        minH={{ base: 'auto', lg: '100vh' }}
        bg="#f9f7f2"
        flexDirection="column"
        justify="space-between"
        px={{ base: 8, lg: 10 }}
        py={{ base: 12, lg: 16 }}
      >
        <Text
          fontFamily="var(--font-cormorant-garamond)"
          fontSize="xl"
          fontWeight="600"
          letterSpacing="widest"
          color="#1a1a1a"
          mb={12}
        >
          FLOW MOTORS
        </Text>

        <Box flex={1} maxW="480px">
          <Heading
            as="h1"
            fontFamily="var(--font-cormorant-garamond)"
            fontSize={{ base: '4xl', lg: '5xl' }}
            fontWeight="500"
            color="#1a1a1a"
            mb={3}
          >
            Nova Pessoa
          </Heading>

          <Text
            fontSize="sm"
            color="gray.500"
            fontFamily="var(--font-inter)"
            mb={10}
            lineHeight="tall"
          >
            Cadastre clientes ou administradores autorizados no sistema.
          </Text>

          <AdminPessoaInput onSubmit={handleCreatePessoa} />
        </Box>
      </Flex>
    </Flex>
  );
}