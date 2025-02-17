import * as vscode from 'vscode';

export class XmlDocument implements vscode.Disposable {
    graph: any = undefined;

    constructor(
        document: vscode.TextDocument
    ) {
        console.log("Nodes is constructing");
        this.document = document;

        this.changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.document.uri.toString() === this.document.uri.toString()) {
                this.handleChange(e);
            }
        });
    }

    dispose() {
        this.changeDocumentSubscription.dispose();
        console.log("Nodes is disposing");
    }

    public document: vscode.TextDocument;

    private changeDocumentSubscription: vscode.Disposable;


    private handleChange(e: vscode.TextDocumentChangeEvent) {
        console.log("Nodes is changing");
    }
}
