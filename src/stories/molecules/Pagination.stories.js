// src/stories/molecules/Pagination.stories.js
import nunjucks from 'nunjucks';
import paginationsData from '../../_data/molecules/paginations.json';

export default {
  title: 'Molecules/Pagination',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = paginationsData.globalStyle;
    const variantStyle = paginationsData.variants[args.style];
    
    const paginationTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return paginationTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the pagination',
      control: 'text',
      defaultValue: 'Pagination' 
    },
    style: { 
      description: 'Visual style of the pagination',
      control: { 
        type: 'select', 
        options: Object.keys(paginationsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from paginations.json
export const Example1 = {
  args: {
    text: paginationsData.paginations[0].text,
    style: paginationsData.paginations[0].style
  }
};

export const Example2 = {
  args: {
    text: paginationsData.paginations[1].text,
    style: paginationsData.paginations[1].style
  }
};

export const Default = {
  args: {
    text: 'Default Pagination',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary Pagination',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary Pagination',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/pagination.njk" import renderPagination %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific pagination by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderPagination({ 
  name: "example_pagination1", 
  datas: molecules.paginations 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all paginations:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for pagination in molecules.paginations.paginations %}
  {{ renderPagination({ 
    name: pagination.name, 
    datas: molecules.paginations 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom pagination directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderPagination({
  text: 'Custom Pagination', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(paginationsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new pagination:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "paginations": [
    {
      "name": "new_pagination_name",
      "text": "New Pagination Text",
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