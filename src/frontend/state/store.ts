import { configureStore } from '@reduxjs/toolkit';
import viewportReducer from './viewport';
import graphReducer from './graph';

import vscode from '../vscodeWrapper';
import { debounce } from '../../common/util';

/* Persist state when resetting webview */
const initialState = vscode.getState();
export const store = configureStore({
    reducer: {
        viewport: viewportReducer,
        graph: graphReducer
    },
    preloadedState: initialState
});
store.subscribe(debounce(() => vscode.setState(store.getState()), 200));

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
