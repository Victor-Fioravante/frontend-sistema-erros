import { Box, Heading, SimpleGrid, Text, Button, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverHeader, PopoverBody, Stack, Spinner, Alert } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getEvaluations, getAverageEvaluations, getSuggestionById } from '../api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './evaluationList.css'

import { forwardRef } from 'react';


export function Dashboard() {
    const [data, setData] = useState<any>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const [openDetails, setOpenDetails] = useState<{ [key: number]: boolean }>({});
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [textSuggestion, setTextSuggestion] = useState<string | null>(null);
    const [loadingText, setLoadingText] = useState<boolean>(false);

    async function fetchDashboardData() {
        setApiError(null);
        try {
            const evaluations = await getEvaluations();
            const averages = await getAverageEvaluations();
            setData({
                evaluations,
                averages
            });
        } catch (err: any) {
            setData(null);
            setApiError(err.message || 'Erro ao buscar dados do dashboard.');
        }
    }

    async function fetchSuggestionText(id: number) {
        setLoadingText(true);
        setTextSuggestion(null);
        try {
            const suggestionText = await getSuggestionById(id);
            setTextSuggestion(suggestionText?.text ?? null);
        } catch (err: any) {
            setApiError(err.message || "Erro ao buscar a sugestão")
        } finally {
            setLoadingText(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (apiError) return <Box color="red.500">Erro: {apiError}</Box>;
    if (!data) return <Box>Carregando...</Box>;

    const averagePerSuggestion = Array.isArray(data.averages.averageBySuggestion)
        ? data.averages.averageBySuggestion
        : [];

    const filteredEvaluations = data.evaluations.filter((ev: any) => {
        const evDate = new Date(ev.date);
        evDate.setHours(0, 0, 0, 0);

        if (startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            if (evDate < start) return false;
        }

        if (endDate) {
            const end = new Date(endDate);
            end.setHours(0, 0, 0, 0);
            if (evDate > end) return false;
        }

        return true;
    });

    const StartDateButton = forwardRef(({ value, onClick }: any, ref: any) => (
        <Button className='date-button' variant="outline" onClick={onClick} ref={ref}>
            {value || 'Data inicial'}
        </Button>
    ));
    const EndDateButton = forwardRef(({ value, onClick }: any, ref: any) => (
        <Button className='date-button' variant="outline" onClick={onClick} ref={ref}>
            {value || 'Data final'}
        </Button>
    ));


    return (
        <Box p={4}>
            <Heading>Dashboard</Heading>

            <Box p={4} borderWidth="1px" borderRadius="md">
                <Text fontSize="sm">Média Total</Text>
                <Text fontSize="2xl" fontWeight="bold">
                    {data.averages.totalAverage
                        ? `${(data.averages.totalAverage * 100).toFixed(0)}% de avaliações positivas`
                        : 'Sem dados'}
                </Text>
            </Box>

            <Box mt={8} height="300px">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={averagePerSuggestion}>
                        <XAxis dataKey="suggestionId" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={"average"} fill="#3182CE" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            <Box p={4} borderWidth="1px" borderRadius="md" mb={4}>
                <Text>Filtrar por período:</Text>
                <Stack direction={["column", "row"]} p={4} mt={2}>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Data inicial"
                        dateFormat="dd/MM/yyyy"
                        customInput={<StartDateButton />}
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate ?? undefined}
                        placeholderText="Data final"
                        dateFormat="dd/MM/yyyy"
                        customInput={<EndDateButton />}
                    />
                    <Button onClick={() => { setStartDate(null); setEndDate(null); }}>Limpar Filtros</Button>
                </Stack>
            </Box>

            <SimpleGrid columns={[1]} p={6} gap={4}>
                {averagePerSuggestion.length > 0 ? (
                    averagePerSuggestion.map((s: any) => {
                        const suggestionEvaluations = filteredEvaluations.filter(
                            (ev: any) => ev.suggestionId === s.suggestionId
                        );

                        if (suggestionEvaluations.length === 0) return null;

                        const isOpen = openDetails[s.suggestionId] || false;

                        return (
                            <Box key={s.suggestionId} p={4} borderWidth="1px" borderRadius="md">
                                <Text fontSize="sm">Sugestão {s.suggestionId}</Text>
                                <Text fontSize="sm">Código de erro: {s.errorCode}</Text>
                                <Text fontSize="2xl" fontWeight="bold">
                                    {(s.average * 100).toFixed(0)}% de avaliações positivas
                                </Text>

                                <Button
                                    size="sm"
                                    mt={2}
                                    onClick={() =>
                                        setOpenDetails((prev) => ({
                                            ...prev,
                                            [s.suggestionId]: !prev[s.suggestionId],
                                        }))
                                    }
                                >
                                    {isOpen ? 'Esconder avaliações' : 'Mostrar avaliações'}
                                </Button>

                                <Popover.Root closeOnEscape>
                                    <PopoverTrigger className='text-popover'>
                                        <Button className="popover-button" size="xs" mt={1} onClick={() => fetchSuggestionText(s.suggestionId)}>Ver texto completo</Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="popover-content" css={{ "--popover-bg": "#313131" }}>
                                        <Popover.CloseTrigger />
                                        <PopoverHeader>Texto da sugestão {s.suggestionId}:</PopoverHeader>
                                        <PopoverBody>
                                            {loadingText ? (
                                                <Spinner size="sm" />
                                            ) : (
                                                textSuggestion || "Texto não disponível."
                                            )}
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover.Root>

                                {isOpen &&
                                    suggestionEvaluations.map((ev: any) => (
                                        <Box className="evaluation-card" key={ev.id} mt={2} p={2} borderWidth="1px" borderRadius="md">
                                            <Text fontSize="sm">Cliente: {ev.clientCode}</Text>
                                            <Text className="card-content" fontSize="sm">Comentário:</Text>
                                            {ev.comment ? (
                                                <Text className="comment-text" fontSize="sm">{ev.comment}</Text>
                                            ) : (
                                                <Text fontSize="sm" color="red">
                                                    Avaliação não possui comentário
                                                </Text>
                                            )}
                                            <Text className="card-content" fontSize="sm">
                                                Data: {new Date(ev.date).toLocaleDateString('pt-BR')}
                                            </Text>
                                            <Text fontSize="sm">
                                                Avaliação: {ev.rating ? 'Positiva' : 'Negativa'}
                                            </Text>
                                        </Box>
                                    ))}
                            </Box>
                        );
                    })
                ) : (
                    <Text>Nenhuma sugestão encontrada</Text>
                )}
            </SimpleGrid>
        </Box>
    );
}

export default Dashboard;
