import { useState, useEffect } from 'react';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';

const Index = () => {
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Ensure user always starts the game
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner || !isXNext) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const renderSquare = (index) => (
    <Button onClick={() => handleClick(index)} size="lg" p={8}>
      {board[index]}
    </Button>
  );

  const aiMove = () => {
    const emptyIndices = board.map((value, index) => value === null ? index : null).filter(v => v !== null);
    if (emptyIndices.length === 0 || winner) return;
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);
  };

  useEffect(() => {
    if (!isXNext) {
      setTimeout(aiMove, 500); // Delay AI move for better UX
    }
  }, [isXNext]);

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Text fontSize="4xl" mb={4}>Tic-Tac-Toe Game</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={2}>
        {Array.from({ length: 9 }).map((_, i) => (
          <Box key={i} w="60px" h="60px">
            {renderSquare(i)}
          </Box>
        ))}
      </Grid>
      <Text fontSize="2xl" mt={4}>
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? 'X' : 'O'}`}
      </Text>
    </Flex>
  );
};

export default Index;