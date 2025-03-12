// src/stories/atoms/RadioButton.stories.js
import nunjucks from 'nunjucks';
import radio-buttonData from '../../_data/styles/atoms/radio-button.json';
import radio-buttonsData from '../../_data/contents/atoms/radio-buttons.json';

// Nunjucks template for rendering radio-buttons
const radio-buttonTemplate = `
  <div class="radio-button ${variantClass}">
    ${text}
  </div>
`;

// Helper function to get variant-specific CSS classes
function getVariantClass(variant) {
  const foundVariant = radio-buttonData.variants.find(v => v.name === variant);
  return foundVariant ? foundVariant.class : '';
}

export default {
  title: 'Atoms/RadioButton',
  tags: ['autodocs'],
  
  // Render function using Nunjucks
  render: (args) => {
    return nunjucks.renderString(radio-buttonTemplate, {
      text: args.text,
      variant: args.variant,
      variantClass: getVariantClass(args.variant)
    });
  },
  
  // Argument types for Storybook controls
  argTypes: {
    text: { 
      description: 'Main content text',
      control: 'text',
      defaultValue: 'Default RadioButton' 
    },
    variant: { 
      description: 'Visual style of the radio-button',
      control: { 
        type: 'select', 
        options: radio-buttonData.variants.map(v => v.name)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from radio-buttons.json
const radio-buttonExamples = radio-buttonsData.radio-button_data;

export const Default = {
  args: {
    text: radio-buttonExamples.default_radio-button.text,
    variant: radio-buttonExamples.default_radio-button.variant
  }
};

export const Primary = {
  args: {
    text: radio-buttonExamples.primary_radio-button.text,
    variant: radio-buttonExamples.primary_radio-button.variant
  }
};

export const Secondary = {
  args: {
    text: radio-buttonExamples.secondary_radio-button.text,
    variant: radio-buttonExamples.secondary_radio-button.variant
  }
};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use This Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/radio-button.njk" import renderRadioButton %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Insert the component in your template:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderRadioButton(radio-buttons.radio-button_data.default_radio-button) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Use a custom variant directly in the call:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderRadioButton({
  text: "Custom RadioButton", 
  variant: "primary"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/radio-buttons.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/radio-button.json</code></li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Create a new content or style:</h3>
        <div class="bg-gray-100 p-3 rounded-md overflow-x-auto">
          <h4 class="font-semibold mb-2">Add content to radio-buttons.json:</h4>
          <pre><code class="text-sm text-gray-900">"radio-button_data": {
  "your_new_radio-button": {
    "name": "unique_name",
    "text": "Your radio-button text",
    "variant": "default"
  }
}</code></pre>
          
          <h4 class="font-semibold mt-4 mb-2">Add style to radio-button.json:</h4>
          <pre><code class="text-sm text-gray-900">"variants": [
  {
    "name": "your_new_variant",
    "class": "radio-button--custom bg-purple-100 text-purple-800"
  }
]</code></pre>
        </div>
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