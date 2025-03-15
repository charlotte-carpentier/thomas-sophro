// src/stories/atoms/Checkbox.stories.js
import nunjucks from 'nunjucks';
import checkboxsData from '../../_data/atoms/checkboxs.json';

export default {
  title: 'Atoms/Checkbox',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = checkboxsData.globalStyle;
    const variantStyle = checkboxsData.variants[args.style];
    
    const checkboxTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return checkboxTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the checkbox',
      control: 'text',
      defaultValue: 'Checkbox' 
    },
    style: { 
      description: 'Visual style of the checkbox',
      control: { 
        type: 'select', 
        options: Object.keys(checkboxsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from checkboxs.json
export const Example1 = {
  args: {
    text: checkboxsData.checkboxs[0].text,
    style: checkboxsData.checkboxs[0].style
  }
};

export const Example2 = {
  args: {
    text: checkboxsData.checkboxs[1].text,
    style: checkboxsData.checkboxs[1].style
  }
};

export const Default = {
  args: {
    text: 'Default Checkbox',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary Checkbox',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary Checkbox',
    style: 'secondary'
  }
};

// Usage guide based on the new macro
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/checkbox.njk" import renderCheckbox %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific checkbox by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderCheckbox({ 
  name: "example_checkbox1", 
  datas: atoms.checkboxs 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all checkboxs:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for checkbox in atoms.checkboxs.checkboxs %}
  {{ renderCheckbox({ 
    name: checkbox.name, 
    datas: atoms.checkboxs 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom checkbox directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderCheckbox({
  text: 'Custom Checkbox', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(checkboxsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new checkbox:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "checkboxs": [
    {
      "name": "new_checkbox_name",
      "text": "New Checkbox Text",
      "style": "primary"
    }
  ]
}</code></pre>
      </div>
    </div>
  `;
  
  return usageGuide;
};

Usage.parameters = {
  controls: { hideNoControlsWarning: true, disable: true },
  docs: {
    source: {
      code: null
    }
  }
};