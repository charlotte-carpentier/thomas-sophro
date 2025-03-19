// src/stories/molecules/dropzone-upload.stories.js
import nunjucks from 'nunjucks';
import dropzone-uploadsData from '../../_data/molecules/dropzone-uploads.json';

export default {
  title: 'Molecules/dropzone-upload',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = dropzone-uploadsData.globalStyle;
    const variantStyle = dropzone-uploadsData.variants[args.style];
    
    const dropzone-uploadTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return dropzone-uploadTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the dropzone-upload',
      control: 'text',
      defaultValue: 'dropzone-upload' 
    },
    style: { 
      description: 'Visual style of the dropzone-upload',
      control: { 
        type: 'select', 
        options: Object.keys(dropzone-uploadsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from dropzone-uploads.json
export const Example1 = {
  args: {
    text: dropzone-uploadsData.dropzone-uploads[0].text,
    style: dropzone-uploadsData.dropzone-uploads[0].style
  }
};

export const Example2 = {
  args: {
    text: dropzone-uploadsData.dropzone-uploads[1].text,
    style: dropzone-uploadsData.dropzone-uploads[1].style
  }
};

export const Default = {
  args: {
    text: 'Default dropzone-upload',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary dropzone-upload',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary dropzone-upload',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/dropzone-upload.njk" import renderdropzone-upload %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific dropzone-upload by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderdropzone-upload({ 
  name: "example_dropzone-upload1", 
  datas: molecules.dropzone-uploads 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all dropzone-uploads:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for dropzone-upload in molecules.dropzone-uploads.dropzone-uploads %}
  {{ renderdropzone-upload({ 
    name: dropzone-upload.name, 
    datas: molecules.dropzone-uploads 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom dropzone-upload directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderdropzone-upload({
  text: 'Custom dropzone-upload', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(dropzone-uploadsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new dropzone-upload:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "dropzone-uploads": [
    {
      "name": "new_dropzone-upload_name",
      "text": "New dropzone-upload Text",
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