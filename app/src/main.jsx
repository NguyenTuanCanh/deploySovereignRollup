// import "./polyfills";
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { injectedWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

import { faTwitter, faGithub, faDiscord, faGgCircle } from "@fortawesome/free-brands-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas, faTwitter, faGithub, faDiscord, faGgCircle)

/* create configuration for Ethermint testnet */
const ethermint = {
  id: 9000,
  name: 'Ethermint',
  network: 'ethermint',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethermint',
    symbol: 'CTE',
  },
  rpcUrls: {
    default: {
      http: ['http://localhost:8545/'],
    },
  },
  testnet: true,
};

// remove chain.localhost or ethermint depending on which you want to connect to
const { chains, provider } = configureChains( 
  [chain.localhost, ethermint],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      injectedWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const containerStyle = {
  margin: '0 auto'
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <div style={containerStyle}>
        <App />
      </div>
    </RainbowKitProvider>
  </WagmiConfig>
)