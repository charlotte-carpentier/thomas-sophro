// src/stories/organisms/section-listing.stories.js
import nunjucks from 'nunjucks';
import section-listingsData from '../../_data/organisms/section-listings.json';

export default {
  title: 'Organisms/section-listing',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = section-listingsData.globalStyle;
    const variantStyle = section-listingsData.variants[args.style];
    
    const section-listingTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return section-listingTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the section-listing',
      control: 'text',
      defaultValue: 'section-listing' 
    },
    style: { 
      description: 'Visual style of the section-listing',
      control: { 
        type: 'select', 
        options: Object.keys(section-listingsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from section-listings.json
export const Example1 = {
  args: {
    text: section-listingsData.section-listings[0].text,
    style: section-listingsData.section-listings[0].style
  }
};

export const Example2 = {
  args: {
    text: section-listingsData.section-listings[1].text,
    style: section-listingsData.section-listings[1].style
  }
};

export const Default = {
  args: {
    text: 'Default section-listing',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary section-listing',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary section-listing',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "01-organisms/section-listing.njk" import rendersection-listing %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific section-listing by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-listing({ 
  name: "example_section-listing1", 
  datas: organisms.section-listings 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all section-listings:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for section-listing in organisms.section-listings.section-listings %}
  {{ rendersection-listing({ 
    name: section-listing.name, 
    datas: organisms.section-listings 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom section-listing directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendersection-listing({
  text: 'Custom section-listing', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(section-listingsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new section-listing:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "section-listings": [
    {
      "name": "new_section-listing_name",
      "text": "New section-listing Text",
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