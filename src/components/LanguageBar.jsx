// src/components/LanguageBar.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const LANGUAGES = [
  { code: 'en', native: 'EN',   available: true },
  { code: 'zh', native: '中文',  available: true },
  { code: 'pt', native: 'PT',   available: true },
  { code: 'vi', native: 'VI',   available: true },
  { code: 'tr', native: 'TR',   available: true },
  { code: 'id', native: 'ID',   available: true },
  { code: 'ja', native: '日本語', available: true },
  { code: 'ko', native: '한국어', available: true },
];

export const LanguageBar = () => {
  const { i18n: i18nHook } = useTranslation();
  const current = i18nHook.language;

  return (
    <div className="bg-black px-4">
      <div className="max-w-7xl mx-auto flex items-center gap-0">
        {LANGUAGES.map(({ code, native, available }, idx) => {
          const isActive = current === code;
          const showDivider = idx > 0;

          return (
            <React.Fragment key={code}>
              {showDivider && (
                <span className="text-white/20 select-none px-1">|</span>
              )}
              <button
                onClick={() => available && i18n.changeLanguage(code)}
                disabled={!available}
                className={`py-3 px-3 text-xs font-black font-mono uppercase transition-all
                  ${isActive
                    ? 'text-green-400'
                    : available
                      ? 'text-white/60 hover:text-white'
                      : 'text-white/20 cursor-not-allowed'
                  }`}
                title={available ? code.toUpperCase() : 'Coming soon'}
              >
                {native}
                {!available && (
                  <span className="ml-1 text-white/20 text-[9px] normal-case font-normal">soon</span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
