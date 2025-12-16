import { Command } from 'commander'
// import fs from 'fs'
// import path from 'node:path'
// import { cwd } from 'node:process'
// import { readFileSync } from 'node:fs'
import parseData from './src/parseData.js'

const program = new Command()

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format  [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(parseData(filepath1))
    console.log(parseData(filepath2))
  })
  .parse(process.argv)

const options = program.opts();
