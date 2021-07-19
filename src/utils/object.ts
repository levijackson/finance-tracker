const cloneObject = (obj) => {
  // https://stackoverflow.com/questions/18359093/how-to-copy-javascript-object-to-new-variable-not-by-reference
  return JSON.parse(JSON.stringify(obj));
}

export {
  cloneObject
}