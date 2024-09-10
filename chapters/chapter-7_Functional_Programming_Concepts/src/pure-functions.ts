function add(a: number, b: number): number {
  return a + b
}

console.log(add(2, 3)) // Always outputs 5
console.log(add(2, 3)) // Always outputs 5

let count = 0
function incrementAndLog(value: number): number {
  count++ // Modifies external state
  console.log(`Count is now ${count}`) // Side effect: logging
  return value + 1
}
console.log(incrementAndLog(5)) // Outputs: Count is now 1, 6
console.log(incrementAndLog(5)) // Outputs: Count is now 2, 6

function toZero(num: number): 0 {
  return 0
}
