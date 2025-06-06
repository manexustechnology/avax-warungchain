
import { WalletType } from './types';

// Connect to MetaMask
export const connectToMetaMask = async (): Promise<string> => {
  console.log("Attempting to connect to MetaMask");
  
  if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
    throw new Error("MetaMask extension is not installed");
  }
  
  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    
    throw new Error("Failed to get account address from MetaMask");
  } catch (error) {
    console.error("MetaMask connection error:", error);
    throw error;
  }
};

// Connect to OKX Wallet
export const connectToOKXWallet = async (): Promise<string> => {
  console.log("Attempting to connect to OKX Wallet");
  
  // Try OKX specific provider first
  let provider = window.okxwallet;
  
  // Fallback to ethereum provider if it's OKX
  if (!provider && window.ethereum?.isOkxWallet) {
    provider = window.ethereum;
  }
  
  if (!provider) {
    throw new Error("OKX Wallet extension is not installed");
  }
  
  try {
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    });
    
    if (accounts && accounts.length > 0) {
      return accounts[0];
    }
    
    throw new Error("Failed to get account address from OKX Wallet");
  } catch (error) {
    console.error("OKX Wallet connection error:", error);
    throw error;
  }
};

// Function to redirect user to wallet installation page
export const redirectToWalletInstallPage = (type: WalletType, walletUrls: Record<string, string>) => {
  if (type && walletUrls[type]) {
    window.open(walletUrls[type], '_blank');
  }
};
