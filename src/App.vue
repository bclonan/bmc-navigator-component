<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">eCFR Navigator Demo</h1>

    <!-- Top controls row -->
    <div class="flex space-x-2 mb-4">
      <button
        @click="toggleTheme"
        class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
      >
        Toggle Theme ({{ navigatorOptions.theme }})
      </button>

      <button
        @click="addExampleMetadata"
        class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
      >
        Add Example Metadata
      </button>

      <button
        @click="registerExampleProcessor"
        class="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors duration-200"
      >
        Register XML Processor
      </button>
    </div>

    <!-- View Mode Controls -->
    <div
      class="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
    >
      <div>
        <span class="text-sm font-medium mr-2">View Mode:</span>
        <div class="flex space-x-1 mt-1">
          <button
            @click="setViewMode('compact')"
            class="px-3 py-1 text-sm rounded transition-colors duration-200"
            :class="[
              navigatorOptions.display.viewMode === 'compact'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Compact
          </button>
          <button
            @click="setViewMode('standard')"
            class="px-3 py-1 text-sm rounded transition-colors duration-200"
            :class="[
              navigatorOptions.display.viewMode === 'standard'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Standard
          </button>
          <button
            @click="setViewMode('detailed')"
            class="px-3 py-1 text-sm rounded transition-colors duration-200"
            :class="[
              navigatorOptions.display.viewMode === 'detailed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Detailed
          </button>
        </div>
      </div>

      <div>
        <span class="text-sm font-medium mr-2">Spacing:</span>
        <div class="flex space-x-1 mt-1">
          <button
            @click="setItemSpacing('tight')"
            class="px-3 py-1 text-sm rounded transition-colors duration-200"
            :class="[
              navigatorOptions.display.itemSpacing === 'tight'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Tight
          </button>
          <button
            @click="setItemSpacing('medium')"
            class="px-3 py-1 text-sm rounded transition-colors duration-200"
            :class="[
              navigatorOptions.display.itemSpacing === 'medium'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Medium
          </button>
          <button
            @click="setItemSpacing('loose')"
            class="px-3 py-1 text-sm rounded transition-colors duration-200"
            :class="[
              navigatorOptions.display.itemSpacing === 'loose'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            Loose
          </button>
        </div>
      </div>

      <div class="flex items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="navigatorOptions.display.showMetadataBadges"
            @change="updateOptions"
            class="sr-only peer"
          />
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          ></div>
          <span class="ml-2 text-sm font-medium">Show Metadata Badges</span>
        </label>
      </div>

      <div class="flex items-center">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="navigatorOptions.display.showDescription"
            @change="updateOptions"
            class="sr-only peer"
          />
          <div
            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
          ></div>
          <span class="ml-2 text-sm font-medium">Show Content Preview</span>
        </label>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="md:col-span-2 border border-gray-300 rounded-lg overflow-hidden h-[600px]"
      >
        <ECFRNavigator ref="ecfrNavigator" :dataUrls="dataUrls"
        :options="navigatorOptions" @item-selected="handleItemSelected"
        @path-changed="handlePathChanged"
        @metadata-changed="handleMetadataChanged" />
      </div>

      <div class="space-y-4">
        <div
          class="bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-lg"
        >
          <h2 class="text-lg font-semibold mb-2">Selected Item</h2>
          <pre
            v-if="selectedItem"
            class="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto text-xs max-h-[150px]"
            >{{ JSON.stringify(selectedItem, null, 2) }}</pre
          >
          <p v-else class="text-gray-500 italic">No item selected</p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-lg"
        >
          <h2 class="text-lg font-semibold mb-2">Metadata</h2>
          <pre
            v-if="metadata"
            class="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto text-xs max-h-[150px]"
            >{{ JSON.stringify(metadata, null, 2) }}</pre
          >
          <p v-else class="text-gray-500 italic">No metadata available</p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-lg"
        >
          <h2 class="text-lg font-semibold mb-2">Processed Metadata</h2>
          <div
            v-if="processedMetadata && processedMetadata.xmlLink"
            class="bg-blue-50 p-2 rounded mb-2"
          >
            <h3 class="font-medium mb-1">XML Link Processed:</h3>
            <a
              :href="processedMetadata.xmlLink.url"
              target="_blank"
              class="text-blue-600 hover:underline block truncate"
            >
              {{ processedMetadata.xmlLink.label }}
            </a>
          </div>
          <div
            v-if="processedMetadata && processedMetadata.renderTarget"
            class="bg-green-50 p-2 rounded mb-2"
          >
            <h3 class="font-medium mb-1">Render Target:</h3>
            <div class="text-sm">
              Element ID: {{ processedMetadata.renderTarget.elementId }}
            </div>
          </div>
          <pre
            v-if="processedMetadata"
            class="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto text-xs max-h-[100px]"
            >{{ JSON.stringify(processedMetadata, null, 2) }}</pre
          >
          <p v-else class="text-gray-500 italic">
            No processed metadata available
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mockData from "./mock.json"; // Import your mock data

