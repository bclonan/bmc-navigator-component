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
                    v-bind="{
                      row,
                      index,
                      columns,
                      column,
                      toggleRowSelection,
                      isRowSelected,
                      handleRowClick
                    }"
                  />
                  <!-- Default Cell Renderer -->
                  <template v-else>
                    <span v-if="row[column.key] !== null && row[column.key] !== undefined" class="block text-sm text-gray-900">
                      {{ row[column.key] }}
                    </span>
                    <span v-else class="block text-sm text-gray-500 italic">
                      &mdash;
                    </span>
                  </template>
                </td>
                
                <!-- Actions Column -->
                <td v-if="showActions" class="px-6 py-4 whitespace-nowrap text-sm text-right" role="cell">
                  <div class="flex justify-end gap-2">
                    <slot name="actions" :row="row" :index="index">
                      <!-- Default Actions (Secure) -->
                      <button
                        v-if="row.editable"
                        @click.stop="editRow(row, index)"
                        class="px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 focus:ring-2 focus:ring-blue-500"
                        :aria-label="`Edit row ${index + 1}`"
                      >
                        Edit
                      </button>
                      <button
                        v-if="row.deletable"
                        @click.stop="confirmDelete(row, index)"
                        class="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 focus:ring-2 focus:ring-red-500"
                        :aria-label="`Delete row ${index + 1}`"
                      >
                        Delete
                      </button>
                    </slot>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Table Footer -->
        <div v-if="showFooter" class="bg-white px-6 py-4 border-t border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <!-- Pagination -->
            <div v-if="pagination" class="flex items-center gap-2">
              <button
                @click="prevPage"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="currentPage === 1"
                aria-label="Previous page"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 18l-6-6 6-6"></path>
                </svg>
              </button>
              
              <span class="text-sm text-gray-500">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              
              <button
                @click="nextPage"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="currentPage === totalPages || totalPages === 0"
                aria-label="Next page"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 6l6 6-6 6"></path>
                </svg>
              </button>
            </div>
            
            <!-- Row Count -->
            <div v-if="showRowCount" class="text-sm text-gray-500">
              <span>Rows per page:</span>
              <select
                v-model="pageSize"
                class="ml-2 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                @change="changePageSize"
              >
                <option v-for="size in pageSizeOptions" :key="size" :value="size">
                  {{ size }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref, computed, watch, nextTick } from 'vue';

export default {
  name: 'MTable',
  props: {
    title: String,
    subtitle: String,
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    pageSizeOptions: {
      type: Array,
      default: () => [10, 25, 50, 100]
    },
    pagination: {
      type: Boolean,
      default: true
    },
    sortable: {
      type: Boolean,
      default: true
    },
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
      default: true
    },
    showColumnToggle: {
      type: Boolean,
      default: true
    },
    showExport: {
      type: Boolean,
      default: false
    },
    rowClickable: {
      type: Boolean,
      default: true
    },
    stickyHeader: {
      type: Boolean,
      default: false
    },
    tableAriaLabel: {
      type: String,
      default: 'Data table'
    },
    searchPlaceholder: {
      type: String,
      default: 'Search...'
    },
    searchAriaLabel: {
      type: String,
      default: 'Search table'
    },
    selectAllAriaLabel: {
      type: String,
      default: 'Select all rows'
    }
  },
  setup(props, { emit }) {
    const searchQuery = ref('');
    const currentPage = ref(1);
    const pageSize = ref(props.pageSizeOptions[0]);
    const sortColumn = ref('');
    const sortDirection = ref('asc');
    const showColumnMenu = ref(false);
    const activeFilters = ref({});
    const columnVisibility = ref({});
    const selectedRows = ref(new Set());
    
    // Computed properties
    const filteredData = computed(() => {
      return props.data.filter(row => {
        return Object.keys(activeFilters.value).every(key => {
          if (!activeFilters.value[key]) return true;
          return row[key] === activeFilters.value[key];
        });
      });
    });
    
    const sortedData = computed(() => {
      const data = [...filteredData.value];
      if (sortColumn.value) {
        data.sort((a, b) => {
          const modifier = sortDirection.value === 'asc' ? 1 : -1;
          if (a[sortColumn.value] < b[sortColumn.value]) return -1 * modifier;
          if (a[sortColumn.value] > b[sortColumn.value]) return 1 * modifier;
          return 0;
        });
      }
      return data;
    });
    
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return sortedData.value.slice(start, end);
    });
    
    const totalPages = computed(() => {
      return Math.ceil(filteredData.value.length / pageSize.value);
    });
    
    const isAllSelected = computed(() => {
      return paginatedData.value.length > 0 && paginatedData.value.every(row => selectedRows.value.has(getRowKey(row)));
    });
    
    const isIndeterminate = computed(() => {
      return paginatedData.value.length > 0 && paginatedData.value.some(row => selectedRows.value.has(getRowKey(row))) && !isAllSelected.value;
    });
    
    const visibleColumns = computed(() => {
      return props.columns.filter(column => columnVisibility.value[column.key] !== false);
    });
    
    const hasActiveFilters = computed(() => {
      return Object.values(activeFilters.value).some(value => value !== '' && value !== null);
    });
    
    // Methods
    const debounceSearch = () => {
      // Implement debounce logic for search
    };
    
    const handleSort = (key) => {
      if (!props.sortable) return;
      if (sortColumn.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortColumn.value = key;
        sortDirection.value = 'asc';
      }
      emit('update:sort', { column: key, direction: sortDirection.value });
    };
    
    const toggleSelectAll = () => {
      if (isAllSelected.value) {
        paginatedData.value.forEach(row => selectedRows.value.delete(getRowKey(row)));
      } else {
        paginatedData.value.forEach(row => selectedRows.value.add(getRowKey(row)));
      }
    };
    
    const toggleRowSelection = (row) => {
      const key = getRowKey(row);
      if (selectedRows.value.has(key)) {
        selectedRows.value.delete(key);
      } else {
        selectedRows.value.add(key);
      }
    };
    
    const clearFilters = () => {
      activeFilters.value = {};
    };
    
    const applyFilters = () => {
      // Implement filter logic
    };
    
    const changePageSize = () => {
      currentPage.value = 1;
    };
    
    const exportData = () => {
      // Implement export logic
    };
    
    const editRow = (row, index) => {
      emit('edit-row', { row, index });
    };
    
    const confirmDelete = (row, index) => {
      emit('confirm-delete', { row, index });
    };
    
    const handleRowClick = (row, index) => {
      if (props.rowClickable) {
        emit('row-click', { row, index });
      }
    };
    
    const getRowKey = (row, index) => {
      return row.id || index;
    };
    
    // Watchers
    watch(() => props.data, (newData) => {
      selectedRows.value.clear();
      currentPage.value = 1;
    });
    
    watch(() => props.columns, (newColumns) => {
      newColumns.forEach(column => {
        if (columnVisibility.value[column.key] === undefined) {
          columnVisibility.value[column.key] = true;
        }
      });
    }, { immediate: true });
    
    return {
      searchQuery,
      currentPage,
      pageSize,
      sortColumn,
      sortDirection,
      showColumnMenu,
      activeFilters,
      columnVisibility,
      selectedRows,
      filteredData,
      sortedData,
      paginatedData,
      totalPages,
      isAllSelected,
      isIndeterminate,
      visibleColumns,
      hasActiveFilters,
      debounceSearch,
      handleSort,
      toggleSelectAll,
      toggleRowSelection,
      clearFilters,
      applyFilters,
      changePageSize,
      exportData,
      editRow,
      confirmDelete,
      handleRowClick,
      getRowKey
    };
  }
};
</script>

