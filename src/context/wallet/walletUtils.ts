
import { getAccountBalance, isConnectedToFuji } from '@/utils/avalanche';

// Function to fetch AVAX balance
export const fetchBalance = async (address: string): Promise<number | null> => {
  try {
    console.log("Fetching balance for address:", address);
    const balance = await getAccountBalance(address);
    return balance;
  } catch (error) {
    console.error('Error fetching AVAX balance:', error);
    return null;
  }
};

// Check if connected to Fuji Testnet
export const checkNetwork = async (): Promise<boolean> => {
  const onFuji = await isConnectedToFuji();
  return onFuji;
};
