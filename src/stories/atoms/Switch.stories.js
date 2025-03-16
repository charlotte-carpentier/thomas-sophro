// src/stories/atoms/Switch.stories.js
import nunjucks from 'nunjucks';

// Données JSON complètes pour les switchs
const switchsData = {
  "globalStyle": "appearance-none transition-all duration-200 font-sans",
  "groupLabel": "Switch Controls",
  "fieldsetClasses": "switch-group",
  "legendClasses": "font-medium text-gray-700 mb-3",
  "groupContainerClasses": "flex space-x-4",
  "errorClasses": "text-red-500",
  
  "variants": {
    "container": {
      "default": {
        "base": "bg-white border border-gray-400"
      },
      "hover": {
        "base": "bg-white border border-gray-400"
      },
      "checked": {
        "base": "bg-gray-400 white border border-gray-400"
      },
      "focus": {
        "base": "bg-white border border-2 border-blue-400"
      },
      "disabled": {
        "base": "bg-white border border-gray-400"
      },
      "disabledChecked": {
        "base": "bg-gray-300 border border-gray-400"
      }
    },
    "thumb": {
      "default": {
        "base": "bg-gray-400 transform translate-x-0 transition-transform duration-200"
      },
      "hover": {
        "base": "bg-gray-400 transform translate-x-0 transition-transform duration-200"
      },
      "checked": {
        "base": "bg-white transform translate-x-0 transition-transform duration-200"
      },
      "focus": {
        "base": "bg-gray-400 transform translate-x-0 transition-transform duration-200"
      },
      "disabled": {
        "base": "bg-gray-300 transform translate-x-0 transition-transform duration-200"
      },
      "disabledChecked": {
        "base": "bg-white transform translate-x-0 transition-transform duration-200"
      }
    },
    "sizes": {
      "small": {
        "container": "w-8 h-4",
        "thumb": "h-3 w-3"
      },
      "medium": {
        "container": "w-11 h-6",
        "thumb": "h-5 w-5"
      },
      "large": {
        "container": "w-14 h-8",
        "thumb": "h-7 w-7"
      }
    }
  },
  
  "switchs": [
    { 
      "id": "power",
      "value": "on",
      "variant": "default",
      "size": "medium",
      "ariaLabel": "Toggle power"
    },
    { 
      "id": "wifi", 
      "value": "enabled",
      "checked": true,
      "variant": "checked",
      "size": "medium",
      "ariaLabel": "Toggle WiFi"
    },
    { 
      "id": "bluetooth", 
      "value": "enabled",
      "disabled": true,
      "variant": "disabled",
      "size": "medium",
      "ariaLabel": "Toggle Bluetooth"
    },
    { 
      "id": "nightMode", 
      "value": "active",
      "checked": true,
      "disabled": true,
      "variant": "disabledChecked",
      "size": "medium",
      "ariaLabel": "Toggle night mode"
    },
    { 
      "id": "small_switch",
      "value": "on",
      "variant": "default",
      "size": "small",
      "ariaLabel": "Toggle small switch"
    },
    { 
      "id": "large_switch",
      "value": "on",
      "variant": "default", 
      "size": "large",
      "ariaLabel": "Toggle large switch"
    }
  ]
};

// Template Nunjucks pour les switchs
const switchTemplate = `
{#
=========================
         SWITCH          
=========================
#}

{% macro renderSwitch(options) %}
  {% set globalStyle = options.datas.globalStyle | default('') %}
  {% set fieldsetClasses = options.datas.fieldsetClasses | default('switch-group') %}
  {% set legendClasses = options.datas.legendClasses | default('font-medium text-gray-700 mb-3') %}
  {% set groupContainerClasses = options.datas.groupContainerClasses | default('flex space-x-4') %}
  
  {% if options.group %}
    <fieldset class="{{ fieldsetClasses }}">
      {% if options.groupLabel %}
        <legend class="{{ legendClasses }} {% if options.groupSrOnly %}sr-only{% endif %}">
          {{ options.groupLabel }}
        </legend>
      {% endif %}
      
      <div class="{{ groupContainerClasses }}">
        {% for switch in options.datas.switchs %}
          {{ renderSingleSwitch(switch, options.datas) }}
        {% endfor %}
      </div>
    </fieldset>
  {% else %}
    {% set switchData = null %}
    
    {% for switch in options.datas.switchs %}
      {% if switch.id == options.id %}
        {% set switchData = switch %}
      {% endif %}
    {% endfor %}
    
    {% if switchData %}
      {{ renderSingleSwitch(switchData, options.datas) }}
    {% else %}
      <span class="{{ options.datas.errorClasses | default('text-red-500') }}">Switch not found: {{ options.id }}</span>
    {% endif %}
  {% endif %}
{% endmacro %}

{% macro renderSingleSwitch(switch, datas) %}
  {# Determine variant, default to 'default' if not specified #}
  {% set variant = switch.variant | default('default') %}
  {% set size = switch.size | default('medium') %}
  
  {# Determine additional state classes based on switch state #}
  {% if switch.disabled and switch.checked %}
    {% set variant = 'disabledChecked' %}
  {% elseif switch.disabled %}
    {% set variant = 'disabled' %}
  {% elseif switch.checked %}
    {% set variant = 'checked' %}
  {% endif %}
  
  {# Retrieve specific classes for the selected variant #}
  {% set switchBaseClasses = datas.variants.container[variant].base %}
  {% set switchFocusClasses = datas.variants.container[variant].focus %}
  
  {# Retrieve thumb classes for the current variant #}
  {% set thumbBaseClasses = datas.variants.thumb[variant].base | default('bg-white') %}
  
  {# Get size classes #}
  {% set containerSizeClasses = datas.variants.sizes[size].container %}
  {% set thumbSizeClasses = datas.variants.sizes[size].thumb %}
  
  <div class="inline-block {% if switch.disabled %}opacity-50{% endif %}">
    <label class="relative inline-block cursor-pointer {% if switch.disabled %}cursor-not-allowed{% endif %}">
      <input 
        type="checkbox" 
        id="{{ switch.id }}" 
        name="{{ switch.id }}"
        value="{{ switch.value }}"
        class="sr-only peer"
        {% if switch.checked %}checked{% endif %}
        {% if switch.disabled %}disabled{% endif %}
        {% if switch.ariaLabel %}aria-label="{{ switch.ariaLabel }}"{% endif %}
      />
      <div 
        class="relative rounded-full transition-all duration-200 
        {{ containerSizeClasses }}
        {{ switchBaseClasses }}
        peer-focus:outline-none peer-focus:ring-2 {{ switchFocusClasses }}"
      >
        <div 
          class="absolute top-1/2 -translate-y-1/2 rounded-full transition-all duration-200
          {{ thumbSizeClasses }}
          {{ thumbBaseClasses }}
          {% if switch.checked %}
            right-[2px] left-auto
          {% else %}
            left-[2px] right-auto
          {% endif %}"
        ></div>
      </div>
    </label>
  </div>
{% endmacro %}

{{ renderSwitch(options) }}
`;

