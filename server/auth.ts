import { z } from 'zod';
import fs from 'fs';
import path from 'path';

export interface RestaurantAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  mongodbUri: string;
  isActive: boolean;
  createdAt: string;
}

const ACCOUNTS_FILE = path.join(process.cwd(), 'server', 'restaurant-accounts.json');

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function getAccounts(): RestaurantAccount[] {
  try {
    const data = fs.readFileSync(ACCOUNTS_FILE, 'utf-8');
    const accounts = JSON.parse(data) as RestaurantAccount[];
    return accounts.map(acc => ({
      ...acc,
      mongodbUri: acc.mongodbUri === 'CURRENT_MONGODB_URI' 
        ? process.env.MONGODB_URI || '' 
        : acc.mongodbUri
    }));
  } catch (error) {
    console.error('Error reading accounts file:', error);
    return [];
  }
}

export function validateCredentials(username: string, password: string): RestaurantAccount | null {
  const accounts = getAccounts();
  const account = accounts.find(
    acc => acc.username === username && acc.password === password && acc.isActive
  );
  return account || null;
}

export function getAccountById(id: string): RestaurantAccount | null {
  const accounts = getAccounts();
  return accounts.find(acc => acc.id === id) || null;
}

export function addAccount(account: Omit<RestaurantAccount, 'id' | 'createdAt'>): RestaurantAccount {
  const accounts = getAccounts();
  const newAccount: RestaurantAccount = {
    ...account,
    id: `restaurant-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  accounts.push(newAccount);
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));
  return newAccount;
}
