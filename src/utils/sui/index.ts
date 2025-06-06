
// This file has been deprecated in favor of Avalanche utilities
// All SUI-related functionality has been moved to src/utils/avalanche/

// Re-export Avalanche utilities for backward compatibility
export { 
  getAccountBalance, 
  sendTokens, 
  getTokenInfo,
  switchToFujiTestnet,
  isConnectedToFuji,
  FUJI_CONFIG
} from '../avalanche';

console.warn('SUI utilities are deprecated. Please use Avalanche utilities from src/utils/avalanche/');
