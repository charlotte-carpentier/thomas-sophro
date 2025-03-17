// src/stories/atoms/Heading.stories.js
import nunjucks from 'nunjucks';
import headingsData from '../../_data/atoms/headings.json';

// Template based on our heading.njk macro
const headingTemplate = `
  {% macro renderHeading(options) %}
    {% set headingData = null %}
    
    {% if options.name %}
      {% for heading in options.datas.headings %}
        {% if heading.name == options.name %}
          {% set headingData = heading %}
        {% endif %}
      {% endfor %}
    {% else %}
      {% set headingData = {
        "level": options.level | default(2),
        "text": options.text | default("Heading"),
        "style": options.style | default("default")
      } %}
    {% endif %}

    {% set globalStyle = options.datas.globalStyle | default("") %}
    
    {% if headingData %}
      {% set level = headingData.level | default(2) %}
      {% set variantStyle = options.datas.variants[headingData.style] | default('') %}
      {% set sizeStyle = options.datas.sizeStyles["h" + level] | default('') %}
      {% set iconStyle = options.datas.iconStyles.default | default('') %}
      
      {% if level == 1 %}
        <h1 class="{{ globalStyle }} {{ sizeStyle }} {{ variantStyle }}">{% if options.icon %}<span class="{{ iconStyle }}">{{ options.icon }}</span>{% endif %}{{ headingData.text }}</h1>
      {% elif level == 2 %}
        <h2 class="{{ globalStyle }} {{ sizeStyle }} {{ variantStyle }}">{% if options.icon %}<span class="{{ iconStyle }}">{{ options.icon }}</span>{% endif %}{{ headingData.text }}</h2>
      {% elif level == 3 %}
        <h3 class="{{ globalStyle }} {{ sizeStyle }} {{ variantStyle }}">{% if options.icon %}<span class="{{ iconStyle }}">{{ options.icon }}</span>{% endif %}{{ headingData.text }}</h3>
      {% elif level == 4 %}
        <h4 class="{{ globalStyle }} {{ sizeStyle }} {{ variantStyle }}">{% if options.icon %}<span class="{{ iconStyle }}">{{ options.icon }}</span>{% endif %}{{ headingData.text }}</h4>
      {% elif level == 5 %}
        <h5 class="{{ globalStyle }} {{ sizeStyle }} {{ variantStyle }}">{% if options.icon %}<span class="{{ iconStyle }}">{{ options.icon }}</span>{% endif %}{{ headingData.text }}</h5>
      {% elif level == 6 %}
        <h6 class="{{ globalStyle }} {{ sizeStyle }} {{ variantStyle }}">{% if options.icon %}<span class="{{ iconStyle }}">{{ options.icon }}</span>{% endif %}{{ headingData.text }}</h6>
      {% endif %}
    {% else %}
      <span class="text-red-500">Heading not found: {{ options.name }}</span>
    {% endif %}
  {% endmacro %}
  
  {{ renderHeading(options) }}
`;

export default {
  title: 'Atoms/Heading',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      options: {
        ...args,
        datas: headingsData
      }
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(headingTemplate, context);
  },
  
  // Argument types for Storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined heading',
      control: 'select',
      options: ['', ...headingsData.headings.map(h => h.name)],
      defaultValue: ''
    },
    level: { 
      description: 'Heading level (h1-h6)',
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      defaultValue: 2
    },
    text: { 
      description: 'Heading text',
      control: 'text',
      defaultValue: 'Custom Heading'
    },
    style: { 
      description: 'Visual style of the heading',
      control: 'select',
      options: Object.keys(headingsData.variants),
      defaultValue: 'default'
    },
    icon: { 
      description: 'Optional icon to display before heading text',
      control: 'text',
      defaultValue: ''
    }
  }
};

// Predefined headings from data
export const PageTitle = {
  args: {
    name: "page_title"
  }
};

export const SectionTitle = {
  args: {
    name: "section_title"
  }
};

export const SubsectionTitle = {
  args: {
    name: "subsection_title"
  }
};

export const ComponentTitle = {
  args: {
    name: "component_title"
  }
};

export const MiniTitle = {
  args: {
    name: "mini_title"
  }
};

export const MicroTitle = {
  args: {
    name: "micro_title"
  }
};

// Custom headings with different styles
export const CustomH1 = {
  args: {
    level: 1,
    text: 'Custom H1 Heading',
    style: 'hero'
  }
};

export const PrimaryH2 = {
  args: {
    level: 2,
    text: 'Primary H2 Heading',
    style: 'primary'
  }
};

export const SecondaryH3 = {
  args: {
    level: 3,
    text: 'Secondary H3 Heading',
    style: 'secondary'
  }
};

export const AccentH4 = {
  args: {
    level: 4,
    text: 'Accent H4 Heading',
    style: 'accent'
  }
};

export const HeadingWithIcon = {
  args: {
    level: 2,
    text: 'Heading with Icon',
    style: 'primary',
    icon: '★'
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/heading.njk" import renderHeading %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Use a predefined heading by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderHeading({ 
  name: "page_title",
  datas: atoms.headings 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Create a custom heading:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderHeading({
  level: 2,
  text: "Custom Heading Text",
  style: "primary",
  datas: atoms.headings 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Add an icon to a heading:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderHeading({
  level: 3,
  text: "Heading with Icon",
  style: "secondary",
  icon: "★",
  datas: atoms.headings 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Loop through multiple headings from data:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for heading in atoms.headings.headings %}
  {{ renderHeading({ 
    name: heading.name, 
    datas: atoms.headings 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.keys(headingsData.variants).map(style => `
            <li><code>${style}</code>: ${headingsData.variants[style]}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">7. Heading sizes based on level:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.keys(headingsData.sizeStyles).map(size => `
            <li><code>${size}</code>: ${headingsData.sizeStyles[size]}</li>
          `).join('')}
        </ul>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">Don't forget to pass the configuration data via the atoms.headings object!</p>
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
}