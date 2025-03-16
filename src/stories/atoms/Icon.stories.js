// src/stories/atoms/Icon.stories.js
import nunjucks from 'nunjucks';
import iconsData from '../../_data/atoms/icons.json';

// Template for rendering icons based on our macro
const iconTemplate = `
  {% macro renderIcon(options) %}
    {% if options.name %}
      {% set iconData = null %}
      {% for icon in datas.icons %}
        {% if icon.name == options.name %}
          {% set iconData = icon %}
        {% endif %}
      {% endfor %}

      {% if iconData %}
        {% set size = options.size | default(iconData.defaultSize) %}
        {% set dimensions = datas.sizes[size] | default(datas.sizes.md) %}
        {% set width = dimensions.split('x')[0] %}
        {% set height = dimensions.split('x')[1] %}
        
        {% set variantStyle = datas.variants[options.variant] | default('') %}
        
        <img 
          src="{{ iconData.path }}" 
          alt="{{ iconData.alt }}" 
          width="{{ width }}" 
          height="{{ height }}" 
          class="{{ datas.globalClass }} {{ variantStyle }} {{ options.class | default('') }}"
        >
      {% else %}
        <span class="text-red-500">Icon not found: {{ options.name }}</span>
      {% endif %}
    {% else %}
      {% set size = options.size | default('md') %}
      {% set dimensions = datas.sizes[size] | default(datas.sizes.md) %}
      {% set width = dimensions.split('x')[0] %}
      {% set height = dimensions.split('x')[1] %}
      
      {% set variantStyle = datas.variants[options.variant] | default('') %}
      
      <img 
        src="{{ options.path }}" 
        alt="{{ options.alt | default('Icon') }}" 
        width="{{ width }}" 
        height="{{ height }}" 
        class="{{ datas.globalClass }} {{ variantStyle }} {{ options.class | default('') }}"
        style="{% if options.variant %}color: currentColor;{% endif %}"
      >
    {% endif %}
  {% endmacro %}
  
  {{ renderIcon(options) }}
`;

export default {
  title: 'Atoms/Icon',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: iconsData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(iconTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined icon',
      control: 'select',
      options: iconsData.icons.map(icon => icon.name),
      defaultValue: iconsData.icons[0].name
    },
    size: { 
      description: 'Size of the icon',
      control: 'select',
      options: Object.keys(iconsData.sizes),
      defaultValue: 'md'
    },
    variant: { 
      description: 'Visual style variant',
      control: { 
        type: 'select', 
        options: Object.keys(iconsData.variants)
      },
      defaultValue: 'default'
    },
    path: { 
      description: 'Custom path for direct usage (ignores name)',
      control: 'text',
      defaultValue: null
    },
    alt: { 
      description: 'Alt text for accessibility (for custom path)',
      control: 'text',
      defaultValue: 'Icon'
    },
    class: { 
      description: 'Additional CSS classes',
      control: 'text',
      defaultValue: ''
    }
  }
};

// Examples for the standard icons
export const BrandIcon = {
  args: {
    name: "brand",
    size: "lg"
  }
};

export const LightIcon = {
  args: {
    name: "icon-light",
    size: "md"
  }
};

export const DarkIcon = {
  args: {
    name: "icon-dark",
    size: "md"
  }
};

// Size variations for the brand icon
export const IconSizes = () => {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-6 items-end p-6 bg-gray-50 rounded-lg';
  
  const sizes = Object.keys(iconsData.sizes);
  sizes.forEach(size => {
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex flex-col items-center gap-2';
    
    const dimensions = iconsData.sizes[size].split('x');
    const width = dimensions[0];
    const height = dimensions[1];
    
    // Create icon
    const icon = document.createElement('img');
    icon.src = iconsData.icons[0].path;
    icon.alt = iconsData.icons[0].alt;
    icon.width = width;
    icon.height = height;
    icon.className = iconsData.globalClass;
    
    // Create label
    const label = document.createElement('span');
    label.className = 'text-xs text-gray-500';
    label.textContent = `${size} (${width}x${height})`;
    
    iconWrapper.appendChild(icon);
    iconWrapper.appendChild(label);
    container.appendChild(iconWrapper);
  });
  
  return container;
};

// Variant examples
export const IconVariants = () => {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-8 p-6 bg-gray-50 rounded-lg';
  
  const variants = Object.keys(iconsData.variants);
  variants.forEach(variant => {
    const variantWrapper = document.createElement('div');
    variantWrapper.className = 'flex flex-col items-center gap-2';
    
    // Create icon with variant
    const icon = document.createElement('img');
    icon.src = iconsData.icons[0].path;
    icon.alt = iconsData.icons[0].alt;
    icon.width = 32;
    icon.height = 32;
    icon.className = `${iconsData.globalClass} ${iconsData.variants[variant]}`;
    
    // Create label
    const label = document.createElement('span');
    label.className = 'text-xs text-gray-500';
    label.textContent = variant;
    
    variantWrapper.appendChild(icon);
    variantWrapper.appendChild(label);
    container.appendChild(variantWrapper);
  });
  
  return container;
};

// All Icons
export const AllIcons = () => {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-8 p-6 bg-gray-50 rounded-lg';
  
  iconsData.icons.forEach(icon => {
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'flex flex-col items-center gap-2';
    
    // Create icon
    const img = document.createElement('img');
    img.src = icon.path;
    img.alt = icon.alt;
    img.width = 32;
    img.height = 32;
    img.className = iconsData.globalClass;
    
    // Create label
    const label = document.createElement('span');
    label.className = 'text-xs text-gray-500';
    label.textContent = icon.name;
    
    iconWrapper.appendChild(img);
    iconWrapper.appendChild(label);
    container.appendChild(iconWrapper);
  });
  
  return container;
};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Summon Icon Components Wisely</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/icon.njk" import renderIcon %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific icon by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderIcon({ 
  name: "brand", 
  size: "lg",
  variant: "default",
  datas: atoms.icons 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Show different sizes of the same icon:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for size in ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] %}
  {{ renderIcon({ 
    name: "brand", 
    size: size,
    datas: atoms.icons 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Direct icon usage with custom path:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderIcon({
  path: "/assets/icons/custom-icon.svg", 
  alt: "Custom Icon",
  size: "md",
  variant: "primary",
  datas: atoms.icons
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Adding a new icon to icons.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "icons": [
    {
      "name": "new_icon_name",
      "path": "/assets/icons/your-icon.svg",
      "alt": "Your Icon Description",
      "defaultSize": "md"
    }
  ]
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Available Sizes:</h3>
        <div class="grid grid-cols-3 md:grid-cols-6 gap-4 bg-white p-4 rounded border">
          ${Object.entries(iconsData.sizes).map(([key, value]) => `
            <div class="flex flex-col items-center">
              <span class="text-sm font-bold">${key}</span>
              <span class="text-xs text-gray-500">${value}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May your designs defy the sands of time. ⏳⚡</p>
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