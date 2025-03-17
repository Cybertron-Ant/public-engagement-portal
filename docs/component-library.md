# Component Library Documentation

This document provides detailed information about our shared UI components, their usage, and best practices.

## Button Component

Located in `src/shared/components/Button/Button.tsx`

```typescript
import { Button } from '@/shared/components/Button/Button';

// Basic usage
<Button onClick={handleClick}>Click me</Button>

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Loading state
<Button loading>Loading...</Button>
```

## Form Components

### Form Container
Located in `src/shared/components/form/Form/Form.tsx`

```typescript
import { Form } from '@/shared/components/form';

<Form onSubmit={handleSubmit}>
  {/* Form fields */}
</Form>
```

### Input Field
Located in `src/shared/components/form/Input/Input.tsx`

```typescript
import { Input } from '@/shared/components/form';

// Text input
<Input
  name="username"
  label="Username"
  placeholder="Enter username"
  value={username}
  onChange={handleChange}
/>

// Email input
<Input
  type="email"
  name="email"
  label="Email"
  required
/>

// Password input
<Input
  type="password"
  name="password"
  label="Password"
  required
/>
```

### Checkbox
Located in `src/shared/components/form/Checkbox/Checkbox.tsx`

```typescript
import { Checkbox } from '@/shared/components/form';

<Checkbox
  name="terms"
  label="I agree to terms"
  checked={isChecked}
  onChange={handleChange}
/>
```

### Radio Group
Located in `src/shared/components/form/RadioGroup/RadioGroup.tsx`

```typescript
import { RadioGroup } from '@/shared/components/form';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<RadioGroup
  name="options"
  options={options}
  value={selectedOption}
  onChange={handleChange}
/>
```

### Select
Located in `src/shared/components/form/Select/Select.tsx`

```typescript
import { Select } from '@/shared/components/form';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

<Select
  name="dropdown"
  label="Select an option"
  options={options}
  value={selectedValue}
  onChange={handleChange}
/>
```

### TextArea
Located in `src/shared/components/form/TextArea/TextArea.tsx`

```typescript
import { TextArea } from '@/shared/components/form';

<TextArea
  name="description"
  label="Description"
  placeholder="Enter description"
  value={description}
  onChange={handleChange}
  rows={4}
/>
```

## Navigation Component

Located in `src/shared/components/Navigation/Navigation.tsx`

```typescript
import { Navigation } from '@/shared/components/Navigation/Navigation';

<Navigation
  items={[
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/profile' }
  ]}
/>
```

## Best Practices

1. Component Usage
   - Import components from the shared directory
   - Use TypeScript props interface for type safety
   - Follow provided prop naming conventions
   - Include proper error handling

2. State Management
   - Use controlled components when possible
   - Implement proper event handlers
   - Handle loading and error states
   - Maintain consistent state patterns

3. Styling
   - Use provided CSS classes and utilities
   - Follow responsive design patterns
   - Maintain consistent spacing
   - Follow accessibility guidelines

4. Form Validation
   - Use built-in validation props
   - Implement custom validation when needed
   - Show appropriate error messages
   - Handle form submission properly

5. Accessibility
   - Include proper ARIA labels
   - Ensure keyboard navigation
   - Maintain proper focus management
   - Test with screen readers

## Custom Component Creation

When creating new shared components:

1. Follow the established directory structure
2. Create comprehensive TypeScript interfaces
3. Include proper documentation
4. Add usage examples
5. Implement proper testing
6. Follow accessibility guidelines
7. Maintain consistent styling

## Theme Customization

Components support theme customization through:

```typescript
// src/lib/theme.ts
export const theme = {
  colors: {
    primary: '#007bff',
    secondary: '#6c757d',
    // ...
  },
  spacing: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    // ...
  },
  // ...
};
```

## Testing Components

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('button click handler is called', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalled();
});
```

For more information about specific components or custom implementations, refer to the component source files in the `src/shared/components` directory.
