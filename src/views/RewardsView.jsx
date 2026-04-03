// src/views/RewardsView.jsx
import React, { useState, useEffect } from 'react';
import { Wallet, TrendingUp, Award, Zap, Trophy, Target, Rocket, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { formatBalance } from '../utils/formatters';

export const RewardsView = ({
  isConnected,
  connectWallet,
  pogeBalance,
  pendingRewards,
  stakedTokens,
  emissionRate,
  userAchievements,
  loading,
  dataLoading,
  claim,
  setView,
  nftBalance
}) => {
  const { t } = useTranslation();
  const [liveRewards, setLiveRewards] = useState(parseFloat(pendingRewards));
  const [timeStaked, setTimeStaked] = useState(0);

  const totalNFTs = (stakedTokens.length || 0) + (nftBalance || 0);
  const dailyEarnings = parseFloat(emissionRate) * stakedTokens.length * 86400;
  const perSecond = parseFloat(emissionRate) * stakedTokens.length;

  useEffect(() => {
    if (stakedTokens.length === 0) return;
    setLiveRewards(parseFloat(pendingRewards));
    const interval = setInterval(() => {
      setLiveRewards(prev => prev + perSecond);
      setTimeStaked(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [stakedTokens.length, perSecond, pendingRewards]);

  useEffect(() => { setLiveRewards(parseFloat(pendingRewards)); }, [pendingRewards]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const achievements = [
    { id: 'early',    name: t('rewards.earlyAdopter'), unlocked: userAchievements[0] || false, desc: t('rewards.earlyAdopterDesc'), icon: Rocket, color: 'from-purple-500 to-purple-700' },
    { id: 'diamond',  name: t('rewards.diamondPaws'),  unlocked: userAchievements[1] || false, desc: t('rewards.diamondPawsDesc'),  icon: Trophy, color: 'from-blue-500 to-blue-700'   },
    { id: 'collector',name: t('rewards.collector'),    unlocked: userAchievements[2] || false, desc: t('rewards.collectorDesc'),    icon: Target, color: 'from-green-500 to-green-700' },
    { id: 'whale',    name: t('rewards.pogeWhale'),    unlocked: userAchievements[3] || false, desc: t('rewards.pogeWhaleDesc'),    icon: Zap,    color: 'from-yellow-500 to-yellow-700'}
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const Skeleton = ({ w = 'w-full', h = 'h-6' }) => (
    <div className={`${w} ${h} bg-white/10 animate-pulse`} />
  );

  if (isConnected && dataLoading) {
    return (
      <div>
        <h2 className="text-3xl md:text-5xl font-black mb-8 text-white uppercase">{t('rewards.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 md:p-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
            <Skeleton h="h-8" w="w-40" />
            <div className="my-8 text-center space-y-3">
              <Skeleton h="h-4" w="w-32 mx-auto" /><Skeleton h="h-20" w="w-48 mx-auto" /><Skeleton h="h-4" w="w-24 mx-auto" />
            </div>
            <Skeleton h="h-16" />
            <div className="mt-6 space-y-3"><Skeleton h="h-12" /><Skeleton h="h-12" /><Skeleton h="h-12" /></div>
          </div>
          <div className="bg-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
            <Skeleton h="h-8" w="w-48" /><Skeleton h="h-12 mt-6" />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Skeleton h="h-28" /><Skeleton h="h-28" /><Skeleton h="h-28" /><Skeleton h="h-28" />
            </div>
            <div className="mt-6 space-y-3"><Skeleton h="h-12" /><Skeleton h="h-12" /><Skeleton h="h-12" /></div>
          </div>
        </div>
        <div className="mt-6 text-center text-green-400 text-sm font-bold animate-pulse font-mono">
          {t('rewards.dataLoading')}
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div>
        <h2 className="text-3xl md:text-5xl font-black mb-8 text-white uppercase">{t('rewards.title')}</h2>
        <div className="text-center py-20 text-xl p-8 bg-gradient-to-br from-black to-gray-900 border-4 border-white/90 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
          <Wallet size={48} className="mx-auto mb-4 opacity-50" />
          <div className="font-bold mb-2">{t('rewards.walletNotConnected')}</div>
          <div className="text-sm opacity-75 mb-4">{t('rewards.connectToView')}</div>
          <button onClick={connectWallet} className="bg-gradient-to-r from-white to-gray-300 text-black font-bold py-2 px-6 border-2 border-green-400/90 hover:opacity-90 transition-all shadow-[0_0_10px_rgba(0,255,0,0.3)]">
            {t('rewards.connectWallet')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl md:text-5xl font-black mb-8 text-white uppercase">{t('rewards.title')}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

        {/* CLAIM CARD */}
        <div className="bg-gradient-to-br from-green-500 to-green-700 text-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0_0_#000] relative overflow-hidden">
          {stakedTokens.length > 0 && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent animate-pulse pointer-events-none" />
          )}
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2 relative z-10">
            <TrendingUp size={28} />{t('rewards.claimRewards')}
          </h3>

          <div className="mb-6 text-center relative z-10">
            <div className="text-sm font-bold mb-2 opacity-90 flex items-center justify-center gap-2">
              {stakedTokens.length > 0 && <Clock size={16} className="animate-spin" />}
              {t('rewards.pendingRewards')}
            </div>
            <div className="text-6xl md:text-7xl font-black mb-2 transition-all duration-300"
              style={{ textShadow: '4px 4px 0 #000', color: stakedTokens.length > 0 ? '#fff' : '#ffffff80' }}>
              {liveRewards.toFixed(4)}
            </div>
            <div className="text-2xl font-bold opacity-90">$POGE</div>
            {stakedTokens.length > 0 && (
              <div className="mt-3 text-sm font-bold text-green-200 animate-pulse">
                {t('rewards.perSecond', { amount: perSecond.toFixed(6) })}
              </div>
            )}
          </div>

          {parseFloat(pendingRewards) > 0 ? (
            <button onClick={claim} disabled={loading}
              className="w-full bg-white text-green-700 font-black text-2xl py-6 border-4 border-black mb-6 disabled:opacity-50 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all relative z-10">
              {loading ? t('rewards.claiming') : t('rewards.claimNow')}
            </button>
          ) : stakedTokens.length > 0 ? (
            <div className="w-full bg-black/30 text-white font-bold text-center py-6 border-4 border-black/50 mb-6 relative z-10">
              <div className="animate-pulse">{t('rewards.accumulating')}</div>
              <div className="text-xs mt-2 opacity-70">{t('rewards.liveFor', { time: formatTime(timeStaked) })}</div>
            </div>
          ) : (
            <button onClick={() => setView('stake')}
              className="w-full bg-yellow-400 text-black font-black text-xl py-6 border-4 border-black mb-6 hover:scale-105 transition-all relative z-10">
              {t('rewards.startEarning')}
            </button>
          )}

          <div className="space-y-3 relative z-10">
            <div className="p-3 bg-black/30 border-2 border-white/50">
              <div className="flex justify-between mb-2">
                <span className="font-bold">{t('rewards.claimedPoge')}</span>
                <span className="text-xl font-black">{formatBalance(pogeBalance)}</span>
              </div>
              {parseFloat(pogeBalance) < 10000 && (
                <div className="w-full h-2 bg-black/50 border border-white/30">
                  <div className="h-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${Math.min((parseFloat(pogeBalance) / 10000) * 100, 100)}%` }} />
                </div>
              )}
            </div>
            <div className="p-3 bg-black/30 border-2 border-white/50">
              <div className="flex justify-between">
                <span className="font-bold">{t('rewards.dailyReward')}</span>
                <span className="text-xl font-black text-yellow-300">+{dailyEarnings.toFixed(2)}</span>
              </div>
            </div>
            <div className="p-3 bg-black/30 border-2 border-white/50">
              <div className="flex justify-between mb-2">
                <span className="font-bold">{t('rewards.stakedNFTs')}</span>
                <span className="text-xl font-black">{stakedTokens.length}/{totalNFTs}</span>
              </div>
              {totalNFTs > 0 && (
                <div className="w-full h-2 bg-black/50 border border-white/30">
                  <div className="h-full bg-green-400 transition-all duration-500"
                    style={{ width: `${(stakedTokens.length / totalNFTs) * 100}%` }} />
                </div>
              )}
            </div>
          </div>

          <button onClick={() => setView('stake')}
            className="w-full mt-6 bg-black text-white font-bold py-3 border-2 border-white hover:bg-gray-900 transition-all relative z-10">
            {t('rewards.manageStaking')}
          </button>
        </div>

        {/* ACHIEVEMENTS CARD */}
        <div className="bg-white text-black p-6 md:p-8 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
            <Award size={28} />{t('rewards.achievements')}
          </h3>

          <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-black">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-sm">{t('rewards.progress')}</span>
              <span className="font-black text-lg">{unlockedCount}/4</span>
            </div>
            <div className="h-4 bg-gray-300 border-2 border-black overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
                style={{ width: `${(unlockedCount / 4) * 100}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id}
                  className={`p-4 border-4 transition-all duration-300 ${
                    achievement.unlocked
                      ? `bg-gradient-to-br ${achievement.color} text-white border-black hover:scale-105 shadow-lg`
                      : 'bg-gray-200 border-gray-400 opacity-60 hover:opacity-80'
                  }`}
                  style={{ animation: achievement.unlocked ? `slideIn 0.5s ease-out ${idx * 0.1}s both` : 'none' }}>
                  <div className="flex justify-center mb-2">
                    <Icon size={32} className={achievement.unlocked ? 'animate-bounce' : 'text-gray-400'} />
                  </div>
                  <div className={`font-black text-xs text-center mb-1 ${achievement.unlocked ? 'text-white' : ''}`}>
                    {achievement.name}
                  </div>
                  <div className={`text-xs text-center ${achievement.unlocked ? 'text-white/90' : 'opacity-75'}`}>
                    {achievement.desc}
                  </div>
                  <div className="text-center mt-2">
                    {achievement.unlocked
                      ? <span className="text-yellow-300 font-black text-sm drop-shadow-lg">{t('rewards.unlocked')}</span>
                      : <span className="text-gray-400 font-bold text-xs">{t('rewards.locked')}</span>
                    }
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-gray-100 border-2 border-black">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm">{t('rewards.totalOwned')}</span>
                <span className="text-xl font-black">{totalNFTs}</span>
              </div>
              <div className="flex justify-between text-xs opacity-60">
                <span>{t('rewards.stakedLabel', { staked: stakedTokens.length })}</span>
                <span>{t('rewards.inWallet', { count: nftBalance })}</span>
              </div>
            </div>
            <div className="p-3 bg-gray-100 border-2 border-black">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">{t('rewards.peakStaked')}</span>
                {/* index 7 = peakConcurrentStakes per ABI getUserAchievements */}
                <span className="text-xl font-black text-purple-600">{Number(userAchievements[7] || 0)}</span>
              </div>
            </div>
            <div className="p-3 bg-gray-100 border-2 border-black">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">{t('rewards.lifetimeClaimed')}</span>
                <span className="text-xl font-black text-green-600">
                  {formatBalance((Number(userAchievements[5] || 0) / 1e18).toString())}
                </span>
              </div>
            </div>
          </div>

          {unlockedCount < 4 && totalNFTs > 0 && (
            <div className="mt-6 p-4 bg-yellow-100 border-2 border-yellow-400 text-center">
              <div className="font-black text-sm mb-1">
                {stakedTokens.length === 0
                  ? t('rewards.startJourney')
                  : unlockedCount === 0
                    ? t('rewards.achievementsToUnlock', { count: 4 - unlockedCount })
                    : t('rewards.moreTogo', { count: 4 - unlockedCount })
                }
              </div>
              <div className="text-xs opacity-75">
                {stakedTokens.length === 0
                  ? t('rewards.startJourneyDesc')
                  : unlockedCount === 0
                    ? t('rewards.keepGoing')
                    : t('rewards.keepStaking')
                }
              </div>
            </div>
          )}

          {unlockedCount === 4 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-2 border-black text-center animate-bounce">
              <div className="font-black text-lg mb-1">{t('rewards.legendStatus')}</div>
              <div className="text-sm opacity-90">{t('rewards.legendDesc')}</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
