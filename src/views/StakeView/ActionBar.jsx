// src/views/StakeView/ActionBar.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ActionBar = ({
  selectedNFTs = [],
  selectedStakedNFTs = [],
  selectedUnstakedNFTs = [],
  isApproved,
  loading,
  handleStake,
  handleUnstake,
  approveStaking,
  emissionRate = '0',
  onDeselectAll
}) => {
  const { t } = useTranslation();
  if (selectedNFTs.length === 0) return null;

  const totalSelected = selectedNFTs.length;
  const stakeableCount = selectedUnstakedNFTs.length;
  const unstakeableCount = selectedStakedNFTs.length;

  return (
    <div className="sticky top-0 z-40 mb-6">
      <div className={`p-4 border-4 border-black shadow-[0_4px_0_0_#000] ${
        stakeableCount > 0 && !isApproved
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
          : stakeableCount > 0
          ? 'bg-gradient-to-r from-green-400 to-green-600'
          : 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      } text-black`}>

        <div className="flex items-center justify-between gap-4">
          {/* Left: Selection Info */}
          <div className="font-black text-lg flex items-center gap-3">
            <span className="bg-black text-white px-3 py-1 border-2 border-white">
              {t('actionBar.selected', { count: totalSelected })}
            </span>
            {stakeableCount > 0 && (
              <span className="hidden sm:inline text-sm">
                {t('actionBar.readyToStake', { count: stakeableCount })}
              </span>
            )}
            {unstakeableCount > 0 && (
              <span className="hidden sm:inline text-sm">
                {t('actionBar.readyToUnstake', { count: unstakeableCount })}
              </span>
            )}
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            {stakeableCount > 0 && (
              !isApproved ? (
                <button
                  onClick={approveStaking}
                  disabled={loading}
                  className="font-bold py-2 px-6 border-2 border-black bg-white text-black hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {loading ? t('actionBar.approving') : t('actionBar.approveFirst')}
                </button>
              ) : (
                <button
                  onClick={handleStake}
                  disabled={loading}
                  className="font-bold py-2 px-6 border-2 border-black bg-white text-black hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {loading ? t('actionBar.staking') : t('actionBar.stake', { count: stakeableCount })}
                </button>
              )
            )}

            {unstakeableCount > 0 && (
              <button
                onClick={handleUnstake}
                disabled={loading}
                className="font-bold py-2 px-6 border-2 border-black bg-white text-black hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? t('actionBar.unstaking') : t('actionBar.unstake', { count: unstakeableCount })}
              </button>
            )}

            <button
              onClick={onDeselectAll}
              className="px-3 py-2 bg-black/40 border-2 border-black/50 hover:bg-black/60 transition-all font-bold text-xs text-white"
            >
              {t('actionBar.clear')}
            </button>
          </div>
        </div>

        {stakeableCount > 0 && isApproved && (
          <div className="mt-2 text-center text-sm font-bold">
            {t('actionBar.estEarnings', {
              amount: (stakeableCount * parseFloat(emissionRate || '0') * 86400).toFixed(1)
            })}
          </div>
        )}
      </div>
    </div>
  );
};
