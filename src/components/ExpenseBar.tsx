import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../theme';
import { Transaction } from '../types';
import { calculateTotalExpenses, calculateExpensePercentage } from '../utils';

interface ExpenseBarProps {
  transactions: Transaction[];
  month?: string;
}

export const ExpenseBar: React.FC<ExpenseBarProps> = ({
  transactions,
  month,
}) => {
  const { theme } = useTheme();

  const totalExpenses = calculateTotalExpenses(transactions);
  const currentMonth =
    month || new Date().toLocaleDateString('en-US', { month: 'long' });

  // Sort transactions by amount (most negative first) for consistent display
  const sortedTransactions = Object.values(
    transactions
      .filter((t: Transaction) => t.amount < 0) // 1. Оставляем только расходы
      .reduce((acc: Record<string, Transaction>, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = { ...curr };
        } else {
          acc[curr.category].amount += curr.amount;
        }
        return acc;
      }, {}),
  ).sort((a, b) => a.amount - b.amount);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Expenses in{' '}
          <Text style={{ color: theme.accent }}>{currentMonth}</Text>
        </Text>
        <Text style={[styles.amount, { color: theme.textSecondary }]}>
          $
          {totalExpenses.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
      <View style={styles.bar}>
        {sortedTransactions.map(transaction => {
          const percentage = calculateExpensePercentage(
            transaction.amount,
            totalExpenses,
          );

          return (
            <View
              key={transaction.id}
              style={[
                styles.segment,
                {
                  flex: Math.abs(percentage),
                  backgroundColor: transaction.dotColor || theme.accent,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  amount: {
    fontSize: 20,
    fontWeight: '600',
  },
  bar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    gap: 3,
  },
  segment: {
    borderRadius: 4,
  },
});
