/**
 * Reads a nested value in `object` from its `path`
 * @param {String} path nested object path
 * @param {Object} object object to explore
 * @return {Object} nested value
 */
export function resolvePath(path, object) {
  return path
    .split('.')
    .reduce((prev, curr) => prev && prev[curr], object);
}

/**
 * Write a nested value in `object` from its `path`
 * @param {String} path nested object path
 * @param {Object} object object to explore
 * @param {Object} value new value
 * @return {Object} complet object updated
 */
export function setPath(path, object, value) {
  return path
    .split('.')
    .reduce((o, p, i) => {
      i += 1;
      o[p] = path.split('.').length === i ? value : o[p] || {};
      return o[p];
    }, object);
}
