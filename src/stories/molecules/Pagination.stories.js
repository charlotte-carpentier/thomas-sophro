// src/stories/molecules/Pagination.stories.js
import nunjucks from 'nunjucks';
import paginationsData from '../../_data/molecules/paginations.json';
import buttonsData from '../../_data/atoms/buttons.json';
import selectsData from '../../_data/atoms/selects.json';

// Template for rendering pagination based on our macro
const paginationTemplate = `
  {% macro renderPagination(options) %}
    {% if not options or not options.datas or (not options.datas.pager and not options.datas.navigationPager) %}
      <span class="text-red-500">Error: No pagination data provided</span>
    {% else %}
      {% if options.datas.navigationPager %}
        {% set paginationData = options.datas.navigationPager %}
        {% set children = paginationData.children | default([]) %}
      {% else %}
        {% set paginationData = options.datas.pager %}
      {% endif %}
  
      {% if options.name %}
        {% if options.datas.pager.name == options.name %}
          {% set paginationData = options.datas.pager %}
        {% elif options.datas.navigationPager and options.datas.navigationPager.name == options.name %}
          {% set paginationData = options.datas.navigationPager %}
          {% set children = paginationData.children | default([]) %}
        {% endif %}
      {% endif %}
  
      {% set globalStyle = options.datas.globalStyle | default('') %}
  
      <div class="pagination-container flex items-center">
        {% if options.itemsPerPage and options.selectData %}
          <div class="items-per-page mr-4 relative">
            {% set selectRef = "" %}
            {% set selectVariant = "default" %}
            
            {% if paginationData.select and paginationData.select.itemsPerPage and paginationData.select.itemsPerPage.ref %}
              {% set selectRef = paginationData.select.itemsPerPage.ref %}
              {% set refParts = selectRef.split('.') %}
              
              {% if refParts | length == 2 %}
                {% set selectName = refParts[1] %}
                {% set matchingSelect = null %}
                
                {% for select in options.selectData.selects %}
                  {% if select.name == selectName and not matchingSelect %}
                    {% set matchingSelect = select %}
                  {% endif %}
                {% endfor %}
                
                {% if matchingSelect and matchingSelect.variant %}
                  {% set selectVariant = matchingSelect.variant %}
                {% endif %}
              {% endif %}
            {% endif %}
            
            {% set selectGlobalStyle = options.selectData.globalStyle | default('') %}
            {% set selectVariantStyle = options.selectData.variants[selectVariant] | default('') %}
            
            <select 
              class="{{ selectGlobalStyle }} {{ selectVariantStyle }} appearance-none pr-10"
              aria-label="{{ options.label | default('Items per page') }}"
            >
              {% set optionValues = [10, 20, 50, 100] %}
              {% if matchingSelect and matchingSelect.options %}
                {% set optionValues = [] %}
                {% for option in matchingSelect.options %}
                  {% set optionValues = (optionValues.push(option.value | int), optionValues) %}
                {% endfor %}
              {% endif %}
              
              {% for count in optionValues %}
                {% set optionLabel = count %}
                {% if matchingSelect and matchingSelect.options %}
                  {% for option in matchingSelect.options %}
                    {% if option.value | int == count %}
                      {% set optionLabel = option.label %}
                    {% endif %}
                  {% endfor %}
                {% else %}
                  {% set optionLabel = count ~ ' ' ~ (options.labelSuffix | default('per page')) %}
                {% endif %}
                
                <option 
                  value="{{ count }}" 
                  {% if count == options.itemsPerPage %} selected{% endif %}
                >
                  {{ optionLabel }}
                </option>
              {% endfor %}
            </select>
            
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        {% endif %}
  
        {% if children and children | length > 0 %}
          <nav class="pagination {{ globalStyle }}" role="navigation" aria-label="Pagination">
            <ul class="flex flex-row items-center space-x-1">
              {% for page in children %}
                <li>
                  <a href="{{ page.url }}" 
                    class="{% if page.current %}bg-gray-500 text-white font-bold{% else %}bg-white text-gray-700{% endif %} px-3 py-1 rounded-md flex items-center justify-center" 
                    rel="nofollow" 
                    {% if page.current %} aria-current="page" {% endif %}
                    {% if page.label.slice(-4) == '.svg' %} aria-label="{{ page.ariaLabel | default('Navigate') }}"{% endif %}
                  >
                    {% if page.label.slice(-4) == '.svg' %}
                      <span class="inline-flex items-center justify-center w-5 h-5">
                        {% if page.label.indexOf('first') > -1 %}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
                        {% elif page.label.indexOf('last') > -1 %}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
                        {% elif page.label.indexOf('next') > -1 %}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        {% elif page.label.indexOf('prev') > -1 %}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        {% else %}
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>
                        {% endif %}
                      </span>
                    {% else %}
                      {{ page.label }}
                    {% endif %}
                  </a>
                </li>
              {% endfor %}
            </ul>
          </nav>
        {% else %}
          <span class="text-gray-500">No pages available</span>
        {% endif %}
  
        {% if options.totalItems and options.currentPage and options.itemsPerPage and paginationData.showTotalCount %}
          {% set firstItem = (options.currentPage - 1) * options.itemsPerPage + 1 %}
          {% set lastItemTemp = options.currentPage * options.itemsPerPage %}
          {% set lastItem = lastItemTemp %}
          {% if lastItemTemp > options.totalItems %}
            {% set lastItem = options.totalItems %}
          {% endif %}
  
          <div class="items-count ml-4">
            <span class="text-gray-600 text-sm">
              {{ firstItem }} - {{ lastItem }} of {{ options.totalItems }}
            </span>
          </div>
        {% endif %}
      </div>
    {% endif %}
  {% endmacro %}
  
  {{ renderPagination(options) }}
`;

