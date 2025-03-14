// src/stories/atoms/Select.stories.js
import nunjucks from 'nunjucks';
import selectsData from '../../_data/atoms/selects.json';

// Template for rendering selects based on our macro
const selectTemplate = `
  {% macro renderSelect(options) %}
    {% if options.name %}
      {% set selectData = null %}
      {% for select in datas.selects %}
        {% if select.name == options.name %}
          {% set selectData = select %}
        {% endif %}
      {% endfor %}

      {% set globalStyle = datas.globalStyle %}

      {% if selectData %}
        {% set variantStyle = datas.variants[selectData.variant] | default('') %}
        
        <div class="relative mt-6 mb-6 mx-auto">
          <select 
            name="{{ selectData.name }}" 
            class="{{ globalStyle }} {{ variantStyle }} appearance-none pr-10"
            {% if selectData.variant == 'disabled' %}disabled{% endif %}
          >
            {% for opt in selectData.options %}
              <option 
                value="{{ opt.value }}"
                {% if opt.selected %}selected{% endif %}
              >
                {{ opt.label }}
              </option>
            {% endfor %}
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      {% else %}
        <span class="text-red-500">Select not found: {{ options.name }}</span>
      {% endif %}
    {% else %}
      {% set globalStyle = datas.globalStyle %}
      {% set variantStyle = datas.variants[options.variant] | default('') %}
      
      <div class="relative mt-6 mb-6 mx-auto">
        <select 
          class="{{ globalStyle }} {{ variantStyle }} appearance-none pr-10"
          {% if options.variant == 'disabled' %}disabled{% endif %}
        >
          <option>{{ options.text }}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    {% endif %}
  {% endmacro %}
  
  {{ renderSelect(options) }}
`;

export default {
  title: 'Atoms/Select',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: selectsData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(selectTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined select',
      control: 'select',
      options: selectsData.selects.map(select => select.name),
      defaultValue: null
    },
    text: { 
      description: 'Text displayed for custom select (when no name is provided)',
      control: 'text',
      defaultValue: 'Custom Select' 
    },
    variant: { 
      description: 'Visual style of the select',
      control: { 
        type: 'select', 
        options: Object.keys(selectsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Predefined selects from data
export const Categories = {
  args: {
    name: "categories"
  }
};

export const Locations = {
  args: {
    name: "locations"
  }
};

export const Abilities = {
  args: {
    name: "abilities"
  }
};

export const Difficulty = {
  args: {
    name: "difficulty"
  }
};

export const ItemCount = {
  args: {
    name: "item-count"
  }
};

// Custom selects with different variants
export const DefaultSelect = {
  args: {
    text: 'Default Select',
    variant: 'default'
  }
};

export const HoverSelect = {
  args: {
    text: 'Hover Select',
    variant: 'hover'
  }
};

export const FocusSelect = {
  args: {
    text: 'Focus Select',
    variant: 'focus'
  }
};

export const ActiveSelect = {
  args: {
    text: 'Active Select',
    variant: 'active'
  }
};

export const DisabledSelect = {
  args: {
    text: 'Disabled Select',
    variant: 'disabled'
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/select.njk" import renderSelect %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific select by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSelect({ 
  name: "categories", 
  datas: atoms.selects 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all selects:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for select in atoms.selects.selects %}
  {{ renderSelect({ 
    name: select.name, 
    datas: atoms.selects 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom select directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSelect({
  text: 'Custom Select', 
  variant: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(selectsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new select to selects.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "selects": [
    {
      "name": "new_select_name",
      "variant": "default",
      "options": [
        { "value": "option1", "label": "Option 1" },
        { "value": "option2", "label": "Option 2", "selected": true }
      ]
    }
  ]
}</code></pre>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May your UI elements be as smooth as a wizard's incantation. 🧙‍♂️✨</p>
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