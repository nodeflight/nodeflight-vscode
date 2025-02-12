import { createRoot } from 'react-dom/client';
import MyApp from './App';

import './style/style.css';
import React from 'react';

// Render your React component instead
const appNode = document.getElementById('app') as HTMLElement;
const root = createRoot(appNode);
root.render(<MyApp />);
