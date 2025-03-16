/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const path = require('path');
const nunjucks = require('nunjucks');

// Configure Nunjucks environment
const njkEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader([
    path.resolve(__dirname, '../src/_includes')
  ])
);

const config = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/html-webpack5",
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  
  // Add public folder for static assets
  staticDirs: ['../public'],

  webpackFinal: async (config) => {
    // Existing rule for .njk files
    config.module.rules.push({
      test: /\.njk$/,
      use: [
        {
          loader: 'simple-nunjucks-loader',
          options: {
            environment: 'production'
          }
        }
      ]
    });
    
    // Add rule for raw loading of njk templates if needed
    config.module.rules.push({
      test: /\.njk$/,
      resourceQuery: /raw/,
      type: 'asset/source'
    });
    
    return config;
  },

  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation'
  },
  
  // Add global renderNunjucks function
  globals: {
    renderNunjucks: (template, context = {}) => {
      try {
        return njkEnv.renderString(template, {
          ...context,
          // Add any global data your Nunjucks templates expect
        });
      } catch (error) {
        console.error('Nunjucks render error:', error);
        return `<div style="color: red;">Error rendering template: ${error.message}</div>`;
      }
    }
  }
};

module.exports = config;