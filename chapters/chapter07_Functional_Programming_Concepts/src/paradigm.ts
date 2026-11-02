const numbers = Array.from({ length: 10 },
(_, i) => i + 1);
const sum = numbers
.filter(n => n % 2 === 0)
.reduce((acc, n) => acc + n, 0);
console.log(sum); // Output: 30
