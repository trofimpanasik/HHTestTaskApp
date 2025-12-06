import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTheme } from '../theme';
import { ScreenWrapper } from '../components';

const AnalyticsScreen = () => {
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          Analytics
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Coming soon
        </Text>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});

export default AnalyticsScreen;
