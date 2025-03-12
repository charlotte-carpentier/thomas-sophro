# HAT Components Structure

This document explains the organization of components in the HAT Dynamic Template project according to the OMA (Organism-Molecule-Atom) architecture.

## Overview

Each component consists of several files distributed across different directories:

1. **Nunjucks Component** (`.njk`) - The component template
2. **Styles** (`.json`) - Component variants and styles
3. **Content** (`.json`) - Content data for the component
4. **Storybook Documentation** (`.stories.js`) - Component tests and documentation

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
│   │   │   ├── atoms/
│   │   │   │   └── atom-name.json
│   │   │   ├── molecules/
│   │   │   │   └── molecule-name.json
│   │   │   └── organisms/
│   │   │       └── organism-name.json
│   │   └── contents/
│   │       ├── atoms/
│   │       │   └── atom-names.json (plural)
│   │       ├── molecules/
│   │       │   └── molecule-names.json (plural)
│   │       └── organisms/
│   │           └── organism-names.json (plural)
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

**Example** (`src/_includes/03-atoms/button.njk`):

```njk
<!-- ========================= -->
<!--           BUTTON         -->
<!-- ========================= -->

{% macro renderButton(option) %}
  {# Get button options with default values if not provided #}
  {% set href = option.href | default('#') %}
  {% set text = option.text | default('Button') %}
  {% set variant = option.variant | default(button.defaultProps.variant) %}
  
  <button 
    class="btn btn--{{ variant }} {{ button.variants[variant].class }}"
  >
    {{ text }}
  </button>
{% endmacro %}

<!-- ========================= -->
<!-- HOW TO USE THIS COMPONENT -->
<!-- ========================= -->

<!--
  Basic usage: {% from "03-atoms/button.njk" import renderButton %}
              {{ renderButton(buttons.button_data.primary_button) }}
-->
```

### 2. Styles (`.json`)

This file defines the different variants and styles of the component.

**Example** (`src/_data/styles/atoms/button.json`):

```json
{
  "name": "Button",
  "description": "Interactive button component with multiple style variants",
  "variants": [
    {
      "name": "primary",
      "class": "bg-black hover:bg-white text-white hover:text-black border border-current"
    },
    {
      "name": "secondary",
      "class": "bg-white hover:bg-gray-100 text-black border border-current"
    }
  ],
  "defaultProps": {
    "variant": "primary"
  },
  "accessibility": {
    "roles": ["button"],
    "keyboardInteractions": ["Enter", "Space"]
  }
}
```

### 3. Content (`.json`)

This file stores content data for the component.

**Example** (`src/_data/contents/atoms/buttons.json`):

```json
{
  "component": "button",
  "summary": "An interactive button for user actions",
  "button_data": {
    "primary_button": {
      "text": "Get Started",
      "variant": "primary"
    },
    "secondary_button": {
      "text": "Learn More",
      "variant": "secondary"
    }
  }
}
```

### 4. Storybook Documentation (`.stories.js`)

This file defines the component tests and documentation in Storybook.

**Example** (`stories/atoms/Button.stories.js`):

```javascript
// stories/atoms/Button.stories.js
import nunjucks from 'nunjucks';
import buttonData from '../../_data/styles/atoms/button.json';
import buttonsData from '../../_data/contents/atoms/buttons.json';

// Nunjucks template for rendering buttons
const buttonTemplate = `
  <button 
    class="btn btn--{{ variant }} {{ variantClass }}"
  >
    {{ text }}
  </button>
`;

export default {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  
  render: (args) => {
    return nunjucks.renderString(buttonTemplate, {
      text: args.text,
      variant: args.variant,
      variantClass: buttonData.variants.find(v => v.name === args.variant)?.class || ''
    });
  },
  
  argTypes: {
    text: { 
      description: 'Button text content',
      control: 'text',
      defaultValue: 'Button' 
    },
    variant: { 
      description: 'Visual style of the button',
      control: { 
        type: 'select', 
        options: buttonData.variants.map(v => v.name)
      },
      defaultValue: 'primary'
    }
  }
};

// Using examples from buttons.json
export const Primary = {
  args: {
    text: buttonsData.button_data.primary_button.text,
    variant: buttonsData.button_data.primary_button.variant
  }
};

export const Secondary = {
  args: {
    text: buttonsData.button_data.secondary_button.text,
    variant: buttonsData.button_data.secondary_button.variant
  }
};

// Add a Usage guide
export const Usage = () => {
  // Documentation component here...
};
```

## Naming Conventions

HAT Dynamic Template uses specific naming conventions for different file types and code elements:

| Type | Format | Example | Use Case |
|------|--------|---------|----------|
| Component Names | PascalCase | `ButtonLink` | For component identifiers and macro names |
| File Names | kebab-case | `button-link.njk` | For component files, except Stories |
| Content Files | kebab-case (plural) | `button-links.json` | For content data files |
| Style Files | kebab-case | `button-link.json` | For style data files |
| Story Files | PascalCase | `ButtonLink.stories.js` | For Storybook files |
| JSON Properties | snake_case | `button_link_data` | For JSON property names |
| HTML Classes | kebab-case | `button-link--primary` | For CSS class names |

### Multi-word Component Names

For components with multiple words (e.g., "Button Link"), the generator converts:

- **PascalCase** → `ButtonLink` (for component names, macros, Story files)
- **kebab-case** → `button-link` (for file names, HTML classes)
- **snake_case** → `button_link` (for JSON properties)
- **camelCase** → `buttonLink` (for JavaScript variables)

