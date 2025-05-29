// Importações: React para o componente, useState para estados, Chakra UI para layout/texto,
// createSuggestion para a chamada da API, e o componente de formulário.
import React, { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { createSuggestion } from '../api';
import SuggestionForm from '../components/suggestion/suggestionForm';
import './suggestionRegisterStyle.css'; // Importação de estilos CSS.

// Interface: Define a estrutura esperada para os dados de uma sugestão.
interface SuggestionData {
    errorCode: string;
    text: string;
}

// Componente funcional: Responsável por registrar novas sugestões.
const SuggestionRegister: React.FC = () => {
    // Hooks de Estado: Gerenciam o estado interno do componente.
    const [loadingForm, setLoadingForm] = useState<boolean>(false); // true quando a API está sendo chamada.
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Mensagem para feedback de sucesso.
    const [errorMessage, setErrorMessage] = useState<string | null>(null);   // Mensagem para feedback de erro.

    // Função Assíncrona: Envia os dados da sugestão para a API.
    async function submitSuggestion(suggestionData: SuggestionData) {
        setLoadingForm(true);      // Inicia o feedback de carregamento.
        setSuccessMessage(null);   // Limpa mensagens de sucesso anteriores.
        setErrorMessage(null);     // Limpa mensagens de erro anteriores.

        try {
            // Tentativa de chamada à API: Envia os dados da sugestão.
            await createSuggestion(suggestionData);
            // Sucesso: Define a mensagem de sucesso.
            setSuccessMessage('Sugestão cadastrada com sucesso!');
        } catch (err: any) {
            // Erro: Define a mensagem de erro (da API ou uma padrão).
            setErrorMessage(err.message);
        } finally {
            // Finalização: Desativa o feedback de carregamento, independente do resultado.
            setLoadingForm(false);
        }
    }

    // JSX: Define a estrutura visual do componente.
    return (
        <Stack gap={4} p={4} width="100%"> {/* Contêiner principal do layout. */}
            {/* Componente de Formulário: Renderiza o formulário e passa a função de envio.*/}
            <SuggestionForm create={submitSuggestion} />

            {/* Feedback de Sucesso: Exibido condicionalmente se houver mensagem e não estiver carregando*/}
            {successMessage && !loadingForm && (
                <Text className='feedback' color="white.500" mt={2}>{successMessage}</Text>
            )}

            {/* Feedback de Erro: Exibido condicionalmente se houver mensagem e não estiver carregando.*/}
            {errorMessage && !loadingForm && (
                <Text className='feedback' color="red.500" mt={2}>{errorMessage}</Text>
            )}
        </Stack>
    );
}

// Exportação: Torna o componente disponível para uso em outras partes da aplicação.
export default SuggestionRegister;