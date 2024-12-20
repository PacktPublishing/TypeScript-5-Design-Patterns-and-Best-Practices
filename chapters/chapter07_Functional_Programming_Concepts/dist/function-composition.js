"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function double(x) {
    return x * 2;
}
function increment(x) {
    return x + 1;
}
const doubleAndIncrement = (x) => increment(double(x));
console.log(doubleAndIncrement(3)); // Output: 7
// Explanation: (3 * 2) + 1 = 7
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function removeSpaces(str) {
    return str.replace(/\s+/g, "");
}
function truncate(str, length) {
    return str.length > length ? str.slice(0, length) + "..." : str;
}
const formatUserInput = (input) => {
    return truncate(removeSpaces(capitalizeFirstLetter(input)), 10);
};
console.log(formatUserInput("  john doe  ")); // Output: "Johndoe..."
console.log(formatUserInput("ALICE IN WONDERLAND")); // Output: "Aliceinwo..."
function compose(...fns) {
    return fns.reduce((prevFn, nextFn) => (...args) => nextFn(prevFn(...args)), (value) => value);
}
function curry(fn) {
    return (a) => (b) => fn(a, b);
}
const curriedTruncate = curry(truncate);
const formatAndTruncate = compose((s) => curriedTruncate(s)(7), removeSpaces, capitalizeFirstLetter);
console.log(formatAndTruncate("  john doe  ")); // Output: "Johndoe..."
console.log(formatAndTruncate("ALICE IN WONDERLAND")); // Output: "Alicein..."
function getDisplayName(p) {
    return p.name.toLowerCase();
}
function getLength(s) {
    return s.length;
}
// Now the type of getDisplayNameLength is correctly inferred as '(p: Person) => number'
const getDisplayNameLength = compose(getDisplayName, getLength);
// Usage example
const person = { name: "John Doe", age: 30 };
console.log(getDisplayNameLength(person)); // Output: 8
