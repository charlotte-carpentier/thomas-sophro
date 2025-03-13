# HAT Components Structure

This document explains the organization of components in the HAT Dynamic Template project according to the OMA (Organism-Molecule-Atom) architecture.

## Overview

Each component consists of several files distributed across different directories:

1. **Nunjucks Component** (`.njk`) - The component template
2. **Styles** (`_data/styles/`) - Component style definitions
3. **Content** (`_data/contents/`) - Component data instances
4. **Storybook Documentation** (`.stories.js`) - Component documentation and examples

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
│   │   ├── styles/
│   │   │   ├── atoms.json
│   │   │   ├── molecules.json
│   │   │   ├── organisms.json
│   │   ├── contents/
│   │   │   ├── atoms/
│   │   │   │   └── buttons.json
│   │   │   ├── molecules/
│   │   │   │   └── cards.json
│   │   │   ├── organisms/
│   │   │       └── sections.json
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

**Example** (`src/_includes/03-atoms/button-link.njk`):

```njk
{% macro renderButton(button) %}
<a href="{{ button.url }}" class="{{ styles.atoms.button[button.style] }}">
  {{ button.label }}
</a>
{% endmacro %}
```

### 2. Styles (`_data/styles/`)

This file defines the different style variants of components.

**Example** (`src/_data/styles/atoms.json`):

```json
{
  "button": {
    "primary": "bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600",
    "secondary": "bg-gray-200 text-black px-4 py-2 rounded-lg"
  }
}
```

### 3. Content (`_data/contents/`)

This file stores multiple instances of component data.

**Example** (`src/_data/contents/atoms/buttons.json`):

```json
[
  {
    "label": "Contactez-nous",
    "url": "/contact",
    "style": "primary"
  },
  {
    "label": "En savoir plus",
    "url": "/about",
    "style": "secondary"
  }
]
```

### 4. Storybook Documentation (`.stories.js`)

This file defines the component tests and documentation in Storybook.

**Example** (`stories/atoms/ButtonLink.stories.js`):

```javascript
import buttonData from '../../_data/styles/atoms.json';
import buttonsContent from '../../_data/contents/atoms/buttons.json';

export default {
  title: 'Atoms/ButtonLink',
  render: (args) => {
    return `<button class='${buttonData.button[args.style]}'>${args.label}</button>`;
  },
  argTypes: {
    label: { control: 'text', defaultValue: 'Button' },
    style: { control: { type: 'select', options: Object.keys(buttonData.button) }, defaultValue: 'primary' }
  }
};
```

## Component Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| **Component Names** | PascalCase | `ButtonLink` |
| **File Names** | kebab-case | `button-link.njk` |
| **Content Files** | kebab-case (plural) | `button-links.json` |
| **Style Files** | kebab-case | `atoms.json` |
| **Story Files** | PascalCase | `ButtonLink.stories.js` |

## Creating a New Component

### Using the Component Generator

```bash
node src/js/generate-component.js ButtonLink
```

### Generated Files

| File | Location | Example |
|------|----------|---------|
| Component template | `_includes/03-atoms/` | `button-link.njk` |
| Content data | `_data/contents/atoms/` | `button-links.json` |
| Style data | `_data/styles/` | `atoms.json` |
| Storybook docs | `stories/atoms/` | `ButtonLink.stories.js` |

---
This structure ensures consistency and maintainability in component development.
