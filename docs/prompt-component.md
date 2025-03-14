# Guide for Component Harmonization in HAT Dynamic Template

## Overview

This document provides guidelines for harmonizing new components with the existing structure in the HAT Dynamic Template framework. The goal is to maintain consistency while incorporating new components.

## Harmonization Request Template

When requesting component harmonization, use the following template:

```
I need to harmonize a new component with my existing HAT Dynamic Template structure.

## Reference Component Structure
[Insert reference component data that serves as the model]

## My Current Files

### 1. Component Template (my-component.njk):
```njk
[Insert current component njk file content]
```

### 2. JSON Data File:
```json
[Insert current JSON data file content]
```

### 3. Storybook File:
```javascript
[Insert current Storybook file content]
```

## Request
Please adapt the reference data to match my existing file structure, rather than changing my structure to match the reference.

## Requirements
- Maintain my current macro structure and rendering approach
- Preserve my variable naming conventions
- Only adapt relevant data properties and structures
- Add necessary CSS classes for visual rendering while preserving my architectural approach
- Ensure compatibility with OMA (Organism-Molecule-Atom) architecture
- Follow Eleventy, Nunjucks, and TailwindCSS best practices
```

## Example of Component Harmonization

### Reference Model
```json
{
  "component": "chip",
  "summary": "A notification indicator chip for displaying counts",
  "params": [
    { "name": "content", "type": "string|number", "required": true, "notes": "The numeric value or content to display in the chip" }
  ],
  "chip_data": {
    "notification_count": "3",
    "unread_messages": "12",
    "completed_tasks": "8",
    "overflowed": "99+"
  }
}
```

```json
{
  "name": "Chip",
  "description": "Notification chip for displaying numeric indicators that automatically sizes based on content length",
  "variants": {
    "default": "bg-red-500",
    "success": "bg-green-500", 
    "warning": "bg-yellow-500",
    "info": "bg-blue-500"
  },
  "accessibility": {
    "roles": ["status"],
    "keyboardInteractions": []
  }
}
```

```njk
{% macro renderChip(content='0', variant='default') %}
  {# Determine the size based on the length #}
  {% set classes = {
    '1': 'h-6 w-6 text-xs',
    '2': 'h-8 w-8 text-sm',
    '3+': 'h-10 w-10 px-1 text-sm'
  } %}
  
  {% set contentLength = content | string | length %}
  {% set sizeClass = contentLength <= 1 ? classes['1'] : (contentLength <= 2 ? classes['2'] : classes['3+']) %}
  
  <span 
    class="inline-flex items-center justify-center rounded-full text-white {{ chip.variants[variant] }} {{ sizeClass }}"
    role="status"
  >
    {{ content }}
  </span>
{% endmacro %}
```

### Current Structure to Harmonize
```njk
{% macro renderChipNotification(options) %}
  {% set chipNotificationData = options.datas.chip-notifications | selectattr('name', 'equalto', options.name) | first %}
  {% set globalStyle = options.datas.globalStyle %}
  {% set variantStyle = options.datas.variants[chipNotificationData.style] %}
  
  {% if chipNotificationData %}
    <div class="{{ globalStyle }} {{ variantStyle }}">
      {{ chipNotificationData.text }}
    </div>
  {% else %}
    <span class="text-red-500">ChipNotification not found</span>
  {% endif %}
{% endmacro %}
```

```json
{
  "globalStyle": "typography-label-l chip-notification",
  "variants": {
    "default": "text-gray-800 hover:text-gray-600",
    "primary": "text-blue-600 hover:text-blue-800 font-bold",
    "secondary": "text-gray-500 hover:text-gray-700"
  },
  "chip-notifications": [
    {
      "name": "example_chip-notification1",
      "text": "Example ChipNotification 1",
      "style": "primary"
    },
    {
      "name": "example_chip-notification2",
      "text": "Example ChipNotification 2",
      "style": "secondary"
    }
  ]
}
```

### Harmonized Result
```njk
{% macro renderChipNotification(options) %}
  {% set chipNotificationData = options.datas.chip-notifications | selectattr('name', 'equalto', options.name) | first %}
  {% set globalStyle = options.datas.globalStyle %}
  {% set variantStyle = options.datas.variants[chipNotificationData.style] %}
  
  {% if chipNotificationData %}
    <div 
      class="{{ globalStyle }} {{ variantStyle }} inline-flex items-center justify-center rounded-full text-white"
      role="status"
    >
      {{ chipNotificationData.text }}
    </div>
  {% else %}
    <span class="text-red-500">ChipNotification not found</span>
  {% endif %}
{% endmacro %}
```

```json
{
  "globalStyle": "typography-label-l chip-notification",
  "variants": {
    "default": "bg-red-500",
    "success": "bg-green-500",
    "warning": "bg-yellow-500",
    "info": "bg-blue-500"
  },
  "chip-notifications": [
    {
      "name": "notification_count",
      "text": "3",
      "style": "default"
    },
    {
      "name": "unread_messages",
      "text": "12",
      "style": "info"
    },
    {
      "name": "completed_tasks",
      "text": "8",
      "style": "success"
    },
    {
      "name": "overflowed",
      "text": "99+",
      "style": "warning"
    }
  ]
}
```

## Key Principles

1. **Structural Integrity**: Maintain the existing file structure and organization
2. **Naming Consistency**: Keep consistent variable and function naming conventions
3. **Data Adaptation**: Adapt the new component data to fit existing patterns
4. **Visual Integrity**: Add necessary CSS classes for proper rendering
5. **Documentation**: Update usage examples to reflect the new component data

## OMA Architecture Reminder

- **Organisms**: Complex components composed of molecules and/or atoms
- **Molecules**: Compound components made up of atoms
- **Atoms**: Basic, indivisible UI components

## Implementation Checklist

- [ ] Component template (.njk) updated
- [ ] Data structure (.json) harmonized
- [ ] Storybook file (.stories.js) updated
- [ ] Usage examples documented
- [ ] Visual tests performed
- [ ] Accessibility attributes maintained

## Additional Resources

- [HAT Dynamic Template Documentation](https://example.com/hat-docs)
- [Nunjucks Templates](https://mozilla.github.io/nunjucks/)
- [TailwindCSS](https://tailwindcss.com/)
- [Eleventy](https://www.11ty.dev/)