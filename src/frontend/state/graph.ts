import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    type Node,
    type Edge,
    type NodeChange,
    type EdgeChange,
    type Connection,
} from "@xyflow/react";

interface GraphState {
    nodes: Node[],
    edges: Edge[]
};


const initialNodes: Node[] = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

export const graphSlice = createSlice({
    name: 'graph',
    initialState: {
        nodes: initialNodes,
        edges: initialEdges,
    } as GraphState,
    reducers: {
        graphNodeChanges: (state: GraphState, action: PayloadAction<NodeChange<Node>[]>) => {
            state.nodes = applyNodeChanges(action.payload, state.nodes);
        },
        graphEdgeChanges: (state: GraphState, action: PayloadAction<EdgeChange<Edge>[]>) => {
            state.edges = applyEdgeChanges(action.payload, state.edges);
        },
        graphConnect: (state: GraphState, action: PayloadAction<Connection>) => {
            state.edges = addEdge(action.payload, state.edges);
        }
    }
});

export const {
    graphNodeChanges,
    graphEdgeChanges,
    graphConnect
} = graphSlice.actions;
export default graphSlice.reducer;
