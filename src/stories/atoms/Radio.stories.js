import nunjucks from 'nunjucks';
import radioData from '../../_data/atoms/radios.json';

const radioTemplate = `
  {% macro renderSingleRadio(radio, datas) %}
    {% set radioContainerClasses = datas.radioContainerClasses | default('inline-flex items-center') %}
    {% set baseClasses = datas.baseClasses | default('size-4 rounded-full') %}
    
    {% set stateClasses = {
      'default': datas.variants.default | default('border-gray-300'),
      'hover': datas.variants.hover | default('border-gray-600'),
      'checked': datas.variants.checked | default('bg-gray-500 border-gray-500 text-white'),
      'focus': datas.variants.focus | default('border-blue-500 outline-none ring-2 ring-blue-300'),
      'disabled': datas.variants.disabled | default('bg-gray-100 border-gray-300 cursor-not-allowed'),
      'disabledChecked': datas.variants.disabledChecked | default('bg-gray-300 border-gray-300 cursor-not-allowed')
    } %}
    
    {% set inputClasses = baseClasses ~ ' ' ~ stateClasses[options.state | default('default')] %}
    
    <div class="{{ radioContainerClasses }}">
      <input 
        type="radio" 
        id="demo-radio" 
        name="demo-radio"
        value="{{ options.value | default('demo-value') }}"
        class="{{ inputClasses }}"
        {% if options.state === 'checked' or options.state === 'disabledChecked' %}checked{% endif %}
        {% if options.state === 'disabled' or options.state === 'disabledChecked' %}disabled{% endif %}
        {% if options.ariaLabel %}aria-label="{{ options.ariaLabel }}"{% endif %}
      />
    </div>
  {% endmacro %}
  
  {{ renderSingleRadio({}, datas) }}
`;

// For group rendering
const radioGroupTemplate = `
  {% macro renderRadioGroup(options) %}
    {% set fieldsetClasses = datas.fieldsetClasses | default('radio-group') %}
    {% set legendClasses = datas.legendClasses | default('font-medium text-gray-700 mb-3') %}
    {% set groupContainerClasses = datas.groupContainerClasses | default('flex space-x-4') %}
    
    <fieldset class="{{ fieldsetClasses }}">
      <legend class="{{ legendClasses }}">
        {{ options.groupLabel | default('Radio Group') }}
      </legend>
      
      <div class="{{ groupContainerClasses }}">
        {% for radio in radios %}
          {% set radioContainerClasses = datas.radioContainerClasses | default('inline-flex items-center') %}
          {% set baseClasses = datas.baseClasses | default('size-4 rounded-full') %}
          
          {% set stateClasses = {
            'default': datas.variants.default | default('border-gray-300'),
            'hover': datas.variants.hover | default('border-gray-600'),
            'checked': datas.variants.checked | default('bg-gray-500 border-gray-500 text-white'),
            'focus': datas.variants.focus | default('border-blue-500 outline-none ring-2 ring-blue-300'),
            'disabled': datas.variants.disabled | default('bg-gray-100 border-gray-300 cursor-not-allowed'),
            'disabledChecked': datas.variants.disabledChecked | default('bg-gray-300 border-gray-300 cursor-not-allowed')
          } %}
          
          {% set inputClasses = baseClasses ~ ' ' ~ stateClasses.default %}
          
          <div class="{{ radioContainerClasses }}">
            <input 
              type="radio" 
              id="{{ radio.id }}" 
              name="{{ radio.name }}"
              value="{{ radio.value }}"
              class="{{ inputClasses }}"
              {% if radio.checked %}checked{% endif %}
              {% if radio.disabled %}disabled{% endif %}
              {% if radio.ariaLabel %}aria-label="{{ radio.ariaLabel }}"{% endif %}
            />
          </div>
        {% endfor %}
      </div>
    </fieldset>
  {% endmacro %}
  
  {{ renderRadioGroup({}) }}
`;

