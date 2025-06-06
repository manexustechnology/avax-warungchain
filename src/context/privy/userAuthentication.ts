
import { useToast } from '@/hooks/use-toast';
import { User, UserRole } from '@/types/auth';
import { loadUserDataFromSupabase, fetchManagedUsers } from './userManagement';
import { demoUsers } from './constants';

// Handle Privy authentication
export async function handlePrivyAuthentication(
  privyUser: any,
  toast: any,
): Promise<User | null> {
  try {
    // Get user's email from Privy
    const email = privyUser.email?.address;
    
    if (email) {
      // Get selected tab role from localStorage - this is the PRIMARY source of truth
      const selectedTabRole = localStorage.getItem('selected_tab_role');
      
      // Force role based on selected tab - NO DATABASE DEPENDENCY
      const userRole: UserRole = (selectedTabRole === 'seller') ? 'admin' : 'buyer';
      
      console.log("Using tab-selected role:", userRole, "for email:", email);
      
      // Create user with the tab-selected role (ignore any database data)
      const user: User = {
        id: privyUser.id,
        email: email,
        name: email.split('@')[0],
        role: userRole, // Already typed as UserRole
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&background=random`
      };
      
      toast({
        title: `Logged in as ${userRole === 'admin' ? 'seller' : 'buyer'}`,
        description: `Welcome, ${user.name}!`,
      });
      
      return user;
    } else {
      console.error("No email found in Privy user");
      return null;
    }
  } catch (error) {
    console.error("Error in authentication process:", error);
    
    // Fallback: still use tab selection
    const selectedTabRole = localStorage.getItem('selected_tab_role');
    const fallbackRole: UserRole = (selectedTabRole === 'seller') ? 'admin' : 'buyer';
    
    const fallbackUser: User = {
      id: privyUser.id || 'fallback',
      email: privyUser.email?.address || 'unknown@example.com',
      name: 'User',
      role: fallbackRole, // Already typed as UserRole
      avatar: `https://ui-avatars.com/api/?name=User&background=random`
    };
    
    toast({
      title: `Logged in as ${fallbackRole === 'admin' ? 'seller' : 'buyer'}`,
      description: 'Login successful with fallback profile',
    });
    
    return fallbackUser;
  }
}

// Handle demo user login
export function handleDemoUserLogin(email: string, demoUser: User): User {
  // For demo users, also respect the selected tab role
  const selectedTabRole = localStorage.getItem('selected_tab_role');
  
  // Override demo user role with selected tab role
  const updatedRole: UserRole = (selectedTabRole === 'seller') ? 'admin' : 'buyer';
  
  const updatedDemoUser: User = {
    ...demoUser,
    role: updatedRole // Properly typed as UserRole
  };
  
  localStorage.setItem('defi_store_user', JSON.stringify(updatedDemoUser));
  return updatedDemoUser;
}

// Load users for admin role
export async function loadManagedUsers(
  user: User | null,
  toast: any,
): Promise<User[]> {
  if (!user || user.role !== 'admin') {
    return [];
  }
  
  try {
    const managedUsers = await fetchManagedUsers(user.id);
    return managedUsers;
  } catch (error) {
    console.error("Error fetching managed users:", error);
    // Don't block the UI, just show a toast
    toast({
      title: 'Error loading users',
      description: 'Could not load managed users',
      variant: 'destructive',
    });
    return [];
  }
}
