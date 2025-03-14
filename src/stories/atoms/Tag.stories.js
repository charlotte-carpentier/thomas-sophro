import nunjucks from 'nunjucks';
import tagsData from '../../_data/atoms/tags.json';

export default {
  title: 'Atoms/Tag',
  tags: ['autodocs'],
  
  render: (args) => {
    const globalStyle = tagsData.globalStyle;
    const variantStyle = tagsData.variants[args.variant];
    
    return `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
  },
  
  argTypes: {
    text: { 
      description: 'Text displayed for the tag',
      control: 'text',
      defaultValue: 'Tag' 
    },
    variant: { 
      description: 'Visual variant of the tag',
      control: { 
        type: 'select', 
        options: Object.keys(tagsData.variants)
      },
      defaultValue: 'default-gray'
    }
  }
};

// Generate stories for each tag in tagsData
export const AllTags = () => {
  const container = document.createElement('div');
  container.className = 'flex flex-wrap gap-2 p-4';

  tagsData.tags.forEach(tag => {
    const tagElement = document.createElement('div');
    tagElement.className = `${tagsData.globalStyle} ${tagsData.variants[tag.variant]}`;
    tagElement.innerText = tag.text;
    container.appendChild(tagElement);
  });

  return container;
};

// Create individual exports for each tag
const tagStories = {};
tagsData.tags.forEach(tag => {
  tagStories[tag.name] = {
    args: {
      text: tag.text,
      variant: tag.variant
    }
  };
});

export { tagStories as Tags };

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Summon HAT Components Wisely</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/tag.njk" import renderTag %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific tag by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTag({ 
  name: "adventure", 
  datas: atoms.tags 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Call multiple tags from the data:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for tag in atoms.tags.tags %}
    {{ renderTag({ 
        name: tag.name, 
        datas: atoms.tags 
    }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Direct tag creation:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderTag({
  text: "New Tag",
  variant: "success"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Adding a new tag to tags.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "tags": [
    {
      "name": "new_tag",
      "text": "New Tag Text",
      "variant": "default"
    }
  ]
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/tags.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/tag.json</code></li>
          <li>Component: <code>src/_includes/03-atoms/tag.njk</code></li>
        </ul>
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