export default {
  name: "App",

  data() {
    return {
      selectedItem: null,
      currentPath: [],
      metadata: null,
      processedMetadata: null,
      hasProcessorRegistered: false,
      navigatorOptions: {
        showBreadcrumb: true,
        expandAll: false,
        theme: "light",
        display: {
          viewMode: "standard",
          showDescription: true,
          showMetadataBadges: true,
          itemSpacing: "medium",
          maxTitleLength: 40,
        },
      },
      ecfrData: mockData, // Replace with actual data
      dataUrls: [
       "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title1.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title2.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title3.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title4.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title5.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title6.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title7.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title8.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title9.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title10.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title11.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title12.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title13.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title14.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title15.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title16.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title17.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title18.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title19.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title20.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title21.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title22.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title23.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title24.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title25.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title26.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title27.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title28.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title29.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title30.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title31.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title32.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title33.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title34.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title36.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title37.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title38.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title39.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title40.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title41.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title42.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title43.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title44.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title45.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title46.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title47.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title48.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title49.json",
        "https://raw.githubusercontent.com/bclonan/ecrf-json-repo/refs/heads/main/ECFR-title50.json",
      ],
    };
  },

  methods: {
    handleItemSelected(event) {
      this.selectedItem = event.item;
      this.metadata = event.metadata || null;
      this.processedMetadata = event.processedMetadata || null;
      console.log("Selected item:", event.item.title);

      if (event.metadata) {
        console.log("Item has metadata:", event.metadata);
      }

      if (event.processedMetadata) {
        console.log("Item has processed metadata:", event.processedMetadata);
      }
    },

    handlePathChanged(path) {
      this.currentPath = path;
      console.log("Path changed:", path.map((p) => p.item.title).join(" > "));
    },

    handleMetadataChanged(event) {
      console.log(`Metadata ${event.action}:`, {
        itemId: event.itemId,
        type: event.metadataType,
        data: event.action === "add" ? event.metadata : event.oldMetadata,
      });
    },

    addExampleMetadata() {
      if (!this.selectedItem) {
        alert("Please select an item first");
        return;
      }

      // Example metadata for XML links and render targets
      const metadata = {
        xmlLink: {
          url: `https://www.ecfr.gov/api/xml/${this.selectedItem.type}/${this.selectedItem.id}.xml`,
          version: "1.0",
        },
        renderTarget: {
          elementId: `render-${this.selectedItem.id}`,
          mode: "replace",
        },
        lastUpdated: new Date().toISOString(),
      };

      // Add metadata to the selected item
      this.$refs.ecfrNavigator.addMetadata(this.selectedItem.id, metadata);

      console.log("Added metadata to", this.selectedItem.title);
    },

    registerExampleProcessor() {
      if (this.hasProcessorRegistered) {
        // Unregister processors if already registered
        this.$refs.ecfrNavigator.unregisterMetadataProcessor("xmlLink");
        this.$refs.ecfrNavigator.unregisterMetadataProcessor("renderTarget");
        this.hasProcessorRegistered = false;
        console.log("Unregistered metadata processors");
        return;
      }

      // Register a processor for XML links
      this.$refs.ecfrNavigator.registerMetadataProcessor(
        "xmlLink",
        (metadata, itemId) => {
          // Create a formatted, user-friendly link from the raw XML metadata
          return {
            url: metadata.url,
            label: `XML for ${itemId} (v${metadata.version})`,
            downloadUrl: `${metadata.url}?download=true`,
          };
        }
      );

      // Register a processor for render targets
      this.$refs.ecfrNavigator.registerMetadataProcessor(
        "renderTarget",
        (metadata) => {
          // Add additional rendering information
          return {
            elementId: metadata.elementId,
            mode: metadata.mode,
            isValid: !!metadata.elementId, // Simple validation
          };
        }
      );

      this.hasProcessorRegistered = true;
      console.log("Registered metadata processors");

      // If an item is already selected with metadata, re-process it
      if (this.selectedItem && this.metadata) {
        this.processedMetadata = this.$refs.ecfrNavigator.processMetadata(
          this.selectedItem.id
        );
      }
    },

    toggleTheme() {
      this.navigatorOptions = {
        ...this.navigatorOptions,
        theme: this.navigatorOptions.theme === "light" ? "dark" : "light",
      };
    },

    setViewMode(mode) {
      // Create a copy of the current options
      const newOptions = { ...this.navigatorOptions };

      // Update view mode
      if (!newOptions.display) {
        newOptions.display = {};
      }

      newOptions.display.viewMode = mode;

      // Apply mode-specific settings
      if (mode === "detailed") {
        // Detailed mode - show descriptions and metadata badges
        newOptions.display.showDescription = true;
      } else if (mode === "compact") {
        // Compact mode - hide descriptions for better density
        newOptions.display.showDescription = false;
      }

      // Update options
      this.navigatorOptions = newOptions;
    },

    setItemSpacing(spacing) {
      // Create a copy of the current options
      const newOptions = { ...this.navigatorOptions };

      // Update item spacing
      if (!newOptions.display) {
        newOptions.display = {};
      }

      newOptions.display.itemSpacing = spacing;

      // Update options
      this.navigatorOptions = newOptions;
    },

    updateOptions() {
      // This method is called when checkboxes change
      // The v-model already updates navigatorOptions directly,
      // so we don't need to do anything here except trigger a UI update
      this.navigatorOptions = { ...this.navigatorOptions };
    },
  },
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
