/**
 * Enhanced Component Generator for HAT Dynamic Template
 * 
 * This script generates component files following the OMA architecture:
 * 1. Component template (.njk)
 * 2. Content data (.json)
 * 3. Style data (.json)
 * 4. Storybook documentation (.stories.js)
 * 
 * Usage: node src/js/generate-component.js <componentName> [componentType=atoms]
 * 
 * Example: node src/js/generate-component.js Button
 * Example: node src/js/generate-component.js Card molecules
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import readline from 'readline';

// Convert the file URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORRECTION: Get the project root by going up two levels from the script location
const projectRoot = path.resolve(__dirname, "../../");

// Debug information to verify paths
console.log("Script location:", __dirname);
console.log("Project root detected as:", projectRoot);

// Get the component name and type from command line arguments
const componentName = process.argv[2];
const componentNameKebab = componentName ? kebabCase(componentName) : null;
const componentType = process.argv[3] || "atoms"; // Default to atoms if not specified

// Exit if component name is not provided
if (!componentName) {
    console.error("❌ Please provide a component name.");
    console.log("Usage: node src/js/generate-component.js <componentName> [componentType=atoms]");
    process.exit(1);
}

// Configuration
const config = {
    // Base paths - CORRECTION: Use projectRoot instead of a relative path
    basePath: projectRoot,
    
    // Specific paths
    paths: {
        atoms: "03-atoms",
        molecules: "02-molecules",
        organisms: "01-organisms",
        core: "00-core"
    },
    
    // Directory structure
    directories: {
        includes: "src/_includes",
        data: "src/_data",
        contents: "contents",
        styles: "styles",
        stories: "src/stories"
    }
};

// Define paths for the generated files
const componentPrefix = config.paths[componentType] || config.paths.atoms;
const includesPath = path.join(config.basePath, config.directories.includes, componentPrefix);
const contentsPath = path.join(config.basePath, config.directories.data, config.directories.contents, componentType);
const stylesPath = path.join(config.basePath, config.directories.data, config.directories.styles, componentType);
const storiesPath = path.join(config.basePath, config.directories.stories, componentType);

// Log paths for verification
console.log("\nPaths for component generation:");
console.log("Component template:", includesPath);
console.log("Content data:", contentsPath);
console.log("Style data:", stylesPath);
console.log("Storybook file:", storiesPath);

// Define file names
const componentFile = path.join(includesPath, `${componentNameKebab}.njk`);
const contentFile = path.join(contentsPath, `${pluralize(componentNameKebab)}.json`);
const styleFile = path.join(stylesPath, `${componentNameKebab}.json`);
const storyFile = path.join(storiesPath, `${pascalCase(componentName)}.stories.js`);

// Ensure directories exist
[includesPath, contentsPath, stylesPath, storiesPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
});

// Generate files
generateComponentFile(componentFile, componentName, componentNameKebab);
generateContentFile(contentFile, componentName, componentNameKebab);
generateStyleFile(styleFile, componentName, componentNameKebab);
generateStoryFile(storyFile, componentName, componentNameKebab, componentType);

console.log(`
🎉 Component "${componentName}" successfully generated!

Generated files:
1. Component: ${componentFile}
2. Content Data: ${contentFile}
3. Style Data: ${styleFile}
4. Storybook: ${storyFile}

Next steps:
- Customize the component's HTML structure in the .njk file
- Add specific styles in the style JSON file
- Define content variants in the content JSON file
- Enhance the Storybook documentation with examples

Happy coding! 🚀
`);

/**
 * Generate the Nunjucks component file
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 */
function generateComponentFile(filePath, name, nameKebab) {
    const content = `<!-- ========================= -->
<!--         ${name.toUpperCase().padEnd(14, ' ')} -->
<!-- ========================= -->

{% macro render${name}(option) %}
  {# Get ${nameKebab} options with default values if not provided #}
  {% set text = option.text | default('${name}') %}
  {% set variant = option.variant | default(${nameKebab}.defaultProps.variant) %}
  
  {# Find the variant in the ${nameKebab}.json file #}
  {% set selectedVariant = null %}
  {% for v in ${nameKebab}.variants %}
    {% if v.name == variant %}
      {% set selectedVariant = v %}
    {% endif %}
  {% endfor %}
  
  {# Use default variant if specified variant was not found #}
  {% if not selectedVariant %}
    {% for v in ${nameKebab}.variants %}
      {% if v.name == ${nameKebab}.defaultProps.variant %}
        {% set selectedVariant = v %}
      {% endif %}
    {% endfor %}
  {% endif %}
  
  {# Render the component with appropriate classes #}
  <div class="${nameKebab} {{ selectedVariant.class }}">
    {{ text }}
  </div>
{% endmacro %}

<!-- ========================= -->
<!-- HOW TO USE THIS COMPONENT -->
<!-- ========================= -->

<!--
  Complete documentation in Storybook
  Basic usage: {% from "${componentPrefix}/${nameKebab}.njk" import render${name} %}
              {{ render${name}(${pluralize(nameKebab)}.${nameKebab}_data.default_${nameKebab}) }}
  With style: {{ render${name}({ text: "Custom ${name}", variant: "primary" }) }}
-->`;

    createFile(filePath, content);
}

