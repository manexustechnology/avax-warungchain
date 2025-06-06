
import { ReactNode } from 'react';

// Define wallet types for Avalanche ecosystem
export type WalletType = 'MetaMask' | 'OKX' | null;

export interface WalletContextType {
  isConnected: boolean;
  walletAddress: string | null;
  balance: number | null;
  walletType: WalletType;
  connect: (walletType: WalletType) => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
  switchToFuji: () => Promise<boolean>;
  isOnFujiTestnet: boolean;
}

export interface WalletProviderProps {
  children: ReactNode;
}

export interface InnerWalletProviderProps {
  children: ReactNode;
}
