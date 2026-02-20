import { initComponents } from './app.js';

const init = async () => {
  try {
    await initComponents();
  } catch (err) {
    console.warn('component init failed', err);
  }
};

document.addEventListener('DOMContentLoaded', init);
