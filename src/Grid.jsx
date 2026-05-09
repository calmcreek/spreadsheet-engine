import React, { useState } from 'react';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const ROWS = Array.from({ length: 10 }, (_, i) => i + 1);

const Grid = ({ cells, onUpdate }) => {
  const [activeCell, setActiveCell] = useState(null);

  return (
    <table
      style={{
        borderCollapse: 'collapse',
        border: '1px solid #ccc'
      }}
    >
      <thead>
        <tr>
          <th style={headerStyle}></th>

          {COLS.map((col) => (
            <th key={col} style={headerStyle}>
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {ROWS.map((row) => (
          <tr key={row}>
            <td style={headerStyle}>{row}</td>

            {COLS.map((col) => {
              const id = `${col}${row}`;

              const isActive = activeCell === id;

              return (
                <td
                  key={id}
                  style={{
                    border: '1px solid #ccc',
                    padding: 0
                  }}
                >
                  <input
                    style={inputStyle(cells[id]?.value)}
                    value={
                      isActive
                        ? cells[id]?.raw || ''
                        : cells[id]?.value || ''
                    }
                    onFocus={() => setActiveCell(id)}
                    onBlur={() => setActiveCell(null)}
                    onChange={(e) =>
                      onUpdate(id, e.target.value)
                    }
                  />
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const headerStyle = {
  border: '1px solid #ccc',
  background: '#f0f0f0',
  width: '40px',
  textAlign: 'center'
};

const inputStyle = (val) => ({
  width: '80px',
  border: 'none',
  padding: '8px',
  textAlign: 'right',
  outline: 'none',
  color:
    val === '#ERROR' || val === '#CIRCULAR'
      ? 'red'
      : 'black'
});

export default Grid;