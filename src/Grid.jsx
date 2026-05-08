import React from 'react';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ROWS = Array.from({ length: 10 }, (_, i) => i + 1);

const Grid = ({ cells, onUpdate }) => {
  return (
    <table style={{ borderCollapse: 'collapse', border: '1px solid #ccc' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', background: '#f0f0f0' }}></th>
          {COLS.map(col => <th key={col} style={headerStyle}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {ROWS.map(row => (
          <tr key={row}>
            <td style={headerStyle}>{row}</td>
            {COLS.map(col => {
              const id = `${col}${row}`;
              return (
                <td key={id} style={{ border: '1px solid #ccc', padding: 0 }}>
                  <input
                    style={inputStyle(cells[id]?.value)}
                    value={cells[id]?.focused ? cells[id]?.raw : (cells[id]?.value || '')}
                    onChange={(e) => onUpdate(id, e.target.value)}
                    onFocus={() => onUpdate(id, cells[id]?.raw || '')} 
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

const headerStyle = { border: '1px solid #ccc', background: '#f0f0f0', width: '40px', textAlign: 'center' };
const inputStyle = (val) => ({
  width: '80px',
  border: 'none',
  padding: '8px',
  textAlign: 'right',
  color: val === '#ERROR' || val === '#CIRCULAR' ? 'red' : 'black'
});

export default Grid;