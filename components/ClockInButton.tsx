
import React, { useState } from 'react';
import { Fingerprint, Check, Loader2 } from 'lucide-react';

interface ClockInButtonProps {
  onClockIn: () => void;
  isClockedIn: boolean;
  isLoading?: boolean;
  startTime?: string | null;
}

export const ClockInButton: React.FC<ClockInButtonProps> = ({ onClockIn, isClockedIn, isLoading, startTime }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressing, setIsPressing] = useState(false);

  const formattedTime = startTime ? new Date(startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null;

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className={`absolute inset-0 rounded-full bg-midnight opacity-5 transition-transform duration-1000 ${isClockedIn ? 'scale-110' : 'scale-100 animate-pulse'}`}></div>
        <div className={`absolute inset-[-10px] rounded-full border border-midnight/10 transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}></div>

        {/* Main Button */}
        <button
          onClick={onClockIn}
          disabled={isLoading}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={() => setIsPressing(false)}
          className={`
            relative z-10 w-48 h-48 rounded-full flex items-center justify-center 
            transition-all duration-500 ease-out shadow-lg
            ${isPressing ? 'scale-95 shadow-inner' : 'scale-100'}
            ${isClockedIn 
              ? 'bg-white border-4 border-emerald-50 text-emerald-600' 
              : 'bg-midnight text-white border-4 border-midnight/20 hover:shadow-midnight/20'}
            ${isLoading ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          <div className="flex flex-col items-center gap-2">
            {isLoading ? (
              <Loader2 size={48} className="animate-spin opacity-50" />
            ) : isClockedIn ? (
              <>
                <Check size={48} strokeWidth={1} className="animate-[bounce_1s_ease-in-out_1]" />
                <span className="text-sm font-medium tracking-widest lowercase">presente</span>
              </>
            ) : (
              <>
                <Fingerprint size={48} strokeWidth={1} className={`${isHovered ? 'opacity-100' : 'opacity-80'} transition-opacity`} />
                <span className="text-sm font-medium tracking-widest lowercase">marcar</span>
              </>
            )}
          </div>
        </button>
      </div>
      
      <p className="mt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest lowercase">
        {isLoading ? 'procesando...' : isClockedIn ? `turno iniciado: ${formattedTime}` : 'toca para registrar ingreso'}
      </p>
    </div>
  );
};
