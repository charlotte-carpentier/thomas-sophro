// src/stories/molecules/list-value.stories.js
import nunjucks from 'nunjucks';
import list-valuesData from '../../_data/molecules/list-values.json';

export default {
  title: 'Molecules/list-value',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = list-valuesData.globalStyle;
    const variantStyle = list-valuesData.variants[args.style];
    
    const list-valueTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return list-valueTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the list-value',
      control: 'text',
      defaultValue: 'list-value' 
    },
    style: { 
      description: 'Visual style of the list-value',
      control: { 
        type: 'select', 
        options: Object.keys(list-valuesData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from list-values.json
export const Example1 = {
  args: {
    text: list-valuesData.list-values[0].text,
    style: list-valuesData.list-values[0].style
  }
};

export const Example2 = {
  args: {
    text: list-valuesData.list-values[1].text,
    style: list-valuesData.list-values[1].style
  }
};

export const Default = {
  args: {
    text: 'Default list-value',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary list-value',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary list-value',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/list-value.njk" import renderlist-value %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific list-value by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlist-value({ 
  name: "example_list-value1", 
  datas: molecules.list-values 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all list-values:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for list-value in molecules.list-values.list-values %}
  {{ renderlist-value({ 
    name: list-value.name, 
    datas: molecules.list-values 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom list-value directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlist-value({
  text: 'Custom list-value', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(list-valuesData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new list-value:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "list-values": [
    {
      "name": "new_list-value_name",
      "text": "New list-value Text",
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