import { createRoot } from 'react-dom/client';
import MyApp from './App';

import './style.css';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<MyApp />);
