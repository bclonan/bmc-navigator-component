import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useDynamicFormRenderer } from '../composables/useDynamicFormRenderer.js';

// Mock useStorageEngine
const mockStorageEngine = {
  setProperty: vi.fn(),
  getProperty: vi.fn(),
  hasProperty: vi.fn(),
  deleteProperty: vi.fn(),
  watchProperty: vi.fn(() => vi.fn()), // Returns unwatch function
  addValidator: vi.fn(),
  removeValidator: vi.fn(),
  validateAll: vi.fn(() => true),
  exportData: vi.fn(() => '{}'),
  importData: vi.fn(() => true),
  clear: vi.fn(),
  storage: {
    data: {},
    metadata: { version: 1 },
    errors: [],
    isLoading: false,
    lastSaved: null
  },
  dataSize: { value: 100 },
  hasUnsavedChanges: { value: false },
  isValid: { value: true }
};

vi.mock('../composables/useStorageEngine.js', () => ({
  useStorageEngine: () => mockStorageEngine
}));

describe('useDynamicFormRenderer', () => {
  let formRenderer;

  beforeEach(() => {
    vi.clearAllMocks();
    mockStorageEngine.getProperty.mockReturnValue(undefined);
    mockStorageEngine.hasProperty.mockReturnValue(false);
  });

  afterEach(() => {
    if (formRenderer) {
      formRenderer.resetForm();
    }
  });

  describe('Initialization', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer({
        storageKey: 'test_form',
        autoSave: true,
        enableValidation: true
      });
    });

    it('should initialize with default options', () => {
      expect(formRenderer).toBeDefined();
      expect(formRenderer.formSchema.value).toEqual({});
      expect(formRenderer.isFormValid.value).toBe(true);
      expect(formRenderer.formData.value).toEqual({});
    });

    it('should provide form manipulation methods', () => {
      expect(typeof formRenderer.loadSchema).toBe('function');
      expect(typeof formRenderer.setFieldValue).toBe('function');
      expect(typeof formRenderer.getFieldValue).toBe('function');
      expect(typeof formRenderer.validateForm).toBe('function');
      expect(typeof formRenderer.submitForm).toBe('function');
      expect(typeof formRenderer.resetForm).toBe('function');
    });
  });

  describe('Schema Loading', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer();
    });

    it('should load and process form schema', () => {
      const schema = {
        title: 'Test Form',
        fields: [
          {
            id: 'testField',
            type: 'text',
            label: 'Test Field',
            required: true,
            validation: ['required']
          }
        ]
      };

      formRenderer.loadSchema(schema);
      expect(formRenderer.formSchema.value).toEqual(schema);
    });

    it('should handle schema with defaults', () => {
      const schema = {
        title: 'Test Form',
        defaults: {
          'user.name': 'John Doe',
          'user.age': 30
        },
        fields: [
          { id: 'user.name', type: 'text', label: 'Name' },
          { id: 'user.age', type: 'number', label: 'Age' }
        ]
      };

      formRenderer.loadSchema(schema);
      
      expect(mockStorageEngine.setProperty).toHaveBeenCalledWith('user.name', 'John Doe');
      expect(mockStorageEngine.setProperty).toHaveBeenCalledWith('user.age', 30);
    });
  });

  describe('Field Operations', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer();
      const schema = {
        fields: [
          {
            id: 'testField',
            type: 'text',
            label: 'Test Field',
            validation: ['required']
          }
        ]
      };
      formRenderer.loadSchema(schema);
    });

    it('should set field values', () => {
      formRenderer.setFieldValue('testField', 'test value');
      expect(mockStorageEngine.setProperty).toHaveBeenCalledWith('testField', 'test value');
    });

    it('should get field values', () => {
      mockStorageEngine.getProperty.mockReturnValue('test value');
      
      const value = formRenderer.getFieldValue('testField');
      expect(value).toBe('test value');
      expect(mockStorageEngine.getProperty).toHaveBeenCalledWith('testField', undefined);
    });

    it('should get field values with default', () => {
      mockStorageEngine.getProperty.mockReturnValue(undefined);
      
      const value = formRenderer.getFieldValue('testField', 'default');
      expect(value).toBe('default');
      expect(mockStorageEngine.getProperty).toHaveBeenCalledWith('testField', 'default');
    });

    it('should check field visibility', () => {
      // Field should be visible by default
      expect(formRenderer.isFieldVisible('testField')).toBe(true);
    });

    it('should check field disabled state', () => {
      // Field should not be disabled by default
      expect(formRenderer.isFieldDisabled('testField')).toBe(false);
    });

    it('should get field configuration', () => {
      const config = formRenderer.getFieldConfig('testField');
      expect(config).toBeDefined();
      expect(config.id).toBe('testField');
      expect(config.type).toBe('text');
    });
  });

  describe('Validation', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer({
        enableValidation: true
      });
    });

    it('should add validators for required fields', () => {
      const schema = {
        fields: [
          {
            id: 'requiredField',
            type: 'text',
            label: 'Required Field',
            required: true,
            validation: ['required']
          }
        ]
      };

      formRenderer.loadSchema(schema);
      expect(mockStorageEngine.addValidator).toHaveBeenCalledWith(
        'requiredField',
        expect.any(Function)
      );
    });

    it('should handle complex validation rules', () => {
      const schema = {
        fields: [
          {
            id: 'emailField',
            type: 'email',
            label: 'Email Field',
            validation: [
              'required',
              'email',
              { type: 'minLength', value: 5, message: 'Too short' }
            ]
          }
        ]
      };

      formRenderer.loadSchema(schema);
      expect(mockStorageEngine.addValidator).toHaveBeenCalledWith(
        'emailField',
        expect.any(Function)
      );
    });

    it('should validate entire form', () => {
      mockStorageEngine.validateAll.mockReturnValue(true);
      
      const result = formRenderer.validateForm();
      expect(result).toBe(true);
      expect(mockStorageEngine.validateAll).toHaveBeenCalled();
    });

    it('should handle validation errors', () => {
      const errors = { field1: 'Error message' };
      mockStorageEngine.validateAll.mockReturnValue(errors);
      
      const result = formRenderer.validateForm();
      expect(result).toBe(false);
    });
  });

  describe('Conditional Logic', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer({
        enableConditionalLogic: true
      });
    });

    it('should setup conditional field visibility', () => {
      const schema = {
        fields: [
          {
            id: 'triggerField',
            type: 'select',
            label: 'Trigger Field'
          },
          {
            id: 'conditionalField',
            type: 'text',
            label: 'Conditional Field',
            conditional: {
              dependencies: ['triggerField'],
              condition: 'data.triggerField === "show"',
              action: 'show'
            }
          }
        ]
      };

      formRenderer.loadSchema(schema);
      
      // Should setup watchers for conditional fields
      expect(mockStorageEngine.watchProperty).toHaveBeenCalledWith(
        'triggerField',
        expect.any(Function)
      );
    });
  });

  describe('Calculations', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer({
        enableCalculations: true
      });
    });

    it('should setup calculated fields', () => {
      const schema = {
        fields: [
          {
            id: 'baseAmount',
            type: 'number',
            label: 'Base Amount'
          },
          {
            id: 'calculatedAmount',
            type: 'number',
            label: 'Calculated Amount',
            calculation: {
              dependencies: ['baseAmount'],
              formula: 'data.baseAmount * 1.2',
              type: 'number'
            }
          }
        ]
      };

      formRenderer.loadSchema(schema);
      
      // Should setup watchers for calculation dependencies
      expect(mockStorageEngine.watchProperty).toHaveBeenCalledWith(
        'baseAmount',
        expect.any(Function)
      );
    });
  });

  describe('Form Submission', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer();
      const schema = {
        fields: [
          { id: 'field1', type: 'text', label: 'Field 1' }
        ]
      };
      formRenderer.loadSchema(schema);
    });

    it('should submit valid form', async () => {
      mockStorageEngine.validateAll.mockReturnValue(true);
      const submitHandler = vi.fn().mockResolvedValue({ id: 'test123' });
      
      const result = await formRenderer.submitForm(submitHandler);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual({ id: 'test123' });
      expect(submitHandler).toHaveBeenCalledWith(mockStorageEngine.storage.data);
    });

    it('should reject invalid form', async () => {
      const errors = { field1: 'Required field' };
      mockStorageEngine.validateAll.mockReturnValue(errors);
      const submitHandler = vi.fn();
      
      const result = await formRenderer.submitForm(submitHandler);
      
      expect(result.success).toBe(false);
      expect(result.errors).toEqual(errors);
      expect(submitHandler).not.toHaveBeenCalled();
    });

    it('should handle submission errors', async () => {
      mockStorageEngine.validateAll.mockReturnValue(true);
      const submitHandler = vi.fn().mockRejectedValue(new Error('Submission failed'));
      
      const result = await formRenderer.submitForm(submitHandler);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('Submission failed');
    });
  });

  describe('Form Reset', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer();
      const schema = {
        defaults: {
          'field1': 'default value'
        },
        fields: [
          { id: 'field1', type: 'text', label: 'Field 1' }
        ]
      };
      formRenderer.loadSchema(schema);
    });

    it('should reset form to initial state', () => {
      formRenderer.resetForm();
      
      expect(mockStorageEngine.clear).toHaveBeenCalled();
      expect(mockStorageEngine.setProperty).toHaveBeenCalledWith('field1', 'default value');
    });
  });

  describe('Import/Export', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer();
    });

    it('should export form data', () => {
      mockStorageEngine.exportData.mockReturnValue('{"field1":"value1"}');
      
      const result = formRenderer.exportForm('json');
      expect(result).toBe('{"field1":"value1"}');
      expect(mockStorageEngine.exportData).toHaveBeenCalledWith('json');
    });

    it('should import form data', () => {
      mockStorageEngine.importData.mockReturnValue(true);
      
      const result = formRenderer.importForm({ field1: 'value1' }, 'json');
      expect(result).toBe(true);
      expect(mockStorageEngine.importData).toHaveBeenCalledWith({ field1: 'value1' }, 'json');
    });
  });

  describe('Advanced Features', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer();
    });

    it('should add custom validators', () => {
      const customValidator = vi.fn();
      formRenderer.addCustomValidator('customField', customValidator);
      
      expect(mockStorageEngine.addValidator).toHaveBeenCalledWith('customField', customValidator);
    });

    it('should add custom calculations', () => {
      const calculationRule = {
        dependencies: ['field1'],
        formula: 'data.field1 * 2',
        type: 'number'
      };
      
      formRenderer.addCustomCalculation('calculatedField', calculationRule);
      // Should setup the calculation internally
    });

    it('should add conditional rules', () => {
      const conditionalRule = {
        dependencies: ['triggerField'],
        condition: 'data.triggerField === "show"',
        action: 'show'
      };
      
      formRenderer.addConditionalRule('conditionalField', conditionalRule);
      // Should setup the conditional logic internally
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer();
    });

    it('should handle malformed schemas gracefully', () => {
      const malformedSchema = {
        fields: [
          {
            // Missing required properties
            validation: ['invalid_rule']
          }
        ]
      };

      expect(() => {
        formRenderer.loadSchema(malformedSchema);
      }).not.toThrow();
    });

    it('should handle field access for non-existent fields', () => {
      expect(formRenderer.getFieldConfig('nonexistent')).toBeNull();
      expect(formRenderer.isFieldVisible('nonexistent')).toBe(true);
      expect(formRenderer.isFieldDisabled('nonexistent')).toBe(false);
    });
  });

  describe('Storage Integration', () => {
    beforeEach(() => {
      formRenderer = useDynamicFormRenderer({
        storageKey: 'test_form_storage'
      });
    });

    it('should access storage properties', () => {
      expect(formRenderer.storage).toBe(mockStorageEngine);
      expect(formRenderer.hasUnsavedChanges.value).toBe(false);
      expect(formRenderer.isFormValid.value).toBe(true);
    });

    it('should access form data through storage', () => {
      expect(formRenderer.formData.value).toEqual({});
    });
  });
});