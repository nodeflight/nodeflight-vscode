import * as vscode from 'vscode';

import { XmlDocument } from '../common/XmlDocument';
import { getNonce } from '../common/util';

export class NfNodesEditorProvider implements vscode.CustomTextEditorProvider {
    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        return vscode.window.registerCustomEditorProvider(
            NfNodesEditorProvider.viewType,
            new NfNodesEditorProvider(context)
        );
    }

    private static readonly viewType = 'nfCode.nodes';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) {
        console.log("This is test");
    }

    public async resolveCustomTextEditor(
        document: vscode.TextDocument,
        webviewPanel: vscode.WebviewPanel,
        token: vscode.CancellationToken
    ): Promise<void> {
        const xmlDocument = new XmlDocument(document);
        webviewPanel.onDidDispose(() => {
            xmlDocument.dispose();
        });

        //webviewPanel.webview.html = '<h1>test</h1>';

        webviewPanel.webview.options = {
            enableScripts: true
        };
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);
        webviewPanel.webview.onDidReceiveMessage(
            message => this.handleMessage(xmlDocument, message, webviewPanel)
        );

        webviewPanel.webview.postMessage({
            type: 'update',
            text: document.getText(),
        });
    }

    private handleMessage(document: XmlDocument, message: any, webviewPanel: vscode.WebviewPanel) {
        console.log("message", message);
        if (message.type === 'graph/load') {
            console.log('call load');
            webviewPanel.webview.postMessage({
                type: 'graph/update',
                graph: document.graph || {
                    nodes: [
                        { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
                        { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
                    ],
                    edges: [
                        { id: 'e1-2', source: '1', target: '2' }
                    ]
                },
            });
        } else if (message.type === 'graph/save') {
            document.graph = message.graph;
        }
    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const webviewUri = (...name: Array<string>) =>
            webview.asWebviewUri(
                vscode.Uri.joinPath(
                    this.context.extensionUri, 'out', ...name
                )
            );

        const nonce = getNonce();

        return /* html */`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">

				<!--
				Use a content security policy to only allow loading images from https or from our extension directory,
				and only allow scripts that have a specific nonce.
				-->
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">

				<meta name="viewport" content="width=device-width, initial-scale=1.0">

				<title>NodeFlight Editor</title>
				<link href="${webviewUri('frontend.css')}" rel="stylesheet" />
			</head>
			<body>
				<div id="app">
                    Loading...
				</div>
				<script nonce="${nonce}" src="${webviewUri('frontend.js')}"></script>
			</body>
			</html>`;
    }

}
