/**
 * Enhanced Component Generator for HAT Dynamic Template
 * 
 * This script generates component files following the OMA architecture:
 * 1. Component template (.njk)
 * 2. Component data file (.json) - one file per component
 * 3. Storybook documentation (.stories.js)
 * 
 * Usage: node src/js/tools/generate-component.js <componentName> [componentType=atoms]
 * 
 * Example: node src/js/tools/generate-component.js Button
 * Example: node src/js/tools/generate-component.js Card molecules
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import readline from 'readline';

// Convert the file URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Le script est dans src/js/tools/, donc le projet root est 3 niveaux plus haut
const projectRoot = path.resolve(__dirname, "../../../");

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
    console.log("Usage: node src/js/tools/generate-component.js <componentName> [componentType=atoms]");
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
    }
};

// Define paths for the generated files
const componentPrefix = config.paths[componentType] || config.paths.atoms;
const includesPath = path.join(config.basePath, "src", "_includes", componentPrefix);
const dataPath = path.join(config.basePath, "src", "_data", componentType);
const storiesPath = path.join(config.basePath, "src", "stories", componentType);

// Log paths for verification
console.log("\nPaths for component generation:");
console.log("Component template:", includesPath);
console.log("Component data:", dataPath);
console.log("Storybook file:", storiesPath);

// Define file names
const componentFile = path.join(includesPath, `${componentNameKebab}.njk`);
const dataFile = path.join(dataPath, `${componentNameKebab}s.json`); // Note the plural for data files
const storyFile = path.join(storiesPath, `${pascalCase(componentName)}.stories.js`);

// Ensure directories exist
[includesPath, dataPath, storiesPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
});

// Generate files
generateComponentFile(componentFile, componentName, componentNameKebab, componentType);
generateDataFile(dataFile, componentName, componentNameKebab);
generateStoryFile(storyFile, componentName, componentNameKebab, componentType);

console.log(`
🎉 Component "${componentName}" successfully generated!

Generated files:
1. Component: ${componentFile}
2. Component Data: ${dataFile}
3. Storybook: ${storyFile}

Next steps:
- Customize the component's HTML structure in the .njk file
- Modify variants and instances in the component data file
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
<!--          ${name.toUpperCase().padEnd(14, ' ')} -->
<!-- ========================= -->

{% macro render${name}(options) %}
  {% set ${nameKebab}Data = options.datas.${nameKebab}s | selectattr('name', 'equalto', options.name) | first %}
  {% set globalStyle = options.datas.globalStyle %}
  {% set variantStyle = options.datas.variants[${nameKebab}Data.style] %}
  
  {% if ${nameKebab}Data %}
    <div 
      class="{{ globalStyle }} {{ variantStyle }}"
    >
      {{ ${nameKebab}Data.text }}
    </div>
  {% else %}
    <span class="text-red-500">${name} not found</span>
  {% endif %}
{% endmacro %}


<!-- ============================ -->
<!-- Summon HAT Components Wisely -->
<!-- ============================ -->

<!-- 1. Import the macro at the top of your page -->
{# {% from "${componentPrefix}/${nameKebab}.njk" import render${name} %} #}

<!-- 2. Call a specific ${nameKebab} by its name -->
{# {{ render${name}({ 
    name: "example_${nameKebab}", 
    datas: ${componentType}.${nameKebab}s 
}) }} #}

<!-- 3. Call multiple ${nameKebab}s from the data -->
{# {% for ${nameKebab} in ${componentType}.${nameKebab}s.${nameKebab}s %}
    {{ render${name}({ 
        name: ${nameKebab}.name, 
        datas: ${componentType}.${nameKebab}s 
    }) }}
{% endfor %} #}

<!-- 4. Direct ${nameKebab} creation -->
{# {{ render${name}({
    text: "Custom ${name}", 
    style: "primary"
}) }} #}

<!-- 5. Adding a new ${nameKebab} to ${nameKebab}s.json -->
{# {
  "${nameKebab}s": [
    {
      "name": "new_${nameKebab}_name",
      "text": "Your ${name} Text",
      "style": "primary"
    }
  ]
} #}

<!-- May your bugs be forever exiled to the shadow realm. 🧙‍♂️✨ -->`;

    createFile(filePath, content);
}

/**
 * Generate the component data file
 * @param {string} filePath 
 * @param {string} name 
 * @param {string} nameKebab 
 */
function generateDataFile(filePath, name, nameKebab) {
    const dataObject = {
        "globalStyle": `typography-label-l ${nameKebab}`,
        "variants": {
            "default": "text-gray-800 hover:text-gray-600",
            "primary": "text-blue-600 hover:text-blue-800 font-bold",
            "secondary": "text-gray-500 hover:text-gray-700"
        },
        [`${nameKebab}s`]: [
            {
                "name": `example_${nameKebab}1`,
                "text": `Example ${name} 1`,
                "style": "primary"
            },
            {
                "name": `example_${nameKebab}2`,
                "text": `Example ${name} 2`,
                "style": "secondary"
            }
        ]
    };

    createFile(filePath, JSON.stringify(dataObject, null, 2));
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
import ${nameKebab}sData from '../../_data/${componentType}/${nameKebab}s.json';

export default {
  title: '${capitalizedType}/${name}',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = ${nameKebab}sData.globalStyle;
    const variantStyle = ${nameKebab}sData.variants[args.style];
    
    const ${nameKebab}Template = \`<div class="\${globalStyle} \${variantStyle}">\${args.text}</div>\`;
    return ${nameKebab}Template;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the ${nameKebab}',
      control: 'text',
      defaultValue: '${name}' 
    },
    style: { 
      description: 'Visual style of the ${nameKebab}',
      control: { 
        type: 'select', 
        options: Object.keys(${nameKebab}sData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from ${nameKebab}s.json
export const Example1 = {
  args: {
    text: ${nameKebab}sData.${nameKebab}s[0].text,
    style: ${nameKebab}sData.${nameKebab}s[0].style
  }
};

export const Example2 = {
  args: {
    text: ${nameKebab}sData.${nameKebab}s[1].text,
    style: ${nameKebab}sData.${nameKebab}s[1].style
  }
};

export const Default = {
  args: {
    text: 'Default ${name}',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary ${name}',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary ${name}',
    style: 'secondary'
  }
};

// Usage guide based on the new macro
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
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific ${nameKebab} by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ render${name}({ 
  name: "example_${nameKebab}1", 
  datas: ${componentType}.${nameKebab}s 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all ${nameKebab}s:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for ${nameKebab} in ${componentType}.${nameKebab}s.${nameKebab}s %}
  {{ render${name}({ 
    name: ${nameKebab}.name, 
    datas: ${componentType}.${nameKebab}s 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom ${nameKebab} directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ render${name}({
  text: 'Custom ${name}', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          \$\{Object.entries(${nameKebab}sData.variants).map(([style, className]) => \`
            <li><code>\$\{style\}</code>: \$\{className\}</li>
          \`).join('')\}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new ${nameKebab}:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "${nameKebab}s": [
    {
      "name": "new_${nameKebab}_name",
      "text": "New ${name} Text",
      "style": "primary"
    }
  ]
}</code></pre>
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
 * Capitalize the first letter of a string
 * @param {string} str 
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}