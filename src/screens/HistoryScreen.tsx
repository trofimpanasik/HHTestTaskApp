import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

import { useTheme } from '../theme';
import { ScreenWrapper } from '../components';

const HistoryScreen = () => {
  const { theme, themeType, toggleTheme, isDark } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>
          History
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Coming soon
        </Text>
        <View style={styles.themeToggle}>
          <Text style={[styles.themeLabel, { color: theme.textPrimary }]}>
            Theme: {themeType === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} />
        </View>
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
    marginBottom: 32,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HistoryScreen;
