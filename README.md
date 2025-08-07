# Interview Questions with Tests

This project contains React and JavaScript interview questions with failing tests. The goal is to show candidates failing tests and ask them to fix the code to make the tests pass.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run all tests:
```bash
npm test
```

3. Run tests in watch mode:
```bash
npm run test:watch
```

4. Run a specific snippet test:
```bash
npm test snippet1
```

## Interview Flow

1. **Show the failing test** - Run the test to show it's failing
2. **Show the buggy code** - Let candidate examine the component
3. **Ask them to fix it** - "Make this test pass by fixing the component"
4. **Verify the fix** - Run the test again to confirm it passes

## Project Structure

```
├── package.json          # Dependencies and scripts
├── jest.config.js         # Jest configuration
├── jest.setup.js          # Test setup
├── .babelrc              # Babel configuration
├── snippets/             # Test files for each snippet
│   ├── snippet1.test.js  # Todo toggle bug
│   ├── snippet2.test.js  # useEffect dependencies
│   └── ...
├── react.md              # React interview questions (reference)
└── js.md                 # JavaScript interview questions (reference)
```

## Example Usage

```bash
# Run snippet 1 test (will fail)
npm test snippet1

# Expected output:
# FAIL snippets/snippet1.test.js
# ✕ should toggle todo completed status when clicked

# Show candidate the failing test and the component code
# Ask them to fix the TodoList component
# Re-run test to verify fix
```

## Current Snippets

- **Snippet 1**: Todo toggle state mutation bug