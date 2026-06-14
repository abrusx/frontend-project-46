import parseData from './parseData.js';

const genDiff = (filepath1, filepath2) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const keys1 = Object.keys(data1).sort();
  const keys2 = Object.keys(data2).sort();

  const removed = keys1.filter(key => !keys2.includes(key));
  const added = keys2.filter(key => !keys1.includes(key));
  const common = keys1.filter(key => keys2.includes(key));

  const unchanged = common.filter(key => data1[key] === data2[key]);
  const changed = common.filter(key => data1[key] !== data2[key]);

  const lines = [];

  [...removed, ...unchanged].sort().forEach((key) => {
    const sign = keys2.includes(key) ? ' ' : '-';
    lines.push(`  ${sign} ${key}: ${data1[key]}`);
  });

  changed.sort().forEach((key) => {
    lines.push(`  - ${key}: ${data1[key]}`);
    lines.push(`  + ${key}: ${data2[key]}`);
  });

  added.sort().forEach((key) => {
    lines.push(`  + ${key}: ${data2[key]}`);
  });

  return ['{', ...lines, '}'].join('\n');
};

export default genDiff;