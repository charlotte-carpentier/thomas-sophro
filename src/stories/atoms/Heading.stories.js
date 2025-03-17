// src/stories/atoms/Heading.stories.js
import nunjucks from 'nunjucks';
import headingsData from '../../_data/atoms/headings.json';

export default {
  title: 'Atoms/Heading',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = headingsData.globalStyle;
    const variantStyle = headingsData.variants[args.style];
    
    const headingTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return headingTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the heading',
      control: 'text',
      defaultValue: 'Heading' 
    },
    style: { 
      description: 'Visual style of the heading',
      control: { 
        type: 'select', 
        options: Object.keys(headingsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from headings.json
export const Example1 = {
  args: {
    text: headingsData.headings[0].text,
    style: headingsData.headings[0].style
  }
};

export const Example2 = {
  args: {
    text: headingsData.headings[1].text,
    style: headingsData.headings[1].style
  }
};

export const Default = {
  args: {
    text: 'Default Heading',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary Heading',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary Heading',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/heading.njk" import renderHeading %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific heading by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderHeading({ 
  name: "example_heading1", 
  datas: atoms.headings 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all headings:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for heading in atoms.headings.headings %}
  {{ renderHeading({ 
    name: heading.name, 
    datas: atoms.headings 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom heading directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderHeading({
  text: 'Custom Heading', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(headingsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new heading:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "headings": [
    {
      "name": "new_heading_name",
      "text": "New Heading Text",
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