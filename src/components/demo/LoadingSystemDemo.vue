<template>
  <div class="loading-demo-container">
    <div class="demo-header">
      <h1 class="demo-title">Loading System Demo</h1>
      <p class="demo-subtitle">
        Comprehensive loading states and progress indicators
      </p>
    </div>

    <!-- Progress Indicators Section -->
    <section class="demo-section">
      <h2 class="section-title">Progress Indicators</h2>

      <div class="demo-grid">
        <!-- Circular Progress -->
        <div class="demo-card">
          <h3 class="card-title">Circular Progress</h3>
          <div class="progress-examples">
            <div class="progress-item">
              <MCircularProgress />
              <span class="progress-label">Indeterminate</span>
            </div>
            <div class="progress-item">
              <MCircularProgress :value="progressValue" />
              <span class="progress-label">{{ progressValue }}%</span>
            </div>
            <div class="progress-item">
              <MCircularProgress :value="75" size="small" />
              <span class="progress-label">Small (75%)</span>
            </div>
            <div class="progress-item">
              <MCircularProgress :value="50" size="large" color="success" />
              <span class="progress-label">Large Success</span>
            </div>
          </div>
        </div>

        <!-- Linear Progress -->
        <div class="demo-card">
          <h3 class="card-title">Linear Progress</h3>
          <div class="linear-progress-examples">
            <div class="progress-item">
              <MLinearProgress />
              <span class="progress-label">Indeterminate</span>
            </div>
            <div class="progress-item">
              <MLinearProgress :value="progressValue" />
              <span class="progress-label">{{ progressValue }}%</span>
            </div>
            <div class="progress-item">
              <MLinearProgress :value="85" color="success" />
              <span class="progress-label">Success (85%)</span>
            </div>
            <div class="progress-item">
              <MLinearProgress :value="45" color="warning" />
              <span class="progress-label">Warning (45%)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Loading States Section -->
    <section class="demo-section">
      <h2 class="section-title">Loading States</h2>

      <div class="demo-grid">
        <!-- Button Loading States -->
        <div class="demo-card">
          <h3 class="card-title">Button Loading States</h3>
          <div class="button-examples">
            <MButton
              :loading="buttonLoading"
              @click="simulateButtonLoad"
              color="primary"
            >
              {{ buttonLoading ? "Loading..." : "Load Data" }}
            </MButton>
            <MButton
              :loading="uploadLoading"
              @click="simulateUpload"
              color="secondary"
            >
              {{ uploadLoading ? "Uploading..." : "Upload File" }}
            </MButton>
            <MButton
              :loading="saveLoading"
              @click="simulateSave"
              color="success"
            >
              {{ saveLoading ? "Saving..." : "Save Changes" }}
            </MButton>
          </div>
        </div>

        <!-- Card Loading State -->
        <div class="demo-card">
          <h3 class="card-title">Card Loading</h3>
          <div class="card-loading-example">
            <div class="content-card" :class="{ loading: cardLoading }">
              <div v-if="cardLoading" class="loading-overlay">
                <MCircularProgress size="large" />
                <span class="loading-text">Loading content...</span>
              </div>
              <div v-else class="card-content">
                <h4>Financial Report</h4>
                <p>
                  This is sample content that would normally be loaded from an
                  API.
                </p>
                <div class="stats">
                  <div class="stat">
                    <span class="stat-value">$1,234,567</span>
                    <span class="stat-label">Total Revenue</span>
                  </div>
                  <div class="stat">
                    <span class="stat-value">45%</span>
                    <span class="stat-label">Growth Rate</span>
                  </div>
                </div>
              </div>
            </div>
            <MButton @click="toggleCardLoading" style="margin-top: 16px">
              {{ cardLoading ? "Stop Loading" : "Start Loading" }}
            </MButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Skeleton Loaders Section -->
    <section class="demo-section">
      <h2 class="section-title">Skeleton Loaders</h2>

      <div class="demo-grid">
        <!-- Text Skeleton -->
        <div class="demo-card">
          <h3 class="card-title">Text Skeleton</h3>
          <div class="skeleton-example">
            <div v-if="showTextSkeleton" class="text-skeleton">
              <div class="skeleton-line long"></div>
              <div class="skeleton-line medium"></div>
              <div class="skeleton-line short"></div>
              <div class="skeleton-line long"></div>
            </div>
            <div v-else class="actual-text">
              <h4>Loaded Content</h4>
              <p>
                This is the actual content that appears after loading is
                complete.
              </p>
              <p>Multiple lines of text content.</p>
            </div>
            <MButton @click="toggleTextSkeleton" style="margin-top: 16px">
              {{ showTextSkeleton ? "Show Content" : "Show Skeleton" }}
            </MButton>
          </div>
        </div>

        <!-- List Skeleton -->
        <div class="demo-card">
          <h3 class="card-title">List Skeleton</h3>
          <div class="skeleton-example">
            <div v-if="showListSkeleton" class="list-skeleton">
              <div v-for="i in 4" :key="i" class="list-item-skeleton">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-content">
                  <div class="skeleton-line medium"></div>
                  <div class="skeleton-line short"></div>
                </div>
              </div>
            </div>
            <div v-else class="actual-list">
              <div class="list-item">
                <div class="avatar">JS</div>
                <div class="content">
                  <div class="name">John Smith</div>
                  <div class="role">Financial Analyst</div>
                </div>
              </div>
              <div class="list-item">
                <div class="avatar">AD</div>
                <div class="content">
                  <div class="name">Alice Davis</div>
                  <div class="role">Budget Manager</div>
                </div>
              </div>
              <div class="list-item">
                <div class="avatar">MJ</div>
                <div class="content">
                  <div class="name">Mike Johnson</div>
                  <div class="role">Controller</div>
                </div>
              </div>
            </div>
            <MButton @click="toggleListSkeleton" style="margin-top: 16px">
              {{ showListSkeleton ? "Show Content" : "Show Skeleton" }}
            </MButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Loading Section -->
    <section class="demo-section">
      <h2 class="section-title">Global Loading Overlay</h2>
      <div class="demo-card">
        <h3 class="card-title">Full Screen Loading</h3>
        <p>Click the button below to show a global loading overlay.</p>
        <MButton @click="showGlobalLoading" color="primary">
          Show Global Loading
        </MButton>
      </div>
    </section>

    <!-- Global Loading Overlay -->
    <div v-if="globalLoading" class="global-loading-overlay">
      <div class="global-loading-content">
        <MCircularProgress size="large" />
        <h3 class="loading-title">Loading Application...</h3>
        <p class="loading-message">Please wait while we fetch your data</p>
        <MLinearProgress
          :value="globalProgress"
          style="margin-top: 24px; width: 300px"
        />
        <span class="progress-text">{{ globalProgress }}% Complete</span>
      </div>
    </div>
  </div>
