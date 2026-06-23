'use client';

import { Button, Input, NativeSelect, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { PasswordInput } from '@/components/ui/password-input';
import { FormField } from '@/components/FormField';
import { toaster } from '@/components/ui/toaster';

export default function AdminPessoaInput({ onSubmit }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoPessoa, setTipoPessoa] = useState(1);
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

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const emailValido = /\S+@\S+\.\S+/.test(email);

    if (!nome.trim() || !email.trim() || !senha.trim()) {
      toaster.create({
        title: 'Preencha os campos obrigatorios',
        description: 'Nome, e-mail e senha sao obrigatorios.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    if (!emailValido) {
      toaster.create({
        title: 'E-mail invalido',
        description: 'Informe um e-mail valido para continuar.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    if (senha.length < 6) {
      toaster.create({
        title: 'Senha curta',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    setIsSubmitting(true);

    const sucesso = await onSubmit?.({
      nome: nome.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      senha,
      tipoPessoa,
    });

    if (sucesso) {
      setNome('');
      setEmail('');
      setTelefone('');
      setSenha('');
      setTipoPessoa(1);
    }

    setIsSubmitting(false);
  };

  return (
    <Stack spacing={7} w="100%">
      <FormField label="Nome completo">
        <Input
          placeholder="ALEXANDER VANDERBILT"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          {...inputStyle}
        />
      </FormField>

      <FormField label="Endereco de e-mail">
        <Input
          type="email"
          placeholder="ALEX@FLOWMOTORS.COM"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          {...inputStyle}
        />
      </FormField>

      <FormField label="Telefone" helper="Campo opcional para contato comercial.">
        <Input
          placeholder="+55 (11) 00000-0000"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          {...inputStyle}
        />
      </FormField>

      <FormField label="Tipo de acesso">
        <NativeSelect.Root>
          <NativeSelect.Field
            value={tipoPessoa}
            onChange={(e) => setTipoPessoa(Number(e.target.value))}
            {...inputStyle}
          >
            <option value={1}>Cliente</option>
            <option value={2}>Administrador</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
      </FormField>

      <FormField label="Senha">
        <PasswordInput
          placeholder="********"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          {...inputStyle}
        />
      </FormField>

      <Button
        mt={3}
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
        CADASTRAR PESSOA
      </Button>
    </Stack>
  );
}