export default {
  title: 'Atoms/Switch',
  tags: ['autodocs'],
  
  argTypes: {
    id: {
      description: 'ID of the switch to render',
      control: 'select',
      options: switchsData.switchs.map(switch_ => switch_.id)
    },
    group: {
      description: 'Render as a group',
      control: 'boolean'
    },
    groupLabel: {
      description: 'Label for the group',
      control: 'text'
    },
    groupSrOnly: {
      description: 'Make group label screen reader only',
      control: 'boolean'
    }
  }
};

// Render a single switch
export const SingleSwitch = {
  render: (args) => {
    return nunjucks.renderString(switchTemplate, {
      options: {
        id: args.id,
        datas: switchsData
      }
    });
  },
  args: {
    id: 'power'
  }
};

// Render a switch group
export const SwitchGroup = {
  render: (args) => {
    return nunjucks.renderString(switchTemplate, {
      options: {
        group: true,
        groupLabel: args.groupLabel,
        groupSrOnly: args.groupSrOnly,
        datas: switchsData
      }
    });
  },
  args: {
    groupLabel: 'Switch Controls',
    groupSrOnly: false
  }
};

// Demo of different states
export const SwitchStates = {
  render: () => {
    return `
      <div class="space-y-6 p-4 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Switch States</h2>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Default</h3>
          ${nunjucks.renderString(switchTemplate, {
            options: {
              id: 'power',
              datas: switchsData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Checked</h3>
          ${nunjucks.renderString(switchTemplate, {
            options: {
              id: 'wifi',
              datas: switchsData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Disabled</h3>
          ${nunjucks.renderString(switchTemplate, {
            options: {
              id: 'bluetooth',
              datas: switchsData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Disabled & Checked</h3>
          ${nunjucks.renderString(switchTemplate, {
            options: {
              id: 'nightMode',
              datas: switchsData
            }
          })}
        </div>
      </div>
    `;
  }
};

// Size variations
export const SwitchSizes = {
  render: () => {
    return `
      <div class="space-y-6 p-4 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Switch Sizes</h2>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Small</h3>
          ${nunjucks.renderString(switchTemplate, {
            options: {
              id: 'small_switch',
              datas: switchsData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Medium (Default)</h3>
          ${nunjucks.renderString(switchTemplate, {
            options: {
              id: 'power',
              datas: switchsData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Large</h3>
          ${nunjucks.renderString(switchTemplate, {
            options: {
              id: 'large_switch',
              datas: switchsData
            }
          })}
        </div>
      </div>
    `;
  }
};

// Guide d'utilisation
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Summon HAT Components Wisely</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/switch.njk" import renderSwitch %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Render a single switch by ID:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSwitch({ 
  id: "power", 
  datas: atoms.switchs 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Render a switch group:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderSwitch({ 
  group: true, 
  groupLabel: "Device Controls",
  groupSrOnly: false,
  datas: atoms.switchs 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available size options:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">- "small"  (w-8 h-4, thumb h-3 w-3)
- "medium" (w-11 h-6, thumb h-5 w-5) - Default
- "large"  (w-14 h-8, thumb h-7 w-7)</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available options for each switch:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "id": "unique_id",            // Unique identifier
  "value": "submission_value",  // Value for form submission
  "checked": true,              // Pre-checked state (optional)
  "disabled": false,            // Disabled state (optional)
  "variant": "default",         // Visual variant (optional)
  "size": "medium",             // Size variant (optional)
  "ariaLabel": "Accessible description" // (required for accessibility)
}</code></pre>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May your state management be forever simplified. ⚡</p>
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