// src/stories/molecules/progress-bar.stories.js
import nunjucks from 'nunjucks';
import progress-barsData from '../../_data/molecules/progress-bars.json';

export default {
  title: 'Molecules/progress-bar',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = progress-barsData.globalStyle;
    const variantStyle = progress-barsData.variants[args.style];
    
    const progress-barTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return progress-barTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the progress-bar',
      control: 'text',
      defaultValue: 'progress-bar' 
    },
    style: { 
      description: 'Visual style of the progress-bar',
      control: { 
        type: 'select', 
        options: Object.keys(progress-barsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from progress-bars.json
export const Example1 = {
  args: {
    text: progress-barsData.progress-bars[0].text,
    style: progress-barsData.progress-bars[0].style
  }
};

export const Example2 = {
  args: {
    text: progress-barsData.progress-bars[1].text,
    style: progress-barsData.progress-bars[1].style
  }
};

export const Default = {
  args: {
    text: 'Default progress-bar',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary progress-bar',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary progress-bar',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/progress-bar.njk" import renderprogress-bar %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific progress-bar by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderprogress-bar({ 
  name: "example_progress-bar1", 
  datas: molecules.progress-bars 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all progress-bars:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for progress-bar in molecules.progress-bars.progress-bars %}
  {{ renderprogress-bar({ 
    name: progress-bar.name, 
    datas: molecules.progress-bars 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom progress-bar directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderprogress-bar({
  text: 'Custom progress-bar', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(progress-barsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new progress-bar:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "progress-bars": [
    {
      "name": "new_progress-bar_name",
      "text": "New progress-bar Text",
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