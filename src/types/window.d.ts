
// Type definitions for Avalanche-compatible wallet extensions

interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on: (event: string, handler: (...args: any[]) => void) => void;
  removeListener: (event: string, handler: (...args: any[]) => void) => void;
  isMetaMask?: boolean;
  isOkxWallet?: boolean;
}

interface Window {
  ethereum?: EthereumProvider;
  okxwallet?: EthereumProvider;
}
