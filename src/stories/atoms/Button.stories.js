// src/stories/atoms/Button.stories.js
import nunjucks from 'nunjucks';
import buttonsData from '../../_data/atoms/buttons.json';

// Template based on our button.njk macro
const buttonTemplate = `
  {% macro renderButton(options) %}
    {# Check if datas is provided #}
    {% if not options.datas %}
      <span class="text-red-500">Error: No button configuration provided</span>
    {% else %}
      {# Retrieve button configuration #}
      {% set buttonsConfig = options.datas %}
      {% set buttonName = options.name %}
      
      {# Find the specific button by name #}
      {% set buttonData = null %}
      {% for button in buttonsConfig.buttons %}
        {% if button.name == buttonName %}
          {% set buttonData = button %}
        {% endif %}
      {% endfor %}
  
      {# Fallback if button not found #}
      {% if not buttonData and options.name %}
        <span class="text-red-500">Button not found: {{ buttonName }}</span>
      {% else %}
        {# Determine variant configuration #}
        {% if options.style %}
          {% set variant = options.style %}
        {% elif buttonData and buttonData.style %}
          {% set variant = buttonData.style %}
        {% else %}
          {% set variant = 'primary' %}
        {% endif %}
        
        {% set variantConfig = buttonsConfig.variants[variant] %}
        
        {# Determine size #}
        {% if options.size %}
          {% set size = options.size %}
        {% elif buttonData and buttonData.size %}
          {% set size = buttonData.size %}
        {% else %}
          {% set size = 'button' %}
        {% endif %}
        
        {# Determine all classes #}
        {% set globalClasses = buttonsConfig.globalStyle %}
        {% set sizeClasses = buttonsConfig.sizes[size] %}
        
        {# Set base classes and state classes #}
        {% set baseClasses = globalClasses ~ ' ' ~ sizeClasses %}
        {% set stateClasses = {
          'default': variantConfig.default,
          'hover': variantConfig.hover,
          'focus': variantConfig.focus,
          'active': variantConfig.active,
          'disabled': variantConfig.disabled
        } %}
        
        {# Combine all default classes for initial state #}
        {% set currentState = options.state | default('default') %}
        {% set combinedClasses = baseClasses ~ ' ' ~ stateClasses[currentState] %}
        
        {# Define button text #}
        {% if options.text %}
          {% set buttonText = options.text %}
        {% elif buttonData and buttonData.text %}
          {% set buttonText = buttonData.text %}
        {% else %}
          {% set buttonText = 'Button' %}
        {% endif %}
        
        {# Define number for fixed buttons #}
        {% if options.number %}
          {% set buttonNumber = options.number %}
        {% elif buttonData and buttonData.number %}
          {% set buttonNumber = buttonData.number %}
        {% else %}
          {% set buttonNumber = null %}
        {% endif %}
        
        {# Define icons - Based on button.njk logic #}
        {% if options.iconBefore !== undefined %}
          {% set iconBefore = options.iconBefore %}
        {% elif buttonData and buttonData.iconBefore %}
          {% set iconBefore = buttonData.iconBefore %}
        {% else %}
          {% set iconBefore = false %}
        {% endif %}
        
        {% if options.iconAfter !== undefined %}
          {% set iconAfter = options.iconAfter %}
        {% elif buttonData and buttonData.iconAfter %}
          {% set iconAfter = buttonData.iconAfter %}
        {% else %}
          {% set iconAfter = false %}
        {% endif %}
        
        {% if options.icon !== undefined %}
          {% set icon = options.icon %}
        {% elif buttonData and buttonData.icon %}
          {% set icon = buttonData.icon %}
        {% else %}
          {% set icon = false %}
        {% endif %}
        
        {# Check if button is disabled #}
        {% set isDisabled = options.disabled or (buttonData and buttonData.disabled) or (currentState == 'disabled') %}
        
        {# Render the button #}
        <button 
          type="{{ options.type | default('button') }}"
          class="{{ combinedClasses }} flex items-center justify-center"
          {% if isDisabled %}disabled{% endif %}
        >
          {% if variant == 'icon' %}
            {# Icon-only button #}
            {% if iconBefore or icon %}
              <span class="inline-flex items-center justify-center w-5 h-5">
                {# For Storybook, we simulate the SVG content with an icon based on what would be in the file #}
                {# This simulates what {% svgContents iconBefore or icon %} would do in production #}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  {# The real SVG would be loaded from /assets/icons/icon-light.svg #}
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2" />
                  <path d="M12 21v2" />
                  <path d="M4.22 4.22l1.42 1.42" />
                  <path d="M18.36 18.36l1.42 1.42" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.22 19.78l1.42-1.42" />
                  <path d="M18.36 5.64l1.42-1.42" />
                </svg>
              </span>
            {% endif %}
          {% elif variant == 'fixed' %}
            {# Fixed button - display only number #}
            <span>{{ buttonNumber | default('42') }}</span>
          {% else %}
            {# Standard button with optional icons + text #}
            
            {# Before icon #}
            {% if iconBefore or icon %}
              <span class="inline-flex items-center justify-center mr-2 w-4 h-4">
                {# For Storybook, we emulate the svgContents filter with an inline SVG #}
                {# In a real environment, this would be: {% svgContents iconBefore or icon %} #}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 19l-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
              </span>
            {% endif %}
            
            {# Button text #}
            <span>{{ buttonText }}</span>
            
            {# After icon #}
            {% if iconAfter %}
              <span class="inline-flex items-center justify-center ml-2 w-4 h-4">
                {# For Storybook, we simulate the SVG content with an icon based on what would be in the file #}
                {# This simulates what {% svgContents iconAfter %} would do in production #}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  {# The real SVG would be loaded from /assets/icons/icon-light.svg #}
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2" />
                  <path d="M12 21v2" />
                  <path d="M4.22 4.22l1.42 1.42" />
                  <path d="M18.36 18.36l1.42 1.42" />
                  <path d="M1 12h2" />
                  <path d="M21 12h2" />
                  <path d="M4.22 19.78l1.42-1.42" />
                  <path d="M18.36 5.64l1.42-1.42" />
                </svg>
              </span>
            {% endif %}
          {% endif %}
        </button>
      {% endif %}
    {% endif %}
  {% endmacro %}
  
  {{ renderButton(options) }}
`;