/**
 * Generate the content JSON file
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 */
function generateContentFile(filePath, name, nameKebab) {
    const contentObject = {
        component: nameKebab,
        summary: `A reusable ${nameKebab} component for the website`,
        params: [
            { 
                name: "text", 
                type: "string", 
                required: true, 
                notes: `Main text for the ${nameKebab}` 
            },
            { 
                name: "variant", 
                type: "string", 
                required: false, 
                notes: "Visual style variant" 
            }
        ],
        [`${nameKebab}_data`]: {
            [`default_${nameKebab}`]: {
                name: "default",
                text: `Default ${name}`,
                variant: "default"
            },
            [`primary_${nameKebab}`]: {
                name: "primary",
                text: `Primary ${name}`,
                variant: "primary"
            },
            [`secondary_${nameKebab}`]: {
                name: "secondary",
                text: `Secondary ${name}`,
                variant: "secondary"
            }
        }
    };

    createFile(filePath, JSON.stringify(contentObject, null, 2));
}

/**
 * Generate the style JSON file
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 */
function generateStyleFile(filePath, name, nameKebab) {
    const styleObject = {
        name: name,
        description: `${name} component with multiple style variants`,
        variants: [
            {
                name: "default",
                class: `${nameKebab}--default text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2`
            },
            {
                name: "primary",
                class: `${nameKebab}--primary text-white bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 p-2`
            },
            {
                name: "secondary",
                class: `${nameKebab}--secondary text-gray-800 bg-gray-100 border border-gray-200 rounded-md shadow-sm hover:bg-gray-200 p-2`
            }
        ],
        defaultProps: {
            variant: "default"
        },
        accessibility: {
            roles: [nameKebab],
            keyboardInteractions: []
        }
    };

    createFile(filePath, JSON.stringify(styleObject, null, 2));
}

/**
 * Generate the Storybook story file
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 * @param {string} componentType
 */
