import React from 'react';
import { Filter } from 'lucide-react';
import type { Participant } from '../types/Participant';
import { getJejumDescription } from '../utils/util';

interface FilterSelectProps {
  participants: Participant[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  participants,
  selectedFilter,
  onFilterChange
}) => {
  const jejumTypes = ['all', ...new Set(participants.map(p => p.jejum))];

  return (
    <div className="flex flex-wrap items-center gap-4 ">
      <div className="flex items-center gap-2 text-gray-700">
        <Filter className="w-5 h-5" />
        <span className="font-medium">Filtrar por:</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {jejumTypes.map(type => (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilter === type
                ? 'bg-[#faba16] text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-[#faba16] hover:text-[#faba16]'
            }`}
          >
            {type === 'all' ? 'Todos' : getJejumDescription(type)}
            {type !== 'all' && (
              <span className="ml-2 text-xs bg-black/10 px-2 py-0.5 rounded-full">
                {participants.filter(p => p.jejum === type).length}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};