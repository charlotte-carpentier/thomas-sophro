// src/stories/molecules/lockup.stories.js
import nunjucks from 'nunjucks';
import lockupsData from '../../_data/molecules/lockups.json';

export default {
  title: 'Molecules/lockup',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = lockupsData.globalStyle;
    const variantStyle = lockupsData.variants[args.style];
    
    const lockupTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return lockupTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the lockup',
      control: 'text',
      defaultValue: 'lockup' 
    },
    style: { 
      description: 'Visual style of the lockup',
      control: { 
        type: 'select', 
        options: Object.keys(lockupsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from lockups.json
export const Example1 = {
  args: {
    text: lockupsData.lockups[0].text,
    style: lockupsData.lockups[0].style
  }
};

export const Example2 = {
  args: {
    text: lockupsData.lockups[1].text,
    style: lockupsData.lockups[1].style
  }
};

export const Default = {
  args: {
    text: 'Default lockup',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary lockup',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary lockup',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/lockup.njk" import renderlockup %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific lockup by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlockup({ 
  name: "example_lockup1", 
  datas: molecules.lockups 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all lockups:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for lockup in molecules.lockups.lockups %}
  {{ renderlockup({ 
    name: lockup.name, 
    datas: molecules.lockups 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom lockup directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderlockup({
  text: 'Custom lockup', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(lockupsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new lockup:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "lockups": [
    {
      "name": "new_lockup_name",
      "text": "New lockup Text",
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