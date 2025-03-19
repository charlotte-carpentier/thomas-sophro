// src/stories/molecules/Toast.stories.js
import nunjucks from 'nunjucks';
import toastsData from '../../_data/molecules/toasts.json';

export default {
  title: 'Molecules/Toast',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = toastsData.globalStyle;
    const variantStyle = toastsData.variants[args.style];
    
    const toastTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return toastTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the toast',
      control: 'text',
      defaultValue: 'Toast' 
    },
    style: { 
      description: 'Visual style of the toast',
      control: { 
        type: 'select', 
        options: Object.keys(toastsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from toasts.json
export const Example1 = {
  args: {
    text: toastsData.toasts[0].text,
    style: toastsData.toasts[0].style
  }
};

export const Example2 = {
  args: {
    text: toastsData.toasts[1].text,
    style: toastsData.toasts[1].style
  }
};

export const Default = {
  args: {
    text: 'Default Toast',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary Toast',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary Toast',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/toast.njk" import renderToast %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific toast by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderToast({ 
  name: "example_toast1", 
  datas: molecules.toasts 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all toasts:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for toast in molecules.toasts.toasts %}
  {{ renderToast({ 
    name: toast.name, 
    datas: molecules.toasts 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom toast directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderToast({
  text: 'Custom Toast', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(toastsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new toast:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "toasts": [
    {
      "name": "new_toast_name",
      "text": "New Toast Text",
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