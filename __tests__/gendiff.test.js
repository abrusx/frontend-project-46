import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const cases = [
  ['json', 'file1.json', 'file2.json', 'expected_stylish.txt'],
  ['yml', 'file1.yml', 'file2.yml', 'expected_stylish.txt'],
];

test.each(cases)('gendiff should compare %s files with nested structures', (format, file1, file2, expectedFile) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFixture(expectedFile);
  const result = genDiff(filepath1, filepath2, 'stylish');
  expect(result).toEqual(expected);
});

const plainCases = [
  ['json', 'file1.json', 'file2.json', 'expected_plain.txt'],
  ['yml', 'file1.yml', 'file2.yml', 'expected_plain.txt'],
];

test.each(plainCases)('genDiff plain format for %s', (format, file1, file2, expectedFile) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFixture(expectedFile);
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(expected);
});

const jsonCases = [
  ['json', 'file1.json', 'file2.json', 'expected_json.txt'],
  ['yml', 'file1.yml', 'file2.yml', 'expected_json.txt'],
];

test.each(jsonCases)('genDiff json format for %s', (format, file1, file2, expectedFile) => {
  const filepath1 = getFixturePath(file1);
  const filepath2 = getFixturePath(file2);
  const expected = readFixture(expectedFile);
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(expected);
});