import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useStorageEngine } from '../composables/useStorageEngine.js';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

global.sessionStorage = sessionStorageMock;

describe('useStorageEngine', () => {
  let storageEngine;

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    sessionStorageMock.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    if (storageEngine) {
      storageEngine.clear();
    }
  });

  describe('Basic Operations', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory'
      });
    });

    it('should initialize with empty data', () => {
      expect(storageEngine.storage.data).toEqual({});
      expect(storageEngine.storage.metadata.version).toBe(1);
      expect(storageEngine.isValid.value).toBe(true);
    });

    it('should set and get properties using dot notation', () => {
      storageEngine.setProperty('user.name', 'John Doe');
      storageEngine.setProperty('user.email', 'john@example.com');
      storageEngine.setProperty('settings.theme', 'dark');

      expect(storageEngine.getProperty('user.name')).toBe('John Doe');
      expect(storageEngine.getProperty('user.email')).toBe('john@example.com');
      expect(storageEngine.getProperty('settings.theme')).toBe('dark');
    });

    it('should handle nested property creation', () => {
      storageEngine.setProperty('deep.nested.property.value', 'test');
      
      expect(storageEngine.getProperty('deep.nested.property.value')).toBe('test');
      expect(storageEngine.hasProperty('deep.nested.property')).toBe(true);
    });

    it('should return default value for non-existent properties', () => {
      expect(storageEngine.getProperty('nonexistent', 'default')).toBe('default');
      expect(storageEngine.getProperty('user.missing')).toBeUndefined();
    });

    it('should check property existence', () => {
      storageEngine.setProperty('existing.prop', 'value');
      
      expect(storageEngine.hasProperty('existing.prop')).toBe(true);
      expect(storageEngine.hasProperty('existing')).toBe(true);
      expect(storageEngine.hasProperty('nonexistent')).toBe(false);
    });

    it('should delete properties', () => {
      storageEngine.setProperty('user.name', 'John');
      storageEngine.setProperty('user.email', 'john@example.com');
      
      expect(storageEngine.deleteProperty('user.name')).toBe(true);
      expect(storageEngine.hasProperty('user.name')).toBe(false);
      expect(storageEngine.hasProperty('user.email')).toBe(true);
      
      expect(storageEngine.deleteProperty('nonexistent')).toBe(false);
    });

    it('should track dirty state', () => {
      expect(storageEngine.hasUnsavedChanges.value).toBe(false);
      
      storageEngine.setProperty('test', 'value');
      expect(storageEngine.hasUnsavedChanges.value).toBe(true);
    });
  });

  describe('Property Watching', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory'
      });
    });

    it('should trigger watchers when properties change', () => {
      const watcher = vi.fn();
      const unwatch = storageEngine.watchProperty('user.name', watcher);

      storageEngine.setProperty('user.name', 'John');
      expect(watcher).toHaveBeenCalledWith('John', undefined, 'user.name');

      storageEngine.setProperty('user.name', 'Jane');
      expect(watcher).toHaveBeenCalledWith('Jane', 'John', 'user.name');

      unwatch();
      storageEngine.setProperty('user.name', 'Bob');
      expect(watcher).toHaveBeenCalledTimes(2); // Should not be called after unwatch
    });

    it('should handle multiple watchers for the same property', () => {
      const watcher1 = vi.fn();
      const watcher2 = vi.fn();

      storageEngine.watchProperty('test.prop', watcher1);
      storageEngine.watchProperty('test.prop', watcher2);

      storageEngine.setProperty('test.prop', 'value');

      expect(watcher1).toHaveBeenCalledWith('value', undefined, 'test.prop');
      expect(watcher2).toHaveBeenCalledWith('value', undefined, 'test.prop');
    });
  });

  describe('Validation', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory'
      });
    });

    it('should add and execute validators', () => {
      const validator = vi.fn().mockReturnValue(true);
      storageEngine.addValidator('user.age', validator);

      storageEngine.setProperty('user.age', 25);
      expect(validator).toHaveBeenCalledWith(25, storageEngine.storage.data);
    });

    it('should track validation errors', () => {
      storageEngine.addValidator('user.age', (value) => {
        if (value < 18) return 'Must be at least 18 years old';
        return true;
      });

      storageEngine.setProperty('user.age', 16);
      expect(storageEngine.isValid.value).toBe(false);
      expect(storageEngine.storage.errors).toContain('Validation error for user.age: Must be at least 18 years old');

      storageEngine.setProperty('user.age', 25);
      // Note: In real implementation, errors should be cleared when validation passes
    });

    it('should validate all properties', () => {
      storageEngine.addValidator('user.name', (value) => value ? true : 'Name is required');
      storageEngine.addValidator('user.age', (value) => value >= 18 ? true : 'Must be 18 or older');

      storageEngine.setProperty('user.name', '');
      storageEngine.setProperty('user.age', 16);

      const results = storageEngine.validateAll();
      expect(results).not.toBe(true);
      expect(results['user.name']).toBe('Name is required');
      expect(results['user.age']).toBe('Must be 18 or older');
    });

    it('should remove validators', () => {
      const validator = vi.fn().mockReturnValue(true);
      storageEngine.addValidator('test.prop', validator);
      
      storageEngine.setProperty('test.prop', 'value');
      expect(validator).toHaveBeenCalled();

      storageEngine.removeValidator('test.prop');
      validator.mockClear();
      
      storageEngine.setProperty('test.prop', 'new value');
      expect(validator).not.toHaveBeenCalled();
    });
  });

  describe('Versioning', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory',
        enableVersioning: true,
        maxVersions: 3
      });
    });

    it('should create versions when saving', async () => {
      storageEngine.setProperty('test', 'version1');
      await storageEngine.save();
      
      expect(storageEngine.storage.versions).toHaveLength(1);
      expect(storageEngine.storage.versions[0].data.test).toBe('version1');
    });

    it('should limit version history', async () => {
      // Create more versions than maxVersions
      for (let i = 1; i <= 5; i++) {
        storageEngine.setProperty('test', `version${i}`);
        await storageEngine.save();
      }

      expect(storageEngine.storage.versions).toHaveLength(3); // maxVersions
    });

    it('should restore from version', async () => {
      storageEngine.setProperty('test', 'version1');
      await storageEngine.save();
      
      storageEngine.setProperty('test', 'version2');
      await storageEngine.save();
      
      storageEngine.setProperty('test', 'current');

      expect(storageEngine.restoreVersion(0)).toBe(true); // Most recent version
      expect(storageEngine.getProperty('test')).toBe('version2');
      
      expect(storageEngine.restoreVersion(1)).toBe(true); // Older version
      expect(storageEngine.getProperty('test')).toBe('version1');
    });

    it('should handle invalid version indices', () => {
      expect(storageEngine.restoreVersion(-1)).toBe(false);
      expect(storageEngine.restoreVersion(999)).toBe(false);
    });
  });

  describe('Storage Persistence', () => {
    it('should work with localStorage', async () => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'localStorage'
      });

      storageEngine.setProperty('test', 'value');
      await storageEngine.save();

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'test_storage',
        expect.stringContaining('"test":"value"')
      );
    });

    it('should work with sessionStorage', async () => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'sessionStorage'
      });

      storageEngine.setProperty('test', 'value');
      await storageEngine.save();

      expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
        'test_storage',
        expect.stringContaining('"test":"value"')
      );
    });

    it('should load data from storage', async () => {
      const storedData = JSON.stringify({
        data: { user: { name: 'John' } },
        metadata: { version: 2, checksum: 'test' },
        versions: []
      });

      localStorageMock.getItem.mockReturnValue(storedData);

      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'localStorage'
      });

      const loaded = await storageEngine.load();
      expect(loaded).toBe(true);
      expect(storageEngine.getProperty('user.name')).toBe('John');
    });

    it('should handle corrupted storage data', async () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'localStorage'
      });

      const loaded = await storageEngine.load();
      expect(loaded).toBe(false);
      expect(storageEngine.storage.errors).toContain(expect.stringContaining('Load error'));
    });
  });

  describe('Data Import/Export', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory'
      });
    });

    it('should export data as JSON', () => {
      storageEngine.setProperty('user.name', 'John');
      storageEngine.setProperty('user.age', 30);

      const exported = storageEngine.exportData('json');
      const parsed = JSON.parse(exported);

      expect(parsed.user.name).toBe('John');
      expect(parsed.user.age).toBe(30);
    });

    it('should export data as CSV for flat structures', () => {
      storageEngine.setProperty('name', 'John');
      storageEngine.setProperty('age', 30);

      const exported = storageEngine.exportData('csv');
      expect(exported).toContain('name,age');
      expect(exported).toContain('"John","30"');
    });

    it('should import JSON data', () => {
      const importData = { user: { name: 'Jane', age: 25 } };
      
      const result = storageEngine.importData(importData, 'json');
      expect(result).toBe(true);
      expect(storageEngine.getProperty('user.name')).toBe('Jane');
      expect(storageEngine.getProperty('user.age')).toBe(25);
    });

    it('should import JSON string data', () => {
      const importData = '{"user":{"name":"Bob","age":35}}';
      
      const result = storageEngine.importData(importData, 'json');
      expect(result).toBe(true);
      expect(storageEngine.getProperty('user.name')).toBe('Bob');
    });

    it('should handle invalid import data', () => {
      const result = storageEngine.importData('invalid json', 'json');
      expect(result).toBe(false);
      expect(storageEngine.storage.errors).toContain(expect.stringContaining('Import error'));
    });
  });

  describe('Auto-save Functionality', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory',
        autoSave: true,
        autoSaveDelay: 1000
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should trigger auto-save after delay', async () => {
      const saveSpy = vi.spyOn(storageEngine, 'save').mockResolvedValue(true);

      storageEngine.setProperty('test', 'value');
      expect(saveSpy).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1000);
      expect(saveSpy).toHaveBeenCalled();
    });

    it('should debounce rapid changes', async () => {
      const saveSpy = vi.spyOn(storageEngine, 'save').mockResolvedValue(true);

      storageEngine.setProperty('test', 'value1');
      vi.advanceTimersByTime(500);
      
      storageEngine.setProperty('test', 'value2');
      vi.advanceTimersByTime(500);
      
      storageEngine.setProperty('test', 'value3');
      vi.advanceTimersByTime(1000);

      expect(saveSpy).toHaveBeenCalledTimes(1); // Only one save call
    });
  });

  describe('Data Integrity', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory',
        enableEncryption: false,
        compressionEnabled: false
      });
    });

    it('should generate and verify checksums', async () => {
      storageEngine.setProperty('test', 'value');
      await storageEngine.save();

      expect(storageEngine.storage.metadata.checksum).toBeTruthy();
    });

    it('should detect checksum mismatches', async () => {
      const corruptedData = JSON.stringify({
        data: { test: 'value' },
        metadata: { checksum: 'invalid_checksum' },
        versions: []
      });

      localStorageMock.getItem.mockReturnValue(corruptedData);

      const newStorageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'localStorage'
      });

      const loaded = await newStorageEngine.load();
      expect(loaded).toBe(false);
      expect(newStorageEngine.storage.errors).toContain('Data integrity check failed');
    });
  });

  describe('Clear and Reset', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory'
      });
    });

    it('should clear all data', () => {
      storageEngine.setProperty('user.name', 'John');
      storageEngine.setProperty('settings.theme', 'dark');
      
      expect(Object.keys(storageEngine.storage.data)).toHaveLength(2);
      
      storageEngine.clear();
      
      expect(storageEngine.storage.data).toEqual({});
      expect(storageEngine.storage.metadata.version).toBe(1);
      expect(storageEngine.storage.versions).toEqual([]);
      expect(storageEngine.hasUnsavedChanges.value).toBe(false);
    });
  });

  describe('Computed Properties', () => {
    beforeEach(() => {
      storageEngine = useStorageEngine({
        storageKey: 'test_storage',
        storageType: 'memory'
      });
    });

    it('should track data size', () => {
      expect(storageEngine.dataSize.value).toBeGreaterThan(0);
      
      storageEngine.setProperty('large.data', 'x'.repeat(1000));
      const newSize = storageEngine.dataSize.value;
      
      expect(newSize).toBeGreaterThan(1000);
    });

    it('should track validation state', () => {
      expect(storageEngine.isValid.value).toBe(true);
      
      storageEngine.addValidator('test', () => 'Error message');
      storageEngine.setProperty('test', 'value');
      
      expect(storageEngine.isValid.value).toBe(false);
    });
  });
});