import React from 'react';
import { Users, Calendar, Phone, Filter } from 'lucide-react';
import type { Participant } from '../types/Participant';

interface ParticipantCounterProps {
  participants: Participant[];
  selectedFilter: string;
}

export const ParticipantCounter: React.FC<ParticipantCounterProps> = ({ participants }) => {
  const jejumTypes = [...new Set(participants.map(p => p.jejum))];
  
  const getJejumCount = (type: string) => participants.filter(p => p.jejum === type).length;

  const getJejumDescription = (type: string) => {
    switch (type) {
      case 'J1':
        return '00h às 12h';
      case 'J2':
        return 'Uma refeição no dia';
      case 'J3':
        return 'Apenas água 3 dias';
      default:
        return type;
    }
  };

  const mostChosenJejum = jejumTypes.length > 0 ? jejumTypes.reduce((a, b) => getJejumCount(a) > getJejumCount(b) ? a : b) : '';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Participantes</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{participants.length}</p>
            <p className="text-xs text-gray-500 mt-1">Todos os participantes</p>
          </div>
          <div className="w-12 h-12 bg-[#faba16]/10 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-[#faba16] " />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Inscrições Hoje</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {participants.filter(p => {
                const today = new Date().toDateString();
                const inscricaoDate = new Date(p.data_inscricao).toDateString();
                return today === inscricaoDate;
              }).length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Últimas 24h</p>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Jejum Mais Escolhido</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {jejumTypes.length > 0 ? getJejumDescription(mostChosenJejum) : 'Nenhum'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {jejumTypes.length > 0 ? getJejumCount(mostChosenJejum) : 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Filter className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Contatos Únicos</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {new Set(participants.map(p => p.telefone)).size}
            </p>
            <p className="text-xs text-gray-500 mt-1">Números diferentes</p>
          </div>
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
            <Phone className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      {jejumTypes.length > 0 && (
        <div className="col-span-full">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição por Tipo de Jejum</h3>
            <div className="flex w-full gap-18 items-center justify-center">
              {jejumTypes.map(type => {
                const count = getJejumCount(type);
                const percentage = participants.length > 0 ? (count / participants.length) * 100 : 0;
                
                return (
                  <div key={type} className="text-center">
                    <div className="w-25 h-25 mx-auto mb-2 bg-[#faba16]/5 border border-[#faba16] rounded-full flex items-center justify-center">
                      <span className="text-[#faba16] font-bold text-xl">{percentage.toFixed(1)}%</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{getJejumDescription(type)}</p>
                    <p className="text-sm text-gray-500">Participantes: {count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};