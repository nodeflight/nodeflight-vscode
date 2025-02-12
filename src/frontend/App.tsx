import React, { useState, useCallback } from 'react';
import {
    Background,
    ReactFlow,
    ReactFlowProvider,
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    Panel,
} from '@xyflow/react';
import { debounce } from '../common/util';

import '@xyflow/react/dist/style.css';
import './style/flow.css';
import 'vscode-webview';

const vscode = acquireVsCodeApi();

const flowKey = 'nfnodes-flow';

const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
    { id: '1', data: { label: 'Node 1' }, position: { x: 0, y: -50 } },
    { id: '2', data: { label: 'Node 2' }, position: { x: 0, y: 50 } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const SaveRestore = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    const onSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            vscode.postMessage({
                command: 'nfNodes.save',
                flow
            });
        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowKey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };

        restoreFlow();
    }, [setNodes, setViewport]);

    const onAdd = useCallback(() => {
        const newNode = {
            id: getNodeId(),
            data: { label: 'Added node' },
            position: {
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
            },
        };
        setNodes((nds) => nds.concat(newNode));
    }, [setNodes]);

    const onViewportChange = debounce((viewport: any) => {
        vscode.postMessage({
            command: 'nfNodes.viewport',
            viewport
        });
    }, 200);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onViewportChange={onViewportChange}
            onInit={setRfInstance}
            fitView
            fitViewOptions={{ padding: 2 }}
        >
            <Background />
            <Panel position="top-right">
                <button onClick={onSave}>save</button>
                <button onClick={onRestore}>restore</button>
                <button onClick={onAdd}>add node</button>
            </Panel>
        </ReactFlow>
    );
};

export default () => (
    <ReactFlowProvider>
        <SaveRestore />
    </ReactFlowProvider>
);
