import React, { useState } from 'react';
import { Flex, Input, Text, Stack, IconButton } from '@chakra-ui/react'; // Importações para a UI da busca
import { LuSearch } from "react-icons/lu"

interface SuggestionSearchProps {
    onSearch: (searchTerm: string) => void;
}

export function SuggestionSearch({ onSearch }: SuggestionSearchProps) {
    const [inputValue, setInputValue] = useState<string>('');
    const [inputError, setInputError] = useState<string | null>(null);

    const handleSearchClick = () => {
        if (inputValue && !/^\d{6}$/.test(inputValue)) {
            setInputError('O código de erro deve ter 6 dígitos');
            return;
        }
        setInputError(null);
        onSearch(inputValue);
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
                    _placeholder={{ color: "#DCDCDC" }}
                    maxLength={6}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                        if (inputError) setInputError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    flex="1"
                />
                <IconButton onClick={handleSearchClick}>
                    <LuSearch/>
                </IconButton>
            </Flex>
            {inputError &&
                <Text color="red.500" fontSize="sm">{inputError}</Text>}
        </Stack>
    );
}