# HAT Dynamic Template - Architecture Documentation

## Overview

HAT Dynamic Template is a modular front-end development framework built on Eleventy, Nunjucks, and TailwindCSS. It follows a custom OMA structure (Organisms, Molecules, Atoms) to create consistent and maintainable web components.

## Directory Structure

```sh
src/
├── _data/            # Data files for templates
│   ├── atoms/        # Data for atomic components (one file per component)
│   │   ├── button.json   # Button component data
│   │   ├── link.json     # Link component data
│   │   └── input.json    # Input component data
│   ├── molecules/    # Data for molecular components
│   │   ├── card.json     # Card component data
│   │   └── form.json     # Form component data
│   ├── organisms/    # Data for organism components
│   │   ├── section.json  # Section component data
│   │   └── header.json   # Header component data
│   ├── core/         # Core data files
│   │   └── site.json     # Global site configuration
├── _includes/        # Component templates
│   ├── 00-core/      # Base templates
│   │   ├── base.njk  # HTML base template
│   │   ├── header.njk
│   │   └── footer.njk
│   ├── 01-organisms/ # Page sections
│   │   └── sections/ # Complete sections like hero, featured, about
│   ├── 02-molecules/ # Composite components (made from atoms)
│   │   ├── cards/    # Card components
│   │   ├── forms/    # Form groups
│   └── 03-atoms/     # Basic components (buttons, inputs, icons)

├── admin/            # Decap CMS configuration
├── assets/           # Static assets
│   ├── images/
│   └── svg/
├── blog/             # Blog content
├── js/               # JavaScript files
│   └── components/   # Component-specific scripts
├── stories/          # Storybook stories
│   ├── atoms/        # Stories for atomic components
│   ├── molecules/    # Stories for molecule components
│   └── organisms/    # Stories for organism components
├── input.css         # Main TailwindCSS file
└── *.njk             # Page templates
```

## Component Architecture (OMA)

### 1. Organisms (01-organisms)

Organisms are complex, self-contained sections that group molecules and atoms.

**Examples:**

- Hero sections
- Featured content sections
- Contact forms
- Page-level sections

### 2. Molecules (02-molecules)

Molecules are groups of atoms that function together.

**Examples:**

- Cards
- Form groups
- Alert messages
- Navigation menus

### 3. Atoms (03-atoms)

Atoms are the smallest components that cannot be further broken down.

**Examples:**

- Buttons
- Form inputs
- Icons
- Links

## Data Structure

The framework now uses a more granular approach with one data file per component:

### Component Data Files (`_data/atoms/`, `_data/molecules/`, `_data/organisms/`)

Each component has its own JSON file containing both the component structure and instances.

**Example (`_data/atoms/link.json`):**

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

## Component Templates

Templates use Nunjucks macros for reusability and reference the specific component data file.

```njk
{% macro renderLink(link) %}
<a href="{{ link.url }}" class="{{ link.variants[link.variant] }}">
  {{ link.label }}
</a>
{% endmacro %}
```

## Storybook Integration

- Each component has a `.stories.js` file
- Stories import the specific component data file
- Stories demonstrate different variants and instances

```javascript
import linkData from '../../_data/atoms/links.json';

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
```

## Styling with TailwindCSS

- Uses a single `input.css` file
- TailwindCSS classes defined in component data files
- No additional CSS files needed

## Documentation

- Architecture overview
- Component creation guide
- Integration with Decap CMS

---
This updated structure ensures **scalability, maintainability, and consistency** throughout the project while providing better organization with a one-file-per-component approach.
