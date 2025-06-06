
import React from 'react';
import { Wallet, ChevronDown, Loader, AlertTriangle, ExternalLink } from 'lucide-react';
import { useWallet } from '@/context/wallet'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { WalletType } from '@/context/wallet/types';
import { useLanguage } from '@/context/LanguageContext';

type WalletButtonProps = {
  fullWidth?: boolean;
  navigateToLogin?: boolean;
};

const WalletButton = ({ fullWidth = false, navigateToLogin = false }: WalletButtonProps) => {
  const { 
    isConnected, 
    connect, 
    disconnect, 
    walletAddress, 
    walletType, 
    isLoading,
    switchToFuji,
    isOnFujiTestnet,
    balance
  } = useWallet();
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const { t, language } = useLanguage();

  const handleConnect = async (walletType: WalletType) => {
    if (navigateToLogin) {
      navigate('/login');
      return;
    }

    try {
      await connect(walletType);
      
      // Auto login as buyer when connecting wallet
      if (!user) {
        await signIn('wallet@example.com', 'walletauth');
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  const handleSwitchToFuji = async () => {
    await switchToFuji();
  };

  if (isConnected) {
    return (
      <div className={`${fullWidth ? 'w-full' : ''} space-y-2`}>
        {!isOnFujiTestnet && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              You're not connected to Fuji Testnet. 
              <Button 
                variant="link" 
                className="p-0 h-auto text-orange-600 underline ml-1"
                onClick={handleSwitchToFuji}
              >
                Switch Network
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        <div className={`flex items-center justify-between p-3 border rounded-lg bg-white ${fullWidth ? 'w-full' : ''}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">A</span>
            </div>
            <div>
              <div className="text-sm font-medium">
                {walletType} • {`${walletAddress?.substring(0, 6)}...${walletAddress?.substring(walletAddress.length - 4)}`}
              </div>
              <div className="text-xs text-gray-500">
                {balance !== null ? `${balance.toFixed(4)} AVAX` : 'Loading...'}
                {isOnFujiTestnet && (
                  <span className="ml-2 text-green-600">• Fuji Testnet</span>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisconnect}
            disabled={isLoading}
          >
            Disconnect
          </Button>
        </div>
      </div>
    );
  }

  const walletLabel = language === 'en' ? 'Connect Wallet' : 'Hubungkan Wallet';
  const loadingLabel = language === 'en' ? 'Connecting...' : 'Menghubungkan...';
  const installLabel = language === 'en' ? 'Don\'t have a wallet?' : 'Belum punya wallet?';
  const getTestTokensLabel = language === 'en' ? 'Get Test AVAX Tokens' : 'Dapatkan Token AVAX Test';
  const explorerLabel = language === 'en' ? 'View on Explorer' : 'Lihat di Explorer';

  return (
    <div className={`${fullWidth ? 'w-full' : ''} space-y-3`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={`btn-primary flex items-center justify-center space-x-2 ${fullWidth ? 'w-full' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                {loadingLabel}
              </span>
            ) : (
              <>
                <Wallet className="h-5 w-5" />
                <span>{walletLabel}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={() => handleConnect('MetaMask')}>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">M</span>
              </div>
              <span>MetaMask</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleConnect('OKX')}>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">O</span>
              </div>
              <span>OKX Wallet</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <div className="px-2 py-1 text-xs text-gray-500">
            <span>{installLabel}</span>
          </div>
          <DropdownMenuItem onClick={() => window.open('https://metamask.io/download/', '_blank')}>
            <span className="text-xs">Install MetaMask</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => window.open('https://www.okx.com/web3', '_blank')}>
            <span className="text-xs">Install OKX Wallet</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Fuji Testnet Info */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span>Avalanche Fuji Testnet</span>
        </div>
        
        <div className="flex justify-center space-x-4 text-xs">
          <button
            onClick={() => window.open('https://faucet.avax.network/', '_blank')}
            className="text-blue-600 hover:underline flex items-center space-x-1"
          >
            <span>{getTestTokensLabel}</span>
            <ExternalLink className="h-3 w-3" />
          </button>
          <button
            onClick={() => window.open('https://subnets-test.avax.network/c-chain', '_blank')}
            className="text-blue-600 hover:underline flex items-center space-x-1"
          >
            <span>{explorerLabel}</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletButton;
