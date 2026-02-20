// Side-effect imports to ensure non-page-entry modules are loaded when index.html is opened
// This helps during local development so all helper modules are available globally.
import './api.js';
import './components.js';
import './mock-data.js';
import './utils.js';
import './api-adapter.js';

// Note: these modules are normally imported by page-specific modules.
// Importing them here is safe because ES modules are cached and side-effects run once.

console.log('site-scripts loaded — helper modules imported');
