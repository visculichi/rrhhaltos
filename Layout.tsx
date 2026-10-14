import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-50 flex font-montserrat lowercase text-slate-800">
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-slate-50"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex">
        {children}
      </div>
    </div>
  );
};