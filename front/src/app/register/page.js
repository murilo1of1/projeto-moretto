'use client';

import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import RegisterInput from '@/components/RegisterInput';
import { toaster } from '@/components/ui/toaster';
import api from '@/utils/axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({ nome, email, senha, telefone }) => {
    if (!nome || !email || !senha) {
      toaster.create({
        title: 'Preencha os campos obrigatórios',
        description: 'Nome, e-mail e senha são obrigatórios.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    try {
      const response = await api.post('/pessoa', {
        nome,
        email,
        telefone: telefone || null,
        password: senha,
      });

      if (response.status === 200 || response.status === 201) {
        toaster.create({
          title: 'Conta criada com sucesso!',
          description: 'Redirecionando para o login...',
          type: 'success',
          meta: { closable: true },
        });
        setTimeout(() => router.push('/login'), 1500);
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        'Verifique os dados e tente novamente.';

      toaster.create({
        title: 'Erro ao criar conta',
        description: errorMessage,
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
            "Não é apenas um carro. É o próximo capítulo da sua história."
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
            Criar Registro
          </Heading>
          <Text
            fontSize="sm"
            color="gray.500"
            fontFamily="var(--font-inter)"
            mb={10}
            lineHeight="tall"
          >
            Insira seus dados para iniciar sua jornada pela mais fina história automotiva.
          </Text>

          <RegisterInput onSubmit={handleRegister} />

          <Text mt={6} fontSize="sm" color="gray.600">
            Já tem conta?{' '}
            <Link as={NextLink} href="/login" color="#112a21" fontWeight="bold">
              Fazer login
            </Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
