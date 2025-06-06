
import React, { createContext } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/types/auth';
import { PrivyAuthContextType } from './types';
import { useLoadUserData } from './useLoadUserData';
import { 
  loginWithEmail, 
  logout as logoutUser, 
  updateProfile as updateUserProfile,
  createUserAccount
} from './auth';

// Create the context
export const PrivyAuthContext = createContext<PrivyAuthContextType | undefined>(undefined);

// Inner provider that has access to Privy hooks
export const PrivyAuthInnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    login: privyLogin, 
    logout: privyLogout, 
    authenticated 
  } = usePrivy();
  
  const { 
    user, 
    setUser, 
    userLoadError, 
    isLoading, 
    setIsLoading,
    users,
    setUsers
  } = useLoadUserData();
  
  const { toast } = useToast();

  // Email login (with support for demo users)
  const login = async (email: string, password: string, role?: string) => {
    return loginWithEmail(
      email, 
      password, 
      role, 
      privyLogin, 
      setUser, 
      setIsLoading, 
      toast
    );
  };
  
  // Logout - properly wrap privyLogout to return Promise<void>
  const logout = async (): Promise<void> => {
    const asyncPrivyLogout = (): Promise<void> => {
      return new Promise<void>((resolve) => {
        privyLogout();
        // Small delay to ensure logout completes
        setTimeout(() => resolve(), 100);
      });
    };
    
    await logoutUser(authenticated, asyncPrivyLogout, setUser, toast);
  };
  
  // Update user profile - wrap to return Promise<boolean>
  const updateProfile = async (updates: Record<string, any>): Promise<boolean> => {
    const result = await updateUserProfile(user, updates, setUser, toast);
    return result.success;
  };
  
  // Create a new user for the store
  const createUser = async (name: string, email: string, role: 'cashier' | 'inventory'): Promise<void> => {
    return createUserAccount(name, email, role, user, setUsers, toast);
  };
  
  // Get user details
  const getUserDetails = (): User | null => {
    return user;
  };
  
  // Get users (for admins)
  const getUsers = (): User[] => {
    return users;
  };
  
  return (
    <PrivyAuthContext.Provider 
      value={{
        isAuthenticated: !!user,
        isLoading,
        userLoadError: userLoadError ? new Error('User load failed') : null,
        user,
        login,
        logout,
        signUp: login, // Use login for signup
        updateProfile,
        getUserDetails,
        getUsers,
        createUser
      }}
    >
      {children}
    </PrivyAuthContext.Provider>
  );
};
