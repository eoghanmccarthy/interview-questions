# JavaScript Bug Snippets for Live Coding Interview

## Snippet 1

**Ask:** "This function doesn't return what I expect. What's wrong?"

```javascript
function addNumbers(a, b) {
  return a + b;
}

console.log(addNumbers(5, "3")); // Expected: 8, Got: "53"
```

## Snippet 2

**Ask:** "The counter doesn't increment properly. Why?"

```javascript
let counter = 0;

function increment() {
  counter++;
  return counter;
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(increment()), 100);
}
```

## Snippet 3

**Ask:** "This comparison behaves unexpectedly. What's the issue?"

```javascript
console.log(0 == false);   // true
console.log(0 === false);  // false
console.log("" == false);  // true
console.log("" === false); // false
console.log(null == undefined); // true
console.log(null === undefined); // false
```

## Snippet 4

**Ask:** "The array doesn't get sorted correctly. What's wrong?"

```javascript
const numbers = [1, 10, 2, 21, 3];
numbers.sort();
console.log(numbers); // [1, 10, 2, 21, 3]
```

## Snippet 5

**Ask:** "All buttons show the same number. Why?"

```javascript
for (var i = 0; i < 3; i++) {
  const button = document.createElement('button');
  button.textContent = 'Button ' + i;
  button.onclick = function() {
    alert('Button ' + i + ' clicked');
  };
  document.body.appendChild(button);
}
```

## Snippet 6

**Ask:** "The object comparison doesn't work as expected. What's the problem?"

```javascript
const obj1 = { name: "John", age: 30 };
const obj2 = { name: "John", age: 30 };
const obj3 = obj1;

console.log(obj1 == obj2);  // false
console.log(obj1 === obj2); // false
console.log(obj1 === obj3); // true
```

## Snippet 7

**Ask:** "This function loses context. What's happening?"

```javascript
const person = {
  name: "Alice",
  greet: function() {
    console.log("Hello, " + this.name);
  }
};

const greetFunction = person.greet;
greetFunction(); // "Hello, undefined"
```

## Snippet 8

**Ask:** "The array modification doesn't work. What's wrong?"

```javascript
const arr = [1, 2, 3, 4, 5];
const doubled = arr.map(x => x * 2);
arr.push(6);

console.log('Original:', arr);  // [1, 2, 3, 4, 5, 6]
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10] - missing 12
```

## Snippet 9

**Ask:** "The hoisting behavior is confusing here. What's happening?"

```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

console.log(y); // ReferenceError
let y = 10;

console.log(myFunction()); // "Hello" (works)
function myFunction() {
  return "Hello";
}

console.log(myArrowFunction()); // ReferenceError
const myArrowFunction = () => "World";
```

## Snippet 10

**Ask:** "The callback doesn't execute as expected. What's the bug?"

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = "Important data";
    callback(data);
  }, 1000);
}

const result = fetchData((data) => {
  return data.toUpperCase();
});

console.log(result); // undefined
```

## Snippet 11

**Ask:** "The array filtering doesn't work correctly. Why?"

```javascript
const numbers = [1, 2, 3, 4, 5];
const filtered = numbers.filter(num => {
  if (num > 2) {
    return num;
  }
});
console.log(filtered); // [3, 4, 5] but logic seems wrong
```

## Snippet 12

**Ask:** "The string parsing fails unexpectedly. What's the issue?"

```javascript
console.log(parseInt("10"));     // 10
console.log(parseInt("10.5"));   // 10
console.log(parseInt("10abc"));  // 10
console.log(parseInt("abc10"));  // NaN
console.log(parseInt("010"));    // 10 (or 8 in older browsers)
console.log(parseInt("0x10"));   // 16
```

## Snippet 13

**Ask:** "The object property access fails. What's wrong?"

```javascript
const user = {
  "first-name": "John",
  "last name": "Doe",
  123: "numeric key"
};

console.log(user.first-name);  // NaN
console.log(user.last name);   // SyntaxError
console.log(user.123);         // SyntaxError
```

## Snippet 14

**Ask:** "The promise doesn't resolve as expected. What's the bug?"

```javascript
function asyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve("Success!");
      } else {
        return "Failed!"; // Bug: should be reject()
      }
    }, 1000);
  });
}

asyncOperation().then(result => {
  console.log(result);
}).catch(error => {
  console.log("Error:", error);
});
```

## Snippet 15

**Ask:** "The variable scope causes unexpected behavior. Why?"

```javascript
var functions = [];

for (var i = 0; i < 3; i++) {
  functions.push(function() {
    return i;
  });
}

functions.forEach(fn => console.log(fn())); // 3, 3, 3
```

## Snippet 16

**Ask:** "The array mutation has side effects. What's happening?"

```javascript
const originalArray = [1, 2, 3];
const modifiedArray = originalArray;
modifiedArray.push(4);

console.log(originalArray);  // [1, 2, 3, 4] - unexpected!
console.log(modifiedArray); // [1, 2, 3, 4]
```

## Snippet 17

**Ask:** "The type conversion is unexpected. What's wrong?"

```javascript
console.log(true + true);        // 2
console.log(true + false);       // 1
console.log("5" - 3);           // 2
console.log("5" + 3);           // "53"
console.log([] + []);           // ""
console.log({} + {});           // "[object Object][object Object]"
```

## Snippet 18

**Ask:** "The event listener doesn't work correctly. What's the issue?"

```javascript
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button, index) => {
  button.addEventListener('click', function() {
    console.log('Button ' + index + ' clicked');
    this.style.backgroundColor = 'red';
  });
});

// Problem: arrow function in forEach but regular function for event handler
```

## Snippet 19

**Ask:** "The function parameters behave strangely. Why?"

```javascript
function processData(data = []) {
  data.push('processed');
  return data;
}

const defaultData = [];
console.log(processData(defaultData)); // ['processed']
console.log(processData(defaultData)); // ['processed', 'processed']
console.log(processData());            // ['processed']
console.log(processData());            // ['processed', 'processed'] - Bug!
```

## Snippet 20

**Ask:** "The JSON parsing fails silently. What's the problem?"

```javascript
const jsonString = '{"name": "John", "age": 30,}'; // Trailing comma
const userData = JSON.parse(jsonString);
console.log(userData.name);

// Also problematic:
const invalidJson = "{'name': 'John'}"; // Single quotes
const moreUserData = JSON.parse(invalidJson);
```