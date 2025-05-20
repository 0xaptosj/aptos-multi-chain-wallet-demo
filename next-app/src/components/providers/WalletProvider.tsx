"use client";

import {
  AptosWalletAdapterProvider,
  Network,
} from "@aptos-labs/wallet-adapter-react";
import { setupAutomaticEthereumWalletDerivation } from "@aptos-labs/derived-wallet-ethereum";
import { setupAutomaticSolanaWalletDerivation } from "@aptos-labs/derived-wallet-solana";
import { PropsWithChildren } from "react";
import { useToast } from "@/components/ui/use-toast";
import { NETWORK } from "@/lib/aptos";

setupAutomaticEthereumWalletDerivation({ defaultNetwork: NETWORK });
setupAutomaticSolanaWalletDerivation({ defaultNetwork: NETWORK });

export const WalletProvider = ({ children }: PropsWithChildren) => {
  const { toast } = useToast();

  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: NETWORK,
        aptosApiKeys: {
          devnet: process.env.NEXT_PUBLIC_APTOS_API_KEY,
        },
      }}
      // optInWallets={["Continue with Google", "Petra", "Nightly"]}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};
