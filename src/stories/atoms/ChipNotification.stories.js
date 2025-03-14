// src/stories/atoms/ChipNotification.stories.js
import nunjucks from 'nunjucks';
import chipNotificationsData from '../../_data/atoms/chip-notifications.json';

export default {
  title: 'Atoms/ChipNotification',
  tags: ['autodocs'],
  
  // Render function
  render: (args) => {
    const globalStyle = chipNotificationsData.globalStyle;
    const variantStyle = chipNotificationsData.variants[args.style];
    
    const chipNotificationTemplate = `
      <div class="${globalStyle} ${variantStyle} inline-flex items-center justify-center rounded-full text-white" role="status">
        ${args.text}
      </div>`;
    return chipNotificationTemplate;
  },
  
  // Argument types for storybook controls
  argTypes: {
    text: { 
      description: 'Numeric value or text to display in the chip',
      control: 'text',
      defaultValue: '0' 
    },
    style: { 
      description: 'Visual style of the chip-notification',
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
    text: chipNotificationsData.chip-notifications.find(n => n.name === "notification_count").text,
    style: chipNotificationsData.chip-notifications.find(n => n.name === "notification_count").style
  }
};

export const UnreadMessages = {
  args: {
    text: chipNotificationsData.chip-notifications.find(n => n.name === "unread_messages").text,
    style: chipNotificationsData.chip-notifications.find(n => n.name === "unread_messages").style
  }
};

export const CompletedTasks = {
  args: {
    text: chipNotificationsData.chip-notifications.find(n => n.name === "completed_tasks").text,
    style: chipNotificationsData.chip-notifications.find(n => n.name === "completed_tasks").style
  }
};

export const Overflowed = {
  args: {
    text: chipNotificationsData.chip-notifications.find(n => n.name === "overflowed").text,
    style: chipNotificationsData.chip-notifications.find(n => n.name === "overflowed").style
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
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "03-atoms/chip-notification.njk" import renderChipNotification %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Call a specific chip-notification by name:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipNotification({ 
  name: "notification_count", 
  datas: atoms.chip-notifications 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Loop through all chip-notifications:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% for chip-notification in atoms.chip-notifications.chip-notifications %}
  {{ renderChipNotification({ 
    name: chip-notification.name, 
    datas: atoms.chip-notifications 
  }) }}
{% endfor %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Use a custom chip-notification directly:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderChipNotification({
  text: '42', 
  style: 'success'
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Available styles:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          ${Object.entries(chipNotificationsData.variants).map(([style, className]) => `
            <li><code>${style}</code>: ${className}</li>
          `).join('')}
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">6. Add a new chip-notification:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "chip-notifications": [
    {
      "name": "new_notification_count",
      "text": "99+",
      "style": "warning"
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