function generateStoryFile(filePath, name, nameKebab, componentType) {
    const capitalizedType = capitalizeFirstLetter(componentType);
    const content = `// src/stories/${componentType}/${name}.stories.js
import nunjucks from 'nunjucks';
import ${nameKebab}Data from '../../_data/styles/${componentType}/${nameKebab}.json';
import ${pluralize(nameKebab)}Data from '../../_data/contents/${componentType}/${pluralize(nameKebab)}.json';

// Nunjucks template for rendering ${pluralize(nameKebab)}
const ${nameKebab}Template = \`
  <div class="${nameKebab} \$\{variantClass\}">
    \$\{text\}
  </div>
\`;

// Helper function to get variant-specific CSS classes
function getVariantClass(variant) {
  const foundVariant = ${nameKebab}Data.variants.find(v => v.name === variant);
  return foundVariant ? foundVariant.class : '';
}

export default {
  title: '${capitalizedType}/${name}',
  tags: ['autodocs'],
  
  // Render function using Nunjucks
  render: (args) => {
    return nunjucks.renderString(${nameKebab}Template, {
      text: args.text,
      variant: args.variant,
      variantClass: getVariantClass(args.variant)
    });
  },
  
  // Argument types for Storybook controls
  argTypes: {
    text: { 
      description: 'Main content text',
      control: 'text',
      defaultValue: 'Default ${name}' 
    },
    variant: { 
      description: 'Visual style of the ${nameKebab}',
      control: { 
        type: 'select', 
        options: ${nameKebab}Data.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from ${pluralize(nameKebab)}.json
const ${nameKebab}Examples = ${pluralize(nameKebab)}Data.${nameKebab}_data;

export const Default = {
  args: {
    text: ${nameKebab}Examples.default_${nameKebab}.text,
    variant: ${nameKebab}Examples.default_${nameKebab}.variant
  }
};

export const Primary = {
  args: {
    text: ${nameKebab}Examples.primary_${nameKebab}.text,
    variant: ${nameKebab}Examples.primary_${nameKebab}.variant
  }
};

export const Secondary = {
  args: {
    text: ${nameKebab}Examples.secondary_${nameKebab}.text,
    variant: ${nameKebab}Examples.secondary_${nameKebab}.variant
  }
};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = \`
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "${componentPrefix}/${nameKebab}.njk" import render${name} %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ render${name}(${pluralize(nameKebab)}.${nameKebab}_data.default_${nameKebab}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom variant directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ render${name}({
  text: "Custom ${name}", 
  variant: "primary"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/${componentType}/${pluralize(nameKebab)}.json</code></li>
          <li>Styles: <code>src/_data/styles/${componentType}/${nameKebab}.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <h4 class="font-semibold mb-2">Add content to ${pluralize(nameKebab)}.json:</h4>
          <pre><code class="text-sm text-gray-900">"${nameKebab}_data": {
  "your_new_${nameKebab}": {
    "name": "unique_name",
    "text": "Your ${nameKebab} text",
    "variant": "default"
  }
}</code></pre>
          
          <h4 class="font-semibold mt-4 mb-2">Add style to ${nameKebab}.json:</h4>
          <pre><code class="text-sm text-gray-900">"variants": [
  {
    "name": "your_new_variant",
    "class": "${nameKebab}--custom bg-purple-100 text-purple-800"
  }
]</code></pre>
        </div>
      </div>
    </div>
  \`;
  
  return usageGuide;
};

Usage.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
  docs: {
    source: {
      code: null
    }
  }
};`;

    createFile(filePath, content);
}

/**
 * Create a file if it doesn't exist
 * @param {string} filePath 
 * @param {string} content 
 */
function createFile(filePath, content) {
    // Check if the file already exists
    const exists = fs.existsSync(filePath);
    
    if (exists) {
        console.warn(`⚠️ File already exists: ${filePath}`);
        
        // Create readline interface
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        // Ask for confirmation to overwrite
        rl.question(`Do you want to overwrite it? (y/N) `, answer => {
            if (answer.toLowerCase() === 'y') {
                fs.writeFileSync(filePath, content, "utf8");
                console.log(`✅ Overwritten: ${filePath}`);
            } else {
                console.log(`⏭️ Skipped: ${filePath}`);
            }
            
            rl.close();
        });
    } else {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`✅ Created: ${filePath}`);
    }
}

/**
 * Convert a string to kebab-case
 * @param {string} str 
 * @returns {string}
 */
function kebabCase(str) {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}

/**
 * Convert a string to PascalCase
 * @param {string} str 
 * @returns {string}
 */
function pascalCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '')
        .replace(/^./, s => s.toUpperCase());
}

/**
 * Convert a string to plural form (simplified)
 * @param {string} str 
 * @returns {string}
 */
function pluralize(str) {
    // This is a very simplified pluralization
    return str + 's';
}

/**
 * Capitalize the first letter of a string
 * @param {string} str 
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}