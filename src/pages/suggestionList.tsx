// Importações do React, funções da API, tipos e componentes do Chakra UI/customizados.
import { useEffect, useState } from 'react';
import { getSuggestions } from '../api'; // createSuggestion não é usado aqui.
import type { suggestion } from '../api'; // Tipo para os dados de uma sugestão.
import { Box, Text, Heading, Stack, Flex, Input, Button } from '@chakra-ui/react';

// Componente para listar e buscar sugestões.
export function SuggestionList() {
    // Estados do componente.
    const [suggestions, setSuggestions] = useState<suggestion[]>([]); // Lista de sugestões.
    const [loading, setLoading] = useState<boolean>(true); // Controle de carregamento.
    const [error, setError] = useState<string | null>(null); // Mensagem de erro.
    const [searchTerm, setSearchTerm] = useState<string>(''); // Termo de busca (código de erro).

    // Função assíncrona para buscar sugestões na API.
    // Pode receber um `errorCode` opcional para filtrar a busca.
    async function fetchSuggestions(errorCode?: string) {
        setLoading(true); // Ativa o carregamento.
        setError(null);   // Limpa erros anteriores.
        try {
            // Chama a API para obter as sugestões.
            const data = await getSuggestions(errorCode);
            setSuggestions(data); // Atualiza o estado com os dados recebidos.
        } catch (err: any) {
            setError(err.message || 'Erro ao buscar sugestões.'); // Define mensagem de erro.
        } finally {
            setLoading(false); // Desativa o carregamento.
        }
    }

    // `useEffect` para buscar as sugestões iniciais quando o componente é montado.
    // O array de dependências vazio `[]` garante que isso rode apenas uma vez.
    useEffect(() => {
        fetchSuggestions();
    }, []);

    // Função para lidar com a ação de busca.
    function handleSearch() {
        // Valida se o termo de busca, se preenchido, tem 6 dígitos.
        if (searchTerm && !/^\d{6}$/.test(searchTerm)) {
            setError('O código de erro deve ter 6 dígitos');
            return; // Interrompe se inválido.
        }
        setError(null); // Limpa erro de validação anterior.
        fetchSuggestions(searchTerm); // Busca sugestões com o termo fornecido.
    }

    // Estrutura visual do componente.
    return (
        <Stack gap={2} p={4} style={{ width: '100%' }}> {/* Container principal */}
            <Flex gap={2} mb={4}>
                <Input
                    placeholder="Buscar por código de erro"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Atualiza o termo de busca.
                    onKeyDown={(e) => { // Permite buscar com a tecla Enter.
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                    flex="1" // Faz o input ocupar o espaço disponível.
                />
                <Button onClick={handleSearch}> {/* Botão para iniciar a busca. */}
                    Buscar
                </Button>
            </Flex>

            {/* Exibição de mensagem de erro. */}
            {error && <Text color="red.500">{error}</Text>}

            {/* Mensagem caso não haja sugestões e não esteja carregando nem com erro. */}
            {!loading && !error && suggestions.length === 0 && (
                <Text>Nenhuma sugestão encontrada.</Text>
            )}

            {/* Lista as sugestões (se não estiver carregando, sem erro e houver sugestões). */}
            {!loading &&
                !error &&
                suggestions.map((sug) => (
                    // Container para cada sugestão individual.
                    <Box key={sug.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                        <Heading fontSize="xl">{sug.errorCode}</Heading> {/* Código de erro */}
                        <Text>{sug.text}</Text> {/* Texto da sugestão */}
                        <Text fontSize="sm" color="gray.500">
                            Criado em: {new Date(sug.createdAt).toLocaleString()} {/* Data de criação formatada */}
                        </Text>
                        <Text fontSize="sm">
                            {/* Quantidade de avaliações */}
                            Avaliações: {sug.evaluationIds.length > 0 ? sug.evaluationIds.length : 'Nenhuma'}
                        </Text>
                    </Box>
                ))}
        </Stack>
    );
}