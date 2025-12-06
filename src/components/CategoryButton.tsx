import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '../theme';

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  icon,
  label,
  onPress,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconWrapper}>{icon}</View>
      <Text style={[styles.label, { color: theme.textPrimary }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    gap: 24,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 5,
  },
});

export default CategoryButton;
