import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import { COLORS } from '../theme';

interface SectionHeaderProps {
  title: string;
  highlightedText?: string;
  rightText?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlightedText,
  rightText,
  style,
  titleStyle,
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, titleStyle]}>
        {title}
        {highlightedText && (
          <Text style={styles.highlighted}> {highlightedText}</Text>
        )}
      </Text>
      {rightText && <Text style={styles.rightText}>{rightText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  highlighted: {
    color: COLORS.accent,
  },
  rightText: {
    color: COLORS.textSecondary,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default SectionHeader;
