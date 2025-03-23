// src/stories/organisms/section-hero.stories.js
import nunjucks from 'nunjucks';
import section-herosData from '../../_data/organisms/section-heros.json';

export default {
  title: 'Organisms/section-hero',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = section-herosData.globalStyle;
    const variantStyle = section-herosData.variants[args.style];
    
    const section-heroTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return section-heroTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the section-hero',
      control: 'text',
      defaultValue: 'section-hero' 
    },
    style: { 
      description: 'Visual style of the section-hero',
      control: { 
        type: 'select', 
        options: Object.keys(section-herosData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from section-heros.json
export const Example1 = {
  args: {
    text: section-herosData.section-heros[0].text,
    style: section-herosData.section-heros[0].style
  }
};

export const Example2 = {
  args: {
    text: section-herosData.section-heros[1].text,
    style: section-herosData.section-heros[1].style
  }
};

export const Default = {
  args: {
    text: 'Default section-hero',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary section-hero',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary section-hero',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/section-hero.njk" import rendersection-hero %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific section-hero by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-hero({ 
  name: "example_section-hero1", 
  datas: organisms.section-heros 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all section-heros:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for section-hero in organisms.section-heros.section-heros %}
  {{ rendersection-hero({ 
    name: section-hero.name, 
    datas: organisms.section-heros 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom section-hero directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-hero({
  text: 'Custom section-hero', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(section-herosData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new section-hero:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "section-heros": [
    {
      "name": "new_section-hero_name",
      "text": "New section-hero Text",
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