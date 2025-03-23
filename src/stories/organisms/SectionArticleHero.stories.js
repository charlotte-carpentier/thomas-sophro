// src/stories/organisms/section-article-hero.stories.js
import nunjucks from 'nunjucks';
import section-article-herosData from '../../_data/organisms/section-article-heros.json';

export default {
  title: 'Organisms/section-article-hero',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = section-article-herosData.globalStyle;
    const variantStyle = section-article-herosData.variants[args.style];
    
    const section-article-heroTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return section-article-heroTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the section-article-hero',
      control: 'text',
      defaultValue: 'section-article-hero' 
    },
    style: { 
      description: 'Visual style of the section-article-hero',
      control: { 
        type: 'select', 
        options: Object.keys(section-article-herosData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from section-article-heros.json
export const Example1 = {
  args: {
    text: section-article-herosData.section-article-heros[0].text,
    style: section-article-herosData.section-article-heros[0].style
  }
};

export const Example2 = {
  args: {
    text: section-article-herosData.section-article-heros[1].text,
    style: section-article-herosData.section-article-heros[1].style
  }
};

export const Default = {
  args: {
    text: 'Default section-article-hero',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary section-article-hero',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary section-article-hero',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/section-article-hero.njk" import rendersection-article-hero %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific section-article-hero by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-article-hero({ 
  name: "example_section-article-hero1", 
  datas: organisms.section-article-heros 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all section-article-heros:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for section-article-hero in organisms.section-article-heros.section-article-heros %}
  {{ rendersection-article-hero({ 
    name: section-article-hero.name, 
    datas: organisms.section-article-heros 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom section-article-hero directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-article-hero({
  text: 'Custom section-article-hero', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(section-article-herosData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new section-article-hero:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "section-article-heros": [
    {
      "name": "new_section-article-hero_name",
      "text": "New section-article-hero Text",
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