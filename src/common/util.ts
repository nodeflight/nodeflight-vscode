import { Uri, WebviewPanel } from "vscode";

export function getNonce() {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < 32; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

export function debounce(func: CallableFunction, delay: number) {
	let timer: NodeJS.Timeout | undefined = undefined;
	return function (...args: any[]) {
		clearTimeout(timer);
		timer = setTimeout(() => { func(...args); }, delay);
	};
}



