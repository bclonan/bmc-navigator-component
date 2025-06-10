# Brand Guidelines

## Logo Usage
- Use the primary logo on white or light backgrounds.
- Maintain clear space around the logo equal to the height of the "M".
- Do not stretch, recolor, or alter the logo.

## Color Palette
- **Primary Blue:** #385fc0
- **Accent Blue:** #3b82f6
- **Success Green:** #22c55e
- **Warning Yellow:** #facc15
- **Error Red:** #ef4444
- **Gray:** #f3f4f6, #e5e7eb, #6b7280

## Typography
- **Headings:** Nunito Sans Bold
- **Body:** Nunito Sans Regular
- **Font Sizes:** Responsive, 16px base

## UI Patterns
- Use rounded corners (8px radius)
- Shadows for cards and modals
- Consistent spacing (8px grid)
- Accessible color contrast (WCAG 2.1 AA)

## Email Branding
- All emails use the primary blue header, logo, and clear call-to-action buttons.
- Footer includes contact info and legal disclaimer.

---

# Code Patterns

## Component Structure
- Use semantic HTML and ARIA attributes
- Props are documented with JSDoc
- Use slots for flexible content
- Emit events for all user actions

## File Naming
- PascalCase for components (e.g., `MHeroSection.vue`)
- Kebab-case for assets and CSS classes

## Testing
- All components have Storybook stories and unit tests

---

# Models Reference

## LoanApplication
```ts
interface LoanApplication {
  id: string;
  applicantName: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}
```

## Payment
```ts
interface Payment {
  id: string;
  loanId: string;
  amount: number;
  date: string;
  status: 'scheduled' | 'completed' | 'failed';
}
```

## User
```ts
interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'agent';
}
```

---

# Documentation Index
- Brand Guidelines
- Code Patterns
- Models Reference
- Email Templates
- Marketing Widgets
- Responsive Email Sections
- Helpful Docs
