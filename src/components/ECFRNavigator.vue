<template>
  <div 
    class="ecfr-navigator" 
    :class="[options.theme === 'dark' ? 'dark-theme bg-gray-900' : 'light-theme bg-white']"
  >
    <!-- Breadcrumb navigation -->
    <ECFRBreadcrumb 
      v-if="options.showBreadcrumb" 
      :path="breadcrumbPath"
      :dark-mode="options.theme === 'dark'"
      :options="mergedOptions.breadcrumb || {}"
    />

    <!-- Control bar -->
    <div 
      class="flex flex-col sm:flex-row justify-between items-center p-2 border-b space-y-2 sm:space-y-0"
      :class="[options.theme === 'dark' ? 'border-gray-700' : 'border-gray-200']"
    >
      <div class="flex flex-wrap mb-2 sm:mb-0 items-center">
        <!-- Expand/Collapse buttons -->
        <div class="flex mr-4">
          <button
            class="px-3 py-1 text-sm rounded mr-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
            :class="[
              options.theme === 'dark' 
                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
            ]"
            @click="expandAll"
          >
            Expand All
          </button>
          
          <button
            class="px-3 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
            :class="[
              options.theme === 'dark' 
                ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
            ]"
            @click="collapseAll"
          >
            Collapse All
          </button>
        </div>
        
        <!-- View Mode Selector -->
        <div class="flex items-center mr-2">
          <label 
            for="viewMode" 
            class="sr-only">View Mode</label>
          <div class="inline-flex items-center">
            <span 
              class="text-xs mr-2"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >View:</span>
            <select
              id="viewMode"
              v-model="currentViewMode"
              @change="changeViewMode"
              class="text-sm py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-800 text-gray-200 border-gray-700 focus:ring-gray-500' 
                  : 'bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-300'
              ]"
            >
              <option value="compact">Compact</option>
              <option value="standard">Standard</option>
              <option value="detailed">Detailed</option>
              <option value="styleless">Styleless</option>
            </select>
          </div>
        </div>
        
        <!-- Spacing Selector -->
        <div class="flex items-center mr-2">
          <label 
            for="itemSpacing" 
            class="sr-only">Item Spacing</label>
          <div class="inline-flex items-center">
            <span 
              class="text-xs mr-2"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >Spacing:</span>
            <select
              id="itemSpacing"
              v-model="currentItemSpacing"
              @change="changeItemSpacing"
              class="text-sm py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-800 text-gray-200 border-gray-700 focus:ring-gray-500' 
                  : 'bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-300'
              ]"
            >
              <option value="tight">Tight</option>
              <option value="medium">Medium</option>
              <option value="loose">Loose</option>
            </select>
          </div>
        </div>
        
        <!-- Font Size Selector -->
        <div class="flex items-center mr-2">
          <label 
            for="fontSize" 
            class="sr-only">Font Size</label>
          <div class="inline-flex items-center">
            <span 
              class="text-xs mr-2"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >Font:</span>
            <select
              id="fontSize"
              v-model="currentFontSize"
              @change="changeFontSize"
              class="text-sm py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-800 text-gray-200 border-gray-700 focus:ring-gray-500' 
                  : 'bg-gray-100 text-gray-700 border-gray-300 focus:ring-gray-300'
              ]"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="adaptive">Adaptive</option>
            </select>
          </div>
        </div>
        
        <!-- Metadata Toggle -->
        <div class="flex items-center">
          <div class="inline-flex items-center">
            <span 
              class="text-xs mr-2"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >Metadata:</span>
            <button
              @click="toggleMetadataBadges"
              class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none"
              :class="[
                showMetadataBadges 
                  ? (options.theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500') 
                  : (options.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300')
              ]"
            >
              <span
                class="inline-block h-3 w-3 rounded-full bg-white transform transition-transform"
                :class="showMetadataBadges ? 'translate-x-4' : 'translate-x-1'"
              ></span>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Search box -->
      <div class="w-full sm:w-auto relative max-w-full">
        <div class="flex items-center">
          <!-- Main search input -->
          <div class="relative flex-grow">
            <label for="ecfr-search" class="sr-only">Search document</label>
            <input
              id="ecfr-search"
              type="text"
              v-model="searchQuery"
              placeholder="Search..."
              aria-label="Search document"
              class="w-full sm:w-64 px-3 py-2 sm:py-1 pr-10 rounded-l text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-800 text-gray-200 border-gray-700' 
                  : 'bg-white text-gray-700 border border-gray-300'
              ]"
              @keyup.enter="performSearch"
              @keyup.esc="clearSearch"
              @input="onSearchInput"
            />
            <button
              aria-label="Search"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              @click="performSearch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          <!-- Advanced search toggle button -->
          <button
            class="flex-shrink-0 h-full px-2 py-2 sm:py-1 rounded-r text-sm"
            :class="[
              options.theme === 'dark' 
                ? (showAdvancedSearch ? 'bg-blue-700 text-blue-100' : 'bg-gray-700 text-gray-300 hover:bg-gray-600')
                : (showAdvancedSearch ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
            ]"
            @click="toggleAdvancedSearch"
            title="Advanced Search Options"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
        
        <!-- Advanced search panel -->
        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div 
            v-if="showAdvancedSearch" 
            class="absolute right-0 mt-1 p-3 rounded shadow-lg z-10 w-full sm:w-80 border max-w-full sm:max-w-md"
            :class="[
              options.theme === 'dark' 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            ]"
          >
          <h3 
            class="text-sm font-medium mb-2"
            :class="[options.theme === 'dark' ? 'text-gray-200' : 'text-gray-700']"
          >
            Advanced Filters
          </h3>
          
          <!-- Filter by type -->
          <div class="mb-2">
            <label 
              class="block text-xs font-medium mb-1"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >
              Item Type
            </label>
            <div class="flex flex-wrap gap-1">
              <button
                v-for="type in availableTypes"
                :key="type"
                @click="toggleTypeFilter(type)"
                class="text-xs px-2 py-0.5 rounded transition-colors duration-200"
                :class="[
                  selectedTypeFilters.includes(type)
                    ? (options.theme === 'dark' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800')
                    : (options.theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
                ]"
              >
                {{ type }}
              </button>
            </div>
          </div>
          
          <!-- Agency filter (when available) -->
          <div v-if="mergedOptions.filters && mergedOptions.filters.showAgencyFilter" class="mb-2">
            <label 
              class="block text-xs font-medium mb-1"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >
              Agency
            </label>
            <select
              v-model="selectedAgency"
              class="w-full text-xs px-2 py-1 rounded"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200 border-gray-600' 
                  : 'bg-white text-gray-700 border-gray-300'
              ]"
            >
              <option value="">All Agencies</option>
              <option v-for="agency in availableAgencies" :key="agency" :value="agency">
                {{ agency }}
              </option>
            </select>
          </div>
          
          <!-- Date range filter -->
          <div v-if="mergedOptions.filters && mergedOptions.filters.showDateFilter" class="mb-2">
            <label 
              class="block text-xs font-medium mb-1"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >
              Last Updated
            </label>
            <select
              v-model="selectedDateRange"
              class="w-full text-xs px-2 py-1 rounded"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200 border-gray-600' 
                  : 'bg-white text-gray-700 border-gray-300'
              ]"
            >
              <option value="">Any Time</option>
              <option value="today">Today</option>
              <option value="week">Past Week</option>
              <option value="month">Past Month</option>
              <option value="year">Past Year</option>
            </select>
          </div>
          
          <!-- Custom tags/keywords filter -->
          <div class="mb-3">
            <label 
              class="block text-xs font-medium mb-1"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
            >
              Keywords (separate with comma)
            </label>
            <input
              type="text"
              v-model="keywordFilter"
              placeholder="Enter keywords..."
              class="w-full text-xs px-2 py-1 rounded"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-700 text-gray-200 border-gray-600' 
                  : 'bg-white text-gray-700 border-gray-300'
              ]"
            />
          </div>
          
          <!-- Action buttons -->
          <div class="flex justify-between">
            <button
              @click="clearFilters"
              class="text-xs px-2 py-1 rounded transition-colors duration-200"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              ]"
            >
              Clear Filters
            </button>
            <button
              @click="applyFilters"
              class="text-xs px-2 py-1 rounded transition-colors duration-200"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-blue-700 text-white hover:bg-blue-600' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
            >
              Apply Filters
            </button>
          </div>
        </div>
        </transition>
      </div>
    </div>
    
    <!-- Search results -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform opacity-0 -translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-2"
    >
      <div 
        v-if="showSearchResults || (isLoading && searchQuery.trim())" 
        class="p-2 border-b"
        :class="[options.theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50']"
      >
        <!-- Loading state -->
        <div v-if="isLoading" class="flex justify-center items-center py-4">
          <div
            class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2"
            :class="[options.theme === 'dark' ? 'border-blue-400' : 'border-blue-600']"
          ></div>
          <div class="ml-2 text-sm" :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">
            Searching...
          </div>
        </div>
        
        <!-- Results when not loading -->
        <div v-else>
          <!-- Results header -->
          <div class="flex justify-between items-center mb-2">
            <div class="flex items-center">
              <div class="text-sm font-medium mr-2"
                :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-700']"
              >
                Found {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }}
              </div>
              
              <!-- Fuzzy search badge -->
              <div v-if="mergedOptions.fuzzySearch.enabled" 
                class="text-xs px-2 py-0.5 rounded-full"
                :class="[options.theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800']"
              >
                Fuzzy
              </div>
            </div>
            
            <div class="flex items-center">
              <!-- Fuzzy search toggle -->
              <div class="flex items-center mr-2">
                <label class="text-xs mr-1" :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">
                  Fuzzy:
                </label>
                <button
                  @click="toggleFuzzySearch"
                  class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none"
                  :class="[
                    mergedOptions.fuzzySearch.enabled 
                      ? (options.theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500') 
                      : (options.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300')
                  ]"
                >
                  <span
                    class="inline-block h-3 w-3 rounded-full bg-white transform transition-transform"
                    :class="mergedOptions.fuzzySearch.enabled ? 'translate-x-4' : 'translate-x-1'"
                  ></span>
                </button>
              </div>
              
              <!-- Clear button -->
              <button 
                class="text-sm text-blue-500 hover:text-blue-700"
                @click="clearSearch"
              >
                Clear
              </button>
            </div>
          </div>
          
          <!-- Search sensitivity slider when fuzzy is enabled -->
          <div v-if="mergedOptions.fuzzySearch.enabled" class="mb-2 px-1">
            <div class="flex justify-between items-center text-xs mb-1">
              <span :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">Exact</span>
              <span :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">Flexible</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="8" 
              step="1" 
              v-model="fuzzyThresholdStep" 
              @change="updateFuzzyThreshold"
              class="w-full h-1 rounded-lg appearance-none cursor-pointer"
              :class="[options.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300']"
            />
          </div>
          
          <!-- Results list -->
          <div class="max-h-40 overflow-y-auto">
            <div v-if="searchResults.length === 0" 
              class="text-center p-4 text-sm"
              :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-500']"
            >
              No matches found for "{{ searchQuery }}"
            </div>
            
            <div 
              v-for="result in searchResults" 
              :key="result.id" 
              class="p-2 mb-1 rounded cursor-pointer hover:bg-opacity-80 transition-colors duration-200 relative group"
              :class="[
                options.theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                  : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
              ]"
              @click="navigateToSearchResult(result)"
              @mouseenter="showTooltipForResult(result)"
              @mouseleave="hideTooltip"
            >
              <div class="font-medium">{{ formatSearchResultTitle(result) }}</div>
              <div 
                v-if="result.matchContext" 
                class="text-xs mt-1 truncate"
                :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
              >
                {{ result.matchContext }}
              </div>
              
              <!-- Preview tooltip -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-if="activeTooltipId === result.id && result.previewContent"
                  class="absolute z-10 px-4 py-3 rounded shadow-lg max-w-sm left-full ml-2 top-0"
                  :class="[
                    options.theme === 'dark' 
                      ? 'bg-gray-800 border border-gray-700 text-gray-300' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  ]"
                  style="min-width: 250px; width: 350px;"
                >
                  <div class="text-xs font-medium mb-1"
                    :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-500']"
                  >
                    {{ result.type }} {{ result.number }}
                  </div>
                  <div class="text-sm font-medium mb-2">{{ result.title }}</div>
                  <div class="text-xs mt-1 text-left max-h-32 overflow-y-auto"
                    :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
                  >
                    {{ result.previewContent }}
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Main content area -->
    <div 
      class="ecfr-content overflow-y-auto p-2"
      :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-800']"
    >
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
          :class="[options.theme === 'dark' ? 'border-blue-400' : 'border-blue-600']"
        ></div>
      </div>
      
      <div v-else-if="!rootItems.length" class="text-center py-12">
        <div 
          class="text-xl font-medium mb-2"
          :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-700']"
        >
          No data available
        </div>
        <div 
          class="text-sm"
          :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-500']"
        >
          Please provide eCFR data to display
        </div>
      </div>
      
      <div v-else>
        <ECFRSection
          v-for="(item, index) in rootItems"
          :key="item.id"
          :item="item"
          :index="index"
          :level="0"
          :dark-mode="options.theme === 'dark'"
          :options="mergedOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useECFRStore } from '../stores/ecfr';
