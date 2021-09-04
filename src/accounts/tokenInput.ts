import vscode = require('vscode');
import { AccountManager } from './AccountManager';

export async function showTokenInput() {
  const firebaseToken = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    password: true,
    placeHolder: 'Paste your Firebase Access Token...'
  });

  if (firebaseToken) {
    try {
      const accountInfo = await AccountManager.getAccountInfoFromFirebaseToken(
        firebaseToken
      );
      if (accountInfo) {
        await AccountManager.addAccount(accountInfo);
        vscode.commands.executeCommand('firebaseExplorer.projects.refresh');
      }
    } catch (err) {
      vscode.window.showErrorMessage(
        'Unable to fetch an account info by given Firebase token'
      );
    }
  }
}
