import React, { useState } from 'react';
import { useParticipants } from './hooks/useParticipants';
import { Header } from './components/Header';
import { ParticipantCounter } from './components/ParticipantCounter';
import { FilterSelect } from './components/FilterSelect';
import { ParticipantTable } from './components/ParticipantTable';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const { participants, loading, error, refetch } = useParticipants();
  const [selectedFilter, setSelectedFilter] = useState('all');

  if (loading && participants.length === 0) {
    return <LoadingSpinner />;
  }

  if (error && participants.length === 0) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  const filteredParticipants = selectedFilter === 'all' 
    ? participants 
    : participants.filter(p => p.jejum === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header onRefresh={refetch} loading={loading} />
        
        <ParticipantCounter 
          participants={participants} 
          selectedFilter={selectedFilter} 
        />

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <FilterSelect
            participants={participants}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />
        </div>

        <ParticipantTable participants={filteredParticipants} />
      </div>
    </div>
  );
}

export default App;