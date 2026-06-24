'use client';

import NextLink from 'next/link';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Stack,
  Text,
  FileUpload,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/utils/axios';
import { AdminHeader } from '@/components/AdminHeader';
import { FormField } from '@/components/FormField';
import { toaster } from '@/components/ui/toaster';
import { getUsuarioDoToken } from '@/utils/auth';

export default function EditAutomovelAdminPage() {
  const { id } = useParams();
  const router = useRouter();

  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [imagens, setImagens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxImageSize = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    const usuario = getUsuarioDoToken();

    if (!usuario) {
      router.push('/login');
      return;
    }

    if (usuario.tipoPessoa !== 2) {
      router.push('/home');
      return;
    }

    const carregarAutomovel = async () => {
      try {
        const response = await api.get(`/automoveis/${id}`);
        const automovel = response.data.data;

        if (automovel) {
          setPlaca(automovel.placa || '');
          setMarca(automovel.marca || '');
          setModelo(automovel.modelo || '');
          setAno(String(automovel.ano || ''));
          setCor(automovel.cor || '');
        }
      } catch (error) {
        console.error('Erro ao carregar automóvel:', error);
        toaster.create({
          title: 'Erro ao carregar veículo',
          description: 'Não foi possível buscar os dados do automóvel.',
          type: 'error',
          meta: { closable: true },
        });
      } finally {
        setCarregando(false);
      }
    };

    if (id) {
      carregarAutomovel();
    }
  }, [id, router]);

  const handleFileChange = (event) => {
    const files = event.target?.files || event.dataTransfer?.files;
    if (!files || files.length === 0) {
      return;
    }

    const selectedFiles = Array.from(files);
    const validFiles = [];
    const invalidMessages = [];

    selectedFiles.forEach((file) => {
      if (!allowedImageTypes.includes(file.type)) {
        invalidMessages.push(`${file.name} não é um formato aceito.`);
        return;
      }

      if (file.size > maxImageSize) {
        invalidMessages.push(`${file.name} excede o limite de 5MB.`);
        return;
      }

      validFiles.push(file);
    });

    if (invalidMessages.length > 0) {
      toaster.create({
        title: 'Arquivo inválido',
        description: invalidMessages.join(' '),
        type: 'error',
        meta: { closable: true },
      });
    }

    if (validFiles.length > 0) {
      setImagens((prev) => [...prev, ...validFiles].slice(0, 10));
    }
  };

  const removerImagem = (index) => {
    setImagens((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSalvar = async () => {
    if (salvando) return;

    const placaLimpa = placa.trim().toUpperCase();
    const marcaLimpa = marca.trim();
    const modeloLimpo = modelo.trim();
    const corLimpa = cor.trim();
    const anoNumero = Number(ano);

    if (!placaLimpa || !marcaLimpa || !modeloLimpo || !corLimpa || !ano) {
      toaster.create({
        title: 'Campos obrigatórios',
        description: 'Preencha placa, marca, modelo, ano e cor.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    if (placaLimpa.length !== 7) {
      toaster.create({
        title: 'Placa inválida',
        description: 'A placa deve conter 7 caracteres, sem traço.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    if (!anoNumero || anoNumero < 1900 || anoNumero > new Date().getFullYear() + 1) {
      toaster.create({
        title: 'Ano inválido',
        description: 'Informe um ano válido para o veículo.',
        type: 'warning',
        meta: { closable: true },
      });
      return;
    }

    try {
      setSalvando(true);
      await api.patch(`/automoveis/${id}`, {
        placa: placaLimpa,
        marca: marcaLimpa,
        modelo: modeloLimpo,
        ano: anoNumero,
        cor: corLimpa,
      });

      if (imagens.length > 0) {
        const formDataFotos = new FormData();
        imagens.forEach((imagem) => {
          if (imagem instanceof File) {
            formDataFotos.append('fotos', imagem, imagem.name);
          }
        });

        try {
          await api.post(`/automoveis/${id}/fotos`, formDataFotos);
        } catch (fotoError) {
          console.error('Erro ao enviar fotos:', fotoError.response?.data || fotoError.message);
          toaster.create({
            title: 'Erro ao enviar fotos',
            description: fotoError.response?.data?.message || fotoError.message,
            type: 'error',
            meta: { closable: true },
          });
        }
      }

      toaster.create({
        title: 'Automóvel atualizado',
        description: imagens.length > 0 ? 'Os dados e fotos do veículo foram salvos com sucesso.' : 'Os dados do veículo foram salvos com sucesso.',
        type: 'success',
        meta: { closable: true },
      });

      router.push('/admin/automoveis');
    } catch (error) {
      console.error('Erro ao atualizar automóvel:', error.response?.data || error.message);
      toaster.create({
        title: 'Erro ao atualizar',
        description: error.response?.data?.message || error.message || 'Tente novamente mais tarde.',
        type: 'error',
        meta: { closable: true },
      });
    } finally {
      setSalvando(false);
    }
  };

  return (
    <>
      <AdminHeader />

      <Box minH="100vh" bg="#f9f7f2" pt="85px">
        <Box px={{ base: 6, lg: 14 }} py={{ base: 10, lg: 14 }}>
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', lg: 'flex-end' }}
            direction={{ base: 'column', lg: 'row' }}
            gap={6}
            mb={8}
          >
            <Box>
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" color="#7a6242" mb={4}>
                EDITAR AUTOMÓVEL
              </Text>

              <Heading
                fontFamily="var(--font-cormorant-garamond)"
                fontSize={{ base: '5xl', lg: '7xl' }}
                lineHeight="0.95"
                color="#1a1a1a"
                mb={4}
              >
                Atualizar veículo
              </Heading>

              <Text
                fontFamily="var(--font-cormorant-garamond)"
                fontStyle="italic"
                fontSize={{ base: 'lg', lg: 'xl' }}
                color="#4c3b29"
              >
                Faça ajustes no cadastro do automóvel antes de voltar ao showroom.
              </Text>
            </Box>
          </Flex>

          {carregando ? (
            <Flex py={20} justify="center">
              <Spinner color="#0f2b1d" size="xl" />
            </Flex>
          ) : (
            <Stack spacing={6} maxW="720px">
              <FormField label="Placa">
                <Input
                  placeholder="ABC1234"
                  value={placa}
                  onChange={(e) => setPlaca(e.target.value)}
                  borderRadius="none"
                  border="1px solid #c8c0ad"
                  _focus={{ boxShadow: 'none', borderColor: '#0f2b1d' }}
                />
              </FormField>

              <FormField label="Marca">
                <Input
                  placeholder="Chevrolet"
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                  borderRadius="none"
                  border="1px solid #c8c0ad"
                  _focus={{ boxShadow: 'none', borderColor: '#0f2b1d' }}
                />
              </FormField>

              <FormField label="Modelo">
                <Input
                  placeholder="Corvette"
                  value={modelo}
                  onChange={(e) => setModelo(e.target.value)}
                  borderRadius="none"
                  border="1px solid #c8c0ad"
                  _focus={{ boxShadow: 'none', borderColor: '#0f2b1d' }}
                />
              </FormField>

              <FormField label="Ano">
                <Input
                  placeholder="1985"
                  type="number"
                  value={ano}
                  onChange={(e) => setAno(e.target.value)}
                  borderRadius="none"
                  border="1px solid #c8c0ad"
                  _focus={{ boxShadow: 'none', borderColor: '#0f2b1d' }}
                />
              </FormField>

              <FormField label="Cor">
                <Input
                  placeholder="Vermelho"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                  borderRadius="none"
                  border="1px solid #c8c0ad"
                  _focus={{ boxShadow: 'none', borderColor: '#0f2b1d' }}
                />
              </FormField>

              <FormField label="Adicionar fotos (opcional)">
                <FileUpload.Root
                  maxW="xl"
                  alignItems="stretch"
                  maxFiles={10}
                  onChange={handleFileChange}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Dropzone
                    bg="transparent"
                    border="2px dashed #c8c0ad"
                    borderRadius="4px"
                    p={6}
                    _hover={{ borderColor: '#0f2b1d', bg: '#f5f2eb' }}
                  >
                    <Flex direction="column" align="center" justify="center" gap={2}>
                      <Text fontSize="sm" color="#4c3b29" fontWeight="500">
                        Arraste imagens aqui ou clique para selecionar
                      </Text>
                      <Text fontSize="xs" color="#7a6242">
                        .png, .jpg até 10 fotos
                      </Text>
                    </Flex>
                  </FileUpload.Dropzone>
                  <FileUpload.List />
                </FileUpload.Root>

                {imagens.length > 0 && (
                  <Box mt={4}>
                    <Text fontSize="sm" fontWeight="bold" color="#2d241b" mb={3}>
                      Fotos para adicionar ({imagens.length}/10):
                    </Text>
                    <Stack spacing={2}>
                      {imagens.map((imagem, index) => (
                        <Flex
                          key={index}
                          justify="space-between"
                          align="center"
                          bg="#fdfaf3"
                          p={3}
                          border="1px solid #d6c7aa"
                        >
                          <Flex align="center" gap={3}>
                            {imagem instanceof File && (
                              <Box
                                as="img"
                                src={URL.createObjectURL(imagem)}
                                alt={`Preview ${index + 1}`}
                                h="50px"
                                w="50px"
                                objectFit="cover"
                                borderRadius="4px"
                              />
                            )}
                            <Box>
                              <Text fontSize="sm" fontWeight="500" color="#1a1a1a" noOfLines={1}>
                                {imagem.name || `Foto ${index + 1}`}
                              </Text>
                              <Text fontSize="xs" color="#7a6242">
                                {imagem.size && `${(imagem.size / 1024).toFixed(2)} KB`}
                              </Text>
                            </Box>
                          </Flex>
                          <Button
                            size="sm"
                            variant="ghost"
                            color="#7a1f1f"
                            onClick={() => removerImagem(index)}
                            _hover={{ bg: '#fce9e9' }}
                          >
                            Remover
                          </Button>
                        </Flex>
                      ))}
                    </Stack>
                  </Box>
                )}
              </FormField>

              <Flex gap={4} direction={{ base: 'column', md: 'row' }}>
                <Button
                  onClick={handleSalvar}
                  loading={salvando}
                  flex={1}
                  bg="#112a21"
                  color="white"
                  borderRadius="none"
                  h="56px"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  _hover={{ bg: '#1a3e31' }}
                >
                  SALVAR ALTERAÇÕES
                </Button>

                <Button
                  as={NextLink}
                  href="/admin/automoveis"
                  flex={1}
                  variant="outline"
                  borderColor="#112a21"
                  color="#112a21"
                  borderRadius="none"
                  h="56px"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  _hover={{ bg: '#112a21', color: 'white' }}
                >
                  VOLTAR
                </Button>
              </Flex>
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
}
