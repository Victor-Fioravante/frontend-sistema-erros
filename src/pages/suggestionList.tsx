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
    const [apiError, setApiError] = useState<string | null>(null); // Estado para erros da API

    async function fetchSuggestionsData(errorCode?: string) {
        setApiError(null); // Limpa erros anteriores da API
        try {
            const data = await getSuggestions(errorCode);
            setSuggestions(data);
        } catch (err: any) {
            setSuggestions([]); // Limpa sugestões em caso de erro na API
            setApiError(err.message || 'Erro ao buscar sugestões.');
        }
    }

    // Busca inicial ao montar o componente
    useEffect(() => {
        fetchSuggestionsData();
    }, []);

    // Função para ser chamada pelo componente de busca
    const handleSearchTrigger = (searchTerm: string) => {
        fetchSuggestionsData(searchTerm);
    };
    
    return (
        <Stack gap={4} p={4} style={{ width: '100%' }}>

            {/* Componente de busca */}
            <SuggestionSearch onSearch={handleSearchTrigger} />
            {/* Exibição de erro da API */}
            {apiError && (
                <Text className='feedback' color="red.500" mt={2} fontSize="sm"> {/* Estilo similar aos erros de formulário */}
                    {apiError}
                </Text>
            )}

            {/* Mensagem caso não haja sugestões e não haja erro na API */}
            {!apiError && suggestions.length === 0 && (
                <Text mt={4}>Nenhuma sugestão encontrada.</Text>
            )}

            {/* Lista as sugestões se não houver erro na API */}
            {!apiError && suggestions.map((sug) => (
                <SuggestionItem key={sug.id} sug={sug}/>
            ))}
        </Stack>
    );
}