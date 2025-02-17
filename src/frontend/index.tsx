import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import MyApp from './components/App';
import { store, observeStore } from './state/store';
import { connectBackend } from './backend_link';

import './style/style.css';
import './style/flow.css';

connectBackend(store.dispatch);

// Render your React component instead
const appNode = document.getElementById('app') as HTMLElement;
const root = createRoot(appNode);
root.render(
    <Provider store={store}>
        <MyApp />
    </Provider>
);
