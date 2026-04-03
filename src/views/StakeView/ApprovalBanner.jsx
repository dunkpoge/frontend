// components/StakeView/ApprovalBanner.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ApprovalBanner = ({
  isApproved,
  loading,
  approveStaking,
  revokeApproval,
  setView,
  getStakedNFTs = () => [],
  getUnstakedNFTs = () => []
}) => {
  const { t } = useTranslation();
  const stakedCount = getStakedNFTs().length;
  const unstakedCount = getUnstakedNFTs().length;

  if (!isApproved && unstakedCount > 0) {
    return (
      <div className="sticky top-0 z-30 mb-6 p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black border-4 border-black shadow-[0_4px_0_0_#000] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <AlertCircle size={20} />
          <span className="font-black text-sm">{t('approvalBanner.approvalNeeded')}</span>
        </div>
        <button
          onClick={approveStaking}
          disabled={loading}
          className="font-black py-2 px-4 border-2 border-black bg-white text-black hover:opacity-90 disabled:opacity-50 transition-all text-sm"
        >
          {loading ? t('approvalBanner.approving') : t('approvalBanner.approveNow')}
        </button>
      </div>
    );
  }

  if (isApproved) {
    return (
      <div className="sticky top-0 z-30 mb-6 p-4 bg-gradient-to-r from-green-400 to-green-600 text-black border-4 border-black shadow-[0_4px_0_0_#000] flex items-center justify-between gap-4">
        <div className="font-black text-sm">
          {t('approvalBanner.stakingApproved')} • {stakedCount} {t('approvalBanner.earning')} • {unstakedCount} {t('approvalBanner.idle')}
        </div>
        <div className="flex gap-2">
          <button
            onClick={revokeApproval}
            disabled={loading}
            className="px-4 py-2 border-2 border-black bg-red-500 text-white font-black hover:opacity-90 transition-all disabled:opacity-50 text-xs"
          >
            {loading ? t('approvalBanner.revoking') : t('approvalBanner.revokeApproval')}
          </button>
          <button
            onClick={() => setView('rewards')}
            className="px-4 py-2 border-2 border-black bg-blue-600 text-white font-black hover:opacity-90 transition-all text-xs"
          >
            {t('approvalBanner.viewRewards')}
          </button>
        </div>
      </div>
    );
  }

  return null;
};
