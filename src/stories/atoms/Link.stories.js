// src/stories/atoms/Link.stories.js
import nunjucks from 'nunjucks';
import linksData from '../../_data/atoms/links.json';

export default {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = linksData.globalStyle;
    const variantStyle = linksData.variants[args.style];
    
    const linkTemplate = `<a href="${args.href}" class="${globalStyle} ${variantStyle}">${args.text}</a>`;
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
        options: Object.keys(linksData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from links.json
export const TavernQuest = {
  args: {
    href: linksData.links[0].href,
    text: linksData.links[0].text,
    style: linksData.links[0].style
  }
};

export const MonsterManual = {
  args: {
    href: linksData.links[1].href,
    text: linksData.links[1].text,
    style: linksData.links[1].style
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
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific link by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink({ 
  name: "tavern_quest", 
  datas: atoms.links 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom link directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink({
  href: '/custom-page', 
  text: 'Custom Link', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(linksData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Add a new link:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "links": [
    {
      "name": "new_link_name",
      "href": "/new-page",
      "text": "New Link Text",
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