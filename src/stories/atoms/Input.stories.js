// src/stories/atoms/Input.stories.js
import nunjucks from 'nunjucks';
import inputsData from '../../_data/atoms/inputs.json';

// Template based on our input.njk macro
const inputTemplate = `
  {% macro renderInput(options) %}
    {% if options.name %}
      {% set inputData = null %}
      
      {% for input in datas.inputs %}
        {% if input.name == options.name %}
          {% set inputData = input %}
        {% endif %}
      {% endfor %}

      {% set globalStyle = datas.globalStyle %}
      {% set inputWidth = datas.inputWidth | default('w-64') %} 

      {% if inputData %}
        {% set variantStyle = datas.variants[inputData.style] | default('') %}
        
        <div class="flex flex-col gap-1 {{ globalStyle }} {{ variantStyle }}">
          {% if inputData.label %}
            <label for="{{ inputData.id }}" class="font-medium text-gray-700">
              {{ inputData.label }}{% if inputData.required %} *{% endif %}
            </label>
          {% endif %}

          {% set baseClasses = "border rounded-md px-3 py-2 focus:outline-none " ~ inputWidth %}
          {% set stateClasses = {
            'default': datas.variants.default | default('border-gray-300'),
            'hover': datas.variants.hover | default('border-blue-400'),
            'focus': datas.variants.focus | default('border-blue-600 ring-1 ring-blue-600'),
            'active': datas.variants.active | default('border-blue-700'),
            'disabled': datas.variants.disabled | default('border-gray-200 bg-gray-100 cursor-not-allowed'),
            'filled': datas.variants.filled | default('border-green-500'),
            'critical': datas.variants.critical | default('border-red-500')
          } %}
          
          {% if inputData.style and datas.variants[inputData.style] %}
            {% set inputClasses = baseClasses ~ ' ' ~ datas.variants[inputData.style] %}
          {% else %}
            {% set inputClasses = baseClasses ~ ' ' ~ stateClasses.default %}
          {% endif %}
          
          {% if inputData.disabled %}
            {% set inputClasses = baseClasses ~ ' ' ~ stateClasses.disabled %}
          {% endif %}
          
          {% if inputData.type in ["text", "phone"] %}
            <input 
              type="{{ inputData.type }}" 
              id="{{ inputData.id }}" 
              name="{{ inputData.name }}" 
              placeholder="{{ inputData.placeholder }}" 
              class="{{ inputClasses }}"
              {% if not inputData.disabled %}
              onfocus="this.className='{{ baseClasses }} {{ stateClasses.focus }}'" 
              onblur="this.className='{{ inputClasses }}'" 
              onmouseover="this.className='{{ baseClasses }} {{ stateClasses.hover }}'" 
              onmouseout="this.className='{{ inputClasses }}'"
              onmousedown="this.className='{{ baseClasses }} {{ stateClasses.active }}'" 
              {% endif %}
              {% if inputData.disabled %}disabled{% endif %}
            />
          {% elif inputData.type == "textarea" %}
            <textarea 
              id="{{ inputData.id }}" 
              name="{{ inputData.name }}" 
              placeholder="{{ inputData.placeholder }}" 
              class="{{ inputClasses }}"
              {% if not inputData.disabled %}
              onfocus="this.className='{{ baseClasses }} {{ stateClasses.focus }}'" 
              onblur="this.className='{{ inputClasses }}'" 
              onmouseover="this.className='{{ baseClasses }} {{ stateClasses.hover }}'" 
              onmouseout="this.className='{{ inputClasses }}'"
              onmousedown="this.className='{{ baseClasses }} {{ stateClasses.active }}'" 
              {% endif %}
              {% if inputData.disabled %}disabled{% endif %}
            ></textarea>
          {% elif inputData.type in ["select", "multi-select"] %}
            <select id="{{ inputData.id }}" name="{{ inputData.name }}" 
              {% if inputData.type == "multi-select" %}multiple{% endif %} 
              class="{{ inputClasses }}"
              {% if not inputData.disabled %}
              onfocus="this.className='{{ baseClasses }} {{ stateClasses.focus }}'" 
              onblur="this.className='{{ inputClasses }}'" 
              onmouseover="this.className='{{ baseClasses }} {{ stateClasses.hover }}'" 
              onmouseout="this.className='{{ inputClasses }}'"
              onmousedown="this.className='{{ baseClasses }} {{ stateClasses.active }}'" 
              {% endif %}
              {% if inputData.disabled %}disabled{% endif %}>
              {% for option in inputData.options %}
                <option value="{{ option.value }}">{{ option.label }}</option>
              {% endfor %}
            </select>
          {% elif inputData.type == "datepicker" %}
            <input 
              type="date" 
              id="{{ inputData.id }}" 
              name="{{ inputData.name }}" 
              class="{{ inputClasses }}"
              onfocus="this.className='{{ baseClasses }} {{ stateClasses.focus }}'" 
              onblur="this.className='{{ baseClasses }} {{ stateClasses.default }}'" 
              onmouseover="this.className='{{ baseClasses }} {{ stateClasses.hover }}'" 
              onmousedown="this.className='{{ baseClasses }} {{ stateClasses.active }}'" 
              {% if inputData.disabled %}disabled class="{{ stateClasses.disabled }}"{% endif %}
            />
          {% endif %}
        </div>
      {% else %}
        <span class="text-red-500">Input not found: {{ options.name }}</span>
      {% endif %}
    {% else %}
      {% set globalStyle = datas.globalStyle %}
      {% set inputWidth = datas.inputWidth | default('w-64') %}
      
      <div class="flex flex-col gap-1 {{ globalStyle }}">
        {% if options.label %}
          <label for="{{ options.id }}" class="font-medium text-gray-700">
            {{ options.label }}{% if options.required %} *{% endif %}
          </label>
        {% endif %}

        {% set baseClasses = "border rounded-md px-3 py-2 focus:outline-none " ~ inputWidth %}
        {% set stateClasses = {
          'default': datas.variants.default | default('border-gray-300'),
          'hover': datas.variants.hover | default('border-blue-400'),
          'focus': datas.variants.focus | default('border-blue-600 ring-1 ring-blue-600'),
          'active': datas.variants.active | default('border-blue-700'),
          'disabled': datas.variants.disabled | default('border-gray-200 bg-gray-100 cursor-not-allowed'),
          'filled': datas.variants.filled | default('border-green-500'),
          'critical': datas.variants.critical | default('border-red-500')
        } %}
        
        {% if options.style and datas.variants[options.style] %}
          {% set inputClasses = baseClasses ~ ' ' ~ datas.variants[options.style] %}
        {% else %}
          {% set inputClasses = baseClasses ~ ' ' ~ stateClasses.default %}
        {% endif %}
        
        {% if options.disabled %}
          {% set inputClasses = baseClasses ~ ' ' ~ stateClasses.disabled %}
        {% endif %}
        
        {% if options.type in ["text", "phone"] or not options.type %}
          <input 
            type="{{ options.type | default('text') }}" 
            id="{{ options.id | default('custom-input') }}" 
            name="{{ options.id | default('custom-input') }}" 
            placeholder="{{ options.placeholder | default('Enter text...') }}" 
            class="{{ inputClasses }}"
            {% if not options.disabled %}
            onfocus="this.className='{{ baseClasses }} {{ stateClasses.focus }}'" 
            onblur="this.className='{{ inputClasses }}'" 
            onmouseover="this.className='{{ baseClasses }} {{ stateClasses.hover }}'" 
            onmouseout="this.className='{{ inputClasses }}'"
            onmousedown="this.className='{{ baseClasses }} {{ stateClasses.active }}'" 
            {% endif %}
            {% if options.disabled %}disabled{% endif %}
          />
        {% elif options.type == "textarea" %}
          <textarea 
            id="{{ options.id | default('custom-textarea') }}" 
            name="{{ options.id | default('custom-textarea') }}" 
            placeholder="{{ options.placeholder | default('Enter text...') }}" 
            class="{{ inputClasses }}"
            {% if not options.disabled %}
            onfocus="this.className='{{ baseClasses }} {{ stateClasses.focus }}'" 
            onblur="this.className='{{ inputClasses }}'" 
            onmouseover="this.className='{{ baseClasses }} {{ stateClasses.hover }}'" 
            onmouseout="this.className='{{ inputClasses }}'"
            onmousedown="this.className='{{ baseClasses }} {{ stateClasses.active }}'" 
            {% endif %}
            {% if options.disabled %}disabled{% endif %}
          ></textarea>
        {% elif options.type == "datepicker" %}
          <input 
            type="date" 
            id="{{ options.id | default('custom-date') }}" 
            name="{{ options.id | default('custom-date') }}" 
            class="{{ inputClasses }}"
            {% if not options.disabled %}
            onfocus="this.className='{{ baseClasses }} {{ stateClasses.focus }}'" 
            onblur="this.className='{{ inputClasses }}'" 
            onmouseover="this.className='{{ baseClasses }} {{ stateClasses.hover }}'" 
            onmouseout="this.className='{{ inputClasses }}'"
            onmousedown="this.className='{{ baseClasses }} {{ stateClasses.active }}'" 
            {% endif %}
            {% if options.disabled %}disabled{% endif %}
          />
        {% endif %}
      </div>
    {% endif %}
  {% endmacro %}
  
  {{ renderInput(options) }}
`;