export default {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      options: {
        ...args,
        datas: buttonsData
      }
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(buttonTemplate, context);
  },
  
  // Argument types for Storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined button',
      control: 'select',
      options: ['', 'submit_quest', 'flee_battle', 'inventory', 'quest_details', 'quantity_button', 'ghost_button'],
      defaultValue: ''
    },
    style: { 
      description: 'Visual style of the button',
      control: 'select',
      options: Object.keys(buttonsData.variants),
      defaultValue: 'primary'
    },
    size: { 
      description: 'Button size',
      control: 'select',
      options: Object.keys(buttonsData.sizes),
      defaultValue: 'button'
    },
    state: { 
      description: 'Button interaction state',
      control: 'select',
      options: ['default', 'hover', 'focus', 'active', 'disabled'],
      defaultValue: 'default'
    },
    text: { 
      description: 'Button text',
      control: 'text',
      defaultValue: ''
    },
    iconBefore: {
      description: 'Show icon before text (or path to SVG)',
      control: 'boolean',
      defaultValue: false
    },
    iconAfter: {
      description: 'Show icon after text (or path to SVG)',
      control: 'boolean',
      defaultValue: false
    },
    icon: {
      description: 'Single icon for icon buttons (or path to SVG)',
      control: 'boolean',
      defaultValue: false
    },
    number: {
      description: 'Number for fixed button',
      control: 'text',
      defaultValue: ''
    },
    disabled: {
      description: 'Whether the button is disabled',
      control: 'boolean',
      defaultValue: false
    }
  }
};

// Predefined buttons from data
export const SubmitQuest = {
  args: {
    name: "submit_quest"
  }
};

export const FleeBattle = {
  args: {
    name: "flee_battle"
  }
};

export const Inventory = {
  args: {
    name: "inventory"
  }
};

export const QuestDetails = {
  args: {
    name: "quest_details"
  }
};

export const QuantityButton = {
  args: {
    name: "quantity_button"
  }
};

export const GhostButton = {
  args: {
    name: "ghost_button"
  }
};

// Buttons with different states and styles
export const HoverState = {
  args: {
    text: 'Hover State',
    style: 'primary',
    state: 'hover'
  }
};

export const FocusState = {
  args: {
    text: 'Focus State',
    style: 'primary',
    state: 'focus'
  }
};

export const ActiveState = {
  args: {
    text: 'Active State',
    style: 'primary',
    state: 'active'
  }
};

export const DisabledButton = {
  args: {
    text: 'Disabled Button',
    style: 'primary',
    state: 'disabled'
  }
};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/button.njk" import renderButton %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Use a predefined button by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderButton({ 
  name: "submit_quest",
  datas: atoms.buttons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Customize a predefined button text:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderButton({ 
  name: "submit_quest", 
  text: "Custom Button Text",
  datas: atoms.buttons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a different style:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderButton({
  name: "submit_quest", 
  style: "secondary",
  datas: atoms.buttons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a button with icons:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderButton({
  text: "Button with Icons", 
  style: "primary",
  iconBefore: true,
  iconAfter: true,
  datas: atoms.buttons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Disabled button:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderButton({
  name: "submit_quest", 
  disabled: true,
  datas: atoms.buttons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">7. Fixed number button:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderButton({
  style: "fixed",
  number: "42",
  size: "button-small",
  datas: atoms.buttons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">8. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.keys(buttonsData.variants).map(style => `
            <li><code>${style}</code></li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">9. Available sizes:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.keys(buttonsData.sizes).map(size => `
            <li><code>${size}</code>: ${buttonsData.sizes[size]}</li>
          `).join('')}
        </ul>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">Don't forget to pass the configuration data via the atoms.buttons object!</p>
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
}