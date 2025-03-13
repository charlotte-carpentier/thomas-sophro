/**
 * Enhanced Component Generator for HAT Dynamic Template
 * 
 * This script generates component files following the OMA architecture:
 * 1. Component template (.njk)
 * 2. Content data as array (.json)
 * 3. Updates centralized style data (.json)
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

// Get the project root by going up two levels from the script location
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
    // Base paths
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
const stylesPath = path.join(config.basePath, config.directories.data, config.directories.styles);
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
const styleFile = path.join(stylesPath, `${componentType}.json`);
const storyFile = path.join(storiesPath, `${pascalCase(componentName)}.stories.js`);

// Ensure directories exist
[includesPath, contentsPath, stylesPath, storiesPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
});

// Generate files
generateComponentFile(componentFile, componentName, componentNameKebab, componentType);
generateContentFile(contentFile, componentName, componentNameKebab);
updateStyleFile(styleFile, componentName, componentNameKebab);
generateStoryFile(storyFile, componentName, componentNameKebab, componentType);

console.log(`
🎉 Component "${componentName}" successfully generated!

Generated files:
1. Component: ${componentFile}
2. Content Data: ${contentFile}
3. Updated Style Data: ${styleFile}
4. Storybook: ${storyFile}

Next steps:
- Customize the component's HTML structure in the .njk file
- Update specific styles in the ${componentType}.json file
- Add more items in the content JSON array
- Enhance the Storybook documentation with examples

Happy coding! 🚀
`);

/**
 * Generate the Nunjucks component file
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 * @param {string} componentType
 */
function generateComponentFile(filePath, name, nameKebab, componentType) {
    const content = `<!-- ========================= -->
<!--         ${name.toUpperCase().padEnd(14, ' ')} -->
<!-- ========================= -->

{% macro render${name}(item) %}
  {# Get ${nameKebab} options with default values if not provided #}
  {% set label = item.label | default('${name}') %}
  {% set id = item.id | default('default-${nameKebab}') %}
  {% set style = item.style | default('default') %}
  
  {# Check if styles object exists #}
  {% if styles.${componentType}.${nameKebab} %}
    {# Get style classes from the centralized styles file #}
    {% set styleClasses = styles.${componentType}.${nameKebab}[style] %}
  {% else %}
    {# Fallback classes if style not found #}
    {% set styleClasses = "bg-gray-200 text-gray-800 p-2 rounded" %}
  {% endif %}
  
  {# Render the component with appropriate classes #}
  <div id="{{ id }}" class="${nameKebab} {{ styleClasses }}">
    {{ label }}
  </div>
{% endmacro %}

<!-- ========================= -->
<!-- HOW TO USE THIS COMPONENT -->
<!-- ========================= -->

<!--
  Complete documentation in Storybook
  
  Basic usage with data:
  {% from "${componentPrefix}/${nameKebab}.njk" import render${name} %}
  
  {# Single item usage #}
  {% set item = contents.${componentType}.${pluralize(nameKebab)}[0] %}
  {{ render${name}(item) }}
  
  {# Loop through all items #}
  {% for item in contents.${componentType}.${pluralize(nameKebab)} %}
    {{ render${name}(item) }}
  {% endfor %}
  
  {# Custom item #}
  {{ render${name}({
    label: "Custom ${name}",
    id: "custom-${nameKebab}",
    style: "primary"
  }) }}
-->`;

    createFile(filePath, content);
}

/**
 * Generate the content JSON file as an array
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 */
function generateContentFile(filePath, name, nameKebab) {
    const contentArray = [
        {
            id: `default-${nameKebab}`,
            label: `Default ${name}`,
            style: "default",
            description: `A default ${nameKebab} component`
        },
        {
            id: `primary-${nameKebab}`,
            label: `Primary ${name}`,
            style: "primary",
            description: `A primary ${nameKebab} component with emphasis`
        },
        {
            id: `secondary-${nameKebab}`,
            label: `Secondary ${name}`,
            style: "secondary",
            description: `A secondary ${nameKebab} component for less important actions`
        }
    ];

    createFile(filePath, JSON.stringify(contentArray, null, 2));
}

/**
 * Update the centralized style file for the component type
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 */
function updateStyleFile(filePath, name, nameKebab) {
    let styleData = {};

    // Load existing style file if exists
    if (fs.existsSync(filePath)) {
        try {
            styleData = JSON.parse(fs.readFileSync(filePath, "utf8"));
        } catch (error) {
            console.warn(`⚠️ Error parsing existing style file. Creating new: ${error.message}`);
        }
    }

    // Add styles for new component if not exists
    if (!styleData[nameKebab]) {
        styleData[nameKebab] = {
            "default": "text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2",
            "primary": "text-white bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 p-2",
            "secondary": "text-gray-800 bg-gray-100 border border-gray-200 rounded-md shadow-sm hover:bg-gray-200 p-2"
        };

        createFile(filePath, JSON.stringify(styleData, null, 2));
        console.log(`✅ Updated: ${filePath} (added ${nameKebab})`);
    } else {
        console.log(`⚠️ Style for ${nameKebab} already exists in ${filePath}`);
    }
}