export default {
  title: 'Atoms/Input',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: inputsData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(inputTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined input',
      control: 'select',
      options: ['', ...inputsData.inputs.map(input => input.name)],
      defaultValue: ''
    },
    type: { 
      description: 'Input type (for custom inputs)',
      control: 'select',
      options: ['text', 'phone', 'textarea', 'select', 'multi-select', 'datepicker'],
      defaultValue: 'text'
    },
    label: { 
      description: 'Label text (for custom inputs)',
      control: 'text',
      defaultValue: 'Custom Input'
    },
    placeholder: { 
      description: 'Placeholder text (for custom inputs)',
      control: 'text',
      defaultValue: 'Enter text...'
    },
    required: { 
      description: 'Whether the input is required',
      control: 'boolean',
      defaultValue: false
    },
    disabled: { 
      description: 'Whether the input is disabled',
      control: 'boolean',
      defaultValue: false
    },
    style: { 
      description: 'Visual style variant (for custom inputs)',
      control: { 
        type: 'select', 
        options: Object.keys(inputsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Predefined inputs from data
export const TextInput = {
  args: {
    name: "text_input"
  }
};

export const PhoneInput = {
  args: {
    name: "phone_input"
  }
};

export const TextareaInput = {
  args: {
    name: "textarea_input"
  }
};

export const SelectInput = {
  args: {
    name: "select_input"
  }
};

export const MultiSelectInput = {
  args: {
    name: "multi_select_input"
  }
};

export const DatepickerInput = {
  args: {
    name: "datepicker_input"
  }
};

// Custom inputs with different states
export const CustomTextInput = {
  args: {
    label: 'Custom Text Input',
    placeholder: 'Type something here...',
    type: 'text',
    style: 'default'
  }
};

export const DefaultInput = {
  args: {
    label: 'Default State Input',
    placeholder: 'Default state...',
    type: 'text',
    style: 'default'
  }
};

export const HoverState = {
  args: {
    label: 'Hover State Input',
    placeholder: 'Hover over me...',
    type: 'text',
    style: 'hover'
  }
};

export const FocusState = {
  args: {
    label: 'Focus State Input',
    placeholder: 'Click me...',
    type: 'text',
    style: 'focus'
  }
};

export const ActiveState = {
  args: {
    label: 'Active State Input',
    placeholder: 'Click and hold...',
    type: 'text',
    style: 'active'
  }
};

export const FilledState = {
  args: {
    label: 'Filled State Input',
    placeholder: 'With value...',
    type: 'text',
    style: 'filled'
  }
};

export const CriticalState = {
  args: {
    label: 'Critical State Input',
    placeholder: 'Error state...',
    type: 'text',
    style: 'critical'
  }
};

export const DisabledState = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot be modified',
    type: 'text',
    disabled: true
  }
};

export const RequiredInput = {
  args: {
    label: 'Required Input',
    placeholder: 'This field is required',
    type: 'text',
    required: true,
    style: 'default'
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/input.njk" import renderInput %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific input by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInput({ 
  name: "text_input", 
  datas: atoms.inputs 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all inputs:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for input in atoms.inputs.inputs %}
  {{ renderInput({ 
    name: input.name, 
    datas: atoms.inputs 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Create a custom input:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderInput({
  id: "custom-input", 
  label: "Custom Input", 
  placeholder: "Enter something...", 
  type: "text", 
  style: "primary",
  required: true
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(inputsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new input to inputs.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "inputs": [
    {
      "name": "new_input",
      "type": "text",
      "label": "New Input",
      "id": "newInput",
      "placeholder": "Enter text...",
      "required": true,
      "style": "default"
    }
  ]
}</code></pre>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May your bugs be forever exiled to the shadow realm. ✨</p>
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