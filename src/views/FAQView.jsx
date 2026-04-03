// src/views/FAQView.jsx
import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Shield, Zap, Lock, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Map category index to icon + color — order matches translation.json categories array
const CATEGORY_STYLES = [
  { icon: Zap,          color: 'bg-blue-600'   }, // Minting
  { icon: Lock,         color: 'bg-green-600'  }, // Staking
  { icon: Zap,          color: 'bg-purple-600' }, // Rewards & Tokenomics
  { icon: Shield,       color: 'bg-red-600'    }, // Technical & Security
  { icon: AlertCircle,  color: 'bg-yellow-600' }, // Troubleshooting
];

export const FAQView = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const categories = t('faq.categories', { returnObjects: true });
  const stats      = t('faq.stats',      { returnObjects: true });

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const quickStats = [
    { label: stats.supply_label,  value: stats.supply_value  },
    { label: stats.price_label,   value: stats.price_value   },
    { label: stats.maxMult_label, value: stats.maxMult_value },
    { label: stats.noLock_label,  value: stats.noLock_value  },
  ];

  return (
    <div className="space-y-12">

      {/* Hero */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 border-4 border-black shadow-[8px_8px_0_0_#000] mb-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase font-mono flex items-center gap-4 justify-center">
            <HelpCircle size={48} />
            {t('faq.title')}
          </h1>
        </div>
        <div className="bg-white text-black p-6 border-4 border-black shadow-[8px_8px_0_0_#000] max-w-2xl mx-auto">
          <p className="text-xl font-black uppercase mb-2 font-mono">{t('faq.subtitle')}</p>
          <p className="text-base font-mono">{t('faq.desc')}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        {quickStats.map((stat, i) => (
          <div key={i} className="bg-gradient-to-br from-green-400 to-cyan-400 text-black p-6 border-4 border-black shadow-[6px_6px_0_0_#000] text-center">
            <div className="text-sm font-bold mb-2 opacity-75 uppercase">{stat.label}</div>
            <div className="text-2xl font-black font-mono">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* FAQ Categories */}
      {categories.map((category, catIndex) => {
        const style = CATEGORY_STYLES[catIndex] || { icon: HelpCircle, color: 'bg-gray-600' };
        const Icon  = style.icon;

        return (
          <div key={catIndex} className={`${style.color} text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]`}>
            <div className="flex items-center gap-3 mb-6">
              <Icon size={32} />
              <h2 className="text-3xl font-black uppercase font-mono">{category.category}</h2>
            </div>

            <div className="space-y-4">
              {category.questions.map((faq, qIndex) => {
                const globalIndex = `${catIndex}-${qIndex}`;
                const isOpen = openIndex === globalIndex;

                return (
                  <div key={qIndex} className="bg-white text-black border-4 border-black">
                    <button
                      onClick={() => toggleQuestion(globalIndex)}
                      className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-black text-lg font-mono flex-1">{faq.q}</span>
                      <div className="flex-shrink-0">
                        {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 border-t-4 border-black pt-4">
                        <p className="text-base font-mono leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Still Have Questions */}
      <div className="bg-black text-white p-8 border-4 border-green-400 shadow-[8px_8px_0_0_#00ff00]">
        <h2 className="text-3xl font-black uppercase font-mono mb-6 text-center">
          {t('faq.stillHaveQuestions')}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <a href="https://discord.gg/7PsZwC3TZX" target="_blank" rel="noopener noreferrer"
            className="bg-white text-black font-black py-4 px-6 border-4 border-white hover:bg-gray-200 transition-all text-center no-underline uppercase">
            💬 DISCORD
          </a>
          <a href="https://twitter.com/dunkpoge" target="_blank" rel="noopener noreferrer"
            className="bg-white text-black font-black py-4 px-6 border-4 border-white hover:bg-gray-200 transition-all text-center no-underline uppercase">
            🐦 TWITTER
          </a>
          <a href="https://github.com/dunkpoge" target="_blank" rel="noopener noreferrer"
            className="bg-white text-black font-black py-4 px-6 border-4 border-white hover:bg-gray-200 transition-all text-center no-underline uppercase">
            💻 GITHUB
          </a>
        </div>
        <p className="text-center mt-6 text-sm font-mono opacity-75">
          {t('faq.joinCommunity')}
        </p>
      </div>

      {/* Bottom Badge */}
      <div className="text-center">
        <div className="inline-block bg-green-400 text-black px-8 py-4 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <p className="text-xl font-black font-mono uppercase">{t('faq.tagline')}</p>
        </div>
      </div>

    </div>
  );
};
