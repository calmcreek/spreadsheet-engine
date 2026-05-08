import { evaluate } from 'mathjs';

export const parseFormula = (id, input, cells) => {
  if (!input.startsWith('=')) return input;

  const formula = input.substring(1).toUpperCase();
  const cellRegex = /[A-J]([1-9]|10)/g;
  
  // 1. Circular Reference Check
  const seen = new Set([id]);
  const checkCircular = (currentFormula) => {
    const refs = currentFormula.match(cellRegex) || [];
    for (const ref of refs) {
      if (seen.has(ref)) return true;
      seen.add(ref);
      const nextFormula = cells[ref]?.raw || '';
      if (nextFormula.startsWith('=') && checkCircular(nextFormula.substring(1))) return true;
    }
    return false;
  };

  if (checkCircular(formula)) return '#CIRCULAR';

  // 2. Evaluation
  try {
    const evaluatedFormula = formula.replace(cellRegex, (match) => {
      const val = cells[match]?.value;
      if (val === '#CIRCULAR' || val === '#ERROR') throw new Error();
      return val || 0;
    });
    return evaluate(evaluatedFormula);
  } catch {
    return '#ERROR';
  }
};