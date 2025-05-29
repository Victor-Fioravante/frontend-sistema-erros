// src/components/suggestion/suggestionSearch.tsx
import React, { useState } from 'react';
import { Flex, Input, Button, Text, Stack } from '@chakra-ui/react'; // Importações para a UI da busca

interface SuggestionSearchProps {
    onSearch: (searchTerm: string) => void; // Função chamada ao buscar
}

export function SuggestionSearch({ onSearch }: SuggestionSearchProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [inputError, setInputError] = useState<string | null>(null);

    const handleSearchClick = () => {
        // Valida se o termo de busca, se preenchido, tem 6 dígitos.
        if (inputValue && !/^\d{6}$/.test(inputValue)) {
            setInputError('O código de erro deve ter 6 dígitos');
            return; 
        }
        setInputError(null); // Limpa erro de validação
        onSearch(inputValue); // Chama a função de busca
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearchClick();
        }
    };

    return (
        <Stack gap={2} w="100%">
            <Flex gap={2}>
                <Input
                    placeholder="Buscar por código de erro (6 dígitos)"
                    value={inputValue}
                    maxLength={6}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        if (inputError) setInputError(null); // Limpa erro ao digitar
                    }}
                    onKeyDown={handleKeyDown}
                    flex="1"
                />
                <Button onClick={handleSearchClick}>
                    Buscar
                </Button>
            </Flex>
            {inputError && 
            <Text color="red.500" fontSize="sm">{inputError}</Text>}
        </Stack>
    );
}