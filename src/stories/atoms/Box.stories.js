import nunjucks from 'nunjucks';
import boxData from '../../_data/atoms/boxs.json';

const boxTemplate = `
  {% macro renderSingleBox(box, datas) %}
    {% set boxContainerClasses = datas.boxContainerClasses | default('flex items-center') %}
    {% set baseClasses = datas.baseClasses | default('size-4 rounded-sm') %}
    
    {% set stateClasses = {
      'default': datas.variants.default | default('border-gray-300'),
      'hover': datas.variants.hover | default('border-gray-600'),
      'checked': datas.variants.checked | default('bg-gray-500 border-gray-500 text-white'),
      'focus': datas.variants.focus | default('border-blue-500 outline-none ring-2 ring-blue-300'),
      'disabled': datas.variants.disabled | default('bg-gray-100 border-gray-300 cursor-not-allowed'),
      'disabledChecked': datas.variants.disabledChecked | default('bg-gray-300 border-gray-300 cursor-not-allowed')
    } %}
    
    {% set inputClasses = baseClasses ~ ' ' ~ stateClasses[options.state | default('default')] %}
    
    <div class="{{ boxContainerClasses }}">
      <input 
        type="checkbox" 
        id="demo-box" 
        name="demo-box"
        value="{{ options.value | default('demo-value') }}"
        class="{{ inputClasses }}"
        {% if options.state === 'checked' or options.state === 'disabledChecked' %}checked{% endif %}
        {% if options.state === 'disabled' or options.state === 'disabledChecked' %}disabled{% endif %}
        {% if options.ariaLabel %}aria-label="{{ options.ariaLabel }}"{% endif %}
      />
    </div>
  {% endmacro %}
  
  {{ renderSingleBox({}, datas) }}
`;

// For group rendering
const boxGroupTemplate = `
  {% macro renderBoxGroup(options) %}
    {% set fieldsetClasses = datas.fieldsetClasses | default('box-group') %}
    {% set groupContainerClasses = datas.groupContainerClasses | default('space-y-2') %}
    
    <fieldset class="{{ fieldsetClasses }}">
      <div class="{{ groupContainerClasses }}">
        {% for box in boxes %}
          {% set boxContainerClasses = datas.boxContainerClasses | default('flex items-center') %}
          {% set baseClasses = datas.baseClasses | default('size-4 rounded-sm') %}
          
          {% set stateClasses = {
            'default': datas.variants.default | default('border-gray-300'),
            'hover': datas.variants.hover | default('border-gray-600'),
            'checked': datas.variants.checked | default('bg-gray-500 border-gray-500 text-white'),
            'focus': datas.variants.focus | default('border-blue-500 outline-none ring-2 ring-blue-300'),
            'disabled': datas.variants.disabled | default('bg-gray-100 border-gray-300 cursor-not-allowed'),
            'disabledChecked': datas.variants.disabledChecked | default('bg-gray-300 border-gray-300 cursor-not-allowed')
          } %}
          
          {% set inputClasses = baseClasses ~ ' ' ~ stateClasses.default %}
          
          <div class="{{ boxContainerClasses }}">
            <input 
              type="checkbox" 
              id="{{ box.id }}" 
              name="{{ box.id }}"
              value="{{ box.value }}"
              class="{{ inputClasses }}"
              {% if box.checked %}checked{% endif %}
              {% if box.disabled %}disabled{% endif %}
              {% if box.ariaLabel %}aria-label="{{ box.ariaLabel }}"{% endif %}
            />
          </div>
        {% endfor %}
      </div>
    </fieldset>
  {% endmacro %}
  
  {{ renderBoxGroup({}) }}
`;

export default {
  title: 'Atoms/Box',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: boxData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(boxTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    value: {
      description: 'Form submission value',
      control: 'text',
      defaultValue: 'box-value'
    },
    state: { 
      description: 'Visual state of the box',
      control: { 
        type: 'select', 
        options: Object.keys(boxData.variants)
      },
      defaultValue: 'default'
    },
    ariaLabel: {
      description: 'Accessible label (optional)',
      control: 'text',
      defaultValue: ''
    }
  }
};

// Single box state examples
export const Default = {
  args: {
    value: 'default',
    state: 'default'
  }
};

export const Hover = {
  args: {
    value: 'hover',
    state: 'hover'
  }
};

export const Checked = {
  args: {
    value: 'checked',
    state: 'checked'
  }
};

export const Focus = {
  args: {
    value: 'focus',
    state: 'focus'
  }
};

export const Disabled = {
  args: {
    value: 'disabled',
    state: 'disabled'
  }
};

export const DisabledChecked = {
  args: {
    value: 'disabled-checked',
    state: 'disabledChecked'
  }
};

// Render a group of boxes
export const BoxGroup = () => {
  const groupTemplate = boxGroupTemplate;
  
  const context = {
    datas: boxData,
    boxes: boxData.boxes
  };
  
  return nunjucks.renderString(groupTemplate, context);
};

// States overview
export const States = () => {
  const container = document.createElement('div');
  container.className = 'grid grid-cols-3 gap-6 p-4';

  const states = Object.keys(boxData.variants);
  
  states.forEach(state => {
    const stateWrapper = document.createElement('div');
    stateWrapper.className = 'flex items-center justify-center';
    
    const boxWrapper = document.createElement('div');
    boxWrapper.className = boxData.boxContainerClasses;
    
    // Create custom HTML for the box
    const isChecked = state === 'checked' || state === 'disabledChecked';
    const isDisabled = state === 'disabled' || state === 'disabledChecked';
    
    boxWrapper.innerHTML = `
      <input 
        type="checkbox" 
        id="demo-${state}" 
        class="${boxData.baseClasses} ${boxData.variants[state]}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      />
    `;
    
    stateWrapper.appendChild(boxWrapper);
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/box.njk" import renderBox %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Render a single box by ID:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderBox({ id: "option1", datas: atoms.boxes }) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Render an entire box group:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderBox({ 
  group: true,
  datas: atoms.boxes 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available options for each box:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "id": "unique_id",            // Unique identifier
  "value": "submission_value",  // Value for form submission
  "checked": true,              // Pre-checked state (optional)
  "disabled": false,            // Disabled state (optional)
  "ariaLabel": "Accessible label for screen readers" // (optional)
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available states:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(boxData.variants).map(([state, className]) => `
            <li><code>${state}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May your validation never fail. 🐉🔥</p>
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