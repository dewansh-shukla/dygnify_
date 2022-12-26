import "@rainbow-me/rainbowkit/styles.css"
import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit"
import { chain, configureChains, createClient, WagmiConfig } from "wagmi"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { publicProvider } from "wagmi/providers/public"
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom"
import Home from "./screens/Home/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
])
const App = () => {
  const { chains, provider } = configureChains(
    [
      chain.polygonMumbai,
      chain.mainnet,
      chain.polygon,
      chain.optimism,
      chain.arbitrum,
    ],
    [
      alchemyProvider({
        apiKey: process.env.REACT_APP_ALCHEMY_KEY || "",
      }),
      publicProvider(),
    ]
  )
  const { connectors } = getDefaultWallets({
    appName: "stake_stream",
    chains,
  })
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <RouterProvider router={router} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
