'use client';

import { Box, Input, Stack, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { PasswordInput } from '@/components/ui/password-input';

export default function RegisterInput({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputStyle = {
    borderRadius: 'none',
    border: 'none',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'brand.sand',
    bg: 'transparent',
    h: '44px',
    px: 0,
    fontSize: 'sm',
    color: 'brand.ink',
    fontFamily: 'var(--font-inter)',
    letterSpacing: '0.03em',
    _placeholder: { color: '#aaa', fontSize: 'sm', letterSpacing: '0.05em' },
    _focus: { outline: 'none', borderBottomColor: 'brand.accentHover', boxShadow: 'none' },
    _focusVisible: { outline: 'none', borderBottomColor: 'brand.accentHover', boxShadow: 'none' },
  };

  const labelStyle = {
    fontSize: '9px',
    fontWeight: 'bold',
    letterSpacing: 'widest',
    color: '#888',
    fontFamily: 'var(--font-inter)',
    mb: 1,
    textTransform: 'uppercase',
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    if (!nome || !email || !senha) {
      alert('Preencha os campos obrigatórios: Nome, E-mail e Senha.');
      return;
    }
    setIsSubmitting(true);
    if (onSubmit) {
      await onSubmit({ nome, email, telefone, senha });
    }
    setIsSubmitting(false);
  };

  return (
    <Stack gap={8} w="100%">
      <Box>
        <Text {...labelStyle}>NOME COMPLETO</Text>
        <Input
          placeholder="ALEXANDER VANDERBILT"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          {...inputStyle}
        />
      </Box>

      <Box>
        <Text {...labelStyle}>ENDEREÇO DE E-MAIL</Text>
        <Input
          type="email"
          placeholder="ALEX@FLOWMOTORS.COM"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          {...inputStyle}
        />
      </Box>

      <Box>
        <Text {...labelStyle}>TELEFONE</Text>
        <Input
          placeholder="+55 (11) 00000-0000"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          {...inputStyle}
        />
      </Box>

      <Box>
        <Text {...labelStyle}>SENHA</Text>
        <PasswordInput
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          {...inputStyle}
        />
      </Box>

      <Button
        mt={4}
        bg="brand.accent"
        color="white"
        borderRadius="none"
        h="56px"
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="widest"
        fontFamily="var(--font-inter)"
        transition="all 0.3s"
        loading={isSubmitting}
        onClick={handleSubmit}
        _hover={{ bg: 'brand.accentHover', transform: 'translateY(-1px)', boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }}
      >
        CONFIRMAR
      </Button>
    </Stack>
  );
}
