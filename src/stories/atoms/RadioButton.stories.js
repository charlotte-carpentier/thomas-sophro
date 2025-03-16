import nunjucks from 'nunjucks';
import radioButtonData from '../../_data/atoms/radio-buttons.json';

const radioButtonTemplate = `
  {% macro renderSingleRadioButton(radioButton, datas) %}
    {% set labelClasses = datas.labelClasses | default('flex cursor-pointer items-start gap-4') %}
    {% set radioButtonContainerClasses = datas.radioButtonContainerClasses | default('flex items-center') %}
    {% set baseClasses = datas.baseClasses | default('size-4 rounded-full') %}
    {% set labelTextClasses = datas.labelTextClasses | default('font-medium text-gray-900') %}
    {% set descriptionClasses = datas.descriptionClasses | default('text-sm text-gray-500') %}
    
    {% set stateClasses = {
      'default': datas.variants.default | default('border-gray-300'),
      'hover': datas.variants.hover | default('border-gray-600'),
      'checked': datas.variants.checked | default('bg-gray-500 border-gray-500 text-white'),
      'focus': datas.variants.focus | default('border-blue-500 outline-none ring-2 ring-blue-300'),
      'disabled': datas.variants.disabled | default('bg-gray-100 border-gray-300 cursor-not-allowed'),
      'disabledChecked': datas.variants.disabledChecked | default('bg-gray-300 border-gray-300 cursor-not-allowed')
    } %}
    
    {% set inputClasses = baseClasses ~ ' ' ~ stateClasses[options.state | default('default')] %}
    
    <label for="demo-radio" class="{{ labelClasses }}">
      <div class="{{ radioButtonContainerClasses }}">
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
      <div>
        <strong class="{{ labelTextClasses }}">
          {{ options.label }}
        </strong>
        {% if options.description %}
          <p class="{{ descriptionClasses }}">{{ options.description }}</p>
        {% endif %}
      </div>
    </label>
  {% endmacro %}
  
  {{ renderSingleRadioButton({}, datas) }}
`;

// For group rendering
const radioButtonGroupTemplate = `
  {% macro renderRadioButtonGroup(options) %}
    {% set fieldsetClasses = datas.fieldsetClasses | default('radio-button-group') %}
    {% set legendClasses = datas.legendClasses | default('font-medium text-gray-700 mb-3') %}
    {% set groupContainerClasses = datas.groupContainerClasses | default('space-y-2') %}
    
    <fieldset class="{{ fieldsetClasses }}">
      <legend class="{{ legendClasses }}">
        {{ options.groupLabel | default('Radio Button Group') }}
      </legend>
      
      <div class="{{ groupContainerClasses }}">
        {% for radioButton in radioButtons %}
          {% set labelClasses = datas.labelClasses | default('flex cursor-pointer items-start gap-4') %}
          {% set radioButtonContainerClasses = datas.radioButtonContainerClasses | default('flex items-center') %}
          {% set baseClasses = datas.baseClasses | default('size-4 rounded-full') %}
          {% set labelTextClasses = datas.labelTextClasses | default('font-medium text-gray-900') %}
          {% set descriptionClasses = datas.descriptionClasses | default('text-sm text-gray-500') %}
          
          {% set stateClasses = {
            'default': datas.variants.default | default('border-gray-300'),
            'hover': datas.variants.hover | default('border-gray-600'),
            'checked': datas.variants.checked | default('bg-gray-500 border-gray-500 text-white'),
            'focus': datas.variants.focus | default('border-blue-500 outline-none ring-2 ring-blue-300'),
            'disabled': datas.variants.disabled | default('bg-gray-100 border-gray-300 cursor-not-allowed'),
            'disabledChecked': datas.variants.disabledChecked | default('bg-gray-300 border-gray-300 cursor-not-allowed')
          } %}
          
          {% set inputClasses = baseClasses ~ ' ' ~ stateClasses.default %}
          
          <label for="{{ radioButton.id }}" class="{{ labelClasses }}">
            <div class="{{ radioButtonContainerClasses }}">
              <input 
                type="radio" 
                id="{{ radioButton.id }}" 
                name="{{ radioButton.name }}"
                value="{{ radioButton.value }}"
                class="{{ inputClasses }}"
                {% if radioButton.checked %}checked{% endif %}
                {% if radioButton.disabled %}disabled{% endif %}
                {% if radioButton.ariaLabel %}aria-label="{{ radioButton.ariaLabel }}"{% endif %}
              />
            </div>
            <div>
              <strong class="{{ labelTextClasses }}">
                {{ radioButton.label }}
              </strong>
              {% if radioButton.description %}
                <p class="{{ descriptionClasses }}">{{ radioButton.description }}</p>
              {% endif %}
            </div>
          </label>
        {% endfor %}
      </div>
    </fieldset>
  {% endmacro %}
  
  {{ renderRadioButtonGroup({}) }}
`;

