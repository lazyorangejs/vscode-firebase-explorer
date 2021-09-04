import vscode = require('vscode');
import { firebaseExplorerOutputChannel } from '../output/outputChannel';
import { AccountManager } from './AccountManager';

export async function showTokenInput(): Promise<void> {
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
      if (accountInfo?.user) {
        await AccountManager.addAccount(accountInfo);
        // vscode.commands.executeCommand('firebaseExplorer.projects.refresh');
      } else {
        await vscode.window.showErrorMessage(
          'Unable to fetch an account info by given firebase token. Please try to use another token.'
        );
      }
    } catch (err) {
      firebaseExplorerOutputChannel.print(JSON.stringify({
        err,
        msg: 'Unable to fetch an account info by given firebase token. Please try to use another token.'
      }))

      await vscode.window.showErrorMessage(
        'Unable to fetch an account info by given firebase token. Please try to use another token.'
      );
    }
  }
}
