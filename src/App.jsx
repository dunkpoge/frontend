// src/App.jsx
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useWeb3 } from './hooks/useWeb3';
import { useContracts } from './hooks/useContracts';
import { Header } from './components/Header';
import { WrongNetworkBanner } from './components/WrongNetworkBanner';
import { WalletModal } from './components/WalletModal';
import { LanguageBar } from './components/LanguageBar';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { MintView } from './views/MintView';
import { StakeView } from './views/StakeView';
import { RewardsView } from './views/RewardsView';
import { MythologyView } from './views/MythologyView';
import { PrivacyView } from './views/PrivacyView';
import { DocsView } from './views/DocsView';
import { FAQView } from './views/FAQView';

// Inner component — must be inside HashRouter to use router hooks
const DunkPogeApp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Drop-in replacement for the old setView — all child components
  // (MintView, StakeView, RewardsView, Footer) call setView('stake') etc.
  // and it just becomes a hash navigation. No child files need to change.
  const setView = (viewName) => navigate(`/${viewName}`);

  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const openWalletModal = () => setWalletModalOpen(true);

  const {
    account,
    publicClient,
    walletClient,
    connectWallet,
    disconnect,
    isConnected,
    isWrongNetwork,
    switchToMainnet,
    availableWallets
  } = useWeb3();

  const {
    stats,
    saleActive,
    nftBalance,
    pogeBalance,
    stakedTokens,
    pendingRewards,
    emissionRate,
    rewardPoolBalance,
    pogeStats,
    userAchievements,
    isApproved,
    loading, dataLoading,
    mint,
    approveStaking,
    revokeApproval,
    stake,
    unstake,
    claim
  } = useContracts(publicClient, walletClient, account);

  // Derive active nav tab from URL for Navigation highlight
  const currentView = location.pathname.slice(1) || 'mint';

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <Header
        account={account}
        isConnected={isConnected}
        isWrongNetwork={isWrongNetwork}
        connectWallet={openWalletModal}
        disconnect={disconnect}
        stats={stats}
      />

      {isWrongNetwork && (
        <WrongNetworkBanner switchToMainnet={switchToMainnet} />
      )}

      <LanguageBar />

      <WalletModal
        isOpen={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        availableWallets={availableWallets}
        connectWallet={connectWallet}
      />

      <Navigation currentView={currentView} setView={setView} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            <MintView
              stats={stats}
              saleActive={saleActive}
              loading={loading}
              mint={mint}
              isConnected={isConnected}
              connectWallet={openWalletModal}
              nftBalance={nftBalance}
              setView={setView}
            />
          } />
          <Route path="/mint" element={
            <MintView
              stats={stats}
              saleActive={saleActive}
              loading={loading}
              mint={mint}
              isConnected={isConnected}
              connectWallet={openWalletModal}
              nftBalance={nftBalance}
              setView={setView}
            />
          } />
          <Route path="/stake" element={
            <StakeView
              isConnected={isConnected}
              connectWallet={openWalletModal}
              nftBalance={nftBalance}
              stakedTokens={stakedTokens}
              isApproved={isApproved}
              revokeApproval={revokeApproval}
              loading={loading}
              approveStaking={approveStaking}
              stake={stake}
              unstake={unstake}
              publicClient={publicClient}
              account={account}
              setView={setView}
              emissionRate={emissionRate}
            />
          } />
          <Route path="/rewards" element={
            <RewardsView
              isConnected={isConnected}
              connectWallet={openWalletModal}
              pogeBalance={pogeBalance}
              pendingRewards={pendingRewards}
              stakedTokens={stakedTokens}
              emissionRate={emissionRate}
              rewardPoolBalance={rewardPoolBalance}
              pogeStats={pogeStats}
              userAchievements={userAchievements}
              isApproved={isApproved}
              loading={loading}
              dataLoading={dataLoading}
              approveStaking={approveStaking}
              revokeApproval={revokeApproval}
              claim={claim}
              stats={stats}
              setView={setView}
              nftBalance={nftBalance}
            />
          } />
          <Route path="/mythology" element={<MythologyView />} />
          <Route path="/privacy"   element={<PrivacyView />} />
          <Route path="/docs"      element={<DocsView />} />
          <Route path="/faq"       element={<FAQView />} />
          {/* Catch-all → mint */}
          <Route path="*" element={
            <MintView
              stats={stats}
              saleActive={saleActive}
              loading={loading}
              mint={mint}
              isConnected={isConnected}
              connectWallet={openWalletModal}
              nftBalance={nftBalance}
              setView={setView}
            />
          } />
        </Routes>
      </main>

      <Footer setView={setView} />
    </div>
  );
};

// Outer wrapper provides HashRouter to the whole app.
// URLs become yoursite.com/#/mint, /#/stake, /#/docs etc.
// Works with static hosting, IPFS, and Arweave without any server config.
const App = () => (
  <HashRouter>
    <DunkPogeApp />
  </HashRouter>
);

export default App;
