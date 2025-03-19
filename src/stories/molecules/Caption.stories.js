// src/stories/molecules/Caption.stories.js
import nunjucks from 'nunjucks';
import captionsData from '../../_data/molecules/captions.json';

export default {
  title: 'Molecules/Caption',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = captionsData.globalStyle;
    const variantStyle = captionsData.variants[args.style];
    
    const captionTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return captionTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the caption',
      control: 'text',
      defaultValue: 'Caption' 
    },
    style: { 
      description: 'Visual style of the caption',
      control: { 
        type: 'select', 
        options: Object.keys(captionsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from captions.json
export const Example1 = {
  args: {
    text: captionsData.captions[0].text,
    style: captionsData.captions[0].style
  }
};

export const Example2 = {
  args: {
    text: captionsData.captions[1].text,
    style: captionsData.captions[1].style
  }
};

export const Default = {
  args: {
    text: 'Default Caption',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary Caption',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary Caption',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/caption.njk" import renderCaption %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific caption by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderCaption({ 
  name: "example_caption1", 
  datas: molecules.captions 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all captions:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for caption in molecules.captions.captions %}
  {{ renderCaption({ 
    name: caption.name, 
    datas: molecules.captions 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom caption directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderCaption({
  text: 'Custom Caption', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(captionsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new caption:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "captions": [
    {
      "name": "new_caption_name",
      "text": "New Caption Text",
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