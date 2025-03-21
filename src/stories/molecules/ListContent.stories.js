// src/stories/molecules/list-content.stories.js
import nunjucks from 'nunjucks';
import list-contentsData from '../../_data/molecules/list-contents.json';

export default {
  title: 'Molecules/list-content',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = list-contentsData.globalStyle;
    const variantStyle = list-contentsData.variants[args.style];
    
    const list-contentTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return list-contentTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the list-content',
      control: 'text',
      defaultValue: 'list-content' 
    },
    style: { 
      description: 'Visual style of the list-content',
      control: { 
        type: 'select', 
        options: Object.keys(list-contentsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from list-contents.json
export const Example1 = {
  args: {
    text: list-contentsData.list-contents[0].text,
    style: list-contentsData.list-contents[0].style
  }
};

export const Example2 = {
  args: {
    text: list-contentsData.list-contents[1].text,
    style: list-contentsData.list-contents[1].style
  }
};

export const Default = {
  args: {
    text: 'Default list-content',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary list-content',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary list-content',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/list-content.njk" import renderlist-content %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific list-content by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlist-content({ 
  name: "example_list-content1", 
  datas: molecules.list-contents 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all list-contents:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for list-content in molecules.list-contents.list-contents %}
  {{ renderlist-content({ 
    name: list-content.name, 
    datas: molecules.list-contents 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom list-content directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlist-content({
  text: 'Custom list-content', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(list-contentsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new list-content:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "list-contents": [
    {
      "name": "new_list-content_name",
      "text": "New list-content Text",
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