'use client';

import { Box, Button, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/axios';
import { toaster } from '@/components/ui/toaster';

export default function NovoAutomovelPage() {
  const router = useRouter();

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    if (!placa || !marca || !modelo || !ano || !cor) {
      toaster.create({
        title: 'Preencha todos os campos',
        type: 'error',
        meta: { closable: true },
      });
      return;
    }

    try {
      setIsSubmitting(true);

      await api.post('/automovel', {
        placa,
        marca,
        modelo,
        ano: Number(ano),
        cor,
      });

      toaster.create({
        title: 'Automóvel cadastrado com sucesso!',
        type: 'success',
        meta: { closable: true },
      });

      setPlaca('');
      setMarca('');
      setModelo('');
      setAno('');
      setCor('');
    } catch (error) {
      toaster.create({
        title: 'Erro ao cadastrar automóvel',
        description: error.response?.data?.message || 'Tente novamente.',
        type: 'error',
        meta: { closable: true },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex minH="100vh" bg="#f9f7f2" align="center" justify="center" px={8}>
      <Box w="100%" maxW="520px">
        <Heading
          as="h1"
          fontFamily="var(--font-cormorant-garamond)"
          fontSize="5xl"
          fontWeight="500"
          color="#1a1a1a"
          mb={3}
        >
          Novo Automóvel
        </Heading>

        <Text
          fontSize="sm"
          color="gray.500"
          fontFamily="var(--font-inter)"
          mb={10}
        >
          Cadastre um veículo clássico no acervo da concessionária.
        </Text>

        <Stack spacing={8}>
          <Input placeholder="PLACA" value={placa} onChange={(e) => setPlaca(e.target.value)} />
          <Input placeholder="MARCA" value={marca} onChange={(e) => setMarca(e.target.value)} />
          <Input placeholder="MODELO" value={modelo} onChange={(e) => setModelo(e.target.value)} />
          <Input placeholder="ANO" type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
          <Input placeholder="COR" value={cor} onChange={(e) => setCor(e.target.value)} />

          <Button
            bg="#0f2b1d"
            color="white"
            borderRadius="none"
            h="56px"
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            loading={isSubmitting}
            onClick={handleSubmit}
            _hover={{ bg: '#235a40' }}
          >
            CADASTRAR AUTOMÓVEL
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}