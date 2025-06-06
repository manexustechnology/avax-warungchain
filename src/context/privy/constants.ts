
// Privy configuration
export const PRIVY_APP_ID = 'cmbl1trpp0034ld0lazuuo855';
export const PRIVY_CLIENT_ID = 'client-WY6MBF3kqwP1qefum4SN1JrJfw8sEeaNkUU6G2bq6sAfy';

// Demo users for legacy support
export const demoUsers = {
  'demoseller@gmail.com': {
    id: 'demo-seller-id',
    email: 'demoseller@gmail.com',
    name: 'Demo Seller',
    role: 'admin' as const,
    avatar: `https://ui-avatars.com/api/?name=Demo+Seller&background=random`,
  },
  'demobuyer@gmail.com': {
    id: 'demo-buyer-id',
    email: 'demobuyer@gmail.com',
    name: 'Demo Buyer',
    role: 'buyer' as const,
    avatar: `https://ui-avatars.com/api/?name=Demo+Buyer&background=random`,
  }
};
