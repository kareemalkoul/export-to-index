import * as vscode from 'vscode'
import * as commands from './commands'

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    'extension.addCurrentFileExportationToIndex',
    () => {
      commands.addCurrentFileExportationToIndex()
    },
  )

  const disposable2 = vscode.commands.registerCommand(
    'extension.addCurrentFolderExportationToIndex',
    () => {
      commands.addCurrentFolderExportationToIndex()
    },
  )

  context.subscriptions.push(disposable)
  context.subscriptions.push(disposable2)
}

export function deactivate() {}
