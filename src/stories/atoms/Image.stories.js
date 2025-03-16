// src/stories/atoms/Image.stories.js
import nunjucks from 'nunjucks';
import imagesData from '../../_data/atoms/images.json';

// Template for rendering images based on our macro
const imageTemplate = `
  {% macro renderImage(options) %}
    {% if options.name %}
      {% set imageData = null %}
      {% for image in datas.images %}
        {% if image.name == options.name %}
          {% set imageData = image %}
        {% endif %}
      {% endfor %}

      {% set globalStyle = datas.globalStyle %}

      {% if imageData %}
        {% set variantStyle = datas.variants[imageData.size] | default('') %}
        
        <img 
          src="{{ imageData.src }}" 
          alt="{{ imageData.alt }}" 
          class="{{ globalStyle }} {{ variantStyle }} {% if options.className %}{{ options.className }}{% endif %}"
          {% if options.loading %}loading="{{ options.loading }}"{% endif %}
          {% if options.width %}width="{{ options.width }}"{% endif %}
          {% if options.height %}height="{{ options.height }}"{% endif %}
        />
      {% else %}
        <span class="text-red-500">Image not found: {{ options.name }}</span>
      {% endif %}
    {% elseif options.group %}
      {% set groupImages = [] %}
      
      {% for image in datas.images %}
        {% if image.group == options.group %}
          {% set groupImages = (groupImages.push(image), groupImages) %}
        {% endif %}
      {% endfor %}
      
      {% if groupImages.length > 0 %}
        <div class="image-group {% if options.groupClass %}{{ options.groupClass }}{% endif %}">
          {% for image in groupImages %}
            {% set variantStyle = datas.variants[image.size] | default('') %}
            <img 
              src="{{ image.src }}" 
              alt="{{ image.alt }}" 
              class="{{ datas.globalStyle }} {{ variantStyle }} {% if options.imageClass %}{{ options.imageClass }}{% endif %}"
              {% if options.loading %}loading="{{ options.loading }}"{% endif %}
            />
          {% endfor %}
        </div>
      {% else %}
        <span class="text-red-500">No images found in group: {{ options.group }}</span>
      {% endif %}
    {% else %}
      {% set globalStyle = datas.globalStyle %}
      {% set variantStyle = datas.variants[options.size] | default('') %}
      
      <img 
        src="{{ options.src }}" 
        alt="{{ options.alt }}" 
        class="{{ globalStyle }} {{ variantStyle }} {% if options.className %}{{ options.className }}{% endif %}"
        {% if options.loading %}loading="{{ options.loading }}"{% endif %}
        {% if options.width %}width="{{ options.width }}"{% endif %}
        {% if options.height %}height="{{ options.height }}"{% endif %}
      />
    {% endif %}
  {% endmacro %}
  
  {{ renderImage(options) }}
`;

export default {
  title: 'Atoms/Image',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // For demo in Storybook, use project placeholder images if no src provided
    if (!args.name && !args.src && !args.group) {
      const size = args.size || 'medium';
      args.src = `/assets/images/placeholder-${size}.png`;
    }
    
    // Create context for Nunjucks template
    const context = {
      datas: imagesData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(imageTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined image',
      control: 'select',
      options: [null, ...imagesData.images.map(image => image.name)],
      defaultValue: null
    },
    group: {
      description: 'Group of images to render',
      control: 'select',
      options: [null, ...Object.keys(imagesData.groups || {})],
      defaultValue: null
    },
    groupClass: {
      description: 'CSS classes to apply to the group container',
      control: 'text',
      defaultValue: 'flex gap-2 flex-wrap'
    },
    imageClass: {
      description: 'CSS classes to apply to each image in a group',
      control: 'text',
      defaultValue: ''
    },
    src: { 
      description: 'Source URL for the image (for custom images)',
      control: 'text',
      defaultValue: null
    },
    alt: { 
      description: 'Alternative text for the image (for accessibility)',
      control: 'text',
      defaultValue: 'Descriptive image alt text'
    },
    size: { 
      description: 'Size variant of the image',
      control: { 
        type: 'select', 
        options: Object.keys(imagesData.variants)
      },
      defaultValue: 'medium'
    },
    loading: {
      description: 'Image loading behavior',
      control: {
        type: 'select',
        options: [null, 'lazy', 'eager']
      },
      defaultValue: 'lazy'
    },
    width: {
      description: 'Explicit width attribute (optional)',
      control: 'text',
      defaultValue: null
    },
    height: {
      description: 'Explicit height attribute (optional)',
      control: 'text',
      defaultValue: null
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
      defaultValue: ''
    }
  }
};

// Using examples from images.json with correct asset paths
export const SmallPlaceholder = {
  args: {
    name: "placeholder_small"
  }
};

export const MediumPlaceholder = {
  args: {
    name: "placeholder_medium"
  }
};

export const LargePlaceholder = {
  args: {
    name: "placeholder_large"
  }
};

// Avatar examples
export const AvatarImage = {
  args: {
    name: "avatar_dark"
  }
};

// Group examples
export const BlockMediaGroup = {
  args: {
    group: "block-media",
    groupClass: "grid grid-cols-2 gap-4 md:grid-cols-3",
    imageClass: ""
  }
};

export const BlockMediaSmallGroup = {
  args: {
    group: "block-media-small",
    groupClass: "grid grid-cols-3 gap-2 md:grid-cols-6",
    imageClass: ""
  }
};

// Suppression des exemples personnalisés comme demandé

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Image Component Usage Guide</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/image.njk" import renderImage %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific image by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderImage({ 
  name: "placeholder_medium", 
  datas: atoms.images 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Render multiple images from the data:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for image in atoms.images.images %}
    {{ renderImage({ 
        name: image.name, 
        datas: atoms.images 
    }) }}
{% endfor %}</code></pre>
      </div>

      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Render a group of images:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderImage({ 
    group: "block-media-small", 
    datas: atoms.images,
    groupClass: "flex gap-2 flex-wrap",
    imageClass: "m-1" 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Direct image creation with custom attributes:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderImage({
  src: "/assets/images/custom.jpg", 
  alt: "Custom image", 
  size: "medium",
  loading: "lazy",
  datas: atoms.images
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Adding a new image to images.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "images": [
    {
      "name": "new_image_name",
      "src": "/path/to/image.jpg",
      "alt": "Descriptive alt text",
      "size": "small|medium|large|avatar",
      "group": "block-media|block-media-small"
    }
  ]
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">7. Best practices for images:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Always provide meaningful <code>alt</code> text for accessibility</li>
          <li>Use <code>loading="lazy"</code> for images below the fold</li>
          <li>Consider adding <code>width</code> and <code>height</code> attributes to prevent layout shifts</li>
          <li>Choose the appropriate size variant for your layout context</li>
          <li>Use responsive sizes that adapt to different viewports</li>
          <li>Group related images together with the <code>group</code> parameter</li>
        </ul>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">A hero engraves alt text runes so the sages may perceive the unseen. 🔮📖</p>
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