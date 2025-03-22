// src/stories/organisms/navigation.stories.js
import nunjucks from 'nunjucks';
import navigationsData from '../../_data/organisms/navigations.json';

export default {
  title: 'Organisms/navigation',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = navigationsData.globalStyle;
    const variantStyle = navigationsData.variants[args.style];
    
    const navigationTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return navigationTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the navigation',
      control: 'text',
      defaultValue: 'navigation' 
    },
    style: { 
      description: 'Visual style of the navigation',
      control: { 
        type: 'select', 
        options: Object.keys(navigationsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from navigations.json
export const Example1 = {
  args: {
    text: navigationsData.navigations[0].text,
    style: navigationsData.navigations[0].style
  }
};

export const Example2 = {
  args: {
    text: navigationsData.navigations[1].text,
    style: navigationsData.navigations[1].style
  }
};

export const Default = {
  args: {
    text: 'Default navigation',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary navigation',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary navigation',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/navigation.njk" import rendernavigation %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific navigation by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendernavigation({ 
  name: "example_navigation1", 
  datas: organisms.navigations 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all navigations:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for navigation in organisms.navigations.navigations %}
  {{ rendernavigation({ 
    name: navigation.name, 
    datas: organisms.navigations 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom navigation directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendernavigation({
  text: 'Custom navigation', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(navigationsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new navigation:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "navigations": [
    {
      "name": "new_navigation_name",
      "text": "New navigation Text",
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