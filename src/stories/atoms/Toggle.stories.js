// src/stories/atoms/Toggle.stories.js
import nunjucks from 'nunjucks';

// Données JSON complètes pour les toggles, incluant les propriétés thumb
const togglesData = {
  "globalStyle": "appearance-none transition-all duration-200 font-sans text-gray-700",
  "groupLabel": "Game Master Settings",
  "fieldsetClasses": "toggle-group",
  "legendClasses": "font-medium text-gray-700 mb-3",
  "groupContainerClasses": "space-y-2",
  "labelTextClasses": "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300", 
  "descriptionClasses": "text-xs text-gray-500 dark:text-gray-400",
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
    }
  },
  
  "toggles": [
    { 
      "id": "combat_difficulty", 
      "label": "Hardcore Mode", 
      "value": "enabled", 
      "description": "Enable brutally challenging gameplay",
      "variant": "default"
    },
    { 
      "id": "auto_save", 
      "label": "Auto-Save", 
      "value": "on", 
      "description": "Automatically save your progress",
      "checked": true,
      "variant": "checked"
    },
    { 
      "id": "debug_mode", 
      "label": "Debug Cheats", 
      "value": "activated", 
      "description": "Unlock hidden developer tools",
      "disabled": true,
      "variant": "disabled"
    },
    { 
      "id": "boss_notifications", 
      "label": "Boss Wave Alerts", 
      "value": "enabled", 
      "description": "Get warned before epic boss encounters",
      "checked": true,
      "disabled": true,
      "variant": "disabledChecked"
    },
    { 
      "id": "daily_rewards", 
      "label": "Daily Rewards", 
      "value": "enabled", 
      "description": "Receive daily login bonuses",
      "variant": "hover"
    },
    { 
      "id": "critical_hits", 
      "label": "Critical Hit Notifications", 
      "value": "enabled", 
      "description": "Show special effect on critical hits",
      "variant": "focus"
    }
  ]
};

// Template Nunjucks pour les toggles
const toggleTemplate = `
{#
=========================
         TOGGLE          
=========================
#}

{% macro renderToggle(options) %}
  {% set globalStyle = options.datas.globalStyle | default('') %}
  {% set fieldsetClasses = options.datas.fieldsetClasses | default('toggle-group') %}
  {% set legendClasses = options.datas.legendClasses | default('font-medium text-gray-700 mb-3') %}
  {% set groupContainerClasses = options.datas.groupContainerClasses | default('space-y-2') %}
  
  {% if options.group %}
    <fieldset class="{{ fieldsetClasses }}">
      {% if options.groupLabel %}
        <legend class="{{ legendClasses }} {% if options.groupSrOnly %}sr-only{% endif %}">
          {{ options.groupLabel }}
        </legend>
      {% endif %}
      
      <div class="{{ groupContainerClasses }}">
        {% for toggle in options.datas.toggles %}
          {{ renderSingleToggle(toggle, options.datas) }}
        {% endfor %}
      </div>
    </fieldset>
  {% else %}
    {% set toggleData = null %}
    
    {% for toggle in options.datas.toggles %}
      {% if toggle.id == options.id %}
        {% set toggleData = toggle %}
      {% endif %}
    {% endfor %}
    
    {% if toggleData %}
      {{ renderSingleToggle(toggleData, options.datas) }}
    {% else %}
      <span class="{{ options.datas.errorClasses | default('text-red-500') }}">Toggle not found: {{ options.id }}</span>
    {% endif %}
  {% endif %}
{% endmacro %}

{% macro renderSingleToggle(toggle, datas) %}
  {% set labelTextClasses = datas.labelTextClasses | default('ms-3 text-sm font-medium text-gray-900 dark:text-gray-300') %}
  {% set descriptionClasses = datas.descriptionClasses | default('text-xs text-gray-500 dark:text-gray-400') %}
  
  {# Determine variant, default to 'default' if not specified #}
  {% set variant = toggle.variant | default('default') %}
  
  {# Determine additional state classes based on toggle state #}
  {% if toggle.disabled and toggle.checked %}
    {% set variant = 'disabledChecked' %}
  {% elseif toggle.disabled %}
    {% set variant = 'disabled' %}
  {% elseif toggle.checked %}
    {% set variant = 'checked' %}
  {% endif %}
  
  {# Retrieve specific classes for the selected variant #}
  {% set toggleBaseClasses = datas.variants.container[variant].base %}
  {% set toggleCheckedClasses = datas.variants.container[variant].checked %}
  {% set toggleFocusClasses = datas.variants.container[variant].focus %}
  
  {# Retrieve thumb classes for the current variant #}
  {% set thumbBaseClasses = datas.variants.thumb[variant].base | default('bg-white') %}
  {% set thumbCheckedClasses = datas.variants.thumb[variant].checked | default('bg-white') %}
  
  <label class="inline-flex items-center cursor-pointer {% if toggle.disabled %}opacity-50 cursor-not-allowed{% endif %}">
    <input 
      type="checkbox" 
      id="{{ toggle.id }}" 
      name="{{ toggle.id }}"
      value="{{ toggle.value }}"
      class="sr-only peer"
      {% if toggle.checked %}checked{% endif %}
      {% if toggle.disabled %}disabled{% endif %}
      {% if toggle.ariaLabel %}aria-label="{{ toggle.ariaLabel }}"{% endif %}
    />
    <div 
      class="relative w-11 h-6 rounded-full transition-all duration-200 
      {{ toggleBaseClasses }}
      {% if toggle.checked %}{{ toggleCheckedClasses }}{% endif %}
      peer-focus:outline-none peer-focus:ring-4 {{ toggleFocusClasses }}"
    >
      <div 
        class="absolute top-1/2 -translate-y-1/2 rounded-full h-5 w-5 transition-all duration-200
        {{ thumbBaseClasses }}
        {% if toggle.checked %}
          right-[2px] left-auto
        {% else %}
          left-[2px] right-auto
        {% endif %}"
      ></div>
    </div>
    
    <div class="ml-3">
      <span class="{{ labelTextClasses }}">
        {{ toggle.label }}
      </span>
      
      {% if toggle.description %}
        <p class="{{ descriptionClasses }}">{{ toggle.description }}</p>
      {% endif %}
    </div>
  </label>
{% endmacro %}

{{ renderToggle(options) }}
`;

