// src/stories/molecules/Breadcrumb.stories.js
import nunjucks from 'nunjucks';
import breadcrumbsData from '../../_data/molecules/breadcrumbs.json';
import linksData from '../../_data/atoms/links.json';

// Template for rendering breadcrumbs based on our macro
const breadcrumbTemplate = `
  {% macro renderBreadcrumb(options) %}
    {% if options.datas %}
      {% set globalStyle = options.datas.globalStyle %}
      {% set separatorStyle = options.datas.separatorStyle | default('mx-2 text-gray-400') %}
      {% set separatorIcon = options.datas.separatorIcon | default('/') %}
      {% set activeItemStyle = options.datas.activeItemStyle | default('font-bold text-gray-900') %}
      
      {% set breadcrumbData = null %}
      {% if options.name %}
        {% for crumbSet in options.datas.breadcrumbs %}
          {% if crumbSet.name == options.name %}
            {% set breadcrumbData = crumbSet %}
          {% endif %}
        {% endfor %}
      {% endif %}

      {% if not breadcrumbData %}
        {% set breadcrumbData = options.datas.breadcrumbs[0] %}
      {% endif %}
      
      {% set stateClasses = {
        'default': options.datas.variants.default | default('text-gray-800'),
        'hover': options.datas.variants.hover | default('text-gray-600'),
        'focus': options.datas.variants.focus | default('text-gray-800 outline-2 outline-blue-500 outline-offset-2'),
        'disabled': options.datas.variants.disabled | default('text-gray-400 cursor-not-allowed')
      } %}
      
      <nav aria-label="Breadcrumb" class="{{ globalStyle }} {{ options.class | default('') }}">
        <ol class="flex flex-wrap items-center">
          {% for crumb in breadcrumbData.links %}
            <li class="flex items-center">
              {% if loop.index > 1 %}
                <span class="{{ separatorStyle }}" aria-hidden="true">{{ separatorIcon }}</span>
              {% endif %}
              
              {% if crumb.link and options.links %}
                {# Try to find the corresponding link #}
                {% set linkFound = false %}
                {% for link in options.links.links %}
                  {% if link.name == crumb.link %}
                    <a href="{{ link.href }}" 
                       class="{{ stateClasses.default }}"
                       onmouseover="this.className='{{ stateClasses.hover }}'" 
                       onmouseout="this.className='{{ stateClasses.default }}'"
                       onfocus="this.className='{{ stateClasses.focus }}'"
                       onblur="this.className='{{ stateClasses.default }}'">
                        {{ link.text }}
                    </a>
                    {% set linkFound = true %}
                  {% endif %}
                {% endfor %}
                
                {% if not linkFound %}
                  <span class="{{ stateClasses.default }}">
                    {{ crumb.name }}
                  </span>
                {% endif %}
              {% else %}
                <span class="{{ activeItemStyle }}">
                  {{ crumb.name }}
                </span>
              {% endif %}
            </li>
          {% endfor %}
        </ol>
      </nav>
    {% else %}
      <span class="text-red-500">Breadcrumb data not found</span>
    {% endif %}
  {% endmacro %}
  
  {{ renderBreadcrumb(options) }}
`;

export default {
  title: 'Molecules/Breadcrumb',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      options: {
        ...args,
        datas: breadcrumbsData,
        links: linksData
      }
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(breadcrumbTemplate, context);
  },
  
  // Argument types for Storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined breadcrumb set',
      control: 'select',
      options: breadcrumbsData.breadcrumbs.map(b => b.name),
      defaultValue: null
    },
    class: { 
      description: 'Additional CSS classes for the breadcrumb',
      control: 'text',
      defaultValue: '' 
    }
  }
};

// Using examples from breadcrumbs.json
export const AdventureBreadcrumb = {
  args: {
    name: "adventure"
  }
};

export const ExplorationBreadcrumb = {
  args: {
    name: "exploration"
  }
};

// Default breadcrumb (first in the list)
export const DefaultBreadcrumb = {
  args: {}
};

// Breadcrumb with custom class
export const CustomClassBreadcrumb = {
  args: {
    name: "adventure",
    class: "text-blue-500 font-bold"
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/breadcrumb.njk" import renderBreadcrumb %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific breadcrumb by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderBreadcrumb({ 
  name: "adventure", 
  datas: molecules.breadcrumbs,
  links: atoms.links 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use default breadcrumb:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderBreadcrumb({ 
  datas: molecules.breadcrumbs,
  links: atoms.links 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Add custom classes:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderBreadcrumb({ 
  name: "adventure", 
  datas: molecules.breadcrumbs,
  links: atoms.links,
  class: "text-blue-500 font-bold"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Structure of breadcrumbs.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "breadcrumbs": [
    {
      "name": "adventure",
      "links": [
        {
          "name": "home",
          "link": "tavern_quest",
          "style": "primary"
        },
        {
          "name": "bestiary",
          "link": "monster_manual",
          "style": "secondary"
        }
      ]
    }
  ]
}</code></pre>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">No wrong turns, only side quests! 🗺️🎭</p>
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