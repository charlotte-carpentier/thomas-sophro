// src/stories/organisms/section-contact.stories.js
import nunjucks from 'nunjucks';
import section-contactsData from '../../_data/organisms/section-contacts.json';

export default {
  title: 'Organisms/section-contact',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = section-contactsData.globalStyle;
    const variantStyle = section-contactsData.variants[args.style];
    
    const section-contactTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return section-contactTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the section-contact',
      control: 'text',
      defaultValue: 'section-contact' 
    },
    style: { 
      description: 'Visual style of the section-contact',
      control: { 
        type: 'select', 
        options: Object.keys(section-contactsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from section-contacts.json
export const Example1 = {
  args: {
    text: section-contactsData.section-contacts[0].text,
    style: section-contactsData.section-contacts[0].style
  }
};

export const Example2 = {
  args: {
    text: section-contactsData.section-contacts[1].text,
    style: section-contactsData.section-contacts[1].style
  }
};

export const Default = {
  args: {
    text: 'Default section-contact',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary section-contact',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary section-contact',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/section-contact.njk" import rendersection-contact %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific section-contact by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-contact({ 
  name: "example_section-contact1", 
  datas: organisms.section-contacts 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all section-contacts:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for section-contact in organisms.section-contacts.section-contacts %}
  {{ rendersection-contact({ 
    name: section-contact.name, 
    datas: organisms.section-contacts 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom section-contact directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-contact({
  text: 'Custom section-contact', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(section-contactsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new section-contact:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "section-contacts": [
    {
      "name": "new_section-contact_name",
      "text": "New section-contact Text",
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