</template>

<script>
import MCircularProgress from "../mui/MCircularProgress.vue";
import MLinearProgress from "../mui/MLinearProgress.vue";
import MButton from "../mui/MButton.vue";

export default {
  name: "LoadingSystemDemo",
  components: {
    MCircularProgress,
    MLinearProgress,
    MButton,
  },
  data() {
    return {
      progressValue: 0,
      buttonLoading: false,
      uploadLoading: false,
      saveLoading: false,
      cardLoading: false,
      showTextSkeleton: true,
      showListSkeleton: true,
      globalLoading: false,
      globalProgress: 0,
      progressInterval: null,
      globalProgressInterval: null,
    };
  },
  mounted() {
    this.startProgressAnimation();
  },
  beforeUnmount() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
    if (this.globalProgressInterval) {
      clearInterval(this.globalProgressInterval);
    }
  },
  methods: {
    startProgressAnimation() {
      this.progressInterval = setInterval(() => {
        this.progressValue = (this.progressValue + 1) % 101;
      }, 100);
    },

    async simulateButtonLoad() {
      this.buttonLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.buttonLoading = false;
    },

    async simulateUpload() {
      this.uploadLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.uploadLoading = false;
    },

    async simulateSave() {
      this.saveLoading = true;
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.saveLoading = false;
    },

    toggleCardLoading() {
      this.cardLoading = !this.cardLoading;
    },

    toggleTextSkeleton() {
      this.showTextSkeleton = !this.showTextSkeleton;
    },

    toggleListSkeleton() {
      this.showListSkeleton = !this.showListSkeleton;
    },

    showGlobalLoading() {
      this.globalLoading = true;
      this.globalProgress = 0;

      this.globalProgressInterval = setInterval(() => {
        this.globalProgress += 2;
        if (this.globalProgress >= 100) {
          clearInterval(this.globalProgressInterval);
          setTimeout(() => {
            this.globalLoading = false;
            this.globalProgress = 0;
          }, 500);
        }
      }, 100);
    },
  },
};
</script>

