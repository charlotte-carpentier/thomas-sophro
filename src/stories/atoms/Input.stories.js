// src/stories/atoms/input.stories.js
import nunjucks from 'nunjucks';
import inputsData from '../../_data/atoms/inputs.json';

export default {
  title: 'Atoms/input',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = inputsData.globalStyle;
    const variantStyle = inputsData.variants[args.style];
    
    const inputTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return inputTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the input',
      control: 'text',
      defaultValue: 'input' 
    },
    style: { 
      description: 'Visual style of the input',
      control: { 
        type: 'select', 
        options: Object.keys(inputsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from inputs.json
export const Example1 = {
  args: {
    text: inputsData.inputs[0].text,
    style: inputsData.inputs[0].style
  }
};

export const Example2 = {
  args: {
    text: inputsData.inputs[1].text,
    style: inputsData.inputs[1].style
  }
};

export const Default = {
  args: {
    text: 'Default input',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary input',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary input',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/input.njk" import renderinput %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific input by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderinput({ 
  name: "example_input1", 
  datas: atoms.inputs 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all inputs:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for input in atoms.inputs.inputs %}
  {{ renderinput({ 
    name: input.name, 
    datas: atoms.inputs 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom input directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderinput({
  text: 'Custom input', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(inputsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new input:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "inputs": [
    {
      "name": "new_input_name",
      "text": "New input Text",
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