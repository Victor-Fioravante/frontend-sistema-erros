import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getEvaluations, getAverageEvaluations } from '../api';

export function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  async function fetchDashboardData() {
    setApiError(null);
    try {
      const res = await getEvaluations();
      setData(res);
    } catch (err:any) {
      setData(null);
      setApiError(err.message || 'Erro ao buscar dados do dashboard.')
    }
      
    try {
      const res = await getAverageEvaluations();
      setData(res);
    } catch (err:any) {
      setData(null);
      setApiError(err.message || 'Erro ao consultar a média')
    }
    }

    useEffect(() => {
    fetchDashboardData();
  }, []);

  if (apiError) return <Box color="red.500">Erro: {apiError}</Box>
  if (!data) return <Box>Carregando...</Box>;

  const averagePerSuggestion = Array.isArray(data.averagePerSuggestion) ? data.averagePerSuggestion : [];

  return (
    <Box p={4}>
      <Heading>Dashboard</Heading>

      <SimpleGrid columns={[1, 2]} p={6} gap={4}>
        <Box p={4} borderWidth={"1px"} borderRadius="md">
          <Text fontSize="sm">Média Total</Text>
          <Text fontSize="2x1" fontWeight="bold">
            {data.totalAverage ? data.totalAverage.toFixed(2) * 100 + '% de avaliações positivas': 'Sem dados'}
          </Text>
        </Box>

        {averagePerSuggestion.length > 0 ? (
          averagePerSuggestion.map((s: any) => (
            <Box key={s.suggestionId} p={4} borderWidth="1px" borderRadius="md">
              <Text fontSize="sm">Sugestão {s.suggestionId}</Text>
              <Text fontSize="2x1" fontWeight="bold">{s.average.toFixed(2)}</Text>
            </Box>
          ))
        ): (
          <Text>Nehuma sugestão encontrada</Text>
        )}
      </SimpleGrid>

      <Box mt={8} height="300px">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={averagePerSuggestion}>
          <XAxis dataKey="suggestionId"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="media" fill='#3182CE'/>
        </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

export default Dashboard;
