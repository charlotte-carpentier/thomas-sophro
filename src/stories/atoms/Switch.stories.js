// src/stories/atoms/Switch.stories.js
import nunjucks from 'nunjucks';
import switchsData from '../../_data/atoms/switchs.json';

export default {
  title: 'Atoms/Switch',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = switchsData.globalStyle;
    const variantStyle = switchsData.variants[args.style];
    
    const switchTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return switchTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the switch',
      control: 'text',
      defaultValue: 'Switch' 
    },
    style: { 
      description: 'Visual style of the switch',
      control: { 
        type: 'select', 
        options: Object.keys(switchsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from switchs.json
export const Example1 = {
  args: {
    text: switchsData.switchs[0].text,
    style: switchsData.switchs[0].style
  }
};

export const Example2 = {
  args: {
    text: switchsData.switchs[1].text,
    style: switchsData.switchs[1].style
  }
};

export const Default = {
  args: {
    text: 'Default Switch',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary Switch',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary Switch',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/switch.njk" import renderSwitch %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific switch by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSwitch({ 
  name: "example_switch1", 
  datas: atoms.switchs 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all switchs:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for switch in atoms.switchs.switchs %}
  {{ renderSwitch({ 
    name: switch.name, 
    datas: atoms.switchs 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom switch directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSwitch({
  text: 'Custom Switch', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(switchsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new switch:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "switchs": [
    {
      "name": "new_switch_name",
      "text": "New Switch Text",
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