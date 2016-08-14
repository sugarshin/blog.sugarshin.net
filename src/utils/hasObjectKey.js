export default function hasObjectKey(object, key) {
  return Object.keys(object).some(k => k === key);
}
