// src/views/StakeView/UniversalControlBar.jsx
import React, { useState } from 'react';
import { RefreshCw, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UniversalControlBar = ({
  stakedCount,
  unstakedCount,
  selectedCount,
  onSync,
  isLoading,
  onStakeAll,
  onUnstakeAll,
  isApproved,
  loading,
  approveStaking,
  revokeApproval,
  onEmergencyUnstake
}) => {
  const { t } = useTranslation();
  const [showEmergencyConfirm, setShowEmergencyConfirm] = useState(false);

  const handleEmergencyClick = () => {
    if (stakedCount === 0) return;
    setShowEmergencyConfirm(true);
  };

  const confirmEmergencyUnstake = () => {
    setShowEmergencyConfirm(false);
    onEmergencyUnstake();
  };

  return (
    <div className="mb-6 p-4 bg-black border-4 border-white">

      {/* Emergency Confirmation Modal */}
      {showEmergencyConfirm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-red-500 border-4 border-black p-6 max-w-md w-full shadow-[12px_12px_0_0_#000]">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={32} className="text-white" />
              <h3 className="text-2xl font-black text-white">{t('controlBar.emergencyTitle')}</h3>
            </div>
            <p className="text-white font-bold mb-6">
              {t('controlBar.emergencyWarning', { count: stakedCount })}
            </p>
            <div className="flex gap-3">
              <button
                onClick={confirmEmergencyUnstake}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-white text-red-600 font-black border-2 border-black hover:opacity-90 disabled:opacity-50 transition-all"
              >
                {loading ? t('controlBar.unstaking') : t('controlBar.emergencyConfirm')}
              </button>
              <button
                onClick={() => setShowEmergencyConfirm(false)}
                className="flex-1 py-3 px-4 bg-black text-white font-black border-2 border-white hover:opacity-90 transition-all"
              >
                {t('controlBar.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats + Approval row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b-4 border-white">

        {/* Left: Stats and Sync */}
        <div className="flex items-center gap-3 text-sm">
          <div>
            <span className="text-yellow-400 font-bold">{stakedCount}</span>
            <span className="text-white/60 ml-1">{t('controlBar.staked')}</span>
          </div>
          <span className="text-white/30">•</span>
          <div>
            <span className="text-green-400 font-bold">{unstakedCount}</span>
            <span className="text-white/60 ml-1">{t('controlBar.idle')}</span>
          </div>
          {selectedCount > 0 && (
            <>
              <span className="text-white/30">•</span>
              <div>
                <span className="text-blue-400 font-bold">{selectedCount}</span>
                <span className="text-white/60 ml-1">{t('controlBar.selected')}</span>
              </div>
            </>
          )}
          <span className="text-white/30">•</span>
          <button
            onClick={onSync}
            disabled={isLoading}
            className="flex items-center gap-1 text-white/60 hover:text-white transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            <span className="font-bold">{isLoading ? t('controlBar.syncing') : t('controlBar.sync')}</span>
          </button>
        </div>

        {/* Right: Approval + Emergency */}
        <div className="flex flex-wrap items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1 border-2 text-xs font-bold ${
            isApproved
              ? 'bg-green-500/20 border-green-500 text-green-400'
              : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
          }`}>
            {isApproved ? <Unlock size={12} /> : <Lock size={12} />}
            <span>{isApproved ? t('controlBar.approved') : t('controlBar.notApproved')}</span>
          </div>

          {isApproved ? (
            <button
              onClick={revokeApproval}
              disabled={loading}
              className="px-3 py-1 bg-red-500 text-white border-2 border-black font-bold text-xs hover:bg-red-600 disabled:opacity-50 transition-all"
            >
              {loading ? t('controlBar.revoking') : t('controlBar.revoke')}
            </button>
          ) : (
            <button
              onClick={approveStaking}
              disabled={loading}
              className="px-3 py-1 bg-yellow-400 text-black border-2 border-black font-bold text-xs hover:bg-yellow-500 disabled:opacity-50 transition-all"
            >
              {loading ? t('controlBar.approving') : t('controlBar.approve')}
            </button>
          )}

          {stakedCount > 0 && (
            <>
              <span className="text-white/30">|</span>
              <button
                onClick={handleEmergencyClick}
                disabled={loading}
                className="px-3 py-1 bg-red-600 text-white border-2 border-black font-bold text-xs hover:bg-red-700 disabled:opacity-50 transition-all flex items-center gap-1"
              >
                <AlertTriangle size={12} />
                <span>{t('controlBar.emergency')}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Whale action buttons */}
      {(unstakedCount > 0 || stakedCount > 0) && (
        <>
          <div className="flex flex-wrap gap-3 mb-3 pt-4">
            {unstakedCount > 0 && (
              <button
                onClick={onStakeAll}
                disabled={!isApproved || loading}
                className="flex-1 min-w-[200px] py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-black font-bold border-2 border-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]"
              >
                {!isApproved
                  ? t('controlBar.approveToStakeAll')
                  : t('controlBar.stakeAll', { count: unstakedCount })}
              </button>
            )}
            {stakedCount > 0 && (
              <button
                onClick={onUnstakeAll}
                disabled={loading}
                className="flex-1 min-w-[200px] py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold border-2 border-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]"
              >
                {t('controlBar.unstakeAll', { count: stakedCount })}
              </button>
            )}
          </div>
          <div className="text-xs text-white/50 text-center">
            {t('controlBar.selectBelow')}
          </div>
        </>
      )}
    </div>
  );
};
