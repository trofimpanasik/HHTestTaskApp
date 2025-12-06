import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ScreenWrapper,
  Header,
  FilterTabs,
  NotificationItem,
  EmptyState,
} from '../components';
import { useTheme } from '../theme';
import { FilterTab, NotificationGroup, FILTER_TABS } from '../types';
import { filterNotificationGroups } from '../utils';

import MessagesIcon from '../../assets/icons/messages.svg';

const avatarImage = require('../../assets/girl.jpg');

const NotificationsScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<FilterTab>('All');

  const notificationGroups: NotificationGroup[] = [
    {
      date: 'TODAY, 17 JUNE',
      notifications: [
        {
          id: '1',
          type: 'payment_received',
          title: 'Received from Anna',
          amount: '+$110',
          amountType: 'positive',
          cardInfo: 'Debit •• 4385',
          balance: '$4,098.12',
          date: '17 June 2025, 17:49',
          category: 'Payments',
          isUnread: true,
          imageSource: avatarImage,
        },
      ],
    },
    {
      date: 'YESTERDAY, 16 JUNE',
      notifications: [
        {
          id: '2',
          type: 'travel',
          title: 'See our limited offer!',
          subtitle:
            "Would you like to visit new countries? Maybe it's your time!",
          date: '16 June 2025, 23:08',
          category: 'Travel',
          iconType: 'travel',
        },
        {
          id: '3',
          type: 'payment_sent',
          title: 'Sent to •• 2041',
          amount: '-$14.62',
          amountType: 'negative',
          cardInfo: 'Debit •• 4385',
          balance: '$3,987.5',
          date: '16 June 2025, 06:18',
          category: 'Payments',
          iconType: 'send',
        },
      ],
    },
    {
      date: '24 MARCH, 2025',
      notifications: [
        {
          id: '4',
          type: 'system',
          title: 'New login into account',
          subtitle:
            'You have logged in from a new location: iOS 26.0.1 · 109.255.84.7 · Spain',
          date: '24 March 2025, 15:44',
          category: 'system',
          iconType: 'shield',
        },
      ],
    },
  ];

  const filteredGroups = filterNotificationGroups(
    notificationGroups,
    activeTab,
  );

  const handleMarkReadPress = () => {
    // Mark all as read functionality
  };

  return (
    <ScreenWrapper>
      <Header
        title="Notifications"
        onBackPress={() => navigation.goBack()}
        rightElement={
          <TouchableOpacity onPress={handleMarkReadPress}>
            <MessagesIcon width={18} height={17} />
          </TouchableOpacity>
        }
      />

      <FilterTabs
        tabs={FILTER_TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <View style={[styles.divider, { backgroundColor: theme.divider }]} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {filteredGroups.length === 0 ? (
          <EmptyState
            icon="search"
            title="Nothing found"
            subtitle="No notifications match your current filter"
            actionText={
              activeTab !== 'All' ? 'Show all notifications' : undefined
            }
            onAction={
              activeTab !== 'All' ? () => setActiveTab('All') : undefined
            }
          />
        ) : (
          filteredGroups.map((group, index) => (
            <View key={group.date} style={styles.group}>
              <Text style={[styles.groupDate, { color: theme.textSecondary }]}>
                {group.date}
              </Text>
              {group.notifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                />
              ))}
              {index < filteredGroups.length - 1 && (
                <View
                  style={[
                    styles.groupDivider,
                    { backgroundColor: theme.divider },
                  ]}
                />
              )}
            </View>
          ))
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
  },
  scrollView: {
    flex: 1,
  },
  group: {
    paddingTop: 20,
  },
  groupDate: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  groupDivider: {
    height: 1,
    marginTop: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default NotificationsScreen;
