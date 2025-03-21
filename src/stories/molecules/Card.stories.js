// src/stories/molecules/card.stories.js
import nunjucks from 'nunjucks';
import cardsData from '../../_data/molecules/cards.json';

export default {
  title: 'Molecules/card',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = cardsData.globalStyle;
    const variantStyle = cardsData.variants[args.style];
    
    const cardTemplate = `<div class="${globalStyle} ${variantStyle}">${args.text}</div>`;
    return cardTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Text displayed for the card',
      control: 'text',
      defaultValue: 'card' 
    },
    style: { 
      description: 'Visual style of the card',
      control: { 
        type: 'select', 
        options: Object.keys(cardsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from cards.json
export const Example1 = {
  args: {
    text: cardsData.cards[0].text,
    style: cardsData.cards[0].style
  }
};

export const Example2 = {
  args: {
    text: cardsData.cards[1].text,
    style: cardsData.cards[1].style
  }
};

export const Default = {
  args: {
    text: 'Default card',
    style: 'default'
  }
};

export const Primary = {
  args: {
    text: 'Primary card',
    style: 'primary'
  }
};

export const Secondary = {
  args: {
    text: 'Secondary card',
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/card.njk" import rendercard %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific card by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendercard({ 
  name: "example_card1", 
  datas: molecules.cards 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all cards:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for card in molecules.cards.cards %}
  {{ rendercard({ 
    name: card.name, 
    datas: molecules.cards 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom card directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ rendercard({
  text: 'Custom card', 
  style: 'primary'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(cardsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new card:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "cards": [
    {
      "name": "new_card_name",
      "text": "New card Text",
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