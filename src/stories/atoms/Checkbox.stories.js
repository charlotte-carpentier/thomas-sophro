import nunjucks from 'nunjucks';
import checkboxData from '../../_data/atoms/checkboxs.json';

const checkboxTemplate = `
  {% macro renderSingleCheckbox(checkbox, datas) %}
    {% set labelClasses = datas.labelClasses | default('flex cursor-pointer items-start gap-4') %}
    {% set checkboxContainerClasses = datas.checkboxContainerClasses | default('flex items-center') %}
    {% set baseClasses = datas.baseClasses | default('size-4 rounded-sm') %}
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
    
    <label for="demo-checkbox" class="{{ labelClasses }}">
      <div class="{{ checkboxContainerClasses }}">
        <input 
          type="checkbox" 
          id="demo-checkbox" 
          name="demo-checkbox"
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
  
  {{ renderSingleCheckbox({}, datas) }}
`;

// For group rendering
const checkboxGroupTemplate = `
  {% macro renderCheckboxGroup(options) %}
    {% set fieldsetClasses = datas.fieldsetClasses | default('checkbox-group') %}
    {% set legendClasses = datas.legendClasses | default('font-medium text-gray-700 mb-3') %}
    {% set groupContainerClasses = datas.groupContainerClasses | default('space-y-2') %}
    
    <fieldset class="{{ fieldsetClasses }}">
      <legend class="{{ legendClasses }}">
        {{ options.groupLabel | default('Checkbox Group') }}
      </legend>
      
      <div class="{{ groupContainerClasses }}">
        {% for checkbox in checkboxes %}
          {% set labelClasses = datas.labelClasses | default('flex cursor-pointer items-start gap-4') %}
          {% set checkboxContainerClasses = datas.checkboxContainerClasses | default('flex items-center') %}
          {% set baseClasses = datas.baseClasses | default('size-4 rounded-sm') %}
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
          
          <label for="{{ checkbox.id }}" class="{{ labelClasses }}">
            <div class="{{ checkboxContainerClasses }}">
              <input 
                type="checkbox" 
                id="{{ checkbox.id }}" 
                name="{{ checkbox.id }}"
                value="{{ checkbox.value }}"
                class="{{ inputClasses }}"
                {% if checkbox.checked %}checked{% endif %}
                {% if checkbox.disabled %}disabled{% endif %}
                {% if checkbox.ariaLabel %}aria-label="{{ checkbox.ariaLabel }}"{% endif %}
              />
            </div>
            <div>
              <strong class="{{ labelTextClasses }}">
                {{ checkbox.label }}
              </strong>
              {% if checkbox.description %}
                <p class="{{ descriptionClasses }}">{{ checkbox.description }}</p>
              {% endif %}
            </div>
          </label>
        {% endfor %}
      </div>
    </fieldset>
  {% endmacro %}
  
  {{ renderCheckboxGroup({}) }}
`;

export default {
  title: 'Atoms/Checkbox',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: checkboxData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(checkboxTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    label: { 
      description: 'Label text for the checkbox',
      control: 'text',
      defaultValue: 'I roll for initiative before entering a room.' 
    },
    description: {
      description: 'Optional description text',
      control: 'text',
      defaultValue: 'Safety first! You never know what lurks behind that door.'
    },
    value: {
      description: 'Form submission value',
      control: 'text',
      defaultValue: 'initiative'
    },
    state: { 
      description: 'Visual state of the checkbox',
      control: { 
        type: 'select', 
        options: Object.keys(checkboxData.variants)
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

// Single checkbox state examples
export const Default = {
  args: {
    label: 'I roll for initiative before entering a room.',
    description: 'Safety first! You never know what lurks behind that door.',
    value: 'initiative',
    state: 'default'
  }
};

export const Hover = {
  args: {
    label: 'I loot everything... even useless junk.',
    description: 'You never know when you might need 37 wooden spoons!',
    value: 'loot-hoarder',
    state: 'hover'
  }
};

export const Checked = {
  args: {
    label: 'I put all my skill points in charisma.',
    description: 'Why fight when you can talk your way out?',
    value: 'charisma',
    state: 'checked'
  }
};

export const Focus = {
  args: {
    label: 'I talk to NPCs until they run out of dialogue.',
    description: 'There might be hidden quest information!',
    value: 'npc-dialogue',
    state: 'focus'
  }
};

export const Disabled = {
  args: {
    label: 'I save before every important decision.',
    description: 'Just in case things go wrong...',
    value: 'save-scummer',
    state: 'disabled'
  }
};

export const DisabledChecked = {
  args: {
    label: 'I once tried to romance a dragon in-game.',
    description: 'Some digital relationships are just not meant to be.',
    value: 'dragon-romancer',
    state: 'disabledChecked'
  }
};

// Render a group of checkboxes
export const CheckboxGroup = () => {
  const groupTemplate = checkboxGroupTemplate;
  
  const context = {
    datas: checkboxData,
    checkboxes: checkboxData.checkboxes
  };
  
  return nunjucks.renderString(groupTemplate, context);
};

// States overview
export const States = () => {
  const container = document.createElement('div');
  container.className = 'grid grid-cols-1 gap-6 p-4';

  const states = Object.keys(checkboxData.variants);
  
  states.forEach(state => {
    const stateWrapper = document.createElement('div');
    stateWrapper.className = 'flex items-start gap-4';
    
    const stateLabel = document.createElement('span');
    stateLabel.textContent = state;
    stateLabel.className = 'text-sm font-semibold text-gray-700 w-24 pt-1';
    
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = checkboxData.labelClasses;
    
    // Create custom HTML for the checkbox and label
    const isChecked = state === 'checked' || state === 'disabledChecked';
    const isDisabled = state === 'disabled' || state === 'disabledChecked';
    
    checkboxWrapper.innerHTML = `
      <div class="${checkboxData.checkboxContainerClasses}">
        <input 
          type="checkbox" 
          id="demo-${state}" 
          class="${checkboxData.baseClasses} ${checkboxData.variants[state]}"
          ${isChecked ? 'checked' : ''}
          ${isDisabled ? 'disabled' : ''}
        />
      </div>
      <div>
        <strong class="${checkboxData.labelTextClasses}">
          ${state} state
        </strong>
        <p class="${checkboxData.descriptionClasses}">This shows the ${state} visual style</p>
      </div>
    `;
    
    stateWrapper.appendChild(stateLabel);
    stateWrapper.appendChild(checkboxWrapper);
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/checkbox.njk" import renderCheckbox %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Render a single checkbox by ID:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderCheckbox({ id: "option1", datas: atoms.checkboxs }) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Render an entire checkbox group:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderCheckbox({ 
  group: true, 
  groupLabel: "RPG Player Habits",
  groupSrOnly: false,
  datas: atoms.checkboxs 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Render a subset of checkboxes:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% set rpgOptions = [
  { "id": "option1", "label": "I put all my skill points in charisma.", "value": "charisma" },
  { "id": "option2", "label": "I loot everything... even useless junk.", "value": "loot-hoarder" }
] %}
{{ renderCheckbox({ 
  group: true, 
  groupLabel: "Custom Group", 
  checkboxes: rpgOptions, 
  datas: { 
    globalStyle: atoms.checkboxs.globalStyle, 
    variants: atoms.checkboxs.variants,
    baseClasses: atoms.checkboxs.baseClasses,
    labelClasses: atoms.checkboxs.labelClasses
  } 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available options for each checkbox:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "id": "unique_id",            // Unique identifier
  "label": "Checkbox Label",    // Visible text
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
          ${Object.entries(checkboxData.variants).map(([state, className]) => `
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