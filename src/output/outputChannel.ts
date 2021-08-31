/*-----------------------------------------------------------------------------------------------
 *  Copyright (c) Red Hat, Inc. All rights reserved.
 *  Licensed under the MIT License. See LICENSE file in the project root for license information.
 *-----------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';

const prettifyJson = (str: string): string => {
  let jsonData: string = str;
  try {
    jsonData = JSON.stringify(JSON.parse(str), null, 2);
  } catch (_) {
  }
  return jsonData;
}

/**
 * An interface that requires the implementation of:
 * @function print
 * @function show
 */
export interface OutputChannel {
  print(text: string): void;
  show(): void;
}

/**
 * Write to and display information in the Knative Output window/channel.
 * An output channel is a container for readonly textual information.
 *
 * @function print
 * @function show
 */
export class FirebaseExplorerOutputChannel implements OutputChannel {
  private readonly channel: vscode.OutputChannel = vscode.window.createOutputChannel('Firebase Explorer');

  /**
   * Display the output channel.
   */
  show(): void {
    this.channel.show();
  }

  /**
   * Take and display it in the output channel.
   *
   * If it has `--token=xxx` convert it to `--token= *****`.
   *
   * Open the firebase.explorer Output channel if set in config.
   * @param text
   */
  public print(text: string): void {
    const textData: string = prettifyJson(text);
    this.channel.append(textData);
    if (!textData.endsWith('\n')) {
      this.channel.append('\n');
    }
    if (vscode.workspace.getConfiguration('firebase.explorer').get<boolean>('showChannelOnOutput')) {
      this.channel.show();
    }
  }
}

export const firebaseExplorerOutputChannel = new FirebaseExplorerOutputChannel()