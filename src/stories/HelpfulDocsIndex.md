# Helpful Docs Index

## Book Sections
- Brand Guidelines
- Code Patterns
- Models Reference
- Responsive Email Sections
- Marketing Widgets
- All Models Page
- Storybook Addons & Usage
- Theming & Branding
- Accessibility & WCAG
- Testing & QA
- API Reference
- Example Layouts

## All Models Page

### LoanApplication
- id: string
- applicantName: string
- amount: number
- status: 'pending' | 'approved' | 'rejected'
- createdAt: string
- updatedAt: string

### Payment
- id: string
- loanId: string
- amount: number
- date: string
- status: 'scheduled' | 'completed' | 'failed'

### User
- id: string
- name: string
- email: string
- role: 'customer' | 'admin' | 'agent'

---

## Storybook Addons & Usage
- @storybook/addon-docs: MDX/Docs tab for all components
- @storybook/addon-interactions: Testing and controls
- @storybook/addon-figma: Figma design previews
- @storybook/addon-chromatic: Visual regression testing
- @storybook/addon-a11y: Accessibility checks
- @storybook/addon-viewport: Responsive testing

## Theming & Branding
- All components support theme tokens
- Use `primary`, `accent`, `success`, `warning`, `error`, `gray` classes
- Brand colors and typography are enforced in all UI and email templates

## Accessibility & WCAG
- All UI and email templates meet WCAG 2.1 AA
- Keyboard navigation, ARIA, and color contrast are tested
- See `/stories/BrandGuidelines.md` for details

## Testing & QA
- All components have unit and visual tests
- Use Chromatic for regression
- Use axe-core for accessibility

## API Reference
- See `/README.md` and `/types/` for all exported types and APIs

## Example Layouts
- See `/stories/CompletePageLayout.stories.js` and `/stories/CompleteApplication.stories.js`

---

# Add this page to the Storybook sidebar for quick reference.
