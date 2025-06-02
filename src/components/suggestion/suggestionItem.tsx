import { Box, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import type { suggestion } from '../../api';
import EvaluateModal from '../evaluationModal/evaluateModal';

interface Props {
  sug: suggestion;
}

export function SuggestionItem({ sug }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box className='box-suggestion' key={sug.id}>
      <Stack className='box-content'>
        <Heading fontSize="xl">Erro: {sug.errorCode}</Heading>

        <Text className={`box-text ${expanded ? 'expanded' : ''}`} mt={1}>
          Sugestão: {sug.text}
        </Text>

        <Button className="expand-button" size="sm" variant="outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Ver menos' : 'Ver mais'}
        </Button>

        <Text fontSize="sm" mt={2}>
          Criado em: {new Date(sug.createdAt).toLocaleString('pt-BR')}
        </Text>

        <Text fontSize="sm">
          Avaliações: {sug.evaluationIds.length > 0 ? sug.evaluationIds.length : 'Nenhuma'}
        </Text>
      </Stack>
        <EvaluateModal suggestionId={sug.id} suggestionError={sug.errorCode} />
    </Box>
  );
}