export default {
  title: 'Atoms/Toggle',
  tags: ['autodocs'],
  
  argTypes: {
    id: {
      description: 'ID of the toggle to render',
      control: 'select',
      options: togglesData.toggles.map(toggle => toggle.id)
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

// Render un toggle individuel
export const SingleToggle = {
  render: (args) => {
    return nunjucks.renderString(toggleTemplate, {
      options: {
        id: args.id,
        datas: togglesData
      }
    });
  },
  args: {
    id: 'combat_difficulty'
  }
};

// Render un groupe de toggles
export const ToggleGroup = {
  render: (args) => {
    return nunjucks.renderString(toggleTemplate, {
      options: {
        group: true,
        groupLabel: args.groupLabel,
        groupSrOnly: args.groupSrOnly,
        datas: togglesData
      }
    });
  },
  args: {
    groupLabel: 'Game Master Settings',
    groupSrOnly: false
  }
};

// Démo des différents états
export const ToggleStates = {
  render: () => {
    return `
      <div class="space-y-6 p-4 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Toggle States</h2>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Default</h3>
          ${nunjucks.renderString(toggleTemplate, {
            options: {
              id: 'combat_difficulty',
              datas: togglesData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Checked</h3>
          ${nunjucks.renderString(toggleTemplate, {
            options: {
              id: 'auto_save',
              datas: togglesData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Disabled</h3>
          ${nunjucks.renderString(toggleTemplate, {
            options: {
              id: 'debug_mode',
              datas: togglesData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Disabled & Checked</h3>
          ${nunjucks.renderString(toggleTemplate, {
            options: {
              id: 'boss_notifications',
              datas: togglesData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Hover</h3>
          ${nunjucks.renderString(toggleTemplate, {
            options: {
              id: 'daily_rewards',
              datas: togglesData
            }
          })}
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-gray-700 mb-2">Focus</h3>
          ${nunjucks.renderString(toggleTemplate, {
            options: {
              id: 'critical_hits',
              datas: togglesData
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/toggle.njk" import renderToggle %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Render a single toggle by ID:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderToggle({ 
  id: "combat_difficulty", 
  datas: atoms.toggles 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Render an entire toggle group:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderToggle({ 
  group: true, 
  groupLabel: "Game Settings",
  groupSrOnly: false,
  datas: atoms.toggles 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Render a subset of toggles:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% set gameSettings = [
  { "id": "music", "label": "Background Music", "value": "music_on" },
  { "id": "sound", "label": "Sound Effects", "value": "sound_on" }
] %}
{{ renderToggle({ 
  group: true, 
  groupLabel: "Audio Settings", 
  toggles: gameSettings, 
  datas: atoms.toggles
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available options for each toggle:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "id": "unique_id",            // Unique identifier
  "label": "Toggle Label",      // Visible text
  "value": "submission_value",  // Value for form submission
  "checked": true,              // Pre-checked state (optional)
  "disabled": false,            // Disabled state (optional)
  "description": "Additional details" // (optional)
  "ariaLabel": "Accessible label" // (optional)
  "variant": "default"          // Visual variant (optional)
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