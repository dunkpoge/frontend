// src/views/DocsView.jsx
import React, { useState } from 'react';
import { Book, Shield, Code, Zap, Lock, Users, Github, Copy, Check, ChevronDown, ChevronUp, ExternalLink, Twitter, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CONFIG } from '../config/constants';

export const DocsView = () => {
  const { t } = useTranslation();
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(id);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const contracts = [
    { name: 'DunkPoge NFT',      address: CONFIG.ADDRESSES.NFT,     network: 'Ethereum', explorer: `https://etherscan.io/address/${CONFIG.ADDRESSES.NFT}#code` },
    { name: 'Pogecoin (POGE)',   address: CONFIG.ADDRESSES.COIN,    network: 'Ethereum', explorer: `https://etherscan.io/address/${CONFIG.ADDRESSES.COIN}#code` },
    { name: 'DunkPogeStaking',   address: CONFIG.ADDRESSES.STAKING, network: 'Ethereum', explorer: `https://etherscan.io/address/${CONFIG.ADDRESSES.STAKING}#code` }
  ];

  const principles    = t('docs.principles',    { returnObjects: true });
  const contractGrid  = t('docs.contractGrid',  { returnObjects: true });
  const params        = t('docs.params',        { returnObjects: true });
  const traits        = t('docs.traits',        { returnObjects: true });
  const achievements  = t('docs.achievements',  { returnObjects: true });
  const guarantees    = t('docs.guarantees',    { returnObjects: true });
  const patterns      = t('docs.patterns',      { returnObjects: true });
  const svgReasons    = t('docs.svgReasons',    { returnObjects: true });
  const emTimeline    = t('docs.emissionTimeline', { returnObjects: true });

  const quickLinks = [
    { label: t('docs.philosophy'),   icon: Shield, color: 'bg-purple-600', section: 'philosophy' },
    { label: t('docs.architecture'), icon: Code,   color: 'bg-blue-600',   section: 'architecture' },
    { label: t('docs.security'),     icon: Lock,   color: 'bg-green-600',  section: 'security' }
  ];

  const resources = [
    { label: 'GitHub',    icon: Github,        url: 'https://github.com/dunkpoge' },
    { label: 'Twitter',   icon: Twitter,       url: 'https://twitter.com/dunkpoge' },
    { label: 'Discord',   icon: MessageCircle, url: 'https://discord.gg/7PsZwC3TZX' },
    { label: 'Manifesto', icon: Book,          url: 'https://trustlessness.eth.limo/general/2025/11/11/the-trustless-manifesto.html' }
  ];

  return (
    <div className="space-y-12">

      {/* Hero */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 border-4 border-black shadow-[8px_8px_0_0_#000] mb-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase font-mono">{t('docs.title')}</h1>
        </div>
        <div className="bg-white text-black p-6 border-4 border-black shadow-[8px_8px_0_0_#000] max-w-3xl mx-auto">
          <p className="text-2xl font-black uppercase mb-3 font-mono">{t('docs.subtitle')}</p>
          <p className="text-lg font-mono mb-4">{t('docs.desc')}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://github.com/dunkpoge" target="_blank" rel="noopener noreferrer"
              className="bg-black text-white font-black px-6 py-3 border-4 border-black hover:bg-gray-900 transition-all flex items-center gap-2 no-underline">
              <Github size={20} />{t('docs.viewSource')}
            </a>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button key={link.section}
              onClick={() => document.getElementById(link.section)?.scrollIntoView({ behavior: 'smooth' })}
              className={`${link.color} text-white p-6 border-4 border-white font-black uppercase font-mono shadow-[6px_6px_0_0_#fff] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#fff] transition-all flex items-center justify-center gap-3`}>
              <Icon size={24} />{link.label}
            </button>
          );
        })}
      </div>

      {/* Philosophy */}
      <div id="philosophy" className="bg-purple-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <div className="flex items-center gap-3 mb-6">
          <Shield size={32} />
          <h2 className="text-3xl font-black uppercase font-mono">{t('docs.philosophyTitle')}</h2>
        </div>
        <div className="space-y-6 text-lg font-mono">
          <div className="bg-black/30 p-6 border-2 border-white/50">
            <h3 className="font-black text-xl mb-3 text-yellow-300">{t('docs.manifestoTitle')}</h3>
            <p className="mb-4">
              {t('docs.manifestoIntro')}{' '}
              <a href="https://trustlessness.eth.limo/general/2025/11/11/the-trustless-manifesto.html"
                target="_blank" rel="noopener noreferrer"
                className="text-green-400 underline hover:text-green-300">
                {t('docs.manifesto')}
              </a>
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {principles.map((p, i) => (
              <div key={i} className="bg-white/10 p-4 border-2 border-white/30">
                <h4 className="font-black text-green-400 mb-2">{p.title}</h4>
                <p className="text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-yellow-400 text-black p-6 border-4 border-black mt-6">
            <p className="font-black text-xl mb-2">{t('docs.noSecrets')}</p>
            <p className="text-sm">{t('docs.noSecretsDesc')}</p>
          </div>
        </div>
      </div>

      {/* Architecture */}
      <div id="architecture" className="bg-blue-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <div className="flex items-center gap-3 mb-6">
          <Code size={32} />
          <h2 className="text-3xl font-black uppercase font-mono">{t('docs.archTitle')}</h2>
        </div>
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            {contractGrid.map((c, i) => (
              <div key={i} className="bg-white text-black p-6 border-4 border-black shadow-[6px_6px_0_0_#000]">
                <h3 className="font-black text-xl mb-2 uppercase">{c.name}</h3>
                <p className="text-sm mb-4 text-blue-600 font-bold">{c.type}</p>
                <ul className="space-y-2">
                  {c.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="text-green-600 font-black">✓</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-black/30 p-6 border-2 border-white/50">
            <h3 className="font-black text-xl mb-4 text-yellow-300">{t('docs.contractAddresses')}</h3>
            <div className="space-y-3">
              {contracts.map((contract, i) => (
                <div key={i} className="bg-white/10 p-4 border-2 border-white/20">
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                      <div className="font-black text-sm text-green-400">{contract.name}</div>
                      <div className="text-xs opacity-75">{contract.network}</div>
                    </div>
                    <a href={contract.explorer} target="_blank" rel="noopener noreferrer"
                      className="bg-blue-500 text-white px-3 py-1 border-2 border-white hover:bg-blue-600 transition-all text-xs font-black flex items-center gap-1 no-underline">
                      {t('docs.view')} <ExternalLink size={12} />
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-xs bg-black/50 px-3 py-2 border border-white/30 font-mono break-all">
                      {contract.address}
                    </code>
                    <button onClick={() => copyToClipboard(contract.address, `contract-${i}`)}
                      className="bg-green-400 text-black p-2 border-2 border-black hover:bg-green-300 transition-all flex-shrink-0" title="Copy address">
                      {copiedAddress === `contract-${i}` ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* NFT Specs */}
      <div className="bg-cyan-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <h2 className="text-3xl font-black uppercase font-mono mb-6">{t('docs.nftSpecTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white text-black p-6 border-4 border-black">
            <h3 className="font-black text-xl mb-4 uppercase">{t('docs.keyParams')}</h3>
            <div className="space-y-3 font-mono text-sm">
              {params.map((p, i) => (
                <div key={i} className={`flex justify-between p-2 ${i < params.length - 1 ? 'border-b-2 border-gray-300' : ''}`}>
                  <span>{p.label}</span>
                  <span className="font-black">{p.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white text-black p-6 border-4 border-black">
            <h3 className="font-black text-xl mb-4 uppercase">{t('docs.traitLayers')}</h3>
            <div className="space-y-2 font-mono text-sm">
              {traits.map((trait, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-gray-100 border border-gray-300">
                  <span className="text-blue-600 font-black">→</span>{trait}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-yellow-400 text-black p-6 border-4 border-black mt-6">
          <h3 className="font-black text-xl mb-2">{t('docs.rarityTitle')}</h3>
          <p className="font-mono text-sm">{t('docs.rarityDesc')}</p>
        </div>
      </div>

      {/* Staking */}
      <div className="bg-green-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <div className="flex items-center gap-3 mb-6">
          <Zap size={32} />
          <h2 className="text-3xl font-black uppercase font-mono">{t('docs.stakingTitle')}</h2>
        </div>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-6 border-2 border-white/50">
              <h3 className="font-black text-xl mb-4 text-yellow-300">{t('docs.emissionRates')}</h3>
              <div className="space-y-2 text-sm font-mono">
                <div>BASE: ~1 POGE/day per NFT</div>
                <div>INITIAL BONUS: ~9 POGE/day per NFT</div>
                <div>DECAY PERIOD: 730 days</div>
                <div className="pt-2 border-t border-white/30">
                  <span className="font-black text-green-400">10 POGE/day → 1 POGE/day</span>
                </div>
              </div>
            </div>
            <div className="bg-black/30 p-6 border-2 border-white/50">
              <h3 className="font-black text-xl mb-4 text-yellow-300">{t('docs.loyaltyMults')}</h3>
              <div className="space-y-2 text-sm font-mono">
                <div>STARTING: 1.0x</div>
                <div>MAXIMUM: 2.0x</div>
                <div>GROWTH PERIOD: 180 days</div>
                <div className="pt-2 border-t border-white/30">
                  <span className="font-black text-green-400">LINEAR GROWTH</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white text-black p-6 border-4 border-black">
            <h3 className="font-black text-xl mb-4 uppercase">{t('docs.supplyPlanning')}</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between p-3 bg-gray-100 border-2 border-gray-300">
                <span>TOTAL POGE SUPPLY:</span><span className="font-black text-purple-600">1,000,000,000</span>
              </div>
              <div className="flex justify-between p-3 bg-gray-100 border-2 border-gray-300">
                <span>WORST CASE USAGE:</span><span className="font-black">~724M POGE</span>
              </div>
              <div className="flex justify-between p-3 bg-green-100 border-2 border-green-600">
                <span>SAFETY BUFFER:</span><span className="font-black text-green-600">276M POGE (27.6%)</span>
              </div>
            </div>
          </div>
          <div className="bg-black/30 p-6 border-2 border-white/50">
            <h3 className="font-black text-xl mb-4 text-yellow-300">{t('docs.achievementsTitle')}</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {achievements.map((a, i) => (
                <div key={i} className="bg-white/10 p-4 border-2 border-white/20">
                  <div className="font-black text-green-400 mb-1">{a.name}</div>
                  <div className="text-xs opacity-90">{a.req}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div id="security" className="bg-red-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <div className="flex items-center gap-3 mb-6">
          <Lock size={32} />
          <h2 className="text-3xl font-black uppercase font-mono">{t('docs.securityTitle')}</h2>
        </div>
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {guarantees.map((g, i) => (
              <div key={i} className="bg-white text-black p-6 border-4 border-black">
                <h3 className="font-black text-lg mb-2 text-red-600">{g.title}</h3>
                <p className="text-sm font-mono">{g.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-black/30 p-6 border-2 border-white/50">
            <h3 className="font-black text-xl mb-4 text-yellow-300">{t('docs.auditedPatterns')}</h3>
            <div className="grid md:grid-cols-2 gap-3 font-mono text-sm">
              {patterns.map((p, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-white/10 border border-white/20">
                  <span className="text-green-400 font-black">✓</span>{p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Technical Deep Dive - Expandable */}
      <div className="bg-white text-black p-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
        <button onClick={() => toggleSection('technical')} className="w-full flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black uppercase font-mono">{t('docs.techDeepDive')}</h2>
          {expandedSections.technical ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
        </button>
        {expandedSections.technical && (
          <div className="space-y-6">
            <div className="bg-purple-100 p-6 border-4 border-purple-600">
              <h3 className="font-black text-xl mb-4 text-purple-600">{t('docs.svgGenTitle')}</h3>
              <div className="space-y-3 font-mono text-sm">
                <p><strong>{t('docs.svgWhyLabel')}</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  {svgReasons.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                <div className="bg-white p-4 border-2 border-purple-400 mt-4">
                  <code className="text-xs">
                    1. Retrieve seed for tokenId<br/>
                    2. Derive traits from seed (deterministic)<br/>
                    3. Build CSS with trait colors<br/>
                    4. Assemble SVG layers<br/>
                    5. Base64 encode SVG<br/>
                    6. Wrap in JSON metadata<br/>
                    7. Return as data URI
                  </code>
                </div>
              </div>
            </div>
            <div className="bg-blue-100 p-6 border-4 border-blue-600">
              <h3 className="font-black text-xl mb-4 text-blue-600">{t('docs.emissionMathTitle')}</h3>
              <div className="space-y-3 font-mono text-sm">
                <p><strong>{t('docs.emissionFormula')}</strong></p>
                <div className="bg-white p-4 border-2 border-blue-400">
                  <code className="text-xs">
                    baseReward = duration × BASE_EMISSION<br/><br/>
                    bonusReward = INITIAL_BONUS × (t1² - t2²) / (2 × DECAY_PERIOD)<br/><br/>
                    finalReward = baseReward × loyaltyMultiplier
                  </code>
                </div>
                <p className="pt-3"><strong>{t('docs.emissionExample')}</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  {emTimeline.map((line, i) => <li key={i}>{line}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Integration Guide */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white p-8 border-4 border-white shadow-[8px_8px_0_0_#fff]">
        <div className="flex items-center gap-3 mb-6">
          <Users size={32} />
          <h2 className="text-3xl font-black uppercase font-mono">{t('docs.integrationTitle')}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/30 p-6 border-2 border-white/50">
            <h3 className="font-black text-xl mb-4 text-yellow-300">{t('docs.readOps')}</h3>
            <div className="space-y-2 font-mono text-xs">
              {['nftContract.tokenURI(tokenId)','stakingContract.getStakeInfo(tokenId)','stakingContract.calculateRewards(tokenId)','stakingContract.getUserAchievements(address)'].map((fn, i) => (
                <div key={i} className="bg-white/10 p-3 border border-white/20"><code>{fn}</code></div>
              ))}
            </div>
          </div>
          <div className="bg-black/30 p-6 border-2 border-white/50">
            <h3 className="font-black text-xl mb-4 text-yellow-300">{t('docs.writeOps')}</h3>
            <div className="space-y-2 font-mono text-xs">
              {['nftContract.mint(quantity, { value })','nftContract.setApprovalForAll(staking, true)','stakingContract.stake([tokenIds])','stakingContract.claimRewards()'].map((fn, i) => (
                <div key={i} className="bg-white/10 p-3 border border-white/20"><code>{fn}</code></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-black text-white p-8 border-4 border-green-400 shadow-[8px_8px_0_0_#00ff00]">
        <h2 className="text-3xl font-black uppercase font-mono mb-6 text-center">{t('docs.resourcesTitle')}</h2>
        <div className="grid md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {resources.map((r) => {
            const Icon = r.icon;
            return (
              <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer"
                className="bg-white text-black font-black py-4 px-6 border-4 border-white hover:bg-gray-200 transition-all flex flex-col items-center gap-2 no-underline">
                <Icon size={24} /><span className="text-sm">{r.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-8 py-6 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <p className="text-2xl font-black font-mono italic mb-2">{t('docs.footerQuote')}</p>
          <p className="text-sm opacity-90">{t('docs.footerQuoteAttr')}</p>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-block bg-green-400 text-black px-8 py-4 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <p className="text-xl font-black font-mono uppercase">{t('docs.tagline')}</p>
        </div>
      </div>
    </div>
  );
};
