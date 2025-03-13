// src/stories/atoms/Link.stories.js
import nunjucks from 'nunjucks';
import linksData from '../../_data/contents/atoms/links.json';

// Define styles map in JavaScript
const styleClasses = {
  default: "text-gray-800 hover:text-gray-600 transition-colors duration-200",
  primary: "text-blue-600 hover:text-blue-800 underline transition-colors duration-200",
  secondary: "text-gray-500 hover:text-gray-700 transition-colors duration-200"
};

export default {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    // Use a simple template without complex Nunjucks logic
    const linkTemplate = `<a href="${args.href}" class="${styleClasses[args.style] || styleClasses.default}">${args.text}</a>`;
    return linkTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    href: { 
      description: 'Destination URL for the link',
      control: 'text',
      defaultValue: '#' 
    },
    text: { 
      description: 'Text displayed for the link',
      control: 'text',
      defaultValue: 'Link' 
    },
    style: { 
      description: 'Visual style of the link',
      control: { 
        type: 'select', 
        options: ['default', 'primary', 'secondary']
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from links.json
export const TavernQuest = {
  args: {
    href: linksData[0].href,
    text: linksData[0].text,
    style: linksData[0].style
  }
};

export const MonsterManual = {
  args: {
    href: linksData[1].href,
    text: linksData[1].text,
    style: linksData[1].style
  }
};

export const Default = {
  args: {
    href: '#',
    text: 'Default Link',
    style: 'default'
  }
};

export const Primary = {
  args: {
    href: '#',
    text: 'Primary Link',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    href: '#',
    text: 'Secondary Link',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/link.njk" import renderLink %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific link by its index:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink(contents.atoms.links[0]) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Call a specific link by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% set link_by_name = contents.atoms.links | selectattr('name', 'equalto', 'tavern_quest') | first %}
{{ renderLink(link_by_name) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom link directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink({
  href: '/custom-page', 
  text: 'Custom Link', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Add a new link in links.json:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <pre><code class="text-sm text-gray-900">{
  "id": 2, // Must be unique and sequential (e.g., max ID + 1)
  "name": "new_link_name",
  "href": "/your-link",
  "text": "Your Link Text",
  "style": "primary"
}</code></pre>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li><code>default</code>: Gray text that darkens on hover</li>
          <li><code>primary</code>: Blue underlined text that darkens on hover</li>
          <li><code>secondary</code>: Light gray text that darkens on hover</li>
        </ul>
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