// src/components/Navigation.jsx
import React from 'react';
import { Camera, Layers, Trophy, Scroll } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// currentView is derived from the URL in App.jsx (location.pathname)
// setView calls navigate(`/${viewName}`) — no child files need changing
export const Navigation = ({ currentView, setView }) => {
  const { t } = useTranslation();

  const navItems = [
    { id: 'mint',      label: t('nav.mint'),      icon: Camera },
    { id: 'stake',     label: t('nav.stake'),     icon: Layers },
    { id: 'rewards',   label: t('nav.rewards'),   icon: Trophy },
    { id: 'mythology', label: t('nav.mythology'), icon: Scroll }
  ];

  return (
    <nav className="border-t-4 border-b-4 border-white bg-black mt-0">
      <div className="max-w-7xl mx-auto flex">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex-1 py-4 font-black text-sm uppercase font-mono border-r-4 border-white last:border-r-0 flex items-center justify-center gap-2 transition-all duration-200
                ${isActive
                  ? 'bg-green-400 text-black'
                  : 'bg-black text-white hover:bg-white hover:text-black'
                }`}
            >
              <Icon size={20} />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
