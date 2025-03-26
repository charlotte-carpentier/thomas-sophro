// src/stories/organisms/carousel.stories.js
import nunjucks from 'nunjucks';
import carouselsData from '../../_data/organisms/carousels.json';

export default {
  title: 'Organisms/carousel',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = carouselsData.globalStyle;
    const variantStyle = carouselsData.variants[args.style];
    
    const carouselTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return carouselTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the carousel',
      control: 'text',
      defaultValue: 'carousel' 
    },
    style: { 
      description: 'Visual style of the carousel',
      control: { 
        type: 'select', 
        options: Object.keys(carouselsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from carousels.json
export const Example1 = {
  args: {
    text: carouselsData.carousels[0].text,
    style: carouselsData.carousels[0].style
  }
};

export const Example2 = {
  args: {
    text: carouselsData.carousels[1].text,
    style: carouselsData.carousels[1].style
  }
};

export const Default = {
  args: {
    text: 'Default carousel',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary carousel',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary carousel',
    style: 'secondary'
  }
};

// Usage guide based on the new macro
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/carousel.njk" import rendercarousel %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific carousel by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendercarousel({ 
  name: "example_carousel1", 
  datas: organisms.carousels 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all carousels:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for carousel in organisms.carousels.carousels %}
  {{ rendercarousel({ 
    name: carousel.name, 
    datas: organisms.carousels 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom carousel directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendercarousel({
  text: 'Custom carousel', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(carouselsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new carousel:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "carousels": [
    {
      "name": "new_carousel_name",
      "text": "New carousel Text",
      "style": "primary"
    }
  ]
}</code></pre>
      </div>
    </div>
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