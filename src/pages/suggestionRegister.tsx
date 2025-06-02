import React, { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { createSuggestion } from '../api';
import SuggestionForm from '../components/suggestion/suggestionForm';
import './suggestionRegisterStyle.css';

interface SuggestionData {
    errorCode: string;
    text: string;
}

const SuggestionRegister: React.FC = () => {
    const [loadingForm, setLoadingForm] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    async function submitSuggestion(suggestionData: SuggestionData) {
        setLoadingForm(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        try {
            await createSuggestion(suggestionData);
            setSuccessMessage('Sugestão cadastrada com sucesso!');
        } catch (err: any) {
            setErrorMessage(err.message);
        } finally {
            setLoadingForm(false);
        }
    }

    return (
        <Stack gap={4} p={4} width="100%">
            <SuggestionForm create={submitSuggestion} />

            {successMessage && !loadingForm && (
                <Text className='feedback' color="white.500" mt={2}>{successMessage}</Text>
            )}

            {errorMessage && !loadingForm && (
                <Text className='feedback' color="red.500" mt={2}>{errorMessage}</Text>
            )}
        </Stack>
    );
}

export default SuggestionRegister;