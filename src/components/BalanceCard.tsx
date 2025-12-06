import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { useTheme } from '../theme';
import { PaymentSystem } from '../types';
import { PaymentSystemIcon } from './PaymentSystemIcon';
import { Platform } from 'react-native';

const cardBackground = require('../../assets/card_background.jpg');
const cardBackgroundGray = require('../../assets/card_background_gray.png');

interface BalanceCardProps {
  balance: string;
  type: string;
  lastDigits: string;
  paymentSystem: PaymentSystem;
  backgroundId: string;
  customBackground?: ImageSourcePropType;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  type,
  lastDigits,
  paymentSystem,
  backgroundId,
  customBackground,
}) => {
  const { theme } = useTheme();

  const backgroundSource =
    customBackground ||
    (backgroundId === '1' ? cardBackground : cardBackgroundGray);

  const cardContent = (
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <PaymentSystemIcon system={paymentSystem} size={32} />
      </View>

      <Text style={[styles.balanceAmount, { color: theme.textPrimary }]}>
        {balance}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={[styles.cardType, { color: theme.textPrimary }]}>
          {type}
        </Text>
        <Text style={[styles.cardDigits, { color: theme.textPrimary }]}>
          •• {lastDigits}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.balanceCard}>
      <ImageBackground
        source={backgroundSource}
        style={styles.cardBackgroundImage}
        imageStyle={styles.cardBackgroundImageStyle}
        resizeMode="cover"
      >
        {Platform.OS === 'android' ? (
          <View style={[styles.blurView, styles.androidBlurFallback]}>
            {cardContent}
          </View>
        ) : (
          <BlurView
            style={styles.blurView}
            blurType="light"
            blurAmount={2}
            reducedTransparencyFallbackColor="white"
          >
            {cardContent}
          </BlurView>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceCard: {
    width: 142,
    height: 98,
    borderRadius: 12,
    overflow: 'hidden',
  },
  androidBlurFallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    flex: 1,
  },
  blurView: {
    flex: 1,
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  cardBackgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  cardBackgroundImageStyle: {
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 6,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 14,
    fontWeight: '500',
  },
  cardDigits: {
    fontSize: 14,
    fontWeight: '500',
  },
});
