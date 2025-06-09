import { ref, reactive, computed, watch } from 'vue';

/**
 * Advanced storage engine for form data with persistence, versioning, and validation
 */
export function useStorageEngine(options = {}) {
  const {
    storageKey = 'form_data',
    storageType = 'localStorage', // 'localStorage', 'sessionStorage', 'memory'
    autoSave = true,
    autoSaveDelay = 1000,
    enableVersioning = true,
    maxVersions = 10,
    enableEncryption = false,
    compressionEnabled = true
  } = options;

  // Internal state
  const storage = reactive({
    data: {},
    metadata: {
      version: 1,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      checksum: null,
      encrypted: false,
      compressed: false
    },
    versions: [],
    isDirty: false,
    isLoading: false,
    lastSaved: null,
    errors: []
  });

  const watchers = new Map();
  const validators = new Map();
  let autoSaveTimeout = null;

  /**
   * Get storage adapter based on type
   */
  const getStorageAdapter = () => {
    switch (storageType) {
      case 'localStorage':
        return {
          getItem: (key) => localStorage.getItem(key),
          setItem: (key, value) => localStorage.setItem(key, value),
          removeItem: (key) => localStorage.removeItem(key)
        };
      case 'sessionStorage':
        return {
          getItem: (key) => sessionStorage.getItem(key),
          setItem: (key, value) => sessionStorage.setItem(key, value),
          removeItem: (key) => sessionStorage.removeItem(key)
        };
      case 'memory':
      default:
        const memoryStorage = new Map();
        return {
          getItem: (key) => memoryStorage.get(key) || null,
          setItem: (key, value) => memoryStorage.set(key, value),
          removeItem: (key) => memoryStorage.delete(key)
        };
    }
  };

  const storageAdapter = getStorageAdapter();

  /**
   * Generate checksum for data integrity
   */
  const generateChecksum = (data) => {
    const str = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  };

  /**
   * Simple compression for storage efficiency
   */
  const compress = (data) => {
    if (!compressionEnabled) return data;
    // Simple LZ-style compression simulation
    const str = JSON.stringify(data);
    return btoa(str); // Base64 encoding as compression simulation
  };

  const decompress = (compressedData) => {
    if (!compressionEnabled) return compressedData;
    try {
      const str = atob(compressedData);
      return JSON.parse(str);
    } catch {
      return compressedData;
    }
  };

  /**
   * Simple encryption for sensitive data
   */
  const encrypt = (data) => {
    if (!enableEncryption) return data;
    // Simple XOR encryption simulation
    const str = JSON.stringify(data);
    const key = 'secret_key_12345';
    let encrypted = '';
    for (let i = 0; i < str.length; i++) {
      encrypted += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted);
  };

  const decrypt = (encryptedData) => {
    if (!enableEncryption) return encryptedData;
    try {
      const encrypted = atob(encryptedData);
      const key = 'secret_key_12345';
      let decrypted = '';
      for (let i = 0; i < encrypted.length; i++) {
        decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return JSON.parse(decrypted);
    } catch {
      return encryptedData;
    }
  };

  /**
   * Load data from storage
   */
  const load = async () => {
    storage.isLoading = true;
    storage.errors = [];

    try {
      const stored = storageAdapter.getItem(storageKey);
      if (!stored) {
        storage.isLoading = false;
        return false;
      }

      let parsedData = JSON.parse(stored);
      
      // Handle encryption
      if (parsedData.metadata?.encrypted) {
        parsedData.data = decrypt(parsedData.data);
      }
      
      // Handle compression
      if (parsedData.metadata?.compressed) {
        parsedData.data = decompress(parsedData.data);
      }

      // Verify checksum
      if (parsedData.metadata?.checksum) {
        const currentChecksum = generateChecksum(parsedData.data);
        if (currentChecksum !== parsedData.metadata.checksum) {
          storage.errors.push('Data integrity check failed');
          storage.isLoading = false;
          return false;
        }
      }

      Object.assign(storage, parsedData);
      storage.isDirty = false;
      storage.isLoading = false;
      return true;
    } catch (error) {
      storage.errors.push(`Load error: ${error.message}`);
      storage.isLoading = false;
      return false;
    }
  };

  /**
   * Save data to storage
   */
  const save = async () => {
    try {
      // Create version if versioning enabled
      if (enableVersioning && storage.data && Object.keys(storage.data).length > 0) {
        const version = {
          version: storage.metadata.version,
          data: JSON.parse(JSON.stringify(storage.data)),
          timestamp: new Date().toISOString()
        };
        
        storage.versions.unshift(version);
        if (storage.versions.length > maxVersions) {
          storage.versions = storage.versions.slice(0, maxVersions);
        }
      }

      // Update metadata
      storage.metadata.version += 1;
      storage.metadata.lastModified = new Date().toISOString();
      storage.metadata.checksum = generateChecksum(storage.data);
      storage.metadata.encrypted = enableEncryption;
      storage.metadata.compressed = compressionEnabled;

      // Prepare data for storage
      let dataToStore = storage.data;
      
      if (enableEncryption) {
        dataToStore = encrypt(dataToStore);
      }
      
      if (compressionEnabled) {
        dataToStore = compress(dataToStore);
      }

      const payload = {
        data: dataToStore,
        metadata: storage.metadata,
        versions: storage.versions
      };

      storageAdapter.setItem(storageKey, JSON.stringify(payload));
      storage.isDirty = false;
      storage.lastSaved = new Date();
      storage.errors = [];
      return true;
    } catch (error) {
      storage.errors.push(`Save error: ${error.message}`);
      return false;
    }
  };

  /**
   * Auto-save functionality
   */
  const triggerAutoSave = () => {
    if (!autoSave) return;
    
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    autoSaveTimeout = setTimeout(() => {
      save();
    }, autoSaveDelay);
  };

  /**
   * Set a property value with dot notation support
   */
  const setProperty = (path, value) => {
    const keys = path.split('.');
    let current = storage.data;
    
    // Create nested structure if it doesn't exist
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current) || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    const lastKey = keys[keys.length - 1];
    const oldValue = current[lastKey];
    current[lastKey] = value;
    
    storage.isDirty = true;
    triggerAutoSave();
    
    // Trigger property watchers
    if (watchers.has(path)) {
      watchers.get(path).forEach(callback => {
        callback(value, oldValue, path);
      });
    }
    
    // Run validators
    if (validators.has(path)) {
      const validator = validators.get(path);
      const result = validator(value, storage.data);
      if (result !== true) {
        storage.errors.push(`Validation error for ${path}: ${result}`);
      }
    }
    
    return value;
  };

  /**
   * Get a property value with dot notation support
   */
  const getProperty = (path, defaultValue = undefined) => {
    const keys = path.split('.');
    let current = storage.data;
    
    for (const key of keys) {
      if (current === null || current === undefined || !(key in current)) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current;
  };

  /**
   * Check if a property exists
   */
  const hasProperty = (path) => {
    const keys = path.split('.');
    let current = storage.data;
    
    for (const key of keys) {
      if (current === null || current === undefined || !(key in current)) {
        return false;
      }
      current = current[key];
    }
    
    return true;
  };

  /**
   * Delete a property
   */
  const deleteProperty = (path) => {
    const keys = path.split('.');
    let current = storage.data;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        return false;
      }
      current = current[keys[i]];
    }
    
    const lastKey = keys[keys.length - 1];
    if (lastKey in current) {
      delete current[lastKey];
      storage.isDirty = true;
      triggerAutoSave();
      return true;
    }
    
    return false;
  };

  /**
   * Watch property changes
   */
  const watchProperty = (path, callback) => {
    if (!watchers.has(path)) {
      watchers.set(path, new Set());
    }
    watchers.get(path).add(callback);
    
    // Return unwatch function
    return () => {
      const pathWatchers = watchers.get(path);
      if (pathWatchers) {
        pathWatchers.delete(callback);
        if (pathWatchers.size === 0) {
          watchers.delete(path);
        }
      }
    };
  };

  /**
   * Add validator for a property
   */
  const addValidator = (path, validator) => {
    validators.set(path, validator);
  };

  /**
   * Remove validator for a property
   */
  const removeValidator = (path) => {
    validators.delete(path);
  };

  /**
   * Validate all properties
   */
  const validateAll = () => {
    storage.errors = [];
    const results = {};
    
    for (const [path, validator] of validators) {
      const value = getProperty(path);
      const result = validator(value, storage.data);
      if (result !== true) {
        storage.errors.push(`Validation error for ${path}: ${result}`);
        results[path] = result;
      }
    }
    
    return Object.keys(results).length === 0 ? true : results;
  };

  /**
   * Restore from a specific version
   */
  const restoreVersion = (versionIndex) => {
    if (versionIndex >= 0 && versionIndex < storage.versions.length) {
      const version = storage.versions[versionIndex];
      storage.data = JSON.parse(JSON.stringify(version.data));
      storage.isDirty = true;
      triggerAutoSave();
      return true;
    }
    return false;
  };

  /**
   * Clear all data
   */
  const clear = () => {
    storage.data = {};
    storage.metadata = {
      version: 1,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      checksum: null,
      encrypted: false,
      compressed: false
    };
    storage.versions = [];
    storage.isDirty = false;
    storage.errors = [];
    storageAdapter.removeItem(storageKey);
  };

  /**
   * Export data in various formats
   */
  const exportData = (format = 'json') => {
    switch (format) {
      case 'json':
        return JSON.stringify(storage.data, null, 2);
      case 'csv':
        // Simple CSV export for flat data
        const flatData = flattenObject(storage.data);
        const headers = Object.keys(flatData).join(',');
        const values = Object.values(flatData).map(v => `"${v}"`).join(',');
        return `${headers}\n${values}`;
      default:
        return storage.data;
    }
  };

  /**
   * Import data from various formats
   */
  const importData = (data, format = 'json') => {
    try {
      let parsedData;
      switch (format) {
        case 'json':
          parsedData = typeof data === 'string' ? JSON.parse(data) : data;
          break;
        default:
          parsedData = data;
      }
      
      storage.data = parsedData;
      storage.isDirty = true;
      triggerAutoSave();
      return true;
    } catch (error) {
      storage.errors.push(`Import error: ${error.message}`);
      return false;
    }
  };

  /**
   * Utility function to flatten nested objects
   */
  const flattenObject = (obj, prefix = '') => {
    const flattened = {};
    for (const key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(flattened, flattenObject(obj[key], newKey));
      } else {
        flattened[newKey] = obj[key];
      }
    }
    return flattened;
  };

  // Computed properties
  const isValid = computed(() => storage.errors.length === 0);
  const dataSize = computed(() => JSON.stringify(storage.data).length);
  const hasUnsavedChanges = computed(() => storage.isDirty);

  // Initialize
  load();

  return {
    // State
    storage: readonly(storage),
    isValid,
    dataSize,
    hasUnsavedChanges,
    
    // Core operations
    load,
    save,
    clear,
    
    // Property operations
    setProperty,
    getProperty,
    hasProperty,
    deleteProperty,
    
    // Watching and validation
    watchProperty,
    addValidator,
    removeValidator,
    validateAll,
    
    // Versioning
    restoreVersion,
    
    // Import/Export
    exportData,
    importData,
    
    // Utility
    triggerAutoSave
  };
}

/**
 * Create a readonly proxy to prevent direct mutations
 */
function readonly(obj) {
  return new Proxy(obj, {
    set() {
      console.warn('Direct mutation of storage state is not allowed. Use setProperty() instead.');
      return false;
    },
    deleteProperty() {
      console.warn('Direct deletion of storage properties is not allowed. Use deleteProperty() instead.');
      return false;
    }
  });
}