import React, { useState } from 'react';
import { Box, Input, Textarea, VStack, Text, Button } from '@chakra-ui/react';

type Props = {
    create: (data: { errorCode: string; text: string }) => Promise<void>;
}

function SuggestionForm({ create }: Props) {
    const [errorCode, setErrorCode] = useState('');
    const [text, setText] = useState('');
    const [formError, setFormError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

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
            setErrorCode('');
            setText('');
        } catch (err: any) {
            setFormError(err.message || 'Ocorreu um erro ao cadastrar a sugestão.');
        }
    }

    return (
        <>
            <Box as="form" onSubmit={handleSubmit} width="100%">
                <VStack gap={4} mb={4}>
                    Insira o código de erro do governo e a sugestão de solução abaixo:
                    <Input
                        placeholder="Código de erro (6 dígitos)"
                        _placeholder={{ color: "#DCDCDC" }}
                        value={errorCode}
                        onChange={(e) => setErrorCode(e.target.value)}
                        maxLength={6}
                    />
                    <Textarea
                        placeholder="Texto da sugestão"
                        _placeholder={{ color: "#DCDCDC" }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleSubmit(e as any);
                            }
                        }}
                        rows={4}
                    />
                    <Button width="20rem" onClick={handleSubmit}>
                        Cadastrar sugestão
                    </Button>
                    {formError && <Text color="red.500">{formError}</Text>}
                </VStack>
            </Box>
        </>
    );
}

export default SuggestionForm;