# HAT Dynamic Template - Architecture Documentation

## Overview

HAT Dynamic Template is a modular front-end development framework built on Eleventy, Nunjucks, and TailwindCSS. It follows a custom OMA structure (Organisms, Molecules, Atoms) to create consistent and maintainable web components.

## Directory Structure

```sh
src/
├── _data/            # Data files for templates
│   ├── contents/     # Content-related data (multiple instances per file)
│   │   ├── atoms/    # Content data for atomic components
│   │   ├── molecules/ # Content data for molecular components
│   │   ├── organisms/ # Content data for organism components
│   ├── styles/       # Style-related data (one file per category)
│   │   ├── atoms.json      # Styles for atoms
│   │   ├── molecules.json  # Styles for molecules
│   │   ├── organisms.json  # Styles for organisms
│   └── site.json     # Global site configuration
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

The framework separates content from presentation:

### Content Data (`_data/contents/`)

Contains actual component data, stored as arrays to allow multiple instances.

**Example (`contents/atoms/buttons.json`):**

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

### Style Data (`_data/styles/`)

Contains style-specific data grouped by component type.

**Example (`styles/atoms.json`):**

```json
{
  "button": {
    "primary": "bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600",
    "secondary": "bg-gray-200 text-black px-4 py-2 rounded-lg"
  }
}
```

## Component Templates

Templates use Nunjucks macros for reusability.

```njk
{% macro renderButton(button) %}
<a href="{{ button.url }}" class="{{ styles.atoms.button[button.style] }}">
  {{ button.label }}
</a>
{% endmacro %}
```

## Storybook Integration

- Each component has a `.stories.js` file
- Stories demonstrate different variants and usage examples

## Styling with TailwindCSS

- Uses a single `input.css` file
- TailwindCSS classes define component styles
- No additional CSS files needed

## Documentation

- Architecture overview
- Component creation guide
- Integration with Decap CMS

---
This structure ensures **scalability, maintainability, and consistency** throughout the project.
