export function add(a: number, b: number): number {
  return a + b;
}

console.log("1");

export function subtract(a: number, b: number): number {
  return a - b;
}
export function abc(): Promise<string> {
  return Promise.resolve().then(() => {
    return "abc";
  });
}
