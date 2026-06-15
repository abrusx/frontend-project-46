const indent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (value === null) return 'null';
  if (typeof value !== 'object') return String(value);
  // объект
  const entries = Object.entries(value).map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);
  return `{\n${entries.join('\n')}\n${indent(depth)}  }`;
};

const formatStylish = (tree, depth = 1) => {
  const lines = tree.map((node) => {
    const { key, type } = node;
    const baseIndent = indent(depth);

    switch (type) {
      case 'added':
        return `${baseIndent}+ ${key}: ${stringify(node.value, depth)}`;
      case 'removed':
        return `${baseIndent}- ${key}: ${stringify(node.value, depth)}`;
      case 'unchanged':
        return `${baseIndent}  ${key}: ${stringify(node.value, depth)}`;
      case 'changed':
        return [
          `${baseIndent}- ${key}: ${stringify(node.oldValue, depth)}`,
          `${baseIndent}+ ${key}: ${stringify(node.newValue, depth)}`,
        ].join('\n');
      case 'nested':
        return `${baseIndent}  ${key}: {\n${formatStylish(node.children, depth + 1)}\n${indent(depth)}  }`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return lines.join('\n');
};

const stylish = (diffTree) => `{\n${formatStylish(diffTree)}\n}`;

export default stylish;
