import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, PaymentSystem, CardType } from '../types';

// Re-export types for backwards compatibility
export type { PaymentSystem, CardType, Card };

interface CardsState {
  cards: Card[];
}

const initialState: CardsState = {
  cards: [
    {
      id: '1',
      cardNumber: '4385123456784385',
      expiryMonth: '12',
      expiryYear: '27',
      cvv: '123',
      type: 'Debit',
      paymentSystem: 'mastercard',
      backgroundId: '1',
      balance: 4098.12,
    },
    {
      id: '2',
      cardNumber: '9081567890129081',
      expiryMonth: '06',
      expiryYear: '26',
      cvv: '456',
      type: 'Virtual',
      paymentSystem: 'mastercard',
      backgroundId: '2',
      balance: 14.71,
    },
  ],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<Omit<Card, 'id'>>) => {
      const newCard: Card = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.cards.push(newCard);
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.cards = state.cards.filter(card => card.id !== action.payload);
    },
    updateCardBalance: (
      state,
      action: PayloadAction<{ id: string; balance: number }>,
    ) => {
      const card = state.cards.find(c => c.id === action.payload.id);
      if (card) {
        card.balance = action.payload.balance;
      }
    },
  },
});

export const { addCard, removeCard, updateCardBalance } = cardsSlice.actions;
export default cardsSlice.reducer;
