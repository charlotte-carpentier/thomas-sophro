// src/stories/molecules/Disclaimer.stories.js
import nunjucks from 'nunjucks';
import disclaimersData from '../../_data/molecules/disclaimers.json';

export default {
  title: 'Molecules/Disclaimer',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = disclaimersData.globalStyle;
    const variantStyle = disclaimersData.variants[args.style];
    
    const disclaimerTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return disclaimerTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the disclaimer',
      control: 'text',
      defaultValue: 'Disclaimer' 
    },
    style: { 
      description: 'Visual style of the disclaimer',
      control: { 
        type: 'select', 
        options: Object.keys(disclaimersData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from disclaimers.json
export const Example1 = {
  args: {
    text: disclaimersData.disclaimers[0].text,
    style: disclaimersData.disclaimers[0].style
  }
};

export const Example2 = {
  args: {
    text: disclaimersData.disclaimers[1].text,
    style: disclaimersData.disclaimers[1].style
  }
};

export const Default = {
  args: {
    text: 'Default Disclaimer',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary Disclaimer',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary Disclaimer',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/disclaimer.njk" import renderDisclaimer %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific disclaimer by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderDisclaimer({ 
  name: "example_disclaimer1", 
  datas: molecules.disclaimers 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all disclaimers:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for disclaimer in molecules.disclaimers.disclaimers %}
  {{ renderDisclaimer({ 
    name: disclaimer.name, 
    datas: molecules.disclaimers 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom disclaimer directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderDisclaimer({
  text: 'Custom Disclaimer', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(disclaimersData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new disclaimer:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "disclaimers": [
    {
      "name": "new_disclaimer_name",
      "text": "New Disclaimer Text",
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