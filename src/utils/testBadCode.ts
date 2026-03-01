// TEST FILE: This file has intentional issues to test Claude Code Review inline comments.
// DELETE THIS FILE after testing.

// Bug: SQL injection vulnerability
const getUserData = (userId: string) => {
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  return query;
};

// Bug: Hardcoded secret/credential
const API_KEY = "sk-1234567890abcdef-super-secret-key";
const DATABASE_PASSWORD = "admin123";

// Bug: console.log left in production code
const processPayment = (amount: number) => {
  console.log("Processing payment for amount:", amount);
  console.log("Using API key:", API_KEY);
  // No input validation
  return amount * 1.13;
};

// Bug: any type usage, no error handling
const fetchData = async (url: any) => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

// Bug: Infinite loop potential, mutation of input
const sortItems = (items: number[]) => {
  let i = 0;
  while (i < items.length) {
    if (items[i] > items[i + 1]) {
      const temp = items[i];
      items[i] = items[i + 1];
      items[i + 1] = temp;
      i = 0; // restart from beginning every time - O(n^2) worst case
    } else {
      i++;
    }
  }
  return items;
};

// Bug: eval usage
const calculate = (expression: string) => {
  return eval(expression);
};

// Bug: Race condition - no mutex/lock
let counter = 0;
const incrementCounter = async () => {
  const current = counter;
  await new Promise((resolve) => setTimeout(resolve, 100));
  counter = current + 1;
};

// Bug: Memory leak - event listener never removed
const setupListener = () => {
  document.addEventListener("click", (e) => {
    const data = new Array(1000000).fill("x");
    console.log(data.length);
  });
};

// Bug: Unused variables and imports
const unusedVariable = "I'm never used";
const anotherUnused = 42;

export {
  getUserData,
  processPayment,
  fetchData,
  sortItems,
  calculate,
  incrementCounter,
  setupListener,
};