export default {
  title: 'Atoms/Radio',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: radioData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(radioTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    value: {
      description: 'Form submission value',
      control: 'text',
      defaultValue: 'radio1'
    },
    state: { 
      description: 'Visual state of the radio',
      control: { 
        type: 'select', 
        options: Object.keys(radioData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Single radio state examples
export const Default = {
  args: {
    value: 'fist-fighter',
    ariaLabel: 'Only fight barehanded',
    state: 'default'
  }
};

export const Hover = {
  args: {
    value: 'damage-tank',
    ariaLabel: 'Block with face instead of using a shield',
    state: 'hover'
  }
};

export const Checked = {
  args: {
    value: 'anti-mage',
    ariaLabel: 'Never use magic, even if a wizard',
    state: 'checked'
  }
};

export const Focus = {
  args: {
    value: 'decorative-archer',
    ariaLabel: 'Carry a bow but never use it',
    state: 'focus'
  }
};

export const Disabled = {
  args: {
    value: 'rusty-sword-main',
    ariaLabel: 'Use only the first weapon found in game',
    state: 'disabled'
  }
};

export const DisabledChecked = {
  args: {
    value: 'cooldown-dancer',
    ariaLabel: 'Run in circles while waiting for cooldowns',
    state: 'disabledChecked'
  }
};

// Render a group of radios
export const RadioGroup = () => {
  const groupTemplate = radioGroupTemplate;
  
  const context = {
    datas: radioData,
    radios: radioData.radios
  };
  
  return nunjucks.renderString(groupTemplate, context);
};

// States overview
export const States = () => {
  const container = document.createElement('div');
  container.className = 'grid grid-cols-1 gap-6 p-4';

  const states = Object.keys(radioData.variants);
  
  states.forEach(state => {
    const stateWrapper = document.createElement('div');
    stateWrapper.className = 'flex items-center gap-4';
    
    const stateLabel = document.createElement('span');
    stateLabel.textContent = state;
    stateLabel.className = 'text-sm font-semibold text-gray-700 w-24';
    
    const radioWrapper = document.createElement('div');
    radioWrapper.className = radioData.radioContainerClasses;
    
    // Create custom HTML for the radio
    const isChecked = state === 'checked' || state === 'disabledChecked';
    const isDisabled = state === 'disabled' || state === 'disabledChecked';
    
    radioWrapper.innerHTML = `
      <input 
        type="radio" 
        id="demo-${state}" 
        class="${radioData.baseClasses} ${radioData.variants[state]}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
        aria-label="${state} state"
      />
    `;
    
    stateWrapper.appendChild(stateLabel);
    stateWrapper.appendChild(radioWrapper);
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/radio.njk" import renderRadio %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Render a single radio by ID:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderRadio({ id: "option1", datas: atoms.radios }) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Render an entire radio group:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderRadio({ 
  group: true, 
  groupLabel: "Combat Style",
  groupSrOnly: false,
  datas: atoms.radios 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Render a subset of radios:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% set combatStyles = [
  { "id": "option1", "name": "combat_style", "value": "fist-fighter", "ariaLabel": "Only fight barehanded" },
  { "id": "option2", "name": "combat_style", "value": "damage-tank", "ariaLabel": "Block with face" }
] %}
{{ renderRadio({ 
  group: true, 
  groupLabel: "Custom Group", 
  radios: combatStyles, 
  datas: { 
    globalStyle: atoms.radios.globalStyle, 
    variants: atoms.radios.variants,
    baseClasses: atoms.radios.baseClasses,
    radioContainerClasses: atoms.radios.radioContainerClasses
  } 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available options for each radio:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "id": "unique_id",            // Unique identifier
  "name": "group_name",         // Name for the group (same across related radios)
  "value": "submission_value",  // Value for form submission
  "checked": true,              // Pre-checked state (optional)
  "disabled": false,            // Disabled state (optional)
  "ariaLabel": "Accessible label for screen readers" // (required for accessibility)
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Key differences from radio-button:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>No visible labels - only the radio inputs are displayed</li>
          <li>Accessibility is maintained through required <code>ariaLabel</code> attributes</li>
          <li>Compact display with <code>flex space-x-4</code> layout by default</li>
          <li>Perfect for minimal UI designs where radio options are visually represented elsewhere</li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">7. Available states:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(radioData.variants).map(([state, className]) => `
            <li><code>${state}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May your form submissions always validate. 🐉🔥</p>
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