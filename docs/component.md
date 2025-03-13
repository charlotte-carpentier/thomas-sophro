# HAT Components Structure

This document explains the organization of components in the HAT Dynamic Template project according to the OMA (Organism-Molecule-Atom) architecture with the updated data structure.

## Overview

Each component consists of several files distributed across different directories:

1. **Nunjucks Component** (`.njk`) - The component template
2. **Component Data** (`_data/{type}/{component}.json`) - Component variants and instances
3. **Storybook Documentation** (`.stories.js`) - Component documentation and examples

## Directory Structure

```sh
project/
├── src/
│   ├── _includes/
│   │   ├── 00-core/
│   │   │       └── core-name.njk
│   │   ├── 01-organisms/
│   │   │       └── organism-name.njk
│   │   ├── 02-molecules/
│   │   │       └── molecule-name.njk
│   │   └── 03-atoms/
│   │           └── atom-name.njk
│   ├── _data/
│   │   ├── atoms/          # One file per atom component
│   │   │   ├── button.json
│   │   │   ├── link.json
│   │   │   └── input.json
│   │   ├── molecules/      # One file per molecule component
│   │   │   ├── card.json
│   │   │   └── form.json
│   │   ├── organisms/      # One file per organism component
│   │   │   ├── section.json
│   │   │   └── header.json
│   │   ├── core/           # Core data files
│   │   │   └── site.json   # Global site configuration
│   └── js/
│       └── generate-component.js  <!-- Component generator script -->
└── stories/
    ├── atoms/
    │       └── AtomName.stories.js
    ├── molecules/
    │       └── MoleculeName.stories.js
    └── organisms/
            └── OrganismName.stories.js
```

## File Descriptions

### 1. Nunjucks Component (`.njk`)

This file contains the component macro that defines its HTML structure.

**Example** (`src/_includes/03-atoms/link.njk`):

```njk
{% macro renderLink(link) %}
<a href="{{ link.url }}" class="{{ link.variants[link.variant] }}">
  {{ link.label }}
</a>
{% endmacro %}
```

### 2. Component Data (`_data/{type}/{component}.json`)

Each component has its own dedicated JSON file that includes both variants (styles) and instances (content).

**Example** (`src/_data/atoms/link.json`):

```json
{
  "component": "link",
  "variants": {
    "primary": "text-blue-600 hover:text-blue-800 underline",
    "secondary": "text-gray-600 hover:text-gray-800",
    "button": "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
  },
  "instances": [
    {
      "label": "Contactez-nous",
      "url": "/contact",
      "variant": "primary"
    },
    {
      "label": "En savoir plus",
      "url": "/about",
      "variant": "secondary"
    }
  ]
}
```

### 3. Storybook Documentation (`.stories.js`)

This file defines the component tests and documentation in Storybook.

**Example** (`stories/atoms/Link.stories.js`):

```javascript
import linkData from '../../_data/atoms/link.json';

export default {
  title: 'Atoms/Link',
  render: (args) => {
    return `<a href="${args.url}" class="${linkData.variants[args.variant]}">${args.label}</a>`;
  },
  argTypes: {
    label: { control: 'text', defaultValue: 'Link' },
    url: { control: 'text', defaultValue: '#' },
    variant: { 
      control: { type: 'select', options: Object.keys(linkData.variants) }, 
      defaultValue: 'primary' 
    }
  }
};

// Create a story for each instance
linkData.instances.forEach((instance, index) => {
  exports[`Instance${index + 1}`] = {
    args: {
      label: instance.label,
      url: instance.url,
      variant: instance.variant
    }
  };
});
```

## Component Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| **Component Names** | PascalCase | `Link` |
| **File Names** | kebab-case | `link.njk` |
| **Data Files** | kebab-case (singular) | `link.json` |
| **Story Files** | PascalCase | `Link.stories.js` |

## Creating a New Component

### Using the Component Generator

The component generator should be updated to reflect the new data structure:

```bash
node src/js/generate-component.js Link atoms
```

### Generated Files

| File | Location | Example |
|------|----------|---------|
| Component template | `_includes/03-atoms/` | `link.njk` |
| Component data | `_data/atoms/` | `link.json` |
| Storybook docs | `stories/atoms/` | `Link.stories.js` |

### Component Data Structure

The newly generated component data file should follow this structure:

```json
{
  "component": "link",
  "description": "A reusable link component",
  "variants": {
    "primary": "text-blue-600 hover:text-blue-800 underline",
    "secondary": "text-gray-600 hover:text-gray-800"
  },
  "instances": [
    {
      "label": "Example Link",
      "url": "#",
      "variant": "primary"
    }
  ]
}
```

## Using a Component

To use a component in a template, import the Nunjucks macro and pass the instance data:

```njk
{% from "03-atoms/link.njk" import renderLink %}

<!-- Use a specific instance -->
{{ renderLink(link.instances[0]) }}

<!-- Or create a custom instance -->
{{ renderLink({
  label: "Custom Link",
  url: "/custom",
  variant: "secondary"
}) }}
```

---
This updated structure provides better organization and maintainability with a dedicated data file per component.
