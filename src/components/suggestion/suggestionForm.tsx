// Importações necessárias do React, componentes customizados, Chakra UI e API.
import React, { useState } from 'react';
import { Box, Input, Textarea, VStack, Text, Button } from '@chakra-ui/react';

type Props = {
    create: (data: { errorCode: string; text: string }) => Promise<void>; // Função para criar sugestão
    response?: any; // Resposta opcional da API (não usada aqui, mas pode ser útil)
}

// Componente para registrar uma nova sugestão.
function SuggestionForm({ create }: Props) {
    // Estados para controlar os inputs do formulário e o feedback ao usuário.
    const [errorCode, setErrorCode] = useState(''); // Input: Código de erro
    const [text, setText] = useState('');           // Input: Texto da sugestão
    const [formError, setFormError] = useState<string | null>(null); // Mensagem de erro do formulário/API

    // Lida com o envio do formulário.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Previne recarregamento da página.
        setFormError(null);     // Limpa erros anteriores.

        // Validações dos campos.
        if (!/^\d{6}$/.test(errorCode)) {
            setFormError('O código de erro deve ter 6 dígitos');
            return;
        }
        if (text.trim().length === 0) {
            setFormError('O campo de texto não pode estar vazio');
            return;
        }

        try {
            await create({ errorCode, text });
            // Limpa formulário e exibe mensagem de sucesso.
            setErrorCode('');
            setText('');
        } catch (err: any) {
            // Exibe mensagem de erro e limpa mensagem de sucesso.
            setFormError(err.message || 'Ocorreu um erro ao cadastrar a sugestão.');
        }
    }

    // Estrutura visual do componente.
    return (
        <>
            <Box as="form" onSubmit={handleSubmit} width="100%"> {/* Formulário */}
                <VStack gap={4} mb={4}> {/* Agrupamento vertical dos inputs */}
                    <Input // Campo para o código de erro.
                        placeholder="Código de erro (6 dígitos)"
                        value={errorCode}
                        onChange={(e) => setErrorCode(e.target.value)}
                        maxLength={6}
                    />
                    <Textarea // Campo para o texto da sugestão.
                        placeholder="Texto da sugestão"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => { // Permite enviar com Enter.
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit(e as any);
                            }
                        }}
                        rows={4}
                    />
                    <Button width="20rem" onClick={handleSubmit}> {/* Botão de envio */}
                        Cadastrar sugestão
                    </Button>

                    {/* Exibe mensagem de erro, se houver. */}
                    {formError && <Text color="red.500">{formError}</Text>}
                </VStack>
            </Box>
        </>
    );
}

export default SuggestionForm;