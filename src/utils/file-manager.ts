import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'
import * as vscode from 'vscode'
import { ApplicationError } from './errors'

export const fileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath)
}

export const createFile = (filePath: string): void => {
  if (fileExists(filePath)) {
    throw new FileAlreadyExistsError(`${filePath} already exists`)
  }

  fs.appendFileSync(filePath, '', 'utf-8')
}

export const createFileIfNotExists = (filePath: string): void => {
  if (fileExists(filePath)) {
    return
  }

  createFile(filePath)
}

export const getLines = (filePath: string): string[] => {
  return fs.readFileSync(filePath, 'utf-8').split('\n')
}

export const writeFile = (filePath: string, data: string): void => {
  fs.writeFileSync(filePath, data, { flag: 'w' })
}

export class FileAlreadyExistsError extends ApplicationError {}
