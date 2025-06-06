
import React from 'react';
import { usePrivyAuth, PrivyAuthInnerProvider } from '@/context/PrivyContext';
import { AuthContextType } from './types';
import { createContext } from 'react';

// Create AuthContext as a wrapper around PrivyContext for backward compatibility
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Wrapper component that passes PrivyAuth values to AuthContext
const AuthProviderInner = ({ children }: { children: React.ReactNode }) => {
  const privyAuth = usePrivyAuth();
  
  // Map Privy auth methods to our AuthContext interface
  const authContextValue: AuthContextType = {
    user: privyAuth.user as any,
    session: null, // No longer using Supabase sessions
    isLoading: privyAuth.isLoading,
    userProfile: privyAuth.user,
    userLoadError: false, // Convert Error to boolean
    
    // Main auth methods - wrap to return proper format
    signUp: async (email, password, metadata) => {
      try {
        const result = await privyAuth.signUp(email, password, metadata as any);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    signIn: async (email, password, metadata) => {
      try {
        const result = await privyAuth.login(email, password, metadata as any);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    signInWithOAuth: async () => ({ success: false, error: 'OAuth not supported' }),
    signOut: async () => {
      try {
        await privyAuth.logout();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    updateProfile: async (updates) => {
      try {
        const result = await privyAuth.updateProfile(updates);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    
    // User management
    getUserDetails: privyAuth.getUserDetails,
    getUsers: privyAuth.getUsers,
    createUser: async (name, email, role) => {
      await privyAuth.createUser(name, email, role);
    },
    
    // Legacy alias methods
    login: async (email, password, metadata) => {
      try {
        const result = await privyAuth.login(email, password, metadata as any);
        return { success: true, data: result };
      } catch (error) {
        return { success: false, error };
      }
    },
    loginWithGoogle: async () => ({ success: false, error: 'Google login not supported' }),
    logout: async () => {
      try {
        await privyAuth.logout();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    }
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export new AuthProvider that wraps PrivyAuthInnerProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyAuthInnerProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </PrivyAuthInnerProvider>
  );
};

export default AuthProvider;
