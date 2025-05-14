import { defineStore } from 'pinia';

export const useECFRStore = defineStore('ecfr', {
  state: () => ({
    rootItems: [],
    currentPath: [],
    currentItem: null,
    expandedItems: new Set()
  }),
  
  getters: {
    breadcrumbPath() {
      return this.currentPath;
    },
    
    isItemExpanded() {
      return (itemId) => this.expandedItems.has(itemId);
    }
  },
  
  actions: {
    setRootItems(items) {
      this.rootItems = items;
      // If we have items but no current selection, set the first item as current
      if (items.length > 0 && !this.currentItem) {
        this.selectItem(items[0], 0);
      }
    },
    
    selectItem(item, index, parentPath = []) {
      const newPath = [...parentPath, { item, index }];
      this.currentPath = newPath;
      this.currentItem = item;
      
      // Automatically expand the selected item if it has children
      if (item.children && item.children.length > 0) {
        this.expandItem(item.id);
      }
    },
    
    navigateToPath(path) {
      if (path.length > 0) {
        this.currentPath = path;
        this.currentItem = path[path.length - 1].item;
      }
    },
    
    expandItem(itemId) {
      this.expandedItems.add(itemId);
    },
    
    collapseItem(itemId) {
      this.expandedItems.delete(itemId);
    },
    
    toggleItemExpansion(itemId) {
      if (this.expandedItems.has(itemId)) {
        this.expandedItems.delete(itemId);
      } else {
        this.expandedItems.add(itemId);
      }
    },
    
    expandAll() {
      const addAllItemIds = (items) => {
        for (const item of items) {
          this.expandedItems.add(item.id);
          if (item.children) {
            addAllItemIds(item.children);
          }
        }
      };
      
      addAllItemIds(this.rootItems);
    },
    
    collapseAll() {
      this.expandedItems.clear();
    }
  }
});