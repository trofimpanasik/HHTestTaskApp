import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '../theme';
import { ScreenWrapper, TransactionItem } from '../components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { groupTransactionsByDate } from '../utils/dateUtils';
import { mapTransactionToDisplay } from '../utils/transactionUtils';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import AvatarIcon from '../../assets/icons/avatar.svg';
import { addTransaction } from '../store/transactionsSlice';

const PaymentsScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const transactions = useAppSelector(state => state.transactions.transactions);
  const dispatch = useAppDispatch();

  const displayTransactions = transactions.map(mapTransactionToDisplay);
  const groupedTransactions = groupTransactionsByDate(displayTransactions);

  const generateOperation = () => {
    dispatch(
      addTransaction({
        name: 'Test',
        amount: -(Math.random() * 100), // negative for expenses
        category: 'Test category',
        date: new Date().toISOString(),
        dotColor: theme.expenseBar4,
      }),
    );
  };

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
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
      <TouchableOpacity
        style={[styles.generateButton, { backgroundColor: theme.accent }]}
        onPress={() => generateOperation()}
      >
        <Text style={[styles.buttonText, { color: theme.textPrimary }]}>
          Generate Operation
        </Text>
      </TouchableOpacity>
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
  generateButton: {
    position: 'absolute',
    bottom: 16,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 24,
    marginLeft: '5%',
    width: '90%',
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
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  qrButton: {
    padding: 8,
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

export default PaymentsScreen;
