import fs from "fs";
import path from "path";

// Get the component name from the command line arguments
const componentName = process.argv[2];
if (!componentName) {
    console.error("❌ Please provide a component name.");
    process.exit(1);
}

// Define paths for the generated files
const basePath = path.resolve("src/_includes/03-atoms");
const contentPath = path.resolve("src/_data/contents/atoms");
const stylesPath = path.resolve("src/_data/styles/atoms");
const storiesPath = path.resolve("src/stories/atoms");

const componentFile = path.join(basePath, `${componentName.toLowerCase()}.njk`);
const contentFile = path.join(contentPath, `${componentName.toLowerCase()}-content.json`);
const stylesFile = path.join(stylesPath, `${componentName.toLowerCase()}-styles.json`);
const storiesFile = path.join(storiesPath, `${componentName.toLowerCase()}.stories.js`);

// Ensure directories exist
[basePath, contentPath, stylesPath, storiesPath].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Function to create a file if it doesn't exist
const createFile = (filePath, content) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, "utf8");
        console.log(`✅ Created: ${filePath}`);
    } else {
        console.warn(`⚠️ Already exists: ${filePath}`);
    }
};

// Generate the .njk component file
const njkTemplate = `<!-- ${componentName} component -->\n<div class=\"${componentName.toLowerCase()}\">\n    <!-- Content goes here -->\n</div>`;
createFile(componentFile, njkTemplate);

// Generate the content JSON file
const contentJson = JSON.stringify({
    component: componentName,
    content: "Your content here"
}, null, 2);
createFile(contentFile, contentJson);

// Generate the styles JSON file
const stylesJson = JSON.stringify({
    component: componentName,
    styles: {
        color: "#000000",
        fontSize: "16px"
    }
}, null, 2);
createFile(stylesFile, stylesJson);

// Generate the Storybook file
const storiesTemplate = `export default {
    title: 'Atoms/${componentName}',
};

export const Default = () => ({
    template: `\n        <div class=\"${componentName.toLowerCase()}\">\n            <!-- Content goes here -->\n        </div>\n    `,
});`;
createFile(storiesFile, storiesTemplate);

console.log("🎉 All files generated successfully!");
