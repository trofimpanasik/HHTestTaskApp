import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Svg, { Circle, Defs, Mask, Rect } from 'react-native-svg';

import { useTheme } from '../theme';
import { ScreenWrapper, PaymentSystemIcon, Header } from '../components';
import { useAppDispatch } from '../store/hooks';
import { addCard } from '../store/cardsSlice';
import {
  PaymentSystem,
  CardType,
  CardBackground,
  CARD_TYPES,
  PAYMENT_SYSTEMS,
} from '../types';
import {
  validateCardNumberLuhn,
  validateExpiryDate,
  getCvvLength,
  isCardFormComplete,
} from '../utils';

const cardBackgrounds: CardBackground[] = [
  { id: '1', source: require('../../assets/card_background.jpg') },
  { id: '2', source: require('../../assets/card_background_gray.png') },
];

const AddCardScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [cardNumber, setCardNumber] = useState(['', '', '', '']);
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedType, setSelectedType] = useState<CardType>('Debit');
  const [selectedPaymentSystem, setSelectedPaymentSystem] =
    useState<PaymentSystem>('visa');

  const handlePaymentSystemChange = (system: PaymentSystem) => {
    const newCvvLength = getCvvLength(system);
    const currentCvvLength = getCvvLength(selectedPaymentSystem);

    if (newCvvLength !== currentCvvLength) {
      setCvv('');
    }

    setSelectedPaymentSystem(system);
  };

  const [selectedBackground, setSelectedBackground] = useState('1');
  const [errors, setErrors] = useState<{
    cardNumber?: string;
    expiry?: string;
  }>({});

  const cardNumberRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];
  const expiryMonthRef = useRef<TextInput>(null);
  const expiryYearRef = useRef<TextInput>(null);
  const cvvRef = useRef<TextInput>(null);

  const handleCardNumberChange = (text: string, index: number) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    const newCardNumber = [...cardNumber];
    newCardNumber[index] = cleaned;
    setCardNumber(newCardNumber);

    if (cleaned.length === 4 && index < 3) {
      cardNumberRefs[index + 1].current?.focus();
    }
  };

  const handleCardNumberKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && cardNumber[index] === '' && index > 0) {
      cardNumberRefs[index - 1].current?.focus();
    }
  };

  const handleExpiryMonthChange = (text: string) => {
    let cleaned = text.replace(/\D/g, '').slice(0, 2);

    if (cleaned.length === 2) {
      const monthNum = parseInt(cleaned, 10);
      if (monthNum > 12) {
        cleaned = '12';
      } else if (monthNum < 1 && cleaned !== '0' && cleaned !== '00') {
        cleaned = '01';
      }
    }

    setExpiryMonth(cleaned);
    setErrors(prev => ({ ...prev, expiry: undefined }));

    if (cleaned.length === 2) {
      expiryYearRef.current?.focus();
    }
  };

  const handleExpiryYearChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 2);
    setExpiryYear(cleaned);
    setErrors(prev => ({ ...prev, expiry: undefined }));

    if (cleaned.length === 2) {
      cvvRef.current?.focus();
    }
  };

  const currentCvvLength = getCvvLength(selectedPaymentSystem);

  const handleCvvChange = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, currentCvvLength);
    setCvv(cleaned);
  };

  const validateForm = (): boolean => {
    const newErrors: { cardNumber?: string; expiry?: string } = {};

    const fullCardNumber = cardNumber.join('');
    if (!validateCardNumberLuhn(fullCardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!validateExpiryDate(expiryMonth, expiryYear)) {
      newErrors.expiry = 'Invalid or expired date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = () => {
    if (!validateForm()) return;

    dispatch(
      addCard({
        cardNumber: cardNumber.join(''),
        expiryMonth,
        expiryYear,
        cvv,
        type: selectedType,
        paymentSystem: selectedPaymentSystem,
        backgroundId: selectedBackground,
        balance: 0,
      }),
    );
    navigation.goBack();
  };

  const isFormValid = isCardFormComplete(
    cardNumber,
    expiryMonth,
    expiryYear,
    cvv,
    selectedPaymentSystem,
  );

  return (
    <ScreenWrapper>
      <Header
        title="New Card"
        onBackPress={() => navigation.goBack()}
        showBackButton={true}
      />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card Number Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Card Number
          </Text>
          <View
            style={[
              styles.cardNumberContainer,
              errors.cardNumber && styles.inputError,
            ]}
          >
            {cardNumber.map((part, index) => (
              <TextInput
                key={index}
                ref={cardNumberRefs[index]}
                style={[
                  styles.cardNumberInput,
                  {
                    backgroundColor: theme.blockBackground,
                    color: theme.textPrimary,
                  },
                ]}
                placeholder="0000"
                placeholderTextColor={theme.textTertiary}
                value={part}
                onChangeText={text => handleCardNumberChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  handleCardNumberKeyPress(nativeEvent.key, index)
                }
                keyboardType="number-pad"
                maxLength={4}
              />
            ))}
          </View>
          {errors.cardNumber && (
            <Text style={styles.errorText}>{errors.cardNumber}</Text>
          )}
        </View>

        {/* Expiry Date and CVV */}
        <View style={styles.row}>
          <View style={[styles.section, styles.flex1]}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              Expiry Date
            </Text>
            <View
              style={[
                styles.expiryContainer,
                { backgroundColor: theme.blockBackground },
                errors.expiry && styles.inputError,
              ]}
            >
              <TextInput
                ref={expiryMonthRef}
                style={[styles.expiryInput, { color: theme.textPrimary }]}
                placeholder="MM"
                placeholderTextColor={theme.textTertiary}
                value={expiryMonth}
                onChangeText={handleExpiryMonthChange}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text
                style={[styles.expirySeparator, { color: theme.textSecondary }]}
              >
                /
              </Text>
              <TextInput
                ref={expiryYearRef}
                style={[styles.expiryInput, { color: theme.textPrimary }]}
                placeholder="YY"
                placeholderTextColor={theme.textTertiary}
                value={expiryYear}
                onChangeText={handleExpiryYearChange}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
            {errors.expiry && (
              <Text style={styles.errorText}>{errors.expiry}</Text>
            )}
          </View>

          <View style={[styles.section, styles.flex1]}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              CVV{' '}
              {selectedPaymentSystem === 'amex' ? '(4 digits)' : '(3 digits)'}
            </Text>
            <TextInput
              ref={cvvRef}
              style={[
                styles.cvvInput,
                {
                  backgroundColor: theme.blockBackground,
                  color: theme.textPrimary,
                },
              ]}
              placeholder={selectedPaymentSystem === 'amex' ? '****' : '***'}
              placeholderTextColor={theme.textTertiary}
              value={cvv}
              onChangeText={handleCvvChange}
              keyboardType="number-pad"
              maxLength={currentCvvLength}
              secureTextEntry
            />
          </View>
        </View>

        {/* Payment System Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Payment System
          </Text>
          <View style={styles.paymentSystemContainer}>
            {PAYMENT_SYSTEMS.map(system => (
              <TouchableOpacity
                key={system.id}
                style={[
                  styles.paymentSystemOption,
                  { backgroundColor: theme.blockBackground },
                  selectedPaymentSystem === system.id && {
                    borderColor: theme.accent,
                  },
                ]}
                onPress={() => handlePaymentSystemChange(system.id)}
              >
                {/* Workaround to match design mockup */}
                {system.id === 'mastercard' ? (
                  <Svg width={36} height={36 * 0.615} viewBox="0 0 26 16">
                    <Defs>
                      <Mask id="leftChipMask">
                        <Rect width="26" height="16" fill="white" />
                        <Circle cx="18" cy="8" r="8" fill="black" />
                      </Mask>
                      <Mask id="rightChipMask">
                        <Rect width="26" height="16" fill="white" />
                        <Circle
                          cx="8"
                          cy="8"
                          r="8"
                          fill="rgba(247, 158, 27, 1)"
                        />
                      </Mask>
                    </Defs>
                    <Circle
                      cx="8"
                      cy="8"
                      r="8"
                      fill="rgba(235, 0, 27, 1)"
                      mask="url(#leftChipMask)"
                    />
                    <Circle
                      cx="18"
                      cy="8"
                      r="8"
                      fill="rgba(247, 158, 27, 1)"
                      mask="url(#rightChipMask)"
                    />
                  </Svg>
                ) : (
                  <PaymentSystemIcon system={system.id} size={36} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Card Type Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Card Type
          </Text>
          <View style={styles.typeContainer}>
            {CARD_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  { backgroundColor: theme.blockBackground },
                  selectedType === type && { backgroundColor: theme.accent },
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    { color: theme.textSecondary },
                    selectedType === type && { color: theme.textPrimary },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Background Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            Card Background
          </Text>
          <View style={styles.backgroundContainer}>
            {cardBackgrounds.map(bg => (
              <TouchableOpacity
                key={bg.id}
                style={[
                  styles.backgroundOption,
                  selectedBackground === bg.id && {
                    borderColor: theme.accent,
                  },
                ]}
                onPress={() => setSelectedBackground(bg.id)}
              >
                <Image source={bg.source} style={styles.backgroundImage} />
                {selectedBackground === bg.id && (
                  <View
                    style={[
                      styles.checkmark,
                      { backgroundColor: theme.accent },
                    ]}
                  >
                    <Icon name="check" size={16} color={theme.textPrimary} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Create Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.createButton,
            { backgroundColor: theme.accent },
            !isFormValid && styles.createButtonDisabled,
          ]}
          onPress={handleCreate}
          disabled={!isFormValid}
        >
          <Text style={[styles.createButtonText, { color: theme.textPrimary }]}>
            Create Card
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  flex1: {
    flex: 1,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  cardNumberInput: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 2,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  expiryInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  expirySeparator: {
    fontSize: 16,
    fontWeight: '500',
  },
  cvvInput: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 4,
  },
  paymentSystemContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  paymentSystemOption: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
    height: 50,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#FF4444',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
  backgroundContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  backgroundOption: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  createButton: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddCardScreen;
