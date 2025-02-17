import { useState, useCallback, useMemo } from 'react';
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    type Node,
    type Edge,
    type Viewport,
    type EdgeChange,
    type NodeChange,
    type Connection,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { useAppDispatch, useAppSelector } from '../state/hooks';

import {
    setViewport
} from '../state/viewport';
import {
    graphNodeChanges,
    graphEdgeChanges,
    graphConnect
} from '../state/graph';
import React from 'react';



export default function MyApp() {
    const dispatch = useAppDispatch();
    const graph = useAppSelector(state => state.graph);
    const viewport = useAppSelector(state => state.viewport);

    const onNodesChange = useCallback(
        (changes: NodeChange<Node>[]) => dispatch(graphNodeChanges(changes)),
        [graph],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange<Edge>[]) => dispatch(graphEdgeChanges(changes)),
        [graph],
    );
    const onConnect = useCallback(
        (connection: Connection) => dispatch(graphConnect(connection)),
        [graph],
    );
    const onViewportChange = useCallback(
        (wp: Viewport) => dispatch(setViewport(wp)),
        [viewport],
    );
    const viewportObj = useMemo(() => viewport.viewport, [viewport]);
    const fitView = (viewport.viewport == null);

    return (
        <ReactFlow
            nodes={graph.nodes}
            edges={graph.edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onViewportChange={onViewportChange}
            fitView={fitView}
            viewport={viewportObj}
        >
            <Background variant={BackgroundVariant.Dots} />
            <Controls />
        </ReactFlow>
    );
}
