import { ImageSourcePropType } from 'react-native';

export type PaymentSystem = 'visa' | 'mastercard' | 'mir' | 'unionpay' | 'amex';

export type CardType = 'Debit' | 'Virtual' | 'Credit';

export interface Card {
  id: string;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  type: CardType;
  paymentSystem: PaymentSystem;
  backgroundId: string;
  balance: number;
}

export interface CardBackground {
  id: string;
  source: ImageSourcePropType;
}

export interface PaymentSystemOption {
  id: PaymentSystem;
  name: string;
}

export const CARD_TYPES: CardType[] = ['Debit', 'Virtual', 'Credit'];

export const PAYMENT_SYSTEMS: PaymentSystemOption[] = [
  { id: 'visa', name: 'Visa' },
  { id: 'mastercard', name: 'Mastercard' },
  { id: 'mir', name: 'Mir' },
  { id: 'unionpay', name: 'UnionPay' },
  { id: 'amex', name: 'Amex' },
];
