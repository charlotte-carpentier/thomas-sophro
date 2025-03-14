// src/stories/atoms/ChipNotification.stories.js
import nunjucks from 'nunjucks';
import chipNotificationsData from '../../_data/atoms/chip-notifications.json';

// Template for rendering chip notifications based on our macro
const chipNotificationTemplate = `
  {% macro renderChipNotification(options) %}
    {% if options.name %}
      {% set chipData = null %}
      {% for notification in datas["chip-notifications"] %}
        {% if notification.name == options.name %}
          {% set chipData = notification %}
        {% endif %}
      {% endfor %}
      
      {% if chipData %}
        {% set globalStyle = datas.globalStyle %}
        {% set variantStyle = datas.variants[chipData.style] %}
        
        {% set contentLength = chipData.text | string | length %}
        {% set sizeClass = "h-6 w-6 text-xs" %}
        
        {% if contentLength > 2 %}
          {% set sizeClass = "h-10 w-10 px-1 text-sm" %}
        {% elif contentLength > 1 %}
          {% set sizeClass = "h-8 w-8 text-sm" %}
        {% endif %}
        
        <span class="inline-flex items-center justify-center rounded-full text-white {{ globalStyle }} {{ variantStyle }} {{ sizeClass }}" role="status">
          {{ chipData.text }}
        </span>
      {% else %}
        <span class="text-red-500">Notification '{{ options.name }}' not found</span>
      {% endif %}
    {% else %}
      {% set globalStyle = datas.globalStyle %}
      {% set variantStyle = datas.variants[options.style] %}
      
      {% set contentLength = options.text | string | length %}
      {% set sizeClass = "h-6 w-6 text-xs" %}
      
      {% if contentLength > 2 %}
        {% set sizeClass = "h-10 w-10 px-1 text-sm" %}
      {% elif contentLength > 1 %}
        {% set sizeClass = "h-8 w-8 text-sm" %}
      {% endif %}
      
      <span class="inline-flex items-center justify-center rounded-full text-white {{ globalStyle }} {{ variantStyle }} {{ sizeClass }}" role="status">
        {{ options.text }}
      </span>
    {% endif %}
  {% endmacro %}
  
  {{ renderChipNotification(options) }}
`;

export default {
  title: 'Atoms/ChipNotification',
  tags: ['autodocs'],
  
  // Render function using the macro with Nunjucks
  render: (args) => {
    // Create context for Nunjucks template
    const context = {
      datas: chipNotificationsData,
      options: args
    };
    
    // Render using Nunjucks with our template and context
    return nunjucks.renderString(chipNotificationTemplate, context);
  },
  
  // Argument types for storybook controls
  argTypes: {
    name: { 
      description: 'Name of the predefined chip notification',
      control: 'select',
      options: chipNotificationsData['chip-notifications'].map(n => n.name),
      defaultValue: null
    },
    text: { 
      description: 'Numeric value or text to display in the chip (for custom chips)',
      control: 'text',
      defaultValue: '0' 
    },
    style: { 
      description: 'Visual style of the chip notification (for custom chips)',
      control: { 
        type: 'select', 
        options: Object.keys(chipNotificationsData.variants)
      },
      defaultValue: 'default'
    }
  }
};

// Using examples from chip-notifications.json
export const NotificationCount = {
  args: {
    name: "notification_count"
  }
};

export const UnreadMessages = {
  args: {
    name: "unread_messages"
  }
};

export const CompletedTasks = {
  args: {
    name: "completed_tasks"
  }
};

export const Overflowed = {
  args: {
    name: "overflowed"
  }
};

// Custom chip example
export const CustomChip = {
  args: {
    text: '42',
    style: 'success'
  }
};

// Different sizes based on content length
export const SmallChip = {
  args: {
    text: '5',
    style: 'info'
  }
};

export const MediumChip = {
  args: {
    text: '15',
    style: 'warning'
  }
};

export const LargeChip = {
  args: {
    text: '999+',
    style: 'default'
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/chip-notification.njk" import renderChipNotification %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific chip notification by its name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipNotification({ 
  name: "notification_count", 
  datas: atoms.chipNotifications 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Call multiple chip notifications from the data:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for chipNotification in atoms.chipNotifications.list %}
    {{ renderChipNotification({ 
        name: chipNotification.name, 
        datas: atoms.chipNotifications 
    }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Direct chip notification creation:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipNotification({
  text: "42", 
  style: "success"
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Adding a new chip notification to chip-notifications.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "chipNotifications": {
    "list": [
      {
        "name": "new_notification_count",
        "text": "99+",
        "style": "warning"
      }
    ]
  }
}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Available content & styles:</h3>
        <p class="text-gray-600 mb-3">Check the following files:</p>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li>Content: <code>src/_data/contents/atoms/chip-notifications.json</code></li>
          <li>Styles: <code>src/_data/styles/atoms/chip-notification.json</code></li>
          <li>Component: <code>src/_includes/03-atoms/chip-notification.njk</code></li>
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