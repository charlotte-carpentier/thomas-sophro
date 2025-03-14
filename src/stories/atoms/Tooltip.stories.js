import nunjucks from 'nunjucks';
import tooltipsData from '../../_data/atoms/tooltips.json';

export default {
  title: 'Atoms/Tooltip',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = tooltipsData.globalStyle;
    const variantStyle = tooltipsData.variants[args.variant] || '';
    
    return `
      <div class="tooltip-container">
        <div class="tag inline-flex items-center px-2 py-1 text-xs font-medium rounded-md ${variantStyle}">
          ${args.text}
        </div>
      </div>
    `;
  },
  
  // Argument types for Storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the tooltip',
      control: 'text',
      defaultValue: 'Tooltip Content' 
    },
    variant: { 
      description: 'Visual style of the tooltip',
      control: { 
        type: 'select', 
        options: Object.keys(tooltipsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Generate stories for each tooltip in tooltipsData
export const AllTooltips = () => {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-4 p-4';

  tooltipsData.tooltips.forEach(tooltip => {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip-container';
    tooltipElement.innerHTML = `
      <div class="tag inline-flex items-center px-2 py-1 text-xs font-medium rounded-md ${tooltipsData.variants[tooltip.variant]}">
        ${tooltip.text}
      </div>
    `;
    container.appendChild(tooltipElement);
  });

  return container;
};

// Create individual exports for each tooltip
const tooltipStories = {};
tooltipsData.tooltips.forEach(tooltip => {
  tooltipStories[tooltip.name] = {
    args: {
      text: tooltip.text,
      variant: tooltip.variant
    }
  };
});

export { tooltipStories as Tooltips };

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Summon HAT Components Wisely</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/tooltip.njk" import renderTooltip %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific tooltip by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTooltip({ 
  name: "info_tip", 
  datas: atoms.tooltips 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Call multiple tooltips from the data:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for tooltip in atoms.tooltips.tooltips %}
    {{ renderTooltip({ 
        name: tooltip.name, 
        datas: atoms.tooltips 
    }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Direct tooltip creation:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTooltip({
  text: 'Custom Tooltip', 
  style: 'info'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Adding a new tooltip to tooltips.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "tooltips": [
    {
      "name": "new_tooltip_name",
      "text": "Your Tooltip Text",
      "variant": "info"
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