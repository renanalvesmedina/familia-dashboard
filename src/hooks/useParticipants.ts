import { useState, useEffect } from 'react';
import type { Participant } from '../types/Participant';

export const useParticipants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://automacao.igrejafamilia.net.br/webhook/dashboard-jejum');
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      const data = await response.json();
      setParticipants(data);
    } catch (err) {
      console.error('Erro ao buscar participantes:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return { participants, loading, error, refetch: fetchParticipants };
};