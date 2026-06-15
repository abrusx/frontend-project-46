import fs from 'fs';
import path from 'node:path';
import { cwd } from 'node:process';
import yaml from 'js-yaml';

const parseFile = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  const fileExt = path.extname(fullPath).toLowerCase();
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  switch (fileExt) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return yaml.load(fileContent);
    default:
      throw new Error(`Unsupported file format: ${fileExt}`);
  }
};

export default parseFile;