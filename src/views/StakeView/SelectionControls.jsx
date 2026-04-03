// components/StakeView/SelectionControls.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const MAX_BATCH_SIZE = 100;

export const SelectionControls = ({
  userNFTs = [],
  selectedNFTs = [],
  selectionHandlers = {},
  showBatchWarning = true
}) => {
  const { t } = useTranslation();
  if (userNFTs.length === 0) return null;

  const unstakedCount = userNFTs.filter(nft => nft && !nft.isStaked).length;
  const stakedCount   = userNFTs.filter(nft => nft && nft.isStaked).length;

  return (
    <>
      {showBatchWarning && selectedNFTs.length === MAX_BATCH_SIZE && (
        <div className="mb-4 p-3 bg-yellow-500 text-black border-4 border-black font-bold text-sm">
          {t('selectionControls.maxSelected', { count: MAX_BATCH_SIZE })}
        </div>
      )}

      <div className="mb-6 p-4 bg-black border-4 border-white flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-black text-white">{t('selectionControls.title')}</span>
          <span className="text-sm opacity-75">
            {t('selectionControls.nOfTotal', { count: selectedNFTs.length, total: userNFTs.length })}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={selectionHandlers.selectAll}
            disabled={userNFTs.length === 0}
            className="px-3 py-1 bg-white text-black border-2 border-black font-bold text-xs hover:bg-gray-100 disabled:opacity-50"
          >
            {t('selectionControls.selectN', { count: Math.min(MAX_BATCH_SIZE, userNFTs.length) })}
          </button>
          <button
            onClick={selectionHandlers.deselectAll}
            disabled={selectedNFTs.length === 0}
            className="px-3 py-1 bg-black text-white border-2 border-white font-bold text-xs hover:bg-gray-900 disabled:opacity-50"
          >
            {t('selectionControls.clear')}
          </button>
          <button
            onClick={selectionHandlers.selectAllUnstaked}
            disabled={unstakedCount === 0}
            className="px-3 py-1 bg-green-400 text-black border-2 border-green-600 font-bold text-xs hover:bg-green-500 disabled:opacity-50"
          >
            {t('selectionControls.idle')} ({Math.min(MAX_BATCH_SIZE, unstakedCount)}/{unstakedCount})
          </button>
          <button
            onClick={selectionHandlers.selectAllStaked}
            disabled={stakedCount === 0}
            className="px-3 py-1 bg-yellow-400 text-black border-2 border-yellow-600 font-bold text-xs hover:bg-yellow-500 disabled:opacity-50"
          >
            {t('selectionControls.staked')} ({Math.min(MAX_BATCH_SIZE, stakedCount)}/{stakedCount})
          </button>
        </div>
      </div>
    </>
  );
};
