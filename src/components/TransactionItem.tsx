import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { TransactionDisplay } from '../types';
import { formatTransactionTime } from '../utils';
import { useTheme } from '../theme';

interface TransactionItemProps {
  transaction: TransactionDisplay;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.transactionItemBlock,
        { backgroundColor: theme.blockBackground },
      ]}
    >
      <View style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          {transaction.imageSource ? (
            <Image
              source={transaction.imageSource}
              style={styles.transactionIconImage}
            />
          ) : (
            <View
              style={[
                styles.transactionIcon,
                { backgroundColor: theme.textTertiary },
              ]}
            >
              <Text
                style={[
                  styles.transactionIconLetter,
                  { color: theme.textPrimary },
                ]}
              >
                {transaction.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.transactionInfo}>
            <Text
              style={[styles.transactionName, { color: theme.textPrimary }]}
            >
              {transaction.name}
            </Text>
            <View style={styles.transactionCategoryRow}>
              <View
                style={[
                  styles.categoryDot,
                  { backgroundColor: transaction.dotColor || theme.accent },
                ]}
              />
              <Text
                style={[
                  styles.transactionCategory,
                  { color: theme.textSecondary },
                ]}
              >
                {transaction.category}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Text
            style={[styles.transactionAmount, { color: theme.textPrimary }]}
          >
            {transaction.amount}
          </Text>
          <Text
            style={[styles.transactionDate, { color: theme.textSecondary }]}
          >
            {formatTransactionTime(transaction.date)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transactionItemBlock: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 6,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIconImage: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  transactionIconLetter: {
    fontSize: 20,
    fontWeight: '700',
  },
  transactionInfo: {
    gap: 4,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: '500',
  },
  transactionCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  transactionCategory: {
    fontSize: 14,
  },
  transactionRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: '600',
  },
  transactionDate: {
    fontSize: 14,
  },
});
