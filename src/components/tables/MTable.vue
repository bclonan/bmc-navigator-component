<template>
  <div class="m-table" :class="containerClasses">
    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded mb-4"></div>
      <div class="space-y-3">
        <div v-for="i in pageSize" :key="i" class="h-12 bg-gray-200 rounded"></div>
      </div>
    </div>

    <template v-else>
      <!-- Table Header -->
      <div v-if="title || subtitle || showSearch || showFilters" class="table-header mb-4">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 v-if="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <p v-if="subtitle" class="text-sm text-gray-600">{{ subtitle }}</p>
          </div>
          
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- Search -->
            <div v-if="showSearch" class="relative">
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="searchPlaceholder"
                :aria-label="searchAriaLabel"
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                @input="debounceSearch"
              />
              <svg class="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            <!-- Column Visibility Toggle -->
            <div v-if="showColumnToggle" class="relative" ref="columnToggle">
              <button
                @click="showColumnMenu = !showColumnMenu"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                :aria-expanded="showColumnMenu"
                aria-haspopup="true"
              >
                Columns
              </button>
              <div
                v-if="showColumnMenu"
                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                @click.stop
              >
                <div class="p-2 space-y-1">
                  <label
                    v-for="column in columns"
                    :key="column.key"
                    class="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      v-model="columnVisibility[column.key]"
                      type="checkbox"
                      class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span class="text-sm">{{ column.label }}</span>
                  </label>
                </div>
              </div>
            </div>
            
            <!-- Export -->
            <button
              v-if="showExport"
              @click="exportData"
              :disabled="filteredData.length === 0"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export CSV
            </button>
          </div>
        </div>
        
        <!-- Filters -->
        <div v-if="showFilters && filterOptions.length > 0" class="mt-4 flex flex-wrap gap-2">
          <select
            v-for="filter in filterOptions"
            :key="filter.key"
            v-model="activeFilters[filter.key]"
            :aria-label="`Filter by ${filter.label}`"
            class="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            @change="applyFilters"
          >
            <option value="">{{ filter.label }}</option>
            <option
              v-for="option in filter.options"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Table Container -->
      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <div class="overflow-x-auto">
          <table 
            class="min-w-full divide-y divide-gray-300"
            role="table"
            :aria-label="tableAriaLabel"
          >
            <!-- Table Head -->
            <thead class="bg-gray-50" :class="{ 'sticky top-0 z-10': stickyHeader }">
              <tr role="row">
                <!-- Selection Column -->
                <th v-if="selectable" class="relative w-12 px-6 sm:w-16 sm:px-8" scope="col">
                  <input
                    type="checkbox"
                    :checked="isAllSelected"
                    :indeterminate.prop="isIndeterminate"
                    @change="toggleSelectAll"
                    :aria-label="selectAllAriaLabel"
                    class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </th>
                
                <!-- Data Columns -->
                <th
                  v-for="column in visibleColumns"
                  :key="column.key"
                  :class="[
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : '',
                    column.align === 'center' ? 'text-center' : '',
                    column.align === 'right' ? 'text-right' : ''
                  ]"
                  @click="column.sortable && handleSort(column.key)"
                  @keydown.enter="column.sortable && handleSort(column.key)"
                  @keydown.space.prevent="column.sortable && handleSort(column.key)"
                  :tabindex="column.sortable ? 0 : -1"
                  :aria-sort="getSortAriaLabel(column.key)"
                  scope="col"
                  role="columnheader"
                >
                  <div class="flex items-center space-x-1">
                    <span>{{ column.label }}</span>
                    <svg
                      v-if="column.sortable"
                      class="w-4 h-4 text-gray-400 transition-transform"
                      :class="{
                        'text-blue-600': sortColumn === column.key,
                        'rotate-180': sortColumn === column.key && sortDirection === 'desc'
                      }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      :aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10l5 5 5-5z"></path>
                    </svg>
                  </div>
                </th>
                
                <!-- Actions Column -->
                <th v-if="showActions" class="relative px-6 py-3" scope="col">
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            
            <!-- Table Body -->
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(row, index) in paginatedData"
                :key="getRowKey(row, index)"
                :class="[
                  'hover:bg-gray-50 transition-colors',
                  isRowSelected(row) ? 'bg-blue-50' : '',
                  rowClickable ? 'cursor-pointer' : ''
                ]"
                @click="handleRowClick(row, index)"
                @keydown.enter="rowClickable && handleRowClick(row, index)"
                :tabindex="rowClickable ? 0 : -1"
                role="row"
              >
                <!-- Selection Column -->
                <td v-if="selectable" class="relative w-12 px-6 sm:w-16 sm:px-8">
                  <input
                    type="checkbox"
                    :checked="isRowSelected(row)"
                    @change="toggleRowSelection(row)"
                    @click.stop
                    :aria-label="`Select row ${index + 1}`"
                    class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                </td>
                
                <!-- Data Columns -->
                <td
                  v-for="column in visibleColumns"
                  :key="`${getRowKey(row, index)}-${column.key}`"
                  :class="[
                    'px-6 py-4 whitespace-nowrap text-sm',
                    column.align === 'center' ? 'text-center' : '',
                    column.align === 'right' ? 'text-right' : '',
                    column.className || ''
                  ]"
                  role="cell"
                >
                  <!-- Custom Cell Renderer (Secure) -->
                  <component
                    v-if="column.component"
                    :is="column.component"
                    :value="getValue(row, column.key)"
                    :row="row"
                    :index="index"
                    v-bind="column.componentProps || {}"
                  />
                  
                  <!-- Render Function (Secure alternative to v-html) -->
                  <template v-else-if="column.render">
                    {{ column.render(getValue(row, column.key), row, index) }}
                  </template>
                  
                  <!-- Status Badge -->
                  <span
                    v-else-if="column.type === 'status'"
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusClass(getValue(row, column.key))
                    ]"
                  >
                    {{ getValue(row, column.key) }}
                  </span>
                  
                  <!-- Currency -->
                  <span v-else-if="column.type === 'currency'" class="font-medium text-gray-900">
                    {{ formatCurrency(getValue(row, column.key), column.currencyOptions) }}
                  </span>
                  
                  <!-- Date -->
                  <span v-else-if="column.type === 'date'" class="text-gray-500">
                    {{ formatDate(getValue(row, column.key), column.dateFormat) }}
                  </span>
                  
                  <!-- Number -->
                  <span v-else-if="column.type === 'number'" class="font-medium text-gray-900">
                    {{ formatNumber(getValue(row, column.key), column.numberOptions) }}
                  </span>
                  
                  <!-- Boolean -->
                  <span v-else-if="column.type === 'boolean'">
                    <svg
                      v-if="getValue(row, column.key)"
                      class="w-5 h-5 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      :aria-label="column.booleanLabels?.true || 'Yes'"
                    >
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <svg
                      v-else
                      class="w-5 h-5 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      :aria-label="column.booleanLabels?.false || 'No'"
                    >
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                    </svg>
                  </span>
                  
                  <!-- Link -->
                  <a
                    v-else-if="column.type === 'link'"
                    :href="column.linkHref ? column.linkHref(row) : getValue(row, column.key)"
                    :target="column.linkTarget || '_self'"
                    class="text-blue-600 hover:text-blue-800 underline"
                  >
                    {{ column.linkText ? column.linkText(row) : getValue(row, column.key) }}
                  </a>
                  
                  <!-- Default -->
                  <span v-else class="text-gray-900">
                    {{ formatCellValue(getValue(row, column.key), column) }}
                  </span>
                </td>
                
                <!-- Actions Column -->
                <td v-if="showActions" class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      v-for="action in getRowActions(row, index)"
                      :key="action.key"
                      :class="[
                        'inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded border focus:outline-none focus:ring-2 transition-colors',
                        getActionClass(action.variant)
                      ]"
                      :disabled="action.disabled?.(row)"
                      @click.stop="handleAction(action, row, index)"
                      :aria-label="action.ariaLabel || action.label"
                    >
                      {{ action.label }}
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Empty State -->
              <tr v-if="paginatedData.length === 0">
                <td :colspan="totalColumns" class="px-6 py-12 text-center">
                  <div class="text-gray-500">
                    <slot name="empty-state">
                      <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h3a2 2 0 012 2v1M9 7h6"></path>
                      </svg>
                      <p class="text-sm">{{ emptyMessage || 'No data available' }}</p>
                    </slot>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Pagination -->
      <nav
        v-if="showPagination && totalPages > 1"
        class="mt-4 flex items-center justify-between"
        aria-label="Table pagination"
      >
        <div class="flex items-center text-sm text-gray-700">
          <span>
            Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length }} results
          </span>
        </div>
        
        <div class="flex items-center space-x-2">
          <button
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
            aria-label="Go to previous page"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div class="flex space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              :class="[
                'px-3 py-2 text-sm font-medium border rounded-md',
                page === currentPage
                  ? 'text-blue-600 bg-blue-50 border-blue-500'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
              ]"
              :aria-label="`Go to page ${page}`"
              :aria-current="page === currentPage ? 'page' : undefined"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          
          <button
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
            aria-label="Go to next page"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </nav>

      <!-- Selection Summary -->
      <div v-if="selectable && selectedRows.length > 0" class="mt-4 p-3 bg-blue-50 rounded-lg">
        <div class="flex items-center justify-between">
          <span class="text-sm text-blue-700">
            {{ selectedRows.length }} item{{ selectedRows.length === 1 ? '' : 's' }} selected
          </span>
          <button
            @click="clearSelection"
            class="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Clear selection
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
// Simple debounce implementation to avoid external dependency
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default {
  name: 'MTable',
  props: {
    data: {
      type: Array,
      required: true,
      validator: (value) => Array.isArray(value)
    },
    columns: {
      type: Array,
      required: true,
      validator: (columns) => 
        Array.isArray(columns) && 
        columns.every(col => col.key && col.label)
    },
    title: String,
    subtitle: String,
    loading: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    searchPlaceholder: {
      type: String,
      default: 'Search...'
    },
    searchAriaLabel: {
      type: String,
      default: 'Search table data'
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    showActions: {
      type: Boolean,
      default: false
    },
    showExport: {
      type: Boolean,
      default: false
    },
    showColumnToggle: {
      type: Boolean,
      default: false
    },
    stickyHeader: {
      type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10,
      validator: (value) => value > 0
    },
    actions: {
      type: Array,
      default: () => []
    },
    filterOptions: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    rowClickable: {
      type: Boolean,
      default: false
    },
    emptyMessage: String,
    responsive: {
      type: Boolean,
      default: true
    },
    tableAriaLabel: {
      type: String,
      default: 'Data table'
    },
    selectAllAriaLabel: {
      type: String,
      default: 'Select all rows'
    },
    searchDebounceMs: {
      type: Number,
      default: 300
    },
    statusClasses: {
      type: Object,
      default: () => ({})
    }
  },
  
  emits: [
    'row-click', 
    'action-click', 
    'selection-change', 
    'sort', 
    'filter', 
    'search',
    'column-visibility-change'
  ],
  
  data() {
    return {
      searchQuery: '',
      debouncedSearchQuery: '',
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      selectedRows: [],
      activeFilters: {},
      showColumnMenu: false,
      columnVisibility: {}
    };
  },
  
  computed: {
    containerClasses() {
      return [
        'w-full',
        { 'max-w-full overflow-hidden': this.responsive }
      ];
    },
    
    visibleColumns() {
      return this.columns.filter(col => 
        col.visible !== false && 
        this.columnVisibility[col.key] !== false
      );
    },
    
    totalColumns() {
      let count = this.visibleColumns.length;
      if (this.selectable) count++;
      if (this.showActions) count++;
      return count;
    },
    
    filteredData() {
      let result = [...this.data];
      
      // Apply search
      if (this.debouncedSearchQuery) {
        const query = this.debouncedSearchQuery.toLowerCase();
        result = result.filter(row => {
          return this.visibleColumns.some(col => {
            const value = this.getValue(row, col.key);
            return String(value || '').toLowerCase().includes(query);
          });
        });
      }
      
      // Apply filters
      if (this.hasActiveFilters) {
        result = result.filter(row => {
          return Object.entries(this.activeFilters).every(([key, value]) => {
            if (!value) return true;
            const rowValue = this.getValue(row, key);
            return rowValue === value || String(rowValue) === String(value);
          });
        });
      }
      
      // Apply sorting
      if (this.sortColumn) {
        result.sort((a, b) => {
          const aVal = this.getValue(a, this.sortColumn);
          const bVal = this.getValue(b, this.sortColumn);
          
          // Handle null/undefined values
          if (aVal == null && bVal == null) return 0;
          if (aVal == null) return 1;
          if (bVal == null) return -1;
          
          let comparison = 0;
          
          // Type-aware comparison
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            comparison = aVal - bVal;
          } else if (aVal instanceof Date && bVal instanceof Date) {
            comparison = aVal.getTime() - bVal.getTime();
          } else {
            const aStr = String(aVal).toLowerCase();
            const bStr = String(bVal).toLowerCase();
            comparison = aStr.localeCompare(bStr);
          }
          
          return this.sortDirection === 'desc' ? -comparison : comparison;
        });
      }
      
      return result;
    },
    
    totalPages() {
      return Math.ceil(this.filteredData.length / this.pageSize);
    },
    
    startIndex() {
      return (this.currentPage - 1) * this.pageSize;
    },
    
    endIndex() {
      return this.startIndex + this.pageSize;
    },
    
    paginatedData() {
      if (!this.showPagination) return this.filteredData;
      return this.filteredData.slice(this.startIndex, this.endIndex);
    },
    
    visiblePages() {
      const delta = 2;
      const range = [];
      
      for (let i = Math.max(1, this.currentPage - delta);
           i <= Math.min(this.totalPages, this.currentPage + delta);
           i++) {
        range.push(i);
      }
      
      return range;
    },
    
    isAllSelected() {
      return this.paginatedData.length > 0 && 
             this.paginatedData.every(row => this.isRowSelected(row));
    },
    
    isIndeterminate() {
      const selectedCount = this.paginatedData.filter(row => this.isRowSelected(row)).length;
      return selectedCount > 0 && selectedCount < this.paginatedData.length;
    },
    
    hasActiveFilters() {
      return Object.values(this.activeFilters).some(value => value);
    }
  },
  
  watch: {
    data: {
      handler() {
        this.currentPage = 1;
        this.selectedRows = [];
      },
      deep: false
    },
    
    selectedRows() {
      this.$emit('selection-change', this.selectedRows);
    },
    
    searchQuery() {
      this.debounceSearch();
    },
    
    debouncedSearchQuery() {
      this.currentPage = 1;
      this.$emit('search', this.debouncedSearchQuery);
    },
    
    columnVisibility: {
      handler(newValue) {
        this.$emit('column-visibility-change', newValue);
      },
      deep: true
    },
    
    columns: {
      immediate: true,
      handler(columns) {
        // Initialize column visibility
        const visibility = {};
        columns.forEach(col => {
          visibility[col.key] = col.visible !== false;
        });
        this.columnVisibility = visibility;
      }
    }
  },
  
  created() {
    // Initialize debounced search
    this.debounceSearch = debounce(() => {
      this.debouncedSearchQuery = this.searchQuery;
    }, this.searchDebounceMs);
    
    // Close column menu when clicking outside
    this.handleClickOutside = (event) => {
      if (this.$refs.columnToggle && !this.$refs.columnToggle.contains(event.target)) {
        this.showColumnMenu = false;
      }
    };
  },
  
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    this.debounceSearch.cancel();
  },
  
  methods: {
    getValue(row, key) {
      try {
        return key.split('.').reduce((obj, prop) => obj?.[prop], row);
      } catch (error) {
        console.warn(`Error accessing property ${key}:`, error);
        return null;
      }
    },
    
    getRowKey(row, index) {
      const key = this.getValue(row, this.rowKey);
      return key !== null && key !== undefined ? key : index;
    },
    
    handleSort(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
      
      this.$emit('sort', { column, direction: this.sortDirection });
    },
    
    getSortAriaLabel(columnKey) {
      if (this.sortColumn !== columnKey) return 'none';
      return this.sortDirection === 'asc' ? 'ascending' : 'descending';
    },
    
    handleRowClick(row, index) {
      if (this.rowClickable) {
        this.$emit('row-click', { row, index });
      }
    },
    
    handleAction(action, row, index) {
      this.$emit('action-click', { action: action.key, row, index, actionData: action });
    },
    
    getRowActions(row, index) {
      return this.actions.filter(action => {
        if (typeof action.visible === 'function') {
          return action.visible(row, index);
        }
        return action.visible !== false;
      });
    },
    
    getActionClass(variant) {
      const classes = {
        danger: 'text-red-700 bg-red-50 border-red-300 hover:bg-red-100 focus:ring-red-500',
        warning: 'text-yellow-700 bg-yellow-50 border-yellow-300 hover:bg-yellow-100 focus:ring-yellow-500',
        success: 'text-green-700 bg-green-50 border-green-300 hover:bg-green-100 focus:ring-green-500',
        default: 'text-blue-700 bg-blue-50 border-blue-300 hover:bg-blue-100 focus:ring-blue-500'
      };
      return classes[variant] || classes.default;
    },
    
    isRowSelected(row) {
      const key = this.getRowKey(row);
      return this.selectedRows.some(selected => this.getRowKey(selected) === key);
    },
    
    toggleRowSelection(row) {
      const key = this.getRowKey(row);
      const index = this.selectedRows.findIndex(selected => this.getRowKey(selected) === key);
      
      if (index > -1) {
        this.selectedRows.splice(index, 1);
      } else {
        this.selectedRows.push(row);
      }
    },
    
    toggleSelectAll() {
      if (this.isAllSelected) {
        // Deselect all visible rows
        this.paginatedData.forEach(row => {
          const key = this.getRowKey(row);
          const index = this.selectedRows.findIndex(selected => this.getRowKey(selected) === key);
          if (index > -1) {
            this.selectedRows.splice(index, 1);
          }
        });
      } else {
        // Select all visible rows
        this.paginatedData.forEach(row => {
          if (!this.isRowSelected(row)) {
            this.selectedRows.push(row);
          }
        });
      }
    },
    
    clearSelection() {
      this.selectedRows = [];
    },
    
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    
    applyFilters() {
      this.currentPage = 1;
      this.$emit('filter', this.activeFilters);
    },
    
    clearFilters() {
      this.activeFilters = {};
      this.applyFilters();
    },
    
    exportData() {
      try {
        const csvContent = this.generateCSV();
        this.downloadCSV(csvContent);
      } catch (error) {
        console.error('Export failed:', error);
        // Could emit an error event here
      }
    },
    
    generateCSV() {
      const headers = this.visibleColumns.map(col => `"${col.label}"`);
      const rows = this.filteredData.map(row => 
        this.visibleColumns.map(col => {
          const value = this.getValue(row, col.key);
          const formattedValue = this.formatCellValue(value, col);
          return `"${String(formattedValue || '').replace(/"/g, '""')}"`;
        })
      );
      
      return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    },
    
    downloadCSV(content) {
      const BOM = '\uFEFF'; // UTF-8 BOM for proper encoding
      const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = `table-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    
    formatCellValue(value, column) {
      if (value == null) return '';
      
      switch (column.type) {
        case 'currency':
          return this.formatCurrency(value, column.currencyOptions);
        case 'date':
          return this.formatDate(value, column.dateFormat);
        case 'number':
          return this.formatNumber(value, column.numberOptions);
        case 'boolean':
          return value ? (column.booleanLabels?.true || 'Yes') : (column.booleanLabels?.false || 'No');
        default:
          return column.formatter ? column.formatter(value) : String(value);
      }
    },
    
    formatCurrency(value, options = {}) {
      if (typeof value !== 'number') return value;
      
      const defaultOptions = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      };
      
      return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(value);
    },
    
    formatDate(value, format = 'short') {
      if (!value) return '';
      
      try {
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) return value;
        
        if (typeof format === 'string') {
          return new Intl.DateTimeFormat('en-US', { dateStyle: format }).format(date);
        } else {
          return new Intl.DateTimeFormat('en-US', format).format(date);
        }
      } catch (error) {
        console.warn('Date formatting error:', error);
        return value;
      }
    },
    
    formatNumber(value, options = {}) {
      if (typeof value !== 'number') return value;
      
      const defaultOptions = {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      };
      
      return new Intl.NumberFormat('en-US', { ...defaultOptions, ...options }).format(value);
    },
    
    getStatusClass(status) {
      const defaultClasses = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800'
      };
      
      const customClasses = this.statusClasses;
      const allClasses = { ...defaultClasses, ...customClasses };
      
      return allClasses[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
    }
  }
};
</script>

<style scoped>
.m-table {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.transition-colors {
  transition: background-color 0.15s ease-in-out;
}

.rotate-180 {
  transform: rotate(180deg);
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Sticky header z-index management */
.sticky {
  position: sticky;
}

/* Focus management for keyboard navigation */
.focus\\:ring-2:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 2px var(--ring-color, #3b82f6);
}

/* Custom scrollbar for better UX */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>