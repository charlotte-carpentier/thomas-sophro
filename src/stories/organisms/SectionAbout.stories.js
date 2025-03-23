// src/stories/organisms/section-about.stories.js
import nunjucks from 'nunjucks';
import section-aboutsData from '../../_data/organisms/section-abouts.json';

export default {
  title: 'Organisms/section-about',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = section-aboutsData.globalStyle;
    const variantStyle = section-aboutsData.variants[args.style];
    
    const section-aboutTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return section-aboutTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the section-about',
      control: 'text',
      defaultValue: 'section-about' 
    },
    style: { 
      description: 'Visual style of the section-about',
      control: { 
        type: 'select', 
        options: Object.keys(section-aboutsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from section-abouts.json
export const Example1 = {
  args: {
    text: section-aboutsData.section-abouts[0].text,
    style: section-aboutsData.section-abouts[0].style
  }
};

export const Example2 = {
  args: {
    text: section-aboutsData.section-abouts[1].text,
    style: section-aboutsData.section-abouts[1].style
  }
};

export const Default = {
  args: {
    text: 'Default section-about',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary section-about',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary section-about',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/section-about.njk" import rendersection-about %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific section-about by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-about({ 
  name: "example_section-about1", 
  datas: organisms.section-abouts 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all section-abouts:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for section-about in organisms.section-abouts.section-abouts %}
  {{ rendersection-about({ 
    name: section-about.name, 
    datas: organisms.section-abouts 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom section-about directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-about({
  text: 'Custom section-about', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(section-aboutsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new section-about:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "section-abouts": [
    {
      "name": "new_section-about_name",
      "text": "New section-about Text",
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