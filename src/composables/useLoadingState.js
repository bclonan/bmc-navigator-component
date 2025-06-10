import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';

/**
 * Composable for managing loading states with enhanced features
 * @param {Object} options - Configuration options
 * @returns {Object} Loading state management
 */
export function useLoadingState(options = {}) {
  const {
    initialLoading = false,
    minLoadingTime = 0,
    autoRetry = false,
    retryCount = 3,
    retryDelay = 1000,
    debounceMs = 0,
    onError = null,
    onSuccess = null,
    onRetry = null
  } = options;

  // State
  const isLoading = ref(initialLoading);
  const error = ref(null);
  const data = ref(null);
  const attempts = ref(0);
  const loadingStartTime = ref(null);
  const debounceTimer = ref(null);

  // Computed
  const hasError = computed(() => Boolean(error.value));
  const canRetry = computed(() => attempts.value < retryCount);
  const isRetrying = computed(() => attempts.value > 0 && isLoading.value);

  // Methods
  const startLoading = () => {
    isLoading.value = true;
    error.value = null;
    loadingStartTime.value = Date.now();
  };

  const stopLoading = () => {
    if (minLoadingTime > 0 && loadingStartTime.value) {
      const elapsed = Date.now() - loadingStartTime.value;
      const remaining = minLoadingTime - elapsed;
      
      if (remaining > 0) {
        setTimeout(() => {
          isLoading.value = false;
          loadingStartTime.value = null;
        }, remaining);
        return;
      }
    }
    
    isLoading.value = false;
    loadingStartTime.value = null;
  };

  const setError = (err) => {
    error.value = err;
    stopLoading();
    
    if (onError) {
      onError(err);
    }
    
    // Auto retry if enabled
    if (autoRetry && attempts.value < retryCount) {
      setTimeout(() => {
        retry();
      }, retryDelay);
    }
  };

  const setData = (newData) => {
    data.value = newData;
    error.value = null;
    attempts.value = 0;
    stopLoading();
    
    if (onSuccess) {
      onSuccess(newData);
    }
  };

  const retry = () => {
    attempts.value++;
    error.value = null;
    
    if (onRetry) {
      onRetry(attempts.value);
    }
    
    startLoading();
  };

  const reset = () => {
    isLoading.value = false;
    error.value = null;
    data.value = null;
    attempts.value = 0;
    loadingStartTime.value = null;
    
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value);
      debounceTimer.value = null;
    }
  };

  const executeWithLoading = async (asyncFunction) => {
    if (debounceMs > 0) {
      if (debounceTimer.value) {
        clearTimeout(debounceTimer.value);
      }
      
      return new Promise((resolve, reject) => {
        debounceTimer.value = setTimeout(async () => {
          try {
            startLoading();
            const result = await asyncFunction();
            setData(result);
            resolve(result);
          } catch (err) {
            setError(err);
            reject(err);
          }
        }, debounceMs);
      });
    }
    
    try {
      startLoading();
      const result = await asyncFunction();
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  // Cleanup
  onBeforeUnmount(() => {
    if (debounceTimer.value) {
      clearTimeout(debounceTimer.value);
    }
  });

  return {
    // State
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    data: computed(() => data.value),
    attempts: computed(() => attempts.value),
    hasError,
    canRetry,
    isRetrying,
    
    // Methods
    startLoading,
    stopLoading,
    setError,
    setData,
    retry,
    reset,
    executeWithLoading
  };
}

/**
 * Composable for API calls with loading management
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} API call management
 */
export function useAsyncData(apiFunction, options = {}) {
  const {
    immediate = true,
    params = {},
    transform = null,
    cache = false,
    cacheKey = null,
    ...loadingOptions
  } = options;

  const loadingState = useLoadingState(loadingOptions);
  const cacheStore = cache ? new Map() : null;

  const execute = async (customParams = {}) => {
    const finalParams = { ...params, ...customParams };
    const key = cacheKey || JSON.stringify(finalParams);
    
    // Check cache first
    if (cache && cacheStore.has(key)) {
      loadingState.setData(cacheStore.get(key));
      return loadingState.data.value;
    }
    
    const result = await loadingState.executeWithLoading(async () => {
      const response = await apiFunction(finalParams);
      const transformedData = transform ? transform(response) : response;
      
      // Cache the result
      if (cache) {
        cacheStore.set(key, transformedData);
      }
      
      return transformedData;
    });
    
    return result;
  };

  const refresh = () => {
    if (cache && cacheKey) {
      cacheStore?.delete(cacheKey);
    }
    return execute();
  };

  // Auto-execute on mount if immediate
  if (immediate) {
    onMounted(() => {
      execute();
    });
  }

  return {
    ...loadingState,
    execute,
    refresh,
    clearCache: () => cacheStore?.clear()
  };
}

/**
 * Higher-order function to create async components with loading states
 * @param {Object} Component - Vue component
 * @param {Object} options - Loading options
 * @returns {Object} Enhanced component
 */
export function withAsyncLoading(Component, options = {}) {
  return {
    name: `WithAsyncLoading(${Component.name || 'AnonymousComponent'})`,
    
    props: {
      ...Component.props,
      loadingComponent: {
        type: [String, Object],
        default: 'MAsyncLoader'
      },
      loadingProps: {
        type: Object,
        default: () => ({})
      },
      errorProps: {
        type: Object,
        default: () => ({})
      },
      ...options.props
    },
    
    emits: [...(Component.emits || []), 'loading', 'error', 'loaded'],
    
    setup(props, { emit, slots, attrs }) {
      const loadingState = useLoadingState({
        onError: (err) => emit('error', err),
        onSuccess: (data) => emit('loaded', data),
        ...options
      });

      // Watch loading state and emit events
      watch(loadingState.isLoading, (loading) => {
        emit('loading', loading);
      });

      return {
        ...loadingState,
        Component,
        slots,
        attrs,
        emit
      };
    },
    
    template: `
      <component
        :is="loadingComponent"
        :loading="isLoading"
        :error="error"
        :data="data"
        :show-retry="canRetry"
        v-bind="{ ...loadingProps, ...errorProps }"
        @retry="retry"
      >
        <Component
          v-bind="{ ...attrs, data }"
          @error="setError"
          @loading="isLoading ? stopLoading() : startLoading()"
        >
          <template v-for="(_, name) in slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps || {}" />
          </template>
        </Component>
      </component>
    `
  };
}

/**
 * Composable for managing multiple loading states
 * @param {Object} states - Named loading states
 * @returns {Object} Multiple loading state management
 */
export function useMultipleLoadingStates(states = {}) {
  const loadingStates = ref({});
  
  // Initialize states
  Object.keys(states).forEach(key => {
    loadingStates.value[key] = useLoadingState(states[key]);
  });
  
  // Global computed properties
  const isAnyLoading = computed(() => 
    Object.values(loadingStates.value).some(state => state.isLoading.value)
  );
  
  const hasAnyError = computed(() =>
    Object.values(loadingStates.value).some(state => state.hasError.value)
  );
  
  const allData = computed(() => {
    const result = {};
    Object.keys(loadingStates.value).forEach(key => {
      result[key] = loadingStates.value[key].data.value;
    });
    return result;
  });
  
  const resetAll = () => {
    Object.values(loadingStates.value).forEach(state => state.reset());
  };
  
  return {
    states: loadingStates,
    isAnyLoading,
    hasAnyError,
    allData,
    resetAll,
    getState: (key) => loadingStates.value[key]
  };
}