<style scoped>
.loading-demo-container {
  padding: var(--mf-spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
  font-family: var(--mf-font-family);
}

.demo-header {
  text-align: center;
  margin-bottom: var(--mf-spacing-xl);
}

.demo-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--mf-primary);
  margin-bottom: var(--mf-spacing-sm);
}

.demo-subtitle {
  font-size: 1.125rem;
  color: var(--mf-text-secondary);
}

.demo-section {
  margin-bottom: var(--mf-spacing-xl);
}

.section-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--mf-text-primary);
  margin-bottom: var(--mf-spacing-lg);
  border-bottom: 2px solid var(--mf-divider);
  padding-bottom: var(--mf-spacing-sm);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--mf-spacing-lg);
}

.demo-card {
  background: var(--mf-bg-paper);
  border: 1px solid var(--mf-border-light);
  border-radius: var(--mf-radius-lg);
  padding: var(--mf-spacing-lg);
  box-shadow: var(--mf-shadow-1);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--mf-text-primary);
  margin-bottom: var(--mf-spacing-md);
}

.progress-examples,
.linear-progress-examples {
  display: flex;
  flex-direction: column;
  gap: var(--mf-spacing-lg);
}

.progress-item {
  display: flex;
  align-items: center;
  gap: var(--mf-spacing-md);
}

.progress-label {
  font-size: 0.875rem;
  color: var(--mf-text-secondary);
  min-width: 100px;
}

.button-examples {
  display: flex;
  flex-direction: column;
  gap: var(--mf-spacing-md);
}

.content-card {
  position: relative;
  background: var(--mf-bg-default);
  border: 1px solid var(--mf-border-light);
  border-radius: var(--mf-radius-md);
  padding: var(--mf-spacing-lg);
  min-height: 200px;
}

.content-card.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--mf-spacing-md);
}

.loading-text {
  color: var(--mf-text-secondary);
  font-size: 0.875rem;
}

.card-content h4 {
  color: var(--mf-primary);
  margin-bottom: var(--mf-spacing-sm);
}

.stats {
  display: flex;
  gap: var(--mf-spacing-lg);
  margin-top: var(--mf-spacing-md);
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--mf-success);
}

.stat-label {
  font-size: 0.75rem;
  color: var(--mf-text-secondary);
  text-transform: uppercase;
}

/* Skeleton Styles */
.skeleton-line {
  height: 16px;
  background: linear-gradient(
    90deg,
    var(--mf-bg-surface) 25%,
    var(--mf-bg-subtle) 50%,
    var(--mf-bg-surface) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: var(--mf-radius-sm);
  margin-bottom: var(--mf-spacing-sm);
}

.skeleton-line.long {
  width: 100%;
}
.skeleton-line.medium {
  width: 75%;
}
.skeleton-line.short {
  width: 50%;
}

.list-item-skeleton {
  display: flex;
  align-items: center;
  gap: var(--mf-spacing-md);
  margin-bottom: var(--mf-spacing-md);
}

.skeleton-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--mf-radius-round);
  background: linear-gradient(
    90deg,
    var(--mf-bg-surface) 25%,
    var(--mf-bg-subtle) 50%,
    var(--mf-bg-surface) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-content {
  flex: 1;
}

.actual-list .list-item {
  display: flex;
  align-items: center;
  gap: var(--mf-spacing-md);
  margin-bottom: var(--mf-spacing-md);
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--mf-radius-round);
  background: var(--mf-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.content .name {
  font-weight: 600;
  color: var(--mf-text-primary);
}

.content .role {
  font-size: 0.875rem;
  color: var(--mf-text-secondary);
}

.global-loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.global-loading-content {
  background: var(--mf-bg-default);
  padding: var(--mf-spacing-xl);
  border-radius: var(--mf-radius-lg);
  text-align: center;
  box-shadow: var(--mf-shadow-3);
}

.loading-title {
  color: var(--mf-text-primary);
  margin: var(--mf-spacing-md) 0;
}

.loading-message {
  color: var(--mf-text-secondary);
  margin-bottom: var(--mf-spacing-md);
}

.progress-text {
  font-size: 0.875rem;
  color: var(--mf-text-secondary);
  margin-top: var(--mf-spacing-sm);
}

@keyframes skeleton-loading {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@media (max-width: 768px) {
  .demo-grid {
    grid-template-columns: 1fr;
  }

  .progress-examples,
  .linear-progress-examples {
    gap: var(--mf-spacing-md);
  }

  .stats {
    flex-direction: column;
    gap: var(--mf-spacing-md);
  }
}
</style>
