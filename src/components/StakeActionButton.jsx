// src/components/StakeActionButton.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const StakeActionButton = ({
  actionType,
  tokenIds = [],
  stakedCount = 0,
  isApproved = false,
  isLoading = false,
  onAction,
  className = '',
  size = 'medium'
}) => {
  const { t } = useTranslation();

  const getButtonConfig = () => {
    switch (actionType) {
      case 'stake':
        return {
          text: t('stakeAction.stake', { count: tokenIds.length }),
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          disabled: !isApproved || tokenIds.length === 0
        };
      case 'unstake':
        return {
          text: t('stakeAction.unstake', { count: tokenIds.length }),
          bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          disabled: tokenIds.length === 0
        };
      case 'revoke':
        return {
          text: stakedCount > 0
            ? t('stakeAction.unstakeAllFirst', { count: stakedCount })
            : t('stakeAction.revokeApproval'),
          bg: stakedCount > 0
            ? 'bg-yellow-500 hover:bg-yellow-600'
            : 'bg-red-500 hover:opacity-90',
          disabled: false
        };
      default:
        return { text: 'ACTION', bg: 'bg-gray-500', disabled: true };
    }
  };

  const config = getButtonConfig();
  const sizes = {
    small:  'px-3 py-1 text-xs',
    medium: 'px-4 py-2 text-sm',
    large:  'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={onAction}
      disabled={config.disabled || isLoading}
      className={`
        ${config.bg}
        ${sizes[size]}
        text-white font-black border-4 border-black
        hover:opacity-90 disabled:opacity-50
        transition-all shadow-[4px_4px_0_0_#000]
        hover:-translate-x-0.5 hover:-translate-y-0.5
        ${className}
      `}
    >
      {isLoading ? t('common.processing') : config.text}
    </button>
  );
};
