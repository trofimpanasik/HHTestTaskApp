import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useTheme } from '../theme';
import { Notification } from '../types';

import TravelIcon from '../../assets/icons/travel.svg';
import ShieldIcon from '../../assets/icons/shield.svg';
import SendIcon from '../../assets/icons/send.svg';

interface NotificationItemProps {
  notification: Notification;
  onPress?: () => void;
}

const NotificationIcon: React.FC<{
  notification: Notification;
  backgroundColor: string;
}> = ({ notification, backgroundColor }) => {
  if (notification.imageSource) {
    return <Image source={notification.imageSource} style={styles.avatar} />;
  }

  return (
    <View style={[styles.iconContainer, { backgroundColor }]}>
      {notification.iconType === 'travel' && (
        <TravelIcon width={24} height={24} />
      )}
      {notification.iconType === 'send' && <SendIcon width={24} height={24} />}
      {notification.iconType === 'shield' && (
        <ShieldIcon width={24} height={24} />
      )}
    </View>
  );
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.notificationItem} onPress={onPress}>
      <View style={styles.notificationLeft}>
        <NotificationIcon
          notification={notification}
          backgroundColor={theme.blockBackground}
        />
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text
            style={[styles.notificationTitle, { color: theme.textPrimary }]}
          >
            {notification.title}
          </Text>
          {notification.isUnread && (
            <View
              style={[styles.unreadDot, { backgroundColor: theme.accent }]}
            />
          )}
        </View>

        {notification.amount && (
          <Text style={[styles.amount, { color: theme.accent }]}>
            {notification.amount}
          </Text>
        )}

        {notification.subtitle && (
          <Text
            style={[styles.subtitle, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {notification.subtitle}
          </Text>
        )}

        {notification.cardInfo && (
          <Text style={[styles.cardInfo, { color: theme.textSecondary }]}>
            {notification.cardInfo}
          </Text>
        )}

        {notification.balance && (
          <Text style={[styles.balance, { color: theme.textSecondary }]}>
            {notification.balance}
          </Text>
        )}

        <Text style={[styles.dateCategory, { color: theme.textTertiary }]}>
          {notification.date} · {notification.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationLeft: {
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  amount: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 15,
    marginTop: 4,
    lineHeight: 20,
  },
  cardInfo: {
    fontSize: 15,
    marginTop: 4,
  },
  balance: {
    fontSize: 15,
    marginTop: 2,
  },
  dateCategory: {
    fontSize: 13,
    marginTop: 4,
  },
});
