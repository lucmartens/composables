const objectShallowEqual = (a, b) => {
  if (a === b) {
    return true;
  }

  return (
    arrayShallowEqual(Object.keys(a), Object.keys(b)) &&
    arrayShallowEqual(Object.values(a), Object.values(b))
  );
};

const arrayShallowEqual = (a, b) => {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
};

const shallowEqual = (a, b) => {
  if (
    typeof a !== typeof b ||
    (a === null && b !== null) ||
    (a !== null && b === null) ||
    (Array.isArray(a) && !Array.isArray(b)) ||
    (!Array.isArray(a) && Array.isArray(b))
  ) {
    return false;
  }

  if (Promise.resolve(a) === a && Promise.resolve(b) === b) {
    return a === b;
  }

  if (typeof a === 'object' && Array.isArray(a)) {
    return arrayShallowEqual(a, b);
  }

  if (typeof a === 'object') {
    return objectShallowEqual(a, b);
  }

  return a === b;
};

export default shallowEqual;
