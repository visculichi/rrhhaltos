import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  delay?: number;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, subtitle, children, delay = 0 }) => {
  return (
    <div 
      className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/50 mb-4 transition-all duration-700 ease-out hover:bg-white/80"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-end mb-4 border-b border-slate-200/50 pb-2">
        <h3 className="text-lg font-medium text-slate-800 lowercase">{title}</h3>
        {subtitle && <span className="text-xs text-slate-400 lowercase">{subtitle}</span>}
      </div>
      <div className="text-slate-600">
        {children}
      </div>
    </div>
  );
};