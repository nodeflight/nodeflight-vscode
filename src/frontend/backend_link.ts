
import vscode from './vscodeWrapper';

import { AppDispatch } from './state/store';
import { setGraph } from './state/graph';

import {
    observeStore,
    type RootState
} from './state/store';

import {
    type GraphState
} from './state/graph';

export function connectBackend(dispatch: AppDispatch) {
    window.addEventListener('message', event => {
        console.log('message', event.data);
        if (event.data.type === 'graph/update') {
            dispatch(setGraph(event.data.graph));
        }
    });

    // Request update of document content
    vscode.postMessage({ type: 'graph/load' });

    observeStore((state: RootState) => state.graph, 200, (graph: GraphState) => {
        vscode.postMessage({ type: 'graph/save', graph });
    });
}

