// src/views/PrivacyView.jsx
import React from 'react';
import { Shield, Eye, Code, Lock, Github, Twitter, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PrivacyView = () => {
  const { t } = useTranslation();

  const dontKnow   = t('privacy.dontKnow',      { returnObjects: true });
  const publicItems= t('privacy.publicItems',    { returnObjects: true });
  const publicBut  = t('privacy.publicButItems', { returnObjects: true });
  const cookiesUse = t('privacy.cookiesItems',   { returnObjects: true });
  const cookiesNo  = t('privacy.cookiesNoItems', { returnObjects: true });
  const summary    = t('privacy.summaryItems',   { returnObjects: true });

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center">
        <div className="inline-block bg-green-400 text-black px-8 py-4 border-4 border-black shadow-[8px_8px_0_0_#000] mb-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase font-mono">{t('privacy.title')}</h1>
        </div>
        <div className="bg-white text-black p-8 border-4 border-black shadow-[8px_8px_0_0_#000] max-w-2xl mx-auto">
          <p className="text-3xl font-black uppercase mb-2 font-mono">{t('privacy.headline')}</p>
          <p className="text-xl font-mono">{t('privacy.subheadline')}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-purple-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
          <div className="flex items-center gap-3 mb-6"><Shield size={32} /><h2 className="text-2xl font-black uppercase font-mono">{t('privacy.whyTitle')}</h2></div>
          <div className="space-y-4 text-lg font-mono">
            <p>{t('privacy.why1')}</p>
            <p>{t('privacy.why2')}</p>
            <p className="text-yellow-300 font-black pt-4 border-t-2 border-white/30">{t('privacy.why3')}</p>
          </div>
        </div>

        <div className="bg-red-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
          <div className="flex items-center gap-3 mb-6"><Eye size={32} className="opacity-50" /><h2 className="text-2xl font-black uppercase font-mono">{t('privacy.dontKnowTitle')}</h2></div>
          <ul className="space-y-2 text-lg font-mono">
            {dontKnow.map((item, i) => <li key={i}>❌ {item}</li>)}
          </ul>
        </div>
      </div>

      <div className="bg-cyan-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <h2 className="text-2xl font-black uppercase mb-6 font-mono">{t('privacy.publicTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 text-lg font-mono">
            <p>{t('privacy.publicDesc')}</p>
            <ul className="space-y-2 pl-4">{publicItems.map((item, i) => <li key={i}>✓ {item}</li>)}</ul>
          </div>
          <div className="bg-black/30 p-6 border-2 border-white/50">
            <p className="font-black mb-3 text-yellow-300">{t('privacy.publicBut')}</p>
            <ul className="space-y-2 text-sm">{publicBut.map((item, i) => <li key={i}>→ {item}</li>)}</ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-black mb-6 uppercase text-white font-mono text-center border-b-4 border-white pb-4">{t('privacy.verifyTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white text-black p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
            <div className="flex justify-center mb-4"><Eye size={40} className="text-blue-600" /></div>
            <h3 className="font-black text-xl mb-3 uppercase text-center font-mono">{t('privacy.networkTab')}</h3>
            <p className="text-sm font-mono mb-3">{t('privacy.networkDesc')}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span className="text-green-600 font-black">✓</span><span>{t('privacy.networkItem1')}</span></div>
              <div className="flex items-center gap-2"><span className="text-red-600 font-black">✗</span><span>{t('privacy.networkItem2')}</span></div>
              <div className="flex items-center gap-2"><span className="text-red-600 font-black">✗</span><span>{t('privacy.networkItem3')}</span></div>
            </div>
          </div>
          <div className="bg-white text-black p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
            <div className="flex justify-center mb-4"><Code size={40} className="text-purple-600" /></div>
            <h3 className="font-black text-xl mb-3 uppercase text-center font-mono">{t('privacy.sourceCode')}</h3>
            <p className="text-sm font-mono mb-3">{t('privacy.sourceDesc')}</p>
            <a href="https://github.com/dunkpoge" target="_blank" rel="noopener noreferrer"
              className="block bg-black text-white font-black py-3 px-4 text-center border-2 border-black hover:bg-gray-900 transition-all text-sm uppercase">
              {t('privacy.viewGithub')}
            </a>
          </div>
          <div className="bg-white text-black p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
            <div className="flex justify-center mb-4"><Lock size={40} className="text-green-600" /></div>
            <h3 className="font-black text-xl mb-3 uppercase text-center font-mono">{t('privacy.runLocally')}</h3>
            <p className="text-sm font-mono mb-3">{t('privacy.runDesc')}</p>
            <div className="bg-gray-100 p-3 border-2 border-gray-400 text-xs font-mono">
              <code>git clone https://github.com/dunkpoge/frontend<br/>cd frontend<br/>yarn install<br/>yarn start</code>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-yellow-400 text-black p-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
        <h2 className="text-2xl font-black uppercase mb-4 font-mono">{t('privacy.cookiesTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="font-mono">
            <p className="font-black mb-2">{t('privacy.cookiesUse')}</p>
            <ul className="space-y-2 text-sm">{cookiesUse.map((item, i) => <li key={i}>→ {item}</li>)}</ul>
            <p className="mt-4 text-sm">{t('privacy.cookiesNote')}</p>
          </div>
          <div className="bg-black text-white p-6 border-2 border-black">
            <p className="font-black text-red-400 mb-3 uppercase">{t('privacy.cookiesNo')}</p>
            <ul className="space-y-1 text-sm font-mono">{cookiesNo.map((item, i) => <li key={i}>✗ {item}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <h2 className="text-2xl font-black uppercase mb-6 font-mono text-center">{t('privacy.legalTitle')}</h2>
        <div className="max-w-3xl mx-auto space-y-4 font-mono">
          {[['gdpr','gdprDesc'],['ccpa','ccpaDesc'],['otherLaws','otherLawsDesc']].map(([k, d]) => (
            <div key={k} className="bg-black/30 p-4 border-2 border-white/50">
              <p className="font-black text-lg mb-2">{t(`privacy.${k}`)}</p>
              <p className="text-sm">{t(`privacy.${d}`)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black text-white p-8 border-4 border-green-400 shadow-[8px_8px_0_0_#00ff00]">
        <h2 className="text-2xl font-black uppercase mb-6 font-mono text-center">{t('privacy.contactTitle')}</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          {[['https://github.com/dunkpoge', Github, 'GITHUB'], ['https://twitter.com/dunkpoge', Twitter, 'TWITTER'], ['https://discord.gg/7PsZwC3TZX', MessageCircle, 'DISCORD']].map(([href, Icon, label]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="bg-white text-black font-black py-3 px-6 border-4 border-white hover:bg-gray-200 transition-all flex items-center gap-2 no-underline">
              <Icon size={20} />{label}
            </a>
          ))}
        </div>
        <p className="text-center mt-6 text-sm font-mono opacity-75">{t('privacy.contactNote')}</p>
      </div>

      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-8 border-4 border-white shadow-[12px_12px_0_0_#fff]">
        <h2 className="text-3xl font-black uppercase mb-6 font-mono text-center">{t('privacy.philTitle')}</h2>
        <div className="max-w-3xl mx-auto space-y-4 text-lg font-mono text-center">
          <p className="text-2xl font-black text-yellow-300">{t('privacy.philHeadline')}</p>
          <p>{t('privacy.phil1')}</p>
          <p className="text-xl font-black pt-4 border-t-4 border-white/50">{t('privacy.phil2')}</p>
          <p className="text-sm opacity-90 italic">{t('privacy.phil3')}</p>
        </div>
      </div>

      <div className="bg-white text-black p-8 border-4 border-black shadow-[12px_12px_0_0_#000]">
        <h2 className="text-3xl font-black uppercase mb-6 font-mono text-center">{t('privacy.summaryTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {summary.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-600">
              <span className="text-2xl">✅</span>
              <span className="font-bold font-mono">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-2xl font-black font-mono uppercase">{t('privacy.summaryClose')}</p>
      </div>

      <div className="text-center">
        <div className="inline-block bg-green-400 text-black px-8 py-4 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <p className="text-xl font-black font-mono uppercase">{t('privacy.tagline')}</p>
        </div>
      </div>
    </div>
  );
};
