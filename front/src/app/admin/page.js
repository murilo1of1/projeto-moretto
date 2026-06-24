'use client';

import NextLink from 'next/link';
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/AdminHeader';
import { getUsuarioDoToken } from '@/utils/auth';

export default function AdminPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);

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
  }, [router]);

  return (
    <>
      <AdminHeader />

      <Box minH="100vh" bg="brand.cream" pt="85px">
        <Box px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            mb={10}
          >
            <Box>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="brand.muted" mb={4}>
                PAINEL ADMINISTRATIVO
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="brand.ink"
                mb={4}
              >
                Gestão Flow Motors
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="brand.subtle"
              >
                Cadastre, acompanhe e organize a operação da concessionária.
              </Text>
            </Box>

            <Badge
              bg="brand.green"
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

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={7}>
            <AdminCard
              titulo="Cadastrar pessoas"
              texto="Crie clientes e administradores."
              href="/admin/pessoas/novo"
            />

            <AdminCard
              titulo="Visualizar pessoas"
              texto="Consulte, filtre e gerencie usuários."
              href="/admin/pessoas"
            />

            <AdminCard
              titulo="Cadastrar carros"
              texto="Adicione veículos ao acervo."
              href="/admin/automoveis/novo"
            />

            <AdminCard
              titulo="Visualizar carros"
              texto="Gerencie o showroom disponível."
              href="/admin/automoveis"
            />

            <AdminCard
              titulo="Test drives"
              texto="Acompanhe agendamentos e status."
              href="/admin/test-drives"
            />

            <AdminCard
              titulo="Voltar ao catálogo"
              texto="Veja a vitrine pública da Flow Motors."
              href="/home"
            />
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}

function AdminCard({ titulo, texto, href }) {
  return (
    <Box
      bg="brand.card"
      border="1px solid #d6c7aa"
      p={7}
      minH="220px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Heading
          fontFamily="var(--font-cormorant-garamond)"
          fontSize="3xl"
          fontWeight="600"
          color="brand.ink"
          mb={3}
        >
          {titulo}
        </Heading>

        <Text color="brand.subtle" lineHeight="1.7">
          {texto}
        </Text>
      </Box>

      <Button
        as={NextLink}
        href={href}
        variant="outline"
        borderColor="brand.green"
        color="brand.green"
        borderRadius="none"
        h="44px"
        mt={6}
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="widest"
        _hover={{ bg: 'brand.green', color: 'white' }}
      >
        ACESSAR
      </Button>
    </Box>
  );
}
