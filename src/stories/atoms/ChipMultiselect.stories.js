import nunjucks from 'nunjucks';
import chipMultiselectData from '../../_data/atoms/chip-multiselects.json';

const chipMultiselectTemplate = `
  {% macro renderChipMultiselect(options) %}
    {% set globalStyle = datas.globalStyle %}
    {% set inputWidth = datas.inputWidth | default('w-64') %} 

    {% set stateClasses = {
      'default': datas.variants.default,
      'hover': datas.variants.hover,
      'focus': datas.variants.focus,
      'disabled': datas.variants.disabled
    } %}
    
    {% set chipClasses = globalStyle ~ ' ' ~ stateClasses[options.style | default('default')] %}
    
    <div class="{{ chipClasses }}">
      {{ options.text }}
      <button 
        type="button" 
        class="{{ datas.closeButtonStyle }}"
        aria-label="Remove {{ options.text }}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    </div>
  {% endmacro %}
  
  {{ renderChipMultiselect(options) }}
`;

export default {
  title: 'Atoms/ChipMultiselect',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: chipMultiselectData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(chipMultiselectTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the chip',
      control: 'text',
      defaultValue: 'ChipMultiselect' 
    },
    style: { 
      description: 'Visual style of the chip',
      control: { 
        type: 'select', 
        options: Object.keys(chipMultiselectData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Predefined chips from data
export const Fire = {
  args: {
    text: 'Fire',
    style: 'default'
  }
};

export const Ice = {
  args: {
    text: 'Ice',
    style: 'default'
  }
};

export const Arcane = {
  args: {
    text: 'Arcane',
    style: 'default'
  }
};

// Custom chips with different states
export const DefaultChip = {
  args: {
    text: 'Default Element',
    style: 'default'
  }
};

export const HoverChip = {
  args: {
    text: 'Hover Element',
    style: 'hover'
  }
};

export const FocusChip = {
  args: {
    text: 'Focus Element',
    style: 'focus'
  }
};

export const DisabledChip = {
  args: {
    text: 'Disabled Element',
    style: 'disabled'
  }
};

// States Overview
export const States = () => {
  const container = document.createElement('div');
  container.className = 'grid grid-cols-1 gap-4 p-4';

  const states = Object.keys(chipMultiselectData.variants);
  
  states.forEach(state => {
    const stateWrapper = document.createElement('div');
    stateWrapper.className = 'flex items-center gap-4';
    
    const stateLabel = document.createElement('span');
    stateLabel.textContent = state;
    stateLabel.className = 'text-sm font-semibold text-gray-700 w-24';
    
    const chipWrapper = document.createElement('div');
    chipWrapper.className = `${chipMultiselectData.globalStyle} ${chipMultiselectData.variants[state]}`;
    chipWrapper.innerHTML = `
      Chip ${state}
      <button 
        type="button" 
        class="${chipMultiselectData.closeButtonStyle}"
        aria-label="Remove Chip"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>
    `;
    
    stateWrapper.appendChild(stateLabel);
    stateWrapper.appendChild(chipWrapper);
    container.appendChild(stateWrapper);
  });

  return container;
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/chip-multiselect.njk" import renderChipMultiselect %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific chip by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipMultiselect({ 
  name: "fire", 
  datas: atoms["chip-multiselects"] 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all chips:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for chip in atoms["chip-multiselects"]["chip-multiselects"] %}
  {{ renderChipMultiselect({ 
    name: chip.name, 
    datas: atoms["chip-multiselects"] 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Create a custom chip:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipMultiselect({
  text: "Custom Element", 
  style: "primary"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(chipMultiselectData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new chip to chip-multiselects.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "chip-multiselects": [
    {
      "name": "new_element",
      "text": "New Element"
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