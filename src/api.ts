export interface suggestion {
    id: number;
    errorCode: string;
    text: string;
    createdAt: Date;
    evaluationIds: number[];
}

export interface evaluation {
    errorCode: string;
    clientCode: string;
    rating: boolean;
    comment?: string;
    suggestionId: number;
}

export interface suggestionCreate {
    errorCode: string;
    text: string;
}

export interface evaluationCreate {
    errorCode: string;
    clientCode: string;
    rating: boolean;
    comment?: string;
}

export interface averageEvaluations {
    errorCode: string;
    rating: boolean;
}

const API_URL = 'http://localhost:3000/api';

export async function getSuggestions(code?: string): Promise<suggestion[]> {
    let url = `${API_URL}/suggestion`;
    if (code) {
        url += `?errorCode=${code}`;  // Aqui é onde deve passar o filtro para o backend
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Falha ao buscar as sugestões');
    }
    return response.json();
}

export async function createSuggestion(suggestion: suggestionCreate): Promise<suggestionCreate> {
    const response = await fetch(`${API_URL}/suggestion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(suggestion),
    });
    if (!response.ok) {
        throw new Error('Falha ao criar a sugestão');
    }
    return response.json();
}

export async function getEvaluations(): Promise<evaluation[]> {
    const response = await fetch(`${API_URL}/evaluation`);
    if (!response.ok) {
        throw new Error('Falha ao buscar as avaliações');
    }
    return response.json();
}

export async function getAverageEvaluations(): Promise<averageEvaluations[]> {
    const response = await fetch(`${API_URL}/evaluation/dashboard`);
    if (!response.ok) {
        throw new Error('Falha ao consultar a média de avaliações')
    }
    return response.json();
}

export async function createEvaluation(evaluation : evaluationCreate): Promise<evaluationCreate> {
    const response = await fetch (`${API_URL}/evaluation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application.json',
        },
        body: JSON.stringify(evaluation),
    });
    if (!response.ok) {
        throw new Error ('Falha ao cadastrar a avaliação')
    }
    return response.json();
    
}
