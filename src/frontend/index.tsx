import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import vscode from './vscodeWrapper';

import MyApp from './components/App';
import { store } from './state/store';

import './style/style.css';
import './style/flow.css';

// Request update of document content
vscode.postMessage({ type: 'sync' });

// Render your React component instead
const appNode = document.getElementById('app') as HTMLElement;
const root = createRoot(appNode);
root.render(
    <Provider store={store}>
        <MyApp />
    </Provider>
);
