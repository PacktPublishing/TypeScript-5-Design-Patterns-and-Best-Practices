class Box<T> {
  constructor(private value: T) {}
  map<U>(f: (value: T) => U): Box<U> {
    return new Box(f(this.value))
  }
  toString(): string {
    return `Box(${this.value})`
  }
}
const box = new Box(5)
const result = box.map((x) => x * 2).map((x) => x + 1)
console.log(result.toString()) // Box(11)

interface Applicative<T> {
  map<U>(f: (value: T) => U): Applicative<U>
  ap<U>(f: Applicative<(value: T) => U>): Applicative<U>
}

class Maybe<T> {
  private constructor(private value: T | null) {}

  static just<T>(value: T): Maybe<T> {
    return new Maybe(value)
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(null)
  }

  map<U>(f: (value: T) => U): Maybe<U> {
    return this.value === null ? Maybe.nothing() : Maybe.just(f(this.value))
  }

  ap<U>(f: Maybe<(value: T) => U>): Maybe<U> {
    if (this.value === null || f.value === null) {
      return Maybe.nothing<U>()
    }
    return Maybe.just(f.value(this.value))
  }

  apCurried<A, B>(maybeFn: Maybe<(a: A) => (b: B) => T>, maybeA: Maybe<A>): Maybe<(b: B) => T> {
    return maybeFn.ap(maybeA.map((a) => (fn) => fn(a)))
  }

  getOrElse(defaultValue: T): T {
    return this.value !== null ? this.value : defaultValue
  }
}


import * as O from "fp-ts/Option"
import { sequenceT } from "fp-ts/Apply"

import * as S from 'fp-ts/string'

import { Functor } from 'fp-ts/Functor'
import * as Ap from 'fp-ts/Apply'

import { pipe } from "fp-ts/function"
import * as A from 'fp-ts/Array'
import * as N from 'fp-ts/number'
const numberMonoid = N.MonoidSum;
const numbers2 = [1, 2, 3, 4]
const sum = pipe(
  numbers2,
  A.foldMap(numberMonoid)(n => n)
)

const maybeNumbers = [O.some(1), O.some(2), O.none, O.some(4)]
const traverseResult = pipe(
  maybeNumbers,
  A.traverse(O.Applicative)((n) => n)
)

// 1. Functor Example
const numbers = [1, 2, 3, 4]
const doubleArray = pipe(
  numbers,
  A.map(n => n * 2)
)

const add = (a: number) => (b: number) => a + b
const maybeNumber1 = O.some(5)
const maybeNumber2 = O.some(10)
const maybeAdd = O.some(add)

const result2 = pipe(
  sequenceT(O.option)(maybeAdd, maybeNumber1, maybeNumber2),
  O.map(([fn, a, b]) => fn(a)(b)),
)

console.log(O.getOrElse(() => 0)(result2)) // Should output 15

interface Semigroup<T> {
  concat(other: T): T
}
class Sum implements Semigroup<Sum> {
  constructor(public value: number) {}

  concat(other: Sum): Sum {
    return new Sum(this.value + other.value)
  }
}
class Str implements Semigroup<Str> {
  constructor(public value: string) {}

  concat(other: Str): Str {
    return new Str(this.value + other.value)
  }
}
// Generic function to combine a list of semigroups
function concatAll<T extends Semigroup<T>>(xs: T[]): T {
  return xs.reduce((acc, x) => acc.concat(x))
}
// Usage examples
const sums = [new Sum(1), new Sum(2), new Sum(3)]
console.log(concatAll(sums).value) // Output: 6

const strings = [new Str("Hello, "), new Str("functional "), new Str("programming!")]
console.log(concatAll(strings).value) // Output: "Hello, functional programming!"


