import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import TravelIcon from '../../assets/icons/travel.svg';
import DeliveryIcon from '../../assets/icons/delivery.svg';
import BonusesIcon from '../../assets/icons/bonuses.svg';
import SupportIcon from '../../assets/icons/support.svg';
import AvatarIcon from '../../assets/icons/avatar.svg';

import { useTheme } from '../theme';
import {
  ScreenWrapper,
  BalanceCard,
  CategoryButton,
  ExpenseBar,
  TransactionItem,
} from '../components';
import { useAppSelector } from '../store/hooks';
import { mapTransactionToDisplay, groupTransactionsByDate } from '../utils';

const MainScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const cards = useAppSelector(state => state.cards.cards);
  const transactions = useAppSelector(state => state.transactions.transactions);

  const displayTransactions = transactions.map(mapTransactionToDisplay);
  const groupedTransactions = groupTransactionsByDate(displayTransactions);

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: theme.blockBackground },
              ]}
            >
              <AvatarIcon width={16} height={16} />
            </View>
            <Text style={[styles.profileName, { color: theme.textPrimary }]}>
              Charlotte
            </Text>
            <Icon name="chevron-right" size={18} color={theme.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.qrButton}>
            <MaterialIcon
              name="qrcode-scan"
              size={22}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <CategoryButton
            icon={<TravelIcon width={24} height={24} />}
            label="Travel"
          />
          <CategoryButton
            icon={<DeliveryIcon width={24} height={24} />}
            label="Delivery"
          />
          <CategoryButton
            icon={<BonusesIcon width={24} height={24} />}
            label="Bonuses"
          />
          <CategoryButton
            icon={<SupportIcon width={24} height={24} />}
            label="Support"
          />
        </View>

        {/* Balance Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
          contentContainerStyle={styles.cardsContent}
        >
          {cards.map(card => {
            console.log(card.backgroundId);
            return (
              <BalanceCard
                key={card.id}
                balance={`$${card.balance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}`}
                type={card.type}
                lastDigits={card.cardNumber.slice(-4)}
                paymentSystem={card.paymentSystem}
                backgroundId={card.backgroundId}
              />
            );
          })}
          <TouchableOpacity
            style={[styles.addCard, { backgroundColor: theme.blockBackground }]}
            onPress={() => navigation.navigate('AddCard')}
          >
            <Icon name="plus" size={24} color={theme.textSecondary} />
          </TouchableOpacity>
        </ScrollView>

        {/* Expenses Section */}
        <ExpenseBar transactions={transactions} />

        {/* Transactions */}
        <View style={styles.transactionsSection}>
          {Array.from(groupedTransactions.entries()).map(
            ([label, groupTxns], index) => (
              <View key={label}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { color: theme.textPrimary },
                    index > 0 && styles.sectionTitleMargin,
                  ]}
                >
                  {label}
                </Text>
                {groupTxns.map(transaction => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </View>
            ),
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '500',
  },
  qrButton: {
    padding: 8,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  cardsContainer: {
    paddingLeft: 16,
  },
  cardsContent: {
    paddingRight: 16,
    gap: 12,
  },
  addCard: {
    width: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionsSection: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionTitleMargin: {
    marginTop: 24,
  },
});

export default MainScreen;
