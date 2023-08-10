# export-folder-to-index

## Description

This extension allows you to easily create an `index.ts` file in the same directory as the current file. It automatically adds `export * from ${fileName}` statements to the `index.ts` file, ensuring that all files in the directory are exported. The lines in the `index.ts` file are sorted alphabetically.

## Installation

To install the extension, follow these steps:

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X)
3. Search for "export-folder-to-index"
4. Click on the "Install" button

## Usage

To use the extension, follow these steps:

1. Open the file you want to export in Visual Studio Code
2. Open the Command Palette (Ctrl+Shift+P)
3. Search for "Export: export folder to index"
4. Select the command from the list
5. The `index.ts` file will be created in the same directory as the current file, and the necessary export statements will be added

## Requirements

- You should be comfortable with the import/export style used by the extension

## Source

The source code for this extension can be found on [GitHub](https://github.com/kareemalkoul/export-folder-to-index).