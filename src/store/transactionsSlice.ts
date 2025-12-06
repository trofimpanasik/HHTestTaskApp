import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';
import { COLORS } from '../theme';

// Re-export type for backwards compatibility
export type { Transaction };

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: [
    {
      id: '1',
      name: 'Matthew Billson',
      category: 'Money Transfer',
      dotColor: COLORS.expenseBar1,
      amount: -56.19,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        12,
        8,
      ).toISOString(),
    },
    {
      id: '2',
      name: 'Starbucks',
      category: 'Food',
      dotColor: COLORS.expenseBar2,
      amount: -122.47,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1,
        19,
        21,
      ).toISOString(),
    },
    {
      id: '3',
      name: 'Netflix',
      category: 'Entertainment',
      dotColor: COLORS.expenseBar3,
      amount: -13.17,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 1,
        8,
        53,
      ).toISOString(),
    },
    {
      id: '4',
      name: 'Test',
      category: 'Test category',
      dotColor: COLORS.expenseBar4,
      amount: -45.59,
      date: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate() - 2,
        1,
        53,
      ).toISOString(),
    },
  ],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Omit<Transaction, 'id'>>) => {
      const newTransaction: Transaction = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.transactions.unshift(newTransaction);
    },
    removeTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        t => t.id !== action.payload,
      );
    },
    updateTransaction: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<Transaction> }>,
    ) => {
      const transaction = state.transactions.find(
        t => t.id === action.payload.id,
      );
      if (transaction) {
        Object.assign(transaction, action.payload.updates);
      }
    },
  },
});

export const { addTransaction, removeTransaction, updateTransaction } =
  transactionsSlice.actions;
export default transactionsSlice.reducer;
