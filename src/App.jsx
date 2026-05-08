import React, { useState, useCallback } from 'react';
import Grid from './Grid';
import { parseFormula } from './FormulaParser';

const App = () => {
  const [cells, setCells] = useState({}); // Stores { A1: { raw: '=B1', value: 0 } }

  const updateCellValue = (id, rawValue) => {
    const newCells = { ...cells };
    newCells[id] = { ...newCells[id], raw: rawValue };

    // Recalculate all cells to ensure dependencies update
    // For a 10x10 grid, a full pass is efficient enough
    const recompute = () => {
      Object.keys(newCells).forEach(cellId => {
        if (newCells[cellId].raw?.startsWith('=')) {
          newCells[cellId].value = parseFormula(cellId, newCells[cellId].raw, newCells);
        } else {
          newCells[cellId].value = newCells[cellId].raw;
        }
      });
    };

    recompute(); 
    setCells(newCells);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React Spreadsheet</h1>
      <Grid cells={cells} onUpdate={updateCellValue} />
    </div>
  );
};

export default App;