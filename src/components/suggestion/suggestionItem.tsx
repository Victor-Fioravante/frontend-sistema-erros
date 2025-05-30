import { Box, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import type { suggestion } from '../../api';

interface Props {
  sug: suggestion;
}

export function SuggestionItem({ sug }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box className='box-suggestion' key={sug.id}>
      <Stack className='box-content'>
        <Heading fontSize="xl">{sug.errorCode}</Heading>

        <Text className={`box-text ${expanded ? 'expanded' : ''}`} mt={1}>
          {sug.text}
        </Text>

        <Button className="expand-button" size="sm" variant="outline" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Ver menos' : 'Ver mais'}
        </Button>

        <Text fontSize="sm" color="gray.500" mt={2}>
          Criado em: {new Date(sug.createdAt).toLocaleString('pt-BR')}
        </Text>

        <Text fontSize="sm">
          Avaliações: {sug.evaluationIds.length > 0 ? sug.evaluationIds.length : 'Nenhuma'}
        </Text>
      </Stack>

      <Stack className='box-button'>
        <Button className='stack-button'>Avaliar</Button>
      </Stack>
    </Box>
  );
}
