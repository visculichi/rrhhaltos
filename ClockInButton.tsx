import React, { useState } from 'react';
import { Fingerprint, Check, Loader2, LogOut } from 'lucide-react';

interface ClockInButtonProps {
  onClockIn: () => void;
  onClockOut: () => void;
  isClockedIn: boolean;
  isLoading?: boolean;
  startTime?: string | null;
}

export const ClockInButton: React.FC<ClockInButtonProps> = ({ onClockIn, onClockOut, isClockedIn, isLoading, startTime }) => {
  const [hoverIn, setHoverIn] = useState(false);
  const [hoverOut, setHoverOut] = useState(false);

  const formattedTime = startTime ? new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  return (
    <div className="flex flex-col items-center justify-center py-6 w-full">
      <div className="flex gap-4 md:gap-8 items-center justify-center relative w-full flex-wrap">
        {/* Glow effect on the active one */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-slate-900 opacity-5 blur-3xl transition-transform duration-1000 ${isLoading ? 'animate-pulse' : ''}`}></div>
        
        {/* Ingreso Button */}
        <button
          onClick={onClockIn}
          disabled={isLoading || isClockedIn}
          onMouseEnter={() => setHoverIn(true)}
          onMouseLeave={() => setHoverIn(false)}
          className={`
            relative z-10 w-36 h-36 md:w-48 md:h-48 rounded-[32px] md:rounded-[40px] flex gap-2 flex-col items-center justify-center 
            transition-all duration-300 shadow-xl
            ${isClockedIn ? 'opacity-30 grayscale cursor-not-allowed scale-95 border-2 border-slate-200 bg-slate-50 text-slate-400' : 'hover:scale-105 active:scale-95 bg-emerald-500 text-white hover:bg-emerald-600 border-4 border-emerald-400/30'}
            ${isLoading ? 'cursor-wait' : ''}
          `}
        >
          {isLoading && !isClockedIn ? (
            <Loader2 size={40} className="animate-spin opacity-80" />
          ) : (
            <Fingerprint size={40} strokeWidth={isClockedIn ? 1 : 2} className={`${hoverIn && !isClockedIn ? 'opacity-100 scale-110 text-white' : 'opacity-90'} transition-all`} />
          )}
          <span className="text-sm font-bold tracking-widest uppercase mt-2">ingreso</span>
        </button>

        {/* Egreso Button */}
        <button
          onClick={onClockOut}
          disabled={isLoading || !isClockedIn}
          onMouseEnter={() => setHoverOut(true)}
          onMouseLeave={() => setHoverOut(false)}
          className={`
            relative z-10 w-36 h-36 md:w-48 md:h-48 rounded-[32px] md:rounded-[40px] flex gap-2 flex-col items-center justify-center 
            transition-all duration-300 shadow-xl
            ${!isClockedIn ? 'opacity-30 grayscale cursor-not-allowed scale-95 border-2 border-slate-200 bg-slate-50 text-slate-400' : 'hover:scale-105 active:scale-95 bg-rose-500 text-white hover:bg-rose-600 border-4 border-rose-400/30'}
            ${isLoading ? 'cursor-wait' : ''}
          `}
        >
          {isLoading && isClockedIn ? (
            <Loader2 size={40} className="animate-spin opacity-80" />
          ) : (
            <LogOut size={40} strokeWidth={!isClockedIn ? 1 : 2} className={`${hoverOut && isClockedIn ? 'opacity-100 scale-110 text-white' : 'opacity-90'} transition-all`} />
          )}
          <span className="text-sm font-bold tracking-widest uppercase mt-2">egreso</span>
        </button>
      </div>

      <p className="mt-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest lowercase bg-slate-50 px-6 py-2 rounded-full shadow-sm border border-slate-100">
        {isLoading ? 'procesando...' : isClockedIn ? `turno iniciado: ${formattedTime}` : 'toca "ingreso" para marcar tu llegada'}
      </p>
    </div>
  );
};