/**
 * Generate the Storybook story file for the new component structure
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 * @param {string} componentType
 */
function generateStoryFile(filePath, name, nameKebab, componentType) {
    const capitalizedType = capitalizeFirstLetter(componentType);
    const content = `// src/stories/${componentType}/${name}.stories.js
import nunjucks from 'nunjucks';
import stylesData from '../../_data/styles/${componentType}.json';
import contentData from '../../_data/contents/${componentType}/${pluralize(nameKebab)}.json';

// Nunjucks template for rendering the component
const ${nameKebab}Template = \`
  <div id="\$\{id\}" class="${nameKebab} \$\{styleClasses\}">
    \$\{label\}
  </div>
\`;

// Helper function to get style classes based on style name
function getStyleClasses(style = 'default') {
  return stylesData && stylesData.${nameKebab} && stylesData.${nameKebab}[style] 
    ? stylesData.${nameKebab}[style] 
    : "bg-gray-200 text-gray-800 p-2 rounded";
}

export default {
  title: '${capitalizedType}/${name}',
  tags: ['autodocs'],
  
  // Render function using Nunjucks
  render: (args) => {
    return nunjucks.renderString(${nameKebab}Template, {
      id: args.id || \`story-${nameKebab}-\${Date.now()}\`,
      label: args.label,
      styleClasses: getStyleClasses(args.style)
    });
  },
  
  // Argument types for Storybook controls
  argTypes: {
    id: { 
      description: 'Unique identifier',
      control: 'text'
    },
    label: { 
      description: 'Component text content',
      control: 'text',
      defaultValue: 'Default ${name}' 
    },
    style: { 
      description: 'Visual style of the ${nameKebab}',
      control: { 
        type: 'select', 
        options: stylesData && stylesData.${nameKebab} 
          ? Object.keys(stylesData.${nameKebab}) 
          : ['default', 'primary', 'secondary']
      },
      defaultValue: 'default'
    }
  }
};

// Create story examples from the content data
export const Default = {
  args: contentData && contentData.length > 0 
    ? {
        id: contentData[0].id,
        label: contentData[0].label,
        style: contentData[0].style
      }
    : {
        id: 'default-${nameKebab}',
        label: 'Default ${name}',
        style: 'default'
      }
};

export const Primary = {
  args: contentData && contentData.length > 1
    ? {
        id: contentData[1].id,
        label: contentData[1].label,
        style: contentData[1].style
      }
    : {
        id: 'primary-${nameKebab}',
        label: 'Primary ${name}',
        style: 'primary'
      }
};

export const Secondary = {
  args: contentData && contentData.length > 2
    ? {
        id: contentData[2].id,
        label: contentData[2].label,
        style: contentData[2].style
      }
    : {
        id: 'secondary-${nameKebab}',
        label: 'Secondary ${name}',
        style: 'secondary'
      }
};

// Usage guide reflecting the new structure
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
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Use with a single content item:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% set item = contents.${componentType}.${pluralize(nameKebab)}[0] %}
{{ render${name}(item) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all content items:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for item in contents.${componentType}.${pluralize(nameKebab)} %}
  {{ render${name}(item) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use with custom properties:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ render${name}({
  label: "Custom ${name}",
  id: "custom-${nameKebab}",
  style: "primary"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available files and structure:</h3>
        <p class="text-gray-600 mb-3">Updated component architecture:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Component template: <code>src/_includes/${componentPrefix}/${nameKebab}.njk</code></li>
          <li>Content data (array): <code>src/_data/contents/${componentType}/${pluralize(nameKebab)}.json</code></li>
          <li>Centralized styles: <code>src/_data/styles/${componentType}.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Content JSON Structure:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <pre><code class="text-sm text-gray-900">[
  {
    "id": "unique-id-1",
    "label": "First ${name}",
    "style": "primary",
    "description": "Optional description"
  },
  {
    "id": "unique-id-2",
    "label": "Second ${name}",
    "style": "secondary",
    "description": "Another description"
  }
]</code></pre>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">7. Style Structure in ${componentType}.json:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <pre><code class="text-sm text-gray-900">{
  "${nameKebab}": {
    "default": "text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm p-2",
    "primary": "text-white bg-blue-600 border border-blue-700 rounded-md hover:bg-blue-700 p-2",
    "secondary": "text-gray-800 bg-gray-100 border border-gray-200 hover:bg-gray-200 p-2"
  }
}</code></pre>
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
 * Create a file if it doesn't exist or update it as needed
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