export default {
  title: 'Atoms/RadioButton',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: radioButtonData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(radioButtonTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    label: { 
      description: 'Label text for the radio button',
      control: 'text',
      defaultValue: 'I only fight barehanded, no matter what weapons I find.' 
    },
    description: {
      description: 'Optional description text',
      control: 'text',
      defaultValue: ''
    },
    value: {
      description: 'Form submission value',
      control: 'text',
      defaultValue: 'fist-fighter'
    },
    state: { 
      description: 'Visual state of the radio button',
      control: { 
        type: 'select', 
        options: Object.keys(radioButtonData.variants)
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

// Single radio button state examples
export const Default = {
  args: {
    label: 'I only fight barehanded, no matter what weapons I find.',
    value: 'fist-fighter',
    state: 'default'
  }
};

export const Hover = {
  args: {
    label: 'I block with my face instead of using a shield.',
    value: 'damage-tank',
    state: 'hover'
  }
};

export const Checked = {
  args: {
    label: 'I never use magic, even if I\'m a wizard.',
    value: 'anti-mage',
    state: 'checked'
  }
};

export const Focus = {
  args: {
    label: 'I carry a bow but never use it.',
    value: 'decorative-archer',
    state: 'focus'
  }
};

export const Disabled = {
  args: {
    label: 'I use only the first weapon I found in the game.',
    value: 'rusty-sword-main',
    state: 'disabled'
  }
};

export const DisabledChecked = {
  args: {
    label: 'I run in circles while waiting for my cooldowns.',
    value: 'cooldown-dancer',
    state: 'disabledChecked'
  }
};

// Render a group of radio buttons
export const RadioButtonGroup = () => {
  const groupTemplate = radioButtonGroupTemplate;
  
  const context = {
    datas: radioButtonData,
    radioButtons: radioButtonData.radioButtons
  };
  
  return nunjucks.renderString(groupTemplate, context);
};

// States overview
export const States = () => {
  const container = document.createElement('div');
  container.className = 'grid grid-cols-1 gap-6 p-4';

  const states = Object.keys(radioButtonData.variants);
  
  states.forEach(state => {
    const stateWrapper = document.createElement('div');
    stateWrapper.className = 'flex items-start gap-4';
    
    const stateLabel = document.createElement('span');
    stateLabel.textContent = state;
    stateLabel.className = 'text-sm font-semibold text-gray-700 w-24 pt-1';
    
    const radioButtonWrapper = document.createElement('div');
    radioButtonWrapper.className = radioButtonData.labelClasses;
    
    // Create custom HTML for the radio button and label
    const isChecked = state === 'checked' || state === 'disabledChecked';
    const isDisabled = state === 'disabled' || state === 'disabledChecked';
    
    radioButtonWrapper.innerHTML = `
      <div class="${radioButtonData.radioButtonContainerClasses}">
        <input 
          type="radio" 
          id="demo-${state}" 
          class="${radioButtonData.baseClasses} ${radioButtonData.variants[state]}"
          ${isChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
        />
      </div>
      <div>
        <strong class="${radioButtonData.labelTextClasses}">
          ${state} state
        </strong>
        <p class="${radioButtonData.descriptionClasses}">This shows the ${state} visual style</p>
      </div>
    `;
    
    stateWrapper.appendChild(stateLabel);
    stateWrapper.appendChild(radioButtonWrapper);
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/radio-button.njk" import renderRadioButton %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Render a single radio button by ID:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderRadioButton({ id: "option1", datas: atoms.radio-buttons }) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Render an entire radio button group:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderRadioButton({ 
  group: true, 
  groupLabel: "Your RPG Combat Style",
  groupSrOnly: false,
  datas: atoms.radio-buttons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Render a subset of radio buttons:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% set combatStyles = [
  { "id": "option1", "name": "combat_style", "label": "I only fight barehanded, no matter what weapons I find.", "value": "fist-fighter" },
  { "id": "option2", "name": "combat_style", "label": "I block with my face instead of using a shield.", "value": "damage-tank" }
] %}
{{ renderRadioButton({ 
  group: true, 
  groupLabel: "Custom Group", 
  radioButtons: rpgClasses, 
  datas: { 
    globalStyle: atoms.radio-buttons.globalStyle, 
    variants: atoms.radio-buttons.variants,
    baseClasses: atoms.radio-buttons.baseClasses,
    labelClasses: atoms.radio-buttons.labelClasses
  } 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available options for each radio button:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "id": "unique_id",            // Unique identifier
  "name": "group_name",         // Name for the group (same across related radios)
  "label": "Radio Label",       // Visible text
  "value": "submission_value",  // Value for form submission
  "checked": true,              // Pre-checked state (optional)
  "disabled": false,            // Disabled state (optional)
  "description": "Additional details about the option" // (optional)
  "ariaLabel": "Accessible label for screen readers" // (optional)
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Available states:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(radioButtonData.variants).map(([state, className]) => `
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