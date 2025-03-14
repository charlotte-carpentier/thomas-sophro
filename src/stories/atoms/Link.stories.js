// src/stories/atoms/Link.stories.js
import nunjucks from 'nunjucks';
import linksData from '../../_data/atoms/links.json';

// Template for rendering links based on our macro
const linkTemplate = `
  {% macro renderLink(options) %}
    {% if options.name %}
      {% set linkData = null %}
      {% for link in datas.links %}
        {% if link.name == options.name %}
          {% set linkData = link %}
        {% endif %}
      {% endfor %}

      {% set globalStyle = datas.globalStyle %}

      {% if linkData %}
        {% set variantStyle = datas.variants[linkData.style] | default('') %}
        
        <a 
          href="{{ linkData.href }}" 
          class="{{ globalStyle }} {{ variantStyle }}"
        >
          {{ linkData.text }}
        </a>
      {% else %}
        <span class="text-red-500">Link not found: {{ options.name }}</span>
      {% endif %}
    {% else %}
      {% set globalStyle = datas.globalStyle %}
      {% set variantStyle = datas.variants[options.style] | default('') %}
      
      <a 
        href="{{ options.href }}" 
        class="{{ globalStyle }} {{ variantStyle }}"
      >
        {{ options.text }}
      </a>
    {% endif %}
  {% endmacro %}
  
  {{ renderLink(options) }}
`;

export default {
  title: 'Atoms/Link',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: linksData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(linkTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined link',
      control: 'select',
      options: linksData.links.map(link => link.name),
      defaultValue: null
    },
    href: { 
      description: 'Destination URL for the link (for custom links)',
      control: 'text',
      defaultValue: '/custom-page' 
    },
    text: { 
      description: 'Text displayed for the link (for custom links)',
      control: 'text',
      defaultValue: 'Custom Link' 
    },
    style: { 
      description: 'Visual style of the link (for custom links)',
      control: { 
        type: 'select', 
        options: Object.keys(linksData.variants)
      },
      defaultValue: 'primary'
    }
  }
};

// Using examples from links.json
export const TavernQuestBoard = {
  args: {
    name: "tavern_quest"
  }
};

export const MonsterManual = {
  args: {
    name: "monster_manual"
  }
};

// Custom link example
export const CustomLink = {
  args: {
    href: '/custom-page',
    text: 'Custom Link',
    style: 'secondary'
  }
};

// Link variants
export const DefaultStyle = {
  args: {
    href: '/styles/default',
    text: 'Default Style Link',
    style: 'default'
  }
};

export const PrimaryStyle = {
  args: {
    href: '/styles/primary',
    text: 'Primary Style Link',
    style: 'primary'
  }
};

export const SecondaryStyle = {
  args: {
    href: '/styles/secondary',
    text: 'Secondary Style Link',
    style: 'secondary'
  }
};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Summon HAT Components Wisely</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/link.njk" import renderLink %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific link by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink({ 
  name: "tavern_quest", 
  datas: atoms.links 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Call multiple links from the data:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for link in atoms.links.links %}
    {{ renderLink({ 
        name: link.name, 
        datas: atoms.links 
    }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Direct link creation:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderLink({
  href: "/new-page", 
  text: "Custom Link", 
  style: "primary"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Adding a new link to links.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "links": [
    {
      "name": "new_link_name",
      "href": "/your-link",
      "text": "Your Link Text",
      "style": "primary"
    }
  ]
}</code></pre>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May your bugs be forever exiled to the shadow realm. 🧙‍♂️✨</p>
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