export function add(a, b) {
  return a + b;
}


export function subtract(a, b) {
  return a - b;
}


export function abc() {
  return Promise.resolve().then(() => {
    return 'abc';
  })
}