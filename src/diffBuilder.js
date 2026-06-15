const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort();

  const children = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object' && obj1[key] !== null && obj2[key] !== null && !Array.isArray(obj1[key]) && !Array.isArray(obj2[key])) {
      return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
    }
    return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
  });

  return children;
};

export default buildDiff;