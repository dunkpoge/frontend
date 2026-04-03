// components/StakeView/StatusSummary.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const StatusSummary = ({
  userNFTs = [],
  selectedNFTs = [],
  selectedType,
  emissionRate = '0'
}) => {
  const { t } = useTranslation();
  if (userNFTs.length === 0) return null;

  const unstakedCount = userNFTs.filter(nft => nft && !nft.isStaked).length;
  const stakedCount   = userNFTs.filter(nft => nft && nft.isStaked).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className={`p-4 border-4 ${selectedNFTs.length > 0 && selectedType === 'unstaked' ? 'border-blue-500 bg-blue-500/10' : 'border-green-400'}`}>
        <div className="text-sm opacity-75">{t('statusSummary.readyToStake')}</div>
        <div className="text-2xl font-black flex items-center justify-between">
          <span>{unstakedCount}</span>
          {selectedNFTs.length > 0 && selectedType === 'unstaked' && (
            <span className="text-blue-500 text-sm">✓ {t('statusSummary.nSelected', { count: selectedNFTs.length })}</span>
          )}
        </div>
        <div className="text-xs mt-1">
          {t('statusSummary.estPerDay', { amount: (unstakedCount * parseFloat(emissionRate || '0') * 86400).toFixed(2) })}
        </div>
      </div>

      <div className={`p-4 border-4 ${selectedNFTs.length > 0 && selectedType === 'staked' ? 'border-blue-500 bg-blue-500/10' : 'border-yellow-600'} bg-yellow-400 text-gray-900 font-bold`}>
        <div className="text-sm opacity-75">{t('statusSummary.currentlyEarning')}</div>
        <div className="text-2xl font-black flex items-center justify-between">
          <span>{stakedCount}</span>
          {selectedNFTs.length > 0 && selectedType === 'staked' && (
            <span className="text-blue-500 text-sm">✓ {t('statusSummary.nSelected', { count: selectedNFTs.length })}</span>
          )}
        </div>
        <div className="text-xs mt-1">
          {t('statusSummary.earningPerDay', { amount: (stakedCount * parseFloat(emissionRate || '0') * 86400).toFixed(2) })}
        </div>
      </div>

      <div className="p-4 border-4 border-blue-800 bg-blue-600 text-white">
        <div className="text-sm opacity-75">{t('statusSummary.selectedForAction')}</div>
        <div className="text-2xl font-black">{selectedNFTs.length}</div>
        <div className="text-xs mt-1">
          {selectedNFTs.length > 0
            ? selectedType === 'staked' ? t('statusSummary.readyToUnstake') : t('statusSummary.readyToStakeLabel')
            : t('statusSummary.selectNFTs')
          }
        </div>
      </div>
    </div>
  );
};
