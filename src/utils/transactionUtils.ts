import { ImageSourcePropType } from 'react-native';
import { Transaction, TransactionDisplay } from '../types';

/**
 * Image sources for known transaction names
 * Maps transaction names to their image assets
 */
export const transactionImages: Record<string, ImageSourcePropType> = {
  'Matthew Billson': require('../../assets/man.jpg'),
  Starbucks: require('../../assets/starbucks.png'),
  Netflix: require('../../assets/netflix.png'),
};

/**
 * Maps a store Transaction to a display-ready TransactionDisplay
 * @param transaction - Transaction from Redux store
 * @returns TransactionDisplay formatted for UI rendering
 */
export const mapTransactionToDisplay = (
  transaction: Transaction,
): TransactionDisplay => ({
  id: transaction.id,
  name: transaction.name,
  category: transaction.category,
  amount: `$${Math.abs(transaction.amount).toFixed(2)}`,
  date: new Date(transaction.date),
  imageSource: transactionImages[transaction.name],
  dotColor: transaction.dotColor,
});

/**
 * Calculates total expenses from transactions
 * @param transactions - Array of transactions
 * @returns Total of absolute values of negative amounts
 */
export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
};

/**
 * Calculates expense percentage for a transaction
 * @param amount - Transaction amount
 * @param totalExpenses - Total expenses amount
 * @returns Percentage of total expenses
 */
export const calculateExpensePercentage = (
  amount: number,
  totalExpenses: number,
): number => {
  if (totalExpenses === 0) return 0;
  return (Math.abs(amount) / totalExpenses) * 100;
};