import ECFRBreadcrumb from './ECFRBreadcrumb.vue';
import ECFRSection from './ECFRSection.vue';
import Fuse from 'fuse.js';

export default {
  name: 'ECFRNavigator',
  
  components: {
    ECFRBreadcrumb,
    ECFRSection
  },
  
  props: {
    /**
     * The items to display in the navigator
     */
    items: {
      type: Array,
      required: true
    },
    
    /**
     * Options for configuring the navigator
     */
    options: {
      type: Object,
      default: () => ({})
    },
    
    /**
     * Initial metadata for items, keyed by item ID
     * Example: { 'item-1': { xmlLink: { url: '...' } } }
     */
    itemMetadata: {
      type: Object,
      default: () => ({})
    },
    
    /**
     * ID of the item to initially select
     */
    initialSelectedItemId: {
      type: String,
      default: null
    }
  },
  
  emits: ['item-selected', 'path-changed', 'search-completed', 'update:options', 'metadata-changed'],
  
  data() {
    return {
      ecfrStore: useECFRStore(),
      isLoading: false,
      searchQuery: '',
      searchResults: [],
      showSearchResults: false,
      fuseInstance: null,
      searchData: [],
      fuzzyThresholdStep: 4, // Default middle value (0-8 range)
      currentViewMode: 'standard',
      currentItemSpacing: 'medium',
      currentFontSize: 'medium', // Font size setting
      showMetadataBadges: false,
      showAdvancedSearch: false,
      selectedTypeFilters: [],
      selectedAgency: '',
      selectedDateRange: '',
      keywordFilter: '',
      availableTypes: ['title', 'part', 'section', 'chapter', 'subpart'],
      availableAgencies: [],
      activeTooltipId: null, // For tracking which tooltip is currently shown
      tooltipTimeout: null, // For tooltip delay handling
      defaultOptions: {
        showBreadcrumb: true,
        expandAll: false,
        hideContentOnNavigation: false,
        theme: 'light',
        // Breadcrumb customization options
        breadcrumb: {
          rootLabel: 'Home',
          truncate: true,
          visibleItems: 2,
          maxVisible: 3,
          type: 'scrollable',
          style: 'standard',
          separatorType: 'icon',
          truncateLabels: true,
          highlightLast: true
        },
        fuzzySearch: {
          enabled: true,
          threshold: 0.4, // 0 is exact, 1 is very loose
          distance: 100
        },
        display: {
          showTypeIcon: true,
          showItemNumbers: true,
          indentItems: true,
          hideEmptyItems: false,
          viewMode: 'standard', // 'compact', 'standard', or 'detailed'
          showDescription: false, // Only relevant in detailed mode
          showMetadataBadges: false, // Show badges for items with metadata
          itemSpacing: 'medium', // 'tight', 'medium', 'loose'
          maxTitleLength: null, // Truncate titles longer than this
          animations: true, // Enable animations for better UX
          enhancedMobile: true, // Optimize for mobile devices
          fontScaling: {
            enabled: true, // Enable adaptive font sizing
            baseSize: 'medium', // 'small', 'medium', 'large'
            scaleWithWidth: true, // Scale font size with container width
            scaleWithViewMode: true, // Adjust font based on view mode (compact/detailed)
            minSize: '12px', // Minimum font size
            maxSize: '18px', // Maximum font size
            responsive: true // Use responsive breakpoints
          }
        },
        
        // Advanced search and filter options
        filters: {
          enabled: true,
          showTypeFilter: true,
          showAgencyFilter: true,
          showDateFilter: true, 
          showKeywordFilter: true,
          autoUpdateResults: true, // Update results as filters change
          persistFilters: true, // Remember filter selections
          agencies: [] // Agency options can be populated from data
        },
        pagination: {
          enabled: false,
          itemsPerPage: 20
        },
        navigation: {
          preserveState: true,
          scrollToSelected: true,
          autoExpandParents: true,
          autoCollapseOthers: false
        },
        printing: {
          enablePrintView: true,
          includeChildrenWhenPrinting: true
        }
      }
    };
  },
  
  computed: {
    /**
     * The merged options (default + user provided)
     */
    mergedOptions() {
      return { ...this.defaultOptions, ...this.options };
    },
    
    /**
     * The root items from the store
     */
    rootItems() {
      return this.ecfrStore.rootItems;
    },
    
    /**
     * The breadcrumb path from the store
     */
    breadcrumbPath() {
      return this.ecfrStore.breadcrumbPath;
    },
    
    /**
     * The current item from the store
     */
    currentItem() {
      return this.ecfrStore.currentItem;
    },
    
    /**
     * Check if there are any active filters
     * @returns {boolean} True if there are active filters
     */
    hasActiveFilters() {
      return (
        this.selectedTypeFilters.length > 0 ||
        this.selectedAgency !== '' ||
        this.selectedDateRange !== '' ||
        this.keywordFilter.trim() !== ''
      );
    }
  },
  
  watch: {
    /**
     * Watch for changes in the items prop
     */
    items: {
      handler(newItems) {
        if (newItems && newItems.length > 0) {
          this.ecfrStore.setRootItems(newItems);
          
          // If the expandAll option is true, expand all items
          if (this.mergedOptions.expandAll) {
            this.ecfrStore.expandAll();
          }
          
          // Build search index for fuzzy search
          this.buildSearchIndex(newItems);
        }
      },
      immediate: true
    },
    
    /**
     * Watch for changes in the current item
     */
    'ecfrStore.currentItem': {
      handler(newItem) {
        if (newItem) {
          // Get any metadata for this item
          const metadata = this.ecfrStore.getItemMetadata(newItem.id);
          const processedMetadata = metadata ? 
            this.ecfrStore.processItemMetadata(newItem.id) : null;
          
          this.$emit('item-selected', {
            item: newItem,
            path: this.ecfrStore.breadcrumbPath,
            metadata: metadata,
            processedMetadata: processedMetadata
          });
        }
      }
    },
    
    /**
     * Watch for changes in the breadcrumb path
     */
    'ecfrStore.breadcrumbPath': {
      handler(newPath) {
        this.$emit('path-changed', newPath);
      }
    },
    
    /**
     * Watch for changes in item metadata prop
     */
    itemMetadata: {
      handler(newMetadata) {
        // Import all metadata to the store
        if (newMetadata && typeof newMetadata === 'object') {
          Object.entries(newMetadata).forEach(([itemId, metadata]) => {
            this.ecfrStore.setItemMetadata(itemId, metadata);
          });
        }
      },
      deep: true
    },
    
    /**
     * Watch for initial selected item ID changes
     */
    initialSelectedItemId: {
      handler(newItemId) {
        if (newItemId) {
          this.$nextTick(() => {
            this.navigateTo(newItemId);
          });
        }
      }
    },
    
    /**
     * Watch for changes in options to sync the view mode state
     */
    options: {
      handler(newOptions) {
        if (newOptions.display) {
          // Sync view mode from options
          if (newOptions.display.viewMode) {
            this.currentViewMode = newOptions.display.viewMode;
          }
          
          // Sync item spacing from options
          if (newOptions.display.itemSpacing) {
            this.currentItemSpacing = newOptions.display.itemSpacing;
          }
          
          // Sync metadata badges from options
          if (newOptions.display.showMetadataBadges !== undefined) {
            this.showMetadataBadges = newOptions.display.showMetadataBadges;
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  
  mounted() {
    if (this.items && this.items.length > 0) {
      this.ecfrStore.setRootItems(this.items);
      
      // If the expandAll option is true, expand all items
      if (this.mergedOptions.expandAll) {
        this.ecfrStore.expandAll();
      }
      
      // Initialize any provided metadata
      if (this.itemMetadata && typeof this.itemMetadata === 'object') {
        Object.entries(this.itemMetadata).forEach(([itemId, metadata]) => {
          this.ecfrStore.setItemMetadata(itemId, metadata);
        });
      }
      
      // Navigate to initial item if provided
      if (this.initialSelectedItemId) {
        this.$nextTick(() => {
          this.navigateTo(this.initialSelectedItemId);
        });
      }
    }
  },
  
  methods: {
    /**
     * Expand all items
     */
    expandAll() {
      this.ecfrStore.expandAll();
    },
    
    /**
     * Collapse all items
     */
    collapseAll() {
      this.ecfrStore.collapseAll();
    },
    
    /**
     * Handle search input with debounce
     */
    onSearchInput() {
      // Auto-search after typing stops (debounce)
      clearTimeout(this._searchTimeout);
      this._searchTimeout = setTimeout(() => {
        // Only auto-search if query is at least 3 characters
        if (this.searchQuery.trim().length >= 3) {
          this.performSearch();
        } else if (this.searchQuery.trim().length === 0) {
          this.clearSearch();
        }
      }, 300); // 300ms debounce
    },
    
    /**
     * Build search index for fuzzy search
     */
    buildSearchIndex(items) {
      // Reset search data
      this.searchData = [];
      
      // Helper function to recursively process items and build flat search data
      const processItems = (items, parentPath = []) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentPath = [...parentPath, { item, index: i }];
          
          // Extract text content from HTML if present (strip tags)
          let contentText = '';
          if (item.content) {
            contentText = item.content.replace(/<[^>]*>/g, '');
          }
          
          // Add item to search data
          this.searchData.push({
            id: item.id,
            title: item.title || '',
            subtitle: item.subtitle || '',
            content: contentText,
            type: item.type || '',
            number: item.number || '',
            // Add additional fields for advanced filtering
            agency: item.agency || '',
            updatedDate: item.updatedDate || '',
            path: currentPath,
            item: item
          });
          
          // Process children recursively
          if (item.children && item.children.length > 0) {
            processItems(item.children, currentPath);
          }
        }
      };
      
      // Process items recursively
      processItems(items);
      
      // Populate available agencies from data
      this.availableAgencies = [...new Set(
        this.searchData
          .map(item => item.agency)
          .filter(Boolean)
      )].sort();
      
      // Configure Fuse.js options
      const fuseOptions = {
        shouldSort: true,
        includeScore: true,
        includeMatches: true,
        threshold: this.mergedOptions.fuzzySearch.threshold,
        location: 0,
        distance: this.mergedOptions.fuzzySearch.distance,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'subtitle', weight: 0.5 },
          { name: 'content', weight: 0.3 },
          { name: 'type', weight: 0.2 },
          { name: 'number', weight: 0.2 },
          // Add additional searchable fields to support filtering
          { name: 'agency', weight: 0.3 },
          { name: 'updatedDate', weight: 0.1 }
        ]
      };
      
      // Create Fuse instance
      this.fuseInstance = new Fuse(this.searchData, fuseOptions);
    },
    
    /**
     * Perform search across all items with fuzzy matching
     */
    performSearch() {
      const query = this.searchQuery.trim();
      
      if (!query && !this.hasActiveFilters) {
        this.clearSearch();
        return;
      }
      
      this.searchResults = [];
      this.isLoading = true;
      
      // Check if we should use fuzzy search
      if (this.mergedOptions.fuzzySearch.enabled && this.fuseInstance) {
        // Use Fuse.js for fuzzy search
        setTimeout(() => {
          // Search with a setTimeout to allow UI to update and show loading state
          let results = [];
          
          if (query) {
            // Get Fuse.js results if we have a query
            results = this.fuseInstance.search(query);
          } else if (this.hasActiveFilters) {
            // If we only have filters but no query, create "results" from all items
            results = this.searchData.map(item => ({
              item: item,
              matches: [],
              score: 1
            }));
          }
          
          // Apply filters to results if we have active filters
          if (this.hasActiveFilters) {
            results = results.filter(result => this.itemMatchesFilters(result.item.item));
          }
          
          // Process results
          this.searchResults = results.map(result => {
            const item = result.item.item;
            let matchContext = null;
            
            // Get the best match to highlight
            if (result.matches && result.matches.length > 0) {
              const bestMatch = result.matches[0];
              const matchValue = bestMatch.value || '';
              const matchKey = bestMatch.key;
              
              // Extract match context based on the matched field
              if (matchKey === 'title') {
                matchContext = `Title: ${matchValue}`;
              } else if (matchKey === 'subtitle') {
                matchContext = `Subtitle: ${matchValue}`;
              } else if (matchKey === 'content') {
                // Get context around the best match
                if (bestMatch.indices && bestMatch.indices.length > 0) {
                  const firstMatch = bestMatch.indices[0];
                  const matchStart = firstMatch[0];
                  const matchEnd = firstMatch[1] + 1;
                  
                  const startIndex = Math.max(0, matchStart - 50);
                  const endIndex = Math.min(matchValue.length, matchEnd + 50);
                  let context = matchValue.substring(startIndex, endIndex);
                  
                  // Add ellipsis if needed
                  if (startIndex > 0) {
                    context = '...' + context;
                  }
                  if (endIndex < matchValue.length) {
                    context = context + '...';
                  }
                  
                  matchContext = `Content: ${context}`;
                } else {
                  matchContext = `Content: ${matchValue.substring(0, 100)}...`;
                }
              } else {
                matchContext = `${matchKey.charAt(0).toUpperCase() + matchKey.slice(1)}: ${matchValue}`;
              }
            } else if (this.hasActiveFilters && query === '') {
              // For filter-only searches without query, provide filter context
              matchContext = `Matched filters: ${this.getActiveFiltersAsText()}`;
            }
            
            // Generate preview content from content field or match context
            let previewContent = '';
            
            // If we have a content match, use a larger portion of it for the preview
            if (matchContext && matchContext.startsWith('Content:')) {
              // Extract a larger context for preview from the content field
              if (result.matches && result.matches.length) {
                const contentMatch = result.matches.find(m => m.key === 'content');
                if (contentMatch && contentMatch.value) {
                  const matchValue = contentMatch.value;
                  const indices = contentMatch.indices[0];
                  
                  // Get a larger section for preview (200 chars before + 200 chars after)
                  const startIndex = Math.max(0, indices[0] - 200);
                  const endIndex = Math.min(matchValue.length, indices[1] + 200);
                  previewContent = matchValue.substring(startIndex, endIndex);
                  
                  // Add ellipsis if needed
                  if (startIndex > 0) previewContent = '...' + previewContent;
                  if (endIndex < matchValue.length) previewContent += '...';
                }
              }
            }
            
            // If no preview content yet, try to get it from the item
            if (!previewContent) {
              if (item.content) {
                // Truncate if needed
                previewContent = item.content.length > 400 ? 
                  item.content.substring(0, 400) + '...' : 
                  item.content;
              } else if (item.description) {
                previewContent = item.description;
              }
            }
            
            return {
              ...item,
              matchContext,
              previewContent,
              path: result.item.path,
              score: result.score,
              // Additional metadata fields for filtering
              agency: item.agency,
              updatedDate: item.updatedDate
            };
          });
          
          // Sort by score (lower is better)
          this.searchResults.sort((a, b) => (a.score || 1) - (b.score || 1));
          
          // Show results and hide loading indicator
          this.showSearchResults = this.searchResults.length > 0;
          this.isLoading = false;
          
          // If no results, but we searched something, still show the results container
          if (this.searchResults.length === 0 && (query || this.hasActiveFilters)) {
            this.showSearchResults = true;
          }
          
          // Emit search event with filter information
          this.$emit('search-completed', {
            query,
            filters: this.getActiveFilters(),
            resultsCount: this.searchResults.length,
            results: this.searchResults,
            fuzzy: true
          });
        }, 10);
        
        return;
      }
      
      // Fallback to regular search if fuzzy search is disabled or not available
      const searchQuery = query.toLowerCase();
      
      // Helper function to search recursively through items
      const searchInItems = (items, parentPath = []) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentPath = [...parentPath, { item, index: i }];
          
          // Check if item matches search query
          let matchFound = false;
          let matchContext = null;
          
          // Search in title
          if (item.title && item.title.toLowerCase().includes(searchQuery)) {
            matchFound = true;
            matchContext = `Title: ${item.title}`;
          }
          
          // Search in subtitle
          if (!matchFound && item.subtitle && item.subtitle.toLowerCase().includes(searchQuery)) {
            matchFound = true;
            matchContext = `Subtitle: ${item.subtitle}`;
          }
          
          // Search in content (strip HTML tags for searching)
          if (!matchFound && item.content) {
            const contentText = item.content.replace(/<[^>]*>/g, '').toLowerCase();
            if (contentText.includes(searchQuery)) {
              matchFound = true;
              
              // Get context around the match (50 chars before and after)
              const matchIndex = contentText.indexOf(searchQuery);
              const startIndex = Math.max(0, matchIndex - 50);
              const endIndex = Math.min(contentText.length, matchIndex + searchQuery.length + 50);
              let context = contentText.substring(startIndex, endIndex);
              
              // Add ellipsis if needed
              if (startIndex > 0) {
                context = '...' + context;
              }
              if (endIndex < contentText.length) {
                context = context + '...';
              }
              
              matchContext = `Content: ${context}`;
            }
          }
          
          // Add to search results if match found
          if (matchFound) {
            this.searchResults.push({
              ...item,
              matchContext,
              path: currentPath
            });
          }
          
          // Search in children recursively
          if (item.children && item.children.length > 0) {
            searchInItems(item.children, currentPath);
          }
        }
      };
      
      // Start recursive search
      searchInItems(this.rootItems);
      
      // Show search results and hide loading indicator
      this.showSearchResults = this.searchResults.length > 0;
      this.isLoading = false;
      
      // If no results, but we searched something, still show the results container
      if (this.searchResults.length === 0 && query) {
        this.showSearchResults = true;
      }
      
      // Emit search event
      this.$emit('search-completed', {
        query,
        results: this.searchResults.length
      });
    },
    
    /**
     * Clear search results
     */
    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
      this.showSearchResults = false;
    },
    
    /**
     * Navigate to a search result
     */
    navigateToSearchResult(result) {
      if (result.path) {
        // Navigate to the result
        this.ecfrStore.navigateToPath(result.path);
        
        // Expand parents to ensure visibility
        result.path.forEach(pathItem => {
          if (pathItem.item.id) {
            this.ecfrStore.expandItem(pathItem.item.id);
          }
        });
        
        // Clear search after navigation
        this.clearSearch();
      }
    },
    
    /**
     * Format search result title
     */
    formatSearchResultTitle(result) {
      if (result.type && result.number) {
        return `${result.type.charAt(0).toUpperCase() + result.type.slice(1)} ${result.number}: ${result.title}`;
      }
      return result.title;
    },
    
    /**
     * Toggle fuzzy search on/off
     */
    toggleFuzzySearch() {
      // Create a new options object to avoid directly mutating props
      const newOptions = JSON.parse(JSON.stringify(this.mergedOptions));
      newOptions.fuzzySearch.enabled = !newOptions.fuzzySearch.enabled;
      
      // Update local options and rebuild the index
      this.$emit('update:options', newOptions);
      
      // Force a local update since the emit won't automatically update our merged options
      this.defaultOptions.fuzzySearch.enabled = newOptions.fuzzySearch.enabled;
      
      // Rebuild the search index with the new settings
      if (this.rootItems && this.rootItems.length > 0) {
        this.buildSearchIndex(this.rootItems);
      }
      
      // Re-run the search with the new settings
      if (this.searchQuery.trim()) {
        this.performSearch();
      }
    },
    
    /**
     * Update fuzzy search threshold based on slider position
     */
    updateFuzzyThreshold() {
      // Convert the step (0-8) to a threshold (0.1-0.9)
      // Lower threshold = more exact matches, higher = more fuzzy matches
      const newThreshold = (this.fuzzyThresholdStep / 10) + 0.1;
      
      // Create a new options object to avoid directly mutating props
      const newOptions = JSON.parse(JSON.stringify(this.mergedOptions));
      newOptions.fuzzySearch.threshold = newThreshold;
      
      // Update local options
      this.$emit('update:options', newOptions);
      
      // Force a local update since the emit won't automatically update our merged options
      this.defaultOptions.fuzzySearch.threshold = newThreshold;
      
      // Rebuild the search index with the new threshold
      if (this.rootItems && this.rootItems.length > 0) {
        this.buildSearchIndex(this.rootItems);
      }
      
      // Re-run the search with the new threshold
      if (this.searchQuery.trim()) {
        this.performSearch();
      }
    },
    
    /**
     * Add metadata to an item
     * @param {string} itemId - ID of the item to attach metadata to
     * @param {Object} metadata - Metadata object to attach
     * @param {string} [metadataType] - Optional type identifier if adding a specific type
     */
    addMetadata(itemId, metadata, metadataType) {
      this.ecfrStore.setItemMetadata(itemId, metadata, metadataType);
      
      // Emit event with metadata info
      this.$emit('metadata-changed', {
        action: 'add',
        itemId,
        metadataType: metadataType || 'all',
        metadata
      });
      
      // If this is for the current item, update the item-selected event
      if (this.ecfrStore.currentItem && this.ecfrStore.currentItem.id === itemId) {
        const processedMetadata = this.ecfrStore.processItemMetadata(itemId);
        
        this.$emit('item-selected', {
          item: this.ecfrStore.currentItem,
          path: this.ecfrStore.breadcrumbPath,
          metadata: this.ecfrStore.getItemMetadata(itemId),
          processedMetadata
        });
      }
    },
    
    /**
     * Remove metadata from an item
     * @param {string} itemId - ID of the item to remove metadata from
     * @param {string} [metadataType] - Optional type of metadata to remove (if not specified, removes all)
     */
    removeMetadata(itemId, metadataType) {
      // Store a copy of the metadata before removal for the event
      const oldMetadata = this.ecfrStore.getItemMetadata(itemId, metadataType);
      
      this.ecfrStore.removeItemMetadata(itemId, metadataType);
      
      // Emit event with removed metadata info
      this.$emit('metadata-changed', {
        action: 'remove',
        itemId,
        metadataType: metadataType || 'all',
        oldMetadata
      });
      
      // If this is for the current item, update the item-selected event
      if (this.ecfrStore.currentItem && this.ecfrStore.currentItem.id === itemId) {
        const metadata = this.ecfrStore.getItemMetadata(itemId);
        const processedMetadata = metadata ? 
          this.ecfrStore.processItemMetadata(itemId) : null;
        
        this.$emit('item-selected', {
          item: this.ecfrStore.currentItem,
          path: this.ecfrStore.breadcrumbPath,
          metadata: metadata,
          processedMetadata: processedMetadata
        });
      }
    },
    
    /**
     * Register a metadata processor function
     * @param {string} metadataType - Type identifier for the metadata
     * @param {Function} processorFn - Function to process this type of metadata
     */
    registerMetadataProcessor(metadataType, processorFn) {
      this.ecfrStore.registerMetadataProcessor(metadataType, processorFn);
    },
    
    /**
     * Remove a metadata processor
     * @param {string} metadataType - Type identifier for the metadata processor to remove
     */
    unregisterMetadataProcessor(metadataType) {
      this.ecfrStore.unregisterMetadataProcessor(metadataType);
    },
    
    /**
     * Get metadata for a specific item
     * @param {string} itemId - ID of the item
     * @param {string} [metadataType] - Optional specific metadata type to retrieve
     * @returns {Object|null} The metadata or null if not found
     */
    getMetadata(itemId, metadataType) {
      return this.ecfrStore.getItemMetadata(itemId, metadataType);
    },
    
    /**
     * Process metadata for an item with registered processors
     * @param {string} itemId - ID of the item
     * @param {string} [metadataType] - Optional specific metadata type to process
     * @returns {Object|null} The processed metadata or null
     */
    processMetadata(itemId, metadataType) {
      return this.ecfrStore.processItemMetadata(itemId, metadataType);
    },
    
    /**
     * Change the view mode
     * @param {Event} event - Change event
     */
    changeViewMode() {
      // Create a new options object
      const newOptions = JSON.parse(JSON.stringify(this.mergedOptions));
      newOptions.display.viewMode = this.currentViewMode;
      
      // If in detailed mode, enable metadata badges and content preview by default
      if (this.currentViewMode === 'detailed') {
        newOptions.display.showDescription = true;
        newOptions.display.showMetadataBadges = true;
      } else if (this.currentViewMode === 'compact') {
        // In compact mode, disable details for better density
        newOptions.display.showDescription = false;
        newOptions.display.showMetadataBadges = false;
      } else {
        // Standard mode - default settings
        newOptions.display.showDescription = false;
        // Keep metadata badges as is
      }
      
      // Update local options
      this.$emit('update:options', newOptions);
      
      // Force a local update
      this.defaultOptions.display.viewMode = this.currentViewMode;
      this.defaultOptions.display.showDescription = newOptions.display.showDescription;
      this.defaultOptions.display.showMetadataBadges = newOptions.display.showMetadataBadges;
    },
    
    /**
     * Change the item spacing
     * @param {Event} event - Change event
     */
    changeItemSpacing() {
      // Create a new options object
      const newOptions = JSON.parse(JSON.stringify(this.mergedOptions));
      newOptions.display.itemSpacing = this.currentItemSpacing;
      
      // Update local options
      this.$emit('update:options', newOptions);
      
      // Force a local update
      this.defaultOptions.display.itemSpacing = this.currentItemSpacing;
    },
    
    /**
     * Toggle metadata badges display
     */
    toggleMetadataBadges() {
      this.showMetadataBadges = !this.showMetadataBadges;
      
      // Create a new options object
      const newOptions = JSON.parse(JSON.stringify(this.mergedOptions));
      newOptions.display.showMetadataBadges = this.showMetadataBadges;
      
      // Update local options
      this.$emit('update:options', newOptions);
      
      // Force a local update
      this.defaultOptions.display.showMetadataBadges = this.showMetadataBadges;
    },
    
    /**
     * Toggle advanced search panel
     */
    toggleAdvancedSearch() {
      this.showAdvancedSearch = !this.showAdvancedSearch;
    },
    
    /**
     * Toggle a type filter
     * @param {string} type - The type to toggle
     */
    toggleTypeFilter(type) {
      if (this.selectedTypeFilters.includes(type)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter(t => t !== type);
      } else {
        this.selectedTypeFilters.push(type);
      }
      
      // Auto-update results if configured
      if (this.mergedOptions.filters.autoUpdateResults) {
        this.applyFilters();
      }
    },
    
    /**
     * Clear all filters
     */
    clearFilters() {
      this.selectedTypeFilters = [];
      this.selectedAgency = '';
      this.selectedDateRange = '';
      this.keywordFilter = '';
      
      // Reset search results to unfiltered state
      if (this.searchQuery.trim()) {
        this.performSearch();
      }
    },
    
    /**
     * Apply filters to search results
     */
    applyFilters() {
      if (!this.searchQuery.trim() && !this.hasActiveFilters) {
        return; // Nothing to filter
      }
      
      if (this.searchQuery.trim()) {
        // If we have a search query, re-run search with filters
        this.performSearch();
      } else {
        // Otherwise, filter the root items directly
        this.filterRootItems();
      }
      
      // Close the advanced search panel after applying filters
      this.showAdvancedSearch = false;
    },
    
    /**
     * Filter root items directly (when no search query)
     */
    filterRootItems() {
      const filteredResults = [];
      
      // Helper function to recursively collect matching items
      const collectMatchingItems = (items) => {
        for (const item of items) {
          if (this.itemMatchesFilters(item)) {
            filteredResults.push(this.prepareSearchResult(item, null));
          }
          
          if (item.children && item.children.length > 0) {
            collectMatchingItems(item.children);
          }
        }
      };
      
      // Start collecting from root items
      collectMatchingItems(this.rootItems);
      
      // Update search results
      this.searchResults = filteredResults;
      this.showSearchResults = filteredResults.length > 0;
      
      // Emit search completed event
      this.$emit('search-completed', {
        query: '',
        filters: this.getActiveFilters(),
        resultsCount: filteredResults.length
      });
    },
    
    /**
     * Check if an item matches the active filters
     * @param {Object} item - The item to check
     * @returns {boolean} True if the item matches all active filters
     */
    itemMatchesFilters(item) {
      // Type filter
      if (this.selectedTypeFilters.length > 0 && !this.selectedTypeFilters.includes(item.type)) {
        return false;
      }
      
      // Agency filter
      if (this.selectedAgency && item.agency !== this.selectedAgency) {
        return false;
      }
      
      // Date range filter
      if (this.selectedDateRange && item.updatedDate) {
        const itemDate = new Date(item.updatedDate);
        const now = new Date();
        
        let cutoffDate = null;
        if (this.selectedDateRange === 'today') {
          cutoffDate = new Date(now.setHours(0, 0, 0, 0));
        } else if (this.selectedDateRange === 'week') {
          cutoffDate = new Date(now.setDate(now.getDate() - 7));
        } else if (this.selectedDateRange === 'month') {
          cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
        } else if (this.selectedDateRange === 'year') {
          cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
        }
        
        if (cutoffDate && itemDate < cutoffDate) {
          return false;
        }
      }
      
      // Keyword filter
      if (this.keywordFilter.trim()) {
        const keywords = this.keywordFilter.split(',').map(k => k.trim().toLowerCase()).filter(Boolean);
        
        if (keywords.length > 0) {
          // Check if any keyword matches
          const itemText = [
            item.title,
            item.subtitle,
            item.content,
            item.type,
            item.number,
            item.agency
          ].filter(Boolean).join(' ').toLowerCase();
          
          const keywordMatches = keywords.some(keyword => itemText.includes(keyword));
          if (!keywordMatches) {
            return false;
          }
        }
      }
      
      return true;
    },
    
    /**
     * Get object describing active filters
     * @returns {Object} Active filters
     */
    getActiveFilters() {
      return {
        types: [...this.selectedTypeFilters],
        agency: this.selectedAgency,
        dateRange: this.selectedDateRange,
        keywords: this.keywordFilter.split(',').map(k => k.trim()).filter(Boolean)
      };
    },
    
    /**
     * Get a text description of active filters
     * @returns {string} Human-readable description of active filters
     */
    getActiveFiltersAsText() {
      const parts = [];
      
      if (this.selectedTypeFilters.length > 0) {
        parts.push(`Types: ${this.selectedTypeFilters.join(', ')}`);
      }
      
      if (this.selectedAgency) {
        parts.push(`Agency: ${this.selectedAgency}`);
      }
      
      if (this.selectedDateRange) {
        const rangeMap = {
          'today': 'Today',
          'week': 'Past Week',
          'month': 'Past Month',
          'year': 'Past Year'
        };
        parts.push(`Date: ${rangeMap[this.selectedDateRange] || this.selectedDateRange}`);
      }
      
      const keywords = this.keywordFilter.split(',').map(k => k.trim()).filter(Boolean);
      if (keywords.length > 0) {
        parts.push(`Keywords: ${keywords.join(', ')}`);
      }
      
      return parts.join('; ');
    },
    
    /**
     * Show tooltip for a specific search result
     * @param {Object} result - The search result to show tooltip for
     */
    showTooltipForResult(result) {
      // Clear any existing timeout
      if (this.tooltipTimeout) {
        clearTimeout(this.tooltipTimeout);
      }
      
      // Set small delay before showing tooltip to avoid flickering
      this.tooltipTimeout = setTimeout(() => {
        // Get or generate preview content if not already available
        if (!result.previewContent) {
          result.previewContent = this.generatePreviewContent(result);
        }
        
        // Only show tooltip if content is available
        if (result.previewContent) {
          this.activeTooltipId = result.id;
        }
      }, 300); // 300ms delay for a smooth experience
    },
    
    /**
     * Hide the active tooltip
     */
    hideTooltip() {
      // Clear any pending tooltip timeout
      if (this.tooltipTimeout) {
        clearTimeout(this.tooltipTimeout);
      }
      
      // Add small delay before hiding to prevent accidental hiding
      this.tooltipTimeout = setTimeout(() => {
        this.activeTooltipId = null;
      }, 100);
    },
    
    /**
     * Generate preview content for search result
     * @param {Object} result - The search result to generate preview for
     * @returns {string} Preview content
     */
    generatePreviewContent(result) {
      let previewContent = '';
      
      // Check if we have a content field in the result or its original item
      if (result.content) {
        previewContent = result.content;
      } else if (result.item && result.item.content) {
        previewContent = result.item.content;
      } else {
        // Try to find content via metadata
        const metadata = this.ecfrStore.getItemMetadata(result.id);
        if (metadata && metadata.content) {
          previewContent = metadata.content;
        } else if (metadata && metadata.description) {
          previewContent = metadata.description;
        }
      }
      
      // If we have content, truncate it to a reasonable preview size
      if (previewContent) {
        // Strip HTML tags if present
        previewContent = previewContent.replace(/<[^>]*>/g, ' ');
        
        // Truncate to 300 characters if longer
        if (previewContent.length > 300) {
          // Try to cut at word boundary
          const truncated = previewContent.substring(0, 300);
          const lastSpace = truncated.lastIndexOf(' ');
          if (lastSpace > 250) { // Only use word boundary if it's reasonably close to the end
            previewContent = truncated.substring(0, lastSpace) + '...';
          } else {
            previewContent = truncated + '...';
          }
        }
        
        return previewContent;
      }
      
      // Fallback message if no content available
      return 'Hover for preview (Content preview is not available for this item)';
    },
    
    /**
     * Prepare an item for display in search results
     * @param {Object} item - The item to prepare
     * @param {Object} match - Fuse.js match information
     * @returns {Object} Prepared search result object
     */
    prepareSearchResult(item, match) {
      let matchContext = '';
      let previewContent = '';
      
      // Extract match context from Fuse.js result
      if (match && match.matches && match.matches.length > 0) {
        // Get the first matching field with the highest score
        const bestMatch = match.matches.sort((a, b) => b.score - a.score)[0];
        const value = bestMatch.value || '';
        
        // Get a snippet of text around the match
        const indices = bestMatch.indices[0];
        const startIdx = Math.max(0, indices[0] - 20);
        const endIdx = Math.min(value.length, indices[1] + 20);
        matchContext = value.substring(startIdx, endIdx);
        
        // Add ellipsis if we've truncated
        if (startIdx > 0) matchContext = '...' + matchContext;
        if (endIdx < value.length) matchContext += '...';
        
        // Also use this for initial preview content if it's substantial
        if (value.length > 50 && bestMatch.key === 'content') {
          // Get a larger context for the preview
          const previewStart = Math.max(0, indices[0] - 100);
          const previewEnd = Math.min(value.length, indices[1] + 150);
          previewContent = value.substring(previewStart, previewEnd);
          
          // Add ellipsis for truncation
          if (previewStart > 0) previewContent = '...' + previewContent;
          if (previewEnd < value.length) previewContent += '...';
        }
      }
      
      // Extract or build preview content
      if (!previewContent) {
        if (item.content) {
          previewContent = item.content;
        } else if (item.description) {
          previewContent = item.description;
        }
      }
      
      return {
        id: item.id,
        title: item.title,
        type: item.type,
        number: item.number,
        matchContext,
        previewContent, // Add the preview content
        content: item.content, // Store the full content for reference if available
        path: item.path
      };
    }
  }
};
</script>

<style>
.ecfr-navigator {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  border-radius: 0.375rem;
  border-width: 1px;
  overflow: hidden;
}

.ecfr-content {
  flex: 1;
  min-height: 0;
}

.dark-theme {
  --text-primary: rgba(229, 231, 235, 1);
  --text-secondary: rgba(156, 163, 175, 1);
  --bg-primary: rgba(17, 24, 39, 1);
  --bg-secondary: rgba(31, 41, 55, 1);
  --border-color: rgba(55, 65, 81, 1);
}

.light-theme {
  --text-primary: rgba(31, 41, 55, 1);
  --text-secondary: rgba(107, 114, 128, 1);
  --bg-primary: rgba(255, 255, 255, 1);
  --bg-secondary: rgba(249, 250, 251, 1);
  --border-color: rgba(229, 231, 235, 1);
}
</style>
