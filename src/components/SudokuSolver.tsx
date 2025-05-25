import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import sudoku from 'sudoku';

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 1px;
  background-color: #1a1a2e;
  padding: 2px;
  border-radius: 4px;
  max-width: 450px;
  margin: 0 auto;
`;

const Cell = styled(motion.input)`
  width: 100%;
  aspect-ratio: 1;
  border: none;
  text-align: center;
  font-size: 1.2rem;
  background-color: white;
  color: #1a1a2e;
  font-weight: 500;

  &:focus {
    outline: 2px solid #00b4d8;
  }

  &.fixed {
    background-color: #f5f5f5;
    font-weight: 700;
  }
`;

const ButtonContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const copyBoard = (board: number[][]) => board.map(row => [...row]);

function generateSudoku() {
  const raw = sudoku.makepuzzle(); // Array of 81 values (null or 0-8)
  const puzzle: number[][] = [];
  for (let i = 0; i < 9; i++) {
    puzzle.push(
      raw.slice(i * 9, (i + 1) * 9).map(x => (x === null ? 0 : (x as number) + 1))
    );
  }
  const solutionRaw = sudoku.solvepuzzle(raw);
  const solution: number[][] = [];
  for (let i = 0; i < 9; i++) {
    solution.push(
      solutionRaw.slice(i * 9, (i + 1) * 9).map(x => (x === null ? 0 : (x as number) + 1))
    );
  }
  return { puzzle, solution };
}

const SudokuSolver = () => {
  const [board, setBoard] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)));
  const [fixed, setFixed] = useState<boolean[][]>([]);
  const [solution, setSolution] = useState<number[][]>(Array(9).fill(null).map(() => Array(9).fill(0)));
  const [status, setStatus] = useState<'idle' | 'win' | 'fail'>('idle');
  const lastPuzzle = useRef<string>('');

  const loadNewPuzzle = () => {
    let generated;
    let puzzleString;
    do {
      generated = generateSudoku();
      puzzleString = JSON.stringify(generated.puzzle);
    } while (puzzleString === lastPuzzle.current); // Avoid same puzzle twice in a row
    lastPuzzle.current = puzzleString;
    setBoard(copyBoard(generated.puzzle));
    setSolution(copyBoard(generated.solution));
    setFixed(generated.puzzle.map(row => row.map(cell => cell !== 0)));
    setStatus('idle');
  };

  useEffect(() => {
    loadNewPuzzle();
    // eslint-disable-next-line
  }, []);

  const handleCellChange = (row: number, col: number, value: string) => {
    if (fixed[row][col]) return;
    let num = parseInt(value);
    if (isNaN(num) || num < 1 || num > 9) num = 0;
    const newBoard = copyBoard(board);
    newBoard[row][col] = num;
    setBoard(newBoard);
  };

  const handleSubmit = () => {
    // Check if board matches solution
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== solution[i][j]) {
          setStatus('fail');
          return;
        }
      }
    }
    setStatus('win');
  };

  const handleReset = () => {
    loadNewPuzzle();
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Sudoku Game
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Grid>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={cell === 0 ? '' : cell}
                onChange={e => handleCellChange(rowIndex, colIndex, e.target.value.replace(/[^1-9]/g, ''))}
                disabled={fixed[rowIndex]?.[colIndex]}
                className={fixed[rowIndex]?.[colIndex] ? 'fixed' : ''}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2, delay: (rowIndex * 9 + colIndex) * 0.01 }}
                autoComplete="off"
                style={{ caretColor: '#00b4d8' }}
              />
            ))
          )}
        </Grid>
      </Paper>
      <ButtonContainer>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
        >
          Reset
        </Button>
      </ButtonContainer>
      <AnimatePresence>
        {status === 'win' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Typography
              variant="h6"
              align="center"
              color="success.main"
              sx={{ mt: 2 }}
            >
              Great, you won! 🎉
            </Typography>
          </motion.div>
        )}
        {status === 'fail' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Typography
              variant="h6"
              align="center"
              color="error.main"
              sx={{ mt: 2 }}
            >
              Sorry, try again.
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default SudokuSolver; 