This ensures compatibility with both JavaScript and templating systems while maintaining consistent naming across the codebase.

## Creating a New Component

There are two ways to create a new component in the HAT Dynamic Template:

1. **Manual Creation**: Create all four required files following the OMA architecture
2. **Using the Component Generator**: Automatically generate all component files

### Manual Component Creation

To create a new component manually, you need to create these four files in their respective directories, following the OMA architecture and naming conventions.

### Using the Component Generator

The HAT Component Generator is a utility script that automates the creation of all necessary component files.

#### Location

The component generator script is located at:
```
src/js/generate-component.js
```

#### Usage

**Basic usage - Create an Atom component**

```bash
node src/js/generate-component.js Button
```

**Create a multi-word component**

You can use either PascalCase or quoted strings for multi-word components:

```bash
# Option 1: PascalCase (recommended)
node src/js/generate-component.js ButtonLink

# Option 2: Quoted string
node src/js/generate-component.js "Button Link"
```

**Create other component types**

```bash
# Create a Molecule component
node src/js/generate-component.js Card molecules

# Create an Organism component
node src/js/generate-component.js Hero organisms
```

#### Generated Files

For a component named "ButtonLink", the script will generate:

| File | Location | Format | Example |
|------|----------|--------|---------|
| Component template | `src/_includes/03-atoms/` | kebab-case | `button-link.njk` |
| Content data | `src/_data/contents/atoms/` | kebab-case (plural) | `button-links.json` |
| Style data | `src/_data/styles/atoms/` | kebab-case | `button-link.json` |
| Storybook docs | `src/stories/atoms/` | PascalCase | `ButtonLink.stories.js` |

#### JSON Property Naming

The component generator uses snake_case for JSON property names to ensure compatibility with JavaScript access patterns:

```json
{
  "component": "button-link",
  "button_link_data": {
    "default_button_link": {
      "name": "default",
      "text": "Default Button Link",
      "variant": "default"
    }
  }
}
```

This approach avoids problems that can occur when accessing properties with hyphens in JavaScript.

#### Next Steps After Generation

After generating a component:

1. Customize the HTML structure in the `.njk` file
2. Modify styles in the style JSON file
3. Add or adjust content variants in the content JSON file
4. Enhance the Storybook documentation with more examples

## Using a Component

To use a component in a template, import the Nunjucks macro and use it with the appropriate content data:

```njk
{% from "03-atoms/button.njk" import renderButton %}
{{ renderButton(buttons.button_data.primary_button) }}
```

## Modifying an Existing Component

To modify an existing component, update the corresponding files:

1. Modify the HTML structure in the `.njk` file
2. Add/modify styles in the styles JSON file
3. Add/modify data in the content JSON file
4. Update documentation in the `.stories.js` file

### Modifying the Component Template

When modifying a component's template (`.njk` file), consider the following best practices:

- Keep the macro parameters consistent with existing usage
- Include default values for all parameters to ensure backward compatibility
- Add comments to explain any complex logic
- Update the usage examples at the bottom of the file

### Adding New Variants

To add a new variant to an existing component:

1. Add the variant to the style JSON file:

```json
{
  "variants": [
    // Existing variants...
    {
      "name": "new-variant",
      "class": "component-name--new-variant bg-purple-100 text-purple-800"
    }
  ]
}
```

2. Add content examples to the content JSON file:

```json
{
  "component_name_data": {
    // Existing data...
    "new_variant_component_name": {
      "name": "new-variant",
      "text": "New Variant Component",
      "variant": "new-variant"
    }
  }
}
```

3. Add an example to the Storybook file:

```javascript
export const NewVariant = {
  args: {
    text: componentNameExamples.new_variant_component_name.text,
    variant: componentNameExamples.new_variant_component_name.variant
  }
};
```

## Common Issues and Troubleshooting

### Path Resolution

If you encounter issues with file paths when running the component generator, ensure:

- You're running the command from the project root directory
- The script is properly detecting the project root path
- Directory paths in the configuration match your project structure

### JSON Property Access

When working with multi-word component names, remember:

- Use snake_case in JSON property names (`button_link_data`) rather than kebab-case (`button-link-data`)
- This ensures properties can be accessed in JavaScript using dot notation:

  ```javascript
  // Good - Works with snake_case
  data.button_link_data.default_button_link
  
  // Bad - Doesn't work with kebab-case
  data.button-link-data.default-button-link  // JavaScript syntax error!
  ```

### Component Naming Requirements

When creating new components:

- Component names should be descriptive and follow a noun or noun-adjective format
- Avoid generic names that might conflict with HTML elements
- For multi-word names, ensure consistent casing when running the generator

## Best Practices

### Component Creation

- Group related components into logical categories
- Prefer small, reusable components over large, specific ones
- Consider accessibility from the start (include ARIA attributes)
- Include all possible states (hover, focus, active, disabled)

### Naming Conventions

- Be consistent with the established naming patterns
- Use descriptive, semantic names that reflect the component's purpose
- Avoid abbreviations unless they are widely understood

### Documentation

- Keep the component usage examples up-to-date
- Include basic accessibility information
- Document any non-obvious behaviors or requirements

## Further Resources

- [Nunjucks Documentation](https://mozilla.github.io/nunjucks/templating.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Storybook Documentation](https://storybook.js.org/docs)
- [JSON Standards](https://www.json.org/json-en.html)
