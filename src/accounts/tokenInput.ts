import vscode = require('vscode');
import { AccountManager } from './AccountManager';

export async function showTokenInput(): Promise<void> {
  const firebaseToken = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    password: true,
    placeHolder: 'Paste your Firebase Access Token...'
  });

  if (firebaseToken) {
    try {
      await AccountManager.addAccountFromFirebaseToken(firebaseToken);
    } catch (err) {
      await vscode.window.showErrorMessage(err.message);
    }
  }
}
