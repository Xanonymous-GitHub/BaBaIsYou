/**
 * Python script for getting file names from current dir
 * @example
 * import os
 * print([f for f in os.listdir('.') if os.path.isfile(f)])
 * */

export interface Resource {
  name: string
  url: string
}

export enum Species {
  CHARACTERS = 'characters',
  NOUNS = 'nouns',
  OPERATORS = 'operators',
  PROPERTIES = 'properties'
}