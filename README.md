# Dunk Poge — Frontend

> 10,000 fully on-chain generative NFTs with staking rewards on Ethereum.  
> Much trustless • Very decentralized • Wow

## Live Site

[dunkpoge.com](https://dunkpoge.com)

## Smart Contracts

| Contract | Address |
|----------|---------|
| DunkPoge NFT | [Etherscan →](https://etherscan.io/address/0xdE912cCB0c7F437A317D7A2Fd206E5C4D61f2B9B#code) |
| Pogecoin (POGE) | [Etherscan →](https://etherscan.io/address/0x9CE5C3B543269008fE4522f8bF2eb595C5BeE4E1#code) |
| DunkPogeStaking | [Etherscan →](https://etherscan.io/address/0x9C2ec41B477DeD75579Cb096A4Cf55201C164d0e#code) |

Source: [github.com/dunkpoge/smart-contracts](https://github.com/dunkpoge/smart-contracts)

## Getting Started

```bash
git clone https://github.com/dunkpoge/frontend
cd frontend
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
yarn build
```

Output goes to the `build/` folder, ready for static hosting, IPFS, or Arweave.

## Tech Stack

- React 18
- React Router v6 (hash routing — works on static/decentralized hosting)
- ethers.js
- i18next (8 languages: EN, ZH, JA, KO, PT, TR, VI, ID)
- Tailwind CSS
- Lucide React

## Project Structure

```
src/
├── views/          # Page-level components (Mint, Stake, Rewards, Docs, FAQ...)
├── components/     # Shared UI components
│   └── NFTSimulator/  # Free NFT preview (no wallet required)
├── hooks/          # Web3 + contract hooks
├── config/         # Contract ABIs and addresses
├── locales/        # i18n translation files
└── utils/          # Helpers
```

## Languages

Translations live in `src/locales/{lang}/translation.json`.  
Currently supported: `en` `zh` `ja` `ko` `pt` `tr` `vi` `id`

## No Backend

This is a fully static frontend. All data comes directly from Ethereum smart contracts — no API, no database, no server. You can run it locally or deploy it anywhere.

## Links

- [Manifesto](https://trustlessness.eth.limo/general/2025/11/11/the-trustless-manifesto.html)
- [Discord](https://discord.gg/7PsZwC3TZX)
- [Twitter](https://twitter.com/dunkpoge)
- [OpenSea](https://opensea.io/collection/dunk-poge)

## License

MIT
