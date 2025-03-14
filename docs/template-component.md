# Génération Complète de Composant HAT Dynamic Template

## Objectif

Créer un nouveau composant pour le HAT Dynamic Template suivant une structure standardisée et modulaire.

## Structure Globale Requise

### 1. Macro Nunjucks (nom-component.njk)

```njk
{% macro renderNomComponent(options) %}
  {% set componentData = options.datas.nom-components | selectattr('name', 'equalto', options.name) | first %}
  {% set globalStyle = options.datas.globalStyle %}
  {% set variantStyle = options.datas.variants[componentData.style] %}

  {% if componentData %}
    <div class="{{ globalStyle }} {{ variantStyle }}">
      {{ componentData.text }}
    </div>
  {% else %}
    <span>Component not found</span>
  {% endif %}
{% endmacro %}
```

### 2. Fichier JSON de Données (nom-components.json)

```json
{
  "globalStyle": "typography-label-l nom-component",
  "variants": {
    "default": "text-gray-800",
    "primary": "text-blue-600",
    "secondary": "text-gray-500"
  },
  "nom-components": [
    { "name": "example_1", "text": "Exemple 1", "style": "default" },
    { "name": "example_2", "text": "Exemple 2", "style": "primary" },
    { "name": "example_3", "text": "Exemple 3", "style": "secondary" }
  ]
}
```

### 3. Fichier Storybook (NomComponent.stories.js)

```jsx
import nomComponentsData from '../../_data/atoms/nom-components.json';

export default {
  title: 'Atoms/NomComponent',
  render: (args) => `
    <div class="${nomComponentsData.globalStyle} ${nomComponentsData.variants[args.style]}">
      ${args.text}
    </div>
  `,
  argTypes: {
    text: { control: 'text', defaultValue: 'Texte par défaut' },
    style: { control: { type: 'select', options: Object.keys(nomComponentsData.variants) }, defaultValue: 'default' }
  }
};

// Exemples basés sur les données du composant
export const ExempleUn = { args: { ...nomComponentsData["nom-components"][0] } };
export const ExempleDeux = { args: { ...nomComponentsData["nom-components"][1] } };
export const ExempleTrois = { args: { ...nomComponentsData["nom-components"][2] } };

// Exemples statiques des différents styles
export const Default = { args: { text: 'Texte par défaut', style: 'default' } };
export const Primary = { args: { text: 'Texte primaire', style: 'primary' } };
export const Secondary = { args: { text: 'Texte secondaire', style: 'secondary' } };

// Guide d'utilisation
export const Usage = () => `<pre>{% raw %}{% renderNomComponent({ name: 'example_1' }) %}{% endraw %}</pre>`;
Usage.parameters = { docs: { description: { story: 'Utilisation de la macro dans un template.' } } };
```
