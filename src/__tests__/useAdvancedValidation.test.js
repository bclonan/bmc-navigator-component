import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAdvancedValidation } from '../composables/useAdvancedValidation.js';

describe('useAdvancedValidation', () => {
  let validation;

  beforeEach(() => {
    validation = useAdvancedValidation();
  });

  describe('Financial Validators', () => {
    it('should validate credit card numbers using Luhn algorithm', () => {
      const { financialValidators } = validation;

      // Valid credit card numbers
      expect(financialValidators.creditCard('4111111111111111')).toBe(true);
      expect(financialValidators.creditCard('5555555555554444')).toBe(true);
      expect(financialValidators.creditCard('378282246310005')).toBe(true);

      // Invalid credit card numbers
      expect(financialValidators.creditCard('4111111111111112')).toContain('Invalid');
      expect(financialValidators.creditCard('123')).toContain('Invalid');
      expect(financialValidators.creditCard('abcd1234')).toContain('Invalid');

      // Empty value should pass (handled by required validator separately)
      expect(financialValidators.creditCard('')).toBe(true);
    });

    it('should validate ABA routing numbers', () => {
      const { financialValidators } = validation;

      // Valid routing numbers (mock valid checksums)
      expect(financialValidators.routingNumber('021000021')).toBe(true);
      expect(financialValidators.routingNumber('011000015')).toBe(true);

      // Invalid routing numbers
      expect(financialValidators.routingNumber('123456789')).toContain('Invalid');
      expect(financialValidators.routingNumber('12345')).toContain('Invalid');
      expect(financialValidators.routingNumber('abcdefghi')).toContain('Invalid');

      // Empty value should pass
      expect(financialValidators.routingNumber('')).toBe(true);
    });

    it('should validate account numbers', () => {
      const { financialValidators } = validation;

      // Valid account numbers
      expect(financialValidators.accountNumber('123456789012')).toBe(true);
      expect(financialValidators.accountNumber('1234')).toBe(true);
      expect(financialValidators.accountNumber('12345678901234567')).toBe(true);

      // Invalid account numbers
      expect(financialValidators.accountNumber('123')).toContain('Invalid');
      expect(financialValidators.accountNumber('123456789012345678')).toContain('Invalid');

      // Empty value should pass
      expect(financialValidators.accountNumber('')).toBe(true);
    });

    it('should validate IBAN numbers', () => {
      const { financialValidators } = validation;

      // Valid IBAN (GB82 WEST 1234 5698 7654 32)
      expect(financialValidators.iban('GB82WEST12345698765432')).toBe(true);
      expect(financialValidators.iban('GB82 WEST 1234 5698 7654 32')).toBe(true);

      // Invalid IBANs
      expect(financialValidators.iban('GB82WEST123456987654XX')).toContain('Invalid');
      expect(financialValidators.iban('INVALID')).toContain('Invalid');
      expect(financialValidators.iban('GB82WEST12345698765431')).toContain('Invalid'); // Wrong checksum

      // Empty value should pass
      expect(financialValidators.iban('')).toBe(true);
    });

    it('should validate tax ID (EIN) format', () => {
      const { financialValidators } = validation;

      // Valid EIN formats
      expect(financialValidators.taxId('123456789')).toBe(true);
      expect(financialValidators.taxId('12-3456789')).toBe(true);

      // Invalid EIN formats
      expect(financialValidators.taxId('12345678')).toContain('Invalid');
      expect(financialValidators.taxId('1234567890')).toContain('Invalid');
      expect(financialValidators.taxId('abcdefghi')).toContain('Invalid');

      // Empty value should pass
      expect(financialValidators.taxId('')).toBe(true);
    });

    it('should create income range validators', () => {
      const { financialValidators } = validation;
      const incomeValidator = financialValidators.incomeRange(30000, 150000);

      expect(incomeValidator(50000)).toBe(true);
      expect(incomeValidator(29999)).toContain('between $30,000 and $150,000');
      expect(incomeValidator(150001)).toContain('between $30,000 and $150,000');
      expect(incomeValidator('invalid')).toContain('valid number');
    });

    it('should create debt-to-income ratio validators', () => {
      const { financialValidators } = validation;
      const dtiValidator = financialValidators.debtToIncomeRatio(43);

      const mockData = {
        employment: { grossMonthlyIncome: 5000 },
        financial: { monthlyDebtPayments: 2000 }
      };

      expect(dtiValidator(null, mockData)).toContain('40.0%) exceeds maximum');

      mockData.financial.monthlyDebtPayments = 1500;
      expect(dtiValidator(null, mockData)).toBe(true);

      // No income case
      mockData.employment.grossMonthlyIncome = 0;
      expect(dtiValidator(null, mockData)).toContain('required for debt-to-income');
    });
  });

  describe('Identity Validators', () => {
    it('should validate SSN with advanced checks', () => {
      const { identityValidators } = validation;

      // Valid SSNs
      expect(identityValidators.ssnAdvanced('123456789')).toBe(true);
      expect(identityValidators.ssnAdvanced('123-45-6789')).toBe(true);

      // Invalid SSNs
      expect(identityValidators.ssnAdvanced('000123456')).toContain('Invalid');
      expect(identityValidators.ssnAdvanced('666123456')).toContain('Invalid');
      expect(identityValidators.ssnAdvanced('900123456')).toContain('Invalid');
      expect(identityValidators.ssnAdvanced('123001234')).toContain('Invalid');
      expect(identityValidators.ssnAdvanced('123450000')).toContain('Invalid');
      expect(identityValidators.ssnAdvanced('111111111')).toContain('Invalid'); // Known invalid

      // Invalid length
      expect(identityValidators.ssnAdvanced('12345678')).toContain('Invalid');

      // Empty value should pass
      expect(identityValidators.ssnAdvanced('')).toBe(true);
    });

    it('should validate driver\'s license by state', () => {
      const { identityValidators } = validation;

      // California format
      const caValidator = identityValidators.driversLicense('CA');
      expect(caValidator('D1234567')).toBe(true);
      expect(caValidator('A1234567')).toBe(true);
      expect(caValidator('12345678')).toContain('Invalid');
      expect(caValidator('D123456')).toContain('Invalid');

      // New York format
      const nyValidator = identityValidators.driversLicense('NY');
      expect(nyValidator('123456789')).toBe(true);
      expect(nyValidator('123 456 789')).toBe(true);
      expect(nyValidator('12345678')).toContain('Invalid');

      // Unsupported state should pass
      const unknownValidator = identityValidators.driversLicense('ZZ');
      expect(unknownValidator('anything')).toBe(true);

      // Empty value should pass
      expect(caValidator('')).toBe(true);
    });

    it('should validate passport numbers by country', () => {
      const { identityValidators } = validation;

      // US passport
      const usValidator = identityValidators.passport('US');
      expect(usValidator('123456789')).toBe(true);
      expect(usValidator('12345678')).toContain('Invalid');
      expect(usValidator('1234567890')).toContain('Invalid');

      // Canadian passport
      const caValidator = identityValidators.passport('CA');
      expect(caValidator('AB123456')).toBe(true);
      expect(caValidator('123456')).toContain('Invalid');

      // Unsupported country should pass
      const unknownValidator = identityValidators.passport('ZZ');
      expect(unknownValidator('anything')).toBe(true);

      // Empty value should pass
      expect(usValidator('')).toBe(true);
    });
  });

  describe('Business Validators', () => {
    it('should validate DUNS numbers', () => {
      const { businessValidators } = validation;

      expect(businessValidators.duns('123456789')).toBe(true);
      expect(businessValidators.duns('12345678')).toContain('Invalid');
      expect(businessValidators.duns('1234567890')).toContain('Invalid');
      expect(businessValidators.duns('')).toBe(true);
    });

    it('should validate NAICS codes', () => {
      const { businessValidators } = validation;

      expect(businessValidators.naics('541511')).toBe(true);
      expect(businessValidators.naics('111111')).toBe(true);
      expect(businessValidators.naics('921234')).toBe(true);

      expect(businessValidators.naics('12345')).toContain('Invalid');
      expect(businessValidators.naics('1234567')).toContain('Invalid');
      expect(businessValidators.naics('101234')).toContain('Invalid'); // Invalid sector
      expect(businessValidators.naics('931234')).toContain('Invalid'); // Invalid sector

      expect(businessValidators.naics('')).toBe(true);
    });

    it('should validate business license format', () => {
      const { businessValidators } = validation;

      expect(businessValidators.businessLicense('ABC123DEF456')).toBe(true);
      expect(businessValidators.businessLicense('123456')).toBe(true);
      expect(businessValidators.businessLicense('ABCDEFGHIJ1234567890')).toBe(true);

      expect(businessValidators.businessLicense('12345')).toContain('Invalid'); // Too short
      expect(businessValidators.businessLicense('A'.repeat(21))).toContain('Invalid'); // Too long
      expect(businessValidators.businessLicense('ABC-123')).toContain('Invalid'); // Special chars

      expect(businessValidators.businessLicense('')).toBe(true);
    });
  });

  describe('Address Validators', () => {
    it('should validate ZIP+4 codes', () => {
      const { addressValidators } = validation;

      expect(addressValidators.zipPlusFour('12345')).toBe(true);
      expect(addressValidators.zipPlusFour('123456789')).toBe(true);
      expect(addressValidators.zipPlusFour('12345-6789')).toBe(true);

      expect(addressValidators.zipPlusFour('1234')).toContain('Invalid');
      expect(addressValidators.zipPlusFour('1234567')).toContain('Invalid');
      expect(addressValidators.zipPlusFour('abcde')).toContain('Invalid');

      expect(addressValidators.zipPlusFour('')).toBe(true);
    });

    it('should validate Canadian postal codes', () => {
      const { addressValidators } = validation;

      expect(addressValidators.postalCodeCA('K1A0A6')).toBe(true);
      expect(addressValidators.postalCodeCA('K1A 0A6')).toBe(true);
      expect(addressValidators.postalCodeCA('k1a0a6')).toBe(true); // Case insensitive

      expect(addressValidators.postalCodeCA('12345')).toContain('Invalid');
      expect(addressValidators.postalCodeCA('K1A0A')).toContain('Invalid');
      expect(addressValidators.postalCodeCA('K1A0A67')).toContain('Invalid');

      expect(addressValidators.postalCodeCA('')).toBe(true);
    });

    it('should validate UK postcodes', () => {
      const { addressValidators } = validation;

      expect(addressValidators.postcodeUK('SW1A1AA')).toBe(true);
      expect(addressValidators.postcodeUK('SW1A 1AA')).toBe(true);
      expect(addressValidators.postcodeUK('M11AA')).toBe(true);
      expect(addressValidators.postcodeUK('M1 1AA')).toBe(true);

      expect(addressValidators.postcodeUK('12345')).toContain('Invalid');
      expect(addressValidators.postcodeUK('SW1A1A')).toContain('Invalid');

      expect(addressValidators.postcodeUK('')).toBe(true);
    });
  });

  describe('Date Validators', () => {
    beforeEach(() => {
      // Mock current date for consistent testing
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-01-15'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should validate age ranges', () => {
      const { dateValidators } = validation;
      const ageValidator = dateValidators.age(18, 65);

      // Valid ages
      expect(ageValidator('1990-01-15')).toBe(true); // 34 years old
      expect(ageValidator('2006-01-15')).toBe(true); // 18 years old
      expect(ageValidator('1959-01-15')).toBe(true); // 65 years old

      // Invalid ages
      expect(ageValidator('2010-01-15')).toContain('between 18 and 65'); // Too young
      expect(ageValidator('1950-01-15')).toContain('between 18 and 65'); // Too old

      // Future date
      expect(ageValidator('2025-01-15')).toContain('cannot be in the future');

      // Invalid date
      expect(ageValidator('invalid-date')).toContain('Invalid date');

      // Empty value should pass
      expect(ageValidator('')).toBe(true);
    });

    it('should validate business hours', () => {
      const { dateValidators } = validation;
      const businessHoursValidator = dateValidators.businessHours(9, 17);

      expect(businessHoursValidator('09:00')).toBe(true);
      expect(businessHoursValidator('12:30')).toBe(true);
      expect(businessHoursValidator('16:59')).toBe(true);

      expect(businessHoursValidator('08:59')).toContain('between 9:00 and 17:00');
      expect(businessHoursValidator('17:00')).toContain('between 9:00 and 17:00');
      expect(businessHoursValidator('22:00')).toContain('between 9:00 and 17:00');

      expect(businessHoursValidator('invalid')).toContain('Invalid time');
      expect(businessHoursValidator('')).toBe(true);
    });

    it('should validate date ranges', () => {
      const { dateValidators } = validation;
      const dateRangeValidator = dateValidators.dateRange('2024-01-01', '2024-12-31');

      expect(dateRangeValidator('2024-06-15')).toBe(true);
      expect(dateRangeValidator('2024-01-01')).toBe(true);
      expect(dateRangeValidator('2024-12-31')).toBe(true);

      expect(dateRangeValidator('2023-12-31')).toContain('between');
      expect(dateRangeValidator('2025-01-01')).toContain('between');

      expect(dateRangeValidator('invalid')).toContain('Invalid date');
      expect(dateRangeValidator('')).toBe(true);
    });
  });

  describe('Async Validators', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should validate email domains asynchronously', async () => {
      const { asyncValidators } = validation;
      const emailDomainValidator = asyncValidators.emailDomain(['gmail.com', 'company.com']);

      // Valid domains
      expect(await emailDomainValidator('user@gmail.com')).toBe(true);
      expect(await emailDomainValidator('user@company.com')).toBe(true);

      // Invalid domains
      const result = await emailDomainValidator('user@blocked.com');
      expect(result).toContain('not allowed');

      // Invalid email format
      expect(await emailDomainValidator('invalid-email')).toContain('Invalid email');

      // Empty value should pass
      expect(await emailDomainValidator('')).toBe(true);
    });

    it('should simulate SSN verification', async () => {
      const { asyncValidators } = validation;
      const ssnValidator = asyncValidators.ssnVerification();

      // Valid SSN
      const validResult = await ssnValidator('123-45-6789');
      expect(validResult).toBe(true);

      // Blocked SSN
      const blockedResult = await ssnValidator('123456789');
      expect(blockedResult).toContain('flagged');

      // Empty value should pass
      expect(await ssnValidator('')).toBe(true);
    });

    it('should simulate address verification', async () => {
      const { asyncValidators } = validation;
      const addressValidator = asyncValidators.addressVerification();

      const mockData = {
        address: {
          city: 'New York',
          state: 'NY',
          zipCode: '10001'
        }
      };

      // Valid address
      const validResult = await addressValidator('123 Main St', mockData);
      expect(validResult).toBe(true);

      // Invalid address
      const invalidResult = await addressValidator('123 Fake St', mockData);
      expect(invalidResult).toContain('could not be verified');

      // Empty value should pass
      expect(await addressValidator('', mockData)).toBe(true);
    });

    it('should simulate credit check', async () => {
      const { asyncValidators } = validation;
      const creditValidator = asyncValidators.creditCheck(650);

      const mockData = {
        personal: { ssn: '123-45-6781' } // Last digit 1 = 535 score
      };

      // Low score
      const lowScoreResult = await creditValidator(null, mockData);
      expect(lowScoreResult).toContain('below minimum');

      // Good score
      mockData.personal.ssn = '123-45-6789'; // Last digit 9 = 815 score
      const goodScoreResult = await creditValidator(null, mockData);
      expect(goodScoreResult).toBe(true);

      // No SSN
      const noSSNResult = await creditValidator(null, { personal: {} });
      expect(noSSNResult).toContain('SSN required');
    });
  });

  describe('Conditional Validators', () => {
    it('should validate required-if conditions', () => {
      const { conditionalValidators } = validation;
      const requiredIfValidator = conditionalValidators.requiredIf('employment.status', 'employed');

      const employedData = { employment: { status: 'employed' } };
      const unemployedData = { employment: { status: 'unemployed' } };

      expect(requiredIfValidator('Company Name', employedData)).toBe(true);
      expect(requiredIfValidator('', employedData)).toContain('required when');
      expect(requiredIfValidator('', unemployedData)).toBe(true);
    });

    it('should validate minimum values based on other fields', () => {
      const { conditionalValidators } = validation;
      const minValueIfValidator = conditionalValidators.minValueIf('income', 0.3);

      const mockData = { income: 5000 };
      const minRequired = 5000 * 0.3; // 1500

      expect(minValueIfValidator(2000, mockData)).toBe(true);
      expect(minValueIfValidator(1000, mockData)).toContain('at least 1,500');
    });

    it('should validate greater-than comparisons', () => {
      const { conditionalValidators } = validation;
      const greaterThanValidator = conditionalValidators.greaterThan('minValue');

      const mockData = { minValue: 100 };

      expect(greaterThanValidator(150, mockData)).toBe(true);
      expect(greaterThanValidator(100, mockData)).toContain('greater than');
      expect(greaterThanValidator(50, mockData)).toContain('greater than');
    });

    it('should validate date comparisons', () => {
      const { conditionalValidators } = validation;
      const dateAfterValidator = conditionalValidators.dateAfter('startDate');

      const mockData = { startDate: '2024-01-15' };

      expect(dateAfterValidator('2024-01-16', mockData)).toBe(true);
      expect(dateAfterValidator('2024-01-15', mockData)).toContain('after');
      expect(dateAfterValidator('2024-01-14', mockData)).toContain('after');

      // Invalid dates
      expect(dateAfterValidator('invalid', mockData)).toContain('Invalid date');

      // Empty values should pass
      expect(dateAfterValidator('', mockData)).toBe(true);
      expect(dateAfterValidator('2024-01-16', {})).toBe(true);
    });
  });

  describe('Utility Functions', () => {
    it('should create validators from patterns', () => {
      const { createValidator } = validation;

      const creditCardValidator = createValidator('financial.creditCard');
      expect(typeof creditCardValidator).toBe('function');

      const incomeRangeValidator = createValidator('financial.incomeRange', 30000, 150000);
      expect(typeof incomeRangeValidator).toBe('function');
    });

    it('should throw error for unknown patterns', () => {
      const { createValidator } = validation;

      expect(() => {
        createValidator('unknown.pattern');
      }).toThrow('Unknown validation pattern');
    });

    it('should validate multiple fields in batch', async () => {
      const { validateBatch } = validation;

      const fields = {
        'user.email': [validation.financialValidators.creditCard],
        'user.age': [(value) => value >= 18 ? true : 'Must be 18+']
      };

      const data = {
        user: {
          email: 'invalid-card',
          age: 16
        }
      };

      const results = await validateBatch(fields, data);
      expect(results['user.email']).toContain('Invalid');
      expect(results['user.age']).toContain('Must be 18+');
    });

    it('should get nested values correctly', () => {
      const { getNestedValue } = validation;

      const data = {
        user: {
          profile: {
            name: 'John Doe'
          }
        }
      };

      expect(getNestedValue(data, 'user.profile.name')).toBe('John Doe');
      expect(getNestedValue(data, 'user.nonexistent')).toBeUndefined();
      expect(getNestedValue(data, 'nonexistent.path')).toBeUndefined();
    });

    it('should manage validation cache', () => {
      const { clearCache } = validation;

      // Cache should be manageable
      expect(() => clearCache()).not.toThrow();
      expect(() => clearCache('emailDomain')).not.toThrow();
    });
  });
});