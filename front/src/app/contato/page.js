'use client';

import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function ContatoPage() {
  const [modalAberto, setModalAberto] = useState(false);

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
            "Fale conosco e encontre o clássico que combina com sua história."
          </Text>

          <Button
            mt={10}
            bg="#f9f7f2"
            color="#0f2b1d"
            borderRadius="none"
            h="52px"
            px={8}
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="widest"
            onClick={() => setModalAberto(true)}
            _hover={{ bg: '#e7dfcf' }}
          >
            ABRIR CONTATOS
          </Button>
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
            Contato
          </Heading>

          <Text
            fontSize="sm"
            color="gray.500"
            fontFamily="var(--font-inter)"
            mb={10}
            lineHeight="tall"
          >
            Entre em contato pelos nossos canais oficiais.
          </Text>

          <Flex direction="column" gap={8}>
            <Box>
              <Text fontSize="9px" fontWeight="bold" letterSpacing="widest" color="#888">
                WHATSAPP
              </Text>
              <Link
                href="https://wa.me/5549999097546"
                target="_blank"
                color="#0f2b1d"
                fontSize="lg"
                fontWeight="600"
              >
                +55 (49) 99909-7546
              </Link>
            </Box>

            <Box>
              <Text fontSize="9px" fontWeight="bold" letterSpacing="widest" color="#888">
                INSTAGRAM
              </Text>
              <Link
                href="https://instagram.com/flow_motors"
                target="_blank"
                color="#0f2b1d"
                fontSize="lg"
                fontWeight="600"
              >
                @flow_motors
              </Link>
            </Box>

            <Box>
              <Text fontSize="9px" fontWeight="bold" letterSpacing="widest" color="#888">
                FACEBOOK
              </Text>
              <Link
                href="https://facebook.com/FlowMotors"
                target="_blank"
                color="#0f2b1d"
                fontSize="lg"
                fontWeight="600"
              >
                Flow Motors
              </Link>
            </Box>
          </Flex>
        </Box>
      </Flex>

      {modalAberto && (
        <Flex
          position="fixed"
          inset={0}
          bg="rgba(10, 31, 21, 0.72)"
          zIndex={50}
          align="center"
          justify="center"
          px={6}
        >
          <Box
            bg="#f9f7f2"
            border="1px solid #d6c7aa"
            boxShadow="0 24px 80px rgba(0,0,0,0.35)"
            w="100%"
            maxW="520px"
            p={{ base: 7, md: 9 }}
          >
            <Flex justify="space-between" align="flex-start" gap={6} mb={8}>
              <Box>
                <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={3}>
                  CANAIS OFICIAIS
                </Text>

                <Heading
                  fontFamily="var(--font-cormorant-garamond)"
                  fontSize={{ base: '4xl', md: '5xl' }}
                  color="#1a1a1a"
                  lineHeight="1"
                >
                  Contato
                </Heading>
              </Box>

              <Button
                onClick={() => setModalAberto(false)}
                variant="ghost"
                color="#1a1a1a"
                fontSize="lg"
                minW="40px"
                h="40px"
                borderRadius="none"
                _hover={{ bg: '#e7dfcf' }}
              >
                X
              </Button>
            </Flex>

            <Flex direction="column" gap={6}>
              <ContatoLink
                label="WHATSAPP"
                href="https://wa.me/5549999097546"
                texto="+55 (49) 99909-7546"
              />

              <ContatoLink
                label="INSTAGRAM"
                href="https://instagram.com/flow_motors"
                texto="@flow_motors"
              />

              <ContatoLink
                label="FACEBOOK"
                href="https://facebook.com/FlowMotors"
                texto="Flow Motors"
              />
            </Flex>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

function ContatoLink({ label, href, texto }) {
  return (
    <Box borderTop="1px solid #d6c7aa" pt={5}>
      <Text fontSize="9px" fontWeight="bold" letterSpacing="widest" color="#888" mb={1}>
        {label}
      </Text>

      <Link
        href={href}
        target="_blank"
        color="#0f2b1d"
        fontSize="lg"
        fontWeight="600"
        _hover={{ color: '#235a40' }}
      >
        {texto}
      </Link>
    </Box>
  );
}