<style scoped>
.m-table {
  max-width: 100%;
  overflow-x: auto;
}

.table-header {
  background-color: #f9fafb;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.table-header h3 {
  margin: 0;
}

.table-header p {
  margin: 0;
}

.table-header .flex {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.table-header .gap-4 {
  gap: 1rem;
}

.table-header .relative {
  position: relative;
}

.table-header .absolute {
  position: absolute;
}

.table-header .z-10 {
  z-index: 10;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width:  1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.table-header .text-sm {
  font-size: 0.875rem;
}

.table-header .text-xs {
  font-size: 0.75rem;
}

.table-header .font-medium {
  font-weight: 500;
}

.table-header .font-semibold {
  font-weight: 600;
}

.table-header .text-gray-500 {
  color: #6b7280;
}

.table-header .text-gray-600 {
  color: #4b5563;
}

.table-header .text-gray-700 {
  color: #374151;
}

.table-header .text-gray-900 {
  color: #111827;
}

.table-header .bg-white {
  background-color: #ffffff;
}

.table-header .border {
  border-width: 1px;
}

.table-header .border-gray-200 {
  border-color: #e5e7eb;
}

.table-header .border-gray-300 {
  border-color: #d1d5db;
}

.table-header .rounded-lg {
  border-radius: 0.5rem;
}

.table-header .rounded-full {
  border-radius: 9999px;
}

.table-header .shadow {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.table-header .ring-1 {
  ring-width: 1px;
}

.table-header .ring-black {
  ring-color: #000000;
}

.table-header .ring-opacity-5 {
  --tw-ring-opacity: 0.05;
  ring-opacity: var(--tw-ring-opacity);
}

.table-header .overflow-hidden {
  overflow: hidden;
}

.table-header .overflow-x-auto {
  overflow-x: auto;
}

.table-header .whitespace-nowrap {
  white-space: nowrap;
}

.table-header .transition-colors {
  transition: background-color 0.2s;
}

.table-header .disabled\:opacity-50:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.table-header .disabled\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.table-header .animate-pulse {
  animation: pulse 1.5s infinite;
}

.table-header .bg-gray-200 {
  background-color: #e5e7eb;
}

.table-header .rounded {
  border-radius: 0.375rem;
}

.table-header .shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.table-header .hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}

.table-header .cursor-pointer {
  cursor: pointer;
}

.table-header .select-none {
  user-select: none;
}

.table-header .transition-transform {
  transition: transform 0.2s;
}

.table-header .rotate-180 {
  transform: rotate(180deg);
}

.table-header .sr-only {
  position: absolute;
  width: 1px;
  height: