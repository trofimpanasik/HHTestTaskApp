import { ImageSourcePropType } from 'react-native';

/**
 * Transaction stored in Redux store
 */
export interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string; // ISO string format
  imageSource?: ImageSourcePropType;
  dotColor?: string;
}

/**
 * Transaction formatted for display in UI
 */
export interface TransactionDisplay {
  id: string;
  name: string;
  category: string;
  amount: string;
  date: Date;
  iconBg?: string;
  imageSource?: ImageSourcePropType;
  dotColor?: string;
}

/**
 * Group of transactions by date label
 */
export interface TransactionGroup {
  label: string;
  transactions: TransactionDisplay[];
}
