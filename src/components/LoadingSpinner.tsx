import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
        <div className="w-16 h-16 bg-[#faba16] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-[#faba16] animate-spin" />
        </div>
        <p className="text-gray-600 text-lg font-medium">Carregando dados...</p>
        <p className="text-gray-400 text-sm mt-1">Aguarde enquanto buscamos as informações</p>
      </div>
    </div>
  );
};