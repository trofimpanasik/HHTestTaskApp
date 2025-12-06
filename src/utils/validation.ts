/**
 * Validation utilities for card forms
 */

/**
 * Validates a card number using the Luhn algorithm (MOD10)
 * @param number - Card number string (can contain spaces/dashes)
 * @returns true if the card number is valid
 */
export const validateCardNumberLuhn = (number: string): boolean => {
  const digits = number.replace(/\D/g, '');
  if (digits.length !== 16) return false;

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validates an expiry date
 * @param month - Two-digit month string (01-12)
 * @param year - Two-digit year string
 * @returns true if the date is valid and not expired
 */
export const validateExpiryDate = (month: string, year: string): boolean => {
  if (month.length !== 2 || year.length !== 2) return false;

  const monthNum = parseInt(month, 10);
  const yearNum = parseInt(year, 10);

  if (monthNum < 1 || monthNum > 12) return false;

  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (yearNum < currentYear) return false;
  if (yearNum === currentYear && monthNum < currentMonth) return false;

  return true;
};

/**
 * Gets the expected CVV length for a payment system
 * @param paymentSystem - Payment system identifier
 * @returns CVV length (4 for Amex, 3 for others)
 */
export const getCvvLength = (paymentSystem: string): number => {
  return paymentSystem === 'amex' ? 4 : 3;
};

/**
 * Validates a CVV code
 * @param cvv - CVV string
 * @param paymentSystem - Payment system identifier
 * @returns true if CVV has correct length for the payment system
 */
export const validateCvv = (cvv: string, paymentSystem: string): boolean => {
  const expectedLength = getCvvLength(paymentSystem);
  return cvv.length === expectedLength && /^\d+$/.test(cvv);
};

/**
 * Checks if a complete card form is valid (all fields filled)
 * @param cardNumber - Array of 4 card number parts
 * @param expiryMonth - Two-digit month
 * @param expiryYear - Two-digit year
 * @param cvv - CVV string
 * @param paymentSystem - Payment system identifier
 * @returns true if all form fields are properly filled
 */
export const isCardFormComplete = (
  cardNumber: string[],
  expiryMonth: string,
  expiryYear: string,
  cvv: string,
  paymentSystem: string,
): boolean => {
  return (
    cardNumber.every(part => part.length === 4) &&
    expiryMonth.length === 2 &&
    expiryYear.length === 2 &&
    cvv.length === getCvvLength(paymentSystem)
  );
};
