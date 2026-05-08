# spreadsheet-engine
spreadsheet-app/

├── src/

│   ├── App.jsx             # Main Layout & State Management

│   ├── FormulaParser.js    # Logic for math & dependency tracking

│   ├── Grid.jsx            # Rendering logic for the 10x10 table

│   └── main.jsx            # Entry point

├── index.html              # HTML Shell

├── package.json            # Dependencies

└── README.md               # Setup instructions
# React Spreadsheet Engine

A lightweight Excel-like grid with formula support and dependency tracking.

## Features
- **Formula Evaluation:** Supports arithmetic like `=A1+B1*2`.
- **Dependency Tracking:** Automatically updates dependent cells.
- **Circular Detection:** Displays `#CIRCULAR` to prevent infinite loops.
- **Error Handling:** Displays `#ERROR` for malformed math.

## Tech Stack
- React
- Mathjs (for expression parsing)
- Vite

## How to Run
1. `npm install`
2. `npm run dev`