
// Avalanche Fuji Testnet utility functions

// Fuji Testnet configuration
export const FUJI_CONFIG = {
  chainId: '0xa869', // 43113 in hex
  chainName: 'Avalanche Fuji Testnet',
  nativeCurrency: {
    name: 'AVAX',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://subnets-test.avax.network/c-chain'],
};

// Function to get account balance from Avalanche Fuji Testnet
export const getAccountBalance = async (address: string): Promise<number> => {
  console.log(`Getting balance for Avalanche address: ${address}`);
  
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new (await import('ethers')).BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(address);
      const balanceInAvax = parseFloat((await import('ethers')).formatEther(balance));
      return balanceInAvax;
    }
    return 0;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
};

// Function to send AVAX tokens
export const sendTokens = async (
  to: string,
  amount: number
): Promise<{ success: boolean; txHash?: string; error?: string }> => {
  console.log(`Sending ${amount} AVAX to ${to}`);
  
  try {
    if (typeof window.ethereum !== 'undefined') {
      const { BrowserProvider, parseEther } = await import('ethers');
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: to,
        value: parseEther(amount.toString()),
      });
      
      const receipt = await tx.wait();
      
      return {
        success: true,
        txHash: receipt?.hash || tx.hash
      };
    }
    
    throw new Error('No wallet provider found');
  } catch (error: any) {
    console.error('Error sending tokens:', error);
    return {
      success: false,
      error: error.message || 'Transaction failed'
    };
  }
};

// Function to switch to Fuji Testnet
export const switchToFujiTestnet = async (): Promise<boolean> => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: FUJI_CONFIG.chainId }],
      });
      return true;
    }
    return false;
  } catch (error: any) {
    // If the chain hasn't been added to the wallet, add it
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [FUJI_CONFIG],
        });
        return true;
      } catch (addError) {
        console.error('Failed to add Fuji Testnet:', addError);
        return false;
      }
    }
    console.error('Failed to switch to Fuji Testnet:', error);
    return false;
  }
};

// Function to get token information (AVAX)
export const getTokenInfo = async (): Promise<{
  symbol: string;
  name: string;
  decimals: number;
}> => {
  return {
    symbol: "AVAX",
    name: "Avalanche",
    decimals: 18
  };
};

// Function to check if wallet is connected to Fuji Testnet
export const isConnectedToFuji = async (): Promise<boolean> => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      return chainId === FUJI_CONFIG.chainId;
    }
    return false;
  } catch (error) {
    console.error('Error checking network:', error);
    return false;
  }
};
