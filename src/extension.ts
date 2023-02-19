import * as vscode from 'vscode'
import * as commands from './commands'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'extension.addCurrentFolderExportationToIndex',
    (uri: vscode.Uri) => {
      commands.addCurrentFolderExportationToIndex(uri.fsPath)
    },
  )

  context.subscriptions.push(disposable)
}

export function deactivate() {}
