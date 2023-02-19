import * as path from 'path'
import * as fs from 'fs'
import * as vscode from 'vscode'
import {
  fileIsOpened,
  fileIsSaved,
  getCurrentFilePath,
} from '../utils/editor-helper'
import { ApplicationError } from '../utils/errors'
import {
  createFileIfNotExists,
  getLines,
  writeFile,
} from '../utils/file-manager'
import { getExtension } from '../utils/file-name'

const getFilePath = (): string => {
  if (!fileIsOpened()) {
    throw new ApplicationError('No file is opened.')
  }

  if (!fileIsSaved()) {
    throw new ApplicationError('The file is not saved yet.')
  }

  return getCurrentFilePath()
}

const getIndexPath = (dirPath: string): string => {
  return path.join(dirPath, `index.ts`)
}

const getExportationLine = (filePath: string): string => {
  const fileName = path.basename(filePath)
  const extension = getExtension(fileName)
  const fileNameWithoutExtension = fileName.replace(`.${extension}`, '')
  return `export * from './${fileNameWithoutExtension}';`
}

const writeLineAndSort = (filePath: string, line: string): void => {
  writeFile(filePath, line)
}

export const addCurrentFileExportationToIndex = () => {
  try {
    const filePath = getFilePath()

    if (!filePath.match(/\.[jt]sx?$/)) {
      throw new ApplicationError('The file is not JavaScipt or TypeScript.')
    }

    const indexFilePath = getIndexPath(filePath)

    if (filePath === indexFilePath) {
      throw new ApplicationError('The file is the index file itself.')
    }

    createFileIfNotExists(indexFilePath)

    const exportationLine = getExportationLine(filePath)
    writeLineAndSort(indexFilePath, exportationLine)
  } catch (err) {
    if (err instanceof ApplicationError) {
      vscode.window.showErrorMessage(err.message)
      return
    }

    throw err
  }
}

export const addCurrentFolderExportationToIndex = (folderpath: string) => {
  try {
    const indexFilePath = getIndexPath(folderpath)
    createFileIfNotExists(indexFilePath)

    let lines = ''
    const files = fs.readdirSync(folderpath)

    for (const filePath of files) {
      if (filePath == 'index.ts') continue
      const exportationLine = getExportationLine(filePath)
      lines += exportationLine + '\n'
    }

    writeLineAndSort(indexFilePath, lines)
  } catch (err) {
    if (err instanceof ApplicationError) {
      vscode.window.showErrorMessage(err.message)
      return
    }

    throw err
  }
}
