import { ref } from 'vue';
import * as MUIComponents from '../../components/mui';

const {
  MAvatar,
  MBadge,
  MChip,
  MTypography,
  MAlert,
  MCircularProgress,
  MLinearProgress,
  MSnackbar,
  MFormControl,
  MFormHelperText,
  MInput,
  MInputLabel,
  MAppBar,
  MDrawer,
  MToolbar,
  MList,
  MListItem,
  MDialog,
  MDialogTitle,
  MDialogContent,
  MDialogActions
} = MUIComponents;

export default {
  title: 'MUI Components/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete Material-UI component analogs built with Vue 3 and Tailwind CSS, following Material Design principles for financial applications.'
      }
    }
  }
};

// Complete Material-UI Component Showcase
export const MaterialUIShowcase = {
  render: () => ({
    components: {
      MAvatar, MBadge, MChip, MTypography, MAlert, MCircularProgress, 
      MLinearProgress, MSnackbar, MFormControl, MFormHelperText, MInput, 
      MInputLabel, MAppBar, MDrawer, MToolbar, MList, MListItem, MDialog,
      MDialogTitle, MDialogContent, MDialogActions
    },
    setup() {
      const drawerOpen = ref(false);
      const dialogOpen = ref(false);
      const snackbarOpen = ref(false);
      const progressValue = ref(65);
      const inputValue = ref('');
      const chipData = ref([
        { id: 1, label: 'React', deletable: true },
        { id: 2, label: 'Vue', deletable: true },
        { id: 3, label: 'Angular', deletable: true }
      ]);

      const deleteChip = (chipId) => {
        chipData.value = chipData.value.filter(chip => chip.id !== chipId);
      };

      return {
        drawerOpen,
        dialogOpen,
        snackbarOpen,
        progressValue,
        inputValue,
        chipData,
        deleteChip
      };
    },
    template: `
      <div class="bg-gray-50 min-h-screen">
        <!-- App Bar -->
        <MAppBar color="primary" position="static">
          <MToolbar>
            <button 
              @click="drawerOpen = !drawerOpen"
              class="mr-4 p-2 rounded hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <MTypography variant="h6" color="inherit" class="flex-1">
              Material-UI Component Library
            </MTypography>
            
            <MBadge :badge-content="3" color="error">
              <MAvatar size="small" color="secondary">U</MAvatar>
            </MBadge>
          </MToolbar>
        </MAppBar>

        <!-- Drawer -->
        <MDrawer 
          :open="drawerOpen" 
          @close="drawerOpen = false"
          variant="temporary"
          width="280"
        >
          <div class="p-4">
            <MTypography variant="h6" class="mb-4">Navigation</MTypography>
            <MList>
              <MListItem button>
                <MTypography>Dashboard</MTypography>
              </MListItem>
              <MListItem button>
                <MTypography>Components</MTypography>
              </MListItem>
              <MListItem button>
                <MTypography>Forms</MTypography>
              </MListItem>
              <MListItem button>
                <MTypography>Charts</MTypography>
              </MListItem>
            </MList>
          </div>
        </MDrawer>

        <!-- Main Content -->
        <div class="p-8 space-y-8">
          <!-- Typography Section -->
          <section>
            <MTypography variant="h4" gutterBottom>Typography</MTypography>
            <div class="space-y-2">
              <MTypography variant="h1">Heading 1</MTypography>
              <MTypography variant="h2">Heading 2</MTypography>
              <MTypography variant="h3">Heading 3</MTypography>
              <MTypography variant="h4">Heading 4</MTypography>
              <MTypography variant="h5">Heading 5</MTypography>
              <MTypography variant="h6">Heading 6</MTypography>
              <MTypography variant="subtitle1">Subtitle 1</MTypography>
              <MTypography variant="subtitle2">Subtitle 2</MTypography>
              <MTypography variant="body1">Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</MTypography>
              <MTypography variant="body2">Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</MTypography>
              <MTypography variant="caption">Caption text</MTypography>
              <MTypography variant="overline">Overline text</MTypography>
            </div>
          </section>

          <!-- Avatars and Badges -->
          <section>
            <MTypography variant="h4" gutterBottom>Avatars & Badges</MTypography>
            <div class="flex items-center space-x-4 mb-4">
              <MAvatar size="small">S</MAvatar>
              <MAvatar>M</MAvatar>
              <MAvatar size="large">L</MAvatar>
              <MAvatar src="https://mui.com/static/images/avatar/1.jpg" alt="Avatar" />
              <MAvatar color="primary">JD</MAvatar>
              <MAvatar color="secondary">AB</MAvatar>
            </div>
            
            <div class="flex items-center space-x-6">
              <MBadge :badge-content="4" color="primary">
                <div class="w-10 h-10 bg-gray-300 rounded"></div>
              </MBadge>
              <MBadge :badge-content="99" color="error">
                <div class="w-10 h-10 bg-gray-300 rounded"></div>
              </MBadge>
              <MBadge variant="dot" color="success">
                <div class="w-10 h-10 bg-gray-300 rounded"></div>
              </MBadge>
            </div>
          </section>

          <!-- Chips -->
          <section>
            <MTypography variant="h4" gutterBottom>Chips</MTypography>
            <div class="flex flex-wrap gap-2 mb-4">
              <MChip label="Default" />
              <MChip label="Primary" color="primary" />
              <MChip label="Secondary" color="secondary" />
              <MChip label="Success" color="success" />
              <MChip label="Error" color="error" />
              <MChip label="Warning" color="warning" />
              <MChip label="Info" color="info" />
            </div>
            
            <div class="flex flex-wrap gap-2 mb-4">
              <MChip label="Outlined" variant="outlined" />
              <MChip label="Outlined Primary" variant="outlined" color="primary" />
              <MChip label="Clickable" clickable @click="() => {}" />
            </div>
            
            <div class="flex flex-wrap gap-2">
              <MChip 
                v-for="chip in chipData" 
                :key="chip.id"
                :label="chip.label" 
                :deletable="chip.deletable"
                @delete="deleteChip(chip.id)"
              />
            </div>
          </section>

          <!-- Alerts -->
          <section>
            <MTypography variant="h4" gutterBottom>Alerts</MTypography>
            <div class="space-y-4">
              <MAlert severity="info" title="Info Alert">
                This is an info alert with additional details.
              </MAlert>
              <MAlert severity="success" title="Success Alert" closable>
                This is a success alert that can be dismissed.
              </MAlert>
              <MAlert severity="warning" title="Warning Alert" variant="filled">
                This is a filled warning alert.
              </MAlert>
              <MAlert severity="error" title="Error Alert" variant="outlined">
                This is an outlined error alert.
              </MAlert>
            </div>
          </section>

          <!-- Progress Indicators -->
          <section>
            <MTypography variant="h4" gutterBottom>Progress Indicators</MTypography>
            <div class="space-y-6">
              <div>
                <MTypography variant="h6" class="mb-2">Circular Progress</MTypography>
                <div class="flex items-center space-x-4">
                  <MCircularProgress />
                  <MCircularProgress variant="determinate" :value="25" />
                  <MCircularProgress variant="determinate" :value="50" />
                  <MCircularProgress variant="determinate" :value="75" />
                  <MCircularProgress variant="determinate" :value="100" />
                </div>
              </div>
              
              <div>
                <MTypography variant="h6" class="mb-2">Linear Progress</MTypography>
                <div class="space-y-2 max-w-md">
                  <MLinearProgress />
                  <MLinearProgress variant="determinate" :value="progressValue" />
                  <MLinearProgress variant="buffer" :value="60" :value-buffer="80" />
                </div>
              </div>
            </div>
          </section>

          <!-- Form Controls -->
          <section>
            <MTypography variant="h4" gutterBottom>Form Controls</MTypography>
            <div class="max-w-md space-y-4">
              <MFormControl full-width>
                <MInputLabel html-for="demo-input">Label</MInputLabel>
                <MInput 
                  id="demo-input"
                  v-model="inputValue"
                  placeholder="Enter text here"
                  full-width
                />
                <MFormHelperText>Helper text for additional information</MFormHelperText>
              </MFormControl>
              
              <MFormControl full-width error>
                <MInputLabel html-for="error-input">Error State</MInputLabel>
                <MInput 
                  id="error-input"
                  v-model="inputValue"
                  placeholder="Input with error"
                  full-width
                  error
                />
                <MFormHelperText>This field has an error</MFormHelperText>
              </MFormControl>
            </div>
          </section>

          <!-- Action Buttons -->
          <section>
            <MTypography variant="h4" gutterBottom>Actions</MTypography>
            <div class="flex flex-wrap gap-4">
              <button 
                @click="snackbarOpen = true"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Show Snackbar
              </button>
              <button 
                @click="dialogOpen = true"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Open Dialog
              </button>
            </div>
          </section>
        </div>

        <!-- Dialog -->
        <MDialog :open="dialogOpen" @close="dialogOpen = false" max-width="sm" full-width>
          <MDialogTitle>Sample Dialog</MDialogTitle>
          <MDialogContent>
            <MTypography>
              This is a sample dialog demonstrating the Material-UI dialog components.
              You can place any content here including forms, lists, or other components.
            </MTypography>
          </MDialogContent>
          <MDialogActions>
            <button 
              @click="dialogOpen = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="dialogOpen = false"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Confirm
            </button>
          </MDialogActions>
        </MDialog>

        <!-- Snackbar -->
        <MSnackbar 
          :open="snackbarOpen" 
          @close="snackbarOpen = false"
          message="This is a snackbar message!"
          severity="success"
          :auto-hide-duration="4000"
        />
      </div>
    `
  })
};