import * as vscode from 'vscode';

import { XmlDocument } from './utils/XmlDocument';
import { getNonce } from './utils/util';

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

        webviewPanel.webview.postMessage({
            type: 'update',
            text: document.getText(),
        });

        webviewPanel.webview.options = {
            enableScripts: true
        };
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview);

    }

    private getHtmlForWebview(webview: vscode.Webview): string {
        const webviewUri = (...name: Array<string>) => {
            const uri = webview.asWebviewUri(
                vscode.Uri.joinPath(
                    this.context.extensionUri, 'out', 'frontend', ...name
                )
            );
            console.log(uri);
            return uri;
        };

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
				<link href="${webviewUri('style.css')}" rel="stylesheet" />
			</head>
			<body>
				<div id="app">
                    Test...
				</div>
				<script nonce="${nonce}" src="${webviewUri('index.js')}"></script>
			</body>
			</html>`;
    }

}
