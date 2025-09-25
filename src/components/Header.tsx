import React from 'react';
import { RefreshCw } from 'lucide-react';
import logo from '../assets/BLACK_YELLOW_HORIZONTAL.png';

interface HeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onRefresh, loading }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-8 mb-4 md:mb-0">
          <img src={logo} alt="Igreja Familia" className='w-42' />
          <div>
            <h1 className="text-2xl text-center md:text-start font-bold text-gray-900 mb-4 md:mb-0">Dashboard Família Tech</h1>
            <p className="text-gray-600 text-center text-sm">Acompanhe as inscrições do Jejum da Família em tempo real</p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-8 py-2 bg-[#faba16]/70 border border-[#faba16] text-zinc-600 font-semibold rounded-full hover:bg-[#faba16] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>
    </div>
  );
};