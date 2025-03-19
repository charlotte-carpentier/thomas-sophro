// src/stories/molecules/rating-gauge.stories.js
import nunjucks from 'nunjucks';
import rating-gaugesData from '../../_data/molecules/rating-gauges.json';

export default {
  title: 'Molecules/rating-gauge',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = rating-gaugesData.globalStyle;
    const variantStyle = rating-gaugesData.variants[args.style];
    
    const rating-gaugeTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return rating-gaugeTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the rating-gauge',
      control: 'text',
      defaultValue: 'rating-gauge' 
    },
    style: { 
      description: 'Visual style of the rating-gauge',
      control: { 
        type: 'select', 
        options: Object.keys(rating-gaugesData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from rating-gauges.json
export const Example1 = {
  args: {
    text: rating-gaugesData.rating-gauges[0].text,
    style: rating-gaugesData.rating-gauges[0].style
  }
};

export const Example2 = {
  args: {
    text: rating-gaugesData.rating-gauges[1].text,
    style: rating-gaugesData.rating-gauges[1].style
  }
};

export const Default = {
  args: {
    text: 'Default rating-gauge',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary rating-gauge',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary rating-gauge',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/rating-gauge.njk" import renderrating-gauge %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific rating-gauge by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderrating-gauge({ 
  name: "example_rating-gauge1", 
  datas: molecules.rating-gauges 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all rating-gauges:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for rating-gauge in molecules.rating-gauges.rating-gauges %}
  {{ renderrating-gauge({ 
    name: rating-gauge.name, 
    datas: molecules.rating-gauges 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom rating-gauge directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderrating-gauge({
  text: 'Custom rating-gauge', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(rating-gaugesData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new rating-gauge:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "rating-gauges": [
    {
      "name": "new_rating-gauge_name",
      "text": "New rating-gauge Text",
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