export default {
  title: 'Molecules/Pagination',
  tags: ['autodocs'],
  
  render: (args) => {
    const context = {
      options: {
        ...args,
        selectData: selectsData,
        buttonData: buttonsData,
        datas: paginationsData
      }
    };
    
    return nunjucks.renderString(paginationTemplate, context);
  },
  
  argTypes: {
    name: { 
      description: 'Name of the predefined pagination',
      control: 'select',
      options: ['pager', 'navigation-pager'],
      defaultValue: 'navigation-pager'
    },
    currentPage: { 
      description: 'Current active page',
      control: 'number',
      defaultValue: 1
    },
    totalPages: { 
      description: 'Total number of pages',
      control: 'number',
      defaultValue: 6 
    },
    itemsPerPage: { 
      description: 'Number of items per page',
      control: 'select',
      options: [10, 20, 50, 100],
      defaultValue: 10
    },
    totalItems: { 
      description: 'Total count of items',
      control: 'number',
      defaultValue: 98
    },
    label: { 
      description: 'Label text for items per page select',
      control: 'text',
      defaultValue: 'Show'
    },
    labelSuffix: { 
      description: 'Text displayed after the count number',
      control: 'text',
      defaultValue: 'items'
    }
  }
};

// Using the navigation pager example
export const NavigationPager = {
  args: {
    name: 'navigation-pager',
    currentPage: 1,
    totalPages: 6
  }
};

// Using the full pager with items per page selector and counter
export const FullPager = {
  args: {
    name: 'pager',
    currentPage: 1,
    totalPages: 6,
    itemsPerPage: 10,
    totalItems: 98,
    label: 'Show',
    labelSuffix: 'items'
  }
};

// Example with a different current page
export const PageThreeActive = {
  args: {
    name: 'navigation-pager',
    currentPage: 3,
    totalPages: 6
  }
};

// Example with more items per page
export const LargeItemCount = {
  args: {
    name: 'pager',
    currentPage: 1,
    totalPages: 2,
    itemsPerPage: 50,
    totalItems: 98,
    label: 'Display',
    labelSuffix: 'per page'
  }
};

// Example with last page active
export const LastPageActive = {
  args: {
    name: 'navigation-pager',
    currentPage: 6,
    totalPages: 6
  }
};

// Usage guide
export const Usage = () => {
  const usageGuide = document.createElement('div');
  usageGuide.className = 'bg-gray-50 p-6 rounded-lg max-w-4xl mx-auto';
  usageGuide.innerHTML = `
    <h2 class="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">How to Use the Pagination Component</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">1. Import the macro at the top of your page:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{% from "02-molecules/pagination.njk" import renderPagination %}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">2. Full pagination component with select, navigation and count:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderPagination({ 
  name: "pager", 
  currentPage: 1,
  totalPages: 10,
  itemsPerPage: 10,
  totalItems: 98,
  label: "Show",
  labelSuffix: "items",
  buttonData: atoms.buttons,
  selectData: atoms.selects,
  datas: molecules.paginations 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">3. Navigation pager only (just the page numbers and navigation buttons):</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{{ renderPagination({ 
  name: "navigation-pager", 
  currentPage: 1,
  totalPages: 10,
  buttonData: atoms.buttons,
  datas: molecules.paginations 
}) }}</code></pre>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">4. Custom configuration options:</h3>
        <ul class="list-disc pl-6 space-y-2 text-gray-600">
          <li><code>currentPage</code>: Current active page (number)</li>
          <li><code>totalPages</code>: Total number of pages (number)</li>
          <li><code>itemsPerPage</code>: Number of items displayed per page (number)</li>
          <li><code>totalItems</code>: Total count of items (number)</li>
          <li><code>label</code>: Label text for select (string)</li>
          <li><code>labelSuffix</code>: Text to display after the number (default: "per page")</li>
          <li><code>buttonData</code>: Button component data from atoms.buttons</li>
          <li><code>selectData</code>: Select component data from atoms.selects</li>
        </ul>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold text-gray-700 mb-3">5. Configuring the pagination in paginations.json:</h3>
        <pre class="bg-gray-100 p-3 rounded-md overflow-x-auto"><code class="text-sm text-gray-900">{
  "navigationPager": {
    "name": "navigation-pager",
    "text": "Navigation Pager",
    "children": [
      { "label": "/assets/icons/first.svg", "url": "/first", "ref": "buttons.inventory" },
      { "label": "/assets/icons/prev.svg", "url": "/prev", "ref": "buttons.inventory" },
      { "label": "1", "url": "/page/1", "current": true, "ref": "buttons.quantity_button" },
      { "label": "2", "url": "/page/2", "ref": "buttons.quantity_button" },
      ...
    ]
  }
}</code></pre>
      </div>
    </div>
    <p class="mt-6 text-gray-600 italic">May the winds favor your sails and not your enemies'! ⛵🌬️</p>
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