import { TransactionDisplay } from '../types';

/**
 * Format a date to display time in transaction list
 * Example: "Jun 9, 12:08"
 */
export const formatTransactionTime = (date: Date): string => {
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${month} ${day}, ${hours}:${minutes}`;
};

/**
 * Get date group label (Today, Yesterday, or formatted date)
 */
export const getDateGroupLabel = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const transactionDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  if (transactionDay.getTime() === today.getTime()) {
    return 'Today';
  } else if (transactionDay.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  }
};

/**
 * Group transactions by date label
 * Returns a Map with labels as keys and arrays of transactions as values
 */
export const groupTransactionsByDate = (
  transactions: TransactionDisplay[],
): Map<string, TransactionDisplay[]> => {
  const groups = new Map<string, TransactionDisplay[]>();

  const sorted = [...transactions].sort(
    (a, b) => b.date.getTime() - a.date.getTime(),
  );

  sorted.forEach(transaction => {
    const label = getDateGroupLabel(transaction.date);
    if (!groups.has(label)) {
      groups.set(label, []);
    }
    groups.get(label)!.push(transaction);
  });

  return groups;
};

/**
 * Get current month name
 */
export const getCurrentMonthName = (): string => {
  return new Date().toLocaleDateString('en-US', { month: 'long' });
};
