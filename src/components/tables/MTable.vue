<template>
  <div class="m-table" :class="containerClasses">
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
              placeholder="Search..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <svg class="w-4 h-4 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          
          <!-- Export -->
          <button
            v-if="showExport"
            @click="exportData"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            Export
          </button>
        </div>
      </div>
      
      <!-- Filters -->
      <div v-if="showFilters && filterOptions.length > 0" class="mt-4 flex flex-wrap gap-2">
        <select
          v-for="filter in filterOptions"
          :key="filter.key"
          v-model="activeFilters[filter.key]"
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
        <table class="min-w-full divide-y divide-gray-300">
          <!-- Table Head -->
          <thead class="bg-gray-50">
            <tr>
              <!-- Selection Column -->
              <th v-if="selectable" class="relative w-12 px-6 sm:w-16 sm:px-8">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  :indeterminate="isIndeterminate"
                  @change="toggleSelectAll"
                  class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
              </th>
              
              <!-- Data Columns -->
              <th
                v-for="column in visibleColumns"
                :key="column.key"
                :class="[
                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : '',
                  column.align === 'center' ? 'text-center' : '',
                  column.align === 'right' ? 'text-right' : ''
                ]"
                @click="column.sortable && handleSort(column.key)"
              >
                <div class="flex items-center space-x-1">
                  <span>{{ column.label }}</span>
                  <svg
                    v-if="column.sortable"
                    class="w-4 h-4 text-gray-400"
                    :class="{
                      'text-blue-600': sortColumn === column.key,
                      'rotate-180': sortColumn === column.key && sortDirection === 'desc'
                    }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10l5 5 5-5z"></path>
                  </svg>
                </div>
              </th>
              
              <!-- Actions Column -->
              <th v-if="showActions" class="relative px-6 py-3">
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
            >
              <!-- Selection Column -->
              <td v-if="selectable" class="relative w-12 px-6 sm:w-16 sm:px-8">
                <input
                  type="checkbox"
                  :checked="isRowSelected(row)"
                  @change="toggleRowSelection(row)"
                  @click.stop
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
              >
                <!-- Custom Cell Renderer -->
                <div v-if="column.render" v-html="column.render(getValue(row, column.key), row, index)"></div>
                
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
                  {{ formatCurrency(getValue(row, column.key)) }}
                </span>
                
                <!-- Date -->
                <span v-else-if="column.type === 'date'" class="text-gray-500">
                  {{ formatDate(getValue(row, column.key), column.dateFormat) }}
                </span>
                
                <!-- Number -->
                <span v-else-if="column.type === 'number'" class="font-medium text-gray-900">
                  {{ formatNumber(getValue(row, column.key)) }}
                </span>
                
                <!-- Boolean -->
                <span v-else-if="column.type === 'boolean'">
                  <svg
                    v-if="getValue(row, column.key)"
                    class="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                  </svg>
                </span>
                
                <!-- Default -->
                <span v-else class="text-gray-900">
                  {{ getValue(row, column.key) }}
                </span>
              </td>
              
              <!-- Actions Column -->
              <td v-if="showActions" class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div class="flex items-center justify-end space-x-2">
                  <button
                    v-for="action in actions"
                    :key="action.key"
                    :class="[
                      'inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded border focus:outline-none focus:ring-2 transition-colors',
                      action.variant === 'danger' 
                        ? 'text-red-700 bg-red-50 border-red-300 hover:bg-red-100 focus:ring-red-500'
                        : 'text-blue-700 bg-blue-50 border-blue-300 hover:bg-blue-100 focus:ring-blue-500'
                    ]"
                    @click.stop="handleAction(action, row, index)"
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
                  <svg class="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h3a2 2 0 012 2v1M9 7h6"></path>
                  </svg>
                  <p class="text-sm">{{ emptyMessage || 'No data available' }}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="showPagination && totalPages > 1" class="mt-4 flex items-center justify-between">
      <div class="flex items-center text-sm text-gray-700">
        <span>
          Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length }} results
        </span>
      </div>
      
      <div class="flex items-center space-x-2">
        <button
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
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
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>
        
        <button
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

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
  </div>
</template>

<script>
export default {
  name: 'MTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    title: String,
    subtitle: String,
    selectable: {
      type: Boolean,
      default: false
    },
    showSearch: {
      type: Boolean,
      default: true
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
    pageSize: {
      type: Number,
      default: 10
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
    }
  },
  
  emits: ['row-click', 'action-click', 'selection-change', 'sort', 'filter'],
  
  data() {
    return {
      searchQuery: '',
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      selectedRows: [],
      activeFilters: {}
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
      return this.columns.filter(col => col.visible !== false);
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
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(row => {
          return this.visibleColumns.some(col => {
            const value = this.getValue(row, col.key);
            return String(value).toLowerCase().includes(query);
          });
        });
      }
      
      // Apply filters
      if (this.hasActiveFilters) {
        result = result.filter(row => {
          return Object.entries(this.activeFilters).every(([key, value]) => {
            if (!value) return true;
            return this.getValue(row, key) === value;
          });
        });
      }
      
      // Apply sorting
      if (this.sortColumn) {
        result.sort((a, b) => {
          const aVal = this.getValue(a, this.sortColumn);
          const bVal = this.getValue(b, this.sortColumn);
          
          let comparison = 0;
          if (aVal < bVal) comparison = -1;
          if (aVal > bVal) comparison = 1;
          
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
      const rangeWithDots = [];
      
      for (let i = Math.max(2, this.currentPage - delta);
           i <= Math.min(this.totalPages - 1, this.currentPage + delta);
           i++) {
        range.push(i);
      }
      
      if (this.currentPage - delta > 2) {
        rangeWithDots.push(1, '...');
      } else {
        rangeWithDots.push(1);
      }
      
      rangeWithDots.push(...range);
      
      if (this.currentPage + delta < this.totalPages - 1) {
        rangeWithDots.push('...', this.totalPages);
      } else if (this.totalPages > 1) {
        rangeWithDots.push(this.totalPages);
      }
      
      return rangeWithDots.filter(page => page !== '...');
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
    data() {
      this.currentPage = 1;
      this.selectedRows = [];
    },
    
    selectedRows() {
      this.$emit('selection-change', this.selectedRows);
    }
  },
  
  methods: {
    getValue(row, key) {
      return key.split('.').reduce((obj, prop) => obj?.[prop], row);
    },
    
    getRowKey(row, index) {
      return this.getValue(row, this.rowKey) || index;
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
    
    handleRowClick(row, index) {
      if (this.rowClickable) {
        this.$emit('row-click', { row, index });
      }
    },
    
    handleAction(action, row, index) {
      this.$emit('action-click', { action: action.key, row, index });
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
      const csvContent = this.generateCSV();
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `table-export-${Date.now()}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    
    generateCSV() {
      const headers = this.visibleColumns.map(col => col.label);
      const rows = this.filteredData.map(row => 
        this.visibleColumns.map(col => {
          const value = this.getValue(row, col.key);
          return `"${String(value).replace(/"/g, '""')}"`;
        })
      );
      
      return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    },
    
    formatCurrency(value) {
      if (typeof value !== 'number') return value;
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    },
    
    formatDate(value, format = 'short') {
      if (!value) return '';
      const date = new Date(value);
      return new Intl.DateTimeFormat('en-US', {
        dateStyle: format
      }).format(date);
    },
    
    formatNumber(value) {
      if (typeof value !== 'number') return value;
      return value.toLocaleString();
    },
    
    getStatusClass(status) {
      const statusClasses = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        draft: 'bg-gray-100 text-gray-800'
      };
      
      return statusClasses[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
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
</style>