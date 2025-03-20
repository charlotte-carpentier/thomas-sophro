// src/stories/molecules/segmented-control.stories.js
import nunjucks from 'nunjucks';
import segmented-controlsData from '../../_data/molecules/segmented-controls.json';

export default {
  title: 'Molecules/segmented-control',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = segmented-controlsData.globalStyle;
    const variantStyle = segmented-controlsData.variants[args.style];
    
    const segmented-controlTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return segmented-controlTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the segmented-control',
      control: 'text',
      defaultValue: 'segmented-control' 
    },
    style: { 
      description: 'Visual style of the segmented-control',
      control: { 
        type: 'select', 
        options: Object.keys(segmented-controlsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from segmented-controls.json
export const Example1 = {
  args: {
    text: segmented-controlsData.segmented-controls[0].text,
    style: segmented-controlsData.segmented-controls[0].style
  }
};

export const Example2 = {
  args: {
    text: segmented-controlsData.segmented-controls[1].text,
    style: segmented-controlsData.segmented-controls[1].style
  }
};

export const Default = {
  args: {
    text: 'Default segmented-control',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary segmented-control',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary segmented-control',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/segmented-control.njk" import rendersegmented-control %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific segmented-control by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersegmented-control({ 
  name: "example_segmented-control1", 
  datas: molecules.segmented-controls 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all segmented-controls:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for segmented-control in molecules.segmented-controls.segmented-controls %}
  {{ rendersegmented-control({ 
    name: segmented-control.name, 
    datas: molecules.segmented-controls 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom segmented-control directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersegmented-control({
  text: 'Custom segmented-control', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(segmented-controlsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new segmented-control:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "segmented-controls": [
    {
      "name": "new_segmented-control_name",
      "text": "New segmented-control Text",
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