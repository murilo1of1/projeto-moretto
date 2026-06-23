'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import LoginInput from '@/components/LoginInput';
import { toaster } from '@/components/ui/toaster';
import api from '@/utils/axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async ({ email, senha }) => {
    try {
      const response = await api.post('/login', {
        email,
        password: senha,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.response);
        const dadosToken = JSON.parse(atob(response.data.response.split('.')[1]));
        const destino = dadosToken.tipoPessoa === 2 ? '/admin' : '/home';

        toaster.create({
          title: 'Bem-vindo de volta!',
          description: 'Login realizado com sucesso.',
          type: 'success',
          meta: { closable: true },
        });
        setTimeout(() => router.push(destino), 1500);
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toaster.create({
        title: 'Falha na autenticação',
        description: error.response?.data?.message || 'E-mail ou senha incorretos.',
        type: 'error',
        meta: { closable: true },
      });
    }
  };

  return (
    <Flex w="100vw" minH="100vh" direction={{ base: 'column', lg: 'row' }}>
      {/* Lado Esquerdo: Identidade Visual */}
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
            "Onde a engenharia encontra a imortalidade. Acesse sua coleção privada."
          </Text>
        </Box>
      </Box>

      {/* Lado Direito: Formulário */}
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
            Entrar
          </Heading>
          <Text
            fontSize="sm"
            color="gray.500"
            fontFamily="var(--font-inter)"
            mb={10}
            lineHeight="tall"
          >
            Bem-vindo de volta. Por favor, insira suas credenciais.
          </Text>

          <LoginInput onSubmit={handleLogin} />

          <Box mt={8}>
            <Text fontSize="xs" color="gray.500" fontFamily="var(--font-inter)">
              NÃO TEM UMA CONTA?{' '}
              <Link href="/register" style={{ fontWeight: 'bold', color: '#1a1a1a', textDecoration: 'underline' }}>
                CRIE SEU REGISTRO
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}
