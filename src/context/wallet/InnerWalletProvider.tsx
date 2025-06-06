
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WalletContext } from './useWalletContext';
import { WalletType, InnerWalletProviderProps } from './types';
import { switchToFujiTestnet } from '@/utils/avalanche';
import { WALLET_URLS } from './constants';
import { isWalletExtensionInstalled } from './walletDetection';
import { connectToMetaMask, connectToOKXWallet, redirectToWalletInstallPage } from './walletConnectors';
import { fetchBalance, checkNetwork } from './walletUtils';

// This provider implements wallet functionality for Avalanche Fuji Testnet
const InnerWalletProvider = ({ children }: InnerWalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [walletType, setWalletType] = useState<WalletType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnFujiTestnet, setIsOnFujiTestnet] = useState(false);
  const { toast } = useToast();

  // Effect to check local storage for saved wallet type on initial load
  useEffect(() => {
    const savedWalletType = localStorage.getItem('walletType') as WalletType;
    if (savedWalletType) {
      setWalletType(savedWalletType);
      // Auto-reconnect if wallet was previously connected
      connect(savedWalletType).catch(console.error);
    }
  }, []);

  // Update balance and network when wallet address changes
  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress).then(setBalance).catch(console.error);
      checkNetwork().then(setIsOnFujiTestnet).catch(console.error);
    }
  }, [walletAddress]);

  // Listen for network changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleChainChanged = () => {
        checkNetwork().then(setIsOnFujiTestnet).catch(console.error);
        if (walletAddress) {
          fetchBalance(walletAddress).then(setBalance).catch(console.error);
        }
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== walletAddress) {
          setWalletAddress(accounts[0]);
        }
      };

      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, [walletAddress]);

  const connect = async (type: WalletType) => {
    try {
      setIsLoading(true);
      
      // Check if the wallet extension is installed
      if (!isWalletExtensionInstalled(type)) {
        console.error(`${type} wallet extension not detected. Will redirect to installation page.`);
        
        toast({
          title: "Wallet Extension Not Found",
          description: `${type} wallet extension is not installed. Redirecting to download page...`,
          variant: "destructive",
        });
        
        setTimeout(() => {
          redirectToWalletInstallPage(type, WALLET_URLS);
        }, 2000);
        
        return Promise.reject(new Error(`${type} wallet extension not detected`));
      }
      
      let address = '';
      
      // Connect to the specific wallet type
      switch (type) {
        case 'MetaMask':
          address = await connectToMetaMask();
          break;
        case 'OKX':
          address = await connectToOKXWallet();
          break;
        default:
          throw new Error(`Unsupported wallet type: ${type}`);
      }
      
      if (!address) {
        throw new Error(`Failed to get address from ${type} wallet`);
      }
      
      console.log(`Connected to ${type} wallet with address: ${address}`);
      
      // Update state with wallet address
      setWalletAddress(address);
      setIsConnected(true);
      setWalletType(type);
      
      // Save to local storage
      localStorage.setItem('walletType', type);
      
      // Check if connected to Fuji Testnet
      const onFuji = await checkNetwork();
      setIsOnFujiTestnet(onFuji);
      
      if (!onFuji) {
        toast({
          title: "Switch to Fuji Testnet",
          description: "Please switch to Avalanche Fuji Testnet to use this application.",
          variant: "destructive",
        });
      } else {
        toast({
          title: `${type} Wallet Connected`,
          description: `Your ${type} wallet has been successfully connected to Fuji Testnet.`,
        });
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error(`Error connecting to ${type} wallet:`, error);
      
      const errorMessage = error instanceof Error ? error.message : `Failed to connect your ${type} wallet.`;
      
      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const switchToFuji = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const success = await switchToFujiTestnet();
      
      if (success) {
        const onFuji = await checkNetwork();
        setIsOnFujiTestnet(onFuji);
        
        if (onFuji) {
          toast({
            title: "Network Switched",
            description: "Successfully switched to Avalanche Fuji Testnet.",
          });
          
          // Refresh balance after network switch
          if (walletAddress) {
            const newBalance = await fetchBalance(walletAddress);
            setBalance(newBalance);
          }
        }
      } else {
        toast({
          title: "Network Switch Failed",
          description: "Failed to switch to Fuji Testnet. Please try manually.",
          variant: "destructive",
        });
      }
      
      return success;
    } catch (error) {
      console.error("Error switching to Fuji Testnet:", error);
      toast({
        title: "Network Switch Error",
        description: "An error occurred while switching networks.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    // Reset wallet state
    setIsConnected(false);
    setWalletAddress(null);
    setBalance(null);
    setWalletType(null);
    setIsOnFujiTestnet(false);
    localStorage.removeItem('walletType');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  const value = {
    isConnected,
    walletAddress,
    balance,
    walletType,
    connect,
    disconnect,
    isLoading,
    switchToFuji,
    isOnFujiTestnet
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default InnerWalletProvider;
