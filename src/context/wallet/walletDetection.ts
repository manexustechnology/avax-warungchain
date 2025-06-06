
import { WalletType } from './types';

// Helper function to check if a specific wallet extension is installed
export const isWalletExtensionInstalled = (type: WalletType): boolean => {
  console.log(`Checking if ${type} wallet is installed`);
  
  switch (type) {
    case 'MetaMask':
      return typeof window.ethereum !== 'undefined' && 
             (window.ethereum.isMetaMask || false);
    case 'OKX':
      return typeof window.okxwallet !== 'undefined' || 
             (typeof window.ethereum !== 'undefined' && window.ethereum.isOkxWallet);
    default:
      return false;
  }
};
