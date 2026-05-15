'use client';

import { Box, Input, Stack, Button, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { PasswordInput } from '@/components/ui/password-input';

export default function LoginInput({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputStyle = {
    borderRadius: 'none',
    border: 'none',
    borderBottom: '1px solid #c8c8b8',
    bg: 'transparent',
    h: '44px',
    px: 0,
    fontSize: 'sm',
    color: '#1a1a1a',
    fontFamily: 'var(--font-inter)',
    letterSpacing: '0.03em',
    _placeholder: { color: '#aaa', fontSize: 'sm', letterSpacing: '0.05em' },
    _focus: { outline: 'none', borderBottom: '1px solid #235a40', boxShadow: 'none' },
    _focusVisible: { outline: 'none', borderBottom: '1px solid #235a40', boxShadow: 'none' },
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
    if (!email || !senha) {
      alert('Preencha os campos obrigatórios: E-mail e Senha.');
      return;
    }
    setIsSubmitting(true);
    if (onSubmit) {
      await onSubmit({ email, senha });
    }
    setIsSubmitting(false);
  };

  return (
    <Stack spacing={8} w="100%">
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
        bg="#0f2b1d"
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
        _hover={{ bg: '#235a40', transform: 'translateY(-1px)', boxShadow: '0 6px 16px rgba(0,0,0,0.18)' }}
      >
        ENTRAR
      </Button>
    </Stack>
  );
}
