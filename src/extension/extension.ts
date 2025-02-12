import * as vscode from 'vscode';
import { NfNodesEditorProvider } from './nfNodesEditor';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(NfNodesEditorProvider.register(context));
}

export function deactivate() { }
