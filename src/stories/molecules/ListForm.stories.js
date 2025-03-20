// src/stories/molecules/list-form.stories.js
import nunjucks from 'nunjucks';
import list-formsData from '../../_data/molecules/list-forms.json';

export default {
  title: 'Molecules/list-form',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = list-formsData.globalStyle;
    const variantStyle = list-formsData.variants[args.style];
    
    const list-formTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return list-formTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the list-form',
      control: 'text',
      defaultValue: 'list-form' 
    },
    style: { 
      description: 'Visual style of the list-form',
      control: { 
        type: 'select', 
        options: Object.keys(list-formsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from list-forms.json
export const Example1 = {
  args: {
    text: list-formsData.list-forms[0].text,
    style: list-formsData.list-forms[0].style
  }
};

export const Example2 = {
  args: {
    text: list-formsData.list-forms[1].text,
    style: list-formsData.list-forms[1].style
  }
};

export const Default = {
  args: {
    text: 'Default list-form',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary list-form',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary list-form',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/list-form.njk" import renderlist-form %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific list-form by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlist-form({ 
  name: "example_list-form1", 
  datas: molecules.list-forms 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all list-forms:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for list-form in molecules.list-forms.list-forms %}
  {{ renderlist-form({ 
    name: list-form.name, 
    datas: molecules.list-forms 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom list-form directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlist-form({
  text: 'Custom list-form', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(list-formsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new list-form:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "list-forms": [
    {
      "name": "new_list-form_name",
      "text": "New list-form Text",
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