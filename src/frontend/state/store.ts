import { configureStore, Unsubscribe } from '@reduxjs/toolkit';
import viewportReducer from './viewport';
import graphReducer from './graph';

import vscode from '../vscodeWrapper';

/* Persist state when resetting webview */
const initialState = vscode.getState();
export const store = configureStore({
    reducer: {
        viewport: viewportReducer,
        graph: graphReducer
    },
    preloadedState: initialState
});

export function observeStore(selector: CallableFunction, delay: number, onChange: CallableFunction): Unsubscribe {
    let currentState: any | undefined = undefined;
    let timer: NodeJS.Timeout | undefined = undefined;

    function processChange() {
        let newState = selector(store.getState());
        if (currentState !== newState) {
            currentState = newState;
            clearTimeout(timer);
            timer = setTimeout(() => onChange(currentState), delay);
        }
    }

    let unsubscribe = store.subscribe(processChange);
    processChange();
    return unsubscribe;
}

/* Make sure to save state when reloading webview */
observeStore((state: RootState) => state, 200, () => vscode.setState(store.getState()));

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
