// src/stories/organisms/menu.stories.js
import nunjucks from 'nunjucks';
import menusData from '../../_data/organisms/menus.json';

export default {
  title: 'Organisms/menu',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = menusData.globalStyle;
    const variantStyle = menusData.variants[args.style];
    
    const menuTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return menuTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the menu',
      control: 'text',
      defaultValue: 'menu' 
    },
    style: { 
      description: 'Visual style of the menu',
      control: { 
        type: 'select', 
        options: Object.keys(menusData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from menus.json
export const Example1 = {
  args: {
    text: menusData.menus[0].text,
    style: menusData.menus[0].style
  }
};

export const Example2 = {
  args: {
    text: menusData.menus[1].text,
    style: menusData.menus[1].style
  }
};

export const Default = {
  args: {
    text: 'Default menu',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary menu',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary menu',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/menu.njk" import rendermenu %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific menu by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendermenu({ 
  name: "example_menu1", 
  datas: organisms.menus 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all menus:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for menu in organisms.menus.menus %}
  {{ rendermenu({ 
    name: menu.name, 
    datas: organisms.menus 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom menu directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendermenu({
  text: 'Custom menu', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(menusData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new menu:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "menus": [
    {
      "name": "new_menu_name",
      "text": "New menu Text",
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