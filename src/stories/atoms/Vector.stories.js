// src/stories/atoms/Vector.stories.js
import nunjucks from 'nunjucks';
import vectorsData from '../../_data/atoms/vectors.json';

// Template for rendering vectors based on our macro
const vectorTemplate = `
  {% macro renderVector(options) %}
    {% if options.name %}
      {% set vectorData = null %}
      {% for vector in datas.vectors %}
        {% if vector.name == options.name %}
          {% set vectorData = vector %}
        {% endif %}
      {% endfor %}

      {% set globalStyle = datas.globalStyle %}

      {% if vectorData %}
        {% set sizeStyle = datas.sizes[vectorData.size] | default('') %}
        
        <img 
          src="{{ vectorData.src }}" 
          alt="{{ vectorData.alt }}"
          class="{{ globalStyle }} {{ sizeStyle }}"
        />
      {% else %}
        <span class="text-red-500">Vector not found: {{ options.name }}</span>
      {% endif %}
    {% else %}
      {% set globalStyle = datas.globalStyle %}
      {% set sizeStyle = datas.sizes[options.size] | default('') %}
      
      <img 
        src="{{ options.src }}" 
        alt="{{ options.alt | default('Logo') }}"
        class="{{ globalStyle }} {{ sizeStyle }}"
      />
    {% endif %}
  {% endmacro %}
  
  {{ renderVector(options) }}
`;

export default {
  title: 'Atoms/Vector',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: vectorsData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(vectorTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined vector',
      control: 'select',
      options: vectorsData.vectors.map(vector => vector.name),
      defaultValue: null
    },
    src: { 
      description: 'Source URL for the vector image (for custom vectors)',
      control: 'text',
      defaultValue: '/assets/images/logo-full.svg' 
    },
    alt: { 
      description: 'Alternative text for the vector image (for custom vectors)',
      control: 'text',
      defaultValue: 'Custom Logo' 
    },
    size: { 
      description: 'Size of the vector (for custom vectors)',
      control: { 
        type: 'select', 
        options: Object.keys(vectorsData.sizes)
      },
      defaultValue: 'large'
    }
  }
};

// Using examples from vectors.json
export const LogoFull = {
  args: {
    name: "logo_full"
  }
};

export const LogoSymbol = {
  args: {
    name: "logo_symbol"
  }
};

// Vector sizes
export const LargeSize = {
  args: {
    src: '/assets/logos/logo-full.svg',
    alt: 'Large Logo',
    size: 'large'
  }
};

export const MediumSize = {
  args: {
    src: '/assets/logos/logo-full.svg',
    alt: 'Medium Logo',
    size: 'medium'
  }
};

export const SmallSize = {
  args: {
    src: '/assets/logos/logo-full.svg',
    alt: 'Small Logo',
    size: 'small'
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/vector.njk" import renderVector %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific vector by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderVector({ 
  name: "logo_full", 
  datas: atoms.vectors 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Call multiple vectors from the data:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for vector in atoms.vectors.vectors %}
    {{ renderVector({ 
        name: vector.name, 
        datas: atoms.vectors 
    }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Direct vector creation:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderVector({
  src: "/assets/images/logo-full.svg", 
  alt: "Custom Logo", 
  size: "large"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Adding a new vector to vectors.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "vectors": [
    {
      "name": "new_vector_name",
      "src": "/assets/images/your-logo.svg",
      "alt": "Your Logo Description",
      "size": "large"
    }
  ]
}</code></pre>
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