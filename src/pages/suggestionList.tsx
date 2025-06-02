// src/pages/suggestionList.tsx
import { useEffect, useState } from 'react';
import { getSuggestions } from '../api';
import type { suggestion } from '../api';
import { Text, Stack } from '@chakra-ui/react';
import { SuggestionSearch } from '../components/suggestion/suggestionSearch';

import './suggestionRegisterStyle.css';
import { SuggestionItem } from '../components/suggestion/suggestionItem';

export function SuggestionList() {
    const [suggestions, setSuggestions] = useState<suggestion[]>([]);
    const [apiError, setApiError] = useState<string | null>(null);

    async function fetchSuggestionsData(errorCode?: string) {
        setApiError(null);
        try {
            const data = await getSuggestions(errorCode);
            setSuggestions(data);
        } catch (err: any) {
            setSuggestions([]);
            setApiError(err.message || 'Erro ao buscar sugestões.');
        }
    }

    useEffect(() => {
        fetchSuggestionsData();
    }, []);

    const handleSearchTrigger = (searchTerm: string) => {
        fetchSuggestionsData(searchTerm);
    };

    return (
        <Stack gap={4} p={4} style={{ width: '100%' }}>

            <SuggestionSearch onSearch={handleSearchTrigger} />
            {apiError && (
                <Text className='feedback' color="red.500" mt={2} fontSize="sm">
                    {apiError}
                </Text>
            )}

            {!apiError && suggestions.length === 0 && (
                <Text mt={4}>Nenhuma sugestão encontrada.</Text>
            )}

            {!apiError && suggestions.map((sug) => (
                <SuggestionItem key={sug.id} sug={sug} />
            ))}
        </Stack>
    );
}