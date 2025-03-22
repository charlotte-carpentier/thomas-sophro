// src/stories/organisms/navigation-secondary.stories.js
import nunjucks from 'nunjucks';
import navigation-secondarysData from '../../_data/organisms/navigation-secondarys.json';

export default {
  title: 'Organisms/navigation-secondary',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = navigation-secondarysData.globalStyle;
    const variantStyle = navigation-secondarysData.variants[args.style];
    
    const navigation-secondaryTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return navigation-secondaryTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the navigation-secondary',
      control: 'text',
      defaultValue: 'navigation-secondary' 
    },
    style: { 
      description: 'Visual style of the navigation-secondary',
      control: { 
        type: 'select', 
        options: Object.keys(navigation-secondarysData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from navigation-secondarys.json
export const Example1 = {
  args: {
    text: navigation-secondarysData.navigation-secondarys[0].text,
    style: navigation-secondarysData.navigation-secondarys[0].style
  }
};

export const Example2 = {
  args: {
    text: navigation-secondarysData.navigation-secondarys[1].text,
    style: navigation-secondarysData.navigation-secondarys[1].style
  }
};

export const Default = {
  args: {
    text: 'Default navigation-secondary',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary navigation-secondary',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary navigation-secondary',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/navigation-secondary.njk" import rendernavigation-secondary %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific navigation-secondary by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendernavigation-secondary({ 
  name: "example_navigation-secondary1", 
  datas: organisms.navigation-secondarys 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all navigation-secondarys:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for navigation-secondary in organisms.navigation-secondarys.navigation-secondarys %}
  {{ rendernavigation-secondary({ 
    name: navigation-secondary.name, 
    datas: organisms.navigation-secondarys 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom navigation-secondary directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendernavigation-secondary({
  text: 'Custom navigation-secondary', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(navigation-secondarysData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new navigation-secondary:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "navigation-secondarys": [
    {
      "name": "new_navigation-secondary_name",
      "text": "New navigation-secondary Text",
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