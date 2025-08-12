# Interview Questions with Tests

This project contains React interview questions with failing tests. The goal is to show candidates failing tests and ask them to fix the code to make the tests pass.

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
└── react.md              # React interview questions (reference)
```
