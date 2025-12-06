import { ImageSourcePropType } from 'react-native';

export type FilterTab = 'All' | 'Payments' | 'System' | 'Delivery' | 'Travel';

export type NotificationType =
  | 'payment_received'
  | 'payment_sent'
  | 'travel'
  | 'system';

export type NotificationIconType = 'travel' | 'send' | 'shield';

export type AmountType = 'positive' | 'negative';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  subtitle?: string;
  amount?: string;
  amountType?: AmountType;
  cardInfo?: string;
  balance?: string;
  date: string;
  category: string;
  isUnread?: boolean;
  imageSource?: ImageSourcePropType;
  iconType?: NotificationIconType;
}

export interface NotificationGroup {
  date: string;
  notifications: Notification[];
}

export const FILTER_TABS: FilterTab[] = [
  'All',
  'Payments',
  'System',
  'Delivery',
  'Travel',
];
